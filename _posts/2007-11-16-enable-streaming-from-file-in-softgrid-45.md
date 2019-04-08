---
id: 372
title: Enable Streaming from File in SoftGrid 4.5
date: 2007-11-16T11:26:42+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/enable-streaming-from-file-in-softgrid-45
permalink: /enable-streaming-from-file-in-softgrid-45/
dsq_thread_id:
  - "195379739"
pd_rating:
  - 'a:8:{s:4:"type";s:1:"0";s:5:"votes";s:1:"1";s:6:"total1";s:1:"0";s:6:"total2";s:1:"0";s:6:"total3";s:1:"0";s:6:"total4";s:1:"1";s:6:"total5";s:1:"0";s:7:"average";s:6:"4.0000";}'
categories:
  - Microsoft
tags:
  - SoftGrid
---
The default behaviour of the SoftGrid Application Virtualisation 4.5 client is to not allow applications to be streamed from a file, i.e. streaming an application from a local OSD file rather than from the server. If you attempt to load from a local package, you may see an error similar to this:

> The SoftGrid Client could not load Adobe Reader 8 8.1.0.137.
> 
> The operation failed because you do not have sufficient permissions to stream from a file. Please report the following error code to your System Administrator.
> 
> Error code: 450260-14901604-0000180B

The fix for this is pretty simple - change the following registry DWORD value from 0 to 1

[code]HKLM\SOFTWARE\Microsoft\SoftGrid\4.5\Client\Configuration\AllowIndependentFileStreaming[/code]

**DISCLAIMER**: SoftGrid Application Virtualisation 4.5 is beta software and this configuration may change by the final release.