---
id: 1848
title: 'App-V FAQ: Can I use Active Upgrade without RTSP(S)?'
date: 2010-09-02T11:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/deployment/app-v-faq-24-can-i-use-active-upgrade-without-rtsps
permalink: /app-v-faq-24-can-i-use-active-upgrade-without-rtsps/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195590996"
categories:
  - FAQs
tags:
  - App-V
  - AppVFAQ
---
_<img style="margin: 0px 10px 5px 0px; display: inline;" src="http://stealthpuppy.com/wp-content/uploads/2010/06/AppVFAQLogo.png" alt="" align="left" />Today’s FAQ has been written by Justin Zarb, all around good guy and a Premier Field Engineer with Microsoft in the UK. You can read more App-V articles written by Justin at his blog:_ [appvguy.com](http://appvguy.com/ "appvguy.com")

This terminology is a little confusing. The "Active" was added in 4.x and referred to the fact that we could add and begin serving an updated version while the current version was still actively in use. The RTSP, HTTP, FILE (SMB) protocols all allow this functionality.

However with RTSP, an [App-V Management Server or Streaming Server](http://technet.microsoft.com/en-us/library/cc843634.aspx) sits between the client and the content (the SFT file containing the application). Clients never need to be told that there is an update because the server is checking every launch and streams the updated SFT. The client requests a Package GUID not a specific file.

An RTSP streaming client will get an update the next time they launch the app – no refresh is required. There is an exception here – all instances of an application running on Terminal Servers or Remote Desktop Servers have be inactive (i.e. no one using it), then the next user to launch the application will trigger the update for everyone else.

The App-V Streaming Server does not even need the updated version to publish. Once the updated package is fully in the Content share and the Package Detection Interval (the configured amount of time that the Streaming Server detects changes in the Content share) kicks in, it is served on next launch.

HTTP/FILE streaming is a little different – there is no middleman so the client makes a direct request for the SFT file. If the HREF is _http://websvr/content/Visio/Visio.sft_, the client asks specifically for that path even if there happens to be _Visio_2.sft_ (version 2 of the package) in the same directory. The publishing information must be updated on the client by some other means.

An admin would have added the updated SFT and OSDs to Content and on the next Desktop Refresh the updated OSD with _HREF=http://websvr/content/Visio/Visio_2.sft_ would come down and on the next launch the updates will stream. Still an active upgrade, but only after a refresh. NOTE: Streaming is not tied to a publishing method, so a refresh can be:

  * App-V Management Server over RTSP
  * IIS with ASP over HTTP (rare as you must [code your own provisioning logic](http://blogs.msdn.com/b/johnsheehan/archive/2009/03/24/http-publishing-in-app-v-part-1.aspx))
  * MSI with MODE=STREAMING via [ESD](http://technet.microsoft.com/en-us/library/cc843643.aspx)
  * SFTMIME commands via ESD

### Resources

  * [App-V Application Publishing and Client Interaction](http://download.microsoft.com/download/f/7/8/f784a197-73be-48ff-83da-4102c05a6d44/AppPubandClientInteraction.docx)
  * [Methods for Upgrading or Updating Virtualized Applications](http://blogs.technet.com/b/appv/archive/2007/09/25/methods-for-upgrading-or-updating-virtualized-applications.aspx)
  * [App-V: Sequencing and Deploying Using MSI and Active Upgrade, a video from BriForum 2009](http://www.brianmadden.com/blogs/videos/archive/2009/08/25/App_2D00_V_3A00_-Sequencing-and-Deploying-Using-MSI-and-Active-Upgrade_2C00_-a-video-from-BriForum-2009.aspx)
  * [How to Configure the App-V System for Package Upgrade](http://technet.microsoft.com/en-us/library/ee704533.aspx)
  * [How Do I: Updating and Upgrading a Sequenced Application Using Microsoft App-V?](http://technet.microsoft.com/en-us/windows/dd443654.aspx)
  * [TechNet Virtual Lab: Learning App-V Intermediate Skills](http://go.microsoft.com/?linkid=9713043)
  * [How to Use the Differential SFT File](http://technet.microsoft.com/en-us/library/dd351395.aspx)