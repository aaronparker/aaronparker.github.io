---
id: 101
title: You cannot share the Normal.dot file among multiple users in Word
date: 2007-02-18T18:20:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/you-cannot-share-the-normaldot-file-among-multiple-users-in-word
permalink: /you-cannot-share-the-normaldot-file-among-multiple-users-in-word/
dsq_thread_id:
  - "195378719"
categories:
  - Applications
tags:
  - Office
---
On a semi-regular basis I see an issue on customer networks whereby users receive errors in Microsoft Word similar to the following:

> Word cannot save changes to the global template because it was opened with read-only access. Do you want to save the changes in a template with a different name?

<img style="border: 0px initial initial;" src="{{site.baseurl}}.com/media/2007/02/1000.14.925.WordError1.png" border="0" alt="" width="573" height="86" /> 

This is caused when a NORMAL.DOT is located in the Workgroup templates location. If a Word template with this name exists in this location, Word will open this file first and will not open the users NORMAL.DOT or will not create one if it does not already exist. This is obviously an issue when multiple users open Word or if they don't have write access to the Workgroup templates location. The solution is to ensure that NORMAL.DOT never exists in the Workgroup templates location.

Microsoft has a knowledgebase article that details this issue:

> **SUMMARY**  
> Microsoft Word does not support the sharing of a single Normal.dot file among multiple users. This is true whether or not the file is marked as read-only.
> 
> **MORE INFORMATION  
>** The Normal.dot file stores user-specific settings and is not designed to be shared among multiple users on a single computer or over a network. Word accesses the Normal.dot file at various times and makes changes to it based on the user's actions. As a result, Word must have full read and write access to the file at all times.

[You cannot share the Normal.dot file among multiple users in Word](http://support.microsoft.com/kb/811468/en-au)