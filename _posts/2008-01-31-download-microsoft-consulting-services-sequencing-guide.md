---
id: 437
title: 'Download: Microsoft Consulting Services Sequencing Guide'
date: 2008-01-31T22:42:37+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/off-site-news/download-microsoft-consulting-services-sequencing-guide
permalink: /download-microsoft-consulting-services-sequencing-guide/
categories:
  - Microsoft
tags:
  - SoftGrid
---
Microsoft have posted [a guide from Microsoft Consulting Services](http://www.microsoft.com/downloads/details.aspx?FamilyID=1c6a73b8-5da8-4a1a-838b-a41ca492c488&DisplayLang=en) that details their best practises when sequencing applications.

> Properly sequencing applications is the key to a successful Microsoft SoftGrid Application Virtualizaiton implementation. As such, it's important to follow Microsoft€Ÿs recommended practices and be aware of the different options when sequencing. This document covers MCS practices for setting up the sequencer, sequencing best practices, an example of sequencing, important information related to updating packages, and finally examples of advanced OSD scripting.

There's some great details in this document, including some things you should be configuring in the Sequencer base image that I was unaware of:

  * Create an ODBC DSN setting as part of the Sequencer base image
  * Add a dummy printer device as part of the Sequencer base image

This document is essential for anyone sequencing applications.

<p class="pdf">
  <a href="http://www.microsoft.com/downloads/details.aspx?FamilyID=1c6a73b8-5da8-4a1a-838b-a41ca492c488&DisplayLang=en">Microsoft SoftGrid Application Virtualization - MCS Sequencing Guidelines</a>
</p>