---
id: 4209
title: 'OS Automation Survey Results &#8211; How Often Are Master Images Updated?'
date: 2015-11-29T18:28:13+10:00
author: Aaron Parker
layout: post
guid: http://stealthpuppy.com/?p=4209
permalink: /automation-survey-results-update-images/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "4359573935"
image: /wp-content/uploads/2015/11/16638657367_33486a6676_k.jpg
categories:
  - Community
tags:
  - Automation
  - Horizon
  - RDS
  - XenApp
  - XenDesktop
---
Now that we&#8217;ve covered the main questions in the survey &#8211; [which hypervisors are in use](http://stealthpuppy.com/automation-survey-results-hypervisor/), the [VDI solutions are run on those hypervisors](http://stealthpuppy.com/automation-survey-results-vdi-platforms/), [how master images are built](http://stealthpuppy.com/automation-survey-results-build-master-images/), [the automation solutions used to build images](http://xenappblog.com/2015/os-automation-survey-results-automation-solutions/) and the [solutions used to deliver images to SBC and VDI environments](http://stealthpuppy.com/automation-survey-results-deliver-images/), we&#8217;ll take a short look at how often master images are updated.

# Updating Master Images

Here are the results for how often master images are updated based on 501 responses to this question:

<figure id="attachment_4211" aria-describedby="caption-attachment-4211" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-4211" src="http://stealthpuppy.com/wp-content/uploads/2015/11/HowOftenAreImagesUpdated-1024x603.png" alt="How often master images are updated" width="1024" height="603" srcset="http://192.168.0.89/wp-content/uploads/2015/11/HowOftenAreImagesUpdated-1024x603.png 1024w, http://192.168.0.89/wp-content/uploads/2015/11/HowOftenAreImagesUpdated-150x88.png 150w, http://192.168.0.89/wp-content/uploads/2015/11/HowOftenAreImagesUpdated-300x177.png 300w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2015/11/HowOftenAreImagesUpdated.png)<figcaption id="caption-attachment-4211" class="wp-caption-text">How often master images are updated</figcaption></figure>

Monthly patching is ideal and the majority of organisations appear to be standardising on monthly updates. Adding those respondents who patch every 2 months, 62.7% of organisations patch quite regularly.

Patch schedules that are every quarter or longer are of concern &#8211; perhaps understandable in environments sensitive to changes, but still concerning to see that many desktops are running un-patched for considerable periods of time. We only need to look at [last year&#8217;s most vulnerable operating systems and applications](http://www.gfi.com/blog/most-vulnerable-operating-systems-and-applications-in-2014/) to get a sense of what risk our desktops are at. 2015 is looking to provide [a record number of updates from Microsoft](http://news.softpedia.com/news/Record-Number-of-Microsoft-Patches-in-2015-Less-Secure-Windows-or-More-Active-Hackers-481007.shtml).

## Patching by Average Organisation Size

## 

Based on our data, here is the average user base for organisations based on patch schedules:

  * Monthly &#8211; 2932 seats
  * Every 2 months &#8211; 2171 seats
  * Quarterly &#8211; 1671 seats
  * Every 6 months &#8211; 2718

It would be nice to be able to analyse a much larger sample set, as we see a clear trend to smaller organisation sizes when patch schedules change from Monthly to Every 2 months to Quarterly, but the average goes up again for Every 6 months. So I would have drawn the conclusion that larger organisations have better resources for testing OS and application updates before deployment. This might be true; however it&#8217;s difficult to draw a definitive conclusion based on our data.

Do larger organisation fare best? This table lists the patch schedules for organisations 10,000 users and over.

[table id=39 /]

## 

## What About Other?

In this question we asked respondents to use Other, if their patching schedules didn&#8217;t fit into the Here are the responses that we received from respondents who selected Other for this question:

  * Never
  * Yearly, if ever. I don&#8217;t touch what isn&#8217;t broken
  * As infrequently as possible
  * As needed, typically more than a year
  * Depends on request cycle
  * Depends on application updates
  * As needed depending on criticality of updates or need
  * Vaires
  * VDI every 3 months. XenApp when new version release
  * Every 2 weeks
  * Weekly
  * Using single VMs
  * Individually

These are very interesting responses &#8211; looking at the top 5 responses, we get the impression that updates are difficult to test, deploy and manage. User productivity is typically more important than security.

## Automation Reduces Risk

Patching can be challenging to manage, especially in persistent desktop environments &#8211; rollback of an update can be disruptive. Improvements in delivering virtual desktop environments, with tools such as app layering and mature UEM solutions, are enabling non-persistent VDI easier to achieve. Automating the creation of a master image simplifies troubleshooting &#8211; rebuild in the event of a bad update, rather than take manual steps to remove an update. The image is guaranteed to be the same as the version before the update.

# Conclusion

Patching is hard; users and desktops are at risk. While automation won&#8217;t solve everything, it does reduce risk and helps provide consistency. Automation as a part of your patch schedule will improve responsiveness in the event of wayward updates.

[We&#8217;d](http://xenappblog.com) like to thank everyone who took part in this survey and hope the results and interpretation were useful. Any and all feedback is welcome and look forward to continuing the conversation next year.