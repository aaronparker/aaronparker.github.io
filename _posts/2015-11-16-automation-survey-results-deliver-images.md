---
id: 4203
title: 'OS Automation Survey Results - What Solution is Used to Deliver Images?'
date: 2015-11-16T18:21:20+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy/?p=4203
permalink: /automation-survey-results-deliver-images/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "4322771320"
image: /media/2015/11/5954193181_07aa522a0d_o.jpg
categories:
  - Community
tags:
  - Automation
  - Horizon
  - RDS
  - XenApp
  - XenDesktop
---
In the previous article, we covered [which automation solutions are in use to create](http://xenappblog.com/2015/os-automation-survey-results-automation-solutions/) (and manage) master images. In this article we'll cover what tools or technologies are used to deliver an image to an end-point (that being a virtual machine or a physical device).

This is an important distinction - often the solution for delivering the master image is relied upon for "image management"; however these solutions aren't typically capable of creating a framework for repeatable, consistent image creation. Solutions available for VDI (and RDS) for image delivery might differ depending on the product and some of those include image versioning, but they do not enable complete recreation of an image from scratch without some form of automation.

# Image Delivery Solutions

Based on 524 responses to this question, we are able to see the following usage:

![What is used to deliver a standardised image to VMs or end-points.]({{site.baseurl}}/media/2015/11/WhatIsUsedToDeliverImage.png)*What is used to deliver a standardised image to VMs or end-points.*

This result is similar to [the overall usage of VDI solutions]({{site.baseurl}}/automation-survey-results-vdi-platforms/) - Citrix PVS and MCS usage is higher than other solutions because the amount of XenDesktop and XenApp deployments is far higher than competing products. Based on this usage, we can make a reasonable assumption that the majority of Citrix-based deployments are non-persistent; however "persistent desktops" based on MCS is common, so the numbers won't be completely reflective of this chart.

## Observations

Due to the manner in which we've asked this particular question, I'm unable to correlate delivery solutions against some of the other useful data, so we can draw some limited conclusions at this time. In the next article where we discuss patching schedules, it will be interested to link to delivery solutions.

One thing that did surprise me, is that I was unable to find any responder using Citrix PVS and a completely manual build process for their images. I'm not sure whether this is reflective of real world deployments or a result of how we asked the questions (I think the latter), but based on real world experience, I find this hard to believe. Perhaps several years of [encouraging people to automation their builds]({{site.baseurl}}/hands-off-my-gold-image-a-recap-from-citrix-synergy-2013/) is paying off. 😉

Looking at those using PVS, each respondent has selected a custom scripted solution, typically in-conjunction with others tools such as MDT. 51 respondents are using a custom scripted solution for their master images with PVS only. For MCS this was 24 using a custom scripted solution only.

133 respondents use both PVS and MCS in their environments. Again, because we have respondents who are consultants delivering multiple environments there is cross-over here, but it is interesting nonetheless to see multiple Citrix delivery options used.

What about physical hardware? 6% of respondents use no virtualization at all in their SBC/VDI environments.

# Next Up

In the next article, we'll take a look at how often people are [patching their master images]({{site.baseurl}}/automation-survey-results-update-images/).

 