---
id: 802
title: 'CLI02-PD: New features in App-V 4.5'
date: 2008-11-06T16:18:01+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/cli02-pd-new-features-in-app-v-45
permalink: /cli02-pd-new-features-in-app-v-45/
categories:
  - Microsoft
tags:
  - App-V
  - TechEd EMEA 2008
---
<img style="margin: 0px 15px 10px 0px; display: inline" align="left" src="{{site.baseurl}}.com/media/2008/11/teched2008logo.jpg" />This was a session to demo the new features in App-V 4.5, mainly aimed at those people already familiar with App-V. It was presented by Gene Ferioli, a senior program manager on the App-V team. Gene worked with the SCCM team on the App-V integration for SCCM 2007 R2.

This session was pretty straight-forward but the most interesting part was when Gene demonstrated automatic loading of virtualised applications from a USB thumb drive. The App-V team have written a proof of concept utility (SFTMON) that runs in the background and monitors for the insertion of removable media. It then parses the device for manifest XML files created for 4.5 sequences and uses those to automatically add the applications into the local cache.

This is all achieved with SFTMIME commands, so there’s nothing stopping anyone else from creating a utility like this. The team may post this code on the App-V blog or make it available as a resource kit tool, but no firm plans have been made so don’t expect to see this soon.

This was a pretty cool demo which has great use cases. Essentially you could take all of your applications with you, plug in the thumb drive and way you go. A couple of the other app-virt vendors support this scenario today, but this is great news for App-V users.

Another interesting note is that there is currently a design change in to create a notification bubble that let users know when their applications have finished loading to 100%. Whether this actually makes it into the product some time in the future is another story.