---
layout: post
title: Manage User Experience Virtualization on the Modern Desktop
date: 2019-06-19 23:00 +1000
permalink: "/user-experience-virtualzation-intune/"
categories:
- Microsoft
tags:
- Intune
- User Experience Virtualization
- OneDrive
- PowerShell
---
On the modern Windows 10 desktop with Office 365 and Azure AD Premium, application preferences are roamed by two components - the Office 2013+ desktop applications [roam settings when used with Office 365](https://docs.microsoft.com/en-us/previous-versions/office/office-2013-resource-kit/jj733593\(v=office.15\)#roaming-settings-for-office-2013) and when enabled, Enterprise State Roaming [synchronises specific settings](https://docs.microsoft.com/en-us/azure/active-directory/devices/enterprise-state-roaming-windows-settings-reference).

Before you ask - yes, [User Experience Virtualization](https://docs.microsoft.com/en-us/windows/configuration/ue-v/uev-for-windows) is still a thing. UE-V is a component of Windows 10 Enterprise that can roam a user's application preferences across desktops. UE-V works by defining user profile locations specific to an application and importing and exporting those settings into and out of the profile at login /logout or application launch / close.

## Why

User-driven device provisioning can make a Windows 10 PC, provisioned via Windows Autopilot, ready for the user in about an hour. This includes their applications, and preferences I've covered above.

When a user signs into a new PC, their key Windows and Office settings will sync, but not preferences for any application that Enterprise State Roaming does not manage.

Application preferences *not* roaming to a newly provisioned PC is likely to be a disruptive experience. User Experience Virtualization can be configured to roam those application settings even in a modern management scenario.

Consider a common example such as Google Chrome. Chrome implements its own sync mechanism via Google accounts, but this often means that users will log into Chrome with their personal Google accounts. Further, Chrome and ChromeOS can be managed via [Chrome Enterprise](https://cloud.google.com/chrome-enterprise/browser-management/) where it is possible to use Azure AD as the IdP source. The browser can then be managed across your PC estate; however, this requires a licensing cost. If Google isn't a strategic play, then UE-V can capture Chrome settings and ensure a consistent experience across managed Windows 10 devices.

## How

Azure AD-join and Autopilot enable a consistent provisioning experience for Windows 10 PCs regardless of location, but unlike a traditional domain-joined PC, you lose management features including Group Policy. UE-V would typically be [enabled with Group Policy](https://docs.microsoft.com/en-us/windows/configuration/ue-v/uev-deploy-required-features#enable-the-ue-v-service) and [a file share](https://docs.microsoft.com/en-us/windows/configuration/ue-v/uev-deploy-required-features#deploy-a-ue-v-settings-storage-location), but our target PCs are often not used within the corporate network, so synchronising application preferences between PCs requires another mechanism. Additionally we need to re-think enabling UE-V on the end-point and delivering UE-V templates to those devices.

### OneDrive for Business as a Sync Mechanism

Most organisations [we](https://www.insentra.com.au/) see deploying Windows 10 in a modern management context with Microsoft Intune are also Office 365 customers. This naturally makes OneDrive for Business available as a sync mechanism and it's [a solution that Microsoft even mentions in the UE-V documentation](https://docs.microsoft.com/en-us/windows/configuration/ue-v/uev-sync-methods). Any enterprise file and sync solution could be used including Citrix ShareFile or Dropbox.

### Managing UE-V with Microsoft Intune

To manage UE-V on Windows 10 PCs via Microsoft Intune, we need to implement a few things:

1. Windows 10 Enterprise - UE-V is only a feature of Windows 10 Enterprise devices. This might be implemented by Intune via the [Upgrade Windows 10 Edition configuration profile](https://docs.microsoft.com/en-us/intune/edition-upgrade-configure-windows-10) or via a Microsoft 365 / Windows 10 Enterprise E3/E5 license
2. A PowerShell script to enable the UE-V service and configure a scheduled task to download the UE-V templates
3. A public HTTPS location to host UE-V templates. In my test configuration, I've used an Azure Storage Account so that I can use the [`List Containers`](https://docs.microsoft.com/en-us/rest/api/storageservices/list-containers2) API to query the storage for the templates to download

To this end, I've written [a script to enable UE-V](https://github.com/aaronparker/Intune-Scripts/tree/master/Uev) on managed PCs and setup [a second script](https://github.com/aaronparker/uev/tree/master/scripts) that runs as a scheduled task to download the UE-V templates.

## Deploy the UE-V script via Intune

`New-UevTask.ps1` has been written to initiate the deployment by downloading a second script from blob storage on an Azure Storage account and register a scheduled task that runs the second script to download the UE-V templates.

Deploy the script from Intune and ensure that it runs in the System context:

![Adding the UE-V deployment script via Intune]({{site.baseurl}}/media/2019/06/UevPowerShellScriptIntune.png)

`New-UevTask.ps1` has a `-Uri` parameter that will need to be changed to target a storage account that you manage.

When the script runs on an end-point, it will register the schedule task and run it so that UE-V is enabled.

## UE-V Scheduled Task

`Set-Uev.ps1` is executed by the scheduled task and ensures that the UE-V service is running, configures UE-V to use OneDrive as the sync engine and downloads a set of UE-V templates from blob storage on an Azure Storage account.

`Set-Uev.ps1` also has a `-Uri` parameter that will need to be changed to target a storage account that you manage, that hosts your UE-V templates.

The scheduled task will be located in `Microsoft\UEV` folder:

![UE-V Scheduled Task]({{site.baseurl}}/media/2019/06/UevScheduledTask.png)

The challenge with this approach is that the UE-V service requires a reboot after being enabled. Because PowerShell scripts are not currently [tracked by the Enrollment Status Page](https://docs.microsoft.com/en-us/windows/deployment/windows-autopilot/enrollment-status#installation-progress-tracking), the service will only be enabled after the user signs into the device. An alternative approach would be to create a custom Windows Installer package that enables the service and the scheduled task instead.

## UE-V via OneDrive

The UE-V configuration settings enabled by `Set-Uev.ps` have been sourced from [Settings and data roaming FAQ](https://docs.microsoft.com/en-us/azure/active-directory/devices/enterprise-state-roaming-faqs) and [Set-UevConfiguration](https://docs.microsoft.com/en-us/powershell/module/uev/set-uevconfiguration?view=win10-ps).

| Setting | Value | Notes |
|:--|:--|:--|
| Computer | True | Applies the settings to all users on the computer. |
| DisableSyncProviderPing | True | Disables the synchronization provider from pinging the network. Not needed for OneDrive.  |
| DisableSyncUnlistedWindows8Apps | True | Disables the synchronization of unlisted Windows Store apps. Assuming ESR is used |
| EnableDontSyncWindows8AppSettings | True | UE-V does not synchronize Windows Store app settings. Assuming ESR is used |
| EnableSettingsImportNotify | True | If the settings import takes longer than the amount of time that you specify for the SettingsImportNotifyDelayInSecond parameter, UE-V notifies the user |
| EnableSync | True | UE-V synchronizes the settings that are defined in the settings location templates that you have enabled |
| EnableWaitForSyncOnApplicationStart | True | Ensures that application settings are synced locally and imported before starting the app |
| SettingsStoragePath | %OneDriveCommercial% | Specifies the path of the location where UE-V stores the user settings |
| SyncMethod | External | Tells UE-V that OneDrive will manage sync |
| WaitForSyncTimeoutInMilliseconds | 2000 | This is the default wait timeout value. Test various network scenarios before increasing |

With `%OneDrive%` or `%OneDriveCommercial%` as the target UE-V Settings Storage Path, the user's OneDrive sync folder will host a `SettingsPackages` folder that contains application settings.

![UE-V Settings Packages folder in OneDrive]({{site.baseurl}}/media/2019/06/UevSettingsInOneDrive.PNG)

With OneDrive Files On Demand, settings packages will download as applications are launched. The folder can be set to [always offline with the `attrib` command](https://techcommunity.microsoft.com/t5/Microsoft-OneDrive-Blog/OneDrive-Files-On-Demand-For-The-Enterprise/ba-p/117234).

## Continuous Deployment to Azure Blob Storage

As a location for storing scripts and UE-V templates, Azure Blob storage enables us to create a continuous deployment solution for new UE-V templates and updates to the `Set-Uev.ps1` script.

To perform some basic validation and upload templates and scripts to Azure blob storage, I've setup a continuous deployment solution using GitHub and AppVeyor. You can see how this process works by taking look at my [UE-V repository on GitHub](https://github.com/aaronparker/uev).

The code in the repository manages the process via several components:

1. [Templates](https://github.com/aaronparker/uev/tree/master/templates). These are the UE-V templates that define application settings, created with the [UE-V Generator](https://docs.microsoft.com/en-us/windows/configuration/ue-v/uev-working-with-custom-templates-and-the-uev-generator).
2. [`Set-Uev.ps1`](https://github.com/aaronparker/uev/tree/master/scripts). The script that enables UE-V and downloads templates on the Windows 10 Enterprise end-point
3. [AppVeyor project configuration file](https://github.com/aaronparker/uev/blob/master/appveyor.yml). This defines the [AppVeyor project](https://www.appveyor.com/docs/build-configuration/) that runs validation on the UE-V templates and the `Set-Uev.ps1`. If validation is successful, the [artefacts are uploaded to Azure](https://www.appveyor.com/docs/deployment/azure-blob/)
4. [Tests](https://github.com/aaronparker/uev/tree/master/tests). AppVeyor executes a set of PowerShell scripts that run Pester tests on `Set-Uev.ps1` and validates the UE-V templates against the [schema](https://docs.microsoft.com/en-us/windows/configuration/ue-v/uev-application-template-schema-reference)

Each time a commit and push is made to the repository, [AppVeyor will run tests to validate](https://ci.appveyor.com/project/aaronparker/uev) the templates and script and if successful, upload to Azure blog storage.

![AppVeyor tests output]({{site.baseurl}}/media/2019/06/AppVeyorOutput.png)

### Azure Blob Storage Configuration

For this configuration, I've created an [Azure storage account](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-overview) to store the files on [blob storage](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction). Microsoft provides [5 GB of blob storage free for 12-months](https://azure.microsoft.com/en-gb/free/free-account-faq/), so it's simple to get started.

In my lab environment, I've created two containers - one for the UE-V templates and another to store scripts. 

![Azure blob storage containers]({{site.baseurl}}/media/2019/06/AzureBlobContainers.png)

[Anonymous read access](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-manage-access-to-resources) is enabled on each of these containers, so that `Set-Uev.ps1` and the UE-V templates can be downloaded on end-points, without having to storage secure access keys in each PowerShell script. 

![Azure blob storage container access level configuration]({{site.baseurl}}/media/2019/06/AzureBlobContainerAccessLevel.png) 

To allow AppVeyor to upload to these containers, storage account [access keys can be encrypted](https://www.appveyor.com/docs/how-to/secure-files/). My `appveyor.yml` file contains provider settings that define the Azure blob storage containers and the secured access keys.

```yaml
- provider: AzureBlob
  storage_account_name: stealthpuppy
  storage_access_key:
    secure: No4/BI8lrkv/775GwkL82PPYuaX1hzYa
  container: uevtemplates
  artifact: templates
  unzip: true
  set_content_type: true
  on:
    branch: master
- provider: AzureBlob
  storage_account_name: stealthpuppy
  storage_access_key:
    secure: No4/BI8lrkv/775GwkL82PPYuaX1hzYa
  container: scripts
  artifact: scripts
  unzip: true
  set_content_type: false
  on:
    branch: master
```

## Summary

In this article I've outlined an approach to roaming additional application settings on a Windows 10 modern desktop with User Experience Virtualization and OneDrive for Business.

While Office 365 ProPlus and Windows 10 provides their own mechanisms for roaming user preferences, UE-V can roam preferences for those additional applications that matter to your users. Alternatively, UE-V could handle roaming of all Windows and application settings if you're not keen to use those cloud-native features.

The PowerShell scripts I've provided can be [used with Microsoft Intune](https://docs.microsoft.com/en-us/intune/intune-management-extension) or a 3rd party management tool. Additionally, 3rd party sync tools (e.g., ShareFile or Dropbox) should also work.

In a future article I'll discuss how UE-V can be used to provide a consistent application experience across physical and virtual desktops.
