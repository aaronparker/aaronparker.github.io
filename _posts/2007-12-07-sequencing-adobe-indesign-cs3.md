---

title: Sequencing Adobe InDesign CS3
date: 2007-12-07T00:12:30+10:00
author: Aaron Parker
layout: post

permalink: /sequencing-adobe-indesign-cs3/
dsq_thread_id:
  - "195379862"
categories:
  - Applications
tags:
  - Adobe
  - SoftGrid
---
<img src="{{site.baseurl}}/media/2008/02/indesign-softgridbox.png" align="left" alt="indesign-softgridbox.png" />Adobe InDesign should be the last of the Adobe CS3 applications that I'll have to sequence and like [Illustrator]({{site.baseurl}}/virtualisation/sequencing-adobe-illustrator-cs3), [Photoshop]({{site.baseurl}}/virtualisation/sequencing-adobe-photoshop-cs3) and [Acrobat]({{site.baseurl}}/virtualisation/softgrid-sequencing-adobe-acrobat-8-%e2%80%93-the-story-so-far), I had the same issues with sequencing and running the application on the client. So I don't have to repeat myself, check out those posts first and here are the basics for sequencing InDesign CS3.

**Sequencing**

InDesign has a couple of copies of FILEINFO.DLL that you'll need to create manifest files for when sequencing, so place the manifest files here:

  * Y:\00000011\Adobe\Adobe Bridge CS3\fileinfo.dll.manifest
  * Y:\00000011\Adobe\Adobe InDesign CS3\fileinfo.dll.manifest

**Running on the client**

As with Illustrator and Photoshop you'll also need to ensure that these files exist on the client:

  * C:\Windows\WinSxS\Manifests\x86\_Microsoft.VC80.CRT\_1fc8b3b9a1e18e3b\_8.0.50727.163\_x-ww_681e29fb.manifest
  * C:\Windows\WinSxS\Manifests\x86\_Microsoft.VC80.CRT\_1fc8b3b9a1e18e3b\_8.0.50727.163\_x-ww_681e29fb.cat
  * C:\Windows\WinSxS\Policies\x86\_policy.8.0.Microsoft.VC80.CRT\_1fc8b3b9a1e18e3b\_x-ww\_77c24773\8.0.50727.163.policy
  * C:\Windows\WinSxS\Policies\x86\_policy.8.0.Microsoft.VC80.CRT\_1fc8b3b9a1e18e3b\_x-ww\_77c24773\8.0.50727.163.cat

Although these files are picked up by the Sequencer and added to the VFS, the application won't run without them being located on the client outside of the protected environment.