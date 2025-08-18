---
layout: post
title: Automating Nerdio Manager Shell Apps, with Custom apps, Part 3
description: Using Azure Pipelines and the Nerdio Manager REST API to automate import of custom applications.
permalink: "/nerdio-shell-apps-p3/"
image:
  path: "/assets/img/shell/image.jpg"
  srcset:
    1920w: "/assets/img/shell/image.jpg"
    960w: "/assets/img/shell/image@0,5x.jpg"
    480w: "/assets/img/shell/image@0,25x.jpg"
comments: true
date: 2025-08-18 14:00 +1000
related_posts:
- 2025-07-29-nerdio-shell-apps.md
- 2025-07-29-nerdio-shell-apps-p2.md
- 2023-12-20-user-acceptance-testing-for-vdi-with-azure-devops.md
---
- this unordered seed list will be replaced by the toc
{:toc}

Now that we have a workflow that uses [Evergreen to find application versions and binaries](https://stealthpuppy.com/nerdio-shell-apps-p1/), and [imports these along with application definitions to create and update Nerdio Manager Shell Apps](https://stealthpuppy.com/nerdio-shell-apps-p2/), let's take a look at supporting custom applications. These might be legacy applications, in-house custom apps, applications that require manually downloading (i.e. require a login to get to binaries) or perhaps even existing packages in ConfigMgr that you want to import into Shell Apps.

## Custom Applications

As with any Shell App, the application binaries, detection, installation and uninstallation scripts are required. Unlike leverging Evergreen or VcRedist as an automatic source to find the latest binaries and versions, custom application require defining these properties manually.

The pipeline will require at least three things:

1. Configure the `Source` to be `"type": "Static"` in the `definition.json`
2. A URL to download the binaries - only a HTTPS source is supported. In a future update, I might support local paths for upload
3. A version number of the target application to be used for detection

When the application source is updated, the `definition.json` file can be modified to reflect the new version, pushed to the repository and the pipeline will import the new version of the application.

## Example application

Here's a simple example of a custom application using the Microsoft Configuration Manager Support Center available from the ConfigMgr ISO. This is updated  every so often and requires downloading the updated ISO or extracting the MSI file from a ConfigMgr install.

In the `definition.json`, I have specified a URL that is publically available and have manually determined the application version number from installing the application on a test machine. this is a basic MSI file, so the [install script performs a silent install](https://github.com/aaronparker/nerdio-actions/tree/main/shell-apps/Microsoft/SupportCenter). 

```json
{
    "name": "Configuration Manager Support Center",
    "description": "Support Center has powerful capabilities including troubleshooting and real-time log viewing.",
    "isPublic": true,
    "publisher": "Microsoft",
    "detectScript": "#detectScript",
    "installScript": "#installScript",
    "uninstallScript": "#uninstallScript",
    "fileUnzip": false,
    "versions": [
        {
            "name": "#version",
            "isPreview": false,
            "installScriptOverride": null,
            "file": {
                "sourceUrl": "#sourceUrl",
                "sha256": "#sha256"
            }
        }
    ],
    "source": {
        "type": "Static",
        "version": "5.2403.1209.1000",
        "url": "https://stavdghthbdflhzmvc.blob.core.windows.net/binaries/SupportCenterInstaller.msi",
        "path": null
    }
}
```

## Preparing a package

Packages can come from any source; however for applications with mutliple files in the install package, they will need to be first compressed into a single zip file to enable Shell Apps to download the binaries during install. Don't forget to enable `"fileUnzip": true` in the `definition.json` file.

This approach should enable you to utilise existing packages that include install and uninstall scripts, including those that might already be leveraging the [PowerShell App Deployment Toolkit](https://psappdeploytoolkit.com/).

Shell Apps will require you to create a new `detect.ps1` script to enable detection of the application, but this can be done using the existing metadata from these applications.

## Summary

In this article, I've demonstrated how to support custom applications or applications that require manual updates, with our automated pipeline tto create or update Shell Apps in Nerdio Manager.

Using the approaches outlined in this series of articles, we now have a method to automatically update off-the-shell apps with [Evergreen](https://stealthpuppy.com/evergreen) and [VcRedist](https://vcredist.com/). Along with a simple approach to adding those manually managed apps, or existing packages, we can use Shell Apps along side existing application delivery mechanisms.
