---
layout: post
title: Cross-platform Profiles with Profile Container and User Experience Virtualization
date: 2019-06-30 23:00 +1000
permalink: "/user-experience-virtualzation-profile-container/"
categories:
- Microsoft
tags:
- User Experience Virtualization
- OneDrive
- FSLogix
- Profile Container
- Virtual Desktop
---
FSLogix [Profile Container](https://docs.fslogix.com/display/20170529/Profile+Containers) has plenty of advantages in a virtual desktop environment that show a measurable improvements to end-user experience. It's important to understand what a container approach to roaming a user profile is as you consider adoption of Profile Container, now that you own the license.

Profile Container encapsulates the entirety of the user profile (i.e., everything in `C:\Users\<username>`, [except what may be excluded](https://stealthpuppy.com/fslogix-profile-containers-redirections/)) in a virtual disk. The profile is then roamed by the agent attaching the user's virtual disk to a target Windows desktop.

With this approach in mind, it's my view that the role of Profile Container is to do only the job of roaming the profile and do that well. Which of course it does.

The result is a solution that's [simple to deploy](https://www.insentra.com.au/fslogix-profile-containers-and-office-365-containers-deployment-guide/) and manage and opens up application scenarios that were previously difficult to implement in a virtual desktop. However, just as with anything in tech, it comes with a trade-off.

## Windows Profiles Version Considerations

Before I get into the trade-off, let's discuss Windows profiles. Fortunately, I don't need to get into detail here, because James has just done that. Go read this article if you're new to Windows profiles, or just need to brush up - [The history of the Windows user profile in EUC environments (1994-2019)](https://james-rankin.com/features/the-history-of-the-windows-user-profile-in-euc-environments-1994-2019/).

The short version, is there are several versions of a Windows profile and they are not backwardly compatible. Windows expects that you'll upgrade from one Windows release to the other and in that scenario, there are typically no issues with the profile upgrade.

In an enterprise environment, profiles will typically move in a forward fashion as well, but it's also likely that end-users could move between Windows versions and between Windows desktop and Windows Server. That means that IT has profile version challenges to consider, where a single Windows profile can't be used across all platforms or devices.

It is reasonable to posit that users desire and often expect consistency across their desktops and devices. To date, there's only been one Microsoft product that can roam settings between Windows versions and that is [User Experience Virtualization](https://docs.microsoft.com/en-us/windows/configuration/ue-v/uev-for-windows).

## The Profile Container Trade Off

Because a local profile is stored in the Profile Container, upgrading Windows versions will subsequently upgrade the profile including changes that don't necessarily change the profile version, such as the Start menu architecture. On a Windows 10 VM this can also include Universal Windows Platform apps.

Additionally, we don’t want to me mixing a Profile Container across Windows desktop and server for similar reasons.

## Solving the Multi-Profile and Multi-Platform Challenge

Environments supporting multiple platforms (physical, virtual, Windows desktop, Windows Server) and also needing to move between Windows versions, cross-platform preferences can be shared across these desktops and Windows versions.

Microsoft User Experience Virtualization can be configured to export and import targeted preferences for Windows and applications. Your best approach to solving the cross-platform challenge is to use UE-V to roam preferences that matter, and often that’s only a subset of the user profile.

By capturing preferences specific to an application or a set of applications, we can roam those preferences across virtual desktop platforms, profile versions and even between virtual and physical desktops. User environment tools including Microsoft Intune, Group Policy and Citrix Workspace Environment Manager can add consistent policies across sessions.

The [UE-V Template Generator](https://docs.microsoft.com/en-us/windows/configuration/ue-v/uev-working-with-custom-templates-and-the-uev-generator) is used to define application settings locations. Those templates are then registered with UE-V service along with a location to store exported user preferences.

To read more on the UE-V architecture, I recommend starting  with this document: [User Experience Virtualization (UE-V) for Windows 10 overview](https://docs.microsoft.com/en-us/windows/configuration/ue-v/uev-for-windows)

![User Experience Virtualization architecture]({{site.baseurl}}/media/2019/06/uev-archdiagram.png)

User Experience Virtualization and FSLogix Profile Container can be used together to provide the best profile experience on a virtual desktop while supporting multiple platforms, at the same time.

## Implementing UE-V with Profile Container

To implement UE-V alongside Profile Container, there are soem considerations and configuration steps:

### Determine UE-V Templates to Use

Windows 10 includes several in-box templates and additional community provided templates are available from the [User Experience Virtualization Template Gallery](https://gallery.technet.microsoft.com/site/search?f%5B0%5D.Type=RootCategory&f%5B0%5D.Value=UE-V&f%5B0%5D.Text=UE-V). These are great starting points, while additional templates or customisations can be created for your environment using the UE-V Template Generator. Typically an IT Pro with experience with packaging or application management will be able to understand UE-V templates quite quickly.

### Roaming Office and Office 365 ProPlus

Where Office 365 ProPlus is deployed, you should enable either UE-V or Office 365 for roaming of user settings. Office 365 ProPlus [roams a selection of user settings](https://docs.microsoft.com/en-us/previous-versions/office/office-2013-resource-kit/jj733593(v=office.15)#what-are-roaming-settings), some of which roam across macOS, iOS and Android as well.

The in-box templates for UE-V includes [templates for Office that define the Microsoft validated settings for Office applications](https://docs.microsoft.com/en-us/windows/configuration/ue-v/uev-synchronizing-microsoft-office-with-uev); however, consider that UE-V works on Windows only. If you support multiple operating systems, consider letting Office 365 roam Office settings.

### UE-V Modes

UE-V can roam application preferences in several modes that can be used across different desktop types to achieve our goals. This article covers these modes in detail: [Manage Administrative Backup and Restore in UE-V](https://docs.microsoft.com/en-us/windows/configuration/ue-v/uev-manage-administrative-backup-and-restore)

Individual UE-V templates can be configured with the following settings when registered on a target device:

* `Roaming` - this is the default mode in which application preferences are synchronized to all UE-V enabled devices with the corresponding template enabled
* `Backup` - UE-V backs up application settings to the configured storage location in a special Device name directory
* `BackupOnly` - Templates designated BackupOnly include settings specific to that device that should not be synchronized unless explicitly restored

The default roaming mode should be a fire-and-forget configuration where UE-V works on top of Profile Container to always import and export settings in the profile. In a non-persistent desktop, the UE-V agent will be doing this in every session; however, this approach unlocks at least a few scenarios:

* Roaming preferences for specific applications across desktop types - for example, a Windows Server 2012 desktop or published application silo and a Windows 10 virtual desktop
* Synchronising application preferences into or out of [a read-only Profile Container](https://docs.fslogix.com/display/20170529/Concurrent+User+Profile+Access)
* Roaming preferences between a hosted virtual desktop and a user's physical desktop - consistent application preferences across both desktop types!

Implementing the UE-V templates in Backup mode only will only export application preferences from the Profile Container, providing a method to restore settings as required. The restore could be used to migrate users to new versions of Windows or restore settings to a new Profile Container.

### UE-V Settings Storage Location

#### A File Server for Simplicity

UE-V must store application preferences in [a Settings Storage Location](https://docs.microsoft.com/en-us/windows/configuration/ue-v/uev-deploy-required-features#deploy-a-ue-v-settings-storage-location). In a virtual desktop environment, the Settings Storage Location will typically be [a share on a Windows file server in the same location](https://docs.microsoft.com/en-us/windows/configuration/ue-v/uev-prepare-for-deployment#performance-and-capacity-planning) as the desktops. This approach could leverage the same file server/s as the Profile Container and should be straight-forward to implement - just follow the documentation.

Replication for business continuity can be handled by [Windows Server 2019 Storage Replica](https://docs.microsoft.com/en-us/windows-server/storage/storage-replica/server-to-server-storage-replication), DFS Replication, robocopy or a 3rd party replication solution.

#### OneDrive for Business for Cross Platform Consistency

I have written previously on [using UE-V on a modern Windows 10 desktop](https://stealthpuppy.com/user-experience-virtualzation-intune/) with an approach that uses OneDrive for Business as the storage location. FSLogix Profile Container and Office 365 Container enables the native OneDrive sync client in a virtual desktop environment, so it stands to reason that we can use OneDrive for Business as a sync location for these desktops.

What's great about using OneDrive as the settings storage location is that now application preferences are not locked in the data centre and end-users have a more consistent experience across Windows everywhere. OneDrive handles synchronising preferences between different desktops, making those preferences highly-available for business continuity and removes the storage challenge associated with a file server. Because the UE-V Settings Storage Location is hosted in the Profile Container, we solve any IOPS issues that syncing to a network share may introduce.

## Summary

With the Microsoft aquisition of FSLogix, I'm expecting to see Profile Container (and Office 365 Container) just about everywhere. There's little reason for a licensed customer to not be deploying it in their virtual desktop environments.

However, there are some limitations with only roaming the user profile in a Container, in that while the user gets the best possible experience, the profile itself it not necessarily portable across platforms.

By teaming Profile Container with User Experience Virtualization, we can extract application preferences from the Container to share them across Windows versions, migrate between Profile Containers and even provide a consistent user experience across virtual and physical desktops.

While UE-V may not be as fully featured as competing solutions or perhaps as widely used, the entire stack now comes from Microsoft. That means no additional software licensing cost to improve the experience of user preferences across all of your Windows desktops.
