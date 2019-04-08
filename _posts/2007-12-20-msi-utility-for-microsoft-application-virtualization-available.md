---
id: 404
title: MSI Utility for Microsoft Application Virtualization Available
date: 2007-12-20T11:18:58+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/msi-utility-for-microsoft-application-virtualization-available
permalink: /msi-utility-for-microsoft-application-virtualization-available/
categories:
  - Microsoft
tags:
  - SoftGrid
---
No official word from the SoftGrid/Application Virtualisation blog yet, but Microsoft have released the [MSI Utility for Microsoft Application Virtualization](http://www.microsoft.com/downloads/details.aspx?FamilyID=37a9e590-4f55-44ac-93e1-36eb63a09240&DisplayLang=en) for converting your sequenced application to MSI installs.

> The MSI Utility for Microsoft Application Virtualization is a new tool designed to extend virtual application deployment in certain key scenarios. In cases where a computer running Microsoft System Center Virtual Application Server is not available, the MSI Utility allows delivery of sequenced applications directly to Microsoft SoftGrid Application Virtualization for Desktops and Microsoft SoftGrid Application Virtualization for Terminal Services.
> 
> The MSI Utility enables the distribution of virtual applications without streaming. Instead, it uses Windows Installer to load and configure virtual applications. By leveraging this standard format, the MSI Utility achieves Microsoft Systems Management Server 2003 and Microsoft System Center Configuration Manager 2007 platform version-agnostic distribution of virtual applications if supported by organizational Electronic Software Distribution (ESD) systems. As such, the MSI Utility is a stepping stone to the richer deployment options available in Microsoft System Center Virtual Application Server 4.5.
> 
> The MSI Utility extends application deployment methods to a broad range of ESD systems, including Systems Management Server 2003 and System Center Configuration Manager, as well as other methods such as network shares, removable disks, and memory keys. By using an ESD system to deploy virtualized application packages to disconnected SoftGrid Application Virtualization Desktop Clients, users can run virtualized applications without connecting to a computer running Microsoft System Center Virtual Application Server.

![msiutility.PNG](http://stealthpuppy.com/wp-content/uploads/2007/12/msiutility.PNG) 

This functionality is supported natively in Application Virtualisation 4.5 and is built directly into the Sequencer. Converting your sequenced applications into MSI installs would also be great for Terminal Server environments where you don't specifically need or want to stream the applications and are probably pre-caching them anyway.

Conversion is prettty simple -just point the MSI utility to your project file (SPRJ) and it outputs a small MSI and XML file. You will need to update to version 4.1.2.21 or 4.2.1.21 of the SoftGrid Client (depending on whether you have Software Assurance or not) to use the MSI files created with this utility.