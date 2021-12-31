---
id: 1420
title: Disable the EU Browser Choice screen
date: 2010-03-02T00:04:39+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=1420
permalink: /disable-the-browser-choice-screen/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195382221"
categories:
  - Microsoft
tags:
  - Internet-Explorer
---
You're probably aware of the [Browser Choice screen](http://support.microsoft.com/kb/976002) coming to Windows users in the EU, the update that forced on users because of a company that can't do something [a bunch of volunteers](http://www.mozilla.com) have done quite admirably. [This update will actually unpin Internet Explorer](http://windows.microsoft.com/en-GB/windows/what-is-the-browser-choice-update) from the taskbar even if you've already made IE your default browser.

With [some suggestions](http://www.ghacks.net/2010/02/22/windows-browser-choice-screen-will-cause-confusion-in-europe/) [about the confusion](http://www.thetechherald.com/article.php/201008/5282/Choice-of-browsers-could-be-double-edged-sword) this screen will cause, disabling the update might be the best way to prevent the support calls this is sure to generate.

For administrators who are controlling update delivery with WSUS, you should be able to prevent deployment by not approving it; however you can also control display of the browser choice window with the following registry value:

  * Key: `HKLM\Software\BrowserChoice`
  * Value: `Enable` (REG_DWORD)
  * Enabled: 1, Disabled 0

To deploy during a Windows build, use the following command (or instead deploy with your favourite tool, e.g. Group Policy Preferences):

```powershell
REG ADD HKLM\Software\BrowserChoice /v Enable /t REG_DWORD /d 0 /f
```

More information in this knowledgebase article: [Information about the Browser Choice update for system administrators who are in managed environments that are under a Volume Licensing program](http://support.microsoft.com/kb/2019411).
