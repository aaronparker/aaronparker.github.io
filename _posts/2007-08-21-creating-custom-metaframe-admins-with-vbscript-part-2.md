---
id: 335
title: 'Creating Custom MetaFrame Admins with VBscript: Part 2'
date: 2007-08-21T09:10:39+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/scripting/creating-custom-metaframe-admins-with-vbscript-part-2
permalink: /creating-custom-metaframe-admins-with-vbscript-part-2/
aktt_notify_twitter:
  - 'yes'
dsq_thread_id:
  - "195379396"
categories:
  - Automation
tags:
  - Presentation-Server
---
**Creating the Administrator**  
Now that we can read the privileges from an existing administrator object we can determine which privileges to write to a new administrator. In this post I have listed a script that you can use to create the custom administrator account.

This script uses arrays of values for the privileges (I&#8217;ve used the value rather than their names to reduce the size of the script. See the SDK documentation if you would rather refer to the privileges by their names). The arrays listed in the code will set every single privilege so you will need to edit them when setting your own administrator accounts.

The script can be broken down into this process:

  1. Set the privilege arrays.
  2. Return the list of Application and Server folders.
  3. Bind to the Presentation Server farm.
  4. Create the administrator account.
  5. Bind to the new administrator account and set the first set of privileges.
  6. Bind to the Server folders and assign privileges to the new administrator account.
  7. Bind to the Applications folders and assign privileges to the new administrator account.

The script uses a function to add privileges to the Application or Server folders. Pass the folder name, the folder type (MetaFrameAppFolder or MetaFrameSrvFolder), the account domain and account name and the privilege set as an array and the function does the rest.

During testing I have noticed that the privileges are not set on the last Application folder in the list - if you take a look at the code you can see that I am setting the privileges on that folder a second time. If anyone else is seeing this behaviour please let me know.