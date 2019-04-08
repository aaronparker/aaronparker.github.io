---
id: 5909
title: Folder Redirection to OneDrive on Windows 10 with Intune
date: 2017-12-29T20:22:03+10:00
author: Aaron Parker
layout: revision
guid: https://stealthpuppy.com/5893-autosave-v1/
permalink: /5893-autosave-v1/
---
If you're deploying Windows 10 with Modern Management (Azure AD joined, MDM managed), you'll likely have wondered about data protection - if users aren't intentionally saving documents to their OneDrive folder, those documents are likely not synchronised and therefore not protected against data loss.

Traditionally managed PCs will have folder redirection (and offline files) so that user's documents are synchronised when corporate network connectivity is restored. Some organisations will even have implemented folder redirection into the OneDrive folder via Group Policy, as a better alternative.

Implementing folder redirection for Windows 10 via Intune currently isn't possible, so we need a creative solution to this challenge. With [PowerShell scripts available to deploy via Intune](https://docs.microsoft.com/en-us/intune/intune-management-extension), we can create a custom approach for redirecting important folders into OneDrive.

# How Folder Redirection Works

Here's an old, but a good article that covers [how the Folder Redirection Extension works](https://technet.microsoft.com/en-us/library/cc787939). It was written for Windows XP / Windows Server 2003, but the concepts are still the same in 2017. The article includes the following overview of folder redirection:

> Folder Redirection processing contains five steps:
> 
>   1. Determine which user folders to redirect based on changes to Group Policy settings at the time of logon.
>   2. Determine the target location specified for redirection and confirm the user has access rights to that location.
>   3. If the target folder does not exist, the folder is created and the appropriate access control list (ACL) rights are set.
>   4. If the folder exists, access rights and folder ownership are checked.
>   5. If desired, the files contained within specified folders are moved to the new location, which also deletes them from the source folder if the source folders are local.

In this case, because we're looking to redirect folders with the source and destination in the user profile on a local disk, we can skip steps 2, 3, and 4. Step 1 is obviously our main requirement and step 5 - moving existing data into the new folder on the same disk, should be quick and reasonably safe on modern PCs with SSDs.

Given that we don't have Group Policy available to us, we need to implement steps 1 and 5 in such a way that we can be sure the redirection and move of data will be successful.

# Implementing folder redirection in PowerShell 

A script that implements folder redirection using [SHSetKnownFolderPath](https://msdn.microsoft.com/en-us/library/windows/desktop/bb762249) is available from here: [SetupFoldersForOneDrive.ps1](https://gist.github.com/semenko/49a28675e4aae5c8be49b83960877ac5). This defines a function called Set-KnownFolderPath that can be used to redirect a known folder of your choosing to a target path and it works quite well. In its current iteration though, all it does is redirect the folder. 

Because we also need to move the folder contents, I've forked the script and added some additional functionality:



This version of the script updates the **Set-KnownFolderPath** function to ensure all known folders for Documents, Pictures etc. are covered and adds:

  * **Get-KownFolderPath** - we need to know what the existing physical path is before redirecting the folder
  * **Move-Files** - a wrapper for Robocopy.exe. Rather than implement the same functionality of Robocopy in PowerShell, the script references it directly to move the contents of the folder to the new location. This ensures that we also get a full log of all files moved to the new path.
  * **Redirect-Folder** - this function wraps some testing around the redirect + move functionality
  * Reads the OneDrive for Business sync folder from the registry to avoid hard-coding the target path
  * Implements redirection for the Desktop, Documents and Pictures folders.

My script could do with some additional error checking and robustness; however, it provides the functionality required to redirect specific folders into the OneDrive folder and can be re-run as required to ensure that redirection is implemented for each folder.

# Deploying with Microsoft Intune

Intune allows you to deploy PowerShell scripts that run either in the user's context or in the Local System context. 

<figure id="attachment_5898" aria-describedby="caption-attachment-5898" style="width: 1164px" class="wp-caption aligncenter">[<img class="wp-image-5898 size-full" src="https://stealthpuppy.com/wp-content/uploads/2017/12/ScriptSettings.png" alt="Intune PowerShell script settings, OneDrive" width="1164" height="306" srcset="https://stealthpuppy.com/wp-content/uploads/2017/12/ScriptSettings.png 1164w, https://stealthpuppy.com/wp-content/uploads/2017/12/ScriptSettings-150x39.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/12/ScriptSettings-300x79.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/12/ScriptSettings-768x202.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/12/ScriptSettings-1024x269.png 1024w" sizes="(max-width: 1164px) 100vw, 1164px" />](https://stealthpuppy.com/wp-content/uploads/2017/12/ScriptSettings.png)<figcaption id="caption-attachment-5898" class="wp-caption-text">Intune PowerShell script settings - user context. Not what we want.*

Implementing the redirection script in the user context though fails when adding the SHSetKnownFolderPath class to the script session. Additionally, deploying the script in this manner will only run the script once - if the OneDrive client is not configured correctly when the script runs, the folder redirection will then never work.

Instead of deploying the folder redirection script with Intune, we can instead deploy a script that downloads the folder redirection script to a local path and creates a scheduled task that runs at user login to run the script. That way, we can be sure that the redirection script will run after the user has logged into the OneDrive client and set up the local sync folder in their profile. Additionally, this approach will enable folder redirection to run for any user logging onto the PC.

The script below will download the redirection script to C:\<span class="pl-smi">ProgramData</span>\Scripts, create the scheduled task and output a transcript into the same folder.

_Note that this downloads the redirection script from my public gist repository. If you implement this in production, I would highly recommend a more secure source for the redirection script._



Right now this script is quite simple - it will need to be updated to remove or update an existing script in the event you need to remove the script from Intune and re-add it.

To deploy the script via Intune, save it locally as Set-RedirectOneDriveTask.ps1 and add as a new PowerShell script under Device Configuration. Ensure that the script runs as Local System by setting 'Run this script using the logged on credentials' to No. This is required for creating the scheduled task. 

<figure id="attachment_5901" aria-describedby="caption-attachment-5901" style="width: 2322px" class="wp-caption aligncenter">[<img class="size-full wp-image-5901" src="https://stealthpuppy.com/wp-content/uploads/2017/12/CreateOneDriveRedirectTask.png" alt="Adding the Create OneDrive Redirect Task script to Intune" width="2322" height="794" srcset="https://stealthpuppy.com/wp-content/uploads/2017/12/CreateOneDriveRedirectTask.png 2322w, https://stealthpuppy.com/wp-content/uploads/2017/12/CreateOneDriveRedirectTask-150x51.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/12/CreateOneDriveRedirectTask-300x103.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/12/CreateOneDriveRedirectTask-768x263.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/12/CreateOneDriveRedirectTask-1024x350.png 1024w" sizes="(max-width: 2322px) 100vw, 2322px" />](https://stealthpuppy.com/wp-content/uploads/2017/12/CreateOneDriveRedirectTask.png)<figcaption id="caption-attachment-5901" class="wp-caption-text">Adding the Create OneDrive Redirect Task script to Intune*

Assign the script to a user or device group and track deployment progress in the Overview blade. A successful deployment will result in a scheduled task on the target PCs. 

<figure id="attachment_5903" aria-describedby="caption-attachment-5903" style="width: 1264px" class="wp-caption aligncenter">[<img class="size-full wp-image-5903" src="https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectTaskProperties.png" alt="OneDrive Folder Redirection Task Properties" width="1264" height="960" srcset="https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectTaskProperties.png 1264w, https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectTaskProperties-150x114.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectTaskProperties-300x228.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectTaskProperties-768x583.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectTaskProperties-1024x778.png 1024w" sizes="(max-width: 1264px) 100vw, 1264px" />](https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectTaskProperties.png)<figcaption id="caption-attachment-5903" class="wp-caption-text">OneDrive Folder Redirection Task Properties*

When the script is downloaded and the task is created successfully, you'll see the script and a transcript in C:\ProgramData\Scripts.

<figure id="attachment_5905" aria-describedby="caption-attachment-5905" style="width: 1568px" class="wp-caption aligncenter">[<img class="size-full wp-image-5905" src="https://stealthpuppy.com/wp-content/uploads/2017/12/Scripts.png" alt="The downloaded folder redirection script" width="1568" height="587" srcset="https://stealthpuppy.com/wp-content/uploads/2017/12/Scripts.png 1568w, https://stealthpuppy.com/wp-content/uploads/2017/12/Scripts-150x56.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/12/Scripts-300x112.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/12/Scripts-768x288.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/12/Scripts-1024x383.png 1024w" sizes="(max-width: 1568px) 100vw, 1568px" />](https://stealthpuppy.com/wp-content/uploads/2017/12/Scripts.png)<figcaption id="caption-attachment-5905" class="wp-caption-text">The downloaded folder redirection script*

When the folder redirection script runs Robocopy to move documents, it will log those moves to %LocalAppData%\RedirectLogs.

<figure id="attachment_5906" aria-describedby="caption-attachment-5906" style="width: 1568px" class="wp-caption aligncenter">[<img class="size-full wp-image-5906" src="https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectLogs.png" alt="Data copy/move logs " width="1568" height="587" srcset="https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectLogs.png 1568w, https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectLogs-150x56.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectLogs-300x112.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectLogs-768x288.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectLogs-1024x383.png 1024w" sizes="(max-width: 1568px) 100vw, 1568px" />](https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectLogs.png)<figcaption id="caption-attachment-5906" class="wp-caption-text">Data copy/move logs*

When implemented in this way, the script will run at user login and successfully implement folder redirection into the OneDrive for Business sync folder. The user will see a PowerShell script window (even though it's set to hidden) - this could be fixed by pointing the scheduled task to a VBscript wrapper.

## Configuring OneDrive

OneDrive should be [configured for single sign-on](https://osddeployment.dk/2017/12/18/how-to-silently-configure-onedrive-for-business-with-intune/) for the best user experience. Not necessarily a requirement; however, it will make it quicker for users to be up and running and therefore quicker for the script to redirect the target folders.

Given the approach outlined in this article, it's unlikely that the user's folders will be redirected on the first login. Adding a delay to the scheduled task may allow redirection to work on the first run; however, this would require several tasks to run in order and Intune won't necessarily run all tasks in the required order.

# Summary

In this article, I've outlined an approach to implementing folder redirection with PowerShell, via Intune, into the OneDrive for Business sync folder. This uses a script deployed from Intune to Windows 10 Azure AD joined machines to download the folder redirection script and create a scheduled task that runs at user login to perform the redirection and data move.

Redirecting the Desktop, Documents and Pictures should provide protection for the key user folders. While redirecting additional documents is possible, they can often contain data that would be less this ideal for synchronising to OneDrive.

<figure id="attachment_5910" aria-describedby="caption-attachment-5910" style="width: 1776px" class="wp-caption aligncenter">[<img class="size-full wp-image-5910" src="https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectedDocumentsFolder.png" alt="Redirected Documents folder in the OneDrive sync folder" width="1776" height="725" srcset="https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectedDocumentsFolder.png 1776w, https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectedDocumentsFolder-150x61.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectedDocumentsFolder-300x122.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectedDocumentsFolder-768x314.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectedDocumentsFolder-1024x418.png 1024w" sizes="(max-width: 1776px) 100vw, 1776px" />](https://stealthpuppy.com/wp-content/uploads/2017/12/RedirectedDocumentsFolder.png)<figcaption id="caption-attachment-5910" class="wp-caption-text">Redirected Documents folder in the OneDrive sync folder*

The scripts I've posted here are provided as-is and I highly recommend testing carefully before implementing in production.

## Bonus 

The folder redirection script will work for any enterprise file and sync tool, not just OneDrive for Business. For example, if you wanted to redirect folders into [Citrix ShareFile](https://www.citrix.com/products/sharefile/), just read the **PersonalFolderRootLocation** value from **HKCU\Software\Citrix\ShareFile\Sync** to find the sync folder.

# Update

[December, 29, 2017] A GitHub repository has been created for the scripts in this article. Going forward any additional developme