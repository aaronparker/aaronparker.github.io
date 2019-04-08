---
id: 204
title: The Windows Network Status Icon is Evil
date: 2006-08-25T06:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/the-windows-network-status-icon-is-evil
permalink: /the-windows-network-status-icon-is-evil/
categories:
  - Microsoft
tags:
  - Terminal Server
---
I've always thought that turning the little icon that displays network traffic on is dumb. From remote RDP or ICA sessions, it creates and endless loop of traffic. Here's a quote from the &#8220;Advanced Concepts Guide: Citrix Presentation Server for Windows Version 4.0&#8221;

> Windows 2000 Server and Windows Server 2003 provide an option to show the network icon in the notification area. When this option is selected in a published  
> desktop environment, a network icon is displayed in the notification area within the session. The network icon blinks each time network traffic occurs. The network icon blinks for each update. When the network icon in the notification area blinks, it causes the ICA session to update. Because the ICA session is being updated, network traffic occurs that causes the network icon to blink. This causes an infinite feedback loop.

Also check out Mark Russinovich's [Explorerâ€™s Registry Polling](http://www.sysinternals.com/blog/2005/04/explorers-registry-polling.html). To cut a long story short, turns out that with the Windows Network Status icon turned on EXPLORER.EXE polls the registry twice a second. Now surely, however small it may be, this would have an effect on performance.