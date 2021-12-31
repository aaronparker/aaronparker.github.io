---
id: 3463
title: Testing Citrix Receiver on Android without an Android device
date: 2013-08-23T19:32:40+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy/?p=3463
permalink: /testing-citrix-receiver-on-android-without-an-android-device/
dsq_thread_id:
  - "1634572133"
categories:
  - Citrix
tags:
  - Android
---
I have too many devices but not one of them runs Android. A good part of my job is testing, presenting and demoing, so it's handy being able to show the user experiences across different devices. One of everything is perhaps going a bit too far, so I'd prefer to run Android as a VM.

Parallels provides a handy way to download an Android VM, but it's a little limited - no Google Play store, for example, which means getting Citrix Receiver into the VM is going to be a challenge (if at all possible).

![Parallels-AndroidVM.png]({{site.baseurl}}/media/2013/08/Parallels-AndroidVM.png)

Today though, I came across [Genymotion](http://www.genymotion.com) which provides Android virtual machines, targeted at developers; however these are VMs with reasonably recent versions of Android (4.2.2). Additionally these VMs have Google Play installed in them, making them an excellent way of testing and demoing Android.

Underneath, VirtualBox is required to get this up and running. I've been testing on OS X and I've installed VirtualBox alongside Parallels Desktop. For Windows machines, Genymotion provides a standalone installer that includes VirtualBox.

![GenymotionDownloadOptions.png]({{site.baseurl}}/media/2013/08/GenymotionDownloadOptions.png)

I haven't yet tested, but I believe that the VMs could be [converted into other virtualization formats](http://download.parallels.com/doc/psbm/v5/rtm/Parallels_Server_Bare_Metal_Users_Guide/33313.htm). On OS X, the device images are stored in ~/.Genymobile and the virtual disks are in VMDK format.

Once the Genymotion application is installed, grabbing an Android VM is very easy - virtual device images can be downloaded directly from the site via the application:

![AvailableVMs.png]({{site.baseurl}}/media/2013/08/AvailableVMs.png)

Here's an Android VM running emulating a Google Nexus. Notice the controls down the right-hand side - there's options for emulating battery status and GPS to Android, plus hardware buttons that might be on a physical device, as well as being able to rotate the VM.

![AndroidLockScreen.png]({{site.baseurl}}/media/2013/08/AndroidLockScreen.png)

Once the up and running, I've set it up with my Google credentials and downloaded Google Chrome and Citrix Receiver:

![AndroidHome.png]({{site.baseurl}}/media/2013/08/AndroidHome.png)

Receiver works just like you'd expect:

![AndroidReceiverWord.png]({{site.baseurl}}/media/2013/08/AndroidReceiverWord.png)

So far this looks to work very well and because the VMs run a pretty stock version of Android, there's all sorts of uses for this - testing the VMware View client, testing and demoing various MDM solutions such as XenMobile or AppSense MobileNow, or essentially anything you might do with a physical device; without having to pay for one. Which means my wife won't have to roll her eyes if I was to bring home yet another device.
