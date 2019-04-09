---
id: 178
title: "0xc0040357: The Server referenced by Array SERVERNAME does not exist"
date: 2006-09-26T01:02:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/0xc0040357-the-server-referenced-by-array-servername-does-not-exist
permalink: /0xc0040357-the-server-referenced-by-array-servername-does-not-exist/
categories:
  - Microsoft
tags:
  - ISA Server
---
Just in the process of upgrading our firewall from ISA Server 2004 to ISA Server 2006. Before I did this, though, I wanted to grab an export of my current config. However toward the end of the export, the management console would report this error:

> 0xc0040357  
> The Server referenced by Array CLAFW does not exist.

After a bit of searching, I found [this page](http://blogs.technet.com/jhoward/archive/2005/05/30/405484.aspx) by John Howard (jeez our Prime Minister is a busy boy 😉 ) that details the issue. In my case it was the exact same issue, I removed the offending report job from the ISA Server Management Console and my export worked fine.