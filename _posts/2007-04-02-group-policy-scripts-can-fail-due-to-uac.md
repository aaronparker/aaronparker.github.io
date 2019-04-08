---
id: 72
title: Group Policy Scripts can fail due to UAC
date: 2007-04-02T22:57:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/group-policy-scripts-can-fail-due-to-uac
permalink: /group-policy-scripts-can-fail-due-to-uac/
dsq_thread_id:
  - "195378551"
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
categories:
  - Microsoft
tags:
  - Group Policy
  - Windows-Vista
---
If you are starting to deploy Windows Vista you may have noticed that any user who has administrative access to their workstation will not receive mapped drives or printers. This is due to the new privilege model introduced in Windows Vista with [User Account Control](http://technet.microsoft.com/en-us/windowsvista/aa905117.aspx).

Microsoft has a complete explanation of why this behaviour with Group Policy scripts occurs at the TechNet site - [Deploying Group Policy Using Windows Vista](http://technet2.microsoft.com/WindowsVista/en/library/5ae8da2a-878e-48db-a3c1-4be6ac7cf7631033.mspx?mfr=true). Just over half way down the page you&#8217;ll find a section titled &#8216;**Group Policy Scripts can fail due to User Account Control**&#8216;, however here&#8217;s a quote from that page that summarises the issue:

> When the administrative user logs on, Windows processes the logon scripts using the elevated token. The script actually works and maps the drive. However, Windows blocks the view of the mapped network drives because the desktop uses the limited token while the drives were mapped using the elevated token.

So what do we do to get around this? There are a few different methods:

  1. Don&#8217;t add users to the local Administrators group on the workstation
  2. Detect Windows Vista and create a scheduled task to run a logon script via Task Scheduler
  3. Disable User Account Control

My first recommendation, don&#8217;t add users to the local Administrators group, is the best way forward. By not adding users to the local Administrators group, the user will never have an administrative token and the logon script runs at the same elevation level as Windows Explorer. This way you don&#8217;t need to make any script changes and you are in the best position for [protecting your machines against malware](http://www.microsoft.com/technet/windowsvista/security/defend_against_malware.mspx).

If this method is not for you, then you will have to follow the instructions listed in the [Deploying Group Policy Using Windows Vista](http://technet2.microsoft.com/WindowsVista/en/library/5ae8da2a-878e-48db-a3c1-4be6ac7cf7631033.mspx?mfr=true) article and run a logon script using the task scheduler. To do this you will have to detect the presence of Windows Vista and then use [LaunchApp.WSF](http://www.stealthpuppy.com/blogs/travelling/pages/launchapp-wsf.aspx) to create a scheduled task to run the actual logon script.

I think the easiest way is to use a [WMI Filter](http://technet2.microsoft.com/WindowsServer/en/library/6237b9b2-4a21-425e-8976-2065d28b31471033.mspx) to ensure a Group Policy runs only on Windows Vista. This will require two separate Group Policy objects - one GPO used for Windows Server 2003 and below and another for Windows Vista and above. The WMI Filters would then look like this:

Windows Server 2003 and below:

[code]Select * from Win32_OperatingSystem where BuildNumber < "6000"[/code]

Windows Vista and above:

[code]Select * from Win32_OperatingSystem where BuildNumber >= "6000"[/code]

Another method would be to detect the operating system version as a part of a script and then launch specific logon scripts depending on what operating system is detected. Here&#8217;s a VBscript that will do this for you:

[code]Dim wshShell  
Set wshShell = CreateObject("WScript.Shell")  
If IsVista Then  
runVistaStyle  
Else  
runNormalStyle  
End If

Sub runVistaStyle()  
wshShell.Run("cscript \[path\_to\_launchapp.wsf\] \[path\_to\_userlogin_script\]")  
End Sub

Sub runNormalStyle()  
wshShell.Run("[path\_to\_userlogin_script]")  
End Sub

Function IsVista()  
strComputer = "."  
Set objWMIService = GetObject("winmgmts:" & "{impersonationLevel=impersonate}!\\" & strComputer & "\root\cimv2")  
Set colOSes = objWMIService.ExecQuery("Select * from Win32_OperatingSystem")  
For Each objOS in colOSes  
BuildNumber = objOS.BuildNumber  
Next  
If BuildNumber >= 6000 Then  
IsVista = True  
Else  
IsVista = False  
End If  
End Function[/code]

Lastly you have the option to [disable User Account Control](http://www.google.com/search?q=disable+User+Account+Control+&rls=com.microsoft:en-AU&ie=UTF-8&oe=UTF-8&startIndex=&startPage=1) completely; however **I do not recommend this at all** and as it&#8217;s a topic all of it&#8217;s own, I&#8217;m not going into the how or why of this option here.

**UPDATE**: [Josh points out](http://windowsconnected.com/blogs/joshs_blog/archive/2007/02/20/windows-vista-tip-enabledlinkedconnections.aspx) you can add the following key to the registry as a work around, however it is not supported by Microsoft:

HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System  
EnableLinkedConnections = 1 (DWord)

I still recommend your best option is not to make users administrators of their machines.