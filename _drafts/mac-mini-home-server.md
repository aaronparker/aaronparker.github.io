---
layout: post
title: 'A Mac mini as a home server
description: 'Setting up macOS on a Mac mini M1 as a home server.'
permalink: "/mac-mini-home-server/"
image:
  path: "/assets/img/macmini/image.jpg"
  srcset:
    1920w: "/assets/img/macmini/image.jpg"
    960w: "/assets/img/macmini/image@0,5x.jpg"
    480w: "/assets/img/macmini/image@0,25x.jpg"
comments: true
---
macOS isn't built to run as a server, but with a few tweaks you can get it to run quite well.

## I need a new server

Back in 2016, I [purchased an Intel NUC](https://stealthpuppy.com/intel-nuc6i5syb-home-lab/) for running various workloads - it's previously run VMs on Hyper-V (Windows 10) or Ubuntu. For the past few years it has been relegated to home network management by running a UniFi Network Server, [AdGuard Home](https://github.com/AdguardTeam/AdGuardHome#getting-started) and [Homebridge](https://homebridge.io). At over eight years old now, it's past its prime and I've been looking at a replacement for some time. 

A couple of options for replacement devices included:

* Raspberry Pi 5 - $260 AUD for a Pi 5, 8GB RAM, 256 GB SSD, SSD NVMe hat, aluminium case and a power supply. This is a great price point for a device that would run a couple of simple services for my home network
* ASUS NUC - $627 AUD for an ASUS NUC 13 Pro Arena Canyon i3, 8GB RAM, 256GB SSD. While this would be more versatile, it's way above what I'm willing to pay for this project

## Why a Mac mini

Recently I picked up a Mac mini M4 Pro as my primary work device, so the thought occurred to me use another Mac mini as a home server. There's a few reasons why a Mac would make for a good server:

1. Low power consumption. The M series chip should sit somewhere between a Raspberry Pi and an x86 15W chip
2. [macOS content caching](https://support.apple.com/en-au/guide/deployment/depde72e125f/web) - with multiple Macs, iPads, iPhones and an Apple TV in the house, we have a good number of devices that can use local caching
3. Time Machine backups - I've previously used Time Machine on a Synology NAS, but it would fail every so often. Backup to a macOS Time Machine server should be more stable
4. Silence - our home server sits in our lounge room in the TV cabinet, so silence is important

I went with a [Mac mini M1](https://support.apple.com/en-us/111894) with 8GB RAM and 256GB SSD from eBay for $450 AUD. Not at lot of RAM and storage to be sure, but the downside of a second hand Mac is that these are still way overpriced, even with the release of the latest M4 Mac. If you're looking for a second hand Mac mini on eBay, it pays to be patient and find one at the right price.

Thankfully, mine arrived in the original box, with no marks or scratches, and in good working order.

## Set up a Mac mini as a server


