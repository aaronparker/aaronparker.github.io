---

title: Comparing eSATA To USB For External Drives
date: 2008-04-27T21:25:22+10:00
author: Aaron Parker
layout: post

permalink: /comparing-esata-to-usb-for-external-drives/
dsq_thread_id:
  - "195380529"
categories:
  - Hardware
tags:
  - eSATA
  - Performance
  - USB
---
I've just purchased a new SATA-based external hard drive to use with demos and I thought I would share some details about the performance gain over my older ATA-based hard disk.

I've been doing a few demonstrations of Microsoft SoftGrid using VMware Workstation on my laptop with an external USB attached hard drive and I've also got a couple of user group presentations coming up. So I wanted to squeeze some better disk performance out of this setup because every second counts during demos.

Before I read Mark's post about [USB attached hard drive performance in his notebook](http://www.markwilson.co.uk/blog/2008/04/comparing-internal-and-usb-attached-hard-disk-performance-in-a-notebook-pc.htm), I was hoping to add a second internal hard drive to my Dell laptop, but unfortunately Dell doesn't provide a media bay type disk enclosure for this model. I was looking into using Firewire until I considered eSATA. I found this [review of the Belkin SATA ExpressCard](http://www.notebookreview.com/default.asp?newsID=3790) very useful when looking at what I might expect from eSATA.

Here's what I ended up ordering:

* [Seagate Momentus 7200.2 200GB SATA 300 7200RPM 16MB 2.5"](http://www.seagate.com/ww/v/index.jsp?locale=en-US&name=mod_ST9200420AS&vgnextoid=cb31213b5a5e3110VgnVCM100000f5ee0a0aRCRD&vgnextchannel=c021a47948a3d010VgnVCM100000dd04090aRCRD&reqPage=Model)
* [Akasa Integral 2.5"&#160; IDE/SATA External Enclosure](http://www.akasa.co.uk/akasa_english/spec_page/storage/spec_ak_enp2nes_bl.htm)
* [Belkin SATA II ExpressCard](http://catalog.belkin.com/IWCatProductPage.process?Product_Id=278303)

To power this drive I have to connect the included USB power lead. I'm not sure if I used a better quality eSATA cable that it would provide enough power, but carrying the extra cable is not too much of a hassle. I've performed these tests on my laptop which has the following hardware:

* Dell Vostro 1400
* Intel Core 2 Duo (2.2GHz, 4MB Cache)
* 4GB RAM
* Windows Vista x64

To test the performance of my disk setup, I've used [HD Tune](http://www.hdtune.com/) because they offer a free version and it's easy to use. I tested the performance of my original hard disk ([Seagate Momentus 5400.3 80GB ATA/100 5400RPM 16MB 2.5"](http://www.seagate.com/ww/v/index.jsp?locale=en-US&name=Momentus_5400.3_80_GB&vgnextoid=c83f99f4fa74c010VgnVCM100000dd04090aRCRD&vgnextchannel=b450d3a0140fc010VgnVCM100000dd04090aRCRD&reqPage=Model)) connected to this laptop via USB. The result stays consistent right up until the end of the test:

![Orignal disk performance over USB]({{site.baseurl}}/media/2008/04/originaldiskperf.png)

When I performed the same test on a desktop machine the throughput was about 5MBps higher and was consistent to 100%. This is the performance of the new hard disk over a USB connection:

![New disk performance over USB]({{site.baseurl}}/media/2008/04/perfusb.png)

And the performance of the same hard disk over an eSATA connection using the Belkin ExpressCard:

![New disk performance over eSATA]({{site.baseurl}}/media/2008/04/perfesata.png)

Overall I'm pretty happy with the performance of the new disk. It more than doubles the performance of my older disk yet still in a portable package and my VMs feel much much snappier.

|               |Original (USB)|New SATA (USB)|New SATA (eSATA)|
|---------------------|--------------|--------------|----------------|
|Minimum transfer rate|21.4MBps      |27.8MBps      |33.7MBps        |
|Maximum transfer rate|25.2MBps      |29.5MBps      |65.4MBps        |
|Average transfer rate|24.8MBps      |29.2MBps      |52.3MBps        |
|Access time          |16.5ms        |15.1ms        |14.6ms          |
|Burst rate           |19.6MBps      |22.9MBps      |75.1MBps        |
|CPU utilisation      |13.6%         |17.1%         |3.4%            |
