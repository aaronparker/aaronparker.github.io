---

title: 'Lessons from the field: Presentation Server'
date: 2005-10-19T14:09:00+10:00
author: Aaron Parker
layout: post

permalink: /lessons-from-the-field-presentation-server/
categories:
  - Citrix
tags:
  - Presentation-Server
---
I'll file this under "Stupid Things I Didn't Know". Citrix Presentation Server relies on the PATH variable for core components to run. I was adding to the PATH variable, in a scripted build after the CPS install and before a reboot, with a command like this:

```cmd
REG ADD "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v Path /d "%PATH%;%ProgramFiles%\Sysinternals" /f
```

Unfortunately, that additions to the PATH that the CPS Setup program has added aren't seen because I'm calling all this from the same session of CMD.EXE. After a reboot the server would not load the logon dialog and show this error instead:

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

Setting the PATH back to what it should be will fix the issue. I'll have to find a way to modify the registry entry directly, but my question to Citrix is: Why does Presentation Server rely on the PATH variable? Would it not read the location of files from the registry?
