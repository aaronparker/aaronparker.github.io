---

title: RemoteApp for Hyper-V. Hyper what?
date: 2009-12-17T14:00:15+10:00
author: Aaron Parker
layout: post

permalink: /remoteapp-for-hyper-v-hyper-what/
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

![RemoteAppUsingVirtualBox]({{site.baseurl}}/media/2009/12/RemoteAppUsingVirtualBox.png)

This demonstrates that the RemoteApp feature is not dependant on the hypervisor. You can therefore, use RemoteApp on any hypervisor or even on Windows clients running directly on hardware.

Also, contrary to what the blog post says, Windows 7 is not required for the client, this capability can be extended to Windows XP and Windows Vista, as long as they have the Remote Desktop Connection 7.0 client installed. Here’s Internet Explorer 8 running as a RemoteApp on a Windows XP client:

![InternetExplorer8RemoteAppOnXP]({{site.baseurl}}/media/2009/12/InternetExplorer8RemoteAppOnXP.png)

What is missing from the blog post is specific steps required to get this functionality working under Windows XP and Windows Vista. Hopefully we may see those instructions soon - I’ve been having some trouble getting RemoteApp working on those older operating systems:

![RemoteAppNotSupported]({{site.baseurl}}/media/2009/12/RemoteAppNotSupported.png)
