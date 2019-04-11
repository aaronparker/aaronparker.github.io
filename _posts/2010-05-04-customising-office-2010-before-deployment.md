---
id: 1549
title: Customising Office 2010 before deployment
date: 2010-05-04T08:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/deployment/customising-office-2010-before-deployment
permalink: /customising-office-2010-before-deployment/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195382420"
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
categories:
  - Applications
tags:
  - Office 2010
---
The Office 2010 [planning, deployment and configuration documentation](http://technet.microsoft.com/en-gb/library/cc303401(office.14).aspx) is far better than what was available for Office 2007 at launch, however it’s worth updating my [Office 2007 deployment]({{site.baseurl}}/tag/office-2007) notes for the changes in Office 2007.

Here’s a walkthrough of the Office 2010 customisation process and some of the key considerations you should make when you’re ready to create your custom Office 2010 deployment.

## Obtaining and running the Office Customization Tool

Starting with Office 2007, Microsoft included [the tools necessary for customising the Office deployment](http://technet.microsoft.com/en-us/library/cc179097.aspx) directly within the installation source rather than having to [download the tool separately](http://office.microsoft.com/en-us/ork2003/HA011401701033.aspx). However this has changed slightly with Office 2010.

If you attempt to run the Office Customization Tool (OCT) from the Office 2010 media you have downloaded from TechNet, MSDN or the Volume License site, you may receive the following error:

[Files necessary to run the Office Customization Tool were not found. Run Setup from the installation point of a qualifying product]({{site.baseurl}}.com/media/2010/05/Office12.png)

Taking a look at the Office installation source, you’ll notice that the _Admin_ folder is not included with any of the Office 2010 products, as it was with the 2007 versions:

[Office installation source without the Admin folder]({{site.baseurl}}.com/media/2010/05/OfficeInstallFolder.png)

Volume license editions of Office should include this folder; however to obtain the _Admin_ folder and the files necessary to run the OCT, you will need to first download the [Office 2010 Administrative Template files (ADM, ADMX/ADML) and Office Customization Tool](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=64b837b6-0aa0-4c07-bc34-bec3990a7956) (read [more about this download here](http://technet.microsoft.com/en-us/library/cc178992(office.14).aspx)). Files for 32-bit and 64-bit versions of Office 2010 are available; so download the file to suit the version of Office you are deploying.

Extract the files by running AdminTemplates\_32.exe or AdminTemplates\_64.exe (or use the `/extract:<folder path> /quiet` switches), then copy the _Admin_ folder to the Office 2010 installation source.

[Office 2010 ADM, ADMX and Admin folders]({{site.baseurl}}.com/media/2010/05/Office2010Admin.png" alt="Office 2010 ADM, ADMX and Admin folders" width="660" height="246" border="0" /> 

The Admin folder containing the OCT files is suitable for all of the Office 2010 products, for example you can copy the same folder to a Visio 2010 source folder to start creating a customisation file for that product.

### Before Customising Office 2010

Before attempting to create an Office customisation for unattended deployment, it’s worth manually installing Office, understanding the components that are installed and seeing the first run experience on a clean machine (and with a clean user profile too).

On first run, Office will prompt users some choices that, in a corporate environment, should probably be made for them. These are Windows Update settings:

[Office 2010 updates choices]({{site.baseurl}}.com/media/2010/05/Office2010Welcome.png" alt="Office 2010 updates choices" width="660" height="365" border="0" /> 

And the default file type choice – will you continue to use the Microsoft file types or go with the [OpenDocument formats](http://en.wikipedia.org/wiki/OpenDocument) instead?

[Office 2010 default file types]({{site.baseurl}}.com/media/2010/05/OfficeFirstRun.png" alt="Office 2010 default file types" width="542" height="411" border="0" /> 

Both of these dialog boxes can be disabled by setting options in a customisation file.

### Creating a custom installation

In this section, I’ve outlined the key steps for creating a customisation file, but you can read about [customising your Office 2010 deployment](http://technet.microsoft.com/en-gb/library/cc178982(office.14).aspx) in more detail on TechNet.

The process for [creating a customisation file for Office 2010](http://technet.microsoft.com/en-gb/library/ee460874(office.14).aspx) is almost the same as for Office 2007 – start the Office Customisation Tool (`SETUP /ADMIN`) and create a new file or [open an existing file for modifying](http://technet.microsoft.com/en-gb/library/ee681791(office.14).aspx).

[[Create a new customisation file or open an existing file]({{site.baseurl}}.com/media/2010/05/Office01_thumb.png" alt="Create a new customisation file or open an existing file]({{site.baseurl}}/media/2010/05/Office01.png)

**Tip**: to avoid the UAC prompt when running Setup, set the _\_COMPAT\_LAYER environment variable to run Setup in the current context. Run `SET __COMPAT_LAYER=RunAsInvoker` before running Setup (both commands should be run from the same Command Prompt).

Just as you would be prompted once Office 2010 is installed, you will need to choose the default file types. Most organisations will probably choose to stick with the Microsoft Open XML formats. Making a choice here will modify the user settings that you will see in a later  step.

![Office02]({{site.baseurl}}.com/media/2010/05/Office02_thumb.png)

A install location for Office can be specified if you don’t want to accept the default. Change this location to a folder on the virtual drive, if you are virtualising Office 2010 with App-V.

![Office 2010 install location]({{site.baseurl}}.com/media/2010/05/Office04.png)

Office 2010 [enforces activation with Volume Activation 2.0](http://technet.microsoft.com/en-gb/library/ee624348(office.14).aspx) – the best strategy for [activating Office 2010](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=311e7e71-ea1d-4ddd-bb36-b68349dd9539) is to [use a KMS host](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=97b7b710-6831-4ce5-9ff5-fdc21fe8d965), which will avoid deploying the product key in your deployment and manual activations. If you do not have access to a KMS key, a MAK key is required (without a key, Setup will fail).

Accept the license agreement and choose the type of user interface that setup will display during installation. SCCM and other ESD deployments should use no user interface.

![Office 2010 customise licensing and setup user interface]({{site.baseurl}}.com/media/2010/05/Office05.png)

The OCT allows you to choose default security settings for Office 2010. I won’t go into that here, instead read this article on TechNet: [Configure security for Office 2010](http://technet.microsoft.com/en-gb/library/ff400327(office.14).aspx).

One of the most important (and time consuming) aspects of the the customisation file is modifying the default user settings. What you set here will depend on the environment you are deploying to, but it’s worth investing in some time to get these default settings correct.

By modifying these settings in the customisation file, users can get up and running with Office 2010 sooner; however treat these as default preferences. Group Policy should be used to enforce settings, not set defaults – the less settings you have in Group Policy the better (less time spent processing policies at logon).

[Modify Office 2010 default user settings]({{site.baseurl}}.com/media/2010/05/Office08.png" alt="Modify Office 2010 default user settings" width="660" height="388" border="0" /> 

The table below lists they most common settings to modify based on my experience deploying Office:

|Product|Path                                      |Setting                                                   |Value                                    |
|-------|------------------------------------------|----------------------------------------------------------|-----------------------------------------|
|Microsoft Excel 2010|Excel Options - Save                      |Default file format                                       |Enabled, Excel Workbook (*.xlsx)         |
|Microsoft Outlook 2010|Outlook Social Connector                  |Turn off Outlook Social Connector                         |Disabled &#124; Enabled                       |
|Microsoft Outlook 2010|Outlook Options - Other - AutoArchive     |AutoArchive Settings                                      |Disabled                                 |
|Microsoft PowerPoint 2010|PowerPoint Options - Save                 |Default file format                                       |Enabled, PowerPoint Presentation (*.pptx)|
|Microsoft Word 2010|Word Options - Save                       |Default file format                                       |Enabled, Word Document (*.docx)          |
|Microsoft Office 2010|Global Options - Customize                |Allow roaming of all user customisations                  |Enabled                                  |
|Microsoft Office 2010|Privacy - Trust Center                    |Disable Opt-in Wizard on first run                        |Enabled                                  |
|Microsoft Office 2010|Privacy - Trust Center                    |Enable Customer Experirnce Improvement Program            |Disabled &#124; Enabled                       |
|Microsoft Office 2010|Privacy - Trust Center                    |Automatically receive small updates to improve reliability|Disabled &#124; Enabled                       |
|Microsoft Office 2010|Office Live Workspace                     |Turn Off Office Live Workspace Integration                |Enabled                                  |
|Microsoft Office 2010|Services - Fax                            |Disable Internet Fax feature                              |Enabled                                  |
|Microsoft Office 2010|Microsoft Office Picture Manager          |Disable File Types association dialog box on first launch |Enabled                                  |
|Microsoft Office 2010|Miscellaneous                             |Do not allow Save to Web integration                      |Enabled                                  |
|Microsoft Office 2010|Miscellaneous                             |Suppress recommended settings dialog                      |Enabled                                  |
|Microsoft OneNote 2010|OneNote Options - Other                   |Add OneNote icon to the notification area                 |Disabled &#124; Enabled                       |
|Microsoft Visio 2010|Visio Options - Advanced - General Options|Put all settings in Windows registry                      |Enabled                                  |

Like user settings, feature installation states will impact on the default Office experience, so you will need to know in advance which features you are deploying. _Install on First Use_ for features is no longer available, so features will either be available or not once deployed, although you can [change feature states after deployment](http://technet.microsoft.com/en-gb/library/cc179141(office.14).aspx).

[Office 2010 feature installation states]({{site.baseurl}}.com/media/2010/05/Office09.png" alt="Office 2010 feature installation states" width="660" height="388" border="0" /> 

Some features that may not be suitable for some corporate environments include:

  * Office Shared Features - [Business Connectivity Services](http://blogs.msdn.com/bcs/)
  * Office Shared Features - Web Themes
  * Office Tools - Hosted Webs

There are several other options available from within the OCT – you can [deploy additional files and programs along side Office](http://technet.microsoft.com/en-gb/library/cc179200(office.14).aspx), [automatically configure Outlook profiles](http://technet.microsoft.com/en-gb/library/cc303392(office.14).aspx) when users first start Outlook and [configure SharePoint Workspaces](http://technet.microsoft.com/en-gb/library/ee649101(office.14).aspx).

Once you have finished creating the customisation file, save it and now you’re ready to start the [Office 2010 deployment process](http://technet.microsoft.com/en-gb/library/ee656739(office.14).aspx).

**Note**: a downloadable version of the Office 2010 deployment resources are available in this document - [Deployment guide for Microsoft Office 2010](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=2d67bf2d-75ff-47d9-ae7b-c67b09a9c902). This is a 216 page document that covers every aspect of Office 2010 deployment

> This book provides how-to information: the recommended steps to execute specific deployment tasks, such as customizing the installation and installing Microsoft Office 2010.
