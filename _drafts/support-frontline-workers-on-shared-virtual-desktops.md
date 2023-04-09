---
layout: post
title: Support Frontline Workers on Shared Virtual Desktops
description: "Configuring virtual desktops to supporting frontline workers using Microsoft 365 F1/F3 etc. alongside users licensed for Microsoft 365 E3/E5."
permalink: "/m365apps-frontline-workers/"
image:
  path: "/assets/img/hardhat/image.jpg"
  srcset:
    1920w: "/assets/img/hardhat/image.jpg"
    960w: "/assets/img/hardhat/image@0,5x.jpg"
    480w: "/assets/img/hardhat/image@0,25x.jpg"
comments: true
---
The [Microsoft 365 F1/F3 and Office 365 F3 licenses](https://learn.microsoft.com/en-us/microsoft-365/frontline/flw-licensing-options) are aimed at frontline workers. These licenses do not include the desktop versions of the Microsoft 365 Apps, so users with these licenses cannot run those applications.

You could create two images - one with the Microsoft 365 Apps to support licensed users and one without to support frontline users; however, the result will be less than optimal use of your VDI compute capacity by requiring more session hosts for the same number of concurrent users.

The Microsoft 365 Apps support a [viewer mode](https://learn.microsoft.com/en-us/deployoffice/overview-viewer-mode) which until recently put the applications into a view-only mode for all users on same session host. Fortunately Microsoft changed how this feature works in August 2022. For the purposes of this article, I will assume your environment is on the Microsoft 365 Apps for enterprise Semi-Annual Channel 2208 or later. This minimum version mean that only a single policy configuration is required and all supported applications work as expected.

## Supporting Frontline Workers on a Single Image

In this article, I'll show you how to deploy a configuration that will support users with mixed licenses on the same session host. This provides a targeted experience each licensed user type on a single image. The image could be multi-session Windows Server or Windows 10/11 multi-session or pooled desktops on Windows 10/11. The configuration will:

- Enable the Microsoft 365 Apps in viewer mode using Group Policy or Microsoft Intune
- Hide applications that don't behave as expected in viewer mode using FSLogix App Masking
- Implement web alternatives for these applications using Group Policy or Microsoft Intune

On the same image, users with Microsoft 365 E3/E5 licenses will have access to the full desktop application experience that those licenses entitle them for.

For the FSLogix App masking solution to work, the session hosts must be joined to Active Directory. FSLogix App Masking assignments do not yet support Azure AD joined machines.
{:.note title="Important"}

## Enable the Microsoft 365 Apps in viewer mode

The Microsoft 365 Apps in viewer mode will allow a frontline worker to view and print documents in Word, Excel, PowerPoint, Visio or Project, providing them with a familiar workflow when using a Windows desktop. To use viewer mode, the [version of the Microsoft 365 Apps for enterprise in the image must be current](https://learn.microsoft.com/en-us/officeupdates/update-history-microsoft365-apps-by-date).

Viewer mode is supported for version 1902 or later of Word, Excel, and PowerPoint, and version 2005 or later of Project and Visio. At the time of writing, the latest supported version of the Microsoft 365 Apps is 2202. Given the [recent vulnerability in Outlook](https://msrc.microsoft.com/blog/2023/03/microsoft-mitigates-outlook-elevation-of-privilege-vulnerability/), all environments should be current and be able to use viewer mode.

To optimise the solution outlined in this article, it's important to be on current version, because:

> For version 2205 and later, if viewer mode is enabled, but the user has a license for the product, such as Visio, then the user will have an activated, fully functional version of that product. The other unlicensed products on the device, such as Project, will remain in viewer mode.
{:.lead}

To enable viewer mode, use either of the following configuration settings (depending on how the session hosts are managed):

- In a Group Policy Object assigned to the organisational unit containing the target computer accounts, enable the **Use Viewer Mode** policy setting under **Computer Configuration / Policies / Administrative Templates / Microsoft Office 2016 (Machine) / Licensing Settings**
- In Intune, create a device configuration profile using the Settings Catalog, and enable **Use Viewer Mode** under **Microsoft Office 2016 (Machine) / Licensing Settings**. Assign the policy to the target devices

Once enabled, a user without a license or with the Microsoft 365 F1/F3 license will see application such as Word in viewer mode:

[![Microsoft Word in viewer mode]({{site.baseurl}}/media/2023/04/WordInViewerMode.png)]({{site.baseurl}}/media/2023/04/WordInViewerMode.png)

Microsoft Word in viewer mode.
{:.figcaption}

Viewer mode works just as expected for Word, Excel, PowerPoint, Visio and Project - a document can be viewed and printed. Viewer mode for Outlook and OneNote though don't provide an optimised experience.

Here's Outlook in viewer mode - I can view my mailbox, and even delete emails and mark them as read or unread; however, I cannot reply to emails or create new emails. Users may find this experience confusing.

[![Microsoft Outlook in viewer mode]({{site.baseurl}}/media/2023/04/OutlookInViewerMode.png)]({{site.baseurl}}/media/2023/04/OutlookInViewerMode.png)

Microsoft Outlook in viewer mode. Note that buttons in the ribbon are not greyed out.
{:.figcaption}

Here's OneNote in viewer mode - I can view my notes, and even create new note and make changes to existing notes that are synchronised; however, there are various functions such as Paste that do not work. Like Outlook, this experience may also be confusing.

[![Microsoft OneNote in viewer mode]({{site.baseurl}}/media/2023/04/OneNoteInViewerMode.png)]({{site.baseurl}}/media/2023/04/OneNoteInViewerMode.png)

Microsoft OneNote in viewer mode.
{:.figcaption}

To make the solution effective for frontline workers, we need to remove these applications from view (not from the image), which we can do with [FSLogix App Masking](https://learn.microsoft.com/en-us/fslogix/tutorial-application-rule-sets).

## Hide Microsoft Outlook and OneNote

To remove access to the desktop versions of Outlook and OneNote, FSLogix Apps Masking can be used to define these applications and hide them from the end user. I won't go into full detail here on how App Masking works, but I will provide an approach to easily create an App Masking rule set for Outlook and OneNote.

`New-MicrosoftOfficeRuleset.ps1` can be used to generate an App Masking rule set for individual applications in the Microsoft 365 Apps suite. The script is hosted on GitHub in my [fslogix](https://github.com/aaronparker/fslogix/tree/main/Rules) repository and for details on how to use the script review the [FSLogix App masking](https://stealthpuppy.com/fslogix/applicationkeys/) documentation for this script.

To use the script to generate App Masking rule sets for Outlook and OneDrive, use the following PowerShell commands on a virtual machine with a Microsoft 365 Apps for enterprise installation:

```powershell
Install-Module -Name "FSLogix.PowerShell.Rules"
.\New-MicrosoftOfficeRuleset.ps1 -SearchString "Outlook"
.\New-MicrosoftOfficeRuleset.ps1 -SearchString "OneNote"
```

Review the generated App Masking rule set and validate in a test environment before implementing in production.
{:.note}

Configure assignments on the rule set so that an Active Directory group is targeted to the rule similar to the example below. Here we are using an AD group that is also used to manage license assignments in Azure AD.

[![FSLogix App Masking assignments]({{site.baseurl}}/media/2023/04/FSLogixAssignments.png)]({{site.baseurl}}/media/2023/04/FSLogixAssignments.png)

Assignments on the App Masking rules set.
{:.figcaption}

## Implement Web Application Alternatives

At this point, frontline workers can sign into a virtual desktop and perform most tasks in the browser, but they will have access to a mix of local desktop application and web applications. To improve the user experience, we can configure specific web applications to run as [Progressive Web Apps (PWAs)](https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/ux).

Here's Outlook for the web running as a desktop application:

[![Outlook web application]({{site.baseurl}}/media/2023/04/OutlookPwa.png)]({{site.baseurl}}/media/2023/04/OutlookPwa.png)

Microsoft Outlook as a web application. The application experience is very similar to the preview of the new Outlook desktop application.
{:.figcaption}

OneNote requires a user specific URL, so adding OneNote as a web application doesn't work as intended, so I've not included it in the example approach here.
{:.note}

Web apps are added for the user with the [Configure list of force-installed Web Apps](https://learn.microsoft.com/en-us/deployedge/microsoft-edge-policies#configure-list-of-force-installed-web-apps) policy.

- In a Group Policy Object assigned to the organisational unit containing the target user accounts (or via loopback on the computer account OU), enable the **Configure list of force-installed Web Apps** policy setting under **User Configuration / Policies / Administrative Templates / Microsoft Edge**
- In Intune, create a device configuration profile using the Settings Catalog, and enable **Configure list of force-installed Web Apps (User)** under **Microsoft Edge**. Assign the policy to an Azure AD user group

Each policy accepts a JSON representation of the web apps as defined in the Microsoft documentation. Below is an example including Outlook.

```json
[
    {
        "url": "https://outlook.office.com/mail/",
        "default_launch_container": "window",
        "create_desktop_shortcut": false,
        "fallback_app_name": "Outlook",
        "custom_name": "Outlook",
        "install_as_shortcut": false
    }
]
```

Below is an example of the Start menu after the web apps have been added.

[![Start menu showing the installed web apps]({{site.baseurl}}/media/2023/04/StartMenu.png)]({{site.baseurl}}/media/2023/04/StartMenu.png)

Start menu on Windows Server 2022, showing the installed web apps including Microsoft Outlook (Outlook PWA).
{:.figcaption}

The shortcut name for Outlook will be renamed to **Outlook (PWA)** because this it what is defined in the PWA definition by Microsoft. Until Microsoft Edge 112 is released, the `custom_name` value in the JSON will not take effect. The overall experience of this solution should be improved with Edge 112.
{:.note title="Important"}

After the policy is applied, the web apps will not be created until Microsoft Edge is launched. The policy is browser specific and not tied to the OS, thus it is not read until the browser is launched.

To ensure the web apps are added after first sign-in, enable the following policy:

- In a Group Policy Object assigned to the organisational unit containing the target user accounts (or via loopback on the computer account OU), enable the **Enable startup boost** policy setting under **User Configuration / Policies / Administrative Templates / Microsoft Edge / Performance**
- In Intune, create a device configuration profile using the Settings Catalog, and enable **Enable startup boost (User)** under **Microsoft Edge / Performance**. Assign the policy to an Azure AD user group

This policy will cause several Microsoft Edge process to start at sign-in and the web apps will be created to be available soon after sign-in. If you're concerned about CPU and RAM consumption, this may be a trade-off for an improved user experience.

A successful authentication to Microsoft 365 / Azure AD is required for the Outlook web app to complete its configuration including the shortcut icon and registering as a mail handler. Authentication should occur after any instance of Edge is started and signed into.
{:.note title="Important"}

### Default Mail Handler

The Outlook web app can be set as the default mail handler. The user can choose to change their defaults from the Settings app, via a prompt in Outlook.

[![The Outlook web app asking the user to be the default main handler]({{site.baseurl}}/media/2023/04/OutlookPwaMailHandler.png)]({{site.baseurl}}/media/2023/04/OutlookPwaMailHandler.png)

The Outlook web app asking the user to be the default main handler.
{:.figcaption}

Setting this option on behalf of the user could be a challenge due to timing. It's worth testing whether the Outlook web app can be set as the default mail client after the user launches the application.

## Wrap Up

Providing frontline workers who using a Windows desktop, an application experience that is familiar will make it easier on the organisation to support these important users. Additionally, being able to optimise the delivery of mixed user personas on the same virtual desktop image will help you avoid a less than optimal use of compute resources.
