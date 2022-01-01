---

title: 'Diary of an Exchange 2007 Upgrade: Part 6'
date: 2007-06-13T15:08:25+10:00
author: Aaron Parker
layout: post

permalink: /diary-of-an-exchange-2007-upgrade-part-6/
categories:
  - Microsoft
---
Dear Diary,

Progress on the migration has been a little slow over the past week given a few other things I've had to pay attention to, but I'm now in a position to move a small group of mailboxes to finalise testing before a mass migration of mailboxes.

I have tested mail flow in and out of the organisation by configuring the SMTP relay server in the DMZ to pass SMTP traffic into the Exchange 2007 hub transport servers. Once the client is happy to direct inbound SMTP through the hub transport servers this will only take a few changes on the MIMEsweeper server.

Thanks to [Aaron Tiensivu](http://blog.tiensivu.com), I've noticed that McAfee VirusScan is still scanning disks that I've configured for exclusion. To fix this, I'll have to [add "DeviceHarddiskVolume*" to the exclusion list](http://blog.tiensivu.com/aaron/archives/1120-Using-a-McAfee-VirusScan-8.x-with-Windows-Clustering-or-a-SAN-Take-note!-Special-exclusions-needed!.html) to stop this behaviour and ensure critical Exchange files are not scanned.

**Update**: Because I've moved to London I'm no longer working on this project but I've have handed it over to [Paul](http://www.capslockassassin.com). Be sure to check out his blog for any Exchange related posts, such as this one [e-mail address policies](http://www.capslockassassin.com/2007/06/24/email-address-policies-in-mixed-exchange-20032007-organisations/).