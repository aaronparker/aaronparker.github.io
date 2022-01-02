---

title: Loading Local AppVirt/SoftGrid Packages on Windows Vista
date: 2008-01-09T18:38:36+10:00
author: Aaron Parker
layout: post

permalink: /loading-local-appvirtsoftgrid-packages-on-windows-vista/
categories:
  - Microsoft
tags:
  - SoftGrid
---
![]({{site.baseurl}}/media/2008/02/windowsvista-softgridbox.png)

Testing applications inside the Microsoft Application Virtualisation (SoftGrid) bubble, from local packages (i.e. not streamed from the server) on Windows Vista requires a configuration change due to User Account Control. If you attempt to load an application from a local OSD file, you will receive the following error:

> The SoftGrid Client could not load the application you requested.  
> You are not authorized to perform the requested operation. You must have 'Add applications' permissions.  
> Error code: 42012E-0B20490E-00002015

This is because by default you won't have an administrative token until you elevate (in Windows, not off your chair - doing this standing up, or actually levitating won't help). The simplest change to get this scenario working would be to add the 'Add applications' right in the SoftGrid Client Management Console, but where's the fun in that?

An alternative method is to elevate an Explorer window and then load the application from there. Here's what you need to do:

  1. Enable launching Explorer windows in a separate process: Organize > Folder and Search Options > View > Launch folder windows in a separate process.
  2. Run an elevated EXPLORE.EXE process: Hit Start, enter 'Windows Explorer', hold Ctrl-Alt and hit Enter, acknowledge the UAC dialogue box.
  3. From the elevated Windows Explorer window, right click the OSD file and click Load. Voila!

You might think this long-winded but it works pretty well. I have noticed however that attempting to launch the application from the same elevated Explorer window results in the application hanging at launch. Quite odd.

Finally, you have a third option available to you now - update to [the latest SoftGrid client](http://support.microsoft.com/kb/941408) and package your application with the [MSI Utility for Microsoft Application Virtualization]({{site.baseurl}}/off-site-news/msi-utility-for-microsoft-application-virtualization-available), then load the application via Windows Installer. Note, to do this you will need to set the following registry DWORD value to 0, when using version 4.2.x and [this method]({{site.baseurl}}/virtualisation/enable-streaming-from-file-in-softgrid-45) when using version 4.5.

```
HKLM\SOFTWARE\Softricity\SoftGrid Client\CurrentVersion\Configuration\RequireAuthorizationIfCached
```
