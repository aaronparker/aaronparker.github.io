---
title: Deploying Adobe Reader 9 for Windows
date: 2008-07-07T17:40:00+10:00
author: Aaron Parker
layout: post
permalink: /deploying-adobe-reader-9-for-windows/
description: How to create a custom installation for Adobe Reader 9.x for automated deployments
categories:
  - Automation
tags:
  - Adobe
  - Adobe Reader
  - Adobe Updater
  - Silent
  - Transform
  - Unattend
---
* this unordered seed list will be replaced by the toc
{:toc}

As usual consumers will have the Google toolbar pushed on them if they don’t de-select that option when downloading Reader, and now you’ll also get Adobe [AIR](http://www.adobe.com/products/air/) along with Reader too. Awesome, more stuff we don’t really need. A default install leaves two icons on the desktop now – Adobe Reader 9 plus one for [Acrobat.com](https://www.acrobat.com/).

The good news though, is Reader 9.x is fast. I hadn’t ever found Reader 8 to be slow, but version 9 certainty runs noticeably faster than previous versions.

## Downloading Adobe Reader

Adobe Reader 9.1 is available for download for many languages, including:

* [Adobe Reader 9.1 English US/UK](http://ardownload.adobe.com/pub/adobe/reader/win/9.x/9.1/enu/AdbeRdr910_en_US.exe)
* [Adobe Reader 9.1 Français](http://ardownload.adobe.com/pub/adobe/reader/win/9.x/9.1/fra/AdbeRdr910_fr_FR.exe)
* [Adobe Reader 9.1 Deutsch](http://ardownload.adobe.com/pub/adobe/reader/win/9.x/9.1/deu/AdbeRdr910_de_DE.exe)
* [Adobe Reader 9.1 Nederlands](http://ardownload.adobe.com/pub/adobe/reader/win/9.x/9.1/nld/AdbeRdr910_nl_NL.exe)
* [Adobe Reader 9.1 Italiano](http://ardownload.adobe.com/pub/adobe/reader/win/9.x/9.1/ita/AdbeRdr910_it_IT.exe)
* [Adobe Reader 9.1 Español](http://ardownload.adobe.com/pub/adobe/reader/win/9.x/9.1/esp/AdbeRdr910_es_ES.exe)
* [Adobe Reader 9.1 日本語](http://ardownload.adobe.com/pub/adobe/reader/win/9.x/9.1/jpn/AdbeRdr910_ja_JP.exe)

Adobe AIR is only bundled with the English and German versions of Reader 9 so far.

## What To Do About Adobe Updater

Reader 9 continues to include the Adobe Updater application which has been updated to version 6. While I haven’t seen it misbehave for some time and it no longer drops an Updater folder in your Documents folder, you might still want to disable it.

There are a few ways to do this. You can disable Updater by running it (click Help / Check for Updates) then click the Preferences link. You will then see the Preferences dialog like this, where you can choose to disable Updater:

![UpdaterPrefs]({{site.baseurl}}/media/2008/07/updaterprefs.png)

To problem with this approach is that you need Internet access just to get to the preferences dialog. A bit of a problem if you’ve got Internet access issues. To disable Updater from running automatically you can run the following command line as an administrator (or an elevated command prompt in Windows Vista):

```cmd
REG ADD "HKLM\SOFTWARE\Policies\Adobe\Acrobat Reader\9.0\FeatureLockdown" /v bUpdater /d 0 /t REG_DWORD /f
```

Alternatively, to completely remove Adobe Updater, after installation, delete this folder:

* `C:\Program Files\Common Files\AdobeUpdater\6` (32-bit Windows)
* `C:\Program Files (x86)\Common Files\AdobeUpdater\6` (64-bit Windows)

If Adobe Reader is running as a standard (or limited) user account, Adobe Updater won’t run at all, so it shouldn’t be an issue if you don’t give users administrative access to their workstations.

If you are virtualising Adobe Reader, then disabling or removing Updater is a must.

## Extracting Reader Setup Files

Before deploying Reader 9, you will want to extract the files from the file you’ve downloaded, so that you can create a custom transform file. To extract the file, run the following command line:

```AdbeRdr910\_en\_US\_Std.exe -nos\_ne```

You will then find the extracted file in these locations:

* `%LOCALAPPDATA%AdobeReader 9.1Setup Files` (on Windows Vista/2008)
* `%USERPROFILE%Local SettingsApplication DataAdobeReader 9.1Setup Files` (on Windows XP/2003)

Once extracted, you will have the setup files for both Reader and AIR. The setup files for Reader are in a sub-folder called ‘Reader9’.

## Creating a Custom Transform File

When deploying Reader there are some customisations that I recommend making to the installation, including:

* Prevent the installation of Adobe Updater 6 (If you want control over the version of Reader)
* Prevent the Adobe Acrobat SpeedLauncher from being added to the Run key in the registry
* Prevent the ‘Adobe Reader 9’ shortcut from being added to the desktop (Keep the desktop and tidy)
* Prevent the installation of the [Adobe Syncronizer](http://blogs.adobe.com/barnaby.james/2006/12/the_adobe_synch_1.html) [See [this comment]({{site.baseurl}}/deployment/deploying-adobe-reader-9-for-windows#comment-13491) before removing Syncronizer]
* Accept the EULA

Adobe usually provide a customisation tool for automating the installation of Reader, however the [Customisation Wizard for Reader and Acrobat 8](http://www.adobe.com/support/downloads/detail.jsp?ftpID=3564=ZQRI) wasn’t released until 6 months after the products themselves were released. To customise the installation I’ve used the excellent [InstEd](http://www.instedit.com/) instead.

Here’s what I’ve configured as a minimum in my transform:

**Prevent Adobe Updater Installation**

* In the _Component_ table, drop any row containing ‘AdobeUpdater’ or ‘Adobe_Updater’
* In the _Feature_ table, drop any row containing ‘AUM’ or ‘Updater’
* In the _FeatureComponents_ table, drop any row containing ‘AUM’ or ‘Updater’
* In the _File_ table, drop any row containing ‘AdobeUpdater’ or ‘Adobe_Updater’
* In the _ModuleComponents_ table, drop any row containing ‘AdobeUpdater’ or ‘Adobe_Updater’
* In the _MsiFileHash_ table, drop any row containing ‘AdobeUpdater’
* In the _Registry_ table, drop any row containing ‘Adobe_Updater’

**Prevent Adobe Acrobat SpeedLauncher At Startup**

* In the _Registry_ table, drop the row containing ‘Registry838’

**Prevent the Adobe Reader 9 Desktop Shortcut**

* In the _Shortcut_ table, drop the row containing ‘SC\_READER\_DT’

**Prevent Adobe Syncronizer Installation**

* In the _Property_ table, set the value for SYNCHRONIZER to YES

**Accept the EULA**

* In the _Property_ table, set the value for EULA_ACCEPT to YES

Also in the Property table, you could set the value of DISABLE\_BROWSER\_INTEGRATION to YES, to prevent Reader from opening within the browser. This would be beneficial in Terminal Server environments. When a PDF file is opened within the browser and the user then browses to a different page, the Reader components are stay in memory until the browser is closed.

You can download a transform with all of the modifications listed above here (except disabling Syncronizer; use at your own risk):

<p class="download">
  <a href="{{site.baseurl}}/media/2008/07/AdobeReader91Custom.mst">Adobe Reader 9.1 Custom Transform</a>
</p>

## Creating a Custom Transform with Adobe Customisation Wizard 9

Adobe have recently released the [Adobe Customisation Wizard 9](http://www.adobe.com/support/downloads/detail.jsp?ftpID=3993) which is the best place to start when creating a custom transform for Acrobat or Reader 9. Here are the settings I would recommend you configure when creating a transform:

Under _Installation Options_ set:

* <div>
      <em>Run Installation</em> to <em>Unattended</em>
    </div>

* <div>
      <em>If reboot required at the end of installation</em> to <em>Suppress reboot</em>
    </div>

Under Files and Folders:

* <div>
      Add <em>HideMenuItems.js</em>, listed below, to <em>ProgramFilesFolder / Adobe / Reader 9.0 / Reader / JavaScripts</em>
    </div>

Under _Shortcuts_:

* <div>
      Remove the <em>Adobe Reader 9</em> shortcut added to the <em>Desktop</em>
    </div>

Under _EULA and Document Status_ set

* <div>
      <em>Suppress display of End User License Agreement</em> to enabled
    </div>

Under _Online and Acrobat.com Features_ set

* <div>
      <em>Disable all updates</em> to enabled to disable Adobe Updater
    </div>

* <div>
      <em>When launching PDF in Internet Explorer, prompt user with Open/Save dialog</em> to enabled for Terminal Server environments
    </div>

* <div>
      <em>In Adobe Reader, disable Help > Purchase Adobe Acrobat</em> to enabled
    </div>

* <div>
      <em>Disable Help > Digital Editions</em> to enabled
    </div>

* <div>
      <em>Disable Product Improvement Program</em> to enabled
    </div>

* <div>
      <em>Disable Viewing of PDF with Ads for Adobe PDF</em> to enabled
    </div>

* <div>
      <em>Display PDF in browser</em> to <em>Disable & Lock</em> for Terminal Server environments
    </div>

* <div>
      <em>Disable all Acrobat.Com access, including initiation and participation</em> to enabled
    </div>

After you created the transform for Reader 9 with the wizard, you may want to open it in your favourite MSI editor to perform further customisations such as disabling SpeedLauncher.

## Disabling Menus and Buttons

In a corporate environment, you may want to disable some of the menu items and buttons. Just as in Adobe Reader 8, most of these items are disabled with a JavaScript file. Yes a JavaScript file. Whilst using the registry would make sense to control UI items, Adobe uses JavaScript files. I’d love to know the reason why. It’s not a solution that scales particularly well.

To disable UI elements, you will first need to list all of the elements by name. To do this, save the following script as `ListItems.js` in `%ProgramFiles%AdobeReader 9.0ReaderJavaScript`:

```javascript
//ListItems.js  
//Open Javascript Console  
console.show();

//List Toolbar Buttons in the Console  
var toolbarItems = app.listToolbarButtons()  
for( var i in toolbarItems)  
console.println(toolbarItems + "n")

//List Menu Items in the Console  
var menuItems = app.listMenuItems()  
for( var i in menuItems)  
console.println(menuItems + "n")
```

This will open a dialog box when Reader is started, listing the names of each menu item and toolbar button. You can then create a JavaScript file to remove these items from the UI. Reader 9 includes a number of menu items you might want to remove:

![]({{site.baseurl}}/media/2008/07/menushighlighted.png)

Here’s the code you’ll need to hide those items. Copy and paste into `HideItems.js`, then copy into `%ProgramFiles%AdobeReader 9.0ReaderJavaScripts`.

```javascript
//HideMenu.js

// [File - Create Adobe PDF Using Acrobat.com], plus toolbar button  
app.hideMenuItem("WebServices:CreatePDF");  
app.hideToolbarButton("Weblink:CreatePDF");

// [File - Collaborate], plus toolbar button  
app.hideMenuItem("Annots:FileCollaboration");  
app.hideToolbarButton("Annots:CollabToolButton");

// [File - Digital Editions]  
app.hideMenuItem("eBook:Digital Edition Services");

// [Help - Improvement Program Options]  
app.hideMenuItem("UsageMeasurement");

// [Help - Online Support], plus sub menu items  
app.hideMenuItem("OnlineSupport");  
app.hideMenuItem("KnowledgeBase");  
app.hideMenuItem("AdobeExpertSupport");  
app.hideMenuItem("AccessOnline");  
app.hideMenuItem("SystemInformation");

// [Help - Repair Adobe Reader Installation]  
app.hideMenuItem("DetectAndRepair");

// [Help - Check for Updates]  
app.hideMenuItem("Updates");

// [Help - Purchase Adobe Acrobat]  
app.hideMenuItem("Weblink:BuyAcrobat");
```

## Deploying Reader

Deploying Reader should be straight-forward, however you are required to [complete a distribution agreement](http://www.adobe.com/products/acrobat/acrrdistribute.html) to deploy Reader in your environment.

Using [Group Policy Software Installation](http://support.microsoft.com/kb/816102), or your favourite software deployment tool, create a transform file with your required settings and deploy. If you need to use a script, this command will install Reader:

```
START /WAIT MSIEXEC /I AcroRead.msi ALLUSERS=TRUE TRANSFORMS=AdobeReader9.mst /QB
```

## Updating Reader

Updating Adobe Reader can be a bit of a challenge, especially for smaller environments using only Group Policy Software Installation. For Reader 8, Adobe released updates as a complete download of the installer rather than patches. I recommend updating using the full installer as updates for version 9 are released.

If you would really prefer to use the Updater to keep Reader current, you could use the following command in a task using Windows Task Scheduler:

```
"%CommonProgramFiles%\AdobeUpdater\6\Adobe\_Updater.exe" -AU\_LAUNCH\_MODE=1 -AU\_DISPLAY\_LANG=en\_US -AU\_LAUNCH\_APPID=reader9rdr-en_US
```

I can’t vouch for the effectiveness of this approach or even if it will work, so you’re on your own there. Of course you’ll also need to keep Updater in the Reader install package.

## Managing Reader

Managing Reader via Group Policy is pretty simple – Reader 8 and 9 are even policy aware. That is they use the SoftwarePolicies key in the registry. Unfortunately Adobe don’t supply an ADM/ADMX template file for use with Group Policy. C’mon Adobe it wouldn’t take you much effort and we would be very grateful.

So it’s Group Policy Preferences or your favourite user workspace management tool for managing Reader. [Paul](http://www.capslockassassin.com/2008/07/06/adobe-acrobat-reader-9-silent-install/) has taken the time to create a simple [ADM file](http://www.capslockassassin.com/media/2008/07/acrobatreader9.zip) for managing some of Readers features that might suit you.

I've also created my own custom Administrative template, which you can download in ADM and ADMX format. There is still some work to go on this template, so use at your own risk:

<p class="download">
  <a href="{{site.baseurl}}/media/2008/07/AdobeAcrobatAndReader9.zip">Adobe Acrobat and Reader 9 Administrative Template v0.1</a>
</p>

## What Now?

I would recommend updating to Reader 9 if you can. There’s doesn’t look to be any fantastic new features to get excited over, but the performance improvements should make it worthwhile.

* [11/03/2009] Updated for Adobe Reader 9.1
* [29/07/2008] Adobe have posted a [Deploying Adobe Reader 9](http://www.adobe.com/devnet/acrobat/pdfs/deploying_reader9.pdf) document that has some excellent details.
* [07/08/2008] Updated for the release of Adobe Customisation Wizard 9.
* [08/08/2008] Added version 0.1 of custom ADM/ADMX for managing policy settings.
  