---

title: 'Webcast: Enabling Trusted Communications and Health Policy Enforcement with NAP'
date: 2006-10-12T07:01:00+10:00
author: Aaron Parker
layout: post

permalink: /webcast-enabling-trusted-communications-and-health-policy-enforcement-with-nap/
categories:
  - Microsoft
tags:
  - NAP
---
Gene Ferioli, a Program Manager with the Customer Connection Team at Microsoft did [a webcast back in September](http://blogs.technet.com/nap/archive/2006/09/20/457816.aspx) on NAP, which is [available for download](https://www119.livemeeting.com/cc/mseventsbmo/view?id=1032308032&pw=89B67592&fmt=wmm). I've just gotten around watching this webcast and it weighs in at 1h 8m. Here's my rough notes on what it covers:

  * NAP Overview and Architecture
  * Four Pillars of Network Access Protection: 
      * Policy Validation
      * Network Restriction
      * Remediation
      * Ongoing Compliance
  * NAP is a platform that Microsoft providing APIs for third party developers to extend and plug into
  * Health System Components 
      * System Health Agents
      * System Health Validators
      * System Health Servers
      * Remediation Servers
  * Linux and Mac NAP clients are in the works, to be developed by third party developers
  * Network access devices (end-points that control access to the network): 
      * Wired 802.1x - switch
      * Wireless 802.1x - access point
      * IPSec - Health Registration Authority
      * DHCP - DHCP server
      * VPN - VPN server
  * A health certificate is short lived so that system health can be re-evaluated. This re-evaluation occurs at 80% of the certificate life time + a random offset
  * Multiple certificate authorities can be specified for health certificates
  * You can configure NAP to remediate and/or report but not restrict
  * Based on customer feedback, Microsoft is building a Heath Registration Authority (HRA) locator service, so that the client can locate the closest HRA. Much like clients locating the closest domain controller
  * Things to understand about NAP: 
      * NAP cannot protect the network from malicious users
      * NAP is designed at the health overlay to the network security systems
      * NAP is dependent on its enforcement mechanisms
      * IPSec, VPN, 802.1x and DHCP need to be designed and deployed as security solutions in their own right prior to overlaying
  * Start planning today - are all switches capable of 802.1x (if you plan to use 802.1x). If you are implementing VoIP, are the phone using the same physical connections or VLANs?
  * Covers Cisco NAC, Microsoft NAP interoperability 
      * _Windows Vista only scenario_
      * Describes the NAP/NAC interoperability architecture and process
      * NAP client APIs on Windows Vista support NAC (no seperate NAC client required)
      * Deploy Cisco EAP modules through Windows Update/WSUS
      * You can deploy NAC today and add NAP once Longhorn Server is released
  * The NAP team is working on a provisioning service for a guest access scenarios (hotels, airport, contractors etc)

Here's a screen grab of the Trend Micro System Health Agent auto-remediating the local anti-virus to make the client machine healthy (click for a larger view):

![TendMicro]({{site.baseurl}}/media/2006/10/1000.14.148.TrendMicro.png)
