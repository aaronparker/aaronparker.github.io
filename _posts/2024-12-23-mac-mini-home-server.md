---
layout: post
title: 'A Mac mini as a home server'
description: 'Setting up macOS on a Mac mini M1 as a home server.'
permalink: "/mac-mini-home-server/"
image:
  path: "/assets/img/macmini/image.jpg"
  srcset:
    1920w: "/assets/img/macmini/image.jpg"
    960w: "/assets/img/macmini/image@0,5x.jpg"
    480w: "/assets/img/macmini/image@0,25x.jpg"
comments: true
date: 2024-12-23 11:00 +1100
---
- this unordered seed list will be replaced by the toc
{:toc}

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

I went with a [Mac mini M1](https://support.apple.com/en-us/111894) with 8GB RAM, 256GB SSD and 2 Thunderbolt 3 ports from eBay for $450 AUD. Not at lot of RAM and storage to be sure, but the downside of a second hand Mac is that these are still way overpriced, even with the release of the latest M4 Mac. If you're looking for a second hand Mac mini on eBay, it pays to be patient and find one at the right price.

Thankfully, mine arrived in the original box, with no marks or scratches, and in good working order.

## Set up a Mac mini as a server

### Hardware Setup

For this role, I have the Mac mini connected to the network via ethernet. While not strictly required, it also has an HDMI dummy plug so that it thinks it as a 1080p monitor plugged in allowing it to run headless.

For storage I have an old 256GB SATA SSD plugged in via USB-C because that's what I had to hand; however, I'll replace this with a Thunderbolt 3 / USB 4 drive enclosure and a PCIe Gen3 M.2 SSD (there's no point going to Gen4 because Thunderbolt 3 will be the bottleneck).

### First Boot Setup

During the initial macOS setup, I've skipped iCloud configuration and not used an Apple ID - I don't want iCloud downloading Photos, Messages and files etc., to this device. Additionally, FileVault is not enabled so that I can remotely start or reboot the machine.

Initially I was running this without being logged in, but [I found](https://bsky.app/profile/stealthpuppy.com/post/3ldfpzpkcx22i) that `/usr/libexec/audiomxd` would run with high CPU utilisation like this, so it now logs in automatically to the desktop at boot. This also helps with a couple of apps that I'll discuss later.

### Performance and Power Settings

I've configured the following settings to either reduce power consumption or improve performance when accessing the Mac remotely. I don't have hard proof for every setting here, but these logically make sense based on the potential for local or remote access performance.

* Disable Wi-Fi and Bluetooth - **Off**. I have no need for these on this machine and disabling these will help to save on power consumption
* System Settings / Energy / Prevent automatic sleeping with the display is off, Wake for network access, Start up automatically after network failure. These settings are enabled to ensure the device does not got to sleep
* System Settings / Accessibility / Display / Reduce motion, Reduce transparency - **On**
* System Settings / Appearance / Allow wallpaper tinting in windows - **Off**
* System Settings / Apple Intelligence & Siri - **Off**. This feature is certainly not required on a server
* System Settings / Desktop & Dock / Minimise windows using (Scale effect), Animate opening applications - **On**
* System Settings / Spotlight / Search results - **Disable all options**. Once the initial indexing is complete, Spotlight probably won't use too much in terms of resources, but turning it off will eke out that little extra performance or avoid performance issues.

Spotlight can be completely disabled with `sudo mdutil -v -E -i off /`. Keep in mind that this will likely reduce the effectiveness of searching on mounted shares from remote machines.

* System Settings / Wallpaper / Choose a solid colour
* System Settings / Notifications / Show previews (**Never**), Allow notifications when the display is sleeping (**Off**), Allow notifications when the screen is locked (**Off**)
* System Settings / Sound / Play sound on startup, Play user interface sound effects - **Off**. The Mac mini has a built in speaker, but doesn't need to be making sound in the lounge room
* System Settings / Lock Screen / Start Screen Saver when inactive (**Never**), Turn display off when inactive (**For 5 minutes**), Require password after screen saver begins or display is turned off (**Never**), Show large clock (**Never**) - these settings make sure that the screen saver won't kick in to consume CPU, but the screen, even with the HDMI headless adapter, will turn off to reduce power consumption
* System Settings / Game Center (**Off**) - I won't be gaming on this machine

### Sharing Settings

Here's how I've configured [sharing settings](https://support.apple.com/en-au/guide/mac-mini/apd05a94454f/mac) in macOS:

* System Settings / General / Sharing / File Sharing - **On**. I don't need large amounts of remote file storage, but this is for convenience
* System Settings / General / Sharing / Media Sharing - **Home Sharing**. I've copied my music library to this device and this enables remote sharing from the Apple TV etc.
* System Settings / General / Sharing / Screen Sharing - **On**. This allows remote access to the device via the Screen Sharing app
* System Settings / General / Sharing / Content Caching - Storage (cache location is on an external drive), 
    Clients / Devices using the same public IP address, use ony public IP address. 

Content Cache stats aren't fantastic just yet, but over time this will increase. On another machine I've seen this at around 45GB cached.

![AssetCacheManagerUtil status]({{site.baseurl}}/media/2024/12/AssetCacheManagerUtil.png)

* System Settings / General / Sharing / Remote Login - **On**. This enables SSH access to perform simple remote management tasks
* System Settings / General / Software Update / Automatic Updates - Download new updates when available, Install macOS updates, Install application updates from the App Store, Install Security Responses and system files - **On**

## Homebrew

Before installing any software, I've installed [Homebrew](https://brew.sh), giving me a package manager for macOS that I can use at the command line.

To make updating packages with Homebrew simpler, I've added this alias to my `.zshrc` file:

```bash
alias drink="brew update && brew upgrade && brew cleanup"
```

## DNS filtering with AdGuard Home

Installing AdGuard Home on macOS is straight-forward - I followed the [automated install instructions](https://github.com/AdguardTeam/AdGuardHome?tab=readme-ov-file#automated-install-linux-and-mac) to install directly onto macOS (i.e. no Docker etc.).

Before setup, I've configured external DNS servers in macOS to be able to complete the download and install of AdGuard, then post setup, the device is using my router as the DNS server, which is how all devices on my network are configured. The router then points to AdGuard for all DNS services.

## Extending Apple HomeKit with HomeBridge

The install instructions for [HomeBridge on macOS](https://github.com/homebridge/homebridge/wiki/Install-Homebridge-on-macOS) are easy to follow; however, HomeBridge requires Node and that's more complex to install correctly.

I've found the best way to install Node on macOS, is to first install nvm via Homebrew (`brew install nvm`), then install the latest LTS version of Node via nvm (rather than installing Node directly via Homebrew). To install the latest Node LTS, I've useD:

```bash
nvm install v22.12.0
```

Two things I've found with Homebridge on macOS:

1. I couldn't get HomeKit to discover the HomeBridge child bridges, so I've not used child bridges (just the base Homebridge bridge)
2. To get discovery to work correctly, I've had to add the `mdns` property with the `interface` value matching the IP address of the listener, as detailed in [this issue](https://github.com/homebridge/homebridge/issues/1957#issuecomment-410505653):

```json
{
    "bridge": {
        "name": "Homebridge 2850",
        "username": "0E:21:D0:DB:28:51",
        "port": 51748,
        "pin": "743-73-994",
        "advertiser": "ciao"
    },
    "mdns": {
        "interface": "192.168.1.4"
    },
    "accessories": [
```

### Remote hardware monitoring with iStatistica

I've been using [iStatistic Pro](https://www.imagetasks.com/istatistica/) for performance monitoring (CPU, RAM, temps etc.) for some time and this application has a web access portal to view stats. For this app to run, a user needs to be signed into the console of the machine.

![iStatistic Pro web access]({{site.baseurl}}/media/2024/12/iStatisticaWebAccess.jpeg)

### Serving up media with Plex Server

Installing and configuring Plex Server is very simple - just follow the [install instructions](https://support.plex.tv/articles/200288586-installation/#toc-1). Like iStatistica, Plex Server requires a user to be signed into the console for the app to run.

Plex Server can be installed with Homebrew via this command:

```bash
brew install plex-media-server
```

### Download torrents with Transmission

[Transmission](https://transmissionbt.com/download.html) is my typical go-to for torrent downloads on macOS. It includes a remote web access interface for adding and monitoring downloads. Just like iStatistica and Plex Server, it too requires a user to be signed into the console for the app to run.

One issue I've found with the remote access interface, is that I need to access it via the IP address rather than the host name for the app to work.

## Usage and Observations

I've only been running this server for a week, but so far it's looking like it performs really well.

* CPU sits at around 3-5% CPU for normal operation. This increases for various activities including installing updates, Plex Server doing transcoding, etc. CPU does also increase when connecting to the server via Screen Sharing, so I don't keep a session connected for too long
* RAM usage is typically around 2.6 - 2.8GB with all services running and [Memory Pressure](https://support.apple.com/en-au/guide/activity-monitor/actmntr1004/mac) at around 49%. Most importantly, swap is at 0 bytes. For these services I'm running right now, 8GB of RAM looks to be plenty; however, at 16GB RAM model of the Mac mini would provide plenty of future capacity - [Check if your Mac needs more RAM in Activity Monitor](https://support.apple.com/en-au/guide/activity-monitor/actmntr34865/mac)
* Disk space should be OK for this device - 256GB capacity for the primary OS disk isn't a lot these days; however, for this device specifically, I'm keeping used space on the OS disk to a minimum by offloading to external storage
* Power consumption is great at around 6W when idle. This increases to around 7W when watching a 4K video via Plex, and I've seen this peak at around 10W. I'm really happy with this power consumption for a device that's going to be on 24/7 - this replaces the 12-14W the Intel NUC was using at idle

So is a Mac mini suitable as a home server? For me the answer is certainly Yes. This is primarily due to having a good number of Apple devices at home that can take advantage of Apple specific features including Content Caching and Time Machine. The low power consumption is excellent for the number of services that it's capable of running.

While it's not as efficient as a Raspberry Pi or as flexible as a customised x86 machine, it's ended up being right where it needs to be for my purposes.
