---

title: NAP MVP Webcast Available To All
date: 2006-10-07T22:00:00+10:00
author: Aaron Parker
layout: post

permalink: /nap-mvp-webcast-available-to-all/
categories:
  - Microsoft
tags:
  - NAP
---
[Jeff Sigman](http://blogs.technet.com/nap/archive/2006/10/05/NAP-MVP-webcast-now-available-for-offline-viewing.aspx), the NAP Release Manager at Microsoft, has posted a link to a webcast he did recently for MVPs, which is now [available for general viewing](https://www119.livemeeting.com/cc/msmvp/view?id=3K8FCR). This is quite a long webcast (1h 40m) but it goes into detail about NAP and demonstrates using DHCP or IPSec as an enforcement tool for NAP. It's well worth checking out if you have the time, but if you don't, here's my (really) rough notes to give you an overview of the content:

  * Intro, How NAP came about, What is NAP? [Terminal Server Gateway](http://www.msterminalservices.org/articles/Overview-Longhorn-Servers-Terminal-Service-Gateway-Part1.html) supports NAP
  * Demo NAP working by turning off anti-virus with manual remediation and turning off Windows Update settings with automatic remediation
  * Using DHCP requires no client side configuration (compared to IPSec), easiest way to implement NAP, but least secure
  * 3<sup>rd</sup> party DHCP server vendors can license the statement of health protocol to interoperate with NAP
  * NAP uses WMI to determine status of antivirus, firewall and anti-spyware products. All venders should be using proper APIs to notify WMI. NAP is reliant on the Windows Security Centre
  * [Cisco NAC](http://www.cisco.com/en/US/netsol/ns466/networking_solutions_package.html) and NAP interoperate by allowing NAP to use NAC (for example implemented in a Cisco switch) as an enforcement tool instead of DHCP or Microsoft's IPSec/802.1X
  * When Using DHCP, NPS (Network Policy Server) and DHCP must co-exist on the same server
  * NAP client may be included in Windows XP Service Pack 3
  * NAP will tie in with [Forefront Client Security](http://www.microsoft.com/forefront/clientsecurity/default.mspx)
  * Using IPSec with NAP will require certificates from a Longhorn Server CA that can distribute certificates for use with System Health Authentication
  * Microsoft have a deployment scenario for secure Internet access, whereby clients may only access a specific ISA Server that has access to the Internet if the machine has passed all health checks. This is a really cool scenario to enforce access to the un-trusted Internet from machines that are up to date, thus reducing the chance of the machine being infected by malicious code.
  * Client feedback has lead to Microsoft implementing a way to track NAP sessions by GUID for troubleshooting purposes
  * Microsoft recommends that the first phase of deployment be reporting only. This will give an indication of what machines would not pass the health checks and thus be denied access to the network. These machines can then be updated before NAP is enabled.
  * To perform effective reporting, you can configure the NPS server to log to SQL Server and then create SQL queries to return those machines that failed health checks.
  * Jeff may do another webcast to demonstrate 802.1x with NAP