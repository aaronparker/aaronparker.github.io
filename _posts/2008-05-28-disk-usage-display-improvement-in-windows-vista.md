---
id: 566
title: Disk Usage Display Improvement In Windows Vista
date: 2008-05-28T18:34:30+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/windows/disk-usage-display-improvement-in-windows-vista
permalink: /disk-usage-display-improvement-in-windows-vista/
dsq_thread_id:
  - "195380635"
categories:
  - Microsoft
tags:
  - Windows Explorer
---
I've stumbled across a nice usability improvement in Windows Vista that had escaped me until today - the display of free disk space. Of course this feature has been in Windows Explorer since Windows 95, but the improvement in Windows Vista and Windows Server 2008 is the reporting of disk space when a drive is mapped to a remote share with disk quotas enabled.

In my demo environment, I have configured 200Mb quota for all users' home drives. If you look at the drive properties under Windows XP you will see the complete capacity of the remote disk including used and free space with no indication that any quotas are in place.

<img border="0" alt="DiskSpace1" src="{{site.baseurl}}/media/2008/05/diskspace1.png" width="303" height="358" /> 

The same disk properties dialog in Windows Vista shows only the capacity, used and free space that match the disk quota set for that user.

<img border="0" alt="DiskSpace2" src="{{site.baseurl}}/media/2008/05/diskspace2.png" width="302" height="367" /> 

The Computer view in Windows Explorer shows similar information:

<img border="0" alt="DiskSpace3" src="{{site.baseurl}}/media/2008/05/diskspace3.png" width="566" height="364" /> 

A simple change but if you are using disk quotas, its fantastic user experience.