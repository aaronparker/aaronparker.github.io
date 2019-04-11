---
id: 1652
title: Virtualising Apple Safari 5
date: 2010-06-22T21:29:54+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy/virtualisation/virtualising-apple-safari-5
permalink: /virtualising-apple-safari-5/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195382595"
categories:
  - Applications
tags:
  - App-V
  - Safari
---
[<img style="margin: 0px 0px 0px 10px; display: inline; border-width: 0px;" title="AppV-Safari" src="{{site.baseurl}}/media/2010/06/AppVSafari_thumb.png" border="0" alt="AppV-Safari](http://www.apple.com/safari/) 5.x with Microsoft Application Virtualization; however the same basic steps should apply to any application virtualisation product.

Virtualising Apple Safari is a two step process:

  1. Extract the setup files from the download so that we can perform a custom installation of Safari
  2. Capture the Safari 5 package and customise it for execution

### Prerequisites

Other than Windows XP Service Pack 2 or above, there are no specific prerequisites for installing Safari.

### Creating a custom installation of Safari

The default installation of Safari will install Apple Software Update so it's important to prevent this from installing during sequencing so that the package is not automatically updated once deployed. [Bonjour](http://en.wikipedia.org/wiki/Apple_Bonjour) is also installed; however this is optional.

There are a few ways to extract the Safari installer, but I find this process is simplest - [Download the Safari installer](http://www.apple.com/safari/download/) and execute it, but do not step through the installation. The setup files will be extracted to your Temp folder (%TEMP%), so grab a copy from there. The following files will be extracted:

  * AppleApplicationSupport.msi
  * AppleSoftwareUpdate.msi
  * Bonjour.msi
  * Bonjour64.msi
  * Safari.msi
  * SetupAdmin.exe

We don't need _AppleSoftwareUpdate.msi_ because automatic updates for this package will be disabled and we also don't need SetupAdmin.exe. Using the remaining files, we can script an installation of Safari and its' dependant components. The following script listing will automate the installation of Safari for sequencing with App-V:

[code]@ECHO OFF  
START /WAIT MSIEXEC /I AppleApplicationSupport.msi ALLUSERS=TRUE REBOOT=SUPRESS /QB  
IF "%PROCESSOR_ARCHITECTURE%"=="x86" START /WAIT MSIEXEC /I Bonjour.msi ALLUSERS=TRUE REBOOT=SUPRESS /QB  
IF "%PROCESSOR_ARCHITECTURE%"=="AMD64" START /WAIT MSIEXEC /I Bonjour64.msi ALLUSERS=TRUE REBOOT=SUPRESS /QB  
START /WAIT Safari.MSI SCHEDULE\_ASUW=0 DESKTOP\_SHORTCUTS=0 INSTALLDIR=Q:\SAFARI5x.000\Safari ALLUSERS=TRUE REBOOT=SUPPRESS /QB[/code]

### Virtualising (or Sequencing) Safari

Capturing the Safari package is very simple - no exclusions were added and the following steps should produce a successful package:

1. Start monitoring and install Safari using the sample script listed above

2. Before stopping the monitoring process, run Safari at least once

3. Safari will prompt you to make it the default browser, be sure answer Yes to this dialog box so that the registry keys that are set are captured by the Sequencer. This will ensure that those keys are not written to the real registry if the user attempts to set Safari as the default browser at execution time. If they were to do this, then Windows would be unable to launch the default browser (as it is now inside the bubble).

[<img style="display: inline; border: 0px;" title="Safari-Set-As-Default-Browser" src="{{site.baseurl}}/media/2010/06/SafariSetAsDefaultBrowser_thumb.png" border="0" alt="Safari-Set-As-Default-Browser]({{site.baseurl}}/media/2010/06/SafariSetAsDefaultBrowser.png)

4. Configure options as you need them, such as displaying the status bar, changing tab options etc

5. Finally, delete the imported Internet Explorer Favourites (unless you specifically want to keep them):

[<img style="display: inline; border: 0px;" title="Safari-Imported-IE-Favourites" src="{{site.baseurl}}/media/2010/06/SafariImportedIEFavourites_thumb.png" border="0" alt="Safari-Imported-IE-Favourites]({{site.baseurl}}/media/2010/06/SafariImportedIEFavourites.png)

6. Stop monitoring and move onto the detected applications. Two shortcuts will be listed _Safari_ and _About Bonjour_. Remove About Bonjour, move onto creating FB1 and save the package.

### Conclusion

Safari 5 will virtualise quite easily and you could combine it with [QuickTime]({{site.baseurl}}/virtualisation/sequencing-apple-quicktime-7x.), as well as other plug-ins, into a single package. During testing, I should note that it loaded the installed version of Flash without having to bundle it into the same package.