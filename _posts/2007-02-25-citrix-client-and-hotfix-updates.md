---

title: Citrix Client and Hotfix Updates
date: 2007-02-25T21:24:00+10:00
author: Aaron Parker
layout: post

permalink: /citrix-client-and-hotfix-updates/
categories:
  - Citrix
tags:
  - Presentation-Server
---
Citrix have released version 10 of the Presentation Server Client and the new Citrix Streaming Client as well as Hotfix Rollup 3 for Presentation Server 4.0:

  *  [Citrix Presentation Server Clients Version 10.0 Win32](http://www.citrix.com/English/SS/downloads/details.asp?dID=2755&downloadID=164538&pID=186)
  *  [Web Client Version 10.0 Win32](http://www.citrix.com/English/SS/downloads/details.asp?dID=2755&downloadID=164539&pID=186#top)
  *  [Citrix Presentation Server Client Version 10.0 Linux](http://www.citrix.com/English/SS/downloads/details.asp?dID=2755&downloadID=3323&pID=186)

The new client is one ugly looking application - 16 colour icons, a splash screen and icon that looks like it was drawn by a 5 year old in Paint and the default location for the cache is **still** in the roaming portion of the users profile. Hey guys when are we going to get a client worthy of 2007? This version of the client does have a very interesting and welcome feature:

> **Non-administrator client installation**. This feature allows client users who do not have administrator privileges on a €œlocked down€ computer, such as an Internet cafe or kiosk, to download the Ica32pkg.msi package and install a modified Web Client on a per-user basis. In this way, users can have secure, remote access to their applications.

 [Hotfix Rollup Pack PSE400W2K3R03 - For Citrix Presentation Server 4.0, Citrix Access Essentials 1.0 and 1.5 for Windows Server 2003](http://support.citrix.com/article/CTX111419)

Here's some important notes from the readme:

>   1. Caution: Do not install this hotfix rollup pack on 64-bit operating systems.
>   2. Before installing this hotfix rollup pack, you must uninstall Hotfixes PSE400W2K3029 and PSE400R01W2K3053, if present, from Add/Remove Programs on the Control Panel. Failing to do so may lead to system inconsistencies.
>   3. Installing this hotfix rollup pack partially invalidates the following hotfixes: PSE400R02W2K3065, PSE400R02W2K3066, PSE400R02W2K3067, PSE400R02W2K3069. This happens because not all fixes in these hotfixes are included in the hotfix rollup pack. Obtain or request the corresponding replacement hotfixes for any invalidated fixes you require.
>   4. See Knowledge Center article [CTX110836](http://support.citrix.com/article/CTX110836) for known install behaviors and their workarounds.
>   5. Installation Manager for Presentation Server 4.0 occasionally reports failure to deploy hotfixes and hotfix rollup packs even if the jobs succeed. See Knowledge Center article [CTX110827](http://support.citrix.com/article/CTX110827) for more information.