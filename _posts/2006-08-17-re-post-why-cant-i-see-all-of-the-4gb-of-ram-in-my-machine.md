---
id: 253
title: 'Re-post: Why can't I see all of the 4GB of RAM in my machine?'
date: 2006-08-17T11:37:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/re-post-why-cant-i-see-all-of-the-4gb-of-ram-in-my-machine
permalink: /re-post-why-cant-i-see-all-of-the-4gb-of-ram-in-my-machine/
categories:
  - Microsoft
tags:
  - Memory-Management
---
<a target="_blank" href="http://blogs.msdn.com/oldnewthing/archive/2006/08/14/699521.aspx">Raymond Chen explains why newer servers cannot see the full 4GB</a> in the machine until you add the /PAE switch, even though this is usually required to see memory above 4GB. Essentially devices in the machine are using address space where the machine usually expects to see the remaining RAM. Add the /PAE switch allows the machine to see the complete 4GB.

> Remember that in the absence of the /PAE switch, the Windows memory manager is limited to a 4GB physical address space. Most of that address space is filled with RAM, but not all of it. Memory-mapped devices (such as your video card) will use some of that physical address space, as will the BIOS ROMs. After all the non-memory devices have had their say, there will be less than 4GB of address space available for RAM below the 4GB physical address boundary. The rest of it went above the boundary.

This is something I've seen in the past 12 months with new servers including the IBM BladeCenter and xSeries servers. Until now, I've not seen any better explanation. Raymond Chen is a gem.