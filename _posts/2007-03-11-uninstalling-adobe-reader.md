---
id: 83
title: Uninstalling Adobe Reader
date: 2007-03-11T20:27:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/uninstalling-adobe-reader
permalink: /uninstalling-adobe-reader/
dsq_thread_id:
  - "195378578"
categories:
  - Automation
tags:
  - Adobe
  - Unattended
---
If for whatever reason you are looking to remove Adobe Reader from your computers, here&#8217;s how to remove these applications via a script or some other unattended means. I have tested this with Adobe Reader 6.0.1, 7.0.9 and 8.0 which are all readily available from the Adobe web site and all use Windows Installer. I was also able to test Adobe Reader 5.1 which utilises a standard setup application from InstallShield.

I was able to gather the uninstall information from the information that is displayed in Add or Remove Programs. This is located in the registry at _HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall_. Each application will have a key below this key that will include information on modifying or removing the application.

### Adobe Reader 5.1

The program information is located at _HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\Adobe Acrobat 5.0_. Here&#8217;s how to perform a silent uninstall of the application:

[code]C:\WINDOWS\ISUNINST.EXE -y -x -f"C:\Program Files\Common Files\Adobe\Acrobat 5.0\NT\Uninst.isu" -c"C:\Program Files\Common Files\Adobe\Acrobat 5.0\NT\Uninst.dll" [/code]

This command line should work with all versions of Adobe Reader 5.x. For more information on ISUNINST.EXE command line parameters, see the article on the InstallShield site: [INFO: What Command Line Parameters Are Available for IsUninst.exe?](http://support.installshield.com/kb/view.asp?articleid=q100021)

### Adobe Reader 6.0.1

With Reader 6, Adobe started using Windows Installer. This means that each version of the application will have a GUID listed in the registry. For Adobe Reader 6.0.1 this is _HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\{AC76BA86-7AD7-1033-7B44-A00000000001}_. For other versions of 6 you will need to check the GUID because this will have changed. This command line will perform a silent uninstall of Adobe Reader 6.0.1 only displaying a progress bar:

[code]MSIEXEC /UNINSTALL {AC76BA86-7AD7-1033-7B44-A00000000001} REBOOT=SUPRESS /QB- [/code]

### Adobe Reader 7.0.9

For Adobe Reader 7 here is the uninstall registry key: _HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\{AC76BA86-7AD7-1033-7B44-A70900000002}_. This is similar to version 6, but with this version you can see that the GUID contains the application version (A709). So if you have other versions of Reader 7 installed you should be able change the GUID to match the version number. Here&#8217;s the uninstall command:

[code]MSIEXEC /UNINSTALL {AC76BA86-7AD7-1033-7B44-A70900000002} REBOOT=SUPRESS /QB- [/code]

### Adobe Reader 8.0

If you&#8217;re already looking to uninstall Reader 8, here&#8217;s the uninstall key: _HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\{AC76BA86-7AD7-1033-7B44-A80000000002}_. Just like version 7 the application version is included in the GUID and should be updated as we see point releases for this version.

[code]MSIEXEC /UNINSTALL {AC76BA86-7AD7-1033-7B44-A80000000002} REBOOT=SUPRESS /QB- [/code]

### Uninstall Strategies

I should note that if you are deploying Adobe Reader 7 or 8, earlier versions of Adobe Reader (6 and 7 only) will be removed before the newer version is installed. If you are upgrading from version 5, you will end up with both versions installed as 5 will not be automatically uninstalled.

To remove these applications you will have to look at something like SMS or Altiris Deployment Solution to perform the command line on each machine. You could also look at creating a custom Windows Installer package with Wise Package Studio or FLEXnet InstallShield to run the command line.

I also tested a remote uninstall using [PSEXEC from Sysinternals](http://www.microsoft.com/technet/sysinternals/ProcessesAndThreads/PsExec.mspx). Uninstalling Adobe Reader 5 in this manner just didn&#8217;t get far as the ISUNINST.EXE process just sat there indefinitely, but remotely uninstalling Adobe Reader 7 was successful. This is the command line I used, nice and simple:

[code]PSEXEC \\REMOTEMACHINE MSIEXEC /UNINSTALL {AC76BA86-7AD7-1033-7B44-A70900000002} REBOOT=SUPRESS /QB-[/code]

**Update 1**: Thanks to David, here are the commands for uninstalling Adobe Reader 3.0 and 4.0:

### Adobe Reader 3.x

[code]C:\WINDOWS\uninst.exe -fC:\Acrobat3\Reader\DeIsL1.isu[/code]

### Adobe Reader 4.0

[code]C:\WINDOWS\ISUNINST.EXE -f"C:\Program Files\Common Files\Adobe\Acrobat 4.0\NT\Uninst.isu" -c"C:\Program Files\Common Files\Adobe\Acrobat 4.0\NT\Uninst.dll"[/code]

**Update 2**: Here are a couple of documents on the Adobe support site for removing Reader:

  * [Manually remove Adobe Reader (8.x on Windows)](http://kb.adobe.com/selfservice/viewContent.do?externalId=kb400769)
  * [Remove Adobe Reader 6.x (Windows XP and 2000)](http://kb.adobe.com/selfservice/viewContent.do?externalId=327675)

<div>
  If all else fails you can resort to the <a href="http://support.microsoft.com/kb/290301">Windows Installer CleanUp Utility</a> to get Reader to uninstall.
</div>