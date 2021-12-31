---
id: 1686
title: 'App-V FAQ: What are the system requirements for App-V?'
date: 2010-07-15T11:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/app-v-faq-6-what-are-the-system-requirements-for-app-v
permalink: /app-v-faq-6-what-are-the-system-requirements-for-app-v/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195597780"
categories:
  - FAQs
tags:
  - App-V
  - AppVFAQ
---
![AppV logo]({{site.baseurl}}/media/2010/06/AppVFAQLogo.png)

Operating system support for App-V is ultimately determined by the [Microsoft Product Support Lifecycle](http://support.microsoft.com/?pr=lifecycle). Note that the App-V 4.6 Client and Sequencer is required for 64-bit operating systems.

### App-V Desktop Client

Full details for the client system requirements can be found on TechNet here:  [Application Virtualization Client Hardware and Software Requirements](http://technet.microsoft.com/library/cc843822.aspx). The App-V 4.5 and App-V 4.6 clients can be installed to the following operating systems <sup>1</sup>:

  * Windows XP Professional Service Pack 2 and Service Pack 3
  * Windows Vista RTM/SP1/SP2 Business, Enterprise and Ultimate
  * Windows 7 Home Premium, Professional, Enterprise and Ultimate

Note, these are the operating system versions that Microsoft currently support, if you install the App-V client on other operating systems, Microsoft will not support the client on that OS.

### App-V Remote Desktop Services Client

Full details for the client system requirements (including RDS) can be found on TechNet here:  [Application Virtualization Client Hardware and Software Requirements](http://technet.microsoft.com/library/cc843822.aspx). The App-V 4.5 and App-V 4.6 clients can be installed to the following operating systems <sup>1</sup>:

  * Windows Server 2003 (Standard, Enterprise, Datacenter; SP1, SP2, R2, SP2+R2)
  * Windows Server 2008 (Standard, Enterprise, Datacenter; SP1, SP2)
  * Windows Server 2008 R2 (Standard, Enterprise, Datacenter)

### App-V Management Server and Streaming  Server

The App-V Management Server and Streaming Server are 32-bit only but will install on 64-bit Windows. Full details for the server system requirements can be found on TechNet here: [Application Virtualization System Requirements](http://technet.microsoft.com/library/cc843853.aspx). The App-V 4.5 SP1 and SP2 server components can be installed on the following operating systems <sup>1</sup>:

  * Windows Server 2003 (Standard, Enterprise, Datacenter; SP1, SP2, R2, SP2+R2)
  * Windows Server 2008 (Standard, Enterprise, Datacenter; SP1, SP2)
  * Windows Server 2008 R2 (Standard, Enterprise, Datacenter)

The App-V Management Console can be installed on all supported operating systems (included desktop OS’s).

### SQL Server

The App-V Management Server relies on SQL Server to host the data store. The following versions of SQL Server are supported <sup>1</sup>:

  * SQL Server 2000 (SP3a, SP4)
  * SQL Server 2005 (SP1, SP2, SP3)
  * SQL Server 2005 Express (all versions – non production only)
  * SQL Server 2008 Express (all versions – non production only)
  * SQL Server 2008 (SP0, SP1)

The Management Server should work with SQL Server 2008 R2; however I’m unaware if this is official policy.

### App-V Sequencer

The App-V 4.6 Sequencer comes as 32-bit and 64-bit versions (the 4.5 Sequencer supports 32-bit only). Full details for the App-V Sequencer system requirements can be found on TechNet here: [Application Virtualization Sequencer Hardware and Software Requirements](http://technet.microsoft.com/library/cc817142.aspx). The App-V Sequencer is supported on the following operating systems <sup>2</sup>:

  * Windows XP Professional Service Pack 2 and Service Pack 3
  * Windows Vista RTM/SP1/SP2 Business, Enterprise and Ultimate
  * Windows 7 Home Premium, Professional, Enterprise and Ultimate
  * Windows Server 2003 (Standard, Enterprise, Datacenter; SP1, SP2, R2, SP2+R2)
  * Windows Server 2008 (Standard, Enterprise, Datacenter; SP1, SP2)
  * Windows Server 2008 R2 (Standard, Enterprise, Datacenter – 4.6 only)

Note that the Sequencer is single threaded only – a fast CPU will help, but multiple CPUs will not.

### Virtualisation

If you are considering running any of the App-V components on virtualised hardware, system requirements will remain the same. You can find support Microsoft’s support policies on virtualisation here:

  * [Microsoft server software and supported virtualization environments](http://support.microsoft.com/kb/957006)
  * [Support policy for Microsoft software running in non-Microsoft hardware virtualization software](http://support.microsoft.com/kb/897615)
  * ### Resources
    
      * <sup>1</sup> [Upgrading to Microsoft Application Virtualization 4.6 Frequently Asked Questions](http://technet.microsoft.com/appvirtualization/cc664494.aspx)
      * [Application Virtualization Client Hardware and Software Requirements](http://technet.microsoft.com/library/cc843822.aspx)
      * [Application Virtualization System Requirements](http://technet.microsoft.com/library/cc843853.aspx)
      * <sup>2</sup> [Application Virtualization Sequencer Hardware and Software Requirements](http://technet.microsoft.com/library/cc817142.aspx)