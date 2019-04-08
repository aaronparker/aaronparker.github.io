---
id: 57
title: Files Not Moved to the Recycle Bin?
date: 2007-04-23T06:51:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/files-not-moved-to-the-recycle-bin
permalink: /files-not-moved-to-the-recycle-bin/
categories:
  - Automation
tags:
  - Terminal Server
---
On our internal Terminal Servers the CEO has been having an issue whereby files or folders are not sent to the Recycle Bin, rather they are immediately deleted. If you logon with administrative rights on the machine, you can send files to the Recycle Bin. To date, he'd been told that this would be fixed once we move to some new boxes (which I did last week). Unfortunately the problem also exists on the new Terminal Servers which I only found out after the CEO pointed the problem out to me (luckily he's a pretty understanding guy).

So where do you start troubleshooting a problem like this? Well this is where my crusade for scripting everything has come in handy. Because I can go back through the unattended build for the Terminal Servers I can see exactly what happens during the build process and I came across a file system rights issue.

If you've ever administered Terminal Servers (or desktops for that matter) you will have seen that on occasion the root of the system partition can collect user files. How users can do this I don't know, but they able to write to this location because the default permissions allow CREATOR OWNER write access. When I build Terminal Servers I like to restrict these permissions and run a command during the build to give users read-only access:

[code]CACLS %SystemDrive%\ /E /R "CREATOR OWNER" Users /P Everyone:R[/code]

This helps to keep the file system clean but does have side effects such as applications failing to write (why are they writing there in the first place?) or users can't send object to the recycle bin (I've learnt my lesson now).

It turns out that the Recycle Bin folder (C:\RECYCLER on Windows XP/2003) is not created until the first user sends an object to the Recycle Bin. Of course on a system where I've restricted user access to the System partition, this will fail. If you run Process Monitor you'll see an ACCESS DENIED result when the user attempts to delete an object. So how do we fix this? In my script I've added a command that creates the RECYCLER folder before the permissions are modified, thus giving users the rights to create their own Recycle Bin folder within C:\RECYCLER:

[code]MD %SystemDrive%\RECYCLER  
ATTRIB %SystemDrive%\RECYCLER +S +H  
CACLS %SystemDrive%\ /E /R "CREATOR OWNER" Users /P Everyone:R[/code]

On an existing system I needed to recreate the default permissions. This is not a simple as breaking out CACLS though; first I needed to find the SDDL ([Security Descriptor Definition Language](http://msdn2.microsoft.com/en-us/library/aa379567.aspx)) [syntax](http://www.washington.edu/computing/support/windows/UWdomains/SDDL.html) for the permissions, which I did with [SETACL](http://setacl.sourceforge.net/). Then I can run the following commands to restore the defaults to the RECYCLER folder:

[code]C:\CACLS %SYSTEMDRIVE%\RECYCLER /E /R EVERYONE  
C:\CACLS %SYSTEMDRIVE%\RECYCLER /S:"O:BAG:DUD:(A;OICI;FA;;;BA)(A;OICI;FA;;;SY)(A;;FA;;;BA)(A;OICIIO;GA;;;CO)(A;OICI;0x1200a9;;;BU)(A;CI;LC;;;BU)(A;CI;DC;;;BU)"[/code]