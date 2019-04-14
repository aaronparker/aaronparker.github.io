---
id: 1772
title: Display corruption with Mobile Intel GM45 Chipset
date: 2010-07-23T13:05:18+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/hardware/display-corruption-with-mobile-intel-gm45-chipset
permalink: /display-corruption-with-mobile-intel-gm45-chipset/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "196193705"
pd_rating:
  - 'a:8:{s:4:"type";s:1:"0";s:5:"votes";s:1:"1";s:6:"total1";s:1:"0";s:6:"total2";s:1:"0";s:6:"total3";s:1:"0";s:6:"total4";s:1:"0";s:6:"total5";s:1:"1";s:7:"average";s:6:"5.0000";}'
categories:
  - Hardware
---
I have a [Dell Latitude XT2]({{site.baseurl}}/hardware/windows-7-on-a-dell-latitiude-xt2), which includes the [Mobile Intel GM45 Chipset](http://www.intel.com/products/notebook/chipsets/gm45/gm45-overview.htm) (and the Mobile Intel Graphics Media Accelerator 4500MHD). On occasion I’ve experienced display corruptions issues that make working with the laptop somewhat difficult.

Here’s an example with Calculator, but picture this across the whole screen:

![Calculator showing graphics corruption]({{site.baseurl}}/media/2010/07/Calc.png)

This has persisted between BIOS and firmware upgrades and display driver versions (even when using the latest display driver- Mobile Intel 4 Series Express Chipset Family driver version 8.15.10.2119) so there currently appears to be no fix.

The workaround at the moment, is to disable [Enable VT for Direct IO](http://software.intel.com/en-us/articles/intel-virtualization-technology-for-directed-io-vt-d-enhancing-intel-platforms-for-efficient-virtualization-of-io-devices/) (or VT-d. To do this on the XT2 (and I presume other Dell models), go into the BIOS setup and remove the tick from the following checkbox:

  * _Virtualization Support_ / _VT for Direct IO_ / _Enable VT for Direct IO_