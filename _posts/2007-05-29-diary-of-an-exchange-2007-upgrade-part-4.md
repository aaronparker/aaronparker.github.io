---
id: 248
title: 'Diary of an Exchange 2007 Upgrade: Part 4'
date: 2007-05-29T22:09:46+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/exchange/diary-of-an-exchange-2007-upgrade-part-4
permalink: /diary-of-an-exchange-2007-upgrade-part-4/
categories:
  - Microsoft
tags:
  - Cluster
  - Exchange
---
<img align="left" width="82" src="http://stealthpuppy.com/wp-content/uploads/2007/05/exchange1.png" height="82" style="width: 82px; height: 82px" />Dear Diary,

I&#8217;ve fixed the [issue I was having with the Majority Node Set cluster](http://stealthpuppy.com/exchange/diary-of-an-exchange-2007-upgrade-part-3) &#8211; it pays to check your information againstÂ more than one source. This particular issue was caused by disabling _Client for Microsoft Networks_ and _File and Printer Sharing for Microsoft Networks_ on the heartbeat/private network adapater on each node in the cluster.

You would normally do this on a standard quorum cluster, however because a Majority Node Cluster does not use shared storage, each node needs to view cluster information via a UNC path on the other node or nodes. The following error was recorded in the cluster log file (C:WINDOWSCLUSTERcluster.log):

> 000003bc.000007ec::2007/05/26-02:14:31.082 ERRÂ  Majority Node Set <Majority Node Set>: CreateTreeConnection(10.10.12.2878350f8-22f8-49ca-90ca-8d3d361df536$) returned 0xc00000be hdl 0xffffffff

Re-enabling those items on the network connection, immediately got the cluster back up and running. You can read more about configuration network connectionsÂ for a CCR cluster onÂ TechNet:Â [How to Configure Network Connections for Cluster Continuous Replication](http://technet.microsoft.com/en-us/library/aa997910.aspx)

I&#8217;ve also now got the Exchange cluster up and running. The [installation experience](http://msexchangeteam.com/archive/2007/01/18/432264.aspx) has been simplified since previous versions of Exchange and is now a no brainer. Installing the active and passive nodes is just a matter of selecting the Active or Passive Clustered Mailbox Role during installation.

The next phase for this project is testing the new Exchange servers &#8211; mail flow, cluster failover and performance and ensuring features such as Address Books and Free/Busy information can be seen during the migration of mailboxes.

This morning I had a meeting with a few member of the clients&#8217; IS team including the IT Manager in which we discussed the progress thus far and the impacts of starting the migration of mailboxes. I am very keen to ensure testing is successful before moving mailboxes; however the IT Manager is also keen to see the solution up and running. We need to ensure the solution will work and the client needs the project to be on budget, so there is definitely a balance to be struck here.

Next up will be my experiences with testing load on the servers and intial migration of some of the organisation&#8217;s services such as Outlook Web Access.