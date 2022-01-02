---

title: '"Fixing" Windows Briefcase'
date: 2009-01-22T12:36:11+10:00
author: Aaron Parker
layout: post

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

![Briefcase]({{site.baseurl}}/media/2009/01/oldbriefcase.png)

In most cases I will just remove this menu item completely. To do that, the quick and dirty method is just to delete `HKEY_CLASSES_ROOT\Briefcase` from the registry. However, if you are one of those 10 people here’s how to make it pretty.

First up, I have a Windows Vista style icon for the Briefcase. I can’t remember where I originally got it from but you can download it [here](http://cid-74b5baa3414de283.skydrive.live.com/self.aspx/Public/Icons/Briefcase%20Icon.zip):

Extract this icon to a local folder - I usually place custom icons in `C:\Windows\Media`. Then change the following three registry values to "%SystemRoot%\Media\Briefcase.ico" (without the quotes):

|Key                                                                      |Value    |Type         |
|-------------------------------------------------------------------------|---------|-------------|
|HKEY_CLASSES_ROOT\Briefcase\DefaultIcon                                  |(Default)|REG_EXPAND_SZ|
|HKEY_CLASSES_ROOT\Briefcase\ShellNew                                     |IconPath |REG_EXPAND_SZ|
|HKEY_CLASSES_ROOTCLSID\{85BBD920-42A0-1069-A2E4-08002B30309D}\DefaultIcon|(Default)|REG_EXPAND_SZ|

Once you have updated the registry (you may have to logoff and back on to see the changes), Briefcase will look much smarter:

![]({{site.baseurl}}/media/2009/01/newbriefcase.png)

If you want to script this change, here are the command lines to do it:

```powershell
REG ADD HKCR\Briefcase\DefaultIcon /ve /d ^%SystemRoot^%\Media\Briefcase.ico /t REG\_EXPAND\_SZ /f  
REG ADD HKCR\Briefcase\ShellNew /v IconPath /d ^%SystemRoot^%\Media\Briefcase.ico /t REG\_EXPAND\_SZ /f  
REG ADD HKCR\CLSID\{85BBD920-42A0-1069-A2E4-08002B30309D}\DefaultIcon /ve /d ^%SystemRoot^%\Media\Briefcase.ico /t REG\_EXPAND\_SZ /f
```
