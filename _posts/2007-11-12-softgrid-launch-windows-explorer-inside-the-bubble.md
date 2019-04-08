---
id: 365
title: 'SoftGrid: Launch Windows Explorer inside the bubble'
date: 2007-11-12T13:04:12+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/softgrid-launch-windows-explorer-inside-the-bubble
permalink: /softgrid-launch-windows-explorer-inside-the-bubble/
dsq_thread_id:
  - "195379617"
categories:
  - Microsoft
tags:
  - SoftGrid
---
<img src="http://stealthpuppy.com/wp-content/uploads/2008/02/windowsexplorer-softgridbox.png" alt="windowsexplorer-softgridbox.png" align="left" />If you&#8217;ve attempted to launch Windows Explorer as a component of your SoftGrid sequenced applications, you may find that you are not able to view folders within the SoftGrid protected environment (i.e. inside the bubble). When you attempt to view a folder that lies within the bubble or your SoftGrid drive letter, you will receive an &#8216;Access Denied&#8217; error. The reason for this is that the Explorer process is not running within the bubble and thus you won&#8217;t have access to those folder locations.

To get this to work, you&#8217;ll need to ensure that you have enabled the &#8216;Launch folder windows in a separate process&#8217; option. This will enable you to run an EXPLORER.EXE process within the bubble. There are two ways that you can go about enabling this setting:

If you enable this setting in the users&#8217; environment before the application is executed (Tools / Folder Options / View), it will be copied into the bubble and Explorer will run in a separate process.  
[code]PARAMETERS="/n,/root,C:\SomeFolderNameHere" FILENAME="%CSIDL_WINDOWS%\explorer.exe"[/code]  
If you&#8217;ve set this up correctly you should see EXPLORER.EXE as a child process within the SoftGrid protected environment:

<p style="text-align: center;">
  <img src="http://stealthpuppy.com/wp-content/uploads/2007/11/softgrid-explorer.png" alt="softgrid-explorer.png" />
</p>