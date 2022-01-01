---
layout: post
title: Crowd Sourced Redirections.xml for FSLogix Profile Containers
description: A project to maintain a list of folder exclusions to assist in managing the size of FSLogix Profile Containers.
date: 2019-04-29 17:50 +1000
permalink: "/fslogix-profile-containers-redirections/"
image:
  path:    /assets/img/crowd/image.jpg
  srcset:
    1920w: /assets/img/crowd/image.jpg
    960w:  /assets/img/crowd/image@0,5x.jpg
    480w:  /assets/img/crowd/image@0,25x.jpg
categories:
- Microsoft
---
* this unordered seed list will be replaced by the toc
{:toc}

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
<?xml version="1.0" encoding="UTF-8"?>
<!--Generated 2020-06-17 from https://raw.githubusercontent.com/aaronparker/FSLogix/master/Redirections/Redirections.csv-->
<FrxProfileFolderRedirection ExcludeCommonFolders="0">
  <Excludes>
    <!--Omit if folder is redirected to the network-->
    <Exclude Copy="0">Downloads</Exclude>
    <!--Office add-ins and other apps. May impact performance of some apps-->
    <Exclude Copy="0">AppData\Local\Apps</Exclude>
    <!--May break per-user installed apps-->
    <Exclude Copy="0">AppData\Local\Downloaded Installations</Exclude>
    <!--May impact performance of .NET apps-->
    <Exclude Copy="0">AppData\Local\Assembly</Exclude>
    <!--Only include if the JRE is in the environment. May impact performance of Java apps-->
    <Exclude Copy="0">AppData\Local\Sun</Exclude>
    <!--Omit if you don't see this path in your environment-->
    <Exclude Copy="0">AppData\Local\CrashDumps</Exclude>
    <!--Omit if not using Remote Desktop Connection client inside a remote desktop-->
    <Exclude Copy="0">AppData\Local\Microsoft\Terminal Server Client</Exclude>
    <!--Google Chrome brower cache-->
    <Exclude Copy="0">AppData\Local\Google\Chrome\User Data\Default\Cache</Exclude>
    <!--Microsoft Edge UWP browser cache-->
    <Exclude Copy="0">AppData\Local\Packages\Microsoft.MicrosoftEdge_8wekyb3d8bbwe\AC\MicrosoftEdge\Cache</Exclude>
    <!--Microsoft Edge (Chromium) cache-->
    <Exclude Copy="0">AppData\Local\Microsoft\Edge SxS\User Data\Default\Cache</Exclude>
    <!--Details here https://docs.microsoft.com/en-us/microsoftteams/teams-for-vdi#teams-cached-content-exclusion-list-for-non-persistent-setup-->
    <Exclude Copy="0">AppData\Roaming\Microsoft\Teams\media-stack</Exclude>
    <!--Only include if the JRE is in the environment. May impact performance of Java apps-->
    <Exclude Copy="0">AppData\Roaming\Sun\Java\Deployment\cache</Exclude>
  </Excludes>
  <Includes />
</FrxProfileFolderRedirection>
```

## Paths in Redirecitons.csv

`Redirections.csv` is not a definitive list of paths to exclude or include in the Profile Container. You should assess each of the paths included in this list for your environment and undestand whether a path should be excluded or [cleaned up with alternative methods](https://github.com/aaronparker/FSLogix/tree/master/Profile-Cleanup). It is likely that additional paths can be added to the list. With community feedback, this list can be improved.
