---
layout: post
title: You Should Be Testing Intune Endpoint Privilege Management Today
description: The Endpoint Privilege Management preview is available in your Intune
  tenant and it may well become a key tool for removing administrator access from
  managed Windows PCs.
permalink: "/intune-endpoint-privilege-management/"
image:
  path: "/assets/img/road/image.jpg"
  srcset:
    1920w: "/assets/img/road/image.jpg"
    960w: "/assets/img/road/image@0,5x.jpg"
    480w: "/assets/img/road/image@0,25x.jpg"
comments: true
date: 2023-05-09 17:47 +1000
---
Microsoft recently released the preview of Endpoint Privilege Management in Microsoft Intune which is a powerful capability for removing administrative privileges from end users on managed Windows desktops. In its current preview form, it is worth considering carefully how it should be implemented.

Here’s why.
{:.lead}

The initial implementation of Endpoint Privilege Management is well thought out with the ability to require a user to add a business justification for an elevation request and monitor those elevations from within Intune. EPM has the added benefit that the client-side components are built into the operating system, so no additional agents are required.

It can be configured to require additional authentication via password or Windows Hello when elevating an application, which assists in proving identity when users are elevating to administrator.

## With great power, comes great responsibility

Intune policies for Endpoint Privilege Management provide several options for defining rules for applications that users can elevate. Rules include file hash, certificate, path, and file information – similar rules to AppLocker. You can be confident that only known authorised applications can be elevated. 

In this preview state however, it is worth noting that child processes of an application you elevate to administrator will also inherit administrator rights. This means that you could be granting more rights to the target machine that you had originally intended.

The good news is that [Microsoft is working on this](https://twitter.com/DeviceDeploy/status/1640487199668928513), so that only the specified application will be elevated and child processes will not be elevated.

## Which scenarios is Endpoint Privilege Management good for?

**Staff who require administrative access to Windows to complete tasks** – typically IT professionals or developers. EPM will allow you to remove standing administrator access and require users to elevate with a gate for business justification. In this scenario you might allow elevation of applications such as PowerShell or Visual Studio that can be used to make any change to the system; however, these users require elevation of the tools to complete their work.

Insentra is a great example of this scenario – as a professional and [managed services](https://www.insentragroup.com/au/services/) business, we have a number of consultants who need administrative access on occasions to complete tasks.

In effect, this approach should allow simpler delegation of administrative powers where users are restricted to this elevation action on an approved list of devices or desktops. Users only elevate for specific purposes, as required.

**Legacy applications that require administrative rights to run** – there’s plenty of these poorly written applications still around that could benefit from automatic elevation and no additional modification. Remember – in the preview, child processes of the elevated parent process are also elevated with administrative privileges, so be careful with what you allow to elevate.

This can create an escape hatch for gaining unauthorised privileges that were not the intention of the original rule to elevate a specific application. Consider elevating a legacy application that must run as administrator, but that application provides a way to browse the file system via an Open dialog box. A user could potentially launch PowerShell to make system changes.

During the preview period, I would recommend using EPM for this scenario carefully, unless security controls or endpoint detection and response solutions are in place (e.g., Microsoft Defender for Endpoint). 

**Ad-hoc application installs** - a common scenario would be to allow end-users or support staff to manually install specific applications. Many organisations have a long tail of applications with a small number of installed instances. Thus, it may not make practical sense to package and deploy those applications via Configuration Manager or Intune. 

Is allowing ad-hoc application installs right for your organisation? This may depend on your regulatory and compliance requirements, the types of applications used, and a decision made knowing the risks involved in allowing end-users to install software. Reporting on software inventories and actively updating installed software is still recommended.

Where possible, avoid this approach and use application packaging solutions such as Patch My PC, and create a framework for those line of business applications that aren’t yet supported by these tools.

## Wrap Up

Third parties have already been provisioning similar solutions to Endpoint Privilege Management, and while EPM will be an add-on to Intune, there a couple of benefits to the Microsoft solution:

1.	Policy controls are built into Microsoft Intune – security controls for Endpoint Privilege Management are managed along-side other OS controls including Microsoft Defender
2.	Client-side component are built into Windows 10 and Windows 11 – no agents need to be deployed, making the solution simpler to implement
Implementing a least privilege model is one of the key steps to take to protect Windows endpoints. Therefore, Endpoint Privilege Management will be beneficial to organisations of all sizes. Now is the time to evaluate EPM and understand its capabilities.
