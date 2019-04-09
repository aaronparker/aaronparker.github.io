---
id: 4413
title: Hands On with the Citrix ShareFile Drive Mapper
date: 2016-05-25T02:43:59+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=4413
permalink: /citrix-sharefile-drive-mapper/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
enclosure:
  - |
    https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperBrowsing.mp4
    2446669
    video/mp4
    
  - |
    https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperBrowsing.webm
    0
    video/webm
    
  - |
    https://stealthpuppy.com/media/2016/05/ShareFileDriveRightClick.mp4
    538743
    video/mp4
    
  - |
    https://stealthpuppy.com/media/2016/05/ShareFileDriveRightClick.webm
    0
    video/webm
    
dsq_thread_id:
  - "4854213077"
image: /media/2016/05/2749278085_ab1b43f2d9_o.jpg
categories:
  - Citrix
tags:
  - Citrix
  - ShareFile
---
[Citrix recently](https://www.citrix.com/blogs/2016/05/20/drive-mapper-optimize-your-sharefile-investment/) made the ShareFile Drive Mapper tool available for mapping a drive letter into your ShareFile data available on Windows clients. This is an interesting approach to providing access to ShareFile data which changes the data access approach from sync to on-demand.

In this article, I'll provide an overview of the installation, configuration and how the client works. I've tested version 3.2.112.0 of the Drive Mapper on Windows 10 64-bit (build 14342).

Note that this article has been written from what I can gather by installing and testing the client into a local Windows virtual machine. This is my interpretation which could be flawed.

# Using the Drive Mapper

When starting the Drive Mapper the user is prompted for their ShareFile credentials. If the ShareFile administrator has not enabled the Drive Mapper, the user might see a message telling them they're not authorised to run the client.

<figure id="attachment_4426" aria-describedby="caption-attachment-4426" style="width: 666px" class="wp-caption alignnone">[<img class="size-full wp-image-4426" src="https://stealthpuppy.com/media/2016/05/ShareFileLogin2Failed.png" alt="ShareFile Drive Mapper login" width="666" height="563" srcset="https://stealthpuppy.com/media/2016/05/ShareFileLogin2Failed.png 666w, https://stealthpuppy.com/media/2016/05/ShareFileLogin2Failed-150x127.png 150w, https://stealthpuppy.com/media/2016/05/ShareFileLogin2Failed-300x254.png 300w" sizes="(max-width: 666px) 100vw, 666px" />](https://stealthpuppy.com/media/2016/05/ShareFileLogin2Failed.png)<figcaption id="caption-attachment-4426" class="wp-caption-text">ShareFile Drive Mapper login*</figure>

Once logged in, a drive mapped to the user's ShareFile data with an icon overlay, can be accessed from Explorer. An administrator also has the option to map into a local folder rather than a drive letter.

<figure id="attachment_4427" aria-describedby="caption-attachment-4427" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-4427" src="https://stealthpuppy.com/media/2016/05/ShareFileDriveMyComputer-1024x557.png" alt="ShareFile Drive in Explorer" width="1024" height="557" srcset="https://stealthpuppy.com/media/2016/05/ShareFileDriveMyComputer-1024x557.png 1024w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMyComputer-150x82.png 150w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMyComputer-300x163.png 300w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMyComputer-768x418.png 768w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMyComputer.png 1132w" sizes="(max-width: 1024px) 100vw, 1024px" />](https://stealthpuppy.com/media/2016/05/ShareFileDriveMyComputer.png)<figcaption id="caption-attachment-4427" class="wp-caption-text">ShareFile Drive in Explorer*</figure>

The client supports ShareFile links via the right-click menu:

<figure id="attachment_4428" aria-describedby="caption-attachment-4428" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-4428" src="https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperRightClickShare-1024x562.png" alt="ShareFile Drive Mapper right click options" width="1024" height="562" srcset="https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperRightClickShare-1024x562.png 1024w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperRightClickShare-150x82.png 150w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperRightClickShare-300x165.png 300w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperRightClickShare-768x421.png 768w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperRightClickShare.png 1059w" sizes="(max-width: 1024px) 100vw, 1024px" />](https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperRightClickShare.png)<figcaption id="caption-attachment-4428" class="wp-caption-text">ShareFile Drive Mapper right click options*</figure>

From a user perspective, accessing data is consistent and familiar.

<figure id="attachment_4432" aria-describedby="caption-attachment-4432" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-4432" src="https://stealthpuppy.com/media/2016/05/ShareFileDriveTopFolder-1024x557.png" alt="ShareFile Drive top folder" width="1024" height="557" srcset="https://stealthpuppy.com/media/2016/05/ShareFileDriveTopFolder-1024x557.png 1024w, https://stealthpuppy.com/media/2016/05/ShareFileDriveTopFolder-150x82.png 150w, https://stealthpuppy.com/media/2016/05/ShareFileDriveTopFolder-300x163.png 300w, https://stealthpuppy.com/media/2016/05/ShareFileDriveTopFolder-768x418.png 768w, https://stealthpuppy.com/media/2016/05/ShareFileDriveTopFolder.png 1132w" sizes="(max-width: 1024px) 100vw, 1024px" />](https://stealthpuppy.com/media/2016/05/ShareFileDriveTopFolder.png)<figcaption id="caption-attachment-4432" class="wp-caption-text">ShareFile Drive top folder*</figure>

If I access a folder to a Connector location, I am prompted for authentication, which is then cached. With federation and SSO, you could remove the need for the user to authenticate multiple times - once for the initial logon and then this authentication prompt.

<figure id="attachment_4433" aria-describedby="caption-attachment-4433" style="width: 666px" class="wp-caption alignnone">[<img class="size-full wp-image-4433" src="https://stealthpuppy.com/media/2016/05/DriveMapper-Connector.png" alt="Authenticating to a Connector location" width="666" height="421" srcset="https://stealthpuppy.com/media/2016/05/DriveMapper-Connector.png 666w, https://stealthpuppy.com/media/2016/05/DriveMapper-Connector-150x95.png 150w, https://stealthpuppy.com/media/2016/05/DriveMapper-Connector-300x190.png 300w" sizes="(max-width: 666px) 100vw, 666px" />](https://stealthpuppy.com/media/2016/05/DriveMapper-Connector.png)<figcaption id="caption-attachment-4433" class="wp-caption-text">Authenticating to a Connector location*</figure>

Simple enough, so far and the user experience is much as I would expect. Let's look a bit deeper.

# Enabling the Citrix ShareFile Drive Mapper

This client won't be enabled by default within ShareFile. Before installing on a client PC, enable in the Admin section in the ShareFile website under _Admin / Power Tools_:

<figure id="attachment_4418" aria-describedby="caption-attachment-4418" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-4418" src="https://stealthpuppy.com/media/2016/05/ShareFileAdminEnableDriveMapper-1024x750.png" alt="Enabling the ShareFile Driver Mapper" width="1024" height="750" srcset="https://stealthpuppy.com/media/2016/05/ShareFileAdminEnableDriveMapper-1024x750.png 1024w, https://stealthpuppy.com/media/2016/05/ShareFileAdminEnableDriveMapper-150x110.png 150w, https://stealthpuppy.com/media/2016/05/ShareFileAdminEnableDriveMapper-300x220.png 300w, https://stealthpuppy.com/media/2016/05/ShareFileAdminEnableDriveMapper-768x562.png 768w, https://stealthpuppy.com/media/2016/05/ShareFileAdminEnableDriveMapper.png 1281w" sizes="(max-width: 1024px) 100vw, 1024px" />](https://stealthpuppy.com/media/2016/05/ShareFileAdminEnableDriveMapper.png)<figcaption id="caption-attachment-4418" class="wp-caption-text">Enabling the ShareFile Driver Mapper*</figure>

# Installation

The Drive Mapper tool is [available from the Citrix Download site](https://www.citrix.com/downloads/sharefile/clients-and-plug-ins/sharefile-drive-mapper.html) and is available in an EXE, 32-bit MSI or 64-bit MSI. In addition, you can download the policy definitions; however, these are included in each client install as well.

Some [documentation is available](https://www.citrix.com/content/dam/citrix/en_us/documents/downloads/sharefile/Drive-Mapper-3.2-release-notes.pdf), but the installation and configuration is very straightforward. If using the EXE installer, you can perform a silent install with command line options (the MSI should of course support that natively).

<figure id="attachment_4415" aria-describedby="caption-attachment-4415" style="width: 496px" class="wp-caption alignnone">[<img class="size-full wp-image-4415" src="https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperInstaller.png" alt="Share File Drive Mapper Installer switches" width="496" height="388" srcset="https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperInstaller.png 496w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperInstaller-150x117.png 150w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperInstaller-300x235.png 300w" sizes="(max-width: 496px) 100vw, 496px" />](https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperInstaller.png)<figcaption id="caption-attachment-4415" class="wp-caption-text">Share File Drive Mapper Installer switches*</figure>

The Drive Mapper does install a driver, which unfortunately is not yet signed for the WHQL.

<figure id="attachment_4416" aria-describedby="caption-attachment-4416" style="width: 501px" class="wp-caption alignnone">[<img class="size-full wp-image-4416" src="https://stealthpuppy.com/media/2016/05/ShareFileDriver.png" alt="Citrix ShareFile Driver" width="501" height="232" srcset="https://stealthpuppy.com/media/2016/05/ShareFileDriver.png 501w, https://stealthpuppy.com/media/2016/05/ShareFileDriver-150x69.png 150w, https://stealthpuppy.com/media/2016/05/ShareFileDriver-300x139.png 300w" sizes="(max-width: 501px) 100vw, 501px" />](https://stealthpuppy.com/media/2016/05/ShareFileDriver.png)<figcaption id="caption-attachment-4416" class="wp-caption-text">Citrix ShareFile Driver*</figure>

Hopefully, this changes because this presents a road bump for automated installations.

# The ShareFile Drive Mapper Client

The ShareFile Drive Mapper client is made up of two main components of interest - the ShareFileDriveMapper.exe executable and a filter driver.

<figure id="attachment_4419" aria-describedby="caption-attachment-4419" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-4419" src="https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperBinaries-1024x517.png" alt="Citrix ShareFile Drive Mapper Binaries" width="1024" height="517" srcset="https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperBinaries-1024x517.png 1024w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperBinaries-150x76.png 150w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperBinaries-300x151.png 300w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperBinaries-768x387.png 768w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperBinaries.png 1106w" sizes="(max-width: 1024px) 100vw, 1024px" />](https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperBinaries.png)<figcaption id="caption-attachment-4419" class="wp-caption-text">Citrix ShareFile Drive Mapper Binaries*</figure>

[The filter driver](https://msdn.microsoft.com/en-us/library/windows/hardware/ff541610%28v=vs.85%29.aspx) is a [legacy filter driver, rather than a minifilter driver](https://blogs.msdn.microsoft.com/ntdebugging/2013/03/25/understanding-file-system-minifilter-and-legacy-filter-load-order/). I assume the reason for this is that you need to [request an altitude for minifilters from Microsoft](https://msdn.microsoft.com/en-us/library/windows/hardware/dn508284(v=vs.85).aspx), so perhaps in this initial version, Citrix has decided to make this tool available without having delays due to Microsoft processes (similar to the lack of WHQL certification).

<figure id="attachment_4420" aria-describedby="caption-attachment-4420" style="width: 979px" class="wp-caption alignnone">[<img class="size-full wp-image-4420" src="https://stealthpuppy.com/media/2016/05/ShareFileFilterDriver.png" alt="Showing loaded filter drivers and the ShareFile filter driver" width="979" height="421" srcset="https://stealthpuppy.com/media/2016/05/ShareFileFilterDriver.png 979w, https://stealthpuppy.com/media/2016/05/ShareFileFilterDriver-150x65.png 150w, https://stealthpuppy.com/media/2016/05/ShareFileFilterDriver-300x129.png 300w, https://stealthpuppy.com/media/2016/05/ShareFileFilterDriver-768x330.png 768w" sizes="(max-width: 979px) 100vw, 979px" />](https://stealthpuppy.com/media/2016/05/ShareFileFilterDriver.png)<figcaption id="caption-attachment-4420" class="wp-caption-text">Showing loaded filter drivers and the ShareFile filter driver*</figure>

The ShareFileDriveMapper executable then provides the user interface. If this executable is not running, the drive does disappear from Explorer, so something to watch out for.

## Client Settings

The client provides a number of settings to the user including setting the drive letter used, the cache size, clearing the local cache and file link expiration policy.

<figure id="attachment_4421" aria-describedby="caption-attachment-4421" style="width: 666px" class="wp-caption alignnone">[<img class="size-full wp-image-4421" src="https://stealthpuppy.com/media/2016/05/ShareFileSettings.png" alt="ShareFile Driver Mapper settings" width="666" height="421" srcset="https://stealthpuppy.com/media/2016/05/ShareFileSettings.png 666w, https://stealthpuppy.com/media/2016/05/ShareFileSettings-150x95.png 150w, https://stealthpuppy.com/media/2016/05/ShareFileSettings-300x190.png 300w" sizes="(max-width: 666px) 100vw, 666px" />](https://stealthpuppy.com/media/2016/05/ShareFileSettings.png)<figcaption id="caption-attachment-4421" class="wp-caption-text">ShareFile Driver Mapper settings*</figure>

These settings can be managed with Group Policy as we'll see later.

## Client Settings and Locations

The client uses a number of locations on a machine:

  * HKEY\_CURRENT\_USER\SOFTWARE\Citrix\ShareFile\DriveMapper
  * %APPDATA%\Citrix\DriveMapper3
  * %LOCALAPPDATA%\Citrix\DriveMapper3

These locations include settings for the client and the local cache.

<figure id="attachment_4423" aria-describedby="caption-attachment-4423" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-4423" src="https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperAppDataRoaming-1024x511.png" alt="AppData Roaming folder" width="1024" height="511" srcset="https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperAppDataRoaming-1024x511.png 1024w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperAppDataRoaming-150x75.png 150w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperAppDataRoaming-300x150.png 300w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperAppDataRoaming-768x383.png 768w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperAppDataRoaming.png 1059w" sizes="(max-width: 1024px) 100vw, 1024px" />](https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperAppDataRoaming.png)<figcaption id="caption-attachment-4423" class="wp-caption-text">AppData Roaming folder*</figure>

The local cache will be interesting to look at as we use the client and copy files up or down or access files stored in ShareFile.

<figure id="attachment_4424" aria-describedby="caption-attachment-4424" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-4424" src="https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperLocalAppData-1024x509.png" alt="The Drive Mapper local cache" width="1024" height="509" srcset="https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperLocalAppData-1024x509.png 1024w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperLocalAppData-150x75.png 150w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperLocalAppData-300x149.png 300w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperLocalAppData-768x382.png 768w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperLocalAppData.png 1135w" sizes="(max-width: 1024px) 100vw, 1024px" />](https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperLocalAppData.png)<figcaption id="caption-attachment-4424" class="wp-caption-text">The Drive Mapper local cache*</figure>

# Group Policy Management

Citrix provides both User and Computer configuration Group Policy settings giving you detailed control over the client. User policy settings include control over the ShareFile instance (Account) and file types allowed.

<figure id="attachment_4434" aria-describedby="caption-attachment-4434" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-4434" src="https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperUserPolicies-1024x491.png" alt="Group Policy - User Configuration" width="1024" height="491" srcset="https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperUserPolicies-1024x491.png 1024w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperUserPolicies-150x72.png 150w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperUserPolicies-300x144.png 300w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperUserPolicies-768x368.png 768w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperUserPolicies.png 1156w" sizes="(max-width: 1024px) 100vw, 1024px" />](https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperUserPolicies.png)<figcaption id="caption-attachment-4434" class="wp-caption-text">Group Policy - User Configuration*</figure>

Computer settings provide control over the cache size and update settings etc. Note that under XenApp, auto-updates will be disabled by default, so GP can be used to enforce this default setting.

<figure id="attachment_4435" aria-describedby="caption-attachment-4435" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-4435" src="https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperComputerPolicies-1024x491.png" alt="Group Policy - Computer configuration" width="1024" height="491" srcset="https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperComputerPolicies-1024x491.png 1024w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperComputerPolicies-150x72.png 150w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperComputerPolicies-300x144.png 300w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperComputerPolicies-768x368.png 768w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperComputerPolicies.png 1156w" sizes="(max-width: 1024px) 100vw, 1024px" />](https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperComputerPolicies.png)<figcaption id="caption-attachment-4435" class="wp-caption-text">Group Policy - Computer configuration*</figure>

# Performance

In my testing of the client, I'm using an Internet connection in the US with about 9ms latency with 59Mbps up and 50Mbps down. I've tested only with the ShareFile cloud storage and not a connector to on-premises storage or SharePoint etc.

Here's a look at the client performance as I browse my ShareFile drive. In this instance I'm browsing folders with images and thumbnails are being generated as Explorer displays the image files. On first access of the file, it needs to be cached locally. Subsequent access is of course fast because file IO is handled from the local disk.

<div style="width: 640px;" class="wp-video">
  <!--[if lt IE 9]><![endif]--><video class="wp-video-shortcode" id="video-4413-1" width="640" height="400" loop="1" autoplay="1" preload="metadata" controls="controls"><source type="video/mp4" src="https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperBrowsing.mp4?_=1" /><source type="video/webm" src="https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperBrowsing.webm?_=1" />
  
  <a href="https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperBrowsing.mp4">https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperBrowsing.mp4</a></video>
</div>

If we look at the cache folder again after files have been accessed, you'll see the files appearing the cache folder in real time.

<figure id="attachment_4424" aria-describedby="caption-attachment-4424" style="width: 1024px" class="wp-caption alignnone">[<img class="wp-image-4424 size-large" src="https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperLocalAppData-1024x509.png" alt="The Drive Mapper local cache" width="1024" height="509" srcset="https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperLocalAppData-1024x509.png 1024w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperLocalAppData-150x75.png 150w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperLocalAppData-300x149.png 300w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperLocalAppData-768x382.png 768w, https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperLocalAppData.png 1135w" sizes="(max-width: 1024px) 100vw, 1024px" />](https://stealthpuppy.com/media/2016/05/ShareFileDriveMapperLocalAppData.png)<figcaption id="caption-attachment-4424" class="wp-caption-text">The Drive Mapper local cache*</figure>

Each of these cache files is a copy of the actual file data - I can copy out a file from here, rename it with the correct file extension and open the file. The filter driver is what makes it possible to access the file data on the ShareFile drive and for that data to be seamlessly cached locally.

I wanted to test accessing large files and see the impact on the user experience. In this example, I have a 43Mb PowerPoint presentation. I've noticed that files are cached as soon as they're accessed and that access could be Explorer generating a thumbnail or the user right-clicking on a file.

In the video below you can see the effect of right clicking on this large, un-cached file. Explorer halts while the file is downloaded and as soon as it is has been cached all subsequent access is just like local disk (because it is). At the end of the video, the second right click is very responsive.

<div style="width: 640px;" class="wp-video">
  <video class="wp-video-shortcode" id="video-4413-2" width="640" height="345" loop="1" autoplay="1" preload="metadata" controls="controls"><source type="video/mp4" src="https://stealthpuppy.com/media/2016/05/ShareFileDriveRightClick.mp4?_=2" /><source type="video/webm" src="https://stealthpuppy.com/media/2016/05/ShareFileDriveRightClick.webm?_=2" /><a href="https://stealthpuppy.com/media/2016/05/ShareFileDriveRightClick.mp4">https://stealthpuppy.com/media/2016/05/ShareFileDriveRightClick.mp4</a></video>
</div>

While the behaviour of this client might work as in the example above, one of the key features looks to be reducing the local disk footprint, so downloading stubs or the entire file in the background may be counter-productive to that goal.

# Final Thoughts

I've only taken a short look at the ShareFile Drive Mapper client and it's a very interesting way to provide users with a familiar method of accessing their data.

  * Citrix should fix WHQL certification for the driver, making it easier when deploying the client
  * I haven't tested identity federation and SSO, but I'm certain it should work to reduce user authentication interaction
  * Citrix has called out support for XenApp and XenDesktop; however, I've not had a chance to test in a non-persistent environment. 3rd party layering solution will alleviate any challenges with caching files.
  * Redirecting user data folders to this location should be workable, but understand how the client works - caveat emptor.
  * Upcoming improvements in the client should improve the user experience. I would assume that Citrix will be stepping up the release cadence of the client.

I've heard from the ShareFile team that a number of improvements are planned, so I'm looking forward to seeing how Citrix evolves this client over time.