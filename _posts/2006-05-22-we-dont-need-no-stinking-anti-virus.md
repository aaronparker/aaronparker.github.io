---
id: 275
title: 'We Don't Need No Stinking Anti-Virus'
date: 2006-05-22T23:22:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/we-dont-need-no-stinking-anti-virus
permalink: /we-dont-need-no-stinking-anti-virus/
categories:
  - Microsoft
---
I've recently had conversations about running anti-virus software on some specialised servers. Specifically Windows Servers running ISA Server 2004 or VMware Server (or Virtual Server). The argument for installing anti-virus software on these servers is to ensure they are protected against viruses and worms. I've been arguing against installing anti-virus software to ensure maximum performance. The reasons I have argued against are the following:

  1. The server should utilise a known, good configuration. That is, a scripted build so that installation can be repeated or easily documented, and good change management;
  2. Other than services, code should not be executed on the server. The administrator should never browse the Internet on the server, for example;
  3. A patch managment process should be in place to keep the operating system and applications current;
  4. A host-based firewall should be implemented (ISA Server 2004 firewalls all interfaces). Firewall rules should be stringent, only allowing trusted traffic to the host;
  5. Management of the servers should be performed remotely with the administration tools installed on an administrators workstation. It could be argued, however, that for ISA Server, perhaps only allowing RDP inbound would be more secure.

I don't run anti-virus software on my home machine - I actually haven't done for about two years. It comes down to how the machine is used:

  * The Windows XP host-based firewall is enabled;
  * The machine is patched and applications are kept up-to-date as well;
  * I use a second copy of Windows XP in a VM to test software and control what is installed on the host;
  * E-mail is scanned before being downloaded locally.

The point is controlling what can run rather than attempting to control what cannot run. Apparently this is the way the original version of Norton AntiVirus worked, until they found there was more money in definition updates. Windows XP and Windows Server 2003 include [Software Restriction Policy](http://technet2.microsoft.com/WindowsServer/en/Library/90b75a83-bca7-4871-a661-d67eafcfd86c1033.mspx) that can be used to define what software can run on a system. This is not a new concept, but it make far more sense than, in this age of 0 day exploits, ensuring definitions are up-to-date.

Software Restriction Policy can be a challenge to implement in complex scenarios, however there are a number of third party tools available, including [AppSense Application Manager](http://www.appsense.com/default.asp) (excellent gear) and [DesktopStandard PolicyMaker Application Security](http://www.desktopstandard.com/PolicyMakerApplicationSecurity.aspx) (haven't tested this tool yet). I've also come across [Core Force](http://force.coresecurity.com/). This tool is free but only for the technically advanced.  
