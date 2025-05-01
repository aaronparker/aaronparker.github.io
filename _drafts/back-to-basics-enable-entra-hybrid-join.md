---
layout: post
title: 'Back to Basics: Enable Entra Hybrid Join'
description: 'Active Directory joined devices should also be joined to Entra ID to create device identities and enable single sign-on.'
permalink: "/enable-entra-hybrid-join/"
image:
  path: "/assets/img/hybrid/image.jpg"
  srcset:
    1920w: "/assets/img/hybrid/image.jpg"
    960w: "/assets/img/hybrid/image@0,5x.jpg"
    480w: "/assets/img/hybrid/image@0,25x.jpg"
comments: true
---
- this unordered seed list will be replaced by the toc
{:toc}

A VDI topic I still see with surprising regularity, is a question of why single sign on into common applications including OneDrive and Outlook is not working as expected. The short answer is often that the virtual desktop is not Entra hybrid joined. This article is a deep dive into the long answer.

Enabling Entra hybrid join creates a device identity in Entra ID in addition to  Active Directory enabling single sign-on into Entra ID authenticated applications. It's the best option available for a seamless user experience wih devices joined to AD.

An Entra hybrid join device identity allows you to target this device state in Conditional Access policies for more control of authentication requirements including how often users see MFA prompts.

## What's the Issue

Consider the following scenario:

* Users authenticate to their virtual desktop environment, which could be via Entra ID including multi-factor authentication
* Users sign into a virtual desktop and opens Outlook to access their email hosted in Microsoft 365
* Users are prompted for authentication, which could consist of entering their email address and password, or re-entering their password
* Users may also need access to OneDrive locally, but this client doesn't sign in until the user opens the OneDrive client and follows the authentication wizard
* That authentication persists between sessions, but they may be re-prompted for authentication every so often

Not the best user experience. The scenario should play out like this:

* Sign into the virtual desktop workspace via Entra ID
* Sign into a virtual desktop
* Open Outlook which goes straight to the user's mailbox without additional prompts
* The OneDrive client automatically signs in and redirects Documents, Desktop, Pictures etc.
* This experience is consistent between sessions and users never see additional authentication prompts from within the virtual desktop

This issue of single sign-on failing or users being prompted to sign into their applications, particularly on virtual desktops, comes up often in discussions with customers and on forums. Enabling Entra hybrid join is a simple fix, but this feature doesn't appear to be well understood.

## What's The Fix

The fix is of course to enable Entra hybrid join on your virtual desktops (and physical). Let's dig into why enabling Entra hybrid join is important.


To fix this issue the correct solution is to enable Entra hybrid join (EHJ). No special Entra ID licensing is required, and enabling EHJ should be done even when third party IdP's are in play (e.g., Okta).

Entra hybrid join is a state where a Windows device is joined to both Active Directory and Azure Active Directory (so this is different to Entra ID join).

Without Entra hybrid join (EHJ) enabled for these desktops, there is no method for a user signing into Active Directory to get single sign on into Azure Active Directory. Entra hybrid join provides the user a Primary Refresh Token which is the key to getting single sign-on to Entra ID.

We should ensure that enabling EHJ is a requirement in our pre-engagement checklists.

Most VDI environments haven't been integrated with solutions that require EHJ previously (e.g., Intune, ConfigMgr, Windows Hello, Azure Virtual Desktop etc.) thus EHJ won't have been enabled. EHJ is become more common place, but there are environments where it still hasn't been enabled.

Note: customers might have Entra ID Seamless Single Sign-on (SSSO) enabled instead, but customers should be actively removing Entra ID SSSO and using EHJ. More on that in another post.

## The Background

Here is a list of the key articles on the concept of Entra hybrid join:

Read details on Entra hybrid join:

Entra hybrid joined devicesHow it works: Device registrationTroubleshoot hybrid Entra ID-joined devicesIt is worth understanding what the Primary Refresh Token is and what it does: What is a Primary Refresh Token?

A Primary Refresh Token (PRT) is a key artifact of Entra ID authentication on Windows 10 or newer, Windows Server 2016 and later versions, iOS, and Android devices. It's a JSON Web Token (JWT) specially issued to Microsoft first party token brokers to enable single sign-on (SSO) across the applications used on those devices.




Here's the second post in my identity series (I'll create a wiki later to consolidate these).

Entra Seamless Single Sign-on (SSSO) typically not managed in the way that Microsoft recommends and is now no longer needed, so we should be recommending to customers that they actively remove this feature.

What's wrong with Entra SSSO? There are 3 basic issues with SSSO:

It's typically not managed correctly
There are methods of attack against this sign-in method
It's not used when Entra hybrid join is enabled (Entra joined machines also don't use it) 

The Required Management Task Is Often Missed

The key management task that needs to be regularly completed for SSSO is rolling over the Kerberos decryption key. Microsoft recommends that this key is rolled over every 30 days; however, in most environments, this task won't be actively completed.

In our own environment, we can see that the decryption key has not been rolled over for some time:



Leveraging Entra Seamless Single Sign-on  for Attack

Linked below are a couple of articles that are highly worth reading and referencing for flaws or attack paths in SSSO:

Undetected Azure Active Directory Brute-Force Attacks - it is still possible to perform brute force attacks against SSSO; however, Microsoft recommend ensuring that Smart Lockout is enabled
Entra ID SSSO - Entra ID Kerberos Tickets: Pivoting to the Cloud - this article covers a method of abusing the Kerberos decryption key to gain access to an Entra ID tenant

The Fix

If SSSO can't be removed (or the customer doesn't want to remove it), then rolling over the decryption key must be done. Additionally, Entra ID Smart Lockout should be enabled. Additionally, monitoring the environment with Microsoft Defender for Identity will assist in detecting and thwarting attacks.

However, the better approach is to remove Entra ID Seamless Single Sign-on from the environment completely. SSSO is only needed for a downlevel OS (i.e. unsupported Windows versions) and is not used when Entra hybrid join is enabled. If the customer has enabled Entra hybrid join for their desktops (and they should) and has removed unsupported operating systems from their desktop fleet, they should remove SSSO.

How to remove SSSO

Validate that Entra hybrid join is enabled for devices where users sign into Entra ID applications (i.e. physical and virtual desktops)
If needed, review domain controller logs for SSSO usage: Domain controller logs
Run Entra ID Connect to remove Entra ID Seamless Single Sign-on or use PowerShell: Disable Seamless SSO for each Active Directory forest
Delete the AZUREADSSOACC computer account in the domain if it still exists
