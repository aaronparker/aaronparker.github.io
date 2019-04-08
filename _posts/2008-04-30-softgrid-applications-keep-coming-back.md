---
id: 546
title: SoftGrid Applications Keep Coming Back
date: 2008-04-30T23:02:39+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/softgrid-applications-keep-coming-back
permalink: /softgrid-applications-keep-coming-back/
dsq_thread_id:
  - "195380562"
categories:
  - Applications
tags:
  - SoftGrid
---
<img border="0" alt="SoftGrid Box" align="left" src="http://stealthpuppy.com/wp-content/uploads/2008/04/softgridbox.png" width="112" height="120" />This error seems to popup [every](http://www.softgridguru.com/viewtopic.php?t=2493&highlight=shortcutsex+dat) [now](http://www.softgridguru.com/viewtopic.php?t=2184&highlight=icons) and [then](http://www.softgridguru.com/viewtopic.php?t=2323) and I&#8217;m currently seeing this in my own lab environment - SoftGrid application shortcuts are created even though the application has been disabled, deleted or the user account has been removed from the application group.

When a user logs onto the computer, the SoftGrid client contacts the Virtual Application Server to retrieve a list of applications for that user. The list is cached on the local machine and the required files for each application (OSD files, application and file type icons) are copied locally.

The list of application shortcuts are cached in a file called SHORTCUTS_EX.DAT saved in the SoftGrid Client folder. This is an XML file that contains the information required for the creation of shortcuts:

<img border="0" alt="shortcuts_ex.dat Contents" src="http://stealthpuppy.com/wp-content/uploads/2008/04/shortcuts-exdatfilecontents.png" width="484" height="186" /> 

During the user session, the SoftGrid client works on a temporary copy of SHORTCUTS_EX.DAT . This file is not written to disk until the SoftGrid client, specifically SFTDCC.EXE, exits.

In those instances where you see application shortcuts created in the users&#8217; Start Menu, even though those applications may be disabled or deleted, SHORTCUTS_EX.DAT will continue to contain the shortcut information. 

Why this happens I&#8217;m not really sure, perhaps this is a bug or the client is not able to save the file correctly in some circumstances. A work around is to delete SHORTCUTS_EX.DAT once the user logs off, thus forcing the client to recreate a 'clean&#8217; list of applications. Be sure to test this work around for laptop users.

I&#8217;ve seen this behaviour in the current versions of the SoftGrid client (4.1 and 4.2) as well as the 4.5 beta. Hopefully a little more investigation will provide some answers.