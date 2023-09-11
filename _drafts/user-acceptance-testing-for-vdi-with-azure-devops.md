---
layout: post
title: Validating Virtual Desktop Images with Azure DevOps, Pester and Evergreen
description: 'Automated validation of virtual desktop images for user acceptance testing with Azure DevOps and Azure Pipelines with self-hosted agents running Pester to perform automated tests with Evergreen.'
permalink: "/vdi-testing-azure-devops/"
image:
  path: "/assets/img/test/image.jpg"
  srcset:
    1920w: "/assets/img/test/image.jpg"
    960w: "/assets/img/test/image@0,5x.jpg"
    480w: "/assets/img/test/image@0,25x.jpg"
comments: true
---
As with any desktop environment, virtual desktops undergo regular change - monthly OS and application updates, new applications, and configuration updates all add to the variation. Change must be managed and should be well tested to ensure business services are not impacted.

Pooled virtual desktops that are deployed from a gold image are useful for managing change at scale - the user environment is separate from the desktop and users can connect to any available desktop in a pool, so all virtual machines must run the same image. 

However, a management and validation process is required, which will look similar to the process below:

BUILD > VALIDATE > USER ACCEPTANCE TESTING > PRODUCTION > UPDATE
{:.lead}

The gold image build and change process can be automated on any platform and version of Windows, but automation can be a time consuming process. Investing in an image automation process will save your bacon when it counts.

When a gold image is updated and deployed, most organisations will rely on manual user acceptance testing before promoting that image into production. There are several commercial solutions that can automate application testing (e.g., [Rimo3](https://www.rimo3.com/)), but you also have several free tools that can be used to automate part of your user acceptance testing.


