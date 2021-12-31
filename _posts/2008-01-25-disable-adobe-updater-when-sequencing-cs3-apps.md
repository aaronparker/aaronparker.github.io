---

title: Disable Adobe Updater When Sequencing CS3 Apps
date: 2008-01-25T04:00:32+10:00
author: Aaron Parker
layout: post

permalink: /disable-adobe-updater-when-sequencing-cs3-apps/
categories:
  - Applications
tags:
  - Adobe
  - SoftGrid
---
Like all of the current Adobe applications, the CS3 suite comes bundled with Adobe Updater 5. When you are sequencing any of these applications you should ensure that Updater is disabled or not installed.

Allowing Updater to run from within the bubble will cause user profile issues. I was going to address this in a separate post, but Rodney Medina has already said it so well here: [Can I sequence applications that update themselves?](http://www.softgridblog.com/?p=27).

You can customise the Windows Installer source files to prevent Updater from installing; however disabling Updater is as simple as deleting the Updater5 program folder:

`RD /Q /S "%CommonProgramFiles%\Adobe\Updater5"`
