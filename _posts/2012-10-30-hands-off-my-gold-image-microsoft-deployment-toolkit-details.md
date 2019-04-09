---
id: 2867
title: 'Hands off my gold image - Microsoft Deployment Toolkit details'
date: 2012-10-30T15:39:43+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2867
permalink: /hands-off-my-gold-image-microsoft-deployment-toolkit-details/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "907097298"
categories:
  - Automation
tags:
  - Automation
  - MDT
  - PVS
  - XenApp
---
After the corresponding [Geek Speak talk at Citrix Synergy in Barcelona](https://citrix.g2planet.com/synergybarcelona2012/public_session_view.php?agenda_session_id=191&conference=synergy), I posted an article on automating a XenApp deployment and capture into Provisioning Services via the [Microsoft Deployment Toolkit](http://technet.microsoft.com/en-us/solutionaccelerators/dd407791.aspx) (MDT): [Hands off my gold image – Automating Citrix XenApp/PVS Image Creation.]({{site.baseurl}}/deployment/hands-off-my-gold-image-automating-citrix-xenapppvs-image-creation/)

In a series of blog posts I'll cover some of the steps in more detail - first up is configuring the MDT deployment share. I won't cover setting up a share here, so if you're new to MDT, I suggest starting at the [MDT home page on TechNet](http://technet.microsoft.com/en-us/solutionaccelerators/dd407791.aspx) where you'll find various resources on using MDT.

## Hosting MDT

Typically MDT is going to be hosted on a Windows Server (VM or physical server); however as a minimum the MDT deployment share only needs to be available over SMB. So essentially any storage location that supports SMB will suit.

The MDT console and ADK/WAIK must be installed somewhere and it's often most convenient to install these on a management desktop/server VM, accessible by whomever is administering MDT.

## CustomSettings.ini

The ZIP file available for download includes a sample CustomSettings.ini which is used to control the MDT deployment share. I've stripped this file down to it's bare essentials to be able to walk you through some of the options used in this approach.

You could potentially use a [Configuration Database](http://deployment.xtremeconsulting.com/2009/11/24/understanding-the-mdt-configuration-database-part-1/) instead; however I've opted to use CustomSettings.ini so that I can use an approach that is as portable as possible.

\[code\]\[Settings\]  
Priority=ByVM, UUID, Default  
Properties=XenAppRole, PVSTemplate, WindowsUpdate

[Default]  
WSUSServer=http://wsus-svr:8530  
WindowsUpdate=FALSE

OSInstall=YES  
DeploymentType=NEWCOMPUTER  
DoNotCreateExtraPartition=NO

; ==============================================  
; Control specific settings for virtual machines

[ByVM]  
Subsection=VM-%IsVM%

[VM-True]  
; Prevent creation of BDE partition on VMs  
DoNotCreateExtraPartition=YES

;=================================  
; Machine specific configurations

[<insert VM UUID here]  
OSDComputerName=<VM name>  
TaskSequenceID=<task sequence short code>  
XenAppRole=WORKER  
PVSTemplate=TRUE[/code]

Under the [Settings] heading, I've created three custom properties _XenAppRole_, _PVSTemplate_ and _WindowsUpdate_. These properties enable a few things:

  * XenAppRole - valid values for this property are CONTROLLER and WORKER. This controls the installation of XenApp and whether XenApp is then configured as a Controller (hosts the XML broker and enumerates applications and zones etc) or a Worker (hosting user sessions and applications). If this property is not set against a computer record, then XenApp will not be installed
  * PVSTemplate - this controls whether a computer is the master template for Provisioning Services. The only valid value is TRUE. If this is set, then during the MDT task sequence, the computer image will be converted to a PVS image
  * WindowsUpdate - this property controls whether Windows Update is run during the task sequence. Valid values are TRUE or FALSE. Set this to FALSE during testing to reduce the amount of time to deploy and capture an image.

To control the creation (or not) of the BitLocker boot partition, a combination of the property _DoNotCreateExtraPartition_ and detection of a virtual machine (the _ByVM_ and _VM-True_ sections) is used. This allows us to ensure that the partition is not created on virtual machines where it isn't required.

The end of CustomSettings.ini (under machine specific configurations, is a sample heading for a target computer. Target computers are best identified by their UUID. This allows the MDT task sequence to match the machine it's running on against the properties set in CustomSettings.ini.

In the next article, I'll cover some specifics around [the task sequence used to deploy Windows, install XenApp and capture the PVS image]({{site.baseurl}}/deployment/hands-off-my-gold-image-the-task-sequence/). In the meantime if you want to get more detail on this approach email me at aaron (at) stealthpuppy.com.