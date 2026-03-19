---
layout: post
title: Introducing the Evergreen Workbench
description: After more than six years, Evergreen now has a graphical interface. Here's a look at the Evergreen Workbench — a Windows desktop app and a browser-based web app for exploring application version data.
permalink: "/evergreen-workbench/"
image:
  path: "/assets/img/workbench/image.jpg"
  srcset:
    1920w: "/assets/img/workbench/image.jpg"
    960w: "/assets/img/workbench/image@0,5x.jpg"
    480w: "/assets/img/workbench/image@0,25x.jpg"
comments: true
date: 2026-03-19 10:00 +1100
related_posts:
- 2025-07-29-nerdio-shell-apps.md
- 2025-07-29-nerdio-shell-apps-p2.md
- 2025-07-09-evergreen-change.md
---
- this unordered seed list will be replaced by the toc
{:toc}

[Evergreen](https://stealthpuppy.com/evergreen) has been around for a little over six years now. What started as a handful of functions to retrieve application version data has grown into a module that today tracks more than 500 applications. Over that time, I've also built several solutions that integrate Evergreen into packaging workflows — automating downloads, managing Evergren libraries, importing packages into [Microsoft Intune](https://stealthpuppy.com/packagefactory/), and more recently into [Nerdio Manager Shell Apps](https://stealthpuppy.com/nerdio-shell-apps-p1/).

All of that has always lived firmly within an automation framework, PowerShell and the command-line. If you know PowerShell and know the module, it's powerful. If you're new to it — or you're looking to understand Evergreen's capabilities — the entry point can feel steep. I've been thinking about this for a while, and I'm excited to share two new graphical interfaces for Evergreen that I hope will make the module's capabilities more visible and accessible.

I'm calling them the **Evergreen Workbench** — available in two editions: a **Desktop Workbench** for Windows, and a **Web Workbench** that runs in any modern browser. These UIs won't replace existing PowerShell-based use of Evergreen; they wrap the same cmdlets and data behind an interactive interface. Think of them as a front door to functionality that was previously only available to those comfortable in a terminal.

This is still early days, particularly for the Desktop Workbench, and I'd love feedback and contributions as these tools mature.

Most of the desktop and web Workbench has been written with the help of Claude and GitHub Copilot. Given how complex these two features are, it's likely that most of the development will continue this way.
{:.note title="In development"}

## Why a Workbench?

This is something I've wanted to do for some time, but the honest answer is that I've accumulated a collection of automation solutions that use Evergreen under the hood — pipelines for building Intune Win32 packages, scripts for updating Nerdio Manager Shell Apps, library management workflows, and more. These are powerful, but they're scattered, and they each require some setup to understand and use.

The Workbench is an attempt to aggregate that functionality into a single place that's easier to discover and use. Rather than knowing the right cmdlet or digging through GitHub repos to find the right script, the goal is to make that functionality visible in a UI — whether that's browsing available app versions, managing a local library, or eventually importing a package into Intune or Nerdio Manager.

The Web Workbench takes a slightly different angle — it provides a read-only view of all Evergreen-tracked applications without requiring PowerShell or Windows at all. It's useful for looking up a download URL, checking what versions are tracked, or keeping an eye on recent application updates via RSS. This is basically a new version of the Evergreen App Tracker.

## The Workbench editions

Both editions are open source and available on GitHub:

- **Desktop Workbench:** [EUCPilots/evergreen-ui](https://github.com/EUCPilots/evergreen-ui) — MIT licence
- **Web Workbench:** [EUCPilots/workbench](https://github.com/EUCPilots/workbench) — MIT licence

Here's how they compare:

| | Desktop Workbench | Web Workbench |
|---|---|---|
| **Platform** | Windows (WPF) | Any modern browser |
| **Install** | PowerShell Gallery (`EvergreenUI`) | Hosted at [https://eucpilots.com/workbench](https://eucpilots.com/workbench) |
| **Browse apps** | Yes | Yes |
| **Search and filter** | Yes | Yes |
| **Dashboard** | No | Yes |
| **Download installers** | Yes | No |
| **Library management** | Yes | No |
| **Install / update apps** | In development | No |
| **Import to Intune / Nerdio** | In development | No |
| **Export to CSV** | Yes | Yes |
| **RSS feeds** | No | Yes (per app) |
| **PWA install** | No | Yes |
| **Theme** | Light / Dark | Light / Dark |

Full documentation for both editions is available at [https://eucpilots.com/evergreen-docs/workbench](https://eucpilots.com/evergreen-docs/workbench).

## The Web Workbench

The Web Workbench is the easiest place to start — no installation required. Open [https://eucpilots.com/workbench](https://eucpilots.com/workbench) in any browser and you have access to all Evergreen-tracked application data.

### Dashboard

The Dashboard gives you an at-a-glance view of everything Evergreen tracks.

[![The Web Workbench Dashboard showing summary statistics, charts, and recent activity]({{site.baseurl}}/media/2026/03/webui/webworkbench-dashboard.jpeg)]({{site.baseurl}}/media/2026/03/webui/webworkbench-dashboard.jpeg)

The Web Workbench Dashboard.
{:.figcaption}

At the top you'll see the headline numbers: total applications tracked, total version records, distinct architectures, installer file types, and applications updated in the last 48 hours. Below that, two horizontal bar charts break down the data by CPU architecture and installer file type — useful for getting a sense of what Evergreen is actually tracking. There's also a URI lookup field where you can paste a download URL to find which application it belongs to, and a recent activity list showing the applications with the most recent data updates.

### Browsing and filtering apps

The Apps view lists all Evergreen-supported applications in a sidebar with version detail on the right. Select an application to view its version entries — version string, language, file size, architecture, and direct download URI.

[![The Apps view showing Adobe Acrobat Reader DC with version detail columns]({{site.baseurl}}/media/2026/03/webui/webworkbench-apps.jpeg)]({{site.baseurl}}/media/2026/03/webui/webworkbench-apps.jpeg)

The Apps view with version detail for the selected application.
{:.figcaption}

Each column in the version table has a text filter below the header, and checkbox filters at the top of the pane let you narrow results by architecture and file type. These filters work together — for example, you can select x64 and type "English" in the Language column to see only English x64 installers.

[![The Apps view with a Language column filter applied showing only English results]({{site.baseurl}}/media/2026/03/webui/webworkbench-filter.jpeg)]({{site.baseurl}}/media/2026/03/webui/webworkbench-filter.jpeg)

Column filters and architecture checkboxes working together to narrow results.
{:.figcaption}

The toolbar above the table includes a copy button for the `Get-EvergreenApp` PowerShell command to retrieve the same data — a nice bridge between the UI and the module itself.

### Searching

The sidebar search filters the application list by name as you type.

[![The Apps view with the sidebar filtered to show only Microsoft Edge applications]({{site.baseurl}}/media/2026/03/webui/webworkbench-searchapps.jpeg)]({{site.baseurl}}/media/2026/03/webui/webworkbench-searchapps.jpeg)

Sidebar search filtering the application list by name.
{:.figcaption}

For a broader search, press **Ctrl+K** to open the global search overlay. This searches across all application names and download URIs — useful when you have a URL and want to know which app it belongs to.

[![The global search overlay showing results across application names and URIs]({{site.baseurl}}/media/2026/03/webui/webworkbench-search.jpeg)]({{site.baseurl}}/media/2026/03/webui/webworkbench-search.jpeg)

The global search overlay finds matches across app names and download URIs.
{:.figcaption}

### Other features

A few additional features worth noting:

- **RSS feeds** — each application has an RSS feed available from the toolbar. If you want to be notified when a specific application's version data changes, subscribe to its feed.
- **PWA install** — the Web Workbench is a Progressive Web App. Use your browser's install option to add it to your desktop or home screen for a standalone app experience on Windows, macOS, Linux, or mobile.
- **Export to CSV** — export the current filtered view to a CSV file.
- **Light and dark themes** — toggle with the sun/moon icon in the top-right corner.

## The Desktop Workbench

The Desktop Workbench is a WPF-based application that ships as the `EvergreenUI` PowerShell module. It wraps the same Evergreen cmdlets — `Get-EvergreenApp`, `Save-EvergreenApp`, `Start-EvergreenLibraryUpdate`, and others — behind an interactive Windows desktop interface.

Note that this is currently a pre-release module, so features and commands may change before the stable release.
{:.note title="Beta"}

### Installing and launching

The `EvergreenUI` module is published to the PowerShell Gallery. Because it's currently pre-release, you need the `-AllowPrerelease` flag:

```powershell
Install-Module -Name EvergreenUI -AllowPrerelease
```

The Evergreen module is listed as a dependency, so if you don't already have it installed, PowerShell will pull it in automatically.

Once installed, import the module and run `Start-EvergreenUI`:

```powershell
Import-Module EvergreenUI
Start-EvergreenUI
```

The workbench opens to the Apps view by default. You can change the startup view and other preferences in Settings.

Requirements are Windows 10 or Server 2019 or later, PowerShell 5.1 or 7.0+, and .NET Framework 4.7.2+ (for PowerShell 5.1) or .NET 6+ (for PowerShell 7+). Full installation details are in the [documentation](https://eucpilots.com/evergreen-docs/workbench).

### Apps and downloads

The Apps view displays all 500+ Evergreen-supported applications in a searchable list. Select an application to view its version and download metadata in the data grid on the right.

[![The Apps view showing Microsoft applications with channel, architecture, and file type data]({{site.baseurl}}/media/2026/03/ui/evergreen-workbench-apps.png)]({{site.baseurl}}/media/2026/03/ui/evergreen-workbench-apps.png)

The Desktop Workbench Apps view.
{:.figcaption}

The filter panel updates dynamically based on the properties that application returns. Selecting Adobe Acrobat Reader DC, for example, shows filters for Language, Architecture, and File type. Selecting Microsoft Edge shows Channel and Architecture filters. The available filter properties vary by application and can include architecture, channel, ring, language, installer type, and release.

[![Dynamic filters for Adobe Acrobat Reader DC showing Language, Architecture, and File type controls]({{site.baseurl}}/media/2026/03/ui/evergreen-workbench-apps-filter.png)]({{site.baseurl}}/media/2026/03/ui/evergreen-workbench-apps-filter.png)

The filter panel updates dynamically based on the selected application's properties.
{:.figcaption}

To download an installer, select versions in the Apps view and click **Add to download queue**, then switch to the Download view to manage and start downloads.

[![The Download view showing a queued download for Adobe Acrobat Reader DC]({{site.baseurl}}/media/2026/03/ui/evergreen-workbench-download.png)]({{site.baseurl}}/media/2026/03/ui/evergreen-workbench-download.png)

The Download view showing the download queue and progress.
{:.figcaption}

Downloads are processed sequentially and tracked with a progress bar. You can remove individual items, clear the queue, or open the output folder from the toolbar.

### Library management

If you have an existing Evergreen library, the Library view provides a GUI for browsing and updating it. Browse to your library path to load the contents — a table of applications with version counts and paths, and version detail for the selected application including file size and SHA256 hash.

[![The Library view showing library contents and version details for Microsoft Edge]({{site.baseurl}}/media/2026/03/ui/evergreen-workbench-library.png)]({{site.baseurl}}/media/2026/03/ui/evergreen-workbench-library.png)

The Library view for managing an existing Evergreen library.
{:.figcaption}

From the toolbar you can create a new library (`New-EvergreenLibrary`), refresh the contents (`Get-EvergreenLibrary`), or update the library with the latest application versions (`Start-EvergreenLibraryUpdate`). These map directly to the PowerShell cmdlets you'd run manually, just surfaced in the UI.

### Import - Microsoft Intune and Nerdio Manager

The Import tab is where some of the more ambitious integration work lives, with sub-tabs for Microsoft Intune Win32 Apps and Nerdio Manager Shell Apps.

The Nerdio Manager Shell Apps import is functional but not yet validated in production. The Microsoft Intune import is still in development.
{:.note title="In development"}

The idea here is that you point the workbench at a directory containing package definitions, it compares those definitions against what's currently in your Microsoft Intune tenant or Nerdio Manager environment, and you can import new apps or update existing ones from the UI.

[![The Import tab showing Microsoft Intune Win32 Apps with package definitions and import status]({{site.baseurl}}/media/2026/03/ui/evergreen-workbench-import-intune.png)]({{site.baseurl}}/media/2026/03/ui/evergreen-workbench-import-intune.png)

The Microsoft Intune import view comparing package definitions against apps in the tenant.
{:.figcaption}

I'll have more to share on the package definitions when these features are further down the track, but the intent is to create a unified package definition that works for Intune and Nerdio Manager.

[![The Import tab showing Nerdio Manager Shell Apps with version comparison]({{site.baseurl}}/media/2026/03/ui/evergreen-workbench-import-nerdio.png)]({{site.baseurl}}/media/2026/03/ui/evergreen-workbench-import-nerdio.png)

The Nerdio Manager Shell Apps import view.
{:.figcaption}

Authentication to Entra ID, the Nerdio Manager API, and optionally Azure Storage is managed via the Authentication sub-tab.

[![The Authentication sub-tab for configuring connections to Entra ID, Nerdio Manager, and Azure Storage]({{site.baseurl}}/media/2026/03/ui/evergreen-workbench-import-auth.png)]({{site.baseurl}}/media/2026/03/ui/evergreen-workbench-import-auth.png)

The Authentication sub-tab for configuring tenant and API connections.
{:.figcaption}

This is the integration work that is the most complex components, but also the area that still needs the most development and testing. If you're using Intune and/or Nerdio Manager and want to help test or contribute, I'd love to hear from you.

### Install view

The Install view compares package definitions against what's currently installed on the machine, letting you install or update applications directly from the workbench.

This feature is in development and may not function as expected.
{:.note title="In development"}

[![The Install view comparing installed and latest application versions]({{site.baseurl}}/media/2026/03/ui/evergreen-workbench-install.png)]({{site.baseurl}}/media/2026/03/ui/evergreen-workbench-install.png)

The Install view comparing installed versions against the latest versions available from Evergreen.
{:.figcaption}

Point the workbench at a directory containing package definitions and click **Load definitions**. The view shows each application's name and architecture, the currently installed version (if any), the latest version available from Evergreen, and a status indicating whether it's up to date, needs an update, or isn't installed. From there you can select applications and click **Install selected** to install or update them. If the workbench isn't running elevated, installers may prompt for UAC elevation.

The Install view is hidden by default — enable it in Settings.

### Settings

The Settings view covers general preferences — download output path, theme, and which views appear in the navigation — alongside provider-specific configuration for Nerdio Manager and Intune. The Import and Install tabs are hidden by default until these features are working as expected.

[![The Settings view showing General, Nerdio Manager, and Microsoft Intune configuration]({{site.baseurl}}/media/2026/03/ui/evergreen-workbench-settings.png)]({{site.baseurl}}/media/2026/03/ui/evergreen-workbench-settings.png)

The Settings view for configuring general preferences and provider connections.
{:.figcaption}

## Wrap Up

The Evergreen Workbench is something I've wanted to build for a while — a way to make Evergreen's capabilities more visible and accessible without replacing the PowerShell workflows that many environments already rely on. The Web Workbench is production-ready and a good starting point if you want a quick look at what Evergreen tracks. The Desktop Workbench is still in pre-release, but already functional for browsing apps, managing downloads, and working with libraries.

Full documentation for both editions is at [https://eucpilots.com/evergreen-docs/workbench](https://eucpilots.com/evergreen-docs/workbench).

If you try either edition and run into issues, have ideas for features, or want to help with development — particularly around the Intune and Nerdio Manager integrations — I'd love to hear from you. Leave a comment below or open an issue or Pull Request on GitHub. It's been more than six years since Evergreen's first release, and I think this is a genuinely exciting new direction for the project.

Is this turning Evergreen into a Windows package manager? I'm inclined to say no, even though much of the Workbench functionality does what package managers do. Like Evergreen itself, I've had a "build it, and they will come" mentality, which probably isn't ideal way to approach any sort of product. Luckily, Evergreen is for the community and likewise the Workbench.
