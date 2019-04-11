---
id: 844
title: Hiding the vmware_user account in Windows 7
date: 2009-01-14T19:05:11+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/windows/hiding-the-vmware_user-account-in-windows-7
permalink: /hiding-the-vmware_user-account-in-windows-7/
dsq_thread_id:
  - "195381428"
categories:
  - Microsoft
tags:
  - VMware
---
Installing VMware Server or Workstation on Windows 7 will leave the \_\_vmware\_user\\_\_ account showing on the logon screen, which does not happen in earlier versions of Windows.

<img style="border-top-width: 0px; display: inline; border-left-width: 0px; border-bottom-width: 0px; border-right-width: 0px" title="Windows7LogonScreen" src="{{site.baseurl}}.com/media/2009/01/windows7logonscreen.png" border="0" alt="Windows7LogonScreen" width="550" height="413" /> 

If you want to hide this account, it’s a simple registry value addition:

  1. Open Registry Editor and navigate to _HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon_
  2. If it does not already exist, create a key named _SpecialAccounts_
  3. Below the SpecialAccounts key create another key named _UserList_
  4. Create a new DWORD value (DWORD32 on x64) inside UserList named _\_\_vmware\_user\\_\__ (the name of the account we want to hide) and ensure the value is 0
  5. Close Registry Editor and you are done – no need to reboot or logoff

To add this value a little quicker, paste the following command into an elevated command prompt and it will add the value for you

[code]REG ADD "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon\SpecialAccounts\UserList" /v \_\_vmware\_user\\_\_ /d 0 /t REG_DWORD /f[/code]

This link has some detail on [what the \_\_vmware\_user\\_\_ account is used for](http://communities.vmware.com/message/181240).