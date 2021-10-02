---
layout: post
title: Planning for OneDrive Known Folder Move with Azure Log Analytics
date: 2021-10-02 12:00 +1000
permalink: "/onedrive-knownfoldermove-loganalytics/"
categories:
- Microsoft
tags:
- OneDrive
- Intune
- Azure
- Log Analytics
---
Knowing how much data you've got in the wild to move into OneDrive for Business is easy if it's all stored on a file server. What happens if your user's Desktop, Documents and Pictures folders are stored locally on their physical PCs?

Having information on how much data needs to be migrated into OneDrive will better assist planning the adoption of [Known Folder Move](https://docs.microsoft.com/en-us/onedrive/redirect-known-folders).

Using [Log Analytics in Azure Monitor](https://docs.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-overview) is a simple, ubiquitous tool that provides a framework for reporting on this data. You just need a method to get the data from managed Windows PCs into Azure Monitor. With the data in Log Analytics, you can then create some useful workbooks:

[![OneDrive Known Folder Move workbook in Azure Monitor]({{site.baseurl}}/media/2021/10/OneDriveWorkbook1.jpeg)]({{site.baseurl}}/media/2021/10/OneDriveWorkbook1.jpeg)

## Collecting the Data

### Determine the location of User Folders

To plan an implementation of Known Folder Move, we want to see how much data users are storing locally before turning this feature on. To do that we need a script that collects the total sizes of the Documents, Desktop and Pictures folders.

For the initial version of this solution, I've assumed that user's folders are in their default location on the operating system disk before migration (i.e., `C:\Users\aaron\Documents`). Also note that I've only been testing and implementing this in an English language version of Windows. If these folders are in a different location in your environment, then update the paths appropriately.

There are multiple methods of determining where these folders are located. The method would be to use an approach that doesn't use any hardcoded paths or assumptions about paths. For example, the following code will return the location to the Documents, Desktop and Pictures folders by just [asking Windows where they are](https://docs.microsoft.com/en-us/dotnet/api/system.environment.getfolderpath?view=net-5.0).

```powershell
[System.Environment]::GetFolderPath("MyDocuments")
[System.Environment]::GetFolderPath("Desktop")
[System.Environment]::GetFolderPath("MyPictures")
```

However, if these folders are already redirected into the OneDrive sync folder, then that's the path that is returned. Good for validating whether Known Folder Move is already enabled, but not great for working out directory sizes before migration. Additionally, if using this method, you may want to ensure that standard folder redirection to a network share has not been enabled before progressing further.

Version 1 of my script just uses code like `Join-Path -Path $UserProfilePath -ChildPath "Desktop"` to determine the default path, so there may be some room for improvement.

### Collect User Folder sizes

To return the folder sizes, PowerShell provides a simple method with `Get-ChildItem` to recurse the target path which can be piped to `Measure-Object` to return the total size of all files in bytes:

```powershell
Get-ChildItem -Path "$Env:USERPROFILE\Documents" -Recurse | Measure-Object -Property "Length" -Sum
```

I've tested this in at least 3 real customer environments where all endpoints are running SSDs and the approach performs very well. If you still have endpoints with spinning disks, I highly recommend testing out the performance impact before implementing.

This approach can be wrapped into a function that validates the path, finds the path size and will return the total in megabytes. You could leave this in bytes if you prefer:

```powershell
Function Get-DirectorySize ($Path) {
    If (Test-Path -Path $Path -PathType "Container") {
        $params = @{
            Path        = $Path
            Recurse     = $True
            ErrorAction = "SilentlyContinue"
        }
        $PathSize = Get-ChildItem @params | Measure-Object -Property "Length" -Sum
        $Size = [System.Int64] $PathSize.Sum

        If ($Size -gt 0) {
            # Convert to MB and return 2 decimal places
            Write-Output -InputObject ([System.Math]::Round(($Size) / 1MB, 2))
        }
        Else {
            Write-Output -InputObject 0
        }
    }
    Else {
        Write-Output -InputObject 0
    }
}
```

### Collect OneDrive Known Folder Move status

To round out the report, it's worth collecting additional information about the status of the OneDrive client and Known Folder Move from target endpoints. This is done by collecting a few registry values.

The default registry location for OneDrive for Business is `HKEY_CURRENT_USER\SOFTWARE\Microsoft\OneDrive\Accounts\Business1`. This assumes that the user account signed into the OneDrive client is the user's primary corporate identity. Users can sign into the OneDrive client with multiple accounts, but it's reasonable to assume that for most managed devices, querying the values in this key will provide us with data that's correct.

There are three values with interesting data:

* `UserFolder` - lists the path to the OneDrive sync folder
* `UserEmail` - lists the email address / user account sign into OneDrive
* `KfmFoldersProtectedNow` - lists the current status of Known Folder Move

If Known Folder Move is enabled, `KfmFoldersProtectedNow` will have a value of `3584` - any other value should be flagged so that we can report on whether all three folders are protected. `KfmFoldersProtectedNow` has the following possible values:

|           | Redirected | Redirected | Redirected | Redirected | Redirected | Redirected | Redirected |
| --------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- |
| Desktop   | No         | Yes        | No         | No         | Yes        | No         | Yes        |
| Documents | No         | No         | Yes        | No         | Yes        | Yes        | Yes        |
| Pictures  | No         | No         | No         | Yes        | No         | Yes        | Yes        |
| Value     | **0**      | **512**    | **1024**   | **2048**   | **2526**   | **3072**   | **3584**   |

## Creating the Report

### Log Analytics

To use Azure Monitor and create a [Log Analytics workspace](https://docs.microsoft.com/en-us/azure/azure-monitor/logs/quick-create-workspace), you'll need an Azure subscription. If you've adopted or are in the process of adopting Microsoft Intune, you should be implementing [Update Compliance](https://docs.microsoft.com/en-us/windows/deployment/update/update-compliance-monitor) to monitor your endpoints. Update Compliance is built on Log Analytics, so you'll end up with at least one Log Analytics workspace.

It's also worth sending your [Microsoft Endpoint Manager diagnostics logs](https://docs.microsoft.com/en-us/mem/intune/fundamentals/review-logs-using-azure-monitor) to Log Analytics.

[![Configuring Microsoft Intune diagnostic settings]({{site.baseurl}}/media/2021/10/IntuneDiagnostics.png)]({{site.baseurl}}/media/2021/10/IntuneDiagnostics.png)

Building custom solutions on top of Log Analytics, such as this approach to monitoring user data, and importing the into the same Log Analytics workspace will allow you to cross reference device information in your reports.

### Importing data into Azure Monitor

There are at least two methods to import data into Azure Monitor - the [Log Analytics](https://docs.microsoft.com/en-us/azure/azure-monitor/agents/log-analytics-agent) agent or the [Azure Monitor HTTP Data Collector API](https://docs.microsoft.com/en-au/azure/azure-monitor/logs/data-collector-api).

After having built out several solutions using Azure Monitor to report on metrics from devices managed by Microsoft Intune, my view is that for the purposes of building simple reporting tools for endpoint management, the Azure Monitor HTTP Data Collector API is the easiest method of importing data. The API allows you to send data directly to Azure Monitor instead of writing it out to a intermediary log file. It also automatically parses your log data instead of requiring you to [manually parse fields](https://docs.microsoft.com/en-us/azure/azure-monitor/logs/parse-text) in your custom log.

Microsoft has [a code sample in PowerShell](https://docs.microsoft.com/en-au/azure/azure-monitor/logs/data-collector-api?WT.mc_id=Portal-fx#powershell-sample) that lists the functions that are required for posting data to the API. The script listing there provides you everything you need to start on your own script; however, this article over on MSEndpointMgr is also worth referencing: [Enhance Intune Inventory data with Proactive Remediations and Log Analytics](https://msendpointmgr.com/2021/04/12/enhance-intune-inventory-data-with-proactive-remediations-and-log-analytics/). I've used that article to build out the script I'm using here and improve upon it.

Those two resources will provide good coverage of what's required to post to the Data Collector API, so I won't cover it in any more detail here; however, I have embedded below my version of the functions required to post data. I've made these a little easier to read and added some error handling so that you can determine whether the script has issues posting data.

```powershell
# Function to create the authorization signature
Function New-Signature ($CustomerId, $SharedKey, $Date, $ContentLength, $Method, $ContentType, $Resource) {
    $xHeaders = "x-ms-date:" + $Date
    $stringToHash = $Method + "`n" + $ContentLength + "`n" + $ContentType + "`n" + $xHeaders + "`n" + $Resource

    $bytesToHash = [Text.Encoding]::UTF8.GetBytes($stringToHash)
    $keyBytes = [System.Convert]::FromBase64String($sharedKey)

    $sha256 = New-Object -TypeName "System.Security.Cryptography.HMACSHA256"
    $sha256.Key = $keyBytes
    $calculatedHash = $sha256.ComputeHash($bytesToHash)
    $encodedHash = [System.Convert]::ToBase64String($calculatedHash)
    $authorization = "SharedKey {0}:{1}" -f $customerId, $encodedHash
    Return $authorization
}

# Function to create and post the request
Function Send-LogAnalyticsData ($CustomerId, $SharedKey, $Body, $LogType) {

    # Validate that payload data does not exceed limits
    if ($Body.Length -gt (31.9 * 1024 * 1024)) {
        Throw "Upload payload too large. Reduce payload size to below the 32Mb limit. Current payload size is: " + ($body.Length / 1024 / 1024).ToString("#.#") + "Mb"
    }

    # Enable TLS 1.2 support 
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12

    $Method = "POST"
    $ContentType = "application/json"
    $Resource = "/api/logs"
    $Rfc1123date = [System.DateTime]::UtcNow.ToString("r")
    $ContentLength = $Body.Length

    $params = @{
        CustomerId    = $CustomerId
        SharedKey     = $SharedKey
        Date          = $Rfc1123date
        ContentLength = $ContentLength
        Method        = $Method
        ContentType   = $ContentType
        Resource      = $Resource
    }
    $signature = New-Signature @params

    try {
        $Headers = @{
            "Authorization"        = $signature;
            "Log-Type"             = $logType;
            "x-ms-date"            = $rfc1123date;
            "time-generated-field" = $TimeStampField;
        }
        $params = @{
            Uri             = "https://" + $customerId + ".ods.opinsights.azure.com" + $resource + "?api-version=2016-04-01"
            Method          = $Method
            ContentType     = $ContentType
            Headers         = $Headers
            Body            = $Body
            UseBasicParsing = $True
        }
        $response = Invoke-WebRequest @params
        $PayloadSize = ("Upload payload size is " + ($Body.Length / 1024).ToString("#.#") + "Kb ")
        $StatusMessage = "$($response.StatusCode) : $($PayloadSize)"
    }
    catch {
        Throw $_.Exception.Message
    }
    Return $StatusMessage 
}
```

### Endpoint Analytics Proactive Remediations

I've put together a script that will determine user folder sizes, gather OneDrive information, and post this data to a Log Analytics workspace: [Invoke-UserFolderStats.ps1](https://gist.github.com/aaronparker/74fae5b7887b4e46040a6adc194ab383). You'll need to update the script parameters with the workspace Id and the workspace shared key (using the workspace primary or secondary key), so that the script can authenticate to the Data Collector API:

```powershell
Param (
    [Parameter(Mandatory = $False)]
    # Update with Log Analytics Workspace ID
    [System.String] $CustomerId = "",

    [Parameter(Mandatory = $False)]
    # Update with Log Analytics Primary or Secondary key
    [System.String] $SharedKey = "",

    [Parameter(Mandatory = $False)]
    [System.String] $CustomLog = "UserFolders"
)
```

A full listing of the script can be found here:

<script src="https://gist.github.com/aaronparker/74fae5b7887b4e46040a6adc194ab383.js"></script>

#### Run the script on endpoints

Running the script on managed endpoints is straight-forward - use [Endpoint Analytics Proactive Remediations](https://docs.microsoft.com/en-us/mem/analytics/proactive-remediations) if you are using a modern management approach with Microsoft Intune. Ensure you run the script with `Run this script using the logged-on credentials` enabled.

[![Running the script with Proactive Remediation]({{site.baseurl}}/media/2021/10/ProactiveRemediationScript.jpeg)]({{site.baseurl}}/media/2021/10/ProactiveRemediationScript.jpeg)

Schedule the script to run once every 24 hours, which should be enough to capture metrics. If you really want to run the script more often, first consider the potential impact on storage performance.

### Build a Workbook

With the data collected and sent to the Log Analytics workspace, we can now build an [Azure Monitor workbook](https://docs.microsoft.com/en-us/azure/azure-monitor/visualize/workbooks-overview) to display the data in a useable format.

[![Known Folder Move status report]({{site.baseurl}}/media/2021/10/KnownFolderMovestatus.jpeg)]({{site.baseurl}}/media/2021/10/KnownFolderMovestatus.jpeg)

If you're new to Azure Monitor workbooks, then be prepared to learn [Kusto Query Language](https://docs.microsoft.com/en-us/azure/data-explorer/kusto/query/) (KQL). KQL queries provide the workbook data to visualise, turning it into useful information.

For example, the following query provides the total size of the Documents folder across all endpoints, showing the total amount of data in user's Documents folder that needs to be migrated to OneDrive:

```kusto
UserFolders_CL
| where TimeGenerated {TimeSpan:value}
| where UserEmail_s != ""
| summarize arg_max (TimeGenerated, *) by ComputerName_s
| project DocumentsSize=DocumentsSizeMb_d
| summarize sum(DocumentsSize)
```

Here's a query that lists the top 5 Documents folder by size. This should let you know which users you may need to treat carefully when enabling Known Folder Move.

```kusto
UserFolders_CL
| where TimeGenerated {TimeSpan:value}
| where UserEmail_s != ""
| summarize arg_max (TimeGenerated, *) by UserEmail_s
| project UserEmail_s, DocumentsSizeMb_d
| order by DocumentsSizeMb_d desc
| limit 5
```

To see complete details about user folders from your managed endpoints, the following query will display a table with user folder and Known Folder Move status from managed endpoints:

```kusto
UserFolders_CL
| where TimeGenerated {TimeSpan:value}
| where UserEmail_s != ""
| summarize arg_max (TimeGenerated, *) by ComputerName_s
| project TimeGenerated, Computer=ComputerName_s, User=UserEmail_s, KfmEnabled=KfmEnabled_b, DesktopSize=DesktopSizeMb_d, DocumentsSize=DocumentsSizeMb_d, PicturesSize=PicturesSizeMb_d, ScriptElapsed=GatherElapsedSec_d
```

Here's another example of the table (or grid) view. In this view, I've formatted the `KfmEnabled` column with [Thresholds](https://docs.microsoft.com/en-us/azure/azure-monitor/visualize/workbooks-grid-visualizations#grid-styling) so that a green tick is displayed if Known Folder Move is enabled for all folders, or a warning if not. Additionally, the `DesktopSize`, `DocumentsSize`, and `PicturesSize` columns display as a heatmap making it easier to identify the largest folders in your environment.

[![Known Folder Move status report]({{site.baseurl}}/media/2021/10/KnownFolderMovestatus2.jpeg)]({{site.baseurl}}/media/2021/10/KnownFolderMovestatus2.jpeg)

Here's the code for the entire workbook that you can copy directly into a new workbook in your target Log Analytics workspace. If you make some improvements to the workbook be sure to let me know what you've updated.

<script src="https://gist.github.com/aaronparker/0ac0d58e2dc780df4d7d3a9e82eb8dcc.js"></script>

## Finally

So that's the solution for building some insights into how much data you have in your environment before enabling Known Folder Move. The data that this workbook presents helps you understand a few things - the total amount of data you need to migrate to OneDrive; those users how are particularly outliers, enabling you to ask users to clean up their data before migration or help you to plan turning on Known Folder Move; and finally it shows you the status of Known Folder Move for the Document, Desktop and Pictures folders on endpoints, enabling you to report on those endpoints that have successfully implement Known Folder Move.

How much will this solution cost you in your Azure Log Analytics workspace? Each device will send about 500 bytes each time it posts to the Data Collector API. If you're getting the script to run once per 24-hours, the costs to run even in large environments is going to extremely low.
