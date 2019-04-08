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
image: /wp-content/uploads/2018/01/marc-liu-255460.jpg
categories:
  - Citrix
tags:
  - PowerShell
  - Receiver
---
I&#8217;ve previously written about [deploying Citrix Receiver to Windows 10 via Intune with PowerShell](https://stealthpuppy.com/deploy-citrix-receiver-intune/). In that article, I included a script that will detect an installed version of Receiver and update to the latest version if it is out of date. To start with, I&#8217;ve hard-coded the current Receiver for Windows version into the script; however, that&#8217;s not necessarily the best approach, because it will require updating whenever a new version is released.

The [public download page](https://www.citrix.com/downloads/citrix-receiver/) provides a source for querying Receiver versions for all platforms, so if we parse that page, we have a source for the latest versions for all platforms.

I&#8217;ve written a script that will parse the downloads page and return the current Receiver version for each platform unless a login for that platform is required. If you&#8217;re looking to find the latest version for Windows, Windows LTSR, Linux, Mac etc., the script can be used to return the version number for the desired platform.

Here&#8217;s the script:



To use the script, save as Get-CitrixReceiverVersions.ps1 and run from the command line. With no parameters, it will return the releases and version numbers for all available platforms with the <code class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">Get-CitrixReceiverVersions</code> function.

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">. .\Get-CitrixReceiverVersions.ps1
Get-CitrixReceiverVersions</pre>

The script returns specific platforms with the -Platform parameter. This only accepts valid values, such as &#8216;Windows&#8217;, &#8216;Mac&#8217; and &#8216;Linux&#8217; and the script will validate those values and supports tab completion.

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">Get-CitrixReceiverVersions -Platform Mac, Linux</pre>

If you want to return the latest version for a specific platform, e.g. Windows, then we can pipe the output to Select-Object:

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">Get-CitrixReceiverVersions -Platform Windows | Select-Object -First 1</pre>

Here&#8217;s the script in action:

<figure id="attachment_5972" aria-describedby="caption-attachment-5972" style="width: 1296px" class="wp-caption aligncenter">[<img class="size-full wp-image-5972" src="https://stealthpuppy.com/wp-content/uploads/2018/01/Get-CitrixReceiverVersions.gif" alt="Get-CitrixReceiverVersions in action" width="1296" height="810" />](https://stealthpuppy.com/wp-content/uploads/2018/01/Get-CitrixReceiverVersions.gif)<figcaption id="caption-attachment-5972" class="wp-caption-text">Get-CitrixReceiverVersions in action on Windows</figcaption>

An added bonus, the script also works on PowerShell Core:

<figure id="attachment_5980" aria-describedby="caption-attachment-5980" style="width: 960px" class="wp-caption aligncenter">[<img class="size-full wp-image-5980" src="https://stealthpuppy.com/wp-content/uploads/2018/01/Get-CitrixReceiverVersions-Pwsh.gif" alt="Get-CitrixReceiverVersions in action on macOS" width="960" height="533" />](https://stealthpuppy.com/wp-content/uploads/2018/01/Get-CitrixReceiverVersions-Pwsh.gif)<figcaption id="caption-attachment-5980" class="wp-caption-text">Get-CitrixReceiverVersions in action on macOS</figcaption>

I&#8217;ve written this primarily for my purposes, but perhaps there are other purposes that I&#8217;ve not yet considered. Feedback, issues and improvements to the script are welcome.