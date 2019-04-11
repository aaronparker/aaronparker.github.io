---
id: 4171
title: 'OS Automation Survey Results - How Do You Build Master Images?'
date: 2015-10-15T22:31:25+10:00
author: Aaron Parker
layout: post
guid: {{site.baseurl}}/?p=4171
permalink: /automation-survey-results-build-master-images/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "4227139958"
image: /media/2015/10/8755184025_26238d1d37_k.jpg
categories:
  - Community
tags:
  - Automation
  - Horizon
  - RDS
  - View
  - vWorkspace
  - XenApp
  - XenDesktop
---
Previously we've looked at [which hypervisors are in use]({{site.baseurl}}/automation-survey-results-hypervisor/) and the [virtual desktop solutions deployed on those hypervisors]({{site.baseurl}}/automation-survey-results-vdi-platforms/), so now we'll take a look at how organisations are building their master images.

## Building A Master Image

Whether you're building physical or virtual desktops, the quality of the desktops environment and ultimately the user experience can be dictated in a large part by the consistency in how Windows, applications and configurations are delivered to the desktops. If you want to ensure a predictable user experience across desktops and reduce troubleshooting times, then the only way to do that is to automate the deployment of Windows and applications.

With the right tools and community resources, automation is simple; however that doesn't make it easy - if you have a lot of applications or challenging applications and/or a complex environment, fully automating the deployment of your desktops can be time consuming.

Having said that, we believe that any investment made into automation will pay dividends in the future and the barriers into automation of Windows have reduced over the past 7 or 8 years with the introduction of tools such as the [Microsoft Deployment Toolkit](https://technet.microsoft.com/en-us/windows/dn475741.aspx) and PowerShell.

## Who's Automating Their Deployments?

In this survey we've concentrated on how organisations are building their master images, whether they're deploying Remote Desktop Services, persistent desktops or non-persistent desktops, a master image is typically the basis of Windows deployment in VDI.

Although we had 724 good responses, on this question 705 people responded to it, and here's what we got:

![Breakdown of how respondents are building master images]({{site.baseurl}}/media/2015/10/HowDoYouBuildMasterImages.png)*Breakdown of how respondents are building master images*

For the chart I've simplified the responses, so here's what we actually asked in the survey:

  * We insert the Windows ISO / CD / USB stick & manually install Windows and applications: **23.5%**
  * We use a partially automated build process leaving some manual tasks: **52.5%**
  * We use a fully automated build process from start to finish: **24.0%**

This means that over 75% of respondents are utilising some form of automation and I would read from this, that with roughly 52% of organisations leaving some manual tasks, that getting to 100% is either too time consuming so not worth the effort, or perhaps some tasks can't be automated.

![Slide12" width="720" height="405" srcset="{{site.baseurl}}/media/2013/05/Slide12.png 720w, {{site.baseurl}}/media/2013/05/Slide12-150x84.png 150w, {{site.baseurl}}/media/2013/05/Slide12-300x168.png 300w, {{site.baseurl}}/media/2013/05/Slide12-624x351.png 624w" sizes="(max-width: 720px) 100vw, 720px" />*xkcd sums the problem up nicely.*

What we didn't ask is what are the blockers to automation - so perhaps if we get to run the survey again, this is question that we can pose to get some idea.

So what type of number is 23.5% of respondents using a completely manual process? Let's look at the average size of the environments for each questions:

  * Completely manual: 1411 average seats (this includes two organisations at 24,000 and 35,000 seats!)
  * Partially automated: 2283 average seats
  * Fully automated: 2993 average seats

On average, the larger the environment the more that automation is leveraged. This could be due to the ability to invest more time into automation, more resources and/or skill sets around automation or perhaps even the use of third party products. Clearly the barrier to automation needs to drop further.

23.5% is about what I expected for manual deployments - [the last time I ran a survey like this]({{site.baseurl}}/hands-off-my-gold-image-a-recap-from-citrix-synergy-2013/), I saw manual builds at 26%, so a slight improvement over the past couple of years. 76.5% of organisations using some type of automation is really great to see.

I will say this: VDI should not be treated as a panacea for desktop deployments - VDI doesn't improve desktop management in and of itself, it just gets your poor quality images out faster.

## Next Up

In the next article, we'll take a look at [the solutions used for automating image builds](http://xenappblog.com/2015/os-automation-survey-results-automation-solutions/).