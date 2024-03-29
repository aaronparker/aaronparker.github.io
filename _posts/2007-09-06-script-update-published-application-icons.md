---

title: "Script: Update Published Application Icons"
date: 2007-09-06T14:33:05+10:00
author: Aaron Parker
layout: post

permalink: /script-update-published-application-icons/
dsq_thread_id:
  - "195379417"
categories:
  - Automation
tags:
  - Presentation-Server
---
In [a previous post]({{site.baseurl}}/terminal-server/high-colour-icons-for-citrix-presentation-server-applications) I detailed updating your Citrix Presentation Server 4.5 environment to support true/high colour icons for published applications. One of the steps mentioned in the post is that you need to delete and re-publish each of your published applications to get a high colour icon, which detailed in the release notes for [PSE450W2K3R01](http://support.citrix.com/article/CTX112618).

As [Joe Shonk]({{site.baseurl}}/terminal-server/high-colour-icons-for-citrix-presentation-server-applications#comment-3695) points out though, you don't need to re-publish each application, you only need to update the icon. To that end, I've created another script that will do this for you:

[Update Published Application Icons 1.0]({{site.baseurl}}/unattended/wsf-update-published-application-icons-10)

This script will go through each published application and update it with the icon from the applications executable. It its current form the script may not be suitable for your environment so you may need to modify it.