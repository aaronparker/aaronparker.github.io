---
id: 194
title: Access Gateway CITRIX_ADMIN_MONITOR.EXE and Proxy Servers
date: 2006-08-28T16:57:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/access-gateway-citrix_admin_monitorexe-and-proxy-servers
permalink: /access-gateway-citrix_admin_monitorexe-and-proxy-servers/
categories:
  - Citrix
tags:
  - Access-Gateway
---
If you run CITRIX\_ADMIN\_MONITOR.EXE and after you enter the username and password the Access Gateway does not display, this could be related to proxy settings in Internet Explorer. Even adding the address of the Access Gateway to the proxy bypass list does not solve the issue. Disable proxy settings in Internet Explorer and the Access Gateway desktop displays immediately. In our case we have ISA Server 2004 as our firewall. ISA Server does not allow protocols other than HTTP to be tunnelled over SSL by default and if you check the log files you will see the connection being denied. So the solution here is to either, disable proxy settings when using CITRIX\_ADMIN\_MONITOR or enable port 9001 to be [tunnelled over SSL](http://www.isaserver.org/articles/2004tunnelportrange.html).