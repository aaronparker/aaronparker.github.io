---

title: Virtualising OpenOffice.org 3.x
date: 2010-04-01T23:56:41+10:00
author: Aaron Parker
layout: post

permalink: /virtualising-openoffice-org-3-x/
dsq_thread_id:
  - "195382284"
categories:
  - Applications
tags:
  - App-V
  - OpenOffice
---
This post details virtualising [OpenOffice.org 3.x](http://www.openoffice.org/) with Microsoft Application Virtualization; however the same basic steps should apply to any application virtualisation product.

Virtualising OpenOffice is a basic three-step process:

  * Bundle a version of the Sun Java Runtime Environment with OpenOffice (or link an existing virtual instance of the JRE to a virtual OpenOffice package)
  * Create an unattended installation of OpenOffice
  * Capture the OpenOffice package and customise it for execution

## Sun Java Runtime Environment

[OpenOffice relies on Java for some functions](http://download.openoffice.org/common/java.html), but will install without it - if you don’t need those features, you can avoid installing Java. Take note when downloading OpenOffice – you can get two installers, one with Java and one without; however when I attempted to download the installer with Java, I kept getting the one without. It’s probably best to download OpenOffice and the JRE separately so that you have a bit more control over what gets installed.

To install the JRE, download the latest offline installer - [Sun JRE 1.6 Update 18 offline installer](http://javadl.sun.com/webapps/download/AutoDL?BundleId=37981) and use this install script:

<p class="download">
  [download id="33&#8243; format="1&#8243;]
</p>

The script will install the JRE to the virtual drive letter, install just the core Java components, disable the updater and ensure the quick starter service is removed.

## Creating an unattended installation for OpenOffice

Setup for OpenOffice is Windows Installer based which makes creating an unattended install easy. There are several components that should be removed because they can’t be virtualised, aren’t suitable when OpenOffice is virtualised or just not suitable for your environment:

  * `On-line Update` (ensure users can’t attempt to update the virtual OpenOffice package)
  * `Mobile Device Filters` (for Palm and Pocket PC/Windows Mobile devices, not installed by default)
  * `ActiveX Control` (allows for viewing OpenOffice documents from within Internet Explorer)
  * `Windows Explorer Extension` (shows live icon views from within Windows Explorer, so this can’t be virtualised)
  * `Quickstarter` (runs a process at logon so that the OpenOffice applications start faster. Not a great feature to leave enabled for fast logons, and frankly if you have to add a quick start tool to your application, you’re doing it wrong. [Windows does this for you](http://en.wikipedia.org/wiki/Prefetcher))
  * `OpenOffice.org Experience Improvement program` (provides anonymous feedback to OpenOffice on the features used)

The screenshot below shows the available components for OpenOffice 3.2, with the options listed above (and the defaults) disabled:

![OpenOfficeComponents]({{site.baseurl}}/media/2010/04/OpenOfficeComponents.png)

The [unattended reference for OpenOffice](http://wiki.services.openoffice.org/wiki/Documentation/How`Tos/Automatic`Installation`on`Windows) appears to be based on OpenOffice 2, so you may have to refer to the MSI itself when customising the install. See the Feature table for the names for each of the components. I prefer to do everything on  the command-line, instead of creating a transform where I can, so my OpenOffice install looks like this:

<p class="download">
  [download id="34&#8243; format="1&#8243;]
</p>

## Virtualising (or Sequencing) OpenOffice

OpenOffice.org 3.x has a dependency on the Microsoft Visual C++ 2008 Redistributable, so that will need to be installed on your sequencer before you start (if you are using App-V 4.6 and above it too requires Visual C++ 2008, so you will need to include it in your base build).

My App-V asset folder for this example is `Q:\OOo3.001` (that is, Q: is my virtual drive letter, I’m installing OpenOffice.org 3 and this is version 001 of my OpenOffice package). For OpenOffice, select the asset folder as the install folder because it will automatically install to a sub-folder named `OpenOffice.org 3`.

Before I capture the OpenOffice install, I have copied the setup files and scripts into a folder inside the sequencer (`C:\Packages`) and created an exception for this folder (so that the Sequencer does not pick up any extraneous files).

Install both the Sun JRE and OpenOffice and launch at least one of the OpenOffice applications during sequencing (run the main OpenOffice executable `Q:\OOo3.001\OpenOffice.org 3\program\soffice.exe`). On first run you will need to walk through the first-run wizard, although you can use [an add-in to disable the wizard](http://wiki.services.openoffice.org/wiki/Documentation/Administration`Guide/Deactivating`Registration`Wizard) completely.

You can leave the user details blank if you like:

![OpenOfficeFirstRunWizard1]({{site.baseurl}}/media/2010/04/OpenOfficeFirstRunWizard1.png)

Of course you want to register.. 😉

![OpenOfficeFirstRunWizard2]({{site.baseurl}}/media/2010/04/OpenOfficeFirstRunWizard2.png)

After first run, a profile folder at `%APPDATA%\OpenOffice.org\3\user` will be created, which should come to somewhere around 1.8 MB. It also might be a good idea to check that OpenOffice can detect the JRE (open `Tools / Options`):

![OpenOfficeJavaOptions]({{site.baseurl}}/media/2010/04/OpenOfficeJavaOptions.png)

If you already have the JRE installed on your workstations, OpenOffice should detect it at runtime. Alternatively, you can use DSC to add the JRE support to OpenOffice.

Once the JRE and OpenOffice have been installed, move on to see the applications detected. `Java Platform SE binary` and `Java Web Start Launcher` will be in the list, but they can be removed.

If you have configured the OpenOffice setup to associate OpenOffice with Microsoft Office file types (DOC, XLSX etc), a second set of `Calc`, `Impress` and `Writer` shortcuts will be detected (labelled with a 1) which will contain those Microsoft Office file type associations. There will be a bit of work involved in moving the file types to the single shortcut, although you could edit the XML directly after saving the package.

Build feature block 1, if you need it, and end the sequencing wizard.

If the JRE install has worked correctly, you should not see the `Java Quick Start` service on the Virtual Services tab. If it is there, just remove it before saving the package.

The only post-wizard change you should need to make to the package is to delete `%APPDATA%\OpenOffice.org\3\user\registry\data\org\openoffice\UserProfile.xcu` the if you would like users to see the first-run wizard when they start OpenOffice for the first time.

## Conclusion

So there’s how to virtualise OpenOffice without too much effort and you should be left with a pretty  clean package weighing at approximately 500Mb that looks a little like this:

![OpenOfficeAppVPackage]({{site.baseurl}}/media/2010/04/OpenOfficeAppVPackage.png)
