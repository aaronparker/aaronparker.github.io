---
id: 5487
title: Office 365 ProPlus Deployed with Intune in under 5 Minutes
date: 2017-07-14T22:05:48+10:00
author: Aaron Parker
layout: post
guid: http://stealthpuppy.com/?p=5487
permalink: /office-365-proplus-deploy-intune/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "5988469328"
image: /wp-content/uploads/2017/07/Office-2016-Preview.png
categories:
  - Microsoft
tags:
  - Intune
  - Office 365
  - Office 365 ProPlus
---
[Intune](https://docs.microsoft.com/en-au/intune/) has simplified the process for deploying Office 365 ProPlus to Windows 10 PCs with a wizard driven process that will get you deploying the Office suite in less that 5 minutes. I&#8217;m not exaggerating either &#8211; the process is so simple, it will take you longer to make a cup of coffee.

Until now, you can deploy Office 365 ProPlus to MDM-managed Windows 10 PCs by using [the Toolkit available from GitHub](http://officedev.github.io/Office-IT-Pro-Deployment-Scripts/XmlEditor.html). Because traditional applications can only be deployed to Windows 10 MDM PCs via a single MSI, the Toolkit steps you through creating a custom Office deployment (e.g. specific apps, update channel etc.) and generating an MSI that you then upload into Intune. It too is a simple process; however it does require you to download software, create the package (or multiple packages) and upload into Intune.

Here&#8217;s how to create an Office 365 ProPlus package in the [new Intune console](https://docs.microsoft.com/en-us/intune/what-is-intune)&nbsp;with just a few mouse clicks and no uploads.

# Creating the Office 365 ProPlus application

Creating an Office package is very simple &#8211; navigate to the [Mobile apps section in the Intune console](https://portal.azure.com/#blade/Microsoft_Intune_Apps/MainMenu/1):

<figure id="attachment_5490" aria-describedby="caption-attachment-5490" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5490" src="http://stealthpuppy.com/wp-content/uploads/2017/07/01_IntuneAddApp1-1024x587.png" alt="Adding an app in the Intune console" width="1024" height="587" srcset="http://192.168.0.89/wp-content/uploads/2017/07/01_IntuneAddApp1-1024x587.png 1024w, http://192.168.0.89/wp-content/uploads/2017/07/01_IntuneAddApp1-150x86.png 150w, http://192.168.0.89/wp-content/uploads/2017/07/01_IntuneAddApp1-300x172.png 300w, http://192.168.0.89/wp-content/uploads/2017/07/01_IntuneAddApp1-768x441.png 768w, http://192.168.0.89/wp-content/uploads/2017/07/01_IntuneAddApp1.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/07/01_IntuneAddApp1.png)<figcaption id="caption-attachment-5490" class="wp-caption-text">Adding an app in the Intune console</figcaption></figure>

Add a new app and select the &#8216;Office 365 ProPlus Suite (Windows 10)&#8217; option:

<figure id="attachment_5492" aria-describedby="caption-attachment-5492" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5492" src="http://stealthpuppy.com/wp-content/uploads/2017/07/02_AddOffice365ProPlus1-1024x587.png" alt="Select the Office 365 ProPlus App type" width="1024" height="587" srcset="http://192.168.0.89/wp-content/uploads/2017/07/02_AddOffice365ProPlus1-1024x587.png 1024w, http://192.168.0.89/wp-content/uploads/2017/07/02_AddOffice365ProPlus1-150x86.png 150w, http://192.168.0.89/wp-content/uploads/2017/07/02_AddOffice365ProPlus1-300x172.png 300w, http://192.168.0.89/wp-content/uploads/2017/07/02_AddOffice365ProPlus1-768x441.png 768w, http://192.168.0.89/wp-content/uploads/2017/07/02_AddOffice365ProPlus1.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/07/02_AddOffice365ProPlus1.png)<figcaption id="caption-attachment-5492" class="wp-caption-text">Select the Office 365 ProPlus App type</figcaption></figure>

This allows you to select the applications to include in this package &#8211; only selected applications will be included in the package. Note that if you have some users who require Project or Visio, create seperate packages that include these applications along with Office, rather than attempting to deploy them separately.

<figure id="attachment_5493" aria-describedby="caption-attachment-5493" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5493" src="http://stealthpuppy.com/wp-content/uploads/2017/07/03_SelectApps-1024x587.png" alt="Select the app to be included in this package" width="1024" height="587" srcset="http://192.168.0.89/wp-content/uploads/2017/07/03_SelectApps-1024x587.png 1024w, http://192.168.0.89/wp-content/uploads/2017/07/03_SelectApps-150x86.png 150w, http://192.168.0.89/wp-content/uploads/2017/07/03_SelectApps-300x172.png 300w, http://192.168.0.89/wp-content/uploads/2017/07/03_SelectApps-768x441.png 768w, http://192.168.0.89/wp-content/uploads/2017/07/03_SelectApps.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/07/03_SelectApps.png)<figcaption id="caption-attachment-5493" class="wp-caption-text">Select the app to be included in this package</figcaption></figure>

Enter information for the application package &#8211; you&#8217;ll need to specify the Suite Name, Description and optionally add the URL information shown in the screenshot below.

<figure id="attachment_5494" aria-describedby="caption-attachment-5494" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5494" src="http://stealthpuppy.com/wp-content/uploads/2017/07/04_ConfigurePackage01-1024x587.png" alt="Configure options for the package" width="1024" height="587" srcset="http://192.168.0.89/wp-content/uploads/2017/07/04_ConfigurePackage01-1024x587.png 1024w, http://192.168.0.89/wp-content/uploads/2017/07/04_ConfigurePackage01-150x86.png 150w, http://192.168.0.89/wp-content/uploads/2017/07/04_ConfigurePackage01-300x172.png 300w, http://192.168.0.89/wp-content/uploads/2017/07/04_ConfigurePackage01-768x441.png 768w, http://192.168.0.89/wp-content/uploads/2017/07/04_ConfigurePackage01.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/07/04_ConfigurePackage01.png)<figcaption id="caption-attachment-5494" class="wp-caption-text">Configure options for the package</figcaption></figure>

Choose whether to deploy the 32-bit or 64-bit version of Office and the [Update channel](https://support.office.com/en-us/article/Overview-of-update-channels-for-Office-365-ProPlus-9ccf0f13-28ff-4975-9bd2-7e4ea2fefef4). The 32-bit version on the Deferred update channel will suit most users.

<figure id="attachment_5495" aria-describedby="caption-attachment-5495" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5495" src="http://stealthpuppy.com/wp-content/uploads/2017/07/06_SuiteSettings-1024x587.png" alt="Configure suite settings" width="1024" height="587" srcset="http://192.168.0.89/wp-content/uploads/2017/07/06_SuiteSettings-1024x587.png 1024w, http://192.168.0.89/wp-content/uploads/2017/07/06_SuiteSettings-150x86.png 150w, http://192.168.0.89/wp-content/uploads/2017/07/06_SuiteSettings-300x172.png 300w, http://192.168.0.89/wp-content/uploads/2017/07/06_SuiteSettings-768x441.png 768w, http://192.168.0.89/wp-content/uploads/2017/07/06_SuiteSettings.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/07/06_SuiteSettings.png)<figcaption id="caption-attachment-5495" class="wp-caption-text">Configure suite settings</figcaption></figure>

Add language support if required. English US will be the default if not languages are explicitly selected.

<figure id="attachment_5496" aria-describedby="caption-attachment-5496" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5496" src="http://stealthpuppy.com/wp-content/uploads/2017/07/07_SelectLanguages-1024x587.png" alt="Select languages to include in this package" width="1024" height="587" srcset="http://192.168.0.89/wp-content/uploads/2017/07/07_SelectLanguages-1024x587.png 1024w, http://192.168.0.89/wp-content/uploads/2017/07/07_SelectLanguages-150x86.png 150w, http://192.168.0.89/wp-content/uploads/2017/07/07_SelectLanguages-300x172.png 300w, http://192.168.0.89/wp-content/uploads/2017/07/07_SelectLanguages-768x441.png 768w, http://192.168.0.89/wp-content/uploads/2017/07/07_SelectLanguages.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/07/07_SelectLanguages.png)<figcaption id="caption-attachment-5496" class="wp-caption-text">Select languages to include in this package</figcaption></figure>

# Assign the App

In most cases, this application package will be assigned to users so that Office is available on any Windows 10 PC they sign into. Something to note in the assignment types is that only Required and Uninstall are available. The Available type, that allows users to install Office from the Company Portal, is not available, which means that the Office suite will be deployed as soon as you add an assignment.

<figure id="attachment_5497" aria-describedby="caption-attachment-5497" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5497" src="http://stealthpuppy.com/wp-content/uploads/2017/07/08_AssignApp-1024x587.png" alt="Adding assignments to deploy the Office suite" width="1024" height="587" srcset="http://192.168.0.89/wp-content/uploads/2017/07/08_AssignApp-1024x587.png 1024w, http://192.168.0.89/wp-content/uploads/2017/07/08_AssignApp-150x86.png 150w, http://192.168.0.89/wp-content/uploads/2017/07/08_AssignApp-300x172.png 300w, http://192.168.0.89/wp-content/uploads/2017/07/08_AssignApp-768x441.png 768w, http://192.168.0.89/wp-content/uploads/2017/07/08_AssignApp.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/07/08_AssignApp.png)<figcaption id="caption-attachment-5497" class="wp-caption-text">Adding assignments to deploy the Office suite</figcaption></figure>

If you would prefer to make the Office suite available for users to install themselves, you&#8217;ll need to create a custom deployment using the [Office Toolkit](http://officedev.github.io/Office-IT-Pro-Deployment-Scripts/XmlEditor.html)&nbsp;to create a single MSI installer that you can upload to Intune as a Windows Line of Business application. This will allow you to chose Available as an assignment type.

# Summary

In this article, I&#8217;ve shown you how to deploy Office 365 ProPlus to Windows 10 PCs enrolled in Intune via MDM via a process that takes no time at all. From zero to deployed in under 5 minutes.