---
id: 2354
title: Disable Hibernation before enabling Hyper-V on a laptop
date: 2011-07-14T23:49:31+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/disable-hibernation-before-enabling-hyper-v-on-a-laptop/
permalink: /disable-hibernation-before-enabling-hyper-v-on-a-laptop/
dsq_thread_id:
  - "358741685"
categories:
  - Microsoft
tags:
  - Hyper-V
---
If you enable [Hyper-V on a laptop](http://blog.drtritsch.com/?p=165) (or any other machine where hibernation is enabled automatically) you’ll find that you won’t be able to delete the hibernation file (hiberfil.sys).&#160; Although hibernation is effectively disabled, the file remains in use once Windows has booted:

<img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="delete-hiberfilesys" border="0" alt="delete-hiberfilesys" src="{{site.baseurl}}.com/media/2011/07/delete-hiberfilesys.png" width="660" height="365" /> 

Additionally, in an effort to remove the lock on the file, you can’t use [POWERCFG](http://technet.microsoft.com/en-us/library/cc748940(WS.10).aspx) to disable hibernation after Hyper-V is installed:

<img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="powercfg" border="0" alt="powercfg" src="{{site.baseurl}}.com/media/2011/07/powercfg.png" width="660" height="277" /> 

While there’s [a work-around to get hibernation working](http://blogs.technet.com/b/doxley/archive/2008/09/05/getting-some-sleep.aspx),&#160; there’s not much to gain with hibernation enabled on [a fast SSD drive](http://www.ocztechnology.com/ocz-vertex-3-sata-iii-2-5-ssd.html). Especially when dual-booting puts space at a premium and the hibernation file is 8GB.

Just remember to disable hibernation before enabling Hyper-V with:

[code]POWERCFG -H OFF[/code]