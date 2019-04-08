---
id: 131
title: Windows PE 2.0 and VMware Workstation
date: 2006-12-14T05:32:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/windows-pe-20-and-vmware-workstation
permalink: /windows-pe-20-and-vmware-workstation/
categories:
  - VMware
tags:
  - VMware
---
I&#8217;m working on a Presentation Server deployment project at the moment, and am deploying the servers with Windows PE 2.0 via [Windows Deployment Services](http://www.microsoft.com/windowsserver/longhorn/deployment/services.mspx) (WDS). I need to launch Windows Setup via WINNT32.EXE because the servers have two RAID sets and the client wants the user profiles on the second disk set. So before deploying the unattended setup to hardware, I&#8217;m testing the deployment in VMware Workstation. Unfortunately Windows PE 2.0 does not recognise the VMware network card out of the box, so I&#8217;ve had to create a custom WinPE image with the drivers in it. This is the first time I&#8217;ve done this with Windows PE 2.0 so there was a little trial and error. Here are the steps I completed to create my custom image:

First I mounted the WIM image with ImageX. I have a copy of the original WINPE.WIM under D:\Images and I&#8217;ve created a folder D:\Mount, in which to mount the image:

[code]imagex.exe /mountrw d:\images\winpe.wim 1 d:\mount[/code]

Next I injected the VMware drivers into the mounted image. I installed both drivers, but in my case VMware Workstation only required the vmware-nic.inf driver:

[code]peimg.exe /inf=D:\vmdrv\vmxnet.inf d:\mount\Windows  
peimg.exe /inf=D:\vmdrv\vmware-nic.inf d:\mount\Windows[/code]

The next step was to install the scripting packages into the image to allow advanced tools such as HTA applications:

[code]peimg.exe /install=\*HTA\* /image=d:\mount\Windows  
peimg.exe /install=\*Scripting\* /image=d:\mount\Windows  
peimg.exe /install=\*WMI\* /image=d:\mount\Windows  
peimg.exe /install=\*XML\* /image=d:\mount\Windows[/code]

Then I needed to prepare the image, which optimises the image by removing non-required packages and language packs. This is a one way process, so if you need to add more packages at a later date, you&#8217;ll have to recreate your image:

[code]peimg.exe /prep /image=d:\mount\Windows[/code]

Then unmount the image and commit the changes:

[code]imagex.exe /unmount d:\mount /commit[/code]

Lastly I added the boot image into WDS and booted my VM to the network and I finally had an IP address and network client to connect to the deployment server. One thing I did notice but didn&#8217;t get a chance to troubleshoot is that I occasionally had to restart WDS to get Windows PE to boot after making changes to the image.

The documentation that comes with the [Windows Automated Installation Kit](http://www.microsoft.com/downloads/details.aspx?FamilyID=c7d4bc6d-15f3-4284-9123-679830d629f2&DisplayLang=en) is fairly detailed but it doesn&#8217;t really fill in a lot of the gaps. To help me out I found a couple of links around the place, like [this thread on MSFN.org](http://www.msfn.org/board/index.php?act=ST&f=81&t=81802) and this [WinPE2 with BDD 3.0 beta](http://www.uvm.edu/~jgm/wordpress/?p=51) post at J. Greg&#8217;s Blog-o-rama.

**UPDATE**: Of course you could just select Windows Vista as the virtual machine type when creating the virtual machine, but where&#8217;s the fun in that?