---
id: 2578
title: 'Don't put yourself at risk by virtualizing Adobe Reader X'
date: 2011-12-08T16:36:01+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2578
permalink: /dont-virtualize-adobe-reader-x/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "497787306"
pd_rating:
  - 'a:8:{s:4:"type";s:1:"0";s:5:"votes";s:1:"1";s:6:"total1";s:1:"0";s:6:"total2";s:1:"0";s:6:"total3";s:1:"0";s:6:"total4";s:1:"0";s:6:"total5";s:1:"1";s:7:"average";s:6:"5.0000";}'
categories:
  - Applications
tags:
  - Adobe Reader
---
<img class="alignright size-full wp-image-2581" title="DontVirtualizeReader" src="http://stealthpuppy.com/wp-content/uploads/2011/12/DontVirtualizeReader.png" alt="" width="128" height="128" />Adobe released a new [security advisory for Reader and Acrobat 9 and X](http://www.adobe.com/support/security/advisories/apsa11-04.html) this week to address details of an upcoming fix to these versions for a 0 day vulnerability. Exploits for this vulnerability exist for Reader and Acrobat 9 and are currently active:

> A critical vulnerability has been identified in Adobe Reader X (10.1.1) and earlier versions for Windows and Macintosh, Adobe Reader 9.4.6 and earlier 9.x versions for UNIX, and Adobe Acrobat X (10.1.1) and earlier versions for Windows and Macintosh. This vulnerability (CVE-2011-2462) could cause a crash and potentially allow an attacker to take control of the affected system. There are reports that the vulnerability is being actively exploited in limited, targeted attacks in the wild against Adobe Reader 9.x on Windows.

Since the release of Reader and Acrobat X, there have been no malware that has been effective against the [Protected Mode](http://blogs.adobe.com/pdfitmatters/2011/06/protected-view-in-acrobat-x-version-10-1.html) (sandbox) feature of version X. From [Adobe's blog post on this issue](http://blogs.adobe.com/asset/2011/12/background-on-cve-2011-2462.html):

> I’d like to take this moment to encourage any remaining users still running Adobe Reader or Acrobat 9.x (or worse, older unsupported versions) to PLEASE upgrade to Adobe Reader or Acrobat X. We put a tremendous amount of work into securing Adobe Reader and Acrobat X, and, to date, there has not been a single piece of malware identified that is effective against a version X install. Help us help you by running the latest version of the software!

If you have any version of Adobe Reader other than X deployed, you should seriously consider migrating to the new version as a matter of priority. That's not &#8220;lets consider doing this in the next month&#8221; - you should stop reading this post and [get started deploying Reader X now](http://stealthpuppy.com/deployment/deploying-adobe-reader-x/).

Furthermore if are deploying or have deployed Reader X, I can't recommend virtualizing it with application virtualization. The reason for this is that Protected Mode is not compatible and is not supported with application virtualization. It doesn't work with [Citrix App Streaming](http://kb2.adobe.com/cps/907/cpsid_90705.html), [Microsoft App-V](http://stealthpuppy.com/virtualisation/virtualising-adobe-reader-x/) or [VMware](http://communities.vmware.com/thread/329118) [ThinApp](http://communities.vmware.com/message/1714001) (it may be possible with the current version of ThinApp, but I haven't confirmed).

[Update: thanks to prompting from [Dan Gough](https://twitter.com/packageologist/), I've confirmed that Protected Mode in Reader X (10.1.1), works under App-V 4.6.1.30091 (Hotfix 4)]

[Update 2: Protected Mode in Reader X is confirmed to work under ThinApp 4.6.2 and 4.7. You'll have to update your virtual applications and re-enable Protected Mode with the latest releases]

In short - leaving Protected Mode enabled will protect your users and devices and because Protected Mode has been incompatible with the isolation that application virtualisation introduces, I recommend that you do not deploy Reader X with application virtualization solutions unless you are using the very latest versions.

But.. what about those scenarios when a virtualized application needs to call a locally installed Reader X? Until the app virt vendors fully support Protected Mode, the best you can do is ensure that Protected Mode is only disabled when Reader runs within the virtualization environment (using a tool like [PolicyPak](http://www.gpanswers.com/1.html?w=PPXEND&p=parker)) and is not completely disabled. Until then, the best we can do is cross our fingers and hope it doesn't happen to us.