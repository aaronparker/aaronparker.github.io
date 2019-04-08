---
id: 2735
title: Automated Citrix Receiver deployment hangs indefinitely
date: 2012-06-26T18:07:47+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2735
permalink: /automated-citrix-receiver-deployment-hangs-indefinitely/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "741240450"
categories:
  - Citrix
tags:
  - Citrix Receiver
---
<img class="alignright size-full wp-image-2736" title="Citrix Receiver Logo" src="http://stealthpuppy.com/wp-content/uploads/2012/06/CitrixReceiver.png" alt="Citrix Receiver Logo" width="128" height="128" />Deploying Citrix Receiver (full or Enterprise) via an unattended command-line, may result in the installer running indefinitely and not completing until you interact with the target machine.

This behaviour will be seen on virtual machines (physical desktops shouldn't be affected) regardless of hypervisor type. I have seen the issue on vSphere and Hyper-V and various type-2 hypervisors, but haven't confirmed whether the issue exists on XenServer. By giving the virtual machine console focus and doing something as simple as moving the mouse cursor around, the Receiver installer will continue successfully.

Receiver can be silent installed using a command-line like this:

[code]CitrixReceiverEnterprise.exe /noreboot /silent /includeSSON SERVER_LOCATION="http://storefront.demolab.test/Citrix/DemoLabStore/PNAgent/config.xml"[/code]

Taking a look at the installer's log file (search in %TEMP% for the logs with the prefix CtxInstall- or TrollyExpress-) gives an indication of what the issue is. Looking for any time discrepancies, reveals a large gap between actions (which matchs the installer kicking off and me interacting with the target VM)

[code]15:12:29: Information - CInstallationManager::InstallComponent(426) - Running InstallComponent method for: USB.  
15:12:29: Information - CInstallationManager::InstallComponent(462) - Installing Component: ID = USB  
15:12:29: Information - CInstallationManager::InstallComponent(598) - Component Install Commandline: REBOOT=ReallySuppress MSIDISABLERMRESTART=0 MSIRESTARTMANAGERCONTROL=0 ARPSYSTEMCOMPONENT=1 NEED\_RECEIVER=n SILENT=1 SERVER\_LOCATION="http://storefront.demolab.test/Citrix/DemoLabStore/PNAgent/config.xml" ALLUSERS=1  
16:52:49: Information - CComponent::CreateRegistryRecords(621) - Writing registry records for uninstall.[/code]

Something to do with the USB support provided by Receiver for XenDesktop doesn't install correctly when the virtual machine's console does not have focus. Unfortunately the root cause might be a little more difficult to find.

Fortunately, though, it's unlikely that USB support is required for a virtual machine running in the data centre. So to avoid installing the USB support and ensure the install completes, we can modify the Receiver components that are installed with a command-line similar to this:

[code]CitrixReceiverEnterprise.exe /noreboot /silent /includeSSON ADDLOCAL=ReceiverInside,ICA\_Client,SSON,SELFSERVICE,DesktopViewer,Flash,PN\_Agent,Vd3d SERVER_LOCATION="http://storefront.demolab.test/Citrix/DemoLabStore/PNAgent/config.xml"[/code]

For more information on the command-line options for installing Receiver, see this page on eDocs: [To configure and install the Citrix Receiver for Windows using command-line parameters](http://support.citrix.com/proddocs/topic/receiver-windows-32/ica-configure-command-line.html)