---
id: 4161
title: 'OS Automation Survey Results &#8211; What Virtual Desktop Platforms are Deployed?'
date: 2015-10-09T22:28:52+10:00
author: Aaron Parker
layout: post
guid: http://stealthpuppy.com/?p=4161
permalink: /automation-survey-results-vdi-platforms/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "4208887561"
image: /wp-content/uploads/2015/10/12907651553_ff4053d36f_k.jpg
categories:
  - Community
tags:
  - Automation
  - RDS
  - VDI
  - View
  - vWorkspace
  - XenApp
  - XenDesktop
---
Digging further into the details of the data we&#8217;ve gathered from our [OS Automation survey](http://xenappblog.com/2015/take-part-in-the-os-deployment-automation-survey/), let&#8217;s take a look at the virtual desktop platforms in use by those who responded. I&#8217;ll largely present this as is and leave any further analysis for later articles.

# Major Desktop Virtualization Platforms

First, let&#8217;s take a look at an overview of the major RDS / VDI platforms in use. Remember from [the first article in this series](http://stealthpuppy.com/automation-survey-results-hypervisor/), that we have many respondents who have selected that they run multiple hypervisors or multiple in environments, so the virtual desktop platforms reflect this as well. What you see here is a total across all of the responses.

<figure id="attachment_4162" aria-describedby="caption-attachment-4162" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-4162" src="http://stealthpuppy.com/wp-content/uploads/2015/10/WhatVDIPlatforms-1024x513.png" alt="Across all respondents, which virtual desktop environments are in use" width="1024" height="513" srcset="http://192.168.0.89/wp-content/uploads/2015/10/WhatVDIPlatforms-1024x513.png 1024w, http://192.168.0.89/wp-content/uploads/2015/10/WhatVDIPlatforms-150x75.png 150w, http://192.168.0.89/wp-content/uploads/2015/10/WhatVDIPlatforms-300x150.png 300w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2015/10/WhatVDIPlatforms.png)<figcaption id="caption-attachment-4162" class="wp-caption-text">Across all respondents, which virtual desktop environments are in use</figcaption></figure>

It&#8217;s not surprising that Citrix XenApp and XenDesktop come out on top; however I would have expected VMware Horizon deployments to be higher than this. The very high usage of Citrix solutions in these responses could be due to a number of factors &#8211; XenApp and XenDesktop usage is actually that high, especially for consultants managing or deploying several environments; and, as discussed previously the audience of xenappblog.com is quite Citrix focussed.

# Individual Virtual Desktop Solution Breakdown

So lets dig deeper and count the number of responses for all of the virtual desktop products. This graph shows the breakdown of all of the platforms that we received data on. The only one that I see missing there right now is Azure RemoteApp.

<figure id="attachment_4163" aria-describedby="caption-attachment-4163" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-4163" src="http://stealthpuppy.com/wp-content/uploads/2015/10/BrokerBreakdown-1024x431.png" alt="All virtual desktop platforms broken into individual platforms or specific groups" width="1024" height="431" srcset="http://192.168.0.89/wp-content/uploads/2015/10/BrokerBreakdown-1024x431.png 1024w, http://192.168.0.89/wp-content/uploads/2015/10/BrokerBreakdown-150x63.png 150w, http://192.168.0.89/wp-content/uploads/2015/10/BrokerBreakdown-300x126.png 300w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2015/10/BrokerBreakdown.png)<figcaption id="caption-attachment-4163" class="wp-caption-text">All virtual desktop platforms broken into individual platforms or specific groups</figcaption></figure>

Again the VMware solutions come in considerably lower than Citrix products; however I expect, given that VMware has reduced the feature gap with Horizon 6.x, for this to change over the next few years. There&#8217;s even a number of respondents running Citrix XenApp with VMware Horizon / View (I saw this myself as far back as 2010).

# Running XenApp or XenDesktop Only

With the number of Citrix deployments so high, I thought that it would be interesting to look at those respondents using Citrix virtual desktop solutions only and see what hypervisor they&#8217;re running. We know what hypervisor VMware Horizon customers will be using and the other virtual desktop solutions just don&#8217;t feature that highly to delve into.

Now this graph surprised me and I&#8217;m sure it will make [David Cottingham](https://twitter.com/DavidCottingham) happy.

<figure id="attachment_4164" aria-describedby="caption-attachment-4164" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-4164" src="http://stealthpuppy.com/wp-content/uploads/2015/10/XD-XA-Only-1024x556.png" alt="Hypervisor usage where a respondent is using Citrix desktop solutions only" width="1024" height="556" srcset="http://192.168.0.89/wp-content/uploads/2015/10/XD-XA-Only-1024x556.png 1024w, http://192.168.0.89/wp-content/uploads/2015/10/XD-XA-Only-150x81.png 150w, http://192.168.0.89/wp-content/uploads/2015/10/XD-XA-Only-300x163.png 300w, http://192.168.0.89/wp-content/uploads/2015/10/XD-XA-Only.png 1542w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2015/10/XD-XA-Only.png)<figcaption id="caption-attachment-4164" class="wp-caption-text">Hypervisor usage where a respondent is using Citrix desktop solutions only</figcaption></figure>

While vSphere is by and far the most deployed hypervisor across all responses, looking at Citrix-only shops, XenServer is the most popular hypervisor. This is great to see actually &#8211; XenServer is available for free for XenApp and XenDesktop customers, so why not use it?

What about the size of these environments? XenServer isn&#8217;t limited to small environments:

  * 26 responses running 100 to 1,000 seats
  * 5 responses running 2,500 seats
  * 10 responses running 5,000 seats
  * 1 response running 17,000 seats
  * 1 response running 18,000 seats

While we did have 12 responses above 18,000 seats (20,000 to 100,000 seats) all running vSphere, these numbers I think are impressive for our sample size.

# Next Up

In the next article, we&#8217;ll take a look how people [are building their master images](http://stealthpuppy.com/automation-survey-results-build-master-images) on which they base their virtual desktop deployments.