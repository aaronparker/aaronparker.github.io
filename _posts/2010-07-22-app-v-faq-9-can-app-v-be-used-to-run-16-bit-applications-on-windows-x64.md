---

title: 'App-V FAQ: Can App-V be used to run 16-bit applications on Windows x64?'
date: 2010-07-22T11:00:00+10:00
author: Aaron Parker
layout: post

permalink: /app-v-faq-9-can-app-v-be-used-to-run-16-bit-applications-on-windows-x64/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195382872"
categories:
  - FAQs
tags:
  - App-V
  - AppVFAQ
---
![AppV logo]({{site.baseurl}}/media/2010/06/AppVFAQLogo.png)

No, [App-V is not a compatibility solution]({{site.baseurl}}/virtualisation/app-v-faq-7-is-app-v-an-application-compatibility-solution). App-V does not provide any additional layers that applications can use when executing on different versions of Windows. Although 16-bit applications can be deployed on 32-bit Windows via App-V, it cannot be used to run 16-bit applications on 64-bit Windows.

If 64-bit Windows does not support 16-bit applications, then neither will App-V. The lack of 16-bit application support in x64 Windows is documented in this Microsoft Knowledgebase Article: [64-bit versions of Windows do not support 16-bit components, 16-bit processes, or 16-bit applications](http://support.microsoft.com/kb/896458):

> The x64-based versions of the Microsoft Windows Server 2003 operating systems and Microsoft Windows XP Professional x64 Edition do not support 16-bit programs, 16-bit processes, or 16-bit components. However, these 64-bit versions of Windows may recognize some 16-bit installers and automatically convert the 16-bit installer to a 32-bit installer.

## Resources

* [64-bit versions of Windows do not support 16-bit components, 16-bit processes, or 16-bit applications](http://support.microsoft.com/kb/896458)
* [You cannot install 16-bit applications on Windows XP for 64-bit platforms](http://support.microsoft.com/kb/298218/)
* [List of limitations in 64-Bit Windows](http://support.microsoft.com/kb/282423/)
* [A description of the differences between 32-bit versions of Windows Vista and 64-bit versions of Windows Vista](http://support.microsoft.com/kb/946765/)
* [Overview of the compatibility considerations for 32-bit programs on 64-bit versions of Windows Server 2003 and Windows XP](http://support.microsoft.com/kb/896456/)
* [Windows on Windows](http://en.wikipedia.org/wiki/Windows_on_Windows) and [WoW64](http://en.wikipedia.org/wiki/WOW64) at Wikipedia
