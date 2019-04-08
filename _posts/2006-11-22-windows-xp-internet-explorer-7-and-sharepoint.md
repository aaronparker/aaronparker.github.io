---
id: 149
title: Windows XP, Internet Explorer 7 and SharePoint
date: 2006-11-22T21:50:04+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/windows-xp-internet-explorer-7-and-sharepoint
permalink: /windows-xp-internet-explorer-7-and-sharepoint/
categories:
  - Applications
tags:
  - Authentication
  - Internet-Explorer
---
Internally we have deployed SharePoint Portal Server 2003 as our intranet. To ensure that the Citrix Web Interface for SharePoint (WISP) web part works correctly, we need to ensure that there is only authenticated access to SharePoint (WISP fails if anonymous access is enabled). What I have found on Windows XP machines that have been upgraded to IE7, is that users are prompted for authentication when accessing SharePoint (IE presents the standard Windows authentication dialog) instead of the browser passing authentication through to IIS as it should.

To fix this, I&#8217;ve had to add the URL to our SharePoint installation to the Local Intranet zone and pass-through authentication works fine. I can&#8217;t seem to find any technical information on this issue, but I&#8217;m assuming that Internet Explorer does not default pass authentication through to just any web site. This issue does not appear to affect Internet Explorer 7 on Windows Vista.