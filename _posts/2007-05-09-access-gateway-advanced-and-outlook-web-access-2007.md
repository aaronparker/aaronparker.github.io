---
id: 47
title: Access Gateway Advanced and Outlook Web Access 2007
date: 2007-05-09T00:05:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/access-gateway-advanced-and-outlook-web-access-2007
permalink: /access-gateway-advanced-and-outlook-web-access-2007/
categories:
  - Citrix
tags:
  - Access-Gateway
  - Outlook-Web-Access
---
If you are looking at implementing remote access to Outlook Web Access 2007 through Citrix Access Gateway Advanced you'll find that things aren't going to work as expect and currently this configuration is not supported by Citrix.

After upgrading our internal Exchange organisation to Exchange Server 2007 (we have a single server implementation), I've found that Outlook Web Access no longer works through the Access Gateway Advanced Access Navigator interface. Instead of the user being presented with OWA they see this page:

![1000141406aac-owa.gif](https://stealthpuppy.com/media/2007/05/1000141406aac-owa.gif) 

No amount of attempting to log into OWA through this interface will result in a successful login. Looking at a packet capture of the initial logon attempt the Access Gateway sends the initial GET request and the Exchange server responds with a 401 and sends back the authentication options as you can see here:

<font face="courier new,courier">- HTTP: Response, HTTP/1.1, Status Code = 401<br /> ProtocolVersion: HTTP/1.1<br /> StatusCode: 401, Unauthorized<br /> Reason: Unauthorized<br /> ContentLength: 1656<br /> ContentType: text/html<br /> Server: Microsoft-IIS/6.0<br /> WWWAuthenticate: Negotiate<br /> WWWAuthenticate: NTLM<br /> WWWAuthenticate: Basic realm="exchange.company.local"<br /> X-Powered-By: ASP.NET<br /> Date: Wed, 09 May 2007 05:10:18 GMT<br /> HeaderEnd: CRLF</font>

One glaring issue with this response is that realm used for Basic authentication is the name of the server, not the domain name as specified in the IIS configuration, but I think that's another issue. AAC does attempt NTLM authentication in the next packet - this is the GET request (I've truncated the Authorisation field):

<font face="courier new,courier">- HTTP: Request, GET /owa<br /> Command: GET<br /> + URI: /owa<br /> ProtocolVersion: HTTP/1.1<br /> Connection: Keep-Alive<br /> Via: 1.1 FW<br /> Accept: image/gif, image/x-xbitmap, image/jpeg, image/pjpeg, application/x-ms-application, application/vnd.ms-xpsdocument, application/xaml+xml, application/x-ms-xbap, application/x-shockwave-flash, application/vnd.ms-excel, application/vnd.ms-powerpoint<br /> Accept-Language: en-au<br /> Cookie: LPNAME=/CitrixLogonPoint/navui/;<br /> UA-CPU: x86<br /> UserAgent: Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; SLCC1; .NET CLR 2.0.50727; .NET CLR 3.0.04506; .NET CLR 1.1.4322; InfoPath.2)<br /> Host: exchange.company.local<br /> Cache-Control: no-cache<br /> Pragma: no-cache<br /> Authorization: Negotiate YIIKuAYGKwYBBQUCoIIKrDCCCqigJDAiBgkqhki..</font>

The Exchange server again responds with HTTP 401 and this process then repeats for another round until the AAC gives up on authenticating and displays the page seen above. Unfortunately I can't work out a reason for this behaviour and don't have a solution, but it's something you should be aware of before you start upgrading to Exchange Server 2007. Hopefully we'll see a resolution from Citrix soon.

**UPDATE**: I haven't had an opportunity to test this out yet, but check out [this thread at the Citrix Forums](http://support.citrix.com/forums/thread.jspa?forumID=101&threadID=88407) for some information on getting the CAG and OWA 2007 working.