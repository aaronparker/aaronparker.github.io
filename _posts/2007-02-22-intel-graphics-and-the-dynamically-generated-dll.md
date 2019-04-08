---
id: 98
title: Intel Graphics and the Dynamically Generated DLL
date: 2007-02-22T23:49:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/intel-graphics-and-the-dynamically-generated-dll
permalink: /intel-graphics-and-the-dynamically-generated-dll/
dsq_thread_id:
  - "195378696"
categories:
  - Applications
---
I&#8217;ve recently noticed a DLL file from Intel that keep reappearing on my system drive and I&#8217;ve tracked this down to the display software on my laptop - I&#8217;ve recently moved to a Dell laptop that has an Intel 945GM display adapter. Here&#8217;s the DLL in question:

<span style="font-family: Courier New">C:IntelExtremeGraphicsCUIResourceigfxres.dll </span>

The properties of the DLL show this as the &#8216;Intel Common User Interface&#8217;. The file is loaded by EXPLORER.EXE and is _dynamically created_ in the context of the current user when you right click on the desktop. The file _does not exist_ anywhere else on the computer.

Because I&#8217;m a neat freak when it comes to file systems I don&#8217;t like having stuff like this lying around (pedantic I know), so I thought that I would see what would happen if I stopped the system from creating the file. I removed Authenticated Users (I run as a standard user) from the system drive so that the DLL could not be created. I then got this:

Before:

<img border="0" src="http://stealthpuppy.com/wp-content/uploads/2007/02/1000.14.971.Intel3.png" /> 

After:

<img border="0" src="http://stealthpuppy.com/wp-content/uploads/2007/02/1000.14.972.Intel2.png" /> 

Surely the file does not need to be created at runtime and surely it doesn&#8217;t need to exist in this location? I tested again after copying the DLL to the SYSTEM32 folder and guess what? It worked just as well. Someone over at Intel needs a slap on the wrist.