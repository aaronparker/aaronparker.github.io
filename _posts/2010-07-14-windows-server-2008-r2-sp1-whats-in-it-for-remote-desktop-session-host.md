---
id: 1748
title: 'Windows Server 2008 R2 SP1: What’s in it for Remote Desktop Session Host?'
date: 2010-07-14T15:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/terminal-server/windows-server-2008-r2-sp1-whats-in-it-for-remote-desktop-session-host
permalink: /windows-server-2008-r2-sp1-whats-in-it-for-remote-desktop-session-host/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195383073"
categories:
  - Microsoft
tags:
  - Remote Desktop
---
The document [Hotfixes and Security Updates included in Windows 7 and Windows Server 2008 R2 Service Pack 1 Beta](http://go.microsoft.com/fwlink/?LinkId=194725) has the complete list of what’s fixed in SP1. [RemoteFX](http://www.brianmadden.com/blogs/brianmadden/archive/2010/07/13/microsoft-remotefx-is-now-available-via-public-beta.aspx) might steal the show, however I’m specifically interested in what fixes there are for Terminal Server or Remote Desktop Session Host as it’s now called.

The table below is filtered for just those fixes, each of which is available now if you can’t wait for SP1 due in H1 2011:

|KB   |Title                                     |
|-----|------------------------------------------|
|http://support.microsoft.com/kb/969851|Instead of the specified startup program, the whole desktop is started on a remote desktop connection when you change the Terminal Services Profile setting for the user account|
|http://support.microsoft.com/kb/973062|The audio redirection feature does not work when you use Remote Desktop Connection Client for Mac 2.0 to make a terminal server session to a computer that is running Windows Server 2008 x64 Edition or Windows Vista x64 Edition|
|http://support.microsoft.com/kb/976484|You have problems when you try to connect to the Remote Desktop Gateway (RD Gateway) that is hosted on a computer that is running Windows Server 2008 R2|
|http://support.microsoft.com/kb/977627|You cannot open a remote application or a remote desktop by using Forefront UAG|
|http://support.microsoft.com/kb/979425|A combo box item in a RemoteApp application is updated incorrectly when you connect by using Remote Desktop Connection (RDC) 7.0|
|http://support.microsoft.com/kb/979443|You do not receive a warning message when a remote desktop connection fails from a Windows 7 or Windows Server 2008 R2-based computer|
|http://support.microsoft.com/kb/979470|Remote Desktop Services does not prevent a console session from being disconnected in Windows Server 2008 R2|
|http://support.microsoft.com/kb/979530|A Windows Server 2008 R2-based Remote Desktop server denies some connection requests randomly under heavy logon or logoff conditions|
|http://support.microsoft.com/kb/979548|You cannot enter an agreement number of a volume license that contains more than seven digits in Remote Desktop Licensing Manager or in TS Licensing Manager|
|http://support.microsoft.com/kb/979734|Description of an update for Remote Desktop Services BPA|
|http://support.microsoft.com/kb/980909|The home folder could not be created remote desktop error in Windows Server 2008 R2|
|http://support.microsoft.com/kb/981156|RemoteApp applications are displayed as black windows when you restart the applications in a Remote desktop connection in Windows Server 2008 R2|
|http://support.microsoft.com/kb/980393|Two users accounts that are logged on to the same computer cannot use Windows Photo Viewer at the same time in Windows 7 and in Windows Server 2008 R2|
|http://support.microsoft.com/kb/981208|Poor performance when you transfer many small files on a computer that is running Windows 7 or Windows Server 2008 R2|

If you can't wait for SP1, a list of recommended updates for RDS is available here: [Recommended Updates for the Remote Desktop Services (Terminal Services) in Windows Server 2008 and Windows Server 2008 R2](http://support.microsoft.com/kb/2312539)

If you’re interested in the Group Policy fixes in SP1, [Alan has listed those here](http://www.grouppolicy.biz/2010/07/the-complete-list-of-group-policy-hotfixs-in-windows-72008-r2-service-pack-1/).
