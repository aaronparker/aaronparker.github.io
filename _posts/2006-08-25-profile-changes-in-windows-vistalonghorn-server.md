---
id: 200
title: Profile Changes in Windows Vista and Windows Server 2008 and beyond
date: 2006-08-25T06:08:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/profile-changes-in-windows-vistalonghorn-server
permalink: /profile-changes-in-windows-vistalonghorn-server/
categories:
  - Microsoft
---
Windows Vista and Windows Server 2008 introduce a number of new user profile paths and environment variables that differ from earlier versions of Windows and these changes may have an impact on scripts such as logon scripts and application install scripts. Most scripts should work correctly - VBScript scripts that use system functions to find folder paths should work as expected, however batch scripts that use environment variables or hard codes scripts will require modifications. Here's a short run down of the changes.

The following table lists the old profile path and the corresponding new path under Windows Vista/Windows Server 2008:

[table id=8 /]

Folders to take note of here are the folders in the All Users path. Many older applications that use out of date methods to resolve system folders, will resolve paths under \ProgramData when looking for common locations. For example the common desktop may be resolved as \ProgramData\Desktop, however this is actually a junction point for \Users\Public\Desktop. A DIR /A:H listing in \ProgramData folder reveals the following junction points:

[table id=9 /]

These junction points should offer backward compatibility for older applications, however I have found that some of my installation scripts are not cleaning up shortcuts from the public desktop as expected.

There are also differences in environment variables between the new version of Windows and the older versions. Windows Server 2003 and below define the following variables relating to profiles:

`ALLUSERSPROFILE=C:\Documents and Settings\All Users<br />
APPDATA=C:\Documents and Settings\aaron\Application Data<br />
HOMEPATH=\Documents and Settings\aaron<br />
TEMP=C:\DOCUME~1\aaron\LOCALS~1\Temp<br />
TMP=C:\DOCUME~1\aaron\LOCALS~1\Temp<br />
USERPROFILE=C:\Documents and Settings\aaron<br />
` 

Windows Vista and Windows Server 2008 define the same variables while adding a couple more.

`ALLUSERSPROFILE=C:\ProgramData<br />
APPDATA=C:\Users\aaronp\AppData\Roaming<br />
HOMEPATH=\Users\aaronp<br />
LOCALAPPDATA=C:\Users\aaronp\AppData\Local<br />
ProgramData=C:\ProgramData<br />
PUBLIC=C:\Users\Public<br />
TEMP=C:\Users\aaronp\AppData\Local\Temp<br />
TMP=C:\Users\aaronp\AppData\Local\Temp<br />
USERPROFILE=C:\Users\aaronp`

In practice, I've found that scripts that reference locations such as %ALLUSERSPROFILE%\Desktop, are not performing actions as intended and will have to be updated to use %PUBLIC% instead. Certainly something that requires more investigation.

**UPDATE**: Microsoft have an excellent reference document that details the profile changes in Windows Vista and how roaming profiles should managed in a Windows Vista environment. Check it out for more information that what I've listed here:

[Managing Roaming User Data Deployment Guide](http://www.microsoft.com/technet/windowsvista/library/fb3681b2-da39-4944-93ad-dd3b6e8ca4dc.mspx)