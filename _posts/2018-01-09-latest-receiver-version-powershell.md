---
id: 5918
title: Get latest Citrix Receiver version with PowerShell
date: 2018-01-09T12:57:10+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=5918
permalink: /latest-receiver-version-powershell/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "6401018873"
image: /media/2018/01/marc-liu-255460.jpg
categories:
  - Citrix
tags:
  - PowerShell
  - Receiver
---

I've previously written about [deploying Citrix Receiver to Windows 10 via Intune with PowerShell]({{site.baseurl}}/deploy-citrix-receiver-intune/). In that article, I included a script that will detect an installed version of Receiver and update to the latest version if it is out of date. To start with, I've hard-coded the current Receiver for Windows version into the script; however, that's not necessarily the best approach, because it will require updating whenever a new version is released.

The [public download page](https://www.citrix.com/downloads/citrix-receiver/) provides a source for querying Receiver versions for all platforms, so if we parse that page, we have a source for the latest versions for all platforms.

I've written a script that will parse the downloads page and return the current Receiver version for each platform unless a login for that platform is required. If you're looking to find the latest version for Windows, Windows LTSR, Linux, Mac etc., the script can be used to return the version number for the desired platform.

Here's the script:

<script src="https://gist.github.com/aaronparker/8204e49405a78245301dae1ebaf1df71.js"></script>

To use the script, save as Get-CitrixReceiverVersions.ps1 and run from the command line. With no parameters, it will return the releases and version numbers for all available platforms with the `Get-CitrixReceiverVersions` function.

```powershell
. .\Get-CitrixReceiverVersions.ps1
Get-CitrixReceiverVersions
```

The script returns specific platforms with the -Platform parameter. This only accepts valid values, such as 'Windows', 'Mac' and 'Linux' and the script will validate those values and supports tab completion.

```powershell
Get-CitrixReceiverVersions -Platform Mac, Linux
```

If you want to return the latest version for a specific platform, e.g. Windows, then we can pipe the output to Select-Object:

```powershell
Get-CitrixReceiverVersions -Platform Windows | Select-Object -First 1
```

Here's the script in action:

![Get-CitrixReceiverVersions in action]({{site.baseurl}}/media/2018/01/Get-CitrixReceiverVersions.gif)*Get-CitrixReceiverVersions in action on Windows*

An added bonus, the script also works on PowerShell Core:

![Get-CitrixReceiverVersions in action on macOS]({{site.baseurl}}/media/2018/01/Get-CitrixReceiverVersions-Pwsh.gif)*Get-CitrixReceiverVersions in action on macOS*

I've written this primarily for my purposes, but perhaps there are other purposes that I've not yet considered. Feedback, issues and improvements to the script are welcome.
