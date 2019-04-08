---
id: 427
title: Addressing Licensing Issues With Adobe CS3 Apps On SoftGrid
date: 2008-01-24T00:30:38+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/addressing-licensing-issues-with-adobe-cs3-apps-on-softgrid
permalink: /addressing-licensing-issues-with-adobe-cs3-apps-on-softgrid/
dsq_thread_id:
  - "195380018"
categories:
  - Applications
tags:
  - Adobe
  - SoftGrid
---
Adobe uses [Macrovision FLEXnet](http://www.macrovision.com/products/1156.htm?link_id=topnav) to enforce licensing for their applications. This is a service that is installed when you install any of the CS3 applications and will start when you launch a CS3 application. This licensing tool is installed even if you are using volume license media.

In a MAV environment this service can be successfully virtualised, however you may encounter issues when running multiple CS3 applications in separate MAV environments (or bubbles). Running more than one CS3 application at a time (either on a single desktop or in a Terminal Server environment) will result in the following licensing errors and the application will exit:

> The licensing subsystem has failed catastrophically. You must reinstall or call customer support.

<img border="0" width="483" src="http://stealthpuppy.com/wp-content/uploads/2008/01/licensing-error2.png" alt="Licensing Error" height="100" style="border-width: 0px" /> 

> You cannot use this product at this time. You must repair the problem by uninstalling and then reinstalling this product or contacting your IT administrator or Adobe customer support for help.

[<img border="0" width="777" src="http://stealthpuppy.com/wp-content/uploads/2008/01/licensing-error-thumb1.png" alt="Licensing Error" height="113" style="border-width: 0px" />](http://stealthpuppy.com/wp-content/uploads/2008/01/licensing-error3.png)

Fortunately the FLEXnet Licensing service only needs to run when the application starts - you can subsequently stop the service and the application will continue to run. With a script we can stop this service to get more than one CS3 application running.

Originally I had attempted using WMI to detect the state of the service, wait for it to start and then stop it. However, the virtual services are not detectable via WMI so I&#8217;ve had to resort to something a little more crude. This script reads the output from a NET START command until the FLEXnet service starts and then stops the service. It&#8217;s not a robust script by any means but it gets the job done.

[code lang=&#8221;vb&#8221;]Dim WshShell, oExec  
Set WshShell = CreateObject("WScript.Shell")  
Do While True  
Set oExec = WshShell.Exec("NET START")  
Do While oExec.Status <> 1  
WScript.Sleep 100  
Loop  
If InStr(oExec.StdOut.ReadAll, "FLEXnet Licensing Service") <> 0 Then Exit Do  
WScript.Sleep 5000  
Loop  
WScript.Sleep 3000  
Set oExec = WshShell.Exec("NET STOP /YES " & Chr(34) & "FLEXnet Licensing Service" & Chr(34))  
Do While oExec.Status <> 1  
WScript.Sleep 100  
Loop  
[/code]

Run the script by adding a POST LAUNCH script event in the OSD file:

[code lang=&#8221;xml&#8221;]<SCRIPT EVENT="LAUNCH" TIMING="POST" PROTECT="TRUE" WAIT="FALSE" TIMEOUT="0">  
<HREF>CMDOW.EXE /RUN /HID CSCRIPT //NOLOGO \\SERVER\Scripts\StopFLEXnet.VBS</HREF>  
</SCRIPT>[/code]

I&#8217;m using [CMDOW](http://www.commandline.co.uk/cmdow/) here to hide the command window that users will see every few seconds. Unfortunately this method is a little clunky, but if you have a better suggest please let me know.