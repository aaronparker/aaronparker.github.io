---
id: 3553
title: '"There isn’t enough memory available to create a ramdisk device" booting VMs on Hyper-V'
date: 2014-01-30T12:38:22+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=3553
permalink: /there-isnt-enough-memory-available-to-create-a-ramdisk-device-booting-vms-on-hyper-v/
dsq_thread_id:
  - "2195003334"
pd_rating:
  - 'a:8:{s:4:"type";s:1:"0";s:5:"votes";s:1:"1";s:6:"total1";s:1:"0";s:6:"total2";s:1:"0";s:6:"total3";s:1:"1";s:6:"total4";s:1:"0";s:6:"total5";s:1:"0";s:7:"average";s:6:"3.0000";}'
categories:
  - Automation
tags:
  - Hyper-V
  - MDT
---
Booting a virtual machine under Windows Server 2012 R2 Hyper-V may result in the following:

> Recovery  
> Your PC needs to be repaired  
> There isn’t enough memory available to create a ramdisk device.  
> Error code: 0x0000017

[<img class="alignnone size-full wp-image-3554" alt="There isn’t enough memory available to create a ramdisk device" src="https://stealthpuppy.com/media/2014/01/NotEnoughMemory.png]({{site.baseurl}}/media/2014/01/NotEnoughMemory.png)

Thankfully, the error message is pretty self explanatory.

Booting a standard Windows ISO does not result in the above error, but in this particular case, I'm booting a [Gen 2 VM](http://technet.microsoft.com/en-us/library/dn282285.aspx) with a customised [Microsoft Deployment Toolkit](http://technet.microsoft.com/en-US/windows/dn475741.aspx) boot ISO with a scratch space size of 64Mb (I assume though, that the scratch space could be just about any size).

The VM is configured with [dynamic memory](http://technet.microsoft.com/en-us/library/hh831766.aspx) enabled and the default startup RAM size of 512Mb. This issue is easily remedied by increasing the startup RAM size. The minimum RAM size can then still be configured for 512Mb, if required.

[<img class="alignnone size-full wp-image-3556" alt="DynamicMemory" src="https://stealthpuppy.com/media/2014/01/DynamicMemory.png]({{site.baseurl}}/media/2014/01/DynamicMemory.png)