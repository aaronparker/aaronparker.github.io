---
id: 350
title: Prevent Terminal Server Help From Displaying At Logon
date: 2007-10-01T14:20:13+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/terminal-server/prevent-terminal-server-help-from-displaying-at-logon
permalink: /prevent-terminal-server-help-from-displaying-at-logon/
dsq_thread_id:
  - "195379461"
categories:
  - Microsoft
---
<p style="text-align: center">
  <img src="http://stealthpuppy.com/wp-content/uploads/2007/10/terminalserverhelp.png" alt="terminalserverhelp.png" />
</p>

If it's the 834th time you've seen the Terminal Server help file open after you've enabled Terminal Server and you would like to stop this from happening in your automated builds, just delete this registry value before anyone logs onto the box (i.e. via CMDLINES.TXT or SysPrep):

`HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run\TerminalServerInstalled`