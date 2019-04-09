---
id: 793
title: Issues Sequencing Adobe Reader 7 or 8 in App-V 4.5
date: 2008-11-04T19:00:53+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=793
permalink: /issues-sequencing-adobe-reader-7-or-8-in-app-v-45/
categories:
  - Applications
tags:
  - App-V
  - SoftGrid
---
Microsoft posted a knowledgebase article yesterday titled: [With Microsoft Application Virtualization 4.5 you are unable to Sequence Adobe Reader 7.x or 8.x due to NETOP FEAD Installer error](http://support.microsoft.com/kb/959460). Essentially the NETOP FEAD installer is not compatible with the 4.5 Sequencer (or perhaps that's the other way around).

Based on the issue described in the article, it appears that people are encountering this specific issue as a result of not performing a scripted installation of Reader during sequencing (i.e. not extracting the setup file and using a custom transform for installation).

So why are scripted installations important? Here's my three top reasons:

  1. Your documentation might be rock solid, but we’re only human and we make mistakes. Scripted installs provide a predictable and repeatable installation process that is far less susceptible to error. 
  2. Scripted installs, in turn, make documentation easier. Rather than building a process illustrated by screen shots, a script will fill out that document in far more detail.
  3. Finally, a scripted installation will also make sequencing faster. No having to type commands or click through Explorer windows.

In the case of Adobe Reader, if you've used my articles on deploying [Reader 8]({{site.baseurl}}/deployment/deploying-adobe-reader-81) and [Reader 9]({{site.baseurl}}/deployment/deploying-adobe-reader-9-for-windows) via a custom transform and script, you won't have issues and should be able to sequence those applications successfully.

OK, shameless plug there 😛