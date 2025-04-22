---
layout: post
title: 'Six lessons learned from six years of Evergreen'
description: 'Six years of building the Evergreen PowerShell module has provided some insights into how vendors manage their software and the impacts on customers.'
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

November 2018 was the first commit to what became the [Evergreen](https://stealthpuppy.com/evergreen) project and in that time, myself and a bunch of contributors hav added close to 400 applications to the module.

It's been a bit of a labour of love to get the module to this position, but it hasn't been without some challenges, particularly with a certain set of applications. That number of of apps would be higher, if we're just for some vendors to make life a little easier. 

Before we dig into these lessons, let's make sure you're aware of what Evergreen is and the approach that it takes to finding an application version and installer download URL. At its core, Evergreen is a PowerShell module that returns the latest version number and download URL for a set of supported applications. It's important to understand that Evergreen is not a package manager, but exists so that an administrator can use it as the basis for their own application management solution or to audit their environment to ensure they are running the latest version of an application.

Evergreen is built on the idea that to return data that can be trusted, it should only use the application vendor's own data sources to determine details for an application. This means that when the administrator runs a query in their environment, there are no middle men and the data can be audited trusted.

Evergreen does this by attempting to replay what an application does when checking for a new update, or queries an official vendor source for the application update data.

## Every vendor reinvents the wheel

No application vendor implements application updates in the same way and even a single vendor does not use the same approach to checking for updates for all of their applications.

To determine what an application does when checking for updates, I've spent a lot of time with Fiddler or similar tools to see what the application is doing behind the scenes. Some applications do a simple lookup to an API or XML feed etc., while others go to extraordinary lengths 

## Some vendors do some weird shit with their update servers

Some vendors have gone to extraordinary lengths to prevent access to their update services, or more correctly ensure only their applications are making valid requests to their update servers. In some respects this is understandable, 

For example, FileZilla uses a self-signed certificate and a custom user agent with their update server. As a result of the trouble of getting this to work in Evergreen, it's an application I've dropped support for.

## Not all application vendors use WinHTTP correctly

For whatever reason that I cannot fathom, not all application vendors use standard methods to implement access to the internet via a proxy server. Some applications don't support proxy servers at all.

Now needing to support proxy servers is likely become less important, and filtering at the device level is more popular than ever (e.g. Zscaler), but if you've ever had to support applications in an environment with a proxy server at the edge, you'll know the effort that's gone into troubleshooting and configuration to support those applications.

## Locking application downloads or support documentation behind a login in an anti-customer practice

There have been a good number of applications that I would love to add to Evergreen; however, those application installers are locked behind a login. This means that I can't download the installer to see what it's doing 

Making it difficult for an administrator to determine the latest version of an application, download the latest installer or provide real value to their environments by automating the download and install of an application (i.e. in gold image builds, application packaging etc.) serves to make life more difficult.

Most of these applications require separate licensing or activation anyway, thus blocking access to the binaries just serves to add time to the an administrative task or block the ability to automate a process completely.


## What should vendors being doing?

* Providing a simple endpoint or service that can be queried to return information on application versions and download URLs. Some vendors  have even provided a resource that Evergreen can query. ControlUp, deviceTRUST (now a part of Citrix), and Master Packager have been fantastic in their support Evergreen.
* Make documentation and application installers open - locking these resources behind a login serves to hurt the hard working administrators responsible for deploying and managing these vendors applications. Putting up these road blocks adds stress, particularly when time matters.
