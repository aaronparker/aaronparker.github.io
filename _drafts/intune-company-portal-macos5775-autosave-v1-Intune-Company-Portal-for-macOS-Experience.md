---
id: 5788
title: Intune Company Portal for macOS Experience
date: 2017-09-04T10:29:09+10:00
author: Aaron Parker
layout: revision
guid: https://stealthpuppy.com/5775-autosave-v1/
permalink: /5775-autosave-v1/
---
Microsoft released a beta version of the Intune Company Portal for macOS just last month; however, it&#8217;s since been pulled from the Download Center. This app had been made available along with [the announcement of Conditional Access supporting macOS](https://blogs.technet.microsoft.com/enterprisemobility/2017/08/23/azure-ad-and-intune-now-support-macos-in-conditional-access/) in preview.

&nbsp;

Installing the Company Portal is required to [enable Conditional Access support on macOS](https://docs.microsoft.com/en-au/intune/compliance-policy-create-mac-os), so I imagine a new version will be made available soon. If you&#8217;re testing with Macs or looking for full support with Intune, this is an important part of the puzzle.

# Intune Web Enrollment

Previous to the Company Portal on macOS, enrollment in Intune is a largely manual process that requires logging into the Intune web portal with a browser, downloading a management profile and installing that manually. Not the best user experience.

Here&#8217;s what that looks like:

<div id='gallery-13' class='gallery galleryid-5788 gallery-columns-3 gallery-size-medium'>
  <figure class='gallery-item'> 
  
  <div class='gallery-icon landscape'>
    <a href='http://192.168.0.89/wp-content/uploads/2017/09/Intune-WebEnroll.png'><img width="300" height="195" src="http://192.168.0.89/wp-content/uploads/2017/09/Intune-WebEnroll-300x195.png" class="attachment-medium size-medium" alt="Intune web enrollment for macOS" aria-describedby="gallery-13-5780" srcset="http://192.168.0.89/wp-content/uploads/2017/09/Intune-WebEnroll-300x195.png 300w, http://192.168.0.89/wp-content/uploads/2017/09/Intune-WebEnroll-150x98.png 150w, http://192.168.0.89/wp-content/uploads/2017/09/Intune-WebEnroll-768x499.png 768w, http://192.168.0.89/wp-content/uploads/2017/09/Intune-WebEnroll-1024x666.png 1024w" sizes="(max-width: 300px) 100vw, 300px" /></a>
  </div><figcaption class='wp-caption-text gallery-caption' id='gallery-13-5780'> Intune web enrollment for macOS </figcaption></figure><figure class='gallery-item'> 
  
  <div class='gallery-icon landscape'>
    <a href='http://192.168.0.89/wp-content/uploads/2017/09/Intune-WebEnroll2.png'><img width="300" height="195" src="http://192.168.0.89/wp-content/uploads/2017/09/Intune-WebEnroll2-300x195.png" class="attachment-medium size-medium" alt="Downloading the Intune management profile" aria-describedby="gallery-13-5782" srcset="http://192.168.0.89/wp-content/uploads/2017/09/Intune-WebEnroll2-300x195.png 300w, http://192.168.0.89/wp-content/uploads/2017/09/Intune-WebEnroll2-150x98.png 150w, http://192.168.0.89/wp-content/uploads/2017/09/Intune-WebEnroll2-768x499.png 768w, http://192.168.0.89/wp-content/uploads/2017/09/Intune-WebEnroll2-1024x666.png 1024w" sizes="(max-width: 300px) 100vw, 300px" /></a>
  </div><figcaption class='wp-caption-text gallery-caption' id='gallery-13-5782'> Downloading the Intune management profile </figcaption></figure><figure class='gallery-item'> 
  
  <div class='gallery-icon landscape'>
    <a href='http://192.168.0.89/wp-content/uploads/2017/09/Intune-WebEnroll-Profile.png'><img width="300" height="212" src="http://192.168.0.89/wp-content/uploads/2017/09/Intune-WebEnroll-Profile-300x212.png" class="attachment-medium size-medium" alt="Installing the MDM management profile" aria-describedby="gallery-13-5781" srcset="http://192.168.0.89/wp-content/uploads/2017/09/Intune-WebEnroll-Profile-300x212.png 300w, http://192.168.0.89/wp-content/uploads/2017/09/Intune-WebEnroll-Profile-150x106.png 150w, http://192.168.0.89/wp-content/uploads/2017/09/Intune-WebEnroll-Profile-768x542.png 768w, http://192.168.0.89/wp-content/uploads/2017/09/Intune-WebEnroll-Profile-1024x722.png 1024w, http://192.168.0.89/wp-content/uploads/2017/09/Intune-WebEnroll-Profile-480x340.png 480w, http://192.168.0.89/wp-content/uploads/2017/09/Intune-WebEnroll-Profile.png 1560w" sizes="(max-width: 300px) 100vw, 300px" /></a>
  </div><figcaption class='wp-caption-text gallery-caption' id='gallery-13-5781'> Installing the MDM management profile </figcaption></figure>
</div>

# Intune Company Portal for macOS Experience

With the Company Portal, the user experience is streamlined, with the management profile installed automatically and you can see device compliance status from within the app. Here&#8217;s a quick look at the end-user experience with the&nbsp;Intune Company Portal for macOS on macOS Sierra.

<div id='gallery-14' class='gallery galleryid-5788 gallery-columns-3 gallery-size-medium'>
  <figure class='gallery-item'> 
  
  <div class='gallery-icon landscape'>
    <a href='http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal1.png'><img width="300" height="220" src="http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal1-300x220.png" class="attachment-medium size-medium" alt="Intune Company Portal for macOS sign in" aria-describedby="gallery-14-5763" srcset="http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal1-300x220.png 300w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal1-150x110.png 150w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal1-768x564.png 768w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal1-1024x752.png 1024w" sizes="(max-width: 300px) 100vw, 300px" /></a>
  </div><figcaption class='wp-caption-text gallery-caption' id='gallery-14-5763'> Launching the portal on macOS </figcaption></figure><figure class='gallery-item'> 
  
  <div class='gallery-icon landscape'>
    <a href='http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal2.png'><img width="300" height="220" src="http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal2-300x220.png" class="attachment-medium size-medium" alt="Intune Company Portal for macOS sign in" aria-describedby="gallery-14-5764" srcset="http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal2-300x220.png 300w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal2-150x110.png 150w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal2-768x564.png 768w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal2-1024x752.png 1024w" sizes="(max-width: 300px) 100vw, 300px" /></a>
  </div><figcaption class='wp-caption-text gallery-caption' id='gallery-14-5764'> Signing in with a user account with modern authentication </figcaption></figure><figure class='gallery-item'> 
  
  <div class='gallery-icon landscape'>
    <a href='http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal3.png'><img width="300" height="220" src="http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal3-300x220.png" class="attachment-medium size-medium" alt="Intune Company Portal for macOS sign in" aria-describedby="gallery-14-5765" srcset="http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal3-300x220.png 300w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal3-150x110.png 150w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal3-768x564.png 768w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal3-1024x752.png 1024w" sizes="(max-width: 300px) 100vw, 300px" /></a>
  </div><figcaption class='wp-caption-text gallery-caption' id='gallery-14-5765'> Entering your credentials </figcaption></figure><figure class='gallery-item'> 
  
  <div class='gallery-icon landscape'>
    <a href='http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal4.png'><img width="300" height="220" src="http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal4-300x220.png" class="attachment-medium size-medium" alt="Intune Company Portal for macOS establishing connection" aria-describedby="gallery-14-5766" srcset="http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal4-300x220.png 300w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal4-150x110.png 150w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal4-768x564.png 768w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal4-1024x752.png 1024w" sizes="(max-width: 300px) 100vw, 300px" /></a>
  </div><figcaption class='wp-caption-text gallery-caption' id='gallery-14-5766'> Establishing connection a to Intune </figcaption></figure><figure class='gallery-item'> 
  
  <div class='gallery-icon landscape'>
    <a href='http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal5.png'><img width="300" height="224" src="http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal5-300x224.png" class="attachment-medium size-medium" alt="Intune Company Portal for macOS device enrollment" aria-describedby="gallery-14-5767" srcset="http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal5-300x224.png 300w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal5-150x112.png 150w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal5-768x575.png 768w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal5-1024x766.png 1024w" sizes="(max-width: 300px) 100vw, 300px" /></a>
  </div><figcaption class='wp-caption-text gallery-caption' id='gallery-14-5767'> Walking the user through device enrollment </figcaption></figure><figure class='gallery-item'> 
  
  <div class='gallery-icon landscape'>
    <a href='http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal6.png'><img width="300" height="224" src="http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal6-300x224.png" class="attachment-medium size-medium" alt="Intune Company Portal for macOS Why enroll" aria-describedby="gallery-14-5768" srcset="http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal6-300x224.png 300w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal6-150x112.png 150w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal6-768x575.png 768w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal6-1024x766.png 1024w" sizes="(max-width: 300px) 100vw, 300px" /></a>
  </div><figcaption class='wp-caption-text gallery-caption' id='gallery-14-5768'> Why enroll your device? </figcaption></figure><figure class='gallery-item'> 
  
  <div class='gallery-icon landscape'>
    <a href='http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal7.png'><img width="300" height="224" src="http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal7-300x224.png" class="attachment-medium size-medium" alt="Intune Company Portal for macOS privacy" aria-describedby="gallery-14-5769" srcset="http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal7-300x224.png 300w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal7-150x112.png 150w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal7-768x575.png 768w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal7-1024x766.png 1024w" sizes="(max-width: 300px) 100vw, 300px" /></a>
  </div><figcaption class='wp-caption-text gallery-caption' id='gallery-14-5769'> MacOS privacy details </figcaption></figure><figure class='gallery-item'> 
  
  <div class='gallery-icon landscape'>
    <a href='http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal8.png'><img width="300" height="224" src="http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal8-300x224.png" class="attachment-medium size-medium" alt="Intune Company Portal for macOS enrolling" aria-describedby="gallery-14-5770" srcset="http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal8-300x224.png 300w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal8-150x112.png 150w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal8-768x575.png 768w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal8-1024x766.png 1024w" sizes="(max-width: 300px) 100vw, 300px" /></a>
  </div><figcaption class='wp-caption-text gallery-caption' id='gallery-14-5770'> Providing the user with details on enrollment </figcaption></figure><figure class='gallery-item'> 
  
  <div class='gallery-icon landscape'>
    <a href='http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal9.png'><img width="300" height="224" src="http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal9-300x224.png" class="attachment-medium size-medium" alt="Intune Company Portal for macOS installing management profile" aria-describedby="gallery-14-5771" srcset="http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal9-300x224.png 300w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal9-150x112.png 150w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal9-768x575.png 768w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal9-1024x766.png 1024w" sizes="(max-width: 300px) 100vw, 300px" /></a>
  </div><figcaption class='wp-caption-text gallery-caption' id='gallery-14-5771'> Installing the management profile </figcaption></figure><figure class='gallery-item'> 
  
  <div class='gallery-icon landscape'>
    <a href='http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal10.png'><img width="300" height="224" src="http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal10-300x224.png" class="attachment-medium size-medium" alt="Intune Company Portal for macOS installing enrollment successful" aria-describedby="gallery-14-5772" srcset="http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal10-300x224.png 300w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal10-150x112.png 150w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal10-768x575.png 768w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal10-1024x766.png 1024w" sizes="(max-width: 300px) 100vw, 300px" /></a>
  </div><figcaption class='wp-caption-text gallery-caption' id='gallery-14-5772'> Enrollment is successful along with device compliance </figcaption></figure><figure class='gallery-item'> 
  
  <div class='gallery-icon landscape'>
    <a href='http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal11.png'><img width="300" height="224" src="http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal11-300x224.png" class="attachment-medium size-medium" alt="Intune Company Portal for macOS installing enrollment complete" aria-describedby="gallery-14-5773" srcset="http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal11-300x224.png 300w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal11-150x112.png 150w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal11-768x575.png 768w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal11-1024x766.png 1024w" sizes="(max-width: 300px) 100vw, 300px" /></a>
  </div><figcaption class='wp-caption-text gallery-caption' id='gallery-14-5773'> Intune enrollment complete </figcaption></figure><figure class='gallery-item'> 
  
  <div class='gallery-icon landscape'>
    <a href='http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal12a.png'><img width="300" height="249" src="http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal12a-300x249.png" class="attachment-medium size-medium" alt="Intune Company Portal for macOS installing device details" aria-describedby="gallery-14-5786" srcset="http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal12a-300x249.png 300w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal12a-150x125.png 150w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal12a-768x637.png 768w, http://192.168.0.89/wp-content/uploads/2017/09/MacCompanyPortal12a-1024x850.png 1024w" sizes="(max-width: 300px) 100vw, 300px" /></a>
  </div><figcaption class='wp-caption-text gallery-caption' id='gallery-14-5786'> Intune Company Portal for macOS installing device details </figcaption></figure>
</div>

Hopefully we&#8217;ll see the portal app available for download again soon and available for wider testing. I&#8217;m also hoping that the availability of the Portal app means we&#8217;ll see the ability for Intune to install apps on macOS. As we see more Mac devices (either corporate or personally owned), the ability to deploy and manage apps on this platform becomes critical.&nbsp;