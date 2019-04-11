---
id: 411
title: Bypass Windows Live Installer With Direct Install Downloads
date: 2008-01-26T08:00:18+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/deployment/bypass-windows-live-installer-with-direct-install-downloads
permalink: /bypass-windows-live-installer-with-direct-install-downloads/
dsq_thread_id:
  - "195379925"
categories:
  - Automation
tags:
  - Windows-Live
---
<img src="{{site.baseurl}}.com/media/2008/02/windowslive.png" align="left" alt="windowslive.png" />Looking to bypass the Windows Live Installer and want direct access to the Live suite application installers? Here's where to find them. Credits go to the [Vistax64 forums](http://www.vistax64.com/windows-live/92348-windows-live-suite-downloads.html) and [Snakodus](http://snakodus.blogspot.com/2007/11/once-again-windows-live-products.html).

The new [Windows Live Installer](http://get.live.com/) is a great way for every day users to gain access to each of the new Live applications, but what if you are looking to create a silent install script, deploy them to multiple computers or just don't have Internet access at the time of install?

There are two ways to get access to the source MSI files for installing these applications. The first way is install the Live applications on a single computer, you can then find a copy of the installers locally:

  * 32-bit Windows - C:\Program Files\Common Files\WindowsLiveInstaller\MsiSources
  * 64-bit Windows - C:\Program Files (x86)\Common Files\WindowsLiveInstaller\MsiSources<br class="webkit-block-placeholder" />

Alternatively you can download the installers directly from the [Live Suite SkyDrive folder](http://cid-9e63a4688135fd45.skydrive.live.com/browse.aspx/LiveWave2EN):



In this folder you will find the following Live applications:

  * Windows Live Sign-In Assistant 4.200.520.1: Install_{AFA4E5FD-ED70-4D92-99D0-162FD56DC986}.msi
  * Windows Live Messenger 8.5.1302.1018: Install_{508CE775-4BA4-4748-82DF-FE28DA9F03B0}.msi
  * Windows Live Writer 12.0.1366.1026: Install_{9176251A-4CC1-4DDB-B343-B487195EB397}.msi
  * Windows Live Mail 12.0.1606.1023: Install_{184E7118-0295-43C4-B72C-1D54AA75AAF7}.msi
  * Windows Live Toolbar 03.01.0000.0146: Install_{D5A145FC-D00C-4F1A-9119-EB4D9D659750}.msi
  * Windows Live Photo Gallery 12.0.1308.1023: Install_{257E440F-781F-459B-9A68-A0872B80C1D6}.msi 

Before you install Windows Live Photo Gallery you will need to install [Microsoft SQL Server 2005 Compact Edition](http://www.microsoft.com/downloads/details.aspx?FamilyID=85e0c3ce-3fa1-453a-8ce9-af6ca20946c3&DisplayLang=en).<span style="color: #551a8b; text-decoration: underline" class="Apple-style-span"></span>