---
id: 338
title: Group Policy Diagnostic Best Practice Analyzer
date: 2007-08-28T19:18:23+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/off-site-news/group-policy-diagnostic-best-practice-analyzer
permalink: /group-policy-diagnostic-best-practice-analyzer/
categories:
  - Microsoft
tags:
  - Group Policy
---
Here's an interesting tool that Microsoft have just released - the Group Policy Diagnostic Best Practice Analyzer:

> The Microsoft Group Policy Diagnostic Best Practice Analyzer (GPDBPA) for Windows XP and Windows Server 2003 is designed to help you identify Group Policy configuration errors or other dependency failures that may prevent settings or features from functioning as expected.
> 
> The GPDBPA scans the client computer or domain controller for configuration information that can impact Group Policy, and generates a report identifying potential issues. It also scans for error messages commonly related to Group Policy and, if found, attempts to identify the source of the error.

The knowledge base article, [KB940122](http://support.microsoft.com/kb/940122), for this update is not yet available, however there is a help file included with the update. It looks to scan for fairly common issues with Group Policy, but it's a great tool to have in your toolkit and could even be scheduled to proactively scan for issues.

Curiously only the Windows XP 32-bit version currently requires validation for download:

  * [GPDBPA for Windows Server 2003 x86](http://www.microsoft.com/downloads/details.aspx?FamilyID=47f11b02-8ee4-450b-bf13-880b91ba4566&DisplayLang=en) [[Direct download](http://www.microsoft.com/downloads/info.aspx?na=90&p=&SrcDisplayLang=en&SrcCategoryId=&SrcFamilyId=47f11b02-8ee4-450b-bf13-880b91ba4566&u=http%3a%2f%2fdownload.microsoft.com%2fdownload%2f3%2fa%2f2%2f3a21fc86-04c1-40a4-8420-1f883b28a528%2fWindowsServer2003-KB940122-x86-ENU.exe)]
  * [GPDBPA for Windows Server 2003 x64](http://www.microsoft.com/downloads/details.aspx?FamilyID=70e0edec-66f7-4499-83b7-4f2009df2314&DisplayLang=en) [[Direct download](http://www.microsoft.com/downloads/info.aspx?na=90&p=&SrcDisplayLang=en&SrcCategoryId=&SrcFamilyId=70e0edec-66f7-4499-83b7-4f2009df2314&u=http%3a%2f%2fdownload.microsoft.com%2fdownload%2fa%2f6%2f7%2fa679c6de-d007-4205-8709-779d44bc7dac%2fWindowsServer2003.WindowsXP-KB940122-x64-ENU.exe)]
  * [GPDBPA for Windows XP x86](http://www.microsoft.com/downloads/details.aspx?FamilyID=70e4a971-da91-4d4f-bf92-5c75a84f3742&DisplayLang=en) [[Direct download](http://www.microsoft.com/downloads/info.aspx?na=90&p=&SrcDisplayLang=en&SrcCategoryId=&SrcFamilyId=70e4a971-da91-4d4f-bf92-5c75a84f3742&u=http%3a%2f%2fdownload.microsoft.com%2fdownload%2fd%2f2%2f6%2fd26bfabc-10de-4036-9f3f-6e8f59e5a216%2fWindowsXP-KB940122-x86-ENU.exe)]
  * [GPDBPA for Windows XP x64](http://www.microsoft.com/downloads/details.aspx?FamilyID=317c372c-0fe3-4ad0-be52-2ff3004daef0&DisplayLang=en) [[Direct download](http://www.microsoft.com/downloads/info.aspx?na=90&p=&SrcDisplayLang=en&SrcCategoryId=&SrcFamilyId=317c372c-0fe3-4ad0-be52-2ff3004daef0&u=http%3a%2f%2fdownload.microsoft.com%2fdownload%2f0%2fb%2ff%2f0bf49009-2e93-419a-9dc4-2b1b068cb173%2fWindowsServer2003.WindowsXP-KB940122-x64-ENU.exe)]