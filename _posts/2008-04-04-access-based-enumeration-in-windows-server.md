---
id: 515
title: Access-Based Enumeration in Windows Server
date: 2008-04-04T17:52:16+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/windows/access-based-enumeration-in-windows-server
permalink: /access-based-enumeration-in-windows-server/
dsq_thread_id:
  - "195380343"
categories:
  - Microsoft
tags:
  - Access-Based Enumeration
  - Windows-Server
---
You remember [Access Based Enumeration](http://www.microsoft.com/windowsserver2003/techinfo/overview/abe.mspx) right? I'm often surprised by people who didn't know this features exists, so here's refresher.

Access Based Enumeration is the add-on to Windows Server 2003 and included in Windows Server 2008 that controls the display of files and folders in remote shares based on user-rights. This is the tool that helps you create [dynamic Start Menus for Terminal Servers]({{site.baseurl}}/terminal-server/building-dynamic-start-menus-with-access-based-enumeration) or turn a user home share view from this:

<img src="https://stealthpuppy.com/media/2008/04/abesharebefore.png" border="0" alt="ABEShareBefore" width="409" height="251" /> 

into this:

<img src="https://stealthpuppy.com/media/2008/04/abeshareafter.png" border="0" alt="ABEShareAfter" width="409" height="251" /> 

It's also especially good for those common file shares that everyone has access but are full of folders they can't access.

To use ABE in Windows Server 2003, you'll need to download and install [the installer for Windows 2003 Service Pack 1 and above](http://www.microsoft.com/downloads/details.aspx?FamilyID=04a563d9-78d9-4342-a485-b030ac442084&DisplayLang=en). You can then enabled access-based enumeration on each share:

<img src="https://stealthpuppy.com/media/2008/04/accessbasedenumeration2003.png" border="0" alt="AccessBasedEnumeration2003" width="294" height="394" /> 

For Windows Server 2008, ABE is built in and you can enable it by opening the _Share and Storage Management_ MMC to view your list of shares, open the properties for the target share, click _Advanced_ and add the tick to _Enable access-based enumeration_.

<img src="https://stealthpuppy.com/media/2008/04/accessbasedenumeration2008.png" border="0" alt="AccessBasedEnumeration2008" width="573" height="359" /> 

Nice and easy, so stop reading this post and going and enable ABE now.. Here's more on ABE if you're interested:

  * [Windows Server 2003 Access-based Enumeration](http://www.microsoft.com/downloads/details.aspx?FamilyID=04a563d9-78d9-4342-a485-b030ac442084&DisplayLang=en)
  * [Windows Server 2003 Access-based Enumeration](http://www.microsoft.com/windowsserver2003/techinfo/overview/abe.mspx)
  * [Utility Spotlight Access-Based Enumeration](http://technet.microsoft.com/en-us/magazine/cc160928.aspx)
  * [Implementing Access-Based Enumeration in Windows Server 2003 R2](http://www.windowsnetworking.com/articles_tutorials/Implementing-Access-Based-Enumeration-Windows-Server-2003.html)
  * [How to implement Windows Server 2003 Access-based Enumeration in a DFS environment](http://support.microsoft.com/kb/907458)