---

title: Intune Company Portal for macOS Experience
date: 2017-09-02T16:06:01+10:00
author: Aaron Parker
layout: post

permalink: /intune-company-portal-macos/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "6113877109"
image: /media/2017/09/CompanyPortalMacOS.png
categories:
  - Microsoft
tags:
  - Intune
  - Intune Company Portal
  - macOS
---
Microsoft released a beta version of the Intune Company Portal for macOS just last month; however, it's since been pulled from the Download Center. This app had been made available along with [the announcement of Conditional Access supporting macOS](https://blogs.technet.microsoft.com/enterprisemobility/2017/08/23/azure-ad-and-intune-now-support-macos-in-conditional-access/) in preview.

**Edit**: the download is now available again: <https://www.microsoft.com/en-us/download/details.aspx?id=55770>

Installing the Company Portal is required to [enable Conditional Access support on macOS](https://docs.microsoft.com/en-au/intune/compliance-policy-create-mac-os), so I imagine a new version will be made available soon. If you're testing with Macs or looking for full support with Intune, this is an important part of the puzzle.

## Intune Web Enrollment

Previous to the Company Portal on macOS, enrollment in Intune is a largely manual process that requires logging into the Intune web portal with a browser, downloading a management profile and installing that manually. Not the best user experience.

Here's what that looks like:

![Intune web enrollment for macOS]({{site.baseurl}}/media/2017/09/Intune-WebEnroll.png)

![Downloading the Intune management profile]({{site.baseurl}}/media/2017/09/Intune-WebEnroll2.png)

![Installing the MDM management profile]({{site.baseurl}}/media/2017/09/Intune-WebEnroll-Profile.png)

## Intune Company Portal for macOS Experience

With the Company Portal, the user experience is streamlined, with the management profile installed automatically and you can see device compliance status from within the app. Here's a quick look at the end-user experience with the Intune Company Portal for macOS on macOS Sierra.

![Launching the portal on macOS]({{site.baseurl}}/media/2017/09/MacCompanyPortal1.png)
  
![Signing in with a user account with modern authentication]({{site.baseurl}}/media/2017/09/MacCompanyPortal2.png)

![Entering your credentials]({{site.baseurl}}/media/2017/09/MacCompanyPortal3.png)

![Establishing connection a to Intune]({{site.baseurl}}/media/2017/09/MacCompanyPortal4.png)

![Walking the user through device enrollment]({{site.baseurl}}/media/2017/09/MacCompanyPortal5.png)

![Why enroll your device?]({{site.baseurl}}/media/2017/09/MacCompanyPortal6.png)

![MacOS privacy details]({{site.baseurl}}/media/2017/09/MacCompanyPortal7.png)

![Providing the user with details on enrollment]({{site.baseurl}}/media/2017/09/MacCompanyPortal8.png)

![Installing the management profile]({{site.baseurl}}/media/2017/09/MacCompanyPortal9.png)

![Enrollment is successful along with device compliance]({{site.baseurl}}/media/2017/09/MacCompanyPortal10.png)

![Intune enrollment complete]({{site.baseurl}}/media/2017/09/MacCompanyPortal11.png)

![Intune Company Portal for macOS installing device details]({{site.baseurl}}/media/2017/09/MacCompanyPortal12a.png)

Hopefully we'll see the portal app available for download again soon and available for wider testing. I'm also hoping that the availability of the Portal app means we'll see the ability for Intune to install apps on macOS. As we see more Mac devices (either corporate or personally owned), the ability to deploy and manage apps on this platform becomes critical.
