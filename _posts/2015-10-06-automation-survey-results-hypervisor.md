---
id: 4146
title: 'OS Automation Survey Results &#8211; What Hypervisor Do You Use?'
date: 2015-10-06T03:00:07+10:00
author: Aaron Parker
layout: post
guid: http://stealthpuppy.com/?p=4146
permalink: /automation-survey-results-hypervisor/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "4196414069"
image: /wp-content/uploads/2015/10/keyboard.jpg
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
We had an amazing response to our [OS automation deployment survey](http://xenappblog.com/2015/take-part-in-the-os-deployment-automation-survey/) with well over 700 respondents. In this series of articles to be posted here and on [xenappblog.com](http://xenappblog.com), we&#8217;ll cover and analyse the results.

# Responses

A total of 772 people responded to the survey but ensuring that anyone responding had a VDI deployment in their organisation reduced this to 724 responses which was still fantastic. We want to thank everyone who responded and shared valuable information with us about their environments.

It&#8217;s clear that many respondents have provided details about multiple environments or utilise multiple vendors, so we&#8217;ll take these responses at face value and see whether we need to account for anomalies as we go.

Of the 724 responses, 705 chose to share the size of the environment with us. We had 26 responses where the environment is larger than 5000 users, with the largest being 100,000. How cool is that?

The average number of users across all of the responses is 2248, so I think it&#8217;s reasonable to say we have a good set of data from which to draw some conclusions.

# What Platforms are Used to Host Your Virtual Desktop Environment?

With the first question we asked what platform &#8211; hypervisor or bare metal, is used in your environments. Here&#8217;s a look at the results for this question:

<figure id="attachment_4149" aria-describedby="caption-attachment-4149" style="width: 1024px" class="wp-caption alignnone">[<img class="wp-image-4149 size-large" src="http://stealthpuppy.com/wp-content/uploads/2015/10/WhatHypervisor2015-1024x576.png" alt="Platform breakdown from all respondents" width="1024" height="576" srcset="http://192.168.0.89/wp-content/uploads/2015/10/WhatHypervisor2015-1024x576.png 1024w, http://192.168.0.89/wp-content/uploads/2015/10/WhatHypervisor2015-150x84.png 150w, http://192.168.0.89/wp-content/uploads/2015/10/WhatHypervisor2015-300x169.png 300w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2015/10/WhatHypervisor2015.png)<figcaption id="caption-attachment-4149" class="wp-caption-text">Platform breakdown from all respondents</figcaption></figure>

The total here is obviously greater than 100%, so many people are running more than one platform in their environment and our audience includes consultants deploying different solutions into their customer environments.

This still provides a result that&#8217;s probably in line with what most of us would expect:

  * VMware vSphere &#8211; 78.2%
  * Citrix XenServer &#8211; 42.4%
  * Microsoft Hyper-V &#8211; 35.2%
  * Physical &#8211; 22.4%

Some analysis here:

  * vSphere is, as expected, the most popular platform.
  * XenServer deployments are high in this data, which I put primarily down the audience for xenappblog.com, which is very Citrix focussed.
  * The number of physical deployments is higher than I had expected. I interpret this as plenty of XenApp deployments directly on bare metal, but we&#8217;ll dig into this in another article.

What do you think of these results? Do they reflect what you see in the field?

# Adjusted Results

Let&#8217;s look at the same results, adjusted for only those respondents that said they run one type of platform and not multiple platforms. In this case, there were 398 respondents who only run one platform in their environment.

<figure id="attachment_4152" aria-describedby="caption-attachment-4152" style="width: 1024px" class="wp-caption alignnone">[<img class="wp-image-4152 size-large" src="http://stealthpuppy.com/wp-content/uploads/2015/10/WhatHypervisor2015-Adjusted-1024x563.png" alt="WhatHypervisor2015-Adjusted" width="1024" height="563" srcset="http://192.168.0.89/wp-content/uploads/2015/10/WhatHypervisor2015-Adjusted-1024x563.png 1024w, http://192.168.0.89/wp-content/uploads/2015/10/WhatHypervisor2015-Adjusted-150x82.png 150w, http://192.168.0.89/wp-content/uploads/2015/10/WhatHypervisor2015-Adjusted-300x165.png 300w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2015/10/WhatHypervisor2015-Adjusted.png)<figcaption id="caption-attachment-4152" class="wp-caption-text">Platform breakdown adjusted for single platform responses</figcaption></figure>

Now this looks different &#8211; each platform maintains its position; however the percentage of usage changes. It&#8217;s quite surprising to 11 respondents using a physical platform only. Not surprisingly those people are running XenApp or XenDesktop; however this number includes one respondent running VMware Horizon on bare metal. Now that&#8217;s interesting.

## Average User Count

Still focussing on the adjusted count, here&#8217;s the average user count where only a single platform is used. This provides some context for usage of these platforms.

  * vSphere: 2436
  * Hyper-V: 1574
  * XenServer: 1885
  * Physical: 1127

I&#8217;ve not yet broken these into which VDI/SBC platform is used in each &#8211; that&#8217;s for the next article, but this first set of data helps to provide an interesting picture of the type of environments that we&#8217;ve been able to gather information from.

# Next Up

In the next article, we&#8217;ll dig into [the VDI and SBC solutions used](http://stealthpuppy.com/automation-survey-results-vdi-platforms/).