---
id: 5447
title: Enabling Modern Authentication for Office
date: 2017-06-09T23:24:44+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=5447
permalink: /enabling-modern-authentication-office/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "5894819110"
image: /media/2017/06/14553462732_548befbd46_k.jpg
categories:
  - Microsoft
tags:
  - AD Connect
  - Modern Authentication
  - Office
  - Office 365
---
Enabling Azure AD and Office 365 features including multi-factor authentication and Conditional Access will impact your users because they'll need utilise [App Passwords](https://docs.microsoft.com/en-us/azure/multi-factor-authentication/end-user/multi-factor-authentication-end-user-app-passwords) (one time passwords used for authentication with legacy applications). Unfortunately this will only serve to confuse users and result in calls to your service desk. Modern authentication is, of course, the way to improve user experience but it's not enabled by default.

# Enabling Modern Authentication

Office applications previous to 2013 aren't capable of modern authentication, but if you're deploying Office 365 your likely deploying Office 365 ProPlus - 2013 or later. However it's not enough just to deploy a recent version of Office, modern authentication (or [OAuth](https://en.wikipedia.org/wiki/OAuth)) needs to be enabled in your tenant. Microsoft has described how modern authentication [works in Office 2013 and 2016 client applications](https://support.office.com/en-us/article/How-modern-authentication-works-for-Office-2013-and-Office-2016-client-apps-e4c45989-4b1a-462e-a81b-2a13191cf517). In that article we can see that modern authentication is:

  * Turned off for Exchange Online by default.
  * Turned on for SharePoint Online by default.
  * Turned off for Skype for Business Online by default.

Why this is, I'm not sure, but you'll need to enable modern authentication for Exchange Online and Skype for Business for this feature to work on the client end.

## Enabling Modern Authentication for Exchange Online

Full details for enabling modern authentication are available [in this article for Exchange Online from Microsoft](https://support.office.com/en-us/article/Enable-Exchange-Online-for-modern-authentication-58018196-f918-49cd-8238-56f57f38d662); however here's the short version. You'll need to first install [the Azure AD PowerShell module](https://www.powershellgallery.com/packages/AzureAD/). Then connect to your Office 365 tenant and enable OAuth with [Set-OrganizationConfig](https://technet.microsoft.com/en-us/library/aa997443(v=exchg.160).aspx), via the following code:



## Enabling Modern Authentication for Skype for Business Online

Configuring Skype for Business Online first requires installing [the Skype for Business Online PowerShell Module](https://www.microsoft.com/en-us/download/details.aspx?id=39366) which you'll need to download and install, rather than install from the PowerShell Gallery. Then like Exchange, connect to your Office 365 tenant and enable OAuth with [Set-CsOAuthConfiguration](https://technet.microsoft.com/en-us/library/jj204841.aspx).



In my environment, the admin account I'm using has a different domain to the domain used by Skype for Business, hence I've added the OverrideAdminDomain parameter. For more complex scenarios with ADFS, you may need to consult this article: [How to use Modern Auth. (ADAL) with Skype for Business](https://technet.microsoft.com/en-us/library/mt710548.aspx).

Now with your tenant configuration complete, you may need to enable single sign-on with Azure AD Connect.

# Desktop Configuration

Note that [this article lists required registry configuration](https://support.office.com/en-us/article/Enable-Modern-Authentication-for-Office-2013-on-Windows-devices-7dc1c01a-090f-4971-9677-f1b192d6c910) to enable modern authentication for the Office 2013 desktop applications. This can be set via Group Policy preferences or any 3rd party UEM product. Office 2016 desktop applications should work without this configuration explicitly set; however, if you do set these keys for Office 2016, change 15 to 16 in the key path.

[table id=44 /] 

# Single Sign-on with Azure AD Connect

If you've deployed [Active Directory Federation Services (ADFS), single sign-on](https://blogs.technet.microsoft.com/canitpro/2015/09/11/step-by-step-setting-up-ad-fs-and-enabling-single-sign-on-to-office-365/) should already be enabled and users should see applications such as Outlook auto-configure and sign in automatically; however, if you only have AD Connect and rely on Azure AD directly for authentication, you can enable Pass-through Authentication and Single Sign-On with AD Connect version 1.1.484.0 or above. 

<figure id="attachment_5452" aria-describedby="caption-attachment-5452" style="width: 880px" class="wp-caption alignnone">[<img class="size-full wp-image-5452" src="https://stealthpuppy.com/media/2017/06/ADConnectSingleSignOn.png" alt="AD Connect Single Sign-On for Modern Authentication" width="880" height="620" srcset="https://stealthpuppy.com/media/2017/06/ADConnectSingleSignOn.png 880w, https://stealthpuppy.com/media/2017/06/ADConnectSingleSignOn-150x106.png 150w, https://stealthpuppy.com/media/2017/06/ADConnectSingleSignOn-300x211.png 300w, https://stealthpuppy.com/media/2017/06/ADConnectSingleSignOn-768x541.png 768w" sizes="(max-width: 880px) 100vw, 880px" />]({{site.baseurl}}/media/2017/06/ADConnectSingleSignOn.png)<figcaption id="caption-attachment-5452" class="wp-caption-text">AD Connect Single Sign-On for Modern Authentication*

Full details for enabling this configuration are available in this article: [Azure Active Directory Seamless Single Sign On](https://docs.microsoft.com/en-au/azure/active-directory/connect/active-directory-aadconnect-sso). With only AD Connect and Azure AD (instead of with ADFS), the steps for deploying this configuration are surprisingly simple and elegant.

# User Experience

Now that the configuration is complete, we can see that from the user perspective applications receive single sign-on to the Office 365 services. In these examples, I've configured MFA in Azure AD to not prompt users when behind a [Trusted IP](https://docs.microsoft.com/en-us/azure/multi-factor-authentication/multi-factor-authentication-whats-next#trusted-ips) range, otherwise if applications are started for the first time from another location, the user will see the modern authentication prompt, optionally with MFA.

## Outlook

When starting Outlook for the first time, the user sees the initial configuration wizard, but can click Next through the wizard without entering account details manually.

<figure id="attachment_5458" aria-describedby="caption-attachment-5458" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5458" src="https://stealthpuppy.com/media/2017/06/OutlookConfigureComplete-1-1024x640.png" alt="Outlook auto-configuration with modern authentication complete" width="1024" height="640" srcset="https://stealthpuppy.com/media/2017/06/OutlookConfigureComplete-1-1024x640.png 1024w, https://stealthpuppy.com/media/2017/06/OutlookConfigureComplete-1-150x94.png 150w, https://stealthpuppy.com/media/2017/06/OutlookConfigureComplete-1-300x188.png 300w, https://stealthpuppy.com/media/2017/06/OutlookConfigureComplete-1-768x480.png 768w, https://stealthpuppy.com/media/2017/06/OutlookConfigureComplete-1.png 1280w" sizes="(max-width: 1024px) 100vw, 1024px" />]({{site.baseurl}}/media/2017/06/OutlookConfigureComplete-1.png)<figcaption id="caption-attachment-5458" class="wp-caption-text">Outlook auto-configuration with modern authentication complete*

Activating Office 365 ProPlus will still require the user to manually enter their email address.

<figure id="attachment_5454" aria-describedby="caption-attachment-5454" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5454" src="https://stealthpuppy.com/media/2017/06/OfficeActivation-1024x640.png" alt="Office activation unfortunately isn't autoconfigured" width="1024" height="640" srcset="https://stealthpuppy.com/media/2017/06/OfficeActivation-1024x640.png 1024w, https://stealthpuppy.com/media/2017/06/OfficeActivation-150x94.png 150w, https://stealthpuppy.com/media/2017/06/OfficeActivation-300x188.png 300w, https://stealthpuppy.com/media/2017/06/OfficeActivation-768x480.png 768w, https://stealthpuppy.com/media/2017/06/OfficeActivation.png 1280w" sizes="(max-width: 1024px) 100vw, 1024px" />]({{site.baseurl}}/media/2017/06/OfficeActivation.png)<figcaption id="caption-attachment-5454" class="wp-caption-text">Office activation unfortunately isn't auto-configured*

## Skype for Business

Skype for Business will prompt for a username or sign-in address; however, then click on Sign In, the user is not prompted to authenticate to Skype for Business Online.

<figure id="attachment_5457" aria-describedby="caption-attachment-5457" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5457" src="https://stealthpuppy.com/media/2017/06/SkypeSignIn-1024x640.png" alt="Skype for Business - enter your email address" width="1024" height="640" srcset="https://stealthpuppy.com/media/2017/06/SkypeSignIn-1024x640.png 1024w, https://stealthpuppy.com/media/2017/06/SkypeSignIn-150x94.png 150w, https://stealthpuppy.com/media/2017/06/SkypeSignIn-300x188.png 300w, https://stealthpuppy.com/media/2017/06/SkypeSignIn-768x480.png 768w, https://stealthpuppy.com/media/2017/06/SkypeSignIn.png 1280w" sizes="(max-width: 1024px) 100vw, 1024px" />]({{site.baseurl}}/media/2017/06/SkypeSignIn.png)<figcaption id="caption-attachment-5457" class="wp-caption-text">Skype for Business - enter your email address*

## OneDrive for Business

Similarly for OneDrive for Business - the user is required to enter their email address and click Sign in, but no further authentication prompts are seen.

<figure id="attachment_5455" aria-describedby="caption-attachment-5455" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5455" src="https://stealthpuppy.com/media/2017/06/OneDriveSignIn-1024x640.png" alt="OneDrive for Business - enter your email address" width="1024" height="640" srcset="https://stealthpuppy.com/media/2017/06/OneDriveSignIn-1024x640.png 1024w, https://stealthpuppy.com/media/2017/06/OneDriveSignIn-150x94.png 150w, https://stealthpuppy.com/media/2017/06/OneDriveSignIn-300x188.png 300w, https://stealthpuppy.com/media/2017/06/OneDriveSignIn-768x480.png 768w, https://stealthpuppy.com/media/2017/06/OneDriveSignIn.png 1280w" sizes="(max-width: 1024px) 100vw, 1024px" />]({{site.baseurl}}/media/2017/06/OneDriveSignIn.png)<figcaption id="caption-attachment-5455" class="wp-caption-text">OneDrive for Business - enter your email address*

# Conclusion

With a few simple steps we've provided users with a better authentication experience in less time that it's taken me to write this article.

 