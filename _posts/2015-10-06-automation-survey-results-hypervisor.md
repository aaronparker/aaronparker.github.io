---
id: 4146
title: 'OS Automation Survey Results - What Hypervisor Do You Use?'
date: 2015-10-06T03:00:07+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy/?p=4146
permalink: /automation-survey-results-hypervisor/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "4196414069"
image: /media/2015/10/keyboard.jpg
categories:
  - Community
tags:
  - Automation
  - Hypervisor
  - RDS
  - VDI
  - View
  - vWorkspace
  - XenApp
  - XenDesktop
---
We had an amazing response to our [OS automation deployment survey](http://xenappblog.com/2015/take-part-in-the-os-deployment-automation-survey/) with well over 700 respondents. In this series of articles to be posted here and on [xenappblog.com](http://xenappblog.com), we'll cover and analyse the results.

## Responses

A total of 772 people responded to the survey but ensuring that anyone responding had a VDI deployment in their organisation reduced this to 724 responses which was still fantastic. We want to thank everyone who responded and shared valuable information with us about their environments.

It's clear that many respondents have provided details about multiple environments or utilise multiple vendors, so we'll take these responses at face value and see whether we need to account for anomalies as we go.

Of the 724 responses, 705 chose to share the size of the environment with us. We had 26 responses where the environment is larger than 5000 users, with the largest being 100,000. How cool is that?

The average number of users across all of the responses is 2248, so I think it's reasonable to say we have a good set of data from which to draw some conclusions.

## What Platforms are Used to Host Your Virtual Desktop Environment?

With the first question we asked what platform - hypervisor or bare metal, is used in your environments. Here's a look at the results for this question:

![Platform breakdown from all respondents]({{site.baseurl}}/media/2015/10/WhatHypervisor2015.png)*Platform breakdown from all respondents*

The total here is obviously greater than 100%, so many people are running more than one platform in their environment and our audience includes consultants deploying different solutions into their customer environments.

This still provides a result that's probably in line with what most of us would expect:

  * VMware vSphere - 78.2%
  * Citrix XenServer - 42.4%
  * Microsoft Hyper-V - 35.2%
  * Physical - 22.4%

Some analysis here:

  * vSphere is, as expected, the most popular platform.
  * XenServer deployments are high in this data, which I put primarily down the audience for xenappblog.com, which is very Citrix focussed.
  * The number of physical deployments is higher than I had expected. I interpret this as plenty of XenApp deployments directly on bare metal, but we'll dig into this in another article.

What do you think of these results? Do they reflect what you see in the field?

## Adjusted Results

Let's look at the same results, adjusted for only those respondents that said they run one type of platform and not multiple platforms. In this case, there were 398 respondents who only run one platform in their environment.

![WhatHypervisor2015-Adjusted]({{site.baseurl}}/media/2015/10/WhatHypervisor2015-Adjusted.png)*Platform breakdown adjusted for single platform responses*

Now this looks different - each platform maintains its position; however the percentage of usage changes. It's quite surprising to 11 respondents using a physical platform only. Not surprisingly those people are running XenApp or XenDesktop; however this number includes one respondent running VMware Horizon on bare metal. Now that's interesting.

## Average User Count

Still focussing on the adjusted count, here's the average user count where only a single platform is used. This provides some context for usage of these platforms.

  * vSphere: 2436
  * Hyper-V: 1574
  * XenServer: 1885
  * Physical: 1127

I've not yet broken these into which VDI/SBC platform is used in each - that's for the next article, but this first set of data helps to provide an interesting picture of the type of environments that we've been able to gather information from.

## Next Up

In the next article, we'll dig into [the VDI and SBC solutions used]({{site.baseurl}}/automation-survey-results-vdi-platforms/).