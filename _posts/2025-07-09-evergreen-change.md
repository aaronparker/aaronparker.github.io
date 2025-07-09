---
layout: post
title: 'Prepare for Change - Upcoming Evergreen Changes'
description: 'Some big changes are coming to Evergreen, so be prepared to update your scripts and pipelines to ensure things don't break.'
permalink: "/evergreen-change-2025/"
image:
  path: "/assets/img/evergreen/image.jpg"
  srcset:
    1920w: "/assets/img/evergreen/image.jpg"
    960w: "/assets/img/evergreen/image@0,5x.jpg"
    480w: "/assets/img/evergreen/image@0,25x.jpg"
comments: true
date: 2025-07-09 10:00 +1000
related_posts:
- 2025-05-02-rimo3-evergreen.md
- 2023-12-20-user-acceptance-testing-for-vdi-with-azure-devops.md
---
- this unordered seed list will be replaced by the toc
{:toc}

## Background

When the initial version of [Evergreen](https://stealthpuppy.com/evergreen) was released, it included support for a handful of applications. Each application was supported as an individual function - for example:

```powershell
Get-Microsoft365Apps
```

As the module grew to support additional applciations, this approach was not sustainable as discoverability of supported applciation was difficult. Therefore, the [approach was changed to include a single Get function](https://stealthpuppy.com/evergreen/changelog/#2104337) for applications. So this became:

```powershell
Get-EvergreenApp -Name Microsoft365Apps
```

## The issue

Since that time the supported number of applications has grown to 375 while continuing to include all of the per-application functions and manifest in the module. This means that any time a new application is added or a fix to an application is made, an entirely new release of Evergreen is required.

To make changes to the module, I loosely follow standard change control processes by creating a development branch, making the changes to the code, testing those changes, creating and merging a pull request in the main branch, then pushing the new version of the module to the PowerShell gallery.

This is time consuming and can sometimes create issues where someone hasn't updated the module in their environment that includes the fix.

## Addressing the issue

For a long time, I've been looking at seperating the per-application functions from the module so they can be updated on demand and newly supported applications or fixes to existing applications can be delivered faster.

An upcoming change to Evergreen will address this issue by seperating the per-application functions and manifests from the core module, by storing these in a seperate repository and including a method to download and update a locally cached copy of these functions.

Here's how I'm proposing to make these changes and I'm welcoming comments and feedback before this change is implemented.

### Move Evergreen to a GitHub organisation

To simplify discoverability of the various code repositories related to Evergreen, I'll be moving the Evergreen GitHub repo to the [EUC Pilots](https://github.com/EUCPilots) organisation. This will still essentially be managed by me, but I think this approach will improve branding and make it simpler to organise repositories.

I may move various Evergreen related sites (e.g. the documentation) away from https://stealthpuppy.com to https://eucpilots.com. I am also looking at moving [VcRedist](https://github.com/aaronparker/vcredist) to this organisation as well, as it's closely related to Evergreen.

### Move per-application functions to a dedicated reppository

The per-application functions and manifests will be moved to a dedicated repository in this organisation. You can see that repository here: [evergreen-apps](https://github.com/EUCPilots/evergreen-apps).

This repository will host the `Apps` and `Manifests` directories included in the module today, moving them out of the module and making it easier to make changes to these functions.

This repository includes [a release workflow](https://github.com/EUCPilots/evergreen-apps/blob/main/.github/workflows/validate-release.yml) the performs the following:

1. Validate all PowerShell functions - this still needs to be added, but Pester tests are used for validation of Evergreen today.
2. Validate the JSON manifests - the manifest need to have some basic validation applied.
3. Store SHA256 hashes for each PowerShell file and manifest. This enables validation when downloading the files locally.
4. Create a release for changes made to the application functions. Releases will include a list of changed files and with a version number in the format "yy.mm.dd.run", e.g. `25.07.06.2`. The release will include a zip file containing a copy of the `Apps` and `Manifests` directories with a [SHA256 hash of the file](https://github.blog/changelog/2025-06-03-releases-now-expose-digests-for-release-assets/).

![Screenshot of a release on the evergreen-apps repository](/media/2025/07/evergreen-apps-release.jpeg)

Any time changes are pushed to the `main` branch in this repository, a new release will be created, so that updated functions are available to download.

### Creating a method to download per-application functions

When importing the Evergreen module, you'll be prompted to download the per-application fuctions:

![Importing Evergreen and being prompted to run Update-Evergreen](/media/2025/07/import-module.png)

A new function has been added to Evergreen named `Update-Evergreen`. This downloads the latest release from the `evergreen-apps` repository, unpacks the files and stores them locally.

![Running Update-Evergreen for the first time](/media/2025/07/update-evergreen.gif)

This function supports the `-Force` parameter to force the download of the latest release of the per-application functions even if you already have these locally. This approach should enable the administrator to update Evergreen where the locally cached copies of the functions are perhaps broken.

![Running Update-Evergreen with the -Force parameter](/media/2025/07/update-evergreen-force.gif)

### How Update-Evergreen works

To facilite downloading and updating the per-application functions and to ensure that downloaded files are valid, `Update-Evergreen` performs the following steps:

1. Per-application functions and manifests will be stored in the the following default locations - on Windows in `%LocalAppData%\Evergreen` and on macOS or Linux in `~/.evergreen`.
2. These locations can be overridden by setting an environment variable named `EVERGREEN_APPS_PATH` pointing to a path of your choice.
3. The locally cached per-application functions and manifests are checked against the list of expected SHA256 hashes (store [here](https://github.com/EUCPilots/evergreen-apps/blob/main/sha256_hashes.csv)). If the hashes do not match, the administrator is prompted to run `Update-Evergreen -Force` - they won't automatically be updated unless there is a new version on the `evergreen-apps` repository.
4. The updated version of the per-application functions and manifests is downloaded from the latest release (i.e. the zip file).
5. The downloaded zip file is compared against the SHA256 hash stored on the GtiHub release object
6. After downloading unpacking the zip file, the included files are compared against the expected SHA256 hashes. If they do not match, the locally cached copies are not updated.
7. If they do match, the local copies will be updated and Evergreen will now support the latest apps.

`Update-Evergreen` is recommended as the simplest option to update to the latest version of the per-application functions and manifests; however, there's no reason an administrator couldn't do that manually, maintaining some control.

## FAQs

**Q**. When will this happen?
**A**. I'm not 100% certain, but it's likely to be around 6-8 weeks from the posting of this article (toward the end of August 2025).

**Q**. Why download the zip file rather than update individual functions?
**A**. I think this is the simplest approach - it enables the per-application functions and manifests to be tracked as a specific release and reduces the calls to GitHub (unautheticated calls to api.github.com are limited to 60 per hour). It also simplifies downloading the files by doing so in a single action. If required, `Update-Evergreen` could perhaps support downloading a specific release rather than the latest release.

**Q**. Can I test these changes before release?
**A**. Yes, view and test the changes in the [split-repo](https://github.com/aaronparker/evergreen/tree/split-repo) branch on the Evergreen repository. Please provide bugs and feedback so that I can make improvements before release.

**Q**. What will I need to do to update my scripts?
**A**. Update scripts to run the `Update-Evergreen` function before using any further Evergeen functions. For example:

```powershell
Install-Module -Name "Evergreen"
Import-Module -Name "Evergreen" -Force
Update-Evergreen
```
