---
id: 2893
title: App-V 5 PowerShell One Liners – Sequencing an application
date: 2012-11-01T23:43:55+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2893
permalink: /app-v-5-powershell-one-liners-sequencing-an-application/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "910431881"
categories:
  - Automation
tags:
  - App-V
  - PowerShell
---
<img class="alignright size-full wp-image-2873" style="margin-left: 5px; margin-right: 5px;" title="AppV-PowerShell-Logo" src="http://stealthpuppy.com/wp-content/uploads/2012/10/AppV-PowerShell-Logo.png" alt="" width="128" height="128" />App-V 5.0 is PowerShell driven, which means opportunity for automating and scripting tasks that might have to be completed manually or might have been a challenge to script previously.

Using PowerShell to drive the App-V Sequencer opens up some great automation scenarios. Here's how to use PowerShell to sequence an application without manually starting the Sequencer UI.

I'm using [Paint.NET](http://getpaint.net) as my example application and before sequencing, I have configured an install script for this application which will automate the installation and configuration.

I've placed all binaries and files, including a Sequencer Template into a folder at C:\Packages. My script (INSTALL.CMD) looks like this:

[code]@ECHO OFF  
START /WAIT C:\Packages\Paint.NET.3.5.10.Install.exe /skipConfig /auto PDNUPDATING=0 CHECKFORUPDATES=0 DESKTOPSHORTCUT=0[/code]

<img class="alignnone size-full wp-image-2895" title="PackagesFolder" src="http://stealthpuppy.com/wp-content/uploads/2012/11/PackagesFolder.png" alt="" width="660" height="190" srcset="https://stealthpuppy.com/wp-content/uploads/2012/11/PackagesFolder.png 660w, https://stealthpuppy.com/wp-content/uploads/2012/11/PackagesFolder-150x43.png 150w, https://stealthpuppy.com/wp-content/uploads/2012/11/PackagesFolder-300x86.png 300w" sizes="(max-width: 660px) 100vw, 660px" /> 

Before running the **New-AppvSequencerPackage** command, I have changed directory to C:\Packages. To capture Paint.NET as a new App-V 5.0 package, I have used the following command:

[code language="ps"]New-AppvSequencerPackage -FullLoad -Installer "Install.CMD" -Name "PaintNet3x" -Path "C:\Packages" -PrimaryVirtualApplicationDirectory "C:\Program Files\Paint.Net" -TemplateFilePath "AppV5SequencerTemplate.appvt" -Verbose[/code]

This generates a completed package in C:\Packages\PaintNet3x, ready for deployment to a client PC.

For more information on the New-AppvSequencerPackage command, run:

[code]Get-Help New-AppvSequencerPackage -detailed[/code]