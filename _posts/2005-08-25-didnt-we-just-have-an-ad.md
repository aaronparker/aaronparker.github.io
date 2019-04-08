---
id: 299
title: 'Didn't we just have an ad?'
date: 2005-08-25T23:17:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/didnt-we-just-have-an-ad
permalink: /didnt-we-just-have-an-ad/
categories:
  - General
---
There are 3 reasons why I use Firefox:

  1. Standards support;
  2. Tabs;
  3. [Adblock](http://adblock.mozdev.org/).

Adblock makes using the Internet usable again by blocking unwanted elements in web pages and it does this very well. Unfortunately there is no version for Internet Explorer, and I'm painfully reminded of that everytime I go back to IE. You can utilise the HOSTS file but this is a little cumbersome. However I found [HostsMan](http://hostsman.abelhadigital.com/) via [MVPS.org](http://www.mvps.org/winhelp2002/hosts.htm) yesterday. This is a very well designed tool that works extremely well and allows for automatically downloading HOSTS lists from MVPS.org and [hpHosts](http://www.hosts-file.net/), integrating this into your local HOSTS file and for quickly editing the hosts file. It even includes a HTTP server for serving a page for the blocked host (It listens on 127.0.0.x only).

![](http://pwp.netcabo.pt/0413933601/abelhadigital/pics/hostsman201.jpg")

This then got me thinking about blocking hosts in an ISA Server rule. At the moment I import the list via a custom VBScript into a domain set and create a rule to redirect access to those hosts to an internal web server that returns a simple white page. However, managment of the domain list is cumbersome when that list is very large. By using HostsMan, I could import the list into the local HOSTS file, create a rule that redirects all requests for some IP address, e.g. 172.16.100.200, configure the HOSTs file appropriately and voila! A nice easy method for blocking access to and maintaining a list of ad sites and even spyware/nasty sites. Would this be faster? ISA Server doesn't have to check the domain set. Hmm.. need to test.
