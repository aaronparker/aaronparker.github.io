---
id: 351
title: '&#8220;Page Cannot Be Displayed&#8221; in McAfee ePO?'
date: 2007-10-02T10:10:17+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/general/page-cannot-be-displayed-in-mcafee-epo
permalink: /page-cannot-be-displayed-in-mcafee-epo/
dsq_thread_id:
  - "195379488"
categories:
  - Applications
---
Don&#8217;t get me started on the ridiculousness of wrapping an MMC console around a web application served by Apache Tomcat to administer McAfee&#8217;s ePolicy Orchestrator (surely one or the other, not both), but you may see this error after you log into the console instead of seeing the expected settings window:

> The page cannot be displayed
> 
> The page you are looking for is currently unavailable. The Web site might be experiencing technical difficulties, or you may need to adjust your browser settings...

Internet Explorer 6.0 does not enable TLS support by default, so if you are seeing this you&#8217;ll need to enable TLS in Internet Options. It might then be time to [upgrade your browser](http://www.microsoft.com/windows/products/winfamily/ie/default.mspx) too.