---
id: 3399
title: A Quick Look at Work Folders in Windows Server 2012 R2
date: 2013-06-30T10:52:03+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=3399
permalink: /a-quick-look-at-work-folders-in-windows-server-2012-r2/
dsq_thread_id:
  - "1451001302"
categories:
  - Microsoft
tags:
  - Data
  - Folder Redirection
---
Microsoft announced some interesting new features in Windows Server 2012 R2 at [TechEd 2013](http://channel9.msdn.com/Events/TechEd/NorthAmerica/2013/Key01#fbid=lNnF7jCr5lA) and one of those that piqued my interest is Work Folders. I'm not the biggest fan of [Redirected Folders and Offline files]({{site.baseurl}}/replacing-redirected-folders-and-offline-files-with-appsense-datanow/), but it's essentially the only enterprise solution Microsoft provides today for taking your data offline. Microsoft needs to provide a completely new method of syncing file data - one that is designed for todays use cases and computing environment.

Work Folders is a brand new direction for enabling access to data in offline scenarios, along the lines of Citrix ShareFile and Dropbox, but without the web and sharing features. Like most Microsoft OS features, Work Folders is tied to a specific release of Windows; however according to this [Channel 9 video](http://channel9.msdn.com/Shows/Edge/Edge-Show-65-Windows-Server-2012-R2-Work-Folders), Microsoft will release Work Folders for Windows 7, iOS and "other devices" (presumably Android). This is excellent news.

Here's a short look at setting up and connecting to Work Folders using the preview releases of Windows Server 2012 R2 and Windows 8.1 - what's version 1.0 going to deliver?

# Server Configuration

For a more detailed walkthrough on deploying Work Folders, download this document: [Windows Server 2012 R2: Enabling Windows Server Work Folders](http://channel9.msdn.com/Events/TechEd/NorthAmerica/2013/WCA-H327).

Work Folders is a component of the File and Storage Services role in Windows Server. I've installed Windows Server 2012 R2 into a virtual machine and am using local storage.

[<img class="alignnone size-full wp-image-3401" alt="WorkFolders-InstallRole" src="{{site.baseurl}}/media/2013/06/WorkFolders-InstallRole.png]({{site.baseurl}}/media/2013/06/WorkFolders-InstallRole.png)

Once installed, Work Folders is managed through Server Manager:

[<img class="alignnone size-full wp-image-3402" alt="WorkFolders-ServerManager" src="{{site.baseurl}}/media/2013/06/WorkFolders-ServerManager.png]({{site.baseurl}}/media/2013/06/WorkFolders-ServerManager.png)

Creating a new sync share is performed via a wizard which will first ask where the Sync Share will be located. This can be a new folder or an existing share - mixing user home drives and Work Folders should be possible. Note that at this time, Work Folders only supports providing users with exclusive access to Sync Share location - there is no provision for providing access to shared data.

[<img class="alignnone size-full wp-image-3403" alt="WorkFolders-Setup1" src="{{site.baseurl}}/media/2013/06/WorkFolders-Setup1.png]({{site.baseurl}}/media/2013/06/WorkFolders-Setup1.png)

Sub-folders can be created using just the users' username/alias or alias@domain. If using an existing share, it's probably best to stick with user alias. For existing shares, it is possible to sync only a single subfolder (e.g. Documents). This should really allow multiple subfolders, so that folders such as Documents, Desktop, Pictures etc could all be synced.

[<img class="alignnone size-full wp-image-3404" alt="WorkFolders-Setup2" src="{{site.baseurl}}/media/2013/06/WorkFolders-Setup2.png]({{site.baseurl}}/media/2013/06/WorkFolders-Setup2.png)

Give the Sync Share a name. Each Sync Share requires a unique name and I suspect that information about the share is stored in Active Directory.

[<img class="alignnone size-full wp-image-3405" alt="WorkFolders-Setup3" src="{{site.baseurl}}/media/2013/06/WorkFolders-Setup3.png]({{site.baseurl}}/media/2013/06/WorkFolders-Setup3.png)

Provide access to a specified set of users. Is the option 'Disable inherited permissions and grant users exclusive access to their files' remains checked, then the administrator won't have access to the users' folder. Unchecking this option is probably ideal for most environments.

[<img class="alignnone size-full wp-image-3408" alt="WorkFolders-Setup4" src="{{site.baseurl}}/media/2013/06/WorkFolders-Setup4.png]({{site.baseurl}}/media/2013/06/WorkFolders-Setup4.png)

Work folders and enable some basic security options on the device. On Windows, the Encrypt Work Folders option looks to utilise [EFS](http://technet.microsoft.com/en-us/library/cc700811.aspx).

[<img class="alignnone size-full wp-image-3409" alt="WorkFolders-Setup5" src="{{site.baseurl}}/media/2013/06/WorkFolders-Setup5.png]({{site.baseurl}}/media/2013/06/WorkFolders-Setup5.png)

Once configuration is complete, there is a confirmation page:

[<img class="alignnone size-full wp-image-3410" alt="WorkFolders-Setup6" src="{{site.baseurl}}/media/2013/06/WorkFolders-Setup6.png]({{site.baseurl}}/media/2013/06/WorkFolders-Setup6.png)

You can then see the results as the wizard creates the Sync Share:

[<img class="alignnone size-full wp-image-3411" alt="WorkFolders-Setup7" src="{{site.baseurl}}/media/2013/06/WorkFolders-Setup7.png]({{site.baseurl}}/media/2013/06/WorkFolders-Setup7.png)

Once a client has connected to the Sync Share, the administrator can see the following folder structure on the server. File data is stored in the Data folder, but I haven't seen what's stored in the Profile folder at this time.

[<img class="alignnone size-full wp-image-3412" alt="WorkFolders-AaronFolder" src="{{site.baseurl}}/media/2013/06/WorkFolders-AaronFolder.png]({{site.baseurl}}/media/2013/06/WorkFolders-AaronFolder.png)

Back in Server Manager, the administrator can view properties on user accounts used to connect to the Sync Share, including details on the devices storing data. There doesn't appear to be a way to initiate a remote wipe at this time.

[<img class="alignnone size-full wp-image-3413" alt="WorkFolders-AaronParkerProperties" src="{{site.baseurl}}/media/2013/06/WorkFolders-AaronParkerProperties.png]({{site.baseurl}}/media/2013/06/WorkFolders-AaronParkerProperties.png)

One piece that I haven't shown here, is the certificate configuration required to connect to Work Folders. Synchronisation is over HTTPS and Work Folders is hosted in IIS, so it is reasonably straight-forward to configure certificates to enable SSL/TLS encryption. Using the new Web Application Proxy feature in Windows Server 2012 R2 or DirectAccess, you could provide remote access to Work Folders for clients outside of the corporate network.

# Client Configuration

Accessing Work Folders from a client device, requires Windows 8.1 at this time with other operating systems to follow. I've used a non-domain joined Windows virtual machine.

To connect to a Sync Share using Work Folders, open the Work Folder applet in Control Panel:

[<img class="alignnone size-full wp-image-3414" alt="WorkFolders-Config1" src="{{site.baseurl}}/media/2013/06/WorkFolders-Config1.png]({{site.baseurl}}/media/2013/06/WorkFolders-Config1.png)

To make setup simpler, a user can use their email address, which will require some DNS configuration.

[<img class="alignnone size-full wp-image-3416" alt="WorkFolders-Config2" src="{{site.baseurl}}/media/2013/06/WorkFolders-Config2.png]({{site.baseurl}}/media/2013/06/WorkFolders-Config2.png)

I don't have the right DNS configuration in my test environment, so I've had to

[<img class="alignnone size-full wp-image-3417" alt="WorkFolders-Config3" src="{{site.baseurl}}/media/2013/06/WorkFolders-Config3.png]({{site.baseurl}}/media/2013/06/WorkFolders-Config3.png)

Because I'm on non-domain joined PC, I need to authenticate using my domain credentials. Once authenticated, Work Folders asks where to store the synchronised data. At this time, we can't change from the default location.

[<img class="alignnone size-full wp-image-3418" alt="WorkFolders-Config4" src="{{site.baseurl}}/media/2013/06/WorkFolders-Config4.png]({{site.baseurl}}/media/2013/06/WorkFolders-Config4.png)

Because I've configured encryption and password policies on my Sync Folder, the user needs to accept that these policies will be applied to the local device to continue:

[<img class="alignnone size-full wp-image-3419" alt="WorkFolders-Config5" src="{{site.baseurl}}/media/2013/06/WorkFolders-Config5.png]({{site.baseurl}}/media/2013/06/WorkFolders-Config5.png)

Finally a confirmation that Work Folders has been setup successfully. Note that at this time, a device can only connect to a single Sync Share.

[<img class="alignnone size-full wp-image-3420" alt="WorkFolders-Config6" src="{{site.baseurl}}/media/2013/06/WorkFolders-Config6.png]({{site.baseurl}}/media/2013/06/WorkFolders-Config6.png)

Control Panel will now display status information about Work Folders:

[<img class="alignnone size-full wp-image-3421" alt="WorkFolders-ControlPanel" src="{{site.baseurl}}/media/2013/06/WorkFolders-ControlPanel.png]({{site.baseurl}}/media/2013/06/WorkFolders-ControlPanel.png)

Work Folders are now available directly from within the Computer/This PC window:

[<img class="alignnone size-full wp-image-3422" alt="WorkFolders-WindowsExplorer" src="{{site.baseurl}}/media/2013/06/WorkFolders-WindowsExplorer.png]({{site.baseurl}}/media/2013/06/WorkFolders-WindowsExplorer.png)

I can now move or copy files into this location and synchronisation appears to be instant. That's probably in part to do with both the client and server running on the same host. Unfortunately at the moment there isn't any visual indication from within Explorer as to the sync status of a file or folder.

[<img class="alignnone size-full wp-image-3424" alt="WorkFolders-WindowsExplorer2" src="{{site.baseurl}}/media/2013/06/WorkFolders-WindowsExplorer2.png]({{site.baseurl}}/media/2013/06/WorkFolders-WindowsExplorer2.png)

Drilling down a bit further, I can see the data stored in my Work Folders and access it just like any other local folder.

[<img class="alignnone size-full wp-image-3425" alt="WorkFolders-WindowsExplorer3" src="{{site.baseurl}}/media/2013/06/WorkFolders-WindowsExplorer3.png]({{site.baseurl}}/media/2013/06/WorkFolders-WindowsExplorer3.png)

# Conclusion

The entrenched players in this space, don't have much to be concerned about with version 1 of Work Folders; theres no access from a browser, no ability to share files and no integration with Outlook. Updates will be tied to Windows Server releases and it's encouraging to see that Microsoft will deliver clients for operating system other than Windows 8.1.

Considering that this feature is built into the operating system, it's just a matter of time (and maybe waiting for v3) until Work Folders becomes the de facto standard for synchronising user data to Windows devices at least. Maybe, just maybe, the writing is on the wall for Offline Files.