---
id: 1870
title: 'App-V FAQ: How do I get an application into the App-V bubble for troubleshooting?'
date: 2010-09-09T11:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=1870
permalink: /app-v-faq-27-how-do-i-get-an-application-into-the-app-v-bubble-for-troubleshooting/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195383292"
categories:
  - FAQs
tags:
  - App-V
  - AppVFAQ
---
<img style="margin: 0px 0px 5px 10px; display: inline;" src="https://stealthpuppy.com/media/2010/06/AppVFAQLogo.png" alt="" align="right" />There are instances in which you will need to troubleshoot applications running in the App-V bubble (or the virtualised environment). Although applications delivered by App-V are running locally, they are separated from other applications and the operating system by the App-V client (the feature known as the [SystemGuard](http://blogs.technet.com/b/appv/archive/2007/08/02/inside-the-grid-part-1.aspx), although usually referred to as the bubble).

This poses some challenges – how do you use troubleshooting tools such as [Process Monitor](http://technet.microsoft.com/en-us/sysinternals/bb896645.aspx) if it can’t see the application? To do this you will need to launch a Command Prompt into the bubble.

### The Old Way – editing OSD files

The old method of launching an external application into the bubble was to edit an OSD file and add  [SCRIPT](http://support.microsoft.com/kb/939085) entry. In this example, CMD.EXE will be launched before the application (TIMING="PRE") and inside the bubble (PROTECT="TRUE").

[code]<SCRIPT EVENT="LAUNCH" TIMING="PRE" PROTECT="TRUE" WAIT="TRUE" TIMEOUT="">  
<HREF>cmd.exe</HREF>  
</SCRIPT>[/code]

On starting the application shortcut, Command Prompt will open – once you exit Command Prompt the application will then start.

As you can probably see, there's an issue with this – you need to edit the OSD files. That's not something you want to do in a production environment.

### A Better Way – Use SFTTRAY instead

App-V 4.5 introduced the /LAUNCH switch to the SFTTRAY.EXE command. This allows you to specify an alternate executable name as the primary application when launching an App-V package. To use this you first need to find the application name and version from your App-V package (although you may already know this from the application shortcut properties). To view the application names run:

[code]SFTMIME QUERY OBJ:APP /SHORT[/code]

This will return the list of applications for the current user context (or all of the applications if you run the command as an administrator). Don't forget the /SHORT switch otherwise you'll get a lot more information that you need. Use SFTTRAY /? to see the complete list of switches.

<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="CommandPrompt-LaunchAppV" src="https://stealthpuppy.com/media/2010/09/CommandPromptLaunchAppV_thumb.png" border="0" alt="SFTMIME and SFTTRAY commands to launch an alternate process" width="660" height="263" /> 

To launch an alternate executable, copy the application name as listed and use the SFTTRAY command like this:

[code]SFTTRAY /EXE cmd.exe /LAUNCH "WinMerge 00000010"[/code]

This will launch the App-V package with Command Prompt as the primary executable instead of the executable listed in the OSD file. After you exit Command Prompt the application won't then be launched as would happen with the OSD method. Additionally, you can do this in production without affecting applications for other users.

### Bonus Methods

A couple of the [3rd party tools]({{site.baseurl}}/virtualisation/app-v-faq-26-what-3rd-party-tools-are-there-for-managing-app-v) such as the [App-V Client Diagnostic and Configuration tool (ACDC) 1.1](http://www.loginconsultants.com/index.php?option=com_docman&task=doc_details&gid=69&Itemid=149) from Login Consultants or [SoftBar](http://www.jagtechnical.com/softbar/) by Greg Brownstein provide a simpler way to get an application into the bubble via a GUI.

ACDC is my preferred troubleshooting tool, which gives you a plethora of options for managing applications with the ability to launch a tool in the bubble of a specific application:

<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="ACDC-RunCommandPrompt" src="https://stealthpuppy.com/media/2010/09/ACDCRunCommandPrompt_thumb.png" border="0" alt="ACDC-RunCommandPrompt" width="660" height="393" /> 

And here's SoftBar in action, which can do the same type of thing:

<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="va_menu" src="https://stealthpuppy.com/media/2010/09/va_menu.jpg" border="0" alt="va_menu" width="631" height="263" /> 

Both tools allow you to extend the launch menu with additional executables.

### Resources

  * [App-V: New command line for running CMD prompts inside the bubble](http://blogs.technet.com/b/appv/archive/2008/09/25/app-v-new-command-line-for-running-cmd-prompts-inside-the-bubble.aspx)
  * [How to run scripts in an .osd file in Microsoft SoftGrid](http://support.microsoft.com/kb/939085)
  * [Scripting within an OSD file](http://blogs.technet.com/b/appv/archive/2007/10/11/scripting-within-an-osd-file.aspx)