---
id: 5890
title: Deploy Citrix Receiver to Windows 10 with Intune and PowerShell
date: 2018-01-03T16:23:59+10:00
author: Aaron Parker
layout: revision
guid: https://stealthpuppy.com/5882-autosave-v1/
permalink: /5882-autosave-v1/
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



The script could be extended with some additional error checking and logging to provide some additional auditing of the installation, but I have tested this successfully.

# Deploying via Intune

Deploying the script via Intune is done just like any other PowerShell script. Save the script locally and then in the Azure Portal, Intune blade, under Device Configuration / PowerShell scripts, add a new script and upload the saved script.

<figure id="attachment_5885" aria-describedby="caption-attachment-5885" style="width: 1440px" class="wp-caption aligncenter">[<img class="size-full wp-image-5885" src="https://stealthpuppy.com/wp-content/uploads/2017/12/Script-Adding.png" alt="Adding the Install-CitrixReceiver.ps1 script to Intune" width="1440" height="826" srcset="https://stealthpuppy.com/wp-content/uploads/2017/12/Script-Adding.png 1440w, https://stealthpuppy.com/wp-content/uploads/2017/12/Script-Adding-150x86.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/12/Script-Adding-300x172.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/12/Script-Adding-768x441.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/12/Script-Adding-1024x587.png 1024w" sizes="(max-width: 1440px) 100vw, 1440px" />](https://stealthpuppy.com/wp-content/uploads/2017/12/Script-Adding.png)<figcaption id="caption-attachment-5885" class="wp-caption-text">Adding the Install-CitrixReceiver.ps1 script to Intune*

Assign the script to an Azure AD group for target users or devices. Your script should then be listed as an assigned script. 

<figure id="attachment_5886" aria-describedby="caption-attachment-5886" style="width: 1440px" class="wp-caption aligncenter">[<img class="size-full wp-image-5886" src="https://stealthpuppy.com/wp-content/uploads/2017/12/All-Scripts.png" alt="Install-CitrixReceiver.ps1 along side other PowerShell scripts" width="1440" height="826" srcset="https://stealthpuppy.com/wp-content/uploads/2017/12/All-Scripts.png 1440w, https://stealthpuppy.com/wp-content/uploads/2017/12/All-Scripts-150x86.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/12/All-Scripts-300x172.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/12/All-Scripts-768x441.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/12/All-Scripts-1024x587.png 1024w" sizes="(max-width: 1440px) 100vw, 1440px" />](https://stealthpuppy.com/wp-content/uploads/2017/12/All-Scripts.png)<figcaption id="caption-attachment-5886" class="wp-caption-text">Install-CitrixReceiver.ps1 alongside other PowerShell scripts*

Once deployed, we can track successful installations in the Overview blade. Note that the script will only run once per target device - it should be unlikely that the device will receive the script and have it fail (e.g. fail to download the CitrixReceiver.exe), but there could be edge cases where installation fails as a result of some very specific circumstances.

<figure id="attachment_5887" aria-describedby="caption-attachment-5887" style="width: 1440px" class="wp-caption aligncenter">[<img class="size-full wp-image-5887" src="https://stealthpuppy.com/wp-content/uploads/2017/12/Script-Overview.png" alt="Citrix Receiver deployment overview" width="1440" height="826" srcset="https://stealthpuppy.com/wp-content/uploads/2017/12/Script-Overview.png 1440w, https://stealthpuppy.com/wp-content/uploads/2017/12/Script-Overview-150x86.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/12/Script-Overview-300x172.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/12/Script-Overview-768x441.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/12/Script-Overview-1024x587.png 1024w" sizes="(max-width: 1440px) 100vw, 1440px" />](https://stealthpuppy.com/wp-content/uploads/2017/12/Script-Overview.png)<figcaption id="caption-attachment-5887" class="wp-caption-text">Citrix Receiver deployment overview*

Post-deployment, we can rely on [the updater functionality built into the latest Receiver releases](https://docs.citrix.com/en-us/receiver/windows/current-release/configure/receiver-update.html) to keep end-points up to date.

# Summary

We used a simple approach to the deployment of a non-MSI application to Windows 10 via Intune with a PowerShell script. A simple example that enables deployment of Citrix Receiver with no special packaging and we can be sure that because the end-point downloads Reciever directly from Citrix, the latest version will be deployed each time.