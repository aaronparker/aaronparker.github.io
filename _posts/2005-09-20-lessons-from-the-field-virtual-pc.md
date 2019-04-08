---
id: 296
title: 'Lessons from the field: Virtual PC'
date: 2005-09-20T23:42:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/lessons-from-the-field-3
permalink: /lessons-from-the-field-virtual-pc/
categories:
  - Microsoft
tags:
  - Virtual-PC
---
Today&#8217;s lesson is: Virtual PC and shared folders are slow. I mean _really, really_ slow. Try install Exchange Server 2003 Service Pack 1 into a VM with the source files in a shared folder (Virtual PC shared folders), I almost slit my wrists waiting for that to install. It ended up taking well over an hour. My work around: ROBOCOPY the sources files onto the VM&#8217;s hard drive and install from there.

<img width="1" src="http://blogs.virtualserver.tv/aggbug.aspx?PostID=131" height="1" />