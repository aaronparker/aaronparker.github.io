---
id: 6053
title: Adobe Reader DC deployment with Microsoft Intune Part 2
date: 2018-07-22T21:36:58+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=6053
permalink: /deploy-adobe-reader-dc-intune-part2/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
image: /wp-content/uploads/2018/07/russ-mccabe-5461-unsplash.jpg
categories:
  - Applications
tags:
  - Adobe
  - Adobe Reader
  - Adobe Reader DC
  - Intune
---
In [the previous article](https://stealthpuppy.com/deploy-adobe-reader-dc-microsoft-intune-part1/) we saw how to customise the Adobe Reader DC installation and deploy it via Microsoft Intune. Now that it&#8217;s installed on Windows 10 end-points let&#8217;s look at how updates work.

First though, it&#8217;s important to point out that the version of Adobe Reader DC deployed from the single file Windows Installer is **2015.07.20033**, while the version that is [current as of July 2018 is **2018.011.20055**](https://www.adobe.com/devnet-docs/acrobatetk/tools/ReleaseNotesDC/index.html). The deployed version then is _extremely_ out of date, and given that Intune cannot deploy Windows Installer Patch (MSP) files directly, the end-point needs to rely on the Adobe Acrobat update service to download and install updates.

# Updating Adobe Reader DC

Adobe Reader (and Acrobat) installs the **Adobe Acrobat Update Service**. On typical enterprise PCs or virtual desktop environments this service may not be desirable, because updates are managed by Configuration Manager or monthly image updates. On a Windows 10 desktop deployed modern management style, it can be up to the device to ensure the OS and applications are kept up to date; thus, this service should remain enabled on those end-points.

The updater is actually two components - the Update service and a scheduled task that runs 'C:\Program Files (x86)\Common Files\Adobe\ARM\1.0\AdobeARM.exe&#8217; to check for, download and install updates.

The task has two triggers - one after user logon, but with a delay of 12 minutes, and the other at a scheduled time that is possibly different per device. Here&#8217;s the scheduled task:

<figure id="attachment_6046" aria-describedby="caption-attachment-6046" style="width: 1338px" class="wp-caption aligncenter">[<img class="wp-image-6046 size-full" src="https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-UpdateTask.png" alt="Adobe Acrobat Update Task" width="1338" height="711" srcset="https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-UpdateTask.png 1338w, https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-UpdateTask-150x80.png 150w, https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-UpdateTask-300x159.png 300w, https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-UpdateTask-768x408.png 768w, https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-UpdateTask-1024x544.png 1024w" sizes="(max-width: 1338px) 100vw, 1338px" />](https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-UpdateTask.png)<figcaption id="caption-attachment-6046" class="wp-caption-text">Adobe Acrobat Update Task</figcaption></figure>

In theory, the service should download and apply an Adobe Reader update within 24-hours after installation. In practice, your mileage will most certainly vary. In my testing (which wasn&#8217;t exhaustive), it would take more than that to download an update and I resorted to using the 'Check for Updates&#8217; option from within Adobe Reader manually. 

## Update Process

Downloading and installing updates does not unfortunately go straight to the latest version. In my testing, my target PCs downloaded an intermediate update to **2015.023.20070** before the second update to **2018.011.20055**. This means that in the real world, it could be several days before a PC has the most recent version installed.

<figure id="attachment_6058" aria-describedby="caption-attachment-6058" style="width: 497px" class="wp-caption aligncenter">[<img class="size-full wp-image-6058" src="https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-1500720033.png" alt="Adobe Reader DC - An update is available" width="497" height="360" srcset="https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-1500720033.png 497w, https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-1500720033-150x109.png 150w, https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-1500720033-300x217.png 300w" sizes="(max-width: 497px) 100vw, 497px" />](https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-1500720033.png)<figcaption id="caption-attachment-6058" class="wp-caption-text">Adobe Reader DC - An update is available</figcaption></figure>

Fortunately, the updates are downloaded and installed without user intervention, meaning that the update process works for users [without administrative rights to their PC](https://docs.microsoft.com/en-us/windows/deployment/windows-autopilot/user-driven).

# To Deploy or Not Deploy

So understanding that to deploy Adobe Reader DC via Microsoft Intune requires deploying a version that is more than 3 years old and relying on the end-point to download and install updates, the question that should be asked - should you deploy Adobe Reader to Windows 10 machines via Microsoft Intune?

Here&#8217;s what you should consider:

  * Many organisations prefer Adobe Reader over 3rd party PDF readers for first party features and support.
  * Of the top 50 Windows desktop applications in 2018, Adobe Reader had the most vulnerabilities (source: [Flexera](https://info.flexerasoftware.com/SVM-WP-Vulnerability-Review-2018-Desktop-Apps)), beaten only by Windows itself. If the option is to install an old version of Adobe Reader and rely on the automatic updater on the end-point to install the latest version, the time to update may be unacceptable for some organisations
  * [PowerShell can be used to deploy Adobe Reader](https://allthingscloud.blog/install-adobe-reader-dc-with-intune-and-powershell/) to Windows 10 PCs via Intune; however, this does not allow for user self-service installs and will require building in logic to account for failures in network connectivity during the download or retrying the installation if it were to fail
  * Windows 10 includes a capable PDF Reader in Microsoft Edge and other browsers also implement native PDF viewing features
  * Other PDF readers are available from the Microsoft Store, so it is possible to deploy and keep a PDF reader up to date simpler than the process I&#8217;ve outlined in these articles; however, many of these are less than ideal - the UI is often not great and many have up sell features built into them

# Summary

In [these articles](https://stealthpuppy.com/deploy-adobe-reader-dc-microsoft-intune-part1/), I&#8217;ve demonstrated how to package and deploy Adobe Reader DC as a native application via Microsoft Intune, while relying on the automatic updater installed by the application for an end-point to keep Reader up to date. This approach allows you to deploy Adobe Reader in the same way as other [line-of-business applications](https://docs.microsoft.com/en-us/intune/lob-apps-windows) for required or optional user-driven installs and then reporting in the Intune console.

Because Adobe haven&#8217;t released a newer version of the single file Windows Installer for Adobe Reader, you should consider carefully whether this approach is right for your organisation. Deployment of an old version of a high-target, popular application on Windows with the highest number of patched vulnerabilities is probably not a great idea. You might though have good reason to deploy it for features that your users require.

So what can you do if you need to deploy it?

  1. Make it an optional user-driven install and make most users rely on the PDF viewer built into their browser
  2. Deploy via PowerShell if you want to enforce the install on end-points (this could be targeted by Azure AD groups)
  3. Look at alternatives readers from the Store
  4. Request Adobe update their installer or make Adobe Reader available from the Microsoft Store

I would prefer install from the Store but that will require enough organisations asking for this feature. [Adobe has a Feature Request form](https://www.adobe.com/products/wishform.html) and I would encourage you to use it.

<a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@digibread?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Russ McCabe"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-1px;fill:white" viewBox="0 0 32 32">

<title>
  unsplash-logo
</title><path d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"></path></svg></span>

<span style="display:inline-block;padding:2px 3px">Russ McCabe</span></a>