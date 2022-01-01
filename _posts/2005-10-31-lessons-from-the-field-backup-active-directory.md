---

title: Lessons from the field - Backup Active Directory
date: 2005-10-31T20:37:00+10:00
author: Aaron Parker
layout: post

permalink: /lessons-from-the-field-backup-active-directory/
dsq_thread_id:
  - "195379027"
categories:
  - Microsoft
tags:
  - Active-Directory
---
Backup the system state on your domain controllers. "Like duh!" you say, well that's what I said too. I spent Friday a client's site where a domain controller had gone down and they were experiencing issues with logons and Exchange. The client has/has four domain controllers, one at each of their four sites and all were marked as Global Catalog(ue)s. However once this single DC went down, due to hardware failure, AD essentially went bye-bye. Backups were no good and all the usual diagnostic tools would only show the downed DC as the lone GC. We could not seize the Schema Master and after spending about 6 hours on the phone with PSS, the decision was made to start again with a new domain, DC and Exchange server. Lots of fun that could have been avoided with products like [Microsoft Operations Manager](http://www.microsoft.com/mom/default.mspx) or [NetIQ AppManager](http://www.netiq.com/products/am/default.asp). I still don't understand why these types of products are generally a hard sell.

Another recommendation: run your domain controllers as dedicated machines, whether they be physical or virtual machines. Unless you're a small shop, only place services such as the GC, DHCP, DNS, WINS and IAS on the DCs. These services require little CPU power and RAM and dedicated DCs are much easier to recover or replace.
