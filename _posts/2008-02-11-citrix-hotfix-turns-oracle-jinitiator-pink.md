---
id: 465
title: Citrix Hotfix Turns Oracle JInitiator Pink
date: 2008-02-11T21:30:06+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/terminal-server/citrix-hotfix-turns-oracle-jinitiator-pink
permalink: /citrix-hotfix-turns-oracle-jinitiator-pink/
dsq_thread_id:
  - "195380103"
categories:
  - Citrix
tags:
  - Oracle
  - Presentation-Server
---
<p class="important">
  A <a href="http://support.citrix.com/forums/thread.jspa?forumID=137&threadID=98610&messageID=698788&start=0&#698788">workaround has been posted </a>in the forums. Run the following command to exclude Internet Explorer from the <a href="http://support.citrix.com/article/CTX110301">multiple montior hooks</a> that Presentation Server provides:<br /> [code]REG ADD "HKLM\SOFTWARE\Citrix\CtxHook\AppInit_Dlls\Multiple Monitor Hook" /v Exclude /d "iexplore.exe" /t REG_SZ /f[/code]
</p>

Avert thy eyes lest you be turned to stone! Well not quite, but your users might be stoning you if your Oracle JInitiator applications look like this (I've spared you the hot pink version):

<img src="{{site.baseurl}}/media/2008/02/pinkjinitiator.png" border="0" alt="PinkJInitiator" width="410" height="296" /> 

This behaviour is due to a couple of Presentation Server hotfixes - [PSE450R01W2K3035](http://support.citrix.com/article/CTX115275) and [PSE450R01W2K3042](http://support.citrix.com/article/CTX115629) (which supersedes the former). Ironically these hotfixes directly address some graphical display issues:

>   * In 16-bit color connections, blue or cyan rectangles might appear on graphics.
>   * In 16-bit color connections, text, lines, and shadows on inactive menu buttons and windows might appear blue instead of gray.
>   * In 16-bit color connections, blue or cyan rectangles might appear on graphics.

I've tested the following configurations in our environment:

  * PSE450R01W2K3035 installed only
  * PSE450R01W2K3042 installed after installing PSE450R01W2K3035
  * PSE450R01W2K3042 installed only
  * ICA and RDP connections
  * 256 colour, 16-bit colour and 24-bit colour depths

These versions of the JInitiator experience the issue, and they even come with their own colour scheme:

  * Oracle JInitiator 1.3.1.28, paints the form in pink or purple, hot pink is especially nice
  * Oracle JInitiator 1.3.1.25, paints the form white
  * Oracle JInitiator 1.3.1.22, paints the form yellow and green, very earthy

We're having some problems with earlier versions of the JInitiator so I haven't been able to test those. These hotfixes address a large number of issues including some of seamless windows updates as well as being required to use the [SmartAuditor](http://www.citrix.com/English/ps2/products/subfeature.asp?contentID=682169) feature of Presentation Server. Hopefully Citrix will have an update soon.

Citrix Support forum topics covering this issue:

  * [Problem Citrix PS 4.5 with Oracle web](http://support.citrix.com/forums/thread.jspa?forumID=137&threadID=98610&tstart=0)
  * [Issues after installing PSE450R01W2K3035.msp](http://support.citrix.com/forums/thread.jspa?forumID=137&threadID=97365&tstart=0)