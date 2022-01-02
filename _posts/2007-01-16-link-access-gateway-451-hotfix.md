---

title: 'Link: Access Gateway 4.5.1 Hotfix'
date: 2007-01-16T17:42:00+10:00
author: Aaron Parker
layout: post

permalink: /link-access-gateway-451-hotfix/
categories:
  - Citrix
tags:
  - Access-Gateway
---
Last week Citrix released a hotfix for the Access Gateway 4.5. This hotfix fixes a number of issues, two of which are very interesting to me:

> 2. When connecting to the Access Gateway Administration Desktop, the Remote Administration Terminal is connecting to the proxy address even though the Access Gateway is on the exception list in Internet Explorer.

I've [noticed this behaviour previously](http://www.stealthpuppy.com/blogs/travelling/archive/2006/08/29/Access-Gateway-CITRIX_5F00_ADMIN_5F00_MONITOR.EXE-and-Proxy-Servers.aspx) and have used a workaround but I'll have to check this one out now that it's fixed. However a more interesting fix is this one:

> 12. The Access Gateway appliance stops responding with the error message HTTP error 500 when connecting to Access Gateway Advanced Edition.

I've experienced this issue with Access Gateway 4.2, quite consistently, and have been running a [private hotfix for 4.2](http://www.stealthpuppy.com/blogs/travelling/archive/2006/11/17/access-gateway-and-http-error-500.aspx) which has performed quite well. Hopefully we will see a new public hotfix for 4.2 for those who haven't been able to upgrade to 4.5 yet. There are 17 issues fixed in this update I recommend updating to 4.5 and this hotfix as soon as possible.

  * [CTX112164 - v4.5.1 Hotfix for Citrix Access Gateway](http://support.citrix.com/article/CTX112164)
