---
id: 681
title: Get Ready Now To Deploy Internet Explorer 8
date: 2008-08-28T18:28:57+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/windows/get-ready-now-to-deploy-internet-explorer-8
permalink: /get-ready-now-to-deploy-internet-explorer-8/
categories:
  - Microsoft
tags:
  - Internet-Explorer
---
Unless you're hell bent on deploying Firefox in your corporate environment (and [managing it with Group Policy](http://www.frontmotion.com/Firefox/fmfirefox.htm)), here are some reasons why you should plan for Internet Explorer 8 now and deploy it when the final version is released:

  * [Compatibility View mode](http://blogs.msdn.com/ie/archive/2008/08/27/introducing-compatibility-view.aspx) will ensure those internal web applications don't break. Intranet sites are displayed Compatibility View mode by default. 

<img title="CompatibilityViewSettings" border="0" alt="CompatibilityViewSettings" src="{{site.baseurl}}.com/media/2008/08/compatibilityviewsettings.png" width="341" height="373" /> 

  * It's also really simple for users to enable Compatibility View with the Compatibility View button<img title="CompatibilityViewButton" border="0" alt="CompatibilityViewButton" src="{{site.baseurl}}.com/media/2008/08/compatibilityviewbutton.png" width="26" height="24" /> 
  * There are more than 100 new Group Policy settings added for Internet Explorer 8 
  * DEP is turned on by default for Internet Explorer 8. DEP helps to [improve security for ActiveX controls](http://arstechnica.com/news.ars/post/20080511-ie8-to-boost-activex-security-on-vista.html) 
  * You can enforce the [SmartScreen Filter](http://blogs.msdn.com/ie/archive/2008/07/02/ie8-security-part-iii-smartscreen-filter.aspx) to block access to malicious sites and downloads. Great for those laptop users accessing the Internet outside of your network 
  * [Loosely-Coupled IE](http://blogs.msdn.com/ie/archive/2008/03/11/ie8-and-loosely-coupled-ie-lcie.aspx) and [Automatic Crash Recovery](http://blogs.msdn.com/ie/archive/2008/07/28/ie8-and-reliability.aspx) will help make happy users 
  * Developer tools are included to help your devs [work with their web sites](http://www.microsoft.com/windows/internet-explorer/beta/readiness/developers.aspx) 
  * Internet Explorer 8 can be slipstreamed into your Windows XP/2003 or Windows Vista/2008 images for faster deployment 

For complete information on IE 8 for the enterprise check out this document: [Windows Internet Explorer 8 Beta 2: Technology Overview for Enterprise and IT Pros](http://www.microsoft.com/downloads/details.aspx?FamilyID=bc9c6664-8782-4851-a932-359ce8b5bdb5&DisplayLang=en). You might also be interested in the [Windows Internet Explorer 8 Beta 2 Release Notes](http://support.microsoft.com/kb/949787) as well as the [Internet Explorer Administration Kit 8 Beta](http://www.microsoft.com/downloads/details.aspx?FamilyID=65033653-2721-4232-84e1-bf863631ba47&DisplayLang=en) (direct link to the [Internet Explorer Administration Kit 8](http://download.microsoft.com/download/8/1/d/81dac007-f643-4526-94eb-b078bc1d6ce5/WIN32_XP\ENU\ieak.msi) installer).

**Update**: Mary-Jo Foley [has more details on IE 8 features for the Enterprise](http://blogs.zdnet.com/microsoft/?p=1558).