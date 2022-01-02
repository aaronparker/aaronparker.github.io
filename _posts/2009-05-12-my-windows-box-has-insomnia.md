---

title: My Windows box has insomnia
date: 2009-05-12T23:19:26+10:00
author: Aaron Parker
layout: post

permalink: /my-windows-box-has-insomnia/
aktt_notify_twitter:
  - 'yes'
aktt_tweeted:
  - "1"
categories:
  - Microsoft
tags:
  - Power Management
---
When Windows just won't stay in sleep mode there's a simple fix. First you need to identify which component keeps bringing Windows out of sleep mode.

To do that, [open the System event log](http://support.microsoft.com/kb/308427) and find any events from source 'Power-Troubleshooter' that indicate that the system has returned from sleep mode - similar to this:

![]({{site.baseurl}}/media/2009/05/power-troubleshooter1.png)

In my case, the network adapter was the problem. I think my router is sending some weird packets around the network. I can't fix the source of the problem (it's a pretty basic router), but I can configure the network adapter to prevent it from waking the computer.

Open the properties of the adapter in Device Manager and either untick 'Allow the device to wake the computer' or tick 'Only allow a magic packet to wake the computer' and the computer will stay in sleep mode.

![]({{site.baseurl}}/media/2009/05/networkadapterproperties.png)

Related links:

* [A computer that is running Windows Vista appears to sleep and then immediately wake](http://support.microsoft.com/kb/927821)
* [Controlling which devices will wake the computer out of sleep](http://blogs.msdn.com/oldnewthing/archive/2008/02/13/7658352.aspx)
  