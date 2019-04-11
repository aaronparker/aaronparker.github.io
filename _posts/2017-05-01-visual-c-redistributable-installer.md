---
id: 5434
title: 'Install-VisualCRedistributables.ps1 - A Visual C++ Redistributable Installer'
date: 2017-05-01T19:26:58+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=5434
permalink: /visual-c-redistributable-installer/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "5775624876"
image: /media/2017/05/2005-2017.png
categories:
  - Automation
tags:
  - PowerShell
  - Visual C++ Redistributable
---
In updating my [MDT]({{site.baseurl}}/tag/mdt/) deployment shares recently, I got tired of having to do something about the Visual C++ Redistributable installers and finally decided to do something about it, so I've written a script that will download the installers and optionally install them - [Install-VisualCRedistributables.ps1](https://github.com/aaronparker/Install-VisualCRedistributables).

This script reads [an external XML file](https://github.com/aaronparker/Install-VisualCRedistributables/blob/master/bin/VisualCRedistributablesSupported.xml) that contains the installer information for each of the Visual C++ Redistributables so that changes to URLs, install options and new redistributables can be made without making changes to the script. The XML file lists the download URL and install instructions for each installer and looks like this:

```xml
<xml version="1.0" encoding="UTF-8"?>
<Redistributables>
    <Platform Architecture="x64" Release="2005" Install="/Q">
        <Redistributable>
            <Name>Microsoft Visual C++ 2005 Service Pack 1 Redistributable Package MFC Security Update</Name>
            <URL>https://www.microsoft.com/en-us/download/details.aspx?id=26347</URL>
            <Download>https://download.microsoft.com/download/8/B/4/8B42259F-5D70-43F4-AC2E-4B208FD8D66A/vcredist_x64.EXE</Download>
        </Redistributable>
        <Redistributable>
    </Platform>
    <Platform Architecture="x86" Release="2005" Install="/Q">
        <Redistributable>
            <Name>Microsoft Visual C++ 2005 Service Pack 1 Redistributable Package MFC Security Update</Name>
            <URL>https://www.microsoft.com/en-us/download/details.aspx?id=26347</URL>
            <Download>https://download.microsoft.com/download/8/B/4/8B42259F-5D70-43F4-AC2E-4B208FD8D66A/vcredist_x86.EXE</Download>
        </Redistributable>
    </Platform>
    <Platform Architecture="x64" Release="2017" Install="/install /passive /norestart">
        <Redistributable>
            <Name>Microsoft Visual C++ Redistributable for Visual Studio 2017</Name>
            <URL>https://www.visualstudio.com/downloads/</URL>
            <Download>https://download.microsoft.com/download/3/b/f/3bf6e759-c555-4595-8973-86b7b4312927/vc_redist.x64.exe</Download>
        </Redistributable>
    </Platform>
    <Platform Architecture="x86" Release="2017" Install="/install /passive /norestart">
        <Redistributable>
            <Name>Microsoft Visual C++ Redistributable for Visual Studio 2017</Name>
            <URL>https://www.visualstudio.com/downloads/</URL>
            <Download>https://download.microsoft.com/download/1/f/e/1febbdb2-aded-4e14-9063-39fb17e88444/vc_redist.x86.exe</Download>
        </Redistributable>
    </Platform>
</Redistributables>
```

The script will install the redistributables in the order listed in the XML file thus ensuring they are installed in the correct order.

## Using Install-VisualCRedistributables.ps1

Download [Install-VisualCRedistributables.ps1](https://github.com/aaronparker/Install-VisualCRedistributables/blob/master/bin/Install-VisualCRedistributables.ps1) and [VisualCRedistributablesSupported.xml](https://github.com/aaronparker/Install-VisualCRedistributables/blob/master/bin/VisualCRedistributablesSupported.xml) from the repository and edit the XML as required. As this includes all supported redistributables from 2008 to 2017, all will be downloaded and installed by default. If you don't need all of them in your environment, remove those that aren't required.

The script can be run in two phases - one to download the installers and again to install the redistributables - this is useful for downloading the installers to add to your reference image via MDT, for example. The script can also be used to download and install in one action.

### Parameters

The parameters for the script are:

#### Xml

This points to the XML file that contains the details about the Visual C++ Redistributables. This must be in the expected format, otherwise, the script will fail.

Example - Downloads the Visual C++ Redistributables listed in VisualCRedistributables.xml.

```powershell
.\Install-VisualCRedistributables.ps1 -Xml ".\VisualCRedistributablesSupported.xml"
```

#### Path

Specify a target folder to download the Redistributables to, otherwise, use the current folder.

Example - Downloads the Visual C++ Redistributables listed in VisualCRedistributables.xml to C:\Redist.

```powershell.
\Install-VisualCRedistributables.ps1 -Xml ".\VisualCRedistributablesSupported.xml" -Path C:\Redist
```

#### Install

By default, the script will only download the Redistributables. This allows you to download the Redistributables for separate deployment (e.g. in a reference image). Add -Install to install each of the Redistributables as well.

Example - Downloads and installs the Visual C++ Redistributables listed in VisualCRedistributables.xml.

```powershell.
\Install-VisualCRedistributables.ps1 -Xml ".\VisualCRedistributablesSupported.xml" -Install:$True
```

## Results

Here is an example of the end result with the Redistributables installed. Note that 2015 and 2017 are the same major version (14.x), so once 2017 is installed, 2015 will not be displayed in the programs list. 2005 are not installed by default, as these are no longer supported.

![Microsoft Visual C++ Redistributable 2005-2015 installed]({{site.baseurl}}/media/2017/05/2005-2017.png)*Microsoft Visual C++ Redistributables*

## Finally

This is the first version of the script and to the best of my knowledge, the XML file is correct. Feedback and corrections are welcome and I have some plans to update the script with some additional error checking.
