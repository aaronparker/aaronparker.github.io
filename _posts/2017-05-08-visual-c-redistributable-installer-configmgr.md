---
id: 5441
title: Install-VisualCRedistributables.ps1 – Now with ConfigMgr Support!
date: 2017-05-08T23:25:28+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=5441
permalink: /visual-c-redistributable-installer-configmgr/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "5797643210"
image: /media/2017/05/VCredist_ConfigMgr.png
categories:
  - Microsoft
tags:
  - ConfigMgr
  - PowerShell
  - Visual C++ Redistributable
---
I recently [posted an article]({{site.baseurl}}/visual-c-redistributable-installer/) on a script I've written for downloading and installing the Microsoft [Visual C++ Redistributables](https://github.com/aaronparker/Install-VisualCRedistributables). Thanks to [Cornelius Schuchardt](https://twitter.com/techdecline), the script now supports creating applications for each redistributable in Configuration Manager (ConfigMgr).

Install-VisualCRedistributables.ps1 has been updated to version 1.1, which you can [download from the releases page](https://github.com/aaronparker/Install-VisualCRedistributables/releases) and includes the following updates:

  * VisualCRedistributables.xml updated with MSI Product codes for the redistributables
  * Install-VisualCRedistributables.ps1 updated with ConfigMgr support - create applications for the redistributables in ConfigMgr
  * Updated with additional parameter validation, parameter sets, inline comments

# Overview

This script will download the Visual C++ Redistributables listed in an external XML file into a folder structure that represents major release, processor architecture and update release (e.g. SP1, MFC, ATL etc.). The script defines the available redistributables and can be updated with each release with no changes made to the script.

The basic structure of the XML file should be as follows (an XSD schema is included in the repository):

<pre class="prettyprint lang-xml" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">&lt;Redistributables&gt;
    &lt;Platform Architecture="x64" Release="" Install=""&gt;
        &lt;Redistributable&gt;
            &lt;Name&gt;&lt;/Name&gt;
            &lt;ShortName&gt;&lt;/ShortName&gt;
            &lt;URL&gt;&lt;/URL&gt;
            &lt;ProductCode&gt;&lt;/ProductCode&gt;
            &lt;Download&gt;&lt;/Download&gt;
        &lt;/Redistributable&gt;
    &lt;/Platform&gt;
    &lt;Platform Architecture="x86" Release="" Install=""&gt;
        &lt;Redistributable&gt;
            &lt;Name&gt;&lt;/Name&gt;
            &lt;ShortName&gt;&lt;/ShortName&gt;
            &lt;URL&gt;&lt;/URL&gt;
            &lt;ProductCode&gt;&lt;/ProductCode&gt;
            &lt;Download&gt;&lt;/Download&gt;
        &lt;/Redistributable&gt;
    &lt;/Platform&gt;
&lt;/Redistributables&gt;</pre>

Each major version of the redistributables is grouped by that defines the major release, processor architecture and install arguments passed to the installer.

The properties of each redistributable are defined in each node:

  * Name - the name of the redistributable as displayed on the download page. Not used in the script, but useful for reading the XML file.
  * ShortName - the redistributable will be downloaded to Release\Architecture\ShortName
  * URL - this is the URL to the page at microsoft.com/downloads. Not used in the script, but useful for referencing the download as needed
  * ProductCode - this is the MSI Product Code for the specified VC++ App that will be used to import the package into Configuration Manager
  * Download - this is the URL to the installer so that the script can download each redistributable

## Parameters

The script supports the -WhatIf and -Verbose parameters for testing and verbose output when using the parameter actions below.

There are 3 parameter sets that control the following actions:

  1. Download only
  2. Download and Install the redistributable to the current machine
  3. Download and create ConfigMgr applications for the redistributables

### Download

#### Xml

The XML file that contains the details about the Visual C++ Redistributables. This must be in the expected format. If the redistributable exists in the target location, it will be skipped and not re-downloaded.

Example: download the Visual C++ Redistributables listed in VisualCRedistributables.xml to the current folder.

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">.\Install-VisualCRedistributables.ps1 -Xml ".\VisualCRedistributables.xml" -Path .\</pre>

Specify a target folder to download the Redistributables to, otherwise use the current folder will be used.

Example: download the Visual C++ Redistributables listed in VisualCRedistributables.xml to C:\Redist.

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">.\Install-VisualCRedistributables.ps1 -Xml ".\VisualCRedistributables.xml" -Path C:\Redist -Install</pre>

To install the redistributables add the -Install parameter.

#### Install

By default, the script will only download the Redistributables. This allows you to download the Redistributables for separate deployment (e.g. in a reference image). Add -Install to install each of the Redistributables as well.

Example: download (to the current folder) and install the Visual C++ Redistributables listed in VisualCRedistributables.xml.

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">.\Install-VisualCRedistributables.ps1 -Xml ".\VisualCRedistributables.xml" -Install</pre>

The Redistributables will installed in the order specified in the XML file.

#### Results

Here is an example of the end result with the Redistributables installed. Note that 2015 and 2017 are the same major version (14.x), so once 2017 is installed, 2015 will not be displayed in the programs list.<figure> 

![Visual C++ Redistributables 2005-2015" width="1442" height="900" />*Visual C++ Redistributables 2005-2015*</figure>

Visual C++ Redistributables 2005 to 2017 (including 2015) installed:<figure> 

![Visual C++ Redistributables 2005-2017" width="1442" height="900" />*Visual C++ Redistributables 2005-2017*</figure>

### ConfigMgr

Support for downloading the Redistributables and creating applications in System Center Configuration Manager has recently been added.

#### CreateCMApp

If specified, enables automatic creation of Application Containers in Configuration Manager with a single Deployment Type containing the downloaded EXE file. The script must be run from a machine with the Configuration Manager console and the ConfigMgr PowerShell module installed.

#### SMSSiteCode

Specify SMS Site Code for the ConfigMgr app creation.

Example: Download Visual C++ Redistributables listed in VisualCRedistributables.xml and create ConfigMgr Applications for the selected Site.

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">.\Install-VisualCRedistributables.ps1 -Xml ".\VisualCRedistributables.xml" -Path \\server1.contoso.com\Sources\Apps\VSRedist -CreateCMApp -SMSSiteCode S01</pre>

This will look similar to the following in the Configuration Manager console:<figure> 

![Visual C++ Redistributables in Configuration Manager" width="1368" height="727" />*Visual C++ Redistributables in Configuration Manager*</figure>

# Finally

Work is proceeding on additional updates including the following:

  * Provide arguments for specifying processor architectures (x86, x64) and platforms (2005, 2012, 2017, etc.) to enable only those specified for download, install etc. without having to modify the XML file
  * Add software versions for import into ConfigMgr applications
  * Specify a folder for creating the ConfigMgr applications in. Currently, applications are created in the top level Applications node

Feedback and bug reports welcome.