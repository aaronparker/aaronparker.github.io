---
id: 5997
title: Download, Install, Import Visual C++ Redistributables with VcRedist
date: 2018-03-16T21:10:54+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=5997
permalink: /vcredist-powershell-module/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
image: /wp-content/uploads/2018/03/alexey-ruban-103990-unsplash.jpg
categories:
  - Microsoft
tags:
  - PowerShell
  - Visual C++ Redistributable
---
**Note**: for a more up to date version of the content in this article, VcRedist now has documentation available here: <https://docs.stealthpuppy.com/vcredist>

Last year I wrote [a PowerShell script that can download, install or import](https://stealthpuppy.com/visual-c-redistributable-installer/) the Visual C++ Redistributables into MDT or ConfigMgr. Long-term maintenance of the full feature set in a single script is a little unwieldy so I've re-written the script and created [a PowerShell module](https://github.com/aaronparker/Install-VisualCRedistributables) - VcRedist.

Refactoring the script into a module has been a great little project for creating my first PowerShell function and publishing it to [the PowerShell Gallery](https://www.powershellgallery.com/packages/VcRedist/).

# Why VcRedist?

At this point, I'm sure you're saying to yourself - "Aaron, haven't you just created [Chocolatey](https://chocolatey.org/)?". In a way yes, this module does exactly what you can do with Chocolatey - install the [Visual C++ Redistributables](https://chocolatey.org/packages/vcredist140) directly to the local machine. Although you can download and install all of the supported (and unsupported) Redistributables, the primary aim of the module is to provide a fast way to download and import the Redistributables into the Microsoft Deployment Toolkit or System Center Configuration Manager for operating system deployments.

# Module

The VcRedist module is [published to the PowerShell Gallery](https://www.powershellgallery.com/packages/VcRedist/), which means that it's simple to install the module and starting importing with a few lines of PowerShell. For example, here's how you could install the module, download all of [the supported Redistributables](https://support.microsoft.com/en-gb/help/2977003/the-latest-supported-visual-c-downloads) and import them into an MDT deployment share:

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">Install-Module -Name VcRedist
Import-Module VcRedist
$VcList = Get-VcList | Get-VcRedist -Path "C:\Temp\VcRedist"
Import-VcMdtApp -VcList $VcList -Path "C:\Temp\VcRedist" -MdtPath "\\server\share\Reference"</pre>

This results in each of the Visual C++ Redistributables imported as a separate application with all necessary properties including Version, silent command line, Uninstall Key and 32-bit or 64-bot operating system support.

<figure id="attachment_5999" aria-describedby="caption-attachment-5999" style="width: 2880px" class="wp-caption aligncenter">[<img class="size-full wp-image-5999" src="https://stealthpuppy.com/wp-content/uploads/2018/03/MdtVisualCApplications.png" alt="Visual C++ Redistributables imported into an MDT share with VcRedist" width="2880" height="778" srcset="https://stealthpuppy.com/wp-content/uploads/2018/03/MdtVisualCApplications.png 2880w, https://stealthpuppy.com/wp-content/uploads/2018/03/MdtVisualCApplications-150x41.png 150w, https://stealthpuppy.com/wp-content/uploads/2018/03/MdtVisualCApplications-300x81.png 300w, https://stealthpuppy.com/wp-content/uploads/2018/03/MdtVisualCApplications-768x207.png 768w, https://stealthpuppy.com/wp-content/uploads/2018/03/MdtVisualCApplications-1024x277.png 1024w" sizes="(max-width: 2880px) 100vw, 2880px" />](https://stealthpuppy.com/wp-content/uploads/2018/03/MdtVisualCApplications.png)<figcaption id="caption-attachment-5999" class="wp-caption-text">Visual C++ Redistributables imported into an MDT share with VcRedist*</figure>

The same approach can be used to import the Redistributables into a ConfigMgr site:

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">Install-Module VcRedist
Import-Module VcRedist
$VcList = Get-VcList | Get-VcRedist -Path "C:\Temp\VcRedist"
Import-VcCmApp -VcList $VcList -Path "C:\Temp\VcRedist" -CMPath "\\server\share\VcRedist" -SMSSiteCode LAB</pre>

Just like MDT, each Redistributable is imported into ConfigMgr; however, <code class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">Import-VcCmApp</code> copies the Redistributables to a share for distribution and creates and application with a single deployment for each one.

<figure id="attachment_6000" aria-describedby="caption-attachment-6000" style="width: 1145px" class="wp-caption aligncenter">[<img class="size-full wp-image-6000" src="https://stealthpuppy.com/wp-content/uploads/2018/03/VcRedistConfigMgr.png" alt="Visual C++ Redistributables imported into ConfigMgr with VcRedist" width="1145" height="477" srcset="https://stealthpuppy.com/wp-content/uploads/2018/03/VcRedistConfigMgr.png 1145w, https://stealthpuppy.com/wp-content/uploads/2018/03/VcRedistConfigMgr-150x62.png 150w, https://stealthpuppy.com/wp-content/uploads/2018/03/VcRedistConfigMgr-300x125.png 300w, https://stealthpuppy.com/wp-content/uploads/2018/03/VcRedistConfigMgr-768x320.png 768w, https://stealthpuppy.com/wp-content/uploads/2018/03/VcRedistConfigMgr-1024x427.png 1024w" sizes="(max-width: 1145px) 100vw, 1145px" />](https://stealthpuppy.com/wp-content/uploads/2018/03/VcRedistConfigMgr.png)<figcaption id="caption-attachment-6000" class="wp-caption-text">Visual C++ Redistributables imported into ConfigMgr with VcRedist*</figure>

Of course, the module can download and install the Redistributables to the local machine:

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">Install-Module VcRedist
Import-Module VcRedist
$VcList = Get-VcList | Get-VcRedist -Path "C:\Temp\VcRedist"
$VcList | Install-VcRedist -Path C:\Temp\VcRedist</pre>

By default, this installs all of the supported Redistributables:

<figure id="attachment_6001" aria-describedby="caption-attachment-6001" style="width: 1071px" class="wp-caption aligncenter">[<img class="size-full wp-image-6001" src="https://stealthpuppy.com/wp-content/uploads/2018/03/VisualCPrograms.png" alt="Visual C++ Redistributables installed locally with VcRedist" width="1071" height="583" srcset="https://stealthpuppy.com/wp-content/uploads/2018/03/VisualCPrograms.png 1071w, https://stealthpuppy.com/wp-content/uploads/2018/03/VisualCPrograms-150x82.png 150w, https://stealthpuppy.com/wp-content/uploads/2018/03/VisualCPrograms-300x163.png 300w, https://stealthpuppy.com/wp-content/uploads/2018/03/VisualCPrograms-768x418.png 768w, https://stealthpuppy.com/wp-content/uploads/2018/03/VisualCPrograms-1024x557.png 1024w" sizes="(max-width: 1071px) 100vw, 1071px" />](https://stealthpuppy.com/wp-content/uploads/2018/03/VisualCPrograms.png)<figcaption id="caption-attachment-6001" class="wp-caption-text">Visual C++ Redistributables installed locally with VcRedist*</figure>

Note that the 2015 and 2017 Redistributables are the same version, so the end result will include only the 2017 versions.

# Functions

This module includes the following functions:

## Get-VcList

This function reads the Visual C++ Redistributables listed in an internal manifest or an external XML file into an array that can be passed to other VcRedist functions. Running `Get-VcList` will return the supported list of Visual C++ Redistributables. The function can read an external XML file that defines a custom list of Visual C++ Redistributables.

## Export-VcXml

Run `Export-VcXml` to export the internal Visual C++ Redistributables manifest to an external XML file. Use `-Path` to define the path to the external XML file that the manifest will be saved to. By default `Export-VcXml` will export only the supported Visual C++ Redistributables.

## Get-VcRedist

To download the Visual C++ Redistributables to a local folder, use `Get-VcRedist`. This will read the array of Visual C++ Redistributables returned from `Get-VcList` and download each one to a local folder specified in `-Path`. Visual C++ Redistributables can be filtered for release and processor architecture.

## Install-VcRedist

To install the Visual C++ Redistributables on the local machine, use `Install-VcRedist`. This function again accepts the array of Visual C++ Redistributables passed from `Get-VcList` and installs the Visual C++ Redistributables downloaded to a local path with `Get-VcRedist`. Visual C++ Redistributables can be filtered for release and processor architecture.

## Import-VcMdtApp

To install the Visual C++ Redistributables as a part of a reference image or for use with a deployment solution based on the Microsoft Deployment Toolkit, `Import-VcMdtApp` will import each of the Visual C++ Redistributables as a separate application that includes silent command lines, platform support and the UninstallKey for detecting whether the Visual C++ Redistributable is already installed. Visual C++ Redistributables can be filtered for release and processor architecture.

Each Redistributables will be imported into the deployment share with application properties for a successful deployment.

## Import-VcCMApp

To install the Visual C++ Redistributables with System Center Configuration Manager, `Import-VcCmApp` will import each of the Visual C++ Redistributables as a separate application that includes the application and a single deployment type. Visual C++ Redistributables can be filtered for release and processor architecture.

# Tested On

Tested on Windows 10 and Windows Server 2016 with PowerShell 5.1. Install-VcRedist and Import-VcMdtApp require Windows and the MDT Workbench. Get-VcList, Export-VcXml and Get-VcRedist do work on PowerShell Core; however, most testing is completed on Windows PowerShell.

# To Do

Right now, I have a few tasks for updating the module, including:

  * Additional testing / Pester tests
  * Add -Bundle to Import-VcMdtApp to create an Application Bundle and simplify installing the Redistributables
  * Documentation updates

For full details and further updates, [keep an eye on the repository](https://github.com/aaronparker/Install-VisualCRedistributables) and test out the module via [the PowerShell Gallery](https://www.powershellgallery.com/packages/VcRedist/).
