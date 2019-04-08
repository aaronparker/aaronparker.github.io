---
id: 121
title: 'Disabling "Check for WinZip Update"'
date: 2007-01-17T20:39:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/disabling-check-for-winzip-update
permalink: /disabling-check-for-winzip-update/
categories:
  - Automation
tags:
  - WinZip
---
Some bright spark over at WinZip thought that it would be a great idea to build in an auto-update utility into WinZip so that users would be prompted to download the lastest version of WinZip as they are released. Unfortunately, this updater prompts users when they first run WinZip even if they don't have administrative access to their machine (I think the guy from WinZip and the [guy from Adobe](http://www.stealthpuppy.com/blogs/travelling/archive/2007/01/06/adobe-customization-wizard-8.aspx) must know each other). Here's the dialog that users see when they first run WinZip, not ideal in a corporate environment:

<img border="0" src="http://stealthpuppy.com/wp-content/uploads/2007/01/1000.14.470.WinZipUpdate.png" /> 

Fortunately the same guy built in a way to supress and even disable the update feature in WinZip, however there are two locations in the registry to do this:

  * <font face="courier new,courier">HKEY_CURRENT_USERSOFTWARENico Mak ComputingWinZipUpdateCheck</font>; and
  * <font face="courier new,courier">HKEY_LOCAL_MACHINESOFTWARENico Mak ComputingWinZipUpdateCheck</font>.

During an installation of WinZip you can set the following registry values to supress and disable the updater. Under <font face="courier new,courier">HEY_LOCAL_MACHINESOFTWARENico Mak ComputingWinZipUpdateCheck</font> set two string values (REG_SZ):

  * AutoMode - set to "0"
  * NoUpdateChecking - set to "1"

AutoMode will supress the updater and NoUpdateChecking will actually disable the updater completely, removing the interface from WinZip (Options / Configuration... / Miscellaneous / Check for Updates:). If these values appear in the same key under HKEY\_CURRENT\_USER they will override the values set in HKEY\_LOCAL\_MACHINE, so you may want to ensure they don't exist in each users regsitry.