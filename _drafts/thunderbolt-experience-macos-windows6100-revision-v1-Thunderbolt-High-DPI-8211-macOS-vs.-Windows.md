---
id: 6117
title: 'Thunderbolt, High DPI - macOS vs. Windows'
date: 2018-08-06T17:10:45+10:00
author: Aaron Parker
layout: revision
guid: https://stealthpuppy.com/6100-revision-v1/
permalink: /6100-revision-v1/
---
Thunderbolt 3 (and USB-C) are here to provide [a single cable for everything](https://stealthpuppy.com/thunderbolt-3/). 4K monitors can provide enough resolution that you can't see an individual pixel. Although your experience with these technologies will differ depending on your choice of operating system. Here's a quick look at the differences between Thunderbolt and high DPI displays on macOS and Windows.

# Thunderbolt 3

## macOS

Thunderbolt 3 [on macOS just works](https://www.apple.com/thunderbolt/) - plug-in a Thunderbolt device and off you go. This makes sense given that the original Thunderbolt port was [designed by Intel and Apple](https://en.wikipedia.org/wiki/Thunderbolt_(interface)). Unpacking and plugging in a Thunderbolt dock with external displays, ethernet, audio etc., on macOS in just about every case will work without installing drivers.

<figure id="attachment_6108" aria-describedby="caption-attachment-6108" style="width: 1560px" class="wp-caption aligncenter">[<img class="size-full wp-image-6108" src="https://stealthpuppy.com/wp-content/uploads/2018/08/macbook-pro-spgray-psl-closed.jpg" alt="Thunderbolt ports on the MacBook Pro" width="1560" height="140" srcset="https://stealthpuppy.com/wp-content/uploads/2018/08/macbook-pro-spgray-psl-closed.jpg 1560w, https://stealthpuppy.com/wp-content/uploads/2018/08/macbook-pro-spgray-psl-closed-150x13.jpg 150w, https://stealthpuppy.com/wp-content/uploads/2018/08/macbook-pro-spgray-psl-closed-300x27.jpg 300w, https://stealthpuppy.com/wp-content/uploads/2018/08/macbook-pro-spgray-psl-closed-768x69.jpg 768w, https://stealthpuppy.com/wp-content/uploads/2018/08/macbook-pro-spgray-psl-closed-1024x92.jpg 1024w" sizes="(max-width: 1560px) 100vw, 1560px" />](https://stealthpuppy.com/wp-content/uploads/2018/08/macbook-pro-spgray-psl-closed.jpg)<figcaption id="caption-attachment-6108" class="wp-caption-text">Thunderbolt ports on the MacBook Pro*

Here's Apple's dirty (not so) secret though - excluding the MacBook Air (and the Mini that comes with TB2), all current Macs have Thunderbolt 3 ports, [except for the MacBook](https://support.apple.com/en-au/HT207443). It has a single USB-C port only. Maybe that's OK, because the target market is likely to be purchasing the Pro line anyway, but Apple isn't a fan of labelling their ports, so caveat emptor.

macOS provides a good look at the devices plugged into your Thunderbolt ports:

<figure id="attachment_6109" aria-describedby="caption-attachment-6109" style="width: 2758px" class="wp-caption aligncenter">[<img class="size-full wp-image-6109" src="https://stealthpuppy.com/wp-content/uploads/2018/08/macOS-SystemReport-Thunderbolt.png" alt="macOS System Report showing Thunderbolt devices" width="2758" height="1792" srcset="https://stealthpuppy.com/wp-content/uploads/2018/08/macOS-SystemReport-Thunderbolt.png 2758w, https://stealthpuppy.com/wp-content/uploads/2018/08/macOS-SystemReport-Thunderbolt-150x97.png 150w, https://stealthpuppy.com/wp-content/uploads/2018/08/macOS-SystemReport-Thunderbolt-300x195.png 300w, https://stealthpuppy.com/wp-content/uploads/2018/08/macOS-SystemReport-Thunderbolt-768x499.png 768w, https://stealthpuppy.com/wp-content/uploads/2018/08/macOS-SystemReport-Thunderbolt-1024x665.png 1024w" sizes="(max-width: 2758px) 100vw, 2758px" />](https://stealthpuppy.com/wp-content/uploads/2018/08/macOS-SystemReport-Thunderbolt.png)<figcaption id="caption-attachment-6109" class="wp-caption-text">macOS System Report showing Thunderbolt devices*

Note that while the MacBook Pro with Touch Bar has 4 Thunderbolt 3 ports, these are divided across 2 busses. If you have more than one device plugged in, ensure they're plugged into either side of the laptop for best performance.

## Windows

Thunderbolt 3 on Windows 10? That is unfortunately not so straight-forward. 

I've been testing connection to my dock on an [HP Elitebook x360 G2](http://h20386.www2.hp.com/AustraliaStore/Merch/Offer.aspx?p=elitebook-x360) that comes equipped with 2 Thunderbolt 3 ports. The default Windows 10 image for this machine is an absolute mess that has a whole lot of software that isn't required. Resetting the machine back to defaults strips it right back to the bare essentials, excluding the Thunderbolt driver and software. After plugging in a Thunderbolt device, it isn't recognised and no driver or software is downloaded from Windows Update. Interestingly, no driver or software was offered by the HP Support Assistant.

Windows PCs equipped with Thunderbolt ports will have the driver and software installed by default, so typically this won't be an issue; however, if you're resetting the PC or creating a corporate image, you'll need to install that software. Every OEM should supply Thunderbolt software for download, which for HP PCs is listed as **Intel Thunderbolt 3 Secure Connect**. The software is actually provided by Intel and named Thunderbolt Bus Driver on the Intel site.

### Usage

With the software installed and a device plugged in, the user sees a message box asking to approve the connection to a Thunderbolt device.

<figure id="attachment_6114" aria-describedby="caption-attachment-6114" style="width: 609px" class="wp-caption aligncenter">[<img class="size-full wp-image-6114" src="https://stealthpuppy.com/wp-content/uploads/2018/08/Thunderbolt-ApprovePopup.png" alt="Approving connection to Thunderbolt devices on Windows 10" width="609" height="324" srcset="https://stealthpuppy.com/wp-content/uploads/2018/08/Thunderbolt-ApprovePopup.png 609w, https://stealthpuppy.com/wp-content/uploads/2018/08/Thunderbolt-ApprovePopup-150x80.png 150w, https://stealthpuppy.com/wp-content/uploads/2018/08/Thunderbolt-ApprovePopup-300x160.png 300w" sizes="(max-width: 609px) 100vw, 609px" />](https://stealthpuppy.com/wp-content/uploads/2018/08/Thunderbolt-ApprovePopup.png)<figcaption id="caption-attachment-6114" class="wp-caption-text">Approving connection to Thunderbolt devices on Windows 10*

Once approved, the device can then be viewed and managed. Management actions such as approving or removing a device requires administrator rights on the PC.

<figure id="attachment_6115" aria-describedby="caption-attachment-6115" style="width: 1677px" class="wp-caption aligncenter">[<img class="size-full wp-image-6115" src="https://stealthpuppy.com/wp-content/uploads/2018/08/Thunderbolt-AttachedDevices.png" alt="Viewing attached Thunderbolt devices on Windows 10" width="1677" height="1069" srcset="https://stealthpuppy.com/wp-content/uploads/2018/08/Thunderbolt-AttachedDevices.png 1677w, https://stealthpuppy.com/wp-content/uploads/2018/08/Thunderbolt-AttachedDevices-150x96.png 150w, https://stealthpuppy.com/wp-content/uploads/2018/08/Thunderbolt-AttachedDevices-300x191.png 300w, https://stealthpuppy.com/wp-content/uploads/2018/08/Thunderbolt-AttachedDevices-768x490.png 768w, https://stealthpuppy.com/wp-content/uploads/2018/08/Thunderbolt-AttachedDevices-1024x653.png 1024w" sizes="(max-width: 1677px) 100vw, 1677px" />](https://stealthpuppy.com/wp-content/uploads/2018/08/Thunderbolt-AttachedDevices.png)<figcaption id="caption-attachment-6115" class="wp-caption-text">Viewing attached Thunderbolt devices on Windows 10*

Of course, once plugged in, Windows sees the peripherals and connects to them as usual.

<figure id="attachment_6116" aria-describedby="caption-attachment-6116" style="width: 2477px" class="wp-caption aligncenter">[<img class="size-full wp-image-6116" src="https://stealthpuppy.com/wp-content/uploads/2018/08/Thunderbolt-WIndowsDevices.png" alt="Peripherals plugged into a Thunderbolt dock on Windows 10" width="2477" height="1466" srcset="https://stealthpuppy.com/wp-content/uploads/2018/08/Thunderbolt-WIndowsDevices.png 2477w, https://stealthpuppy.com/wp-content/uploads/2018/08/Thunderbolt-WIndowsDevices-150x89.png 150w, https://stealthpuppy.com/wp-content/uploads/2018/08/Thunderbolt-WIndowsDevices-300x178.png 300w, https://stealthpuppy.com/wp-content/uploads/2018/08/Thunderbolt-WIndowsDevices-768x455.png 768w, https://stealthpuppy.com/wp-content/uploads/2018/08/Thunderbolt-WIndowsDevices-1024x606.png 1024w" sizes="(max-width: 2477px) 100vw, 2477px" />](https://stealthpuppy.com/wp-content/uploads/2018/08/Thunderbolt-WIndowsDevices.png)<figcaption id="caption-attachment-6116" class="wp-caption-text">Peripherals plugged into a Thunderbolt dock on Windows 10*

Thunderbolt on Windows isn't as simple as it could be. It would be great to see drivers installed directly from Windows Update instead of being available separately, but once installed everything works as you would expect.

# High DPI Displays

dd

# Summary

dd

<a style="background-color: black; color: white; text-decoration: none; padding: 4px 6px; font-family: -apple-system, BlinkMacSystemFont, 'San Francisco', 'Helvetica Neue', Helvetica, Ubuntu, Roboto, Noto, 'Segoe UI', Arial, sans-serif; font-size: 12px; font-weight: bold; line-height: 1.2; display: inline-block; border-radius: 3px;" title="Download free do whatever you want high-resolution photos from Scott Webb" href="https://unsplash.com/@scottwebb?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge" target="_blank" rel="noopener noreferrer"><span style="display: inline-block; padding: 2px 3px;">Scott Webb</span></a>