---
id: 423
title: Updating Flash On Presentation Server? Consider SpeedFlash First
date: 2008-01-20T01:13:09+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/terminal-server/updating-flash-on-presentation-server-consider-speedflash-first
permalink: /updating-flash-on-presentation-server-consider-speedflash-first/
dsq_thread_id:
  - "195380000"
categories:
  - Citrix
tags:
  - Adobe Flash
  - Presentation-Server
---
<img src="http://stealthpuppy.com/wp-content/uploads/2008/02/adobeflash.png" align="left" alt="adobeflash.png" />Like any good IT pro you're probably keeping an eye on the latest software releases and updating to keep on top of security updates. When it comes to Adobe Flash under Citrix Presentation Server, you'll want to ensure that the latest update is supported by SpeedFlash/SpeedScreen.

Unfortunately the [latest version of Adobe Flash Player](http://stealthpuppy.com/general/looking-for-adobe-flash-player-download-links), 9e (9.0.115.0), which [addresses various vulnerabilities](http://www.adobe.com/support/security/index.html#flashplayer), isn't supported by SpeedFlash. This is because SpeedFlash works by looking for known names of the Flash ActiveX files and this does not include version 9e (FLASH9E.OCX).Â 

A [hotfix is available for Presentation Server 4.0](http://support.citrix.com/article/CTX115426) to provide support for the most recent versions, except for 9e, and I'm not sure where this leaves Presentation Server 4.5. There's currently an issue getting to that article, but you'll need to contact Citrix to get a hold of the hotfix.

This means that at this time, you'll have to weigh up updating to the latest version of Flash to fix security vulnerabilities or keep SpeedFlash working to provide improved performance. I know which one users would pick.

You can read more about how SpeedFlash works and what versions of Flash are supported by reading Derek Thorslund post on the [Secrets for Optimising Flash Performance](http://community.citrix.com/display/~derekt/2007/11/27/Secrets+for+Optimizing+Flash+Performance+-+Part+1). Good news is that Citrix is working on a method of supporting Flash that does not rely on file names. Let's hope an update is released soon.