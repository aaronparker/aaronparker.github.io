---
id: 5960
title: Automatic Download and Import of Updates into MDT
date: 2018-02-12T11:42:26+10:00
author: Aaron Parker
layout: revision
guid: https://stealthpuppy.com/5466-revision-v1/
permalink: /5466-revision-v1/
---
A couple of months back, I sent an email to the [Microsoft MVP](https://mvp.microsoft.com/) mailing list to see if anyone knew of a JSON feed of Windows 10 updates from Microsoft. I'd found a way to [grab the latest Firefox version via PowerShell](https://gist.github.com/aaronparker/ea999b2955b525b1b68cbe0b0de16e21) and was hoping to do something similar for Windows 10. [Keith Garner](https://twitter.com/keithga1) responded with something even better - [a working script](https://gist.github.com/keithga/1ad0abd1f7ba6e2f8aff63d94ab03048) that pulls from a JSON resource on the [Windows 10 and Windows Server 2016 Update History](https://support.microsoft.com/en-ph/help/4000825/windows-10-windows-server-2016-update-history) page, to [return the most recent cumulative update](https://keithga.wordpress.com/2017/05/21/new-tool-get-the-latest-windows-10-cumulative-updates/).

So this gave me what I needed - a way to pull the latest update which I could then import into an MDT share, ensuring that a machine is deployed with the latest cumulative update at deployment time or ideal for creating reference images.

I've taken Keith's original version of the script [Get-LatestUpdate.ps1](https://github.com/aaronparker/MDT/blob/master/Updates/Get-LatestUpdate.ps1 "Get-LatestUpdate.ps1"){#cfe8ac6df2c7774dee726abfd6758ac8-66d7f50edbf81041496084b6f6738e1daab19bc9.js-navigation-open} and modified it for my own requirements and created an import script - [Import-Update.ps1](https://github.com/aaronparker/MDT/blob/master/Updates/Import-Update.ps1 "Import-Update.ps1"){#4ea5f920b708804f5442b858a773f23d-4380ad788e510dc8bd2849e68d20de9d6f9b9b6b.js-navigation-open}. This enables you to automate downloading the latest cumulative updates and import them into a target MDT deployment share. This could be run as a scheduled task to keep your deployment shares always to date.

The scripts can be downloaded from GitHub in my MDT repository: [https://github.com/aaronparker/MDT](https://github.com/aaronparker/MDT/)

<figure id="attachment_5468" aria-describedby="caption-attachment-5468" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5468" src="http://stealthpuppy.com/wp-content/uploads/2017/06/Import-1024x638.png" alt="Downloading and importing updates into MDT via PowerShell" width="1024" height="638" srcset="https://stealthpuppy.com/wp-content/uploads/2017/06/Import-1024x638.png 1024w, https://stealthpuppy.com/wp-content/uploads/2017/06/Import-150x93.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/06/Import-300x187.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/06/Import-768x479.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/06/Import.png)<figcaption id="caption-attachment-5468" class="wp-caption-text">Downloading and importing updates into MDT via PowerShell</figcaption>

# Get-LatestUpdate

Much like [Keith's original](https://keithga.wordpress.com/2017/05/21/new-tool-get-the-latest-windows-10-cumulative-updates/), this version of the script will pull the latest update from the JSON feed, query and parse the Microsoft Update Catalog and return the latest cumulative update. With this, you can optionally download the update to the current folder or one specified with the Path parameter.

<figure id="attachment_5470" aria-describedby="caption-attachment-5470" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5470" src="http://stealthpuppy.com/wp-content/uploads/2017/06/Get-LatestUpdates-Downloading-1024x458.png" alt="Get-LatestUpdates.ps1 - downloading updates" width="1024" height="458" srcset="https://stealthpuppy.com/wp-content/uploads/2017/06/Get-LatestUpdates-Downloading-1024x458.png 1024w, https://stealthpuppy.com/wp-content/uploads/2017/06/Get-LatestUpdates-Downloading-150x67.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/06/Get-LatestUpdates-Downloading-300x134.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/06/Get-LatestUpdates-Downloading-768x343.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/06/Get-LatestUpdates-Downloading.png 1264w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/06/Get-LatestUpdates-Downloading.png)<figcaption id="caption-attachment-5470" class="wp-caption-text">Get-LatestUpdates.ps1 - downloading updates</figcaption>

The script outputs an object that lists details about the update that you could use for various purposes. Adding the Download parameter will download the update and the output will include the file name and the download location.

<figure id="attachment_5471" aria-describedby="caption-attachment-5471" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5471" src="http://stealthpuppy.com/wp-content/uploads/2017/06/Get-LatestUpdates-Downloaded-1024x458.png" alt="Get-LatestUpdates.ps1 - latest update downloaded" width="1024" height="458" srcset="https://stealthpuppy.com/wp-content/uploads/2017/06/Get-LatestUpdates-Downloaded-1024x458.png 1024w, https://stealthpuppy.com/wp-content/uploads/2017/06/Get-LatestUpdates-Downloaded-150x67.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/06/Get-LatestUpdates-Downloaded-300x134.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/06/Get-LatestUpdates-Downloaded-768x343.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/06/Get-LatestUpdates-Downloaded.png 1264w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/06/Get-LatestUpdates-Downloaded.png)<figcaption id="caption-attachment-5471" class="wp-caption-text">Get-LatestUpdate.ps1 - latest update downloaded</figcaption>

Get-LatestUpdate.ps1 supports a number of parameters, all of which are optional:

  * Build - the Current Branch build (15063) will always be the default. Other build numbers (e.g. 14393) can be specified
  * SearchString - the default cumulative updates returned will be the cumulative update for Windows 10 x64. The search string can be modified to
  * Download - add this switch parameter to download the update returned. If the update already exists in the folder specified by Path, it won't be downloaded again
  * Path - specify a path to download the update to. If not used, the update will be downloaded to the current directory

## Output

Get-LatestUpdate.ps1 will output an object that includes details about the update that has been gathered, including the KB article, the description of the update, the URL to the download. If the Download parameter is used this will also return the update file name and the path where the update has been saved. This object can then be passed to Import-Update.ps1 that will use the UpdatePath property to import updates stored in that folder (note that it will import all updates from that folder).

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">KB         : KB4022716
Note       : 2017-06 Cumulative Update for Windows 10 Version 1703 for x64-based Systems (KB4022716)
URL        : http://download.windowsupdate.com/d/msdownload/update/software/updt/2017/06/windows10.0-kb4022716-x64_72cab17aeb72f4e36df375505ba7325c90044119.msu
File       : windows10.0-kb4022716-x64_72cab17aeb72f4e36df375505ba7325c90044119.msu
UpdatePath : C:\Updates</pre>

# Import-Update

Import-Update.ps1 is used to import update packages from a target folder into the Packages node in an MDT deployment share. This will accept the output from Get-LatestUpdate.ps1 or can be used to import updates that already exist in a target folder, specified by the UpdatePath parameter.

<figure id="attachment_5472" aria-describedby="caption-attachment-5472" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5472" src="http://stealthpuppy.com/wp-content/uploads/2017/06/Import-Updates-1024x423.png" alt="Import-Updates.ps1 - importing an update into MDT" width="1024" height="423" srcset="https://stealthpuppy.com/wp-content/uploads/2017/06/Import-Updates-1024x423.png 1024w, https://stealthpuppy.com/wp-content/uploads/2017/06/Import-Updates-150x62.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/06/Import-Updates-300x124.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/06/Import-Updates-768x317.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/06/Import-Updates.png 1127w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/06/Import-Updates.png)<figcaption id="caption-attachment-5472" class="wp-caption-text">Import-Updates.ps1 - importing an update into MDT</figcaption>

Import-Update.ps1 supports a number of parameters:

  * UpdatePath - a folder that contains the target update or updates to import into the deployment share. This path can be piped to this script. This parameter is mandatory
  * SharePath - the path to the top-level folder for the MDT deployment share. This parameter is mandatory
  * PackagePath - you can optionally specify a path under the Packages node in the deployment share to import the update packages into
  * Clean - this is a switch parameter that will tell the script to remove any existing update packages in the path specified by PackagePath before importing the new updates.

# Using Both Scripts to Download and Import Updates into MDT

Get-LatestUpdates.ps1 outputs an object that can be passed to Import-Update.ps1 on the pipeline, so a single command line can be used to get the latest update for a specific operating system, download the update locally and import it into an MDT deployment share. For example, I can use the following command line to download the Windows 10 x64 Current Branch (build 15063) and import it into my deployment share used to build Reference images:

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">.\Get-LatestUpdate.ps1 -Download -Path C:\Updates | .\Import-Update.ps1 -SharePath "\\mcfly\Deployment\Reference" -PackagePath "Windows 10\x64" -Clean</pre>

Which looks like this:

<figure id="attachment_5475" aria-describedby="caption-attachment-5475" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5475" src="http://stealthpuppy.com/wp-content/uploads/2017/06/GetAndImport-Updates-1024x320.png" alt="Using Get-LatestUpdates.ps1 and the pipeline to pass updates to Import-Update.ps1" width="1024" height="320" srcset="https://stealthpuppy.com/wp-content/uploads/2017/06/GetAndImport-Updates-1024x320.png 1024w, https://stealthpuppy.com/wp-content/uploads/2017/06/GetAndImport-Updates-150x47.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/06/GetAndImport-Updates-300x94.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/06/GetAndImport-Updates-768x240.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/06/GetAndImport-Updates.png 1398w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/06/GetAndImport-Updates.png)<figcaption id="caption-attachment-5475" class="wp-caption-text">Using Get-LatestUpdates.ps1 and the pipeline to pass updates to Import-Update.ps1</figcaption>

In the MDT Workbench, we have the latest Windows 10 Cumulative update in the Packages node which will be applied offline during the operating system deployment:

<figure id="attachment_5483" aria-describedby="caption-attachment-5483" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5483" src="http://stealthpuppy.com/wp-content/uploads/2017/06/MDTWorkbench-Packages-1024x456.png" alt="Latest Windows 10 Cumulative update in the Packages node" width="1024" height="456" srcset="https://stealthpuppy.com/wp-content/uploads/2017/06/MDTWorkbench-Packages-1024x456.png 1024w, https://stealthpuppy.com/wp-content/uploads/2017/06/MDTWorkbench-Packages-150x67.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/06/MDTWorkbench-Packages-300x134.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/06/MDTWorkbench-Packages-768x342.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/06/MDTWorkbench-Packages.png 1368w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/06/MDTWorkbench-Packages.png)<figcaption id="caption-attachment-5483" class="wp-caption-text">Latest Windows 10 Cumulative update in the Packages node</figcaption>

Now I have something that I could run as a scheduled task to keep my deployment share always up to date without interaction. Note that both script support verbose output so that you can track what's going on in detail while the script is running.

# Future

There are likely some changes and additions I could make to this script, so feedback is welcome. Future changes might include:

  * Add support for Windows 7, Windows Server 2012 R2 etc. into Get-LatestUpdate.ps1. The way that Keith has written the script lends itself to support other Windows versions
  * Compare the existing update in MDT before importing an update - if the existing update matches the latest update, there's no need to re-import the update

 