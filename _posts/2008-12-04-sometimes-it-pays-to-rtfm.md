---
id: 828
title: Sometimes it pays to RTFM..
date: 2008-12-04T22:37:57+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/sometimes-it-pays-to-rtfm
permalink: /sometimes-it-pays-to-rtfm/
categories:
  - Microsoft
tags:
  - App-V
---
<img style="margin: 0px 0px 10px 10px; display: inline" title="SoftGrid Closed Box" src="https://stealthpuppy.com/wp-content/uploads/2008/12/softgridclosedbox.png" border="0" alt="SoftGrid Closed Box" width="96" height="96" align="right" /> [Ment](http://desktopcontrol.blogspot.com/) e-mailed me the other day about the KEEPCURRENTSETTINGS property of the App-V 4.5 client setup and how when used on the command line, other properties are ignored. I hadn’t seen this behaviour – or so I thought until I found that my client install script was not setting the right virtual driver letter or enabling streaming from file.

It turns out, I was using the KEEPCURRENTSETTINGS property, but I did have it set to 0 – just the existence of KEEPCURRENTSETTINGS was enabling Setup to ignore the other command line parameters.

Of course, this behaviour is documented, [in the release notes](http://technet.microsoft.com/en-us/library/cc817171.aspx), in this document: [Application Virtualization Client Installer Command-Line Parameters](http://technet.microsoft.com/en-us/library/cc843737.aspx), and there’s even a knowledgebase article dedicated to this parameter: [Client installer command line parameters are ignored when used in conjunction with KEEPCURRENTSETTINGS=1 in Microsoft Application Virualization 4.5](http://support.microsoft.com/kb/959521/).

Having tested this, I would recommend avoiding the KEEPCURRENTSETTINGS if you can. Use [a WMI filter to prevent Group Policy from applying](https://stealthpuppy.com/virtualisation/unable-to-set-security-descriptor-on-global-package-files-on-app-v-client-upgrade) to workstations until they are all running the 4.5 client.

Now if only I’d read those documents more closely I would have saved myself an hour of running around in circles. Sometimes it pays to RTFM..

(Thanks to Ment for helping out with this one)