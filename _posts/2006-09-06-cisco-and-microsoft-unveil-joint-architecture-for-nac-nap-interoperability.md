---
id: 186
title: Cisco and Microsoft Unveil Joint Architecture for NAC-NAP Interoperability
date: 2006-09-06T16:50:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/cisco-and-microsoft-unveil-joint-architecture-for-nac-nap-interoperability
permalink: /cisco-and-microsoft-unveil-joint-architecture-for-nac-nap-interoperability/
categories:
  - Microsoft
tags:
  - NAP
---
Microsoft and Cisco annouced some time ago that they were working on [NAP](http://www.microsoft.com/nap) and [NAC](http://www.cisco.com/go/nac) interoperability. They&#8217;ve demonstrated this recently at the [Security Standard](http://www.thesecuritystandard.net/) conference in Boston (all the cool stuff seems to happen in Boston). You can view the Microsoft PressPass update [here](http://www.microsoft.com/presspass/press/2006/sep06/09-06SecStandardNACNAPPR.mspx) and the Cisco press release [here](http://newsroom.cisco.com/dlls/2006/prod_090606.html?CMP=ILC-001) (they&#8217;re the same thing, no need to read both). Cisco and Microsoft have cross-licensed their protocols to make this interoperability work. You can view a white-paper on this architecture here:

[CiscoÂ NAC and MicrosoftÂ NAP Interoperability Architecture](http://download.microsoft.com/download/d/0/8/d08df717-d752-4fa2-a77a-ab29f0b29266/NAC-NAP_Whitepaper.pdf)

What&#8217;s cool about this, is that the NAP agent that is a part of Windows Vista and Longhorn Server can be used with Cisco NAC. Which means no loading extra software to operate with NAC. However, it appears that even though Windows XP Service Pack 2 will receive a NAP agent from Microsoft, the Cisco Trust Agent for NAC software will still be required to operate with NAC. Another item to note is that agent updates and modules for Windows Vista and Longhorn Server can be updated and deployed via Windows Server Update Services.