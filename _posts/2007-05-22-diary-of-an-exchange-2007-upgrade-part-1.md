---
id: 222
title: 'Diary of an Exchange 2007 Upgrade: Part 1'
date: 2007-05-22T14:32:52+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/exchange/diary-of-an-exchange-2007-upgrade-part-1
permalink: /diary-of-an-exchange-2007-upgrade-part-1/
dsq_thread_id:
  - "195378977"
categories:
  - Microsoft
tags:
  - Exchange
---
<img src="http://stealthpuppy.com/wp-content/uploads/2007/05/exchange4.png" alt="" align="left" />Dear Diary,

I am currently in the process of upgrading an Exchange Server 2003 organisation to Exchange Server 2007, so I thought it might be a good idea to tell you about my experience whilst I perform the upgrade. This will mostly be in point format but I&#8217;ll expand on some points where required.

**Where Are We At?**

At this stage the organisation consists of:

  * A single forest with one parent domain (holding two DCs) and a child domain (with four DCs) with all users, computers and resources
  * All DCs run Windows Server 2003 and the domain is set to Windows 2000 Native mode
  * Approximately 1100 users
  * Two front-end servers running Exchange Server 2003 Enterprise Edition
  * Two back-end servers running Exchange Server 2003 Enterprise Edition
  * One server in a separate Windows 2000 domain running Exchange Server 5.5
  * All Exchange 2003 servers are located in a single data centre
  * An SMTP relay host in the DMZ running MIMESweeper
  * Almost 100% of the clients connect via Outlook 2003 from a Terminal Server, so there are no cached-mode clients
  * Remote access to Outlook Web Access is provided via Citrix Access Gateway Advanced 4.2. At this stage, Access Gateway does not work with Outlook Web Access 2007

Even though there are next to no cached-mode clients, the existing servers are not stressed and the actual amount of e-mail moving around and in and out of the organisation is low.

**Where Are We Going?**

To upgrade this organisation, we are migrating to this (the server hardware has been reallocated to this project from previous roles):

  * Two IBM xSeries 336 server running Windows Server 2003 R2 Enterprise Edition x64 SP2 on dual Intel Xeon 3GHz CPUs with 4 GB of RAM. These servers will run the CAS, HT and UM roles.
  * Two IBM xSeries 346 servers running Windows Server 2003 R2 Enterprise Edition x64 SP2 on dual Intel Xeon 3GHz CPUs with 8 GB of RAM. These servers will be clustered to run the new Cluster Continuous Replication model for Exchange 2007
  * At this stage we won&#8217;t be installing an Edge Transport server because the anti-spam/anti-virus software in the DMZ doesn&#8217;t support Exchange 2007
  * Mailboxes on the Exchange 5.5 server will be migrated using EXMERGE

In the next entry I&#8217;ll detail installation of the OS, update of AD and install of Exchange and some lessons learnt.