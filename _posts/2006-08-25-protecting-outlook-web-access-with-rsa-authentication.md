---
id: 207
title: Protecting Outlook Web Access with RSA authentication
date: 2006-08-25T05:51:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/protecting-outlook-web-access-with-rsa-authentication
permalink: /protecting-outlook-web-access-with-rsa-authentication/
categories:
  - Microsoft
tags:
  - ISA Server
  - Outlook-Web-Access
---
<img align="left" src="https://stealthpuppy.com/wp-content/uploads/2006/08/exchange1.png" />Outlook Web Access can be protected with an extra layer of authentication via RSA SecurID. This can be implemented in one of two ways:

**1. ISA Server 2004**  
ISA Server 2004 implements the SecurID Web Filter that allows ISA Server to authenticate connections before providing access to published web servers. See the ISA Server help for information, but the requirements are:

1. The RSA ACE Client does not need to be installed on the server. ISA Server comes with it's own RSA ACE client DLLs and thus does not require the client installation. All that is required is to create the agent host and copy SDCONF.REC to %SYSTEMROOT%SYSTEM32  
2. The Network Service account must have read/write access to the following registry key: HKLMSoftwareSDTIACECLIENT.

There are two issues with this implementation:  
- The user will be prompted with an RSA authentication prompt; and  
- The RSA authentication web page is not customisable.

**2. RSA Web Agent for IIS**  
The RSA Web Agent for IIS, installed on the Exchange Server, offers authentication directly from IIS and also offers a 'single sign-on' solution.

_RSA Authentication Agent 5.3 for Web for Internet Information Services_  
<a target="_blank" href="http://www.rsasecurity.com/node.asp?id=2807"><u>http://www.rsasecurity.com/node.asp?id=2807</u></a>

The download contains the Agent software and a PDF file (WebAgent_IIS.PDF) for implementing RSA authentication on protected web pages. Page 51 of the PDF contains configuration information for implementing the single sign-on solution for Outlook Web Access. The information listed in the document is fairly straight-forward, however where it mentions Exchange System Manager to configure the HTTP Virtual Server, it should say IIS Manager.

There are a few things to be aware of when implementing this solution:

**Requirements**  
- The Exchange server/s must be running Exchange Server 2003 Service Pack 1 and Windows Server 2003 Service Pack 1;  
- The domain must be at Windows Server 2003 Functional Level;  
- Although the RSA documentation discusses implementing this solution in a front-end/back-end scenario, this solution will work in an environment without front-end servers.

**Installation**  
- After installing the RSA Web Agent software, IIS may need to be restarted (IISRESET) before RSA Authentication will work. The web browser may report '500. Internal Server error';  
- Create a second virtual server in IIS on the Exchange Server before implementing RSA auth. In this way, RSA can be implemented without affecting the existing Default Web Site and OWA will continue to work. This also allows for internal access to OWA via Integrated authentication and and external site with RSA auth for publishing;  
- To create the virtual server, right click the Default Web Site and select All Tasks/Save Configuration to a file. Use this configration file to create a new site: right click Web Sites and select New/Web Site (from file). Provide access to this site via a second IP address or use host headers;  
- Test that standard RSA authentication works before implementing the single sign-on configuration;  
- After configuration anonymous access to OWA as per the RSA documentation, check the directory access to the following file, otherwise users will be prompted with an authentication prompt when they logoff from OWA: /exchweb/bin/USA/logoff.asp;

<font color="#ff0000">UPDATE</font>: I forgot to add a third method of adding RSA authentication to OWA: [RSA ClearTrust](http://www.rsasecurity.com/node.asp?id=1186). ClearTrust is better integrated into the authentication than the Web Agent, however this requires additional cost above the standard RSA SecurID Authentication.

<font color="#ff0000">UPDATE #2</font>: There's a much better way to protect OWA with RSA authentication now that ISA Server 2006 has been released. Check out [my post here](http://www.stealthpuppy.com/blogs/travelling/archive/2006/09/29/Strengthening-OWA-Authentication-with-ISA-2006-and-RSA-SecurID-.aspx).