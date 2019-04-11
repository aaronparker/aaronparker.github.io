---
id: 130
title: 'DELPROF: What The?'
date: 2006-12-14T23:36:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/delprof-what-the
permalink: /delprof-what-the/
categories:
  - Applications
---
We all know that Windows is not case sensitive when it comes to the command line. Someone forgot to tell [DELPROF](http://www.microsoft.com/downloads/details.aspx?familyid=901A9B95-6063-4462-8150-360394E98E1E&displaylang=en&&DI=6066&IG=2e88cf101dce4d99b9032e2a7598a5a8&POS=1&CM=WPU&CE=1&CS=AWP&SR=1) though - you can use DELPROF in a script to automatically and silently delete user profiles. However it seems that you need to run the command in lower case, if you use upper case it just ignores the silent switch completely and prompts you to delete profiles. Check it out in this screenshot - What The?:

<img border="0" src="{{site.baseurl}}/media/2006/12/1000.14.257.WhatTheDelProf.png" />