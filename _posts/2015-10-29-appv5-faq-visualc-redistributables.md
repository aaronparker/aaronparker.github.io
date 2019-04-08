---
id: 4185
title: 'App-V 5 FAQ: Visual C++ Redistributable as local installs or allow App-V to deploy as needed?'
date: 2015-10-29T21:21:32+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=4185
permalink: /appv5-faq-visualc-redistributables/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "4270383510"
image: /wp-content/uploads/2015/06/AppV5FAQ.png
categories:
  - FAQs
tags:
  - AppVFAQ
---
 _<img class="alignleft wp-image-4188" style="margin: 0px 15px 0px 0px;" src="https://stealthpuppy.com/wp-content/uploads/2015/10/thamim.jpg" alt="ThamimKarim" width="100" height="100" srcset="https://stealthpuppy.com/wp-content/uploads/2015/10/thamim.jpg 350w, https://stealthpuppy.com/wp-content/uploads/2015/10/thamim-150x150.jpg 150w, https://stealthpuppy.com/wp-content/uploads/2015/10/thamim-300x300.jpg 300w" sizes="(max-width: 100px) 100vw, 100px" />This FAQ has been contributed by Thamim Karim, a former Microsoft employee and owner of popular App-V blog [virtualvibes.co.uk](http://virtualvibes.co.uk). Over the years [@ThamimKarim](https://twitter.com/ThamimKarim) has worked across the globe assisting customers with their user experience and application deployment strategies offering both consultancy and training services. He also has made many speaker appearances at conferences including TechEd, App-V User Groups and Microsoft Ignite._

Since the release of App-V 5.0 SP2 almost two years ago, the question regarding whether we should allow runtimes such as Visual C++ redistributables to be automatically packaged as part of App-V sequences or whether they should be individually managed on the base OS is on-going. Well there is no right or wrong approach to this, I know people who are massive fans of this feature and others who staunchly believe such SxS components should be managed locally.

<figure id="attachment_4187" aria-describedby="caption-attachment-4187" style="width: 517px" class="wp-caption alignnone"><img class="size-full wp-image-4187" src="https://stealthpuppy.com/wp-content/uploads/2015/10/SequencerOptions.png" alt="App-V 5 Sequencer options" width="517" height="406" srcset="https://stealthpuppy.com/wp-content/uploads/2015/10/SequencerOptions.png 517w, https://stealthpuppy.com/wp-content/uploads/2015/10/SequencerOptions-150x118.png 150w, https://stealthpuppy.com/wp-content/uploads/2015/10/SequencerOptions-300x236.png 300w" sizes="(max-width: 517px) 100vw, 517px" /><figcaption id="caption-attachment-4187" class="wp-caption-text">App-V 5 Sequencer options*</figure>

Either way here are your three main options:

# 1. Rely on App-V to package and deliver

This is the assumption the App-V Sequencer makes, as by default, the option to package VC runtimes is already ticked. This means regardless of whether the runtime is already on the machine or delivered during the monitoring phase it will be picked up into the package. The App-V client will then ensure it is dropped back down to the client OS in the event the runtime is not present when the package is delivered. The plus side of this approach is you will less likely be caught out with mismatching VC runtimes between your sequencer and client. The downside is there is a significant performance overhead as the runtimes are provisioned during publish of the package. Another point to note is runtimes will not be removed with the package if it is ever unpublished.

# 2. Manage runtimes on your base OS and turn off the feature

In my opinion this is the cleanest approach to runtimes that will give you the most control. It also means you won’t bog down the performance of publishing times or bloat your package sizes. However at the same time it leaves you with nowhere to hide should your package expect to find runtimes that aren’t present on the client that were on the sequencer it was packaged on.

# 3. Manage runtimes on your base OS and leave the feature on

This is a compromise approach whereby you actively manage runtimes locally on the OS but leave the App-V feature on “just incase”. This means your packages will pick up the runtimes into the App-V package but you will pro-actively reduce the instances where they will actually be needed to be dropped down on the client side. The downside of this approach is the safety net might end up too comforting and the pro-active approach will slowly fade out until you end up back at option 1!

Before you decide, check out the following resources:

  * [About App-V 5.0 SP2 on TechNet](https://technet.microsoft.com/en-us/library/dn508408.aspx)
  * [Shell Extensions and Runtimes with App-V 5.0 SP2 on Virtual Vibes](http://virtualvibes.co.uk/shell-extensions-and-runtimes-with-app-v-5-0-sp2/)
  * [Effects of “VC Runtimes” in App-V 5 SP2 white paper by Tim Mangan](http://www.tmurgent.com/AppV/images/WhitePapers/Research_VCRuntimes.pdf)

 