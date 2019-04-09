---
id: 6271
title: Concurrent Sessions with FSLogix Profile Container
date: 2019-02-27T23:07:10+10:00
author: Aaron Parker
layout: revision
guid: https://stealthpuppy.com/6258-revision-v1/
permalink: /6258-revision-v1/
---
I was recently assisting a customer with an FSLogix Profile Container and Office 365 Container evaluation and the subject of concurrent sessions came up. In this article, I'll go into a bit of detail on how FSLogix Profile Containers handle concurrent sessions and follow up with an article on Office 365 Container.

## Concurrent Sessions

Let's first take a look at what we mean by concurrent sessions. In a virtual desktop environment, whether that be Windows 10 virtual desktops or a multi-session environment built on Windows Server, a concurrent session could be:

  1. A user has multiple sessions on the same machine - by default, users are restrict to a single session on a server, but this should only been seen under an RDSH session where session sharing hasn't kicked in when the user launches two published apps, or may have connected to two session desktops from the same VM. This behaviour is controlled with the policy 'Restrict Remote Desktop Services users to a single Remote Desktop Services session'.
  2. A user is logged onto two virtual machines concurrently - this should be the most common scenario, whereby a user may log onto a virtual or session desktop and then launch a published application from a seperate catalog or silo, or launch multiple published apps concurrently from different machines.

### User Experience Impacts

When a user encounters this scenario, they're not going to know (or care) where their applications are delivered from. They will however, expect a consistent experience across applications and sessions. For the administrator, there's several considerations if the application writes preferences into the user profile that need to persist:

  1. If the application doesn't require persistence of any kind (perhaps it doesn't write anything to the profile), use a temporary or mandatory profile (or similar) and discard the profile at logoff
  2. If the application doesn't require persistence, but it has a dependent application that does, the user session will need the profile settings for that application. At logoff it might be OK to discard that copy of the profile, or we may need to merge it back into the primary copy
  3. If the application does require persistence, the user session often needs to start with their existing profile and have the profile updated or merged at logoff

All of these require the administrator to have insight into how applications in their environment behave and interact with the user profile. At least someone in the chain of command should be making decisions about the desired user experience and any trade offs between engineering a solution and the effort to do so. For most organisations, user experience wins.

## FSLogix Profile Container

Profile Container supports concurrent sessions in two ways:

  * Concurrent sessions in the same instance of Windows  
    
  * Concurrent sessions across different instances or VMs



Restrict Remote Desktop Services users to a single Remote Desktop Services session

Profile Container uses the VHD / VHDX format and therefore supports differencing disks. Leveraging this feature, Profile Container supports [Concurrent User Profile Access](https://docs.fslogix.com/display/20170529/Concurrent+User+Profile+Access) in 3 modes:

  1. No support for concurrent sessions - this is the default. Technically not a concurrency mode, but it's worth understanding the default behaviour. This will be the safest configuration that also requires the least amount of storage capacity, because we have only 1 copy of the profile to manage.
  2. Read / Write - the agent will attempt to open read / write access to the Profile Container. This configuration redirected writes into a differencing disk on the network (in the same location as the Profile Container and merges the container disks at logoff. 
  3. Read Only - the agent will open a local differencing disk where writes are directed to during the user session. This disk is then discarded at logoff, leaving the original profile intact.
  4. Attempt RW with fall back to RO - if the agent can't get read / write access to the profile it will redirect writes into a local disk that is discarded at logoff

Let's delve into what this looks like. Note that in my simple lab environment, I'm currently testing on Windows Server 2019.

### No Concurrent Access

This is simple, I've deployed Profile Container with configuration via Group Policy and have ensured that concurrent user sessions are disabled and the Profile Type is set to 'Normal direct-access profile' (i.e. the value is 0).

<img src="https://stealthpuppy.com/media/2019/02/ProfileContainer-ConcurrentAccessDisabled-1024x477.png" alt="GPO with Concurrent Sessions in Profile Container disabled" class="wp-image-6262" srcset="https://stealthpuppy.com/media/2019/02/ProfileContainer-ConcurrentAccessDisabled-1024x477.png 1024w, https://stealthpuppy.com/media/2019/02/ProfileContainer-ConcurrentAccessDisabled-150x70.png 150w, https://stealthpuppy.com/media/2019/02/ProfileContainer-ConcurrentAccessDisabled-300x140.png 300w, https://stealthpuppy.com/media/2019/02/ProfileContainer-ConcurrentAccessDisabled-768x358.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" /> *Concurrent Sessions in Profile Container are disabled by default*

When logging onto the first session, my Profile Container is created if it doesn't exist and mounted onto the target machine and my thus profile is available.

<img src="https://stealthpuppy.com/media/2019/02/ProfileContainer-NoConcurrent-1.png" alt="Folder showing the Profile and Office 365 user containers with a default configuration" class="wp-image-6264" srcset="https://stealthpuppy.com/media/2019/02/ProfileContainer-NoConcurrent-1.png 848w, https://stealthpuppy.com/media/2019/02/ProfileContainer-NoConcurrent-1-150x69.png 150w, https://stealthpuppy.com/media/2019/02/ProfileContainer-NoConcurrent-1-300x137.png 300w, https://stealthpuppy.com/media/2019/02/ProfileContainer-NoConcurrent-1-768x351.png 768w" sizes="(max-width: 848px) 100vw, 848px" /> *Profile Container in the default configuration*

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

A read / write profile is no different in user experience than the default configuration. A read / write profile is configured by setting Profile Type to 'Read-write profile' (i.e. value is 1). Behind the scenes, a RW.VHDX file along-side the Profile Container is created as can be seen below. This is essentially [a differencing disk](https://www.altaro.com/hyper-v/hyper-v-differencing-disks-explained/) where writes are redirected during the session.

<img src="https://stealthpuppy.com/media/2019/02/ProfileContainer-ConcurrentRW.png" alt="Folder with user Profile Container and the read / write RW.VHDX" class="wp-image-6270" srcset="https://stealthpuppy.com/media/2019/02/ProfileContainer-ConcurrentRW.png 848w, https://stealthpuppy.com/media/2019/02/ProfileContainer-ConcurrentRW-150x69.png 150w, https://stealthpuppy.com/media/2019/02/ProfileContainer-ConcurrentRW-300x137.png 300w, https://stealthpuppy.com/media/2019/02/ProfileContainer-ConcurrentRW-768x351.png 768w" sizes="(max-width: 848px) 100vw, 848px" /> *Folder with user Profile Container and the read / write RW.VHDX*

At logon, if a RW.VHDX exists, the FSLogix agent will merge the disk into the parent Profile Container and create a new RW.VHDX and repeat the same process at logoff.

dd

<a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@joshstyle?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from JOSHUA COLEMAN"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32">

<title>
  unsplash-logo
</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span>

<span style="display:inline-block;padding:2px 3px">JOSHUA COLEMAN</span></a>