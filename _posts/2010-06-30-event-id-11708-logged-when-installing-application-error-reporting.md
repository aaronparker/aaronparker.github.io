---
title: Event ID 11708 logged when installing Application Error Reporting
date: 2010-06-30T17:18:15+10:00
author: Aaron Parker
layout: post
permalink: /event-id-11708-logged-when-installing-application-error-reporting/
categories:
  - Applications
tags:
  - App-V
---
When installing Microsoft Application Error Reporting, for example as a part of deploying the [App-V Client](http://technet.microsoft.com/en-us/library/ee956914.aspx), you may see an event with ID 11708 logged in the Application log. The error logged will be something along the lines of this:

> Source: MsiInstaller
> 
> Event ID: 11708
> 
> Error detail: Product: Microsoft Application Error Reporting &#8212; Installation failed.

Additionally the following event may also be logged:

> Source: MsiInstaller
> 
> Event ID: 1033
> 
> Event detail: Windows Installer installed the product. Product Name: Microsoft Application Error Reporting. Product Version: 12.0.6012.5000. Product Language: 1033. Manufacturer: Microsoft Corporation. Installation success or error status: 1603.

This is caused by initiating the installation from non-elevated process (e.g. the Run dialog box) – if the installation starts and UAC subsequently prompts for elevation, the MSI will not install successfully.

If the installation is initiated from a process that has already been elevated (e.g. an Administrator Command Prompt) the installer will complete without errors.
