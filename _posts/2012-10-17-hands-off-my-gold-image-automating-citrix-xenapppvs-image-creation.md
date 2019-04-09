---
id: 2857
title: 'Hands off my gold image - Automating Citrix XenApp/PVS Image Creation'
date: 2012-10-17T16:15:23+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2857
permalink: /hands-off-my-gold-image-automating-citrix-xenapppvs-image-creation/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "888996400"
categories:
  - Automation
tags:
  - Automation
  - MDT
  - PVS
  - XenApp
---
<img class="alignright size-full wp-image-2861" title="hands-off" src="https://stealthpuppy.com/media/2012/10/hands-off.png" alt="" width="256" height="247" srcset="https://stealthpuppy.com/media/2012/10/hands-off.png 256w, https://stealthpuppy.com/media/2012/10/hands-off-150x144.png 150w" sizes="(max-width: 256px) 100vw, 256px" />Citrix Provisioning Services is a great solution for the rapid deployment of Windows workloads from a master image. However, rapid deployment is not a replacement for a consistent, repeatable method of creating that master image.

Today I covered this in my talk at Citrix Synergy, along with my colleague [Jonathan Eyton-Williams](https://twitter.com/jonathanew) - "[Hands off my gold image!](https://citrix.g2planet.com/synergybarcelona2012/public_session_view.php?agenda_session_id=191&conference=synergy)". This article will show you how to automate the deployment of a Windows image from bare metal to a finalised PVS image. This is part of an approach that we use for deployment within [Kelway](http://www.kelway.co.uk).

To keep things simple I'll focus on the minimum pieces required to get this working. From here you should be able to expand the approach to include any number of components in your build.

## Requirements

This approach is based on the use of the [Microsoft Deployment Toolkit](http://technet.microsoft.com/en-us/solutionaccelerators/dd407791.aspx) (MDT), a task sequence to deploy the operating system and some scripting.

At a minimum you need a location to store the MDT deployment share. This can be a dedicated server or any network file storage location that supports SMB. For the purposes of this article, I will use a dedicated virtual machine running Windows Server 2008 R2.

## Setup and configure MDT

To install and configure MDT, download and install the following components:

  * [Microsoft Deployment Toolkit (MDT) 2012 Update 1](http://www.microsoft.com/en-us/download/details.aspx?id=25175)

Plus

  * [Windows Assessment and Deployment Kit (ADK) for Windows 8](http://www.microsoft.com/en-us/download/details.aspx?id=30652)

Or

  * [Windows Automated Installation Kit (AIK) for Windows 7](http://www.microsoft.com/en-us/download/details.aspx?id=5753); and
  * [Windows Automated Installation Kit (AIK) Supplement for Windows 7 SP1](http://www.microsoft.com/en-us/download/details.aspx?id=5188)

I recommend using the ADK instead of WAIK; however if you're using a hypervisor that does not support Windows 8, install the WAIK.

## Import OS, binaries and scripts

To fill out MDT, we need to import operating systems, applications and scripts, updates and drivers.

  * Import the Windows Server 2008 R2 OS image from the ISO. Ideally you'll be installing Windows from volume license media, but for the purposes of testing, there's nothing preventing you from using TechNet, MSDN or evaluation media.

Add the following as applications in MDT:

  * [Microsoft .NET Framework 4](http://www.microsoft.com/en-us/download/details.aspx?id=17718) - this is required by XenConvert; however you'll also need other dependencies for your environment, for example the Visual C++ Redistributables
  * Citrix XenApp 6.5 - the simplest way to do this is just import the entire XenApp 6.5 ISO
  * [Citrix XenApp 6.5 hotfixes](http://support.citrix.com/product/xa/v6.5_2008r2/) - these need to be installed separately after XenApp is installed
  * [Citrix Provisioning Services Device Target](http://support.citrix.com/article/CTX133349) - this is obviously needed to connect to PVS and stream the image
  * [Citrix XenConvert](http://www.citrix.com/downloads/xenserver/tools/conversion.html) - install the latest version of XenConvert to manage the conversion process from the installed image to the PVS VHD
  * The Convert PVS image script

## Create a task sequence

A task sequence is required to install and configure an operating system on an end-point, this is essentially the core of MDT. There is a one-to-one mapping between a task sequence and an operating system, so you'll need to create a task sequence for every version or edition of Windows you are looking to deploy.

  1. Create a Standard Server Task Sequence
  2. Choose the operating system, in this case Windows Server 2008 R2
  3. Edit unattend.xml to configure features and enable roles such as Remote Desktop Services Session Host
  4. Edit the task sequence to perform the required installation and configuration steps during deployment
  5. Create application bundles to simplify task sequences and control the order of installation of applications
  6. Configure CustomSettings.ini to control a task sequence and end-points with physical and custom properties
  7. Create or update the Windows PE boot image. This could be mounted as an ISO into a virtual machine or delivered via PXE. Because we're using MDT and PVS together on the same network, it's simpler to mount the Windows PE ISO and leave PXE support for PVS.

## Create the PVS image

Capturing the image into PVS will have to be performed while the MDT task sequence is running. This can be a challenge, so we need to ensure that all application and dependencies are installed and all reboots have completed. You'll need to be confident that the image is complete before conversion.

During this step there are a number of items to complete in order:

  1. Optimise the image for delivery via PVS - essentially replacing the 'Optimise for PVS' button in the XenConvert wizard. These are Registry changes that the wizard rights to a .REG file before importing, so this was easy to capture.
  2. Run ngen to compile the .NET Framework assemblies. This will take some time.
  3. Rearm Windows and Office (2010 or 2013)
  4. Capture the image, whilst accounting for the fact that the PVS conversion is occurring during the MDT deployment. We need to edit the local install, capture the local install, cleanup the captured image and then ensure the MDT deployment can continue unhindered. If this does not happen, then the MDT deployment will continue to run every time the PVS image is delivered to an end-point.

## The Pieces

So that you don't need to reinvent the wheel completely, I've made available here the following components:

  * A sample CustomSettings.ini that includes the customisations used in this deployment
  * The Windows Server 2008 R2/Citrix XenApp 6.5 task sequence and unattend.xml
  * Citrix XenApp installation and configuration script
  * The Citrix XenApp Hotfixes script
  * Microsoft .NET Framework 4 installation script
  * Citrix Provisioning Services Device Target x64 install script
  * Citrix XenConvert install script
  * XenConvert/PVS image conversion script

<p class="important">
  [download id="58&#8243; format="1&#8243;]
</p>

## Finally

Hopefully this is enough to get you started. In some future posts I'll discuss some of these steps in more detail. If you'd like to know some more detail before then, contact me at: aaron (at) stealthpuppy.com

Next up: [Hands off my gold image – Microsoft Deployment Toolkit details](https://stealthpuppy.com/deployment/hands-off-my-gold-image-microsoft-deployment-toolkit-details/)