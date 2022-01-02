---

title: 'Diary of an Exchange 2007 Upgrade: Part 3'
date: 2007-05-24T23:47:40+10:00
author: Aaron Parker
layout: post

permalink: /diary-of-an-exchange-2007-upgrade-part-3/
dsq_thread_id:
  - "195378998"
categories:
  - Microsoft
tags:
  - Cluster
  - Exchange
---
Dear Diary,

Things will be quiet on the Exchange front for the next few days as I'm delivering ISA Server training to some of the other engineers, but I'll be back into Exchange on Monday.

On Exchange though, I've been having some issues getting the cluster up and running. I'm using a [Majority Node Set cluster](http://technet2.microsoft.com/windowsserver/en/library/e70333db-5048-4a56-b5a9-8353756de10b1033.mspx?mfr=true) with a [File Share Witness](http://technet.microsoft.com/en-us/library/5b549e8d-444d-4c3f-928f-b24c1dd19f8f.aspx) to host [Cluster Continuous Replication](http://technet.microsoft.com/en-us/library/c5f5da15-f593-40c1-838d-e6123adb5e10.aspx), a new feature of Exchange Server 2007. Unfortunately the cluster breaks after configuration and restarting the cluster service, and consistently too. So on Monday I'll have to dig deeper to find a solution. More after then.
