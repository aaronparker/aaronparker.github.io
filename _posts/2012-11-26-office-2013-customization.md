---
id: 2962
title: Prepare your Office 2013 Customizations for Better Deployments and User Experience
date: 2012-11-26T09:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2962
permalink: /office-2013-customization/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "942660998"
categories:
  - Applications
tags:
  - Office
  - Office 2013
---
[<img style="background-image: none; float: right; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border: 0px;" title="Office2013Logo" alt="Office2013Logo" src="https://stealthpuppy.com/wp-content/uploads/2012/11/Office2013Logo_thumb.png" width="128" height="128" align="right" border="0" />](https://stealthpuppy.com/wp-content/uploads/2012/11/Office2013Logo.png)Investing time into [customising the deployment of Office 2013](http://technet.microsoft.com/en-us/library/cc179121.aspx) is essential for providing a well managed deployment and the best out-of-box user experience. If you’re deploying a Windows Installer-based installation of Office 2013, you’ll need to customise the installation using the [Office Customization Tool](http://www.microsoft.com/en-us/download/details.aspx?id=35554).

User settings that might impact the default Office experience or may require special consideration in your environment, are worth investing in planning time because you’ll often have only one chance to get deployment right.

# Use Preference over Policy

Most of the Office user settings can be set as either a default/preference, by customising the Office deployment, or as a policy via Group Policy. The main difference being that a preference is set only during the initial launch of an Office application, whilst a policy may be set on every logon (whether the user launches an Office application or not). This is an important distinction – a preference only needs to be set once and only requires processing at first run, whereas a policy has the potential to be processed at every logon.

Hosted desktop environments where user profiles might be managed with custom solutions might result in GPOs being processed at every logon, even though the GPO has not changed. Judicious use of preferences vs. policies should reduce Group Policy processing time and thus logon time.

I recommend carefully considering each user setting and setting it as a preference instead of a policy wherever possible. Use a policy only where settings must be enforced.

Note that if you are [deploying Office 2013 with Click-to-Run (App-V)](http://technet.microsoft.com/en-us/library/jj219428.aspx), then this level of setting user defaults will not be possible.

# Office Customization

[Office 2013 customisation and deployment](http://technet.microsoft.com/en-us/library/cc178982.aspx) is already well covered in the documentation available on TechNet, so in this article I’ll only cover some highlights and recommendations.

To manage an Office 2013 deployment, copy the Office source files to a folder and ensure you've downloaded the latest updates and service packs. [Extract these and copy into your Office setup folder under Updates](http://technet.microsoft.com/en-us/library/cc178995.aspx). These will then be installed along side Office during setup.

  * [Service Pack 1 for Microsoft Office 2013 (KB2817430) 32-Bit Edition](http://www.microsoft.com/en-us/download/details.aspx?id=42017)
  * [Service Pack 1 for Microsoft Office 2013 (KB2817430) 64-Bit Edition](http://www.microsoft.com/en-us/download/details.aspx?id=42006)

To create an Office Setup Customization, download the  [Office 2013 Administrative Template files (ADMX/ADML) and Office Customization Tool](http://www.microsoft.com/en-us/download/details.aspx?id=35554). After extracting the Office Customization Tool download, [copy the Admin folder to your copy of Office 2013 setup](http://technet.microsoft.com/en-us/library/cc179121.aspx) and create a new Setup Customization File for Office 2013, by running:

[code]SETUP /ADMIN[/code]

The Office Customization Tool will launch:

[<img style="background-image: none; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border: 0px;" title="CreateCustomizationFile" alt="CreateCustomizationFile" src="https://stealthpuppy.com/wp-content/uploads/2012/11/CreateCustomizationFile_thumb.png" width="660" height="380" border="0" />](https://stealthpuppy.com/wp-content/uploads/2012/11/CreateCustomizationFile.png)

Choose the default file types:

[<img style="background-image: none; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border: 0px;" title="FileTypes" alt="FileTypes" src="https://stealthpuppy.com/wp-content/uploads/2012/11/FileTypes_thumb.png" width="660" height="380" border="0" />](https://stealthpuppy.com/wp-content/uploads/2012/11/FileTypes.png)

Set licensing options and the display level of the setup UI. These options will vary dependant on whether you're using KMS or MAK licensing and how you’re deploying Office:

[<img style="background-image: none; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border: 0px;" title="Licensing" alt="Licensing" src="https://stealthpuppy.com/wp-content/uploads/2012/11/Licensing_thumb.png" width="660" height="380" border="0" />](https://stealthpuppy.com/wp-content/uploads/2012/11/Licensing.png)

Navigate to the ‘Modify user settings’ page and set the options applicable to your environment. This is the section where the administrator can make changes to the default user experience:

[<img style="background-image: none; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border: 0px;" title="UserSettings" alt="UserSettings" src="https://stealthpuppy.com/wp-content/uploads/2012/11/UserSettings_thumb.png" width="660" height="380" border="0" />](https://stealthpuppy.com/wp-content/uploads/2012/11/UserSettings.png)

When saving your customization file, you can choose to save it to the Updates folder where it will run automatically, or [use SETUP.EXE to run a specific customization file](http://technet.microsoft.com/en-us/library/cc178956.aspx).

If you save the customization file to the Updates folder, use a descriptive name for the file, but also add "1_" (without quotes) to the file name. This will ensure that the customization MSP will be applied before any other updates.

# User Settings Recommendations

The following table lists a number of user settings across each of the Office 2013 applications that I recommend you take a look at. This is just a small subset of the total number of settings, but includes some of the most important ones.

The status of each setting will vary dependant on the environment. Use at your own risk.

[table id=31 /]