---
title: 'OS Automation Survey Results - How Often Are Gold Images Updated?'
date: 2015-11-29T18:28:13+10:00
author: Aaron Parker
layout: post
permalink: /automation-survey-results-update-images/
image: /media/2015/11/16638657367_33486a6676_k.jpg
categories:
  - Community
tags:
  - Automation
  - Horizon
  - RDS
  - XenApp
  - XenDesktop
---
Now that we've covered the main questions in the survey - [which hypervisors are in use]({{site.baseurl}}/automation-survey-results-hypervisor/), the [VDI solutions are run on those hypervisors]({{site.baseurl}}/automation-survey-results-vdi-platforms/), [how gold images are built]({{site.baseurl}}/automation-survey-results-build-master-images/), [the automation solutions used to build images](http://xenappblog.com/2015/os-automation-survey-results-automation-solutions/) and the [solutions used to deliver images to SBC and VDI environments]({{site.baseurl}}/automation-survey-results-deliver-images/), we'll take a short look at how often gold images are updated.

## Updating Gold Images

Here are the results for how often gold images are updated based on 501 responses to this question:

![How often gold images are updated]({{site.baseurl}}/media/2015/11/HowOftenAreImagesUpdated.png)

How often gold images are updated
{:.figcaption}

Monthly patching is ideal and the majority of organisations appear to be standardising on monthly updates. Adding those respondents who patch every 2 months, 62.7% of organisations patch quite regularly.

Patch schedules that are every quarter or longer are of concern - perhaps understandable in environments sensitive to changes, but still concerning to see that many desktops are running un-patched for considerable periods of time. We only need to look at [last year's most vulnerable operating systems and applications](http://www.gfi.com/blog/most-vulnerable-operating-systems-and-applications-in-2014/) to get a sense of what risk our desktops are at. 2015 is looking to provide [a record number of updates from Microsoft](http://news.softpedia.com/news/Record-Number-of-Microsoft-Patches-in-2015-Less-Secure-Windows-or-More-Active-Hackers-481007.shtml).

### Patching by Average Organisation Size

Based on our data, here is the average user base for organisations based on patch schedules:

* Monthly - 2932 seats
* Every 2 months - 2171 seats
* Quarterly - 1671 seats
* Every 6 months - 2718

It would be nice to be able to analyse a much larger sample set, as we see a clear trend to smaller organisation sizes when patch schedules change from Monthly to Every 2 months to Quarterly, but the average goes up again for Every 6 months. So I would have drawn the conclusion that larger organisations have better resources for testing OS and application updates before deployment. This might be true; however it's difficult to draw a definitive conclusion based on our data.

Do larger organisation fare best? This table lists the patch schedules for organisations 10,000 users and over.

|Number of Users|How often do you update your gold images?                                                         |
|---------------|----------------------------------------------------------------------------------------------------|
|100000         |Monthly                                                                                             |
|80000          |Every 6 Months                                                                                      |
|55000          |Monthly                                                                                             |
|35000          |Every 6 Months                                                                                      |
|30000          |Monthly                                                                                             |
|30000          |Weekly                                                                                              |
|24000          |Every 2 Months                                                                                      |
|20000          |Monthly                                                                                             |
|20000          |Every 2 Months                                                                                      |
|20000          |Every 2 Months                                                                                      |
|18000          |Monthly                                                                                             |
|17000          |Monthly                                                                                             |
|15000          |Every Quarter (4 times per year)                                                                    |
|15000          |Every 2 Months                                                                                      |
|15000          |Monthly                                                                                             |
|15000          |Monthly                                                                                             |
|12000          |Monthly                                                                                             |
|10000          |Monthly                                                                                             |
|10000          |Monthly                                                                                             |
|10000          |Every 2 Months                                                                                      |

### What About Other?

In this question we asked respondents to use Other, if their patching schedules didn't fit into the Here are the responses that we received from respondents who selected Other for this question:

* Never
* Yearly, if ever. I don't touch what isn't broken
* As infrequently as possible
* As needed, typically more than a year
* Depends on request cycle
* Depends on application updates
* As needed depending on criticality of updates or need
* Varies
* VDI every 3 months. XenApp when new version release
* Every 2 weeks
* Weekly
* Using single VMs
* Individually

These are very interesting responses - looking at the top 5 responses, we get the impression that updates are difficult to test, deploy and manage. User productivity is typically more important than security.

### Automation Reduces Risk

Patching can be challenging to manage, especially in persistent desktop environments - rollback of an update can be disruptive. Improvements in delivering virtual desktop environments, with tools such as app layering and mature UEM solutions, are enabling non-persistent VDI easier to achieve. Automating the creation of a gold image simplifies troubleshooting - rebuild in the event of a bad update, rather than take manual steps to remove an update. The image is guaranteed to be the same as the version before the update.

## Conclusion

Patching is hard; users and desktops are at risk. While automation won't solve everything, it does reduce risk and helps provide consistency. Automation as a part of your patch schedule will improve responsiveness in the event of wayward updates.

[We'd](http://xenappblog.com) like to thank everyone who took part in this survey and hope the results and interpretation were useful. Any and all feedback is welcome and look forward to continuing the conversation next year.
