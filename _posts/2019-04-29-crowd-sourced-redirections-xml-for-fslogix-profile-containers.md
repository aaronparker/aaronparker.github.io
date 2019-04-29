---
layout: post
title: Crowd Sourced Redirections.xml for FSLogix Profile Containers
date: 2019-04-29 17:50 +1000
permalink: "/fslogix-profile-containers-redirections/"
categories:
- Microsoft
tags:
- FSLogix
- Profile Container
---
Here's a new tool that I've [pushed to the PowerShell Gallery](https://www.powershellgallery.com/packages/ConvertTo-RedirectionsXml/) - `ConvertTo-RedirectionsXml` for generating a `Redirections.Xml` for use with Profile Container. This makes the task of generating a new `Redirections.xml` as simple as running two PowerShell commands:

[![Installing and using the ConvertTo-RedirectionsXml]({{site.baseurl}}/media/2019/04/ConvertTo-RedirectionsXml.PNG)]({{site.baseurl}}/media/2019/04/ConvertTo-RedirectionsXml.PNG)

## Why

There are several considerations for [managing the capacity consumed by FSLogix Profile Containers](https://stealthpuppy.com/fslogix-containers-capacity/) with the ability to [control the contents of the Profile Container](https://docs.fslogix.com/display/20170529/Controlling+the+Content+of+the+Profile+Container) with a set of exclusions (and inclusions) defined in `Redirections.xml`.

I've put together a list of excludes from a few sources and hosted it in a repository on GitHub. The list is in CSV format for simple viewing and management. GitHub formats CSV files into a table, making it an ideal format.

## We Need Your Help

Contributions from the community to the list of folders to exclude or include from the Profile Container is needed to improve the list. The approach to excludes is similar to legacy profile management solutions, so the same types of excludes will apply. It's likely you have a list of excluded and included paths in your own environment that could be added to the list.

### How To Contribute

There are two ways to contribute:

1. [Fork the repo](https://help.github.com/en/articles/fork-a-repo), update `redirections.csv` and create a [Pull Request](https://help.github.com/en/desktop/contributing-to-projects/creating-a-pull-request)
2. If would prefer not to create a pull request, you can instead [create a new issue to request an addition or improvement](https://github.com/aaronparker/FSLogix/issues/new?assignees=&labels=&template=custom.md&title=)

## Convert the List into Redirections.xml

To simplify outputing the list into the required XML format, I've written `ConvertTo-RedirectionsXml` that is used to convert the CSV list for use with Profile Containers. This script will read the `Redirections.csv` from GitHub repo and output `Redirections.xml` locally. The script is available from the PowerShell Gallery for a simple install.

### Install the Script

There are two methods for installing the script:

1. Install from the [PowerShell Gallery](https://www.powershellgallery.com/packages/ConvertTo-RedirectionsXml/). This is the preferred method as the installation can be handled directly from Windows PowerShell or PowerShell Core with the following command:

    ```powershell
    Install-Script -Name ConvertTo-RedirectionsXml
    ```

    If you haven't installed a module from the PowerShell Gallery before, you may be asked to trust the PSGallery. This can be done manually or via the following commands:

    ```powershell
    Install-PackageProvider -Name NuGet -MinimumVersion 2.8.5.201 -Force
    Set-PSRepository -Name PSGallery -InstallationPolicy Trusted
    ```

2. Download from this repository. `ConvertTo-RedirectionsXml.ps1` can be downloaded directly from this repository and saved to a preferred location. When the script is updated, you'll need to download the latest version.

### Example Usage

To output `Redirections.xml` to the current folder, just run the script without arguments.

```powershell
ConvertTo-RedirectionsXml
```

A custom path can be provided for the output file - for example, the following command will output the file to `C:\Temp\Redirections.xml`:

```powershell
ConvertTo-RedirectionsXml -OutFile C:\Temp\Redirections.xml
```

If you have saved the script locally instead of installing from the PowerShell Gallery, remember to run the script with the correct synatx:

```powershell
.\ConvertTo-RedirectionsXml.ps1
```

The resulting `Redirections.xml` will look something like this and will be ready to test and deploy:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--Generated 2019-04-29 from https://raw.githubusercontent.com/aaronparker/FSLogix/master/Redirections/Redirections.csv-->
<FrxProfileFolderRedirection ExcludeCommonFolders="0">
  <Excludes>
    <Exclude Copy="0">Videos</Exclude>
    <Exclude Copy="0">Saved Games</Exclude>
    <Exclude Copy="0">Contacts</Exclude>
    <Exclude Copy="0">Tracing</Exclude>
    <Exclude Copy="0">Music</Exclude>
    <Exclude Copy="0">Downloads</Exclude>
    <Exclude Copy="0">$Recycle.Bin</Exclude>
    <Exclude Copy="0">AppData\Local\Apps</Exclude>
    <Exclude Copy="0">AppData\Local\Downloaded Installations</Exclude>
    <Exclude Copy="0">AppData\Local\assembly</Exclude>
    <Exclude Copy="0">AppData\Local\CEF</Exclude>
    <Exclude Copy="0">AppData\Local\Deployment</Exclude>
    <Exclude Copy="0">AppData\Local\GroupPolicy</Exclude>
    <Exclude Copy="0">AppData\Local\Microsoft Help</Exclude>
    <Exclude Copy="0">AppData\Local\Sun</Exclude>
    <Exclude Copy="0">AppData\Local\VirtualStore</Exclude>
    <Exclude Copy="0">AppData\Local\CrashDumps</Exclude>
    <Exclude Copy="0">AppData\Local\Package Cache</Exclude>
    <Exclude Copy="0">AppData\Local\D3DSCache</Exclude>
    <Exclude Copy="0">AppData\Local\Microsoft\TokenBroker\Cache</Exclude>
    <Exclude Copy="0">AppData\Local\Microsoft\Notifications</Exclude>
    <Exclude Copy="0">AppData\Local\Microsoft\Internet Explorer\DOMStore</Exclude>
    <Exclude Copy="0">AppData\Local\Microsoft\MSOIdentityCRL\Tracing</Exclude>
    <Exclude Copy="0">AppData\Local\Microsoft\Messenger</Exclude>
    <Exclude Copy="0">AppData\Local\Microsoft\Terminal Server Client</Exclude>
    <Exclude Copy="0">AppData\Local\Microsoft\UEV</Exclude>
    <Exclude Copy="0">AppData\Local\Microsoft\Windows\Application Shortcuts</Exclude>
    <Exclude Copy="0">AppData\Local\Microsoft\Windows\Mail</Exclude>
    <Exclude Copy="0">AppData\Local\Microsoft\Windows\WebCache.old</Exclude>
    <Exclude Copy="0">AppData\Local\Microsoft\Windows\AppCache</Exclude>
    <Exclude Copy="0">AppData\Local\Microsoft\Windows\Caches</Exclude>
    <Exclude Copy="0">AppData\Local\Microsoft\Windows\Explorer</Exclude>
    <Exclude Copy="0">AppData\Local\Microsoft\Windows\GameExplorer</Exclude>
    <Exclude Copy="0">AppData\Local\Microsoft\Windows\DNTException</Exclude>
    <Exclude Copy="0">AppData\Local\Microsoft\Windows\IECompatCache</Exclude>
    <Exclude Copy="0">AppData\Local\Microsoft\Windows\iecompatuaCache</Exclude>
    <Exclude Copy="0">AppData\Local\Microsoft\Windows\Notifications</Exclude>
    <Exclude Copy="0">AppData\Local\Microsoft\Windows\PRICache</Exclude>
    <Exclude Copy="0">AppData\Local\Microsoft\Windows\PrivacIE</Exclude>
    <Exclude Copy="0">AppData\Local\Microsoft\Windows\RoamingTiles</Exclude>
    <Exclude Copy="0">AppData\Local\Microsoft\Windows\SchCache</Exclude>
    <Exclude Copy="0">AppData\Local\Microsoft\Windows\WebCache</Exclude>
    <Exclude Copy="0">AppData\Local\Microsoft\Windows\1031</Exclude>
    <Exclude Copy="0">AppData\Roaming\Google\Chrome\UserData\BrowserMetrics</Exclude>
    <Exclude Copy="0">AppData\Roaming\GoogleChrome\UserData\Default\Code Cache\js</Exclude>
    <Exclude Copy="0">AppData\Roaming\Google\Chrome\UserData\CertificateRevocation</Exclude>
    <Exclude Copy="0">AppData\Roaming\Google\Chrome\UserData\CertificateTransparency</Exclude>
    <Exclude Copy="0">AppData\Roaming\Google\Chrome\UserData\Crashpad</Exclude>
    <Exclude Copy="0">AppData\Roaming\Google\Chrome\UserData\FileTypePolicies</Exclude>
    <Exclude Copy="0">AppData\Roaming\Google\Chrome\UserData\InterventionPolicyDatabase</Exclude>
    <Exclude Copy="0">AppData\Roaming\Google\Chrome\UserData\MEIPreload</Exclude>
    <Exclude Copy="0">AppData\Roaming\Google\Chrome\UserData\PepperFlash</Exclude>
    <Exclude Copy="0">AppData\Roaming\Google\Chrome\UserData\pnacl</Exclude>
    <Exclude Copy="0">AppData\Roaming\Google\Chrome\UserData\Safe Browsing</Exclude>
    <Exclude Copy="0">AppData\Roaming\Google\Chrome\UserData\ShaderCache</Exclude>
    <Exclude Copy="0">AppData\Roaming\Google\Chrome\UserData\SSLErrorAssistant</Exclude>
    <Exclude Copy="0">AppData\Roaming\Google\Chrome\UserData\Subresource Filter</Exclude>
    <Exclude Copy="0">AppData\Roaming\Google\Chrome\UserData\SwReporter</Exclude>
    <Exclude Copy="0">AppData\Roaming\Google\Chrome\UserData\Default\JumpListIcons</Exclude>
    <Exclude Copy="0">AppData\Roaming\Google\Chrome\UserData\Default\JumpListIconsOld</Exclude>
    <Exclude Copy="0">AppData\Roaming\com.adobe.formscentral.FormsCentralForAcrobat</Exclude>
    <Exclude Copy="0">AppData\Roaming\Adobe\Acrobat\DC</Exclude>
    <Exclude Copy="0">AppData\Roaming\Adobe\SLData</Exclude>
    <Exclude Copy="0">AppData\Roaming\Sun\Java\Deployment\cache</Exclude>
    <Exclude Copy="0">AppData\Roaming\Sun\Java\Deployment\log</Exclude>
    <Exclude Copy="0">AppData\Roaming\Sun\Java\Deployment\tmp</Exclude>
    <Exclude Copy="0">AppData\Roaming\Citrix\PNAgent\AppCache</Exclude>
    <Exclude Copy="0">AppData\Roaming\Citrix\PNAgent\IconCache</Exclude>
    <Exclude Copy="0">AppData\Roaming\Citrix\PNAgent\ResourceCache</Exclude>
    <Exclude Copy="0">AppData\Roaming\ICAClient\Cache</Exclude>
    <Exclude Copy="0">AppData\Roaming\Macromedia\Flash Player\macromedia.com\support\flashplayer\sys</Exclude>
    <Exclude Copy="0">AppData\Roaming\Macromedia\Flash Player\macromedia.com\support\flashplayer\flashplayer\#SharedObjects</Exclude>
    <Exclude Copy="0">AppData\Roaming\ConnectWise\CrashDumps</Exclude>
    <Exclude Copy="0">AppData\Roaming\ConnectWise\cache</Exclude>
    <Exclude Copy="0">AppData\LocalLow</Exclude>
  </Excludes>
  <Includes>
    <Include Copy="3">AppData\LocalLow\Sun\Java\Deployment\security</Include>
  </Includes>
</FrxProfileFolderRedirection>
```

## Paths in Redirecitons.csv

`Redirections.csv` is not a definitive list of paths to exclude or include in the Profile Container. You should assess each of the paths included in this list for your environment and undestand whether a path should be excluded or [cleaned up with alternative methods](https://github.com/aaronparker/FSLogix/tree/master/Profile-Cleanup). It is likely that additional paths can be added to the list. With community feedback, this list can be improved.
