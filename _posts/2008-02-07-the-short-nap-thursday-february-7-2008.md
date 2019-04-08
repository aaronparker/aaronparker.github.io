---
id: 463
title: 'The Short NAP: Thursday February 7 2008'
date: 2008-02-07T18:57:42+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/access-control/the-short-nap-thursday-february-7-2008
permalink: /the-short-nap-thursday-february-7-2008/
categories:
  - Microsoft
tags:
  - NAP
---
<img height="128" alt="NetworkAccessProtection" src="http://stealthpuppy.com/wp-content/uploads/2008/02/networkaccessprotection.png" width="144" align="left" border="0" /> The Short NAP is a quick list of links covering Microsoft [Network Access Protection](http://www.microsoft.com/nap) and [Server/Domain Isolation](http://www.microsoft.com/sdisolation) topics and related information. 

Network Access Protection is a great new feature of Windows Server 2008 that will help you understand the health of your client machines (Windows Vista and Windows XP Service Pack 3) and increase the trust in your network.

Server and Domain Isolation utilises IPsec to protect domain computers from un-trusted devices. Network Access Protection automates the process of moving machines between logical trusted and un-trusted IPsec networks.

Here are the links for Thursday the 7<sup>th</sup> of February 2008:

  * The big news this week is obviously that Windows Server 2008 and Windows Vista Service Pack 1 have gone RTM, which means that the final NAP code is available. Hopefully Windows XP Service Pack 3 is just around the corner. 
      * Microsoft have released a number of NAP and IPsec documents that have been around during the Windows Server 2008 beta period or even earlier and have been updated for the RTM version: [Introduction to Network Access Protection](http://www.microsoft.com/downloads/details.aspx?FamilyID=5d5e243a-23a8-479c-9f2d-37d6d79153e7&DisplayLang=en), [Internet Protocol Security for Microsoft Windows Server 2003](http://www.microsoft.com/downloads/details.aspx?FamilyID=e6590330-d903-4bdd-9655-81b86df655e4&DisplayLang=en), [Internet Protocol Security Enforcement in the Network Access Protection Platform](http://www.microsoft.com/downloads/details.aspx?FamilyID=144cc69f-790f-4f52-8846-3f3b8584d7cd&DisplayLang=en) and [IEEE 802.1X for Wired Networks and Internet Protocol Security with Microsoft Windows](http://www.microsoft.com/downloads/details.aspx?FamilyID=d9aef757-f528-41be-a01f-99a60c9a855d&DisplayLang=en). 
          * You might also want to check out the [Group Policy Settings Reference for Windows Server 2008](http://www.microsoft.com/downloads/details.aspx?FamilyID=2043b94e-66cd-4b91-9e0f-68363245c495&DisplayLang=en) document which includes the new NAP, 802.1x and IPsec polices available. 
              * Microsoft have also recently recently released an [IPsec Diagnostic Tool](http://www.microsoft.com/downloads/details.aspx?FamilyID=1d4c292c-7998-42e4-8786-789c7b457881&displaylang=en&Hash=dluttgyQre8BfplebI2PgESLZV1gpCQH8zrA0k8ZFttNoUlnNncR2zIehIT8bnC+MuwSrby0mLcGmw/). The UI is pretty basic but the diagnostic results should make short work of troubleshooting. 
                  * Jeff Wettlaufer, Senior Technical Product Manager for System Centre Configuration Manager, has posted some great detail on [SCCM integration with NAP](http://blogs.technet.com/systemcenter/archive/2008/01/29/network-access-protection-arrives.aspx). There's a demo video and I gather from this quote: "_a few weeks ago the North American region went into production NAP enforcement, so we really are practicing what we preach_", that Microsoft have moved from report only mode to full enforcement on their internal networks. That sounds pretty cool when you consider how big their network is. 
                      * A new [case study on NAP deployment](http://www.microsoft.com/casestudies/casestudy.aspx?casestudyid=4000001286) has been published. Fulton County implemented NAP with IPsec enforcement.. [Via Steve](http://blogs.technet.com/steriley/archive/2008/02/01/nap-case-study-published.aspx). 
                          * There's a new TechNet webcast today: [NAP TAP Deployments in Windows Server 2008](http://www.microsoft.com/events/EventDetails.aspx?CMTYSvcSource=MSCOMMedia&Params=%7eCMTYDataSvcParams%5e%7earg+Name%3d%22ID%22+Value%3d%221032368591%22%2f%5e%7earg+Name%3d%22ProviderID%22+Value%3d%22A6B43178-497C-4225-BA42-DF595171F04C%22%2f%5e%7earg+Name%3d%22lang%22+Value%3d%22en%22%2f%5e%7earg+Name%3d%22cr%22+Value%3d%22US%22%2f%5e%7esParams%5e%7e%2fsParams%5e%7e%2fCMTYDataSvcParams%5e), which is detailing some best practices. Keep and eye out for the recorded version which should be available in the next few weeks. 
                              * Chris Hoff generated all sorts of discussion with this post [How the Hypervisor is Death By a Thousand Cuts to the Network IPS/NAC Appliance](http://rationalsecurity.typepad.com/blog/2008/01/how-the-hypervi.html) Vendors and it's follow up [Client Virtualization and NAC: The Fratto Strikes Back](http://rationalsecurity.typepad.com/blog/2008/01/client-virtuali.html). 
                                  * Greg Shields at Redmond Mag has a nice overview of NAP here: [A NAP Is Good for Your Health](http://redmondmag.com/columns/article.asp?editorialsid=2479#9).</ul>