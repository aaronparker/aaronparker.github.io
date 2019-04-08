---
id: 1244
title: RemoteApp for Hyper-V. Hyper what?
date: 2009-12-17T14:00:15+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/remoteapp-for-hyper-v-hyper-what
permalink: /remoteapp-for-hyper-v-hyper-what/
aktt_notify_twitter:
  - 'no'
dsq_thread_id:
  - "195382132"
categories:
  - Microsoft
tags:
  - RemoteApp
---
Microsoft posted about [RemoteApp for Hyper-V](http://blogs.msdn.com/rds/archive/2009/12/15/remoteapp-for-hyper-v.aspx) yesterday, which was essentially highlighting the application publishing capabilities available in [Windows XP mode and Windows Virtual PC](http://www.microsoft.com/windows/virtual-pc/default.aspx); however this particular blog post calls out the use of RemoteApp to publish applications on Windows XP and Vista guests running under Hyper-V.

It’s fantastic to see this capability provided in the base product – SMBs implementing Remote Desktop Services in Windows Server 2008 R2 will benefit greatly. However, calling it “RemoteApp for Hyper-V” is a bit of a misnomer.

So instead of Hyper-V, here’s Internet Explorer published as a RemoteApp from a Windows 7 guest VM running under [VirtualBox](http://www.virtualbox.org/) 3.1:

[<img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="RemoteAppUsingVirtualBox" src="https://stealthpuppy.com/wp-content/uploads/2009/12/RemoteAppUsingVirtualBox_thumb.png" border="0" alt="RemoteAppUsingVirtualBox" width="640" height="400" />](https://stealthpuppy.com/wp-content/uploads/2009/12/RemoteAppUsingVirtualBox.png)

This demonstrates that the RemoteApp feature is not dependant on the hypervisor. You can therefore, use RemoteApp on any hypervisor or even on Windows clients running directly on hardware.

Also, contrary to what the blog post says, Windows 7 is not required for the client, this capability can be extended to Windows XP and Windows Vista, as long as they have the Remote Desktop Connection 7.0 client installed. Here’s Internet Explorer 8 running as a RemoteApp on a Windows XP client:

[<img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="InternetExplorer8RemoteAppOnXP" src="https://stealthpuppy.com/wp-content/uploads/2009/12/InternetExplorer8RemoteAppOnXP_thumb.png" border="0" alt="InternetExplorer8RemoteAppOnXP" width="640" height="408" />](https://stealthpuppy.com/wp-content/uploads/2009/12/InternetExplorer8RemoteAppOnXP.png)

What is missing from the blog post is specific steps required to get this functionality working under Windows XP and Windows Vista. Hopefully we may see those instructions soon - I’ve been having some trouble getting RemoteApp working on those older operating systems:

<img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="RemoteAppNotSupported" src="https://stealthpuppy.com/wp-content/uploads/2009/12/RemoteAppNotSupported.png" border="0" alt="RemoteAppNotSupported" width="430" height="203" />