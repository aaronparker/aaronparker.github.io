---
id: 1357
title: RemoteApp for Windows XP and Windows Vista, the missing pieces
date: 2010-02-20T02:17:58+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=1357
permalink: /remoteapp-for-windows-xp-and-windows-vista-the-missing-pieces/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195382179"
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
categories:
  - Microsoft
tags:
  - RemoteApp
---
You may recall from [my last post on RemoteApp]({{site.baseurl}}/virtualisation/remoteapp-for-hyper-v-hyper-what), that we can get RemoteApp for Hyper-V works on other platforms too. While it was straight-forward publishing applications from a Windows 7 host, the client would report this error when connecting to Windows XP and Windows Vista hosts:  
<img style="display: inline; margin-top: 5px;" title="RemoteAppNotSupported" src="https://stealthpuppy.com/media/2009/12/RemoteAppNotSupported.png" alt="RemoteAppNotSupported" width="430" height="203" border="0" /> 

Kind of annoying, because the original [RemoteApp for Hyper-V post](http://blogs.msdn.com/rds/archive/2009/12/15/remoteapp-for-hyper-v.aspx) on the RDS blog, showed us something cool but left out the important part on how to get it working. Well, thanks to [Justin](http://blogs.technet.com/virtualworld) and [this comment](http://blogs.msdn.com/rds/archive/2009/12/15/remoteapp-for-hyper-v.aspx#9964757), I’ve been able to fix the issue and get RemoteApp running on XP and Vista (unfortunately I can’t take any of the credit).

Liam Westley has already done a great job of [documenting the complete process for setting up RemoteApp](http://geekswithblogs.net/twickers/archive/2009/12/18/137048.aspx), so for full details go there - I’ll just summarise and fill in the missing pieces.

### What You’ll Need

First up there is a set of minimum components that will need to be in place:

  * The client computer can be Windows XP SP3, Windows Vista SP1+ or Windows 7 (unless Microsoft decides to release an RDC update for Windows Server – unfortunately I don’t think they will)
  * Remote Desktop Connection 7.0 – built into Windows 7, available for [Windows XP (KB969084)](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=72158b4e-b527-45e4-af24-d02938a95683) and [Windows Vista (KB969084)](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=ac7e58f3-2fd4-4fec-abfd-8002d34476f4)
  * The RemoteApp host can be Windows XP SP3, Windows Vista SP1+ or Windows 7
  * If the RemoteApp host is running Windows XP or Windows Vista, you’ll need the following updates: [Update for Windows XP SP3 to enable RemoteApp](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=e5433d88-685f-4036-b435-570ff53598cd) or [Update for Windows Vista SP1 or above to enable RemoteApp](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=26a2de17-8355-4e8d-8f33-9211e48651fb) (Windows 7 works out of the box)

### Configure the RemoteApp Host

When configuring the host, I’ve been using been using a 1-to-1 setup, I haven’t tested this with pooled virtual desktops yet.

To enable RemoteApp on the host, install the hotfix, then configure the `TsAppAllowList` key in the registry. In this example, I've configured the required entries for running Calculator. Here's a listing of the registry values I added with the pertinent values highlighted.

\[code highlight="2,9,12&#8243; wraplines="true"\]\[HKEY\_LOCAL\_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Terminal Server\TSAppAllowList\]  
"fDisabledAllowList"=dword:00000001

[HKEY\_LOCAL\_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Terminal Server\TSAppAllowList\Applications\calc]  
"CommandLineSetting"=dword:00000000  
"RequiredCommandLine"=""  
"IconIndex"=dword:00000000  
"IconPath"="%windir%\\system32\\calc.exe"  
"Path"="C:\\Windows\\system32\\calc.exe"  
"VPath"="%SYSTEMDRIVE%\\Windows\\system32\\calc.exe"  
"ShowInTSWA"=dword:00000001  
"Name"="Calculator"  
"SecurityDescriptor"=""[/code]

The simplest method of discovering the required registry keys for each RemoteApp entry is to configure the applications on Windows XP Mode or Windows Server 2008 running Remote Desktop Services.

### Creating RemoteApp Connections

I’ve originally based the .RDP file on those created by the RemoteApp Manager in Windows Server. There is documentation on TechNet on how to configure RemoteApp programs and creating the .RDP file for each application here: [Configuring RemoteApp Programs](http://technet.microsoft.com/en-us/library/cc733174.aspx).

The important entries for connecting to Windows XP and Windows Vista, that you may need to add manually, are `disableremoteappcapscheck` (set to 1) and `alternate shell` (set to rdpinit.exe). These were the only additional entries I need to add the .RDP file to get this working. DisableRemoteAppCapsCheck fixes the 'remote computer does not support RemoteApp' error, and Alternate Shell makes sure you actually get a published application and not a remote desktop.

An .RDP file to connect to a RemoteApp program then looks like this (the added lines are highlighted):

[code highlight="23,24&#8243;]redirectclipboard:i:1  
redirectposdevices:i:0  
redirectprinters:i:1  
redirectcomports:i:1  
redirectsmartcards:i:1  
devicestoredirect:s:*  
drivestoredirect:s:*  
redirectdrives:i:1  
session bpp:i:32  
prompt for credentials on client:i:1  
span monitors:i:1  
use multimon:i:1  
remoteapplicationmode:i:1  
server port:i:3389  
allow font smoothing:i:1  
promptcredentialonce:i:0  
authentication level:i:2  
full address:s:winxp1.domain.local  
remoteapplicationprogram:s:||calc  
remoteapplicationname:s:calculator  
remoteapplicationcmdline:s:  
alternate full address:s:winxp1.domain.local  
disableremoteappcapscheck:i:1  
alternate shell:s:rdpinit.exe  
screen mode id:i:2  
winposstr:s:0,3,0,0,800,600  
compression:i:1  
keyboardhook:i:2  
audiocapturemode:i:0  
videoplaybackmode:i:1  
connection type:i:2  
displayconnectionbar:i:1  
disable wallpaper:i:1  
allow desktop composition:i:0  
disable full window drag:i:1  
disable menu anims:i:1  
disable themes:i:0  
disable cursor setting:i:0  
bitmapcachepersistenable:i:1  
audiomode:i:0  
redirectdirectx:i:1  
autoreconnection enabled:i:1  
prompt for credentials:i:0  
negotiate security layer:i:1  
remoteapplicationicon:s:  
shell working directory:s:  
gatewayhostname:s:  
gatewayusagemethod:i:4  
gatewaycredentialssource:i:4  
gatewayprofileusagemethod:i:0  
use redirection server name:i:0[/code]

### RemoteApp in Action

When launching the RemoteApp program, the UI isn't quite as seamless as you get with the XenApp client. You will first see a warning prompt if the .RDP file is not signed, and then a dialog box while the client connects:

<a href="https://stealthpuppy.com/virtualisation/remoteapp-for-windows-xp-and-windows-vista-the-missing-pieces/attachment/remoteappconnect-2/" rel="attachment wp-att-1369"><img class="alignnone size-full wp-image-1369" title="RemoteAppConnect" src="https://stealthpuppy.com/media/2010/02/RemoteAppConnect1.png" alt="" width="453" height="285" srcset="https://stealthpuppy.com/media/2010/02/RemoteAppConnect1.png 453w, https://stealthpuppy.com/media/2010/02/RemoteAppConnect1-150x94.png 150w, https://stealthpuppy.com/media/2010/02/RemoteAppConnect1-300x188.png 300w" sizes="(max-width: 453px) 100vw, 453px" /></a>

If the RemoteApp host is Windows XP, the user will be required to click the Details button to see the remote login dialog box and enter their credentials:

<a href="https://stealthpuppy.com/virtualisation/remoteapp-for-windows-xp-and-windows-vista-the-missing-pieces/attachment/remoteappauth-2/" rel="attachment wp-att-1368"><img class="alignnone size-full wp-image-1368" title="RemoteAppAuth" src="https://stealthpuppy.com/media/2010/02/RemoteAppAuth1.png" alt="" width="660" height="609" srcset="https://stealthpuppy.com/media/2010/02/RemoteAppAuth1.png 660w, https://stealthpuppy.com/media/2010/02/RemoteAppAuth1-150x138.png 150w, https://stealthpuppy.com/media/2010/02/RemoteAppAuth1-300x276.png 300w" sizes="(max-width: 660px) 100vw, 660px" /></a>

If the client is Windows XP or above and the host is Windows Vista or above, you can configure [credential pass-through (single sign-on)](http://blogs.msdn.com/rds/archive/2007/04/19/how-to-enable-single-sign-on-for-my-terminal-server-connections.aspx) to make connecting seamless. You must first [enable CredSSP](http://support.microsoft.com/kb/951608) on Windows XP SP3 clients. Pass-through won't work for Windows XP hosts - although you may be able to save the username and password in the .RDP file instead.

So finally with all of the pieces in place, here’s what you’ll see with applications running via RemoteApp. In this screenshot I have Calculator running remotely from Windows XP and Windows Vista next to the local version.

[<img style="display: inline; border: 0px;" title="DesktopWithCalculator" src="https://stealthpuppy.com/media/2010/02/DesktopWithCalculator_thumb.png" alt="DesktopWithCalculator]({{site.baseurl}}/media/2010/02/DesktopWithCalculator.png)

One thing to note is that the remote applications are all group together on the taskbar; in this screenshot, the two remote Calculators are grouped with Remote Desktop Connection – users' won’t see separate remote buttons as you get in competing products.

### So What's Left?

Use of RemoteApp is [not restricted to the brand of hypervisor]({{site.baseurl}}/virtualisation/remoteapp-for-hyper-v-hyper-what) - RemoteApp will be available on Windows XP+ regardless of where it is running. You could, for example, use blade PCs as hosts.

If you have Citrix XenApp or Quest vWorkspace, you already have tools to publishing applications from virtual desktops, so where would this actually be useful? SMBs without either product would benefit (although I have had one enterprise customer ask me about this feature) or perhaps this would work as a replacement for Windows XP Mode if you don't like Windows Virtual PC (and who does?).

Deploying and managing the .RDP files could be fun. A simple method of deployment would involve the use of [Windows Installer packages adapted from those generated by RemoteApp Manager](http://technet.microsoft.com/en-us/library/cc771468.aspx). You could also use your user environment management tool of choice; however the option that holds most promise is [extending RD Web Access](http://blogs.msdn.com/rds/archive/2009/11/11/remoteapp-and-desktop-connection-management-extensibility-for-provisioning-apps-via-rd-web-access.aspx). Custom code will be required, but it would replace copying .RDP files to users' desktops and could even support pooled virtual desktops.

Ultimately it would be nice to see this documented on TechNet. Apparently though, the RDS team are working on a follow up post that should give us all the info we need and more.

### Update (October 2011)

Kim Knight has written a GUI tool to configure the RemoteApp application and create an RDP file to deliver to clients. This will automate the entire process for you. [RemoteApp Tool](https://sites.google.com/site/kimknight/remoteapptool).