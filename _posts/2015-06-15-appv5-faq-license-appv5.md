---
id: 3987
title: 'App-V 5 FAQ: How Do I License Microsoft Application Virtualization 5?'
date: 2015-06-15T22:53:05+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=3987
permalink: /appv5-faq-license-appv5/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "3868881760"
image: /media/2015/06/AppV5FAQ.png
categories:
  - FAQs
tags:
  - App-V
---
_This article is part of the [Microsoft Application Virtualization 5 FAQ series]({{site.baseurl}}/appv5-faqs/). Last update: September 1st, 2015_

Microsoft Application Virtualization (App-V) 5 has three main components - Client, Server and Sequencer. For licensing purposes, you only need a license for App-V for wherever the App-V Client is installed. The App-V Server and Sequencer are not directly licensed, although you may require a Windows license to run those components.

App-V 5 is licensed in one of 2 ways:

# Physical or Virtual Desktops

App-V is licensed as a component of the [Microsoft Desktop Optimisation Pack](https://www.microsoft.com/en-AU/windows/enterprise/products-and-technologies/mdop/default.aspx) (MDOP). Since the release of MDOP 2015 and Windows 10, MDOP is now a benefit of Windows Software Assurance or the [Windows VDA](http://www.microsoft.com/en-us/Licensing/product-licensing/windows10.aspx). To license MDOP, your environment must first be covered with Windows Software Assurance. The [Microsoft Software Assurance Interactive Benefits Chart](https://www.microsoft.com/en-us/download/details.aspx?id=1732) shows how MDOP is licensed:

> If the underlying Windows Software Assurance or Windows VDA is licensed per device, then MDOP covers the licensed device. If the underlying Windows Software Assurance or Windows VDA is licensed per user, then MDOP extends across all of the licensed user's devices.

[<img class="alignnone size-full wp-image-4071" src="https://stealthpuppy.com/media/2015/06/SoftwareAssurance.png" alt="SoftwareAssurance]({{site.baseurl}}/media/2015/06/SoftwareAssurance.png)

# Remote Desktop Services

Remote Desktop Service (RDS) in Windows Server (including environments that use Citrix XenApp, VMware Horizon View, Dell vWorkspace or similar solutions that build on RDS), App-V is a use right of the RDS Client Access License (CAL). This means that when you purchase RDS CALs (either per-user or per-device), applications can be delivered to those devices or users via App-V. The license only covers installing the App-V client on the RDS hosts and delivering applications remotely.

The [Product Use Rights](https://www.microsoft.com/en-us/licensing/product-licensing/products.aspx) document, updated quarterly, provide details on this method of licensing App-V.

# Understanding Licensing

Because App-V cannot be licensed on its own, understanding App-V licensing for your organisation will be part of a larger discussion on Microsoft licensing. While we understand the information above to be correct, we strongly recommend that you engage with a partner that understands Microsoft Volume Licensing. Microsoft has a list of VL partners here that can assist: <a href="https://pinpoint.microsoft.com/en-us/search?type=companies&competency=100010" target="_blank">https://pinpoint.microsoft.com/en-us/search?type=companies&competency=100010</a>

# Additional Resources

  * [Microsoft Volume Licensing](http://www.microsoft.com/en-us/licensing/licensing-programs/software-assurance-default.aspx) site
  * [Software Assurance at a glance](http://download.microsoft.com/download/5/c/7/5c727885-ec15-4920-818b-4d140ec6c38a/Software-Assurance-at-a-Glance.pdf) (PDF)
  * [Microsoft Software Assurance Interactive Benefits Chart](https://www.microsoft.com/en-us/download/details.aspx?id=1732)
  * [Volume Licensing Product Use Rights (PUR)](https://www.microsoft.com/en-us/licensing/product-licensing/products.aspx) document

## Previously

  * [App-V 4.x FAQ: How is App-V licensed?]({{site.baseurl}}/deployment/app-v-faq-3-how-is-app-v-licensed)

 