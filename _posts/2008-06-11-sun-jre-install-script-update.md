---

title: Sun JRE Install Script Update
date: 2008-06-11T16:30:58+10:00
author: Aaron Parker
layout: post

permalink: /sun-jre-install-script-update/
dsq_thread_id:
  - "195380679"
categories:
  - Automation
tags:
  - Java
  - Unattended
---
I've updated my [Sun Java Runtime Environment 1.6 Update X script]({{site.baseurl}}/unattended/unattended-install-sun-java-runtime-environment-16-update-3), again. Updating this script seems to be a never ending task, usually because I find mistakes but this time around I've made a couple of changes including Windows x64 support. The script will now supports installing the 32-bit version of the JRE on x86 and x64 Windows and configures the environment accordingly.

A second change I've implemented is in the way the script adds registry entries to fool applications that expect earlier versions of the JRE to use the latest installed version. This change uses [a text file that lists the earlier versions]({{site.baseurl}}/media/2008/06/versions.txt) for import into the registry.

To use this script, save the script, the versions text file and the JRE installer to a folder on a local drive. Then elevate a command prompt to run the script and install.

![]({{site.baseurl}}/media/2008/06/sunjre.png)

Now I've got to get XenApp 5.0 Management Console using the latest JRE, but that's for another post.
