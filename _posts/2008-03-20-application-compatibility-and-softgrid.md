---
id: 505
title: Application Compatibility And The Benefits Of Virtualisation
date: 2008-03-20T17:42:42+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/application-compatibility-and-softgrid
permalink: /application-compatibility-and-softgrid/
categories:
  - Applications
tags:
  - SoftGrid
  - Terminal Server
---
<img border="0" alt="SoftGridAppCompat" align="left" src="{{site.baseurl}}.com/media/2008/03/softgridappcompat.png" width="140" height="128" />If there's ever a great example of the benefits of application virtualisation it can often be found in the little things.

One of the guys in our team has been sequencing [Volo View](http://usa.autodesk.com/adsk/servlet/index?id=3239384&siteID=123112), which isn't a particularly well behaved piece of software to begin with. It has a menu option that launches Windows Explorer to view some config files and when  run under Terminal Services, this fails to launch Explorer.

Rather than use the [ShellExecute API](http://msdn2.microsoft.com/en-us/library/bb762153.aspx) to execute Explorer, it appears that the application is using [GetWindowsDirectory](http://msdn2.microsoft.com/en-us/library/ms724454.aspx) instead, then appending EXPLORER.EXE to the end of the returned folder name and attempting to launch the Explorer window.

If you've been working with Terminal Server for any length of time, you might know that when the GetWindowsDirectory API is called under Terminal Server, the users' home directory is returned instead of the real Windows directory. Of course EXPLORER.EXE doesn't live there and thus the application fails to find it.

Fortunately there's a few [application compatibility tricks built into Terminal Server](http://support.microsoft.com/kb/186498) that we can take advantage of to work around issues like this. To fix this issue we can implement a registry value to modify this behaviour for this application. To help Volo View out, we can implement this registry value so that Windows will return the real folder when GetWindowsDirectory is called:

[quickcode:noclick]HKLM\Software\Microsoft\Windows NT\CurrentVersion\Terminal Server\Compatibility\Applications\VPLT\Flags=dword:00000408[/quickcode]

The benefit that application virtualisation brings to our toolset (and this is probably not a SoftGrid exclusive), is that we can implement this registry value within the SoftGrid bubble. No changes are required on the Terminal Server itself, instead the fix follows the application where ever it is executed. Very cool.