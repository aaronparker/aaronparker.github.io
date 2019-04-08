---
id: 352
title: One Click Citrix Access Management Console Uninstall
date: 2007-10-04T14:47:46+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/deployment/one-click-citrix-access-management-console-uninstall
permalink: /one-click-citrix-access-management-console-uninstall/
categories:
  - Automation
tags:
  - Presentation-Server
---
Citrix provide a nice installer for the [Access Management Console](https://www.citrix.com/English/SS/downloads/details.asp?dID=8218&downloadID=164650&pID=186#top) that you can automate to [script the installation of the AMC](http://stealthpuppy.com/deployment/unattended-citrix-access-management-console). However, if you&#8217;ve ever needed to remove the AMC you&#8217;ll find that you need to remove each component one at a time. Because there are 9 components, this can become a little tedious.

So here&#8217;s a script that you can use to uninstall the current version of the AMC and its components in one step:

[code]@ECHO OFF  
REM Citrix Access Management Console - Hotfix Management  
START /WAIT MSIEXEC /QB /UNINSTALL {40E9841C-CF57-4B88-8A06-F944D322E92E}  
REM Citrix Access Management Console - Knowledge Base  
START /WAIT MSIEXEC /QB /UNINSTALL {557E05DF-F2E6-410A-8C35-2E73552110C8}  
REM Citrix Access Management Console - Legacy Tools  
START /WAIT MSIEXEC /QB /UNINSTALL {760D0614-9608-4637-919B-3573FC0F0D87}  
REM Citrix Access Management Console - Diagnostics  
START /WAIT MSIEXEC /QB /UNINSTALL {9B5AEAE3-8CE1-4524-A7C4-1CFD2B98F1E9}  
REM Citrix Presentation Server - Administration Snap-in  
START /WAIT MSIEXEC /QB /UNINSTALL {BE4DE1B2-10F2-4DB2-A0C3-309FC61FDDA0}  
REM Citrix Access Management Console - Web Interface  
START /WAIT MSIEXEC /QB /UNINSTALL {D89D16D0-9626-4781-A517-1BE9EFD622F8}  
REM Citrix Presentation Server - Presentation Server Reports  
START /WAIT MSIEXEC /QB /UNINSTALL {2F97CB0C-7636-4289-B458-282DAC3F42BB}  
REM Citrix Access Management Console - Report Center  
START /WAIT MSIEXEC /QB /UNINSTALL {23207B10-4855-496B-A099-7B80C4AFD355}  
REM Citrix Access Management Console - Framework  
START /WAIT MSIEXEC /QB /UNINSTALL {5436F894-39CC-41D7-AEFC-AF5E2C7F0852}  
[/code]