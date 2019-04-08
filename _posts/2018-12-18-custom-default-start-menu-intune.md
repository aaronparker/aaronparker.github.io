---
id: 6216
title: Default Start Menu Customisation via Intune
date: 2018-12-18T22:28:30+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=6216
permalink: /custom-default-start-menu-intune/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
image: /wp-content/uploads/2018/12/Windows10ProDefaultStartMenu1080.png
categories:
  - Microsoft
tags:
  - enrolment status page
  - Intune
  - Start Menu
---
The promise of a modern management approach to deployment and management of Windows 10 is that you no longer create and manage a custom SOE image. User experience is still important though and a large part of that experience in an enterprise environment, is the default Start menu.

The default Start menu, especially on Windows 10 Pro, is far from enterprise ready right? Take a look at this mess:<figure class="wp-block-image">

<img src="https://stealthpuppy.com/wp-content/uploads/2018/12/StartMenu-1024x717.png" alt="Windows 10 Pro 1809 default Start menu" class="wp-image-6220" srcset="https://stealthpuppy.com/wp-content/uploads/2018/12/StartMenu-1024x717.png 1024w, https://stealthpuppy.com/wp-content/uploads/2018/12/StartMenu-150x105.png 150w, https://stealthpuppy.com/wp-content/uploads/2018/12/StartMenu-300x210.png 300w, https://stealthpuppy.com/wp-content/uploads/2018/12/StartMenu-768x537.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" /> <figcaption>Windows 10 Pro 1809 default Start menu</figcaption></figure> 

Over-the-air provisioning of PCs via Windows AutoPilot & Azure AD, Microsoft Intune (or insert your MDM solution here), limits the possibilities of customising the target PC before the user logs on. The administrator can [define a Start menu](https://docs.microsoft.com/en-us/windows/configuration/customize-windows-10-start-screens-by-using-mobile-device-management), but that&#8217;s a policy, not a preference. One size does not fit all, and users should be able to customise the Start menu to suit their style. 

UWP / Microsoft Store apps can be targeted for removal, but those apps won&#8217;t be removed until well after login. Compounding the issue of default apps pinned to the Start menu is that some of them aren&#8217;t actually installed, so removal won&#8217;t occur until the Store downloads and installs updates. That can be hours after the user has provisioned the PC.

## Customise with PowerShell?

PowerShell scripts can be used to remove user and system provisioned Store apps (I have a couple of [scripts in my Intune GitHub repository](https://github.com/aaronparker/Intune/tree/master/Appx-Apps)); however, PowerShell scripts in Intune can only be targeted to users and don&#8217;t fire until after the first logon. Additionally, I&#8217;ve had a crack at using [PowerShell to pin and unpin tiles](https://github.com/aaronparker/Intune/blob/master/Start-Menu/PinStartMenuTile.ps1) from the Start menu, but found that I can&#8217;t interact with the shell (or at least the pin / unpin has no effect) when the script is delivered via Intune.

## Looking for Alternatives

With the availability of the [Windows Autopilot Enrolment Status](https://docs.microsoft.com/en-us/windows/deployment/windows-autopilot/enrollment-status) page in Windows 10 1803 and above, plus the recent addition of the feature to &#8216;[Block device use until these required apps are installed](https://docs.microsoft.com/en-us/intune/windows-enrollment-status#block-access-to-a-device-until-a-specific-application-is-installed)&#8216;, we might have an opportunity to [deploy a customised default Start menu](https://docs.microsoft.com/en-us/windows/configuration/customize-and-export-start-layout).

The Enrolment Status page [tracks security policies and line-of-business (MSI) applications](https://docs.microsoft.com/en-us/intune/windows-enrollment-status#enrollment-status-page-tracking-information), so a custom default Start menu will have to be packaged into an MSI. Fingers and toes crossed then that this approach works.

## Packaging a Start menu Customisation

To package a customised Start menu, we need to create the desired layout and [export](https://docs.microsoft.com/en-us/powershell/module/startlayout/export-startlayout?view=win10-ps) it with the`Export-StartLayout`&nbsp;command. It&#8217;s likely you&#8217;re familiar with this approach. To export the Start menu layout, I&#8217;ve used the following command &#8211; note the use of the `UseDesktopApplicationID`&nbsp;switch which will make pinning desktop application shortcuts as tiles successful.

`Export-StartLayout -Path .\LayoutModification.xml -UseDesktopApplicationID`

The next step is to create a custom Windows Installer package to deliver the layout file. I&#8217;m using [Advanced Installer](https://www.advancedinstaller.com/) to create my deployment package. For this particular project, [the Freeware version](https://www.advancedinstaller.com/top-freeware-features.html) of Advanced Installer provides all of the features you&#8217;ll need to deploy the custom layout file.

### Create a Windows Installer Package

Advanced Installer makes short work of creating the package &#8211; create a new Simple Installer package and configure the product name, version and publisher. Note that if you want to update the package, save your project and update the version number each time you produce an updated installer.<figure class="wp-block-image">

[<img src="https://stealthpuppy.com/wp-content/uploads/2018/12/AdvancedInstaller01-ProductDetails-1024x569.png" alt="Advanced Installer package Product details" class="wp-image-6227" srcset="https://stealthpuppy.com/wp-content/uploads/2018/12/AdvancedInstaller01-ProductDetails-1024x569.png 1024w, https://stealthpuppy.com/wp-content/uploads/2018/12/AdvancedInstaller01-ProductDetails-150x83.png 150w, https://stealthpuppy.com/wp-content/uploads/2018/12/AdvancedInstaller01-ProductDetails-300x167.png 300w, https://stealthpuppy.com/wp-content/uploads/2018/12/AdvancedInstaller01-ProductDetails-768x427.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" />](https://stealthpuppy.com/wp-content/uploads/2018/12/AdvancedInstaller01-ProductDetails.png)</figure> 

Add the Start menu layout file to the project under Files and Folders. The project must define the correct target path and file name because it will be deployed into the default profile. Use this path:

`Windows Volume\Users\Default\AppData\Local\Microsoft\Windows\Shell`

And add the `LayoutModification.xml` file that you&#8217;ve exported with `Export-StartLayout` into this path. If your target path and file name aren&#8217;t correct, this won&#8217;t work so ensure your package looks the same as the screenshots here.<figure class="wp-block-image">

[<img src="https://stealthpuppy.com/wp-content/uploads/2018/12/AdvancedInstaller02-FilesFolders-1024x569.png" alt="Adding the Start menu layout file to Files and Folders in Advanced Installer" class="wp-image-6228" srcset="https://stealthpuppy.com/wp-content/uploads/2018/12/AdvancedInstaller02-FilesFolders-1024x569.png 1024w, https://stealthpuppy.com/wp-content/uploads/2018/12/AdvancedInstaller02-FilesFolders-150x83.png 150w, https://stealthpuppy.com/wp-content/uploads/2018/12/AdvancedInstaller02-FilesFolders-300x167.png 300w, https://stealthpuppy.com/wp-content/uploads/2018/12/AdvancedInstaller02-FilesFolders-768x427.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" />](https://stealthpuppy.com/wp-content/uploads/2018/12/AdvancedInstaller02-FilesFolders.png)</figure> 

For this package, I&#8217;ve configured the following install parameters:

  * Package type &#8211; 64-bit package
  * Installation type &#8211; Per-machine only
  * Reboot behaviour &#8211; Suppress all reboots and Reboot prompts<figure class="wp-block-image">

<img src="https://stealthpuppy.com/wp-content/uploads/2018/12/AdvancedInstaller02a-InstallParameters-1024x569.png" alt="Configure Install Parameters in Advanced Installer " class="wp-image-6237" srcset="https://stealthpuppy.com/wp-content/uploads/2018/12/AdvancedInstaller02a-InstallParameters-1024x569.png 1024w, https://stealthpuppy.com/wp-content/uploads/2018/12/AdvancedInstaller02a-InstallParameters-150x83.png 150w, https://stealthpuppy.com/wp-content/uploads/2018/12/AdvancedInstaller02a-InstallParameters-300x167.png 300w, https://stealthpuppy.com/wp-content/uploads/2018/12/AdvancedInstaller02a-InstallParameters-768x427.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" /> </figure> 

Configure the default build to produce a Single MSI file and define the name. In the example below, I&#8217;ve used `DefaultStartMenuLayout.msi`.<figure class="wp-block-image">

[<img src="https://stealthpuppy.com/wp-content/uploads/2018/12/AdvancedInstaller03-Builds-1024x569.png" alt="Configure Advanced Installer to build a single MSI file with all resources embedded" class="wp-image-6229" srcset="https://stealthpuppy.com/wp-content/uploads/2018/12/AdvancedInstaller03-Builds-1024x569.png 1024w, https://stealthpuppy.com/wp-content/uploads/2018/12/AdvancedInstaller03-Builds-150x83.png 150w, https://stealthpuppy.com/wp-content/uploads/2018/12/AdvancedInstaller03-Builds-300x167.png 300w, https://stealthpuppy.com/wp-content/uploads/2018/12/AdvancedInstaller03-Builds-768x427.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" />](https://stealthpuppy.com/wp-content/uploads/2018/12/AdvancedInstaller03-Builds.png)</figure> 

Build your package and add the MSI into Microsoft Intune as [a line-of-business application](https://docs.microsoft.com/en-us/intune/lob-apps-windows). Assign the new application as **Required** for **All Devices**, so that the Enrolment Status Page can track the installation before the user logs on.

## Configure the Enrolment Status Page

To ensure that the package is delivered to the target PCs before the user logs on, we&#8217;ll leverage the Enrolment Status Page (ESP). The ESP is supported on Windows 10 1803 and above, so if you&#8217;ve gotten this far into the article and haven&#8217;t yet updated to 1803 or higher, you should stop reading and update those machines.

Configure the ESP and enable the &#8216;Block device use until these required apps are installed if they are assigned to the user/device&#8217; feature. Here select at least the applications whose shortcuts you have configured in your Start layout customisation. This list must include the MSI package containing the customisation itself.

Here&#8217;s the applications that I&#8217;ve configured in my test environment:<figure class="wp-block-image">

[<img src="https://stealthpuppy.com/wp-content/uploads/2018/12/EnrollmentStatusPage-1024x539.png" alt="Configure the Enrolment Status Page with the list of apps and the default Start menu" class="wp-image-6231" srcset="https://stealthpuppy.com/wp-content/uploads/2018/12/EnrollmentStatusPage-1024x539.png 1024w, https://stealthpuppy.com/wp-content/uploads/2018/12/EnrollmentStatusPage-150x79.png 150w, https://stealthpuppy.com/wp-content/uploads/2018/12/EnrollmentStatusPage-300x158.png 300w, https://stealthpuppy.com/wp-content/uploads/2018/12/EnrollmentStatusPage-768x404.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" />](https://stealthpuppy.com/wp-content/uploads/2018/12/EnrollmentStatusPage.png)</figure> 

Today the ESP [tracks specific application deployments](https://docs.microsoft.com/en-us/windows/deployment/windows-autopilot/enrollment-status) &#8211; Microsoft Store apps and single MSI files, while Office 365 ProPlus applications are tracked on Windows 10 1809 and above.

## User Experience

Most of my testing is on Windows 10 1809 &#8211; with a PC enrolled into Azure AD and Microsoft Intune during the out of box experience, the Enrolment Status Page tracks the installation of policies and applications, including our Start menu customisation.&nbsp;

After the enrollment and deployment is complete, the user sees a customised Start menu after first logon. There&#8217;s a few tiles that didn&#8217;t remain pinned from the default customisation, but this is much cleaner and enterprise ready than what we end up with out of the box.<figure class="wp-block-image">

<img src="https://stealthpuppy.com/wp-content/uploads/2018/12/UserDeployment-StartMenu-976x1024.png" alt="" class="wp-image-6235" srcset="https://stealthpuppy.com/wp-content/uploads/2018/12/UserDeployment-StartMenu-976x1024.png 976w, https://stealthpuppy.com/wp-content/uploads/2018/12/UserDeployment-StartMenu-143x150.png 143w, https://stealthpuppy.com/wp-content/uploads/2018/12/UserDeployment-StartMenu-286x300.png 286w, https://stealthpuppy.com/wp-content/uploads/2018/12/UserDeployment-StartMenu-768x806.png 768w, https://stealthpuppy.com/wp-content/uploads/2018/12/UserDeployment-StartMenu.png 1296w" sizes="(max-width: 976px) 100vw, 976px" /> </figure> 

## Wrapping Up

Provisioning PCs via Windows AutoPilot and Microsoft Intune is a rapidly changing landscape. So what may not be possible today, is likely to be addressed quickly. In the meantime, there&#8217;s usually a custom approach to achieving the end-user experience that you need and this is a great example.&nbsp;