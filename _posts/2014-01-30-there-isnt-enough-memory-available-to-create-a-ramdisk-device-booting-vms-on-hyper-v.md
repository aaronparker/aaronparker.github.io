---

title: '"There isn’t enough memory available to create a ramdisk device" booting VMs on Hyper-V'
date: 2014-01-30T12:38:22+10:00
author: Aaron Parker
layout: post

permalink: /there-isnt-enough-memory-available-to-create-a-ramdisk-device-booting-vms-on-hyper-v/
dsq_thread_id:
  - "2195003334"
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

![NotEnoughMemory.png]({{site.baseurl}}/media/2014/01/NotEnoughMemory.png)

Thankfully, the error message is pretty self explanatory.

Booting a standard Windows ISO does not result in the above error, but in this particular case, I'm booting a [Gen 2 VM](http://technet.microsoft.com/en-us/library/dn282285.aspx) with a customised [Microsoft Deployment Toolkit](http://technet.microsoft.com/en-US/windows/dn475741.aspx) boot ISO with a scratch space size of 64Mb (I assume though, that the scratch space could be just about any size).

The VM is configured with [dynamic memory](http://technet.microsoft.com/en-us/library/hh831766.aspx) enabled and the default startup RAM size of 512Mb. This issue is easily remedied by increasing the startup RAM size. The minimum RAM size can then still be configured for 512Mb, if required.

![DynamicMemory.png]({{site.baseurl}}/media/2014/01/DynamicMemory.png)
