---
id: 3583
title: Cleaning up and Reducing the Size of your Master Image
date: 2014-03-09T12:20:53+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=3583
permalink: /cleaning-up-and-reducing-the-size-of-your-master-image/
dsq_thread_id:
  - "2395221684"
pd_rating:
  - 'a:8:{s:4:"type";s:1:"0";s:5:"votes";s:1:"1";s:6:"total1";s:1:"0";s:6:"total2";s:1:"0";s:6:"total3";s:1:"0";s:6:"total4";s:1:"0";s:6:"total5";s:1:"1";s:7:"average";s:6:"5.0000";}'
categories:
  - Automation
tags:
  - Automation
  - MDT
---
[<img class="alignnone size-full wp-image-3584" src="{{site.baseurl}}.com/media/2014/03/4520986339_99857d1c35_o.jpg" alt="Compressed Car](http://www.flickr.com/photos/marcovdz/4520986339/)

There's typically not too much that you can do to reduce the size of your master image. You might use application virtualization or layering solutions to reduce the number of master images, but once you work out what needs to go into the core image, that's going to dictate the size of the image.

Reducing the size of your master image can help reduce the capacity required to store master images and virtual machines (dedupe helps, of course) and spend less cycles transmitting an image across the network for physical PCs.

An easy win, is running the [Disk Clean-up](http://windows.microsoft.com/en-au/windows/delete-files-using-disk-cleanup#delete-files-using-disk-cleanup=windows-8) tool included in Windows (since Windows XP) and fortunately [this tool can be automated](http://support.microsoft.com/kb/315246) to run at the end of a build (e.g from MDT or ConfigMgr). For physical PCs or persistent desktops, this tool could even be run as a scheduled task.

Microsoft released [an important update for Windows 7 last year](http://blogs.technet.com/b/askpfeplat/archive/2013/10/08/breaking-news-reduce-the-size-of-the-winsxs-directory-and-free-up-disk-space-with-a-new-update-for-windows-7-sp1-clients.aspx) that can result in a significant reduction in disk space: [Disk Clean-up Wizard addon lets users delete outdated Windows updates on Windows 7 SP1](http://support.microsoft.com/kb/2852386). The same feature was originally delivered with Windows 8. (Windows 8.1 Update 1 is expected to reduce disk space requirements again).

Here's an example system where I've run the Disk Clean-up tool that has resulted in a 3.4 GB reduction in disk usage - on the left is the before image, on the right is after the cleanup. (I'm cheating a bit here, this is a system that has gone from Windows 7 to Windows 7 SP1, hence the reason for such a large change).

[<img class="alignnone size-full wp-image-3587" src="{{site.baseurl}}.com/media/2014/03/BeforeAfterClean.png" alt="Compare Disk Cleanup Before and After]({{site.baseurl}}/media/2014/03/BeforeAfterClean.png)

Disk Clean-up can remove a number of interesting items, most of which will actually be applicable for PCs and persistent desktops post-deployment. Here's the items that Disk Clean-up can manage on Windows 8.1:

<img class="alignnone size-full wp-image-3586" src="{{site.baseurl}}.com/media/2014/03/DIskCleanup.png" alt="Disk Cleanup options" width="389" height="819" srcset="{{site.baseurl}}.com/media/2014/03/DIskCleanup.png 389w, {{site.baseurl}}.com/media/2014/03/DIskCleanup-71x150.png 71w, {{site.baseurl}}.com/media/2014/03/DIskCleanup-142x300.png 142w" sizes="(max-width: 389px) 100vw, 389px" /> 

To [automate Disk Clean-up](http://support.microsoft.com/kb/315246), use the following steps:

  1. Elevate a command prompt
  2. Run _CLEANMGR /SAGESET:<number>_ (where <number is any number between 1 and 65535)
  3. Select each of the items to clean up
  4. Click OK

To run Disk Clean-up from a script run _CLEANMGR /SAGERUN:<number>_ (where <number> is the same number use with SAGESET.

To automate the process of running Disk Cleanup, the following script can be used to enable all of the tool's options in the registry and then execute the cleanup process. This script should work for both Windows 7 and Windows 8 and would be useful to run at the end of a deployment. This example uses 100 as the configuration setting, so you would run CLEANMGR /SAGERUN:100 to run Disk Cleanup with these settings.

<pre class="lang:batch decode:true" title="Configure Disk Clean to Perform a Full System Cleanup">@ECHO OFF
REM Enable components to cleanup
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\Active Setup Temp Folders" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\BranchCache" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\Downloaded Program Files" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\GameNewsFiles" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\GameStatisticsFiles" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\GameUpdateFiles" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\Internet Cache Files" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\Memory Dump Files" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\Offline Pages Files" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\Old ChkDsk Files" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\Previous Installations" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\Recycle Bin" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\Service Pack Cleanup" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\Setup Log Files" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\System error memory dump files" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\System error minidump files" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\Temporary Files" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\Temporary Setup Files" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\Temporary Sync Files" /V StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\Thumbnail Cache" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\Update Cleanup" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\Upgrade Discarded Files" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\User file versions" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\Windows Defender" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\Windows Error Reporting Archive Files" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\Windows Error Reporting Queue Files" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\Windows Error Reporting System Archive Files" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\Windows Error Reporting System Queue Files" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\Windows ESD installation files" /v StateFlags0100 /d 2 /t REG_DWORD /f
REG ADD "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\Windows Upgrade Log Files" /v StateFlags0100 /d 2 /t REG_DWORD /f

REM Run cleanup
IF EXIST %SystemRoot%\SYSTEM32\cleanmgr.exe START /WAIT cleanmgr /sagerun:100</pre>

It's important to note that while Disk Clean-up exists on Windows 7 and Windows 8, it does not exist on Windows Server unless the [Desktop Experience](http://technet.microsoft.com/en-us/library/cc772567.aspx) feature is installed (i.e. a Remote Desktop Session Host).

If your image is Windows 8.1 or Windows Server 2012 R2, then the following command is available to perform an even more [in depth cleanup of the WinSXS folder](http://technet.microsoft.com/en-us/library/dn251565.aspx), making some additional space available:

<pre class="lang:batch decode:true">Dism.exe /online /Cleanup-Image /StartComponentCleanup /ResetBase</pre>

Running Disk Clean-up and the above DISM command in a script to clean up your master image should result in a smaller image. Don't forget that this approach is also useful for persistent desktops - unless you're using some type of dedupe solution, then there's potentially gigabytes per desktop that can be removed.

There is one more method worth for reducing space worth mentioning - the [Uninstall-WindowsFeature](http://technet.microsoft.com/en-us/library/jj205471.aspx) PowerShell cmdlet in Windows Server 2012 and Windows Server 2012 R2. This can go a long way too to reducing the disk footprint by completely removing features from Windows (making them unavailable for install).

For instance, if you're deploying a Remote Desktop Session Host, there's no need for IIS or Hyper-V to be in the component store. See this blog post article for full details: [How to Reduce the Size of the Winsxs directory and Free Up Disk Space on Windows Server 2012 Using Features on Demand](http://blogs.technet.com/b/askpfeplat/archive/2013/02/24/how-to-reduce-the-size-of-the-winsxs-directory-and-free-up-disk-space-on-windows-server-2012-using-features-on-demand.aspx)

**[May 14 2014]** Microsoft has released this update for Windows Server 2008 R2, which can be on the original KB article here: [Disk Cleanup Wizard add-on lets users delete outdated Windows updates on Windows 7 SP1 or Windows Server 2008 R2 SP1](http://support.microsoft.com/kb/2852386/). The update is available from Windows Update and WSUS.