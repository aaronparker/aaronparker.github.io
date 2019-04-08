---
id: 562
title: Update To Fix Flash Handling on Presentation Server
date: 2008-05-24T02:12:21+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=562
permalink: /update-to-fix-flash-handling-on-presentation-server/
categories:
  - Citrix
tags:
  - Flash
  - Presentation-Server
  - XenApp
---
Yay, great news - [Citrix has released](http://community.citrix.com/display/~derekt/2008/05/23/New+HRP+enhances+Flash+version+support) an update to fix the [handling of Adobe Flash](http://stealthpuppy.com/terminal-server/updating-flash-on-presentation-server-consider-speedflash-first) versions for Presentation Server 4.0. This has currently been released as part of the [latest hotfix rollup for Presentation Server 4.0](http://support.citrix.com/article/CTX116264#speedscreen).

For Presentation Server on Windows Server 2003 and above, this means that the SpeedFlash feature that accelerates the display of Flash is no longer version dependant. We&#8217;ll be able to update Flash now without losing the acceleration support.

A private hotfix should be available for Presentation Server/XenApp 4.5 but you&#8217;ll have to contact Citrix support to get it. The next hotfix rollup for 4.5 will include this fix.