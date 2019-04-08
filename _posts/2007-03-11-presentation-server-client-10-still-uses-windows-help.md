---
id: 84
title: Presentation Server Client 10 still uses Windows Help
date: 2007-03-11T18:42:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/presentation-server-client-10-still-uses-windows-help
permalink: /presentation-server-client-10-still-uses-windows-help/
categories:
  - Applications
tags:
  - Windows-Vista
---
<img border="0" align="left" src="/images/cs/1000.14.1104.Windows Help and Support.png" hspace="2" alt="Windows Help and Support" title="Windows Help and Support" />Gee, I expected a little more than this from Citrix - the new Presentation Server Client version 10 is still using the old _16-bit_ Windows Help format (.HLP). What&#8217;s the problem with this you say? Well, Windows Help is [no longer included](http://support.microsoft.com/kb/917607) with Windows Vista and Microsoft have been discouraging its&#8217; use for some time now. Yes you can now download a version of [Windows Help for Vista](http://www.microsoft.com/downloads/details.aspx?familyid=6ebcfad9-d3f5-4365-8070-334cd175d4bb&displaylang=en) from Microsoft, but it&#8217;s [not guaranteed to work with all .HLP files](http://itsvista.com/2007/03/winhelp-for-vista-may-not-provide-the-help-you-need/).

So what are we left with now? An unavailable help system when you use the client on Windows Vista. And I don&#8217;t think that deploying Windows Help is the right solution. Citrix, can we please have a client worthy of Windows Vista?

Citrix do have a [known issues list](http://support.citrix.com/article/CTX112067) with the client and Windows Vista, which indicates the next client release for mid 2007. Let&#8217;s hope it gets a facelift and this help issue sorted out too.