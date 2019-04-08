---
id: 5481
title: Publish Citrix Director with Azure AD Application Proxy
date: 2017-07-05T18:26:01+10:00
author: Aaron Parker
layout: post
guid: http://stealthpuppy.com/?p=5481
permalink: /?p=5481
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
categories:
  - Citrix
tags:
  - Application Proxy
  - Azure AD
  - Citrix Director
---
Want to provide remote access to Citrix Director and ensure secure access only from trusted devices or multi-factor authentication? Then Azure AD and Application Proxy is a great way to do that - here's how to set it up.

Deploying XenApp and XenDesktop into cloud environments is a popular strategy that I'm seeing a regular basis, and from my experience deploying full infrastructure control planes on IaaS (rather than Citrix Cloud) is a common approach. These environments are some times fully hosted with the only in-bound access controlled by NetScaler. The challenge then is how to provide support for users running applications on XenApp or desktops on XenDesktop.