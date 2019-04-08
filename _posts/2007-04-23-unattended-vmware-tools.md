---
id: 56
title: Unattended VMware Tools
date: 2007-04-23T19:21:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/unattended-vmware-tools
permalink: /unattended-vmware-tools/
categories:
  - Automation
tags:
  - Terminal Server
  - VMware
---
Here&#8217;s how to create an unattended installation of VMware Tools which I&#8217;ve aimed specifically at Terminal Servers, however you can apply the same concepts for any Windows server installed under any of the VMware virtualisation products.

### Creating a Transform File

When installing a [Terminal Server on VMware Server or ESX](http://virtrix.blogspot.com/2007/03/vmware-best-practices-for-deploying.html), you need to ensure you do not install the memory control driver. To do this we need to create a custom transform file. I found the easiest way to do this was with Wise InstallTailor, unfortunately this tool is no longer available for free, so here&#8217;s a copy of the transform that I&#8217;ve created, which prevents the Memory Control Driver, Shared Folders and Guest SDK features from installing:

[Transform for VMware Tools for Terminal Servers](http://stealthpuppy.com/wp-content/uploads/2007/04/VMwareTools-TerminalServer.mst)

### Enabling Hardware Acceleration

When you install VMware tools you are prompted to enable video hardware acceleration. Here&#8217;s an ingenious [VBscript from appdeploy.com](http://www.appdeploy.com/packages/detail.asp?id=669) that will set hardware acceleration to Full, thus avoiding VMware tools prompting you to enable this feature.

[code]Const HKEY\_LOCAL\_MACHINE = &H80000002  
Dim RegValueData  
Set objReg=GetObject("winmgmts:{impersonationLevel=impersonate}!\.rootdefault:StdRegProv")

&#8216;Get Path to Acceleration.Level  
objReg.GetStringValue HKEY\_LOCAL\_MACHINE,"HARDWAREDEVICEMAPVIDEO","DeviceVideo0",RegValueData

&#8216;Set Acceleration.Level to Full  
objReg.SetDWORDValue HKEY\_LOCAL\_MACHINE,RIGHT(RegValueData, 82),"Acceleration.Level",0 [/code]

### Installing VMware Tools

Installing VMware tools is straightforward. The following commands will install VMware Tools using the custom transform file and then remove the VMware Tools icon from the system tray, something which I think is essential on a Terminal Server.

[code]START /WAIT MSIEXEC /I "VMware Tools.msi" TRANSFORMS=VMwareTools-TerminalServer.MST ALLUSERS=TRUE REBOOT=SUPRESS /QB-  
REG DELETE HKLMSOFTWAREMicrosoftWindowsCurrentVersionRun /v "VMware Tools" /f[/code]