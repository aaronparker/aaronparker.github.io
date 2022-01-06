---
title: Prepare your Office 2013 Customizations for Better Deployments and User Experience
date: 2012-11-26T09:00:00+10:00
author: Aaron Parker
layout: post
permalink: /office-2013-customization/
categories:
  - Applications
tags:
  - Office
  - Office 2013
---
* this unordered seed list will be replaced by the toc
{:toc}

User settings that might impact the default Office experience or may require special consideration in your environment, are worth investing in planning time because you’ll often have only one chance to get deployment right.

## Use Preference over Policy

Most of the Office user settings can be set as either a default/preference, by customising the Office deployment, or as a policy via Group Policy. The main difference being that a preference is set only during the initial launch of an Office application, whilst a policy may be set on every logon (whether the user launches an Office application or not). This is an important distinction – a preference only needs to be set once and only requires processing at first run, whereas a policy has the potential to be processed at every logon.

Hosted desktop environments where user profiles might be managed with custom solutions might result in GPOs being processed at every logon, even though the GPO has not changed. Judicious use of preferences vs. policies should reduce Group Policy processing time and thus logon time.

I recommend carefully considering each user setting and setting it as a preference instead of a policy wherever possible. Use a policy only where settings must be enforced.

Note that if you are [deploying Office 2013 with Click-to-Run (App-V)](http://technet.microsoft.com/en-us/library/jj219428.aspx), then this level of setting user defaults will not be possible.

## Office Customization

[Office 2013 customisation and deployment](http://technet.microsoft.com/en-us/library/cc178982.aspx) is already well covered in the documentation available on TechNet, so in this article I’ll only cover some highlights and recommendations.

To manage an Office 2013 deployment, copy the Office source files to a folder and ensure you've downloaded the latest updates and service packs. [Extract these and copy into your Office setup folder under Updates](http://technet.microsoft.com/en-us/library/cc178995.aspx). These will then be installed along side Office during setup.

* [Service Pack 1 for Microsoft Office 2013 (KB2817430) 32-Bit Edition](http://www.microsoft.com/en-us/download/details.aspx?id=42017)
* [Service Pack 1 for Microsoft Office 2013 (KB2817430) 64-Bit Edition](http://www.microsoft.com/en-us/download/details.aspx?id=42006)

To create an Office Setup Customization, download the  [Office 2013 Administrative Template files (ADMX/ADML) and Office Customization Tool](http://www.microsoft.com/en-us/download/details.aspx?id=35554). After extracting the Office Customization Tool download, [copy the Admin folder to your copy of Office 2013 setup](http://technet.microsoft.com/en-us/library/cc179121.aspx) and create a new Setup Customization File for Office 2013, by running: `SETUP /ADMIN`

The Office Customization Tool will launch:

![CreateCustomizationFile]({{site.baseurl}}/media/2012/11/CreateCustomizationFile.png)

Choose the default file types:

![FileTypes]({{site.baseurl}}/media/2012/11/FileTypes.png)

Set licensing options and the display level of the setup UI. These options will vary dependant on whether you're using KMS or MAK licensing and how you’re deploying Office:

![Licensing]({{site.baseurl}}/media/2012/11/Licensing.png)

Navigate to the ‘Modify user settings’ page and set the options applicable to your environment. This is the section where the administrator can make changes to the default user experience:

![UserSettings]({{site.baseurl}}/media/2012/11/UserSettings.png)

When saving your customization file, you can choose to save it to the Updates folder where it will run automatically, or [use SETUP.EXE to run a specific customization file](http://technet.microsoft.com/en-us/library/cc178956.aspx).

If you save the customization file to the Updates folder, use a descriptive name for the file, but also add "1_" (without quotes) to the file name. This will ensure that the customization MSP will be applied before any other updates.

## User Settings Recommendations

The following table lists a number of user settings across each of the Office 2013 applications that I recommend you take a look at. This is just a small subset of the total number of settings, but includes some of the most important ones.

The status of each setting will vary dependant on the environment. Use at your own risk.

|Product|Path                                                                                                |Setting                                                              |Recommended Values                       |
|-------|----------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|-----------------------------------------|
|Microsoft Access 2013|Miscellaneous                                                                                       |Disable the Office Start Screen for Access                           |Enabled &#124; Not Configured                 |
|Microsoft Excel 2013|Excel Options - Save                                                                                |Default file format                                                  |Enabled, Excel Workbook (*.xlsx)         |
|Microsoft Excel 2013|Miscellaneous                                                                                       |Disable the Office Start Screen for Excel                            |Enabled &#124; Not Configured                 |
|Microsoft Office 2013|Global Options - Customize                                                                          |Allow roaming of all user customizations                             |Enabled                                  |
|Microsoft Office 2013|Privacy - Trust Center                                                                              |Disable Opt-in Wizard on first run                                   |Enabled                                  |
|Microsoft Office 2013|Privacy - Trust Center                                                                              |Enable Customer Experirnce Improvement Program                       |Disabled &#124; Not Configured                |
|Microsoft Office 2013|Privacy - Trust Center                                                                              |Automatically receive small updates to improve reliability           |Disabled &#124; Not Configured                |
|Microsoft Office 2013|Privacy - Trust Center                                                                              |Send Office Feedback                                                 |Disabled &#124; Not Configured                |
|Microsoft Office 2013|Privacy - Trust Center                                                                              |Allow including screenshot with Office Feedback                      |Disabled &#124; Not Configured                |
|Microsoft Office 2013|Subscription Activation                                                                             |Do not show 'Manage Account' link for subscription licenses          |Enabled &#124; Not Configured                 |
|Microsoft Office 2013|Subscription Activation                                                                             |Automatically activate Office with federated organization credentials|Disabled &#124; Not Configured                |
|Microsoft Office 2013|Services                                                                                            |Disable Roaming Office User Settings                                 |Enabled &#124; Not Configured                 |
|Microsoft Office 2013|Services - Fax                                                                                      |Disable Internet Fax feature                                         |Enabled                                  |
|Microsoft Office 2013|Downloading Framework Components                                                                    |Hide missing component download links                                |Enabled                                  |
|Microsoft Office 2013|Microsoft Office Picture Manager                                                                    |Disable File Types association dialog box on first launch            |Enabled                                  |
|Microsoft Office 2013|Miscellaneous                                                                                       |Show SkyDrive Sign In                                                |Disabled &#124; Not Configured                |
|Microsoft Office 2013|Miscellaneous                                                                                       |Block signing into Office                                            |Enabled &#124; Not Configured                 |
|Microsoft Office 2013|Miscellaneous                                                                                       |Disable the Office Start screen for all Office applications          |Enabled &#124; Not Configured                 |
|Microsoft Office 2013|Miscellaneous                                                                                       |Disable Office Backgrounds                                           |Enabled &#124; Not Configured                 |
|Microsoft Office 2013|Miscellaneous                                                                                       |Suppress recommended settings dialog                                 |Enabled                                  |
|Microsoft Office 2013|First Run                                                                                           |Disable First Run Movie                                              |Enabled &#124; Not Configured                 |
|Microsoft Office 2013|First Run                                                                                           |Disable First Run on application boot                                |Enabled &#124; Not Configured                 |
|Microsoft OneNote 2013|OneNote Options - Other                                                                             |Add OneNote icon to the notification area                            |Disabled &#124; Not Configured                |
|Microsoft Outlook 2013|Outlook Social Connector                                                                            |Turn off Outlook Social Connector                                    |Enabled &#124; Not Configured                 |
|Microsoft Outlook 2013|Outlook Social Connector                                                                            |Do not show social network info-bars                                 |Enabled &#124; Not Configured                 |
|Microsoft Outlook 2013|Outlook Options - Preferences - Calendar Options - Office.com Sharing Service                       |Prevent publishing to Office.com                                     |Enabled &#124; Not Configured                 |
|Microsoft Outlook 2013|Outlook Options - Other - AutoArchive                                                               |AutoArchive Settings                                                 |Disabled                                 |
|Microsoft PowerPoint 2013|PowerPoint Options - Save                                                                           |Default file format                                                  |Enabled, PowerPoint Presentation (*.pptx)|
|Microsoft PowerPoint 2013|Miscellaneous                                                                                       |Disable the Office Start Screen for PowerPoint                       |Enabled &#124; Not Configured                 |
|Microsoft Project 2013|Miscellaneous                                                                                       |Disable the Office Start Screen for Project                          |Enabled &#124; Not Configured                 |
|Microsoft Publisher 2013|Miscellaneous                                                                                       |Disable the Office Start Screen for Publisher                        |Enabled &#124; Not Configured                 |
|Microsoft Visio 2013|Visio Options - Save - Save Documents                                                               |Save Visio files as                                                  |Enabled, Visio Document                  |
|Microsoft Visio 2013|Visio Options - Advanced - General Options                                                          |Put all settings in Windows registry                                 |Enabled                                  |
|Microsoft Word 2013|Word Options - Save                                                                                 |Default file format                                                  |Enabled, Word Document (*.docx)          |
|Microsoft Word 2013|Miscellaneous                                                                                       |Disable the Office Start Screen for Word                             |Enabled &#124; Not Configured                 |
{:.smaller}
