---
id: 6258
title: Concurrent Sessions with FSLogix Profile Container
date: 2019-02-27T23:07:15+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=6258
permalink: /?p=6258
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
image: /wp-content/uploads/2019/02/joshua-coleman-655076-unsplash.jpg
categories:
  - Microsoft
tags:
  - FSLogix
  - Office 365 Container
  - Profile Container
---
I was recently assisting a customer with an FSLogix Profile Container and Office 365 Container evaluation and the subject of concurrent sessions came up. In this article, I&#8217;ll go into a bit of detail on how FSLogix Profile Containers handle concurrent sessions and follow up with an article on Office 365 Container.

## Concurrent Sessions

Let&#8217;s first take a look at what we mean by concurrent sessions. In a virtual desktop environment, whether that be Windows 10 virtual desktops or a multi-session environment built on Windows Server, a concurrent session could be:

  1. A user has multiple sessions on the same machine &#8211; by default, users are restrict to a single session on a server, but this should only been seen under an RDSH session where session sharing hasn&#8217;t kicked in when the user launches two published apps, or may have connected to two session desktops from the same VM. This behaviour is controlled with the policy &#8216;Restrict Remote Desktop Services users to a single Remote Desktop Services session&#8217;.
  2. A user is logged onto two virtual machines concurrently &#8211; this should be the most common scenario, whereby a user may log onto a virtual or session desktop and then launch a published application from a seperate catalog or silo, or launch multiple published apps concurrently from different machines.

### User Experience Impacts

When a user encounters this scenario, they&#8217;re not going to know (or care) where their applications are delivered from. They will however, expect a consistent experience across applications and sessions. For the administrator, there&#8217;s several considerations if the application writes preferences into the user profile that need to persist:

  1. If the application doesn&#8217;t require persistence of any kind (perhaps it doesn&#8217;t write anything to the profile), use a temporary or mandatory profile (or similar) and discard the profile at logoff
  2. If the application doesn&#8217;t require persistence, but it has a dependent application that does, the user session will need the profile settings for that application. At logoff it might be OK to discard that copy of the profile, or we may need to merge it back into the primary copy
  3. If the application does require persistence, the user session often needs to start with their existing profile and have the profile updated or merged at logoff

All of these require the administrator to have insight into how applications in their environment behave and interact with the user profile. At least someone in the chain of command should be making decisions about the desired user experience and any trade offs between engineering a solution and the effort to do so. For most organisations, user experience wins.

## FSLogix Profile Container

Profile Container supports concurrent sessions in two ways:

  * Concurrent sessions in the same instance of Windows  
    
  * Concurrent sessions across different instances or VMs



Restrict Remote Desktop Services users to a single Remote Desktop Services session

Profile Container uses the VHD / VHDX format and therefore supports differencing disks. Leveraging this feature, Profile Container supports [Concurrent User Profile Access](https://docs.fslogix.com/display/20170529/Concurrent+User+Profile+Access) in 3 modes:

  1. No support for concurrent sessions &#8211; this is the default. Technically not a concurrency mode, but it&#8217;s worth understanding the default behaviour. This will be the safest configuration that also requires the least amount of storage capacity, because we have only 1 copy of the profile to manage.
  2. Read / Write &#8211; the agent will attempt to open read / write access to the Profile Container. This configuration redirected writes into a differencing disk on the network (in the same location as the Profile Container and merges the container disks at logoff. 
  3. Read Only &#8211; the agent will open a local differencing disk where writes are directed to during the user session. This disk is then discarded at logoff, leaving the original profile intact.
  4. Attempt RW with fall back to RO &#8211; if the agent can&#8217;t get read / write access to the profile it will redirect writes into a local disk that is discarded at logoff

Let&#8217;s delve into what this looks like. Note that in my simple lab environment, I&#8217;m currently testing on Windows Server 2019.

### No Concurrent Access

This is simple, I&#8217;ve deployed Profile Container with configuration via Group Policy and have ensured that concurrent user sessions are disabled and the Profile Type is set to &#8216;Normal direct-access profile&#8217; (i.e. the value is 0).<figure class="wp-block-image">

<img src="https://stealthpuppy.com/wp-content/uploads/2019/02/ProfileContainer-ConcurrentAccessDisabled-1024x477.png" alt="GPO with Concurrent Sessions in Profile Container disabled" class="wp-image-6262" srcset="http://192.168.0.89/wp-content/uploads/2019/02/ProfileContainer-ConcurrentAccessDisabled-1024x477.png 1024w, http://192.168.0.89/wp-content/uploads/2019/02/ProfileContainer-ConcurrentAccessDisabled-150x70.png 150w, http://192.168.0.89/wp-content/uploads/2019/02/ProfileContainer-ConcurrentAccessDisabled-300x140.png 300w, http://192.168.0.89/wp-content/uploads/2019/02/ProfileContainer-ConcurrentAccessDisabled-768x358.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" /> <figcaption>Concurrent Sessions in Profile Container are disabled by default</figcaption></figure> 

When logging onto the first session, my Profile Container is created if it doesn&#8217;t exist and mounted onto the target machine and my thus profile is available.<figure class="wp-block-image">

<img src="https://stealthpuppy.com/wp-content/uploads/2019/02/ProfileContainer-NoConcurrent-1.png" alt="Folder showing the Profile and Office 365 user containers with a default configuration" class="wp-image-6264" srcset="http://192.168.0.89/wp-content/uploads/2019/02/ProfileContainer-NoConcurrent-1.png 848w, http://192.168.0.89/wp-content/uploads/2019/02/ProfileContainer-NoConcurrent-1-150x69.png 150w, http://192.168.0.89/wp-content/uploads/2019/02/ProfileContainer-NoConcurrent-1-300x137.png 300w, http://192.168.0.89/wp-content/uploads/2019/02/ProfileContainer-NoConcurrent-1-768x351.png 768w" sizes="(max-width: 848px) 100vw, 848px" /> <figcaption>Profile Container in the default configuration</figcaption></figure> 

Logging onto a second session could be:

  * Logging into a concurrent session on a different VM
  * Logging into a concurrent session on the same VM

When logging onto a second session on a different VM, the sign in screen waits for some time and eventually logs me on with a local profile. The FSLogix Profile log shows that the agent finds that the container is locked and then retries 12 times with 5 seconds between each attempt. 

<pre class="wp-block-preformatted">[22:45:28.323][tid:000008d0.00001108][ERROR:00000020]   Open vhd(x) failed, file is locked.  Retrying 12 time(s) at 5 second intervals (The process cannot access the file because it is being used by another process.)<br />
[22:45:33.342][tid:000008d0.00001108][INFO]             Retrying open vhd(x) 1/12<br />
[22:45:38.396][tid:000008d0.00001108][INFO]             Retrying open vhd(x) 2/12<br />
[22:45:43.449][tid:000008d0.00001108][INFO]             Retrying open vhd(x) 3/12<br />
[22:45:48.497][tid:000008d0.00001108][INFO]             Retrying open vhd(x) 4/12<br />
[22:45:53.540][tid:000008d0.00001108][INFO]             Retrying open vhd(x) 5/12<br />
[22:45:58.574][tid:000008d0.00001108][INFO]             Retrying open vhd(x) 6/12<br />
[22:46:03.623][tid:000008d0.00001108][INFO]             Retrying open vhd(x) 7/12<br />
[22:46:08.656][tid:000008d0.00001108][INFO]             Retrying open vhd(x) 8/12<br />
[22:46:13.697][tid:000008d0.00001108][INFO]             Retrying open vhd(x) 9/12<br />
[22:46:18.747][tid:000008d0.00001108][INFO]             Retrying open vhd(x) 10/12<br />
[22:46:23.800][tid:000008d0.00001108][INFO]             Retrying open vhd(x) 11/12<br />
[22:46:28.855][tid:000008d0.00001108][INFO]             Retrying open vhd(x) 12/12<br />
[22:46:28.886][tid:000008d0.00001108][INFO]             Status set to 11: Cannot open virtual disk<br />
[22:46:28.886][tid:000008d0.00001108][INFO]             Error set to 32<br />
[22:46:28.886][tid:000008d0.00001108][ERROR:00000020]   OpenVirtualDisk error (The process cannot access the file because it is being used by another process.)<br />
[22:46:28.886][tid:000008d0.00001108][INFO]             Error. Cleaning up.<br />
[22:46:28.886][tid:000008d0.00001108][INFO]             Configuration setting not found: SOFTWARE\FSLogix\Profiles\PreventLoginWithFailure.  Using default: 0<br />
[22:46:28.886][tid:000008d0.00001108][ERROR:0000001f]   LoadProfile failed.  User: aaron. SID: S-1-5-21-2625184940-1311984064-3469394446-1110. (A device attached to the system is not functioning.)<br />
[22:46:28.886][tid:000008d0.00001108][INFO]             loadProfile time: 60687 milliseconds</pre>

While opening the Profile Container fails, the session continues to sign in with a local profile. If the concurrent session is on the same VM, my session logs into the same profile 

This behaviour can be prevented with the [PreventLoginWithFailure](https://docs.fslogix.com/display/20170529/FSLogix+Profiles+Configuration+Settings) setting.

### Read / Write Access

A read / write profile is no different in user experience than the default configuration. A read / write profile is configured by setting Profile Type to &#8216;Read-write profile&#8217; (i.e. value is 1). Behind the scenes, a RW.VHDX file along-side the Profile Container is created as can be seen below. This is essentially [a differencing disk](https://www.altaro.com/hyper-v/hyper-v-differencing-disks-explained/) where writes are redirected during the session.<figure class="wp-block-image">

<img src="https://stealthpuppy.com/wp-content/uploads/2019/02/ProfileContainer-ConcurrentRW.png" alt="Folder with user Profile Container and the read / write RW.VHDX" class="wp-image-6270" srcset="http://192.168.0.89/wp-content/uploads/2019/02/ProfileContainer-ConcurrentRW.png 848w, http://192.168.0.89/wp-content/uploads/2019/02/ProfileContainer-ConcurrentRW-150x69.png 150w, http://192.168.0.89/wp-content/uploads/2019/02/ProfileContainer-ConcurrentRW-300x137.png 300w, http://192.168.0.89/wp-content/uploads/2019/02/ProfileContainer-ConcurrentRW-768x351.png 768w" sizes="(max-width: 848px) 100vw, 848px" /> <figcaption>Folder with user Profile Container and the read / write RW.VHDX</figcaption></figure> 

At logon, if a RW.VHDX exists, the FSLogix agent will merge the disk into the parent Profile Container and create a new RW.VHDX and repeat the same process at logoff.

dd

<a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@joshstyle?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from JOSHUA COLEMAN"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32">

<title>
  unsplash-logo
</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span>

<span style="display:inline-block;padding:2px 3px">JOSHUA COLEMAN</span></a>