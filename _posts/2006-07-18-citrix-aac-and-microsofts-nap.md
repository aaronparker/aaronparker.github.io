---
id: 265
title: 'Citrix AAC and Microsoft's NAP'
date: 2006-07-18T14:17:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/citrix-aac-and-microsofts-nap
permalink: /citrix-aac-and-microsofts-nap/
categories:
  - Microsoft
tags:
  - Access-Gateway
  - NAP
---
One of the great features of Citrix Advanced Access Control is the ability to control access to internal resources from trusted machines with End Point Analysis. Citrix have implemented their own client and server components to perform end-point analysis and ensure that client machines are safe for access.

Microsoft are implementing their own tools for controlling access to the network with [Network Access Protection](http://www.microsoft.com/nap). Microsoft are touting NAP as a platform rather than a product. Third parties will be able to extend NAP with server components (Symantec for example, will be able to make their AntiVirus server NAP aware). The client from Microsoft will be integrated into Windows Vista and Longhorn Server, plus supported on Windows XP Service Pack 2 and Windows Server 2003 Service Pack 1. Support for third party clients will also be made available (from 3rd party vendors, not Microsoft), so that NAP can be extended to Linux and Mac OS machines.

Given the fairly broad install base that the NAP client will eventually enjoy and what I expect to be broad support from third party vendors, surely it would be advantageous to remove the End Point Analysis components from AAC and support NAP instead. This way AAC could interoperate with complete platform including any components that will extend NAP beyond what is out if the box. AAC could also then support other clients rather than just Windows 2000 Service Pack 4 and Windows XP Service Pack 2 that the current version supports. As as network engineer, it would be far simpler to support a single policy framework.

There's a reasonably detailed webcast about NAP worth checking out that can be found [here](https://www118.livemeeting.com/cc/mseventsbmo/view?id=1032297525&role=attend&pw=63A049C8).