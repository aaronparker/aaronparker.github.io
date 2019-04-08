---
id: 1087
title: MSI Live Update disables User Account Control
date: 2009-05-11T23:12:37+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=1087
permalink: /msi-live-update-disables-user-account-control/
aktt_notify_twitter:
  - 'yes'
aktt_tweeted:
  - "1"
dsq_thread_id:
  - "195381793"
categories:
  - Applications
tags:
  - UAC
---
I thought I'd seen just about every dumb thing that a developer could do, but this latest one from MSI is a whopper..

I have an [MSI Wind netbook](http://uk.msi.com/index.php?func=proddesc&prod_no=1415&maincat_no=135&cat2_no=551) that's having some shutdown and sleep issues when running Windows 7, so my first thought was to ensure I was running the latest BIOS version. For some reason, MSI still provides [a DOS-based utility](http://www.msicomputer.com/support/BIOS_AMI.asp) for updating your BIOS. Not having any USB floppy drives laying around, I went looking for a Windows-based tool instead.

MSI supplies a [Live Update application](http://www.msi.com/index.php?func=html&name=liveupdate_series), which will provide users with the latest BIOS and driver updates for their MSI product. It sounded like a good idea to me at the time, so I downloaded the installer and fired it up, but that's when it just got a little too scary.

For some reason that I can't quite fathom, it appears that MSI has decided that User Account Control needs to be disabled for their application to run. After installing MSI Live Update and running the main application, you are presented with this dialog box:

<img class="alignnone size-full wp-image-1088" title="msiuacwarning" src="http://stealthpuppy.com/wp-content/uploads/2009/05/msiuacwarning.png" alt="msiuacwarning" width="423" height="157" srcset="https://stealthpuppy.com/wp-content/uploads/2009/05/msiuacwarning.png 423w, https://stealthpuppy.com/wp-content/uploads/2009/05/msiuacwarning-150x55.png 150w, https://stealthpuppy.com/wp-content/uploads/2009/05/msiuacwarning-300x111.png 300w" sizes="(max-width: 423px) 100vw, 423px" /> 

Clicking the only option available to you - the OK button, results in a UAC prompt:

<img class="alignnone size-full wp-image-1089" title="msidisableuacprompt" src="http://stealthpuppy.com/wp-content/uploads/2009/05/msidisableuacprompt.png" alt="msidisableuacprompt" width="460" height="417" srcset="https://stealthpuppy.com/wp-content/uploads/2009/05/msidisableuacprompt.png 460w, https://stealthpuppy.com/wp-content/uploads/2009/05/msidisableuacprompt-150x135.png 150w, https://stealthpuppy.com/wp-content/uploads/2009/05/msidisableuacprompt-300x271.png 300w" sizes="(max-width: 460px) 100vw, 460px" /> 

Hmm.. DUAC.EXE, I wonder what that does. Let's cancel that prompt and try the another tool included with Live Updater - Live Monitor. This one not only requires elevation to initially execute, but you just will not get anything useful out of it with UAC enabled.

Here's [a video of the application in action](http://www.youtube.com/watch?v=C297dtKFrK8) (on Windows Vista) - running LMONITOR.EXE will in turn run DUAC.EXE to disable UAC and then reboot the machine - with little warning:

[youtube=http://www.youtube.com/watch?v=C297dtKFrK8]

Not only is this a sad indictment of MSI's support tool, but this could potentially put many of their users at risk. It's a real shame to see developers taking the easy way out instead of doing a little research and [doing things the right way](http://msdn.microsoft.com/en-us/magazine/cc163486.aspx).

Fortunately though, the online version of Live Update (which is really just an ActiveX implementation of the installed version) does not attempt to disable UAC. If you own an MSI product, my recommendation would be to steer well clear of their Live Update utility and download drivers and other updates manually instead.