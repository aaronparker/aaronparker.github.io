---
id: 5984
title: Reducing Profile Size with a Profile Clean Up Script
date: 2018-02-16T22:31:11+10:00
author: Aaron Parker
layout: revision
guid: https://stealthpuppy.com/2593-autosave-v1/
permalink: /2593-autosave-v1/
---
[<img class="alignleft size-full wp-image-2604" title="Delete by Cari McGee" src="http://stealthpuppy.com/wp-content/uploads/2011/12/AppleKeyboardDelete.jpg" alt="Delete by Cari McGee" width="640" height="317" srcset="http://192.168.0.89/wp-content/uploads/2011/12/AppleKeyboardDelete.jpg 640w, http://192.168.0.89/wp-content/uploads/2011/12/AppleKeyboardDelete-150x74.jpg 150w, http://192.168.0.89/wp-content/uploads/2011/12/AppleKeyboardDelete-300x148.jpg 300w" sizes="(max-width: 640px) 100vw, 640px" />](http://www.flickr.com/photos/pleeker/5379549514/)

Windows profiles become larger over time &#8211; it&#8217;s an inescapable fact. This means that if you are using roaming profiles, logons (and logoff) will be longer and longer. It&#8217;s not just individual file sizes, but also the number of files stored in a profile that will make the&nbsp;synchronisation&nbsp;process slower.

One approach to reducing profile sizes is to [exclude certain folders](http://stealthpuppy.com/virtualisation/reduce-logon-times-by-excluding-the-bloat/). A better solution is to ditch roaming profiles and use [a third-party solution to manage roaming of the user environment](http://www.brianmadden.com/blogs/rubenspruijt/archive/2011/11/01/user-environment-management-smackdown-head-to-head-analysis-of-appsense-citrix-immidio-liquidware-labs-microsoft-quest-res-scense-tricerat-unidesk-and-vuem.aspx).

However, there will still be folders that need to be roamed to maintain the experience that users expect when moving between devices (i.e. consistency). For those folders we can implement some maintenance to keep them at a manageable size &#8211; that is remove files that are not needed in a roaming profile (e.g. log files) or delete files older than a specific number of days.

<span style="color: #ff0000;">Warning</span>: _there&#8217;s a reason that Windows doesn&#8217;t do this maintenance itself &#8211; only each application vendor will have an understanding of whether specific files are required or can be discarded (hence the roaming and local portions of AppData). However, as any experienced Windows admin knows &#8211; many vendors either don&#8217;t test for or don&#8217;t care about roaming scenarios, therefore I strongly recommend testing this approach before production deployment._

As a part of [an upcoming version of this configuration](http://stealthpuppy.com/general/appsense-environment-manager-8-x-baseline-configuration/), I&#8217;ve created a script that will execute at logoff, before the profile is saved back to the network, that will perform two actions:

  1. Delete all files of a specific file type in a specified folder, including sub-folders
  2. Delete all files older than X days&nbsp;in a specified folder, including sub-folders

So for example, you could use the script to delete all .log files below %APPDATA% or delete all Cookies older than 90 days.

The script is extremely simple on purpose and I recommend testing thoroughly before implementing &#8211; use at your own risk; however feedback is welcome.

&nbsp;