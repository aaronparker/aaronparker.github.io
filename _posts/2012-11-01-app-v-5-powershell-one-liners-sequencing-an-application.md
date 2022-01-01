---

title: App-V 5 PowerShell One Liners – Sequencing an application
date: 2012-11-01T23:43:55+10:00
author: Aaron Parker
layout: post

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
App-V 5.0 is PowerShell driven, which means opportunity for automating and scripting tasks that might have to be completed manually or might have been a challenge to script previously.

Using PowerShell to drive the App-V Sequencer opens up some great automation scenarios. Here's how to use PowerShell to sequence an application without manually starting the Sequencer UI.

I'm using [Paint.NET](http://getpaint.net) as my example application and before sequencing, I have configured an install script for this application which will automate the installation and configuration.

I've placed all binaries and files, including a Sequencer Template into a folder at C:\Packages. My script (INSTALL.CMD) looks like this:

```cmd
@ECHO OFF  
START /WAIT C:\Packages\Paint.NET.3.5.10.Install.exe /skipConfig /auto PDNUPDATING=0 CHECKFORUPDATES=0 DESKTOPSHORTCUT=0
```

![Packages Folder]({{site.baseurl}}/media/2012/11/PackagesFolder.png)

Before running the **New-AppvSequencerPackage** command, I have changed directory to C:\Packages. To capture Paint.NET as a new App-V 5.0 package, I have used the following command:

```powershell
New-AppvSequencerPackage -FullLoad -Installer "Install.CMD" -Name "PaintNet3x" -Path "C:\Packages" -PrimaryVirtualApplicationDirectory "C:\Program Files\Paint.Net" -TemplateFilePath "AppV5SequencerTemplate.appvt" -Verbose
```

This generates a completed package in C:\Packages\PaintNet3x, ready for deployment to a client PC.

For more information on the New-AppvSequencerPackage command, run:

```powershell
Get-Help New-AppvSequencerPackage -detailed
```
