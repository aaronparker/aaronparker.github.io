---
layout: post
title: User Acceptance Testing for VDI with Azure DevOps
description: 'Validation of virtual desktops for user acceptance testing via integration with with Azure DevOps and Azure Pipelines with self-hosted agents running Pester to perform automated tests.'
permalink: "/vdi-testing-azure-devops/"
image:
  path: "/assets/img/test/image.jpg"
  srcset:
    1920w: "/assets/img/test/image.jpg"
    960w: "/assets/img/test/image@0,5x.jpg"
    480w: "/assets/img/test/image@0,25x.jpg"
comments: true
---
As with any desktop environment, virtual desktops can sustain a lot of change - monthly OS and application update, new applications, and generate desktop image changes. Change in IT must be managed and well tested to ensure business services are not impacted.

Pooled virtual desktops that are deployed, destroyed and re-deployed from a a gold image are useful for managing change at scale - the user environment is separate from the desktop and users can connect to any available desktop in a pool, so all desktops must run the same image. However, a management and validation process is required, which will look similar to the process below:

BUILD > USER ACCEPTANCE TESTING > PRODUCTION > UPDATE
{:.lead}

The gold image build and change process can be automated on any platform and version of Windows - it can be a time consuming process, but investing in an image automation process will save your bacon when it counts.

When a gold image is updated and deployed, most organisations will rely on manual user acceptance testing before promoting that image into production. There are several commercial solutions that can automate application testing (e.g., [Rimo3](https://www.rimo3.com/)), but you also have several free tools that can be used to automate part of your user acceptance testing.


