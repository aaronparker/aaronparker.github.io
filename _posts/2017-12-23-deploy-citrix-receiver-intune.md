---
id: 5882
title: Deploy Citrix Receiver to Windows 10 with Intune and PowerShell
date: 2017-12-23T12:47:22+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=5882
permalink: /deploy-citrix-receiver-intune/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "6366873055"
image: /media/2017/12/christian-fregnan-408973.jpg
categories:
  - Microsoft
tags:
  - Citrix Receiver
  - Intune
  - Modern Management
  - Windows 10
---
If you've deployed Windows 10 Modern Management you'll know that some applications present a challenge for deployment, because Windows 10 MDM supports the Win32 applications via a single MSI file only. Applications such as Citrix Receiver, that are a single EXE (that wraps multiple MSI files), can, therefore, be challenging. You can [create a custom wrapper to deploy Receiver](https://configmgrblog.com/2017/08/29/how-to-deploy-the-citrix-receiver-for-windows-10-via-microsoft-intune/), but this requires a packaging tool and some specific knowledge on how to package applications.

Microsoft Intune now [supports deploying PowerShell scripts](https://docs.microsoft.com/en-us/intune/intune-management-extension) to Windows 10 machines, which can provide a more flexible framework for deploying complex applications. For Citrix Reciever, we can use this approach to target Windows 10 PCs for downloading the latest version of Receiver directly from Citrix and [install it with any required command line options](https://docs.citrix.com/en-us/receiver/windows/current-release/install/cfg-command-line.html). This ensures that devices always install the latest version and the Intune administrator only ever has to create a single deployment option via a PowerShell script.

# Citrix Receiver for Windows vs. Citrix Receiver for Windows (Store)

In December 2017, Citrix made available an updated Receiver via the Windows Store that is not a true Universal Windows Platform app, instead, it's the Win32 Receiver converted to a Store app via the [Desktop Bridge](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-root). Deploying this version via Microsoft Intune only requires that you subscribe to the app via the [Microsoft Store for Business](https://businessstore.microsoft.com/), sync with Intune and then target that version for deployment via Intune.

The Citrix Receiver for Windows Store version does have [a number of limitations or unsupported features](https://docs.citrix.com/en-us/receiver/windows-store/current-release/known-issues.html), primarily due to restrictions on apps deployed from the Store. These are:

**Unsupported features**

  1. The following features of Citrix Receiver for Windows are not currently supported in Citrix Receiver for Windows (Store):
  2. Offline apps (virtualized)
  3. File type association
  4. URL redirection
  5. Jabber VXME optimization pack
  6. Generic USB redirection
  7. Proximity/Contactless card (Fast Connect)
  8. Pass-through authentication

**Limitations**

  * The App Commands and Charms options present in the desktop viewer are not available for Citrix Receiver for Windows (Store) edition. For more information, see Knowledge Center article CTX224641.
  * Citrix Receiver for Windows (Store) does not support the SDK functionality. This includes the Virtual Channel SDK, ICA Client Object SDK, and Fast Connect API.
  * You require additional configuration to use the TWAIN virtual scanner with Citrix Receiver for Windows (Store). For more information, see Knowledge Center article CTX230095.
  * On a Windows 10 S device, you cannot collect the CDF trace using the CDFControl tool.
  * URL redirection and its dependent functionalities like Local App Access and Client-hosted apps are not supported.

If you can work without the features above, then use the Store version instead of deploying Receiver via a script, as it allows you to make the application available for end-user initiated installs and simpler application management. If you do need these features, then continue onto deploying Receiver via PowerShell.

# Installing Citrix Receiver

Here's a simple script to detect whether Receiver is installed and if not, download and install Receiver using a specific set of command line options.

<script src="https://gist.github.com/aaronparker/80c251f34c06d7d978ebd8cafa5efa42.js"></script>

The script could be extended with some additional error checking and logging to provide some additional auditing of the installation, but I have tested this successfully.

**[Update Jan 3, 2018]** An improved version of this script can be found in a GitHub repository here: [https://github.com/aaronparker/intune/blob/master/Apps/Install-CitrixReceiver.ps1](https://github.com/aaronparker/intune/blob/master/Apps/Install-CitrixReceiver.ps1)

# Deploying via Intune

Deploying the script via Intune is done just like any other PowerShell script. Save the script locally and then in the Azure Portal, Intune blade, under Device Configuration / PowerShell scripts, add a new script and upload the saved script.

![Adding the Install-CitrixReceiver.ps1 script to Intune](https://stealthpuppy.com/media/2017/12/Script-Adding.png)*Adding the Install-CitrixReceiver.ps1 script to Intune*

Assign the script to an Azure AD group for target users or devices. Your script should then be listed as an assigned script.

![Install-CitrixReceiver.ps1 along side other PowerShell scripts](https://stealthpuppy.com/media/2017/12/All-Scripts.png)*Install-CitrixReceiver.ps1 alongside other PowerShell scripts*

Once deployed, we can track successful installations in the Overview blade. Note that the script will only run once per target device - it should be unlikely that the device will receive the script and have it fail (e.g. fail to download the CitrixReceiver.exe), but there could be edge cases where installation fails as a result of some very specific circumstances.

![Citrix Receiver deployment overview](https://stealthpuppy.com/media/2017/12/Script-Overview.png)*Citrix Receiver deployment overview*

Post-deployment, we can rely on [the updater functionality built into the latest Receiver releases](https://docs.citrix.com/en-us/receiver/windows/current-release/configure/receiver-update.html) to keep end-points up to date.

# Summary

We used a simple approach to the deployment of a non-MSI application to Windows 10 via Intune with a PowerShell script. A simple example that enables deployment of Citrix Receiver with no special packaging and we can be sure that because the end-point downloads Reciever directly from Citrix, the latest version will be deployed each time.
