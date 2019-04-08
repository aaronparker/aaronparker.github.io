---
id: 6047
title: Adobe Reader DC deployment with Microsoft Intune
date: 2018-07-20T20:18:47+10:00
author: Aaron Parker
layout: revision
guid: https://stealthpuppy.com/6032-revision-v1/
permalink: /6032-revision-v1/
---
Adobe Reader is of course one of the most common applications on Windows desktops and if you're moving to a Modern Management approach you're likely looking at how to deploy Adobe Reader DC to Windows 10 via Microsoft Intune.&nbsp;

This is a challenge today because Adobe Reader DC comes as an executable, that while it can be extracted for the MSI, it includes support files that cannot be deployed via Intune. Microsoft only enables Windows desktop applications to be [deployed from Intune where the installer is contained in a single file Windows Installer](https://docs.microsoft.com/en-us/intune/lob-apps-windows).

# Adobe Reader DC Executable Installer

The Adobe Reader installer hasn't changed much since as long [as I've been writing about it](https://stealthpuppy.com/tag/adobe/)&nbsp;(which has been way too long). What is different with Adobe Reader DC is that Adobe has moved to an evergreen model whereby they're largely moved away from major releases and instead [now deliver a continuous release cycle](https://www.adobe.com/devnet-docs/acrobatetk/tools/AdminGuide/whatsnewdc.html#continuous-vs-classic-comparison).

The [current installer](https://get.adobe.com/reader/enterprise/) for Adobe Reader DC is a single executable that can run as is, or can be extracted for [customisation typical of enterprise environments](https://www.adobe.com/devnet-docs/acrobatetk/tools/Wizard/index.html). When extracted it looks like this:

<figure id="attachment_6035" aria-describedby="caption-attachment-6035" style="width: 2190px" class="wp-caption aligncenter">[<img class="size-full wp-image-6035" src="https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-ExtractedFiles.png" alt="Adobe Reader DC extracted files" width="2190" height="965" srcset="https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-ExtractedFiles.png 2190w, https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-ExtractedFiles-150x66.png 150w, https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-ExtractedFiles-300x132.png 300w, https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-ExtractedFiles-768x338.png 768w, https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-ExtractedFiles-1024x451.png 1024w" sizes="(max-width: 2190px) 100vw, 2190px" />](https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-ExtractedFiles.png)<figcaption id="caption-attachment-6035" class="wp-caption-text">Adobe Reader DC extracted files</figcaption></figure>

This just won't work for deployment via Intune or the Windows 10 MDM channel. We need that single Windows Installer file. Better yet, we need Adobe to make Reader DC available via the Windows Store, but that's a topic for another article.

# Adobe Reader Windows Installer

[Adobe does make a single file Windows Installer available](ftp://ftp.adobe.com/pub/adobe/reader/win/AcrobatDC/1500720033/) for Adobe Reader DC, in various languages; however, the file was released in 2015 and unfortunately they've not updated it since. There has been several major releases and updates since March 2005.

<figure id="attachment_6037" aria-describedby="caption-attachment-6037" style="width: 1768px" class="wp-caption aligncenter">[<img class="size-full wp-image-6037" src="https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReader-FTPdownloads.png" alt="Adobe Reader DC single file Windows Installer on the public FTP site" width="1768" height="976" srcset="https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReader-FTPdownloads.png 1768w, https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReader-FTPdownloads-150x83.png 150w, https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReader-FTPdownloads-300x166.png 300w, https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReader-FTPdownloads-768x424.png 768w, https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReader-FTPdownloads-1024x565.png 1024w" sizes="(max-width: 1768px) 100vw, 1768px" />](https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReader-FTPdownloads.png)<figcaption id="caption-attachment-6037" class="wp-caption-text">Adobe Reader DC single file Windows Installer on the public FTP site</figcaption></figure>

So, now we have a way to deploy the file, let's see how to customise it and deploy via Intune.

## Customising the Installer

Customisation of the Adobe Reader installer for [enterprise deployment is well documented](https://www.adobe.com/devnet-docs/acrobatetk/tools/AdminGuide/index.html) and [I've written about previous versions several times](https://stealthpuppy.com/adobe-reader-xi-deployment/). The same process applies but pay attention to [any version specific settings](https://www.adobe.com/devnet-docs/acrobatetk/tools/AdminGuide/index.html).

Just like previous versions, you use the [Adobe Customization Wizard](https://www.adobe.com/devnet-docs/acrobatetk/tools/Wizard/WizardDC/index.html) to customise the installer for your needs and deploy a custom package.

<figure id="attachment_6040" aria-describedby="caption-attachment-6040" style="width: 2212px" class="wp-caption aligncenter">[<img class="size-full wp-image-6040" src="https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-CustomizationWizard.png" alt="Adobe Customization Wizard DC" width="2212" height="1206" srcset="https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-CustomizationWizard.png 2212w, https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-CustomizationWizard-150x82.png 150w, https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-CustomizationWizard-300x164.png 300w, https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-CustomizationWizard-768x419.png 768w, https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-CustomizationWizard-1024x558.png 1024w" sizes="(max-width: 2212px) 100vw, 2212px" />](https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-CustomizationWizard.png)<figcaption id="caption-attachment-6040" class="wp-caption-text">Adobe Customization Wizard DC</figcaption></figure>

However, we can't customise the single file Windows Installer directly because when saving the customisations, we get this:

<figure id="attachment_6041" aria-describedby="caption-attachment-6041" style="width: 2212px" class="wp-caption aligncenter">[<img class="size-full wp-image-6041" src="https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-SetupIniNotFound.png" alt="Adobe Customization Wizard DC - setup.ini was not found" width="2212" height="1206" srcset="https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-SetupIniNotFound.png 2212w, https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-SetupIniNotFound-150x82.png 150w, https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-SetupIniNotFound-300x164.png 300w, https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-SetupIniNotFound-768x419.png 768w, https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-SetupIniNotFound-1024x558.png 1024w" sizes="(max-width: 2212px) 100vw, 2212px" />](https://stealthpuppy.com/wp-content/uploads/2018/07/ReaderDC-SetupIniNotFound.png)<figcaption id="caption-attachment-6041" class="wp-caption-text">Adobe Customization Wizard DC - setup.ini was not found</figcaption></figure>

To customise the installer, we need to use a 3 step process:

  1. Download and [extract](https://www.adobe.com/devnet-docs/acrobatetk/tools/AdminGuide/basics.html#expanding-exe-packages) Adobe Reader DC executable installer
  2. [Create a custom transform](https://www.adobe.com/devnet-docs/acrobatetk/tools/Wizard/WizardDC/deployment.html) for this installer
  3. Apply the transform to the single file Windows Installer, so that the customisations are embedded into the installer

I won't go into a detailed step-by-step on how to use the Adobe Customization Wizard here because the documentation is detailed enough, but I will include a list of options I recommend you embed into the installer. There are some additional defaults and you may have specific options applicable to your environment.

[table id=46 /]

As I've listed in the table, it's important to keep the Adobe Updater enabled, so that once Reader is deployed via Intune, end-points can manage updates themselves. I'll cover more on updates later in this article.

Now that you have a customised single file Windows Installer for Adobe Reader DC, you can [import that into Microsoft Intune](https://docs.microsoft.com/en-us/intune/lob-apps-windows), and make it available for deployment.

<figure id="attachment_6044" aria-describedby="caption-attachment-6044" style="width: 2880px" class="wp-caption aligncenter">[<img class="size-full wp-image-6044" src="https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-Installed.png" alt="Adobe Reader DC installed via Intune" width="2880" height="1800" srcset="https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-Installed.png 2880w, https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-Installed-150x94.png 150w, https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-Installed-300x188.png 300w, https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-Installed-768x480.png 768w, https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-Installed-1024x640.png 1024w" sizes="(max-width: 2880px) 100vw, 2880px" />](https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-Installed.png)<figcaption id="caption-attachment-6044" class="wp-caption-text">Adobe Reader DC installed via Intune</figcaption></figure>

Now let's take a look at what happens post-deployment.

# Updating Adobe Reader DC

dd

<figure id="attachment_6046" aria-describedby="caption-attachment-6046" style="width: 1338px" class="wp-caption aligncenter">[<img class="size-full wp-image-6046" src="https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-UpdateTask.png" alt="Adobe Acrobat Update Task" width="1338" height="711" srcset="https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-UpdateTask.png 1338w, https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-UpdateTask-150x80.png 150w, https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-UpdateTask-300x159.png 300w, https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-UpdateTask-768x408.png 768w, https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-UpdateTask-1024x544.png 1024w" sizes="(max-width: 1338px) 100vw, 1338px" />](https://stealthpuppy.com/wp-content/uploads/2018/07/AdobeReaderDC-UpdateTask.png)<figcaption id="caption-attachment-6046" class="wp-caption-text">Adobe Acrobat Update Task</figcaption></figure>

dd