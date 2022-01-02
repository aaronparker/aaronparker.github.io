---

title: 'App-V 5 PowerShell One Liners - Adding and Publishing App-V Server Packages'
date: 2012-10-28T21:36:12+10:00
author: Aaron Parker
layout: post

permalink: /app-v-5-powershell-one-liners-adding-and-publishing-app-v-server-packages/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "904709600"
pd_rating:
  - 'a:8:{s:4:"type";s:1:"0";s:5:"votes";s:1:"1";s:6:"total1";s:1:"0";s:6:"total2";s:1:"0";s:6:"total3";s:1:"0";s:6:"total4";s:1:"0";s:6:"total5";s:1:"1";s:7:"average";s:6:"5.0000";}'
categories:
  - Automation
tags:
  - App-V
  - PowerShell
---
App-V 5.0 is PowerShell driven, which means opportunity for automating and scripting tasks that might have to be completed manually or might have been a challenge to script previously.

Using PowerShell to drive the App-V Management Server opens up plenty of great scenarios. Here's how to use PowerShell to import a package (from a UNC path), publish it and grant access to a domain group, all on one line.

```powershell
Import-AppvServerPackage -PackagePath "\\Server\Packages\MozillaFirefox16_pkg\MozillaFirefox16.appv" | Publish-AppvServerPackage -Verbose | Grant-AppvServerPackage -Groups "lab\Domain Users" -Verbose
```

The PackagePath property on the `Import-AppvServerPackage` command should take any UNC or HTTP path, just like the Management Server UI.

This example command should be easy enough to extend to import and publish a number of packages stored in target folder.