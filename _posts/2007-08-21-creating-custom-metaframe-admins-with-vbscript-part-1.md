---
id: 334
title: 'Creating Custom MetaFrame Admins with VBscript: Part 1'
date: 2007-08-21T08:18:19+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/scripting/creating-custom-metaframe-admins-with-vbscript-part-1
permalink: /creating-custom-metaframe-admins-with-vbscript-part-1/
aktt_notify_twitter:
  - 'yes'
categories:
  - Automation
tags:
  - Presentation-Server
---
**Overview**  
Setting privileges on a custom administrator account in Presentation Server is not quite as simple as I thought when I set out to create a script to do so - there's not much information on the CDN forums, so this was a bit of trial and error.

The process for creating a custom administrator account and setting privileges goes like this:

  1. Create the custom administrator account.
  2. Bind to the new account and add privileges except for those that apply to application or server folders.
  3. Bind to the Applications folder/s and add privileges for the specified administrator.
  4. Bind to the Servers folder/s and add privileges for the specified administrator.

As you can see the process isn't completed in a single step, there are actually three seperate steps to setting privileges. The first is setting privileges on the objects outlined here in this screenshot (those objects in colour):

<p style="text-align: center">
  <img src="https://stealthpuppy.com/media/2007/08/ctx-privsset1.png" alt="ctx-privsset1.png" />
</p>

The next steps set the permissions on the folder objects rather than the administrator object as outlined in this screenshot (those objects in colour):

<p style="text-align: center">
  <img src="https://stealthpuppy.com/media/2007/08/ctx-privsset2.png" alt="ctx-privsset2.png" />
</p>

Something I should note here though, is that I've not been able to set permissions on the Monitoring Profiles folder. I could be wrong but from what I can tell you can't currently access these types of folders.

**Reading The Privileges**  
First up I had to read the privileges from an existing object to make it simpler to set the privileges on any new administrators - you've gotta learn to read before you can write. Initially setting the privileges is easy via the Access Management Console then programatically reading back then simplifies the write process.

Reading the privileges on an administrator account is simple enough because we can bind to the administrator object and then read the privileges. Reading the privileges for that account on the Applications and Servers folders is a little different - unless you want to statically supply the list of folders, you'll need to enumerate them.

I've created a fuction and a few subroutines, based on some code from the CDN forums, that will return an array containing the distinguished names of the Application or Server folders. The code essentially walks the folder tree to find the subfolders of each folder, while calling itself to do so until the subfolder count reaches 0.

The full script will echo out the privleges in both the numerical value and the privilege name defined by MetaFrameAdminPrivilege. Check out the MFCOM SDK 4.5 for a complete list of the privileges. This script will work on Presentation Server 4.0 and 4.5, I've not tested on any earlier versions.



Continue to [part 2 here](https://stealthpuppy.com/scripting/creating-custom-metaframe-admins-with-vbscript-part-2)