---
id: 119
title: Adobe Reader/Acrobat 8, Citrix Presentation Server and Seamless Windows
date: 2007-01-18T16:58:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/adobe-readeracrobat-8-citrix-presentation-server-and-seamless-windows
permalink: /adobe-readeracrobat-8-citrix-presentation-server-and-seamless-windows/
categories:
  - Citrix
tags:
  - Presentation-Server
---
During testing of Adobe Reader 8 on a new Presentation Server 4.0 farm, I tested Adobe Reader 8 as a published application in a seamless window, using the ICA Client 9.230.50211. When using the toolbars in the published application (right clicking on the toolbars or clicking any of the drop down items) the application would exit completely without any errors logged on the server.

Fortunately applying the latest hotfix rollup for Presentation Server 4.0 - [PSE400W2K3R02](http://ctxex10.citrix.com/article/CTX109307) fixed the issue. I know publishing Adobe Reader probably doesn&#8217;t happen that often, but the same issue most likely affects the Adode Acrobat 8 products too.