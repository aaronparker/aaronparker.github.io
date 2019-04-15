---
id: 206
title: Slow Program Neighbourhood Agent?
date: 2006-08-25T05:57:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/slow-program-neighbourhood-agent
permalink: /slow-program-neighbourhood-agent/
categories:
  - Citrix
tags:
  - Presentation-Server
---
If the Citrix Program Neighbourhood Agent is slow to connect to the PNAgent web service and then takes time to display a list of applications, it's probably related to folder redirection of the Application Data folder. Program Neighbourhood Agent, by default, stores cache information in the following folder:

`%APPDATA%\Citrix\PNAgent\AppCache`

Redirecting Application Data to the network will then cause the PNAgent to store this cache folder on the network. Placing this back on the local disk will improve performance. The location of the AppCache folder is controlled with the following registry key:

`HKEY_CURRENT_USER\Software\Citrix\Program Neighborhood Agent\Application Cache`

Now if only the Citrix Program Neighbourhood and Program Neighborhood Agent would not store cache in the roaming profile by default...
