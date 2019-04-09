---
id: 3595
title: Building a Lab Server to Run ESXi and Hyper-V
date: 2014-03-22T14:49:40+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=3595
permalink: /lab-server-to-run-esxi-hyper-v/
dsq_thread_id:
  - "2484425006"
pd_rating:
  - 'a:8:{s:4:"type";s:1:"0";s:5:"votes";s:1:"1";s:6:"total1";s:1:"0";s:6:"total2";s:1:"0";s:6:"total3";s:1:"1";s:6:"total4";s:1:"0";s:6:"total5";s:1:"0";s:7:"average";s:6:"3.0000";}'
categories:
  - Hardware
tags:
  - ESXi
  - Hyper-V
  - Lab
---
One of the great things I enjoyed about working at [Kelway](http://www.kelway.com/) was the access to a pretty solid lab environment. While I do have access to a lab environment at [Atlantis](http://www.atlantiscomputing.com) (3 in fact), now that I work primarily from home, I really prefer a lab environment that can provide me more flexibility. Only a local environment can do that.

I originally started out with the aim of building a system that achieved 3 goals - low power consumption, enough grunt to deliver the workloads I'd like to run, plus be (relatively) quiet. As you can probably guess, I've achieved only two of those objectives (plus blowing my budget in the process).

Having recently moved back to Australia from the UK, I've gone from spending approximately £500 a year on electricity and gas, to what I estimate will be $1500 AU on electricity (no gas appliances in our current house). If you weren't already aware, Australian summers can be hot (or bloody hot, as I prefer to say). Living in Melbourne means summers are shorter than Sydney or Brisbane, but I'll still have two issues - heat and the cost of running a lab at home.

I first started looking at a [Lenovo ThinkCentre M83 SFF Pro](http://shopap.lenovo.com/au/en/desktops/thinkcentre/towers/m83-sff/), as it's the only small-form factor PC that I can find that can take 32 GB of RAM. While it looks like a good PC, it was coming out a bit expensive for what it is and an unknown quantity when it comes to noise.

It's been a long time since I've built a PC from scratch, so to get exactly what I wanted, I thought this would be a good opportunity to do so. First though, a word of caution, I'm no expert, what I've ended up with worked for me and this spec could be definitely be improved upon.

# **Picking a CPU**

My first step was to settle on a CPU - that way I can build everything else around it as the choice of CPU has an impact on the socket and motherboard plus the maximum amount of RAM. While I did do some research on various processors, I did find that I ended up being limited by availability.

Intel CPUs have been my personal preference, so I ruled out AMD immediately. If I'd used an AMD CPU, I probably could have saved a bit on the final build.

Starting with the [Core i5](http://www.intel.com.au/content/www/au/en/processors/core/core-i5-processor.html) made some sense, both from a power consumption and cost perspective, but the i5 has two things going against it - no Hyper-Threading and a maximum of 32 GB of RAM. I didn't want to limit my workloads, so I've gone with a [Core i7](http://www.intel.com.au/content/www/au/en/processors/core/core-i7-processor.html).

To build a 32 GB system, you could go with the [Core i7-4770K](http://ark.intel.com/products/75123/intel-core-i7-4770k-processor-8m-cache-up-to-3_90-ghz) that uses a socket LGA1150. One problem with the 4th generation Core i7 (i.e. [Haswell](https://en.wikipedia.org/wiki/Haswell_(microarchitecture))) is that they don't yet support 64GB of RAM (as far as I can tell).

<img class="alignleft size-full wp-image-3601" alt="Core-i7-CPU" src="https://stealthpuppy.com/media/2014/03/Core-i7-CPU.jpg" width="200" height="172" srcset="https://stealthpuppy.com/media/2014/03/Core-i7-CPU.jpg 200w, https://stealthpuppy.com/media/2014/03/Core-i7-CPU-150x129.jpg 150w" sizes="(max-width: 200px) 100vw, 200px" /> For a 64 GB system I picked the [Core i7-4820K](http://ark.intel.com/products/77781) - this CPU is the older [Ivy Bridge-E](https://en.wikipedia.org/wiki/Ivy_Bridge_(microarchitecture)) architecture. While I priced up a system based on the 4770K, I ended up going with the 4820K, so that I could build a machine with 64 GB of RAM.

As I'm doing testing and modelling with [a solution that utilise a lot of RAM](http://atlantiscomputing.com/), I really needed to go with as much RAM as I could afford. There ended up being about $500-$600 AU difference between a 32 GB system and a 64 GB system, so budget be damned, 64 GB PC is what I got.

# Selecting a Motherboard

I had originally wanted to build a system around a min-ITX or mini/microATX board to build a smaller PC but the choice of CPU using the socket LGA2011 and 64 GB of RAM has forced me on to a full ATX board.

As I'm not interested in over-clocking, my requirements for a motherboard were simple - I went for the lowest price board that could fit 64 GB of RAM (8 DIMM slots) and supports a minimum of 4 x SATA3 (6Gbps) ports. Unless you're looking at server boards, you'll find most desktop motherboards come with a lot of extra features that are just not required for a lab server (sound, SPDIF, heaps of USB ports, FireWire etc.).

<img class="alignright size-full wp-image-3603" alt="ASRock-Extreme6" src="https://stealthpuppy.com/media/2014/03/ASRock-Extreme6.jpg" width="200" height="108" srcset="https://stealthpuppy.com/media/2014/03/ASRock-Extreme6.jpg 200w, https://stealthpuppy.com/media/2014/03/ASRock-Extreme6-150x81.jpg 150w" sizes="(max-width: 200px) 100vw, 200px" /> Ultimately I went for the [ASRock X79 Extreme 6](http://www.asrock.com/mb/Intel/X79%20Extreme6/) with 5 x SATA 3 ports. One thing I've found out in building this PC, is that the Intel chipsets typically provide 2 x SATA3 ports only. The remaining SATA ports are provided by a second chipset (or sometimes even a third chipset). Not a problem for Windows, but not the best choice for ESXi (more on that later).

# Filling it With RAM

<img class="alignleft size-full wp-image-3604" alt="G.Skill-RipjawsX" src="https://stealthpuppy.com/media/2014/03/G.Skill-RipjawsX.jpg" width="200" height="117" srcset="https://stealthpuppy.com/media/2014/03/G.Skill-RipjawsX.jpg 200w, https://stealthpuppy.com/media/2014/03/G.Skill-RipjawsX-150x87.jpg 150w" sizes="(max-width: 200px) 100vw, 200px" /> 

With 8 DIMM slots to fill and 64 GB of RAM to get to, I needed to find 8 x 8 GB DIMMs. The ASRock X79 Extreme 6 supports 2400 / 2133 / 1866 / 1600 / 1333 / 1066 MHz clock speeds.

I originally looked at Corsair Vengeance RAM but settled on [G.Skill RipjawsX DDR3-1600 F3-1600C9Q-32GXM](http://www.gskill.com/en/product/f3-1600c9q-32gxm), at $100 AU less than the Corsair. With a [CAS latency](https://en.wikipedia.org/wiki/CAS_latency) of 9-9-9-24, I think this ended up being good value for money.

# Housing the Rig in a Case

<img class="alignright size-full wp-image-3608" alt="Corsair-330r" src="https://stealthpuppy.com/media/2014/03/Corsair-330r.png" width="200" height="264" srcset="https://stealthpuppy.com/media/2014/03/Corsair-330r.png 200w, https://stealthpuppy.com/media/2014/03/Corsair-330r-113x150.png 113w" sizes="(max-width: 200px) 100vw, 200px" /> I had two main requirements for a case - help the PC be as silent as possible and look unassuming (as it's not locked away but sitting next to the living room). Additionally, as I'd locked myself into an ATX board, I needed an ATX case.

When picking a case, I looked at cooling options as well - by picking a CPU cooler, case fans and a case from the same manufacture, I was comfortable that I could build the system knowing that every thing would fit. I picked the [Corsair Carbide 330R Quiet Mid-Tower](http://www.corsair.com/en-au/carbide-series-330r-quiet-mid-tower-case) case which looks nice and has good reviews.

# Keeping it Cool

<img class="alignleft size-full wp-image-3609" alt="Corsair-H55" src="https://stealthpuppy.com/media/2014/03/Corsair-H55.png" width="200" height="169" srcset="https://stealthpuppy.com/media/2014/03/Corsair-H55.png 200w, https://stealthpuppy.com/media/2014/03/Corsair-H55-150x126.png 150w" sizes="(max-width: 200px) 100vw, 200px" /> While a water cooler probably pulls more power than a heat sink/fan combination, I went with water cooling to ensure I could move heat away from the CPU as efficiently as possible.

I chose the [Corsair Hydro Series H55 Quiet CPU Cooler](http://www.corsair.com/en-au/hydro-series-h55-quiet-cpu-cooler). This is a single fan, 120mm radiator but should be enough to sufficiently move any heat generated by the CPU.

The 330R includes 1 x 120mm (rear) and 1 x 140mm fans (front), but I've replaced those with [Corsair's Quiet Edition 120mm](http://www.corsair.com/en-au/air-series-af120-quiet-edition-high-airflow-120mm-fan) and [140mm](http://www.corsair.com/en-au/air-series-af140-quiet-edition-high-airflow-140mm-fan) fans with a second 140mm in the front to pull in more air. The case does include room for two 120mm or 140mm fans with a radiator in the top, which requires popping the top plate off to allow for exhaust but would increase the noise coming out of the system.

# Snorage

<img class="alignright size-full wp-image-3610" alt="samsung_840_evo_ssd_0" src="https://stealthpuppy.com/media/2014/03/samsung_840_evo_ssd_0.jpg" width="200" height="104" srcset="https://stealthpuppy.com/media/2014/03/samsung_840_evo_ssd_0.jpg 200w, https://stealthpuppy.com/media/2014/03/samsung_840_evo_ssd_0-150x78.jpg 150w" sizes="(max-width: 200px) 100vw, 200px" /> To ensure the lowest power consumption for storage devices, I've stuck with SSDs. I had a few SSDs already on hand already, but did purchase a couple more to provide more capacity.

In the PC I have installed:

  * 1 x Corsair 64 GB SSD SATA2 (although this drive works under Windows, I can't mount it under ESXi)
  * 1 x OCZ Vertex 3 120 GB SSD
  * 1 x Samsung 840 EVO Pro 120 GB SSD
  * 2 x Samsung 840 EVO 250 GB SSDs (these are new)

I've also got an 8GB USB3 flash drive that ESXi is running from. It will be interesting to see when this drive fails, which is inevitable if I've got an OS running from it.

# Powering the Beast

Calculating how much power was quite simple, once you find a tool that does it for you. [Bryan Chriscoli](https://twitter.com/techbry) put me onto [eXtreme Power Supply Calculator Lite](http://extreme.outervision.com/PSUEngine) which does a fantastic job of calculating the minimum PSU wattage required.

<img class="alignleft size-full wp-image-3611" alt="Corsair-RM450" src="https://stealthpuppy.com/media/2014/03/Corsair-RM450.png" width="200" height="147" srcset="https://stealthpuppy.com/media/2014/03/Corsair-RM450.png 200w, https://stealthpuppy.com/media/2014/03/Corsair-RM450-150x110.png 150w" sizes="(max-width: 200px) 100vw, 200px" /> To power the PC I chose the [Corsair RM450](http://www.corsair.com/en-au/air-series-af140-quiet-edition-high-airflow-140mm-fan) power supply. This is a 450W 80 PLUS Gold Certified (i.e. highly efficient) modular power supply, which is probably more than I need but I found 400W power supplies, that didn't look like cheap crap, hard to come by.

The RM450 has a fan that will only power on after the PSU reaches a temperature that requires a fan shifting heat, keep noise down during normal operation. It's a great quality PSU that looks good and feels nice in the hand.

I had originally looked at the Seasonic 400W fanless power supply, but was a little worried that on a really hot day, shifting heat out of the case could be a problem and it's also a pretty expensive PSU.

# Miscellaneous additions

The ASRock mother board has a single Broadcom BCM57781 Gigabit adapter on-board, so I've added an [Intel Gigabit CT Desktop](https://www-ssl.intel.com/content/www/us/en/network-adapters/gigabit-network-adapters/gigabit-ct-desktop-adapter.html) PCIe adapter. This way I can use the Broadcom adapter for management traffic and the Intel adapter for virtual machine networks.

Something I didn't realise until I'd put the whole thing together, is that the ASRock Extreme 6 motherboard doesn't include a GPU. I'd originally focussed on motherboards with on-board Intel graphics and completely forgot to check the ASRock board when ordering it. So I've added an [EVGA NVIDIA GeForce 201 fanless graphics adapter](http://www.evga.com/Products/Product.aspx?pn=512-P3-1311-KR) to the build as well. While this is silent, will have increased the power consumption of the system a bit.

# Thoughts on Building this PC

Building this PC took a really long time - it's been quite a while since I last built a PC and I needed to ensure I got this one right and it was up and running on first go (other than having to source a graphics adapter after completing the build).

Here's a few thoughts and tips if you're looking to build your own lab PC:

  * Picking the right hardware and finding out which parts will be suitable is painful. The best site I found that helped me build the right parts as [PCPartPicker](http://pcpartpicker.com/). It would be nice if PC parts retailers provided this functionality in their web sites, but most of them (at least in Australia) have terrible web sites.
  * The Corsair Carbide 330R is a nice case and performs well for airflow and noise. It would have been nice to have more than 4 x 3.5&#8243; drive bays and there's not a lot of space between the back of the motherboard and the side panel. This makes putting the side panel back on a challenge, because the routed cables don't sit completely flat. While I think the 330R is a nice case, I think you could choose a better case.
  * This is the first time I've built a water cooled PC - fitting the fan and radiator was fiddly, but fitting the CPU cooler was very simple. Although Corsair recommends fitting the radiator fan so that it sucks air into the case, I've fitted it to blow air out of the case - which is a good thing, since...
  * I should have picked low profile DIMMs. The radiator fan is practically sitting right on top of the RAM heat sinks. I don't think this is an issue, but at least it's not the radiator touch the heat sinks.
  * Unfortunately the i7 4820K CPU can run at up to 130W, so not ideal for low power.
  * To get the additional SSDs connected to SATA ports on the ASMedia chipset working, I needed to follow this article: [How to make your unsupported SATA AHCI Controller work with ESXi 5.5](http://www.v-front.de/2013/11/how-to-make-your-unsupported-sata-ahci.html). Without this change to ESXi, the drives connected to the additional SATA ports were just not seen. This wasn't a problem under Windows Server.
  * The noise level at idle is pretty good, but could be better. I'm now investigating a fan controller and I'm sure that I can run the fans at lower speeds to reduce noise, without affecting cooling performance too much.

# Performance

Getting this up and running under Windows Server 2012 R2 was very simple, practically all drivers were picked up by Windows natively or found on Windows Update. Taking a look at Task Manager is a thing of beauty:

[<img class="alignnone size-full wp-image-3617" alt="hv2-TaskManager-RAM-VanillaInstall" src="https://stealthpuppy.com/media/2014/03/hv2-TaskManager-RAM-VanillaInstall.png" width="762" height="718" srcset="https://stealthpuppy.com/media/2014/03/hv2-TaskManager-RAM-VanillaInstall.png 762w, https://stealthpuppy.com/media/2014/03/hv2-TaskManager-RAM-VanillaInstall-150x141.png 150w, https://stealthpuppy.com/media/2014/03/hv2-TaskManager-RAM-VanillaInstall-300x282.png 300w, https://stealthpuppy.com/media/2014/03/hv2-TaskManager-RAM-VanillaInstall-624x587.png 624w" sizes="(max-width: 762px) 100vw, 762px" />]({{site.baseurl}}/media/2014/03/hv2-TaskManager-RAM-VanillaInstall.png)

I'm yet to do full performance tests and one thing to attempt is running [Login VSI](http://www.loginvsi.com/) to see what I can get out of it. A simple test of [IOmeter](http://www.iometer.org/) [simulating a VDI workload](http://blog.atlantiscomputing.com/2013/08/how-to-use-iometer-to-simulate-a-desktop-workload/) on [ILIO for Persistent VDI](http://www.atlantiscomputing.com/products/persistent-vdi) drove an impressive 42K IOPs (with ILIO for Stateless VDI doing about the same number).

[<img class="alignnone size-full wp-image-3618" alt="Lab-ILIO-Test1" src="https://stealthpuppy.com/media/2014/03/Lab-ILIO-Test1.png" width="778" height="499" srcset="https://stealthpuppy.com/media/2014/03/Lab-ILIO-Test1.png 778w, https://stealthpuppy.com/media/2014/03/Lab-ILIO-Test1-150x96.png 150w, https://stealthpuppy.com/media/2014/03/Lab-ILIO-Test1-300x192.png 300w, https://stealthpuppy.com/media/2014/03/Lab-ILIO-Test1-624x400.png 624w" sizes="(max-width: 778px) 100vw, 778px" />]({{site.baseurl}}/media/2014/03/Lab-ILIO-Test1.png)

As for power consumption, at idle with ESXi 5.5 booted, it draws up to around 105 watts. I have seen it drop to a low of between 65 and 71 watts as well. As a very basic CPU stress test, I ran [HeavyLoad 3.3](http://www.jam-software.com/heavyload/) on a Windows 8.1 x86 virtual machine with 1 vCPU and 8 cores. Power consumption jumped up to a consistent 128 watts.

<img class="alignnone size-full wp-image-3620" alt="128watts" src="https://stealthpuppy.com/media/2014/03/128watts.jpg" width="656" height="412" srcset="https://stealthpuppy.com/media/2014/03/128watts.jpg 656w, https://stealthpuppy.com/media/2014/03/128watts-150x94.jpg 150w, https://stealthpuppy.com/media/2014/03/128watts-300x188.jpg 300w, https://stealthpuppy.com/media/2014/03/128watts-624x391.jpg 624w" sizes="(max-width: 656px) 100vw, 656px" /> 

So not as low power as I originally set out to accomplish, but with this configuration it's a pretty beefy work horse. Some more testing with different settings and under Hyper-V is required.

# Spec List

Here's the final list of components that went into the build and the price in Australian dollars. I've colour coded the totals to make it simple to see where the costs went into. It's not surprising that the most expensive component of this build was the RAM.

[<img class="alignleft size-full wp-image-3613" alt="PCbuild" src="https://stealthpuppy.com/media/2014/03/PCbuild.png" width="614" height="277" srcset="https://stealthpuppy.com/media/2014/03/PCbuild.png 614w, https://stealthpuppy.com/media/2014/03/PCbuild-150x67.png 150w, https://stealthpuppy.com/media/2014/03/PCbuild-300x135.png 300w" sizes="(max-width: 614px) 100vw, 614px" />]({{site.baseurl}}/media/2014/03/PCbuild.png)

Finally, here's a look inside the finished build:

[<img class="alignnone size-large wp-image-3615" alt="InsideCustomBuild" src="https://stealthpuppy.com/media/2014/03/InsideCustomBuild-1024x768.jpg" width="625" height="468" srcset="https://stealthpuppy.com/media/2014/03/InsideCustomBuild-1024x768.jpg 1024w, https://stealthpuppy.com/media/2014/03/InsideCustomBuild-150x112.jpg 150w, https://stealthpuppy.com/media/2014/03/InsideCustomBuild-300x225.jpg 300w, https://stealthpuppy.com/media/2014/03/InsideCustomBuild-624x468.jpg 624w, https://stealthpuppy.com/media/2014/03/InsideCustomBuild.jpg 1281w" sizes="(max-width: 625px) 100vw, 625px" />]({{site.baseurl}}/media/2014/03/InsideCustomBuild.jpg)