---
id: 3463
title: Testing Citrix Receiver on Android without an Android device
date: 2013-08-23T19:32:40+10:00
author: Aaron Parker
layout: post
guid: http://stealthpuppy.com/?p=3463
permalink: /testing-citrix-receiver-on-android-without-an-android-device/
dsq_thread_id:
  - "1634572133"
categories:
  - Citrix
tags:
  - Android
---
I have too many devices but not one of them runs Android. A good part of my job is testing, presenting and demoing, so it&#8217;s handy being able to show the user experiences across different devices. One of everything is perhaps going a bit too far, so I&#8217;d prefer to run Android as a VM.

Parallels provides a handy way to download an Android VM, but it&#8217;s a little limited &#8211; no Google Play store, for example, which means getting Citrix Receiver into the VM is going to be a challenge (if at all possible).

[<img class="alignnone size-full wp-image-3466" alt="Parallels-AndroidVM" src="http://stealthpuppy.com/wp-content/uploads/2013/08/Parallels-AndroidVM.png" width="840" height="707" srcset="https://stealthpuppy.com/wp-content/uploads/2013/08/Parallels-AndroidVM.png 840w, https://stealthpuppy.com/wp-content/uploads/2013/08/Parallels-AndroidVM-150x126.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/08/Parallels-AndroidVM-300x252.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/08/Parallels-AndroidVM-624x525.png 624w" sizes="(max-width: 840px) 100vw, 840px" />](http://stealthpuppy.com/wp-content/uploads/2013/08/Parallels-AndroidVM.png)

Today though, I came across [Genymotion](http://www.genymotion.com) which provides Android virtual machines, targeted at developers; however these are VMs with reasonably recent versions of Android (4.2.2). Additionally these VMs have Google Play installed in them, making them an excellent way of testing and demoing Android.

Underneath, VirtualBox is required to get this up and running. I&#8217;ve been testing on OS X and I&#8217;ve installed VirtualBox alongside Parallels Desktop. For Windows machines, Genymotion provides a standalone installer that includes VirtualBox.

[<img class="alignnone size-full wp-image-3475" alt="GenymotionDownloadOptions" src="http://stealthpuppy.com/wp-content/uploads/2013/08/GenymotionDownloadOptions.png" width="1174" height="754" srcset="https://stealthpuppy.com/wp-content/uploads/2013/08/GenymotionDownloadOptions.png 1174w, https://stealthpuppy.com/wp-content/uploads/2013/08/GenymotionDownloadOptions-150x96.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/08/GenymotionDownloadOptions-300x192.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/08/GenymotionDownloadOptions-1024x657.png 1024w, https://stealthpuppy.com/wp-content/uploads/2013/08/GenymotionDownloadOptions-624x400.png 624w" sizes="(max-width: 1174px) 100vw, 1174px" />](http://stealthpuppy.com/wp-content/uploads/2013/08/GenymotionDownloadOptions.png)

I haven&#8217;t yet tested, but I believe that the VMs could be [converted into other virtualization formats](http://download.parallels.com/doc/psbm/v5/rtm/Parallels_Server_Bare_Metal_Users_Guide/33313.htm). On OS X, the device images are stored in ~/.Genymobile and the virtual disks are in VMDK format.

Once the Genymotion application is installed, grabbing an Android VM is very easy &#8211; virtual device images can be downloaded directly from the site via the application:

[<img class="alignnone size-full wp-image-3470" alt="AvailableVMs" src="http://stealthpuppy.com/wp-content/uploads/2013/08/AvailableVMs.png" width="816" height="669" srcset="https://stealthpuppy.com/wp-content/uploads/2013/08/AvailableVMs.png 816w, https://stealthpuppy.com/wp-content/uploads/2013/08/AvailableVMs-150x122.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/08/AvailableVMs-300x245.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/08/AvailableVMs-624x511.png 624w" sizes="(max-width: 816px) 100vw, 816px" />](http://stealthpuppy.com/wp-content/uploads/2013/08/AvailableVMs.png)

Here&#8217;s an Android VM running emulating a Google Nexus. Notice the controls down the right-hand side &#8211; there&#8217;s options for emulating battery status and GPS to Android, plus hardware buttons that might be on a physical device, as well as being able to rotate the VM.

[<img class="alignnone size-full wp-image-3467" alt="AndroidLockScreen" src="http://stealthpuppy.com/wp-content/uploads/2013/08/AndroidLockScreen.png" width="1378" height="862" srcset="https://stealthpuppy.com/wp-content/uploads/2013/08/AndroidLockScreen.png 1378w, https://stealthpuppy.com/wp-content/uploads/2013/08/AndroidLockScreen-150x93.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/08/AndroidLockScreen-300x187.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/08/AndroidLockScreen-1024x640.png 1024w, https://stealthpuppy.com/wp-content/uploads/2013/08/AndroidLockScreen-624x390.png 624w" sizes="(max-width: 1378px) 100vw, 1378px" />](http://stealthpuppy.com/wp-content/uploads/2013/08/AndroidLockScreen.png)

Once the up and running, I&#8217;ve set it up with my Google credentials and downloaded Google Chrome and Citrix Receiver:

[<img class="alignnone size-full wp-image-3468" alt="AndroidHome" src="http://stealthpuppy.com/wp-content/uploads/2013/08/AndroidHome.png" width="1160" height="726" srcset="https://stealthpuppy.com/wp-content/uploads/2013/08/AndroidHome.png 1160w, https://stealthpuppy.com/wp-content/uploads/2013/08/AndroidHome-150x93.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/08/AndroidHome-300x187.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/08/AndroidHome-1024x640.png 1024w, https://stealthpuppy.com/wp-content/uploads/2013/08/AndroidHome-624x390.png 624w" sizes="(max-width: 1160px) 100vw, 1160px" />](http://stealthpuppy.com/wp-content/uploads/2013/08/AndroidHome.png)

Receiver works just like you&#8217;d expect:

[<img class="alignnone size-full wp-image-3469" alt="AndroidReceiverWord" src="http://stealthpuppy.com/wp-content/uploads/2013/08/AndroidReceiverWord.png" width="1162" height="728" srcset="https://stealthpuppy.com/wp-content/uploads/2013/08/AndroidReceiverWord.png 1162w, https://stealthpuppy.com/wp-content/uploads/2013/08/AndroidReceiverWord-150x93.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/08/AndroidReceiverWord-300x187.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/08/AndroidReceiverWord-1024x641.png 1024w, https://stealthpuppy.com/wp-content/uploads/2013/08/AndroidReceiverWord-624x390.png 624w" sizes="(max-width: 1162px) 100vw, 1162px" />](http://stealthpuppy.com/wp-content/uploads/2013/08/AndroidReceiverWord.png)

So far this looks to work very well and because the VMs run a pretty stock version of Android, there&#8217;s all sorts of uses for this &#8211; testing the VMware View client, testing and demoing various MDM solutions such as XenMobile or AppSense MobileNow, or essentially anything you might do with a physical device; without having to pay for one. Which means my wife won&#8217;t have to roll her eyes if I was to bring home yet another device.