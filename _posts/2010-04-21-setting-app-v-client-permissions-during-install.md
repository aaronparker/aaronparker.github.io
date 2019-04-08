---
id: 1491
title: Setting App-V client permissions during install
date: 2010-04-21T22:03:43+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=1491
permalink: /setting-app-v-client-permissions-during-install/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195382327"
categories:
  - Automation
tags:
  - App-V
---
<a rel="attachment wp-att-1479" href="http://stealthpuppy.com/virtualisation/dynamic-suite-composition-and-short-names/attachment/appvlogo-png"><img class="alignleft size-full wp-image-1479" style="margin-right: 15px;" title="AppVLogo.png" src="http://stealthpuppy.com/wp-content/uploads/2010/04/AppVLogo.png" alt="" width="136" height="136" srcset="https://stealthpuppy.com/wp-content/uploads/2010/04/AppVLogo.png 136w, https://stealthpuppy.com/wp-content/uploads/2010/04/AppVLogo-50x50.png 50w" sizes="(max-width: 136px) 100vw, 136px" /></a>TechNet has all the information you should need for [automating the installation of the App-V client](http://technet.microsoft.com/en-us/library/ee956917.aspx), including using [SETUP.EXE](http://technet.microsoft.com/en-us/library/ee956911.aspx) or [Windows Installer](http://technet.microsoft.com/en-us/library/ee956914.aspx) (my preferred method). Most of the [client properties](http://technet.microsoft.com/en-us/library/cc843737.aspx) you&#8217;ll need during install are documented and others are available to set post-install via Group Policy using the [App-V ADM template](http://www.microsoft.com/downloads/details.aspx?familyid=67CDF9D2-7E8E-4D76-A552-FD82DBBFF9BC&displaylang=en).

However, I generally recommend configuring as many settings as you can during install so that you don&#8217;t have to rely on external tools (e.g. Group Policy) that may not apply in a timely manner.

I have had to set permissions during install to make changes to the default permission set. Those permissions aren&#8217;t documented on TechNet, so I have listed them here. The following table lists the permissions that you can modify by passing parameters to Setup or via Windows Installer

[table id=18 /]

See the Property table inside SETUP.MSI for the complete list of additional client settings that you can pass to the installer.

I have included here a complete sample script that deploys the App-V client, by first installing the dependencies and setting permissions (and other options) during install, using the MSI:

<p class="download">
  [download id=&#8221;35&#8243; format=&#8221;1&#8243;]
</p>