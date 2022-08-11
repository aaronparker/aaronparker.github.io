---
layout: post
title: Manage User Experience Virtualization on the Modern Desktop
description: Use Microsoft User Experience Virtualization on Azure AD-joined Windows desktops to roam user's Windows and applications preferences between devices.
date: 2019-06-19 23:00 +1000
permalink: "/user-experience-virtualization-intune/"
redirect_from:
  - "/user-experience-virtualzation-intune/"
image:
  path:    /assets/img/user/image.jpg
  srcset:
    1920w: /assets/img/user/image.jpg
    960w:  /assets/img/user/image@0,5x.jpg
    480w:  /assets/img/user/image@0,25x.jpg
categories: [Microsoft]
comments: true
related_posts:
  - _posts/2019-06-18-user-experience-virtualization-intune.md
---
Since this article was written, Microsoft has enabled Proactive Remediations and the Settings Catalog in Endpoint Manager. This means that a scheduled task is no longer required, and  User Experience Virtualization can be configured directly via policy. For an update approach to this implementation, see the new scripts here: [User Experience Virtualization scripts](https://github.com/aaronparker/intune/tree/main/Uev).
{:.note title="Update"}

* this unordered seed list will be replaced by the toc
{:toc}

On the modern Windows 10/11 desktop with Office 365 and Azure AD Premium, application preferences are roamed by two components - the Microsoft 365 desktop applications [roam settings when used with Office 365](https://docs.microsoft.com/en-us/previous-versions/office/office-2013-resource-kit/jj733593\(v=office.15\)#roaming-settings-for-office-2013) and when enabled, Enterprise State Roaming [synchronises specific settings](https://docs.microsoft.com/en-us/azure/active-directory/devices/enterprise-state-roaming-windows-settings-reference).

Before you ask - yes, [User Experience Virtualization](https://docs.microsoft.com/en-us/windows/configuration/ue-v/uev-for-windows) is still a thing. UE-V is a component of Windows 10 Enterprise that can roam a user's application preferences across desktops. UE-V works by defining user profile locations specific to an application and importing and exporting those settings into and out of the profile at login / logout or application launch / close.

## Why

User-driven device provisioning via Windows Autopilot can make a Windows PC ready for the user in about an hour. This includes their applications, and preferences I've covered above.

When a user signs into a new PC, their key Windows and Office settings will sync, but not preferences for any application that Enterprise State Roaming does not manage.

Application preferences *not* roamed to a newly provisioned PC is likely to be a disruptive experience. User Experience Virtualization can be configured to roam those application settings on an Azure AD-joined PC using the right synchronisation tool.

Consider a common example such as Google Chrome. Chrome implements its own sync mechanism via Google accounts, but this often means that users will sign into Chrome with their personal Google accounts. Chrome and ChromeOS can be managed via [Chrome Enterprise](https://cloud.google.com/chrome-enterprise/browser-management/) where it is possible to use Azure AD as the IdP source. The browser can then be managed across your PC estate; however, this requires Google Workspace licensing. If Google isn't a strategic play, then UE-V can capture Chrome settings and ensure a consistent experience across managed Windows devices.

I highly recommend that you migrate from Google Chrome to Microsoft Edge. Edge supports signing into the browser with a Microsoft 365 account, enabling the you to better secure corporate credentials, while roaming the end-user's preferences between devices.
{:.note title="Use Microsoft Edge instead"}

## How

Azure AD-join and Windows Autopilot enable a consistent provisioning experience for Windows PCs regardless of location, but unlike a traditional domain-joined PC, you lose management features including Group Policy. UE-V would typically be [enabled with Group Policy](https://docs.microsoft.com/en-us/windows/configuration/ue-v/uev-deploy-required-features#enable-the-ue-v-service) and [a file share](https://docs.microsoft.com/en-us/windows/configuration/ue-v/uev-deploy-required-features#deploy-a-ue-v-settings-storage-location), but our target PCs are often not used within the corporate network, so synchronising application preferences between PCs requires another mechanism. Additionally we need to re-think enabling UE-V on the end-point and delivering UE-V templates to those devices.

### OneDrive for Business as a Sync Mechanism

Most organisations [we](https://www.insentragroup.com/) see deploying Windows 10 in a modern management context with Microsoft Intune are also Office 365 customers. This naturally makes OneDrive for Business available as a sync mechanism and it's [a solution that Microsoft even mentions in the UE-V documentation](https://docs.microsoft.com/en-us/windows/configuration/ue-v/uev-sync-methods). Any enterprise file and sync solution could be used including Citrix ShareFile or Dropbox.

### Managing UE-V with Microsoft Intune

To manage UE-V on Windows PCs via Microsoft Intune, we need to implement a few things:

1. Windows 10/11 Enterprise - UE-V is only a feature of Windows 10/11 Enterprise devices. This might be implemented by Intune via the [Upgrade Windows 10 Edition configuration profile](https://docs.microsoft.com/en-us/intune/edition-upgrade-configure-windows-10) or via a Microsoft 365 / Windows 10/11 Enterprise E3/E5 license
2. UE-V [settings templates](https://docs.microsoft.com/en-us/windows/configuration/ue-v/uev-deploy-uev-for-custom-applications) - these define the profile locations for application preferences to roam
3. A public HTTPS location to host UE-V templates. In my test configuration, I've used an Azure Storage Account so that I can use the [`List Containers`](https://docs.microsoft.com/en-us/rest/api/storageservices/list-containers2) API to query the storage for the templates to download. This location will only host XML files that clients will download, but uploads should be controlled and validated
4. Intune [proactive remediations](https://docs.microsoft.com/en-us/mem/analytics/proactive-remediations) to download the UE-V templates on managed clients
5. A Settings Catalog configuration profile to configure the UE-V client

To this end, I've written [a script to enable UE-V](https://github.com/aaronparker/intune/tree/master/Uev) on managed PCs and setup [a second script](https://github.com/aaronparker/uev/tree/master/scripts) that runs as a scheduled task to download the UE-V templates.

## Deploy UE-V via Intune

### Proactive Remediations

Proactive remediations is used to detect the status of the UE-V service on the client and ensure the require UE-V settings templates are downloaded.

* [`Detect-Uev.ps1`](https://github.com/aaronparker/intune/blob/main/Uev/Detect-Uev.ps1) - a Proactive remediation script to detect the status of the UE-V client including the UE-V service and the settings catalog XML files
* [`Invoke-Uev.ps1`](https://github.com/aaronparker/intune/blob/main/Uev/Invoke-Uev.ps1) - a Proactive remediation script that enables the UE-V client, and downloads a set of UE-V settings templates from an Azure storage account

The scripts will determine whether the UE-V settings templates located in `C:\ProgramData\Microsoft\UEV\CustomTemplates` match those stored on the specified Azure storage account. If they don't match, `Invoke-Uev.ps1` will ensure they do.

Import these scripts and assign to your target devices. The status of the clients will then be reported in the Endpoint Manager admin center:

![Intune proactive remediation status]({{site.baseurl}}/media/2019/06/proactiveremediationsstatus.jpeg)

### Settings Catalog Configuration Profile

The UE-V client can be configured using a Settings Catalog configuration profile. [`UserExperienceVirtualization-Profile.json`](https://github.com/aaronparker/intune/blob/main/Uev/UserExperienceVirtualization-Profile.json) is an export of a configured profile in my own tenant that you can import into your own tenant for testing.

![Settings Catalog Device Configuration Profile]({{site.baseurl}}/media/2019/06/uevconfigprofile.jpeg)

This profile includes several key settings to ensure the UE-V agent is configured to match the script and store user settings in OneDrive:

* Configure Sync Method - Enabled
* Sync Method: (Device) - External
* Enable UE-V - Enabled
* Settings storage path - `%OneDriveCommercial%`
* Settings template catalog path (Device) - `%ProgramData%\Microsoft\UEV\CustomTemplates`

Review the following documentation on UE-V to understand how the client could be configured in your environment - [Settings and data roaming FAQ](https://docs.microsoft.com/en-us/azure/active-directory/devices/enterprise-state-roaming-faqs) and [Set-UevConfiguration](https://docs.microsoft.com/en-us/powershell/module/uev/set-uevconfiguration?view=win10-ps).

| Setting | Value | Notes |
|:--|:--|:--|
| Computer | True | Applies the settings to all users on the computer. |
| `DisableSyncProviderPing` | True | Disables the synchronization provider from pinging the network. Not needed for OneDrive.  |
| `DisableSyncUnlistedWindows8Apps` | True | Disables the synchronization of unlisted Windows Store apps. Assuming ESR is used |
| `EnableDontSyncWindows8AppSettings` | True | UE-V does not synchronize Windows Store app settings. Assuming ESR is used |
| `EnableSettingsImportNotify` | True | If the settings import takes longer than the amount of time that you specify for the `SettingsImportNotifyDelayInSecond` parameter, UE-V notifies the user |
| `EnableSync` | True | UE-V synchronizes the settings that are defined in the settings location templates that you have enabled |
| `EnableWaitForSyncOnApplicationStart` | True | Ensures that application settings are synced locally and imported before starting the app |
| `SettingsStoragePath` | %OneDriveCommercial% | Specifies the path of the location where UE-V stores the user settings |
| `SyncMethod` | External | Tells UE-V that OneDrive will manage sync |
| `WaitForSyncTimeoutInMilliseconds` | 2000 | This is the default wait timeout value. Test various network scenarios before increasing |
{:.smaller}

## Results

With `%OneDrive%` or `%OneDriveCommercial%` as the target UE-V Settings Storage Path, the user's OneDrive sync folder will host a `SettingsPackages` folder that contains application settings.

![UE-V Settings Packages folder in OneDrive]({{site.baseurl}}/media/2019/06/UevSettingsInOneDrive.PNG)

With OneDrive Files On Demand, settings packages will download as applications are launched. The folder can be set to [always offline with the `attrib` command](https://techcommunity.microsoft.com/t5/Microsoft-OneDrive-Blog/OneDrive-Files-On-Demand-For-The-Enterprise/ba-p/117234).

## Continuous Deployment to Azure Blob Storage

As a location for storing scripts and UE-V templates, Azure Blob storage enables us to create a continuous deployment solution for new UE-V templates. As these settings templates are added, modified, or removed, automatic validation of the template, upload to blob storage, then reflection of these changes on clients will ensure the entire end-to-end process can be automated.

I'm using an [Azure Pipeline](https://docs.microsoft.com/en-us/azure/devops/pipelines/get-started/what-is-azure-pipelines) with a connection to the scripts and templates stored on GitHub (the code could also be stored in Azure DevOps). The project uses [service connections](https://docs.microsoft.com/en-us/azure/devops/pipelines/library/service-endpoints) to GitHub to retrieve the code and templates, and to the Azure subscription for rights to the target storage account.

The pipeline performs two tasks:

1. Validate the UE-V settings templates against the [template schema](https://docs.microsoft.com/en-us/windows/configuration/ue-v/uev-application-template-schema-reference). This ensures that clients only receive valid templates
2. Upload the UE-V settings templates to the target Azure storage account using the [Azure File Copy task](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/deploy/azure-file-copy), only if the settings templates pass validation

Here's the pipeline which includes a trigger to run any time the settings templates are updated:

```yaml
trigger:
  branches:
    include:
    - main
  paths:
    include:
    - Uev/templates/*
    - Uev/tests/*
    - Uev/Publish-Templates.yml

jobs:
- job: push_templates
  pool:
    vmImage: windows-latest
  steps:
  - checkout: self
    persistCredentials: true

  - task: PowerShell@2
    displayName: "Install Pester"
    inputs:
      targetType: 'inline'
      script: |
        Install-Module -Name "Pester" -Force -Confirm:$False
      verbosePreference: 'SilentlyContinue'
      pwsh: true
      workingDirectory: '$(Build.SourcesDirectory)'

  - task: PowerShell@2
    displayName: "Validate templates against UE-V schema"
    inputs:
      targetType: 'inline'
      script: |
        Import-Module -Name "Pester" -Force
        $Config = [PesterConfiguration]::Default
        $Config.Run.Path = '$(Build.SourcesDirectory)\Uev\tests'
        $Config.Run.PassThru = $True
        $Config.CodeCoverage.Enabled = $False
        $Config.TestResult.Enabled = $True
        $Config.TestResult.OutputFormat = "NUnitXml"
        $Config.TestResult.OutputPath = ".\TestResults.xml"
        Invoke-Pester -Configuration $Config
      verbosePreference: 'SilentlyContinue'
      pwsh: true
      workingDirectory: '$(Build.SourcesDirectory)\Uev\tests'

  - task: AzureFileCopy@4
    displayName: "Push templates to storage account"
    inputs:
      sourcePath: '$(Build.SourcesDirectory)\Uev\templates\*.xml'
      azureSubscription: 'Visual Studio Enterprise Subscription(63e8f660-f6a4-4ac5-ad4e-623268509f20)'
      destination: 'AzureBlob'
      storage: 'stpydeviceause'
      containerName: 'uev'
      additionalArgumentsForBlobCopy: '--log-level=INFO'
```

The pipeline execution relies on a few components:

* [UE-V settings templates](https://github.com/aaronparker/intune/tree/main/Uev/templates) - storing these in a git repository allows you to track changes and use branches to test the templates before pushing to production
* [Template tests via Pester](https://github.com/aaronparker/intune/tree/main/Uev/tests) - this approach is used to validate the templates against the schema and save the test output for reporting purposes
* [The Azure Pipeline](https://github.com/aaronparker/intune/blob/main/Uev/Publish-Templates.yml) - the pipeline is stored here in YAML format for easy deployment to new tenants

Each time a commit and push is made to the templates in the repository, the Azure Pipeline will execute, validate the templates, upload to Azure blog storage. Clients will then check for updated templates and download them.

![Azure Pipelines output]({{site.baseurl}}/media/2019/06/azure-devops-pipeline.jpeg)

### Azure Blob Storage Configuration

For this configuration, I've created an [Azure storage account](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-overview) to store the files on [blob storage](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction). Microsoft provides [5 GB of blob storage free for 12-months](https://azure.microsoft.com/en-gb/free/free-account-faq/), so it's simple to get started.

![Azure blob storage containers]({{site.baseurl}}/media/2019/06/AzureBlobContainers.jpeg)

[Anonymous read access](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-manage-access-to-resources) is enabled on each of these containers, so that the UE-V templates can be downloaded to end-points, without having to storage secure access keys in each PowerShell script.

![Azure blob storage container access level configuration]({{site.baseurl}}/media/2019/06/AzureBlobContainerAccessLevel.png)

## Summary

In this article I've outlined an approach to roaming additional application settings on a Windows 10/11 modern desktop with User Experience Virtualization and OneDrive for Business.

While the Microsoft 365 Apps, Microsoft Edge, and Windows 10 provides their own mechanisms for roaming user preferences, UE-V can roam preferences for those additional applications that matter to your users. Alternatively, UE-V could handle roaming of all Windows and application settings if you're not keen to use those cloud-native features.

The PowerShell scripts I've provided can be [used with Microsoft Intune](https://docs.microsoft.com/en-us/intune/intune-management-extension) or a 3rd party management tool. Additionally, 3rd party sync tools (e.g., Dropbox) should also work.

In another article on this topic, I'll discuss how UE-V can be used to provide [a consistent application experience across physical and virtual desktops](https://stealthpuppy.com/user-experience-virtualzation-profile-container/).
