---
title: Simple Country of Origin Control for NetScaler with Azure AD
date: 2017-09-28T16:29:39+10:00
author: Aaron Parker
layout: post
permalink: /country-of-origin-control-netscaler-azuread/
image: /media/2017/09/8439088143_259e3f274f_k.jpg
categories:
  - Citrix
tags:
  - Azure AD
  - Conditional Access
  - NetScaler
---
* this unordered seed list will be replaced by the toc
{:toc}

Great news! [Microsoft has enabled a number of available conditions and custom controls in Azure AD](https://blogs.technet.microsoft.com/enterprisemobility/2017/09/27/whats-new-with-azure-active-directory-ignite-2017/) for use in Conditional Access making these policies even more useful. This includes a simple method to control access to Citrix NetScaler by country of origin.

Back in March of this year, I was working on a project to design a solution for hosting applications in an Azure data centre, with access provided by Citrix XenApp and NetScaler. This particular customer needed to control access to both Office 365 applications and XenApp from specific locations only.

By configuring [Citrix FAS](http://docs.citrix.com/en-us/xenapp-and-xendesktop/7-15-ltsr/secure/federated-authentication-service.html) and [NetScaler with SAML authentication to Azure AD]({{site.baseurl}}/netscaler-azure-ad-conditional-access/), we were able to use [Named Locations in Azure AD](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-named-locations) Conditional Access policies to achieve the desired goal. For instance we could allow Office 365 only from compliant or domain-joined PCs and ensure access to XenApp only from specific locations. Thus for a certain group of users, they could only access Office 365 applications from XenApp and then only from a specific physical location.

All was well, until Microsoft pulled the ability to use Named Locations in Conditional Access policies half-way through the project. Lesson learned - never rely on preview features in Azure.

At Ignite 2017 this week, Microsoft announced a number of new conditions that includes the ability again to use Named Locations in conditions. What's new here is the ability to pick from a list of countries when defining those locations. With the number of new conditions available, including Terms of Use, VPN connectivity and Custom controls, I am hoping that Microsoft will not pull these features in the future and instead get them out of preview as quickly as possible.

## SAML All The Things!

In my previous article on [integrating Citrix NetScaler with Azure AD and Conditional Access]({{site.baseurl}}/netscaler-azure-ad-conditional-access/), I've described the steps to enable SAML authentication to Azure AD from NetScaler to enable a single authentication experience across remote published apps (or desktops) and Office 365. You could extend this of course to additional applications, provide users with single sign-on across all sorts of applications.

Doing so allows IT to control access to any application, whether that be legacy Win32 apps, or new SaaS applications from a single administrative experience with Conditional Access. Seen in the screenshot below, I have policies providing access to various applications - it's a beautiful thing.

![Azure AD Conditional Access policies]({{site.baseurl}}/media/2017/09/AzureAD-CA-Policies.png)

## Conditions in Conditional Access Policies

The new conditions and controls should be available now, in preview, for just about everyone. These include:

* Custom controls - JSON for customised controls from 3rd party claim providers. This should enable just about any type of user or device control in a CA policy
* Terms of use - require a user to consent to your organisation’s terms of use before they get access to an application
* VPN connectivity - force device compliance (for Windows 10 devices) before being allowed access to a corporate VPN

![New conditions and controls in preview]({{site.baseurl}}/media/2017/09/AzureAD-CA-Policies-Zoom.png)

## Enabling Country of Origin

Previously Named Locations allow you to only provide locations via specific subnets to define egress locations, e.g. your corporate office. New in Named Locations is the ability to add specific countries that you could use in allow or block scenarios, effectively enabling a whitelist or blacklist of regions.

![Creating a Named Location to define country of origin]({{site.baseurl}}/media/2017/09/AzureAD-CA-Countries-Regions.png)

Once these Named Locations are defined, it's possible to mix and match locations depending on your requirements. Within a Conditional Access policy, enable **Locations** under **Conditions**, and add the Named Locations. Use either Include or Exclude to whitelist or blacklist respectively.

![Allowing access from specific countries]({{site.baseurl}}/media/2017/09/AzureAD-CA-SelectedLocations.png)

And that's it! We now have country of origin as a condition that we could use as one condition to ensure access is secure. Allow compliant device, enforce MFA, or a custom control to give you confidence that access to XenApp or XenDesktop applications (or perhaps even web apps) is secure.

![Granting access with MFA]({{site.baseurl}}/media/2017/09/AzureAD-CA-GrantControl-MFA.png)

If we were to compare setting up NetScaler Gateway with AD integration, 3rd party multi-factor authentication and [country of](https://support.citrix.com/article/CTX130701) origin access by subscribing to a country database (see [How to Use NetScaler to Block Access to a Website Using a Location Database Based on User's Country](https://support.citrix.com/article/CTX130701)), I'm sure you would agree this method is simpler and easier to maintain.
