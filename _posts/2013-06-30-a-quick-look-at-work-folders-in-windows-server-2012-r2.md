---
id: 3399
title: A Quick Look at Work Folders in Windows Server 2012 R2
date: 2013-06-30T10:52:03+10:00
author: Aaron Parker
layout: post
guid: http://stealthpuppy.com/?p=3399
permalink: /a-quick-look-at-work-folders-in-windows-server-2012-r2/
dsq_thread_id:
  - "1451001302"
categories:
  - Microsoft
tags:
  - Data
  - Folder Redirection
---
Microsoft announced some interesting new features in Windows Server 2012 R2 at [TechEd 2013](http://channel9.msdn.com/Events/TechEd/NorthAmerica/2013/Key01#fbid=lNnF7jCr5lA) and one of those that piqued my interest is Work Folders. I&#8217;m not the biggest fan of [Redirected Folders and Offline files](http://stealthpuppy.com/replacing-redirected-folders-and-offline-files-with-appsense-datanow/), but it&#8217;s essentially the only enterprise solution Microsoft provides today for taking your data offline. Microsoft needs to provide a completely new method of syncing file data - one that is designed for todays use cases and computing environment.

Work Folders is a brand new direction for enabling access to data in offline scenarios, along the lines of Citrix ShareFile and Dropbox, but without the web and sharing features. Like most Microsoft OS features, Work Folders is tied to a specific release of Windows; however according to this [Channel 9 video](http://channel9.msdn.com/Shows/Edge/Edge-Show-65-Windows-Server-2012-R2-Work-Folders), Microsoft will release Work Folders for Windows 7, iOS and &#8220;other devices&#8221; (presumably Android). This is excellent news.

Here&#8217;s a short look at setting up and connecting to Work Folders using the preview releases of Windows Server 2012 R2 and Windows 8.1 - what&#8217;s version 1.0 going to deliver?

# Server Configuration

For a more detailed walkthrough on deploying Work Folders, download this document: [Windows Server 2012 R2: Enabling Windows Server Work Folders](http://channel9.msdn.com/Events/TechEd/NorthAmerica/2013/WCA-H327).

Work Folders is a component of the File and Storage Services role in Windows Server. I&#8217;ve installed Windows Server 2012 R2 into a virtual machine and am using local storage.

[<img class="alignnone size-full wp-image-3401" alt="WorkFolders-InstallRole" src="http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-InstallRole.png" width="800" height="567" srcset="https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-InstallRole.png 800w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-InstallRole-150x106.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-InstallRole-300x212.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-InstallRole-624x442.png 624w" sizes="(max-width: 800px) 100vw, 800px" />](http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-InstallRole.png)

Once installed, Work Folders is managed through Server Manager:

[<img class="alignnone size-full wp-image-3402" alt="WorkFolders-ServerManager" src="http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-ServerManager.png" width="1022" height="622" srcset="https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-ServerManager.png 1022w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-ServerManager-150x91.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-ServerManager-300x182.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-ServerManager-624x379.png 624w" sizes="(max-width: 1022px) 100vw, 1022px" />](http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-ServerManager.png)

Creating a new sync share is performed via a wizard which will first ask where the Sync Share will be located. This can be a new folder or an existing share - mixing user home drives and Work Folders should be possible. Note that at this time, Work Folders only supports providing users with exclusive access to Sync Share location - there is no provision for providing access to shared data.

[<img class="alignnone size-full wp-image-3403" alt="WorkFolders-Setup1" src="http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup1.png" width="775" height="567" srcset="https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup1.png 775w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup1-150x109.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup1-300x219.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup1-624x456.png 624w" sizes="(max-width: 775px) 100vw, 775px" />](http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup1.png)

Sub-folders can be created using just the users&#8217; username/alias or alias@domain. If using an existing share, it&#8217;s probably best to stick with user alias. For existing shares, it is possible to sync only a single subfolder (e.g. Documents). This should really allow multiple subfolders, so that folders such as Documents, Desktop, Pictures etc could all be synced.

[<img class="alignnone size-full wp-image-3404" alt="WorkFolders-Setup2" src="http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup2.png" width="775" height="567" srcset="https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup2.png 775w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup2-150x109.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup2-300x219.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup2-624x456.png 624w" sizes="(max-width: 775px) 100vw, 775px" />](http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup2.png)

Give the Sync Share a name. Each Sync Share requires a unique name and I suspect that information about the share is stored in Active Directory.

[<img class="alignnone size-full wp-image-3405" alt="WorkFolders-Setup3" src="http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup3.png" width="775" height="567" srcset="https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup3.png 775w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup3-150x109.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup3-300x219.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup3-624x456.png 624w" sizes="(max-width: 775px) 100vw, 775px" />](http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup3.png)

Provide access to a specified set of users. Is the option 'Disable inherited permissions and grant users exclusive access to their files&#8217; remains checked, then the administrator won&#8217;t have access to the users&#8217; folder. Unchecking this option is probably ideal for most environments.

[<img class="alignnone size-full wp-image-3408" alt="WorkFolders-Setup4" src="http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup4.png" width="775" height="567" srcset="https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup4.png 775w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup4-150x109.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup4-300x219.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup4-624x456.png 624w" sizes="(max-width: 775px) 100vw, 775px" />](http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup4.png)

Work folders and enable some basic security options on the device. On Windows, the Encrypt Work Folders option looks to utilise [EFS](http://technet.microsoft.com/en-us/library/cc700811.aspx).

[<img class="alignnone size-full wp-image-3409" alt="WorkFolders-Setup5" src="http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup5.png" width="775" height="567" srcset="https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup5.png 775w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup5-150x109.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup5-300x219.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup5-624x456.png 624w" sizes="(max-width: 775px) 100vw, 775px" />](http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup5.png)

Once configuration is complete, there is a confirmation page:

[<img class="alignnone size-full wp-image-3410" alt="WorkFolders-Setup6" src="http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup6.png" width="775" height="567" srcset="https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup6.png 775w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup6-150x109.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup6-300x219.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup6-624x456.png 624w" sizes="(max-width: 775px) 100vw, 775px" />](http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup6.png)

You can then see the results as the wizard creates the Sync Share:

[<img class="alignnone size-full wp-image-3411" alt="WorkFolders-Setup7" src="http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup7.png" width="775" height="567" srcset="https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup7.png 775w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup7-150x109.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup7-300x219.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup7-624x456.png 624w" sizes="(max-width: 775px) 100vw, 775px" />](http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Setup7.png)

Once a client has connected to the Sync Share, the administrator can see the following folder structure on the server. File data is stored in the Data folder, but I haven&#8217;t seen what&#8217;s stored in the Profile folder at this time.

[<img class="alignnone size-full wp-image-3412" alt="WorkFolders-AaronFolder" src="http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-AaronFolder.png" width="986" height="530" srcset="https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-AaronFolder.png 986w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-AaronFolder-150x80.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-AaronFolder-300x161.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-AaronFolder-624x335.png 624w" sizes="(max-width: 986px) 100vw, 986px" />](http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-AaronFolder.png)

Back in Server Manager, the administrator can view properties on user accounts used to connect to the Sync Share, including details on the devices storing data. There doesn&#8217;t appear to be a way to initiate a remote wipe at this time.

[<img class="alignnone size-full wp-image-3413" alt="WorkFolders-AaronParkerProperties" src="http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-AaronParkerProperties.png" width="660" height="530" srcset="https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-AaronParkerProperties.png 660w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-AaronParkerProperties-150x120.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-AaronParkerProperties-300x240.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-AaronParkerProperties-624x501.png 624w" sizes="(max-width: 660px) 100vw, 660px" />](http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-AaronParkerProperties.png)

One piece that I haven&#8217;t shown here, is the certificate configuration required to connect to Work Folders. Synchronisation is over HTTPS and Work Folders is hosted in IIS, so it is reasonably straight-forward to configure certificates to enable SSL/TLS encryption. Using the new Web Application Proxy feature in Windows Server 2012 R2 or DirectAccess, you could provide remote access to Work Folders for clients outside of the corporate network.

# Client Configuration

Accessing Work Folders from a client device, requires Windows 8.1 at this time with other operating systems to follow. I&#8217;ve used a non-domain joined Windows virtual machine.

To connect to a Sync Share using Work Folders, open the Work Folder applet in Control Panel:

[<img class="alignnone size-full wp-image-3414" alt="WorkFolders-Config1" src="http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config1.png" width="921" height="535" srcset="https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config1.png 921w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config1-150x87.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config1-300x174.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config1-624x362.png 624w" sizes="(max-width: 921px) 100vw, 921px" />](http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config1.png)

To make setup simpler, a user can use their email address, which will require some DNS configuration.

[<img class="alignnone size-full wp-image-3416" alt="WorkFolders-Config2" src="http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config2.png" width="921" height="535" srcset="https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config2.png 921w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config2-150x87.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config2-300x174.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config2-624x362.png 624w" sizes="(max-width: 921px) 100vw, 921px" />](http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config2.png)

I don&#8217;t have the right DNS configuration in my test environment, so I&#8217;ve had to

[<img class="alignnone size-full wp-image-3417" alt="WorkFolders-Config3" src="http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config3.png" width="921" height="535" srcset="https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config3.png 921w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config3-150x87.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config3-300x174.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config3-624x362.png 624w" sizes="(max-width: 921px) 100vw, 921px" />](http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config3.png)

Because I&#8217;m on non-domain joined PC, I need to authenticate using my domain credentials. Once authenticated, Work Folders asks where to store the synchronised data. At this time, we can&#8217;t change from the default location.

[<img class="alignnone size-full wp-image-3418" alt="WorkFolders-Config4" src="http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config4.png" width="921" height="535" srcset="https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config4.png 921w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config4-150x87.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config4-300x174.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config4-624x362.png 624w" sizes="(max-width: 921px) 100vw, 921px" />](http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config4.png)

Because I&#8217;ve configured encryption and password policies on my Sync Folder, the user needs to accept that these policies will be applied to the local device to continue:

[<img class="alignnone size-full wp-image-3419" alt="WorkFolders-Config5" src="http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config5.png" width="921" height="535" srcset="https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config5.png 921w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config5-150x87.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config5-300x174.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config5-624x362.png 624w" sizes="(max-width: 921px) 100vw, 921px" />](http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config5.png)

Finally a confirmation that Work Folders has been setup successfully. Note that at this time, a device can only connect to a single Sync Share.

[<img class="alignnone size-full wp-image-3420" alt="WorkFolders-Config6" src="http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config6.png" width="921" height="535" srcset="https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config6.png 921w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config6-150x87.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config6-300x174.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config6-624x362.png 624w" sizes="(max-width: 921px) 100vw, 921px" />](http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-Config6.png)

Control Panel will now display status information about Work Folders:

[<img class="alignnone size-full wp-image-3421" alt="WorkFolders-ControlPanel" src="http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-ControlPanel.png" width="892" height="577" srcset="https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-ControlPanel.png 892w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-ControlPanel-150x97.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-ControlPanel-300x194.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-ControlPanel-624x403.png 624w" sizes="(max-width: 892px) 100vw, 892px" />](http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-ControlPanel.png)

Work Folders are now available directly from within the Computer/This PC window:

[<img class="alignnone size-full wp-image-3422" alt="WorkFolders-WindowsExplorer" src="http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-WindowsExplorer.png" width="1005" height="528" srcset="https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-WindowsExplorer.png 1005w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-WindowsExplorer-150x78.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-WindowsExplorer-300x157.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-WindowsExplorer-624x327.png 624w" sizes="(max-width: 1005px) 100vw, 1005px" />](http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-WindowsExplorer.png)

I can now move or copy files into this location and synchronisation appears to be instant. That&#8217;s probably in part to do with both the client and server running on the same host. Unfortunately at the moment there isn&#8217;t any visual indication from within Explorer as to the sync status of a file or folder.

[<img class="alignnone size-full wp-image-3424" alt="WorkFolders-WindowsExplorer2" src="http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-WindowsExplorer2.png" width="1005" height="528" srcset="https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-WindowsExplorer2.png 1005w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-WindowsExplorer2-150x78.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-WindowsExplorer2-300x157.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-WindowsExplorer2-624x327.png 624w" sizes="(max-width: 1005px) 100vw, 1005px" />](http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-WindowsExplorer2.png)

Drilling down a bit further, I can see the data stored in my Work Folders and access it just like any other local folder.

[<img class="alignnone size-full wp-image-3425" alt="WorkFolders-WindowsExplorer3" src="http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-WindowsExplorer3.png" width="1046" height="527" srcset="https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-WindowsExplorer3.png 1046w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-WindowsExplorer3-150x75.png 150w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-WindowsExplorer3-300x151.png 300w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-WindowsExplorer3-1024x515.png 1024w, https://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-WindowsExplorer3-624x314.png 624w" sizes="(max-width: 1046px) 100vw, 1046px" />](http://stealthpuppy.com/wp-content/uploads/2013/06/WorkFolders-WindowsExplorer3.png)

# Conclusion

The entrenched players in this space, don&#8217;t have much to be concerned about with version 1 of Work Folders; theres no access from a browser, no ability to share files and no integration with Outlook. Updates will be tied to Windows Server releases and it&#8217;s encouraging to see that Microsoft will deliver clients for operating system other than Windows 8.1.

Considering that this feature is built into the operating system, it&#8217;s just a matter of time (and maybe waiting for v3) until Work Folders becomes the de facto standard for synchronising user data to Windows devices at least. Maybe, just maybe, the writing is on the wall for Offline Files.