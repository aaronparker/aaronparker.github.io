---
layout: post
title: Securing AVD and Windows 365 with Strong Authentication
description: Configuring strong authentication requirements using Entra Conditional
  Access to protect access to Azure Virtual Desktop and Windows 365 and understanding
  the resulting behaviours.
permalink: "/avd-w365-secure-authentication/" 
image:
  path: "/assets/img/authn/image.jpg"
  srcset:
    1920w: "/assets/img/authn/image.jpg"
    960w: "/assets/img/authn/image@0,5x.jpg"
    480w: "/assets/img/authn/image@0,25x.jpg"
related_posts:
- 2022-01-08-azure-virtual-desktop-lessons-learned.md
date: 2025-09-22 13:45 +1000
---
- this unordered seed list will be replaced by the toc
{:toc}

Here's a quick post on configuring strong authentication requirements for Azure Virtual Desktop and Windows 365 using Entra Conditional Access.

Customers may want to protect access to these virtual desktop resources because these desktops provide access to sensitive resources. For example, you could be using AVD as a protected administrator workstation or providing access to internal applications. To provide confidence that these resources are protected, strong authentication requirements are needed.

In this article, I'll walk through configuring a Conditional Acess policy that requires strong multi-factor authentication everytime these resources are accessed, to govern access to virtual desktops.

This configuration is specifically tailored for high security requirements, so I'll also demonstrate the client experience with this policy in place, along with some considerations.

## Entra Conditional Access policy details

### Assignments

To configure authentication requirements, let's create a new [Conditional Access policy](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-policies):

* **Policy name** - I've given this policy a descriptive name: **Require strong authentication for Azure Virtual Desktop and Windows 365**
* **Users** - I want to target **All Users** with this policy so that any user with access to AVD or Windows 365 is covered with strong authentication. We could exclude a break glass account in this policy; however, there may be other methods to access to Entra ID, therefore there may not be a need to exclude specific accounts.

![](/media/2025/09/ca-users.jpeg)

* **Target resources** - select **Azure Virtual Desktop** and **Windows 365**. If your tenant was previously enabled for Windows Virtual Desktop, you may see that application instead of Azure Virtual Desktop.

![](/media/2025/09/ca-targetresources.jpeg)

* **Network** - select **Any network or location**. The intention of this policy will be to require strong authentication regardless of location. The network you are connected to should not be an indicator of trust in this scenario.

![](/media/2025/09/ca-network.jpeg)

### Access controls

* **Grant** - select **Grant access**, choose **Require authentication strength** and select **Phishing-resistent MFA**, then choose **For multiple controls / Require all the selected controls**. The last setting is not necessarily required but a good practice in the event this policy is updated with additional controls.

![](/media/2025/09/ca-grant.jpeg)

* **Session** - select **Sign-in frequency** and then choose **Every time**. This will require reauthentication each time these resources are accessed and will impact end users who need to provide MFA responses.

![](/media/2025/09/ca-session.jpeg)

## User Experience

Here's a look at the end-user experience. In this demo, I'm signing into the Windows 365 web client and authenticating with a FIDO2 key for strong authentication and connecting to my Cloud PC a couple of times. You'll see that the sign-in experience is fast and simple and connecting to the Cloud PC is fast, but I am not asked for reauthentication at any time.

![](/media/2025/09/windows-app-experience.mp4)

Let's try again after a period of time - this time we can see that I am asked to re-authenticate to access my Cloud PC.

![](/media/2025/09/windows-app-reauth.mp4)

## Why No Prompts for Re-Authn?

At first glance, it might look like our policy is not working and is allowing the user to re-launch their desktop without being re-authenticated. Behind the scenes, the user still has a valid Entra ID token with a claim for strong authentication which satisfies the requirement.

![](/media/2025/09/entraid-success.jpeg)

This access still works because Entra ID tokens have a minimum lifetime of 10 mins as listed here: [Access, ID, and SAML2 token lifetime policy properties](https://learn.microsoft.com/en-us/entra/identity-platform/configurable-token-lifetimes#access-id-and-saml2-token-lifetime-policy-properties). This document covers an in-preview feature configurable token lifetimes and has an important consideration for these lifetimes:

> Reducing the Access Token Lifetime property mitigates the risk of an access token or ID token being used by a malicious actor for an extended period of time. (These tokens can't be revoked.) The trade-off is that performance is adversely affected, because the tokens have to be replaced more often.

So after 10 minutes, the lifetime expires and the user is asked to re-authenticate. For all but the most restrictive customer environments, this behaviour should be OK.

## Addressing Secure Requirements

In scenarios where the requirement for re-authentication cannot be met and access to Azure Virtual Desktop or Windows 365 needs to be protected, you could consider implementing additional requirements:

**Grant** - where you are protecting access to sensitive information and privileged access workstations, select **Require device to be marked as compliant** in addition to **Require authentication strength**. This ensures that access is only allowed from a trusted, managed device that meets Intune compliance policies.

**Session** - enable **Require token protection for sign-in sessions**. This feature can further protect from token theft, and supports the Windows App on a Windows client OS now (with macOS is preview): [Token Protection in Microsoft Entra Conditional Access](https://learn.microsoft.com/en-au/entra/identity/conditional-access/concept-token-protection).

Enabling this feature also requires you to update the policy to support only Windows, macOS, and iOS, so you may then need to block other platforms. This requirement will also prevent users from using the windows 365 web client. I also had issues getting this to work with the current Windows app on macOS (I haven't tested with a preview client).

## Improving the End-user Experience

This type of policy is typically required for highly secure environments and isn't necessarily used to support access to Azure Virtual Desktop or Windows 365 on kiosk devices. 

* Scope the policy to Entra ID administrator roles - everyone should be phishing-resistant MFA where possible, but even if you can, it's likely to be adopted in a phased approach. Start with people who have access to administrative roles who must be protected.
* Use at least password-less authentication with the Microsoft Authenticator and follow the recommended authentication scenarios from Microsoft: [Conditional Access adaptive session lifetime policies](https://learn.microsoft.com/en-au/entra/identity/conditional-access/concept-session-lifetime).
