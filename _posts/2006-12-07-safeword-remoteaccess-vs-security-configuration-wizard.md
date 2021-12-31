---
id: 136
title: SafeWord RemoteAccess vs. Security Configuration Wizard
date: 2006-12-07T18:28:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/safeword-remoteaccess-vs-security-configuration-wizard
permalink: /safeword-remoteaccess-vs-security-configuration-wizard/
categories:
  - Microsoft
tags:
  - SafeWord
---
If you implement [SafeWord RemoteAccess](http://www.securecomputing.com/index.cfm?skey=1277) with the agent software on a machine running Citrix Web Interface and use the [Security Configuration Wizard](http://www.microsoft.com/windowsserver2003/technologies/security/configwiz/default.mspx) (SCW) to lockdown the operating system, you may run into authentication issues.

In my instance, I found that a user would be able to authenticate once, but then the second authentication instance would fail. Checking the agent logs was not much help as no logs were being recorded. After checking that the latest version of the SafeWord Agent was installed, I remembered that I has run the SCW on the system to help secure it. By default, the agent logs are located in: `C:\Program Files\Secure Computing\SafeWord\AgentLogs`.

By giving the NETWORK SERVICE account write rights to this folder the agent was able to create a log file. The second part of the issue, I was able to identify in the agent log. The file `C:\Program Files\Secure Computing\SafeWord\ServerVerification\SWEC.MD5` was unable to be written to the file system. By allowing the NETWORK SERVICE account write rights to the `C:\Program Files\Secure Computing\SafeWord\ServerVerification` folder, the agent could write this file and authentication worked successfully.
