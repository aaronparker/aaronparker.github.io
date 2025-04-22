---
layout: post
title: 'Importing Application Packages into Rimo3 Cloud with Evergreen'
description: 'Using the Rimo3 Cloud API to import application packages with Evergreen.'
permalink: "/six-lessons-evergreen/"
image:
  path: "/assets/img/folder/image.jpg"
  srcset:
    1920w: "/assets/img/folder/image.jpg"
    960w: "/assets/img/folder/image@0,5x.jpg"
    480w: "/assets/img/folder/image@0,25x.jpg"
comments: true
---
- this unordered seed list will be replaced by the toc
{:toc}

I'm really pleased to release a solution for importing application packages into [Rimo3 Cloud](https://www.rimo3.com/products) with my [Evergreen PowerShell module](https://stealthpuppy.com/evergreen). This enables you to use Evergreen as a trusted source for your application packages and Rimo3 Cloud to test and validate those applications before importing them into Microsoft Intune or Configuration Manager.

## About Rimo3

Rimo3 Cloud is a comprehensive platform designed for modernizing and managing enterprise workspaces, ensuring that IT teams can transition smoothly to modern environments like Windows 365, Windows 11, Azure Virtual Desktop, and Intune. One of its standout features is its robust approach to application lifecycle management — a process that covers every phase of an application’s existence within an IT ecosystem.

At its core, Rimo3 Cloud automates several key tasks that traditionally require significant manual effort. It automatically discovers the full inventory of applications within an organization, ensuring that nothing is overlooked. Once apps are identified, the platform systematically validates them against specific environmental criteria to check for compatibility and performance, which is crucial before any change is deployed. After validation, Rimo3 Cloud helps package the applications into modern deployment formats (like Win32 or MSIX) that align with contemporary management frameworks. Finally, it streamlines patch management by automating the testing and deployment of application updates, reducing the likelihood of disruptions or performance issues that can arise from manual patching processes.

By employing automation at each stage—from discovery through to patch deployment — Rimo3 Cloud transforms what is often a complex, error-prone manual process into a smooth and efficient workflow. This not only bolsters security and operational continuity but also frees IT teams to focus on more strategic tasks, reducing downtime and minimizing risk across the entire application ecosystem.

## About Evergreen

The Evergreen PowerShell module streamlines how you manage and deploy software on Windows systems. It automatically retrieves the latest version information and download URLs for a range of common Windows applications by directly querying the vendors’ update APIs. This means that rather than relying on third-party aggregators, the module pulls data directly from the source, ensuring that the information is both current and trustworthy.



