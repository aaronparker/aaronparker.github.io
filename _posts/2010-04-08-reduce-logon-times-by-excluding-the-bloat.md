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

![VodafoneMobileConnectAppData]({{site.baseurl}}/media/2010/04/VodafoneMobileConnectAppData.png)

Yes that’s **37.3**Mb of logs. Handy.

Here’s iTunes storing **161**Mb in **3295** files in AppData\Roaming – imagine waiting for that to copy at logon.

![iTunesBackupAppData]({{site.baseurl}}/media/2010/04/iTunesBackupAppData.png)

I’ve been spending some time with some of the user profile virtualisation (or _user virtualisation_ / _user environment management_ / _user workspace virtualisation_ ) products lately and have started to compile a list of profile folders that I’ve needed to exclude from being managed.

Profile virtualisation products like [this one](http://www.appsense.com/products/environmentmanager/) and [this one](http://www.ressoftware.com/pm-products.aspx?PageID=174) can optimise what is roamed; however exclusions may still be required and are necessary if are using standard Windows roaming profiles or less complex virtualisation solutions such as Citrix Profile Management.

Most of these products are very easy to install and configure and for the most part are ‘fire and forget’; however adding some exclusions is a simple way to improve logon and logoff times by reducing the amount of managed data.

## Folder Exclusions

The following tables list a selection of folders from within the user profile (all relative to `%USERPROFILE%`) that should be considered for exclusion.

First up, here’s a list of the default user folders for Windows Vista and above, that in most cases would be redirected from the user profile to a network location:

|Folder|Description|
|------|-----------|
|Contacts|Contacts folder (depreciated in Windows 7?)|
|Desktop|Desktop folder; usually redirected|
|Documents|Documents folder; usually redirected|
|Downloads|Downloads folder|
|Favorites|Internet Explorer favourites; usually redirected|
|Links |Windows Explorer favourites; usually redirected|
|Music |Music folder; usually redirected|
|Pictures|Pictures folder; usually redirected|
|Saved Games|Games saves|
|Searches|Windows Explorer custom searches; usually redirected|
|Videos|Videos folder; usually redirected|

If you are using folder redirection, you may not need to add these to your exclusion list; however if folder redirection did not apply then excluding these from the user profile will prevent them from becoming managed (potentially managing very large amounts of data).

Next is a list of folders from various applications that either store large files or many small files that will impact on logon and logoff times:

|Folder|Description|
|------|-----------|
|.VirtualBox|Sun VirtualBox; Default configuration and storage folder|
|Tracing|Windows Live Messenger, Office Communicator; tracing logs. Info how to change that location [here](http://stealthpuppy.com/windows/keeping-the-windows-vista-user-folder-clean)|
|Podcasts|Zune; Podcasts folder|
|Virtual Machines|Windows Virtual PC; default configuration and storage folder|
|AppData\Roaming\Apple Computer\MobileSync|Apple iTunes; Folder used to store device backups|
|AppData\Roaming\Apple Computer\Logs|Apple iTunes; Stores device logs|
|AppData\Roaming\Apple Computer\iTunes\iPhone Software Updates|Apple iTunes; Stores full images of the iPhone OS|
|AppData\Roaming\Microsoft Office\Live Meeting 8|Microsoft Live Meeting; default installation folder|
|AppData\Roaming\Microsoft Shared\LiveMeeting Shared|Microsoft Live Meeting; shared folder|
|AppData\Roaming\Microsoft\XDE|Microsoft Visual Studio; Windows Mobile 7 emulator images|
|AppData\Roaming\Macromedia\Flash Player\macromedia.com\support\flashplayer\sys|Adobe Flash; Cookies and settings|
|AppData\Roaming\Macromedia\Flash Player\#SharedObjects|Adobe Flash; Cookies|
|AppData\Roaming\Adobe\Flash Player\AssetCache|Adobe Flash; cache folder|
|AppData\Roaming\Vodafone\Vodafone Mobile Connect\Log|Vodafone Mobile Connect|
|AppData\Roaming\Microsoft\Windows\Recent|Windows; recent files and folders; lots of small files can increase logon/logoff times|
|AppData\Roaming\Microsoft\Windows\Start Menu|Windows; personal Start Menu; if applications are managed this folder could be excluded|
|AppData\Roaming\SoftGrid Client\Icon Cache|App-V; Icon cache for shortcuts. If using App-V server this will be re-populated|
|AppData\Roaming\Juniper Networks\Juniper Citrix Services Client|Juniper Networks; Citrix ICA client binaries|
|AppData\Roaming\Juniper Networks\Setup Client|Juniper Networks; Setup client binaries|
|AppData\Local|Various; Local application data (i.e. non-roaming); should be excluded by default|
|AppData\LocalLow|Various; Local application data for low integrity applications; should be excluded by default|
|AppData\Roaming\MetroTwit\User_Images|MetroTwit user images cache|
|AppData\Roaming\Dropbox|DropBox install folder|
|AppData\Roaming\Microsoft\Office\Recent|Shortcuts to recent files edited in Microsoft Office|
|AppData\Roaming\Mozilla\Firefox\Crash Reports|Firefox Crash Reports|
|AppData\Roaming\McAfee\Common Framework|Various McAfee apps including VirusScan. Logs files and others|
|AppData\Roaming\Spotify\Gracenote|Gracenote SDK DLLs used by Spotify|

If you have any additional folders to exclude, let me know and I’ll add them to the list.
