---
id: 390
title: 'Windows Vista SP1 - Streamlining UAC Interaction'
date: 2007-12-18T23:47:50+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/windows/windows-vista-sp1-streamlining-uac-interaction
permalink: /windows-vista-sp1-streamlining-uac-interaction/
categories:
  - Microsoft
tags:
  - UAC
  - Windows-Vista
---
Here's a great example of the improvements to interaction with User Account Control in Windows Vista Service Pack -creating folders in system locations (e.g. the Start Menu, Program Files etc.). This is probably the most 'in your face' UAC interaction, and beyond this I've personally found UAC to be quite usable.

With the release version of Windows Vista creating a folder in a location such as the All Users Start Menu generated quite a few extra clicks than were perhaps necessary. I've always thought that this dialog box is a little redundant - it just making me confirm something I already know that I'm doing:

![promptbeforeuac.png](https://stealthpuppy.com/media/2007/12/promptbeforeuac.png) 

Service Pack 1 does away with this dialog when creating and renaming folders -from the [Microsoft documentation](http://technet2.microsoft.com/WindowsVista/en/library/005f921e-f706-401e-abb5-eec42ea0a03e1033.mspx?mfr=true):

> SP1 reduces the number of UAC (User Account Control) prompts from 4 to 1 when creating or renaming a folder at a protected location.

So what does this actually mean to the end user? Here's what you see before Service Pack 1. In this example I'm creating a folder in the Start Menu. Here's the basic walkthrough in a series of screeshots, which you can click for a larger view) and then I'll describe the process:

[![sp0-2.png](https://stealthpuppy.com/media/2007/12/sp0-2.thumbnail.png)](https://stealthpuppy.com/media/2007/12/sp0-2.png "sp0-2.png") [![sp0-3.png](https://stealthpuppy.com/media/2007/12/sp0-3.thumbnail.png)](https://stealthpuppy.com/media/2007/12/sp0-3.png "sp0-3.png") [![sp0-4.png](https://stealthpuppy.com/media/2007/12/sp0-4.thumbnail.png)](https://stealthpuppy.com/media/2007/12/sp0-4.png "sp0-4.png") [![sp0-6.png](https://stealthpuppy.com/media/2007/12/sp0-6.thumbnail.png)](https://stealthpuppy.com/media/2007/12/sp0-6.png "sp0-6.png") [![sp0-7.png](https://stealthpuppy.com/media/2007/12/sp0-7.thumbnail.png)](https://stealthpuppy.com/media/2007/12/sp0-7.png "sp0-7.png") [![sp0-8.png](https://stealthpuppy.com/media/2007/12/sp0-8.thumbnail.png)](https://stealthpuppy.com/media/2007/12/sp0-8.png "sp0-8.png") [![sp0-9.png](https://stealthpuppy.com/media/2007/12/sp0-9.thumbnail.png)](https://stealthpuppy.com/media/2007/12/sp0-9.png "sp0-9.png")

  1. Lets open C:\ProgramData\Microsoft\Windows\Start Menu\Programs and create a new folder.
  2. I'm then presented with a dialog that explains I'll need to elevate before this can be done.
  3. I can then consent to the UAC dialog.
  4. The folder is created (as 'New Folder') and I can give it a name (which essentially becomes a rename operation).
  5. I'm then prompted again that I'll need to elevate to change the name of the folder.
  6. I then consent to the UAC dialog.
  7. The folder is then renamed.

Let's take a look at the same process on Windows Vista with Service Pack 1:

[![sp1-2.png](https://stealthpuppy.com/media/2007/12/sp1-2.thumbnail.png)](https://stealthpuppy.com/media/2007/12/sp1-2.png "sp1-2.png") [![sp1-3.png](https://stealthpuppy.com/media/2007/12/sp1-3.thumbnail.png)](https://stealthpuppy.com/media/2007/12/sp1-3.png "sp1-3.png") [![sp1-5.png](https://stealthpuppy.com/media/2007/12/sp1-5.thumbnail.png)](https://stealthpuppy.com/media/2007/12/sp1-5.png "sp1-5.png") [![sp1-6.png](https://stealthpuppy.com/media/2007/12/sp1-6.thumbnail.png)](https://stealthpuppy.com/media/2007/12/sp1-6.png "sp1-6.png")

  1. I'll open the same C:\ProgramData\Microsoft\Windows\Start Menu\Programs folder and create a new folder. The big change here is that the shield icon is on the New Folder menu item.
  2. I immediately receive the UAC dialo, which I consent to.
  3. The new folder is created.
  4. I can give the folder a name and it's done. Much simpler.

This is a simple change, yet makes a big difference to the user experience. Unfortunately it hasn't carried over to deleting of files or folders in these locations - you will still receive the confirm dialog before seeing the UAC dialog. Although Service Pack 1 still has a few months before release, going on the existing documentation I don't think we'll see that fixed.