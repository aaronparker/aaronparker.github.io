---

title: Troubleshooting an Extraneous UAC Prompt
date: 2008-10-15T11:00:06+10:00
author: Aaron Parker
layout: post

permalink: /troubleshooting-an-extraneous-uac-prompt/
dsq_thread_id:
  - "195381189"
categories:
  - Microsoft
tags:
  - UAC
---
Even though I log onto my domain machine with a standard user account, I’ve been prompted by UAC to elevate when running Registry Editor. After putting up with it for a couple of months, I finally got around to doing something to fix it today.

To see what was going on I used Process Explorer to see the differences in privileges between a standard process and an elevated Registry Editor. Here’s Notepad running with my standard token:

![]({{site.baseurl}}/media/2008/10/notepad.png)

And here’s REGEDIT running with the elevated token. As you can see, the difference is the _SeLoadDriverPrivilege_ privilege:

![]({{site.baseurl}}/media/2008/10/regedit.png)

I use [TrueCrypt](http://www.truecrypt.org/) to protect data on one of my USB thumb drives. TrueCrypt, of course, loads a driver when you mount an encrypted disk, and some time back I had been attempting to avoid the UAC prompt involved with mounting the encrypted disk. Sure enough when I took a look in the Local Security Policy editor (SECPOL.MSC), I had given the Users group the ability to Load and unload device drivers:

![]({{site.baseurl}}/media/2008/10/loaddriverprivilege.png)

Removing the right for the Users group, didn’t help me with TrueCrypt, but at least now I can open REGEDIT (which I use far more often) without a UAC prompt.