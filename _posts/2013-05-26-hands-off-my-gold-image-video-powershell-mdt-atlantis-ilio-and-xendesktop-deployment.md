---
id: 3305
title: 'Hands off my gold image! – Video: PowerShell, MDT, Atlantis ILIO and XenDesktop deployment'
date: 2013-05-26T21:36:26+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=3305
permalink: /hands-off-my-gold-image-video-powershell-mdt-atlantis-ilio-and-xendesktop-deployment/
dsq_thread_id:
  - "1323007668"
pd_rating:
  - 'a:8:{s:4:"type";s:1:"0";s:5:"votes";s:1:"1";s:6:"total1";s:1:"0";s:6:"total2";s:1:"0";s:6:"total3";s:1:"0";s:6:"total4";s:1:"0";s:6:"total5";s:1:"1";s:7:"average";s:6:"5.0000";}'
categories:
  - Community
tags:
  - ILIO
  - MDT
  - PowerShell
  - vSphere
  - XenDesktop
---
Here's a deployment demo that I showed during my [Geek Speak Live session](https://citrix.g2planet.com/synergylosangeles2013/public_session_view.php?agenda_session_id=274&conference=synergy) at Citrix Synergy 2013 at Anaheim last week as well as during [BriForum London 2013](http://briforum.com/Europe/sessions.html#jmoyleDesktop) when I had the opportunity to co-present a session with fellow CTP, [Jim Moyle](https://twitter.com/jimmoyle).

Using PowerShell to drive vSphere, MDT, [Atlantis ILIO](http://atlantiscomputing.com/products/persistent-vdi) and XenDesktop, this demo shows a full Windows 7 gold image deployment from a template VM. This script uses an MDT task sequence to deploy Windows to the VM, which is then cloned on the ILIO datastore. The created VMs, which are effectively persistent, are then imported into a new [XenDesktop desktop catalog](http://support.citrix.com/static/kc/CTX127254/help/New-BrokerCatalog.html). This is largely an academic exercise at this point, but is has been intended as an exploration into an alternative to Citrix PVS.

Here's a flow chart that gives an overview of what the script does:

[<img class="alignnone  wp-image-3306" alt="PowerShell-vSphere-MDT-ILIO-XenDesktop" src="https://stealthpuppy.com/media/2013/05/PowerShell-vSphere-MDT-ILIO-XenDesktop.png" width="720" height="405" srcset="https://stealthpuppy.com/media/2013/05/PowerShell-vSphere-MDT-ILIO-XenDesktop.png 720w, https://stealthpuppy.com/media/2013/05/PowerShell-vSphere-MDT-ILIO-XenDesktop-150x84.png 150w, https://stealthpuppy.com/media/2013/05/PowerShell-vSphere-MDT-ILIO-XenDesktop-300x168.png 300w, https://stealthpuppy.com/media/2013/05/PowerShell-vSphere-MDT-ILIO-XenDesktop-624x351.png 624w" sizes="(max-width: 720px) 100vw, 720px" />](https://stealthpuppy.com/media/2013/05/PowerShell-vSphere-MDT-ILIO-XenDesktop.png)

The video is available in HD resolution (720) so you can see the full details.