---
id: 803
title: 'CLI09-IS: Microsoft Application Virtualization discussion'
date: 2008-11-13T22:05:05+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=803
permalink: /cli09-is-microsoft-application-virtualization-discussion/
categories:
  - Microsoft
tags:
  - App-V
  - TechEd EMEA 2008
---
<img style="margin: 0px 0px 10px 15px; display: inline" src="https://stealthpuppy.com/wp-content/uploads/2008/11/teched2008logo.jpg" alt="" align="right" />

This was an open discussion session where customers were able to talk directly with some of the App-V team. There were some interesting details brought up in this session including:

  * A couple of customers in the room were managing 3500 and 5000 applications respectively and one of them was even supporting applications dating back to 1982!
  * _Do you need to re-sequence your application when integrating App-V with SCCM 2007 R2_? You can upgrade your existing sequences using the command line sequencer tool in 4.5 and this then generate the manifest XML file for use by SCCM. I get the impression that only 4.5 sequences are supported when managed with SCCM, however I’m sure that I’ve had 4.2 sequences working, but I could be wrong.
  * _Is Office 2007 supported in App-V_? The release of Office 2007 Service Pack 1 brings this suite into proper support with App-V. Office 2007 does perform better under 4.5 that it did with 4.2.
  * One of the points brought up by Gene Ferioli, was about sequencing applications on one OS and getting them to work on another. In most cases this works and this has been the general rule for us so far, but he used Communicator as an example. Communicator was sequenced on Windows Vista but it did not run correctly on Windows Server 2008. Even though these platforms are essentially the same, Vista had a specific DLL that 2008 is missing (he didn’t go into detail). The bottom line here is that you must fully test your applications on each of your client platforms – App-V doesn’t remove the need to test.

<div>
  This session was interesting to observe and be a part of and I can see that the App-V team has a very good understanding of the issues and challenges customers face and were very keen on feedback for future versions.
</div>