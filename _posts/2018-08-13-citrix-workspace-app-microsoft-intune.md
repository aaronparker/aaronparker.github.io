---
id: 6126
title: Citrix Workspace app deployed with Microsoft Intune
date: 2018-08-13T14:55:54+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=6126
permalink: /citrix-workspace-app-microsoft-intune/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
image: /media/2018/08/rawpixel-550994-unsplash.jpg
categories:
  - Citrix
tags:
  - Android
  - Citrix Receiver
  - Citrix Workspace
  - Intune
  - iOS
  - macOS
  - Windows
---
Citrix Workspace app is [here to replace Citrix Receiver](https://www.citrix.com/blogs/2018/08/06/the-citrix-workspace-app-our-new-bundle-of-joy-is-born-today/) with a new UI and capabilities (primarily for Citrix Cloud customers). Here's how to deploy it across various supported platforms in a modern management capacity with Microsoft Intune.

## Windows 10

There are multiple deployment options for Workspace app on Windows via Microsoft Intune:

* Workspace app from the Microsoft Store. This version has [some feature limitations](https://docs.citrix.com/en-us/citrix-workspace-app-for-windows-store/downloads/Features_RfWinStore.pdf) but requires the least amount of effort to deploy
* The full Workspace app that provides the best compatibility, but doesn't ship as a Windows Installer file and therefore requires custom solutions to deploy

### Microsoft Store

[Adding the Workspace app from the Microsoft Store](https://docs.microsoft.com/en-us/intune/store-apps-windows) is well documented and should take only 5 minutes to get the app from the Store, synchronise to Intune and [assign the app to your users](https://docs.microsoft.com/en-us/intune/apps-deploy). How's that for done and dusted? - I'm sure you've got better things to do than package and maintain applications.

![Citrix Workspace in the Microsoft Store](https://stealthpuppy.com/media/2018/08/CitrixWorkspace-MicrosoftStore.png)*Citrix Workspace in the Microsoft Store*

The Workspace app can be assigned as available for end-users to install via the Intune Company Portal or required for automatic deployment. Once deployed, the Store will take care of updates, thus there is no further action required by the administrator.

![Citrix Workspace app in the Microsoft Intune Company Portal](https://stealthpuppy.com/media/2018/08/CitrixWorkspace-CompanyPortal.png)*Citrix Workspace app in the Microsoft Intune Company Portal*

If you have already deployed Citrix Receiver from the Microsoft Store via Intune, it should be automatically updated to Citrix Workspace. One they key [feature limitations](https://docs.citrix.com/en-us/citrix-workspace-app-for-windows-store/downloads/Features_RfWinStore.pdf) of the Microsoft Store version is pass-through authentication, so you might need to consider alternative deployment options

### PowerShell

The Workspace app installer is a single executable just it has been with Citrix Receiver. This presents a challenge to deploy Workspace app as a line-of-business application with Intune which requires Win32 applications to be packaged as a single Windows Installer file. PowerShell scripts are a simple alternative, but deploying applications via PowerShell has two key considerations:

* PowerShell scripts can't be applied to computer groups
* PowerShell scripts are executed on devices only when an Azure Active Directory user is signed in to the device

Deploying this way also means that the Workspace app will be deployed regardless of user choice and of course does not support deployment via the Intune Company Portal.

Like we've done [previously with Citrix Receiver](https://stealthpuppy.com/deploy-citrix-receiver-intune/), the Workspace app can be [deployed to Windows 10 machines via Intune with PowerShell](https://docs.microsoft.com/en-us/intune/intune-management-extension) without requiring custom packaging. We need a consistent URL that will always download the latest version of Workspace app and [a command line to perform a silent installation](https://docs.citrix.com/en-us/citrix-workspace-app-for-windows/install/cfg-command-line.html). Your command line options might differ depending on your target environment, but the example script below will download and install the Workspace app.  

```powershell
$Url = "https://downloadplugins.citrix.com/Windows/CitrixWorkspaceApp.exe"
$Target = "$env:SystemRoot\Temp\CitrixWorkspaceApp.exe"
$Arguments = '/AutoUpdateCheck=Auto /AutoUpdateStream=Current /DeferUpdateCount=3 /AURolloutPriority=Slow /NoReboot /Silent EnableCEIP=False'
Start-BitsTransfer -Source $Url -Destination $Target -Priority High -TransferPolicy Always -ErrorAction Continue
Start-Process -FilePath $Target -ArgumentList $Arguments -Wait
```

Once deployed, devices must then [rely on auto-updates](https://docs.citrix.com/en-us/citrix-workspace-app-for-windows/configure/receiver-update.html) to ensure that Workspace app is kept up-to-date. 

### Re-package Citrix Workspace app for Windows Installer

With the right tools and a bit of effort, Citrix Workspace app can be [re-packaged into a single Windows Installer file](https://configmgrblog.com/2017/08/29/how-to-deploy-the-citrix-receiver-for-windows-10-via-microsoft-intune/). Once you've packaged the app with this method you'll need to maintain the package and update it regularly. As with the PowerShell method though, [auto-updates](https://docs.citrix.com/en-us/citrix-workspace-app-for-windows/configure/receiver-update.html) will keep Workspace app up-to-date once deployed.

Is this approach right for you? This requires maintaining and deploying a custom package and is dependent on how the environment is managed and available skillsets. Only you can answer that for your projects or environments. A custom package isn't ideal and I recommend using the Microsoft Store version as the default approach instead.

![Citrix Workspace app extracted Windows Installer files](https://stealthpuppy.com/media/2018/08/CitrixWorkspace-Extracted.png)*Citrix Workspace app extracted Windows Installer files*

### HDX RealTime Media Engine

The [Citrix HDX RealTime Media Engine](https://www.citrix.com/downloads/citrix-receiver/additional-client-software/hdx-realtime-media-engine-25.html) - required for optimising Skype for Business under XenApp and XenDesktop, does come as a single Windows Installer file. This makes it easy then to deploy the engine [to Windows PCs as a Required line-of-business application](https://docs.microsoft.com/en-us/intune/lob-apps-windows) without modification or custom packaging. This will ensure that no user interaction is required to install the engine since most users are unlikely to know what it does anyway.

### Bonus: Citrix Workspace app for Chrome

If you have Google Chrome deployed in your environment and you'd like to deploy the Citrix Workspace app for Chrome, this can be achieved with a PowerShell script that will either deploy it as a preference that users must approve or as a policy that will be automatically pushed out and users will be unable to remove from Chrome.

Google provides detailed documentation on [deploying Chrome extensions on Windows](https://developer.chrome.com/apps/external_extensions#registry).

Here's a basic script to deploy Workspace app for Chrome via PowerShell that uses the app's Chrome Web Store identifier (haiffjcadagjlijoggckpgfnoeiflnem) to tell Chrome to install the app on next launch. This shows both approaches - deploy as a preference or enforced.

```powershell
# Citrix Receiver / Workspace app as a preference
$Path = "Microsoft.PowerShell.Core\Registry::HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Google\Chrome\Extensions"
$Value = "update_url"
$Data = "https://clients2.google.com/service/update2/crx"
$Key = "$Path\haiffjcadagjlijoggckpgfnoeiflnem"
New-Item -Path $Key -ErrorAction SilentlyContinue
New-ItemProperty -Path $Key -Name $Value -Value $Data -Force -ErrorAction SilentlyContinue

# Citrix Receiver / Workspace app as a policy
$Key = "Microsoft.PowerShell.Core\Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Google\Chrome\ExtensionInstallForcelist"
$ExistingValues = (Get-Item -Path $Key).Property
$Value = [int]$ExistingValues[$ExistingValues.Count-1] + 1
$Data = "haiffjcadagjlijoggckpgfnoeiflnem;https://clients2.google.com/service/update2/crx"
New-Item -Path $Key -ErrorAction SilentlyContinue
New-ItemProperty -Path $Key -Name $Value -Value $Data -Force -ErrorAction SilentlyContinue
```

Add the script to the Intune portal and assign to a user group to deploy. Ensure the script runs in the system context because it needs to write to HKLM.

## macOS

The Citrix Workspace app can be [deployed as a line-of-business application](https://docs.microsoft.com/en-us/intune/lob-apps-macos) with Microsoft Intune. The [Workspace app download](https://www.citrix.com.au/downloads/workspace-app/mac/workspace-app-for-mac-latest.html) comes as [an Installer package](https://en.wikipedia.org/wiki/Installer_(macOS)) (inside an [Apple Disk Image](https://en.wikipedia.org/wiki/Apple_Disk_Image)) that can be converted into suitable file format with the [Microsoft Intune App Wrapping Tool](https://github.com/msintuneappsdk/intune-app-wrapping-tool-mac), ready to deploy with Intune.

![The Citrix Workspace app disk image](https://stealthpuppy.com/media/2018/08/CitrixWorkspace-DiskImage.png)*The Citrix Workspace app disk image*

### Convert the Installer

Instructions for converting a .pkg file to a .intunemac file are outlined in the documentation, and the basic process I have followed to convert the Citrix Workspace app installer file is:

1. Download the Intune App Wrapping Tool for Mac executable - `IntuneAppUtil`  - to a local folder. I've downloaded it to `~/bin`.
2. Mark the file as executable. In my example, I've done this with:

```bash
chmod +x ~/bin/IntuneAppUtil
```

3. Optionally copy the `Install Citrix Workspace.pkg` file to a local folder. You should also be able to run the converter against the copy stored in the disk image. In my example, I've copied the installer to `~/Projects/Intune-Apps`. Rename the installer to remove spaces, so rename the file to `InstallCitrixWorkspace.pkg`.

**Note**: Removing the spaces from the installer name before converting is important, otherwise when installing the application, macOS will report the following error and the installing will fail to download and install:

```
MDM Invalid download asset URL https://fef.msua02.manage.microsoft.com/DownloadService/GetAppPassive/MacOS/Install Citrix Workspace.pkg
```

4. Convert the .pkg file into the required .intunemac format with a command similar to the following example - note that the `-o` switch should include a directory path only.

```powershell
~/bin/IntuneAppUtil -c ~/Projects/Intune-Apps/InstallCitrixWorkspace.pkg -o ~/Projects/Intune-Apps -v
```

If successful the command line will look similar to the following screenshot:

![Converting the Citrix Workspace app with IntuneAppUtil](https://stealthpuppy.com/media/2018/08/CitrixWorkspace-IntuneAppUtil.png)*Converting the Citrix Workspace app with IntuneAppUtil*

The Workspace app installer will have been converted into a .intunemac format ready to import into the Intune portal for distributing to users.

![The converted Citrix Workspace app](https://stealthpuppy.com/media/2018/08/CitrixWorkspace-AppFiles.png)*The converted Citrix Workspace app*

### Distribute with Intune

With the prepared package, [create a new line-of-business app in the Intune portal,](https://docs.microsoft.com/en-us/intune/lob-apps-macos) select the .intunemac file and enter application information as follows:

* Name - Citrix Workspace
* Description - copy and paste the [description from Workspace app on the Microsoft Store](https://businessstore.microsoft.com/en-au/store/details/citrix-workspace/9wzdncrfj2kj)
* Publisher - Citrix
* Ignore app version - Yes
* Category - Business or Productivity
* Information URL - https://docs.citrix.com/en-us/citrix-workspace-app-for-mac.html
* Privacy URL - https://www.citrix.com.au/about/legal.html
* Logo - download the Workspace app [icon in PNG format here](https://github.com/Insentra/intune-icons/blob/master/icons/citrix-workspace-app.png)

Once the details have been added, click OK to create the application. I initially had issues with uploading the application on Chrome on macOS. I was successful on Internet Explorer.

![Adding the Citrix Workspace app as a line-of-business app in Microsoft Intune](https://stealthpuppy.com/media/2018/08/CitrixWorkspace-IntunePortal.png)*Adding the Citrix Workspace app as a line-of-business app in Microsoft Intune*

Once the application has been created and assigned to users, it will be available for install in the Intune Company Portal. The application can also be set to required for automatic deployment.

![Citrix Workspace available in the Intune Company Portal on macOS](https://stealthpuppy.com/media/2018/08/CitrixWorkspace-macOSCompanyPortal.png)Citrix Workspace available in the Intune Company Portal on macOS*

Just as on Windows, updates to the Citrix Workspace app can be managed with the inbuilt updater, post-deployment.

### HDX RealTime Media Engine

The Citrix HDX RealTime Media Engine is also available as an installer package that can be converted and deployed the same way as Workspace itself. Citrix Workspace app is now [a 64-bit macOS application](https://support.apple.com/en-au/HT208436) and will, therefore, require a 64-bit version of the HDX RealTime Media Engine. Right now, a [64-bit HDX RealTime Media Engine is in tech preview](https://www.citrix.com.au/downloads/workspace-app/betas-and-tech-previews/hdx-realtime-media-engine-tp-for-mac.html) that can be downloaded, packaged, uploaded as a line-of-business application and assigned.

## iOS

As at the time of writing, Citrix Receiver is still available on the iOS App Store and we should see it updated to Citrix Workspace app soon. [Adding an iOS application in Microsoft Intune](https://docs.microsoft.com/en-us/intune/store-apps-ios) is, fortunately, a simple process:

1. Add an application and choose 'Store app - iOS', then search the app store
2. Search for 'Citrix', 'Citrix Receiver' or 'Citrix Workspace'
3. Choose 'Citrix Receiver' or 'Citrix Workspace' depending on what is returned
4. Save the change and Add the application
5. Assign the application as required

The application will be available in the Intune Company Portal:

![Citrix Workspace for iOS available in the Intune Company Portal](https://stealthpuppy.com/media/2018/08/CitrixWorkspace-iOS.png)*Citrix Workspace for iOS available in the Intune Company Portal*

For existing deployments of Citrix Receiver, they should be updated to Citrix Workspace app automatically.

## Android

### Android Store app

At the time of writing, the Workspace app for Android is not available in the Google Play Store, but [a tech preview is available](https://www.citrix.com.au/downloads/workspace-app/betas-and-tech-previews/workspace-app-tp-for-Android.html) for download as an APK. I would recommend deploying Citrix Receiver via the Google Play Store, but with access to an APK file, you can deploy Android applications directly to enrolled devices as a line-of-business application with Intune.

The process for deploying Citrix Workspace app or Citrix Receiver on Android follows [the standard Android store app deployment steps](https://docs.microsoft.com/en-us/intune/store-apps-android):

1. Add an application and choose 'Store app - Android', then search the app store
2. Name - 'Citrix Workspace' or 'Citrix Receiver'
3. Description - copy and paste the [description from Workspace app on the Microsoft Store](https://businessstore.microsoft.com/en-au/store/details/citrix-workspace/9wzdncrfj2kj)
4. Publisher - Citrix
5. Appstore URL - https://play.google.com/store/apps/details?id=com.citrix.Receiver
6. Minimum operating system - Android 4.4 (Kitkat)
7. Category - Business or Productivity
8. Privacy URL - https://www.citrix.com.au/about/legal.html
9. Logo - download the Workspace app [icon in PNG format here](https://github.com/Insentra/intune-icons/blob/master/icons/citrix-workspace-app.png)

Assign the application and it will be available to users in the Intune Company Portal.

### Android Work Profile app

In the future, it's more likely that organisations will leverage the Android enterprise capabilities, previously known as Android for Work. This also simplifies Android app deployment with a connection between Microsoft Intune and the Google Play store. Once configured, [browse the Google Play store, approve a list of desired apps](https://docs.microsoft.com/en-us/intune/apps-add-android-for-work) and these will then appear for assignment in the Mobile Apps node in Intune.

Here's [Citrix Receiver in the Google Play store](https://play.google.com/work/apps/details?id=com.citrix.Receiver).

![Approving Citrix Receiver in the Google Play store](https://stealthpuppy.com/media/2018/08/CitrixWorkspace-PlayStore.png)Approving Citrix Receiver in the Google Play store*

Once approved, you must choose how new permissions will be approved:

* Keep approved when app requests new permissions - Users will be able to install the updated app. (Default)
* Revoke app approval when this app requests new permissions - App will be removed from the store until it is reapproved.

You can approve and deploy Citrix Receiver today, which should be automatically updated to Citrix Workspace app once it is released.

## Wrap-up

In this article, I've covered the high-level steps required for deployment of the Citrix Workspace app across the various major platforms supported by Microsoft Intune. Mobile platforms, including the Microsoft Store on Windows 10, will require the least amount of administrative effort to configure, deploy and update. For most organisations supporting Windows as their primary platform, even with Microsoft Intune, the choice of deployment solution will depend on Workpace app feature requirements.
