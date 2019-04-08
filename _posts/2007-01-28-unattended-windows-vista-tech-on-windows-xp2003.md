---
id: 113
title: Unattended Windows Vista tech. on Windows XP/2003
date: 2007-01-28T00:05:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/unattended-windows-vista-tech-on-windows-xp2003
permalink: /unattended-windows-vista-tech-on-windows-xp2003/
dsq_thread_id:
  - "195378786"
categories:
  - Automation
tags:
  - Internet-Explorer
  - Unattended
  - Windows-Media-Player
  - Windows-Vista
---
**UPDATE** (09/12/2007): Updated with the list of applications and components listed here: [Windows Vista components available for Windows XP](http://stealthpuppy.com/windows/windows-vista-components-available-for-windows-xp).

With Microsoft releasing a number of applications developed for Windows Vista also available for Windows XP, I've put together a quick &#8216;how to' guide for performing an unattended install for each application.

  * Windows Internet Explorer 7 [ [Windows XP 32-bit](http://download.microsoft.com/download/3/8/8/38889dc1-848c-4bf2-8335-86c573ad86d9/IE7-WindowsXP-x86-enu.exe) | [Windows Server 2003 32-bit](http://download.microsoft.com/download/d/1/3/d1346f12-f3a0-4ac6-8f5c-2bea2a184957/IE7-WindowsServer2003-x86-enu.exe) ]
  * Windows Media Player 11 [ [Windows XP 32-bit](http://download.microsoft.com/download/0/9/5/0953e553-3bb6-44b1-8973-106f1b7e5049/wmp11-windowsxp-x86-enu.exe) ]
  * Windows Defender 1.1 [ [Windows XP / Server 2003 32-bit](http://download.microsoft.com/download/e/d/0/ed099d5e-dc60-4740-8747-1c72f053b800/WindowsDefender.msi) ]
  * Microsoft .NET Framework 3.0 [ [Windows XP / Server 2003 32-bit](http://go.microsoft.com/fwlink/?LinkId=70848) ]
  * Windows Desktop Search 3.01 [ [Windows XP 32-bit](http://www.microsoft.com/downloads/info.aspx?na=90&p=&SrcDisplayLang=en&SrcCategoryId=&SrcFamilyId=738fc2de-49b9-4e69-9227-2206277ab7c9&u=http%3a%2f%2fdownload.microsoft.com%2fdownload%2f9%2fb%2fd%2f9bd9c91f-7a74-4084-9198-49d2cfab7947%2fWindowsDesktopSearch-KB917013-V301-XP-x86-enu.exe) | [Windows Server 2003 32-bit](http://www.microsoft.com/downloads/info.aspx?na=90&p=&SrcDisplayLang=en&SrcCategoryId=&SrcFamilyId=0e0423b4-d396-4986-a1bb-793122fcc65d&u=http%3a%2f%2fdownload.microsoft.com%2fdownload%2fa%2f9%2f0%2fa904410d-f3ed-4422-97b3-f5cff7c1eecc%2fWindowsDesktopSearch-KB917013-V301-Srv2K3-x86-enu.exe) ]
  * Remote Desktop Connection 6.0 [ [Windows XP 32-bit](http://download.microsoft.com/download/7/0/9/709358f0-4d6e-4d0d-bd41-9dde83446fed/WindowsXP-KB925876-x86-ENU.exe) | [Windows Server 2003 32-bit](http://download.microsoft.com/download/8/8/7/8879aabf-6352-4ffe-a65a-11b3f70eb6eb/WindowsServer2003-KB925876-x86-ENU.exe) ]
  * Link Layer Topology Discovery (LLTD) Responder [ [Windows XP 32-bit](http://download.microsoft.com/download/0/5/f/05fc30db-e7af-4488-a3a8-23999328e4bd/WindowsXP-KB922120-v5-x86-ENU.exe) ]

The approach I've taken here are direct command lines for installing these applications as you would do with a custom Windows CD or installing after Windows is installed on the computer. You could fit these installs to tools such as Microsoft SMS or Altiris Deployment Solution. If you deploy via Group Policy then you'll have to take a different approach.

Here's a breakdown for each application including the command line you need to use for an unattended or silent install. I have the Windows XP version executables listed, so for Windows Server 2003 you will have to adjust the file names.

### Windows Internet Explorer 7

Internet Explorer can be installed during Windows Setup via [CMDLINES.TXT](http://www.microsoft.com/technet/technetmag/issues/2006/05/TechniquesForSimp/default.aspx). This will ensure that the latest version of IE is installed as soon as Windows setup is complete from a clean install. This command will stop the setup program from downloading updates during install and will display a dialog box with a progress bar. You can also add the /NO-DEFAULT switch to prevent setup from making Internet Explorer the default web browser. You can get a full list of command line switches by running IE7-WindowsXP-x86-enu.EXE /?.

[code]START /WAIT IE7-WindowsXP-x86-enu.EXE /PASSIVE /NORESTART /UPDATE-NO [/code]

### Windows Media Player 11

This application is for Windows XP only, but then who needs WMP 11 on their Terminal Server? Unlike Internet Explorer, I've not been able to get Windows Media Player to install via CMDLINES.TXT. This command will install Windows Media Player without you seeing any install user interface during setup.

[code]START /WAIT wmp11-windowsxp-x86-enu.exe /Q:A /C:"SETUP_WM.EXE /Q:A /R:N /P:#e" [/code]

### Windows Defender 1.1

This command line will install Windows Defender silently prevent Windows Defender from running after setup is complete.

[code]START /WAIT MSIEXEC /I WindowsDefender.MSI ALLUSERS=TRUE REBOOT=SUPRESS CHECK_WGA=0 LAUNCHPROGRAM=0 LAUNCHSCAN=0 /QB- [/code]

### Microsoft .NET Framework 3.0

The .NET Framework 3.0 includes the .NET Framework 2.0 so you do not have to install that version separately. You will see a dialog with a progress bar during install.

[code]START /WAIT dotnetfx3.EXE /PASSIVE /NORESTART [/code]

### Windows Desktop Search 3.01

The Windows Desktop Search setup application will accept the /PASSIVE switch so that a progress bar is displayed during setup, but the /QUIET switch is required to prevent setup from displaying an &#8216;Install Complete' dialog once finished.

[code]START /WAIT WindowsDesktopSearch-KB917013-V301-XP-x86-enu.exe /QUIET /NORESTART [/code]

### Remote Desktop Connection 6.0

Like Internet Explorer this application can be deployed via CMDLINES.TXT using a custom Windows setup source.

[code]START /WAIT WindowsXP-KB925876-x86-ENU.EXE /PASSIVE /NORESTART [/code]

### Link Layer Topology Discovery (LLTD) Responder

The LLTD Responder will install via CMDLINES.TXT. Here's a description of what the [LLTD Responder](http://support.microsoft.com/?kbid=922120) is from the Microsoft web site:

> The network map on a computer running Windows Vista shows a graphical view of the computers and devices on your network and how they are connected by using the LLTD protocol. The LLTD responder must be installed on a computer running Windows XP before it can be detected and appear on the network map.

[code]START /WAIT WindowsXP-KB922120-v5-x86-ENU.exe /PASSIVE /NORESTART[/code]

### Full List

I've updated this script with the applications listed [here](http://stealthpuppy.com/windows/windows-vista-components-available-for-windows-xp). Windows Installer 3.1 is a requirement for installing .NET Framework 3.5.

[code]@ECHO OFF  
REM Windows Installer 3.1  
START /WAIT WindowsInstaller-KB893803-v2-x86.EXE /PASSIVE /NORESTART

REM Microsoft Core XML Services 6.0  
START /WAIT MSIEXEC /I MSXML6.MSI ALLUSERS=TRUE REBOOT=SUPPRESS /QB

REM Internet Explorer 7  
START /WAIT IE7-WindowsXP-x86-enu.EXE /PASSIVE /NORESTART /UPDATE-NO

REM Windows Media Player 11  
START /WAIT wmp11-windowsxp-x86-enu.EXE /Q:A /C:"SETUP_WM.EXE /Q:A /R:N /P:#e"

REM Windows Defender 1.1  
START /WAIT MSIEXEC /I WindowsDefender.MSI ALLUSERS=TRUE REBOOT=SUPRESS CHECK_WGA=0 LAUNCHPROGRAM=0 LAUNCHSCAN=0 /QB-

REM .NET Framework 3.5  
START /WAIT dotnetfx35.EXE /PASSIVE /NORESTART

REM Windows Desktop Search 3.01  
START /WAIT WindowsDesktopSearch-KB917013-V301-XP-x86-enu.EXE /QUIET /NORESTART

REM Remote Desktop Connection 6.0  
START /WAIT WindowsXP-KB925876-x86-ENU.EXE /PASSIVE /NORESTART

REM LLTD Responder  
START /WAIT WindowsXP-KB922120-v5-x86-ENU.EXE /PASSIVE /NORESTART

REM Image Mastering API  
START /WAIT WindowsXP-KB932716-x86-ENU.EXE /PASSIVE /NORESTART

REM Microsoft Management Console 3.0  
START /WAIT WindowsXP-KB907265-x86-ENU.EXE /PASSIVE /NORESTART

REM Windows Script 5.7  
START /WAIT scriptenXP.exe /PASSIVE /NORESTART

REM Windows PowerShell 1.0  
START /WAIT WindowsXP-KB926139-x86-ENU.EXE /PASSIVE /NORESTART

REM XPS Essentials Pack  
START /WAIT MSIEXEC /I "XPSEP XP and Server 2003 32 bit.MSI" ALLUSERS=TRUE REBOOT=SUPRESS /QB

REM Peer Name Resolution Protocol (PNRP) version 2.0  
START /WAIT WindowsXP-KB920342-x86-ENU.EXE /PASSIVE /NORESTART

REM Silverlight 1.0  
START /WAIT SILVERLIGHT.EXE /Q

REM Network Diagnostic Tool  
START /WAIT WindowsXP-KB914440-v12-x86-ENU.EXE /PASSIVE /NORESTART

REM WS-Management v1.1  
START /WAIT WindowsXP-KB936059-x86-ENU.EXE /PASSIVE /NORESTART

REM Windows Rights Management Services Client with Service Pack 1  
START /WAIT WindowsRightsManagementServicesSP1-KB839178-Client-ENU.EXE /PASSIVE /NORESTART[/code]