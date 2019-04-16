---
id: 1077
title: Some More Windows Virtual PC Screens
date: 2009-04-30T17:48:17+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=1077
permalink: /some-more-windows-virtual-pc-screens/
dsq_thread_id:
  - "195381778"
categories:
  - Microsoft
tags:
  - Virtual-PC
  - Windows 7
---
Of course, Windows Virtual PC has been [covered in detail already](http://www.winsupersite.com/win7/xp_mode_preview.asp), but I got a chance to play with the product and there's some neat UI experiences that I hadn't seen covered yet. Here's a quick overview of interacting with Windows Virtual PC.

Windows Virtual PC gets a spanking new icon:

![WindowsVirtualPC]({{site.baseurl}}/media/2009/04/WindowsVirtualPC.png)

Once installed, Virtual PC actually creates a new top level user folder, a nice touch too I think:

![UserFolder]({{site.baseurl}}/media/2009/04//UserFolder.png)

You can move this folder just like you can with other user folders:

![VirtualMachinesProperties]({{site.baseurl}}/media/2009/04//VirtualMachinesProperties.png)

Virtual machines are managed directly within Windows Explorer - the old management/admin application window from older versions of Virtual PC is no more:

![VirtualMachines]({{site.baseurl}}/media/2009/04//VirtualMachines.png)

You can open the virtual machine settings from within Explorer too:

![WindowsVirtualPCSettings]({{site.baseurl}}/media/2009/04//WindowsVirtualPCSettings.png)

Creating a new virtual machine is just as you would expect, except very simplified. Give the machine a name and location (by default virtual machines are stored in `C:\Users\<username>\AppData\Local\Microsoft\Windows Virtual PC\Virtual Machines`):

![Createavirtualmachine]({{site.baseurl}}/media/2009/04/Createavirtualmachine.png)

Configure memory and networking (I have two network cards in this machine and VPC keep choosing the disconnected card - yay..)

![Createavirtualmachine2]({{site.baseurl}}/media/2009/04//Createavirtualmachine2.png)

Finally you get options for creating the VHD:

![Createavirtualmachine3]({{site.baseurl}}/media/2009/04//Createavirtualmachine3.png)

This revision looks pretty good for some basic virtualisation tasks (in now way is it taking aim at VMware Workstations and others). Now where's the 64-bit guest support?
