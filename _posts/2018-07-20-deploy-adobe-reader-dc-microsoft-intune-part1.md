---
id: 6032
title: Adobe Reader DC deployment with Microsoft Intune Part 1
date: 2018-07-20T20:44:19+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=6032
permalink: /deploy-adobe-reader-dc-microsoft-intune-part1/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
image: /media/2018/07/larry-costales-523576-unsplash.jpg
categories:
  - Applications
tags:
  - Adobe
  - Adobe Reader
  - Adobe Reader DC
  - Intune
---
Adobe Reader is of course one of the most common applications on Windows desktops and if you're moving to a Modern Management approach you're likely looking at how to deploy Adobe Reader DC to Windows 10 via Microsoft Intune.

This is a challenge today because Adobe Reader DC comes as an executable, that while it can be extracted for the MSI, it includes support files that cannot be deployed via Intune. Microsoft only enables Windows desktop applications to be [deployed from Intune where the installer is contained in a single file Windows Installer](https://docs.microsoft.com/en-us/intune/lob-apps-windows).

## Adobe Reader DC Executable Installer

The Adobe Reader installer hasn't changed much since as long [as I've been writing about it]({{site.baseurl}}/tag/adobe/) (which has been way too long). What is different with Adobe Reader DC is that Adobe has moved to an evergreen model whereby they're largely moved away from major releases and instead [now deliver a continuous release cycle](https://www.adobe.com/devnet-docs/acrobatetk/tools/AdminGuide/whatsnewdc.html#continuous-vs-classic-comparison).

The [current installer](https://get.adobe.com/reader/enterprise/) for Adobe Reader DC is a single executable that can run as is, or can be extracted for [customisation typical of enterprise environments](https://www.adobe.com/devnet-docs/acrobatetk/tools/Wizard/index.html). When extracted it looks like this:

![Adobe Reader DC extracted files]({{site.baseurl}}/media/2018/07/ReaderDC-ExtractedFiles.png)*Adobe Reader DC extracted files*

This just won't work for deployment via Intune or the Windows 10 MDM channel. We need that single Windows Installer file. Better yet, we need Adobe to make Reader DC available via the Windows Store, but that's a topic for another article.

## Adobe Reader Windows Installer

[Adobe does make a single file Windows Installer available](ftp://ftp.adobe.com/pub/adobe/reader/win/AcrobatDC/1500720033/) for Adobe Reader DC, in various languages; however, the file was released in 2015 and unfortunately they've not updated it since. There has been several major releases and updates since March 2005.

![Adobe Reader DC single file Windows Installer on the public FTP site]({{site.baseurl}}/media/2018/07/AdobeReader-FTPdownloads.png)*Adobe Reader DC single file Windows Installer on the public FTP site*

So, now we have a way to deploy the file, let's see how to customise it and deploy via Intune.

### Customising the Installer

Customisation of the Adobe Reader installer for [enterprise deployment is well documented](https://www.adobe.com/devnet-docs/acrobatetk/tools/AdminGuide/index.html) and [I've written about previous versions several times]({{site.baseurl}}/adobe-reader-xi-deployment/). The same process applies but pay attention to [any version specific settings](https://www.adobe.com/devnet-docs/acrobatetk/tools/AdminGuide/index.html).

Just like previous versions, you use the [Adobe Customization Wizard](https://www.adobe.com/devnet-docs/acrobatetk/tools/Wizard/WizardDC/index.html) to customise the installer for your needs and deploy a custom package.

![Adobe Customization Wizard DC]({{site.baseurl}}/media/2018/07/ReaderDC-CustomizationWizard.png)*Adobe Customization Wizard DC*

However, we can't customise the single file Windows Installer directly because when saving the customisations, we get this:

![Adobe Customization Wizard DC - setup.ini was not found]({{site.baseurl}}/media/2018/07/ReaderDC-SetupIniNotFound.png)*Adobe Customization Wizard DC - setup.ini was not found*

To customise the installer, we need to use a 3 step process:

  1. Download and [extract](https://www.adobe.com/devnet-docs/acrobatetk/tools/AdminGuide/basics.html#expanding-exe-packages) Adobe Reader DC executable installer
  2. [Create a custom transform](https://www.adobe.com/devnet-docs/acrobatetk/tools/Wizard/WizardDC/deployment.html) for this installer
  3. Apply the transform to the single file Windows Installer, so that the customisations are embedded into the installer. [InstEd It! is a great free MSI editor](http://www.instedit.com/download.html) to do that

I won't go into a detailed step-by-step on how to use the Adobe Customization Wizard here because the documentation is detailed enough, but I will include a list of options I recommend you embed into the installer. There are some additional defaults and you may have specific options applicable to your environment.

|Option                                                              |Value                                                                        |
|--------------------------------------------------------------------|-----------------------------------------------------------------------------|
|Personalization Options / EULA Option                               |Suppress display of End User License Agreement (EULA)                        |
|Installation Options / Run Installation                             |Silently                                                                     |
|Installation Options / If reboot required at the end of installation|Suppress reboot                                                              |
|Shortcuts / Desktop                                                 |Remove the Adobe Reader DC shortcut (no one needs that one on the desktop...)|
|Online Services and Features / Disable product updates              |Disabled (i.e. not ticked) - ensure Adobe Reader can update post-deployment  |
|Online Services and Features / Disable Upsell                       |Enabled                                                                      |

As I've listed in the table, it's important to keep the Adobe Updater enabled, so that once Reader is deployed via Intune, end-points can manage updates themselves. I'll cover more on updates in the next article.

Now that you have a customised single file Windows Installer for Adobe Reader DC, you can [import that into Microsoft Intune](https://docs.microsoft.com/en-us/intune/lob-apps-windows), and make it available for deployment.

![Adobe Reader DC installed via Intune]({{site.baseurl}}/media/2018/07/AdobeReaderDC-Installed.png)*Adobe Reader DC installed via Intune*

## Summary

In this article, I've taken a look at how to deploy Adobe Reader DC as a mobile application for Windows 10 devices enrolled in Microsoft Intune via MDM by creating a customised package based on a single file Windows Installer.

[In part 2, I'll take a look at how Adobe Reader is updated]({{site.baseurl}}/deploy-adobe-reader-dc-intune-part2/) post-deployment and discuss whether this type of deployment is the right approach. There are other options and ideally I'd like to see Adobe make Reader DC available via the Microsoft Store.
