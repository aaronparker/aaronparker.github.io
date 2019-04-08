---
id: 528
title: Providing Redirected Start Menus To Laptops
date: 2008-04-08T22:12:16+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/windows/providing-redirected-start-menus-to-laptops
permalink: /providing-redirected-start-menus-to-laptops/
dsq_thread_id:
  - "195380425"
categories:
  - Microsoft
tags:
  - Folder Redirection
  - Start Menu
---
<img src="https://stealthpuppy.com/wp-content/uploads/2008/04/offlinestartmenu.png" border="0" alt="OfflineStartMenu" width="124" height="113" align="left" /> [John](http://www.gilham.org/Blog/default.aspx) has [asked](https://stealthpuppy.com/terminal-server/building-dynamic-start-menus-with-access-based-enumeration#comment-13345) about using Offline Files as a method of fault tolerance instead of DFS on [my previous post](https://stealthpuppy.com/terminal-server/building-dynamic-start-menus-with-access-based-enumeration). Sounds like a great blog post (and it gives my an excuse to avoid my eight other draft posts), so here's my answer:

First up, I would not rely on Offline Files as a method of fault tolerance. It will work as a solution for laptops operating disconnected from the network, but won't provide effective fault tolerance. Offline Files are also not available on Terminal Server.

If you were to rely on Offline Files, you will have issues if the server the share is located goes down and can't be restored. Using Group Policy to redirect user folders requires that the original source location is available if you ever want to change the redirection path. This is why DFS Namespace is a good match for folder redirection - the DFS path remains static, while the real path can change.

DFS Namespaces and DFS Replication offer a far better solution for fault tolerance and DFS is available in Windows 2000 Server and above. If you want FT without using a 3rd party solution take a look at [DFS Replication](http://technet2.microsoft.com/WindowsServer/en/Library/8c4cf2e7-0b92-4643-acbd-abfa9f189d031033.mspx?mfr=true).

I spent some time this evening to configure a redirected Start Menu for Windows Vista laptops in my test environment. Here's my notes for recreating this setup and how it went:

This is very similar to redirected [Start Menus for Terminal Servers](https://stealthpuppy.com/terminal-server/building-dynamic-start-menus-with-access-based-enumeration) with some minor differences.

Create a GPO linked to the OU that contains your target workstations and enable Group Policy loopback mode. You would generally target similarly configured workstations just like you would do for Terminal Servers. In my test environment I'm configuring this for Windows Vista, I've enabled a WMI filter on this GPO so that it only applies to Vista and above:

[code]SELECT Version FROM Win32_OperatingSystem WHERE Version >= '6'[/code]

Edit the GPO and enable these settings (here's the [full GPO report](https://stealthpuppy.com/wp-content/uploads/2008/04/WindowsVistaStartMenu.htm)):

  * Computer Configuration / Administrative Templates / System / Group Policy / User Group Policy loopback processing mode
  * User Configuration / Windows Settings / Folder Redirection / Start Menu / Basic (Redirect everyone's folder to the same location) / Redirect to the following path: In my test environment, I'm using this DFS path: _\dev.localPublicStartMenusWindowsVista_
  * Grant user exclusive rights to Start Menu
  * Move the contents of Start Menu to the new location
  * Redirect the folder back to the local userprofile location when policy is removed
  * User Configuration / Administrative Templates / Start Menu and Taskbar / Remove common program groups from Start Menu
  * User Configuration / Administrative Templates / Network / Offline Files / Administratively assigned offline files: _\dev.localPublicStartMenusWindowsVista_

The last setting will ensure that the Start Menu will be cached by the workstation and available to the user offline. Here's my configured folder which has been cached locally:

[<img src="https://stealthpuppy.com/wp-content/uploads/2008/04/windowsvistastartmenu-thumb.png" border="0" alt="WindowsVistaStartMenu" width="686" height="479" />](https://stealthpuppy.com/wp-content/uploads/2008/04/windowsvistastartmenu.png)

Make sure you configure your Start Menus with access-based enumeration and the right permissions before users access them. If you don't and users' workstations cache the shortcuts, you might end up unavailable shortcuts looking like this:

<img src="https://stealthpuppy.com/wp-content/uploads/2008/04/startmenumissedicon.png" border="0" alt="StartMenuMissedIcon" width="211" height="156" /> 

Although I've only done some limited testing I think this solution would work quite well. One important thing to remember is that you will need to add your internal DNS domain to the Intranet zone (when using a domain-based DFS Namespace) otherwise users will be prompted with a trust dialog each time they run a shortcut from the Start Menu.