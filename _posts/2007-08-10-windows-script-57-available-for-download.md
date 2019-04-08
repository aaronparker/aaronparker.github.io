---
id: 327
title: Windows Script 5.7 Available for Download
date: 2007-08-10T08:48:49+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/windows-script-57-available-for-download
permalink: /windows-script-57-available-for-download/
categories:
  - Microsoft
tags:
  - VBscript
  - Windows
---
We all know that PowerShell is the future, but Microsoft have released an updated version of Windows Script for Windows 2000/XP and 2003 (to match the version included with Windows Vista). You can read the [release notes here](http://download.microsoft.com/download/f/f/e/ffea3abf-b55f-4924-b5a5-bde0805ad67c/Windows%20Script%20Release%20Notes.rtf).

  * [Windows Script 5.7 for Windows 2000](http://www.microsoft.com/downloads/details.aspx?FamilyID=c03d3e49-b40e-4ca1-a0c7-cc135ec4d2be&DisplayLang=en) [[Direct Link](http://www.microsoft.com/downloads/info.aspx?na=90&p=&SrcDisplayLang=en&SrcCategoryId=&SrcFamilyId=c03d3e49-b40e-4ca1-a0c7-cc135ec4d2be&u=http%3a%2f%2fdownload.microsoft.com%2fdownload%2ff%2ff%2fe%2fffea3abf-b55f-4924-b5a5-bde0805ad67c%2fscripten.exe)]
  * [Windows Script 5.7 for Windows XP](http://www.microsoft.com/downloads/details.aspx?FamilyID=47809025-d896-482e-a0d6-524e7e844d81&DisplayLang=en) [[Direct Link](http://www.microsoft.com/downloads/info.aspx?na=90&p=&SrcDisplayLang=en&SrcCategoryId=&SrcFamilyId=47809025-d896-482e-a0d6-524e7e844d81&u=http%3a%2f%2fdownload.microsoft.com%2fdownload%2f4%2f4%2fd%2f44de8a9e-630d-4c10-9f17-b9b34d3f6417%2fscripten.exe)]
  * [Windows Script 5.7 for Windows Server 2003](http://www.microsoft.com/downloads/details.aspx?FamilyID=f00cb8c0-32e9-411d-a896-f2cd5ef21eb4&DisplayLang=en) [[Direct Link](http://www.microsoft.com/downloads/info.aspx?na=90&p=&SrcDisplayLang=en&SrcCategoryId=&SrcFamilyId=f00cb8c0-32e9-411d-a896-f2cd5ef21eb4&u=http%3a%2f%2fdownload.microsoft.com%2fdownload%2f3%2f0%2fe%2f30e28ef2-c6b1-4510-a243-7643573d673a%2fscripten.exe)]

If you&#8217;re looking to do an unattended installation of this update you can use the standard Windows hotfix install switches, e.g:

<p class="console">
  C:\SCRIPTEN.EXE /PASSIVE /NORESTART
</p>