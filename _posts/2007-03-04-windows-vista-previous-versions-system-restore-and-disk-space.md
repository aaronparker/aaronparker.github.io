---
id: 88
title: Windows Vista Previous Versions, System Restore and Disk Space
date: 2007-03-04T15:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/windows-vista-previous-versions-system-restore-and-disk-space
permalink: /windows-vista-previous-versions-system-restore-and-disk-space/
dsq_thread_id:
  - "195378617"
categories:
  - Microsoft
tags:
  - Windows-Vista
---
While checking out where my disk space was being consumed on my Windows Vista machines, I found that System Restore was the main culprit. So to reclaim my lost space I disabled it. Here you can see the before and after impact on the system drive of my desktop €“ close to 3GB was freed:

<img border="0" src="https://stealthpuppy.com/media/2007/03/1000.14.1076.DiskSpace.png" /> 

However what I didn€™t know is that the side effect of turning off System Restore is that Previous Versions also becomes unavailable. This can be a bit of a problem as this feature is very useful. What was good timing for me, is a video up on Channel 9 about [System Restore and Previous Versions](http://channel9.msdn.com/Showpost.aspx?postid=286303) and the Filing Cabinet blog has a post on [why the restore points in Windows Vista use so much disk space](http://blogs.technet.com/filecab/archive/2007/03/03/why-do-restore-points-in-windows-vista-use-so-much-disk-space.aspx), both I which I recommend checking out. The video gives a good explaination of how they ensured that System Restore does not negatively impact performance of the system.

After watching the video I was convinced enough to turn System Restore back on and get the Previous Versions feature back. If you want to perform some housekeeping occasionally to reclaim space, you can delete the System Restore points with the Disk Cleanup tool, found in the System Tools folder in your Start Menu:

  1. Start the Disk Cleanup tool from _Start Menu_ / _All Programs_ / _System Tools_
  2. Click the button labelled _Files from all users on this computer_
  3. You will be prompted by UAC to continue
  4. Choose the drive to scan and click OK
  5. Click the _More Options_ tab and click the _Clean up..._ button under the _System Restore and Shadow Copies_ section

<img border="0" src="https://stealthpuppy.com/media/2007/03/1000.14.1078.DiskCleanupforVista2.png" /> 

This will delete all but the most recent restore point, clearing space but still leaving you some protection. You should also be aware that if you want the Previous Versions feature available on disks other than the system drive you will have to enable System Protection on your other disks or partitions. By storing you data on a second drive or partition you could then disable System Restore on your system drive but take advantage of Previous Versions for your data. Here I've enabled System Protection on my D: drive which contains my important data:

<img border="0" src="https://stealthpuppy.com/media/2007/03/1000.14.1080.RestorePoints.png" />