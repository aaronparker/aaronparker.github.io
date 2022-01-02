---

title: Installing Microsoft Update Standalone Packages Silently
date: 2007-01-30T17:22:00+10:00
author: Aaron Parker
layout: post

permalink: /installing-microsoft-update-standalone-packages-silently/
dsq_thread_id:
  - "195378759"
categories:
  - Automation
---
![]({{site.baseurl}}/media/2007/01/1000.14.770.UpdatePackage.png)

I can find very little information on the Update Standalone Packages on the Microsoft site, with [this knowledgebase article](http://support.microsoft.com/kb/928636) being it. What I do know about them is that they use a .MSU file extension and they display a dialog box similar to the Windows Update install dialog when installing.

As they use the same switches as the existing Microsoft updates, installing them silently is very straightforward. They are processed by a command named `WUSA.EXE` (Windows Update Standalone Installer), so a command-line would look like this:

```
START /WAIT WUSA Windows6.0-KB928439-x86.msu /QUIET /NORESTART
```

or

```
START /WAIT Windows6.0-KB928439-x86.msu /QUIET /NORESTART
```

You can run the WUSA command with /? to see a dialog box detailing the complete help text:

```
wusa </? | /h | /help>

wusa <update> \[/quiet\] \[/norestart\]

/?, /h, /help - Display help information.

update - Full path of the MSU file.

/quiet - Quiet mode, no user interaction. reboot as needed

/norestart - When combined with /quiet, installer will NOT initiate reboot. It is ignored if it is used alone
```
