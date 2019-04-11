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

![CSIDL_APPDATA]({{site.baseurl}}.com/media/2011/10/CSIDL_APPDATA.png)

The folders captured under %CSIDL_APPDATA%\Microsoft are those folders that have been created during the first-run tasks – folders created when you launch an Office application and perform some standard tasks.

If you're familiar with delivering applications with App-V (or any type of application virtualization platform) and managing the user environment, the portions of the user profile for an application will also be virtualized (unless you do something like [this]({{site.baseurl}}/virtualisation/sequencing-mozilla-firefox-7/)) and will end up in the PKG file.

To see what this looks like at runtime, here's a view of a profile before running Office applications that have been delivered by App-V:

![BeforeOffice]({{site.baseurl}}.com/media/2011/10/BeforeOffice.png)

After executing each of the Office applications in the package (I've used a package with Office 2010 Professional Plus with Visio and Project) and using just about every feature in those applications:

![AfterOffice]({{site.baseurl}}.com/media/2011/10/AfterOffice.png)

There's an additional 10 folders that have been created with 8 of those related to Office. This has left me with the majority of the Office user profile being virtualized and stored in the PKG file, whilst the rest is now stored on the real file system. This probably doesn't have too much impact to the user if I'm using Roaming Profiles so that Office settings follow the user, but what happens for support?

The service desk now has to manage Office settings for the user in two places. If the aim is repair the Office settings by resetting the App-V package deleting the PKG file, a portion of the Office settings will remain. This is not an ideal solution – the profile for an application should virtualized entirely or not be virtualized at all.

Do that, you will need to add an additional step during sequencing – create those folders that during the monitoring phase. I do this via a script (that also installs and configures Office) that will create the folders listed in the table below. If you do that, the entire Office profile will now be virtualized.

|Folder|
|------|
|%APPDATA%\Microsoft\AddIns|
|%APPDATA%\Microsoft\Bibliography|
|%APPDATA%\Microsoft\Clip Organizer|
|%APPDATA%\Microsoft\CLView|
|%APPDATA%\Microsoft\Document Building Blocks|
|%APPDATA%\Microsoft\Excel|
|%APPDATA%\Microsoft\Forms|
|%APPDATA%\Microsoft\InterConnect|
|%APPDATA%\Microsoft\MS Project|
|%APPDATA%\Microsoft\Office|
|%APPDATA%\Microsoft\OneNote|
|%APPDATA%\Microsoft\Outlook|
|%APPDATA%\Microsoft\PowerPoint|
|%APPDATA%\Microsoft\Proof|
|%APPDATA%\Microsoft\Publisher|
|%APPDATA%\Microsoft\Publisher Building Blocks|
|%APPDATA%\Microsoft\Queries|
|%APPDATA%\Microsoft\QuickStyles|
|%APPDATA%\Microsoft\SharePoint Designer|
|%APPDATA%\Microsoft\Signatures|
|%APPDATA%\Microsoft\Stationery|
|%APPDATA%\Microsoft\Templates|
|%APPDATA%\Microsoft\UProof|
|%APPDATA%\Microsoft\Word|
|%APPDATA%\Microsoft\Media Catalog|
|%APPDATA%\Microsoft\Graph|
|%APPDATA%\Microsoft\InfoPath|
|%APPDATA%\Microsoft\Themes|
|%APPDATA%\Microsoft\OIS|
|%APPDATA%\Microsoft\VSTAHost|
|%APPDATA%\Microsoft\VSCommon|
|%APPDATA%\Microsoft\VSTA|
|%APPDATA%\Microsoft\Web Server Extensions|
|%APPDATA%\Microsoft\IMJP10|
|%APPDATA%\Microsoft\IME12|
|%APPDATA%\Microsoft\IMJP8_1|
|%APPDATA%\Microsoft\IMJP9_0|
|%APPDATA%\Microsoft\IMJP12|
