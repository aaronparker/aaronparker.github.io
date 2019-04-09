---
id: 657
title: Managing Control Panel in Windows Vista
date: 2008-08-19T22:46:19+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=657
permalink: /managing-control-panel-in-windows-vista/
dsq_thread_id:
  - "195380951"
categories:
  - Microsoft
tags:
  - Control Panel
  - Migration
  - Windows-Vista
---
At some point in your migration from Windows XP to Windows Vista you’ll no doubt be looking to manage which Control Panel applets are available to users. Controlling access to applets is no different than earlier version of Windows, but given that there are approximately 48 default applets in Windows Vista compared to 29 in Windows XP, more consideration will need to be given to those which you make available.

There's a good chance that list will be different for everyone, but here's my approach: Hiding Control Panel applets is not a replacement for ensuring users are not logging into their workstations with administrative access. Without administrative access, users cannot make system wide changes. Restrict applets too much and you can make support difficult.

I consider the task of restricting the available applets as a means of de-cluttering the interface, not ‘locking the system down’.

Here’s what Control Panel applets I would consider to be relevant to most users in a Windows XP environment:

[<img title="WindowsXPControlPanel" src="https://stealthpuppy.com/media/2008/08/windowsxpcontrolpanel-thumb.png" border="0" alt="WindowsXPControlPanel" width="538" height="374" />]({{site.baseurl}}/media/2008/08/windowsxpcontrolpanel.png)

A couple of these may not be completely necessary, but they give users enough access to manage their environment to suit the way they work. Note that there’s nothing in these applets (yes, including Network Connections) that lets standard users change system settings. There are also many Group Policy settings that allow you to be fairly granular for settings within these applets.

This is what I’m looking at providing for users in Windows Vista:

[<img title="Control Panel Home" src="https://stealthpuppy.com/media/2008/08/controlpanelhome-thumb.png" border="0" alt="Control Panel Home" width="590" height="431" />]({{site.baseurl}}/media/2008/08/controlpanelhome.png)

[<img title="WindowsVistaControlPanel" src="https://stealthpuppy.com/media/2008/08/windowsvistacontrolpanel-thumb.png" border="0" alt="WindowsVistaControlPanel" width="576" height="498" />]({{site.baseurl}}/media/2008/08/windowsvistacontrolpanel.png)

As you can see there’s many more icons, but Vista does provide many more features. There are a few applets here that you may wonder why I’ve not hidden them:

  * _Network and Sharing Center_: especially useful to laptop users for providing connectivity information
  * _Problem Reports and Solutions_: Vista does a good job of providing solutions for device and software compatibility issues
  * _System_: Information list here is useful for support personnel, hard to see this info if this applet is unavailable
  * User Accounts: this will allow users to change their user picture

Here's a short list of recommendations when configuring Group Policy for the Control Panel:

  * Leave the standard Control Panel view as the default – don’t be tempted to force Classic view. The default view in Windows Vista is less cluttered and search makes finding the right option easier.
  * Provide the complete list of Control Panel applets across all device types in a GPO on the user’s OU using the _Show only specified Control Panel items_ policy
  * Remove additional applets from the previous list for special case machines (e.g. Terminal Server) in a loop-back policy using the _Hide specified Control Panel items_ policy
  * Using applet names in these policies provides more granular access than using the .CPL filenames (plus they’re easier to read)

There are also a couple of other settings that remove options that users don't need to see:

  * User Configuration / Policies / Administrative Templates / Windows Components / Windows Explorer / Remove Hardware tab
  * User Configuration / Policies / Administrative Templates / Control Panel / Regional and Language Options / Hide Regional and Language Options administrative options

And finally, here’s what Control Panel under Windows 2008 Terminal Server might look like:

[<img title="Windows2008ControlPanel" src="https://stealthpuppy.com/media/2008/08/windows2008controlpanel-thumb.png" border="0" alt="Windows2008ControlPanel" width="546" height="392" />]({{site.baseurl}}/media/2008/08/windows2008controlpanel.png)

So, what do you think - am I off my tree for giving users so many options? Or can I get some support for the 'enabling users' camp?