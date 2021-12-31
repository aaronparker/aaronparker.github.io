---

title: Lessons from the field - Virtual PC
date: 2005-09-20T23:42:00+10:00
author: Aaron Parker
layout: post

permalink: /lessons-from-the-field-virtual-pc/
categories:
  - Microsoft
tags:
  - Virtual-PC
---
Today's lesson is: Virtual PC and shared folders are slow. I mean _really, really_ slow. Try install Exchange Server 2003 Service Pack 1 into a VM with the source files in a shared folder (Virtual PC shared folders), I almost slit my wrists waiting for that to install. It ended up taking well over an hour. My work around: ROBOCOPY the sources files onto the VM's hard drive and install from there.
