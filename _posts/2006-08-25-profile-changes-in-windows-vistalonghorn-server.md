---

title: Profile Changes in Windows Vista and Windows Server 2008 and beyond
date: 2006-08-25T06:08:00+10:00
author: Aaron Parker
layout: post

permalink: /profile-changes-in-windows-vistalonghorn-server/
categories:
  - Microsoft
---
Windows Vista and Windows Server 2008 introduce a number of new user profile paths and environment variables that differ from earlier versions of Windows and these changes may have an impact on scripts such as logon scripts and application install scripts. Most scripts should work correctly - VBScript scripts that use system functions to find folder paths should work as expected, however batch scripts that use environment variables or hard codes scripts will require modifications. Here's a short run down of the changes.

The following table lists the old profile path and the corresponding new path under Windows Vista/Windows Server 2008:

|Old Path                                                         |New Path                                                            |
|-----------------------------------------------------------------|--------------------------------------------------------------------|
|Documents and Settings                                           |Users                                                               |
|Documents and Settings\Default User                              |Users\Default                                                       |
|Documents and Settings\All Users\Application Data                |ProgramData                                                         |
|Documents and Settings\All Users\Start Menu                      |ProgramData\Microsoft\Windows\Start Menu                            |
|Documents and Settings\All Users\Templates                       |ProgramData\Microsoft\Windows\Templates                             |
|Documents and Settings\{username}\Local Settings\Application Data|Users\{username}\AppData\Local                                      |
|N/A                                                              |Users\{username}\AppData\LocalLow                                   |
|Documents and Settings\{username}\Application Data               |Users\{username}\AppData\Roaming                                    |
|Documents and Settings\{username}\Cookies                        |Users\{username}\AppData\Roaming\Microsoft\Windows\Cookies          |
|Documents and Settings\{username}\NetHood                        |Users\{username}\AppData\Roaming\Microsoft\Windows\Network Shortcuts|
|Documents and Settings\{username}\PrintHood                      |Users\{username}\AppData\Roaming\Microsoft\Windows\Printer Shortcuts|
|Documents and Settings\{username}\Recent                         |Users\{username}\AppData\Roaming\Microsoft\Windows\Recent           |
|Documents and Settings\{username}\SendTo                         |Users\{username}\AppData\Roaming\Microsoft\Windows\SendTo           |
|Documents and Settings\{username}\Start Menu                     |Users\{username}\AppData\Roaming\Microsoft\Windows\Start Menu       |
|Documents and Settings\{username}\Templates                      |Users\{username}\AppData\Roaming\Microsoft\Windows\Templates        |
|N/A                                                              |Users\{username}\Contacts                                           |
|Documents and Settings\{username}\Desktop                        |Users\{username}\Desktop                                            |
|Documents and Settings\{username}\My Documents                   |Users\{username}\Documents                                          |
|N/A                                                              |Users\{username}\Downloads                                          |
|Documents and Settings\{username}\Favorites                      |Users\{username}\Favorites                                          |
|N/A                                                              |Users\{username}\Links                                              |
|Documents and Settings\{username}\My Documents\My Music          |Users\{username}\Music                                              |
|Documents and Settings\{username}\My Documents\My Pictures       |Users\{username}\Pictures                                           |
|N/A                                                              |Users\{username}\Saved Games                                        |
|N/A                                                              |Users\{username}\Searches                                           |
|Documents and Settings\{username}\My Documents\My Videos         |Users\{username}\Videos                                             |
|Documents and Settings\All Users                                 |Users\Public                                                        |
|Documents and Settings\All Users\Desktop                         |Users\Public\Desktop                                                |
|Documents and Settings\All Users\Documents                       |Users\Public\Documents                                              |
|Documents and Settings\All Users\Favorites                       |Users\Public\Favorites                                              |
|Documents and Settings\All Users\Documents\My Music              |Users\Public\Music                                                  |
|Documents and Settings\All Users\Documents\My Pictures           |Users\Public\Pictures                                               |
|Documents and Settings\All Users\Documents\My Videos             |Users\Public\Videos                                                 |

Folders to take note of here are the folders in the All Users path. Many older applications that use out of date methods to resolve system folders, will resolve paths under \ProgramData when looking for common locations. For example the common desktop may be resolved as `\ProgramData\Desktop`, however this is actually a junction point for `\Users\Public\Desktop`. A DIR /A:H listing in `\ProgramData` folder reveals the following junction points:

|Path                                                             |Points To                                                           |
|-----------------------------------------------------------------|--------------------------------------------------------------------|
|ProgramData\Application Data                                     |ProgramData                                                         |
|ProgramData\Desktop                                              |Users\Public\Desktop                                                |
|ProgramData\Documents                                            |Users\Public\Documents                                              |
|ProgramData\Favorites                                            |Users\Public\Favorites                                              |
|ProgramData\Start Menu                                           |ProgramData\Microsoft\Windows\Start Menu                            |
|ProgramData\Templates                                            |ProgramData\Microsoft\Windows\Templates                             |
{:.smaller}

These junction points should offer backward compatibility for older applications, however I have found that some of my installation scripts are not cleaning up shortcuts from the public desktop as expected.

There are also differences in environment variables between the new version of Windows and the older versions. Windows Server 2003 and below define the following variables relating to profiles:

```
ALLUSERSPROFILE=C:\Documents and Settings\All Users
APPDATA=C:\Documents and Settings\aaron\Application Data
HOMEPATH=\Documents and Settings\aaron
TEMP=C:\DOCUME~1\aaron\LOCALS~1\Temp
TMP=C:\DOCUME~1\aaron\LOCALS~1\Temp
USERPROFILE=C:\Documents and Settings\aaron
```

Windows Vista and Windows Server 2008 define the same variables while adding a couple more.

```
ALLUSERSPROFILE=C:\ProgramData
APPDATA=C:\Users\aaronp\AppData\Roaming
HOMEPATH=\Users\aaronp
LOCALAPPDATA=C:\Users\aaronp\AppData\Local
ProgramData=C:\ProgramData
PUBLIC=C:\Users\Public
TEMP=C:\Users\aaronp\AppData\Local\Temp
TMP=C:\Users\aaronp\AppData\Local\Temp
USERPROFILE=C:\Users\aaronp
```

In practice, I've found that scripts that reference locations such as %ALLUSERSPROFILE%\Desktop, are not performing actions as intended and will have to be updated to use %PUBLIC% instead. Certainly something that requires more investigation.

**UPDATE**: Microsoft have an excellent reference document that details the profile changes in Windows Vista and how roaming profiles should managed in a Windows Vista environment. Check it out for more information that what I've listed here:

[Managing Roaming User Data Deployment Guide](http://www.microsoft.com/technet/windowsvista/library/fb3681b2-da39-4944-93ad-dd3b6e8ca4dc.mspx)
