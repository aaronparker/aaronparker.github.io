---
id: 379
title: Sequencing Adobe Photoshop CS3
date: 2007-12-03T18:21:15+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/sequencing-adobe-photoshop-cs3
permalink: /sequencing-adobe-photoshop-cs3/
dsq_thread_id:
  - "195379832"
categories:
  - Applications
tags:
  - Adobe
  - SoftGrid
---
<img border="0" align="left" src="{{site.baseurl}}/media/2008/02/photoshop-softgridbox.png" alt="photoshop-softgridbox.png" />Deploying Adobe applications with SoftGrid/Microsoft Application Virtualisation certainly takes a lot of patience, because like [Adobe Acrobat]({{site.baseurl}}/virtualisation/softgrid-sequencing-adobe-acrobat-8-%e2%80%93-the-story-so-far), Photoshop took quite a long time to sequence and troubleshoot. Sequencing the application alone will take around 6 hours, but your mileage may vary.

### Sequencing Photoshop CS3

Before sequencing Photoshop, you will need to obtain the [volume license version of the media](http://www.adobe.com/aboutadobe/openoptions/) so that you won't have to worry about activation. If you use standard media that requires activation the application will refuse to run on your SoftGrid/MAV client machines. For this sequence I installed Photoshop CS3 with the following updates:

  * [Adobe Photoshop 10.0.1 update for Adobe Photoshop CS3](http://www.adobe.com/support/downloads/detail.jsp?ftpID=3775)
  * [Adobe DNG Converter and Camera Raw 4.3 update](http://www.adobe.com/support/downloads/detail.jsp?ftpID=3824)

You can find information on performing a silent installation of the Adobe CS3 products here: [Perform a silent installation of Photoshop CS3](http://kb.adobe.com/selfservice/viewContent.do?externalId=kb400995), which should help if you need to repeat this process, but I recommend a silent or scripted installation the best method at all times. The only customisation I performed to the installation was to change the install location. This means that about half of the application will be installed to C: drive. A little hacking of the MSI files included in the setup would get just about everything to the SoftGrid client drive.

When sequencing Photoshop CS3 you will run into errors as the Sequencer is going through the post-monitoring phase. You will see the sequencer fail and report "`SystemGuard download failed (error code 53256)`". The solution to this, is to create manifest files for FILEINFO.DLL and copy them to the installation folder just after installing the application. These are standard XML files that the Sequencer will read and then process the files using [UTF-8 instead of their native UTF-16](http://blogs.technet.com/softgrid/archive/2007/10/25/update-error-53256-sequencing-adobe-cs3.aspx).

  * Q:\<Asset Folder>\Adobe\Adobe Bridge CS3\fileinfo.dll.manifest
  * Q:\<Asset Folder>\Adobe\Adobe Photoshop CS3\fileinfo.dll.manifest

The contents of the manifest file should look like this:

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

### Running Photoshop CS3 on the client

Photoshop looks to run quite well on the client; however I ran into an issue on my test machine that I did not see on production machines. Adobe Photoshop CS3 installs the following applications and all but Photoshop itself would run on my test machine:

  * Adobe Photoshop CS3
  * Adobe Bridge CS3
  * Adobe Stock Photos CS3
  * Adobe Device Central CS3
  * Adobe ExtendScript Toolkit 2
  * Adobe DNG Converter 4.3

When launching Photoshop the SoftGrid client would fail and produce this error:

> The SoftGrid Client could not launch Adobe Photoshop CS3.  
> This application has failed to start because the application configuration is incorrect. Reinstalling the application may fix this problem.  
> Error code: 42012E-0060922C-800736B1

A bit of searching turned up this knowledgebase article: [Error message when you try to start a sequenced application in the Microsoft SoftGrid Client: "Error code: 410038-0060922C-800736B1](http://support.microsoft.com/default.aspx/kb/939084). The article offer two solutions, the first being that your clients should have the .NET Framework and the Visual C++ 2005 redistributable package installed locally on the client. The second solution is to add a script to the OSD file to copy the required files out of the package to the client before the application executes.

The problem with the first solution is that both runtimes are installed on my test machine but the required files are not included in either package. At this point I'm unsure where these files come from, even though [another knowledgebase article](http://support.microsoft.com/kb/923610) seems to indicate that they should be in the Visual C++ 2005 SP1 redistributable package. A logical explanation is that they are included in the application setup routine.

The problem with the second solution, which involves copying the files out of the protected environment down to the machine, is that users would require administrative access to their workstations for this to work.

In this case we are looking at ensuring these files exist on the target workstations by deploying them via an MSI package. You may not have the same issue as I did when deploying Photoshop, but if you do, here are the files you need to ensure exist on your workstations:

  * C:\Windows\WinSxS\Manifests\x86\_Microsoft.VC80.CRT\_1fc8b3b9a1e18e3b\_8.0.50727.163\_x-ww_681e29fb.manifest
  * C:\Windows\WinSxS\Manifests\x86\_Microsoft.VC80.CRT\_1fc8b3b9a1e18e3b\_8.0.50727.163\_x-ww_681e29fb.cat
  * C:\Windows\WinSxS\Policies\x86\_policy.8.0.Microsoft.VC80.CRT\_1fc8b3b9a1e18e3b\_x-ww\_77c24773\8.0.50727.163.policy
  * C:\Windows\WinSxS\Policies\x86\_policy.8.0.Microsoft.VC80.CRT\_1fc8b3b9a1e18e3b\_x-ww\_77c24773\8.0.50727.163.cat