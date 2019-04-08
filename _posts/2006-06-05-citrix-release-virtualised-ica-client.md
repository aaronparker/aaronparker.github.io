---
id: 271
title: Citrix release virtualised ICA client
date: 2006-06-05T23:44:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/citrix-release-virtualised-ica-client
permalink: /citrix-release-virtualised-ica-client/
aktt_notify_twitter:
  - 'yes'
categories:
  - Citrix
---
Citrix have added [a new ICA client](http://www.citrix.com/English/SS/downloads/details.asp?dID=24182&downloadID=24183&pID=186) to their download site. This client is very interesting as it uses application virtualisation from [Thinstall](http://www.thinstall.com/) that allows the user to run the ICA client without installing it. This is great for users who travel and may want to access applications from their corporate network, but end up in an Internet cafe where the computers don't have the Citrix ICA Client installed.This client runs from a single compressed executable and evidently requires no change to the host PC. You can read more about the client [here](http://www.thinstall.com/products/virtualized_citrix.php).

What is a little odd, is on the download page at Thinstall is a line that says &#8220;FREE for personal use&#8221; - how many people have a Presentation Server at home? What's even more interesting though, is what does this deal with Thinstall means for Citrix's own [Project Tarpon](http://www.brianmadden.com/content/content.asp?ID=508)?

Citrix have also released version 9.2 of the Presentation Server Client which can be found [here](http://www.citrix.com/English/SS/downloads/details.asp?dID=2755&downloadID=25368&pID=186) with a change log [here](http://support.citrix.com/kb/entry.jspa?externalID=CTX109965). Deploy hotfix [PSE400R01W2K3033](http://support.citrix.com/article/CTX108597) along side the new client to resolve some printing issues as well.