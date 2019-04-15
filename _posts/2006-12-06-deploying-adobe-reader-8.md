---
id: 140
title: Deploying Adobe Reader 8.0
date: 2006-12-06T07:15:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/deploying-adobe-reader-8
permalink: /deploying-adobe-reader-8/
aktt_notify_twitter:
  - 'yes'
categories:
  - Automation
tags:
  - Adobe
---
For an Adobe Reader 9 version of this post, go [here]({{site.baseurl}}/deployment/deploying-adobe-reader-9-for-windows). For an Adobe Reader 8.x version of this post, go [here]({{site.baseurl}}/deployment/deploying-adobe-reader-81).

Now that [Adobe Reader 8 has been released](http://www.adobe.com/products/acrobat/readstep2.html) and the setup routine has changed slightly, we'll have to jump through hoops again to get this new version deployed. Here are a few things that I've found in regards to deployment in a corporate environment:

  * Here's [a direct link to the download](http://ardownload.adobe.com/pub/adobe/reader/win/8.x/8.0/enu/AdbeRdr80_en_US.exe) for Adobe Reader 8.0;
  * The installer weighs in at 20.8Mb;
  * It requires Windows Installer 3.0 and appears to require a minimum of Internet Explorer 6.0;
  * Adobe Reader 8 uses a newer version of the Netopsystems FEAD setup routine;
  * Adobe Customization Wizard 8 is "[coming soon](http://www.adobe.com/uk/products/acrobat/solutions/it/deployment.html)";
  * On Windows Vista, setup files are unpacked to `%USERPROFILE%AppDataLocalLowNetopsystemstempAdobe Reader 8.0`
  * On Windows XP/2003, setup files are unpacked to `%USERPROFILE%\Local SettingsTemp1Adobe Reader 8.0` (The folder 1 may change);
  * After Reader is installed, setup files are located at `%ProgramFilesAdobeReader 8.0Setup Files{AC76BA86-7AD7-1033-7B44-A80000000002}`
  * Setup switches have changed, here's the full list:

|Switch                                                           |Description                                                         |
|-----------------------------------------------------------------|--------------------------------------------------------------------|
|/sAll                                                            |Silent Mode for product                                             |
|/sPB                                                             |Silent Mode with Progress Bar for product                           |
|/rs                                                              |Reboot Suppress                                                     |
|/rps                                                             |Reboot Prompt Suppress                                              |
|/ini "PATH"                                                      |Alternative initialization file                                     |
|/sl "LANG_ID"                                                    |Set Language; LANG_ID - console in decimal digits                   |
|/l                                                               |Enable Error Logging                                                |
|/msi[Command line]                                               |Parameters for MSIEXEC                                              |

  * If you want to perform a silent install directly from the download, use the following command:

`AdbeRdr80\_en\_US.EXE /sPB /rs /rps /msi"ALLUSERS=TRUE EULA\_ACCEPT=YES SUPPRESS\_APP_LAUNCH=YES"`

  * To perform an silent install from the unpacked setup files use the following command:

`SETUP.EXE /sPB /rs /rps /msi"ALLUSERS=TRUE EULA\_ACCEPT=YES SUPPRESS\_APP_LAUNCH=YES"`

or  

`MSIEXEC /I AcroRead.msi ALLUSERS=TRUE EULA\_ACCEPT=YES SUPPRESS\_APP_LAUNCH=YES REBOOT=REALLYSUPRESS /QB-`

  * A second shortcut is now added to the Startup group - **Adobe Reader Synchronizer** as well as the **Adobe Reader Speed Launch** shortcut;
  * At launch, Adobe Reader reads the `HKLMSystemCurrentControlSetControlTerminal Server` registry key. Will it perform differently on a Terminal Server?
  * It appears to launch quite quickly;
  * It also reads this registry key `HKLMSOFTWAREPoliciesAdobeAcrobat Reader8.0FeatureLockdown` which could mean that an ADM/ADMX file exists or is coming to manage Adobe Reader via Group Policy;
  * You can set this DWORD value in the registry: `HKCUSoftwareAdobeAcrobat Reader8.0AVGeneralbDocumentsInTaskbar`, to force Reader to display a separate window for each document, just like Microsoft Office;
  * There are no ads in the toolbar as in previous versions;
  * It includes nice new fancy 256 x 256 pixel icons (click each one for a larger view):

![]({{site.baseurl}}/media/2006/12/1000.14.225.Reader.png)

![]({{site.baseurl}}/media/2006/12/1000.14.226.PDFFile.png) 

There are a lot of things left to find and I'll update this post as I find them.

## UPDATES

  * AppDeploy.com has been updated with an Adobe Reader 8 specific entry: <http://www.appdeploy.com/packages/detail.asp?id=915>
  * Set this DWORD value to 1 `HKEY_LOCAL_MACHINESoftwareAdobeAcrobat Reader8.0DowntownbDontShowAtLaunch`> and this DWORD value to 0 `HKEY_LOCAL_MACHINESoftwareAdobeAcrobat Reader8.0DowntownbGoOnline`>, to supress the Beyond Adobe Reader window and feature;
  * The Adobe Updater is installed along with Reader to here: `%CommonProgramFiles%AdobeUpdater5`>
  * Adobe Updater has created a folder in my Documents folder: `DocumentsUpdater5AdobeUpdaterreader8rdr-en_US`>
  * So Joe... has an excellent post on installing Adobe Reader 8: [A Step-by-Step Guide to Silently Installing and Configuring Adobe Reader 8](http://sojoe.info/2006/12/09/a-step-by-step-guide-to-silently-installing-and-configuring-adobe-reader-8/)
  * Disable the Adobe Updater with the following DWORD (set it to 0x00000001) `HKLMSoftwareAdobeUpdaterEnterprise`. I'm still confirming this one, but I found the registry key on the Adobe knowledgebase site: [Perform a silent installation of Photoshop](http://www.adobe.com/support/techdocs/331261.html)
