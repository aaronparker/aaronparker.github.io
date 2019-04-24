---
id: 223
title: 'Diary of an Exchange 2007 Upgrade: Part 2'
date: 2007-05-23T10:12:15+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/exchange/diary-of-an-exchange-2007-upgrade-part-2
permalink: /diary-of-an-exchange-2007-upgrade-part-2/
categories:
  - Microsoft
tags:
  - Exchange
---
Dear Diary,

In this second entry I want to tell you about the operating system installation and the initial Exchange Server install.

**Operating System Installation**

The installation of Windows didn't quite go a smoothly as I had originally hoped. This client does not have any existing tools for automated installations of Windows, so I had planned to use Windows PE to install Windows Server from source files located on the network. This was a bit of a pain as there is no DHCP in this particular subnet and after [problems with using Windows PE 2.0](http://blog.tiensivu.com/aaron/archives/942-2-confirmed-BDD-RTM-bugs-mostly-for-people-doing-desktop-deployments.html) to install Windows Server 2003, I decided to build the machines manually because I'd spent enough time on the OS install already. Not the ideal situation, but it got the job done.

After manually installing Windows Server 2003 R2 Enterprise Edition x64 to all four machines, I then installed the following updates:

  * Internet Explorer 7.0 + KB931768
  * .NET Framework 2.0 + KB926776
  * MSXML 6.0 Parser
  * Windows Server 2003 x64 Service Pack 2
  * Windows PowerShell 1.0

**Organisation Upgrade**

Before moving too much further, I checked the Exchange 2007 readiness of the organisation with the Exchange Server Best Practice Analyser. The only issue found with the organisation was a recommedation to [suppress link state changes](http://technet.microsoft.com/en-us/library/875ae7f8-446d-4786-85d2-719ac7093cf6.aspx). As this organisation is highly centralised, I've skipped making those changes and proceeded to updating the organisation. Updating the schema and preparing the domain was straightforward, no issuse there.

**Client Access Servers**

Installation of the Client Access, Hub Transport and Unified Messaging roles on the two IBM 336 was simple enough, but I ran into all sorts of trouble when I my concentration slipped and I accidently installed the Mailbox role on a server that wasn't intended to be a mailbox server.

To remove the mailbox role, I first had to remove the Public Folder replicas contained on that server. Attempting to remove the role would produce this error:

> Uninstall cannot proceed. Database 'Public Folder Database': The public folder database specified contains folder replicas. Before deleting the public folder database, remove the folders or move the replicas to another public folder database.

Removing the replicas proved to be difficult; I could get so far with the Remove-PublicFolder command so I ended up deleting the Public Folder store with ADSIEDIT so that I could remove the Mailbox role successfully. The Exchange team have a lot to answer for in regards to Public Folder management in Exchange 2006 RTM.

**Where To Next?**

Now that the CAS, HT and UM rules are in place, the next step is to get the clustered Mailbox role up and running. My next entry will detail that process.