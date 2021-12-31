---

title: Sequencing Microsoft Comic Chat
date: 2011-04-01T23:24:55+10:00
author: Aaron Parker
layout: post

permalink: /sequencing-microsoft-comic-chat/
dsq_thread_id:
  - "268816451"
categories:
  - Applications
tags:
  - App-V
---
![]({{site.baseurl}}/media/2011/04/Step3.jpg)

No, this isn't an April Fools joke – I wanted to see if I could sequence [Microsoft Comic Chat](http://en.wikipedia.org/wiki/Microsoft_Comic_Chat) using App-V. After seeing [Raymond Chen's latest post on Comic Chat](http://blogs.msdn.com/b/oldnewthing/archive/2011/04/01/10148494.aspx), I had to take a look.

> Comic Chat is a radically different kind of internet chat program, released by Microsoft in 1996. Instead of representing chat dialogs as text, like the majority of internet chat programs, or as graphical worlds like some emerging chat programs, Comic Chat visually represents conversations as sequences of comic panels.

Using App-V to deliver this application is actually a great example of the power of using any application virtualization product to deliver your legacy applications. The first version of Comic Chat was release in 1996 when we were all running Windows 95, even to run our businesses. Running Comic Chat today under Windows 7 will result in this error:

![]({{site.baseurl}}/media/2011/04/07.png)

Comic Chat is expecting to be able to write to the HKEY\_LOCAL\_MACHINE key in the Registry. App-V solves this issue two ways – capturing the writes at first launch and optional allowing standard users to write to protected locations because the writes occur within the virtual environment.

### Getting ready to sequence Comic Chat

You can download Microsoft Comic Chat 2.5 from [David Kurlander's site](http://kurlander.net/DJ/Projects/ComicChat/resources.html) (Kurlander is the designer of Comic Chat). See [the Getting Started page](http://kurlander.net/DJ/Projects/ComicChat/GettingStarted.html) for installation and usage instructions.

Although Comic Chat installs OK on Windows 7, during sequencing Setup produces this error:

![]({{site.baseurl}}/media/2011/04/INFInstallFailure.png)

Fortunately, there's an easy fix – before starting the monitoring phase, configure mschat25.exe to start in Windows XP Compatibility Mode:

![]({{site.baseurl}}/media/2011/04/MSChat-Compat.png)

### Sequencing Comic Chat

I sequenced Comic Chat on Windows 7 using the App-V 4.6 SP1 Sequencer. Sequencing is simple enough – just install to the default folder. During first run, you can choose to enable the Comic Strip view:

![]({{site.baseurl}}/media/2011/04/08.png)

You might also like to remove the extra shortcut created by Setup in _Start Menu\Programs\Internet Explorer_:

![]({{site.baseurl}}/media/2011/04/05.png)

And that's about it. I've tested execution on a Windows 7 SP1 64-bit installation. Other than taking some time to connect to an IRC server, Comic Chat works under App-V on Windows 7.

### Comic Chat Package Accelerator

If you'd like to sequence Comic Chat yourself, I've uploaded a Package Accelerator to the TechNet Gallery - [App-V Package Accelerator for Microsoft Comic Chat 2.5](http://gallery.technet.microsoft.com/Package-Accelerator-for-97080d2c)
