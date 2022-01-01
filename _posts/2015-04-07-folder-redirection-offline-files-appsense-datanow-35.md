---

title: 'File Sync Solutions as Alternatives to Folder Redirection - AppSense DataNow'
date: 2015-04-07T04:00:17+10:00
author: Aaron Parker
layout: post

permalink: /folder-redirection-offline-files-appsense-datanow-35/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "3650883360"
image: /media/2015/04/folder-binder.jpg
categories:
  - Microsoft
tags:
  - AppSense
  - DataNow
  - Folder Redirection
  - Offline Files
---
* Replace with the toc
{:toc}

I've previously covered the use of [AppSense DataNow as an alternative to folder redirection and Offline Files]({{site.baseurl}}/replacing-redirected-folders-and-offline-files-with-appsense-datanow/). In that article I provided an approach to using DataNow to sync a copy of the user's home drive locally instead of redirecting user folders to the network. I've previously used a beta version of DataNow and with the release of DataNow 3.5, I want to take an updated look at this solution.

## Redirected Folders and Offline Files

Redirected Folders remain the de-facto standard for making user data available across corporate PCs running Windows. Redirected Folders provide users with a consistent view of their data across devices or desktops, while Offline Files synchronises that data locally making it available when disconnected from the network. All of this works over standard SMB connections, which aren't ideal for today's mobile workers who are often connected to the Internet, rather than the corporate network. VPN connections and [DirectAccess](https://technet.microsoft.com/en-au/network/dn791020) provide access to internal file shares, but the data still remains tied to domain-joined Windows PCs.

With the [performance](https://helgeklein.com/blog/2014/10/folder-redirection-impacts-ux-breaks-applications) and [synchronisation issues]({{site.baseurl}}/configuring-an-automatic-resolution-policy-for-offline-files-in-windows-7/) that you may experience, it's far from a perfect solution but it's built into Windows and therefore best approach that most environments have had for many years. While file synchronisation solutions are becoming prevalent, these features will be around for a long time to come.

There are various 3<sup>rd</sup> party file sync solutions aimed at providing access to on-premises data – [Citrix ShareFile](http://www.citrix.com/products/sharefile/overview.html) (including [StorageZone connectors](http://support.citrix.com/proddocs/topic/sharefile-storagezones-30/sf-deploy.html) for on-premises home drives), [Oxygen Open Storage Grid](http://home.oxygencloud.com/features/), and AppSense DataNow to name a few.

There's even Microsoft's Work Folders in Windows Server 2012 R2, but I fear that until Microsoft delivers mobile clients for all major mobile operating systems (including their own) and newer features in a timely manner, that Work Folders is dead in the water.

Let's take another look at the integration between AppSense DataNow and the traditional method of providing users with access to their data.

## What is AppSense DataNow?

[DataNow](http://www.appsense.com/products/data/datanow) provides an easy way to access to corporate data (stored on user home drives) from mobile devices, Windows PCs and Macs. Since I last looked at this product, AppSense has released version 3.5 and also provided the ability to provide users with access to any SMB location on your internal network.

DataNow is a completely on-premises solution - there's no public cloud-based component, instead you host the control plane and connect it to your existing data. Access is proxied through a virtual appliance, which you would locate in a DMZ or on the internal network depending on your environment, while the file data remains in its existing location (i.e. file servers inside the trusted network). The DataNow client (for Windows, Mac, iOS and Android) then accesses that data over HTTPS. This allows you to provide access to user data from any location.

With this overview in mind, I should be able to use DataNow to synchronise data to physical PCs, instead of using Offline Files. I could then continue to use standard folder redirection for hosted desktops in the data centre (i.e. those desktops right next to the file storage).

![DataNow diagram]({{site.baseurl}}/media/2012/08/diagram.png)

The idea being that this approach should provide users with a consistent view of their data regardless of how they are accessing a corporate desktop, without having to redirect user folders to the network and then dealing with the challenges that comes with it. I can also allow users to access their home drives from any device that makes sense for their uses, including mobile devices.

## Approaches to Integrating User Folders with DataNow

When installing the DataNow client, the user's data is synchronised locally to a DataNow folder – similar in approach to Dropbox or OneDrive. Here's three ways that I could aggregate my local folders (Documents, Desktop etc.) with the DataNow folder:

* Leverage Windows 7 Libraries – include folders below the DataNow folder in the Documents, Music, Pictures and Videos Libraries. This will work, there's even methods of [scripting changes to the Libraries](http://windowslibrariespsh.codeplex.com/), but we miss out on important folders such as Favorites and the Desktop
* Create Junction Points – create junction points for each of the user folders to folders in the DataNow folder. This will cover all user folders, but junction points aren't a very elegant solution
* Use Folder Redirection delivered by AppSense Environment Manager (EM) – redirect each of the user folders into the DataNow folder

The first two approaches are far from ideal whilst using Folder Redirection with EM holds the most promise, as Folder Redirection is arguably the easiest to implement and undo. At a high level, here's how this would work:

* The DataNow client creates a local folder for storing data - `C:\Users\Aaron\DataNow`
* User folders are redirected to this location, for example, `C:\Users\Aaron\Documents` is redirected to `C:\Users\Aaron\DataNow\Home\Documents`. While I'm still using folder redirection, this keeps the user folder local and avoids the latency in redirecting to the network
* The DataNow client keeps the local Documents folder (`C:\Users\Aaron\DataNow\Home\Documents`) in sync with my home drive (e.g. `H:\Documents`) and provide offline access with the ability to sync across the Internet

## Appliance Configuration

In the previous version of this article, I didn't cover setting up DataNow, so here's the steps I've gone through to setup DataNow in my lab.

The [DataNow appliance](https://www.myappsense.com/datanow/v3.5/admin/Admin/The_DataNow_Appliance.htm) is available for vSphere, XenServer and Hyper-V - it's a hardened Linux-based VM that can be [clustered and load-balanced for high availability](https://www.myappsense.com/datanow/v3.5/admin/Admin/Clustering.htm). For my lab environment, I've used the Hyper-V version, but the download and configuration is the same for all platforms.

![DataNowApplianceDownload]({{site.baseurl}}/media/2015/04/DataNowApplianceDownload.png)

After importing the VM and [assigning an IP address via the console](https://www.myappsense.com/datanow/v3.5/admin/Admin/Installing_the_DataNow_Appliance.htm), the first step is to [configure DNS and domain settings](https://www.myappsense.com/datanow/v3.5/admin/Admin/Configure_DNS_for_file_server_location.htm). Here I've configured the appliance to use my AD DNS server and internal domain name for name resolution.

![AppSense DataNow 3.5 appliance DNS configuration]({{site.baseurl}}/media/2015/04/ConfigurationDNS.png)

[Connection to Active Directory](https://www.myappsense.com/datanow/v3.5/admin/Admin/Configure_the_Active_Directory_connection.htm) in straight-forward, specify one or more AD controllers, an LDAP port and an account to connect to AD with. Don't use the Administrator account like I have done here - this is only lab. Preferably create a dedicated service account for DataNow.

![AppSense DataNow 3.5 appliance AD configuration]({{site.baseurl}}/media/2015/04/ConfigurationAD.png)

To provide users with access to data, DataNow provides configuration for what are called [Map Points](https://www.myappsense.com/datanow/v3.5/admin/Admin/Map_Point_Access.htm) - essentially SMB or WebDav locations in the corporate network. The location of Home drives can be set via the user properties in Active Directory - so rather than explicitly setting the location, the DataNow appliance will read the homeDirectory attribute from the authenticated user account to find the user's home directory.

![AppSense DataNow 3.5 appliance Map Point configuration]({{site.baseurl}}/media/2015/04/Config-MapPoints.png)

To provide access to user's home drives, there's not much else to configure. For my lab testing, I did allow access over HTTP so that I didn't need to install a certificate. Additionally I've created a second Map Point to provide access to a specific share (`\\HV1\ISOs` in the screenshot above.)

DataNow provides options for controlling [authorization polices for Map Points](https://www.myappsense.com/datanow/v3.5/admin/Admin/Map_Point_Policy.htm) using organisational units, user groups and user accounts. It's also possible to control the types of devices that are allowed access including verified devices so that users don't have unfettered access.

![AppSense DataNow 3.5 appliance Device policies]({{site.baseurl}}/media/2015/04/Policy-MapPointAccess.png)

AppSense DataNow 3.5 appliance Device policies
{:.figcaption}

## Implementation

To test access to home directories via DataNow, I've configured the following in a lab environment:

* A home directory configured on the user account in Active Directory. I've started with a clean home directory
* The AppSense DataNow appliance configuration described above
* Two Windows 8.1 VMs – one with x86 Windows and the other with x64 Windows
* Both VMs are running the AppSense Environment Manager 8.6 RC and DataNow 3.5 agents
* The DataNow folder is stored at `%USERPROFILE%\DataNow`
* An Environment Manager configuration that will redirect the user folders below the DataNow folder

You may wonder why I haven't used Group Policy to perform folder redirection – this is because Group Policy won't allow you to redirect a user folder to a sub-folder of `%USERPROFILE%`. I guess Microsoft doesn't want us creating a quantum singularity by redirecting `%USERPROFILE%\Documents` to `%USERPROFILE%\Documents\Documents`.

If you're using AppSense DataNow, I can assume there's a good chance you're also an AppSense Environment Manager shop. Once Environment Manager 8.6 is released, I'll make the EM configuration that I used in this test available.

The EM configuration, does a few things:

* Enables Single Sign On for the DataNow client at the computer level on Startup and enables Single Sign On for the user at logon. Both of these actions use the native DataNow action built into EM 8.6. Single Sign On improves the user experience on domain joined PCs, by ensuring the user does not need to authenticate separately to DataNow
* Sets the URL to the DataNow appliance
* Redirects user folders to the DataNow folder. For this test, I redirected Desktop, Documents, Pictures, Videos, Music and Favorites.

After logging onto the desktop and ensuring the the DataNow client has logged in and user folders are redirected successfully, I can access and sync my data across both devices while also accessing the same data on my iPhone or iPad. Here's what this looks like on the desktop:

![DataNowWindows8]({{site.baseurl}}/media/2015/04/AppSenseDataNow35UXWindows8.png)

With an on-access policy set for the home directory Map Point, files are downloaded by the client when they're accessed. Files that aren't yet synchronised locally are denoted with an overlay:

![AppSense DataNow Documents folder with files not yet synchronized.]({{site.baseurl}}/media/2015/04/Documents-folder.png)

AppSense DataNow Documents folder with files not yet synchronized.
{:.figcaption}

Synchronisation works between the local DataNow folder and the home drive and I'm able to make changes on each machine and see the changes on the other.

Generally speaking though, this approach gives me what I'm after- synchronisation between the home drive and a Windows device that I can take offline, and even synchronise that data across the Internet as long as DataNow is available externally. The best part is that there is no Folder Redirection to the network (so no latency introduced by the network) and no Offline Files configured.

## Mac Client Experience

To provide an idea of access to my home directory on an alternative platform, I've installed the DataNow client on my MacBook. I can synchronise and access my Active Directory home drive on a personal device as well.

![DataNow-MacClient-Setup]({{site.baseurl}}/media/2015/04/DataNow-MacClient-Setup.gif)

Once authenticated, my files are synchronised locally to a DataNow folder. Note in the screenshot below, the a cloud icon indicates that the files have not yet been copied locally, similar to the grey arrow overlay on Windows.

![Accessing files locally on the Mac]({{site.baseurl}}/media/2015/04/Mac-DataNow-Folder1.png)

Once I access the file, the DataNow client will download it. The status of the DataNow client and settings are available from the OS X menu bar:

![Viewing the DataNow client status on the Mac]({{site.baseurl}}/media/2015/04/Mac-DataNow-status.png)

## Web Client Experience

A file sync solution is not complete without access to data from a web browser. Here's a view of access my home directory in a browser:

![DataNowWebAccess]({{site.baseurl}}/media/2015/04/DataNowWebAccess.gif)

## Conclusion

In this article, I've provided an alternative to redirecting user folders to a home drive (i.e. an SMB location) and synchronising that data locally using Offline Files. This approach uses a 3rd party solution to redirect the user folders to a local location that is then synchronised over HTTP, avoiding performance issues with redirecting to the network and allowing access to user data from any type of device.

I've used AppSense products for this article, but I'm sure you can achieve the same solution with the user environment management and file sync products of your choice. In fact, I'd like to take a look at how I can do the same thing with Citrix ShareFile.

I really like the approach that AppSense has taken with DataNow. While they face tough competition with the likes of ShareFile and Dropbox, the simplicity of DataNow is its greatest strength. I'm impressed how quickly I can get up and running with the appliance and connecting to my internal file share resources. For my interest in replacing Folder Redirection and Offline Files as an approach to providing access to home drives on physical PCs both in and out of the corporate network and providing access on non-Windows devices, the DataNow + Environment Manager solution works well.

There are a couple items that I would like to see AppSense improve or implement in future versions of DataNow that would assist with this approach:

* Provide conflict resolution policies - in the event of file versions conflicting, I would like to be able to specify which version of the file should take precedence, i.e. the local or server copy
* Control the Sync Mode on a device basis to allow me to configure how specific types of devices sync data (on access on desktops; automatic on laptops)

**Note**: please don't take this article as a recommendation from me for synchronising the `AppData\Roaming` folder.
