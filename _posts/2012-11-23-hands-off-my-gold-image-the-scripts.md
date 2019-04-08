---
id: 2937
title: 'Hands off my gold image - The Scripts'
date: 2012-11-23T00:39:51+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2937
permalink: /hands-off-my-gold-image-the-scripts/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "939908061"
categories:
  - Automation
tags:
  - Automation
  - MDT
  - PVS
  - XenApp
---
<img class="alignright size-full wp-image-2946" style="margin: 5px;" title="HandsOff" src="http://stealthpuppy.com/wp-content/uploads/2012/11/HandsOff.jpg" alt="" width="125" height="127" />This is the last article in a series that covers in more detail the approach to automating XenApp and PVS image creation, from my [Geek Speak talk at Citrix Synergy in Barcelona - Hands off my gold image.](https://citrix.g2planet.com/synergybarcelona2012/public_session_view.php?agenda_session_id=191&conference=synergy)

The first article gives an overview of the approach - [Hands off my gold image – Automating Citrix XenApp/PVS Image Creation](http://stealthpuppy.com/deployment/hands-off-my-gold-image-automating-citrix-xenapppvs-image-creation/) and you can find more detail in [Hands off my gold image – Microsoft Deployment Toolkit details](http://stealthpuppy.com/deployment/hands-off-my-gold-image-microsoft-deployment-toolkit-details/) and [Hands off my gold image – The Task Sequence](http://stealthpuppy.com/deployment/hands-off-my-gold-image-the-task-sequence/). In this article I'll briefly cover the scripts referenced in the task sequence.

# Approach to Scripting

Each included script is just a batch file. You won't find too much error handling going on and each script will make certain assumptions about where things such as binaries are located. This has been done to keep each script as simple and as portable as possible.

Where possible, I've tried to use the original un-modified installer - that is, I've avoided extracting an installer if can get away with it. This should be that updating a binary requires as little changes to the scripts as possible.

# Script Details

In the download that contains the pieces you can use to get this up and running in your own environment, you'll find the following scripts:

  * Microsoft .NET Framework 4 Full
  * Citrix XenApp 6.5
  * Citrix XenApp 6.5 Hotfixes
  * Citrix Provisioning Services Device Target x64
  * Citrix XenConvert x64 2.x
  * Convert XenApp PVS Image

Import each of these as a separate application into the Applications folder in the MDT Workbench. Create a new application and choose 'Application with source files' and choose each script folder as the source directory.

You'll then need to download the binaries for each application. Each script expects those binaries to be in the same folder as the script.

## Microsoft .NET Framework 4 Full

This script will, of course, install the .NET Framework 4.0, required by Citrix XenConvert.

## Citrix XenApp 6.5

The included script will install and configure XenApp 6.5 as a Worker (or session-host only mode) and join an existing farm. You'll need to pay particular attention to the options included in this script as options such as XenApp edition, agents installed, farm name and credentials etc. Additionally you'll have to create DSN file to reference the database server that hosts the XenApp data store.

## Citrix XenApp Hotfixes

The approach used to install XenApp updates is very simple - the script will install every MSI and MSP file in the same folder as the script. That way you can add and remove hotfixes without changing the script.

## Citrix Provisioning Services Device Target x64

Installing and updating the PVS device target software is always a barrel of laughs, so I've attempted to keep this script as simple as possible.

## Citrix XenConvert x64 2.x

XenConvert is straightforward to install and there's nothing special in this script, just a silent install of XenConvert.

## Convert XenApp PVS Image

This is the script that runs at the end of the deployment and uses XenConvert to convert the current server into a PVS image. It essentially configures the local Windows instance and automates the XenConvert wizard.

The script implements a number of optimisations gathered from the XenConvert wizard and a couple of other sources. These include:

  * Registry changes (via REG.EXE) implemented by the XenConvert wizard
  * Runs the .NET Framework [NGEN](http://en.wikipedia.org/wiki/Native_Image_Generator) utility to generate native images
  * Various other optimisations including disabling the boot animation, sets the High Performance power scheme etc
  * Rearms Windows and Office

The final lines in the script then perform a few steps:

  1. Disables auto admin logon
  2. Converts the image using XenConvert
  3. Deletes the MDT scripts folder (\MININT) from the converted image
  4. Re-enables auto admin logon

These steps are required because the conversion occurs while the MDT task sequence is still running. We want the resulting image to not include the MDT components without breaking the currently executing task sequence.

# Finally

It's my view that Provisioning Services is a great tool for rapid deployment of an image, preventing service change creep and an excellent solution for managing read IO; however it is not a replacement for automating the creation of a gold image.

Combining a tool such as MDT with PVS creates a framework for the management of the entire lifecycle of your XenApp (or even virtual Windows 7 desktop) images. Automating the end to end creation and delivery of an image takes effort, but it gives you a transparent, consistent and repeatable approach.

I've laid out the framework, now go forth and automate.