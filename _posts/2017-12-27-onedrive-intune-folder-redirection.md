---
id: 5893
title: Folder Redirection to OneDrive on Windows 10 with Intune
date: 2017-12-27T22:07:40+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=5893
permalink: /onedrive-intune-folder-redirection/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "6375142064"
image: /wp-content/uploads/2017/12/andrew-pons-6488.jpg
categories:
  - Microsoft
tags:
  - Folder Redirection
  - Intune
  - Modern Management
  - OneDrive
  - ShareFile
  - Windows 10
---
If you&#8217;re deploying Windows 10 with Modern Management (Azure AD joined, MDM managed), you&#8217;ll likely have wondered about data protection - if users aren&#8217;t intentionally saving documents to their OneDrive folder, that data is likely, not synchronised and therefore not protected against data loss.

Traditionally managed PCs will have folder redirection (and offline files) so that user&#8217;s documents are synchronised when connected to the corporate network. Some organisations will even have implemented folder redirection into the OneDrive folder via Group Policy, as a better alternative.

Implementing folder redirection for Windows 10 via Intune currently isn&#8217;t possible, so we need a creative solution to this challenge. With [PowerShell scripts available to deploy via Intune](https://docs.microsoft.com/en-us/intune/intune-management-extension), we can create a custom approach for redirecting essential folders into OneDrive.

**[Update - December 29, 2017]** [A GitHub repository has been established for the scripts in this article](https://github.com/aaronparker/intune/tree/master/Folder-Redirection). Going forward any additional development will occur there. Testing, feedback and improvements can be logged on the repository.

# How Folder Redirection Works

Here&#8217;s an old, but an excellent article that covers [how the Folder Redirection Extension works](https://technet.microsoft.com/en-us/library/cc787939). The document targets Windows XP and Windows Server 2003, but the concepts are still the same in 2017. The article includes the following overview of folder redirection:

> Folder Redirection processing contains five steps:
> 
>   1. Determine which user folders to redirect based on changes to Group Policy settings at the time of logon.
>   2. Determine the target location specified for redirection and confirm the user has access rights to that location.
>   3. If the target folder does not exist, the folder is created and the appropriate access control list (ACL) rights are set.
>   4. If the folder exists, access rights and folder ownership are checked.
>   5. If desired, the files contained within specified folders are moved to the new location, which also deletes them from the source folder if the source folders are local.

In this case, because we&#8217;re looking to redirect folders with the source and destination in the user profile on a local disk, we can skip steps 2, 3, and 4. Step 1 is our primary requirement and step 5 (moving existing data into the new folder on the same disk), should be quick and reasonably safe on modern PCs with SSDs.

Given that we don&#8217;t have Group Policy available to us, we need to implement steps 1 and 5 in such a way that we can be sure the redirection and move of data will be successful.

# Implementing folder redirection in PowerShell 

A script that performs folder redirection using [SHSetKnownFolderPath](https://msdn.microsoft.com/en-us/library/windows/desktop/bb762249) is available from here: [SetupFoldersForOneDrive.ps1](https://gist.github.com/semenko/49a28675e4aae5c8be49b83960877ac5). This script defines a function called Set-KnownFolderPath that can be used to redirect a folder of your choosing to a target path and it works quite well. In its current iteration though, all it does is redirect the folder. 

Because we also need to move the folder contents, I&#8217;ve forked the script and added some additional functionality:



My version updates the **Set-KnownFolderPath** function to ensure all known folders for Documents, Pictures etc. are covered and adds:

  * **Get-KownFolderPath** - we need to know what the existing physical path is before redirecting the folder
  * **Move-Files** - a wrapper for Robocopy.exe. Rather than implement the same functionality of Robocopy in PowerShell, the script references it directly to move the contents of the folder to the new location. This function ensures that we also get a full log of all files moved to the new path.
  * **Redirect-Folder** - this function wraps some testing around the redirect + move functionality
  * Reads the OneDrive for Business sync folder from the registry to avoid hard-coding the target path
  * Implements redirection for the Desktop, Documents and Pictures folders.

My script could do with some additional error checking and robustness; however, it provides the functionality required to redirect specific folders into the OneDrive folder and can be re-run as necessary to enforce redirection for each folder.

# Deploying with Microsoft Intune

Intune allows you to implement PowerShell scripts that run in the user context or Local System contexts. 

<figure id="attachment_5898" aria-describedby="caption-attachment-5898" style="width: 1164px" class="wp-caption aligncenter">[<img class="wp-image-5898 size-full" src="https://stealthpuppy.com/wp-content/uploads/2017/12/ScriptSettings.png" alt="Intune PowerShell script settings, OneDrive" width="1164" height="306" srcset="https://stealthpuppy.com/wp-content/uploads/2017/12/ScriptSettings.png 1164w, https://stealthpuppy.com/wp-content/uploads/2017/12/ScriptSettings-150x39.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/12/ScriptSettings-300x79.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/12/ScriptSettings-768x202.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/12/ScriptSettings-1024x269.png 1024w" sizes="(max-width: 1164px) 100vw, 1164px" />](https://stealthpuppy.com/wp-content/uploads/2017/12/ScriptSettings.png)<figcaption id="caption-attachment-5898" class="wp-caption-text">Intune PowerShell script settings - user context. Not what we want.</figcaption>

Implementing the redirection script in the user context though fails when adding the SHSetKnownFolderPath class to the script session. Additionally, deploying the script in this manner will only run the script once - if the OneDrive client is not configured correctly when the script runs, the folder redirection will then never work.

Instead of deploying the folder redirection script with Intune, we can instead implement a script that downloads the folder redirection script to a local path and creates a scheduled task that runs at user login to run the script. That way, we can be sure that the redirection script will run after the user has logged into the OneDrive client and set up the local sync folder in their profile. Additionally, this approach will enable folder redirection to run for any user logging onto the PC.

The script below will download the redirection script to C:\<span class="pl-smi">ProgramData</span>\Scripts, create the scheduled task and output a transcript into the same folder.

_Note that this downloads the redirection script from my public gist repository. If you implement this in production, I would highly recommend a more secure source for the redirection script._



Right now this script is quite simple - it will need to be updated to remove or update an existing script in the event you need to remove the script from Intune and re-add it.

To deploy the script via Intune, save it locally as Set-RedirectOneDriveTask.ps1 and add as a new PowerShell script under Device Configuration. Ensure that the scheduled task is created successfully with the script run as Local System by setting &#8216;Run this script using the logged on credentials&#8217; to No. 

<figure id="attachment_5901" aria-describedby="caption-attachment-5901" style="width: 2322px" class="wp-caption aligncenter">[<img class="size-full wp-image-5901" src="https://stealthpuppy.com/wp-content/uploads/2017/12/CreateOneDriveRedirectTask.png" alt="Adding the Create OneDrive Redirect Task script to Intune" width="2322" height="794" srcset="https://stealthpuppy.com/wp-content/uploads/2017/12/CreateOneDriveRedirectTask.png 2322w, https://stealthpuppy.com/wp-content/uploads/2017/12/CreateOneDriveRedirectTask-150x51.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/12/CreateOneDriveRedirectTask-300x103.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/12/CreateOneDriveRedirectTask-768x263.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/12/CreateOneDriveRedirectTask-1024x350.png 1024w" sizes="(max-width: 2322px) 100vw, 2322px" />](https://stealthpuppy.com/wp-content/uploads/2017/12/CreateOneDriveRedirectTask.png)<figcaption id="caption-attachment-5901" class="wp-caption-text">Adding the Create OneDrive Redirect Task script to Intune</figcaption>

Assign the script to a user or device group and track deployment progress in the Overview blade. A successful deployment will result in a scheduled task on the target PCs. 

<figure id="attachment_5903" aria-describedby="caption-attachment-5903" style="width: 1264px" class="wp-caption aligncenter">[<img class="size-full wp-image-5903" src="https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectTaskProperties.png" alt="OneDrive Folder Redirection Task Properties" width="1264" height="960" srcset="https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectTaskProperties.png 1264w, https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectTaskProperties-150x114.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectTaskProperties-300x228.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectTaskProperties-768x583.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectTaskProperties-1024x778.png 1024w" sizes="(max-width: 1264px) 100vw, 1264px" />](https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectTaskProperties.png)<figcaption id="caption-attachment-5903" class="wp-caption-text">OneDrive Folder Redirection Task Properties</figcaption>

When the Intune Management Extension runs the script and creates the task, you&#8217;ll see the script and a transcript in C:\ProgramData\Scripts.

<figure id="attachment_5905" aria-describedby="caption-attachment-5905" style="width: 1568px" class="wp-caption aligncenter">[<img class="size-full wp-image-5905" src="https://stealthpuppy.com/wp-content/uploads/2017/12/Scripts.png" alt="The downloaded folder redirection script" width="1568" height="587" srcset="https://stealthpuppy.com/wp-content/uploads/2017/12/Scripts.png 1568w, https://stealthpuppy.com/wp-content/uploads/2017/12/Scripts-150x56.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/12/Scripts-300x112.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/12/Scripts-768x288.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/12/Scripts-1024x383.png 1024w" sizes="(max-width: 1568px) 100vw, 1568px" />](https://stealthpuppy.com/wp-content/uploads/2017/12/Scripts.png)<figcaption id="caption-attachment-5905" class="wp-caption-text">The downloaded folder redirection script</figcaption>

When the folder redirection script runs Robocopy to move documents, it will log those moves to %LocalAppData%\RedirectLogs.

<figure id="attachment_5906" aria-describedby="caption-attachment-5906" style="width: 1568px" class="wp-caption aligncenter">[<img class="size-full wp-image-5906" src="https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectLogs.png" alt="Data copy/move logs" width="1568" height="587" srcset="https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectLogs.png 1568w, https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectLogs-150x56.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectLogs-300x112.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectLogs-768x288.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectLogs-1024x383.png 1024w" sizes="(max-width: 1568px) 100vw, 1568px" />](https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectLogs.png)<figcaption id="caption-attachment-5906" class="wp-caption-text">Data copy/move logs</figcaption>

When implemented in this way, the script will run at user login and successfully enable folder redirection into the OneDrive for Business sync folder. The user will see a PowerShell script window - pointing the scheduled task trigger to a VBscript wrapper could fix this.

## Configuring OneDrive

[Enable single sign-on](https://osddeployment.dk/2017/12/18/how-to-silently-configure-onedrive-for-business-with-intune/) in the OneDrive client for the best user experience. Not necessarily a requirement; however, it will make it quicker for users to be up and running and therefore faster for the script to redirect the target folders.

Given the approach outlined in this article, it&#8217;s unlikely that folder redirection will kick in on the first login. Adding a delay to the scheduled task may allow redirection to work on the first run; however, Intune won&#8217;t necessarily run all PowerShell scripts in the required order.

# Summary

In this article, I&#8217;ve outlined an approach to implementing folder redirection with PowerShell, via Intune, into the OneDrive for Business sync folder. This method uses a script deployed from Intune to Windows 10 Azure AD joined machines to download the folder redirection script and create a scheduled task that runs at user login to perform the redirection and data move.

Redirecting the Desktop, Documents and Pictures to OneDrive should protect key user folders via data synchronisation. While redirecting additional folders is possible, they can often contain data that would be less this ideal for synchronising to OneDrive.

<figure id="attachment_5910" aria-describedby="caption-attachment-5910" style="width: 1776px" class="wp-caption aligncenter">[<img class="size-full wp-image-5910" src="https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectedDocumentsFolder.png" alt="Redirected Documents folder in the OneDrive sync folder" width="1776" height="725" srcset="https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectedDocumentsFolder.png 1776w, https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectedDocumentsFolder-150x61.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectedDocumentsFolder-300x122.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectedDocumentsFolder-768x314.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectedDocumentsFolder-1024x418.png 1024w" sizes="(max-width: 1776px) 100vw, 1776px" />](https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectedDocumentsFolder.png)<figcaption id="caption-attachment-5910" class="wp-caption-text">Redirected Documents folder in the OneDrive sync folder</figcaption>

These scripts are provided as-is, and I highly recommend testing carefully before implementing in production.

## Bonus 

The folder redirection script will work for any enterprise file and sync tool, not just OneDrive for Business. For example, if you wanted to redirect folders into [Citrix ShareFile](https://www.citrix.com/products/sharefile/), just read the **PersonalFolderRootLocation** value from **HKCU\Software\Citrix\ShareFile\Sync** to find the sync folder.