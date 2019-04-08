---
id: 825
title: Workaround for crashing App-V Management Console
date: 2008-12-03T16:40:30+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/workaround-for-crashing-app-v-management-console
permalink: /workaround-for-crashing-app-v-management-console/
aktt_notify_twitter:
  - 'yes'
dsq_thread_id:
  - "195381311"
categories:
  - Applications
tags:
  - App-V
  - Microsoft Management Console
---
If you are managing a large number of applications with App-V you may experience a crash in the Microsoft Management Console when drilling down into the Application node.

<img style="display: inline" title="ManagementConsoleCrash" src="https://stealthpuppy.com/wp-content/uploads/2008/12/managementconsolecrash.png" border="0" alt="ManagementConsoleCrash" width="484" height="176" /> 

Microsoft have addressed issues with the console previously with this knowledgebase article: [When you use the SoftGrid Management Console, it may crash](http://support.microsoft.com/kb/942687/). That article discusses an issue the console has with asymmetrical icons; however in 4.5 there is a handy registry key that prevents the console from attempting to load application icons.

  * x86: HKEY\_LOCAL\_MACHINE\SOFTWARE\Microsoft\SoftGrid\4.5\Management Console
  * x64: HKEY\_LOCAL\_MACHINE\SOFTWARE\Wow6432Node\Microsoft\SoftGrid\4.5\Management Console
  * Name: _LoadConsoleIcons_
  * Type: REG_DWORD
  * Value: 0

Because the console never loads any application icons, it won’t have issues with non-standard icons and MMC won’t crash. Adding this key does not affect client functionality – users will still see the correct icons on their applications and file types.

To add this key on x86 Windows use this command:

[code]REG ADD "HKLM\Software\Microsoft\SoftGrid\4.5\Management Console" /v LoadConsoleIcons /d 0 /t REG_DWORD /f[/code]

On x64 Windows use this command instead:

[code]REG ADD "HKLM\Software\Wow6432Node\Microsoft\SoftGrid\4.5\Management Console" /v LoadConsoleIcons /d 0 /t REG_DWORD /f[/code]