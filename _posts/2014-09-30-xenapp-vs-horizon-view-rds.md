---
title: Does Horizon View RDS stack up against XenApp?
date: 2014-09-30T23:04:33+10:00
author: Aaron Parker
layout: post
permalink: /xenapp-vs-horizon-view-rds/
categories:
  - Applications
tags:
  - Citrix
  - Horizon
  - View
  - VMware
  - XenApp
  - XenDesktop
---
Is VMware Horizon View 6 RDS a viable replacement or competitor to Citrix XenApp? A competitor, most certainly. View RDS as a replacement for XenApp deserves further investigation and I recommend no assumptions be made as to the suitability of View RDS, especially if you are a current Citrix customer, or a VMware partner.

One of the most interesting plays that VMware has with Horizon 6, is the ability to present resources through Horizon Workspace from Citrix XenApp. My initial knee jerk reaction was "why would you want to move from XenApp/XenDesktop to View?", but it's ultimately an excellent salvo in the fight to win customers away from Citrix.

This feature enables XenApp customers to implement View into existing environments and provide users with access to resources from XenApp and View from a single workspace. The aim is to create an on-ramp for the entire Horizon suite and ultimately a migration away from XenApp and/or XenDesktop.

Horizon View 6 RDS is really a first entry (or v2 depending on how you look at it) into published applications for VMware, so surely it can't win in a head-to-head fight against XenApp? If you compare the two products in detail, what features of XenApp could you just not do without, or what features of View RDS would not be good enough?

I've put together a table in this article to compare features of XenApp and Horizon View RDS. This is not intended to be as feature complete or provide as much detail as the [VDI Smackdown](http://pqr.com/vdi-smackdown), instead I wanted to look at a handful of I what I see as the most important features and provide a quick a dirty reference.

There are a few things to keep in mind while reading this - a tick/star against a feature does not necessarily indicate that feature is directly comparable. Due to differences in approach and architecture, it's very difficult to draw direct comparisons against some features.

I've added the VDI components of XenDesktop and View to provide reference.  The heading in the table "XenDesktop VDI" refers to the VDI features of XenDesktop, not the XenDesktop VDI edition. Any XenApp version between 6.5 and 7.6 should be applicable to this comparison.

This comparison is intended as a starting point for looking at both solutions. Your mileage will vary and I encourage performing your own due diligence. VMware has already improved View RDS with printing functionality within months of the original 6.0 release.

## Feature Comparison

|Feature|XenApp                                                                                              |XenDesktop VDI                                                       |View RDSH                                |View VDI                                               |
|-------|----------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|-----------------------------------------|-------------------------------------------------------|
|Session Desktops. Multiple user sessions sharing a single Windows Server instance|*                                                                                                   |                                                                     |*                                        |                                                       |
|Published or Seamless Applications. Published applications delivered from Windows Server or client as seamless windows|*                                                                                                   |*                                                                    |*                                        |                                                       |
|Virtual desktops. Single user sessions connecting to Windows desktop operating systems (8, 7 etc.)|                                                                                                    |*                                                                    |                                         |*                                                      |
|Supports physical deployments from the data centre - for hosted shared servers or hosted desktops|*                                                                                                   |*                                                                    |*                                        |*                                                      |
|Remote PC access. Provide users with remote access to their physical PCs using the same virtual desktop infrastructure|                                                                                                    |*                                                                    |                                         |*                                                      |
|Single image management through OS streaming|*                                                                                                   |*                                                                    |                                         |                                                       |
|Single image management via linked-clones|*                                                                                                   |*                                                                    |                                         |*                                                      |
|Hypervisor-based vDisk solution to provide a persistent storage space for virtual desktops|                                                                                                    |*                                                                    |                                         |*                                                      |
|Client-side virtualization, syncronisation or physical desktop image management|                                                                                                    |XenClient (client-side hypervisor); DesktopPlayer for Mac            |                                         |Mirage (layering and sync); VMware Player              |
|Hypervisor support|ESXi, Hyper-V, XenServer                                                                            |ESXi, Hyper-V, XenServer                                             |ESXi                                     |ESXi                                                   |
|Gateway / remote access|NetScaler Gateway (2 nodes for HA)                                                                  |NetScaler Gateway (2 nodes for HA)                                   |View Security Server (2 nodes plus load balancer for HA|View Security Server (2 nodes plus load balancer for HA|
|Clientless access with HTML 5 browser support|*                                                                                                   |*                                                                    |                                         |*                                                      |
|Load Balancing|NetScaler                                                                                           |NetScaler                                                            |NSX                                      |NSX                                                    |
|WAN optimization|Cloud Bridge                                                                                        |Cloud Bridge                                                         |3rd party                                |3rd party                                              |
|2D and 3D graphics acceleration - software/CPU|*                                                                                                   |*                                                                    |*                                        |*                                                      |
|2D and 3D graphics acceleration - bare metal|*                                                                                                   |*                                                                    |*                                        |*                                                      |
|2D and 3D graphics acceleration - pass-through / vDGA|*                                                                                                   |*                                                                    |*                                        |*                                                      |
|2D and 3D graphics acceleration - vGPU|                                                                                                    |*                                                                    |                                         |*                                                      |
|2D and 3D graphics acceleration - vSGA (vSphere only)|*                                                                                                   |*                                                                    |*                                        |*                                                      |
|Flash redirection. May be client and OS dependant|*                                                                                                   |*                                                                    |~ (requires web page change)             |~ (requires web page change)                           |
|Multimedia redirection. May be client and OS dependant|*                                                                                                   |*                                                                    |?                                        |*                                                      |
|Microsoft Lync optimization to reduce latency with local voice and video processing|*                                                                                                   |*                                                                    |*                                        |*                                                      |
|Real-Time Audio-Video support for webcams and microphones|*                                                                                                   |*                                                                    |                                         |*                                                      |
|USB redirection. Low level redirection of USB devices from client to virtual desktop|~ (limited devices)                                                                                 |*                                                                    |?                                        |*                                                      |
|Webcam support. Client webcam accessed from remote desktop or application|*                                                                                                   |*                                                                    |                                         |*                                                      |
|Microphone support. Client microphone access from remote desktop or application|*                                                                                                   |*                                                                    |                                         |*                                                      |
|Local client drive connection. Client drive mapping over a virtual channel|*                                                                                                   |*                                                                    |                                         |                                                       |
|Printer redirection/virtual printers|*                                                                                                   |*                                                                    |*                                        |*                                                      |
|Driver-less printing with server component to support network printing|*                                                                                                   |*                                                                    |                                         |                                                       |
|Location-based / Proximity printing. E.g. based on client subnet|*                                                                                                   |*                                                                    |                                         |*                                                      |
|Smart card authentication|*                                                                                                   |*                                                                    |                                         |*                                                      |
|Profile management or optimization|*                                                                                                   |*                                                                    |                                         |*                                                      |
|Direct application virtualization integration|App-V                                                                                               |App-V                                                                |ThinApp                                  |ThinApp                                                |
|Application compatibility testing and migration tools|AppDNA                                                                                              |AppDNA                                                               |                                         |                                                       |
|Microsoft System Center integration|*                                                                                                   |*                                                                    |                                         |                                                       |
|Monitoring solution|XenDesktop Director, EdgeSight                                                                      |XenDesktop Director, EdgeSight                                       |VMware vCOPs                             |VMware vCOPs                                           |

Here's a set of additional XenApp and XenDesktop features that I'll move into the table as time permits. In the meantime some of them are significant features that can't be taken for granted.

* Session Pre-launch - improve the perceived time to launch remote applications
* Session Linger - keep a remote session open for a period of time after closing all remote applications
* Anonymous Logon - allow access to remote applications without requiring authentication
* Advanced Policy Control and SmartAccess - Citrix has provided a flexible access control and policy solution within XenApp and XenDesktop, especially in conjunction with NetScaler
* User shadowing - remote controlling user sessions for support purposes
* Hypervisor-based read cache (IntelliCache, CSV Cache, CBRC) - how do these features fit into your storage requirements?

I've made every effort to ensure this comparison is accurate at the time of posting; however this is subject to change and I'll update as new information comes to light.

So, is Horizon View RDS ready to go head-to-head with XenApp? I have my own view, tempered by many years of working with Citrix products, but it's great to see VMware taking a seat at the application delivering table. Whether Horizon View RDS wins out over XenApp, will of course depend on your own business and technical requirements.

## Acknowledgements

I'd like to thank the following people (in no particular order) for taking a look at the table and providing some initial feedback:

* [Nick Anderson](http://twitter.com/speakvirtual)
* [Dwayne Lesser](http://twitter.com/dlink7)
* [Robert Morris](http://agsi_rmorris)
* [Thomas Brown](http://twitter.com/thombrown)
* [Markus Lundberg](http://twitter.com/LundbergMarkus)
* [Shawn Bass](http://twitter.com/shawnbass) (before starting at VMware, that is)

Comments and feedback, as always, are welcome.

## Updates

* Oct 1. 2014 - removed HTML5 clientless support check mark from Horizon View RDS
* Oct 27. 2014 - added NSX to load balancing option for Horizon View
