---
id: 1077
title: Some More Windows Virtual PC Screens
date: 2009-04-30T17:48:17+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=1077
permalink: /some-more-windows-virtual-pc-screens/
aktt_notify_twitter:
  - 'yes'
aktt_tweeted:
  - "1"
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

<img class="alignnone" title="Windows Virtual PC icon" src="http://prmkgw.blu.livefilestore.com/y1pP5ci42DaCtgtqH6OTVrmRXNmTz-_rR6tC9WdHX-OWi57o3xqRyUoAD7LrO5JF1FkmwVoqUh_HHMkSCc36RkSpw/WindowsVirtualPC.png" alt="" width="256" height="256" /> 

Once installed, Virtual PC actually creates a new top level user folder, a nice touch too I think:

[<img class=" alignnone" title="User Folders" src="http://prmkgw.blu.livefilestore.com/y1pDiJxKjFTDTcNwngf2gG4e99I0ymKhX3ni3tMyeGV09kWxgWd8rG43rfpXTTo_Sjfz0Lzi2JLOxGdASg_sGUehnqWRkB2zAwM/UserFolderSmall.png" alt="Click to embiggen" width="560" height="397" />](http://prmkgw.blu.livefilestore.com/y1pg_HOBlTt-St6_E8Cxo779mizG7NOfUUcL6SMO_IWEeoTmcaP-2pkYksztIrFsJvEGHpwgtyss6TIZpdCQZjjdg/UserFolder.png)

You can move this folder just like you can with other user folders:

<img class="alignnone" title="Virtual Machine properties" src="http://prmkgw.blu.livefilestore.com/y1pFOuUsXr8NbeeFsR51JvJdGtLd9CCIHHtEOZZV4bzCrFKC4L4WgVzTPDgM5TkE1UNDB2sy3HkzwpCdejtG1ts2Q/VirtualMachinesProperties.png" alt="" width="409" height="519" /> 

Virtual machines are managed directly within Windows Explorer - the old management/admin application window from older versions of Virtual PC is no more:

[<img class="alignnone" title="Virtual Machines in Explorer" src="http://prmkgw.blu.livefilestore.com/y1p6YH1ZXPuGAurpBwiXMGnvvCgUnh_-18bHx998dD1oVLxRJwfDbnPauzjfZ6rihbuHl_6wvW_wHhXinPQaGJzGQ/VirtualMachinesSmall.png" alt="" width="584" height="392" />](http://prmkgw.blu.livefilestore.com/y1pJjXdQYnujFTvRy42FUqpdKPsuaEDifW2Ds9tUnksDOxpA7z7ch7SWCksvJ6yWpOAdu3tPgECRVBE97e0Tl_XEw/VirtualMachines.png)

You can open the virtual machine settings from within Explorer too:

[<img class="alignnone" title="Virtual machine settings" src="http://prmkgw.blu.livefilestore.com/y1pH5VT1tVYr-yRSM9bDYDILO4WTl5iDuoZahUpHIAZwziNXaGIFBtuFG09oTx3m0qSelEfrhfPbmQ4VHd6w7dVur-HJ6q8OlqP/WindowsVirtualPCSettingsSmall.png" alt="" width="585" height="401" />](http://prmkgw.blu.livefilestore.com/y1prbrlFbMfQ-mIAPWPsmQVBWAxbr2IQrCx4D192AGiDcOyK4DhHBre4TQ5EUMJ9yaQzzKWJX7cUiwwikUbEnRETQ/WindowsVirtualPCSettings.png)

Creating a new virtual machine is just as you would expect, except very simplified. Give the machine a name and location (by default virtual machines are stored in C:\Users\<username>\AppData\Local\Microsoft\Windows Virtual PC\Virtual Machines):

<img class="alignnone" title="Create a virtual machine, step 1" src="http://prmkgw.blu.livefilestore.com/y1p_jc1OStTzp16_xbbcVzyXTWntZGpMq6Mh5r13J29hj5xY3bUtdJSlaaOOPjfWPTlEml7787POBSyZjiOY6s6yg/Createavirtualmachine.png" alt="" width="581" height="456" /> 

Configure memory and networking (I have two network cards in this machine and VPC keep choosing the disconnected card - yay..)

<img class="alignnone" title="Create a new virtual machine, step 2" src="http://prmkgw.blu.livefilestore.com/y1p3oE9DjjDxe5DV3KLSnbLlS1uCKeaHS7LtpABDXO4TYJT12uk1bdj0tgr1b5l9U1iyQu7N14ksK9qLPiWCbG7vA/Createavirtualmachine2.png" alt="" width="581" height="456" /> 

Finally you get options for creating the VHD:

<img class="alignnone" title="Create a new virtual machine, step 3" src="http://prmkgw.blu.livefilestore.com/y1peFfQeCnkrjcdWzRahpcoSdA8DvBJX3UajEIXQfC3X0J9iWleMCY1J2y_FfjfCahaLbp-1BY0UgZinlRsyOkr1g/Createavirtualmachine3.png" alt="" width="581" height="456" /> 

This revision looks pretty good for some basic virtualisation tasks (in now way is it taking aim at VMware Workstations and others). Now where's the 64-bit guest support?

If you're having issues seeing the screenshots, you might have more luck by going directly to my SkyDrive folder: