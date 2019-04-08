---
id: 3737
title: 'Visualizing the Impact of Folder Redirection - Logon and Application Launch'
date: 2014-11-06T17:20:20+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=3737
permalink: /visualizing-impact-folder-redirection-logon/
dsq_thread_id:
  - "3196341225"
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
image: /wp-content/uploads/2014/11/demos-624x338.png
categories:
  - Microsoft
tags:
  - Folder Redirection
---
_This is the second in a series of articles on folder redirection by Aaron Parker, [Helge Klein](https://helgeklein.com/) and <a href="http://shawnbass.com/" target="_blank">Shawn Bass</a>._

  * Part one: [How Folder Redirection Impacts UX & Breaks Applications](https://helgeklein.com/blog/2014/10/folder-redirection-impacts-ux-breaks-applications)
  * Part two: this article
  * Part three: [Visualizing the Impact of Folder Redirection – Start Menu Search](https://helgeklein.com/blog/2014/11/visualizing-impact-folder-redirection-start-menu-search/)
  * Part four: [Measuring the Impact of Folder Redirection – User Logon](https://stealthpuppy.com/measure-impact-folder-redirection/)
  * Part five: [Measuring the Impact of Folder Redirection – Application Launch & SMB Version](https://helgeklein.com/blog/2014/12/measuring-impact-folder-redirection-application-launch-smb-version/)

# Vizualizing Impact on User Experience

In the previous article, [Helge covered the under the hood details of folder redirection](https://helgeklein.com/blog/2014/10/folder-redirection-impacts-ux-breaks-applications). Now let's look at some possible scenarios that show the impact on the user experience with folder redirection enabled. In this article we'll focus on the initial logon and application launch.

# Test Environments

We performed several tests across three different environments on three continents. Nothing if not diverse. While we don't have enterprise level hardware to test on in our own labs (well, maybe Shawn does), this has enabled us to ensure that we can replicate the results in different environments.

For the purposes of this initial round of tests, we've stuck with Windows 7 and Windows Server 2008 R2, which at the time of writing, are the most common versions of Windows in enterprise environments. This means that all testing was completed with SMB 2.1.

What we've attempted to show is the impact on user experience when based on common user profile sizes, profile configuration options (e.g. roaming profiles and 3rd party solutions) and redirecting different sets of folders.

Each test environment is simulating or utilising RDS or VDI solutions to demonstrate the scenarios. This means that the desktop is close to the file server that is hosting the user's profile, home drive or locations for folder redirection. In this initial round of testing, we haven't focussed on physical desktops or desktop separated from file servers by a WAN connection.

# Demos

I've embedded a number of videos below that demonstrate the user experience for logon an application launch under different profile and folder redirection configurations and transient conditions.

## Baseline

To demonstrate a baseline, this first video shows what a normal logon looks like. In this specific video, the user account is configured with a roaming profile (2,334 files, 33.7 MB total in size) but no folder redirection. Additionally the file server (hosting the user profile) is idle.



As you can see, logon is quick and once logon is complete the system is quite responsive. The general user experience is exactly what a user would expect from a well performing system.

## File Server Under 99% Load

Now, let's make no changes to the user account configuration (using the same profile), but put the file server under load by stressing the CPU. CPU load on the file server can be a common occurrence for various reasons - AV scans, run away processes, servicing a large number of SMB requests, or perhaps even CPU resources are limited due to contention on shared platforms (i.e. a hypervisor).



As you can see in the video above, the logon process is extended from seconds to over 3 minutes! With the file server under CPU load, it doesn't have the capacity to service requests to transfer the profile down to the client in a timely manner.

With a profile that has thousands of files in it, each file transfer requires an open file/transfer data/close file sequence, so a lot of file requests can take a long time to service. Imagine the knock on effects of a file server under load with multiple concurrent logons.

## Folder Redirection Enabled with File Server Under 99% Load

In the next test, we still have a roaming profile; however now we've enabled folder redirection for all of the most common folders, including AppData, Desktop, Favourites and Documents etc. This reduces the data that needs to be copied in at logon, so we should expect logon to be quick, but what happens after logon?



Even with the file server under load, the logon is fast as we aren't dragging data across the network; however you'll notice a few things post-logon:

  * It takes time for the shortcuts on the desktop to display the icon associated with the shortcut (even though each shortcut is to the same application).
  * The Libraries in Explorer take a long time to show child folders.
  * Launching Adobe Reader takes an long time as the application requests files from AppData which is now on a network location.
  * Internet Explorer 11 launch is reasonable, but longer than with previous tests.
  * Microsoft Word takes a long tome to launch as it too is requesting files from AppData as we can see from the splash screen.

In this scenario, we've traded slower performance over the session for improved logon speed. Where as logon is (usually) a one time action, application launch and operation delays will have a cumulative effect over the working session. Depending on the user's activity, this could add up to more time than was saved during logon.

## Citrix Profile Management with Folder Redirection Not Enabled

The next test actually reverses the scenario bit - we again have no folder redirection, but have augmented or replaced the roaming profile with a profile managed by Citrix Profile Management.

This approach uses streaming to bring the profile down to the desktop as data is requested. Data transfer is extended over the length of the session, rather than copied down before the logon process is complete.



This test demonstrates the streaming approach to profiles that Citrix Profile Management uses - files are copied down in the background as they are requested. The effect is that some actions are slower, so logon is slower than with folder redirection, but as the profile is fleshed out locally, application launches are then what you would expect from roaming profiles (or even a local profile). No additional requests to the network are required, so file access is from the local disk.

# Conclusion

Logon times receive top billing as time wasters for users, so we focus on getting logon times as low as possible.

<figure id="attachment_3747" aria-describedby="caption-attachment-3747" style="width: 500px" class="wp-caption alignnone">[<img class="wp-image-3747 size-full" src="https://stealthpuppy.com/wp-content/uploads/2014/11/wrap.gif" alt="wrap" width="500" height="230" />](https://stealthpuppy.com/wp-content/uploads/2014/11/wrap.gif)<figcaption id="caption-attachment-3747" class="wp-caption-text">Don't keep users waiting...*</figure>

There's nothing wrong with reducing logon times, it's a noble pursuit, but the simplest and easiest method of doing so is to implement folder redirection. It gets data out of the profile, is built into Windows and is therefore a quick win. Everyone does it, so it must be good, right?

We've shown that it's very easy to impact logon and application launch times with and without folder redirection, just by placing the file server under load. When a Windows desktop is integrated into an enterprise environment with roaming profiles, folder redirection, home drives and perhaps even Exchange mailboxes, performance of the desktop is dictated not just by the PC alone, but also the available resources of other components in a distributed network.

File server resource configuration must align with desktop requirements, but profiles and home directories grow organically, so sizing can be challenging. Monitoring and proactive management of file servers is essential.

# Part Three

In the next article, Helge will cover the Windows Search and Start menu experience.