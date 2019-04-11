---
id: 4299
title: An Intel NUC6i5SYB for My Home Lab
date: 2016-04-10T14:04:12+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy/?p=4299
permalink: /intel-nuc6i5syb-home-lab/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "4734576935"
image: /media/2016/04/Intel-NUC6i5SYB.jpg
categories:
  - Hardware
tags:
  - Intel NUC
  - NUC6i5SYB
---
I've recently added a new PC to my home lab - the Intel NUC6i5SYB, to replace a Lenovo laptop that I've been using to host VMs on Hyper-V. In this article, I'll cover an overview of the NUC, how I've configured this device and some details on performance.

For the past couple of years I've been using a [Lenovo ThinkPad 440s ultrabook](http://shop.lenovo.com/us/en/laptops/thinkpad/t-series/t440s/) with an i5, 12GB RAM and a 256GB SSD running Windows Server 2012 R2 with Hyper-V as a host for some infrastructure VMs (XenDesktop, App-V infrastructure, vCenter, SQL Server etc.), but it's come time to replace it. I looked at another low power device as a hypervisor host and the Intel NUC was the go to PC.

# Intel NUC6i5SYB / NUC6i5SYH Hardware

This is one of the new Skylake versions of the [Intel NUC](http://www.intel.com.au/content/www/au/en/nuc/overview.html). While the model I've purchased is the NUC6i5SYB, it seems to be the same as, or close to, the [NUC6i5SYH](http://www.intel.com/content/www/us/en/nuc/nuc-kit-nuc6i5syh.html) as this model keeps coming up in searches for the NUC6i5SYB.

This version of the NUC is capable of taking two drives with one SATA and one M.2 connections. Maxing out the RAM makes this an amazing low-power hypervisor in a small package.

For this build, which I wanted to keep to a budget, I purchased:

  * Intel NUC6i5SYB ($649AU)
  * 2 x 16GB G.Skill Ripjaws PC4-17000 (2133MHz) DDR4 SODIMM ($298AU)
  * Samsung 850 EVO 250GB SSD ($135AU)
  * Samsung 850 EVO Series, m.2 (SATA) 120GB SSD ($105AU)

The total package came to $1,187.00AU.

## CPU

The i5 processor in the Lenovo laptop is the previous Haswell mobile CPU (i5-4300U) and I'm replacing it with the NUC that has a Skylake i5 (i5-6260U), also a mobile processor. This CPU has a similar base clock speed at the same 15W, but the Skylake model brings support (as in supported by Intel) for 32GB of RAM.

Like its predecessor, the newer i5 has 2 cores with hyper-threading support, so I get 4 cores (or 4 threads to be more precise) to play with for VMs.

A previous generation i7 version of the Intel NUC comes with the [i7-5557U](http://ark.intel.com/products/84993/Intel-Core-i7-5557U-Processor-4M-Cache-up-to-3_40-GHz); however this still only has 2 cores (unlike some desktop versions that have 4 cores) but jumps the base clock frequency to 3.1Ghz. If you need the extra performance at 28W, then it's still a low power package but not the latest generation of CPU. This model comes in at $719AU.

A [newer i7 Skylake version of the NUC](http://www.intel.com/content/www/us/en/nuc/nuc-kit-nuc6i7kyk-features-configurations.html) is due for release in May with the i7-6770HQ that provides 4 cores. This one looks like a beast but perhaps overkill for this use case. Here's [a comparison of all 3 CPUs models](http://ark.intel.com/compare/84993,91160,93341).

## SSDs

I'd originally had the idea that the M.2 SSD is for the operating system, while a larger drive would be for hosting VMs etc. Once I've installed the RAM and SSDs and powered on the PC, I've subsequently found that the SATA SSD is drive 0 while the M.2 drive is drive 1. This isn't a show stopper (not enough to exchange the drives) and I'm still using the M.2 drive for the OS; however I would have change the configuration had I known this before purchase.

## RAM

I've purchased G.Skill RAM previously and found them to be reliable and perform well. G.Skill often hits the middle range in terms of price when compared with other vendors, so I've stuck with the brand with 2 x 16GB SODIMMs.

## Installing RAM and SSDs

Installing the RAM and drives into a NUC is simple enough - pop the top off, install the RAM into the two slots, install the M.2 drive with a screw to keep it into place and the SATA SSD just pushes into the slot in the top of the NUC. Here's a view of the installed hardware:

![Intel NUC open with RAM and SSDs installed." width="1024" height="768" srcset="{{site.baseurl}}/media/2016/04/Open-NUC-1024x768.jpg 1024w, {{site.baseurl}}/media/2016/04/Open-NUC-150x113.jpg 150w, {{site.baseurl}}/media/2016/04/Open-NUC-300x225.jpg 300w, {{site.baseurl}}/media/2016/04/Open-NUC-768x576.jpg 768w, {{site.baseurl}}/media/2016/04/Open-NUC.jpg 1224w" sizes="(max-width: 1024px) 100vw, 1024px" /></a>*Intel NUC open with RAM and SSDs installed.*

Screw the lid back on and power up the PC. The 1.5 amp power supply comes with removable adapters to suit multiple regions.

# Configuration

The Intel NUC comes with the Intel Visual BIOS, which is a nice change from text-based UIs we're used to. Here's a short walk-through of the BIOS configuration - as a hypervisor I've disabled hardware such as audio, Bluetooth and Wi-Fi etc.

<img class="ngg_displayed_gallery mceItem" src="{{site.baseurl}}/nextgen-attach_to_post/preview/id--4351" alt="" data-mce-placeholder="1" /> 

# Installing Windows

Installing Windows 10is straight-forward, Windows 10 will recognise most devices and will require updates for the chipset and display driver. Support for Windows Server, however, is a bit more tricky.

Windows Server does not provide support for the [Intel I219-V](http://ark.intel.com/products/82186/Intel-Ethernet-Connection-I219-V) network adapter in-box. So installing manually or via an automated deployment requires a manual installation of the network driver - because the driver is not signed for Windows Server, there is no automated install.

At this time, I have Windows Server 2016 installed but I would prefer to be running Nano Server - without a signed network driver there's no way to get Nano Server working on this PC. To get a driver signed, I'm getting a code signing certificate from [DigiCert](https://www.digicert.com/) to enable me to sign the drivers. I'll write an article in the future on getting Nano Server onto the Intel NUC.

With Windows Server or Windows Server Core and with devices disabled in the BIOS, Device Manager looks like this:

![Device Manager after installing Windows Server and required drivers." width="1024" height="715" srcset="{{site.baseurl}}/media/2016/04/Intel-NUC-Device-Manager-1024x715.png 1024w, {{site.baseurl}}/media/2016/04/Intel-NUC-Device-Manager-150x105.png 150w, {{site.baseurl}}/media/2016/04/Intel-NUC-Device-Manager-300x210.png 300w, {{site.baseurl}}/media/2016/04/Intel-NUC-Device-Manager-768x537.png 768w, {{site.baseurl}}/media/2016/04/Intel-NUC-Device-Manager.png 1188w" sizes="(max-width: 1024px) 100vw, 1024px" /></a>*Device Manager after installing Windows Server and required drivers.*

With a custom automated deployment via MDT, the disk partitions resulted as follows:

![Disk partitions after installing Windows Server via MDT" width="903" height="498" srcset="{{site.baseurl}}/media/2016/04/Intel-NUC-Disk-Manager.png 903w, {{site.baseurl}}/media/2016/04/Intel-NUC-Disk-Manager-150x83.png 150w, {{site.baseurl}}/media/2016/04/Intel-NUC-Disk-Manager-300x165.png 300w, {{site.baseurl}}/media/2016/04/Intel-NUC-Disk-Manager-768x424.png 768w" sizes="(max-width: 903px) 100vw, 903px" /></a>*Disk partitions after installing Windows Server via MDT*

# Performance

I've done some basic performance testing on the hardware with PassMark and Iometer on Windows 10 x64. The PassMark result is above average with both disk and RAM performing very well. View the full benchmark results [on the PassMark web site](http://www.passmark.com/baselines/V8/display.php?id=58626026814).

[<img src="http://www.passmark.com/baselines/V8/images/58626026814.png" alt="PassMark Rating" border="0" />](http://www.passmark.com/baselines/V8/display.php?id=58626026814)

To test both SSDs, I've used Iometer with a 4K block size, 80% write, 80% random write. Both SSDs provide excellent results and I've some to expect great performance from Samsung SSDs which I've been using for a number of years how.

Here's the result for the Samsung 850 EVO 120GB M.2 drive:

![Samsung 850 EVO M.2 drive: Iometer performance - 4K blocks, 80% write, 80% random" width="764" height="472" srcset="{{site.baseurl}}/media/2016/04/Iometer-CDrive.png 764w, {{site.baseurl}}/media/2016/04/Iometer-CDrive-150x93.png 150w, {{site.baseurl}}/media/2016/04/Iometer-CDrive-300x185.png 300w" sizes="(max-width: 764px) 100vw, 764px" /></a>*Samsung 850 EVO M.2 drive: Iometer performance - 4K blocks, 80% write, 80% random*

And results for the Samsung EVO 850 256GB SATA drive:

Note that both drives are the cheaper EVOs, not the EVO Pros. Spending more for the Pro version ( ~$100AU additional per drive) should provide even better results; however for use in a home lab, this type of performance is pretty good.

# Conclusion

I'm very happy with the Intel NUC6i5SYB, especially with this configuration and price point. The size is excellent and it's also low noise and low power, even under load.

I would, however, have done two things differently:

  1. Swapped the drive configurations - make the M.2 the larger drive for VM storage. As this is drive 1, it would simplify OS deployment to the SATA SSD as drive 0.
  2. Extended my budget and gone with the Samsung 50GB M.2 SSD at $235AU. While I'm using deduplication built into Windows Server, there's not a huge price difference between the 256GB and 512GB SSDs.

Overall though this is a great addition to my home lab environment.