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
<a rel="attachment wp-att-1479" href="https://stealthpuppy.com/virtualisation/dynamic-suite-composition-and-short-names/attachment/appvlogo-png"><img class="alignleft size-full wp-image-1479" style="margin-right: 15px;" title="AppVLogo.png" src="https://stealthpuppy.com/media/2010/04/AppVLogo.png" alt="](http://www.microsoft.com/downloads/details.aspx?familyid=67CDF9D2-7E8E-4D76-A552-FD82DBBFF9BC&displaylang=en).

However, I generally recommend configuring as many settings as you can during install so that you don't have to rely on external tools (e.g. Group Policy) that may not apply in a timely manner.

I have had to set permissions during install to make changes to the default permission set. Those permissions aren't documented on TechNet, so I have listed them here. The following table lists the permissions that you can modify by passing parameters to Setup or via Windows Installer

[table id=18 /]

See the Property table inside SETUP.MSI for the complete list of additional client settings that you can pass to the installer.

I have included here a complete sample script that deploys the App-V client, by first installing the dependencies and setting permissions (and other options) during install, using the MSI:

<p class="download">
  [download id="35&#8243; format="1&#8243;]
</p>