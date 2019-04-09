---
id: 3299
title: 'Hands off my gold image! – Video: Windows 8 zero-touch deployment'
date: 2013-05-23T18:43:44+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=3299
permalink: /hands-off-my-gold-image-video-windows-8-zero-touch-deployment/
dsq_thread_id:
  - "1310932232"
pd_rating:
  - 'a:8:{s:4:"type";s:1:"0";s:5:"votes";s:1:"1";s:6:"total1";s:1:"0";s:6:"total2";s:1:"0";s:6:"total3";s:1:"0";s:6:"total4";s:1:"0";s:6:"total5";s:1:"1";s:7:"average";s:6:"5.0000";}'
categories:
  - Community
tags:
  - MDT
---
Here's another demo that I showed during my [Geek Speak Live session](https://citrix.g2planet.com/synergylosangeles2013/public_session_view.php?agenda_session_id=274&conference=synergy) at Citrix Synergy 2013 at Anaheim yesterday.

In a 45 minute session on MDT and automating gold image deployments there's not enough time for such a large topic, so perhaps I should have dropped this one; however this is interesting nonetheless. Using PowerShell to drive Hyper-V and MDT, this demo shows a full Windows 8 deployment from start to ready for user logon. This approach might be useful for persistent virtual desktops, or with a little more effort, using the image in a XenDesktop 7 desktop catalog created with PowerShell.

Here’s a flow chart that gives an overview of what the script does:

[<img class="alignnone  wp-image-3312" alt="Zero-touch-Windows8-deployment" src="https://stealthpuppy.com/media/2013/05/Zero-touch-Windows8-deployment.png" width="720" height="405" srcset="https://stealthpuppy.com/media/2013/05/Zero-touch-Windows8-deployment.png 720w, https://stealthpuppy.com/media/2013/05/Zero-touch-Windows8-deployment-150x84.png 150w, https://stealthpuppy.com/media/2013/05/Zero-touch-Windows8-deployment-300x168.png 300w, https://stealthpuppy.com/media/2013/05/Zero-touch-Windows8-deployment-624x351.png 624w" sizes="(max-width: 720px) 100vw, 720px" />](https://stealthpuppy.com/media/2013/05/Zero-touch-Windows8-deployment.png)

The video is available in HD resolution (720) so you can see the full details.