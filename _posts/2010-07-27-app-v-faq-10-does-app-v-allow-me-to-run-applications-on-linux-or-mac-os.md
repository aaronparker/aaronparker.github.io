---
id: 1694
title: 'App-V FAQ: Does App-V allow me to run applications on Linux or Mac OS X?'
date: 2010-07-27T11:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/app-v-faq-10-does-app-v-allow-me-to-run-applications-on-linux-or-mac-os
permalink: /app-v-faq-10-does-app-v-allow-me-to-run-applications-on-linux-or-mac-os/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195466979"
categories:
  - FAQs
tags:
  - App-V
  - AppVFAQ
---
<img style="margin: 0px 10px 5px 0px; display: inline;" src="https://stealthpuppy.com/wp-content/uploads/2010/06/AppVFAQLogo.png" alt="" align="left" />

No, just like [App-V does not allow you to run 16-bit applications on 64-bit Windows](https://stealthpuppy.com/virtualisation/app-v-faq-9-can-app-v-be-used-to-run-16-bit-applications-on-windows-x64), it also does not provide you with the means to run Windows applications on non-Windows operating systems such as Linux or Mac OS X. There are two reasons for this:

1. App-V does not provide any additional layers that applications can utilise at runtime. Providing APIs and other dependencies necessary for running Windows applications is the job of Windows itself – if the feature that the application expects is not offered by Windows, then you’ll have issue attempting to run that application via application virtualisation solutions including App-V.

2. Like other application virtualisation products such as [Symantec SVS](http://www.symantec.com/business/endpoint-virtualization-suite) (and unlike [VMware ThinApp](http://www.vmware.com/products/thinapp/)), App-V virtualised applications require the presence a client. The App-V Client contains some kernel mode components so installing it on other operating systems would certainly be a challenge.

If you are looking to run Windows applications on non-Windows operating systems, then consider hardware virtualisation solutions such as [VMware Fusion](http://www.vmware.com/products/fusion/) or [Workstation](http://www.vmware.com/products/workstation/), [Oracle VirtualBox](http://www.virtualbox.org/) or [Parallels Desktop](http://www.parallels.com/computing/), which can be used to run a virtual instance of Windows (and thus the App-V Client) on top of the other OS. Or if you’re looking to run Windows applications directly on Linux, Solaris or Mac OS X, then [WINE](http://www.winehq.org/) is the way to go.