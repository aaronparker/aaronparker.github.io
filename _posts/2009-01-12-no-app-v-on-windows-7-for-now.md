---

title: No App-V on Windows 7 (for now)
date: 2009-01-12T19:17:15+10:00
author: Aaron Parker
layout: post

permalink: /no-app-v-on-windows-7-for-now/
aktt_notify_twitter:
  - 'yes'
dsq_thread_id:
  - "195381399"
categories:
  - Microsoft
tags:
  - App-V
---
I was testing this myself yesterday without luck, but it looks like [App-V does not currently run on Windows 7](http://social.technet.microsoft.com/Forums/en-US/appvclients/thread/82fd4582-5acb-44b4-90bf-2c522e2d3f3d).

> App-V 4.5 is not currently supported or functional on Win7.  Info on Win7 support will be published soon.

App-V 4.5 will install successfully on Windows 7 x86 and you can load an application into the cache; however you will run into some issues when launching virtual applications. Interestingly, VMware [ThinApp also has issues on Windows 7](http://social.technet.microsoft.com/Forums/en/w7itproappcompat/thread/3cca4e45-247a-48b3-bbc8-baded3a4a0da). I would expect all of the application virtualisation vendors to have support for Windows 7 in time for the release.

My recommendation would be to test your applications running natively on Windows 7 before attempting to run them virtually on the new platform – application virtualisation is not a compatibility layer.