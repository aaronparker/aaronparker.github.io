---
id: 6189
title: Dynamic Software Update Rings in Microsoft Intune
date: 2018-10-10T13:27:43+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=6189
permalink: /dynamic-software-update-rings/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
image: /media/2018/10/mathew-schwartz-397471-unsplash.jpg
categories:
  - Microsoft
tags:
  - Intune
  - Office 365 ProPlus
  - Software Updates
  - Windows 10
---
Microsoft Intune provides management of [Window 10 Update Rings](https://docs.microsoft.com/en-us/intune/windows-update-for-business-configure) to enable [Windows as a Service](https://docs.microsoft.com/en-us/windows/deployment/update/waas-overview#servicing-channels), via the Software Updates feature. This enrols a Windows PC into Windows Update for Business to manage feature and quality updates the device receives and how quickly it updates to a new release. As you scale the number of devices managed by Microsoft Intune, the need to manage the software update or [deployment rings](https://blog.juriba.com/windows-10-deployment-rings) is key to adopting Windows 10 successfully. Being able to do so dynamically and empowering end-users by involving them in the process sounds like an idea that's just crazy enough to work. This article details an approach to achieve dynamic software update rings.

## Dynamic Groups 

Azure AD Premium includes [Dynamic Device and User groups](https://docs.microsoft.com/en-us/azure/active-directory/users-groups-roles/groups-create-rule) whose membership can change, well dynamically. This feature enables us to apply software update rings to dynamic groups where the membership can be based on just about any user or device property that suits our needs.

In most cases, applying Windows 10 Update Rings to devices, rather than users, is the best approach to ensure that updates can be better tracked across specific hardware and software combinations. I don't necessarily want a user moving between PCs and have devices move back and forth between update rings. Basing update rings on dynamic device groups is then likely the better approach.

## Software Update Rings

For the purposes of illustration, I've created a basic approach to update rings with the 3 rings show here:

  * Semi-Annual Channel - we need a catch-all ring applied to All Devices. If our dynamic groups that are based on a device property don't catch a device, it won't get the correct update ring applied. This approach ensures that by default, a device is treated as generally production ready be being enrolled in the Semi-Annual Channel to receive well tested updates. This ring is assigned to All Devices, while _excluding_ Azure AD dynamic groups assigned to all other rings
  * Semi-Annual Channel (Targeted) - here devices are enrolled for a pilot ring so that the latest Windows 10 release can be tested before rolling out the majority of PCs. This ring applies to a specific Azure AD dynamic group
  * Windows Insider - to preview upcoming Windows 10 releases it's important to be enrolled in the Windows Insider program. This ring applies to a specific Azure AD dynamic group

My update rings in this example are quite simple, but the approach can be customised for specific environments and needs.

![Dynamic Software Update Rings]({{site.baseurl}}/media/2018/10/SoftwareUpdateRings.png)*Update Rings configured within Intune Software Updates*

## Assigning Devices

To assign a device to an update ring, we need to leverage a device property that can be dynamically set. Here, [Device Category](https://docs.microsoft.com/en-us/intune/device-group-mapping) fits this bill in a number of ways - here, the administrator can view the device category and therefore the device's update ring, by viewing the device properties in the Intune console. If device category is not set (it will be set to Unassigned), our catch-all update ring will ensure the device is set to a production ready state.

![Device properties in Intune]({{site.baseurl}}/media/2018/10/IntuneDeviceProperties.png)Device properties in Intune*

The device category can also be viewed in the Intune Company Portal, thus making it easy to view this property from multiple locations. This visibility makes device category a good choice for managing our update rings.

![Device details in the Intune Company Portal]({{site.baseurl}}/media/2018/10/IntuneCompanyPortalDeviceDetails.png)*Device properties in the Intune Company Portal*

The Intune Administrator creates device categories in the console. As you can see in the image below, I've chosen **Production**, **Pilot** and **Preview** as the device categories that provide, hopefully, clear indication as to what each category is for.

![Intune Device categories]({{site.baseurl}}/media/2018/10/IntuneDevcecategories.png)*Intune Device categories*

Here's where the choice of using Device Category for assigning update rings is possibly a bit out there - the end-user chooses the device category! When enrolling their device or launching the Intune Company Portal for the first time they see the device category choices:

![Setting a device category in the Intune Company Portal]({{site.baseurl}}/media/2018/10/IntuneCompanyPortalDeviceCategory.png)*Setting a device category in the Intune Company Portal*

There's no replacement for end-user education, so it would behoove an organisation to include instructions on which category to choose, but in my mind it's obvious that most users should choose Production. Having device category descriptions displayed as well would help, but they don't at this time. Device categories are only shown once and the user cannot change the category after enrolment. Bulk changes to or reporting on categories can be achieved using the new [Intune PowerShell SDK](https://github.com/Microsoft/Intune-PowerShell-SDK).

## Dynamic Software Update Rings

Now that we have Update rings in place and an approach assigning them via Dynamic Device groups in Azure AD, we can create those groups based on membership rules that query Device Category. I've created two groups - **Devices-Pilot** and **Devices-Preview** that use a query where `deviceCategory`equals **Pilot** or **Preview** respectively. A **Devices-Production** group can also be created, but isn't required because the production update ring applies to All Devices. A production devices group would assist with reporting.

![Dynamic group membership rules]({{site.baseurl}}/media/2018/10/DynamicGroupRule.png)*Dynamic group membership rules*

For these devices groups, the membership rules are:

  * Devices-Production: `(device.deviceCategory -eq "Production") -or (device.deviceCategory -eq "Unknown")`
  * Devices-Pilot: `(device.deviceCategory -eq "Pilot")`
  * Devices-Preview: `(device.deviceCategory -eq "Preview")`

We can take this a step further and account for corporate vs. personal devices. Where users can enrol personal devices and you would prefer not to deploy Software update policies to them, membership can be filtered further. Using an advanced membership rule, update the group membership with:

  * Devices-Production: `((device.deviceCategory -eq "Production") -or (device.deviceCategory -eq "Unknown")) -and (device.deviceOwnership -eq "Company")`
  * Devices-Pilot: `(device.deviceCategory -eq "Pilot") -and (device.deviceOwnership -eq "Company")`
  * Devices-Preview: `(device.deviceCategory -eq "Preview") -and (device.deviceOwnership -eq "Company")`

With these groups created, assignments for my Software update rings are:

  * Semi-Annual Channel - assign to All Devices and exclude Devices-Pilot and Devices-Preview. 
  * Semi-Annual Channel (Targeted) - assign to Devices-Pilot
  * Windows Insider - assign to Devices-Preview

When a category is assigned to a device, the dynamic group will [update at some point and the policy](https://docs.microsoft.com/en-us/azure/active-directory/users-groups-roles/groups-troubleshooting) will apply on a subsequent [device policy refresh](https://docs.microsoft.com/en-au/intune/manage-settings-and-features-on-your-devices-with-microsoft-intune-policies).

## Dynamic Software Updates

The same approach can be used for deploying applications that provide preview channels similar to Windows. Microsoft Office 365 ProPlus is an obvious choice - we can create Office application deployments using Update Channels with assignments using our Dynamic Device groups.

![Office 365 ProPlus apps in Intune to manage update channels]({{site.baseurl}}/media/2018/10/Office365ProPlus.png)*Office 365 ProPlus apps in Intune to manage update channels*

The update rings I've implemented in my test environment include:

  * Office 365 ProPlus Semi-Annual Channel or Semi-Annual Channel (Targeted) that is assigned to All Devices and excludes Devices-Pilot and Devices-Preview, we have a catch all Office deployment package that will go out to the majority of devices
  * Office 365 ProPlus Semi-Annual Channel (Targeted) or Monthly Channel assigned to the Devices-Pilot group to receive the latest updates
  * Office 365 ProPlus Monthly Channel (Targeted) assigned to the Devices-Preview group to test Office Insider updates for testing upcoming features

Office 365 ProPlus then updates itself on the end-device based on the assigned channel. This actually works quite well for this application as you can pretty seamlessly move between channels as required.

## Wrapping Up

In this article, I've shown you how to enable dynamic Software Update rings for Windows Office in Intune using Azure AD Device Dynamic groups. This uses what may be a controversial approach - devices category chosen by the end-user. Modern device management forces us to rethink our engagement with end-users and involving them more directly in the testing process can help make IT more personal.

For more controlled environments, the choice of category can be overwritten by the administrator, especially for users who may need to roll back to a more stable release.
