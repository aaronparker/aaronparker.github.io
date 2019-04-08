---
id: 699
title: Keeping The Windows Vista User Folder Clean
date: 2008-09-18T17:50:20+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=699
permalink: /keeping-the-windows-vista-user-folder-clean/
dsq_thread_id:
  - "195381044"
categories:
  - Microsoft
tags:
  - Windows Explorer
---
Because I’m a stickler for clean UI, I want to ensure users don’t see extra files or folders in their User folder on Windows Vista. I’m trying to avoid something similar to what you can see in the screenshot below, which looks a little out of place:

<img style="display: inline" title="Computer" src="http://stealthpuppy.com/wp-content/uploads/2008/09/computer.png" border="0" alt="Computer" width="566" height="419" /> 

This location in the UI replaces the Documents folder as the top level navigation tool but it essentially gives you a view of the user profile (%USERPROFILE%). As such, this location cannot be redirected to the network, so it would be advantageous to prevent users from adding data to this folder &#8211; otherwise you will need to manage that data. Leaving it inside the roaming profile is probably not the best solution.

Fortunately, Microsoft provide a Group Policy setting that will prevent users from adding files to to this location:

  * User Configuration / Policies / Administrative Templates / Windows Components / Windows Explorer / Prevent users from adding files to the root of their User Files folder

<img style="display: inline" title="ExplainPolicy" src="http://stealthpuppy.com/wp-content/uploads/2008/09/explainpolicy.png" border="0" alt="ExplainPolicy" width="357" height="280" /> 

When this policy is enabled users will see this behaviour when attempting to copy files into their User folder:

<img style="display: inline" title="ComputerDragDrop" src="http://stealthpuppy.com/wp-content/uploads/2008/09/computerdragdrop.png" border="0" alt="ComputerDragDrop" width="566" height="423" /> 

This works well for Explorer but unfortunately I’m struggling to find applications that honour this setting, with Office Communicator and even Windows Live Messenger 9 the biggest culprits so far. These applications create a Tracing folder that is used for [diagnostic logging](http://support.microsoft.com/kb/871023/en-us). These keys control where the log is created:

  * HKCU\Software\Microsoft\Tracing\uccapi\WindowsLiveMessenger\FileDirectory
  * HKCU\Software\Microsoft\Tracing\uccp\Communicator\FileDirectory
  * HKCU\Software\Microsoft\Tracing\WPPMedia\WPPFilePath
  * HKCU\Software\Microsoft\Tracing\WPPMedia\Debug\WPPFilePath

For each key I’ve changed %USERPROFILE% to %APPDATA% (scripted of course..)

<img style="display: inline" title="AppData" src="http://stealthpuppy.com/wp-content/uploads/2008/09/appdata.png" border="0" alt="AppData" width="341" height="164" /> 

So as we rollout Windows Vista, I’m going to have to keep an eye on more applications but I think I could be in for a losing battle.