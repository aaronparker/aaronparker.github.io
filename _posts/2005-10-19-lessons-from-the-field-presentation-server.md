---
id: 287
title: 'Lessons from the field: Presentation Server'
date: 2005-10-19T14:09:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/lessons-from-the-field-2
permalink: /lessons-from-the-field-presentation-server/
categories:
  - Citrix
tags:
  - Presentation-Server
---
I&#8217;ll file this under &#8220;Stupid Things I Didn&#8217;t Know&#8221;. Citrix Presentation Server relies on the PATH variable for core components to run. I was adding to the PATH variable, in a scripted build after the CPS install and before a reboot, with a command like this:

<p class="console">
  C:\REG ADD &#8220;HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment&#8221; /v Path /d &#8220;%PATH%;%ProgramFiles%\Sysinternals&#8221; /f
</p>

Unfortunately, that additions to the PATH that the CPS Setup program has added aren&#8217;t seen because I&#8217;m calling all this from the same session of CMD.EXE. After a reboot the server would not load the logon dialog and show this error instead:

> The Logon User Interface DLL  
> C:\WINDOWS\system32\ctxgina.dll failed to load

Errors similar to the following are logged in the event viewer:

> Event Type: Error  
> Event Source: IMAService  
> Event Category: None  
> Event ID: 3609  
> Date: 19/10/2005  
> Time: 1:48:18 PM  
> User: N/A  
> Computer: INGAUGBATS02  
> Description:  
> Failed to load plugin MfSrvSs.dll with error IMA\_RESULT\_FILE\_NOT\_FOUND

Setting the PATH back to what it should be will fix the issue. I&#8217;ll have to find a way to modify the registry entry directly, but my question to Citrix is: Why does Presentation Server rely on the PATH variable? Would it not read the location of files from the registry?