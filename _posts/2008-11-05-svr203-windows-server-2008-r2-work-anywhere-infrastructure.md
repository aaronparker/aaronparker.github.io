---
id: 800
title: 'SVR203: Windows Server 2008 R2: Work Anywhere Infrastructure'
date: 2008-11-05T13:49:54+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/terminal-server/svr203-windows-server-2008-r2-work-anywhere-infrastructure
permalink: /svr203-windows-server-2008-r2-work-anywhere-infrastructure/
dsq_thread_id:
  - "195381249"
categories:
  - Microsoft
tags:
  - TechEd EMEA 2008
---
</p> 

<img style="margin: 0px 15px 0px 0px; display: inline" align="left" src="http://stealthpuppy.com/wp-content/uploads/2008/11/teched2008logo.jpg" /> This session was about DirectAccess in Windows 7 and Windows Serve 2008 R2 as well as <strike>Terminal Services</strike> Remote Desktop Services changes in Windows Server 2008 R2. The DirectAccess feature looks pretty compelling but it will take some time to get to there. However, the Remote Desktop Services stuff was actually pretty cool.

## DirectAccess

[DirectAccess](http://www.microsoft.com/windows/products/windowsvista/enterprise/windows7.mspx?Tab=DirectAccess) is essentially access to the corporate network without a VPN. 

DirectAccess provide seamless access to the corporate network&#160; (corpnet) over IPsec and IPv6, however you can tunnel this inside IPv4 and TLS for where you can’t get direct IPv6 connections. DirectAccess leverages policy based network access – this mean that DirectAccess is integrated with Network Access Protection for policy and remediation services.

On the client-side there is a name resolution agent that directs requests for corporate resources to corporate DNS servers and requests for Internet resources to public DNS servers. Sounds like no more split tunneling issues that you would have with standard VPN connections.

DirectAccess requires a domain connected machine but does not actually require a user to be logged on for it to be connected to the corpnet. This means that anyone responsible for management of workstations can access those machine just like they were on the local LAN. Things like Group Policy can also be applied when the machine is outside the network too.

Today we have increased TCO because we need to get those mobile machines into the network to manage them, but with DirectAccess this is no longer an issue (of course those machines will need to be running Windows 7). 

To get DirectAccess you will need Windows Server 2008 R2 to support the server-side connection (what the speakers were calling a Thin Edge DoS Prevention Server) and the Windows 7 client. Unfortunately we won’t see DirectAccess coming to Windows Vista.

There were also some specific Windows Server 2008 R2 Domain Controller requirements if you are looking at two-factor authentication. I’m not sure if that meant all DCs in the domain or forest or just DCs that the machine would be authenticating too.

The demo of DirectAccess was pretty straight-forward – if you are away from the corporate network you can still access internal or external resources just like you were onsite. It does look to be pretty seamless to the user.

## Windows Server 2008 R2 Remote Desktop Services

You’ve probably already seen that Terminal Services has been renamed to Remote Desktop Services in Windows 7 and this has been done to bring into into line with its new capabilities where it supports VDI scenarios too. Of course all of the components have been renamed so now we have Remote Desktop Gateway, Remote Desktop Connection Broker, Remote Desktop Web Access and Remote Desktop Easy Print, all of which support or are supported by Terminal Server and VDI connections.

The new broker supports both TS and VDI sessions and you can see this with a unified view of your applications and desktops when you sign into the new Web Access.

I was glad to hear the speaker stress that Terminal Server is more scalable than VDI – somewhere in the range of 3 to 10 times more scalable. So if you’re thinking of replacing your TS infrastructure with VDI, you should probably be looking at applying the best tool for each usage scenario.

There was a quick list of improvements to Remote Desktop Services (you should be able to get a more detailed list soon)

  * Remote Desktop Services Gateway security improvements (this was a bit vague)
  * True multi-monitor support – up to 10 monitors supported
  * Bi-directional audio (a bit late to the party with this one)
  * Consent signing support i.e. a usage policy that users must consent to before logging in
  * 2D and 3D remoting for DirectX 10.1
  * DXGI, which is a replacement for GDI, which I gather has better support for remoting standard WinForms type applications
  * RemoteApp language bar support – this mean that your remote application can integrate with your local language settings
  * Integrated single sign (I assume this is an improvement over Windows Vista and Windows Server 2008)
  * User Profile Cache Quota (applies a global quota for profile directory and removes the need to delete profiles at logoff)
  * Application install improvement – no more Install mode to install applications

At this stage there are no concrete details on what features will make it into the updated Remote Desktop Client for Windows Vista and Windows XP, but there will most certainly be some features dependant on Windows 7 as the client.

The Web Access feature gets a make over (a big improvement over Windows Server 2008 if you ask me) plus forms-based authentication – much better than the auth dialog you see today. There’s also some client side interaction too, after you successfully authenticate you get a system tray notification that handles status information and allows you to disconnect (similar to what Citrix has today).

The connection experience was demoed and it did look pretty cool. The presenter was using a Windows Server 2008 R2 machine as the host connecting to a remote desktop that woke up a stored VM of Windows 7 running in Hyper-V. He then showed the Gears of War trailer streaming over this connection which played perfectly (this would be a LAN based scenario however, streaming over a slower connection wouldn’t be quite as nice). This stuff works on Terminal Server and VDI connection too.

There was also some improved RemoteApp integration. In Windows 7 there is an additional Control Panel applet in which you configure your connect to the farm and the applications are automatically added to your Start Menu – applications as well as desktops. This is very similar to Citrix’s PNAgent and the user experience looks pretty good.

Finally there were a few other random points:

  * The speaker spoke of folder redirection as ‘profile virtualisation’, which just made me cringe
  * Still no user based filtering in the Web Access at this time and it sounds like there are no plans to add this for RTM
  * Microsoft are not doing anything to RDP to cope with high latency in this release
  * There will be no changes to licensing requirement; however it sounded like there might be some technical changes, but don’t quote me on that one..