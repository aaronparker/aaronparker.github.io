---
id: 2366
title: Is it legal to virtualize Apple iTunes?
date: 2011-09-16T11:55:23+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2366
permalink: /is-it-legal-to-virtualize-apple-itunes/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "416351688"
categories:
  - Applications
tags:
  - App-V
  - iTunes
---
_Preface_: I don&#8217;t speak legalese and this post is based on my own intepretation of the iTunes distribution agreement.

I&#8217;ve previously talked about [virtualizing Apple iTunes with App-V](http://stealthpuppy.com/virtualisation/sequencing-apple-itunes-10/); however after taking a look through the distribution agreements that you&#8217;re supposed to accept, I&#8217;m under the impression that doing so doesn&#8217;t adhere to the agreement.

If you&#8217;re looking to distribute iTunes and QuickTime in your environment, Apple requires that you [obtain an agreement to do so](http://developer.apple.com/softwarelicensing/agreements/itunes.html). There are two agreements &#8211; one for universities and another for corporations (uni&#8217;s actually have 2 &#8211; one for [CD distribution](http://developer.apple.com/softwarelicensing/agreements/pdf/itns.qt.univ.cd.pdf), another for [distribution from a server](http://developer.apple.com/softwarelicensing/agreements/pdf/itunesqt.univ.server.pdf)).

Here&#8217;s a quote from the university CD distribution agreement:

> Licensee may not modify or alter the Software, or the Apple End User Agreement that accompanies the Software. The Software must be installed as part of the default installation of the Bundle without any additional action or selection required by the End User, using the installer provided by Apple. Installation must include all files as installed by such installer and Licensee must not interfere with the installer&#8217;s placement of the software alias icons on the desktop.

And here&#8217;s a quote from the corporate site license:

> Licensee may not modify or alter the Software, the Apple installer or the Apple End User Agreement that accompanies the Software as provided by Apple to Licensee. As a condition of the rights granted herein, each installation of the iTunes and QuickTime Software must result in the iTunes and QuickTime Player icon residing on the desktop of each authorised user.

Based on [my recipe for iTunes](http://stealthpuppy.com/virtualisation/sequencing-apple-itunes-10/), I understand the process of virtualising the application to be breaking the agreement because we are doing a few things:

  * Extracting the MSI&#8217;s from the iTunes installer &#8211; breaking the Apple installer
  * Accepting the End User Agreement during the monitoring phase
  * Probably not delivering the iTunes and QuickTime shortcuts to the desktop

I could configure my package such that the user still needs to accept the license agreement, but in a corporate environment do you really want to have to let users do that?

I could also deliver the iTunes and QuickTime shortcuts to the user&#8217;s desktop, but most users already have enough shortcuts and files on their desktops, I&#8217;m not going to force more on them. Forcing desktop shortcuts on users isn&#8217;t great user experience and quite frankly, Apple&#8217;s not going to dictate the user experience in my environment.

But ultimately it&#8217;s point 1 that has me concerned &#8211; if you interpret the agreement to the letter, then it sounds like application virtualization is breaking that agreement.

What do you think?