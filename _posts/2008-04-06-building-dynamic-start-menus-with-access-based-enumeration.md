---
id: 523
title: Building Dynamic Start Menus With Access-Based Enumeration
date: 2008-04-06T22:27:24+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/terminal-server/building-dynamic-start-menus-with-access-based-enumeration
permalink: /building-dynamic-start-menus-with-access-based-enumeration/
dsq_thread_id:
  - "195380381"
categories:
  - Microsoft
tags:
  - Access-Based Enumeration
  - DFS
  - Start Menu
---
<img src="https://stealthpuppy.com/media/2008/04/startmenu2.png" border="0" alt="StartMenu2" width="120" height="113" align="left" />In [my last article](https://stealthpuppy.com/windows/access-based-enumeration-in-windows-server) I hinted at creating dynamic Start Menus using Access-Based Enumeration (ABE) in Windows Server 2003 SP1 and above. I have read an article on this subject previously on the Internets, but the tubes must be clogged up as I can't find it anymore. If anyone has a link please let me know, because I would like to link to it.

So because I can't find that article and [Dylan asked how this is done](https://stealthpuppy.com/windows/access-based-enumeration-in-windows-server#comment-13330), here's my own version:

In this example I'm configuring a Start Menu for a Windows 2003 Terminal Server. This is probably the most common scenario for managing Start Menus and ABE helps to create a dynamic Start Menu even though all users may be accessing the same menu items.

My test environment consists of a Windows Server 2008 domain controller/file server named **DC** and a Windows 2003 Terminal Server named **TS** in a domain named _dev.local_ with a DFS Namespace named _Public_.

### Create A Share To Host The Start Menu

Access-based enumeration won't work on local folders so you'll need to redirect the Start Menu to a network folder. In my example configuration I've created a share named _StartMenus_ which is located at _E:StartMenus_ on **DC**. Once the folder is shared, enable ABE. See [my previous article](https://stealthpuppy.com/windows/access-based-enumeration-in-windows-server) on how to do this.

I've also set NTFS permissions on this folder so that Administrators and SYSTEM have Full Control and Authenticated Users have Read-only access. Ensure that the Administrators group has ownership on this and any sub-folders, otherwise, by default, folder redirection will not work.

### Improving The Share Configuration

If you are hosting the share on Windows Server 2003 R2 or Windows Server 2008, I recommend enabling a [File Screen](http://technet2.microsoft.com/windowsserver/en/library/0b7566a4-ace9-4872-9246-86d26573983a1033.mspx?mfr=true) on this location so that only .LNK, .URL and .INI files can be copied to this location. This will help prevent files with potentially harmful content being copied to the Start Menu and executed (especially the Startup location). Allow .INI files because the Start Menu is populated with DESKTOP.INI files.

You should also add this share to a [DFS Namespace](http://technet2.microsoft.com/windowsserver2008/en/library/1f0d326d-35af-4193-bda3-0d1688f90ea71033.mspx?mfr=true) so that if you need to move the Start Menus to another server, you won't need to modify Group Policy. In my example environment my new network path is _\dev.localPublicStartMenus_. DFS can also provide high-availability for your Start Menus through [DFS Replication](http://technet2.microsoft.com/WindowsServer/en/Library/8c4cf2e7-0b92-4643-acbd-abfa9f189d031033.mspx?mfr=true).

<img src="https://stealthpuppy.com/media/2008/04/dfsnamespace.png" border="0" alt="DFSNamespace" width="145" height="116" /> 

### Create The Start Menu(s)

Create a folder below your new share for each Start Menu you require. This method of creating Start Menus doesn't account for the configuration of each Terminal Server. For example, you might have multiple Terminal Server silos, so you'll need to create a Start Menu for each silo (if you're publishing multiple desktops). My example environment has a Start Menu location at _\dev.localPublicStartMenusTerminalServer_.

Copy shortcuts from the local machine to the network share. You'll need to copy from the user Start Menu as well as the common Start Menu to construct a menu with all of the required application shortcuts plus the usual suspects. After (or before) copying, clean up the shortcuts so that only the shortcuts you require are located there.

<img src="https://stealthpuppy.com/media/2008/04/startmenufolder.png" border="0" alt="StartMenuFolder" width="573" height="326" /> 

Create groups in your domain that you can use when setting permissions on your Start Menu. Most organisations will use a group to represent each application, but if you can go with role-based groups they will be mean less administrative overhead.

Set permissions on each shortcut folder or individual shortcuts as required. Once access-based enumeration is enabled users will see only the shortcuts they have read access to. Setting permissions on the shortcuts and folders is a great candidate for scripting or Group Policy. If you keep the permissions configuration in a script or use Group Policy to set permissions you can ensure those ACLs will stay consistent.

### Redirect The Start Menu

In my example I'm configuring a Start Menu for a Terminal Server environment, so I'm going to redirect the Start Menu via a loopback policy applied to my Terminal Servers OU. I also deny the Apply Group Policy right to Domain and Enterprise Admins (or other applicable administrator groups on this GPO so folder redirection does not apply to those users.

<img src="https://stealthpuppy.com/media/2008/04/loopbackpolicy.png" border="0" alt="LoopbackPolicy" width="236" height="81" /> 

Create a GPO on the Terminal Servers OU and enable the loopback policy:

_Computer Configuration / Administrative Templates / System / Group Policy / User Group Policy loopback processing mode_

I generally set this to Merge because most settings are configured by GPOs on the user OUs. Also enable the setting to hide the common Start Menu. If you don't enable this setting, users will see both the redirected and local Start Menus.

_User Configuration / Administrative Templates / Start Menu and Taskbar / Remove common program groups from Start Menu_

Now enable folder redirection to your network share and be sure to set the option 'Redirect the folder back to the local userprofile location when policy is removed'. Here's a copy of [the GPO report](https://stealthpuppy.com/media/2008/04/TerminalServerLoopbackPolicy.htm) to see exactly how I've configured it.

<img src="https://stealthpuppy.com/media/2008/04/startmenuredirection.png" border="0" alt="StartMenuRedirection" width="323" height="358" /> 

Start Menu folder redirection in this manner allows you to stop customising the local Start Menu. This is something I see TS administrators do in numerous organisations. I find this practice to be un-necessary and increases the administrative overhead. Redirect the user Start Menu so that administrators have access to all of the locally installed shortcuts.

### Let's See What It Looks Like

Now that the configuration in complete your users should have a Start Menu customised for them. If they don't you should check the Application log for any Group Policy errors.

What users should see on their Start Menus should be fairly predictable. My first user sees the following configuration:

<img src="https://stealthpuppy.com/media/2008/04/aaronstartmenu.png" border="0" alt="AaronStartMenu" width="357" height="343" /> 

And the second user sees a different Start Menu:

<img src="https://stealthpuppy.com/media/2008/04/zappstartmenu.png" border="0" alt="ZappStartMenu" width="360" height="343" /> 

### Summary

Using Access-Based Enumeration in Windows Server 2003 SP1 and above, we can create a Start Menu solution customised for each user. There are numerous ways to achieve this (perhaps even more flexible), but ABE gives us a no script, no 3rd party solution - nice and simple.

### More Resources

  * [Using Access-Based Enumeration with DFS](http://blogs.technet.com/b/askds/archive/2011/01/25/using-abe-with-dfs.aspx)