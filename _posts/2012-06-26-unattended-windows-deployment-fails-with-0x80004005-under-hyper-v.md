---
id: 2739
title: Unattended Windows deployment fails with 0x80004005 under Hyper-V
date: 2012-06-26T18:45:05+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2739
permalink: /unattended-windows-deployment-fails-with-0x80004005-under-hyper-v/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "741273935"
categories:
  - Automation
tags:
  - Hyper-V
  - Unattended
---
There's one thing that I can't get enough of when automating Windows deployments, it's ambiguous and confusing error messages. More please, I'm a sucker for punishment.

Here's one I've been troubleshooting on and off for a while - an unattended Windows deployment via MDT fails with error 0x80004005, which is about as helpful as a brick life vest.

<img class="size-full wp-image-2742 aligncenter" title="Failed MDT Deployment" src="https://stealthpuppy.com/wp-content/uploads/2012/06/FailedMDTDeployment.png" alt="Failed MDT Deployment" width="559" height="399" srcset="https://stealthpuppy.com/wp-content/uploads/2012/06/FailedMDTDeployment.png 559w, https://stealthpuppy.com/wp-content/uploads/2012/06/FailedMDTDeployment-150x107.png 150w, https://stealthpuppy.com/wp-content/uploads/2012/06/FailedMDTDeployment-300x214.png 300w" sizes="(max-width: 559px) 100vw, 559px" /> 

Similarly, the MDT log files are pretty useless in narrowing down a root cause. Whilst I couldn't use the log files to help me discover the issue, I have been using MDT to deliver the same task sequence on multiple hypervisors in our lab environment.

As it turns out the issue can be caused by a fairly specific configuration - delivering Windows Server 2008 R2 with the Remote Desktop Services Session Host (RDSH) role enabled via UNATTEND.XML to a virtual machine on Hyper-V with [Dynamic Memory](http://technet.microsoft.com/en-gb/library/ff817651(WS.10).aspx) enabled and the Startup RAM set to 512MB.

<img class="size-full wp-image-2743 aligncenter" title="Hyper-V Dynamic Memory" src="https://stealthpuppy.com/wp-content/uploads/2012/06/DynamicMemory.png" alt="Hyper-V Dynamic Memory" width="660" height="368" srcset="https://stealthpuppy.com/wp-content/uploads/2012/06/DynamicMemory.png 660w, https://stealthpuppy.com/wp-content/uploads/2012/06/DynamicMemory-150x83.png 150w, https://stealthpuppy.com/wp-content/uploads/2012/06/DynamicMemory-300x167.png 300w" sizes="(max-width: 660px) 100vw, 660px" /> 

Dynamic Memory is probably something you would not run for RDSH in production, so there's a few workarounds:

  1. Set the Startup RAM higher than 512MB
  2. Don't use Dynamic Memory for an RDSH server (the recommend solution)
  3. Use [PowerShell to reconfigure the Dynamic Memory settings](http://www.aidanfinn.com/?p=12193) after Windows has been deployed to the virtual machine