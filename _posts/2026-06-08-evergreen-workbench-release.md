---
layout: post
title: "Evergreen Workbench is Generally Available"
description: >
  The Evergreen Workbench (EvergreenUI) has reached its first stable release. Here's a look at everything it can do - from browsing app versions and managing libraries, to importing packages directly into Microsoft Intune and Nerdio Manager.
permalink: "/evergreen-workbench-release/"
categories:
  - Evergreen
image:
  path: "/assets/img/workbench/image.jpg"
  width: 1920
  height: 1005
  srcset:
    1920w: "/assets/img/workbench/image.jpg"
    960w: "/assets/img/workbench/image@0,5x.jpg"
    480w: "/assets/img/workbench/image@0,25x.jpg"
  attribution:
    photographer:     "Hal Gatewood"
    photographer_url: "https://unsplash.com/@halacious"
    source:           "Unsplash"
    source_url:       "https://unsplash.com/photos/black-and-yellow-rotary-tool-v7WyjiyXNr4"
comments: true
date: 2026-06-09 10:00 +1000
related_posts:
- 2026-03-19-evergreen-workbench.md
---

- this unordered seed list will be replaced by the toc
{:toc}

The Evergreen Workbench and the [EvergreenUI](https://www.powershellgallery.com/packages/EvergreenUI/) PowerShell module - has reached its first stable release with version **1.0.24**. This module adds graphical front-end to the Evergreen module and provides many of the functions of Evergreen. It also includes a few workflows that integrate Evergreen, including importing Win32 packages into Microsoft Intune, importing Shell Apps into Nerdio Manager, and installing local applications.

If you're not already familiar with [Evergreen](https://eucpilots.com/evergreen), it's a PowerShell module that returns the latest version and download URI for 500+ applications. The Desktop Workbench wraps those same cmdlets (`Get-EvergreenApp`, `Save-EvergreenApp`, `Start-EvergreenLibraryUpdate`, and more) behind an interactive Windows GUI, so you don't need to fire up a terminal for day-to-day tasks.

In this article, I'll walk through every view in the Desktop Workbench so you know what to expect when you install it.

The Desktop Workbench is Windows-only - it's built on WPF, so it requires Windows 10 / Windows Server 2019 or later, PowerShell 5.1 or 7.0+, and .NET Framework 4.7.2+ (or .NET 6+ for PowerShell 7). No additional DLLs are needed beyond what ships with Windows.
{:.note}

## Installing the Desktop Workbench

With the stable release, installation is straightforward from the PowerShell gallery:

```powershell
Install-Module -Name EvergreenUI
```

The `Evergreen` module is listed as a dependency, so PowerShell will pull it in automatically if you don't already have it. Once installed, launch the Workbench:

```powershell
Import-Module -Name EvergreenUI
Start-EvergreenWorkbench
```

The workbench depends on these additional modules: 'Az.Accounts', 'Az.Resources', 'Az.Storage', 'IntuneWin32App', 'Microsoft.Graph.Authentication'. To install EvergreenUI and all depdendencies, use the following commands:

```powershell
Install-Module -Name EvergreenUI, Evergreen, Az.Accounts, Az.Resources, Az.Storage, IntuneWin32App, Microsoft.Graph.Authentication
Import-Module -Name EvergreenUI
Start-EvergreenWorkbench
```

## Apps View

The Apps view shows all 500+ applications supported by Evergreen in a searchable list on the left, with version and download metadata on the right. Use the search box at the top of the list to filter by application name.

[![The Apps View showing Microsoft applications with version, channel, architecture, and type columns]({{site.baseurl}}/media/2026/06/evergreen-workbench-apps.png)]({{site.baseurl}}/media/2026/06/evergreen-workbench-apps.png)

Screenshot: Apps View with Microsoft applications.
{:.figcaption}

Select an application from the list and click Refresh to see what `Get-EvergreenApp` returns for it - Version, and URI, along with additional data such as Date, Channel, Release, Architecture depending on the application. Metadata is cached so that a refresh does not need to be run each time.

### Dynamic Filters

When you select an application, the filter options update automatically based on that application's properties. The available filters vary by application and can include:

| Property | Example values |
|:--|:--|
| Architecture | x64, x86, ARM64 |
| Channel | Stable, Beta, Dev |
| Ring | Production, Enterprise |
| Language | English, English (UK) |
| Type | exe, msi, msix, zip |
| Release | General, Enterprise |

Use **Clear filters** to reset, or **Export to CSV** to save the filtered results to disk.

[![Dynamic filter panel for Adobe Acrobat Reader DC showing Language, Architecture, and Type controls]({{site.baseurl}}/media/2026/06/evergreen-workbench-apps-filter.png)]({{site.baseurl}}/media/2026/06/evergreen-workbench-apps-filter.png)

Screenshot: Dynamic filters for Adobe Acrobat Reader DC.
{:.figcaption}

### Favourites and Column Management

You can star frequently used applications directly from the list - favourites are pinned to the top and saved in your local Workbench settings. The app detail header also shows a **Last refresh** timestamp when cached data is available.

Right-click any column header to show or hide optional columns. Structural columns like Version and URI stay visible; everything else is optional. Click a column header to sort ascending, then again to sort descending.

## Download View

To download application installers, select one or more versions in the Apps View and click **Add to download queue**, then switch to the Download View to manage and kick off downloads.

[![The Download View showing a queued download for Adobe Acrobat Reader DC with status, version, architecture, and URI columns]({{site.baseurl}}/media/2026/06/evergreen-workbench-download.png)]({{site.baseurl}}/media/2026/06/evergreen-workbench-download.png)

Screenshot: Download View with a queued item.
{:.figcaption}

Downloads are processed sequentially in queue order. The toolbar gives you the usual controls - remove selected, clear queue, open folder, and download all. A progress bar at the bottom tracks the active download. Once complete, the Path column fills in with the local file path.

## Library View

If you're already using an [Evergreen library](https://eucpilots.com/evergreen/updatelibrary) (`New-EvergreenLibrary`, `Start-EvergreenLibraryUpdate`), the Library View puts a GUI on top of it. Point it at your library directory and it loads the contents - applications, version counts, and paths.

[![The Library View showing library contents with version details for Microsoft Edge]({{site.baseurl}}/media/2026/06/evergreen-workbench-library.png)]({{site.baseurl}}/media/2026/06/evergreen-workbench-library.png)

Screenshot: Library View showing installed versions and file details.
{:.figcaption}

Select an application from the library list to see version details: version string, URI, type, size, SHA256 hash, release, and full file path for each version on disk. The toolbar covers the full library lifecycle - browse, open folder, create a new library, refresh the library contents, and trigger an update to pull the latest versions.

## Import Tab

The Import Tab is where the workbench includes workflows for Microsoft Intune or Nerdio Manager application management. It has four sub-tabs: **Microsoft Intune Win32 Apps**, **Nerdio Manager Shell Apps**, **Microsoft 365 Apps**, and **Authentication**.

Import-related modules are loaded when you first open the tab. Sign-in and import actions stay disabled until the required modules finish loading.

Each of the tabs relies on application package definitions that can be found here: [https://github.com/EUCPilots/evergreen-packages](https://github.com/EUCPilots/evergreen-packages). This repository includes as set of package definitions for importing supported apps into Intune and Nerdio Manager, including the Microsoft 365 Apps. The Intune and Nerdio Manager packages are currently seperate, but I would like to combine these into a single package definition in the future. The Microsoft 365 Apps configuration files support both Intune and Nerdio Manager.

### Microsoft Intune Win32 Apps

Browse to a directory of Intune package definitions, load them, and the Workbench compares them against what's currently deployed in your Intune tenant. The reconciliation grid shows each app with its Intune version, latest Evergreen version, status, and the action to take:

- **Import new app** - the definition isn't in Intune yet
- **Import new version** - an update is available
- **Fix in definition** - there's a definition issue (duplicate GUID, etc.)

[![The Import Tab showing Intune Win32 Apps with package definitions and reconciliation status]({{site.baseurl}}/media/2026/06/evergreen-workbench-import-intune.png)]({{site.baseurl}}/media/2026/06/evergreen-workbench-import-intune.png)

Screenshot: Intune Win32 Apps import tab with reconciliation view.
{:.figcaption}

The **Update definitions** action resolves the latest Evergreen version for each definition and updates `App.json` and detection rules in place - useful for keeping your definition files current before importing.

### Nerdio Manager Shell Apps

The Nerdio Manager sub-tab works the same way: point it at your Shell App definitions directory, compare against your Nerdio Manager environment, and import new apps or new versions as needed.

[![The Import Tab showing Nerdio Manager Shell Apps with version comparison]({{site.baseurl}}/media/2026/06/evergreen-workbench-import-nerdio.png)]({{site.baseurl}}/media/2026/06/evergreen-workbench-import-nerdio.png)

Screenshot: Nerdio Manager Shell Apps import tab.
{:.figcaption}

### Microsoft 365 Apps

Browse to a folder containing Office Deployment Tool XML configuration files, load them, and the grid shows each configuration with its display name, products, and validation status. From here you can package and import directly to either Nerdio Manager or Intune.

[![The Import Tab showing Microsoft 365 Apps configurations with package and import actions]({{site.baseurl}}/media/2026/06/evergreen-workbench-import-m365.png)]({{site.baseurl}}/media/2026/06/evergreen-workbench-import-m365.png)

Screenshot: Microsoft 365 Apps import tab.
{:.figcaption}

### Authentication

The Authentication sub-tab manages connections to Entra ID (for Intune), the Nerdio Manager API, and optionally Azure Storage for storing Shell App packages. Connection indicators on the other import sub-tabs show the current authentication state.

[![The Authentication sub-tab showing Entra ID, Nerdio Manager API, and Azure Storage connection configuration]({{site.baseurl}}/media/2026/06/evergreen-workbench-import-auth.png)]({{site.baseurl}}/media/2026/06/evergreen-workbench-import-auth.png)

Screenshot: Authentication configuration sub-tab.
{:.figcaption}

## Install View

The Install tab is where you can run a local install of an application. Load the same directory of Intune package definitions, and it compares the defined versions against what's currently installed on the machine. Each row shows the App, Publisher, Installed version, Latest version from Evergreen, Status, and the available Action.

This tab enables you to install apps locally for a quick install, test your application packages before uploading to Intune or Nerdio Manager, or it can provide a simple way to install set of a application into a gold image.

[![The Install View comparing installed application versions against the latest from Evergreen]({{site.baseurl}}/media/2026/06/evergreen-workbench-install.png)]({{site.baseurl}}/media/2026/06/evergreen-workbench-install.png)

Screenshot: Install View showing version comparisons and install status.
{:.figcaption}

Status values are straightforward - Installed (up to date), Installed (update needed), or Not installed. Use **Find latest versions** to query Evergreen for each defined application, then **Install selected** to install or update the selected rows.

If the Workbench isn't running elevated, installers are likely to launch a UAC prompt for elevation. The typical workflow for this tab should run from an elevated Terminal instance.
{:.note title="Note"}

## Update View

The Update View runs `Update-Evergreen` from the GUI - it synchronises the local application definitions cache from the [evergreen-apps](https://github.com/EUCPilots/evergreen-apps) repository. The output panel shows timestamped log messages for the cache check, download, hash validation, and sync progress.

[![The Update View showing Update-Evergreen output with hash validation and sync progress]({{site.baseurl}}/media/2026/06/evergreen-workbench-update.png)]({{site.baseurl}}/media/2026/06/evergreen-workbench-update.png)

Screenshot: Update View running Update-Evergreen.
{:.figcaption}

## Settings

The Settings tab includes - download output path, the Evergreen apps cache path (read-only), light/dark theme, visibility toggles for the Import and Install tabs, and app version cache management, the Microsoft Intune package output path, and a Logs section for opening or clearing the local log directory.

[![The Settings View showing General, Microsoft Intune, and Logs configuration options]({{site.baseurl}}/media/2026/06/evergreen-workbench-settings.png)]({{site.baseurl}}/media/2026/06/evergreen-workbench-settings.png)

Screenshot: Settings View.
{:.figcaption}

## Log Panel

Every operation - version lookups, downloads, library updates, imports - writes timestamped messages to the Log Panel at the bottom of the window at Info, Warning, or Error level. You can copy the log to clipboard, save it to a file, or toggle the panel visibility. Log messages come from background runspaces in real time, so you can watch progress as it happens.

## Wrap Up

With version **1.0.24**, the Evergreen Workbench moves from pre-release experiment to stable, general-availability release (to be fair, the workbench might forever be experimental). It covers the full workflow from browsing app versions and managing an Evergreen library, through to installing applications from package definitions and importing Win32 apps and Shell Apps directly into Microsoft Intune and Nerdio Manager. Install it from the PowerShell Gallery:

```powershell
Install-Module -Name EvergreenUI
Start-EvergreenWorkbench
```

Full documentation is available at [eucpilots.com](https://eucpilots.com/workbench-desktop), and the source code and package definitions are on GitHub - star, fork, and contribute to the project:

- [EUCPilots/evergreen-ui](https://github.com/EUCPilots/evergreen-ui) - Desktop Workbench source
- [EUCPilots/evergreen-packages](https://github.com/EUCPilots/evergreen-packages) - package definitions for Install and Import workflows

## Bonus: Web Workbench

The [Web Workbench](https://eucpilots.com/workbench) is also available - it's a browser-based view of all Evergreen-tracked applications, accessible on any platform. If you just need a quick way to look up an application's latest version or download URL - on any platform, without installing anything - view the [Web Workbench](https://eucpilots.com/workbench). It also provides a dashboard, per-column filters, global search, CSV export, and per-app RSS feeds. It can be installed as a PWA for a standalone app experience.

The Web Workbench and the Desktop Workbench complement each other - the Web Workbench is great for quick lookups; the Desktop Workbench is where you go to actually act on that information.
