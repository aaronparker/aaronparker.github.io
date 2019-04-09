---
id: 2633
title: 'Mailbag - Deploying multiple editions of Office 2010 with App-V'
date: 2012-02-15T17:45:14+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2633
permalink: /mailbag-deploying-multiple-editions-of-office-2010-with-app-v/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "577282478"
categories:
  - Applications
tags:
  - App-V
  - Office
---
[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; float: right; padding-top: 0px; border: 0px;" title="Mail Bag" src="https://stealthpuppy.com/media/2012/02/Mail-Bag_thumb.png" alt="Mail Bag" width="128" height="128" align="right" border="0" />]({{site.baseurl}}/media/2012/02/Mail-Bag.png)I'm not sure why I didn't think of this earlier – I get emails from readers fairly regularly and many of them make great topics for blog posts. So here's the first in a series of posts where I'll cover interesting questions I get via email and where I think other readers will benefit from a public response.

I've removed personally identifiable information from the original email.

### Question

> We have set up Citrix / App-V environment and sequenced Office 2010 Pro Plus and we have installed the MSOffvirt kit [the Office 2010 Deployment Kit for App-V] using the Office Pro Plus Key on the Citrix PVS servers as part of the PVS image. Now our client has decided they also want to be able to deliver Office 2010 Std via app-v as well. Do we now need to change the license key that it is installed with the MSOffvirt kit or is there another way round it? We could of course silo it and have Office Pro Plus on some PVS servers and Office Standard on others.

### Answer

My first recommendation would actually be against virtualizing the primary version Office, but I'll assume that your Office requirements are simple and virtualizing Office with App-V is working OK for you.

It sounds like you're already aware that App-V doesn't really allow you to juggle different editions of Office on the same machine, as the Deployment Kit handles licensing, you can only add a single edition (e.g. Standard or Professional Plus) to any single machine. If you've already got an existing PVS image, I would recommend cracking it open, uninstalling the Deployment Kit and reinstalling using the product key for the edition you need in each image. That way you can ensure you have a clean image.

My ideal approach to this would be to build the PVS image from an unattended source (such as the Microsoft Deployment Toolkit) where you've changed the product key, rather than manually make changes to the image.

From a licensing perspective, Microsoft doesn't provide you the right to license a device for Office 2010 Professional Plus and then deploy Standard edition to that device. You can read more on licensing in this document: [Downgrade Rights - Microsoft Volume Licensing Programs, Original Equipment Manufacturer (OEM) License, and Full Packaged Product (FPP) License, February 2011](http://download.microsoft.com/download/6/8/9/68964284-864D-4A6D-AED9-F2C1F8F23E14/DOWNGRADE_RIGHTS.DOCX)