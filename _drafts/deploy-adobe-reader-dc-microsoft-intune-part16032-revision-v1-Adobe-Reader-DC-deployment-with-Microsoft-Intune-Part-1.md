---
id: 6060
title: Adobe Reader DC deployment with Microsoft Intune Part 1
date: 2018-07-22T21:38:29+10:00
author: Aaron Parker
layout: revision
guid: https://stealthpuppy.com/6032-revision-v1/
permalink: /6032-revision-v1/
---
Adobe Reader is of course one of the most common applications on Windows desktops and if you&#8217;re moving to a Modern Management approach you&#8217;re likely looking at how to deploy Adobe Reader DC to Windows 10 via Microsoft Intune.&nbsp;

This is a challenge today because Adobe Reader DC comes as an executable, that while it can be extracted for the MSI, it includes support files that cannot be deployed via Intune. Microsoft only enables Windows desktop applications to be [deployed from Intune where the installer is contained in a single file Windows Installer](https://docs.microsoft.com/en-us/intune/lob-apps-windows).

# Adobe Reader DC Executable Installer

The Adobe Reader installer hasn&#8217;t changed much since as long [as I&#8217;ve been writing about it](https://stealthpuppy.com/tag/adobe/)&nbsp;(which has been way too long). What is different with Adobe Reader DC is that Adobe has moved to an evergreen model whereby they&#8217;re largely moved away from major releases and instead [now deliver a continuous release cycle](https://www.adobe.com/devnet-docs/acrobatetk/tools/AdminGuide/whatsnewdc.html#continuous-vs-classic-comparison).

The [current installer](https://get.adobe.com/reader/enterprise/) for Adobe Reader DC is a single executable that can run as is, or can be extracted for [customisation typical of enterprise environments](https://www.adobe.com/devnet-docs/acrobatetk/tools/Wizard/index.html). When extracted it looks like this:

<figure id="attachment_6035" aria-describedby="caption-attachment-6035" style="width: 2190px" class="wp-caption aligncenter">[<img class="size-full wp-image-6035" src="https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-ExtractedFiles.png" alt="Adobe Reader DC extracted files" width="2190" height="965" srcset="http://192.168.0.89/wp-content/uploads/2018/07/ReaderDC-ExtractedFiles.png 2190w, http://192.168.0.89/wp-content/uploads/2018/07/ReaderDC-ExtractedFiles-150x66.png 150w, http://192.168.0.89/wp-content/uploads/2018/07/ReaderDC-ExtractedFiles-300x132.png 300w, http://192.168.0.89/wp-content/uploads/2018/07/ReaderDC-ExtractedFiles-768x338.png 768w, http://192.168.0.89/wp-content/uploads/2018/07/ReaderDC-ExtractedFiles-1024x451.png 1024w" sizes="(max-width: 2190px) 100vw, 2190px" />](https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-ExtractedFiles.png)<figcaption id="caption-attachment-6035" class="wp-caption-text">Adobe Reader DC extracted files</figcaption></figure>

This just won&#8217;t work for deployment via Intune or the Windows 10 MDM channel. We need that single Windows Installer file. Better yet, we need Adobe to make Reader DC available via the Windows Store, but that&#8217;s a topic for another article.

# Adobe Reader Windows Installer

[Adobe does make a single file Windows Installer available](ftp://ftp.adobe.com/pub/adobe/reader/win/AcrobatDC/1500720033/) for Adobe Reader DC, in various languages; however, the file was released in 2015 and unfortunately they&#8217;ve not updated it since. There has been several major releases and updates since March 2005.

<figure id="attachment_6037" aria-describedby="caption-attachment-6037" style="width: 1768px" class="wp-caption aligncenter">[<img class="size-full wp-image-6037" src="https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReader-FTPdownloads.png" alt="Adobe Reader DC single file Windows Installer on the public FTP site" width="1768" height="976" srcset="http://192.168.0.89/wp-content/uploads/2018/07/AdobeReader-FTPdownloads.png 1768w, http://192.168.0.89/wp-content/uploads/2018/07/AdobeReader-FTPdownloads-150x83.png 150w, http://192.168.0.89/wp-content/uploads/2018/07/AdobeReader-FTPdownloads-300x166.png 300w, http://192.168.0.89/wp-content/uploads/2018/07/AdobeReader-FTPdownloads-768x424.png 768w, http://192.168.0.89/wp-content/uploads/2018/07/AdobeReader-FTPdownloads-1024x565.png 1024w" sizes="(max-width: 1768px) 100vw, 1768px" />](https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReader-FTPdownloads.png)<figcaption id="caption-attachment-6037" class="wp-caption-text">Adobe Reader DC single file Windows Installer on the public FTP site</figcaption></figure>

So, now we have a way to deploy the file, let&#8217;s see how to customise it and deploy via Intune.

## Customising the Installer

Customisation of the Adobe Reader installer for [enterprise deployment is well documented](https://www.adobe.com/devnet-docs/acrobatetk/tools/AdminGuide/index.html) and [I&#8217;ve written about previous versions several times](https://stealthpuppy.com/adobe-reader-xi-deployment/). The same process applies but pay attention to [any version specific settings](https://www.adobe.com/devnet-docs/acrobatetk/tools/AdminGuide/index.html).

Just like previous versions, you use the [Adobe Customization Wizard](https://www.adobe.com/devnet-docs/acrobatetk/tools/Wizard/WizardDC/index.html) to customise the installer for your needs and deploy a custom package.

<figure id="attachment_6040" aria-describedby="caption-attachment-6040" style="width: 2212px" class="wp-caption aligncenter">[<img class="size-full wp-image-6040" src="https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-CustomizationWizard.png" alt="Adobe Customization Wizard DC" width="2212" height="1206" srcset="http://192.168.0.89/wp-content/uploads/2018/07/ReaderDC-CustomizationWizard.png 2212w, http://192.168.0.89/wp-content/uploads/2018/07/ReaderDC-CustomizationWizard-150x82.png 150w, http://192.168.0.89/wp-content/uploads/2018/07/ReaderDC-CustomizationWizard-300x164.png 300w, http://192.168.0.89/wp-content/uploads/2018/07/ReaderDC-CustomizationWizard-768x419.png 768w, http://192.168.0.89/wp-content/uploads/2018/07/ReaderDC-CustomizationWizard-1024x558.png 1024w" sizes="(max-width: 2212px) 100vw, 2212px" />](https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-CustomizationWizard.png)<figcaption id="caption-attachment-6040" class="wp-caption-text">Adobe Customization Wizard DC</figcaption></figure>

However, we can&#8217;t customise the single file Windows Installer directly because when saving the customisations, we get this:

<figure id="attachment_6041" aria-describedby="caption-attachment-6041" style="width: 2212px" class="wp-caption aligncenter">[<img class="size-full wp-image-6041" src="https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-SetupIniNotFound.png" alt="Adobe Customization Wizard DC - setup.ini was not found" width="2212" height="1206" srcset="http://192.168.0.89/wp-content/uploads/2018/07/ReaderDC-SetupIniNotFound.png 2212w, http://192.168.0.89/wp-content/uploads/2018/07/ReaderDC-SetupIniNotFound-150x82.png 150w, http://192.168.0.89/wp-content/uploads/2018/07/ReaderDC-SetupIniNotFound-300x164.png 300w, http://192.168.0.89/wp-content/uploads/2018/07/ReaderDC-SetupIniNotFound-768x419.png 768w, http://192.168.0.89/wp-content/uploads/2018/07/ReaderDC-SetupIniNotFound-1024x558.png 1024w" sizes="(max-width: 2212px) 100vw, 2212px" />](https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-SetupIniNotFound.png)<figcaption id="caption-attachment-6041" class="wp-caption-text">Adobe Customization Wizard DC &#8211; setup.ini was not found</figcaption></figure>

To customise the installer, we need to use a 3 step process:

  1. Download and [extract](https://www.adobe.com/devnet-docs/acrobatetk/tools/AdminGuide/basics.html#expanding-exe-packages) Adobe Reader DC executable installer
  2. [Create a custom transform](https://www.adobe.com/devnet-docs/acrobatetk/tools/Wizard/WizardDC/deployment.html) for this installer
  3. Apply the transform to the single file Windows Installer, so that the customisations are embedded into the installer. [InstEd It! is a great free MSI editor](http://www.instedit.com/download.html) to do that

I won&#8217;t go into a detailed step-by-step on how to use the Adobe Customization Wizard here because the documentation is detailed enough, but I will include a list of options I recommend you embed into the installer. There are some additional defaults and you may have specific options applicable to your environment.

[table id=46 /]

As I&#8217;ve listed in the table, it&#8217;s important to keep the Adobe Updater enabled, so that once Reader is deployed via Intune, end-points can manage updates themselves. I&#8217;ll cover more on updates in the next article.

Now that you have a customised single file Windows Installer for Adobe Reader DC, you can [import that into Microsoft Intune](https://docs.microsoft.com/en-us/intune/lob-apps-windows), and make it available for deployment.

<figure id="attachment_6044" aria-describedby="caption-attachment-6044" style="width: 2880px" class="wp-caption aligncenter">[<img class="size-full wp-image-6044" src="https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-Installed.png" alt="Adobe Reader DC installed via Intune" width="2880" height="1800" srcset="http://192.168.0.89/wp-content/uploads/2018/07/AdobeReaderDC-Installed.png 2880w, http://192.168.0.89/wp-content/uploads/2018/07/AdobeReaderDC-Installed-150x94.png 150w, http://192.168.0.89/wp-content/uploads/2018/07/AdobeReaderDC-Installed-300x188.png 300w, http://192.168.0.89/wp-content/uploads/2018/07/AdobeReaderDC-Installed-768x480.png 768w, http://192.168.0.89/wp-content/uploads/2018/07/AdobeReaderDC-Installed-1024x640.png 1024w" sizes="(max-width: 2880px) 100vw, 2880px" />](https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-Installed.png)<figcaption id="caption-attachment-6044" class="wp-caption-text">Adobe Reader DC installed via Intune</figcaption></figure>

# Summary

In this article, I&#8217;ve taken a look at how to deploy Adobe Reader DC as a mobile application for Windows 10 devices enrolled in Microsoft Intune via MDM by creating a customised package based on a single file Windows Installer.

[In part 2, I&#8217;ll take a look at how Adobe Reader is updated](https://stealthpuppy.com/deploy-adobe-reader-dc-intune-part2/) post-deployment and discuss whether this type of deployment is the right approach. There are other options and ideally I&#8217;d like to see Adobe make Reader DC available via the Microsoft Store.

<a style="background-color: black; color: white; text-decoration: none; padding: 4px 6px; font-family: -apple-system, BlinkMacSystemFont, 'San Francisco', 'Helvetica Neue', Helvetica, Ubuntu, Roboto, Noto, 'Segoe UI', Arial, sans-serif; font-size: 12px; font-weight: bold; line-height: 1.2; display: inline-block; border-radius: 3px;" title="Download free do whatever you want high-resolution photos from Larry Costales" href="https://unsplash.com/@larry3?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge" target="_blank" rel="noopener noreferrer"><span style="display: inline-block; padding: 2px 3px;">Larry Costales</span></a>