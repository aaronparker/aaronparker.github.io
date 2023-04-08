---
layout: post
title: Support Frontline Workers on Shared Virtual Desktops
description: 'Configuring virtual desktops to supporting frontline workers using Microsoft 365 F1/F3 etc. alongside users licensed for Microsoft E3/E5'
image:
  path: "/assets/img/hardhat/image.jpg"
  srcset:
    1920w: "/assets/img/hardhat/image.jpg"
    960w: "/assets/img/hardhat/image@0,5x.jpg"
    480w: "/assets/img/hardhat/image@0,25x.jpg"
---
The [Microsoft 365 F1/F3 and Office 365 F3 licenses](https://learn.microsoft.com/en-us/microsoft-365/frontline/flw-licensing-options) are aimed at frontline workers. These licenses do not include the desktop versions of the Microsoft 365 Apps, so users with these licenses cannot run those applications. The Microsoft 365 Apps do have a [viewer mode](https://learn.microsoft.com/en-us/deployoffice/overview-viewer-mode); however, this is a per-machine setting. Consequently supporting users with mixed licenses on the same virtual desktop image becomes a challenge.

You could create two images - one with the Microsoft 365 Apps to support licensed users and one without to support frontline users; however, the result will be less than optimal use of your VDI compute capacity by requiring more session hosts for the same number of user sessions.

In this article, I'll show you how to deploy a configuration that will support users with mixed licenses on the same session host. This configuration will configure the environment for users with Microsoft 365 F1/F3 licenses

* Configure the Microsoft 365 Apps in viewer mode
* Remove access to applications that don't behave as expected in viewer mode
* Implement web alternatives for these applications

On the same image, users with Microsoft 365 E3/E5 licenses will continue to have access to the full desktop application experience that those licenses entitles them for.
