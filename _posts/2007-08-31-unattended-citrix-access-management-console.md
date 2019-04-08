---
id: 340
title: Unattended Citrix Access Management Console
date: 2007-08-31T11:13:55+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/deployment/unattended-citrix-access-management-console
permalink: /unattended-citrix-access-management-console/
dsq_thread_id:
  - "195379403"
categories:
  - Automation
tags:
  - Presentation-Server
---
 If you're looking at deploying the updated [Access Management Console](https://www.citrix.com/English/SS/downloads/details.asp?dID=8218&downloadID=164650&pID=186#top) you might be interested in how to perform an unattended install. There are really two ways to do this:

  1. Use Windows Installer (MSIEXEC) to run each of the installer packages
  2. Run the CTXINSTALL setup application

Using the Windows Installer packages is fairly straight-forward, but you'l have to ensure you install the ASC_Framework.MSI package before installing any of the other packages.

<p style="text-align: center">
  <img src="http://stealthpuppy.com/wp-content/uploads/2007/08/amcfolder.png" alt="amcfolder.png" />
</p>

The second and probably simplest method to perform an unattended install is to use the SILENT* switch on with the CTXINSTALL application:

[code]START /WAIT CTXINSTALL.EXE /SILENT[/code]

*No thanks to Citrix for this. A /? argument on their installers would be really nice..