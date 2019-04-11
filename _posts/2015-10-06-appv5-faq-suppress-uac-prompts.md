---
id: 4157
title: 'App-V 5 FAQ: How Do I Suppress UAC Prompts in Applications Delivered with App-V?'
date: 2015-10-06T20:49:52+10:00
author: Aaron Parker
layout: post
guid: {{site.baseurl}}/?p=4157
permalink: /appv5-faq-suppress-uac-prompts/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "4198747748"
image: /media/2015/06/AppV5FAQ.png
categories:
  - FAQs
tags:
  - App-V
---
Some older applications (and perhaps even some newer applications) will prompt for elevation on Windows via User Account Control (UAC) - this might be a valid request for elevation, but in the case of many older applications it's because they expect to run with administrative rights.

Virtualizing an application via App-V can help with older applications by virtualizing rights to protected locations in the file system; however an application may still trigger a UAC prompt. It is possible to suppress these prompts and force the application to run with standard user rights.

There are two primary methods for suppressing these UAC prompts:

  1. Creating an application compatibility shim using the Microsoft Application Compatibility Toolkit
  2. Setting the _\_COMPAT\_LAYER environment variable

There are two excellent resources on each of these methods:

  * [On Application Compatibility and Shims with Regards to Applications Virtualized with App-V 4.x and 5.x](http://blogs.technet.com/b/gladiatormsft/archive/2013/10/09/app-v-on-application-compatibility-and-shims-with-regards-to-applications-virtualized-with-app-v-4-x-and-5-x.aspx) by [Steve Thomas](https://twitter.com/madvirtualizer)
  * [Suppressing UAC Prompts In App-V 5 With _\_COMPAT\_LAYER](http://packageology.com/2014/08/supressing-uac-prompts-in-appv5-with-compat-layer/) by [Dan Gough](https://twitter.com/packageologist)