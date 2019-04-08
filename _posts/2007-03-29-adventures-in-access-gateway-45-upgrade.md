---
id: 74
title: Adventures in Access Gateway 4.5 Upgrade
date: 2007-03-29T04:25:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/adventures-in-access-gateway-45-upgrade
permalink: /adventures-in-access-gateway-45-upgrade/
categories:
  - Citrix
tags:
  - Access-Gateway
---
Upgrading our Access Gateway last night proved to be a bit of a challenge where perhaps it should not have been. The problem was not with the product, more due to the time between installs. Access Gateway is generally requires little administration after deployment and it's certainly not a product I get to work with every day. So what problems did I run into? Well, things that should have been quite obvious from the start, so here's how I got there and fixed them and how I won't make the same mistakes twice.

We run Access Gateway Advanced, so I needed to throw an [Advanced Access Control upgrade](http://support.citrix.com/article/CTX109104) into the mix. Rather than migrate directly from version 4.2, I started with a fresh server and built a new configuration from scratch. I did this because I wanted to go through the whole process again to make sure there wasn't a better way of doing things. When I built the new AAC server, I used Windows Server 2003 Service Pack 2 and SQL Server 2005 Express Service Pack 2 (we have a small implementation internally, so a single server makes sense for us). I was a little worried about this because both service packs are new and Citrix don't appear to have official word on either service pack.

The first issue I ran into was a problem with the Access Gateway COM server after installation of Advanced Access Control. The following errors were reported when attempting to start the COM server:

> Event Type: Failure Audit  
> Event Source: MSSQL$CITRIXAAC  
> Event Category: (4)  
> Event ID: 18456  
> Date: 21/03/2007  
> Time: 4:08:45 PM  
> User: DOMAINserviceaccount  
> Computer: SERVER  
> Description:  
> Login failed for user 'DOMAINserviceaccount'. [CLIENT: <local machine>]  
> For more information, see Help and Support Center at http://go.microsoft.com/fwlink/events.asp.  
> Data:  
> 0000: 18 48 00 00 0e 00 00 00 .H......  
> 0008: 13 00 00 00 43 00 4c 00 ....C.L.  
> 0010: 41 00 41 00 47 00 45 00 A.A.G.E.  
> 0018: 30 00 31 00 5c 00 43 00 0.1..C.  
> 0020: 49 00 54 00 52 00 49 00 I.T.R.I.  
> 0028: 58 00 41 00 41 00 43 00 X.A.A.C.  
> 0030: 00 00 07 00 00 00 6d 00 ......m.  
> 0038: 61 00 73 00 74 00 65 00 a.s.t.e.  
> 0040: 72 00 00 00 r...
> 
> * * *Event Type: Error
> 
>  
> Event Source: COM+  
> Event Category: (98)  
> Event ID: 4833  
> Date: 21/03/2007  
> Time: 3:37:57 PM  
> User: N/A  
> Computer: SERVER  
> Description:  
> The initialization of the COM+ surrogate failed &#8212; the CApplication object failed to initialize.{666F1874-46B6-4149-BD55-8C317FB73CC0}  
> Server Application ID: {666F1874-46B6-4149-BD55-8C317FB73CC0}  
> Server Application Instance ID:  
> {0350A841-7287-44A2-A1A8-0E5161856650}  
> Server Application Name: Access Gateway Server  
> The serious nature of this error has caused the process to terminate.  
> Error Code = 0x80131600 :  
> COM+ Services Internals Information:  
> File: d:ntcomcomplussrccomsvcssrgtapicsrgtserv.cpp, Line: 371  
> Comsvcs.dll file version: ENU 2001.12.4720.3959 shp  
> For more information, see Help and Support Center at http://go.microsoft.com/fwlink/events.asp.</p>
So this appeared to be an issue with the permissions on database access for the service account to SQL Server Express. No amount of adding or changing permissions helped so I rebuilt the box from scratch. Luckily I had [a scripted installation](http://www.stealthpuppy.com/blogs/travelling/archive/2007/03/23/unattended-citrix-advanced-access-control-part-1.aspx), so this didn't take long.

The second time around these errors were gone, however I found that when selecting SQL Server 2005 Express in the Server Configuration tool I was still having some database issues. I had installed SQL Server manually before the installation of AAC so I can only assume that was the cause. So instead of that I connected to the database instance just like it was full blown SQL Server and the Server Configuration tool completed successfully.

Now that I had AAC up and running, I configured a logon point, some resources and access policy and customised the awful, awful graphics Citrix have added to 4.5. Here's what I whipped up:

<img border="0" src="http://stealthpuppy.com/wp-content/uploads/2007/03/1000.14.1177.AccessGateway.gif" /> 

Far more appealing don't you think? A little 'Microsofty' I know, but much better. On graphics too, don't forget that the Access Gateway only handles GIF files; don't use PNGs like I did.

The upgrade of the Access Gateway appliance itself was very straightforward. I made a backup of the configuration and then uploaded the 4.5 upgrade. After a reboot, I uploaded the 4.5.1 hotfix and it looked good â€“ just as expected. I then connected the Access Gateway to my new AAC farm and then thought that all was well until I ran into the dreaded '[Protocol Driver Error](http://www.google.com/search?hl=en&rls=com.microsoft%3Aen-AU&q=%22protocol+driver+error%22+site%3Asupport.citrix.com)'.

What I'd missed was adding the Secure Ticket Authorities to the Access Gateway properties (through Gateway Appliances properties / Secure Ticket Authority option). Something so simple that cost me about Â½ hour of my time chasing my tail. What have I learnt from this? 1. Blog about it so I won't forget for next time and 2. Use a checklist when installing the Access Gateway.

Now all that I'm left with is a '500 Internal Server Error' when I restart the AAC services but that can wait for another time.