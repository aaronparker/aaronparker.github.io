---
id: 6100
title: Thunderbolt end-user experience macOS vs. Windows
date: 2018-08-07T14:01:52+10:00
author: Aaron Parker
layout: post
guid: {{site.baseurl}}.com/?p=6100
permalink: /thunderbolt-experience-macos-windows/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
image: /media/2018/08/linda-xu-366558-unsplash.jpg
categories:
  - Hardware
tags:
  - macOS
  - Thunderbolt
  - Windows
---
Thunderbolt 3 (and USB-C) are here to provide [a single cable for everything]({{site.baseurl}}/thunderbolt-3/), although your experience with this technology will differ depending on your choice of operating system. Here's a quick look at the end-user experience of TB on macOS and Windows.

## Thunderbolt 3 on macOS

Thunderbolt [on macOS just works](https://www.apple.com/thunderbolt/) - plug-in a TB device and off you go. This makes sense given that the standard was [designed by Intel and Apple](https://en.wikipedia.org/wiki/Thunderbolt_(interface)). Unpacking and plugging in a Thunderbolt dock with external displays, ethernet, audio etc., on macOS in just about every case will work without installing drivers.

![Thunderbolt ports on the MacBook Pro]({{site.baseurl}}/media/2018/08/macbook-pro-spgray-psl-closed.jpg)*Thunderbolt ports on the MacBook Pro*

Here's Apple's dirty (not so) secret though - excluding the MacBook Air (and the Mini that comes with TB2), all current Macs have TB3 ports, [except for the MacBook](https://support.apple.com/en-au/HT207443). It has a single USB-C port only. Maybe that's OK - the TB target market is likely to be purchasing the Pro line anyway, but Apple isn't a fan of labelling their ports, so caveat emptor.

macOS provides a good look at the devices plugged into your TB ports:

![macOS System Report showing Thunderbolt devices]({{site.baseurl}}/media/2018/08/macOS-SystemReport-Thunderbolt.png)*macOS System Report showing Thunderbolt devices*

Note that while the MacBook Pro with Touch Bar has 4 Thunderbolt 3 ports, these are divided across 2 busses. If you have more than one device plugged in, ensure they're plugged into either side of the laptop for best performance.

## Thunderbolt 3 on Windows

Thunderbolt 3 [on Windows 10](https://www.microsoft.com/en-us/store/collections/thunderbolt-3)? That is unfortunately not so straight-forward. 

I've been testing connection to my dock on an [HP Elitebook x360 G2](http://h20386.www2.hp.com/AustraliaStore/Merch/Offer.aspx?p=elitebook-x360) that comes equipped with 2 x TB3 ports. The default Windows 10 image for this machine is an absolute mess that has a whole lot of software that isn't required. Resetting the machine back to defaults strips it right back to the bare essentials, excluding the Thunderbolt driver and software. After plugging in a TB device, it isn't recognised and no driver or software is downloaded from Windows Update. Interestingly, no driver or software was offered by the HP Support Assistant app designed to help end-users keep their HP PCs up to date.

Windows PCs equipped with Thunderbolt ports will have the driver and software installed by default, so typically this won't be an issue; however, if you're resetting the PC or creating a corporate image, you'll need to install that software. Every OEM should supply Thunderbolt software for download, which for HP PCs is listed as **Intel Thunderbolt 3 Secure Connect**. The software is actually provided by Intel and [available in various downloads on their site](https://downloadcenter.intel.com/search?keyword=thunderbolt).

With the software installed and a device plugged in, the user sees a message box asking to approve the connection to a Thunderbolt device. Management actions such as approving or removing a device requires administrator rights on the PC. Pluggable has a good article on the entire [user experience and troubleshooting](https://plugable.com/thunderbolt-3/support/).

![Approving connection to TB devices on Windows 10]({{site.baseurl}}/media/2018/08/Thunderbolt-ApprovePopup.png)*Approving connection to TB devices on Windows 10*

Once approved, the device can then be viewed and managed. 

![Viewing attached TB devices on Windows 10]({{site.baseurl}}/media/2018/08/Thunderbolt-AttachedDevices.png)*Viewing attached TB devices on Windows 10*

Of course, once plugged in, Windows sees the peripherals and connects to them as usual.

![Peripherals plugged into a TB dock on Windows 10]({{site.baseurl}}/media/2018/08/Thunderbolt-WIndowsDevices.png)*Peripherals plugged into a TB dock on Windows 10*

Thunderbolt on Windows isn't as simple as it could be. It would be great to see drivers installed directly from Windows Update instead of being available separately, but once installed everything works as you would expect.

## Wrap-up

Thunderbolt will unlikely see as wide spread adoption as USB 3.1, but users with specialised requirements such as video editors, CAD, etc., will benefit from the available bandwidth, which today is 40 Gbit/s vs. 10 Gbit/s. Early [USB 3.2 hardware with 20 Gbit/s speeds has been demonstrated](https://www.tomshardware.com/news/usb-3.2-synopsys-20gbps,37124.html) recently and this may further reduce the need for some users to go to devices providing the higher bandwidth.

The end-user experience of TB on macOS vs. Windows 10 is kind of disappointing - Windows requires that you install drivers and the software requires administrative rights. Not an ideal experience for home or SMB users and these requirements might preclude the usage of Thunderbolt in enterprise environments. However my own personal experience on a MacBook is pretty awesome - just plug in and go. Looks like I'll be on macOS for the foreseeable future.

## Update

Microsoft has an article on [enabling Kernel DMA Protection](https://docs.microsoft.com/en-au/windows/security/information-protection/kernel-dma-protection-for-thunderbolt) for Thunderbolt 3. This requires Windows 10 1803 or above and must also be supported by the device drivers.
