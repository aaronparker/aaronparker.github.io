---
id: 2542
title: 'Delivering Office with App-V &#8211; The Need for Profile Management'
date: 2011-11-24T09:16:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2542
permalink: /delivering-office-with-app-v-the-need-for-profile-management/
dsq_thread_id:
  - "482261212"
categories:
  - Applications
tags:
  - App-V
  - Office
---
Because Office is a core application of most desktop deployments, user interaction with Office and the user experience are important factors in the deployment of Office. From an administration perspective, providing a seamless user experience requires managing the user preferences of an application, independent of the application delivery method.

### Multiple App-V packages are common

Microsoft recommends sequencing applications on the same operating system as the target clients are running. This means that if your target clients are running Windows XP and Windows 7, then you should create two App-V packages for each application – one for each operating system.

However, in practice it is often advisable to sequence on the lowest common denominator. In the example with Windows XP and Windows 7 clients, sequencing should be performed on Windows XP. In the event that a package does not then execute correctly on Windows 7, then the application should be re-sequenced on Windows 7.

The same applies to x86 and x64 processor architectures – if you are deliverying 32-bit applications to both x86 and x64 Windows, you should sequence in a 32-bit Windows environment. If you find that a 32-bit virtual application package executes OK on x86 Windows but not on x64 Windows, you will have to create two packages, one for each processor architecture.

There are several reasons for this, but they’re out of scope of a discussion on profile management; however what this highlights is that if you have multiple packages for the same application due to different operating systems and/or processor architectures, again the only way to improve the user experience is to rely on a third party profile management solution that works independently of the App-V package.

### App-V and User Profiles

The default behaviour of App-V is to not only virtualize the application, but also the user profile locations for that application (HKEY\_CURRENT\_USER and %APPDATA%). This means that that profile information for the Microsoft Office packages will be stored, in its entirety, in the PKG.

The implication of this is that the settings for a virtualized Office package will be specific to that package – that is, a user’s Office settings will not only be specific to a version of Office but also specific to an individual Office package.

Consider the following scenarios:

  * A user moves between desktops where Office Standard has been deployed to the first desktop, but Office Professional has been deployed to the second. These will be different App-V packages, so by default, no user preferences will be shared
  * You create an Office package which has been released to production and later find issues with the package that requires re-creating it from scratch – user preferences from the old package will not be shared with the new package
  * You find that you need to create multiple Office packages for different platforms – for example a package for desktops and a package for Remote Desktop Session Host servers. These are separate App-V packages and user preferences will not be consistent across those packages

Each scenario will result in separate App-V packages for the same applications.

If you need to upgrade a package or migrate between Office versions, you now have a further challenge that you would not have if Office were installed instead of virtualized.

By implementing a 3<sup>rd</sup> party profile management solution, you gain the ability to manage user’s Office preferences independent of the Office version (App-V package version or Office version) and remove the reliance on a specific Office package. A profile management solution will allow you to create, update and re-create Office packages without affecting the end-user experience.

### What solution should I use?

The user profile management or user state virtualization tools built into Windows aren’t able to see into the App-V virtual environment and therefore aren’t able to manage an application user preferences independent of the App-V package. If you would like to manage user preferences more granularly, a 3<sup>rd</sup> party solution will be required.

A profile management solution that is capable of managing user preferences _inside and across_ App-V packages will provide you with the flexibility and consistency of user experience required to support a core application like Microsoft Office. Without providing users with a consistent user experience or one that matches their existing Office deployments, user acceptance will be low.

For an objective comparison of the 3<sup>rd</sup> party solutions available, see the following white paper: [UEM Smackdown: Head-to-head analysis of Appsense, Citrix, Immidio, Liquidware Labs, Microsoft, Quest, RES, Scense, Tricerat and others](http://www.brianmadden.com/blogs/rubenspruijt/archive/2011/11/01/user-environment-management-smackdown-head-to-head-analysis-of-appsense-citrix-immidio-liquidware-labs-microsoft-quest-res-scense-tricerat-unidesk-and-vuem.aspx)