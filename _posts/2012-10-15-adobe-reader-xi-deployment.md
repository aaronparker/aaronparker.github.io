---
id: 2847
title: Adobe Reader XI Deployment
date: 2012-10-15T12:18:43+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2847
permalink: /adobe-reader-xi-deployment/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "885995009"
categories:
  - Applications
tags:
  - Adobe Reader
---
[Adobe Reader XI](http://get.adobe.com/reader/) is now available and along with this release comes some interesting tools for deployment:

  * Citrix XenApp enhancements for better performance (it's not clear whether this specifically XenApp or RDS enhancements. Hopefully this means reduced memory requirements)
  * New App-V support, including a Package Accelerator (presumably this is App-V 4.6, not 5.0)
  * GPO Template for the most common enterprise settings (this includes a hand full of settings; however removing menu and toolbar items still requires resorting to Javascript)

There's a full list of new features in this blog post: [Announcing Adobe Reader XI](http://blogs.adobe.com/adobereader/2012/10/announcing-adobe-reader-xi.html). All of the bits that are currently available can be downloaded here:

  * [Adobe Reader XI installers in available languages](ftp://ftp.adobe.com/pub/adobe/reader/win/11.x/11.0.00/)
  * [Reader XI Administrative Template](ftp://ftp.adobe.com/pub/adobe/reader/win/11.x/11.0.00/misc/ReaderADMTemplate.zip)
  * [Acrobat XI Administrative Template](ftp://ftp.adobe.com/pub/adobe/acrobat/win/11.x/11.0.00/misc/AcrobatADMTemplate.zip)

## Customisation

Customisation of Reader XI with the Adobe Customization Wizard XI is the same approach as previous versions and I have a comprehensive post on [deploying Adobe Reader X]({{site.baseurl}}/deployment/deploying-adobe-reader-x/) which will largely apply to XI, but Adobe does have customisation and deployment documentation available:

  * [Enterprise Toolkit for Acrobat Products](http://www.adobe.com/devnet-docs/acrobatetk/#)
  * [Adobe Customization Wizard XI documentation](http://www.adobe.com/devnet-docs/acrobatetk/tools/Wizard/Customization%20Wizard%2011%20for%20Windows.pdf)

The [Adobe Customization Wizard XI for Windows](http://www.adobe.com/support/downloads/thankyou.jsp?ftpID=5515&fileID=5526) is now available and the administration experience does not change massively (or at all) from [previous versions]({{site.baseurl}}/deployment/deploying-adobe-reader-x/).

Extracting Reader XI from the installer is the same as previous versions - run the following command:

```powershell
AdbeRdr11000_en_US -nos_o"C:\Folder" -nos_ne
```

Restricting user interface elements in Acrobat/Reader XI is the same as previous versions. This cannot be performed by Group Policy but requires Javascript instead. Here's an example Javascript that you can use to hide the most common menu items:

```javascript
//HideMenu.js

// [Help - Repair Adobe Reader Installation]  
app.hideMenuItem("DetectAndRepair");

// [Help - Check for Updates]  
app.hideMenuItem("Updates");

// [Help - Purchase Adobe Acrobat]  
app.hideMenuItem("Weblink:BuyAcrobat");

// [Help - Digital Editions]  
app.hideMenuItem("eBook:Digital Edition Services");

// [Help - Online Support]  
app.hideMenuItem("OnlineSupport");

// [Help - Online Support - Knowledge Base]  
app.hideMenuItem("KnowledgeBase");

// [Help - Online Support - Adobe Support Programs]  
app.hideMenuItem("AdobeExpertSupport");

// [Help - Online Support - Adobe User Community]  
app.hideMenuItem("AdobeUserCommunity");

// [Help - Online Support - Accessibility Resource Center]  
app.hideMenuItem("AccessOnline");

// [Help - Online Support - Generate System Report]  
app.hideMenuItem("SystemInformation");

// [Help - Product Improvement Options]  
app.hideMenuItem("UsageMeasurement");

// [File - Share Files Using SendNow Online]  
app.hideMenuItem("SPAObject 51");

// [File - CreatePDF Online]  
app.hideMenuItem("SPAObject 47");
```

Save this file as `HideItems.js` and copy the file into `%ProgramFiles%\Adobe\Reader 11.0\Reader\Javascripts`.

To create a custom transform file, open the extracted AcroRead.msi, set your required options and save the transform file. The following table list some recommended options to set via the Customization Wizard. Review these settings to see how they might apply in your environment.

|Section|Item and Settings                                                                                   |
|-------|----------------------------------------------------------------------------------------------------|
|Personalization Options|Suppress display of End User License Agreement (EULA) [Enabled]                                     |
|Installation Options|Default viewer for PDF files [Installer will decide]                                                |
|       |Remove all versions of Reader [Enabled]                                                             |
|       |Enable Optimization [Enabled]                                                                       |
|       |Enable Caching of installer files on local hard drive [Enabled]                                     |
|       |Run Installation [Unattended]                                                                       |
|       |If reboot required at the end of installation [Suppress reboot]                                     |
|Files and Folders|Destination Computer [ProgramFilesFolder / Adobe /Reader 11.0 / Reader / Javascripts / HideItems.js]|
|Shortcuts|Remove [Desktop / Aobe Reader XI shortcut]                                                          |
|Security|Protected View [Off / Files from potentially unsafe locations / All files]                          |
|WebMail Profiles|Prevent end user from configuring WebMail profile [Enabled]                                         |
|Online and Adobe online services Features|Disable product updates [Enabled]                                                                   |
|       |Load trusted root certificates from Adobe [Enable & Install silently]                               |
|       |In Adobe Reader, disable Help > Purchase Adobe Acrobat [Enabled]                                    |
|       |Disable Help > Digital Editions [Enabled]                                                           |
|       |Disable Product Improvement Program [Enabled]                                                       |
|       |Disable Viewin of PDF with Ads for Adobe PDF [Enabled]                                              |

## Deployment

Deployment of Reader XI will be largely the same as Reader X and 9 before it, so if you've deployed Reader previously there's little new.

Although Adobe Reader is free you’ll need to agree to and obtain a license to distribute it in your own environment. Obtaining a license is simple, you’ll just need to answer a few questions such as the number of copies, how you will distribute Reader, which platforms and some information on your company including contact information. To apply for the license go to the [Adobe Runtimes / Reader Distribution License Agreement](http://www.adobe.com/go/rdr_apply_dist).

To deploy Reader in your environment, you would continue to use the same approaches you are using today. Now might be the time to look at delivering Reader with App-V as this is now officially supported. The only hurdle will continue to be in browser (embedded) viewing of PDFs under Internet Explorer.

Whilst the Group Policy management support is great and way overdue, there's currently only a handful of settings - don't expect the same level of policy configuration that we get with Microsoft Office. It remains to be seen whether more will be required in production environments.

![ReaderXI-GroupPolicy]({{site.baseurl}}/media/2012/10/ReaderXI-GroupPolicy.png)

## Finally

Go forth and deploy.
