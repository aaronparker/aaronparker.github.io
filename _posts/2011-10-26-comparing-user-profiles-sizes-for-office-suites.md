---
id: 2417
title: Comparing User Profiles Sizes for Microsoft Office Suites
date: 2011-10-26T12:00:45+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2417
permalink: /comparing-user-profiles-sizes-for-office-suites/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "453597208"
categories:
  - Applications
tags:
  - Office
---
I&#8217;ve been doing some work recently virtualizing various versions of Office in App-V plus managing user preferences for those Office packages. Here&#8217;s something interesting that I&#8217;ve found – the size of the profile settings for a default installation of Office 2010 is massively different in size over previous versions of Office.

Here&#8217;s a look at my user profile where I&#8217;ve been running Office 2010, Office 2007 and Office 2003 and capturing the user preferences for those applications with a third-party management tool:

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="Office profile sizes" src="http://stealthpuppy.com/wp-content/uploads/2011/10/Screen-Shot-2011-10-25-at-13.38.28_thumb.png" alt="Office profile sizes" width="660" height="395" border="0" />](http://stealthpuppy.com/wp-content/uploads/2011/10/Screen-Shot-2011-10-25-at-13.38.28.png)

In this screenshot, the profile sizes for each versions of Office breaks down like this:

  * Office 2010 – 7150Kb
  * Office 2007 – 767Kb
  * Office 2003 – 33Kb

And that&#8217;s compressed too. So in my profile, the user preferences for Office 2010 are 9 times larger than for Office 2007 and 216 times larger than the preferences for Office 2003!

If you&#8217;re in the process of or have upgraded to Office 2010, have you thought about the additional data that you&#8217;ll be managing (whether proactively or not)? If you&#8217;re stuck with &#8220;managing&#8221; user preferences with Roaming Profiles, you&#8217;re just masking this issue and will have no real insight into how much space this stuff is consuming.

What do you do about it? I think the only solution is to use a third party user environment management (or user virtualization, if you like) solution from one of the vendors covered in this white paper: [User Environment Management Smackdown](http://www.brianmadden.com/blogs/rubenspruijt/archive/2011/06/29/user-environment-management-smackdown-head-to-head-analysis-of-appsense-citrix-immidio-liquidware-labs-microsoft-quest-res-scense-tricerat-unidesk-and-vuem.aspx)*. Go read it to find out what you can do with a solution that actually manages the user layer.

*OK, yes it&#8217;s a shameless plug – I helped write the paper.