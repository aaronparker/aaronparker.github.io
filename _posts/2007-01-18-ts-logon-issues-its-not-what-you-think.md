---
id: 120
title: "TS Logon Issues? It's Not What You Think"
date: 2007-01-18T02:32:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/ts-logon-issues-its-not-what-you-think
permalink: /ts-logon-issues-its-not-what-you-think/
categories:
  - Microsoft
tags:
  - Terminal Server
---
Every six to eight months or so, I have an issue logging onto a Terminal Server and then have to research the issue each time from scratch because I can't remember how I fixed it. Here's how it starts - after logging onto a Terminal Server I receive the following helpful error message:

> To log on to this computer, you must have Terminal Server User Access permissions on this computer. By default, members of the Remote Desktop Users group have these permissions. If you are not a member of the Remote Desktop User group or another group that has these permissions, or if the Remote Desktop User group does not have these permissions, you must be granted these permissions manually.

After troubleshooting by checking and double checking that the account I am using has the correct privileges to login remotely, I realise that I can still login to the console via MSTSC /CONSOLE. Sounds like licensing, so sure enough in the System log; an event with ID 1010 from source TermService is logged:

> The terminal server could not locate a license server. Confirm that all license servers on the network are registered in WINS/DNS, accepting network requests, and the Terminal Server Licensing Service is running.

Fixing the licensing issue fixes the logon issue and I can logon to the server remotely, but I've still wasted a 1/2 hour troubleshooting because the original error message lead me in a wrong direction. Surely Windows could present a dialog detailing the correct problem rather than something else completely, especially given that it logs a licensing related event at the same time.

The Citrix support site has detailed documents on troubleshooting Terminal Server logon issues, far better than anything I could find on the Microsoft support site:

  * [CTX106920 - Error: You do not have access to logon to this Session....](http://support.citrix.com/article/CTX106920)
  * [CTX564283 - Troubleshooting 1003 and 1004 Terminal Server Licensing Errors](http://support.citrix.com/article/CTX564283)
