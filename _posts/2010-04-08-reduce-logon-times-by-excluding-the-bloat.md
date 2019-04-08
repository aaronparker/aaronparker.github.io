---
id: 1456
title: Reduce logon times by excluding the bloat
date: 2010-04-08T20:00:01+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=1456
permalink: /reduce-logon-times-by-excluding-the-bloat/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195382304"
categories:
  - Microsoft
tags:
  - Profile Virtualisation
  - User Folders
  - User Virtualization
---
Profile bloat – we’ve all seen it. Many applications, and even Windows itself, can store files in the most inappropriate places within the user profile. For example, here’s just part of what the Vodafone Mobile Connect application stores within the roaming portion of my profile:

[<img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="VodafoneMobileConnectAppData" border="0" alt="VodafoneMobileConnectAppData" src="http://stealthpuppy.com/wp-content/uploads/2010/04/VodafoneMobileConnectAppData_thumb.png" width="660" height="408" />](http://stealthpuppy.com/wp-content/uploads/2010/04/VodafoneMobileConnectAppData.png) 

Yes that’s **37.3**Mb of logs. Handy.

Here’s iTunes storing **161**Mb in **3295** files in AppData\Roaming – imagine waiting for that to copy at logon.

[<img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="iTunesBackupAppData" border="0" alt="iTunesBackupAppData" src="http://stealthpuppy.com/wp-content/uploads/2010/04/iTunesBackupAppData_thumb.png" width="660" height="381" />](http://stealthpuppy.com/wp-content/uploads/2010/04/iTunesBackupAppData.png) 

I’ve been spending some time with some of the user profile virtualisation (or _user virtualisation_ / _user environment management_ / _user workspace virtualisation_ ) products lately and have started to compile a list of profile folders that I’ve needed to exclude from being managed.

Profile virtualisation products like [this one](http://www.appsense.com/products/environmentmanager/) and [this one](http://www.ressoftware.com/pm-products.aspx?PageID=174) can optimise what is roamed; however exclusions may still be required and are necessary if are using standard Windows roaming profiles or less complex virtualisation solutions such as Citrix Profile Management.

Most of these products are very easy to install and configure and for the most part are ‘fire and forget’; however adding some exclusions is a simple way to improve logon and logoff times by reducing the amount of managed data.

### Folder Exclusions

The following tables list a selection of folders from within the user profile (all relative to %USERPROFILE%) that should be considered for exclusion.

First up, here’s a list of the default user folders for Windows Vista and above, that in most cases would be redirected from the user profile to a network location:

[table id=16 /]

If you are using folder redirection, you may not need to add these to your exclusion list; however if folder redirection did not apply then excluding these from the user profile will prevent them from becoming managed (potentially managing very large amounts of data).

Next is a list of folders from various applications that either store large files or many small files that will impact on logon and logoff times:

[table id=17 /]

If you have any additional folders to exclude, let me know and I’ll add them to the list.