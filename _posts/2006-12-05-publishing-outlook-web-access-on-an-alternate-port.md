---
id: 141
title: Publishing Outlook Web Access on an Alternate Port
date: 2006-12-05T18:39:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/publishing-outlook-web-access-on-an-alternate-port
permalink: /publishing-outlook-web-access-on-an-alternate-port/
categories:
  - Microsoft
tags:
  - ISA Server
  - Outlook-Web-Access
---
<img align="left" src="{{site.baseurl}}.com/media/2006/12/exchange.png" />We recently had client with a requirement to provide Outlook Web Access and Exchange over the Internet/Outlook Anywhere (RPC over HTTPS) access using a single IP address on ISA Server. The problem with making both of these services available on a single IP address is that both utilise HTTPS which by default is TCP 443. RPC over HTTPS with Outlook can't use an alternate port - if you attempt to specify and alternate port Outlook UI you receive the following error:

<font face="courier new,courier">The proxy server you have specified is invalid. Correct it and try again.</font>

Therefore the solution was to provide Outlook Web Access on an alternate port (TCP 444), whilst leaving RPC over HTTPS on TCP 443. In this case we setup a web publishing rule that used a web listener using TCP 444 pointing to the internal Exchange server configured to accept HTTPS on TCP 443. However, we found that users would receive the following error messages in the browser when moving or deleting e-mail messages:

"<font face="courier new,courier">Moving or copying items between Exchange servers is not supported</font>" and "<font face="courier new,courier">502 Bad Gateway</font>"

<img border="0" width="369" src="{{site.baseurl}}.com/media/2006/12/1000.14.220.OWAError1.PNG" height="113" style="width: 369px; height: 113px" /><img border="0" src="{{site.baseurl}}.com/media/2006/12/1000.14.221.OWAError2.PNG" /> 

The solution to this was to configure IIS on the Exchange server to use TCP 444 for HTTPS/SSL and reconfigure the ISA Server web publishing rule to specify TCP 444 for SSL for the web listenter and the published server. I presume this has something to do with the dynamic nature of the Outlook Web Access application, but I've not had a chance to investigate any deeper.