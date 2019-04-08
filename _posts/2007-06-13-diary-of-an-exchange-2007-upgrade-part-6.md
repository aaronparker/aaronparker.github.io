---
id: 313
title: 'Diary of an Exchange 2007 Upgrade: Part 6'
date: 2007-06-13T15:08:25+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/exchange/diary-of-an-exchange-2007-upgrade-part-6
permalink: /diary-of-an-exchange-2007-upgrade-part-6/
categories:
  - Microsoft
---
<img align="left" width="82" src="http://stealthpuppy.com/wp-content/uploads/2007/06/exchange1.png" height="82" style="width: 82px; height: 82px" />Dear Diary,

Progress on the migration has been a little slow over the past week given a few other things I&#8217;ve had to pay attention to, but I&#8217;m now in a position to move a small group of mailboxes to finalise testing before a mass migration of mailboxes.

I have tested mail flow in and out of the organisation by configuring the SMTP relay server in the DMZ to pass SMTP traffic into the Exchange 2007 hub transport servers. Once the client is happy to direct inbound SMTP through the hub transport servers this will only take a few changes on the MIMEsweeper server.

Thanks to [Aaron Tiensivu](http://blog.tiensivu.com), I&#8217;ve noticed that McAfee VirusScan is still scanning disks that I&#8217;ve configured for exclusion. To fix this, I&#8217;ll have to [add &#8220;DeviceHarddiskVolume*&#8221; to the exclusion list](http://blog.tiensivu.com/aaron/archives/1120-Using-a-McAfee-VirusScan-8.x-with-Windows-Clustering-or-a-SAN-Take-note!-Special-exclusions-needed!.html)Â to stop this behaviour and ensure critical Exchange files are not scanned.

**Update**: Because I&#8217;ve moved to London I&#8217;m no longer working on this project but I&#8217;ve have handed it over to [Paul](http://www.capslockassassin.com). Be sure to check out his blog for any Exchange related posts, such as this one [e-mail address policies](http://www.capslockassassin.com/2007/06/24/email-address-policies-in-mixed-exchange-20032007-organisations/).