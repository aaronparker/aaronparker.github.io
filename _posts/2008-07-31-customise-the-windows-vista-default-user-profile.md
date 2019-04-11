---
id: 609
title: Customise the Windows Vista Default User Profile
date: 2008-07-31T22:05:24+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=609
permalink: /customise-the-windows-vista-default-user-profile/
dsq_thread_id:
  - "195378115"
categories:
  - Automation
tags:
  - Default Profile
  - Windows-Vista
---
There are numerous ways to customise the default user profile in earlier versions of Windows, including:

  * Create a user account, configure the profile, then copy over the top of the local default profile or save a copy to your NETLOGON share;
  * Use the [[GuiRunOnce] section in an unattended answer file](http://www.microsoft.com/technet/prodtechnol/windows2000serv/reskit/deploy/dgcb_ins_vhev.mspx?mfr=true) for Windows XP/2003.

The first option carries over to Windows Vista and Windows Server 2008 however the second option is not available in quite the same way. Windows Vista’s setup is a very different beast and customising the default profile with scripts requires using the [auditUser](http://technet2.microsoft.com/WindowsVista/en/library/ae42b355-002d-45c4-b6d1-62313ff53fc71033.mspx?mfr=true) pass and setting the [CopyProfile](http://technet2.microsoft.com/WindowsVista/en/library/1471caf1-440a-4d54-bbe8-3b33c5effaa21033.mspx?mfr=true) value.

There's some great detail about using this process to [modify the default user profile](http://firegeier.unattended-sponsor.de/en/copy_profile_to_default_user.html) at [FireGeier's Unattended Vista Guide](http://firegeier.unattended-sponsor.de/en/sitemap.html) plus there's [a post at MSFN.org](http://www.msfn.org/board/Is-there-way-to-modify-default-profile-s-t119440.html) that my help you understand the process too. However, I think there's a simpler way. It's perhaps not a flexible as deploying via the UNATTEND.XML file but it doesn't require running SYSPREP to get the job done.

You can edit the default profile by directly modifying the Windows Vista or Windows Server 2008 image. This involves mounting the image and making your changes:

  * Mount the image in read/write mode;
  * Load the _\Users\Default\NTUSER.DAT_ hive into the Registry. It's worth looking around at this registry hive to see the differences between it and the user hive once a user has logged in;
  * Add the required modifications and unload the hive;
  * Commit changes to the Windows image.

Be sure to set the CopyProfile value to False in the UNATTEND.XML, otherwise these changes will be overwritten. Here's a script that performs those steps for me:

```cmd
@ECHO OFF  
REM ----------------------
REM  Script configures the Default User Profile in a Windows Vista/2008 image  
REM ----------------------

REM Mount the Windows image  
IMAGEX /MOUNTRW "D:\install.wim" 1 D:\mount

REM Load the default profile hive  
REG LOAD HKU\Default D:\mount\Users\Default\NTUSER.DAT

REM Configure the default user profile  
REG ADD "HKU\Default\Control Panel\Sound" /v Beep /t REG_SZ /d NO /f  
REG ADD "HKU\Default\Control Panel\Sound" /v ExtendedSounds /t REG_SZ /d NO /f  
REG ADD "HKU\Default\Control Panel\Desktop" /v HungAppTimeout /t REG_SZ /d 5000 /f  
REG ADD "HKU\Default\Control Panel\Desktop" /v AutoEndTasks /t REG_SZ /d 1 /f  
REG ADD "HKU\Default\Control Panel\Desktop" /v WaitToKillAppTimeout /t REG_SZ /d 4000 /f  
REG ADD "HKU\Default\Control Panel\Desktop" /v FontSmoothing /t REG_SZ /d 2 /f  
REG ADD "HKU\Default\Control Panel\Desktop" /v FontSmoothingType /t REG_DWORD /d 2 /f  
REG ADD "HKU\Default\Control Panel\Desktop" /v WallPaper /t REG_SZ /d "" /f  
REG ADD "HKU\Default\Control Panel\Colors" /v Background /t REG_SZ /d "10 59 118" /f  
REG ADD "HKU\Default\Console" /v QuickEdit /t REG_DWORD /d 1 /f  
REG ADD "HKU\Default\Software\Microsoft\Command Processor" /v CompletionChar /t REG_DWORD /d 9 /f  
REG ADD "HKU\Default\Software\Microsoft\Command Processor" /v PathCompletionChar /t REG_DWORD /d 9 /f  
REG ADD "HKU\Default\Software\Microsoft\CTF\LangBar" /v ShowStatus /t REG_DWORD /d 3 /f  
REG ADD "HKU\Default\Software\Microsoft\CTF\LangBar" /v Label /t REG_DWORD /d 1 /f  
REG ADD "HKU\Default\Software\Microsoft\CTF\LangBar" /v ExtraIconsOnMinimized /t REG_DWORD /d 0 /f  
REG ADD "HKU\Default\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v SeparateProcess /t REG_DWORD /d 1 /f  
REG ADD "HKU\Default\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v Start\_ShowControlPanel /t REG\_DWORD /d 1 /f  
REG ADD "HKU\Default\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v Start\_EnableDragDrop /t REG\_DWORD /d 1 /f  
REG ADD "HKU\Default\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v StartMenuFavorites /t REG_DWORD /d 1 /f  
REG ADD "HKU\Default\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v StartMenuLogoff /t REG_DWORD /d 1 /f  
REG ADD "HKU\Default\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v StartMenuScrollPrograms /t REG_SZ /d "YES" /f  
REG ADD "HKU\Default\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v IntelliMenus /t REG_DWORD /d 1 /f  
REG ADD "HKU\Default\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v Start\_ShowHelp /t REG\_DWORD /d 1 /f  
REG ADD "HKU\Default\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v Start\_ShowMyComputer /t REG\_DWORD /d 1 /f  
REG ADD "HKU\Default\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v Start\_ShowMyDocs /t REG\_DWORD /d 1 /f  
REG ADD "HKU\Default\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v Start\_ShowMyMusic /t REG\_DWORD /d 0 /f  
REG ADD "HKU\Default\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v Start\_ShowMyPics /t REG\_DWORD /d 1 /f  
REG ADD "HKU\Default\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v Start\_ShowNetPlaces /t REG\_DWORD /d 1 /f  
REG ADD "HKU\Default\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v Start\_ShowPrinters /t REG\_DWORD /d 1 /f  
REG ADD "HKU\Default\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v Start\_ShowSetProgramAccessAndDefaults /t REG\_DWORD /d 1 /f  
REG ADD "HKU\Default\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v Start\_ShowRecentDocs /t REG\_DWORD /d 1 /f  
REG ADD "HKU\Default\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v Start\_AutoCascade /t REG\_DWORD /d 1 /f  
REG ADD "HKU\Default\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v Start\_NotifyNewApps /t REG\_DWORD /d 0 /f  
REG ADD "HKU\Default\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v Start\_AdminToolsRoot /t REG\_DWORD /d 0 /f  
REG ADD "HKU\Default\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v StartMenuAdminTools /t REG_SZ /d "NO" /f  
REG ADD "HKU\Default\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v Start\_SortByName /t REG\_DWORD /d 1 /f  
REG ADD "HKU\Default\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoComplete" /v "Append Completion" /t REG_SZ /d YES /f  
REG ADD "HKU\Default\Software\Microsoft\Internet Explorer\TabbedBrowsing" /v PopupsUseNewWindow /t REG_DWORD /d 0 /f  
REG ADD "HKU\Default\Software\Microsoft\Internet Explorer\PhishingFilter" /v Enabled /t REG_DWORD /d 1 /f  
REG ADD "HKU\Default\Software\Microsoft\Internet Explorer\Main" /v "Enable AutoImageResize" /t REG_SZ /d YES /f  
REG ADD "HKU\Default\Software\Microsoft\Windows\CurrentVersion\Explorer\HideDesktopIcons\NewStartPanel" /v "{59031a47-3f72-44a7-89c5-5595fe6b30ee}" /t REG_DWORD /d 0 /f  
REG ADD "HKU\Default\Software\Microsoft\Windows\CurrentVersion\Explorer\HideDesktopIcons\NewStartPanel" /v "{20D04FE0-3AEA-1069-A2D8-08002B30309D}" /t REG_DWORD /d 0 /f  
REG ADD "HKU\Default\AppEvents\Schemes\Apps\Explorer\Navigating\.Current" /ve /t REG\_EXPAND\_SZ /d "" /f  
REG ADD "HKU\Default\Software\Microsoft\MediaPlayer\Setup\UserOptions" /v DesktopShortcut /d No /t REG_SZ /f  
REG ADD "HKU\Default\Software\Microsoft\MediaPlayer\Setup\UserOptions" /v QuickLaunchShortcut /d /t REG_DWORD /f  
REG ADD "HKU\Default\Software\Microsoft\MediaPlayer\Preferences" /v AcceptedPrivacyStatement /d 1 /t REG_DWORD /f  
REG ADD "HKU\Default\Software\Microsoft\MediaPlayer\Preferences" /v FirstRun /d 0 /t REG_DWORD /f  
REG ADD "HKU\Default\Software\Microsoft\MediaPlayer\Preferences" /v DisableMRU /d 1 /t REG_DWORD /f  
REG ADD "HKU\Default\Software\Microsoft\MediaPlayer\Preferences" /v AutoCopyCD /d 0 /t REG_DWORD /f  
REG DELETE "HKU\Default\Software\Microsoft\Windows\CurrentVersion\Run" /v Sidebar /f

REM Unload the default profile hive  
REG UNLOAD HKU\Default

REM Unmount the Windows image and commit changes  
IMAGEX /UNMOUNT /COMMIT D:\mount
```

As you can see I'm adding registry entries that will configure the user environment which does mean that there's a bit of work required to find them in the first place, but it does allow me to document every change to the profile, so I think the effort is worth it.

Extending this process, there are a few other things we can change in the Windows image that will impact the default environment:

  * Modify the default theme file in _\Windows\Resources\Themes\aero.theme_. I've used this file to do things such as remove the default wallpaper. Theme files are just text files so they're easy to maintain;
  * Configure Internet Explorer defaults by using INSTALL.INS created with the [Internet Explorer Administration Kit](http://technet.microsoft.com/en-us/ie/bb219556.aspx). This is useful for preventing IE from adding the default favourites or RSS feeds at first launch. Place a copy of INSTALL.INS in _\Program Files\Internet Explorer\SIGNUP_ and _\Program Files\Internet Explorer\CUSTOM_.

Then there are a couple of additional tools that I've used to make changes to the default user environment once Windows has been installed and added to the domain:

  * Group Policy. Some settings such as preventing Windows Media Player from displaying the first run dialog are useful;
  * [Group Policy Preferences](http://support.microsoft.com/Default.aspx?kbid=943729). GPP allows you to set registry values as a preference, i.e. apply once only.

By modifying the Windows image directly, your custom default profile will be available on machines whether you use an unattended or manual deployment.

Here's a few more articles worth reading:

  * [Configuring default settings for Windows image deployment](http://blogs.technet.com/deploymentguys/archive/2008/02/18/configuring-default-user-and-computer-settings-for-windows-image-deployment.aspx)
  * [Support guidelines for migrating roaming user profiles data to Windows Vista or to Windows Server 2008](http://support.microsoft.com/default.aspx/kb/947025)
  * [Managing Roaming User Data Deployment Guide](http://www.microsoft.com/technet/windowsvista/library/fb3681b2-da39-4944-93ad-dd3b6e8ca4dc.mspx)
  