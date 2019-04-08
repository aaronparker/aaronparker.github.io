---
id: 3977
title: 'App-V 5 FAQ: What is Microsoft Application Virtualization 5?'
date: 2015-06-09T13:51:07+10:00
author: Aaron Parker
layout: post
guid: http://stealthpuppy.com/?p=3977
permalink: /appv5-faq-what-is-appv5/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "3868827864"
image: /wp-content/uploads/2015/06/AppV5FAQ.png
categories:
  - FAQs
tags:
  - App-V
---
_This article is part of the [Microsoft Application Virtualization 5 FAQ series](http://stealthpuppy.com/appv5-faqs/)._

Microsoft Application Virtualization (App-V) is an application delivery solution that enables applications to be delivered to and executed on a Windows instance without being installed.

App-V doesn&#8217;t change where an application is executed &#8211; applications still run in the same location. A Windows instance can be on a local physical device, a virtual desktop in running in the data centre, or a [Remote Desktop Session Host](https://technet.microsoft.com/en-us/library/hh831447.aspx).

Application Virtualization provides a number of benefits:

  * Reduces the amount of time it takes to deliver applications to users &#8211; in many cases application delivery times are reduced to minutes. Removing the need to install an application simplifies delivery by reducing conflicts and avoiding reboots.
  * Allows applications that might normally conflict to run on the same instance of Windows by provide a layer of isolation between Windows and applications delivered with App-V
  * Helps to simplify gold images by enabling applications to be streamed to Windows desktops

App-V has 3 main components:

  * The App-V Sequencer &#8211; the Sequencer enables an IT professional to capture the installation of an application and turn that into an App-V package
  * The App-V Client &#8211; the Client enables App-V packages to be delivered to Windows desktops where the applications contained in those packages are executed, just like they would be if they were installed
  * The App-V Server &#8211; the Server is enables the delivery of App-V packages to Windows desktops where the App-V client is installed. The App-V Server consists of a number of components that allow for the publishing and authorizing of users or desktops to stream App-V packages. There are a number of ways to deploy App-V packages, so the App-V Server is an optional component of App-V

Designing and implementing App-V requires understanding your application portfolio, your method of delivering Windows desktops to users and understanding how the different delivery mechanisms for App-V will fit within your environment.

# Additional Resources

  * [Microsoft Application Virtualization](http://www.microsoft.com/en-us/windows/enterprise/products-and-technologies/mdop/app-v.aspx)
  * [App-V 5.0 Overview](https://technet.microsoft.com/en-us/windows/jj835807.aspx?ocid=wc-mscom-ent) video
  * [Microsoft Application Virtualization (App-V) Documentation Resources Download Page](https://www.microsoft.com/en-us/download/details.aspx?id=27760)

## Previously

  * [App-V 4.x FAQ: What is Microsoft Application Virtualization?](http://stealthpuppy.com/virtualisation/app-v-faq-2-what-is-microsoft-application-virtualization)