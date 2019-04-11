---
id: 1697
title: 'App-V FAQ: What are the dependencies of the App-V Client?'
date: 2010-07-28T11:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/app-v-faq-11-what-are-the-dependencies-of-the-app-v-client
permalink: /app-v-faq-11-what-are-the-dependencies-of-the-app-v-client/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195382932"
categories:
  - FAQs
tags:
  - App-V
  - AppVFAQ
---
<img style="margin: 0px 0px 5px 10px; display: inline" align="right" src="{{site.baseurl}}.com/media/2010/06/AppVFAQLogo.png" />

The [current versions of App-V]({{site.baseurl}}/virtualisation/app-v-faq-5-what-are-the-current-versions-of-app-v) have similar dependencies; however there are some differences with the newer 4.6 client. Of course the main dependency of the App-V Client [is Windows itself]({{site.baseurl}}/virtualisation/app-v-faq-10-does-app-v-allow-me-to-run-applications-on-linux-or-mac-os).

### App-V 4.5

The App-V 4.5 client supports the following 32-bit operating systems:

  * Windows XP SP2+ – note that [support for Windows XP Service Pack 2 has ended](http://windows.microsoft.com/en-us/windows/help/end-support-windows-xp-sp2-windows-vista-without-service-packs?os=other). Upgrade to Service Pack 3 now.
  * Windows Vista RTM+ – note that [support for Windows Vista RTM has ended](http://windows.microsoft.com/en-us/windows/help/end-support-windows-xp-sp2-windows-vista-without-service-packs?os=other). Upgrade to Service Pack 2 now.
  * Windows 7 RTM+
  * Windows Server 2003 SP1+
  * Windows Server 2008 SP1+

The following dependencies are required

  * [MSXML](http://en.wikipedia.org/wiki/MSXML) 6.0 (included in Windows XP Service Pack 3 and all newer operating systems)
  * Microsoft Application Error Reporting
  * Microsoft [Visual C++ 2005 Redistributable](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=766a6af7-ec73-40ff-b072-9112bab119c2)

If you are deploying any 64-bit operating systems which will include any Windows Server 2008 R2 Remote Desktop Services deployments, you will need to deploy the App-V Client 4.6.

### App-V 4.6

The App-V 4.6 client supports the following 32-bit and 64-bit operating systems:

  * Windows XP SP2+ – note that [support for Windows XP Service Pack 2 has ended](http://windows.microsoft.com/en-us/windows/help/end-support-windows-xp-sp2-windows-vista-without-service-packs?os=other). Upgrade to Service Pack 3 now.
  * Windows Vista RTM+ – note that [support for Windows Vista RTM has ended](http://windows.microsoft.com/en-us/windows/help/end-support-windows-xp-sp2-windows-vista-without-service-packs?os=other). Upgrade to Service Pack 2 now.
  * Windows 7 RTM+
  * Windows Server 2003 SP1+
  * Windows Server 2008 SP1+
  * Windows Server 2008 R2 RTM+

The following dependencies are required

  * MSXML 6.0 (included in Windows XP Service Pack 3 and all newer operating systems)
  * Microsoft Application Error Reporting
  * Microsoft [Visual C++ 2005 Redistributable](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=766a6af7-ec73-40ff-b072-9112bab119c2)
  * Microsoft [Visual C++ 2008 Redistributable](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=2051a0c1-c9b5-4b0a-a8f5-770a549fd78c)

All dependencies will be installed by SETUP.EXE; however for custom deployments of the operating system (using the Windows Installer file), the dependencies can be deployed separately.