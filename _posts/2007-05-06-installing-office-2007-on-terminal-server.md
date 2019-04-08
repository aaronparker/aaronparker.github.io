---
id: 49
title: Installing Office 2007 on Terminal Server
date: 2007-05-06T07:18:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/installing-office-2007-on-terminal-server
permalink: /installing-office-2007-on-terminal-server/
thesis_description:
  - What you should know when deploying Office 2007 to Windows Terminal Server
aktt_notify_twitter:
  - 'yes'
views:
  - "1"
dsq_thread_id:
  - "195378353"
categories:
  - Automation
tags:
  - Office-2007
  - Terminal Server
---
When install Office 2007 on your Terminal Servers there are a few things you'll need to be aware of. The first of which is that you will need an [Enterprise or Volume License key](http://support.microsoft.com/kb/828378), i.e. those keys that use [Volume Activation 1.0](http://www.microsoft.com/licensing/resources/vol/default.mspx) and do not require activation. There is also some configuration and installation options that I recommend you set before and after installation.

There are a number of options I recommend setting by using the [Office Customisation Tool](http://technet2.microsoft.com/Office/en-us/library/8faae8a0-a12c-4f7b-839c-24a66a531bb51033.mspx) (SETUP.EXE /ADMIN). These first couple of options aren't really Terminal Server specific and are worth setting for all Office deployments. You can enforce these via Group Policy, however if you configure them with a custom installation they will be the default settings:

  * Disable the Customer Experience Improvement Program from running when users start an Office application: _Modify user settings - Microsoft Office 2007 system / Privacy / Trust Center / Enable Customer Experience Improvement Program_
  * Disable Outlook from prompting users to archive their mailboxes: _Modify user settings - Microsoft Office Outlook 2007 / Tools | Options.. / Other / AutoArchive / AutoArchive Settings_

<img src="https://stealthpuppy.com/wp-content/uploads/2007/05/1000.14.1390.ModifyUserSettings.png" border="0" alt="" /> 

You'll also want to take a look at the feature installation states - set each of these to either ON or OFF, don't set any feature to Install on First Use. A subset of the options I disable when installing Office on a Terminal Server are:

  * Office Shared Features / Proofing Tools / French Proofing Tools / English - French Translation
  * Office Shared Features / Proofing Tools / Spanish Proofing Tools / Spanish - French Translation

<img src="https://stealthpuppy.com/wp-content/uploads/2007/05/1000.14.1391.FeatureInstallationStates.png" border="0" alt="" /> 

The first two options should be disabled as a part of [preventing CTFMON.EXE from running](http://support.microsoft.com/?kbid=823586) in each user session. You will also have to unregister MSCTF.DLL as a part of your installation of Office (`REGSVR32 /S /U MSCTF.DLL`)

One of the cool features of Office 2007 is one that users will appreciate and a tool that you will need to install after Office is installed [Save As PDF or XPS](http://www.microsoft.com/downloads/details.aspx?FamilyID=4d951911-3e7e-4ae6-b059-a2e79ed87041&DisplayLang=en). You can install this tool during a custom installation of Office using the Office Customisation Tool or via a script by running `SaveAsPDFandXPS.exe /QUIET`.

Finally you will have to delete identifying information recorded to the Terminal Server shadow registry key by Setup during installation. Because you now need to use SETUP.EXE to install Office, the Terminal Server will force Install mode before installation can continue. While Install mode is technically not required to install Office on Terminal Server, you will see the user information of the account used to install Office replicated to all users who then run an Office application if you don't delete this key:

`HKLMSOFTWAREMicrosoftWindows NTCurrentVersionTerminal ServerInstallSoftwareMicrosoftOffice`

An install script for Office might look something like this:

[code]@ECHO OFF  
CHANGE USER /INSTALL  
START /WAIT \domain.localdfsapplicationsOffice2007EnterpriseSetup.exe  
CHANGE USER /EXECUTE  
REG DELETE "HKLMSOFTWAREMicrosoftWindows NTCurrentVersionTerminal ServerInstallSoftwareMicrosoftOffice" /f  
REGSVR32 /U %SYSTEMROOT%SYSTEM32MSCTF.DLL /S[/code]

TechNet has more detail on Office 2007 on Terminal Server:

  * [Deploy the 2007 Office system on a Terminal Services-enabled computer](http://technet2.microsoft.com/Office/en-us/library/7e816caa-7c1c-4d78-ac28-693aa4ea58d81033.mspx?mfr=true)
  * [Deploy the 2007 Office System with Terminal Services](http://www.microsoft.com/technet/technetmag/issues/2008/02/OfficeTS/default.aspx)