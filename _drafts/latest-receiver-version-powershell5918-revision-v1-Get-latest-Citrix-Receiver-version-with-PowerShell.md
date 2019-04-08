---
id: 5982
title: Get latest Citrix Receiver version with PowerShell
date: 2018-02-15T23:18:28+10:00
author: Aaron Parker
layout: revision
guid: https://stealthpuppy.com/5918-revision-v1/
permalink: /5918-revision-v1/
---
I've previously written about [deploying Citrix Receiver to Windows 10 via Intune with PowerShell](https://stealthpuppy.com/deploy-citrix-receiver-intune/). In that article, I included a script that will detect an installed version of Receiver and update to the latest version if it is out of date. To start with, I've hard-coded the current Receiver for Windows version into the script; however, that's not necessarily the best approach, because it will require updating whenever a new version is released.

The [public download page](https://www.citrix.com/downloads/citrix-receiver/) provides a source for querying Receiver versions for all platforms, so if we parse that page, we have a source for the latest versions for all platforms.

I've written a script that will parse the downloads page and return the current Receiver version for each platform unless a login for that platform is required. If you're looking to find the latest version for Windows, Windows LTSR, Linux, Mac etc., the script can be used to return the version number for the desired platform.

Here's the script:



To use the script, save as&nbsp;Get-CitrixReceiverVersions.ps1 and run from the command line. With no parameters, it will return the releases and version numbers for all available platforms with the&nbsp;<code class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">Get-CitrixReceiverVersions</code> function.

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">. .\Get-CitrixReceiverVersions.ps1
Get-CitrixReceiverVersions</pre>

The script returns specific platforms with the -Platform parameter. This only accepts valid values, such as &#8216;Windows', &#8216;Mac' and &#8216;Linux' and the script will validate those values and supports tab completion.

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">Get-CitrixReceiverVersions -Platform Mac, Linux</pre>

If you want to return the latest version for a specific platform, e.g. Windows, then we can pipe the output to Select-Object:

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">Get-CitrixReceiverVersions -Platform Windows | Select-Object -First 1</pre>

Here's the script in action:

<figure id="attachment_5972" aria-describedby="caption-attachment-5972" style="width: 1296px" class="wp-caption aligncenter">[<img class="size-full wp-image-5972" src="https://stealthpuppy.com/wp-content/uploads/2018/01/Get-CitrixReceiverVersions.gif" alt="Get-CitrixReceiverVersions in action" width="1296" height="810" />](https://stealthpuppy.com/wp-content/uploads/2018/01/Get-CitrixReceiverVersions.gif)<figcaption id="caption-attachment-5972" class="wp-caption-text">Get-CitrixReceiverVersions in action on Windows</figcaption></figure>

An added bonus, the script also works on PowerShell Core:

<figure id="attachment_5980" aria-describedby="caption-attachment-5980" style="width: 960px" class="wp-caption aligncenter">[<img class="size-full wp-image-5980" src="https://stealthpuppy.com/wp-content/uploads/2018/01/Get-CitrixReceiverVersions-Pwsh.gif" alt="Get-CitrixReceiverVersions in action on macOS" width="960" height="533" />](https://stealthpuppy.com/wp-content/uploads/2018/01/Get-CitrixReceiverVersions-Pwsh.gif)<figcaption id="caption-attachment-5980" class="wp-caption-text">Get-CitrixReceiverVersions in action on macOS</figcaption></figure>

I've written this primarily for my purposes, but perhaps there are other purposes that I've not yet considered. Feedback, issues and improvements to the script are welcome.