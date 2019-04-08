---
id: 104
title: Fatal Error during Windows Setup
date: 2007-02-08T18:30:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/fatal-error-during-windows-setup
permalink: /fatal-error-during-windows-setup/
categories:
  - Microsoft
---
I received the following error (in a dialog box) from Windows Setup on a Terminal Server running Windows Server 2003 not long after GUI-mode setup started:

> &#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;  
> Fatal Error  
> &#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;  
> An error has been encountered that prevents Setup from continuing.
> 
> Setup failed to install the product catalogs. This is a fatal error. The setup log files should contain more information.
> 
> Press OK to view the Setup log file.  
> &#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;  
> OK  
> &#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;

Unfortunately the Setup log file wasn't much help. The actual cause of the error was related to the particular configuration of Windows. These servers utilise two RAID 1 disk sets and I am using an unattended setup to configure Windows to store user profiles (\Documents and Settings) on the second disk set (seperate from the System partition). To do this I need to launch Windows Setup from WINNT32.EXE via a Windows PE environment and just before this happens the disk partitions are created and formatted via a DISKPART script. For whatever reason, the second disk set is occasionally not formatted, so when Windows Setup gets to GUI-mode it can't create the folder for user profiles and fail with the above error.