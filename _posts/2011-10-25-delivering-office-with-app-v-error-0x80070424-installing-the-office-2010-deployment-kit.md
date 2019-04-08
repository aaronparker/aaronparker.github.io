---
id: 2409
title: 'Delivering Office with App-V - Error 0x80070424 installing the Office 2010 Deployment Kit'
date: 2011-10-25T11:30:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/deployment/delivering-office-with-app-v-error-0x80070424-installing-the-office-2010-deployment-kit/
permalink: /delivering-office-with-app-v-error-0x80070424-installing-the-office-2010-deployment-kit/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "452727827"
categories:
  - Applications
tags:
  - App-V
  - Office 2010
---
If you have issues installing the [Office 2010 Deployment Kit for App-V](http://www.microsoft.com/download/en/details.aspx?id=10386) (OffVirt.msi) to install the licensing component for a virtualized Office 2010 package, it may fail to install. A typical command line to install the licensing component look like this:

[code]START /WAIT MSIEXEC /I OffVirt.msi PROPLUS=1 PROJECTPRO=1 VISIOPRO=1[/code]

However, by default OffVirt.msi runs silently and offers no errors, so to troubleshoot we need to log the install to a file (using the /l*v switch). In the log, you might find lines similar to the following:

[code]CAInstallLicenses: OMSICA : Initializing CustomAction CAInstallLicenses  
CAInstallLicenses: Populating the Token Store  
CAInstallLicenses: Installing license: sl.RAC.GENERIC.PRIVATE  
CAInstallLicenses: Error: Failed to open Token Store HResult: 0x80070424.[/code]

Toward the end of the log, the Windows Installer will report a return code of 1603:

[code]CustomAction CAInstallLicenses returned actual error code 1603 (note this may not be 100% accurate if translation happened inside sandbox)[/code]

Fortunately the fix is easy – ensure the correct OffVirt.msi for your target platform is used. Windows x86 requires the 32-bit version and Windows x64 requires the 64-bit version. Note that the version of OffVirt.msi that you use is for the target Windows platform, not the Office 2010 package you have sequenced.