---
id: 2917
title: App-V 5 PowerShell One Liners – Adding and Publishing A Folder of App-V Client Packages
date: 2012-11-13T22:34:28+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2917
permalink: /app-v-5-powershell-one-liners-adding-and-publishing-a-folder-of-app-v-client-packages/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "926780890"
categories:
  - Automation
tags:
  - App-V
  - PowerShell
---
<img class="alignright size-full wp-image-2873" style="margin-left: 5px; margin-right: 5px;" title="AppV-PowerShell-Logo" src="http://stealthpuppy.com/wp-content/uploads/2012/10/AppV-PowerShell-Logo.png" alt="" width="128" height="128" />App-V 5.0 is PowerShell driven, which means opportunity for automating and scripting tasks that might have to be completed manually or might have been a challenge to script previously.

Using PowerShell to drive the App-V Client opens up plenty of great scenarios. I&#8217;ve previously posted on how to [add, publish and stream a single package with a one line of PowerShell](http://stealthpuppy.com/virtualisation/app-v-5-powershell-one-liners-adding-and-publishing-app-v-client-packages/), but it might also be useful to import a number of packages the same way.

This is simple with a slight modification of the original command line with the use of _Get-ChildItem_ to return a list of .appv files from a folder. Adding the -recurse switch walk through a complete folder structure and return .appv files from sub-folders.

Here&#8217;s how to use PowerShell to import packages stored in their own folder (i.e. sub-folders) in a UNC, publish them globally and stream each package into the local cache.

[code language=&#8221;ps&#8221;]Get-ChildItem "\\Server\Share\Packages" -recurse -force -include *.appv | Add-AppvClientPackage | Publish-AppvClientPackage -global | Mount-AppvClientPackage[/code]

Teamed with NTFS permissions on each package folder, this command is a (very) simple, roll your own publishing tool for App-V 5.