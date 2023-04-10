---
layout: post
title: Deploy a Single Microsoft 365 Apps Package Everywhere All At Once
description: Viewer mode the Microsoft 365 Apps for enterprise will enable you to deploy a single package without needing seperate packages for Visio and Project, simplifying management.
permalink: "/m365apps-single-package/"
image:
  path: "/assets/img/single/image.jpg"
  srcset:
    1920w: "/assets/img/single/image.jpg"
    960w: "/assets/img/single/image@0,5x.jpg"
    480w: "/assets/img/single/image@0,25x.jpg"
comments: true
date: 2023-04-10 23:07 +1000
---
- this unordered seed list will be replaced by the toc
{:toc}

Viewer mode for the Microsoft 365 Apps for enterprise enables support for users without Microsoft 365 or Office 365 licenses to use those applications in a read-only mode. This feature is [useful for frontline workers](https://stealthpuppy.com/m365apps-frontline-workers/), but viewer mode is also an opportunity to optimise how you deploy and update the Microsoft 365 Apps.

With currently supported releases of the Microsoft 365 Apps, viewer mode can help you simplify the deployment and management of these applications across physical and virtual desktops.

In many organisations, packages for Microsoft Project and Visio may be deployed separately to the core Microsoft 365 Apps. Typically only deployed to devices for the user who is licensed, or installed on a shared virtual desktop with access to the applications managed with FSLogix App Masking.

Viewer mode now means that you can deploy a single Microsoft 365 Apps package including Project and Visio to all devices and enable viewer mode by default. Licensed users will be able to use a fully activated copy of the applications with full functionality, while unlicensed users will use viewer mode.

No need for seperate packages, allowing users to install on-demand, targeted installs via device groups, or having to configure FSLogix App Masking to remove the applications from unlicensed users. If someone without a license needs to view and print a Word document they can. If another user needs to review a Visio document or project plan, but doesn't have a license for Visio or Project, they can do that too.
{:.note title="Consider this"}

## Viewer Mode

Microsoft introduced [viewer mode in the Microsoft 365 Apps](https://learn.microsoft.com/en-us/deployoffice/overview-viewer-mode) with the 1902 release, and expanded support for apps that support viewer mode with the 2005 release.

Viewer mode is supported for version 1902 or later of Word, Excel, and PowerPoint, and version 2005 or later of Project and Visio. At the time of writing, the latest supported version of the Microsoft 365 Apps is 2202. Given the [recent vulnerability in Outlook](https://msrc.microsoft.com/blog/2023/03/microsoft-mitigates-outlook-elevation-of-privilege-vulnerability/), all environments should be current and be able to use viewer mode.

To optimise the solution outlined in this article, it is important to have deployed a current version of the Microsoft 365 Apps, because:

> (For Version 2205 and later) If viewer mode is enabled, but the user has a license for the product, such as Visio, then the user will have an activated, fully functional version of that product. The other unlicensed products on the device, such as Project, will remain in viewer mode.
{:.lead}

To enable viewer mode, use either of the following configuration settings, depending on how you manage PCs or virtual desktops:

- In a Group Policy Object assigned to the organisational unit containing the target computer accounts, enable the **Use Viewer Mode** policy setting under **Computer Configuration / Policies / Administrative Templates / Microsoft Office 2016 (Machine) / Licensing Settings**
- In Microsoft Intune, create a device configuration profile using the Settings Catalog, and enable **Use Viewer Mode** under **Microsoft Office 2016 (Machine) / Licensing Settings**. Assign the policy to the target devices

If your environment is running version 2208 or above, and it should be, this is the only policy to configure. With the policy in place, here's a couple of examples of the user experience when running unlicensed applications. Here's the Microsoft 365 Apps on a Windows Server Remote Desktop Session Host:

[![Project in viewer mode on Windows Server 2022]({{site.baseurl}}/media/2023/04/Windows2022Microsoft365Apps.png)]({{site.baseurl}}/media/2023/04/Windows2022Microsoft365Apps.png)

Project in viewer mode, and Word, Excel, and PowerPoint in full licensed mode on Windows Server 2022.
{:.figcaption}

And here's a similar experience on a Windows 11 PC:

[![Project in viewer mode on Windows 11]({{site.baseurl}}/media/2023/04/Windows11Microsoft365Apps.png)]({{site.baseurl}}/media/2023/04/Windows11Microsoft365Apps.png)

Project in viewer mode, and Word in full licensed mode on Windows 11.
{:.figcaption}

With this policy in place on any device type, you can now manage a single package with any mix of licensed and unlicensed users. **In fact, I think this approach works so well, this policy setting should be enabled by default**.
{:.note title="Consider this"}

## What about Access

There is one application that could force you to deploy multiple packages - Microsoft Access. There are a few approaches you could take managing access to Access.

1. Don't include Access in your package - hopefully the default for most environments
2. Create a default package without access (or with the Access Runtime) if you need it, and a seperate package that includes Access. I'm assuming that Access is required on a small number of machines, so it shouldn't be to difficult to maintain two packages. This would be the simplest approach for physical PCs
3. Include Access in your single Microsoft 365 Apps package and use FSLogix App Masking to control who can use Access. This approach would be needed for virtual desktops, but could also be used for virtual desktops

### FSLogix App Masking for Access

To create an FSLogix Apps Masking rule set for Access, the rule set can define the minimum components for Access, including the Access shortcut and `MSACCESS.EXE`. Creation of the rule set can be simplified with `New-MicrosoftOfficeRuleset.ps1`. I won't go into full detail here on how App Masking works, but I will provide an approach to easily create an App Masking rule set for Access.

The `New-MicrosoftOfficeRuleset.ps1` script is hosted on GitHub in my [fslogix](https://github.com/aaronparker/fslogix/tree/main/Rules) repository and for details on how to use the script review the [FSLogix App masking](https://stealthpuppy.com/fslogix/applicationkeys/) documentation.

To use the script to generate App Masking rule set for Access, use the following PowerShell commands on a virtual machine with a Microsoft 365 Apps for enterprise installation:

```powershell
Install-Module -Name "FSLogix.PowerShell.Rules"
.\New-MicrosoftOfficeRuleset.ps1 -SearchString "Access"
```

Review the generated App Masking rule set and validate in a test environment before implementing in production. The generated rule set will include a bunch of registry keys below `HKLM\SOFTWARE\Classes\CSLID` and other registry items that do not relate to Access that should be removed before deployment.
{:.note title="Important"}

## Wrap Up

Providing a view or read-only mode for the Microsoft Office or Microsoft 365 Apps is not new, but a common challenge. Although not without some specific challenges (see [here re:Outlook and OneNote](https://stealthpuppy.com/m365apps-frontline-workers/#enable-the-microsoft-365-apps-in-viewer-mode)), viewer mode for the Microsoft 365 Apps now makes it much easier to deploy the Microsoft 356 Apps.

For many organisations, or at least the majority of corporate Windows desktops, a one size fits all approach deployment is now possible.
