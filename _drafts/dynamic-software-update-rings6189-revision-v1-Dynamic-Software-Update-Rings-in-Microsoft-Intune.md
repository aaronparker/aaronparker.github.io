---
id: 6212
title: Dynamic Software Update Rings in Microsoft Intune
date: 2018-10-10T13:27:43+10:00
author: Aaron Parker
layout: revision
guid: https://stealthpuppy.com/6189-revision-v1/
permalink: /6189-revision-v1/
---
Microsoft Intune provides management of [Window 10 Update Rings](https://docs.microsoft.com/en-us/intune/windows-update-for-business-configure) to enable [Windows as a Service](https://docs.microsoft.com/en-us/windows/deployment/update/waas-overview#servicing-channels), via the Software Updates feature. This enrols a Windows PC into Windows Update for Business to manage feature and quality updates the device receives and how quickly it updates to a new release. As you scale the number of devices managed by Microsoft Intune, the need to manage the software update or [deployment rings](https://blog.juriba.com/windows-10-deployment-rings) is key to adopting Windows 10 successfully. Being able to do so dynamically and empowering end-users by involving them in the process sounds like an idea that&#8217;s just crazy enough to work. This article details an approach to achieve dynamic software update rings.

# Dynamic Groups&nbsp;

Azure AD Premium includes&nbsp;[Dynamic Device and User groups](https://docs.microsoft.com/en-us/azure/active-directory/users-groups-roles/groups-create-rule)&nbsp;whose membership can change, well dynamically. This feature enables us to apply software update rings to dynamic groups where the membership can be based on just about any user or device property that suits our needs.

In most cases, applying Windows 10 Update Rings to devices, rather than users, is the best approach to ensure that updates can be better tracked across specific hardware and software combinations. I don&#8217;t necessarily want a user moving between PCs and have devices move back and forth between update rings. Basing update rings on dynamic device groups is then likely the better approach.

# Software Update Rings

For the purposes of illustration, I&#8217;ve created a basic approach to update rings with the 3 rings show here:

  * Semi-Annual Channel &#8211; we need a catch-all ring applied to All Devices. If our dynamic groups that are based on a device property don&#8217;t catch a device, it won&#8217;t get the correct update ring applied. This approach ensures that by default, a device is treated as generally production ready be being enrolled in the Semi-Annual Channel to receive well tested updates. This ring is assigned to All Devices, while _excluding_ Azure AD dynamic groups assigned to all other rings
  * Semi-Annual Channel (Targeted) &#8211; here devices are enrolled for a pilot ring so that the latest Windows 10 release can be tested before rolling out the majority of PCs. This ring applies to a specific Azure AD dynamic group
  * Windows Insider &#8211; to preview upcoming Windows 10 releases it&#8217;s important to be enrolled in the Windows Insider program.&nbsp;This ring applies to a specific Azure AD dynamic group

My update rings in this example are quite simple, but the approach can be customised for specific environments and needs.

<figure id="attachment_6195" aria-describedby="caption-attachment-6195" style="width: 2268px" class="wp-caption aligncenter">[<img class="wp-image-6195 size-full" src="https://stealthpuppy.com/wp-content/uploads/2018/10/SoftwareUpdateRings.png" alt="Dynamic Software Update Rings" width="2268" height="618" srcset="http://192.168.0.89/wp-content/uploads/2018/10/SoftwareUpdateRings.png 2268w, http://192.168.0.89/wp-content/uploads/2018/10/SoftwareUpdateRings-150x41.png 150w, http://192.168.0.89/wp-content/uploads/2018/10/SoftwareUpdateRings-300x82.png 300w, http://192.168.0.89/wp-content/uploads/2018/10/SoftwareUpdateRings-768x209.png 768w, http://192.168.0.89/wp-content/uploads/2018/10/SoftwareUpdateRings-1024x279.png 1024w" sizes="(max-width: 2268px) 100vw, 2268px" />](https://stealthpuppy.com/wp-content/uploads/2018/10/SoftwareUpdateRings.png)<figcaption id="caption-attachment-6195" class="wp-caption-text">Update Rings configured within Intune Software Updates</figcaption></figure>

# Assigning Devices

To assign a device to an&nbsp;update ring, we need to leverage a device property that can be dynamically set. Here,&nbsp;[Device Category](https://docs.microsoft.com/en-us/intune/device-group-mapping) fits this bill in a number of ways &#8211; here, the administrator can view the device category and therefore the device&#8217;s update ring, by viewing the device properties in the Intune console. If device category is not set (it will be set to Unassigned), our catch-all update ring will ensure the device is set to a production ready state.

<figure id="attachment_6197" aria-describedby="caption-attachment-6197" style="width: 1700px" class="wp-caption aligncenter">[<img class="size-full wp-image-6197" src="https://stealthpuppy.com/wp-content/uploads/2018/10/IntuneDeviceProperties.png" alt="Device properties in Intune" width="1700" height="1132" srcset="http://192.168.0.89/wp-content/uploads/2018/10/IntuneDeviceProperties.png 1700w, http://192.168.0.89/wp-content/uploads/2018/10/IntuneDeviceProperties-150x100.png 150w, http://192.168.0.89/wp-content/uploads/2018/10/IntuneDeviceProperties-300x200.png 300w, http://192.168.0.89/wp-content/uploads/2018/10/IntuneDeviceProperties-768x511.png 768w, http://192.168.0.89/wp-content/uploads/2018/10/IntuneDeviceProperties-1024x682.png 1024w" sizes="(max-width: 1700px) 100vw, 1700px" />](https://stealthpuppy.com/wp-content/uploads/2018/10/IntuneDeviceProperties.png)<figcaption id="caption-attachment-6197" class="wp-caption-text">Device properties in Intune</figcaption></figure>

The device category can also be viewed in the Intune Company Portal, thus making it easy to view this property from multiple locations. This visibility makes device category a good choice for managing our update rings.

<figure id="attachment_6203" aria-describedby="caption-attachment-6203" style="width: 1920px" class="wp-caption aligncenter">[<img class="size-full wp-image-6203" src="https://stealthpuppy.com/wp-content/uploads/2018/10/IntuneCompanyPortalDeviceDetails.png" alt="Device details in the Intune Company Portal" width="1920" height="1200" srcset="http://192.168.0.89/wp-content/uploads/2018/10/IntuneCompanyPortalDeviceDetails.png 1920w, http://192.168.0.89/wp-content/uploads/2018/10/IntuneCompanyPortalDeviceDetails-150x94.png 150w, http://192.168.0.89/wp-content/uploads/2018/10/IntuneCompanyPortalDeviceDetails-300x188.png 300w, http://192.168.0.89/wp-content/uploads/2018/10/IntuneCompanyPortalDeviceDetails-768x480.png 768w, http://192.168.0.89/wp-content/uploads/2018/10/IntuneCompanyPortalDeviceDetails-1024x640.png 1024w" sizes="(max-width: 1920px) 100vw, 1920px" />](https://stealthpuppy.com/wp-content/uploads/2018/10/IntuneCompanyPortalDeviceDetails.png)<figcaption id="caption-attachment-6203" class="wp-caption-text">Device properties in the Intune Company Portal</figcaption></figure>

The Intune Administrator creates device categories in the console.&nbsp;As you can see in the image below, I&#8217;ve chosen **Production**, **Pilot** and **Preview** as the device categories that provide, hopefully, clear indication as to what each category is for.

<figure id="attachment_6206" aria-describedby="caption-attachment-6206" style="width: 2242px" class="wp-caption aligncenter">[<img class="size-full wp-image-6206" src="https://stealthpuppy.com/wp-content/uploads/2018/10/IntuneDevcecategories.png" alt="Intune Device categories" width="2242" height="782" srcset="http://192.168.0.89/wp-content/uploads/2018/10/IntuneDevcecategories.png 2242w, http://192.168.0.89/wp-content/uploads/2018/10/IntuneDevcecategories-150x52.png 150w, http://192.168.0.89/wp-content/uploads/2018/10/IntuneDevcecategories-300x105.png 300w, http://192.168.0.89/wp-content/uploads/2018/10/IntuneDevcecategories-768x268.png 768w, http://192.168.0.89/wp-content/uploads/2018/10/IntuneDevcecategories-1024x357.png 1024w" sizes="(max-width: 2242px) 100vw, 2242px" />](https://stealthpuppy.com/wp-content/uploads/2018/10/IntuneDevcecategories.png)<figcaption id="caption-attachment-6206" class="wp-caption-text">Intune Device categories</figcaption></figure>

Here&#8217;s where the choice of using Device Category for assigning update rings is possibly a bit out there &#8211; the end-user chooses the device category! When enrolling their device or launching the Intune Company Portal for the first time they see the device category choices:

<figure id="attachment_6201" aria-describedby="caption-attachment-6201" style="width: 1893px" class="wp-caption aligncenter">[<img class="wp-image-6201 size-full" src="https://stealthpuppy.com/wp-content/uploads/2018/10/IntuneCompanyPortalDeviceCategory.png" alt="Setting a device category in the Intune Company Portal" width="1893" height="1162" srcset="http://192.168.0.89/wp-content/uploads/2018/10/IntuneCompanyPortalDeviceCategory.png 1893w, http://192.168.0.89/wp-content/uploads/2018/10/IntuneCompanyPortalDeviceCategory-150x92.png 150w, http://192.168.0.89/wp-content/uploads/2018/10/IntuneCompanyPortalDeviceCategory-300x184.png 300w, http://192.168.0.89/wp-content/uploads/2018/10/IntuneCompanyPortalDeviceCategory-768x471.png 768w, http://192.168.0.89/wp-content/uploads/2018/10/IntuneCompanyPortalDeviceCategory-1024x629.png 1024w" sizes="(max-width: 1893px) 100vw, 1893px" />](https://stealthpuppy.com/wp-content/uploads/2018/10/IntuneCompanyPortalDeviceCategory.png)<figcaption id="caption-attachment-6201" class="wp-caption-text">Setting a device category in the Intune Company Portal</figcaption></figure>

There&#8217;s no replacement for end-user education, so it would behoove an organisation to include instructions on which category to choose, but in my mind it&#8217;s obvious that most users should choose Production. Having device category descriptions displayed as well would help, but they don&#8217;t at this time. Device categories are only shown once and the user cannot change the category after enrolment. Bulk changes to or reporting on categories can be achieved using the new [Intune PowerShell SDK](https://github.com/Microsoft/Intune-PowerShell-SDK).

# Dynamic Software Update Rings

Now that we have Update rings in place and an approach assigning them via Dynamic Device groups in Azure AD, we can create those groups based on membership rules that query Device Category. I&#8217;ve created two groups &#8211; **Devices-Pilot** and **Devices-Preview** that use a query where&nbsp;<code class="prettyprint lang-javascript" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">deviceCategory</code>&nbsp;equals **Pilot** or **Preview** respectively. A&nbsp;**Devices-Production**&nbsp;group can also be created, but isn&#8217;t required because the production update ring applies to All Devices. A production devices group would assist with reporting.

<figure id="attachment_6208" aria-describedby="caption-attachment-6208" style="width: 1258px" class="wp-caption aligncenter">[<img class="size-full wp-image-6208" src="https://stealthpuppy.com/wp-content/uploads/2018/10/DynamicGroupRule.png" alt="Dynamic group membership rules" width="1258" height="528" srcset="http://192.168.0.89/wp-content/uploads/2018/10/DynamicGroupRule.png 1258w, http://192.168.0.89/wp-content/uploads/2018/10/DynamicGroupRule-150x63.png 150w, http://192.168.0.89/wp-content/uploads/2018/10/DynamicGroupRule-300x126.png 300w, http://192.168.0.89/wp-content/uploads/2018/10/DynamicGroupRule-768x322.png 768w, http://192.168.0.89/wp-content/uploads/2018/10/DynamicGroupRule-1024x430.png 1024w" sizes="(max-width: 1258px) 100vw, 1258px" />](https://stealthpuppy.com/wp-content/uploads/2018/10/DynamicGroupRule.png)<figcaption id="caption-attachment-6208" class="wp-caption-text">Dynamic group membership rules</figcaption></figure>

For these devices groups, the membership rules are:

  * Devices-Production:&nbsp;<code class="prettyprint lang-javascript" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">(device.deviceCategory -eq "Production") -or (device.deviceCategory -eq "Unknown")</code>&nbsp;
  * Devices-Pilot:&nbsp;<code class="prettyprint lang-javascript" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">(device.deviceCategory -eq "Pilot")</code>&nbsp;
  * Devices-Preview:&nbsp;<code class="prettyprint lang-javascript" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">(device.deviceCategory -eq "Preview")</code>&nbsp;

We can take this a step further and account for corporate vs. personal devices. Where users can enrol personal devices and you would prefer not to deploy Software update policies to them, membership can be filtered further. Using an advanced membership rule, update the group membership with:

  * Devices-Production:&nbsp;<code class="prettyprint lang-javascript" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">((device.deviceCategory -eq "Production") -or (device.deviceCategory -eq "Unknown")) -and (device.deviceOwnership -eq "Company")</code>&nbsp;
  * Devices-Pilot:&nbsp;<code class="prettyprint lang-javascript" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">(device.deviceCategory -eq "Pilot") -and (device.deviceOwnership -eq "Company")</code>&nbsp;
  * Devices-Preview:&nbsp;<code class="prettyprint lang-javascript" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">(device.deviceCategory -eq "Preview") -and (device.deviceOwnership -eq "Company")</code>&nbsp;

With these groups created, assignments for my Software update rings are:

  * Semi-Annual Channel &#8211; assign to All Devices and exclude Devices-Pilot and Devices-Preview.&nbsp;
  * Semi-Annual Channel (Targeted) &#8211; assign to Devices-Pilot
  * Windows Insider &#8211; assign to Devices-Preview

When a category is assigned to a device, the dynamic group will [update at some point and the policy](https://docs.microsoft.com/en-us/azure/active-directory/users-groups-roles/groups-troubleshooting) will apply on a subsequent [device policy refresh](https://docs.microsoft.com/en-au/intune/manage-settings-and-features-on-your-devices-with-microsoft-intune-policies).

# Dynamic Software Updates

The same approach can be used for deploying applications that provide preview channels similar to Windows. Microsoft Office 365 ProPlus is an obvious choice &#8211; we can create Office application deployments using Update Channels with assignments using our Dynamic Device groups.

<figure id="attachment_6207" aria-describedby="caption-attachment-6207" style="width: 1598px" class="wp-caption aligncenter">[<img class="size-full wp-image-6207" src="https://stealthpuppy.com/wp-content/uploads/2018/10/Office365ProPlus.png" alt="Office 365 ProPlus apps in Intune to manage update channels" width="1598" height="460" srcset="http://192.168.0.89/wp-content/uploads/2018/10/Office365ProPlus.png 1598w, http://192.168.0.89/wp-content/uploads/2018/10/Office365ProPlus-150x43.png 150w, http://192.168.0.89/wp-content/uploads/2018/10/Office365ProPlus-300x86.png 300w, http://192.168.0.89/wp-content/uploads/2018/10/Office365ProPlus-768x221.png 768w, http://192.168.0.89/wp-content/uploads/2018/10/Office365ProPlus-1024x295.png 1024w" sizes="(max-width: 1598px) 100vw, 1598px" />](https://stealthpuppy.com/wp-content/uploads/2018/10/Office365ProPlus.png)<figcaption id="caption-attachment-6207" class="wp-caption-text">Office 365 ProPlus apps in Intune to manage update channels</figcaption></figure>

The update rings I&#8217;ve implemented in my test environment include:

  * Office 365 ProPlus Semi-Annual Channel or&nbsp;Semi-Annual Channel (Targeted) that is assigned to All Devices and excludes Devices-Pilot and Devices-Preview, we have a catch all Office deployment package that will go out to the majority of devices
  * Office 365 ProPlus&nbsp;Semi-Annual Channel (Targeted) or Monthly Channel assigned to the Devices-Pilot group to receive the latest updates
  * Office 365 ProPlus Monthly Channel (Targeted) assigned to the Devices-Preview group to test Office Insider updates for testing upcoming features

Office 365 ProPlus then updates itself on the end-device based on the assigned channel. This actually works quite well for this application as you can pretty seamlessly move between channels as required.

# Wrapping Up

In this article, I&#8217;ve shown you how to&nbsp;enable dynamic Software Update rings for Windows Office in Intune using Azure AD Device Dynamic groups. This uses what may be a controversial approach &#8211; devices category chosen by the end-user. Modern device management forces us to rethink our engagement with end-users and involving them more directly in the testing process can help make IT more personal.

For more controlled environments, the choice of category can be overwritten by the administrator, especially for users who may need to roll back to a more stable release.

Photo by&nbsp;[Mathew Schwartz](https://unsplash.com/photos/sb7RUrRMaC4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)&nbsp;on&nbsp;[Unsplash](https://unsplash.com/search/photos/software?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)