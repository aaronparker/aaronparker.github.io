---

title: Windows 7 on a Dell Latitiude XT2
date: 2009-05-17T13:13:29+10:00
author: Aaron Parker
layout: post

permalink: /windows-7-on-a-dell-latitiude-xt2/
aktt_notify_twitter:
  - 'yes'
aktt_tweeted:
  - "1"
dsq_thread_id:
  - "195381824"
categories:
  - Hardware
tags:
  - Windows 7
---
I've been looking to get a tablet PC for some time now and I've just recently picked up a Dell Latitude XT2, which includes multi-touch support. It arrived the same day as the Windows 7 Release Candidate, so the default Windows Vista install, disappeared pretty quickly.

I must say though, it's a little disappointing to see the amount of packaging the laptop was shipped in compared to what you're actually left with. Here's a couple of photos to give you an idea of the packaging - here's [what's in the box](http://cid-74b5baa3414de283.skydrive.live.com/self.aspx/Dell%20Latitude%20XT2/DSCF3122.jpg), and here's the wasted space [inside the accessories box](http://cid-74b5baa3414de283.skydrive.live.com/self.aspx/Dell%20Latitude%20XT2/DSCF3123.jpg). Surely Dell could do better in the packaging department.

### Hardware

My main aims for this machine is to go with something in an ultra-portable form-factor for good battery life and portability and the tablet PC screen for reading. Here's the hardware:

  * Mobile Intel 45 Express Chipset with Intel vPro
  * ULV Intel Core 2 Duo U9400 (1.4Ghz, 800Mhz FSB, 3MB cache)
  * 3GB DDR3 1067Mhz RAM
  * 64GB Samsung RBX series SSD
  * 6 cell battery
  * Intel 5300 WiFi card
  * Dell Wireless 365 Bluetooth module
  * Dell Wireless 5530 3G/HSDPA module
  * Broadcom fingerprint sensor
  * Broadcom TPM 1.2

Windows 7 (x86) installed from a USB memory stick in a little under 10 minutes and the laptop has a not too shabby performance rating - I'm pretty pleased that the hard disk gets a rating of 6.7:

![]({{site.baseurl}}/media/2009/05/xt2performanceinformation2.png)
### Drivers & Software

Windows Update offered the following updates:

* Driver for Mobile Intel 45 Express Chipset family (beta WDDM 1.1 display drivers)
* Dell Tablet PC key buttons

There were a few drivers and updates that I've had to download. Keeping to the absolute minimum, I installed the following:

Broadcom USH CV w/ Fingerprint Swipe Sensor. This was marked as an unknown device named 5880 in Device Manager. Download the [ControlPoint Security Manager driver](http://support.euro.dell.com/support/downloads/format.aspx?c=uk&l=en&s=gen&deviceid=16358&libid=25&releaseid=R210495&vercnt=2&formatcnt=0&SystemID=LAT_XT2&servicetag=&os=WLH&osl=en&catid=-1&impid=-1) for this device.

Dell Wireless 5530 HSPA Mobile Broadband Minicard Device. Dell Wireless 5530 broadband package is a part of the [ControlPoint Connection Manager](http://support.euro.dell.com/support/downloads/format.aspx?c=uk&l=en&s=gen&deviceid=15971&libid=25&releaseid=R214454&vercnt=3&formatcnt=0&SystemID=LAT_XT2&servicetag=&os=WLH&osl=en&catid=-1&impid=-1). I've avoided the Connection Manager itself and have installed just the driver package.

Windows 7 will enable touch input for the display by default; however the [N-trig DuoSense Multi-Touch package for Windows 7](http://www.n-trig.com/Data/Uploads/Misc/SW Package 2.59 LatitudeXT2.zip) (information page [here](http://www.n-trig.com/Content.aspx?Page=Multi_Touch)) beta drivers are required for multi-touch input. The beta driver package ran a firmware upgrade on my screen - oddly enough only after several installs (I've reinstalled Windows a few times while checking the drivers).

Until you install the beta drivers, an unknown device will be shown in Device Manager. Once installed, multi-touch is enabled:

![]({{site.baseurl}}/media/2009/05/system1.png)

After loading the driver for the screen, calibration is required to improve accuracy. Whilst pen input appears to be fairly accurate out of the box, touch input improves with calibration.

Two devices, listed as PCI Serial Port and PCI Simple Communications Controller, are the [Intel AMT SOL](http://support.euro.dell.com/support/downloads/download.aspx?c=uk&l=en&s=gen&releaseid=R192787&SystemID=LAT_XT2&servicetag=&os=WLH&osl=en&deviceid=12178&devlib=0&typecnt=0&vercnt=1&catid=-1&impid=-1&formatcnt=1&libid=27&fileid=265133) and the [Intel AMT HECI](http://support.euro.dell.com/support/downloads/download.aspx?c=uk&l=en&s=gen&releaseid=R192786&SystemID=LAT_XT2&servicetag=&os=WLH&osl=en&deviceid=12177&devlib=0&typecnt=0&vercnt=1&catid=-1&impid=-1&formatcnt=1&libid=27&fileid=265132) respectively.

The [Dell ControlPoint System Manager](http://support.euro.dell.com/support/downloads/format.aspx?c=uk&l=en&s=gen&deviceid=16381&libid=25&releaseid=R218880&vercnt=3&formatcnt=0&SystemID=LAT_XT2&servicetag=&os=WLH&osl=en&catid=-1&impid=-1) is required for various functions including managing the screen orientation, the ambient light sensor, additional power settings, keyboard hot keys and

### Dell ControlPoint

The ControlPoint software encompasses a number of modules - System Manager (control of the tablet and display & other devices), Security Manager (manages the TPM, fingerprint sensor and other security functions) and Connection Manager (controls wireless LAN and broadband functions). As is usual for most of this type of software, it contains many components that mimic functionality already built into Windows Vista and 7, making the software largely redundant.

Why manufactures continue to include second rate alternatives to the far more elegant tools in the OS, I can't quite fathom. Perhaps they're worried you'll forget what brand of machine you've bought and want every possible opportunity to shove their logo in your face - user experience be damned..

### Fingerprint Sensor

Setting up and configuring the fingerprint sensor appears to be a little convoluted. I'm not sure why Windows hasn't enabled functionality on the logon screen with just the driver installed, maybe I've missed something. I am keen to stay away from the bloated Dell ControlPoint Security Manager, so I'll have to do without the sensor for identification/authentication.

### Bluetooth Module

To get the bluetooth module working, I've had to install the [Widcomm bluetooth software](http://support.euro.dell.com/support/downloads/format.aspx?c=uk&l=en&s=gen&deviceid=16167&libid=5&releaseid=R204603&vercnt=1&formatcnt=0&SystemID=LAT_XT2&servicetag=&os=WLH&osl=en&catid=-1&impid=-1) - I was unable to load just the driver. This bluetooth stack includes some extras that I really don't need such as Office integration and the ability to share files over bluetooth.

### Windows Virtual PC

Windows Virtual PC works just as you would expect; however to get it up and running you will need to disable [VT for Direct I/O](http://software.intel.com/en-us/articles/intel-virtualization-technology-for-directed-io-vt-d-enhancing-intel-platforms-for-efficient-virtualization-of-io-devices/) and [Trusted Execution](http://en.wikipedia.org/wiki/Trusted_Execution_Technology) (not to be confused with DEP) in the BIOS.

### Usage

Windows 7 runs very well on this laptop. There's not really much that you can say about performance - it's quick (even with the low voltage CPU) and does exactly what I need it to do.

Switching from pen to touch input is very quick and responsive. The digitizer does have an issue that appears to be caused by the beta drivers - an intermittent phantom touch or pen input is received, usually on the right-hand side of the screen. This does go away eventually, but reappears regularly after resume or boot.

The pen is great for writing input (obviously), but also more pinpoint accuracy than you would get with a finger. Using touch input however, is great for scrolling through documents in Word or a web browser. Internet Explorer does a better job of being controlled by pen or touch than does Chrome or Firefox. You can use touch input to move the page up and down directly, whereas the other browsers can only be controlled with flicks (which will page up/page down).

[FeedDemon](http://www.newsgator.com/Individuals/FeedDemon/Default.aspx) works well with both touch and pen input; however it would be nice to be able to make the FeedDemon UI a little larger to better accommodate touch input. Thankfully I've got skinny fingers so it's workable.

Being able to control the computer with touch input is very convenient, especially when you are reading documents or RSS feeds. Whether touch is just a bit of a gimmick or a valid method of input a little more usage will reveal, but it certainly is convenient.
