---
id: 135
title: World of Network Access Protection Chat Transcript Available
date: 2006-12-07T20:26:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/world-of-network-access-protection-chat-transcript-available
permalink: /world-of-network-access-protection-chat-transcript-available/
categories:
  - Microsoft
tags:
  - NAP
---
The November 13, World of NAP chat transcript is finally [available on the TechNet site](http://www.microsoft.com/technet/community/chats/trans/network/06_1113_tn_nap.mspx). Unfortunately I'm usually asleep when these chats and webcasts are live, so I missed out on taking part, but here are some highlight questions from the chat (edited slightly for readability):

> **Q:** Is it true that NAP will not be &#8220;fully implemented&#8221; until Windows Longhorn is released?  
> **A:** This is correct. We shipped the NAP client-side pieces on Vista. We will be shipping the server-side [components] of NAP on Longhorn Server in the next year, as well as additional NAP client releases for XP SP2+ and Windows Server 2003.
> 
> **Q:** Can you explain how the NAP client pieces can be used prior to Longhorn?  
> **A:** The NAP client components are included with Vista but NAP also requires server components that are included with Windows Longhorn. Prior to the Longhorn server you can use the client pieces for beta testing and pilots with beta versions of Longhorn servers. It is not possible to define NAP health and enforcement policies without Longhorn Server.
> 
> **Q:** Is the Cisco Clean Access Agent part of Vista or are the two just going to be able to coexist?  
> **A:** The NAP/NAC integration uses the built-in NAP client that comes with Windows Vista. Cisco's EAP-Fast and EAP-over-UDP will be integrated into Windows and will be able to use the NAP Client to support the Microsoft Statement of Health (SOH). Please refer to the NAP/NAC Interoperability Whitepaper <http://www.microsoft.com/nap>.
> 
> **Q:** With Longhorn version of IAS and NAP, is there a way to do simultaneous machine and user authentication?  
> **A:** No, you can do only one of them in a single request.
> 
> **Q:** Is there a time schedule/plan for supporting Windows Mobile devices?  
> **A:** At the present time there is not a schedule for this. We are in the process of figuring this out.
> 
> **Q:** Will Microsoft release a Linux port for NAP?  
> **A:** As of now Microsoft has no plans to implement the NAP Client's Linux port. But the SOH protocol, communication protocol required to contact the NAP server, is available for licensing. So 3rd parties in the future might implement a port.