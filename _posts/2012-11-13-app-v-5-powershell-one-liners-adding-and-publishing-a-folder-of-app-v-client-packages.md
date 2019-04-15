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
App-V 5.0 is PowerShell driven, which means opportunity for automating and scripting tasks that might have to be completed manually or might have been a challenge to script previously.

Using PowerShell to drive the App-V Client opens up plenty of great scenarios. I've previously posted on how to [add, publish and stream a single package with a one line of PowerShell]({{site.baseurl}}/virtualisation/app-v-5-powershell-one-liners-adding-and-publishing-app-v-client-packages/), but it might also be useful to import a number of packages the same way.

This is simple with a slight modification of the original command line with the use of _Get-ChildItem_ to return a list of .appv files from a folder. Adding the -recurse switch walk through a complete folder structure and return .appv files from sub-folders.

Here's how to use PowerShell to import packages stored in their own folder (i.e. sub-folders) in a UNC, publish them globally and stream each package into the local cache.

```powershell
Get-ChildItem "\\Server\Share\Packages" -recurse -force -include *.appv | Add-AppvClientPackage | Publish-AppvClientPackage -global | Mount-AppvClientPackage
```

Teamed with NTFS permissions on each package folder, this command is a (very) simple, roll your own publishing tool for App-V 5.
