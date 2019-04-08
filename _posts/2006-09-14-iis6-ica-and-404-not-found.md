---
id: 182
title: IIS6, .ICA and 404 Not Found
date: 2006-09-14T18:03:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/iis6-ica-and-404-not-found
permalink: /iis6-ica-and-404-not-found/
categories:
  - Microsoft
tags:
  - IIS
---
I&#8217;m sure the use of adding .ICA files to web servers to launch published applications from Presentation Server doesn&#8217;t happen as often as it used to, but it&#8217;s still useful for adding a link to an application on an intranet site. After adding a .ICA file to IIS6, however, users may receive a file not found error:

> HTTP Error 404 &#8211; File or directory not found

To fix this error and ensure the browser downloads and executes the file, ensure the .ICA file/s are located in a virtual directory and edit the properties of that directory in IIS Manager. Ensure the execute permissions are set to None and things will work as expected. David Wang has a blog post on a similar situation with [.EXE files and IIS6](http://blogs.msdn.com/david.wang/archive/2005/07/11/Allow_file_downloads_on_IIS_6.aspx).

![](http://stealthpuppy.com/wp-content/uploads/2006/09/1000.14.110.IISAppFolder.png)