---
id: 3831
title: 'File Sync Solutions as Alternatives to Folder Redirection &#8211; AppSense DataNow'
date: 2015-04-07T04:00:17+10:00
author: Aaron Parker
layout: post
guid: http://stealthpuppy.com/?p=3831
permalink: /folder-redirection-offline-files-appsense-datanow-35/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "3650883360"
image: /wp-content/uploads/2015/04/folder-binder.jpg
categories:
  - Microsoft
tags:
  - AppSense
  - DataNow
  - Folder Redirection
  - Offline Files
---
I&#8217;ve previously covered the use of [AppSense DataNow as an alternative to folder redirection and Offline Files](http://stealthpuppy.com/replacing-redirected-folders-and-offline-files-with-appsense-datanow/). In that article I provided an approach to using DataNow to sync a copy of the user&#8217;s home drive locally instead of redirecting user folders to the network. I&#8217;ve previously used a beta version of DataNow and with the release of DataNow 3.5, I want to take an updated look at this solution.

# Redirected Folders and Offline Files

Redirected Folders remain the de-facto standard for making user data available across corporate PCs running Windows. Redirected Folders provide users with a consistent view of their data across devices or desktops, while Offline Files synchronises that data locally making it available when disconnected from the network. All of this works over standard SMB connections, which aren&#8217;t ideal for today&#8217;s mobile workers who are often connected to the Internet, rather than the corporate network. VPN connections and [DirectAccess](https://technet.microsoft.com/en-au/network/dn791020) provide access to internal file shares, but the data still remains tied to domain-joined Windows PCs.

With the [performance](https://helgeklein.com/blog/2014/10/folder-redirection-impacts-ux-breaks-applications) and [synchronisation issues](http://stealthpuppy.com/configuring-an-automatic-resolution-policy-for-offline-files-in-windows-7/) that you may experience, it&#8217;s far from a perfect solution but it&#8217;s built into Windows and therefore best approach that most environments have had for many years. While file synchronisation solutions are becoming prevalent, these features will be around for a long time to come.

There are various 3<sup>rd</sup> party file sync solutions aimed at providing access to on-premises data – [Citrix ShareFile](http://www.citrix.com/products/sharefile/overview.html) (including [StorageZone connectors](http://support.citrix.com/proddocs/topic/sharefile-storagezones-30/sf-deploy.html) for on-premises home drives), [Oxygen Open Storage Grid](http://home.oxygencloud.com/features/), and AppSense DataNow to name a few.

There&#8217;s even Microsoft&#8217;s Work Folders in Windows Server 2012 R2, but I fear that until Microsoft delivers mobile clients for all major mobile operating systems (including their own) and newer features in a timely manner, that Work Folders is dead in the water.

Let&#8217;s take another look at the integration between AppSense DataNow and the traditional method of providing users with access to their data.

# What is AppSense DataNow?

[DataNow](http://www.appsense.com/products/data/datanow)[<img class="alignleft wp-image-3879 size-full" src="http://stealthpuppy.com/wp-content/uploads/2015/04/logo_lg_dn.png" alt="logo_lg_dn" width="260" height="100" srcset="http://192.168.0.89/wp-content/uploads/2015/04/logo_lg_dn.png 260w, http://192.168.0.89/wp-content/uploads/2015/04/logo_lg_dn-150x58.png 150w" sizes="(max-width: 260px) 100vw, 260px" />](http://www.appsense.com/products/data/datanow) is a data management or file sync solution from AppSense. DataNow is available as a stand alone product or [as a component of DesktopNow Plus](http://www.appsense.com/products/desktop/desktopnow-plus) and it provides an easy way to access to corporate data (stored on user home drives) from mobile devices, Windows PCs and Macs. Since I last looked at this product, AppSense has released version 3.5 and also provided the ability to provide users with access to any SMB location on your internal network.

DataNow is a completely on-premises solution &#8211; there&#8217;s no public cloud-based component, instead you host the control plane and connect it to your existing data. Access is proxied through a virtual appliance, which you would locate in a DMZ or on the internal network depending on your environment, while the file data remains in its existing location (i.e. file servers inside the trusted network). The DataNow client (for Windows, Mac, iOS and Android) then accesses that data over HTTPS. This allows you to provide access to user data from any location.

With this overview in mind, I should be able to use DataNow to synchronise data to physical PCs, instead of using Offline Files. I could then continue to use standard folder redirection for hosted desktops in the data centre (i.e. those desktops right next to the file storage).

<figure style="width: 660px" class="wp-caption alignnone">[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="DataNow diagram" src="http://stealthpuppy.com/wp-content/uploads/2012/08/diagram_thumb.png" alt="DataNow diagram" width="660" height="286" border="0" />](http://stealthpuppy.com/wp-content/uploads/2012/08/diagram.png)<figcaption class="wp-caption-text">A simplified view of the AppSense DataNow architecture</figcaption></figure>

The idea being that this approach should provide users with a consistent view of their data regardless of how they are accessing a corporate desktop, without having to redirect user folders to the network and then dealing with the challenges that comes with it. I can also allow users to access their home drives from any device that makes sense for their uses, including mobile devices.

# Approaches to Integrating User Folders with DataNow

When installing the DataNow client, the user&#8217;s data is synchronised locally to a DataNow folder – similar in approach to Dropbox or OneDrive. Here&#8217;s three ways that I could aggregate my local folders (Documents, Desktop etc.) with the DataNow folder:

  * Leverage Windows 7 Libraries – include folders below the DataNow folder in the Documents, Music, Pictures and Videos Libraries. This will work, there&#8217;s even methods of [scripting changes to the Libraries](http://windowslibrariespsh.codeplex.com/), but we miss out on important folders such as Favorites and the Desktop
  * Create Junction Points – create junction points for each of the user folders to folders in the DataNow folder. This will cover all user folders, but junction points aren&#8217;t a very elegant solution
  * Use Folder Redirection delivered by AppSense Environment Manager (EM) – redirect each of the user folders into the DataNow folder

The first two approaches are far from ideal whilst using Folder Redirection with EM holds the most promise, as Folder Redirection is arguably the easiest to implement and undo. At a high level, here&#8217;s how this would work:

  * The DataNow client creates a local folder for storing data &#8211; C:\Users\Aaron\DataNow
  * User folders are redirected to this location, for example, C:\Users\Aaron\Documents is redirected to C:\Users\Aaron\DataNow\Home\Documents. While I&#8217;m still using folder redirection, this keeps the user folder local and avoids the latency in redirecting to the network
  * The DataNow client keeps the local Documents folder (C:\Users\Aaron\DataNow\Home\Documents) in sync with my home drive (e.g. H:\Documents) and provide offline access with the ability to sync across the Internet

# Appliance Configuration

In the previous version of this article, I didn&#8217;t cover setting up DataNow, so here&#8217;s the steps I&#8217;ve gone through to setup DataNow in my lab.

The [DataNow appliance](https://www.myappsense.com/datanow/v3.5/admin/Admin/The_DataNow_Appliance.htm) is available for vSphere, XenServer and Hyper-V &#8211; it&#8217;s a hardened Linux-based VM that can be [clustered and load-balanced for high availability](https://www.myappsense.com/datanow/v3.5/admin/Admin/Clustering.htm). For my lab environment, I&#8217;ve used the Hyper-V version, but the download and configuration is the same for all platforms.

<figure id="attachment_3880" aria-describedby="caption-attachment-3880" style="width: 667px" class="wp-caption alignnone"><img class="wp-image-3880 size-full" src="http://stealthpuppy.com/wp-content/uploads/2015/04/DataNowApplianceDownload.png" alt="DataNowApplianceDownload" width="667" height="282" srcset="http://192.168.0.89/wp-content/uploads/2015/04/DataNowApplianceDownload.png 667w, http://192.168.0.89/wp-content/uploads/2015/04/DataNowApplianceDownload-150x63.png 150w, http://192.168.0.89/wp-content/uploads/2015/04/DataNowApplianceDownload-300x127.png 300w" sizes="(max-width: 667px) 100vw, 667px" /><figcaption id="caption-attachment-3880" class="wp-caption-text">The DataNow appliance is available for the most popular virtualization platforms</figcaption></figure>

After importing the VM and [assigning an IP address via the console](https://www.myappsense.com/datanow/v3.5/admin/Admin/Installing_the_DataNow_Appliance.htm), the first step is to [configure DNS and domain settings](https://www.myappsense.com/datanow/v3.5/admin/Admin/Configure_DNS_for_file_server_location.htm). Here I&#8217;ve configured the appliance to use my AD DNS server and internal domain name for name resolution.

<figure id="attachment_3874" aria-describedby="caption-attachment-3874" style="width: 1000px" class="wp-caption alignnone">[<img class="wp-image-3874 size-full" src="http://stealthpuppy.com/wp-content/uploads/2015/04/ConfigurationDNS.png" alt="AppSense DataNow 3.5 appliance DNS configuration" width="1000" height="591" srcset="http://192.168.0.89/wp-content/uploads/2015/04/ConfigurationDNS.png 1000w, http://192.168.0.89/wp-content/uploads/2015/04/ConfigurationDNS-150x89.png 150w, http://192.168.0.89/wp-content/uploads/2015/04/ConfigurationDNS-300x177.png 300w" sizes="(max-width: 1000px) 100vw, 1000px" />](http://stealthpuppy.com/wp-content/uploads/2015/04/ConfigurationDNS.png)<figcaption id="caption-attachment-3874" class="wp-caption-text">AppSense DataNow 3.5 appliance DNS configuration</figcaption></figure>

[Connection to Active Directory](https://www.myappsense.com/datanow/v3.5/admin/Admin/Configure_the_Active_Directory_connection.htm) in straight-forward, specify one or more AD controllers, an LDAP port and an account to connect to AD with. Don&#8217;t use the Administrator account like I have done here &#8211; this is only lab. Preferably create a dedicated service account for DataNow.

<figure id="attachment_3871" aria-describedby="caption-attachment-3871" style="width: 1000px" class="wp-caption alignnone">[<img class="size-full wp-image-3871" src="http://stealthpuppy.com/wp-content/uploads/2015/04/ConfigurationAD.png" alt="AppSense DataNow 3.5 appliance AD configuration" width="1000" height="532" srcset="http://192.168.0.89/wp-content/uploads/2015/04/ConfigurationAD.png 1000w, http://192.168.0.89/wp-content/uploads/2015/04/ConfigurationAD-150x80.png 150w, http://192.168.0.89/wp-content/uploads/2015/04/ConfigurationAD-300x160.png 300w" sizes="(max-width: 1000px) 100vw, 1000px" />](http://stealthpuppy.com/wp-content/uploads/2015/04/ConfigurationAD.png)<figcaption id="caption-attachment-3871" class="wp-caption-text">AppSense DataNow 3.5 appliance AD configuration</figcaption></figure>

To provide users with access to data, DataNow provides configuration for what are called [Map Points](https://www.myappsense.com/datanow/v3.5/admin/Admin/Map_Point_Access.htm) &#8211; essentially SMB or WebDav locations in the corporate network. The location of Home drives can be set via the user properties in Active Directory &#8211; so rather than explicitly setting the location, the DataNow appliance will read the homeDirectory attribute from the authenticated user account to find the user&#8217;s home directory.

<figure id="attachment_3888" aria-describedby="caption-attachment-3888" style="width: 1000px" class="wp-caption alignnone">[<img class="size-full wp-image-3888" src="http://stealthpuppy.com/wp-content/uploads/2015/04/Config-MapPoints.png" alt="AppSense DataNow 3.5 appliance Map Point configuration" width="1000" height="634" srcset="http://192.168.0.89/wp-content/uploads/2015/04/Config-MapPoints.png 1000w, http://192.168.0.89/wp-content/uploads/2015/04/Config-MapPoints-150x95.png 150w, http://192.168.0.89/wp-content/uploads/2015/04/Config-MapPoints-300x190.png 300w" sizes="(max-width: 1000px) 100vw, 1000px" />](http://stealthpuppy.com/wp-content/uploads/2015/04/Config-MapPoints.png)<figcaption id="caption-attachment-3888" class="wp-caption-text">AppSense DataNow 3.5 appliance Map Point configuration</figcaption></figure>

To provide access to user&#8217;s home drives, there&#8217;s not much else to configure. For my lab testing, I did allow access over HTTP so that I didn&#8217;t need to install a certificate. Additionally I&#8217;ve created a second Map Point to provide access to a specific share ( \\HV1\ISOs in the screenshot above.)

DataNow provides options for controlling [authorization polices for Map Points](https://www.myappsense.com/datanow/v3.5/admin/Admin/Map_Point_Policy.htm) using organisational units, user groups and user accounts. It&#8217;s also possible to control the types of devices that are allowed access including verified devices so that users don&#8217;t have unfettered access.

<figure id="attachment_3872" aria-describedby="caption-attachment-3872" style="width: 1000px" class="wp-caption alignnone">[<img class="size-full wp-image-3872" src="http://stealthpuppy.com/wp-content/uploads/2015/04/Policy-MapPointAccess.png" alt="AppSense DataNow 3.5 appliance Device policies" width="1000" height="864" srcset="http://192.168.0.89/wp-content/uploads/2015/04/Policy-MapPointAccess.png 1000w, http://192.168.0.89/wp-content/uploads/2015/04/Policy-MapPointAccess-150x130.png 150w, http://192.168.0.89/wp-content/uploads/2015/04/Policy-MapPointAccess-300x259.png 300w" sizes="(max-width: 1000px) 100vw, 1000px" />](http://stealthpuppy.com/wp-content/uploads/2015/04/Policy-MapPointAccess.png)<figcaption id="caption-attachment-3872" class="wp-caption-text">AppSense DataNow 3.5 appliance Device policies</figcaption></figure>

# Implementation

To test access to home directories via DataNow, I&#8217;ve configured the following in a lab environment:

  * A home directory configured on the user account in Active Directory. I&#8217;ve started with a clean home directory
  * The AppSense DataNow appliance configuration described above
  * Two Windows 8.1 VMs – one with x86 Windows and the other with x64 Windows
  * Both VMs are running the AppSense Environment Manager 8.6 RC and DataNow 3.5 agents
  * The DataNow folder is stored at %USERPROFILE%\DataNow
  * An Environment Manager configuration that will redirect the user folders below the DataNow folder

You may wonder why I haven&#8217;t used Group Policy to perform folder redirection – this is because Group Policy won&#8217;t allow you to redirect a user folder to a sub-folder of %USERPROFILE%. I guess Microsoft doesn&#8217;t want us creating a quantum singularity by redirecting %USERPROFILE%\Documents to %USERPROFILE%\Documents\Documents.

If you&#8217;re using AppSense DataNow, I can assume there&#8217;s a good chance you&#8217;re also an AppSense Environment Manager shop. Once Environment Manager 8.6 is released, I&#8217;ll make the EM configuration that I used in this test available.

The EM configuration, does a few things:

  * Enables Single Sign On for the DataNow client at the computer level on Startup and enables Single Sign On for the user at logon. Both of these actions use the native DataNow action built into EM 8.6. Single Sign On improves the user experience on domain joined PCs, by ensuring the user does not need to authenticate separately to DataNow
  * Sets the URL to the DataNow appliance
  * Redirects user folders to the DataNow folder. For this test, I redirected Desktop, Documents, Pictures, Videos, Music and Favorites.

After logging onto the desktop and ensuring the the DataNow client has logged in and user folders are redirected successfully, I can access and sync my data across both devices while also accessing the same data on my iPhone or iPad. Here&#8217;s what this looks like on the desktop:

<figure id="attachment_3906" aria-describedby="caption-attachment-3906" style="width: 800px" class="wp-caption alignnone"><img class="wp-image-3906 size-full" src="http://stealthpuppy.com/wp-content/uploads/2015/04/AppSenseDataNow35UXWindows8.gif" alt="AppSenseDataNow35UXWindows8" width="800" height="700" /><figcaption id="caption-attachment-3906" class="wp-caption-text">User experience on Windows 8 with user folders redirected to the DataNow folder</figcaption></figure>

&nbsp;

With an on-access policy set for the home directory Map Point, files are downloaded by the client when they&#8217;re accessed. Files that aren&#8217;t yet synchronised locally are denoted with an overlay:

<figure id="attachment_3876" aria-describedby="caption-attachment-3876" style="width: 1076px" class="wp-caption alignnone">[<img class="size-full wp-image-3876" src="http://stealthpuppy.com/wp-content/uploads/2015/04/Documents-folder.png" alt="AppSense DataNow Documents folder with files not yet synchronized." width="1076" height="424" srcset="http://192.168.0.89/wp-content/uploads/2015/04/Documents-folder.png 1076w, http://192.168.0.89/wp-content/uploads/2015/04/Documents-folder-150x59.png 150w, http://192.168.0.89/wp-content/uploads/2015/04/Documents-folder-300x118.png 300w, http://192.168.0.89/wp-content/uploads/2015/04/Documents-folder-1024x404.png 1024w" sizes="(max-width: 1076px) 100vw, 1076px" />](http://stealthpuppy.com/wp-content/uploads/2015/04/Documents-folder.png)<figcaption id="caption-attachment-3876" class="wp-caption-text">AppSense DataNow Documents folder with files not yet synchronized.</figcaption></figure>

Synchronisation works between the local DataNow folder and the home drive and I&#8217;m able to make changes on each machine and see the changes on the other.

Generally speaking though, this approach gives me what I&#8217;m after- synchronisation between the home drive and a Windows device that I can take offline, and even synchronise that data across the Internet as long as DataNow is available externally. The best part is that there is no Folder Redirection to the network (so no latency introduced by the network) and no Offline Files configured.

# Mac Client Experience

To provide an idea of access to my home directory on an alternative platform, I&#8217;ve installed the DataNow client on my MacBook. I can synchronise and access my Active Directory home drive on a personal device as well.

<figure id="attachment_3907" aria-describedby="caption-attachment-3907" style="width: 668px" class="wp-caption alignnone"><img class="wp-image-3907 size-full" src="http://stealthpuppy.com/wp-content/uploads/2015/04/DataNow-MacClient-Setup.gif" alt="DataNow-MacClient-Setup" width="668" height="598" /><figcaption id="caption-attachment-3907" class="wp-caption-text">Setting up the DataNow client for OS X</figcaption></figure>

&nbsp;

Once authenticated, my files are synchronised locally to a DataNow folder. Note in the screenshot below, the a cloud icon indicates that the files have not yet been copied locally, similar to the grey arrow overlay on Windows.

<figure id="attachment_3886" aria-describedby="caption-attachment-3886" style="width: 834px" class="wp-caption alignnone">[<img class="wp-image-3886 size-full" src="http://stealthpuppy.com/wp-content/uploads/2015/04/Mac-DataNow-Folder1.png" alt="Accessing files locally on the Mac" width="834" height="437" srcset="http://192.168.0.89/wp-content/uploads/2015/04/Mac-DataNow-Folder1.png 834w, http://192.168.0.89/wp-content/uploads/2015/04/Mac-DataNow-Folder1-150x79.png 150w, http://192.168.0.89/wp-content/uploads/2015/04/Mac-DataNow-Folder1-300x157.png 300w" sizes="(max-width: 834px) 100vw, 834px" />](http://stealthpuppy.com/wp-content/uploads/2015/04/Mac-DataNow-Folder1.png)<figcaption id="caption-attachment-3886" class="wp-caption-text">Accessing files locally on the Mac</figcaption></figure>

Once I access the file, the DataNow client will download it. The status of the DataNow client and settings are available from the OS X menu bar:

<figure id="attachment_3885" aria-describedby="caption-attachment-3885" style="width: 484px" class="wp-caption alignnone"><img class="size-full wp-image-3885" src="http://stealthpuppy.com/wp-content/uploads/2015/04/Mac-DataNow-status.png" alt="Viewing the DataNow client status on the Mac" width="484" height="540" srcset="http://192.168.0.89/wp-content/uploads/2015/04/Mac-DataNow-status.png 484w, http://192.168.0.89/wp-content/uploads/2015/04/Mac-DataNow-status-134x150.png 134w, http://192.168.0.89/wp-content/uploads/2015/04/Mac-DataNow-status-269x300.png 269w" sizes="(max-width: 484px) 100vw, 484px" /><figcaption id="caption-attachment-3885" class="wp-caption-text">Viewing the DataNow client status on the Mac</figcaption></figure>

# Web Client Experience

A file sync solution is not complete without access to data from a web browser. Here&#8217;s a view of access my home directory in a browser:

<figure id="attachment_3908" aria-describedby="caption-attachment-3908" style="width: 959px" class="wp-caption alignnone"><img class="wp-image-3908 size-full" src="http://stealthpuppy.com/wp-content/uploads/2015/04/DataNowWebAccess.gif" alt="DataNowWebAccess" width="959" height="676" /><figcaption id="caption-attachment-3908" class="wp-caption-text">DataNow web client</figcaption></figure>

# Conclusion

In this article, I&#8217;ve provided an alternative to redirecting user folders to a home drive (i.e. an SMB location) and synchronising that data locally using Offline Files. This approach uses a 3rd party solution to redirect the user folders to a local location that is then synchronised over HTTP, avoiding performance issues with redirecting to the network and allowing access to user data from any type of device.

I&#8217;ve used AppSense products for this article, but I&#8217;m sure you can achieve the same solution with the user environment management and file sync products of your choice. In fact, I&#8217;d like to take a look at how I can do the same thing with Citrix ShareFile.

I really like the approach that AppSense has taken with DataNow. While they face tough competition with the likes of ShareFile and Dropbox, the simplicity of DataNow is its greatest strength. I&#8217;m impressed how quickly I can get up and running with the appliance and connecting to my internal file share resources. For my interest in replacing Folder Redirection and Offline Files as an approach to providing access to home drives on physical PCs both in and out of the corporate network and providing access on non-Windows devices, the DataNow + Environment Manager solution works well.

There are a couple items that I would like to see AppSense improve or implement in future versions of DataNow that would assist with this approach:

  * Provide conflict resolution policies &#8211; in the event of file versions conflicting, I would like to be able to specify which version of the file should take precedence, i.e. the local or server copy
  * Control the Sync Mode on a device basis to allow me to configure how specific types of devices sync data (on access on desktops; automatic on laptops)

**Note**: please don&#8217;t take this article as a recommendation from me for synchronising the _AppData\Roaming_ folder.