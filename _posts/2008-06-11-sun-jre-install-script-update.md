---
id: 573
title: Sun JRE Install Script Update
date: 2008-06-11T16:30:58+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/deployment/sun-jre-install-script-update
permalink: /sun-jre-install-script-update/
dsq_thread_id:
  - "195380679"
categories:
  - Automation
tags:
  - Java
  - Unattended
---
I&#8217;ve updated my [Sun Java Runtime Environment 1.6 Update X script](http://stealthpuppy.com/unattended/unattended-install-sun-java-runtime-environment-16-update-3), again. Updating this script seems to be a never ending task, usually because I find mistakes but this time around I&#8217;ve made a couple of changes including Windows x64 support. The script will now supports installing the 32-bit version of the JRE on x86 and x64 Windows and configures the environment accordingly.

A second change I&#8217;ve implemented is in the way the script adds registry entries to fool applications that expect earlier versions of the JRE to use the latest installed version. This change uses [a text file that lists the earlier versions](http://stealthpuppy.com/wp-content/uploads/2008/06/versions.txt) for import into the registry.

To use this script, save the script, the versions text file and the JRE installer to a folder on a local drive. Then elevate a command prompt to run the script and install.

<img border="0" alt="SunJRE" src="http://stealthpuppy.com/wp-content/uploads/2008/06/sunjre.png" width="577" height="243" /> 

Now I&#8217;ve got to get XenApp 5.0 Management Console using the latest JRE, but that&#8217;s for another post.