---
id: 41
title: 'Service Pack integration issues? It&#8217;s probably something simple'
date: 2007-05-17T16:32:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/service-pack-integration-issues-its-probably-something-simple
permalink: /service-pack-integration-issues-its-probably-something-simple/
categories:
  - Microsoft
tags:
  - Windows
---
I was having some issues integrating Windows Server 2003 Service Pack 2 into a copy of Windows Server 2003 Enterprise R2 x64. The updater would keep reporting this error and bomb out:

> &#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;  
> Service Pack 2 Setup  
> &#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;  
> Failed to copy some or all of the files necessary for integrated install.
> 
> Please check that:  
> a) No network or copy errors occurred during the integration process  
> b) The format of the destination directory is correct.  
> The files to be integrated must reside in an i386 and/or ia64 or nec98 directory  
> (i.e. for an i386 share, if you typed &#8220;update /s:c:\cdshare&#8221;, the files must be in the c:\cdshare\i386 directory).  
> &#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;  
> OK  
> &#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;

This stumped me for a bit, even after recopying the installation files from the CDs again and getting the same error. I then tried starting from stratch again and deleted the source files using the RD command. This command failed on a couple of files and to delete them I had to remove the Read Only attribute. So after recopying the source files and then removing the Read Only attribute for all the files, the Service Pack integration worked. It&#8217;s funny sometimes how the simple things can trip you up.