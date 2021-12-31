---

title: Specify a licensing server for Remote Desktop Virtualization Host and RemoteFX with PowerShell
date: 2010-07-13T14:26:07+10:00
author: Aaron Parker
layout: post

permalink: /specify-a-licensing-server-for-remote-desktop-virtualization-host-and-remotefx-with-powershell/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195383046"
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
categories:
  - Automation
tags:
  - RemoteFX
---
If you’re configuring the [Remote Desktop Virtualization Host](http://technet.microsoft.com/en-us/library/dd759193.aspx) (RDVH) and [RemoteFX](http://www.brianmadden.com/blogs/brianmadden/archive/2010/07/13/microsoft-remotefx-is-now-available-via-public-beta.aspx) roles on a Hyper-V box, you may see the following message and will need to configure a license server:

![RemoteFX Licensing popup]({{site.baseurl}}/media/2010/07/RemoteFXLicensing.png)

[Documentation on this is a little light](http://technet.microsoft.com/en-us/library/ff817586(WS.10).aspx) at the moment, but given that Windows Server 2008 Service Pack 1 is still in beta this is to be expected. The component that requires licensing is RemoteFX, demonstrated by the RemoteFX Session Licensing service that is enabled with RemoteFX:

![RemoteFX-Licensing-Service]({{site.baseurl}}/media/2010/07/RemoteFXLicensingService.png)

To configure the licensing mode and add a licensing server, you can use the [Remote Desktop Services Provider for PowerShell](http://technet.microsoft.com/en-us/library/ee791871(WS.10).aspx). There’s a great post on the RDS Team blog that demonstrates how to use this provider to manage licensing - [Manage Remote Desktop Licensing by using Windows PowerShell](http://blogs.msdn.com/b/rds/archive/2010/04/07/manage-remote-desktop-licensing-by-using-windows-powershell.aspx), so I’ll just add the commands required to configure the RDVH server.

To enable the RDS Provider in PowerShell, you can start PowerShell from the _Windows PowerShell Modules_ shortcut, or import the RemoteDesktopServices module in an other (elevated) PowerShell window:

```powershell
import-module RemoteDesktopServices
```

Once the module is loaded, you can then change to the RDS provider and configure the licensing type. The licensing type is the same as for standard RDS hosts – Per User and Per Device.

```powershell
CD RDS:  
CD .\RDVHConfiguration\LicensingSettings  
Set-Item .\LicensingType -Value 4
```

The licensing type values can be 2 for Per Device and 4 for Per User. Next, specify the licensing server name. In this example I’ve added my [Remote Desktop Licensing](http://technet.microsoft.com/en-us/library/ee891291(WS.10).aspx) server, that I have upgraded to SP1, however I’m not sure if SP1 is a requirement for the licensing server.

```powershell
CD .\SpecifiedLicenseServers  
New-Item -name deploy.domain.local
```

The final question then is, does this mean that RemoteFX will require it’s own CALs?
