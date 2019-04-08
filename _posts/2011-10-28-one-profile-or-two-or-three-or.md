---
id: 2421
title: 'One profile, or Two, or Three, or&#8230;'
date: 2011-10-28T17:27:40+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2421
permalink: /one-profile-or-two-or-three-or/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "455521583"
categories:
  - Community
---
<img class="alignright size-full wp-image-2432" style="margin-left: 5px; margin-right: 5px;" title="User001" src="http://stealthpuppy.com/wp-content/uploads/2011/10/User001.png" alt="" width="128" height="128" />Surely one of the main goals of any good desktop delivery project is to remove the user&#8217;s reliance on any single device?

To achieve that goal, we need to ensure that the user&#8217;s environment is available across any device. Whether the desktop is a physical PC, Remote Desktop server or running on a virtual machine in the data centre, providing the user with a consistent view of their applications allows them to be productive as soon as they logon.

Once we achieve device independence, users should rightly expect that their data and preferences will be available where ever they logon. At least, that&#8217;s what I would expect &#8211; I don&#8217;t care too much how I access an application, I&#8217;d like some consistency when I do access them. I&#8217;d like my favourites to follow me ([Google got this right with Chrome](http://www.google.co.uk/support/chrome/bin/answer.py?answer=185277)), I&#8217;d like my application settings to follow me, and of course my data as well.

How do we do this in a corporate environment today, with multiple operating systems and often multiple versions of an application? I can bet you aren&#8217;t achieving that with standard Roaming Profiles.

I&#8217;ve recently finished working on a project consisting of migrating to Windows 7 which also includes delivering desktops and applications using Citrix XenDesktop and XenApp. A key component of the migration was to provide users with some consistency across those desktops.

That&#8217;s not as simple as task as it may sound. How do you migrate user settings and preferences from the previous operating system and roam settings between Windows 7 and Windows Server 2008 R2 (and with any luck, back again)?

Another barrier, and a surprising one to me, is that (depending on the size of the organisation) all architecture and engineering teams need to be on board with the roaming train. Having dealt with a team that was responsible for some of the core applications, who didn&#8217;t understand roaming, clear direction on the approach to the user environment is critical.

So my goal has been is this &#8211; provide the user with a single set of preferences across all operating systems. Even moving those preferences to down level versions of Windows if the project demands it. There will always be a certain subset of preferences that can&#8217;t be moved across Windows versions; however for the most part this is achievable.

I asserted this during my sessions at BriForum this year, in London and Chicago, [User Environment Smack Down](http://briforum.com/US/sessions.html#userenvironment) &#8211; a single profile per user provides the best user experience.

However what if you don&#8217;t want that? Perhaps it&#8217;s a valid approach for a user to have completely separate profiles per machine. So I thought that a completely non-scientific poll might be an interesting way to find out your thoughts. Have you say by voting in the poll embedded below:

[polldaddy poll=&#8221;5295720&#8243;]

So how do you get to a single profile? For an independent review of the 3rd party solutions available for achieving a consistent user environment regardless of device, download the [User Environment Smack Down white paper from brianmadden.com](http://www.brianmadden.com/blogs/rubenspruijt/archive/2011/06/29/user-environment-management-smackdown-head-to-head-analysis-of-appsense-citrix-immidio-liquidware-labs-microsoft-quest-res-scense-tricerat-unidesk-and-vuem.aspx). We&#8217;ve been hard at work on version 1.1 which is due very soon.