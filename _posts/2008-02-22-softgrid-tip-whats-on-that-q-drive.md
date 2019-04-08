---
id: 479
title: 'SoftGrid Tip: What&#8217;s On That Q: Drive?'
date: 2008-02-22T18:30:16+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/softgrid-tip-whats-on-that-q-drive
permalink: /softgrid-tip-whats-on-that-q-drive/
dsq_thread_id:
  - "195380180"
categories:
  - Microsoft
tags:
  - SoftGrid
---
<img align="left" src="http://stealthpuppy.com/wp-content/uploads/2008/02/softgridtip.png" alt="softgridtip.png" />Here&#8217;s a nice SoftGrid tip from one of the guys in the team here.

If you want to take a look at the SoftGrid client drive, there a several methods. The most common would be to add a PRE LAUNCH script to the OSD file that would launchÂ a Command Prompt window inside the SoftGrid bubble.

Now, I like my command line, but if I want to just take a quick look around a file location a GUI makes things nice and simple. To do that on the SoftGrid client drive, I could [run Windows Explorer within the bubble](http://stealthpuppy.com/virtualisation/softgrid-launch-windows-explorer-inside-the-bubble), or I could just map anotherÂ drive to the SoftGrid drive.

This is as easy as running a NET USE command, so to map drive X to my client drive Q:, I can run:

[code]NET USE X: \\%computername%\Q$[/code]

I can now launch Windows Explorer and navigate to X: drive to see the contents of the SoftGrid client drive. You&#8217;ll be able to see you asset folders, however you must have an application running to be able to browse inside those folders to see the application within. This is great for a quick way to get inside the client drive, however for real troubleshooting, you can&#8217;t go past [SFT Explorer](http://www.virtualapp.net/sft-explorer.html).