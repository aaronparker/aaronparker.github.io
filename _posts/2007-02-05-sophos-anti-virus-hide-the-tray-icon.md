---
id: 106
title: 'Sophos Anti-Virus: Hide the Tray Icon'
date: 2007-02-05T21:51:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/sophos-anti-virus-hide-the-tray-icon
permalink: /sophos-anti-virus-hide-the-tray-icon/
dsq_thread_id:
  - "195378743"
categories:
  - Automation
---
During my quest to disable as many tray icons as I possibly can, I&#8217;ve had to track down how to disable the tray icon for Sophos Anti-Virus in a Terminal Server environment. This one is pretty easy, it&#8217;s just a single DWORD registry value:

HKEY\_LOCAL\_MACHINE\SOFTWARE\Sophos\AutoUpdate, HideTrayIcon, 0x00000001

To configure this in a script use the following command:  
[code]REG ADD HKLM\SOFTWARE\Sophos\AutoUpdate /v HideTrayIcon /d 0x00000001 /t REG_DWORD /f[/code]