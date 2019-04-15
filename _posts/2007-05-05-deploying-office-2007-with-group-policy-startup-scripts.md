---
id: 50
title: Deploying Office 2007 with Group Policy Startup Scripts
date: 2007-05-05T08:02:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/deploying-office-2007-with-group-policy-startup-scripts
permalink: /deploying-office-2007-with-group-policy-startup-scripts/
thesis_description:
  - More specifics on deploying Microsoft Office 2007 with Group Policy Startup Scripts
aktt_notify_twitter:
  - 'yes'
views:
  - "2"
dsq_thread_id:
  - "195378385"
categories:
  - Automation
tags:
  - Group Policy
  - Office-2007
---
In a previous post I discussed what you need to do to start [deploying Office 2007](http://www.stealthpuppy.com/blogs/travelling/archive/2007/04/12/office-2007-deployment-via-group-policy.aspx). In that post I referenced a page that Microsoft linked to, but have not actually posted ([Use Group Policy to Assign Startup Scripts for 2007 Office Deployment](http://technet2.microsoft.com/Office/en-us/library/a57c8446-b959-4025-a866-b690ddcaa66d1033.mspx)). So in this article I'll go through a couple of ways you can use Group Policy startup scripts to deploy Office.

To get the most out of your Office 2007 deployment you will need to deploy using SETUP.EXE, not the MSI file. The reason for this is the changes Microsoft has made to Office 2007 setup there are no more transform files, instead customisation is achieved via Windows Installer patch files (.MSP). Using SETUP.EXE for deployment will automatically apply the patch file during installation.

When deploying applications via a startup script you will need to determine if the software is already installed before attempting to start the install, otherwise the installation will occur on every boot. There are a number of different ways of doing this; the first of which I had hoped would have been a [WMI filter](http://207.46.196.114/windowsserver/en/library/a16cffa4-83b3-430b-b826-9bf81c0d39a71033.mspx?mfr=true) such as this:

```sql
SELECT * FROM Win32_Product WHERE (IdentifyingNumber <> "{90120000-0030-0000-0000-0000000FF1CE}")
```

or this:

```sql
SELECT * FROM Win32_Product WHERE (Caption <> "Microsoft Office Enterprise 2007")
```

The problem with either of these filters is that they will cause the GPO to apply whether Office is installed or not because they evaluate to TRUE. So unfortunately using a WMI Filter to control when Office is installed is out of the question.

A method that is similar to the WMI Filter, but uses a VBscript script to detect the presence of the installed Office applications, could work like this:

```vbs
Set wshShell = WScript.CreateObject("WScript.Shell")  
Set objWMIService = GetObject("winmgmts:{impersonationLevel=impersonate}!\\.\root\cimv2")  
Set colSoftware = objWMIService.ExecQuery ("Select * from Win32_Product")  
For Each objSoftware in colSoftware  
  If objSoftware.Caption = "Microsoft Office Enterprise 2007" Then  
    OfficeInstalled = True  
    Exit For  
  End If  
Next  
If OfficeInstalled <> True Then  
  Set oExec = wshShell.Exec ("\\company.local\Public\Applications\Office2007\SETUP.EXE")  
  Do While oExec.Status = 0  
    WScript.Sleep 100  
  Loop  
End If
```

This script will detect whether Office Enterprise 2007 is installed and if not start the installation. You could also implement some error checking around this to write an event to the Application log to record errors. One problem with using the Win32_Product WMI class to enumerate installed applications is that the process is slow enumeration takes about 20 seconds on my laptop (Intel Core Duo T2300, 1.6GHz).

The simplest way to detect if Office is installed before starting the setup program is to check if a file exists. One of the most common files will be WINWORD.EXE. So a script could look like this:

```cmd
IF NOT EXIST "%ProgramFiles%\Microsoft Office\Office12\WINWORD.EXE" START /WAIT \\company.local\Public\Applications\Office2007\SETUP.EXE
```

Deploying Office 2007 via Group Policy will be challenging and may require you to perform more testing than with previous versions. For smaller organisations that have relied on Group Policy previously Office deployment can still be achieved, however perhaps it's time to look into something a little more flexible. What I've seen of [System Centre Essentials](http://www.microsoft.com/systemcenter/sce/default.mspx) so far is pretty impressive and I think it's just the tool for small organisations. Hopefully I've given you enough here to get your Office deployment started. I'd be interested in hearing how others are going with their own deployments.

Microsoft have recently blogged about [Office 2007 deployment via Group Policy](http://blogs.technet.com/office_resource_kit/archive/2008/06/06/how-to-deploy-office-2007-by-using-group-policy-to-assign-startup-scripts.aspx), which is worth checking out too.
