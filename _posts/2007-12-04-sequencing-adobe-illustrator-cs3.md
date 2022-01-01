---

title: Sequencing Adobe Illustrator CS3
date: 2007-12-04T20:00:56+10:00
author: Aaron Parker
layout: post

permalink: /sequencing-adobe-illustrator-cs3/
dsq_thread_id:
  - "195379841"
categories:
  - Applications
tags:
  - Adobe
  - SoftGrid
---
<img src="{{site.baseurl}}/media/2008/02/illustrator-softgridbox.png" align="left" alt="illustrator-softgridbox.png" />As with my earlier posts on sequencing [Adobe Acrobat 8]({{site.baseurl}}/virtualisation/softgrid-sequencing-adobe-acrobat-8-%e2%80%93-the-story-so-far) and [Adobe Photoshop CS3]({{site.baseurl}}/virtualisation/sequencing-adobe-photoshop-cs3), I've struck the same manifest issues with Illustrator CS3. Here's a quick breakdown on what I needed to do to get this application working:

### Sequencing Illustrator CS3

Before sequencing Illustrator, you will need to obtain the [volume license version of the media](http://www.adobe.com/aboutadobe/openoptions/) so that you won't have to worry about activation. If you use standard media that requires activation the application will refuse to run on your SoftGrid/MAV client machines.

When sequencing Illustrator CS3 you will run into errors as the Sequencer is going through the post-monitoring phase. You will see the sequencer fail and report "`SystemGuard download failed (error code 53256)`".

J.C. Hornbeck has [posted a solution that involves editing DLL files](http://blogs.technet.com/softgrid/archive/2007/12/03/microsoft-application-virtualization-sequencing-adobe-cs3.aspx) directly to fix their manifests. My solution, which does not involve hacking the files is to create manifest files for these DLLs and copy them to the installation folder just after installing the application. These are standard XML files that the Sequencer will read and then process the DLLs using [UTF-8 instead of their native UTF-16](http://blogs.technet.com/softgrid/archive/2007/10/25/update-error-53256-sequencing-adobe-cs3.aspx).

You will need to create these manifest files:

  * Q:\<Asset Folder>\Adobe\Adobe Bridge CS3\fileinfo.dll.manifest
  * Q:\<Asset Folder>\Adobe\Adobe Illustrator CS3\Support Files\Contents\Windows\fileinfo.dll.manifest

And the contents of the manifest files should look like this:

[code lang="xml"]<?xml version="1.0" encoding="UTF-8" standalone="yes"?>  
<assembly xmlns="urn:schemas-microsoft-com:asm.v1" manifestVersion="1.0">  
<assemblyIdentity  
name="Adobe.Acrobat.fileinfo.dll"  
processorArchitecture="x86"  
version="3.2.0.189"  
type="win32"/>  
<description>Application description here</description>  
<dependency>  
<dependentAssembly>  
<assemblyIdentity  
type="win32"  
name="Microsoft.Windows.Common-Controls"  
version="6.0.0.0"  
processorArchitecture="x86"  
publicKeyToken="6595b64144ccf1df"  
language="*"  
/>  
</dependentAssembly>  
</dependency>  
</assembly>[/code]

### Running Illustrator CS3 on the client

As with Photoshop, Illustrator runs quite well as a sequenced application; however also as with Photoshop, launching Illustrator on the SoftGrid client may produce this error:

> The SoftGrid Client could not launch Adobe Photoshop CS3.
> 
> This application has failed to start because the application configuration is incorrect. Reinstalling the application may fix this problem.
> 
> Error code: 42012E-0060922C-800736B1

The solution is the same as I [have done previously with Photoshop]({{site.baseurl}}/virtualisation/sequencing-adobe-photoshop-cs3) and that is to ensure the following files exist on the workstation before the application is launched.

  * C:\Windows\WinSxS\Manifests\x86\_Microsoft.VC80.CRT\_1fc8b3b9a1e18e3b\_8.0.50727.163\_x-ww_681e29fb.manifest
  * C:\Windows\WinSxS\Manifests\x86\_Microsoft.VC80.CRT\_1fc8b3b9a1e18e3b\_8.0.50727.163\_x-ww_681e29fb.cat
  * C:\Windows\WinSxS\Policies\x86\_policy.8.0.Microsoft.VC80.CRT\_1fc8b3b9a1e18e3b\_x-ww\_77c24773\8.0.50727.163.policy
  * C:\Windows\WinSxS\Policies\x86\_policy.8.0.Microsoft.VC80.CRT\_1fc8b3b9a1e18e3b\_x-ww\_77c24773\8.0.50727.163.cat