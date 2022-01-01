---

title: App-V 5 PowerShell One Liners – Adding and Publishing App-V Client Packages
date: 2012-10-29T13:04:55+10:00
author: Aaron Parker
layout: post

permalink: /app-v-5-powershell-one-liners-adding-and-publishing-app-v-client-packages/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "905598648"
categories:
  - Automation
tags:
  - App-V
  - PowerShell
---
App-V 5.0 is PowerShell driven, which means opportunity for automating and scripting tasks that might have to be completed manually or might have been a challenge to script previously.

Using PowerShell to drive the App-V Client opens up plenty of great scenarios. Here's how to use PowerShell to import a package (from a UNC path), publish it globally so that it's available for all users logging onto the local machine and stream the package into the cache.

```powershell
Add-AppvClientPackage -Path "\\Server\Packages\MozillaFirefox16_pkg\MozillaFirefox16.appv" | Publish-AppvClientPackage -Global | Mount-AppvClientPackage -Verbose
```

The Path property on the Add-AppvClientPackage command should take any local, UNC or HTTP path. This is a quick and dirty method of importing and testing App-V 5 packages into a machine for testing.

This example command should be easy enough to extend to import and publish a number of packages stored in target folder.