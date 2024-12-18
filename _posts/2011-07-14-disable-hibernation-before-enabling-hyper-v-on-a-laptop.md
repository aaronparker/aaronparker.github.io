---

title: Disable Hibernation before enabling Hyper-V on a laptop
date: 2011-07-14T23:49:31+10:00
author: Aaron Parker
layout: post

permalink: /disable-hibernation-before-enabling-hyper-v-on-a-laptop/
dsq_thread_id:
  - "358741685"
categories:
  - Microsoft
tags:
  - Hyper-V
---
If you enable [Hyper-V on a laptop](http://blog.drtritsch.com/?p=165) (or any other machine where hibernation is enabled automatically) you’ll find that you won’t be able to delete the hibernation file (hiberfil.sys).&#160; Although hibernation is effectively disabled, the file remains in use once Windows has booted:

![]({{site.baseurl}}/media/2011/07/delete-hiberfilesys.png)

Additionally, in an effort to remove the lock on the file, you can’t use [POWERCFG](http://technet.microsoft.com/en-us/library/cc748940(WS.10).aspx) to disable hibernation after Hyper-V is installed:

![]({{site.baseurl}}/media/2011/07/powercfg.png)

While there’s [a work-around to get hibernation working](http://blogs.technet.com/b/doxley/archive/2008/09/05/getting-some-sleep.aspx),&#160; there’s not much to gain with hibernation enabled on [a fast SSD drive](http://www.ocztechnology.com/ocz-vertex-3-sata-iii-2-5-ssd.html). Especially when dual-booting puts space at a premium and the hibernation file is 8GB.

Just remember to disable hibernation before enabling Hyper-V with:

```cmd
POWERCFG -H OFF
```