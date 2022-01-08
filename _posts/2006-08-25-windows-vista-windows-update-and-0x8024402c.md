---

title: Windows Vista, Windows Update and 0x8024402C
date: 2006-08-25T05:58:00+10:00
author: Aaron Parker
layout: post

permalink: /windows-vista-windows-update-and-0x8024402c/
dsq_thread_id:
  - "195378922"
categories:
  - Microsoft
tags:
  - Windows-Update
  - Windows-Vista
---
After adding my laptop running Windows Vista to our AD domain, Windows Update was unable to synchronise and would produce the following errors:

> Windows could not search for new updates: 0x8024402C

After much digging and hair pulling, I found that Windows Update won't synchronise from Microsoft once Group Policy has configured Windows to use WSUS. In my case Windows Update was attempting to update from our internal WSUS server and at this point we haven't yet upgraded to WSUS Service Pack 1. To get Windows Update working again delete the following registry key and restart the Windows Update service:

```
HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate
```

Of course, next time Group Policy refreshes you'll have the same issue, so modify Group Policy or update to WSUS SP1.
