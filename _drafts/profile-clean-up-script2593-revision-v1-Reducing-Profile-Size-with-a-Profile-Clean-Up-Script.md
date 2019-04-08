---
id: 5985
title: Reducing Profile Size with a Profile Clean Up Script
date: 2018-02-16T22:33:30+10:00
author: Aaron Parker
layout: revision
guid: https://stealthpuppy.com/2593-revision-v1/
permalink: /2593-revision-v1/
---
[<img class="size-full wp-image-2604 aligncenter" title="Delete by Cari McGee" src="http://stealthpuppy.com/wp-content/uploads/2011/12/AppleKeyboardDelete.jpg" alt="Delete by Cari McGee" width="640" height="317" srcset="https://stealthpuppy.com/wp-content/uploads/2011/12/AppleKeyboardDelete.jpg 640w, https://stealthpuppy.com/wp-content/uploads/2011/12/AppleKeyboardDelete-150x74.jpg 150w, https://stealthpuppy.com/wp-content/uploads/2011/12/AppleKeyboardDelete-300x148.jpg 300w" sizes="(max-width: 640px) 100vw, 640px" />](http://www.flickr.com/photos/pleeker/5379549514/)

Windows profiles become larger over time - it's an inescapable fact. This means that if you are using roaming profiles, logons (and logoff) will be longer and longer. It's not just individual file sizes, but also the number of files stored in a profile that will make the&nbsp;synchronisation&nbsp;process slower.

One approach to reducing profile sizes is to [exclude certain folders](http://stealthpuppy.com/virtualisation/reduce-logon-times-by-excluding-the-bloat/). A better solution is to ditch roaming profiles and use [a third-party solution to manage roaming of the user environment](http://www.brianmadden.com/blogs/rubenspruijt/archive/2011/11/01/user-environment-management-smackdown-head-to-head-analysis-of-appsense-citrix-immidio-liquidware-labs-microsoft-quest-res-scense-tricerat-unidesk-and-vuem.aspx).

However, there will still be folders that need to be roamed to maintain the experience that users expect when moving between devices (i.e. consistency). For those folders we can implement some maintenance to keep them at a manageable size - that is remove files that are not needed in a roaming profile (e.g. log files) or delete files older than a specific number of days.

<span style="color: #ff0000;">Warning</span>: _there's a reason that Windows doesn't do this maintenance itself - only each application vendor will have an understanding of whether specific files are required or can be discarded (hence the roaming and local portions of AppData). However, as any experienced Windows admin knows - many vendors either don't test for or don't care about roaming scenarios, therefore I strongly recommend testing this approach before production deployment._

As a part of [an upcoming version of this configuration](http://stealthpuppy.com/general/appsense-environment-manager-8-x-baseline-configuration/), I've created a script that will execute at logoff, before the profile is saved back to the network, that will perform two actions:

  1. Delete all files of a specific file type in a specified folder, including sub-folders
  2. Delete all files older than X days&nbsp;in a specified folder, including sub-folders

So for example, you could use the script to delete all .log files below %APPDATA% or delete all Cookies older than 90 days.

The script is extremely simple on purpose and I recommend testing thoroughly before implementing - use at your own risk; however feedback is welcome.

<pre class="prettyprint lang-vbscript" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">' Profile clean up - remove unneeded or old files before logoff
' --------------------------------------------------------------
' Original scripts:
' http://www.wisesoft.co.uk/scripts/vbscript_recursive_file_delete_by_extension.aspx
' http://ss64.com/vb/syntax-profile.html
' http://csi-windows.com/toolkit/csigetspecialfolder

' Version 2.0; 27/12/2011

Option Explicit
On Error Resume Next 'Avoid file in use issues

Dim strExtensionsToDelete, strAppData, strUserProfile, objFSO, strCookies, strHistory, strRecent, objShellApp
Set objFSO = CreateObject("Scripting.FileSystemObject")
Set objShellApp = CreateObject("Shell.Application")
Const CSIDL_COOKIES = "&H21"
Const CSIDL_HISTORY = "&H22"
Const CSIDL_RECENT = "&H08"
Const CSIDL_NETHOOD = "&H13"
Const CSIDL_APPDATA = "&H1A"
Const CSIDL_PROFILE = "&H28"

' Folder to delete files from (files will also be deleted from Subfolders)
strUserProfile = objShellApp.NameSpace(cint(CSIDL_PROFILE)).Self.Path
strAppData = objShellApp.NameSpace(cint(CSIDL_APPDATA)).Self.Path
strCookies = objShellApp.NameSpace(cint(CSIDL_COOKIES)).Self.Path
strHistory = objShellApp.NameSpace(cint(CSIDL_HISTORY)).Self.Path
strRecent = objShellApp.NameSpace(cint(CSIDL_RECENT)).Self.Path
strNetHood = objShellApp.NameSpace(cint(CSIDL_NETHOOD)).Self.Path

' Main
RecursiveDeleteByExtension strAppData, "tmp,log"
RecursiveDeleteOlder 90, strCookies
RecursiveDeleteOlder 14, strRecent
RecursiveDeleteOlder 21, strHistory
RecursiveDeleteOlder 21, strNetHood
RecursiveDeleteOlder 14, strAppData & "\Microsoft\Office\Recent"
'RecursiveDeleteOlder 5, strAppData & "\Sun\Java\Deployment\cache"
'RecursiveDeleteOlder 3, strAppData & "\Macromedia\Flash Player"
'RecursiveDeleteOlder 14, strUserProfile & "\Oracle Jar Cache"

Sub RecursiveDeleteByExtension(ByVal strPath,strExtensionsToDelete)
    ' Walk through strPath and sub-folders and delete files of type strExtensionsToDelete
    Dim objFolder, objSubFolder, objFile, strExt

    If objFSO.FolderExists(strPath) = True Then
        Set objFolder = objFSO.GetFolder(strPath)
        For Each objFile in objFolder.Files
            For each strExt in Split(UCase(strExtensionsToDelete),",")
                If Right(UCase(objFile.Path),Len(strExt)+1) = "." & strExt then
                    WScript.Echo "Deleting: " & objFile.Path
                    objFile.Delete(True)
                    Exit For
                End If
            Next
        Next
        For Each objSubFolder in objFolder.SubFolders
            RecursiveDeleteByExtension objSubFolder.Path,strExtensionsToDelete
        Next
    End If
End Sub

Sub RecursiveDeleteOlder(ByVal intDays,strPath)
    ' Delete files from strPath that are more than intDays old
    Dim objFolder, objFile, objSubFolder

    If objFSO.FolderExists(strPath) = True Then
        Set objFolder = objFSO.GetFolder(strPath)
        For each objFile in objFolder.files
            If DateDiff("d", objFile.DateLastModified,Now) &gt; intDays Then
                If UCase(objFile.Name) &lt;&gt; "DESKTOP.INI" Then ' Ensure we don't delete desktop.ini
                    WScript.Echo "Deleting: " & objFile.Path
                    objFile.Delete(True)
                End If
            End If
        Next
        For Each objSubFolder in objFolder.SubFolders
            RecursiveDeleteOlder intDays,objSubFolder.Path
        Next
    End If
End Sub</pre>

&nbsp;