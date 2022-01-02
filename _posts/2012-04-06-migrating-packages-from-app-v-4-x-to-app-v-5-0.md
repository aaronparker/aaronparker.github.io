---

title: Migrating packages from App-V 4.x to App-V 5.0
date: 2012-04-06T18:50:26+10:00
author: Aaron Parker
layout: post

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
The App-V 5.0 Sequencer includes a couple of PowerShell modules and for converting packages is the only interface to use. Here's how to automate the migration of packages from the old 4.x format to the new App-V 5.0 format.

To perform a migration of packages, I've setup a Windows 7 virtual machine for hosting the App-V 5.0 Sequencer. This virtual machine is configured in exactly the same way that I've been configuring Windows for sequencing with App-V 4.x with the exception of a Q drive as this is no longer needed. For more information on how I recommend configuring a virtual machine, see this article: [Delivering Office with App-V – Sequencer Recommendations & Best Practices]({{site.baseurl}}/virtualisation/delivering-office-with-app-v-sequencer-recommendations/).

Installing the App-V 5.0 Sequencer is very straight-forward process. Start the Sequencer setup from `appv\sequencer\setup.exe`:

![]({{site.baseurl}}/media/2012/04/SequencerSetup.png)

You'll need to accept the license agreement and join the Customer Experience Improvement Program if you wish to to so. Once the Sequencer is installed, two PowerShell modules are available – AppVPkgConverter and AppVSequencer. AppVPkgConverter is used for converting legacy packages to the new format.

To see the new modules, import the AppVPkgConverter module and list the available commands in that module, run the following commands from a PowerShell prompt:

```powershell
Get-Module -ListAvailable  
Import-Module AppVPkgConverter  
Get-Command -Module AppVPkgConverter
```

Which looks like this:

![]({{site.baseurl}}/media/2012/04/Screen-Shot-2012-04-06-at-13.40.15.png)

The AppVPkgConverter module has two commands – `ConvertFrom-AppvLegacyPackage` and `Test-AppvLegacyPackage`.

In my test environment, I have a number of legacy packages that I'm going to convert. I have 22 packages, totalling 4.5Gb:

![]({{site.baseurl}}/media/2012/04/Packages.png)

To test these packages before conversion, I can run the following command against a legacy package:

```powershell
Test-AppvLegacyPackage -SourcePath [path to legacy package]
```

One of my packages results in a warning when running `Test-AppvLegacyPackage` against it, in this case an issue that won't prevent conversion:

![]({{site.baseurl}}/media/2012/04/Screen-Shot-2012-04-06-at-13.16.271.png)

To test all of my packages and convert those without errors (but include those with warnings), I can use the following example code:

```powershell
$Source = "Y:\Packages"  
$Dest = "Y:\Packages.v5"  
Get-ChildItem -Path $Source | Test-AppvLegacyPackage | Where-Object {$_.Errors.Count -eq 0 } | ConvertFrom-AppvLegacyPackage -DestinationPath $Dest
```

This will result in the packages being converted into the new format in the destination folder. In this example, the conversion process took a little over an hour.

![]({{site.baseurl}}/media/2012/04/Screen-Shot-2012-04-06-at-18.05.25.png)

To make this a little cleaner I've also added some code to move the converted packages into their own folder, so that each folder contains the APPV, MSI and XML files for a single package. Here's the full code listing:

```powershell
## Convert a folder of legacy App-V packages to v5 format

# Source and destination folders  
$Source = "Y:\Packages"  
$Dest = "Y:\Packages.v5"

# Test legacy packages and convert those without errors to the new format  
Get-ChildItem -Path $Source | Test-AppvLegacyPackage | Where-Object {$_.Errors.Count -eq 0 } | ConvertFrom-AppvLegacyPackage -DestinationPath $Dest

# Move packages and related files to a sub-folder per-package  
$Packages = Get-ChildItem -Path $Dest -Filter "\*.appv\*"  
foreach ($Package in $Packages) {  
  $Name = $Package.Name.substring(0,($Package.Name.length - 5))  
  $PackageItems = Get-ChildItem -Path $Dest -Filter "$Name*"  
  New-Item -Path $Dest\$Name -Type Directory  
  For ($n=0; $n -le $PackageItems.Count -1; $n++) { Move-Item $PackageItems[$n].FullName $Dest\$Name }
}  
```
