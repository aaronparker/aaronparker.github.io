---
id: 274
title: Sizing Terminal Servers and the 4GB memory limit(?)
date: 2006-05-22T23:31:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/sizing-terminal-servers-and-the-4gb-memory-limit
permalink: /sizing-terminal-servers-and-the-4gb-memory-limit/
aktt_notify_twitter:
  - 'yes'
categories:
  - Microsoft
tags:
  - Memory-Management
---
Always an interesting discussion around the traps is that of how much memory to install in Terminal Servers. Due to the nature of Terminal Server and limitations of the 32bit architecture, kernel address space will be exhausted before a Terminal Server will run out of RAM (depending on the number of users, of course). Brian Madden has [an excellent article](http://www.brianmadden.com/content/content.asp?ID=69) discussing this limitation.

Microsoft, on the other hand, has the [Terminal Server Capacity and Scaling white paper](http://www.microsoft.com/windowsserver2003/techinfo/overview/tsscaling.mspx). This paper discusses testing methodologies for sizing Terminal Servers and it has a section on enabling Physical Address Extension (PAE) to allow Windows to access more than 4GB of RAM. It specifically lists the configuration of a test machine with 6GB of RAM. I think I'm now officially confused. Someone must have a definitive answer.

Whilst I'm on this subject, I must plug [AppSense Performance Manager](http://www.appsense.com/content/products/products.asp#pmse). This tool helped us with a Terminal Server farm, on IBM BladeCentre hardware (4GB RAM in each server) hitting the wall at around 120 users per server. Performance Manager got us to around 125 users per server with 1GB of RAM still free.