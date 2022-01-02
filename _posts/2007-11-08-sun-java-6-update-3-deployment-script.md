---

title: Sun Java 6 Update 3 Deployment Script
date: 2007-11-08T23:29:38+10:00
author: Aaron Parker
layout: post

permalink: /sun-java-6-update-3-deployment-script/
dsq_thread_id:
  - "195379572"
categories:
  - Automation
tags:
  - Java
---
I've just updated my [Java Runtime Environment install script]({{site.baseurl}}/unattended/unattended-install-sun-java-runtime-environment-16-update-3) for [Sun Java 6 Update 3](http://www.java.com/en/download/windows_manual.jsp?locale=en&host=www.java.com:80). Apart from supporting the latest JRE update, this version of the script fixes some registry changes that I hadn't got quite right previously. If you've not seen this script before here's a breakdown of what it does:

* Installs only the core Java files
* Integrates with Internet Explorer and Mozilla browsers
* Disables the Java Updater from being installed
* Disables the system tray icon
* Deletes any Java Web Start icons that might be added to the the Start Menu or the Desktop

In addition to installing and configuring the JRE there are some example commands there for modifying the registry to provide Java support for applications that are expecting a specific version. For example you can run the Citrix Management Console, which expects version `1.5.0_09`, on version `1.6.0_03`. Running less Java can only be a good thing right?
