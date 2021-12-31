---
id: 124
title: "Link: Using ISA Server to Extend Server and Domain Isolation Interoperability"
date: 2007-01-11T23:23:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/link-using-isa-server-to-extend-server-and-domain-isolation-interoperability
permalink: /link-using-isa-server-to-extend-server-and-domain-isolation-interoperability/
categories:
  - Microsoft
tags:
  - Domain-Isolation
  - ISA Server
---
Microsoft have posted a whitepaper on utilising ISA Server as an IPSec gateway/proxy in a domain or server isolation environment to extend IPSSec protecttion to machines that do not support IPSec. This essentially involves ISA Server terminating the IPSec connection and passing traffic into a NAT'd network. It's a 23 page document and applies to both ISA Server 2004 and 2006:

> This white paper details how to use ISA Server as an IPsec gateway or proxy within a Server and Domain Isolation solution, from preparation to installation and configuration, and includes best practices to keep in mind during the process. It is written for enterprise technical decision makers, IT administrators, and architects who want to gain a better understanding of the processes and implementation of ISA Server as an IPsec gateway or proxy to extend IPsec interoperability.

 [Using ISA Server to Extend Server and Domain Isolation Interoperability](http://www.microsoft.com/downloads/details.aspx?FamilyID=589fcf8e-0511-4c22-a39e-6b841dd3c74f&DisplayLang=en)

**UPDATE**: Ian Hameroff has more information at his post: [Using ISA Server to Extend Server and Domain Isolation to non-Windows Platforms](http://blogs.technet.com/ianhamer/archive/2007/01/19/using-isa-server-to-extend-server-and-domain-isolation-to-non-windows-platforms.aspx)