---
id: 858
title: '&#8220;Fixing&#8221; Windows Briefcase'
date: 2009-01-22T12:36:11+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=858
permalink: /fixing-windows-briefcase/
aktt_notify_twitter:
  - 'yes'
dsq_thread_id:
  - "195381526"
categories:
  - Microsoft
tags:
  - Usability
---
For the 10 people who [use](http://support.microsoft.com/kb/307885) [Windows Briefcase](http://en.wikipedia.org/wiki/Briefcase_%28Microsoft_Windows%29), this one is not for you. If you’re like me and can’t stand the rough edges in Windows that have yet to be cleaned up, the Windows Briefcase icon is a bit of an eye sore because it still uses a Windows XP style icon:

[<img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="OldMenu" src="http://stealthpuppy.com/wp-content/uploads/2009/01/oldmenu-thumb.png" border="0" alt="OldMenu" width="224" height="212" />](http://stealthpuppy.com/wp-content/uploads/2009/01/oldmenu.png)  [<img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="OldBriefcase" src="http://stealthpuppy.com/wp-content/uploads/2009/01/oldbriefcase-thumb.png" border="0" alt="OldBriefcase" width="111" height="111" />](http://stealthpuppy.com/wp-content/uploads/2009/01/oldbriefcase.png)

In most cases I will just remove this menu item completely. To do that, the quick and dirty method is just to delete `HKEY_CLASSES_ROOT\Briefcase` from the registry. However, if you are one of those 10 people here’s how to make it pretty.

First up, I have a Windows Vista style icon for the Briefcase. I can’t remember where I originally got it from but you can download it [here](http://cid-74b5baa3414de283.skydrive.live.com/self.aspx/Public/Icons/Briefcase%20Icon.zip):



Extract this icon to a local folder - I usually place custom icons in _C:\Windows\Media_. Then change the following three registry values to &#8220;%SystemRoot%\Media\Briefcase.ico&#8221; (without the quotes):

[table id=11 /]

Once you have updated the registry (you may have to logoff and back on to see the changes), Briefcase will look much smarter:

[<img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="NewMenu" src="http://stealthpuppy.com/wp-content/uploads/2009/01/newmenu-thumb.png" border="0" alt="NewMenu" width="224" height="212" />](http://stealthpuppy.com/wp-content/uploads/2009/01/newmenu.png)  [<img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="NewBriefcase" src="http://stealthpuppy.com/wp-content/uploads/2009/01/newbriefcase-thumb.png" border="0" alt="NewBriefcase" width="111" height="111" />](http://stealthpuppy.com/wp-content/uploads/2009/01/newbriefcase.png)

If you want to script this change, here are the command lines to do it:

[code]REG ADD HKCR\Briefcase\DefaultIcon /ve /d ^%SystemRoot^%\Media\Briefcase.ico /t REG\_EXPAND\_SZ /f  
REG ADD HKCR\Briefcase\ShellNew /v IconPath /d ^%SystemRoot^%\Media\Briefcase.ico /t REG\_EXPAND\_SZ /f  
REG ADD HKCR\CLSID\{85BBD920-42A0-1069-A2E4-08002B30309D}\DefaultIcon /ve /d ^%SystemRoot^%\Media\Briefcase.ico /t REG\_EXPAND\_SZ /f[/code]