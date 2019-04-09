---
id: 1785
title: 'App-V FAQ: What are the deployment methods for App-V?'
date: 2010-08-18T11:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/deployment/app-v-faq-20-what-are-the-deployment-methods-for-app-v
permalink: /app-v-faq-20-what-are-the-deployment-methods-for-app-v/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195383228"
categories:
  - FAQs
tags:
  - App-V
  - AppVFAQ
---
<img style="margin: 0px 0px 5px 10px; display: inline;" src="http://stealthpuppy.com/media/2010/06/AppVFAQLogo.png" alt="" align="right" />There are several methods that you can use to deliver App-V packages in your environment – you could even combine the methods depending on your requirements. I will summarise the methods here and give you some links to existing Microsoft articles and white papers and some excellent blog posts that discuss these options in detail:

  * **Native infrastructure** - App-V includes [server infrastructure](http://technet.microsoft.com/en-gb/library/cc843634.aspx) that be used to stream packages to clients. A central management server is used to authorise applications and streaming servers can be used for branch offices. Replication (such as that provided by DFS-R) is required for keeping package sources in sync. This is the most dynamic method for delivering App-V packages but it doesn't scale as well as other methods - the App-V Management Server database does not support replication.
  * **System Centre Configuration Manager 2007 R2** - SCCM has [native support for App-V 4.5 and 4.6](http://technet.microsoft.com/en-us/library/cc161957.aspx). It supports importing App-V packages and deploying them to client computers and can stream packages or deliver them completely.
  * **Stand-alone using Windows Installer deployment** - The App-V Sequencer can create a Windows Installer (MSI) file when saving a package. The MSI file can be used with your existing [software deployment tool (ESD)](http://technet.microsoft.com/en-gb/library/cc843643.aspx) such as Group Policy or Altiris Client Management Suite. If the 3rd party ESD is aware of the package manifest file (an XML file produced by the sequencer) it can deploy App-V packages with a finer level of control. Using the MSI file, [App-V packages are deployed](http://technet.microsoft.com/en-gb/library/cc843787.aspx) to the machine rather than being able to target users.

The Microsoft infrastructure deployment solutions are outlined in this diagram:

[<img src="http://stealthpuppy.com/media/2010/06/MicrosoftApplicationVirtualisationComponents.png" alt="" width="660" height="528" />](http://stealthpuppy.com/media/2010/06/MicrosoftApplicationVirtualisationComponents.png "App-V infrastructure solutions")

  * **Stand-alone using the SFTMIME command** (or the roll-your-own deployment tool) - The final method is not widely used; however I have designed an App-V deployment for a client who use an in-house developed software deployment solution. The product has been extended to use SFTMIME commands to add packages to client machines and control user access to virtual applications. Tim Mangan makes this type of solution freely available from his site with [App-V_DeployNPublishApp](http://www.tmurgent.com/AppV_DeployNPublishApp/).

Use the following links to read more on the infrastructure solutions. Be sure to start with the Infrastructure Planning and Design guide from Microsoft.

### Resources

  * [Infrastructure Planning and Design](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=ad3921fb-8224-4681-9064-075fdf042b0c) downloadable documents and [more on TechNet](http://technet.microsoft.com/en-us/library/ee354207.aspx)
  * [Application Virtualization Server-based scenario](http://technet.microsoft.com/en-gb/library/cc843634.aspx)
  * [Electronic Software Distribution-based scenario](http://technet.microsoft.com/en-gb/library/cc843643.aspx)
  * [Stand-Alone Delivery scenario](http://technet.microsoft.com/en-gb/library/cc843787.aspx)
  * [Centralized Management & Scalable Infrastructure](http://www.microsoft.com/systemcenter/appv/infrastructure.mspx)
  * [Microsoft Assessment and Planning Toolkit](http://technet.microsoft.com/en-us/library/bb977556.aspx)
  * [Microsoft Application Virtualization and Configuration Manager 2007 R2](http://www.microsoft.com/systemcenter/appv/configmgr.mspx)
  * [Virtual Application Management with Microsoft Application Virtualization 4.5 and System Center Configuration Manager 2007 R2](http://download.microsoft.com/download/f/7/8/f784a197-73be-48ff-83da-4102c05a6d44/App-V_and_ConfigMgr_Whitepaper_Final.docx)
  * [Virtual Application Management with Microsoft Application Virtualization 4.6 and System Center Configuration Manager 2007 R2](http://download.microsoft.com/download/f/7/8/f784a197-73be-48ff-83da-4102c05a6d44/App-V_and_ConfigMgr_Whitepaper_Final.docx)
  * [App-V 4.5 Server Sizing Guide](http://download.microsoft.com/download/1/6/1/161042F3-9CDE-45F7-BC20-4FBDA8888890/AppV45_ServerSizingGuide_Final.docx)
  * [How Microsoft Is Architecting the Virtual Application Infrastructure](https://msevents.microsoft.com/CUI/WebCastEventDetails.aspx?culture=en-US&EventID=1032415084&CountryCode=US)
  * [Choosing the right App-V delivery model](http://www.brianmadden.com/blogs/jeroenvandekamp/archive/2010/02/19/choosing-the-right-app-v-delivery-model.aspx)
  * [Choosing the right App-V Delivery Model (App-v integration: possibilities and impossibilities)](http://www.loginconsultants.com/index.php?option=com_docman&task=doc_details&gid=61&Itemid=149)
  * [App-V 4.6 and ConfigMgr 2007 SP2: even better together](http://www.desktopcontrol.info/2010/02/app-v-46-and-configmgr-2007-sp2-even.html)
  * [AppV_DeployNPublishApp](http://www.tmurgent.com/AppV_DeployNPublishApp/)
  * [How to integrate App-V with SCCM without losing the features you care about](http://www.buit.org/2009/02/13/how-to-integrate-app-v-with-sccm-without-losing-the-features-you-care-about/)