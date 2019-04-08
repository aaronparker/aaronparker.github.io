---
id: 209
title: Juggling Java VMs
date: 2006-08-25T05:48:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/juggling-java-vms
permalink: /juggling-java-vms/
dsq_thread_id:
  - "195378947"
categories:
  - Citrix
tags:
  - Java
  - Presentation-Server
  - Terminal Server
---
I've just spent yesterday and today working on a site where the client had a need to run both the Microsoft Java VM and the Sun Java VM on their Terminal Servers. (The Microsoft Java VM is used for one site only, yes developers strike again). I was pretty happy when I was able to use Presentation Server 4.0 and Application Isolation Environments to get these to work on the same server, in Internet Explorer, at the same time. Here's how:

**1**. Install the Microsoft Java VM to the Terminal Server and then install the latest [Sun Java Runtime Environment](http://www.java.com/en/download/manual.jsp) and ensure that Internet Explorer is configured to this as the default (This is a machine level setting).

**2**. Create an Isolation Environment to hold an instance of Internet Explorer. Check out this document on the Citrix Knowledgebase, which describes how to _associate_ Internet Explorer with an Isolation Environment. This applys to Windows Server 2003 as well.

[How to install Internet Explorer (IE) 6 into an isolation environment on Windows 2000](http://support.citrix.com/kb/click.jspa?categoryID=618&externalID=CTX106085&searchID=-1)

**3**. Add the following registry entry to the Isolation Environment (change the version number to the version of the Sun Java VM you have installed and used by Internet Explorer)

[code]Windows Registry Editor Version 5.00  
[HKEY\_LOCAL\_MACHINE\SOFTWARE\JavaSoft\Java Plug-in\1.5.0_04]  
"UseJava2IExplorer"=dword:00000000[/code]

Install the registry entry by placing this into a .REG file and import via

[code]AIESETUP /W /N "Microsoft Java VM" REGEDIT /S SunJava-Off.REG[/code]

Where &#8220;Microsoft Java VM&#8221; is the name of the Isolation Environment and SunJava-Off.REG is the name of the registry file.

**4**. Create a new published application instance of Internet Explorer. In my case, because it was for one site only, I specified the URL after IEXPLORE.EXE and labled the published application to reflect the web site.

**5**. Associate this published application with the Isolation Environment.

**6**. Test and voila! The Sun Java VM as the default and the Microsoft Java VM only for those sites that require it. Of course there will be some user training involved but the solution works. My next step is to take this a little further and add registry settings to remove the address bar and toolbar so that users won't be tempted to navigate to other sites in the published instance.

The only issue I found with this approach is that when launching the published application there is a 2 minute (yes, 2 minute) delay before Internet Explorer launches (you will see the AIERUN window displayed in the mean time). I'll update this post if I find the reason. I don't think that this document gives a suitable explaination:

[Application launch performance is slower when applications are launched into an isolation environment](http://support.citrix.com/kb/click.jspa?categoryID=618&externalID=CTX106618&searchID=7426930)