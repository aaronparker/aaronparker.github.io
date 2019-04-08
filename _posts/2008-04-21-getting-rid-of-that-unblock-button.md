---
id: 534
title: Getting Rid Of That Unblock Button
date: 2008-04-21T17:51:36+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/windows/getting-rid-of-that-unblock-button
permalink: /getting-rid-of-that-unblock-button/
categories:
  - Microsoft
tags:
  - Group Policy
---
I actually don't mind UAC at all, but this button is really annoying:

<img border="0" alt="FilePropertiesUnblock" src="http://stealthpuppy.com/wp-content/uploads/2008/04/filepropertiesunblock.png" width="451" height="337" /> 

You will usually see this on the properties of files you have downloaded from the Internet but it also manifests itself in other file copies too, such as copying a ZIP file to a server. The inbuilt Windows ZIP tool won't open ZIP files marked like this at all, even if you click Unblock.

To banish this once and for all, enable the following setting in a domain GPO or the local Group Policy:

_User Configuration / Administrative Templates / Windows Components / Attachment Manager / Do not preserve zone information in file attachments_

> This policy setting allows you to manage whether Windows marks file attachments with information about their zone of origin (i.e. restricted, Internet, intranet, local). This requires NTFS in order to function correctly, and will fail without notice on FAT32. By not preserving the zone information Windows cannot make proper risk assessments.

A Group Policy refresh or logoff and back on will get this working for you on any _new_ file downloads or copies. This comes with all of the usual warnings about opening stuff downloaded from the Internet - make sure you know where you got it from is trustworthy and scan it with AV first.

[Description of how the Attachment Manager works in Windows XP Service Pack 2](http://support.microsoft.com/kb/883260)