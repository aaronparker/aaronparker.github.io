---
id: 692
title: 'App-V and SCCM 2007 R2: Are Virtualised Applications Delivered The Same Way?'
date: 2008-09-11T23:59:48+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/app-v-and-sccm-2007-r2-are-virtualised-applications-delivered-the-same-way
permalink: /app-v-and-sccm-2007-r2-are-virtualised-applications-delivered-the-same-way/
categories:
  - Microsoft
tags:
  - SCCM
  - SoftGrid
---
This was a great question, at [this evenings talk](http://stealthpuppy.com/virtualisation/app-v-talk-slide-deck),  about deploying virtualised applications via ConfigMgr 2007 R2 &#8211; are virtualised applications delivered to clients in the same manner as installed applications?

There are several parts to this answer. First up [virtual applications are imported](http://technet.microsoft.com/en-gb/library/cc161915.aspx), added to distribution points and [advertised](http://technet.microsoft.com/en-gb/library/cc161935.aspx), just like installed applications. There are two differences to installed applications here:

  1. Virtual applications are imported using the manifest XML which describes the virtual application package and individual applications in that package
  2. Just like the existing Virtual Application/Management Server in App-V, SCCM 2007 R2 supports application versions, so that you can [upgrade](http://technet.microsoft.com/en-gb/library/cc161773.aspx) and rollback on the fly

If you choose to deliver the whole application instead of stream it, applications are downloaded into the SCCM cache just like installed applications. Here&#8217;s a virtualised [Adobe Reader 9](http://stealthpuppy.com/deployment/deploying-adobe-reader-9-for-windows) in the SCCM cache:

<img src="http://stealthpuppy.com/wp-content/uploads/2008/09/sccmcache.png" border="0" alt="SCCMCache" width="587" height="296" /> 

You can also take advantage of all the deployment features of SCCM like branch deployments and BITS transfers. Here are some links worth reading about App-V and SCCM integrations:

  * [About Virtualised Applications](http://technet.microsoft.com/en-gb/library/cc161873.aspx)
  * [Beta SCCM R2 &#8211; Virtual Application Server](http://blogs.technet.com/virtualworld/archive/2008/04/29/beta-sccm-r2-virtual-application-server.aspx)
  * [Beta 4.5 and Beta SCCM R2 &#8211; How to get a Quick Test Lab for SCCM R2](http://blogs.technet.com/virtualworld/archive/2008/03/27/beta-4-5-and-beta-sccm-r2-how-to-get-a-quick-test-lab-for-sccm-r2.aspx)
  * [TechNet Webcast: Optimizing Desktop Management with System Center Configuration Manager and Microsoft SoftGrid Application Virtualization (Level 300)](http://msevents.microsoft.com/CUI/WebCastEventDetails.aspx?culture=en-US&EventID=1032358170&CountryCode=US)