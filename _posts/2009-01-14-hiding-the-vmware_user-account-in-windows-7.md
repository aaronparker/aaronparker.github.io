---

title: Hiding the vmware_user account in Windows 7
date: 2009-01-14T19:05:11+10:00
author: Aaron Parker
layout: post

permalink: /hiding-the-vmware_user-account-in-windows-7/
dsq_thread_id:
  - "195381428"
categories:
  - Microsoft
tags:
  - VMware
---
Installing VMware Server or Workstation on Windows 7 will leave the **\_\_vmware_user\_\_** account showing on the logon screen, which does not happen in earlier versions of Windows.

![Windows7LogonScreen]({{site.baseurl}}/media/2009/01/windows7logonscreen.png)

If you want to hide this account, it’s a simple registry value addition:

  1. Open Registry Editor and navigate to `HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon`
  2. If it does not already exist, create a key named `SpecialAccounts`
  3. Below the SpecialAccounts key create another key named `UserList`
  4. Create a new DWORD value (DWORD32 on x64) inside UserList named `__vmware_user__` (the name of the account we want to hide) and ensure the value is `0`
  5. Close Registry Editor and you are done – no need to reboot or logoff

To add this value a little quicker, paste the following command into an elevated command prompt and it will add the value for you

```powershell
REG ADD "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon\SpecialAccounts\UserList" /v __vmware_user__ /d 0 /t REG_DWORD /f
```

This link has some detail on [what the `__vmware_user__` account is used for](http://communities.vmware.com/message/181240).
