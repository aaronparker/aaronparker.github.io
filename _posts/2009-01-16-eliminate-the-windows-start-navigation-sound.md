---
id: 847
title: Eliminate the Windows Start Navigation sound
date: 2009-01-16T15:34:55+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=847
permalink: /eliminate-the-windows-start-navigation-sound/
dsq_thread_id:
  - "195381466"
categories:
  - Microsoft
tags:
  - Usability
---
What’s the most annoying sound in Windows? For me it’s got to be the Start Navigation sound – that click that Windows plays whenever you navigate your way around Windows Explorer or Internet Explorer. 

Usually you can prevent Windows from playing this sound by setting the Start Navigation event to None; however in Windows 7 it comes back whenever you change themes.

<img title="StartNavigation" style="border-right: 0px; border-top: 0px; display: inline; border-left: 0px; border-bottom: 0px" height="444" alt="StartNavigation" src="{{site.baseurl}}/media/2009/01/startnavigation.png" width="357" border="0" /> &#160;

If you want to remove the sound completely, you’ll need to delete the wav file. To do that, run the following commands from an elevated command prompt:

[code]TAKEOWN /f "%SystemRoot%\Media\Windows Navigation Start.wav" /a  
CACLS "%SystemRoot%\Media\Windows Navigation Start.wav" /E /G Administrators:F  
DEL /Q "%SystemRoot%\Media\Windows Navigation Start.wav"[/code]

These commands will work on Windows Vista and Windows 7.