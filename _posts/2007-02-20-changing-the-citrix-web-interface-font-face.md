---

title: Changing the Citrix Web Interface Font Face
date: 2007-02-20T18:39:00+10:00
author: Aaron Parker
layout: post

permalink: /changing-the-citrix-web-interface-font-face/
aktt_notify_twitter:
  - 'yes'
categories:
  - Citrix
tags:
  - Web-Interface
---
I've never previously had to change the font face in Web Interface, but I've had to it today for the first time ever. Now one would think that this would be in a custom style sheet, but the CSS is actually inline in the Web Interface web pages.

To change the font face you will need to edit one of the language files. In my case this was the English language file - **common_strings.properties**. At about line 374 you will find the following line which you modify to change the font:

<span style="font-family: 'courier new', courier;">FontFace=Verdana, Arial, Helvetica, sans-serif</span>

The default location for the language file for Web Interface 4.5 is _C:\Program Files\Citrix\Web Interface\4.5\languages_.