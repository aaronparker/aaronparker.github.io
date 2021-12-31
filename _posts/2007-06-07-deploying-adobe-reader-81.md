---
id: 309
title: Deploying Adobe Reader 8
date: 2007-06-07T01:50:28+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/deployment/deploying-adobe-reader-81
permalink: /deploying-adobe-reader-81/
aktt_notify_twitter:
  - 'no'
dsq_thread_id:
  - "195379088"
categories:
  - Automation
tags:
  - Adobe
---
Deployment of Adobe Reader in an enterprise environment has been much simplified since version 6, however there is still some important preparation before you think about deploying version 8. Adobe have compiled information on enterprise deployment which are available on the following pages - I prefer the developer page over the page aimed at IT professionals because it has more information and is a little easier to read:

* [Adobe Developer Centre: Enterprise deployment](http://www.adobe.com/devnet/acrobat/enterprise_deployment.html)
* [Acrobat Solutions for IT professionals: Deploy Adobe Acrobat and Reader](http://www.adobe.com/products/acrobat/solutions/it/index.html)

## Obtaining the Installation Files

Adobe has details of [extracting the installation files for enterprise deployment](http://www.adobe.com/go/kb400540) on their support site. Download [the latest version of Adobe Reader](http://www.adobe.com/products/acrobat/readstep2_allversions.html), this is currently [Adobe Reader 8.1.2](http://ardownload.adobe.com/pub/adobe/reader/win/8.x/8.1.2/enu/AdbeRdr812_en_US.exe). You can extract the installation files by running `AdbeRdr812_en_US.EXE -nos_ne`. You will find the installation files extracted to the following locations:

* On Windows Vista/Windows Server 2008 Setup extracts to: `Users\<username>\AppData\Local\Temp\Adobe Reader 8`
* On Windows XP/Windows Server 2003 Setup extracts to: `Documents and Settings\<username>\Local Settings\Temp\Adobe Reader 8`

## Disabling Unwanted Features

Simplifying Adobe Reader in an enterprise environment is something that we're all looking to do, including disabling the infamous Adobe Updater 5. Disabling features is best done by creating custom transform files. I have instructions on [creating your own transform files using the Adobe Customisation Wizard]({{site.baseurl}}/deployment/disable-adobe-updater-with-adobe-customization-wizard-8), or you can use the transforms files listed here:First up I have a basic transform that sets the following options:

* Supresses the EULA
* Supresses any reboots after installation (I've had mixed results with this)
* Stops the _Adobe Reader 8_ icon from being added to the Desktop
* Removes the _Help/Check for updates_ menu item and prevents the Updater from running automatically
* Removes the _Help/Purchase Adobe Acrobat_ menu item
* Removes the _Help/Digital Editions_ menu item
* Disables the _Start Meeting_ feature
* Stops _Beyond Reader_ from displaying at startup
* Disables the Adobe Online Services

<p class="download">
  <a href="{{site.baseurl}}/media/2007/06/Reader8xBasic.mst">Adobe Reader 8.1.x Basic transform file</a>
</p>

The second transform provides the same settings as above in addition to completely preventing the installation of Adobe Updater:

<p class="download">
  <a href="{{site.baseurl}}/media/2007/06/Reader8xAdvanced.mst">Adobe Reader 8.1.x Advanced transform file</a>
</p>

## Terminal Servers and Browser Integration

When installing Adobe Reader on Terminal Servers, it might be advantageous to disable browser integration, i.e. opening PDF files from within the browser window. The reason for this is that the Reader executable (ACRORD32.EXE) does not exit until the browser is closed. This will cause Reader to continue to consume memory even though it is not in use. To disable browser integration set the **DISABLE\_BROWSER\_INTEGRATION** property to **YES** when installing Reader on Terminal Servers. You can do this by editing the transform or using DISABLE\_BROWSER\_INTEGRATION=YES on the command line. If the command line is not for you, I've created another transform which you can get here:

## Hiding Menu Items

Thanks to [David for the information]({{site.baseurl}}/deployment/deploying-adobe-reader-81#comment-609), you can remove a few more of the menu items in Reader that you might not want hanging around, such as the _Beyond Adobe Reader_ link. Why Adobe has resorted to using JavaScript files to modify the interface is just beyond me. On one hand we can restrict some of the interface via the registry (which even uses the HKLMSoftwarePolicies key) but on the other we need to resort to a method that must be managed on each individual machine. Sometimes developers just floor me with their stupidity.The first listing here is code you can use to find the name of the menu or toolbar button. The second listing shows you the code required to hide the items. Copy the code and save them to Program FilesAdobeReader 8.0ReaderJavascripts.

List menu items:

```js
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

Hide menu items:

```js
//HideMenu.js

//Hides "File" on main toolbar  
//app.hideMenuItem("File");

//Hides File - Open  
app.hideMenuItem("Open");

//Hides File - Attach to email  
app.hideMenuItem("AcroSendMail:SendMail");

//Hides Edit - Check Spelling  
app.hideMenuItem("Spelling:Spelling");

//Hides Edit - Preferences  
app.hideMenuItem("GeneralPrefs");

//Hides View - Menu Bar  
app.hideMenuItem("ShowHideMenuBar");

//Hides View - Toolbars  
app.hideMenuItem("Toolbars");

//Hides View - Navigation Panels  
app.hideMenuItem("Navigation");

//Hides View - Automatically Scroll  
app.hideMenuItem("AutoScroll");

//Hides View - Read Out Loud  
app.hideMenuItem("ReadAloud");

//Hides "Document" on main toolbar  
app.hideMenuItem("Document");

//Hides "Tools" on main toolbar  
//app.hideMenuItem("Tools");

//Hides Tools - Object Data  
app.hideMenuItem("DataToolsItem");

//Hides Tools - Customize Toolbars  
app.hideMenuItem("CustomizeToolbars");

//Hides Help - Beyond Adobe Reader  
app.hideMenuItem("GettingStarted");

//Hides Help - How to  
app.hideMenuItem("HelpHowTo");

//Help - Online Support  
app.hideMenuItem("OnlineSupport");

//Hides Help - Online Support - Knowledge Base  
//app.hideMenuItem("KnowledgeBase");

//Hides Help - Online Support - Adobe Support Programs  
//app.hideMenuItem("AdobeExpertSupport");

//Hides Help - Online Support - Accessibility Resource Center  
//app.hideMenuItem("AccessOnline");

//Hides Help - Online Support - Generate System Report  
//app.hideMenuItem("SystemInformation");

//Hides Help - Repair Adobe Reader Installation  
app.hideMenuItem("DetectAndRepair");

//Hides Help - Purchase Adobe Acrobat  
//app.hideMenuItem("BuyAcro");

//Hides View - Read Out Loud (Great for Terminal Server)  
//app.hideMenuItem("ReadLoud");
```

## Deployment Methods

Most medium to large enterprises will have some sort of application deployment tool already in place, therefore deployment for these organisations should be fairly straight-forward - extract the setup files, create a transform and deploy. Adobe has some fairly straight forward documentation on deploying Adobe Reader via different deployment tools:

* [Group Policy and Active Directory](http://www.adobe.com/devnet/acrobat/pdfs/gpo_ad_8.pdf); and
* [Systems Management Server](http://www.adobe.com/devnet/acrobat/pdfs/sms_8.pdf) (now System Centre Configuration Manager).
* Apparently documentation for using IBM Tivoli Configuration Manager to deploy Reader/Acrobat is 'coming in mid-2007'.

Any organisation utilising Group Policy for application deployment may find things a little more challenging. Check out my post on [deploying applications with Group Policy]({{site.baseurl}}/deployment/group-policy-application-deployment-done-right) for details on doing it the right way.You will also find information on deploying Reader on:

* [Windows Terminal Server](http://www.adobe.com/devnet/acrobat/pdfs/wts_8.pdf); and
* [Citrix Presentation Server](http://www.adobe.com/devnet/acrobat/pdfs/wts_8.pdf)

Why two documents are required for Terminal Server and Presentation Server, I don't know - deployment is exactly the same. If you are deploying via a script, I have details on scripting the installation of Adobe Reader 8.x - [Unattended Install: Adobe Reader 8.x]({{site.baseurl}}/unattended/unattended-install-adobe-reader-8x).
