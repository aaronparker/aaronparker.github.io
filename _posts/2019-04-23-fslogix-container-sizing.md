---
layout: post
title: A Practical Guide to FSLogix Containers Capacity Planning and Maintenance
permalink: "/fslogix-containers-capacity/"
categories:
- Microsoft
tags:
- FSLogix
date: 2019-04-23 20:40 +1000
---
A container approach to profiles in your virtual desktop environment means you're going to deal with additional storage requirements that you likely haven't had previously. Profile containers have gone mainstream with [the Microsoft acquisition of FSLogix](https://www.brianmadden.com/opinion/Microsoft-FSLogix-free-to-all-customers), making Profile Container and Office 365 Container available practically everyone.

This article sets out approaches and considerations for keeping profile sizes in check to help avoid storage capacity headaches.

## Why Containers

A profile container (Profile Container or Office 365 Container) will capture the user's entire profile in a virtual disk and attach the disk to their target VM making the entire profile available at login. This enhances user experience by improving performance and enables applications or features that are challenging with traditional approaches.

Containers do this in several ways:

* Improves performance by reducing the IO to the file server hosting user profiles
* Enables application features that don't work well in virtualised and non-persistent desktop environments by fooling applications into seeing the profile on a local disk
* Simplifies administration because we no longer need to deal with setting a full list of inclusions and exclusions for profile roaming

This is a different approach to traditional profile management. Consider Citrix Profile Management where we attempt to manage the smallest profile possible to strive for consistent login speeds by redirecting user folders to the network and set a complex set of include and exclude locations to simulate a persistent desktop experience. Additionally, we may have implementing specific configurations to keep profile sizes small, most of which involve redirecting folders to the network.

## Managing Profile Size

The role of the FSLogix agent and the container is to be transparent to applications running in the user session. The agent makes no changes to those applications and instead ensures those applications operate just as they do on a physical PC. This means that you must use application features or other external approaches to reduce their impact on the size of profile.

### Setting Container Size

Take a look at your own profile size on a physical PC and it will provide an indication as to how large containers can be.

For Windows 10 or Windows Server 2016, and with no additional optimisation, the Profile Container can start at 400 MB and will often be higher. The container will then grow as it is used, but it does not actively reduce in size unless [the disk is compacted](https://www.altaro.com/hyper-v/compact-hyper-v-virtual-disks-vhdx/).

FSLogix Profile Containers and Office 365 Containers are dynamic VHDX files that will grow to a maximum default size of 30 GB. You should size appropriately for your environment and as such, it's worth understanding the size of your existing profiles as well as estimating the amount of additional profile data that will be stored in the container.

It may be tempting to set a lower maximum size of the container; however, I recommend against this as this approach will only artificially restrict the size of the profile. If the container fills, applications will not handle the lack of available space gracefully. This will cause a support call and potentially data loss.

### Concurrent Access and Multiple Sessions

Profile Container supports [concurrent access and sessions](https://docs.fslogix.com/display/20170529/Concurrent+User+Profile+Access) with the ability to merge changes back into the primary container. While you still have to deal with last-write-wins, you will need to take into account additional storage capacity while multiple concurrent sessions are running.

![Profile Container with a Read/Write container]({{site.baseurl}}/media/2019/04/ProfileContainer-ConcurrentRW.PNG)

Office 365 Container also supports [concurrent access and sessions](https://docs.fslogix.com/display/20170529/Concurrent+Office+365+Container+Access); however, once Outlook cached-mode is enabled, merging a read-write copy back into the primary container is not supported. You must then configure concurrent access per-session containers, where a container is created for each session. The concurrent access per-session containers are named `ODFC-%username%-SESSION-<sessionnumber>.VHD(X)` where sessionnumber is an integer from 0 - 9. `NumSessionVHDsToKeep` defines the number of session containers to keep (default is 2), which can result in, for example, keeping two Office 365 Containers while discarding the third at logoff.

If concurrent access per-session containers are enabled, plan for storage capacity to handle multiple Office 365 Containers taking into account the number of containers that will be kept and those to be discarded.

### Profile Container Exclusions

FSLogix Profile Container supports [a folder exclusion feature](https://docs.fslogix.com/display/20170529/Controlling+the+Content+of+the+Profile+Container) where a set of target folders will end up on the real file system of the VM and thus won't be captured in the virtual disk. The default folders include Temp (`AppData\Local\Temp`) and the Internet Explorer cache folder (`AppData\Local\Microsoft\Windows\INetCache`).

During a user session, you'll see the user profile folder (e.g., `C:\Users\aaron`) that is a link to the container and a *Local_* folder (e.g., `C:\Users\local_aaron`) where those folders listed in `redirections.xml` are written to the file system. At logoff, the `C:\Users\local_aaron` folder is lazily deleted by the FSLogix service, thus we don't maintain copies of profile data we don't need.

You likely have a list of folders that can be added as additional exclusions. Add these to the `redirections.xml` file that is copied to the container from a central source at user login. Folders to add to `redirections.xml` will include application caches (e.g., cache folders for Google Chrome) or folders where the application is storing large amounts of data (e.g., log folders).

Here's a recent article (in German) that includes an aggressive list of paths in a sample `redirections.xml` - [FSLogix in a Citrix Provisioning Environment](https://www.sul.de/2019/04/05/fslogix-in-a-citrix-provisioning-environment/). While the article includes a good set of paths, some of them could negatively impact user experience.

As always, understand your applications and test before implementing in production.

### Prune the Profile

Not all profile locations are candidates for `redirections.xml`. Consider history and cookie folders that would negatively impact user experience if they were not maintained across sessions. In this case, we can run regular maintenance on additional folder locations inside the profile to keep the size in check. This approach won't directly reduce the size of the profile per se, but will assist in containing growth.

I've written [a PowerShell script](https://github.com/aaronparker/FSLogix/tree/master/Profile-Cleanup) - `Remove-ProfileData.ps1`, that can prune or delete a set of target files and folders. The script [reads an XML file](https://github.com/aaronparker/FSLogix/blob/master/Profile-Cleanup/targets.xml) that defines a list of files and folders to remove from the profile.

Actions on a target path can be:

* **Prune** - the XML can include a number that defines the age in days for last write that the file must be older than to be deleted
* **Delete** - the target directory will be deleted. The Delete action will delete the entire folder and sub-folders
* **Trim** - where the target path contains sub-folders, this action will remove all sub-folders except for the most recent. This approach is implemented to clean up applications such as GoToMeeting that can store multiple versions in the profile

The script supports `-WhatIf` and `-Verbose` output and returns a list of files removed from the profile. Add `-Verbose` will output the total size of files removed from the user profile and processing time at the end of the script. All targets (files / folders) that are deleted, will be logged to a file. Deleting files from the profile can result in data loss, so testing is advised and the use of `-Confirm:$false` is required for the script perform a delete. To prune the profile, run the script as a logoff action.

A word of caution - **this script is unsupported**. If you would like to help improve the script, pull requests are welcome.

#### Avanite WebData Control

Avanite has an interesting approach for history, cookie and cache folders for the most common browsers that are running in enterprise virtual desktops - [Avanite WebData Control](https://www.avanite.com/pages/webdata-control). Avanite provides an analysis tool that will give you an idea of the amount of capacity to be saved by WebData Control:

[![Avanite WebControl report window]({{site.baseurl}}/media/2019/04/AvanitWebControlReport.PNG)]({{site.baseurl}}/media/2019/04/AvanitWebControlReport.PNG)

While their marketing pushes the benefits of solution to improve login times, this should be largely irrelevant with Profile Container, because profile data is not copied across the network at login. _I've not yet tested WebData Control with Profile Container_, so I can't speak to it's effectiveness or compatibility yet, but I don't see why it wouldn't work.

## Office 365 Considerations

Whether you're using Profile Container alone or Office 365 Container as well, or Office 365 Container with an existing profile management solution, capacity planning is required for a successful deployment.

### Outlook

Cached Exchange Mode in Outlook provides the user with the best possible experience and can be enabled without resorting to unsupported workarounds that result in corrupt OST files (this includes PST files).

The Outlook cache is stored in `AppData\Local\Microsoft\Outlook` and includes the OST file we're familiar with as well as the NST file used to cache Outlook Groups.

[![Microsoft Outlook cache folder showing the OST and NST files]({{site.baseurl}}/media/2019/04/MicrosoftOutlookCacheFolder.PNG)]({{site.baseurl}}/media/2019/04/MicrosoftOutlookCacheFolder.PNG)

The primary configuration task here is to configure the amount of email to be downloaded. Assuming Outlook 2013 and above, the slider defines the age of the content in the mailbox that Outlook should be cached. This setting can be configured as a default using [the Office Customization /Deployment Tool](https://stealthpuppy.com/office-2013-customization/) or via Group Policy.

![Microsoft Outlook cache slider]({{site.baseurl}}/media/2019/04/OutlookCacheSlider.PNG)

Start with lowest amount possible and work up depending on user requirements. 3-months is common; however, some users live in Outlook and may need a larger cache. Use multiple GPOs to target different cache settings to different user groups.

Microsoft provides further detail and considerations, including configuration options for Cached Exchange Mode in the documentation - [Plan and configure Cached Exchange Mode in Outlook 2016 for Windows](https://docs.microsoft.com/en-us/exchange/outlook/cached-exchange-mode). Here's a few key takeaways:

1. The maximum default size of an OST file is 50 GB. The default mailbox size for Office 365 E3 and E5 plans is 100 GB.
2. Upgrading from an earlier version of Outlook to 2016 or above will create a new optimised OST file but will not remove the previous OST file
3. An OST file will be 50-80% larger than what is stored in the mailbox

    > When you use Cached Exchange Mode, be aware that users' local .ost files are 50 percent to 80 percent larger than the mailbox size reported in Exchange Server. The format that Outlook uses to store data locally for Cached Exchange Mode is less space-efficient than the server data file format.

4. Shared folders (such as delegated access) are cached as well, which will impact sizing
5. Consider the Offline Address Book in sizing as well. Larger organisations could have quite large OABs

Some additional points to note:

1. Outlook cache files can be stored in either the Profile Container or the Office 365 Container. While the choice of container doesn't impact capacity sizing, placing the Outlook cache in the Office 365 Container reduces capacity needed for Profile Container backup
2. FSLogix has a script that can delete orphaned OST files - `Remove-FslOldOstFile.ps1`, [hosted on GitHub](https://github.com/FSLogix/Remove-FslOldOstFile)
3. Archiving can reduce the size of the user's mailbox, but [archive mailboxes are accessed in online mode only](https://docs.microsoft.com/en-us/exchange/policy-and-compliance/in-place-archiving/in-place-archiving?view=exchserver-2019)
4. [Retention policies](https://docs.microsoft.com/en-au/exchange/security-and-compliance/messaging-records-management/default-retention-policy) can also help keep mailbox sizes down
5. *Outlook on the web* could be an option for some of your users. I've been testing out the new Outlook experience instead of running the desktop application for a couple of weeks and am finding it to be extremely capable. Outlook on the web is even [receiving updates before the desktop version](https://techcommunity.microsoft.com/t5/Outlook-Blog/Save-time-with-intelligence-that-works-for-you-in-Outlook-on-the/ba-p/386950)

### OneDrive for Business

FSLogix Containers supports the native OneDrive for Business client in a non-persistent desktop. This provides the user with their sync folder as well as synchronised SharePoint Document libraries. Combined with [Known Folder Move](https://docs.microsoft.com/en-us/onedrive/redirect-known-folders) enabling OneDrive with Containers helps eliminate folder redirection to the network and provides a consistent experience across virtual and physical desktops.

There are several things to consider for capacity planning with deploying OneDrive for Business

1. Users receive a [1 TB allowance for OneDrive](https://docs.microsoft.com/en-us/office365/servicedescriptions/onedrive-for-business-service-description) by default
2. It may be advantageous to [block specific file types](https://docs.microsoft.com/en-us/onedrive/block-file-types) so that users can't sync ISO files for example. This won't stop users from attempting to copy large files into the sync folder, but it will prevent these files being synchronised from a physical PC into OneDrive in a virtual desktop
3. OneDrive [Files On-Demand](https://support.office.com/en-us/article/save-disk-space-with-onedrive-files-on-demand-for-windows-10-0e6860d3-d9f3-4971-b321-7092438fb38e) will reduce the capacity used in the Container; however, this feature relies on an NTFS attribute introduced in Windows 10 1709. Windows Server 2016 is version 1607, therefore Files On-Demand is not available in Windows Server 2016. It does work under Windows Server 2019
4. Files On-Demand [states can be set](https://docs.microsoft.com/en-us/onedrive/files-on-demand-mac) with the `attrib` command on Windows. A script can be used to set these states in bulk inside the user's sync folder
5. Group Policy can be used to [set the maximum size of a user's OneDrive that can download automatically](https://docs.microsoft.com/en-us/onedrive/use-group-policy#set-the-maximum-size-of-a-users-onedrive-that-can-download-automatically). Where Files On-Demand is unavailable, configure this setting so that the user will be prompted to choose the folders they want to sync before the OneDrive sync client (OneDrive.exe) downloads the files. This setting won't assist with growth after the fact though
6. The OneDrive client is installed in the user profile (`AppData\Local\Microsoft\OneDrive`). A [per-machine installation is in preview](https://docs.microsoft.com/en-us/OneDrive/per-machine-installation)

Additional deployment information is also available here: [OneDrive guide for enterprises](https://docs.microsoft.com/en-us/onedrive/plan-onedrive-enterprise)

### Teams

Microsoft Teams is gradually replacing Skype for Business. Citrix even has [a tech preview available for optimising Teams in a virtualised desktop environment](https://www.citrix.com/blogs/2019/03/19/citrix-and-microsoft-team-up-to-improve-intelligent-communications/).

If you're not using it now, you'll have to support it soon and this is exactly what FSLogix Containers can do; however, [Microsoft Teams installs in the user profile](https://james-rankin.com/articles/microsoft-teams-on-citrix-xenapp/), so we need to account for the capacity requirement.

[![Microsoft Teams in the user profile]({{site.baseurl}}/media/2019/04/MicrosoftTeamsUserProfileFolder.PNG)]({{site.baseurl}}/media/2019/04/MicrosoftTeamsUserProfileFolder.PNG)

The [Microsoft Teams deployment documentation](https://docs.microsoft.com/en-us/microsoftteams/msi-deployment) recommends _3 GB for Teams, per-user_. Hopefully, this should be an outlier - my Teams folder is currently 543 MB.

Microsoft Teams is built on [Electron](https://electronjs.org/) and uses Squirrel to manage updates. Squirrel's tag line is "It's like ClickOnce but Works™" - obviously the team didn't consider non-persistent desktop environment when building it.

While Microsoft has previously delivered [a per-machine installer for Teams](https://docs.microsoft.com/en-us/microsoftteams/msi-deployment), it doesn't actually run the application from `Program Files`. Instead it delivers the per-user install when a user logs into the machine.

Why did Microsoft build Teams on Electron? The ability to iterate faster, especially across platforms. Having said that, Microsoft has been successful in delivering fast, per-machine updates with Office 365 ProPlus, so there's no reason they can't do the same with Teams.

## 3rd Party Apps

The number of applications built on Electron or other platforms that install into the user profile is increasing. Just to give you a little scare - here's [a list of 761 apps built using Electron](https://electronjs.org/apps) that users could potentially install into their Profile Container. Application whitelisting can ensure that users can't install unauthorised apps, but whitelisting is not easy.

## Container Maintenance

Container maintenance tasks will include resizing and shrinking the container virtual disks. While shrinking the virtual disks can be a key task for managing capacity, I would recommend to do what you can to avoid having to resize the containers. The information and recommendations in this article will assist with achieving that goal.

The FSLogix team provide scripts for container management including resizing and shrinking the disks available here: [FSLogix Miscellaneous-Scripts](https://github.com/FSLogix/Miscellaneous-Scripts)

Note, that to complete the maintenance tasks, the containers can't be in use. They must be detached from the VM and thus the user must be logged off.

### Storage

Consider regularly monitoring storage capacity. If you are using the containers on Windows File Servers, File Server Resource Manager includes [Storage Reports](https://docs.microsoft.com/en-au/windows-server/storage/fsrm/storage-reports-management) that can be scheduled.

[Windows Admin Center](https://docs.microsoft.com/en-us/windows-server/manage/windows-admin-center/overview) includes System Insights that provides [storage consumption forecasting overview](https://docs.microsoft.com/en-us/windows-server/manage/system-insights/understanding-capabilities), ideal for estimating future consumption. Windows Admin Center is the future of Windows Server management tools and is highly recommended.

[![Windows Admin Center Storage Consumption forecasting]({{site.baseurl}}/media/2019/04/WindowsAdminCenterStorageConsumptionForecasting.png)]({{site.baseurl}}/media/2019/04/WindowsAdminCenterStorageConsumptionForecasting.png)

## Summary

In this article, I've covered a set of approaches and considerations to capacity planning and maintenance for FSLogix Profile Containers and Office 365 Containers.

When testing or planning for a deployment, you'll need to consider sizing requirements that will be unique to your target environment; however, I've outlined a set of recommendations that will likely apply to all.

Ensure that you test as many scenarios as you can and understand the applications that will be deployed into the virtual desktops. Container capacity management is primarily about managing the applications above the container, rather than the containers themselves.