---
id: 5961
title: 'Install-VisualCRedistributables.ps1 &#8211; A Visual C++ Redistributable Installer'
date: 2018-02-12T11:45:20+10:00
author: Aaron Parker
layout: revision
guid: https://stealthpuppy.com/5434-revision-v1/
permalink: /5434-revision-v1/
---
In updating my [MDT](http://stealthpuppy.com/tag/mdt/) deployment shares recently, I got tired of having to do something about the Visual C++&nbsp;Redistributable installers and finally decided to do something about it, so I&#8217;ve written a script that will download the installers and optionally install them &#8211;&nbsp;[Install-VisualCRedistributables.ps1](https://github.com/aaronparker/Install-VisualCRedistributables).

This script reads [an external XML file](https://github.com/aaronparker/Install-VisualCRedistributables/blob/master/bin/VisualCRedistributablesSupported.xml) that contains the installer information for each of the&nbsp;Visual C++&nbsp;Redistributables so that changes to URLs, install options and new redistributables can be made without making changes to the script. The XML file lists the download URL and install instructions for each installer and looks like this:

<pre class="prettyprint lang-xml" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;Redistributables&gt;
    &lt;Platform Architecture="x64" Release="2005" Install="/Q"&gt;
        &lt;Redistributable&gt;
            &lt;Name&gt;Microsoft Visual C++ 2005 Service Pack 1 Redistributable Package MFC Security Update&lt;/Name&gt;
            &lt;URL&gt;https://www.microsoft.com/en-us/download/details.aspx?id=26347&lt;/URL&gt;
            &lt;Download&gt;https://download.microsoft.com/download/8/B/4/8B42259F-5D70-43F4-AC2E-4B208FD8D66A/vcredist_x64.EXE&lt;/Download&gt;
        &lt;/Redistributable&gt;
        &lt;Redistributable&gt;
    &lt;/Platform&gt;
    &lt;Platform Architecture="x86" Release="2005" Install="/Q"&gt;
        &lt;Redistributable&gt;
            &lt;Name&gt;Microsoft Visual C++ 2005 Service Pack 1 Redistributable Package MFC Security Update&lt;/Name&gt;
            &lt;URL&gt;https://www.microsoft.com/en-us/download/details.aspx?id=26347&lt;/URL&gt;
            &lt;Download&gt;https://download.microsoft.com/download/8/B/4/8B42259F-5D70-43F4-AC2E-4B208FD8D66A/vcredist_x86.EXE&lt;/Download&gt;
        &lt;/Redistributable&gt;
    &lt;/Platform&gt;
    &lt;Platform Architecture="x64" Release="2017" Install="/install /passive /norestart"&gt;
        &lt;Redistributable&gt;
            &lt;Name&gt;Microsoft Visual C++ Redistributable for Visual Studio 2017&lt;/Name&gt;
            &lt;URL&gt;https://www.visualstudio.com/downloads/&lt;/URL&gt;
            &lt;Download&gt;https://download.microsoft.com/download/3/b/f/3bf6e759-c555-4595-8973-86b7b4312927/vc_redist.x64.exe&lt;/Download&gt;
        &lt;/Redistributable&gt;
    &lt;/Platform&gt;
    &lt;Platform Architecture="x86" Release="2017" Install="/install /passive /norestart"&gt;
        &lt;Redistributable&gt;
            &lt;Name&gt;Microsoft Visual C++ Redistributable for Visual Studio 2017&lt;/Name&gt;
            &lt;URL&gt;https://www.visualstudio.com/downloads/&lt;/URL&gt;
            &lt;Download&gt;https://download.microsoft.com/download/1/f/e/1febbdb2-aded-4e14-9063-39fb17e88444/vc_redist.x86.exe&lt;/Download&gt;
        &lt;/Redistributable&gt;
    &lt;/Platform&gt;
&lt;/Redistributables&gt;</pre>

The script will install the redistributables in the order listed in the XML file thus ensuring they are installed in the correct order.

# Using Install-VisualCRedistributables.ps1

Download&nbsp;[Install-VisualCRedistributables.ps1](https://github.com/aaronparker/Install-VisualCRedistributables/blob/master/bin/Install-VisualCRedistributables.ps1 "Install-VisualCRedistributables.ps1"){#6688ca8243a1ff4cb920b2f5b0eb5d4f-fc78b16fb52218a5ca1961809bece9155c302c06.js-navigation-open}&nbsp;and&nbsp;[VisualCRedistributablesSupported.xml](https://github.com/aaronparker/Install-VisualCRedistributables/blob/master/bin/VisualCRedistributablesSupported.xml "VisualCRedistributables.xml"){#ae2b8c9175203ac3b93b3a45bf39ac3f-2392f8cdffa2c6a99fa7b73e04bccc284321c434.js-navigation-open}&nbsp;from the repository and edit the XML as required. As this includes all supported redistributables from 2008 to 2017, all will be downloaded and installed by default. If you don&#8217;t need all of them in your environment, remove those that aren&#8217;t required.

The script can be run in two phases &#8211; one to download the installers and again to install the redistributables &#8211; this is useful for downloading the installers to add to your reference image via MDT, for example. The script can also be used to download and install in one action.

## Parameters

The parameters for the script are:

### Xml

This points to the XML file that contains the details about the Visual C++ Redistributables. This must be in the expected format, otherwise, the script will fail.

Example &#8211; Downloads the Visual C++ Redistributables listed in VisualCRedistributables.xml.

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">.\Install-VisualCRedistributables.ps1 -Xml ".\VisualCRedistributablesSupported.xml"</pre>

### Path

Specify a target folder to download the Redistributables to, otherwise, use the current folder.

Example &#8211; Downloads the Visual C++ Redistributables listed in VisualCRedistributables.xml to C:\Redist.

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">.\Install-VisualCRedistributables.ps1 -Xml ".\VisualCRedistributablesSupported.xml" -Path C:\Redist</pre>

### Install

By default, the script will only download the Redistributables. This allows you to download the Redistributables for separate deployment (e.g. in a reference image). Add -Install to install each of the Redistributables as well.

Example &#8211; Downloads and installs the Visual C++ Redistributables listed in VisualCRedistributables.xml.

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">.\Install-VisualCRedistributables.ps1 -Xml ".\VisualCRedistributablesSupported.xml" -Install:$True</pre>

# Results

Here is an example of the end result with the Redistributables installed. Note that 2015 and 2017 are the same major version (14.x), so once 2017 is installed, 2015 will not be displayed in the programs list. 2005 are not installed by default, as these are no longer supported.

<figure id="attachment_5436" aria-describedby="caption-attachment-5436" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5436" src="http://stealthpuppy.com/wp-content/uploads/2017/05/2005-2017-1024x639.png" alt="Microsoft Visual C++ Redistributable 2005-2015 installed" width="1024" height="639" srcset="http://192.168.0.89/wp-content/uploads/2017/05/2005-2017-1024x639.png 1024w, http://192.168.0.89/wp-content/uploads/2017/05/2005-2017-150x94.png 150w, http://192.168.0.89/wp-content/uploads/2017/05/2005-2017-300x187.png 300w, http://192.168.0.89/wp-content/uploads/2017/05/2005-2017-768x479.png 768w, http://192.168.0.89/wp-content/uploads/2017/05/2005-2017.png 1442w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/05/2005-2017.png)<figcaption id="caption-attachment-5436" class="wp-caption-text">Microsoft Visual C++ Redistributables</figcaption></figure>

# Finally

This is the first version of the script and to the best of my knowledge, the XML file is correct. Feedback and corrections are welcome and I have some plans to update the script with some additional error checking.