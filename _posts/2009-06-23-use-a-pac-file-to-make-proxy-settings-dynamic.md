---

title: Use a PAC file to make proxy settings dynamic
date: 2009-06-23T22:02:47+10:00
author: Aaron Parker
layout: post

permalink: /use-a-pac-file-to-make-proxy-settings-dynamic/
aktt_notify_twitter:
  - 'yes'
aktt_tweeted:
  - "1"
dsq_thread_id:
  - "195381951"
categories:
  - Applications
tags:
  - Internet-Explorer
  - Proxy server
---
![ProxySettings]({{site.baseurl}}/media/2009/06/ProxySettings.png)

Are you deploying browser proxy settings by setting a proxy server and attempting to manage a proxy bypass list? There is a better way..

Fortunately Jason Curnow, who's had many years experience working with PAC files, has a website where he's documented his experiences and shows you how to create your own - [The Proxy PAC File Guide](http://www.returnproxy.com/proxypac/).

Any proxy server or firewall (a firewall is going to understand the network topology better than a proxy server) worth it's salt will do this type of work for you. I know my favourite firewall, ISA Server does - [Automatic Detection Concepts in ISA Server 2006](http://technet.microsoft.com/en-us/library/bb794779.aspx) (I'm sure other proxy servers or firewalls do too).

In complex environments you may not be able to rely on your proxy server to handle browser configurations completely, so you'll need to roll up your sleeves and roll your own PAC file.

So why a PAC file? Here's a couple of scenarios that demonstrate the awesomeness of a PAC file:

* Laptop users don't need to disable their proxy settings when they're outside the corporate network (OK, the ISA Server firewall client can do this too); and
* If you have internal web applications hosted across WAN links (e.g. your users are in London but SAP is hosted in Ireland), you can use a PAC file to direct specific URLs to proxy servers that handle that SAP traffic only, whilst every thing else goes via your Internet proxy.

So go and check it out, Jason has done some excellent work - [The Proxy PAC File Guide](http://www.returnproxy.com/proxypac/).

## Other Resources

  * [How to disable automatic proxy caching in Internet Explorer](http://support.microsoft.com/kb/271361/)
  * [Automatic configuration does not support certain file types in Internet Explorer 8.0](http://support.microsoft.com/kb/971740/)
  * [How Internet Explorer uses the cache for DNS host entries](http://support.microsoft.com/kb/263558/)
