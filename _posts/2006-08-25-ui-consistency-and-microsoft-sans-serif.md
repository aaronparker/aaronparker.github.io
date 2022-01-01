---

title: UI consistency and Microsoft Sans Serif
date: 2006-08-25T06:04:00+10:00
author: Aaron Parker
layout: post

permalink: /ui-consistency-and-microsoft-sans-serif/
categories:
  - Microsoft
---
When Microsoft released Windows 2000, the new default UI font was changed to Tahoma from Microsoft Sans Serif. Unfortunately, not every team involved in developing Windows got the memo detailing this change. (There€™s a whole team for the Display properties applet right?). I think it was also the same teams that then forgot to change the font in various dialogs in Windows XP. It still haunts us in various locations in Windows Vista as of build 5456 for which the new UI font is [Segoe UI](http://msdn.microsoft.com/library/en-us/UxGuide/UXGuide/Visuals/Fonts/Fonts.asp?frame=true). Well if you€™re picky like me and just want to see the same font across all UI elements, you can get most of the way there with a couple of registry edits. Navigate to:

`HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\FontSubstitutes`

Change the values for "MS Shell Dlg 2" and "MS Shell Dlg" to "Tahoma" or "Segoe UI" depending on what platform you are on. Reboot and you will see the new font in use where it should be. In some places however, you will see text controls wrapping because the newer fonts may be spread out a little more, but these are few.

This "bug" has been reported on the Vista/Longhorn newsgroups, some hopefully we€™ll see this change in upcoming builds of Vista. (Please, please Microsoft, just the single UI font would be nice..)

**Update**: I found some more information on the Microsoft Sans Serif/MS Sans Serif font in use in Windows. Microsoft Sans Serif is an OpenType font that replaces the older MS Sans Serif font. Many applications just don't use the new font though and this is noticeable when you enable ClearType font smoothing - MS Sans Serif is not 'smoothed' . The same registry key can be used to replace the font in older applications:

  1. Open your Fonts folder via Control Panel and drag MS Sans Serif somewhere safe in case you ever want it back
  2. Open your registry and navigate to `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\FontSubstitutes`
  3. Right-click on the `FontSubstitutes `folder and choose `New > String Value`
  4. Overtype `New Value #1` as `MS Sans Serif`
  5. Double-click on the new value and enter `Tahoma` or `Segoe UI`
  6. Reboot (it really is necessary)

[Source](http://damieng.blogspot.com/2006/04/cleartype-smoothed-fonts-and-bane-of.html)

**Update #2**: Chris Pirillo has done some more work into the font substitues. You can view [his detailed post here](http://chris.pirillo.com/2006/09/26/fix-windows-vistas-fonts/) and also download a registry file to make the changes for you. A warning though, it will break some applications and essentially remove Arial and Tahoma from your system. I've already found that [Paint.NET](http://www.getpaint.net/redirect/getpdn.html) produces a lovely font related error when starting and just does not run.