---
id: 86
title: TweakVI encourages users to turn off UAC
date: 2007-03-11T00:27:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/tweakvi-encourages-users-to-turn-off-uac
permalink: /tweakvi-encourages-users-to-turn-off-uac/
categories:
  - Applications
tags:
  - UAC
  - Windows-Vista
---
TweakVI is a tweaking and "optimisation" application from [Totalidea](http://www.totalidea.com/content/tweakvi/tweakvi-index.html) that is essentially a front end for a large number of registry settings that you can enable or disable to change the behaviour of features in Windows Vista. The application is mainly aimed at power users but I would assume that some slightly less power users would be interested in this application as well.

What has struck me about this software is that during setup you are encouraged to disable UAC because it "might cause warning message to appear". Here's the screenshots from the installer:

<img border="0" src="https://stealthpuppy.com/media/2007/03/1000.14.1100.TweakVISetup3.png" /> 

<img border="0" src="https://stealthpuppy.com/media/2007/03/1000.14.1101.TweakVISetup4.png" /> 

Here's a couple of quotes from their FAQ page site about [TweakVI and UAC](http://www.totalidea.com/content/tweakvi/tweakvi-faq.html#15):

> **Dragging files into the File Shredder listbox in the 'File Tools' plugin does not work. How can I fix that?**
> 
> In order for the FileShredder feature to work, the Windows Vista User Account Control (UAC) must be disabled; otherwise communication between Windows Vista and the FileShredder via drag-and-drop is impossible. Please check your UAC settings (Control panel >>> User Account Settings). There you can disable UAC.
> 
> **Certain features might not work as expected - what am I doing wrong?**
> 
> It is possible that you have the new Windows User Account Control activated. UAC is known to interfere with some of TweakVIs features. If you encounter a problem, or a malfunction of a TweakVI feature, please check your UAC settings. If UAC is enabled, please disable it, reboot your machine, and check if the problem has disappeared.

So from these quotes, I gather that Totalidea finds it easier to get users to disable UAC rather that [write the application correctly.](http://msdn.microsoft.com/msdnmag/issues/07/01/UAC/) This is really bad for users, novice and power users alike. Disabling UAC removes one of the major security improvements in Vista. I would have thought that an application that is used to tweak the operating system would be encouraging secure computing.