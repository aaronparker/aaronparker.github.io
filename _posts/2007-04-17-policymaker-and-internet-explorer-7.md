---
id: 60
title: PolicyMaker and Internet Explorer 7
date: 2007-04-17T20:55:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/policymaker-and-internet-explorer-7
permalink: /policymaker-and-internet-explorer-7/
dsq_thread_id:
  - "195378426"
categories:
  - Applications
tags:
  - Internet-Explorer
  - PolicyMaker
---
If you are working with [PolicyMaker Registry Extension](http://www.stealthpuppy.com/blogs/travelling/archive/2007/03/26/why-are-you-still-writing-adm-templates.aspx), or any of the other PolicyMaker products, you will find the Microsoft Management Console will crash when you select the User Settings / Registry node when editing the Group Policy on machine that also has Internet Explorer 7 installed. If you look at the crash details you will see that the fault is with MSHTML.DLL.

Fortunately there is a work around until the next version of PolicyMaker is released to address the issue. The DesktopStandard knowledgebase has [details on the issue and the workaround](http://www.desktopstandard.com/kb/article.aspx?id=10569):

> **SYMPTOMS:**  
> When PolicyMaker is installed on a computer with Internet Explorer 7 also installed, attempting to configure PolicyMaker items in the GPMC results in the following error message:
> 
> Event ID: 1000 Faulting application mmc.exe, version 5.1.600.2180, faulting module mshtml.dll, version 7.0.5730.11,  
> fault address 0x00156e17
> 
> **RESOLUTION:  
>** This will be fixed in the next release of PolicyMaker products.
> 
> As a workaround, Internet Explorer 7 should be uninstalled, or the PolicyMaker snapin should be installed on a computer that does not have Internet Explorer 7 installed. Alternatively, you can disable the PolicyMaker extended view tab in the MMC. This prevents the errors and still allows you to edit PolicyMaker items.
> 
> Simply rename the following Registry keys:
> 
> HKEY\_CLASSES\_ROOT\CLSID\{45B01F1C-5AC2-458C-9457-42A81B34A26D}  
> HKEY\_CLASSES\_ROOT\CLSID\{A8EEA101-3610-4D97-A8AE-E88E50DD5488}  
> HKEY\_CLASSES\_ROOT\CLSID\{6EA87A55-745F-4c28-8DDC-B679A68E3E01}
> 
> The easiest thing to do is add a dash to the end of the key name, so it will be disabled, but you can easily find it to re-enable it later. Note that you may not have all three of these keys, if you don&#8217;t have all of our products installed. Just rename the ones that you have.