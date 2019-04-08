---
id: 301
title: Secure access to Exchange
date: 2005-08-17T19:25:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/secure-access-to-exchange
permalink: /secure-access-to-exchange/
categories:
  - Microsoft
tags:
  - Exchange
  - ISA Server
---
Placing an Exchange Front-end server in the DMZ does nothing to increase security. This configuration increases complexity and opens many holesÂ through your firewall. How many of those firewalls are inspecting that traffic? An Exchange Front-end server should be implemented for performance and to serve OWA in multiple mailbox (back-end) server configurations. The best solution for offering secure remote access to Exchange Server is via [ISA Server](http://www.microsoft.com/isaserver/solutions/exchange.mspx), whether this is the edge-firewall or as a bastion host in the DMZ. [This presentation](http://www.steveriley.ms/Presentations/242.aspx) by [Steve Riley](http://www.steveriley.ms/Steve+Riley/default.aspx) is an excellent resource for explaining why ISA Server offers the best protection for access to Exchange. Everyone involved in deploying or administering Exchange should read it.<img width="1" src="http://blogs.virtualserver.tv/aggbug.aspx?PostID=42" height="1" />