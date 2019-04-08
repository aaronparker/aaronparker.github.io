---
id: 431
title: Addressing Apple Bonjour With Adobe CS3 Apps On SoftGrid
date: 2008-01-24T16:29:44+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/addressing-apple-bonjour-with-adobe-cs3-apps-on-softgrid
permalink: /addressing-apple-bonjour-with-adobe-cs3-apps-on-softgrid/
dsq_thread_id:
  - "195380044"
categories:
  - Applications
tags:
  - Adobe
  - SoftGrid
---
<img align="left" src="http://stealthpuppy.com/wp-content/uploads/2008/02/bonjour-softgridbox.png" alt="bonjour-softgridbox.png" />The Adobe CS3 products include the [Apple Bonjour](http://www.apple.com/macosx/technology/bonjour.html) service for use with the [Adobe Version Cue](http://www.adobe.com/products/creativesuite/versioncue/) server. You can view information on this implementation here: [Adobe Creative Suite 3 and Creative Suite 3 components install Bonjour (Windows)](http://www.adobe.com/go/kb400982)

> When you install any edition of the Adobe Creative Suite 3 family or a Creative Suite 3 component on Windows, Bonjour for Windows is installed as a service on the machine. Bonjour is Apple's open source implementation of zero-configuration networking software. It is used by Adobe Version Cue CS3 client applications to dynamically discover Version Cue Servers on the local network.

After installing any of the CS3 application you will see the Bonjour service listed on the Virtual Services tab as _##Id\_String2.6844F930\_1628\_4223\_B5CC_5BB94B879762##_. When started, this service will attempt to open UDP 5353.

The issue with allowing this service to run inside the bubble is that multiple copies of the service cannot open the same port. Therefore you will see the service start successfully in the first bubble, but in subsequent bubbles the service will start and then exit.

This means that we need to remove the service from inside the bubble. Directly after installing a CS3 application and before clicking on _Stop Monitoring_, remove the Bonjour service by running the following command:

[quickcode:noclick]&#8221;%ProgramFiles%\Bonjour\mDNSResponder.exe&#8221; -remove[/quickcode]

Then delete the Bonjour folder - _%ProgramFiles%\Bonjour_. Users can then connect to the Version Cue Servers manually when running a CS3 application:

> Note: Removing Bonjour prevents Version Cue clients (Photoshop, Illustrator, InDesign, Flash, Bridge) from automatically discovering Version Cue Servers and Version Cue projects in your local network. You will need to connect manually using Connect to Server and the URL or IP address of the machine running Version Cue Server instead.

If automatic discovery is required, perform a native install of [Bonjour for Windows 1.0.4](http://www.apple.com/downloads/macosx/apple/windows/bonjourforwindows.html). This download from Apple includes an Internet Explorer plug-in and a printer wizard, which you may not want to include. To install the Bonjour service only, follow these steps:

  1. Grab _mdnsNSP.dll_ and _mDNSResponder.exe_ from this download. The simplest method would be to install to a virtual machine and copy the required files from there.
  2. Copy these files to _%ProgramFiles%\Bonjour_
  3. Run this command to install the service:

[quickcode:noclick]&#8221;%ProgramFiles%\Bonjour\mDNSResponder.exe&#8221; -install[/quickcode]