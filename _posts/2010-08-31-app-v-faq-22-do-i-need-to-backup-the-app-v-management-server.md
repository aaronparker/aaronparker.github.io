---
id: 1846
title: 'App-V FAQ: Do I need to backup the App-V Management Server?'
date: 2010-08-31T11:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/app-v-faq-22-do-i-need-to-backup-the-app-v-management-server
permalink: /app-v-faq-22-do-i-need-to-backup-the-app-v-management-server/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195489775"
categories:
  - FAQs
tags:
  - App-V
  - AppVFAQ
---
<img style="margin: 0px 10px 5px 0px; display: inline" align="right" src="https://stealthpuppy.com/media/2010/06/AppVFAQLogo.png" />If you’ve deployed [the native App-V infrastructure](http://technet.microsoft.com/en-gb/library/cc843686.aspx), you will have the following components in your environment:

  * App-V Management Server (and optionally the App-V Streaming Server) 
  * Content share hosting the App-V packages 
  * Management database hosted on SQL Server 

Only two of these are critical – the Content share and the Management database.

### Backing up the Content share

App-V packages are stored on the Content share and are generally available to both the App-V Management Server (and Streaming) servers and to users (to download ICO and OSD files). Because the packages are stored on the file system, you can [backup](http://technet.microsoft.com/en-us/library/dd979562(WS.10).aspx) the Content share using your standard backup tools. Restoring the Content share should just require restoring the files and folders for the App-V packages.

Often the Content share is replicated, either between multiple Management Servers or file servers in different locations. Replication can be accomplished with DFS-R built into Windows Server or the replication technologies built into your SAN. Replicating the Content share will give you another avenue for restoration if a replica still exists.

### What if you lose the Content share completely?

There’s no excuse for no documentation – you are documenting your sequences aren’t you? Detailed documentation that includes step-by-step instructions for how the application was sequenced or scripts for performing the installation and configuration of the application during sequencing is an essential component of deploying applications via App-V (or any other application virtualisation product).

I have seen several instances where not enough emphasis has been placed on documentation – when it comes to recreating the package, the whole thing needs to be re-done from scratch.

### Backing up the App-V Management database

I presume that most of us who deploy the App-V infrastructure are probably not SQL Server experts as well, but it does pay to have at least [a basic understanding of the backup and restore requirements for SQL Server](http://technet.microsoft.com/en-us/library/ms175477.aspx). My own SQL Server knowledge is a bit limited, so rather than attempt at giving you a complete overview of the backup and restore requirements for SQL Server, I’ll just say that if you haven’t considered backing up the Management Server database stop reading this and go and back it up now. I have included links to further reading on backup and restore in the resources below.

[SQL Server mirroring](http://msdn.microsoft.com/en-us/library/ms189852.aspx) is supported with the App-V 4.5 SP2 Management Server, so failover options are now available for App-V.

### Recovery options for the App-V Management Server

The App-V Management Server (and the Streaming Server) is stateless so whether or not you back it up will depend on your own requirements; however you can implement an alternative approach to ensuring availability of the Management Server:

  * Deploy multiple Management Servers to provide load-balancing and redundancy
  * Configure an unattended deployment of Windows and the Management Server

Deploying multiple Management servers and load-balancing them with a hardware load-balancer or the [Network Load Balancing](http://technet.microsoft.com/en-us/library/cc771700(WS.10).aspx) feature built into Windows will allow you to recover a problematic server whilst maintaining service to App-V clients. A hardware load-balancer is the preferred method; however many smaller enterprises can offer adequate service with NLB instead. Additionally there are other ways to provide high availability that includes [VMware’s Fault Tolerance and High Availability feature](http://www.vmware.com/products/fault-tolerance/) built into vSphere.

To get a server back up and running quickly or for deploying multiple Management Servers, you should consider an unattended deployment of Windows Server and the App-V Management Server software. An unattended deployment allows you to provide avoid spending time troubleshooting a server and just rebuild it and to ensure that every Management Server or Streaming Server has been configured exactly the same way.

If you aren’t currently deploying Windows via an unattended means, Microsoft provides the [Microsoft Deployment Toolkit](http://technet.microsoft.com/en-us/solutionaccelerators/dd407791.aspx) for doing just that. The Setup for the App-V Management Server or the Streaming Server can also be installed silently and is documented in this knowledgebase article: [Supported command line options for the Microsoft App-V 4.5 Management Server installer](http://support.microsoft.com/kb/2384955).

### Conclusion

Although you can backup the Management Server, it is the component in the native App-V infrastructure that can be recovered without requiring a backup and can probably be redeployed or rebuilt faster than you can restore from backup. Instead of spending resources creating and managing a backup, spend time on the alternatives I’ve outlined above to provide better service and recovery. 

### Resources

  * [Windows Server 2008 and Windows Server 2008 R2 Backup and Recovery](http://technet.microsoft.com/en-us/library/cc754097(WS.10).aspx)
  * [Windows Server Backup Step-by-Step Guide for Windows Server 2008](http://technet.microsoft.com/en-us/library/cc770266(WS.10).aspx)
  * [Windows Server Backup Step-by-Step Guide for Windows Server 2008 R2](http://technet.microsoft.com/en-us/library/ee849849(WS.10).aspx)
  * [DFS Replication: Frequently Asked Questions (FAQ](http://technet.microsoft.com/en-us/library/cc773238(WS.10).aspx)
  * [Backup Overview (SQL Server)](http://technet.microsoft.com/en-us/library/ms175477.aspx)
  * [Backing Up and Restoring Databases in SQL Server](http://technet.microsoft.com/en-us/library/ms187048.aspx)
  * [How to: Back Up a Database (SQL Server Management Studio)](http://msdn.microsoft.com/en-us/library/ms187510.aspx)
  * [How to Configure Microsoft SQL Server Mirroring Support for App-V](http://technet.microsoft.com/en-gb/library/ff660790.aspx)
  * Video: [SQL Server 2008 Demo Database Mirroring](http://www.youtube.com/watch?v=YOLqyPa3LOw)
  * [SQL Server 2008 Database Mirroring](http://blogs.technet.com/b/josebda/archive/2009/04/02/sql-server-2008-database-mirroring.aspx)
  * [Introduction to SoftGrid networking](http://support.microsoft.com/kb/932017/)
  * [How SoftGrid Networking works together with Windows Server 2003 Network Load Balancing](http://support.microsoft.com/kb/932018/)
  * [Supported command line options for the Microsoft App-V 4.5 Management Server installer](http://support.microsoft.com/kb/2384955)