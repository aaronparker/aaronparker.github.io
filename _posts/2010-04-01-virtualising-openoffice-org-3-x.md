---
id: 1451
title: Virtualising OpenOffice.org 3.x
date: 2010-04-01T23:56:41+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/virtualising-openoffice-org-3-x
permalink: /virtualising-openoffice-org-3-x/
has_been_twittered:
  - 'yes'
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

### Sun Java Runtime Environment

[OpenOffice relies on Java for some functions](http://download.openoffice.org/common/java.html), but will install without it - if you don’t need those features, you can avoid installing Java. Take note when downloading OpenOffice – you can get two installers, one with Java and one without; however when I attempted to download the installer with Java, I kept getting the one without. It’s probably best to download OpenOffice and the JRE separately so that you have a bit more control over what gets installed.

To install the JRE, download the latest offline installer - [Sun JRE 1.6 Update 18 offline installer](http://javadl.sun.com/webapps/download/AutoDL?BundleId=37981) and use this install script:

<p class="download">
  [download id="33&#8243; format="1&#8243;]
</p>

The script will install the JRE to the virtual drive letter, install just the core Java components, disable the updater and ensure the quick starter service is removed.

### Creating an unattended installation for OpenOffice

Setup for OpenOffice is Windows Installer based which makes creating an unattended install easy. There are several components that should be removed because they can’t be virtualised, aren’t suitable when OpenOffice is virtualised or just not suitable for your environment:

  * _On-line Update_ (ensure users can’t attempt to update the virtual OpenOffice package)
  * _Mobile Device Filters_ (for Palm and Pocket PC/Windows Mobile devices, not installed by default)
  * _ActiveX Control_ (allows for viewing OpenOffice documents from within Internet Explorer)
  * _Windows Explorer Extension_ (shows live icon views from within Windows Explorer, so this can’t be virtualised)
  * _Quickstarter_ (runs a process at logon so that the OpenOffice applications start faster. Not a great feature to leave enabled for fast logons, and frankly if you have to add a quick start tool to your application, you’re doing it wrong. [Windows does this for you](http://en.wikipedia.org/wiki/Prefetcher))
  * _OpenOffice.org Experience Improvement program_ (provides anonymous feedback to OpenOffice on the features used)

The screenshot below shows the available components for OpenOffice 3.2, with the options listed above (and the defaults) disabled:

[<img style="display: inline; border-width: 0px;" title="OpenOfficeComponents" src="https://stealthpuppy.com/media/2010/04/OpenOfficeComponents_thumb.png" border="0" alt="OpenOfficeComponents]({{site.baseurl}}/media/2010/04/OpenOfficeComponents.png)

The [unattended reference for OpenOffice](http://wiki.services.openoffice.org/wiki/Documentation/How_Tos/Automatic_Installation_on_Windows) appears to be based on OpenOffice 2, so you may have to refer to the MSI itself when customising the install. See the Feature table for the names for each of the components. I prefer to do everything on  the command-line, instead of creating a transform where I can, so my OpenOffice install looks like this:

<p class="download">
  [download id="34&#8243; format="1&#8243;]
</p>

### Virtualising (or Sequencing) OpenOffice

OpenOffice.org 3.x has a dependency on the Microsoft Visual C++ 2008 Redistributable, so that will need to be installed on your sequencer before you start (if you are using App-V 4.6 and above it too requires Visual C++ 2008, so you will need to include it in your base build).

My App-V asset folder for this example is _Q:\OOo3.001_ (that is, Q: is my virtual drive letter, I’m installing OpenOffice.org 3 and this is version 001 of my OpenOffice package). For OpenOffice, select the asset folder as the install folder because it will automatically install to a sub-folder named _OpenOffice.org 3_.

Before I capture the OpenOffice install, I have copied the setup files and scripts into a folder inside the sequencer (_C:\Packages_) and created an exception for this folder (so that the Sequencer does not pick up any extraneous files).

Install both the Sun JRE and OpenOffice and launch at least one of the OpenOffice applications during sequencing (run the main OpenOffice executable _Q:\OOo3.001\OpenOffice.org 3\program\soffice.exe_). On first run you will need to walk through the first-run wizard, although you can use [an add-in to disable the wizard](http://wiki.services.openoffice.org/wiki/Documentation/Administration_Guide/Deactivating_Registration_Wizard) completely.

You can leave the user details blank if you like:

[<img style="display: inline; border: 0px;" title="OpenOfficeFirstRunWizard1" src="https://stealthpuppy.com/media/2010/04/OpenOfficeFirstRunWizard1_thumb.png" border="0" alt="OpenOfficeFirstRunWizard1]({{site.baseurl}}/media/2010/04/OpenOfficeFirstRunWizard1.png)

Of course you want to register.. 😉

[<img style="display: inline; border: 0px;" title="OpenOfficeFirstRunWizard2" src="https://stealthpuppy.com/media/2010/04/OpenOfficeFirstRunWizard2_thumb.png" border="0" alt="OpenOfficeFirstRunWizard2]({{site.baseurl}}/media/2010/04/OpenOfficeFirstRunWizard2.png)

After first run, a profile folder at _%APPDATA%\OpenOffice.org\3\user_ will be created, which should come to somewhere around 1.8 MB. It also might be a good idea to check that OpenOffice can detect the JRE (open _Tools / Options_):

[<img style="display: inline; border: 0px;" title="OpenOfficeJavaOptions" src="https://stealthpuppy.com/media/2010/04/OpenOfficeJavaOptions_thumb.png" border="0" alt="OpenOfficeJavaOptions]({{site.baseurl}}/media/2010/04/OpenOfficeJavaOptions.png)

If you already have the JRE installed on your workstations, OpenOffice should detect it at runtime. Alternatively, you can use DSC to add the JRE support to OpenOffice.

Once the JRE and OpenOffice have been installed, move on to see the applications detected. _Java Platform SE binary_ and _Java Web Start Launcher_ will be in the list, but they can be removed.

If you have configured the OpenOffice setup to associate OpenOffice with Microsoft Office file types (DOC, XLSX etc), a second set of _Calc_, _Impress_ and _Writer_ shortcuts will be detected (labelled with a 1) which will contain those Microsoft Office file type associations. There will be a bit of work involved in moving the file types to the single shortcut, although you could edit the XML directly after saving the package.

Build feature block 1, if you need it, and end the sequencing wizard.

If the JRE install has worked correctly, you should not see the _Java Quick Start_ service on the Virtual Services tab. If it is there, just remove it before saving the package.

The only post-wizard change you should need to make to the package is to delete _%APPDATA%\OpenOffice.org\3\user\registry\data\org\openoffice\UserProfile.xcu_ the if you would like users to see the first-run wizard when they start OpenOffice for the first time.

### Conclusion

So there’s how to virtualise OpenOffice without too much effort and you should be left with a pretty  clean package weighing at approximately 500Mb that looks a little like this:

[<img style="display: inline; border: 0px;" title="OpenOfficeAppVPackage" src="https://stealthpuppy.com/media/2010/04/OpenOfficeAppVPackage_thumb.png" border="0" alt="OpenOfficeAppVPackage]({{site.baseurl}}/media/2010/04/OpenOfficeAppVPackage.png)