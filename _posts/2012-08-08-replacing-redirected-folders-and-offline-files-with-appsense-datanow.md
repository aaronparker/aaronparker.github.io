---
id: 2828
title: Replacing Redirected Folders and Offline Files with AppSense DataNow
date: 2012-08-08T20:34:34+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2828
permalink: /replacing-redirected-folders-and-offline-files-with-appsense-datanow/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "797867134"
categories:
  - Microsoft
tags:
  - DataNow
  - Folder Redirection
---
_Note: this article covers a product that is in beta at the time of writing; therefore the specifics of the approach outlined in this article may be subject to change. This is not a recommendation to use this approach in production; rather it's an exercise in understanding what's possible with a new data synchronisation product.  
_ 

# Redirected Folders and Offline Files are fundamentally broken

Redirected Folders and Offline Files are currently the de-facto standard for making user data available across corporate PCs running Windows. Redirected Folders provides users with a consistent view of their data, whilst Offline Files makes that data available when disconnected from the network.

Sounds awesome on paper right? With the performance and synchronisation issues that you might experience, it's far from a perfect solution but it's the best one we've had to date. What's disappointing is that improvements in these features have been far and few between. Even in Windows 8, they're not much different from what was introduced in Windows 2000.

Perhaps eventually we'll be able to replace both features with different approaches, instead of attempting to fix the unfixable. Maybe I shouldn't be so hard on these technologies because they were great when introduced, but in my view they're not up to task for user data management in today's desktop. Where's the corporate version of SkyDrive with on premise data?

There's various 3<sup>rd</sup> party "cloud" solutions aimed at this data problem now – Citrix ShareFile, Oxygen Open Storage Grid, RES HyperDrive and AppSense DataNow, to name a few. I wanted to take a look at the integration between DataNow and the traditional way of providing users with their data.

# What is AppSense DataNow?

[DataNow](http://www.appsense.com/appsense-datanow) is AppSense's new data management product, currently in public beta - available for download for testing and feedback. In its current form (as least as far as this beta in concerned), DataNow provides an easy way to access to corporate data (stored on user home drives) from mobile devices, Windows PCs and Macs.

Access is proxied through a virtual appliance, located in the DMZ or on the Internal network, whilst the data remains in its existing location (i.e. file servers inside the trusted network). The DataNow client then accesses that data over HTTP.

With this overview in mind, I should be able to use DataNow to synchronise data to laptops and even desktops and standard folder redirection for hosted desktops in the data centre (i.e. those desktops right next to the file storage).

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="DataNow diagram" src="{{site.baseurl}}.com/media/2012/08/diagram_thumb.png" alt="DataNow diagram]({{site.baseurl}}/media/2012/08/diagram.png)

The idea being that this approach should provide users with a consistent view of their data regardless of how they are accessing the desktop, with the bonus being that I can now extend the same access to mobile devices.

# Approaches

When installing the DataNow client, the user's data is synchronised locally to a DataNow folder – similar in approach to Dropbox or SkyDrive. Here's three ways that I could aggregate my local folders (Documents, Desktop etc.) with the DataNow folder:

  * Leverage Windows 7 Libraries – include folders below the DataNow folder in the Documents, Music, Pictures and Videos Libraries. This will work, there's even methods of [scripting changes to the Libraries](http://windowslibrariespsh.codeplex.com/), but we miss out on important folders such as Favorites and the Desktop
  * Create Junction Points – create junction points for each of the user folders to folders in the DataNow folder. This will cover all user folders, but junction points aren't a very elegant solution
  * Use Folder Redirection delivered by AppSense Environment Manager (EM) – redirect each of the user folders below the DataNow folder

The first two approaches are far from ideal whilst using Folder Redirection with EM holds the most promise, as Folder Redirection is arguably the easiest to implement and undo.

# Implementation

To ensure that this will work, I've configured the following in a lab environment:

  * A home directory configured on the user account in Active Directory. I've started with a clean home directory
  * An AppSense DataNow appliance hosted on vSphere, configured for Active Directory in the lab environment. Configuring DataNow is out of scope of this article, however I've first ensured that DataNow is running correctly
  * Two Windows 7 VMs – one with x86 Windows and the other with x64 Windows
  * Both Windows 7 VMs are running the AppSense Environment Manager and DataNow agents
  * The DataNow folder is stored at %USERPROFILE%\DataNow
  * An Environment Manager configuration that will redirect the user folders below the DataNow folder at %USERPROFILE%\DataNow. For example, the Documents folder is redirected to %USERPROFILE%\DataNow\Documents

You may wonder why I haven't used Group Policy to perform folder redirection – this is because Group Policy won't allow you to redirect a user folder to a sub-folder of %USERPROFILE%. I guess Microsoft doesn't want us creating a quantum singularity by redirecting %USERPROFILE%\Documents to %USERPROFILE%\Documents\Documents.

With Folder Redirection implemented and the DataNow client configured, the user folder looks like this:

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="DataNow client folder" src="{{site.baseurl}}.com/media/2012/08/folder1_thumb.png" alt="DataNow client folder]({{site.baseurl}}/media/2012/08/folder1.png)

Whilst the DataNow folder contains each of the redirected user folders:

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="DataNow client folder contents" src="{{site.baseurl}}.com/media/2012/08/folder2_thumb.png" alt="DataNow client folder contents]({{site.baseurl}}/media/2012/08/folder2.png)

Note that I've not redirected Downloads or Saved Games.

After logging into the DataNow client for the first time, each of the redirected folders are synchronised to the home drive:

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="Home folder" src="{{site.baseurl}}.com/media/2012/08/folder3_thumb.png" alt="Home folder]({{site.baseurl}}/media/2012/08/folder3.png)

Synchronisation works between the local DataNow folder and the home drive and I'm able to make changes on each machine and see the changes on the other. There are some oddities during synchronisation, but I've put this down to beta software as I've seen synchronisation improve between each beta release.

Generally speaking though, this approach gives me what I'm after- synchronisation between the home drive and a Windows device that I can take offline, and even synchronise that data across the Internet as long as DataNow is available externally. The best part is that there is no Folder Redirection to the network (so no latency introduced by the network) and no Offline Files configured.

# Conclusion

DataNow is currently in beta and by no means is the only product I could have used for this test, but in its current form, it's let me give the kick in the teeth that Folder Redirection (to the network) and Offline Files deserves. This is really just a proof-of-concept, but hopefully with time this should become more robust and with any luck the default approach for providing data offline on laptops without changing or impacting the user experience.

**Note**: under no circumstances should you take this article as a recommendation from me for synchronising the _AppData\Roaming_ folder – synchronising or redirecting AppData should never be undertaken lightly as it is not a solution, it is delayed failure.