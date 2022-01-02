---

title: 'App-V FAQ: What is Microsoft Application Virtualization'
date: 2010-07-07T08:00:00+10:00
author: Aaron Parker
layout: post

permalink: /app-v-faq-2-what-is-microsoft-application-virtualization/
has_been_twittered:
  - 'yes'
  - 'yes'
dsq_thread_id:
  - "195382645"
categories:
  - FAQs
tags:
  - App-V
  - AppVFAQ
---
![AppV-FAQ-Logo]({{site.baseurl}}/media/2010/06/AppVFAQLogo1.png)

Application Virtualization (App-V) is Microsoft’s entry into the application virtualisation space. Originally developed by Softricity, who were bought by Microsoft in 2006, App-V is now an integral part of Microsoft application delivery offerings.

Microsoft Application Virtualization (App-V) can make applications available to end user computers without having to install the applications directly on those computers. This is made possible through a process known as sequencing the application, which enables each application to run in its own self-contained virtual environment on the client computer. The sequenced applications are isolated from each other. This eliminates application conflicts, but the applications can still interact with the client computer.<sup>1</sup>

App-V enables applications to run without the need to visit a desktop, laptop, or Remote Desktop Server. Applications are no longer installed on the client—and there is minimal impact on the host operating system or other applications. Applications are rapidly delivered, when needed, to laptops, desktops, and Remote Desktop Servers. In most cases only a small percentage of the application is needed to launch the application.<sup>2</sup>

Additional components are delivered when transparently requested by the application. This results in faster delivery of the application when needed. Virtual Application deployments, patches, updates, and terminations are more easily managed via policies, and administered through the App-V console or via your ESD system.<sup>2</sup>

## App-V Overview

If you are new to App-V, this video in a great introduction:

## App-V Components

Microsoft App-V components include the [App-V Sequencer](http://technet.microsoft.com/en-us/library/cc843767.aspx), used to virtualise an application, the [App-V client](http://technet.microsoft.com/en-us/library/cc817162.aspx), installed on end points where App-V applications will execute, and the [App-V Management Server](http://technet.microsoft.com/en-us/library/cc817208.aspx) and the App-V Streaming Server, used to deliver and stream applications to the App-V clients.

The image below gives you an overview of all of the App-V components (an actual implementation of App-V will generally include a subset of these components). Click for a larger view:

![Microsoft Application Virtualisation components]({{site.baseurl}}/media/2010/06/MicrosoftApplicationVirtualisationComponents.png)

Sources and Links to more information about App-V:

* <sup>1</sup> [Application Virtualization Overview](http://technet.microsoft.com/en-us/library/ee958112.aspx)
* <sup>2</sup> [Microsoft Application Virtualization Technical Overview](http://www.microsoft.com/systemcenter/appv/techoverview.mspx)
* [Application Virtualization](http://www.microsoft.com/systemcenter/appv/default.mspx) product page
* [Microsoft Application Virtualization Getting Started Guide](http://technet.microsoft.com/en-gb/library/ee958103.aspx)
* MDOP: [Application Virtualization](http://www.microsoft.com/windows/enterprise/products/mdop/app-v.aspx)
* [Application Virtualization TechCentre](http://technet.microsoft.com/en-gb/appvirtualization/default.aspx) on Microsoft TechNet
* [Microsoft Application Virtualization](http://en.wikipedia.org/wiki/Microsoft_Application_Virtualization) at Wikipedia
* [App-V 4.6 Release Q & A](http://windowsteamblog.com/windows/b/springboard/archive/2010/02/22/app-v-4-6-release-q-amp-a.aspx)
* [Inside the Grid: Part 1](http://blogs.technet.com/b/appv/archive/2007/08/02/inside-the-grid-part-1.aspx)
  