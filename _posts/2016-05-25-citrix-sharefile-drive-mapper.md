---

title: Hands On with the Citrix ShareFile Drive Mapper
date: 2016-05-25T02:43:59+10:00
author: Aaron Parker
layout: post

permalink: /citrix-sharefile-drive-mapper/
enclosure:
  - |
    {{site.baseurl}}/media/2016/05/ShareFileDriveMapperBrowsing.mp4
    2446669
    video/mp4
    
  - |
    {{site.baseurl}}/media/2016/05/ShareFileDriveMapperBrowsing.webm
    0
    video/webm
    
  - |
    {{site.baseurl}}/media/2016/05/ShareFileDriveRightClick.mp4
    538743
    video/mp4
    
  - |
    {{site.baseurl}}/media/2016/05/ShareFileDriveRightClick.webm
    0
    video/webm
image: /media/2016/05/2749278085_ab1b43f2d9_o.jpg
categories:
  - Citrix
tags:
  - Citrix
  - ShareFile
---
[Citrix recently](https://www.citrix.com/blogs/2016/05/20/drive-mapper-optimize-your-sharefile-investment/) made the ShareFile Drive Mapper tool available for mapping a drive letter into your ShareFile data available on Windows clients. This is an interesting approach to providing access to ShareFile data which changes the data access approach from sync to on-demand.

In this article, I'll provide an overview of the installation, configuration and how the client works. I've tested version 3.2.112.0 of the Drive Mapper on Windows 10 64-bit (build 14342).

Note that this article has been written from what I can gather by installing and testing the client into a local Windows virtual machine. This is my interpretation which could be flawed.

## Using the Drive Mapper

When starting the Drive Mapper the user is prompted for their ShareFile credentials. If the ShareFile administrator has not enabled the Drive Mapper, the user might see a message telling them they're not authorised to run the client.

![ShareFile Drive Mapper login]({{site.baseurl}}/media/2016/05/ShareFileLogin2Failed.png)

Once logged in, a drive mapped to the user's ShareFile data with an icon overlay, can be accessed from Explorer. An administrator also has the option to map into a local folder rather than a drive letter.

![ShareFile Drive in Explorer]({{site.baseurl}}/media/2016/05/ShareFileDriveMyComputer.png)

The client supports ShareFile links via the right-click menu:

![ShareFile Drive Mapper right click options]({{site.baseurl}}/media/2016/05/ShareFileDriveMapperRightClickShare.png)

From a user perspective, accessing data is consistent and familiar.

![ShareFile Drive top folder]({{site.baseurl}}/media/2016/05/ShareFileDriveTopFolder.png)

If I access a folder to a Connector location, I am prompted for authentication, which is then cached. With federation and SSO, you could remove the need for the user to authenticate multiple times - once for the initial logon and then this authentication prompt.

![Authenticating to a Connector location]({{site.baseurl}}/media/2016/05/DriveMapper-Connector.png)

Simple enough, so far and the user experience is much as I would expect. Let's look a bit deeper.

## Enabling the Citrix ShareFile Drive Mapper

This client won't be enabled by default within ShareFile. Before installing on a client PC, enable in the Admin section in the ShareFile website under _Admin / Power Tools_:

![Enabling the ShareFile Driver Mapper]({{site.baseurl}}/media/2016/05/ShareFileAdminEnableDriveMapper.png)

## Installation

The Drive Mapper tool is [available from the Citrix Download site](https://www.citrix.com/downloads/sharefile/clients-and-plug-ins/sharefile-drive-mapper.html) and is available in an EXE, 32-bit MSI or 64-bit MSI. In addition, you can download the policy definitions; however, these are included in each client install as well.

Some [documentation is available](https://www.citrix.com/content/dam/citrix/en_us/documents/downloads/sharefile/Drive-Mapper-3.2-release-notes.pdf), but the installation and configuration is very straightforward. If using the EXE installer, you can perform a silent install with command line options (the MSI should of course support that natively).

![Share File Drive Mapper Installer switches]({{site.baseurl}}/media/2016/05/ShareFileDriveMapperInstaller.png)

The Drive Mapper does install a driver, which unfortunately is not yet signed for the WHQL.

![Citrix ShareFile Driver]({{site.baseurl}}/media/2016/05/ShareFileDriver.png)

Hopefully, this changes because this presents a road bump for automated installations.

## The ShareFile Drive Mapper Client

The ShareFile Drive Mapper client is made up of two main components of interest - the ShareFileDriveMapper.exe executable and a filter driver.

![Citrix ShareFile Drive Mapper Binaries]({{site.baseurl}}/media/2016/05/ShareFileDriveMapperBinaries.png)

[The filter driver](https://msdn.microsoft.com/en-us/library/windows/hardware/ff541610%28v=vs.85%29.aspx) is a [legacy filter driver, rather than a minifilter driver](https://blogs.msdn.microsoft.com/ntdebugging/2013/03/25/understanding-file-system-minifilter-and-legacy-filter-load-order/). I assume the reason for this is that you need to [request an altitude for minifilters from Microsoft](https://msdn.microsoft.com/en-us/library/windows/hardware/dn508284(v=vs.85).aspx), so perhaps in this initial version, Citrix has decided to make this tool available without having delays due to Microsoft processes (similar to the lack of WHQL certification).

![Showing loaded filter drivers and the ShareFile filter driver]({{site.baseurl}}/media/2016/05/ShareFileFilterDriver.png)

The ShareFileDriveMapper executable then provides the user interface. If this executable is not running, the drive does disappear from Explorer, so something to watch out for.

### Client Settings

The client provides a number of settings to the user including setting the drive letter used, the cache size, clearing the local cache and file link expiration policy.

![ShareFile Driver Mapper settings]({{site.baseurl}}/media/2016/05/ShareFileSettings.png)

These settings can be managed with Group Policy as we'll see later.

### Client Settings and Locations

The client uses a number of locations on a machine:

* `HKEY\_CURRENT\_USER\SOFTWARE\Citrix\ShareFile\DriveMapper`
* `%APPDATA%\Citrix\DriveMapper3`
* `%LOCALAPPDATA%\Citrix\DriveMapper3`

These locations include settings for the client and the local cache.

![AppData Roaming folder]({{site.baseurl}}/media/2016/05/ShareFileDriveMapperAppDataRoaming.png)

The local cache will be interesting to look at as we use the client and copy files up or down or access files stored in ShareFile.

![The Drive Mapper local cache]({{site.baseurl}}/media/2016/05/ShareFileDriveMapperLocalAppData.png)

## Group Policy Management

Citrix provides both User and Computer configuration Group Policy settings giving you detailed control over the client. User policy settings include control over the ShareFile instance (Account) and file types allowed.

![Group Policy - User Configuration]({{site.baseurl}}/media/2016/05/ShareFileDriveMapperUserPolicies.png)

Computer settings provide control over the cache size and update settings etc. Note that under XenApp, auto-updates will be disabled by default, so GP can be used to enforce this default setting.

![Group Policy - Computer configuration]({{site.baseurl}}/media/2016/05/ShareFileDriveMapperComputerPolicies.png)

## Performance

In my testing of the client, I'm using an Internet connection in the US with about 9ms latency with 59Mbps up and 50Mbps down. I've tested only with the ShareFile cloud storage and not a connector to on-premises storage or SharePoint etc.

Here's a look at the client performance as I browse my ShareFile drive. In this instance I'm browsing folders with images and thumbnails are being generated as Explorer displays the image files. On first access of the file, it needs to be cached locally. Subsequent access is of course fast because file IO is handled from the local disk.

![Drive Mapper]({{site.baseurl}}/media/2016/05/ShareFileDriveMapperBrowsing.mp4)

If we look at the cache folder again after files have been accessed, you'll see the files appearing the cache folder in real time.

![The Drive Mapper local cache]({{site.baseurl}}/media/2016/05/ShareFileDriveMapperLocalAppData.png)

Each of these cache files is a copy of the actual file data - I can copy out a file from here, rename it with the correct file extension and open the file. The filter driver is what makes it possible to access the file data on the ShareFile drive and for that data to be seamlessly cached locally.

I wanted to test accessing large files and see the impact on the user experience. In this example, I have a 43Mb PowerPoint presentation. I've noticed that files are cached as soon as they're accessed and that access could be Explorer generating a thumbnail or the user right-clicking on a file.

In the video below you can see the effect of right clicking on this large, un-cached file. Explorer halts while the file is downloaded and as soon as it is has been cached all subsequent access is just like local disk (because it is). At the end of the video, the second right click is very responsive.

![Right click]({{site.baseurl}}/media/2016/05/ShareFileDriveRightClick.mp4)

While the behaviour of this client might work as in the example above, one of the key features looks to be reducing the local disk footprint, so downloading stubs or the entire file in the background may be counter-productive to that goal.

## Final Thoughts

I've only taken a short look at the ShareFile Drive Mapper client and it's a very interesting way to provide users with a familiar method of accessing their data.

* Citrix should fix WHQL certification for the driver, making it easier when deploying the client
* I haven't tested identity federation and SSO, but I'm certain it should work to reduce user authentication interaction
* Citrix has called out support for XenApp and XenDesktop; however, I've not had a chance to test in a non-persistent environment. 3rd party layering solution will alleviate any challenges with caching files.
* Redirecting user data folders to this location should be workable, but understand how the client works - caveat emptor.
* Upcoming improvements in the client should improve the user experience. I would assume that Citrix will be stepping up the release cadence of the client.

I've heard from the ShareFile team that a number of improvements are planned, so I'm looking forward to seeing how Citrix evolves this client over time.
