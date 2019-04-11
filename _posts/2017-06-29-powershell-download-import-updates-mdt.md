---
id: 5466
title: Automatic Download and Import of Updates into MDT
date: 2017-06-29T19:03:33+10:00
author: Aaron Parker
layout: post
guid: {{site.baseurl}}.com/?p=5466
permalink: /powershell-download-import-updates-mdt/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "5950597830"
image: /media/2017/06/MDT-Deployment.png
categories:
  - Microsoft
tags:
  - Microsoft Deployment Toolkit
  - PowerShell
---
A couple of months back, I sent an email to the [Microsoft MVP](https://mvp.microsoft.com/) mailing list to see if anyone knew of a JSON feed of Windows 10 updates from Microsoft. I'd found a way to [grab the latest Firefox version via PowerShell](https://gist.github.com/aaronparker/ea999b2955b525b1b68cbe0b0de16e21) and was hoping to do something similar for Windows 10. [Keith Garner](https://twitter.com/keithga1) responded with something even better - [a working script](https://gist.github.com/keithga/1ad0abd1f7ba6e2f8aff63d94ab03048) that pulls from a JSON resource on the [Windows 10 and Windows Server 2016 Update History](https://support.microsoft.com/en-ph/help/4000825/windows-10-windows-server-2016-update-history) page, to [return the most recent cumulative update](https://keithga.wordpress.com/2017/05/21/new-tool-get-the-latest-windows-10-cumulative-updates/).

So this gave me what I needed - a way to pull the latest update which I could then import into an MDT share, ensuring that a machine is deployed with the latest cumulative update at deployment time or ideal for creating reference images.

I've taken Keith's original version of the script [Get-LatestUpdate.ps1](https://github.com/aaronparker/MDT/blob/master/Updates/Get-LatestUpdate.ps1 "Get-LatestUpdate.ps1"){#cfe8ac6df2c7774dee726abfd6758ac8-66d7f50edbf81041496084b6f6738e1daab19bc9.js-navigation-open} and modified it for my own requirements and created an import script - [Import-Update.ps1](https://github.com/aaronparker/MDT/blob/master/Updates/Import-Update.ps1 "Import-Update.ps1"){#4ea5f920b708804f5442b858a773f23d-4380ad788e510dc8bd2849e68d20de9d6f9b9b6b.js-navigation-open}. This enables you to automate downloading the latest cumulative updates and import them into a target MDT deployment share. This could be run as a scheduled task to keep your deployment shares always to date.

The scripts can be downloaded from GitHub in my MDT repository: [https://github.com/aaronparker/MDT](https://github.com/aaronparker/MDT/)

![Downloading and importing updates into MDT via PowerShell]({{site.baseurl}}/media/2017/06/Import.png)*Downloading and importing updates into MDT via PowerShell*

## Get-LatestUpdate

Much like [Keith's original](https://keithga.wordpress.com/2017/05/21/new-tool-get-the-latest-windows-10-cumulative-updates/), this version of the script will pull the latest update from the JSON feed, query and parse the Microsoft Update Catalog and return the latest cumulative update. With this, you can optionally download the update to the current folder or one specified with the Path parameter.

![Get-LatestUpdates.ps1 - downloading updates]({{site.baseurl}}/media/2017/06/Get-LatestUpdates-Downloading.png)*Get-LatestUpdates.ps1 - downloading updates*

The script outputs an object that lists details about the update that you could use for various purposes. Adding the Download parameter will download the update and the output will include the file name and the download location.

![Get-LatestUpdates.ps1 - latest update downloaded]({{site.baseurl}}/media/2017/06/Get-LatestUpdates-Downloaded.png)*Get-LatestUpdate.ps1 - latest update downloaded*

Get-LatestUpdate.ps1 supports a number of parameters, all of which are optional:

  * Build - the Current Branch build (15063) will always be the default. Other build numbers (e.g. 14393) can be specified
  * SearchString - the default cumulative updates returned will be the cumulative update for Windows 10 x64. The search string can be modified to
  * Download - add this switch parameter to download the update returned. If the update already exists in the folder specified by Path, it won't be downloaded again
  * Path - specify a path to download the update to. If not used, the update will be downloaded to the current directory

## Output

Get-LatestUpdate.ps1 will output an object that includes details about the update that has been gathered, including the KB article, the description of the update, the URL to the download. If the Download parameter is used this will also return the update file name and the path where the update has been saved. This object can then be passed to Import-Update.ps1 that will use the UpdatePath property to import updates stored in that folder (note that it will import all updates from that folder).

```cmd
KB         : KB4022716
Note       : 2017-06 Cumulative Update for Windows 10 Version 1703 for x64-based Systems (KB4022716)
URL        : http://download.windowsupdate.com/d/msdownload/update/software/updt/2017/06/windows10.0-kb4022716-x64_72cab17aeb72f4e36df375505ba7325c90044119.msu
File       : windows10.0-kb4022716-x64_72cab17aeb72f4e36df375505ba7325c90044119.msu
UpdatePath : C:\Updates
```

## Import-Update

Import-Update.ps1 is used to import update packages from a target folder into the Packages node in an MDT deployment share. This will accept the output from Get-LatestUpdate.ps1 or can be used to import updates that already exist in a target folder, specified by the UpdatePath parameter.

![Import-Updates.ps1 - importing an update into MDT]({{site.baseurl}}/media/2017/06/Import-Updates.png)*Import-Updates.ps1 - importing an update into MDT*

Import-Update.ps1 supports a number of parameters:

  * UpdatePath - a folder that contains the target update or updates to import into the deployment share. This path can be piped to this script. This parameter is mandatory
  * SharePath - the path to the top-level folder for the MDT deployment share. This parameter is mandatory
  * PackagePath - you can optionally specify a path under the Packages node in the deployment share to import the update packages into
  * Clean - this is a switch parameter that will tell the script to remove any existing update packages in the path specified by PackagePath before importing the new updates.

## Using Both Scripts to Download and Import Updates into MDT

Get-LatestUpdates.ps1 outputs an object that can be passed to Import-Update.ps1 on the pipeline, so a single command line can be used to get the latest update for a specific operating system, download the update locally and import it into an MDT deployment share. For example, I can use the following command line to download the Windows 10 x64 Current Branch (build 15063) and import it into my deployment share used to build Reference images:

```powershell
.\Get-LatestUpdate.ps1 -Download -Path C:\Updates | .\Import-Update.ps1 -SharePath "\\mcfly\Deployment\Reference" -PackagePath "Windows 10\x64" -Clean
````

Which looks like this:

![Using Get-LatestUpdates.ps1 and the pipeline to pass updates to Import-Update.ps1]({{site.baseurl}}/media/2017/06/GetAndImport-Updates.png)*Using Get-LatestUpdates.ps1 and the pipeline to pass updates to Import-Update.ps1*

In the MDT Workbench, we have the latest Windows 10 Cumulative update in the Packages node which will be applied offline during the operating system deployment:

![Latest Windows 10 Cumulative update in the Packages node]({{site.baseurl}}/media/2017/06/MDTWorkbench-Packages.png)*Latest Windows 10 Cumulative update in the Packages node*

Now I have something that I could run as a scheduled task to keep my deployment share always up to date without interaction. Note that both script support verbose output so that you can track what's going on in detail while the script is running.

## Future

There are likely some changes and additions I could make to this script, so feedback is welcome. Future changes might include:

  * Add support for Windows 7, Windows Server 2012 R2 etc. into Get-LatestUpdate.ps1. The way that Keith has written the script lends itself to support other Windows versions
  * Compare the existing update in MDT before importing an update - if the existing update matches the latest update, there's no need to re-import the update
