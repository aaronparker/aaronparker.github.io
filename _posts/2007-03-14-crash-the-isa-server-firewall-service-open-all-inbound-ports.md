---
id: 81
title: 'Crash the ISA Server Firewall Service - Open All Inbound Ports'
date: 2007-03-14T15:00:00+10:00
author: Aaron Parker
layout: post
guid: 'http://blog.stealthpuppy.com/uncategorized/crash-the-isa-server-firewall-service-%e2%80%93-open-all-inbound-ports'
permalink: /crash-the-isa-server-firewall-service-open-all-inbound-ports/
categories:
  - Microsoft
tags:
  - ISA Server
---
Here's an easy way to crash the Microsoft Firewall service in ISA Server - create a server publishing rule that allows all high ports inbound to an internal NATed IP address.

Now this is something that it is not normally done and I don't think that ISA Server was designed to work this way. I was doing some specific testing yesterday and as a shortcut, rather than find out what ports I needed inbound (which ended up being UDP 28000 - 29000), I allowed UDP 1024 - 65535 inbound with some unexpected results. The Microsoft Firewall service crashed with the following event logged:

> Event Type: Error  
> Event Source: Microsoft ISA Server Control  
> Event Category: None  
> Event ID: 14079  
> Date: 14/03/2007  
> Time: 10:14:13 AM  
> User: N/A  
> Computer: CLAFW
> 
> Description:  
> Due to an unexpected error, the service fwsrv stopped responding to all requests. Stop the service or the corresponding process if it does not respond, and then start it again. Check for related error messages.
> 
> For more information, see Help and Support Center at http://go.microsoft.com/fwlink/events.asp.

The following alerts were logged in the ISA Server Management Console:

> **Resource allocation failure**  
> Description: A shortage of available memory caused the Microsoft Firewall to fail during initialization of reverse Network Address Translation (NAT). . Use the source location 325.1524.5.0.5720.100 to report the failure.
> 
> **Resource allocation failure**  
> Description: A shortage of available memory caused the Firewall service to fail. The ISA Server computer cannot support additional connections for the server. The Event Viewer Data window displays the number of active connections. The failure is due to error: The data area passed to a system call is too small.
> 
> **Server Publishing Failure**  
> Description: ISA Server failed to read one or more server publishing rules from the stored configuration because an internal error occurred. Error location 325.1524.5.0.5720.100. The stored configuration may be corrupted. The failure is due to error: Ran out of memory

Deleting the rule and restarting the Microsoft Firewall service got the server up and running, but there's something I won't do again.