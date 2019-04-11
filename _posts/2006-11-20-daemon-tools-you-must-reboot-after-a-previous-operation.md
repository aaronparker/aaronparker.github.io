---
id: 151
title: 'Daemon Tools: You must reboot after a previous operation'
date: 2006-11-20T22:20:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/daemon-tools-you-must-reboot-after-a-previous-operation
permalink: /daemon-tools-you-must-reboot-after-a-previous-operation/
dsq_thread_id:
  - "195378845"
categories:
  - Applications
---
[Daemon Tools](http://www.daemon-tools.cc/dtcc/announcements.php) was giving me some grief after upgrading to Windows Vista RTM and I had to update to version 4.08 which includes an updated SPTD driver for the virtual CDROM drive. When running the 4.08 installer for the first time, I had to uninstall the old version and reboot. After the reboot, I ran the installer again and the following error message would be displayed: "You must reboot after a previous operation"

<img border="0" src="{{site.baseurl}}.com/media/2006/11/1000.14.191.DaemonToolsInstall.PNG" /> 

No amount of rebooting would fix the issue. After digging around I found [this forum post](http://www.daemon-tools.cc/dtcc/showthread.php?t=11666). The fix was easy - delete the following registry key and try the installer again:

`HKEY_LOCAL_MACHINESOFTWARE19659239224e364682fa4baf72c53ea4`