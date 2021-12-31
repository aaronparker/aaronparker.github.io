---
id: 1217
title: 'Dell owners - avoid the IDT 92HDxxx HD Audio driver'
date: 2009-10-29T00:19:30+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=1217
permalink: /dell-owners-avoid-the-idt-92hdxxx-hd-audio-driver/
aktt_notify_twitter:
  - 'yes'
aktt_tweeted:
  - "1"
dsq_thread_id:
  - "195382013"
categories:
  - Hardware
tags:
  - Dell
  - Drivers
  - Virtualization
---
I've been mucking around with [MDT 2010](http://technet.microsoft.com/en-us/solutionaccelerators/dd407791.aspx) lately, which has made it pretty simple to create an unattended install routine for my [Dell Latitude XT2]({{site.baseurl}}/hardware/windows-7-on-a-dell-latitiude-xt2) (hopefully more on that soon) and to inject drivers into the build; however in doing so I've found a nasty bug in the [IDT 92HDxxx HD Audio](http://support.euro.dell.com/support/downloads/download.aspx?c=uk&cs=ukbsdt1&l=en&s=bsd&releaseid=R230211&SystemID=lat_xt2&servicetag=64HW94J&os=W732&osl=en&deviceid=16105&devlib=0&typecnt=0&vercnt=2&catid=-1&impid=-1&formatcnt=1&libid=3&typeid=-1&dateid=-1&formatid=-1&fileid=330934) drivers from Dell (version 6.10.0.6217, A09).

This particular version doesn't actually work at all, i.e. no sound plays. In addition, media applications, such as Adobe Flash, Windows Media Player and [Spotify](http://spotify.com/), and any system components that uses audio locks up when attempting to play sound. These drivers are listed on the Dell support site for the following systems:

<div id="_mcePaste" style="position: absolute; left: -10000px; top: 0px; width: 1px; height: 1px; overflow-x: hidden; overflow-y: hidden;">
  Latitude E4200
</div>

<div id="_mcePaste" style="position: absolute; left: -10000px; top: 0px; width: 1px; height: 1px; overflow-x: hidden; overflow-y: hidden;">
  Latitude E4300
</div>

<div id="_mcePaste" style="position: absolute; left: -10000px; top: 0px; width: 1px; height: 1px; overflow-x: hidden; overflow-y: hidden;">
  Latitude E5400
</div>

<div id="_mcePaste" style="position: absolute; left: -10000px; top: 0px; width: 1px; height: 1px; overflow-x: hidden; overflow-y: hidden;">
  Latitude E5500
</div>

<div id="_mcePaste" style="position: absolute; left: -10000px; top: 0px; width: 1px; height: 1px; overflow-x: hidden; overflow-y: hidden;">
  Latitude E6400
</div>

<div id="_mcePaste" style="position: absolute; left: -10000px; top: 0px; width: 1px; height: 1px; overflow-x: hidden; overflow-y: hidden;">
  Latitude E6400 ATG
</div>

<div id="_mcePaste" style="position: absolute; left: -10000px; top: 0px; width: 1px; height: 1px; overflow-x: hidden; overflow-y: hidden;">
  Latitude E6400 XFR
</div>

<div id="_mcePaste" style="position: absolute; left: -10000px; top: 0px; width: 1px; height: 1px; overflow-x: hidden; overflow-y: hidden;">
  Latitude E6500
</div>

<div id="_mcePaste" style="position: absolute; left: -10000px; top: 0px; width: 1px; height: 1px; overflow-x: hidden; overflow-y: hidden;">
  Latitude XT2
</div>

<div id="_mcePaste" style="position: absolute; left: -10000px; top: 0px; width: 1px; height: 1px; overflow-x: hidden; overflow-y: hidden;">
  Dell Precision Mobile WorkStation M2400
</div>

<div id="_mcePaste" style="position: absolute; left: -10000px; top: 0px; width: 1px; height: 1px; overflow-x: hidden; overflow-y: hidden;">
  Dell Precision Mobile WorkStation M4400
</div>

<div id="_mcePaste" style="position: absolute; left: -10000px; top: 0px; width: 1px; height: 1px; overflow-x: hidden; overflow-y: hidden;">
  Dell Precision Mobile WorkStation M6400
</div>

  * Latitude E4200
  * Latitude E4300
  * Latitude E5400
  * Latitude E5500
  * Latitude E6400
  * Latitude E6400 ATG
  * Latitude E6400 XFR
  * Latitude E6500
  * Latitude XT2
  * Dell Precision Mobile WorkStation M2400
  * Dell Precision Mobile WorkStation M4400
  * Dell Precision Mobile WorkStation M6400

I've tested these on a 32-bit install of Windows 7 on two machines - a Latitude XT2 and a Latitude E4200, with the same result. Fortunately though, the drivers are not required for playing sound - Windows 7 will find the audio hardware out of the box.

If you have the same issue, open Device Manager and uninstall the device labelled _IDT High Definition Audio CODEC_, be sure to also tick the option _Delete the driver software for this device_ to remove the driver completely. Here's what you'll see in Device Manager:

<p style="text-align: center;">
  <img class="size-full wp-image-1218  aligncenter" title="AudioDrivers" src="{{site.baseurl}}/media/2009/10/AudioDrivers.png" alt="AudioDrivers" width="380" height="124" srcset="{{site.baseurl}}/media/2009/10/AudioDrivers.png 380w, {{site.baseurl}}/media/2009/10/AudioDrivers-150x48.png 150w, {{site.baseurl}}/media/2009/10/AudioDrivers-300x97.png 300w" sizes="(max-width: 380px) 100vw, 380px" />
</p>

Now here's the weird part, these audio drivers also prevent the Hyper-V virtual machine remote console client (VMCONNECT.EXE) from connecting to a VM. You'll see the client window open but no remote console will be displayed. Odd stuff.