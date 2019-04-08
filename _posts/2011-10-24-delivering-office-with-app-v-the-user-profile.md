---
id: 2404
title: 'Delivering Office with App-V - The User Profile'
date: 2011-10-24T16:30:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/delivering-office-with-app-v-the-user-profile/
permalink: /delivering-office-with-app-v-the-user-profile/
dsq_thread_id:
  - "452059123"
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
categories:
  - Applications
tags:
  - App-V
  - Office
---
If you follow any of the following guidance from Microsoft for sequencing Office with App-V:

  * [Prescriptive Guidance for Sequencing Office 2010 in App-V 4.6 SP1](http://support.microsoft.com/kb/2627274)
  * [Prescriptive guidance for sequencing Office 2010 using Microsoft App-V 4.5 or 4.6](http://support.microsoft.com/kb/983462)
  * [Prescriptive guidance for sequencing 2007 Office programs in Microsoft App-V](http://support.microsoft.com/kb/939796)

you will end up with a package that will include the following folders in the virtualized user profile (those folders captured during sequencing that will end up in the PKG file):

<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="CSIDL_APPDATA" src="http://stealthpuppy.com/wp-content/uploads/2011/10/CSIDL_APPDATA.png" alt="CSIDL_APPDATA Folders" width="660" height="416" border="0" /> 

The folders captured under %CSIDL_APPDATA%\Microsoft are those folders that have been created during the first-run tasks – folders created when you launch an Office application and perform some standard tasks.

If you're familiar with delivering applications with App-V (or any type of application virtualization platform) and managing the user environment, the portions of the user profile for an application will also be virtualized (unless you do something like [this](http://stealthpuppy.com/virtualisation/sequencing-mozilla-firefox-7/)) and will end up in the PKG file.

To see what this looks like at runtime, here's a view of a profile before running Office applications that have been delivered by App-V:

<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="BeforeOffice" src="http://stealthpuppy.com/wp-content/uploads/2011/10/BeforeOffice.png" alt="BeforeOffice" width="660" height="331" border="0" /> 

After executing each of the Office applications in the package (I've used a package with Office 2010 Professional Plus with Visio and Project) and using just about every feature in those applications:

<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="AfterOffice" src="http://stealthpuppy.com/wp-content/uploads/2011/10/AfterOffice.png" alt="AfterOffice" width="660" height="410" border="0" /> 

There's an additional 10 folders that have been created with 8 of those related to Office. This has left me with the majority of the Office user profile being virtualized and stored in the PKG file, whilst the rest is now stored on the real file system. This probably doesn't have too much impact to the user if I'm using Roaming Profiles so that Office settings follow the user, but what happens for support?

The service desk now has to manage Office settings for the user in two places. If the aim is repair the Office settings by resetting the App-V package deleting the PKG file, a portion of the Office settings will remain. This is not an ideal solution – the profile for an application should virtualized entirely or not be virtualized at all.

Do that, you will need to add an additional step during sequencing – create those folders that during the monitoring phase. I do this via a script (that also installs and configures Office) that will create the folders listed in the table below. If you do that, the entire Office profile will now be virtualized.

[table id=29 /]