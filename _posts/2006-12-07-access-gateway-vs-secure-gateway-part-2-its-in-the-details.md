---
id: 137
title: 'Access Gateway vs. Secure Gateway Part 2: It's In The Details'
date: 2006-12-07T06:24:00+10:00
author: Aaron Parker
layout: post
guid: 'http://blog.stealthpuppy.com/uncategorized/access-gateway-vs-secure-gateway-part-2-it%e2%80%99s-in-the-details'
permalink: /access-gateway-vs-secure-gateway-part-2-its-in-the-details/
aktt_notify_twitter:
  - 'yes'
categories:
  - Citrix
tags:
  - Access-Gateway
  - Secure-Gateway
---
In [part 1](http://www.stealthpuppy.com/blogs/travelling/archive/2006/10/24/Access-Gateway-vs-Secure-Gateway-and-a-case-of-mistaken-Identity.aspx) I discussed how I believe that proving identity should be your most important consideration when deciding to implement the Citrix Access Gateway or Secure Gateway for remote access. In this second part I want to discuss some of the features of both the Access Gateway (CAG) and the Secure Gateway (CSG) and how they compare.

**Licensing**

One of the biggest differences between these two solutions is licensing. CSG comes as a part of Presentation Server and does not require any additional licensing. You will have to pay for a Windows Server license on which to run CSG however. The CAG, on the other hand, uses concurrent user licenses that are purchased separately to your Presentation Server licenses. You will also have to purchase the CAG hardware as the license agreement prohibits you from running the CAG software on any device not purchased from Citrix.

**Presentation Server Integration**

Strictly speaking, Presentation Server is not integrated into either the CAG or the CSG, though they do both provide an SSL relay function to Presentation Server. User interface access to published applications is provided via Web Interface (WI) or Advanced Access Control (AAC, a component of Access Gateway Advanced Edition). What the CAG has over the CSG is integration with AAC. AAC makes it simple to control what users can do in their ICA sessions and what applications are available externally. In this sense, it's easier to manage application access via AAC than it is via CAG and WI or CSG and WI alone.

**Other Features** 

This is where the similarities between the two gateway solutions end. Secure Gateway does not offer any of the advanced features of the Access Gateway such as:

  * SSL: this is essentially a Winsock redirector client that's improves on an L2TP/IPSec or PPTP VPN by not relying on routes and using SSL only;
  * Web Application Access: users can access internal web applications including integration with SharePoint Server;
  * Web-based File Share Access: users are able access internal file shares via a web browser with access to features such as uploading files control depending on the access scenario. Word, Excel, PowerPoint, Visio and PDF files can also be viewed directly in the browser without the requirement for local applications;
  * Web-based E-mail: provide users integrated access to Outlook Web Access or iNotes. Citrix also provides a custom interface which allows the administrator to define what users can do in their session such as downloading attachments.

**Conclusion** 

If you are looking to implement remote access with either of the Citrix offerings, don't listen to the hype - choose the option that best fits. Before you choose the Access Gateway (and I'm sure you'll be happy you did) answer the question of user identity first. I recommend starting [here](http://www.citrix.com/English/ps2/products/feature.asp?contentID=26143) for information on the Access Gateway.