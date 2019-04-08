---
id: 210
title: Windows Firewall Technet Resources
date: 2006-08-22T16:20:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/windows-firewall-technet-resources
permalink: /windows-firewall-technet-resources/
categories:
  - Microsoft
tags:
  - Windows-Firewall
---
Back in June, Microsoft created a resource section on TechNet for the Windows Firewall, check it out [here](http://www.microsoft.com/technet/itsolutions/network/wf/default.mspx). There is also a link to an article from way back in May 2004 about how Windows determines if the computer is on the domain network or another network and thus when to apply the Domain Windows Firewall profile or the Standard Windows Firewall profile settings pushed out via Group Policy. Using Group Policy to deliver a Domain and a Standard firewall policy to your workstations, allows you to place a less restrictive firewall policy when inside the coporate network and place a tight firewall policy (read deny all inbound) when a machine is away from the corporate network. Check out the article here:

[Network Determination Behavior for Network-Related Group Policy Settings](http://www.microsoft.com/technet/community/columns/cableguy/cg0504.mspx)