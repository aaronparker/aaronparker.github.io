---
id: 5792
title: Simple Country of Origin Control for NetScaler with Azure AD
date: 2017-09-28T16:29:39+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=5792
permalink: /country-of-origin-control-netscaler-azuread/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "6176240262"
image: /wp-content/uploads/2017/09/8439088143_259e3f274f_k.jpg
categories:
  - Citrix
tags:
  - Azure AD
  - Conditional Access
  - NetScaler
---
Great news! [Microsoft has enabled a number of available conditions and custom controls in Azure AD](https://blogs.technet.microsoft.com/enterprisemobility/2017/09/27/whats-new-with-azure-active-directory-ignite-2017/) for use in Conditional Access making these policies even more useful. This includes a simple method to control access to Citrix NetScaler by country of origin.

Back in March of this year, I was working on a project to design a solution for hosting applications in an Azure data centre, with access provided by Citrix XenApp and NetScaler. This particular customer needed to control access to both Office 365 applications and XenApp from specific locations only.&nbsp;

By configuring [Citrix FAS](http://docs.citrix.com/en-us/xenapp-and-xendesktop/7-15-ltsr/secure/federated-authentication-service.html) and [NetScaler with SAML authentication to Azure AD](https://stealthpuppy.com/netscaler-azure-ad-conditional-access/), we were able to use [Named Locations in Azure AD](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-named-locations) Conditional Access policies to achieve the desired goal. For instance we could allow Office 365 only from compliant or domain-joined PCs and ensure access to XenApp only from specific locations. Thus for a certain group of users, they could only access Office 365 applications from XenApp and then only from a specific physical location.

All was well, until Microsoft pulled the ability to use Named Locations in Conditional Access policies half-way through the project. Lesson learned - never rely on preview features in Azure.

At Ignite 2017 this week, Microsoft announced a number of new conditions that includes the ability again to use Named Locations in conditions. What&#8217;s new here is the ability to pick from a list of countries when defining those locations. With the number of new conditions available, including Terms of Use, VPN connectivity and Custom controls, I am hoping that Microsoft will not pull these features in the future and instead get them out of preview as quickly as possible.

# SAML All The Things!

In my previous article on [integrating Citrix NetScaler with Azure AD and Conditional Access](https://stealthpuppy.com/netscaler-azure-ad-conditional-access/), I&#8217;ve described the steps to enable SAML authentication to Azure AD from NetScaler to enable a single authentication experience across remote published apps (or desktops) and Office 365. You could extend this of course to additional applications, provide users with single sign-on across all sorts of applications.

Doing so allows IT to control access to any application, whether that be legacy Win32 apps, or new SaaS applications from a single administrative experience with Conditional Access. Seen in the screenshot below, I have policies providing access to various applications - it&#8217;s a beautiful thing.

<figure id="attachment_5798" aria-describedby="caption-attachment-5798" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5798" src="https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-Policies-1024x587.png" alt="Azure AD Conditional Access policies" width="1024" height="587" srcset="https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-Policies-1024x587.png 1024w, https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-Policies-150x86.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-Policies-300x172.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-Policies-768x441.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-Policies.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-Policies.png)<figcaption id="caption-attachment-5798" class="wp-caption-text">Azure AD Conditional Access policies</figcaption></figure>

# Conditions in Conditional Access Policies

The new conditions and controls should be available now, in preview, for just about everyone. These include:

  * Custom controls -&nbsp;JSON for customised controls from 3rd party claim providers. This should enable just about any type of user or device control in a CA policy
  * Terms of use - require a user to consent to your organisation’s terms of use before they get access to an application
  * VPN connectivity - force device compliance (for Windows 10 devices) before being allowed access to a corporate VPN

<figure id="attachment_5804" aria-describedby="caption-attachment-5804" style="width: 818px" class="wp-caption alignnone">[<img class="size-full wp-image-5804" src="https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-Policies-Zoom.png" alt="New conditions and controls in preview" width="818" height="519" srcset="https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-Policies-Zoom.png 818w, https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-Policies-Zoom-150x95.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-Policies-Zoom-300x190.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-Policies-Zoom-768x487.png 768w" sizes="(max-width: 818px) 100vw, 818px" />](https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-Policies-Zoom.png)<figcaption id="caption-attachment-5804" class="wp-caption-text">New conditions and controls in preview</figcaption></figure>

# Enabling Country of Origin

Previously Named Locations allow you to only provide locations via specific subnets to define egress locations, e.g. your corporate office. New in Named Locations is the ability to add specific countries that you could use in allow or block scenarios, effectively enabling a whitelist or blacklist of regions.

<figure id="attachment_5800" aria-describedby="caption-attachment-5800" style="width: 1024px" class="wp-caption alignnone">[<img class="wp-image-5800 size-large" src="https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-Countries-Regions-1024x587.png" alt="Creating a Named Location to define country of origin" width="1024" height="587" srcset="https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-Countries-Regions-1024x587.png 1024w, https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-Countries-Regions-150x86.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-Countries-Regions-300x172.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-Countries-Regions-768x441.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-Countries-Regions.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-Countries-Regions.png)<figcaption id="caption-attachment-5800" class="wp-caption-text">Creating a Named Location to define country of origin</figcaption></figure>

Once these Named Locations are defined, it&#8217;s possible to mix and match locations depending on your requirements. Within a Conditional Access policy, enable&nbsp;**Locations** under **Conditions**, and add the Named Locations. Use either Include or Exclude to whitelist or blacklist respectively.

<figure id="attachment_5799" aria-describedby="caption-attachment-5799" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5799" src="https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-SelectedLocations-1024x587.png" alt="Allowing access from specific countries" width="1024" height="587" srcset="https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-SelectedLocations-1024x587.png 1024w, https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-SelectedLocations-150x86.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-SelectedLocations-300x172.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-SelectedLocations-768x441.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-SelectedLocations.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-SelectedLocations.png)<figcaption id="caption-attachment-5799" class="wp-caption-text">Allowing access from specific countries</figcaption></figure>

And that&#8217;s it! We now have country of origin as a condition that we could use as one condition to ensure access is secure. Allow compliant device, enforce MFA, or a custom control to give you confidence that access to XenApp or XenDesktop applications (or perhaps even web apps) is secure.

<figure id="attachment_5797" aria-describedby="caption-attachment-5797" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5797" src="https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-GrantControl-MFA-1024x587.png" alt="Granting access with MFA" width="1024" height="587" srcset="https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-GrantControl-MFA-1024x587.png 1024w, https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-GrantControl-MFA-150x86.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-GrantControl-MFA-300x172.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-GrantControl-MFA-768x441.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-GrantControl-MFA.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](https://stealthpuppy.com/wp-content/uploads/2017/09/AzureAD-CA-GrantControl-MFA.png)<figcaption id="caption-attachment-5797" class="wp-caption-text">Granting access with MFA</figcaption></figure>

If we were to compare setting up NetScaler Gateway with AD integration, 3rd party multi-factor authentication and [country of](https://support.citrix.com/article/CTX130701) origin access by subscribing to a country database (see [How to Use NetScaler to Block Access to a Website Using a Location Database Based on User&#8217;s Country](https://support.citrix.com/article/CTX130701)), I&#8217;m sure you would agree this method is simpler and easier to maintain.