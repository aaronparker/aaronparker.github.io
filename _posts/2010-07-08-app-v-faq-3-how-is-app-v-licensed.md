---
id: 1674
title: 'App-V FAQ: How is App-V licensed?'
date: 2010-07-08T08:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/app-v-faq-3-how-app-v-licensed
permalink: /app-v-faq-3-how-is-app-v-licensed/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195382677"
categories:
  - FAQs
tags:
  - App-V
  - AppVFAQ
---
Microsoft App-V is available in two flavours: for desktops (this includes laptops and virtual desktops – essentially anything that will run Windows XP, Windows Vista or Windows 7) and for Remote Desktop Services (RDS).

## Microsoft App-V for Desktops

If you are looking at App-V for your desktop machines, then you will need to license the [Microsoft Desktop Optimisation Pack](http://www.microsoft.com/windows/enterprise/products/mdop/default.aspx) (MDOP), as [App-V for Desktops](http://www.microsoft.com/windows/enterprise/products/mdop/app-v.aspx) only comes as a part of MDOP. The downloadable ISO for App-V for Desktops includes the App-V Client for Desktops, the App-V Sequencer and the App-V Management Server and the App-V Streaming Server.

MDOP includes the following components:

  * Microsoft Application Virtualization (App-V)
  * Microsoft User Experience Virtualization (UE-V)
  * Microsoft BitLocker Administration and Monitoring (MBAM)
  * [Advanced Group Policy Management](http://www.microsoft.com/windows/enterprise/products/mdop/agpm.aspx) (AGPM)
  * [Microsoft Diagnostics and Recovery Toolset](http://www.microsoft.com/windows/enterprise/products/mdop/dart.aspx) (DaRT)

MDOP is available to customers that have first purchased [Software Assurance](http://www.microsoft.com/licensing/software-assurance/default.aspx). MDOP is then an additional cost per seat. From [the MDOP page](http://www.microsoft.com/licensing/software-assurance/mdop.aspx) on the [Microsoft Volume Licensing site](http://www.microsoft.com/licensing/Default.aspx):

> Available exclusively to Software Assurance customers as an add-on subscription, the Microsoft Desktop Optimization Pack (MDOP) employs six innovative technologies to improve desktop management, including application virtualization, asset management, and desktop diagnostic tools.

More information on Software Assurance is available at the [Microsoft Software Assurance Frequently Asked Questions](http://www.microsoft.com/licensing/software-assurance/faq.aspx).

## Microsoft App-V for Remote Desktop Services

A recent change to the RDS licensing now makes [App-V for RDS](http://www.microsoft.com/systemcenter/appv/terminalsvcs.mspx) available with the RDS Client Access License (CAL). The App-V for RDS license is now no longer available separately as purchasing an RDS CAL automatically gives you access to App-V for RDS. More more information and a list of frequently asked questions on RDS licensing visit this page: [Remote Desktop Services Licensing](http://www.microsoft.com/windowsserver2008/en/us/rds-product-licensing.aspx).

The downloadable ISO for App-V for RDS includes the App-V Client for RDS, the App-V Sequencer and the App-V Management Server and the App-V Streaming Server.

## TechNet and MSDN Subscribers

If you have a [TechNet](http://technet.microsoft.com/en-us/subscriptions/default.aspx) or [MSDN](http://msdn.microsoft.com/en-us/subscriptions/default.aspx) subscription, App-V for Desktop and App-V for RDS is available as a part of your subscription. This allows you to test App-V on various platforms in your environment. Note that TechNet or MSDN subscriptions are for [testing or evaluation purposes only](http://technet.microsoft.com/subscriptions/cc294422.aspx) and are not intended for running Microsoft products in production.

## App-V Management Server and Streaming Server

No additional licensing requirements are required for the Management Server or the Streaming Server; however you will still need to meet separate licensing requirements for the platform on which the Management Server and the Streaming Server run on.

The Management Server will require [Windows Server](http://www.microsoft.com/windowsserver2008/en/us/licensing-faq.aspx) and [SQL Server licenses](http://www.microsoft.com/sqlserver/2008/en/us/licensing-faq.aspx). The Streaming Server requires only a Windows Server license as it does not connect to a data store.

## Are any of the components available separately?

A question that has been asked previously in the [TechNet forums](http://social.technet.microsoft.com/Forums/en-gb/category/appvirtualization) is “is the App-V Sequencer available to license separately”. The answer to this is No. The client, sequencer or server components are only available as a part of the App-V for Desktops or App-V for RDS license.

## Resources

* [Licensing Microsoft Application Virtualization 4.5 (App-V) for Terminal Services](http://www.microsoft.com/systemcenter/appv/howtobuy/default.mspx)
* [Remote Desktop Services Licensing](http://www.microsoft.com/windowsserver2008/en/us/rds-product-licensing.aspx)
* [Microsoft Software Assurance Frequently Asked Questions](http://www.microsoft.com/licensing/software-assurance/faq.aspx)
