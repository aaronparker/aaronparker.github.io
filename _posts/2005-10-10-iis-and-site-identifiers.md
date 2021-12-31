---
id: 289
title: IIS and Site Identifiers
date: 2005-10-10T15:20:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/iis-and-site-identifiers
permalink: /iis-and-site-identifiers/
categories:
  - Microsoft
tags:
  - IIS
---
Having previously having issues installing an applications on IIS where the Default Web Site (i.e. the site with an identifier of 1) no longer exists, I was hesitant to edit the METABASE.XML. So I bit the bullet, stopped IIS, opened METABASE.XML in Notepad and changed all instances of the existing identifier to 1, saved and restarted IIS, and away she went. Bowl me over with a feather, by jove she works!