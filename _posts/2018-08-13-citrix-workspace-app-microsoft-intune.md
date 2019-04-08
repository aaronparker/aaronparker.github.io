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
image: /wp-content/uploads/2018/08/rawpixel-550994-unsplash.jpg
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
Citrix Workspace app is [here to replace Citrix Receiver](https://www.citrix.com/blogs/2018/08/06/the-citrix-workspace-app-our-new-bundle-of-joy-is-born-today/) with a new UI and capabilities (primarily for Citrix Cloud customers). Here&#8217;s how to deploy it across various supported platforms in a modern management capacity with Microsoft Intune.

[toc]

# Windows 10

There are multiple deployment options for Workspace app on Windows via Microsoft Intune:

  * Workspace app from the Microsoft Store. This version has [some feature limitations](https://docs.citrix.com/en-us/citrix-workspace-app-for-windows-store/downloads/Features_RfWinStore.pdf) but requires the least amount of effort to deploy
  * The full Workspace app that provides the best compatibility, but doesn&#8217;t ship as a Windows Installer file and therefore requires custom solutions to deploy

## Microsoft Store

[Adding the Workspace app from the Microsoft Store](https://docs.microsoft.com/en-us/intune/store-apps-windows) is well documented and should take only 5 minutes to get the app from the Store, synchronise to Intune and [assign the app to your users](https://docs.microsoft.com/en-us/intune/apps-deploy). How&#8217;s that for done and dusted? &#8211; I&#8217;m sure you&#8217;ve got better things to do than package and maintain applications.

<figure id="attachment_6136" aria-describedby="caption-attachment-6136" style="width: 2880px" class="wp-caption aligncenter">[<img class="size-full wp-image-6136" src="https://stealthpuppy.com/wp-content/uploads/2018/08/CitrixWorkspace-MicrosoftStore.png" alt="Citrix Workspace in the Microsoft Store" width="2880" height="1652" srcset="http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-MicrosoftStore.png 2880w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-MicrosoftStore-150x86.png 150w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-MicrosoftStore-300x172.png 300w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-MicrosoftStore-768x441.png 768w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-MicrosoftStore-1024x587.png 1024w" sizes="(max-width: 2880px) 100vw, 2880px" />](https://stealthpuppy.com/wp-content/uploads/2018/08/CitrixWorkspace-MicrosoftStore.png)<figcaption id="caption-attachment-6136" class="wp-caption-text">Citrix Workspace in the Microsoft Store</figcaption></figure>

The Workspace app can be assigned as available for end-users to install via the Intune Company Portal or required for automatic deployment. Once deployed, the Store will take care of updates, thus there is no further action required by the administrator.

<figure id="attachment_6128" aria-describedby="caption-attachment-6128" style="width: 2343px" class="wp-caption aligncenter">[<img class="size-full wp-image-6128" src="https://stealthpuppy.com/wp-content/uploads/2018/08/CitrixWorkspace-CompanyPortal.png" alt="Citrix Workspace app in the Microsoft Intune Company Portal" width="2343" height="1374" srcset="http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-CompanyPortal.png 2343w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-CompanyPortal-150x88.png 150w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-CompanyPortal-300x176.png 300w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-CompanyPortal-768x450.png 768w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-CompanyPortal-1024x601.png 1024w" sizes="(max-width: 2343px) 100vw, 2343px" />](https://stealthpuppy.com/wp-content/uploads/2018/08/CitrixWorkspace-CompanyPortal.png)<figcaption id="caption-attachment-6128" class="wp-caption-text">Citrix Workspace app in the Microsoft Intune Company Portal</figcaption></figure>

If you have already deployed Citrix Receiver from the Microsoft Store via Intune, it should be automatically updated to Citrix Workspace. One they key [feature limitations](https://docs.citrix.com/en-us/citrix-workspace-app-for-windows-store/downloads/Features_RfWinStore.pdf) of the Microsoft Store version is pass-through authentication, so you might need to consider alternative deployment options

## PowerShell

The Workspace app installer is a single executable just it has been with Citrix Receiver. This presents a challenge to deploy Workspace app as a line-of-business application with Intune which requires Win32 applications to be packaged as a single Windows Installer file. PowerShell scripts are a simple alternative, but deploying applications via PowerShell has two key considerations:

  * PowerShell scripts can&#8217;t be applied to computer groups
  * PowerShell scripts are executed on devices only when an Azure Active Directory user is signed in to the device

Deploying this way also means that the Workspace app will be deployed regardless of user choice and of course does not support deployment via the Intune Company Portal.

Like we&#8217;ve done [previously with Citrix Receiver](https://stealthpuppy.com/deploy-citrix-receiver-intune/), the Workspace app can be [deployed to Windows 10 machines via Intune with PowerShell](https://docs.microsoft.com/en-us/intune/intune-management-extension) without requiring custom packaging. We need a consistent URL that will always download the latest version of Workspace app and [a command line to perform a silent installation](https://docs.citrix.com/en-us/citrix-workspace-app-for-windows/install/cfg-command-line.html). Your command line options might differ depending on your target environment, but the example script below will download and install the Workspace app.&nbsp;&nbsp;

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">$Url = "https://downloadplugins.citrix.com/Windows/CitrixWorkspaceApp.exe"
$Target = "$env:SystemRoot\Temp\CitrixWorkspaceApp.exe"
$Arguments = '/AutoUpdateCheck=Auto /AutoUpdateStream=Current /DeferUpdateCount=3 /AURolloutPriority=Slow /NoReboot /Silent EnableCEIP=False'
Start-BitsTransfer -Source $Url -Destination $Target -Priority High -TransferPolicy Always -ErrorAction Continue
Start-Process -FilePath $Target -ArgumentList $Arguments -Wait</pre>

Once deployed, devices must then [rely on auto-updates](https://docs.citrix.com/en-us/citrix-workspace-app-for-windows/configure/receiver-update.html) to ensure that Workspace app is kept up-to-date.&nbsp;

## Re-package Citrix Workspace app for Windows Installer

With the right tools and a bit of effort, Citrix Workspace app can be [re-packaged into a single Windows Installer file](https://configmgrblog.com/2017/08/29/how-to-deploy-the-citrix-receiver-for-windows-10-via-microsoft-intune/). Once you&#8217;ve packaged the app with this method you&#8217;ll need to maintain the package and update it regularly. As with the PowerShell method though, [auto-updates](https://docs.citrix.com/en-us/citrix-workspace-app-for-windows/configure/receiver-update.html) will keep Workspace app up-to-date once deployed.

Is this approach right for you? This requires maintaining and deploying a custom package and is dependent on how the environment is managed and available skillsets. Only you can answer that for your projects or environments. A custom package isn&#8217;t ideal and I recommend using the Microsoft Store version as the default approach instead.

[<img class="size-full wp-image-6140" src="https://stealthpuppy.com/wp-content/uploads/2018/08/CitrixWorkspace-Extracted.png" alt="Citrix Workspace app extracted Windows Installer files" width="1996" height="871" srcset="http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-Extracted.png 1996w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-Extracted-150x65.png 150w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-Extracted-300x131.png 300w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-Extracted-768x335.png 768w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-Extracted-1024x447.png 1024w" sizes="(max-width: 1996px) 100vw, 1996px" />](https://stealthpuppy.com/wp-content/uploads/2018/08/CitrixWorkspace-Extracted.png)

Citrix Workspace app extracted Windows Installer files

## HDX RealTime Media Engine

The [Citrix HDX RealTime Media Engine](https://www.citrix.com/downloads/citrix-receiver/additional-client-software/hdx-realtime-media-engine-25.html) &#8211; required for optimising Skype for Business under XenApp and XenDesktop, does come as a single Windows Installer file. This makes it easy then to deploy the engine [to Windows PCs as a Required line-of-business application](https://docs.microsoft.com/en-us/intune/lob-apps-windows) without modification or custom packaging. This will ensure that no user interaction is required to install the engine since most users are unlikely to know what it does anyway.

## Bonus:&nbsp;Citrix Workspace app for Chrome

If&nbsp;you have Google Chrome deployed in your environment and you&#8217;d like to deploy the&nbsp;Citrix Workspace app for Chrome, this can be achieved with a PowerShell script that will either deploy it as a preference that users must approve or as a policy that will be automatically pushed out and users will be unable to remove from Chrome.

Google provides detailed documentation on [deploying Chrome extensions on Windows](https://developer.chrome.com/apps/external_extensions#registry).

Here&#8217;s a basic script to deploy Workspace app for Chrome via PowerShell that uses the app&#8217;s Chrome Web Store identifier (haiffjcadagjlijoggckpgfnoeiflnem) to tell Chrome to install the app on next launch. This shows both approaches &#8211; deploy as a preference or enforced.

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption=""># Citrix Receiver / Workspace app as a preference
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
New-ItemProperty -Path $Key -Name $Value -Value $Data -Force -ErrorAction SilentlyContinue</pre>

Add the script to the Intune portal and assign to a user group to deploy. Ensure the script runs in the system context because it needs to write to HKLM.

# macOS

The Citrix Workspace app can be [deployed as a line-of-business application](https://docs.microsoft.com/en-us/intune/lob-apps-macos) with Microsoft Intune. The [Workspace app download](https://www.citrix.com.au/downloads/workspace-app/mac/workspace-app-for-mac-latest.html) comes as [an Installer package](https://en.wikipedia.org/wiki/Installer_(macOS))&nbsp;(inside an [Apple Disk Image](https://en.wikipedia.org/wiki/Apple_Disk_Image)) that can be converted into suitable file format with the&nbsp;[Microsoft Intune App Wrapping Tool](https://github.com/msintuneappsdk/intune-app-wrapping-tool-mac), ready to deploy with Intune.

<figure id="attachment_6133" aria-describedby="caption-attachment-6133" style="width: 1024px" class="wp-caption aligncenter">[<img class="size-full wp-image-6133" src="https://stealthpuppy.com/wp-content/uploads/2018/08/CitrixWorkspace-DiskImage.png" alt="The Citrix Workspace app disk image" width="1024" height="1014" srcset="http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-DiskImage.png 1024w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-DiskImage-150x150.png 150w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-DiskImage-300x297.png 300w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-DiskImage-768x761.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" />](https://stealthpuppy.com/wp-content/uploads/2018/08/CitrixWorkspace-DiskImage.png)<figcaption id="caption-attachment-6133" class="wp-caption-text">The Citrix Workspace app disk image</figcaption></figure>

## Convert the Installer

Instructions for converting a .pkg file to a .intunemac file are outlined in the documentation, and the basic process I have followed to convert the Citrix Workspace app installer file is:

  1. Download the&nbsp;Intune App Wrapping Tool for Mac executable &#8211;&nbsp;<code class="prettyprint lang-plain_text" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">IntuneAppUtil</code>&nbsp; &#8211; to a local folder. I&#8217;ve downloaded it to&nbsp;<code class="prettyprint lang-plain_text" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">~/bin</code>.
  2. Mark the file as executable. In my example, I&#8217;ve done this with:

<pre class="prettyprint lang-plain_text" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">chmod +x ~/bin/IntuneAppUtil</pre>

<ol start="3">
  <li>
    Optionally copy the&nbsp;<code class="prettyprint lang-plain_text" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">Install Citrix Workspace.pkg</code>&nbsp;file to a local folder. You should also be able to run the converter against the copy stored in the disk image. In my example, I&#8217;ve copied the installer to <code class="prettyprint lang-plain_text" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">~/Projects/Intune-Apps</code>.&nbsp;Rename the installer to remove spaces, so rename the file to <code class="prettyprint lang-javascript" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">InstallCitrixWorkspace.pkg</code>.
  </li>
</ol>

**Note**: Removing the spaces from the installer name before converting is important, otherwise when installing the application, macOS will report the following error and the installing will fail to download and install:

> <p class="p1">
>   MDM Invalid download asset URL https://fef.msua02.manage.microsoft.com/DownloadService/GetAppPassive/MacOS/Install Citrix Workspace.pkg
> </p>

<ol start="4">
  <li>
    Convert the .pkg file into the required .intunemac format with a command similar to the following example &#8211; note that the&nbsp;<code class="prettyprint lang-plain_text" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">-o</code>&nbsp;switch should include a directory path only.
  </li>
</ol>

<pre class="prettyprint lang-plain_text" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">~/bin/IntuneAppUtil -c ~/Projects/Intune-Apps/InstallCitrixWorkspace.pkg -o ~/Projects/Intune-Apps -v</pre>

If successful the command line will look similar to the following screenshot:

<figure id="attachment_6130" aria-describedby="caption-attachment-6130" style="width: 2820px" class="wp-caption aligncenter">[<img class="size-full wp-image-6130" src="https://stealthpuppy.com/wp-content/uploads/2018/08/CitrixWorkspace-IntuneAppUtil.png" alt="Converting the Citrix Workspace app with IntuneAppUtil" width="2820" height="1404" srcset="http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-IntuneAppUtil.png 2820w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-IntuneAppUtil-150x75.png 150w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-IntuneAppUtil-300x149.png 300w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-IntuneAppUtil-768x382.png 768w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-IntuneAppUtil-1024x510.png 1024w" sizes="(max-width: 2820px) 100vw, 2820px" />](https://stealthpuppy.com/wp-content/uploads/2018/08/CitrixWorkspace-IntuneAppUtil.png)<figcaption id="caption-attachment-6130" class="wp-caption-text">Converting the Citrix Workspace app with IntuneAppUtil</figcaption></figure>

The Workspace app installer will have been converted into a .intunemac format ready to import into the Intune portal for distributing to users.

<figure id="attachment_6131" aria-describedby="caption-attachment-6131" style="width: 2130px" class="wp-caption aligncenter">[<img class="size-full wp-image-6131" src="https://stealthpuppy.com/wp-content/uploads/2018/08/CitrixWorkspace-AppFiles.png" alt="The converted Citrix Workspace app" width="2130" height="960" srcset="http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-AppFiles.png 2130w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-AppFiles-150x68.png 150w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-AppFiles-300x135.png 300w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-AppFiles-768x346.png 768w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-AppFiles-1024x462.png 1024w" sizes="(max-width: 2130px) 100vw, 2130px" />](https://stealthpuppy.com/wp-content/uploads/2018/08/CitrixWorkspace-AppFiles.png)<figcaption id="caption-attachment-6131" class="wp-caption-text">The converted Citrix Workspace app</figcaption></figure>

## Distribute with Intune

With the prepared package, [create a new line-of-business app in the Intune portal,](https://docs.microsoft.com/en-us/intune/lob-apps-macos)&nbsp;select the .intunemac file and enter application information as follows:

  * Name &#8211; Citrix Workspace
  * Description &#8211; copy and paste the [description from Workspace app on the Microsoft Store](https://businessstore.microsoft.com/en-au/store/details/citrix-workspace/9wzdncrfj2kj)
  * Publisher &#8211; Citrix
  * Ignore app version &#8211; Yes
  * Category &#8211; Business or Productivity
  * Information URL &#8211;&nbsp;https://docs.citrix.com/en-us/citrix-workspace-app-for-mac.html
  * Privacy URL &#8211;&nbsp;https://www.citrix.com.au/about/legal.html
  * Logo &#8211; download the Workspace app [icon in PNG format here](https://github.com/Insentra/intune-icons/blob/master/icons/citrix-workspace-app.png)

Once the details have been added, click OK to create the application. I initially had issues with uploading the application on Chrome on macOS. I was successful on Internet Explorer.

<figure id="attachment_6132" aria-describedby="caption-attachment-6132" style="width: 3840px" class="wp-caption aligncenter">[<img class="size-full wp-image-6132" src="https://stealthpuppy.com/wp-content/uploads/2018/08/CitrixWorkspace-IntunePortal.png" alt="Adding the Citrix Workspace app as a line-of-business app in Microsoft Intune" width="3840" height="2012" srcset="http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-IntunePortal.png 3840w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-IntunePortal-150x79.png 150w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-IntunePortal-300x157.png 300w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-IntunePortal-768x402.png 768w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-IntunePortal-1024x537.png 1024w" sizes="(max-width: 3840px) 100vw, 3840px" />](https://stealthpuppy.com/wp-content/uploads/2018/08/CitrixWorkspace-IntunePortal.png)<figcaption id="caption-attachment-6132" class="wp-caption-text">Adding the Citrix Workspace app as a line-of-business app in Microsoft Intune</figcaption></figure>

Once the application has been created and assigned to users, it will be available for install in the Intune Company Portal. The application can also be set to required for automatic deployment.

<figure id="attachment_6142" aria-describedby="caption-attachment-6142" style="width: 912px" class="wp-caption aligncenter">[<img class="size-full wp-image-6142" src="https://stealthpuppy.com/wp-content/uploads/2018/08/CitrixWorkspace-macOSCompanyPortal.png" alt="Citrix Workspace available in the Intune Company Portal on macOS" width="912" height="742" srcset="http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-macOSCompanyPortal.png 912w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-macOSCompanyPortal-150x122.png 150w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-macOSCompanyPortal-300x244.png 300w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-macOSCompanyPortal-768x625.png 768w" sizes="(max-width: 912px) 100vw, 912px" />](https://stealthpuppy.com/wp-content/uploads/2018/08/CitrixWorkspace-macOSCompanyPortal.png)<figcaption id="caption-attachment-6142" class="wp-caption-text">Citrix Workspace available in the Intune Company Portal on macOS</figcaption></figure>

Just as on Windows, updates to the Citrix Workspace app can be managed with the inbuilt updater, post-deployment.

## HDX RealTime Media Engine

The Citrix HDX RealTime Media Engine is also available as an installer package that can be converted and deployed the same way as Workspace itself. Citrix Workspace app is now [a 64-bit macOS application](https://support.apple.com/en-au/HT208436) and will, therefore, require a 64-bit version of the HDX RealTime Media Engine. Right now, a [64-bit HDX RealTime Media Engine is in tech preview](https://www.citrix.com.au/downloads/workspace-app/betas-and-tech-previews/hdx-realtime-media-engine-tp-for-mac.html) that can be downloaded, packaged, uploaded as a line-of-business application and assigned.

# iOS

As at the time of writing, Citrix Receiver is still available on the iOS App Store and we should see it updated to Citrix Workspace app soon. [Adding an iOS application in Microsoft Intune](https://docs.microsoft.com/en-us/intune/store-apps-ios) is, fortunately, a simple process:

  1. Add an application and choose &#8216;Store app &#8211; iOS&#8217;, then search the app store
  2. Search for &#8216;Citrix&#8217;, &#8216;Citrix Receiver&#8217; or &#8216;Citrix Workspace&#8217;
  3. Choose &#8216;Citrix Receiver&#8217; or &#8216;Citrix Workspace&#8217; depending on what is returned
  4. Save the change and Add the application
  5. Assign the application as required&nbsp;

The application will be available in the Intune Company Portal:

<figure id="attachment_6150" aria-describedby="caption-attachment-6150" style="width: 750px" class="wp-caption aligncenter">[<img class="size-full wp-image-6150" src="https://stealthpuppy.com/wp-content/uploads/2018/08/CitrixWorkspace-iOS.png" alt="Citrix Workspace for iOS available in the Intune Company Portal" width="750" height="1334" srcset="http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-iOS.png 750w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-iOS-84x150.png 84w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-iOS-169x300.png 169w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-iOS-576x1024.png 576w" sizes="(max-width: 750px) 100vw, 750px" />](https://stealthpuppy.com/wp-content/uploads/2018/08/CitrixWorkspace-iOS.png)<figcaption id="caption-attachment-6150" class="wp-caption-text">Citrix Workspace for iOS available in the Intune Company Portal</figcaption></figure>

For existing deployments of Citrix Receiver, they should be updated to Citrix Workspace app automatically.

# Android

## Android Store app

At the time of writing, the Workspace app for Android is not available in the Google Play Store, but [a tech preview is available](https://www.citrix.com.au/downloads/workspace-app/betas-and-tech-previews/workspace-app-tp-for-Android.html) for download as an APK. I would recommend deploying Citrix Receiver via the Google Play Store, but with access to an APK file, you can deploy Android applications directly to enrolled devices as a line-of-business application with Intune.

The process for deploying Citrix Workspace app or Citrix Receiver on Android follows [the standard Android store app deployment steps](https://docs.microsoft.com/en-us/intune/store-apps-android):

  1. Add an application and choose &#8216;Store app &#8211; Android&#8217;, then search the app store
  2. Name &#8211; &#8216;Citrix Workspace&#8217; or &#8216;Citrix Receiver&#8217;
  3. Description &#8211; copy and paste the [description from Workspace app on the Microsoft Store](https://businessstore.microsoft.com/en-au/store/details/citrix-workspace/9wzdncrfj2kj)
  4. Publisher &#8211; Citrix
  5. Appstore URL &#8211;&nbsp;https://play.google.com/store/apps/details?id=com.citrix.Receiver
  6. Minimum operating system &#8211; Android 4.4 (Kitkat)
  7. Category &#8211; Business or Productivity
  8. Privacy URL &#8211;&nbsp;https://www.citrix.com.au/about/legal.html
  9. Logo &#8211; download the Workspace app [icon in PNG format here](https://github.com/Insentra/intune-icons/blob/master/icons/citrix-workspace-app.png)

Assign the application and it will be available to users in the Intune Company Portal.

## Android Work Profile app

In the future, it&#8217;s more likely that organisations will leverage the Android enterprise capabilities, previously known as Android for Work. This also simplifies Android app deployment with a connection between Microsoft Intune and the Google Play store. Once configured, [browse the Google Play store, approve a list of desired apps](https://docs.microsoft.com/en-us/intune/apps-add-android-for-work) and these will then appear for assignment in the Mobile Apps node in Intune.

Here&#8217;s [Citrix Receiver in the Google Play store](https://play.google.com/work/apps/details?id=com.citrix.Receiver).

<figure id="attachment_6154" aria-describedby="caption-attachment-6154" style="width: 2880px" class="wp-caption aligncenter">[<img class="size-full wp-image-6154" src="https://stealthpuppy.com/wp-content/uploads/2018/08/CitrixWorkspace-PlayStore.png" alt="Approving Citrix Receiver in the Google Play store" width="2880" height="1652" srcset="http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-PlayStore.png 2880w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-PlayStore-150x86.png 150w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-PlayStore-300x172.png 300w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-PlayStore-768x441.png 768w, http://192.168.0.89/wp-content/uploads/2018/08/CitrixWorkspace-PlayStore-1024x587.png 1024w" sizes="(max-width: 2880px) 100vw, 2880px" />](https://stealthpuppy.com/wp-content/uploads/2018/08/CitrixWorkspace-PlayStore.png)<figcaption id="caption-attachment-6154" class="wp-caption-text">Approving Citrix Receiver in the Google Play store</figcaption></figure>

Once approved, you must choose how new permissions will be approved:

  * Keep approved when app requests new permissions &#8211; Users will be able to install the updated app. (Default)
  * Revoke app approval when this app requests new permissions &#8211; App will be removed from the store until it is reapproved.

You can approve and deploy Citrix Receiver today, which should be automatically updated to Citrix Workspace app once it is released.

# Wrap-up

In this article, I&#8217;ve covered the high-level steps required for deployment of the Citrix Workspace app across the various major platforms supported by Microsoft Intune. Mobile platforms, including the Microsoft Store on Windows 10, will require the least amount of administrative effort to configure, deploy and update. For most organisations supporting Windows as their primary platform, even with Microsoft Intune, the choice of deployment solution will depend on Workpace app feature requirements.