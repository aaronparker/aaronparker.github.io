---
id: 503
title: Placing The SoftGrid User Data Directory
date: 2008-03-16T22:59:17+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/placing-the-softgrid-user-data-directory
permalink: /placing-the-softgrid-user-data-directory/
dsq_thread_id:
  - "195380257"
categories:
  - Microsoft
tags:
  - SoftGrid
---
<img height="106" width="120" src="https://stealthpuppy.com/wp-content/uploads/2008/03/softgriduserdata.png" align="left" alt="SoftGridUserData" border="0" /> If you're in the process of rolling out SoftGrid Application Virtualisation, you've most likely considered placement of the User Data Directory. The User Data Directory (or user cache) holds application configuration that would normally be stored in the user profile.

Placement of this folder needs to be decided in the context of your profile strategy. If you have an environment where users access their applications via desktops (including VDI), laptops and Terminal Servers how do you provide users access to their application settings across as all devices?

Ideally the User Data Directory needs to be available across all of these devices. You can copy this folder during the logon/logoff process, either via roaming profiles or a 3rd party profile management solution. However, I think the best solution for most organisations would be to locate the User Data Directory on a network location. This means that you'll either need to use a UNC location or the user's home folder. If you elect to use the home folder you can configure the path as %HOMEDRIVE%%HOMEPATH%.

<img height="218" width="404" src="https://stealthpuppy.com/wp-content/uploads/2008/03/softgridclientpropertiesedited.png" alt="SoftGridClientPropertiesEdited" border="0" /> 

One benefit of this approach is if the user home drive is not mapped, for whatever reason, the SoftGrid client will default to the user profile and the client will continue to work. I don't recommend using a network drive mapped by any other means, unless you can guarantee it will be mapped very early in the logon process. If the SoftGrid client cannot find the network location, it will fail to load applications correctly.

So won't this create a heap of network traffic while the application is running? Actually no, it's only during application launch and shutdown.

When an application is launched the SoftGrid client copies the user cache file from the User Data Directory to _%USERPROFILE%\Local Settings\Application Data\SoftGrid Client_ or _%USERPROFILE%\AppData\Local\SoftGrid Client_ on Windows Vista/2008, which the SoftGrid client uses while the application is running. When the application is closed the cache file is the written back to the User Data Directory.

One final thing to consider is that application icons are also stored in the User Data Directory. Each user gets a copy of application and file type icons for each application they're entitled to. As more applications provide support for Windows Vista style icons, the size of each icon file can increase considerably. Applications like Adobe Photoshop CS3 have 19Mb of icons alone. Having this copied only once for each user is going to save a lot of logon traffic.