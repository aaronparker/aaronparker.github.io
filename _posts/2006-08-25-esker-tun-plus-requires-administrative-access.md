---

title: Esker Tun PLUS Requires Administrative Access
date: 2006-08-25T06:10:00+10:00
author: Aaron Parker
layout: post

permalink: /esker-tun-plus-requires-administrative-access/
dsq_thread_id:
  - "195378882"
categories:
  - Applications
---
Today's entrant into the Hall of Shame is Esker Tun PLUS which can be used to provide an ActiveX based terminal emulator via the web. This product downloads no less than 11 ActiveX controls and then wants the user to run an application named TRUST.EXE from a page that has the following text:

    You are attempting to run a Tun PLUS session from the server, "<edited>". <strong>Since Tun PLUS sessions require full access to your system, you must download trust.exe to enable access. Running this executable give Tun PLUS sessions permission to access your system</strong>. You will only have to perform the following operation once.

TRUST.EXE will provide Tun PLUS full access to my system. What else could potentially have full access to my system? Output from FILEMON and REGMON is a little cryptic when TRUST.EXE is run. I can't quite work out what it is doing. Geez, at least my terminal emulator works. Shame, Esker, shame.

![]({{site.baseurl}}/media/2006/08/1000.14.59.eskertunplus.png)
