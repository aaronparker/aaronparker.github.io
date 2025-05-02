---
layout: post
title: 'Streamlining App Management with Evergreen & Rimo3'
description: 'Using Evergreen and the Rimo3 API to automatically import applications into Rimo3 for discovery, baseline and testing.'
permalink: "/rimo3-evergreen/"
image:
  path: "/assets/img/rimo3/image.jpg"
  srcset:
    1920w: "/assets/img/rimo3/image.jpg"
    960w: "/assets/img/rimo3/image@0,5x.jpg"
    480w: "/assets/img/rimo3/image@0,25x.jpg"
comments: true
---
- this unordered seed list will be replaced by the toc
{:toc}

I'm really pleased to release a solution that integrates the [Evergreen PowerShell module](https://stealthpuppy.com/evergreen) with [Rimo3](https://www.rimo3.com/products). This enables you to use Evergreen as a trusted source for your application packages and Rimo3 to test and validate those applications before importing them into Microsoft Intune.

## Purpose

This solution enables organisations to have direct visibility into their application sources - because Evergreen runs in your environment and only communicates with approved vendor source locations, you can guarantee the trustworthiness of the application binaries before import.

The workflow provides a way to upload pre-configured application packages to the Rimo3 platform using a manual trigger. So any application supported by Evergreen can be used with workflow by creating an install wrapper with the PSAppDeployToolkit and imported into Rimo3. As new versions of applications are made available, import into Rimo3 is made simple with automated discovery with Evergreen.

## About Rimo3

Rimo3 is a comprehensive platform designed for modernizing and managing enterprise workspaces, ensuring that IT teams can transition smoothly to modern environments like Windows 365, Windows 11, Azure Virtual Desktop, and Intune. One of its standout features is its robust approach to application lifecycle management — a process that covers every phase of an application’s existence within an IT ecosystem.

At its core, Rimo3 automates several key tasks that traditionally require significant manual effort. It automatically discovers the full inventory of applications within an organization, ensuring that nothing is overlooked. Once apps are identified, the platform systematically validates them against specific environmental criteria to check for compatibility and performance, which is crucial before any change is deployed. After validation, Rimo3 helps package the applications into modern deployment formats (like Win32 or MSIX) that align with contemporary management frameworks. Finally, it streamlines patch management by automating the testing and deployment of application updates, reducing the likelihood of disruptions or performance issues that can arise from manual patching processes.

By employing automation at each stage—from discovery through to patch deployment — Rimo3 transforms what is often a complex, error-prone manual process into a smooth and efficient workflow. This not only bolsters security and operational continuity but also frees IT teams to focus on more strategic tasks, reducing downtime and minimizing risk across the entire application ecosystem.


## About Evergreen

[Evergreen](https://stealthpuppy.com/evergreen) is a PowerShell module that automatically retrieves the latest version information and download URLs for a range of common Windows applications by directly querying the vendors’ update APIs. Rather than relying on third-party aggregators, the module pulls data directly from the source, ensuring that the information is both current and trustworthy. This enables you to import application packages into Rimo3 with full visibility into the application sources and reduce supply chain attacks.

Here's an example - let's use Evergreen to find the latest version of the Microsoft SQL Server Management Studio. Using the `Get-EvergreenApp` command, Evergreen will query the Microsoft site and return a list of the available installers. With this detail, we can check whether the latest version is already imported into Rimo3 and if not, download, package, and import into Rimo3:

```powershell
Get-EvergreenApp -Name "MicrosoftSsms"

Version   Date     Language              URI
-------   ----     --------              ---
20.1.10.0 3/4/2024 English               https://download.microsoft.com/download/7519f0ff-997c-4f36-b5aa-9a51d47dd34c/SSMS-Setup-ENU.exe
20.1.10.0 3/4/2024 French                https://download.microsoft.com/download/7519f0ff-997c-4f36-b5aa-9a51d47dd34c/SSMS-Setup-FRA.exe
20.1.10.0 3/4/2024 German                https://download.microsoft.com/download/7519f0ff-997c-4f36-b5aa-9a51d47dd34c/SSMS-Setup-DEU.exe
20.1.10.0 3/4/2024 Italian               https://download.microsoft.com/download/7519f0ff-997c-4f36-b5aa-9a51d47dd34c/SSMS-Setup-ITA.exe
20.1.10.0 3/4/2024 Japanese              https://download.microsoft.com/download/7519f0ff-997c-4f36-b5aa-9a51d47dd34c/SSMS-Setup-JPN.exe
20.1.10.0 3/4/2024 Korean                https://download.microsoft.com/download/7519f0ff-997c-4f36-b5aa-9a51d47dd34c/SSMS-Setup-KOR.exe
20.1.10.0 3/4/2024 Portuguese (Brazil)   https://download.microsoft.com/download/7519f0ff-997c-4f36-b5aa-9a51d47dd34c/SSMS-Setup-PTB.exe
20.1.10.0 3/4/2024 Russian               https://download.microsoft.com/download/7519f0ff-997c-4f36-b5aa-9a51d47dd34c/SSMS-Setup-RUS.exe
20.1.10.0 3/4/2024 Spanish               https://download.microsoft.com/download/7519f0ff-997c-4f36-b5aa-9a51d47dd34c/SSMS-Setup-ESN.exe
20.1.10.0 3/4/2024 Chinese (Simplified)  https://download.microsoft.com/download/7519f0ff-997c-4f36-b5aa-9a51d47dd34c/SSMS-Setup-CHS.exe
20.1.10.0 3/4/2024 Chinese (Traditional) https://download.microsoft.com/download/7519f0ff-997c-4f36-b5aa-9a51d47dd34c/SSMS-Setup-CHT.exe
```

## About the solution

This solution demonstrates to customers of Rimo3 how to use Evergreen in an automated workflow to download the latest version of an application, wrap the installer with the [PowerShell App Deployment Toolkit](https://psappdeploytoolkit.com/), and import into Rimo3.

The solution is provided in [a GitHub repository](https://github.com/aaronparker/rimo3) and includes workflows for GitHub and Azure Pipelines. The workflows run the `Start-PackageUpload.ps1` script which can be run outside of the workflow process (on other platforms or manually).

To use this in your own environment, fork the repository or copy the code and modify to run on your platform of choice.

### Components

The workflow can be run via GitHub Actions or Azure Pipelines and uses the following components:

* Evergreen - you can view the list of supported applications in the [Evergreen App Tracker](https://stealthpuppy.com/apptracker/)
* PSAppDeployToolkit - this provides an install wrapper for the target application and simplifies the application definition when importing into Rimo3. Additionally, standardising on the PSAppDeployToolkit for application installs enables a consistent approach and the ability to interest with the [end-user during an application install](https://psappdeploytoolkit.com/docs/getting-started/faq)
* Rimo3 and the Rimo3 API - the API is leveraged to import application packages into Rimo3, including defining how the application package should be processed (Import + Discovery + Baseline + Test + Export to Intune)

When a new version of an application is available, the workflow can be re-run to import the new version into Rimo3 for testing and validation, and if validation is successful, export to Intune.

[![Application packages imported into Rimo3]({{site.baseurl}}/media/2025/04/rimo3-01.jpeg)]({{site.baseurl}}/media/2025/04/rimo3-01.jpeg)

Application packages imported into Rimo3.
{:.figcaption}

### Workflow process

The repository includes workflows for GitHub Actions and Azure Pipelines and supports the import of a single application package; however, multiple packages can be provided to `Start-PackageUpload.ps1`.

Here's a high-level look at the workflow process:

1. The Evergreen PowerShell module must be installed before running the workflow. The module is updated approximately every 6 weeks, so ensure the latest version is always installed.
2. Credentials for the API need to be protected, so they can be securely stored as [GitHub Secrets](https://docs.github.com/en/get-started/learning-to-code/storing-your-secrets-safely) or in an [Azure Pipelines asset library](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/?view=azure-devops).
3. The workflow will first check whether the same version of the application has already been imported. If it finds a matching version it will not continue.
4. Each application package includes an `App.json` file that describes the application including the filter that Evergreen should use to determine the application installer to use
5. The PSAppDeployToolkit 4 is used, and application install and uninstall logic is included in `Invoke-AppDeployToolkit.ps1` for each package.
6. The workflow supports EXE, MSI, and MSIX installers, including installers that may be provided as zip files (which require extracting before packaging and sending to Rimo3)
7. During packaging, the latest installer is downloaded and included with the PSAppDeployToolkit. The workflow readies the package for Rimo3 and uploads the package to Rimo3 for processing
8. When the package is successfully uploaded to Rimo3, you can then monitor the processing of the application in the Rimo3 console

[![Application processing in Rimo3]({{site.baseurl}}/media/2025/04/rimo3-03.jpeg)]({{site.baseurl}}/media/2025/04/rimo3-03.jpeg)

Application packages actively being imported into Rimo3.
{:.figcaption}

## Under the hood

### Application install

Each application package includes at least two files:

* `App.json` - this file describes the application including how Evergreen should be used to find the application version and binaries, application name and version etc. This also allows for some separation of changing application versions and the PSAppDeployToolkit which is typically static. This file is updated with Evergreen to ensure it includes details of the latest version of each application
* `Invoke-AppDeployToolkit.ps1` - this is the primary PSAppDeployToolkit installation and uninstall script for each application, so it includes application specific logic for each application.

[![Application package template files]({{site.baseurl}}/media/2025/04/package.png)]({{site.baseurl}}/media/2025/04/package.png)

Template files for an application package.
{:.figcaption}

The following code can be found in `Invoke-AppDeployToolkit.ps1` which reads `App.json` to find detail of the target application and minimise changes to this script for each application update:

```powershell
# Read App.json to get details for the app
$AppJson = Get-Content -Path "$PSScriptRoot\App.json" | ConvertFrom-Json

# Get the installer file specified in the App.json
$Global:Installer = Get-ChildItem -Path $AppJson.PackageInformation.SetupFile -Recurse
```

### Initial application list

The project repository includes the following applications:

* Audacity
* Citrix Workspace App (Current release)
* Cyberduck
* Foxit Reader
* Google Chrome
* ImageGlass
* Microsoft PowerToys
* Microsoft SQL Server Management Studio
* Microsoft Visual Studio Code
* Microsoft Azure Virtual Desktop Remote Desktop Client
* Mozilla Firefox
* Notepad++
* Paint.NET
* ScreenToGif
* Tracker Software PDFX Change Editor
* VideoLan VLC Player

The approach taken in this project is similar to my [PSPackageFactory for Intune](https://github.com/aaronparker/packagefactory), thus more applications can be added quite easily.

### Authenticating to the Rimo3 API

Authenticating to the Rimo3 API requires constructing of a form with credentials to the API. You can find details in this article [Rimo3 API - New endpoint for generating an API Access Token](https://learn.rimo3.com/knowledge-base/rimo3-public-api-token-migration).

Here's how this looks - the client ID and secret used to authenticate to the API should be securely stored. In this example, these values have been passed to the script, encoded and used with **Invoke-WebRequest** to post the credentials and return an authentication token.

```powershell
$EncodedString = [System.Text.Encoding]::UTF8.GetBytes("${ClientId}:$ClientSecret")
$Base64String = [System.Convert]::ToBase64String($EncodedString)
$params = @{
    Uri             = "https://rimo3cloud.com/api/v2/connect/token"
    Body            = "{`"Form-Data`": `"grant_type=client_credentials`"}"
    Headers         = @{
        "Authorization" = "Basic $Base64String"
        "Cache-Control" = "no-cache"
    }
    Method          = "POST"
    UseBasicParsing = $true
    ErrorAction     = "Stop"
}
$Token = Invoke-RestMethod @params
```

### Importing an application

Details on how to use the API to import an application package can be found here: [Rimo3 API - Import an Application](https://learn.rimo3.com/knowledge-base/rimo3-api-import-an-application).

Within the workflow, once the application binaries have been downloaded, and included with a PSAppDeployToolkit template, the package is compressed into a single zip file and posted to the Rimo3 API to import the application package. To provide the API with the information required to describe the application package, details from `App.json` are used, including the package display name, publisher and version information.

Here's how uploading the application package looks in detail:

```powershell
$params = @{
    Uri             = "https://rimo3cloud.com/api/v2/application-packages/upload/manual"
    Method          = "POST"
    Headers         = @{
        "accept"        = "application/json"
        "Authorization" = "Bearer $($Token.access_token)"
    }
    Form            = @{
        "file"             = (Get-Item -Path $ZipFile.FullName)
        "displayName"      = $AppJson.Information.DisplayName
        "comment"          = "Imported by Evergreen"
        "fileName"         = $AppJson.PackageInformation.SetupFile
        "publisher"        = $AppJson.Information.Publisher
        "name"             = $AppJson.Application.Title
        "version"          = $EvergreenApp.Version
        "installCommand"   = $AppJson.Program.InstallCommand
        "uninstallCommand" = $AppJson.Program.UninstallCommand
        "tags"             = $Tags
        "progressStep"     = "2"
    }
    ContentType     = "multipart/form-data"
    UseBasicParsing = $true
    ErrorAction     = "Continue"
}
Invoke-RestMethod @params
```

Note the value for `progressStep` in this sample - the workflow defaults to a value of **2** - Import + Discovery + Baseline. This value needs to be changed to **3** to enable Import + Discovery + Baseline + Test.

Once the application package has been imported, you can view its details. Note the file name and install command in the screenshot below, showing the PSAppDeployToolkit components and syntax.

[![Application details in Rimo3]({{site.baseurl}}/media/2025/04/rimo3-02.jpeg)]({{site.baseurl}}/media/2025/04/rimo3-02.jpeg)

Application packages details in Rimo3.
{:.figcaption}

## Orchestration

### Workflow execution

There are many ways that you can orchestrate the import of application packages. I typically default to Azure Pipelines or GitHub Actions because these platforms integrate with the code repository and make it simple to schedule workflow execution.

The workflow to import an application package into Rimo3 has been included for [Azure Pipelines](https://github.com/aaronparker/rimo3/blob/main/.azure/pipelines/packageupload.yml) and [GitHub Actions](https://github.com/aaronparker/rimo3/blob/main/.github/workflows/packageupload.yml). By default this workflow is run manually and allows you to select an application to import.

Here's the Azure Pipelines version:

[![Running the package import workflow in Azure Pipelines]({{site.baseurl}}/media/2025/04/azure-pipelines.jpeg)]({{site.baseurl}}/media/2025/04/azure-pipelines.jpeg)

Running the package import workflow in Azure Pipelines.
{:.figcaption}

And here is the GitHub Actions version:

[![Running the package import workflow in GitHub Actions]({{site.baseurl}}/media/2025/04/github-workflow.jpeg)]({{site.baseurl}}/media/2025/04/github-workflow.jpeg)

Running the package import workflow in GitHub Actions.
{:.figcaption}

### Updating packages

The repository includes a workflow (update-packagejson) that leverages Evergreen to update the `App.json` file for each application. This currently runs once every 24 hours, checks for application updates with Evergreen, and commits changes back to the repository. This process can be done at packaging time; however, it enables a trigger that can be used to start import on detection of a new version of an application.

### Secrets

Add the required secrets to the repository to enable the `Start-PackageUpload.ps1` script to authenticate to the Rimo3 API:

* `CLIENT_ID` - Authentication client ID
* `CLIENT_SECRET` - secret value to authenticate with the client ID

The following secrets are used by the `update-packagejson` workflow to commit changes and sign git commits:

* `COMMIT_EMAIL` - Email address used for commits
* `COMMIT_NAME` - Display name used for commits
* `GPGKEY` - Signing key for commits (optional - remove signing options from the workflow if required)
* `GPGPASSPHRASE` - Passphrase used to unlock the key during commits (optional - remove signing options from the workflow if required)

If you're running the solution in GitHub Actions, configure the repository secrets:

[![GitHub Secrets]({{site.baseurl}}/media/2025/04/github-secrets.jpeg)]({{site.baseurl}}/media/2025/04/github-secrets.jpeg)

GitHub Secrets required by the solution, including secrets used by workflows that automatically update the source based on application updates.
{:.figcaption}

If you're running the solution in Azure Pipelines, configure a variable group and ensure the authentication values are protected:

[![Azure Pipelines secrets]({{site.baseurl}}/media/2025/04/azure-secrets.jpeg)]({{site.baseurl}}/media/2025/04/azure-secrets.jpeg)

Azure Pipelines secrets required by the solution, including secrets used by workflows that automatically update the source based on application updates.
{:.figcaption}

## Summary

Evergreen is a natural complement to the Rimo3 platform, providing you with a trusted source for your application packages. With the solution provided here, you leverage Evergreen and Rimo3 to discover, validate and modernise your application lifecycle management.

Star, fork and contribute to the project on GitHub here: [Rimo3 + Evergreen](https://github.com/aaronparker/rimo3).
