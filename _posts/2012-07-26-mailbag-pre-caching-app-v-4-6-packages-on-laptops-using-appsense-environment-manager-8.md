---
id: 2795
title: 'Mailbag - Pre-caching App-V 4.6 packages on Laptops using AppSense Environment Manager 8'
date: 2012-07-26T22:46:47+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2795
permalink: /mailbag-pre-caching-app-v-4-6-packages-on-laptops-using-appsense-environment-manager-8/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "781279597"
categories:
  - Applications
tags:
  - App-V
  - AppSense
---
<img class="size-full wp-image-2631 alignnone" title="Mail Bag" src="{{site.baseurl}}/media/2012/02/Mail-Bag.png" alt="Mail Bag" width="128" height="128" />

[Rory](https://twitter.com/Rorymon) [asks via Twitter](https://twitter.com/Rorymon/status/228536440403931136) - can we pre-cache App-V packages on laptop clients so that all applications are available offline, using [AppSense Environment Manager](http://www.appsense.com/policy-and-governance)?:

<p style="text-align: center;">
  <img class="size-full wp-image-2796 aligncenter" title="Rory Asks" src="{{site.baseurl}}/media/2012/07/RoryAsks.png" alt="Rory Asks" width="519" height="138" srcset="{{site.baseurl}}/media/2012/07/RoryAsks.png 519w, {{site.baseurl}}/media/2012/07/RoryAsks-150x39.png 150w, {{site.baseurl}}/media/2012/07/RoryAsks-300x79.png 300w" sizes="(max-width: 519px) 100vw, 519px" />
</p>

<p style="text-align: left;">
  As with many solutions in Environment Manager, there's probably a number of ways to achieve this - here's just one.
</p>

# The Logic

<p style="text-align: left;">
  In Rory's scenario, he's using the App-V Management Server to deliver packages. This means that packages are delivered to users only and not to the client (i.e. globally). First up we'll need to work out what we're trying to achieve here:
</p>

  * Is the client a laptop?
  * How do we determine whether the laptop can contact the streaming source?
  * How to cache all of the packages to the client?
  * We'll most likely also need to ensure that the pre-caching doesn't run too often or doesn't run over a VPN connection

Determining whether the local machine is a laptop is quite simple, but we'll need to resort to some custom code to that. Fortunately we don't need to re-invent the wheel - we can use this code by [Rob van der Woude](http://www.robvanderwoude.com/) that [uses WMI to look for a battery](http://www.robvanderwoude.com/vbstech_inventory_laptop.php):

[code language="vb"]If IsLaptop( "." ) Then  
' WScript.Echo "Laptop"  
' Return Success  
WScript.Quit 0  
Else  
' WScript.Echo "Desktop or server"  
' Return failure  
WScript.Quit 1  
End If

Function IsLaptop(myComputer)  
' This Function checks if a computer has a battery pack.  
' Argument: myComputer [string] name of the computer to check, or "." for the local computer  
' Written by Rob van der Woude  
' http://www.robvanderwoude.com  
On Error Resume Next  
Set objWMIService = GetObject( "winmgmts://" & myComputer & "/root/cimv2" )  
Set colItems = objWMIService.ExecQuery( "Select * from Win32_Battery", , 48 )  
IsLaptop = False  
For Each objItem in colItems  
IsLaptop = True  
Next  
If Err Then Err.Clear  
On Error Goto 0  
End Function[/code]

Add this to a **Reusable Condition** (or even an inline condition if you'd like) that includes this code as a Custom Condition. Make sure to set the Custom Condition **Type** to VBscript and enable 'Evaluate Once Per Session' and 'Run As System User'.

Next up, you may want determine whether the client can contact the streaming source (what ever that is - App-V Management Server, App-V Streaming Server, HTTP or even a UNC path).  You could use native **Computer IP Address** condition and make the assumption that the remote host is available because the client is located in a known network, or [ping the remote host using PowerShell](http://blogs.technet.com/b/heyscriptingguy/archive/2012/02/24/use-powershell-to-test-connectivity-on-remote-servers.aspx) in a **Custom Condition**. Alternatively an Active Directory Site Membership might suffice, however this may require listing all of your AD sites which isn't ideal.

For a Computer IP Address condition, choose Condition / Computer / Computer IP Address and configure the required IP range. Ensure that 'Evaluate Once Per Session' is **disabled** - because the client IP address may change during a single session. Repeat this for multiple IP ranges.

To use a PowerShell script instead, create a Custom Condition, set the **Type** to PowerShell, _disable_ 'Evaluate Once Per Session' and set 'Run As System User'.

[code language="ps"]$servers = "appv1.domain.local"  
If (!(Test-Connection -Cn $server -BufferSize 16 -Count 1 -ea 0 -quiet))  
{  
exit 0  
Else  
exit 1  
}[/code]

Now that we know the client is a laptop and we know that it can contact the streaming source, we can run the command to cache the applications. You'll need an Execute Action to run this command:

[code]"%ProgramFiles%\Microsoft Application Virtualization Client\SFTTRAY.exe" /HIDE /LOADALL[/code]

This will load all packages and ensure that the progress bar is not shown.

<p align="center">
  <a href="{{site.baseurl}}/media/2012/07/Run-SFTTRAY.png"><img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="Run-SFTTRAY" src="{{site.baseurl}}/media/2012/07/Run-SFTTRAY_thumb.png" alt="Run-SFTTRAY" width="660" height="500" border="0" /></a>
</p>

If you are publishing packages to users, configure this action to run in the current user's context. If you are delivering packages globally and using a streaming source, configure this action to run in the System context.

# Implementing

To put this into action, we'll need to think about when to run the SFTTRAY command. User Logon might be an obvious choice, but this could potentially slow down the logon process; however we do need run the action not long after logon because we can't run it before the user disconnects the machine or logs off (running the action at logoff, would delay logoff). There are a number of ways we can run the SFTTRAY action:

  * At User Process Started for _%ProgramFiles%\Microsoft Application Virtualization Client\sftdcc.exe_ launches - this will run at logon, but the logon process should be mostly complete by this time
  * At Network Connected - we have an opportunity to cache packages when connecting back to the corporate network if the laptop is resuming from sleep mode
  * Session Locked - this is a great time to cache packages because the user is not interacting with the desktop

I've included a sample configuration below that uses each of these approaches by applying the logic in a Reusable Node linked to each of the triggers listed above.

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="Pre-cacheConfig" src="{{site.baseurl}}/media/2012/07/Pre-cacheConfig_thumb.png" alt="Pre-cacheConfig]({{site.baseurl}}/media/2012/07/Pre-cacheConfig.png)

Download the configuration shown above from here:

<p class="important">
  [download id="57&#8243; format="1&#8243;]
</p>