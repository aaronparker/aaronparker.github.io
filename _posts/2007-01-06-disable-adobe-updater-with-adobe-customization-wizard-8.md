---
id: 126
title: Disable Adobe Updater with Adobe Customization Wizard 8
date: 2007-01-06T01:32:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/disable-adobe-updater-with-adobe-customization-wizard-8
permalink: /disable-adobe-updater-with-adobe-customization-wizard-8/
views:
  - "3"
dsq_thread_id:
  - "195378804"
categories:
  - Automation
tags:
  - Adobe
---
<p class="alert">
  Note, this post is now out of date; for an Adobe Reader 9 version of this post, go <a href="https://stealthpuppy.com/deployment/deploying-adobe-reader-9-for-windows">here</a>.
</p>

<img align="left" src="https://stealthpuppy.com/wp-content/uploads/2008/02/disableadobeupdater.png" alt="disableadobeupdater.png" />  
Adobe have released the [Adobe Customization Wizard 8](http://www.adobe.com/support/downloads/detail.jsp?ftpID=3564) to provide a method for customising the deployment of version 8 of the Acrobat products. This tool allows you to disable all of the most useless features included in the new release including Digital Editions, Adobe Online Services and even Adobe Updater 5. This means that you can get rid of the Updater5 folder that keeps appearing in your Documents folder.

> Adobe Customization Wizard 8 is a free downloadable utility designed to help IT professionals take greater control of enterprise-wide deployments of Adobe Acrobat 8 and Adobe Reader 8. With it you can customize the Acrobat installer and application features prior to deployment. Providing a graphical interface to the Windows Installer for Acrobat, the Customization Wizard enables IT administrators to:
> 
>   * Modify the installer via a Transform File (or MST file) without altering the original package (MSI file)
>   * Customize the look and feel of Acrobat or Reader before deployment to meet the unique needs of your user base.

<p class="important">
  These instructions are aimed at IT professionals or those with experience installing software. If these instructions look too complex, I recommend getting someone to help out with this process.
</p>

### Disabling Adobe Updater The Easy Way

If you already have Adobe Reader installed and are looking for a simple way to disable the Updater from running automatically, run the following command from a Command Prompt. This will require admin access to the machine you are running this on, so if you are running Windows Vista you must use an elevated command prompt.

[code]REG ADD "HKLMSOFTWAREPoliciesAdobeAcrobat Reader8.0FeatureLockdown" /v bUpdater /d 0 /t REG_DWORD /f[/code]

### Creating a Transform File

If you are invovled in deploying Adobe Reader or want an automated method of disabling Updater, you'll need to create a transform file. Editing the transform to remove Updater 5 is a simple process. You will have to extract the installation files from the download of Adobe Reader 8 before beginning:

  1. Launch the Adobe Customization Wizard and then open an Adobe Reader 8 install package (the .MSI file)
  2. Click **Direct** **Editor** and choose **File** under Tables
  3. Select the AdobeUpdater rows starting from AdobeUpdate.cer on row 13 to Aum5_AdobeUpdater.exe on row 31
  4. Right click these rows and choose Drop Rows
  5. Now select **FeatureComponents** under Tables
  6. Select all of the rows where Feature_ is listed as **AUM5** (Click the Feature_ header to order the rows starting with AUM5)
  7. Right click these rows and choose Drop Rows
  8. Click **Transform** and then **Generate Transform...** to create a transform file

<p class="important">
  I have added <a href="https://stealthpuppy.com/deployment/deploying-adobe-reader-81">new transform files for Adobe Reader 8.1</a> and Reader 8.1.1. The transform files listed here support Reader 8.0 only.
</p>

So you don't have to, I've created a few transform files for use in [deploying Adobe Reader 8](http://www.stealthpuppy.com/blogs/travelling/archive/2006/12/07/deploying-adobe-reader-8.aspx). The first file will remove all of those new online features that come with Reader 8, the second file will do the same as well as _completely_ prevent the installation of Adobe Updater 5 and the third file will prevent the installation of Adobe Updater 5 only (leaving the online features intact):

  * Adobe Reader 8 Transform File: [Disables online features only](https://stealthpuppy.com/wp-content/uploads/2007/01/AdobeReader8NoOnlineOnly.mst)
  * Adobe Reader 8 Transform File: [Disables online features and prevents installation of Updater 5](https://stealthpuppy.com/wp-content/uploads/2007/01/AdobeReader8NoOnlineNoUpdater.mst)
  * Adobe Reader 8 Transform File: [Prevents the installation of Updater 5 only](https://stealthpuppy.com/wp-content/uploads/2007/01/AdobeReader8NoUpdaterOnly.mst)
  * Adobe Reader 8 Transform File: [Disable online features, prevent installation of Updater 5 and the Collaboration Synchroniser](https://stealthpuppy.com/wp-content/uploads/2007/01/AdobeReader8NoOnlineNoUpdaterNoCollabSync.mst)

Please note that if you install Adobe Reader using one of the above transform files, a number of registry keys will be created at: `HKEY_LOCAL_MACHINESOFTWAREPoliciesAdobeAcrobat Reader8.0FeatureLockdown`. If you manually delete this key, it will be re-installed the next time you launch Adobe Reader.

### Installing Adobe Reader 8

I've updated my [Adobe Reader 8 install script](http://www.stealthpuppy.com/blogs/travelling/pages/adobe-reader-8-0.aspx) to reflect some of the things we can do with the Customisation Wizard, however here's the quick lowdown on how to install Adobe Reader 8 without all of the new in your face features:

  1. Download the [Adobe Reader 8 package](http://ardownload.adobe.com/pub/adobe/reader/win/8.x/8.0/enu/AdbeRdr80_en_US.exe) from the Adobe web site
  2. Run the package and save the extracted setup files to from `C:Users<username>AppDataLocalLowNetopsystemstempAdobe Reader 8.0` on Windows Vista or `C:Documents and Settings<username>Local SettingsTemp1Adobe Reader 8.0` on Windows 2000/XP/2003, to a folder elsewhere on your system (e.g. C:TempAdobe)
  3. Download [this zip file](https://stealthpuppy.com/wp-content/uploads/2007/01/AdobeReader8Install.zip) that contains the install script and a copy of the transform file that will disable Adobe Reader's new online features and Updater 5
  4. Extract `InstallAdobeReader8.CMD` and `AdobeReader8NoOnlineNoUpdater.MST` into the same folder to where you have copied the Adobe Reader 8 setup files in step 2
  5. Run `InstallAdobeReader8.CMD` from Windows Explorer or a command prompt (an elevated command prompt in Windows Vista) and your custom installation of Adobe Reader 8 will complete
  6. Voila! No more Updater5 folder inside your Documents folder and no annoying online features of Adobe Reader 8.