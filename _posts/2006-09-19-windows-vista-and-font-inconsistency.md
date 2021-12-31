---
id: 181
title: Windows Vista and Font Inconsistency
date: 2006-09-19T06:53:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/windows-vista-and-font-inconsistency
permalink: /windows-vista-and-font-inconsistency/
categories:
  - Microsoft
tags:
  - Fonts
---
I'm not alone in my frustration with Windows Vista (or Windows XP) and the inconsistency in font usage. Fonts are definitely in your face and consistent font usage helps the user distinguish between a UI element and content. David Vronay, Research Manager for Windows User Experience Compliance, has posted a response to [a thread that I started](http://shellrevealed.com/forums/thread/493.aspx) on font inconsistency at [shell: revealed](http://shellrevealed.com/). Here's what he had to say on the topic:

> The inconsistencies are mostly in two categories:
> 
> 1) Old UI that we are not changing for Vista so it is stuck with the old fonts. For instance, you will notice several old wizard, control panels,etc., are completely unchanged for Vista. This includes the font. It was decided that if a feature was not being changed for Vista, we would not change its font. The reason is because for many of these features, changing the font requires that we redo all of the localization of the feature (translating it into 127 languages or however many we ship with these days and then testing all of those changes to make sure they work.) Our old UI does not support automatic reflow, etc., so the size and position of things has to be changed by hand for different languages. So, this sucks I know but this is not going to be fixed for Vista.
> 
> 2) Oops! Someone just did it wrong and no one has noticed yet (or they noticed but they were past the localization freeze date for their feature, or they noticed but have too many crashing bugs to fix it, etc.) We are working hard to correct these, especially in common UI. So if you think you see stuff in this category, post it here or file a bug.

Essentially then, things will stay them same and won't change until a particular feature is updated. Perhaps if we keep logging it as a bug.. Anyway check out the shell: revealed site, it's shaping up to be a good resource to understand why and how the Windows UI comes together.

If you want to see Segoe UI or Tahoma used across more of the Windows UI you can make a registry change that I've detailed [here](http://www.trustedaccess.info/blogs/travelling/archive/2006/08/25/UI-consistency-and-Microsoft-Sans-Serif.aspx). This tweak doesn't work for all applications and UI elements but it works surprisingly well on Windows Vista.