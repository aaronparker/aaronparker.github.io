---
id: 110
title: Installing Microsoft Update Standalone Packages Silently
date: 2007-01-30T17:22:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/installing-microsoft-update-standalone-packages-silently
permalink: /installing-microsoft-update-standalone-packages-silently/
dsq_thread_id:
  - "195378759"
categories:
  - Automation
---
<img border="0" align="right" src="http://stealthpuppy.com/wp-content/uploads/2007/01/1000.14.770.UpdatePackage.png" hspace="4" />I can find very little information on the Update Standalone Packages on the Microsoft site, with [this knowledgebase article](http://support.microsoft.com/kb/928636) being it. What I do know about them is that they use a .MSU file extenstion and they display a dialog box similar to the Windows Update install dialog when installing.

As they use the same switches as the existing Microsoft updates, installing them silently is very straightforward. They are processed by a command named WUSA.EXE (Windows Update Standalone Installer), so a command-line would look like this:

<p class="console">
  START /WAIT WUSA Windows6.0-KB928439-x86.msu /QUIET /NORESTART
</p>

or

<p class="console">
  START /WAIT Windows6.0-KB928439-x86.msu /QUIET /NORESTART
</p>

You can run the WUSA command with /? to see a dialog box detailing the complete help text:

> wusa </? | /h | /help>
> 
> wusa <update> \[/quiet\] \[/norestart\]
> 
> /?, /h, /help &#8211; Display help information.
> 
> update &#8211; Full path of the MSU file.
> 
> /quiet &#8211; Quiet mode, no user interaction. reboot as needed
> 
> /norestart &#8211; When combined with /quiet, installer will NOT initiate reboot. It is ignored if it is used alone