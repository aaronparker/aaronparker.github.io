---

title: Client Side Performance Testing coming to Login VSI
date: 2012-03-15T10:48:50+10:00
author: Aaron Parker
layout: post

permalink: /client-side-performance-testing-coming-to-login-vsi/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "611900431"
categories:
  - General
tags:
  - Login VSI
  - Performance
---
Mark Plettenberg, the lead developer of Login VSI. This new module looks very interesting because it will allow us to objectively measure and analyse the performance of remoting protocols such as Teradici PCoIP, Microsoft RDP, Citrix ICA/HDX and Quest EOP.

## What is Login VSI?

If you're not familiar with [Login VSI](http://www.loginvsi.com/en/product-overview), it's essentially the gold standard in vendor independent testing suite for measuring the performance and scalability of desktop virtualization environments (hosted virtual desktop and session-based desktops).

Login VSI was developed to solve the problem of sizing an environment correctly. Login VSI allows you to test and compare different hardware and software configurations in your environment. The results of those tests will ensure that you can scale your infrastructure confidently as well as understand the impact of changes to your environment.

![]({{site.baseurl}}/media/2012/03/LoginVSIArchtecture.png)

## Client Side Performance Testing

[Login Consultants](http://loginconsultants.com/) have been working to extend the testing of desktop virtualization environments to the client with the ability to test performance of remoting protocols. This is important because it gives us a full end-to-end picture of the user experience in desktop virtualization environments. Remoting protocols can now be tested for network characteristics like bandwidth and latency and the effects on the performance on the protocol.

![]({{site.baseurl}}/media/2012/03/LoginVSIClideOverview.png)

The client-side measure launcher can now be used to perform these tests:

  * Character response - what's the response time from pressing a key on the keyboard to that character being displayed on screen
  * Desktop filling text - how long does it take to copy text from the local client clipboard and paste that text into a remote application
  * Mouse click feedback - how long does it take to register the a mouse click and show that change to the user
  * Image quality and loading times - how long does it take for an image to load and what is the resulting quality. This is very interesting because Login VSI can objectively measure the client-side image quality against the original lossless image

## Scenarios

With very little between the performance of the most common remoting protocols on the LAN, there are a number of scenarios that will make for interesting tests in your environment, including:

  * Testing access from branch offices across the WAN
  * Branch access can also be tested using WAN simulator such as WANem
  * Check response time - what is the real world response time for your typical work loads?
  * Testing without caching enabled on the client for realistic results. Disabling caching enables you to test the raw performance of the remoting protocol

## Additional Points

This is the first release of the Client Side Performance Testing module, so there's a few things to consider:

  * Linux clients aren't yet available - the client-side module is Windows only
  * This first version is aimed at typical office and line-of-business applications. Video and audio testing is planned for the next version and will be able to test audio and video sync
  * A (beta?) release is planned within 2 weeks
  * This module will be included in the Login VSI license

For more info on the Client Side Performance Testing module keep an eye on the [Login VSI web site](http://www.loginvsi.com/).
