---
id: 2696
title: Migrating packages from App-V 4.x to App-V 5.0
date: 2012-04-06T18:50:26+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2696
permalink: /migrating-packages-from-app-v-4-x-to-app-v-5-0/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "639184488"
categories:
  - Applications
tags:
  - App-V
---
<img class="alignleft size-full wp-image-2178" title="AppV46SequencerNew.png" src="http://stealthpuppy.com/wp-content/uploads/2011/03/AppV46SequencerNew.png" alt="" width="128" height="123" />The App-V 5.0 Sequencer includes a couple of PowerShell modules and for converting packages is the only interface to use. Here&#8217;s how to automate the migration of packages from the old 4.x format to the new App-V 5.0 format.

To perform a migration of packages, I&#8217;ve setup a Windows 7 virtual machine for hosting the App-V 5.0 Sequencer. This virtual machine is configured in exactly the same way that I&#8217;ve been configuring Windows for sequencing with App-V 4.x with the exception of a Q drive as this is no longer needed. For more information on how I recommend configuring a virtual machine, see this article: [Delivering Office with App-V – Sequencer Recommendations & Best Practices](http://stealthpuppy.com/virtualisation/delivering-office-with-app-v-sequencer-recommendations/).

Installing the App-V 5.0 Sequencer is very straight-forward process. Start the Sequencer setup from _appv\_sequencer\_setup.exe_:

<img class="alignnone size-full wp-image-2887" title="SequencerSetup" src="http://stealthpuppy.com/wp-content/uploads/2012/04/SequencerSetup.png" alt="" width="660" height="461" srcset="http://192.168.0.89/wp-content/uploads/2012/04/SequencerSetup.png 660w, http://192.168.0.89/wp-content/uploads/2012/04/SequencerSetup-150x104.png 150w, http://192.168.0.89/wp-content/uploads/2012/04/SequencerSetup-300x209.png 300w" sizes="(max-width: 660px) 100vw, 660px" /> 

You&#8217;ll need to accept the license agreement and join the Customer Experience Improvement Program if you wish to to so. Once the Sequencer is installed, two PowerShell modules are available – AppVPkgConverter and AppVSequencer. AppVPkgConverter is used for converting legacy packages to the new format.

To see the new modules, import the AppVPkgConverter module and list the available commands in that module, run the following commands from a PowerShell prompt:

[code language=&#8221;ps&#8221;]Get-Module -ListAvailable  
Import-Module AppVPkgConverter  
Get-Command -Module AppVPkgConverter[/code]

Which looks like this:

<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="Import AppVPkgConverter" src="http://stealthpuppy.com/wp-content/uploads/2012/04/Screen-Shot-2012-04-06-at-13.40.15.png" alt="Import AppVPkgConverter" width="660" height="323" border="0" /> 

The AppVPkgConverter module has two commands – _ConvertFrom-AppvLegacyPackage_ and _Test-AppvLegacyPackage_.

In my test environment, I have a number of legacy packages that I&#8217;m going to convert. I have 22 packages, totalling 4.5Gb:

<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="Packages" src="http://stealthpuppy.com/wp-content/uploads/2012/04/Packages.png" alt="Packages" width="660" height="551" border="0" /> 

To test these packages before conversion, I can run the following command against a legacy package:

\[code language=&#8221;ps&#8221;]Test-AppvLegacyPackage -SourcePath [path to legacy package\]\[/code\]

One of my packages results in a warning when running Test-AppvLegacyPackage against it, in this case an issue that won&#8217;t prevent conversion:

<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="Screen Shot 2012-04-06 at 13.16.27" src="http://stealthpuppy.com/wp-content/uploads/2012/04/Screen-Shot-2012-04-06-at-13.16.271.png" alt="Screen Shot 2012-04-06 at 13.16.27" width="660" height="273" border="0" /> 

To test all of my packages and convert those without errors (but include those with warnings), I can use the following example code:

[code language=&#8221;ps&#8221;]$Source = "Y:\Packages"  
$Dest = "Y:\Packages.v5"  
Get-ChildItem -Path $Source | Test-AppvLegacyPackage | Where-Object {$_.Errors.Count -eq 0 } | ConvertFrom-AppvLegacyPackage -DestinationPath $Dest[/code]

This will result in the packages being converted into the new format in the destination folder. In this example, the conversion process took a little over an hour.

<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="Screen Shot 2012-04-06 at 18.05.25" src="http://stealthpuppy.com/wp-content/uploads/2012/04/Screen-Shot-2012-04-06-at-18.05.25.png" alt="Screen Shot 2012-04-06 at 18.05.25" width="660" height="408" border="0" /> 

To make this a little cleaner I&#8217;ve also added some code to move the converted packages into their own folder, so that each folder contains the APPV, MSI and XML files for a single package. Here&#8217;s the full code listing:

[code language=&#8221;ps&#8221;]## Convert a folder of legacy App-V packages to v5 format

\# Source and destination folders  
$Source = "Y:\Packages"  
$Dest = "Y:\Packages.v5"

\# Test legacy packages and convert those without errors to the new format  
Get-ChildItem -Path $Source | Test-AppvLegacyPackage | Where-Object {$_.Errors.Count -eq 0 } | ConvertFrom-AppvLegacyPackage -DestinationPath $Dest

\# Move packages and related files to a sub-folder per-package  
$Packages = Get-ChildItem -Path $Dest -Filter "\*.appv\*"  
foreach ($Package in $Packages) {  
$Name = $Package.Name.substring(0,($Package.Name.length &#8211; 5))  
$PackageItems = Get-ChildItem -Path $Dest -Filter "$Name*"  
New-Item -Path $Dest\$Name -Type Directory  
For ($n=0; $n -le $PackageItems.Count -1; $n++) { Move-Item $PackageItems[$n].FullName $Dest\$Name }  
}  
[/code]