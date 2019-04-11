---
id: 2974
title: Sequencing Apple iTunes 11 with App-V 5
date: 2012-12-01T14:32:33+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2974
permalink: /sequencing-apple-itunes-11-with-app-v-5/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "953028557"
categories:
  - Applications
tags:
  - App-V
  - iTunes
---
<img class="alignright size-full wp-image-2976" style="margin-left: 5px; margin-right: 5px;" title="iTunes 11 128x128" alt="" src="{{site.baseurl}}.com/media/2012/12/iTunes-128.png" width="128" height="128" />Two recent releases presents an opportunity to revisit the state of virtualizing Apple iTunes. iTunes 11 looks great, but is it just lipstick on a pig? Under the hood, it doesn't appear to differ that much from previous versions, but lets see whether a combination of Apple's latest and greatest along with App-V 5 offers a better virtualisation experience.

# iTunes 10 with App-V 4.6

Previously delivering [iTunes 10 with App-V 4.6]({{site.baseurl}}/virtualisation/sequencing-apple-itunes-10/), resulted in some loss of functionality and some minor annoyances with benign error messages. A lack of the Jumpt List under Windows 7 changed the user experience. App-V 5 now fixes this.

# iTunes Components

To virtualize iTunes, you'll need to extract the installer - simply run the installer and find the extracted MSI files in a folder under %TEMP%. This results in several files:

  * SetupAdmin.exe – the setup wrapper application. This can be discarded
  * AppleSoftwareUpdate.msi – Software Update is used to download and Apple software and updates
  * AppleApplicationSupport.msi – all Apple applications on Windows require this as a dependency
  * AppleMobileDeviceSupport.msi – required for Apple mobile device support (iPhone, iPad etc.). This installer includes the drivers for Apple’s devices
  * Bonjour.msi - [iTunes uses Bonjour](http://support.apple.com/kb/HT2250) to find shared music libraries, to find AirPort Express devices for streaming music to, and to find Apple TVs
  * iTunes.msi – the iTunes installer itself

It is important that _Apple Software Update_ is not included in the App-V package – allowing the applications in the package to update will at best fail and at worst, most likely bloat the package if it were allowed to run after deployment. Before copying the iTunes setup files into your sequencing VM, delete _AppleSoftwareUpdate.msi_ and _SetupAdmin.exe_. This will prevent the iTunes installer from automatically installing Software Update during sequencing.

# Prepare the Sequencing VM

Before starting the Sequencer, the following steps must be completed:

  1. Install _Apple Application Support_– this is required because the Apple Mobile Device service will not start without it.
  2. Install _Apple Mobile Device Support_ – this is required to be installed outside of the package because it contains the mobile device drivers and related services

These same steps will need to be followed on the App-V client computer that will run iTunes. Fortunately Apple Application Support and the Mobile Device Support come as Windows Installer files, so they will be easy to deploy.

It is possible to include Apple Application Support in the iTunes package. This will allow you to run iTunes without any pre-requisites on client PCs; however both of the above components must be installed on client PCs if you want to connect mobile devices to iTunes.

# User Profile

iTunes has the potential to store a massive amount of data in the user's profile:

[<img style="background-image: none; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border-width: 0px;" title="09AppData" alt="09AppData" src="{{site.baseurl}}.com/media/2011/06/09AppData_thumb.png]({{site.baseurl}}/media/2011/06/09AppData.png)

It is highly recommended to exclude %APPDATA% in the iTunes package to avoid this data being virtualized at runtime.

# Sequencer Template

There are a number of locations that should be excluded from the package during sequencing, including %APPDATA%. I have included these in a Package Template for iTunes that you can download from here:

<p class="download">
  [download id="59&#8243; format="1&#8243;]
</p>

# Installing iTunes

Sequencing is as simple as capturing the installation of the following files and configuring iTunes the way we want:

  * Bonjour.msi
  * iTunes.msi
  * Optionally - AppleApplicationSupport.msi

The installation and configuration of the above can be scripted, which would be a good approach for repeatability.

# Sequencing iTunes

To sequence iTunes, follow the basic outline here:

1. Start the Sequencer and load the Sequencer Template provided here

2. Create a new Virtual Application Package and choose Create Package (default)

3. Choose Standard Application (default)

4. Select the installer – select either a script to automate the iTunes install command or _C:\Windows\System32\cmd.exe_ to manually run each MSI file

5. Add a Virtual Application Package Name (e.g. _Apple iTunes 11_). Use a Primary Virtual Application Directory of _C:\iTunes11_

6. Install both Bonjour and iTunes and optionally Apple Application Support. Use the following command lines to control the installation options including target folders:

[code]MSIEXEC /I Bonjour.msi INSTALLDIR=C:\iTunes11\Bonjour /QB-  
MSIEXEC /I iTunes.msi INSTALLDIR=C:\iTunes11\iTunes SCHEDULE\_ASUW=0 REGSRCH\_DESKTOP_SHORTCUTS=0[/code]

When installing iTunes, be sure to install to C:\iTunes11\iTunes and remove the following options during install:

  * Add iTunes shortcut to my desktop
  * Automatically update iTunes and other Apple software
  * Open iTunes after the installer exits

<div>
  <span style="font-size: medium;"><span style="line-height: 24px;"><strong>Note</strong>: do not launch iTunes during sequencing.</span></span>
</div>

7. Finish the install and continue to the Configure Software step. There is no need to launch any applications at this point

8. Review the installation report. This will list a couple of issues which I'll discuss later.

9. Continue and customize the package (do not stop at this point).

10. There is no need to configure streaming at this point, so skip the optimisation step.

11. If you are capturing iTunes on Windows 7 x86, allow the package to run on any operating system.

12. At the Create Package step, continue on to modify the package rather than stop now.

13. Add a description to the package and check each tab in the Sequencer to ensure the package looks OK. Under Virtual Services, two services should be listed - _Bonjour Service_ and _iPod Service_.

14. Edit the Shortcuts and remove the _About Bonjour_ and _About iTunes_ shortcuts.

# Virtualization Issues

The Sequencer will highlight a a couple of issues:

  * DCOM subsystem detected
  * Unsupported driver detected

## DCOM

iTunes includes some DCOM components - the report shows:

> The sequencer detected a DCOM subsystem. Application components that use DCOM will not work with App-V. The DCOM subsystems detected are as follows:
> 
> IpodService (LocalService)
> 
> iTunesAdmin (AccessPermission)

With the Apple Mobile Device Support, syncing with a virtualized iTunes should still work. The iTunesAdmin component appears to be related restricting access to Parental controls in Preferences. Clicking the lock will result the following error:

<img class="alignnone size-full wp-image-2983" title="iTunes Parental error" alt="" src="{{site.baseurl}}.com/media/2012/12/Parental.png" width="381" height="109" srcset="{{site.baseurl}}.com/media/2012/12/Parental.png 381w, {{site.baseurl}}.com/media/2012/12/Parental-150x42.png 150w, {{site.baseurl}}.com/media/2012/12/Parental-300x85.png 300w" sizes="(max-width: 381px) 100vw, 381px" /> 

## Driver

iTunes installs the [GEARAspiWDM](http://www.gearsoftware.com/support/drivers.php) driver, which results in the following report:

> The sequencer detected an unsupported driver. Kernel and user-mode drivers are not supported in the App-V virtual environment.
> 
> The unsupported drivers detected are as follows: SYSTEM\CurrentControlSet\services\GEARAspiWDM

This is related to writing CD/DVDs - once iTunes is virtualized, that feature will be unavailable.

# Deploying iTunes

Deploying the iTunes package will require the deployment of Apple Application Support and Apple Mobile Device Support to the client computers first. Apple Application Support can be included in the package; however it is required to be installed if the Mobile Device Support is also deployed.

Without Apple Application Support the following will be the result of launching iTunes:

[<img style="background-image: none; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border-width: 0px;" title="NoAppleAppSupport" alt="NoAppleAppSupport" src="{{site.baseurl}}.com/media/2011/06/NoAppleAppSupport_thumb.png]({{site.baseurl}}/media/2011/06/NoAppleAppSupport.png)

Last, but not least, for media sharing to work, firewall exceptions will be required for the following processes:

  * iTunes.exe
  * mDNSResponder.exe

The path to each process will be dependent on your package.

# Finally

Running iTunes on the client for the first time will result in a prompt to the user to set iTunes as the default audio player. With App-V 5 this is now supported and should work just like an installed application.

[<img style="background-image: none; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border: 0px;" title="iTunesFirstRun" alt="iTunesFirstRun" src="{{site.baseurl}}.com/media/2012/12/iTunesFirstRun_thumb.png]({{site.baseurl}}/media/2012/12/iTunesFirstRun.png)

View the gallery below for a screenshot walkthrough of sequencing iTunes 11:

[nggallery id=2]