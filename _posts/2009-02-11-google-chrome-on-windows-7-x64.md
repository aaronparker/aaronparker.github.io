---
id: 874
title: Google Chrome on Windows 7 x64
date: 2009-02-11T18:34:24+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/windows/google-chrome-on-windows-7-x64
permalink: /google-chrome-on-windows-7-x64/
aktt_notify_twitter:
  - 'no'
dsq_thread_id:
  - "195381556"
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
categories:
  - Microsoft
tags:
  - Google Chrome
---
<p class="note">
  The latest<a href="http://www.google.com/landing/chrome/beta/"> beta of Chrome</a> (2.0.169.1) now works unmodified on Windows 7 x64
</p>

I&#8217;ve had some issues with Google Chrome (1.0.154.48) running on Windows 7 x64, but [thanks to these](http://www.google.com/support/forum/p/Chrome/thread?tid=5111f112bcd233e1&hl=en) [two links](http://code.google.com/p/chromium/issues/detail?id=4788), it&#8217;s now working great.

To get Chome working you&#8217;ll need to add switches to your Chrome shortcut. Most people look to be getting good results by adding the &#8216;&#8211;in-process-plugins&#8217; switch but my experience has been mixed. I&#8217;ve found that adding &#8216;&#8211;no-sandbox&#8217; as well as worked. So your shortcut should look something like this:

[code]C:\Users\Aaron\AppData\Local\Google\Chrome\Application\chrome.exe &#8211;no-sandbox &#8211;in-process-plugins[/code]

<img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="Google Chrome Properties" src="http://stealthpuppy.com/wp-content/uploads/2009/02/googlechromeproperties.png" border="0" alt="Google Chrome Properties" width="409" height="480" />