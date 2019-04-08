---
id: 295
title: Troubleshooting Woes
date: 2005-09-23T14:07:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/troubleshooting-woes
permalink: /troubleshooting-woes/
categories:
  - Applications
tags:
  - Presentation-Server
---
Last night I attempted to install Citrix Web Interface for Presentation Server 4.0 on a Windows box and received the following error:

![](/photos/parky/images/141/original.aspx) 

I've been able to surmise a cause: I've removed the Default Web Site which has a site identifier of 1. So the Web Interface installer is looking for the site numbered 1, can't find it and throws an error. So I thought to myself, &#8220;Surely there's a solution to this problem?&#8221; I searched the documentation and [support.citrix.com](http://support.citrix.com/index.jsp) for this error message and the only thing I can find is [this forum post](http://support.citrix.com/forums/thread.jspa?messageID=358621&fromSearchPage=trueñ—£) which discusses a similar situation but doesn't offer a solution.

Now this leaves me with a number of thoughts:

  1. How do I change the site identifier in IIS to 1? Hack METABASE.XML? (That's scares me a little) Reload IIS? (No thanks, but it might be my only solution)
  2. Why does the installer not give me the choice of which web site to install to? This is especially annoying since you don't actually configure a Web Interface site until after installation. Short answer: lazy developers.
  3. Why is there no knowledgebase article or documentation on this error message?Â  Short answer: lazy developers.

Point 3 is what really gets my goat. If a product logs and error in an event log, throws a dialog box at you, surely there should be some documentation on the error. Microsoft are also guilty of this. I've lost count of the number of times that I've been troubleshooting a problem, found an event in the event logs and found no knowledgebase article on the event.

Developers can write some fantastic code that solves a solution, but I find that they forget about the people who install and maintain their products. Lack of detailed documentation makes supporting a product difficult. If an application throws an error, I don't see any excuse not to document the error, anything less is unacceptable.