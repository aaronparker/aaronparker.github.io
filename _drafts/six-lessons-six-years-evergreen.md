---
layout: post
title: 'Six lessons learned from six years of Evergreen'
description: 'Six years of building the Evergreen PowerShell module has provided some insights into how vendors manage their software and the impacts on customers.'
permalink: "/six-lessons-evergreen/"
image:
  path: "/assets/img/six/image.jpg"
  srcset:
    1920w: "/assets/img/six/image.jpg"
    960w: "/assets/img/six/image@0,5x.jpg"
    480w: "/assets/img/six/image@0,25x.jpg"
comments: true
---
- this unordered seed list will be replaced by the toc
{:toc}

November 2018 was the first commit to what became the [Evergreen](https://stealthpuppy.com/evergreen) project and in that time, myself and a bunch of contributors have added close to 400 applications to the module.

It's been a bit of a labour of love to get the module to this position, but it hasn't been without some challenges, particularly with a certain set of applications. That number of of apps would be higher, if we're just for some vendors to make life a little easier. 

Before we dig into these lessons, let's make sure you're aware of what Evergreen is and the approach that it takes to finding an application version and installer download URL. At its core, Evergreen is a PowerShell module that returns the latest version number and download URL for a set of supported off-the-self Windows applications.

It's important to understand that Evergreen is not a package manager, but exists so that an administrator can use it as the basis for their own application lifecycle management solution. This may include download and install or update of applications, or auditing an environment to ensure it is running the latest version of an application.

Evergreen is built on the idea that to return data that can be trusted, it should only use only the application vendor's data sources to determine details for an application. I would even go as far to say that Evergreen can help avoid supply chain attacks, because the at runtime there are no middle men and the data can be audited and trusted.

Evergreen does this by attempting to replay what an application does when checking for a new update, or queries an official vendor source for the application update data.

## Six lessons

### Every vendor reinvents the wheel

No application vendor implements application updates in the same way and there's no standard industry-wide method for managing application updates. Most application vendors have implemented their own methods to allow their applications to check for and download updates.

Some applications do a simple lookup to an API or JSON/XML feed, parse a simple text or INI file, download and extract a local file with update information, while others have implemented completely custom methods. Yet more have gone to extraordinary lengths to obfuscate how their application update mechanisms work retrieve updates.

Out of the hundreds of applications I've looked at, I probably count 

### Some vendors reinvent the wheel more than once

Some application vendors don't use the same method for updates across their applications. Rather than standardise on a single update mechanism, they've chosen to use different mechanisms for their various applications.

Microsoft, for example, uses multiple development platforms and as a result they use different mechanisms for their apps, e.g. the Microsoft 365 Apps, Microsoft Edge, and Visual Studio Code.

### Some vendors do some weird shit

Some vendors have gone to extraordinary lengths to prevent access to their update services, or more correctly ensure only their applications are making valid requests to their update servers. In some respects this is understandable, 

FileZilla uses a self-signed certificate and a custom user agent with their update server. As a result of the trouble of getting this to work in Evergreen, it's an application I've dropped support for.

### Not all application vendors use WinHTTP correctly

For whatever reason that I cannot fathom, not all application vendors use standard methods to implement access to the internet via a proxy server. Some applications don't support proxy servers at all.

Now needing to support proxy servers is likely become less important, and filtering at the device level is more popular than ever (e.g. Zscaler), but if you've ever had to support applications in an environment with a proxy server at the edge, you'll know the effort that's gone into troubleshooting and configuration to support those applications.

### Locking downloads or documentation behind a login in an anti-customer practice

There have been a good number of applications that I would love to add to Evergreen; however, those application installers are locked behind a login. This means that I can't download the installer to see what it's doing 

Making it difficult for an administrator to determine the latest version of an application, download the latest installer or provide real value to their environments by automating the download and install of an application (i.e. in gold image builds, application packaging etc.) serves to make life more difficult.

Most of these applications require separate licensing or activation anyway, thus blocking access to the binaries just serves to add time to the an administrative task or block the ability to automate a process completely.

## What should vendors being doing?

Feeds for application versions and updates should be free and open. It should not require an administrator to manually search a vendor site, spend an inordinate amount of time 

* Providing a simple endpoint or service that can be queried to return information on application versions and download URLs. Some vendors have even provided a resource that Evergreen can query. ControlUp, deviceTRUST (now a part of Citrix), and Master Packager have been fantastic in their support Evergreen.
* Make documentation and application installers open - locking these resources behind a login serves to hurt the hard working administrators responsible for deploying and managing these applications. Putting up these road blocks adds stress, particularly when time matters.
