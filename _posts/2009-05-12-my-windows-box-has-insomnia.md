---
id: 1097
title: My Windows box has insomnia
date: 2009-05-12T23:19:26+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=1097
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
When Windows just won&#8217;t stay in sleep mode there&#8217;s a simple fix. First you need to identify which component keeps bringing Windows out of sleep mode.

To do that, [open the System event log](http://support.microsoft.com/kb/308427) and find any events from source &#8216;Power-Troubleshooter&#8217; that indicate that the system has returned from sleep mode &#8211; similar to this:

<img class="alignnone size-full wp-image-1098" title="power-troubleshooter1" src="http://stealthpuppy.com/wp-content/uploads/2009/05/power-troubleshooter1.png" alt="power-troubleshooter1" width="590" height="409" srcset="http://192.168.0.89/wp-content/uploads/2009/05/power-troubleshooter1.png 590w, http://192.168.0.89/wp-content/uploads/2009/05/power-troubleshooter1-150x103.png 150w, http://192.168.0.89/wp-content/uploads/2009/05/power-troubleshooter1-300x207.png 300w" sizes="(max-width: 590px) 100vw, 590px" /> 

In my case, the network adapter was the problem. I think my router is sending some weird packets around the network. I can&#8217;t fix the source of the problem (it&#8217;s a pretty basic router), but I can configure the network adapter to prevent it from waking the computer.

Open the properties of the adapter in Device Manager and either untick &#8216;Allow the device to wake the computer&#8217; or tick &#8216;Only allow a magic packet to wake the computer&#8217; and the computer will stay in sleep mode.

<img class="alignnone size-full wp-image-1099" title="networkadapterproperties" src="http://stealthpuppy.com/wp-content/uploads/2009/05/networkadapterproperties.png" alt="networkadapterproperties" width="414" height="335" srcset="http://192.168.0.89/wp-content/uploads/2009/05/networkadapterproperties.png 414w, http://192.168.0.89/wp-content/uploads/2009/05/networkadapterproperties-150x121.png 150w, http://192.168.0.89/wp-content/uploads/2009/05/networkadapterproperties-300x242.png 300w" sizes="(max-width: 414px) 100vw, 414px" /> 

Related links:

  * [A computer that is running Windows Vista appears to sleep and then immediately wake](http://support.microsoft.com/kb/927821)
  * [Controlling which devices will wake the computer out of sleep](http://blogs.msdn.com/oldnewthing/archive/2008/02/13/7658352.aspx)