---

title: Safely Remove Hardware, gets a facelift, almost
date: 2007-03-07T19:24:00+10:00
author: Aaron Parker
layout: post

permalink: /safely-remove-hardware-gets-a-facelift-almost/
dsq_thread_id:
  - "195378609"
categories:
  - Applications
tags:
  - Windows-Vista
---
There are quite a few design choices in Windows Vista that have me baffled, especially where an interface change to me seems quite logical but Microsoft have not implemented one. The Safely Remove Hardware feature is one such change.

In Windows Vista there are two ways to prepare a device for removal before actually physically disconnecting the device. The first method, which has carried over from earlier versions of Windows, is to right click on the Safely Remove Hardware icon in the tray and then click the device to remove. Like this:

<img border="0" width="500" src="{{site.baseurl}}/media/2007/03/1000.14.1095.RemoveHardwareMenu.png" height="98" style="width: 500px; height: 98px" /> 

Once Windows has finished flushing the file system cache, the following dialog is displayed to let you know that you can remove the device:

<img border="0" width="410" src="{{site.baseurl}}/media/2007/03/1000.14.1096.SafeToRemoveHardware.png" height="184" style="width: 410px; height: 184px" /> 

The problem with this approach is this dialog is a little in-your-face and you must respond to it with a mouse click. Surely a balloon notification would be a more pleasant experience? Well, let's see what we get when you use the second method to safely remove a device. This method is accessed via the right-click menu on a device such as a USB hard drive in My Computer:

<img border="0" src="{{site.baseurl}}/media/2007/03/1000.14.1093.Computer.png" /> 

This results in a balloon notification in the tray, far more elegant than a popup dialog box:

<img border="0" src="{{site.baseurl}}/media/2007/03/1000.14.1094.RemoveHardwareBaloon.png" /> 

<a target="_blank" href="http://www.stealthpuppy.com/photos/images/images/1096/original.aspx"></a>

So essentially we have two ways of achieving the same thing, but we get two different notifications. To me balloon notifications are far more effective and since they took the time to implement it, why not update the original notification too? Now as I don't work for Microsoft I can't possibly have an understanding of the design process, but updating the first method to match the new one just makes sense.