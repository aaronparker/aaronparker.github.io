---
id: 3756
title: 'Measuring the Impact of Folder Redirection &#8211; User Logon'
date: 2014-11-19T09:29:42+10:00
author: Aaron Parker
layout: post
guid: http://stealthpuppy.com/?p=3756
permalink: /measure-impact-folder-redirection/
dsq_thread_id:
  - "3239330200"
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
image: /wp-content/uploads/2014/11/measure-624x344.png
categories:
  - Microsoft
tags:
  - Folder Redirection
---
_This is the forth in a series of articles on folder redirection by Aaron Parker, [Helge Klein](https://helgeklein.com/) and [Shawn Bass](http://shawnbass.com/)._

  * Part one: [How Folder Redirection Impacts UX & Breaks Applications](https://helgeklein.com/blog/2014/10/folder-redirection-impacts-ux-breaks-applications)
  * Part two: [Visualizing the Impact of Folder Redirection – Logon and Application Launch](http://stealthpuppy.com/visualizing-impact-folder-redirection-logon/)
  * Part three: [Visualizing the Impact of Folder Redirection – Start Menu Search](https://helgeklein.com/blog/2014/11/visualizing-impact-folder-redirection-start-menu-search/)
  * Part four: this article
  * Part five: [Measuring the Impact of Folder Redirection – Application Launch & SMB Version](https://helgeklein.com/blog/2014/12/measuring-impact-folder-redirection-application-launch-smb-version/)

# Previously in this Series

So far in this series on folder redirection, we&#8217;ve covered [the basics of how folder redirection works](https://helgeklein.com/blog/2014/10/folder-redirection-impacts-ux-breaks-applications), what [the impact of folder redirection is on logon and application launch](http://stealthpuppy.com/visualizing-impact-folder-redirection-logon/) and in the previous article, [Helge covered the impact on search in the Start menu](https://helgeklein.com/blog/2014/11/visualizing-impact-folder-redirection-start-menu-search/). In this article, we&#8217;ll focus on actual measurements of that impact.

# Measuring the Impact on Logon Performance

To measure the impact on performance of different configurations, including different profile sizes, folder redirection enabled or disabled and the file server under different stress conditions, we&#8217;ve used Helge&#8217;s own [uberAgent](https://helgeklein.com/uberagent-for-splunk/) in each of our environments. So while each environment was different, we&#8217;ve used the same methodology to measure the impact.

When we discuss profile sizes we referring to both the total size of the profile as well as the number of files in the profile. For these tests, we have 3 profile sizes:

  * **Small**: 114 files, 4.69 MB
  * **Medium**: 1,461 files, 19.9 MB
  * **Large**: 2,334 files, 33.7 MB

Before capturing metrics, each user account/profile has completed the first logon. The environment used consisted of Citrix XenApp 6.5 (Windows Server 2008 R2) with locally cached profiles deleted at logoff. The file server was running Windows Server 2008 R2.

## Logon Times of Different Profile Sizes and No Folder Redirection

The following graph shows the logon time of user account configured for a roaming profile and with no folder redirection configured. We&#8217;ve averaged the logon times over a number of tests for small, medium and large roaming user profiles.

<figure id="attachment_3772" aria-describedby="caption-attachment-3772" style="width: 1702px" class="wp-caption alignnone">[<img class="wp-image-3772 size-full" src="http://stealthpuppy.com/wp-content/uploads/2014/11/roaming-profile.png" alt="" width="1702" height="1078" srcset="http://192.168.0.89/wp-content/uploads/2014/11/roaming-profile.png 1702w, http://192.168.0.89/wp-content/uploads/2014/11/roaming-profile-150x95.png 150w, http://192.168.0.89/wp-content/uploads/2014/11/roaming-profile-300x190.png 300w, http://192.168.0.89/wp-content/uploads/2014/11/roaming-profile-1024x648.png 1024w, http://192.168.0.89/wp-content/uploads/2014/11/roaming-profile-624x395.png 624w" sizes="(max-width: 1702px) 100vw, 1702px" />](http://stealthpuppy.com/wp-content/uploads/2014/11/roaming-profile.png)<figcaption id="caption-attachment-3772" class="wp-caption-text">Logon impact of profile sizes with no folder redirection</figcaption></figure>

This shows a predictable increase in logon time as the profile grows &#8211; the larger the profile, the longer the logon time takes. In this case, because we&#8217;re using roaming profiles with no folder redirection, the entire profile is copied locally at user logon.

## Logon Times of Different Profile Sizes with Folder Redirection Enabled

Let&#8217;s use the same tests (same user account with the same small, medium and large profiles) and enable folder redirection for each of the user profile folders.

<figure id="attachment_3771" aria-describedby="caption-attachment-3771" style="width: 1700px" class="wp-caption alignnone">[<img class="wp-image-3771 size-full" src="http://stealthpuppy.com/wp-content/uploads/2014/11/folder-redirection.png" alt="" width="1700" height="1086" srcset="http://192.168.0.89/wp-content/uploads/2014/11/folder-redirection.png 1700w, http://192.168.0.89/wp-content/uploads/2014/11/folder-redirection-150x95.png 150w, http://192.168.0.89/wp-content/uploads/2014/11/folder-redirection-300x191.png 300w, http://192.168.0.89/wp-content/uploads/2014/11/folder-redirection-1024x654.png 1024w, http://192.168.0.89/wp-content/uploads/2014/11/folder-redirection-624x398.png 624w" sizes="(max-width: 1700px) 100vw, 1700px" />](http://stealthpuppy.com/wp-content/uploads/2014/11/folder-redirection.png)<figcaption id="caption-attachment-3771" class="wp-caption-text">Logon impact of profile sizes with folder redirection</figcaption></figure>

In this test, there is no statistically significant difference between logon times. The reason for a more consistent logon time is that with folder redirection, we aren&#8217;t copying data locally at logon, other than the user&#8217;s registry (NTUSER.DAT). In these tests, there won&#8217;t be much difference in the size of the registry, therefore the logon times are similar.

## Logon Times of Different Profile Sizes with Citrix Profile Management

If we again use the same user profiles, but instead of folder redirection, we utilise Citrix Profile Management (CPM), then the results of the logon tests look like this:

<figure id="attachment_3770" aria-describedby="caption-attachment-3770" style="width: 1677px" class="wp-caption alignnone">[<img class="wp-image-3770 size-full" src="http://stealthpuppy.com/wp-content/uploads/2014/11/citrix-profile-management.png" alt="" width="1677" height="1082" srcset="http://192.168.0.89/wp-content/uploads/2014/11/citrix-profile-management.png 1677w, http://192.168.0.89/wp-content/uploads/2014/11/citrix-profile-management-150x96.png 150w, http://192.168.0.89/wp-content/uploads/2014/11/citrix-profile-management-300x193.png 300w, http://192.168.0.89/wp-content/uploads/2014/11/citrix-profile-management-1024x660.png 1024w, http://192.168.0.89/wp-content/uploads/2014/11/citrix-profile-management-624x402.png 624w" sizes="(max-width: 1677px) 100vw, 1677px" />](http://stealthpuppy.com/wp-content/uploads/2014/11/citrix-profile-management.png)<figcaption id="caption-attachment-3770" class="wp-caption-text">Logon impact of profile sizes with Citrix Profile Management</figcaption></figure>

The logon times are much better than roaming profiles and more consistent like with folder redirection enabled, but the differences in variation are a little more expressed.

The improvement in logon times over roaming profiles are significant for the medium and large profiles with the similarity in logon times across all three profiles types being down to the similar amount of data required to get the profile down and the desktop loaded (user registry and files immediately accessed). CPM will continue to stream the remainder of the profile down in the background, so perhaps initial application launch may be affected.

# Measuring the Impact on File Server Load on Logon Performance

We&#8217;ve looked at different types of profile and folder redirection configurations which have produced reasonable results for logon performance, but each test was done with the file server hosting the user profile or the redirected folders in an idle state.

Let&#8217;s look at what happens if the file server is under 0% (idle), 80% and 99% CPU load. I&#8217;ve covered some common reasons for [file server CPU load in my previous article](http://stealthpuppy.com/visualizing-impact-folder-redirection-logon/), but as a refresher these could include AV scans, run away processes, servicing a large number of SMB requests, or CPU resource contention.

## Logon Times of Different Profile Sizes and No Folder Redirection

With the first test, we&#8217;ll again use standard roaming user profiles and no folder redirection configured, so the entire profile is copied to the Windows desktop at logon.

<figure id="attachment_3768" aria-describedby="caption-attachment-3768" style="width: 1703px" class="wp-caption alignnone">[<img class="wp-image-3768 size-full" src="http://stealthpuppy.com/wp-content/uploads/2014/11/roaming-profile-file-server-load1.png" alt="" width="1703" height="1083" srcset="http://192.168.0.89/wp-content/uploads/2014/11/roaming-profile-file-server-load1.png 1703w, http://192.168.0.89/wp-content/uploads/2014/11/roaming-profile-file-server-load1-150x95.png 150w, http://192.168.0.89/wp-content/uploads/2014/11/roaming-profile-file-server-load1-300x190.png 300w, http://192.168.0.89/wp-content/uploads/2014/11/roaming-profile-file-server-load1-1024x651.png 1024w, http://192.168.0.89/wp-content/uploads/2014/11/roaming-profile-file-server-load1-624x396.png 624w" sizes="(max-width: 1703px) 100vw, 1703px" />](http://stealthpuppy.com/wp-content/uploads/2014/11/roaming-profile-file-server-load1.png)<figcaption id="caption-attachment-3768" class="wp-caption-text">Logon impact of profile sizes with roaming profiles and file server under load</figcaption></figure>

This produces some interesting results &#8211; with a small roaming profile, there&#8217;s little impact on logon times when the file server CPU is at 80%, but for each of the remaining tests, we can see that file server CPU load, even at 80%, more than doubles the logon time.

When the file server effectively runs out of CPU resources (at 99%) the direct effect on the user experience is clearly visible. For the medium profile, there&#8217;s a 1200% increase in logon time and for the large profile, a 2071% increase! Don&#8217;t let your file server/s run out of CPU resources.

## Logon Times of Different Profile Sizes with Folder Redirection Enabled

The same CPU load tests run again with folder redirection now enabled on the same user profiles. Folder redirection helps to even out the results when compared to the previous test.

<figure id="attachment_3774" aria-describedby="caption-attachment-3774" style="width: 1703px" class="wp-caption alignnone">[<img class="size-full wp-image-3774" src="http://stealthpuppy.com/wp-content/uploads/2014/11/folder-redirection-file-server-load.png" alt="Logon impact of profile sizes with folder redirection enabled and file server under load" width="1703" height="1083" srcset="http://192.168.0.89/wp-content/uploads/2014/11/folder-redirection-file-server-load.png 1703w, http://192.168.0.89/wp-content/uploads/2014/11/folder-redirection-file-server-load-150x95.png 150w, http://192.168.0.89/wp-content/uploads/2014/11/folder-redirection-file-server-load-300x190.png 300w, http://192.168.0.89/wp-content/uploads/2014/11/folder-redirection-file-server-load-1024x651.png 1024w, http://192.168.0.89/wp-content/uploads/2014/11/folder-redirection-file-server-load-624x396.png 624w" sizes="(max-width: 1703px) 100vw, 1703px" />](http://stealthpuppy.com/wp-content/uploads/2014/11/folder-redirection-file-server-load.png)<figcaption id="caption-attachment-3774" class="wp-caption-text">Logon impact of profile sizes with folder redirection enabled and file server under load</figcaption></figure>

At 80% load on the file server, there&#8217;s an impact on the logon. Users sensitive to changes in logon times will probably notice, but I suspect that the majority of users would not be affected.

However, looking at scenarios when the file server runs out of CPU resources (around 99%), it is just unable to service SMB requests in a reasonable time and the user logon times more than triple or quadruple.

Even though we&#8217;ve implemented folder redirection, by itself it&#8217;s not a silver bullet. It helps considerably for large profiles, but once the file serve is busy, users will see the impact on performance.

## Logon Times of Different Profile Sizes with Citrix Profile Management

Let&#8217;s look again at the effectiveness of a streaming approach to profile and data access instead of folder redirection, while the file server is under load.

<figure id="attachment_3776" aria-describedby="caption-attachment-3776" style="width: 1703px" class="wp-caption alignnone">[<img class="size-full wp-image-3776" src="http://stealthpuppy.com/wp-content/uploads/2014/11/citrix-profile-management-file-server-load.png" alt="Logon impact of profile sizes with Citrix Profile Management and file server under load" width="1703" height="1082" srcset="http://192.168.0.89/wp-content/uploads/2014/11/citrix-profile-management-file-server-load.png 1703w, http://192.168.0.89/wp-content/uploads/2014/11/citrix-profile-management-file-server-load-150x95.png 150w, http://192.168.0.89/wp-content/uploads/2014/11/citrix-profile-management-file-server-load-300x190.png 300w, http://192.168.0.89/wp-content/uploads/2014/11/citrix-profile-management-file-server-load-1024x650.png 1024w, http://192.168.0.89/wp-content/uploads/2014/11/citrix-profile-management-file-server-load-624x396.png 624w" sizes="(max-width: 1703px) 100vw, 1703px" />](http://stealthpuppy.com/wp-content/uploads/2014/11/citrix-profile-management-file-server-load.png)<figcaption id="caption-attachment-3776" class="wp-caption-text">Logon impact of profile sizes with Citrix Profile Management and file server under load</figcaption></figure>

What&#8217;s interesting here, is that where folder redirection reduced the differences between the logon times of the different profiles sizes, Citrix Profile Management does not. This can be explained by the need to transfer additional file data locally. Files are streamed to the client as they are accessed, so it&#8217;s likely that more data is transferred than when using folder redirection.

This approach is still a significant improvement over roaming user profiles. So, if you combine folder redirection and profile management, you should get the best of both worlds to improve the logon experience.

But&#8230; don&#8217;t let your file server run out of CPU resources.

# Conclusion

Based on these results, we can see the benefits of enabling folder redirection, especially if you&#8217;re using roaming user profiles. Combining folder redirection with 3rd party profile management solutions should further improve the logon experience.

For hosted desktop customers (Citrix XenApp, XenDesktop, VMware Horizon etc.) there are usually inbox solutions to profile management; however for physical desktops 3rd party licensing is often required (or UE-V is available as a part of MDOP).

Whatever the approach, these are only parts of the equation, as we&#8217;ve seen, file server performance is crucial to providing good user experience. More importantly, consistent file server performance is important.

Logon storms, transient environment issues and undersized file servers can have a direct impact on logon times.

<figure id="attachment_3778" aria-describedby="caption-attachment-3778" style="width: 347px" class="wp-caption alignnone"><img class="wp-image-3778 size-full" src="http://stealthpuppy.com/wp-content/uploads/2014/11/ComputerDumpster.gif" alt="ComputerDumpster" width="347" height="200" /><figcaption id="caption-attachment-3778" class="wp-caption-text">Long logon times makes users unhappy&#8230;</figcaption></figure>