---
id: 571
title: Intel vPro and Network Access Protection
date: 2008-06-09T17:43:16+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/access-control/intel-vpro-and-network-access-protection
permalink: /intel-vpro-and-network-access-protection/
categories:
  - Microsoft
tags:
  - NAP
---
Here&#8217;s something I found interesting about [Intel&#8217;s vPro](http://www.intel.com/technology/vpro/index.htm) management tool &#8211; Network Access Protection [interaction is supported in hardware](http://communities.intel.com/openport/docs/DOC-1680) &#8211; even before the operating system has loaded. This isn&#8217;t mean to replace the agent in the OS, but it great stuff from a management perspective. Here&#8217;s the details:

> **Q9: How does Network Access Protection (NAP) work with vPro?**  
> **A9:** Beginning with AMT 4.0 in July 2008, network security credentials can be embedded in vPro. This capability allows the Microsoft posture profile to be stored in hardware (in protected, persistent memory), and presented to the network even if the OS is absent. The network can now authenticate a PC before the OS and applications load, and before the PC is allowed to access the network. This capability also allows IT administrators to use their existing PXE infrastructure within a Microsoft NAP network. Statement of Health information for vPro clients including the System Boot Log, Approved Firmware versions & Security Parameters, and a digitally signed certificate can be sent back to the NAP Policy Server.