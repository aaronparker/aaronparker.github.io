---
id: 93
title: Install the Windows Deployment Services Console on Vista
date: 2007-02-28T21:23:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/install-the-windows-deployment-services-console-on-vista
permalink: /install-the-windows-deployment-services-console-on-vista/
categories:
  - Applications
tags:
  - Windows-Vista
---
Installing the Windows Deployment Services MMC on Windows Vista is a simple process:

**1.** Copy these files from a Windows Server 2003 (or Windows Longhorn Server) running WDS to the <font face="courier new,courier">WindowsSYSTEM32</font> folder on your Windows Vista machine:

<ul style="margin-left: 54pt">
  <li>
    <font face="courier new,courier">wdsmmc.dll </font>
  </li>
  <li>
    <font face="courier new,courier">wdsmgmt.dll </font>
  </li>
  <li>
    <font face="courier new,courier">wdsimage.dll </font>
  </li>
  <li>
    <font face="courier new,courier">wdscsl.dll </font>
  </li>
  <li>
    <font face="courier new,courier">WdsMgmt.msc</font>
  </li>
</ul>

**2.** Copy this file from a Windows Server 2003 (or Windows Longhorn Server) running WDS to the <font face="courier new,courier">WindowsSYSTEM32en-US</font> folder on your Windows Vista machine:

<ul style="margin-left: 54pt">
  <li>
    <font face="courier new,courier">wdsmmc.dll.mui</font>
  </li>
</ul>

**3.** Register each DLL file on the Vista machine with REGSVR32:

[code]REGSVR32 C:WindowsSystem32wdsmmc.dll  
REGSVR32 C:WindowsSystem32wdsmgmt.dll  
REGSVR32 C:WindowsSystem32wdsimage.dll  
REGSVR32 C:WindowsSystem32wdscsl.dll[/code]

Add the Windows Deployment Services snap-in to a custom MMC console or run WdsMgmt.msc if you copied that file from the source machine.

<img border="0" src="{{site.baseurl}}/media/2007/02/1000.14.1051.WDSConsole.png" />