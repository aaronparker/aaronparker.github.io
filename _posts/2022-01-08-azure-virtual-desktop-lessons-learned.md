---
layout: post
title: 4 Things I Learned Deploying Azure Virtual Desktop
description: It pays to share lessons learned with Azure Virtual Desktop for others
  and your future self.
permalink: "/4-lessons-avd/"
image:
  path: "/assets/img/four/image.jpg"
  srcset:
    1920w: "/assets/img/four/image.jpg"
    960w: "/assets/img/four/image@0,5x.jpg"
    480w: "/assets/img/four/image@0,25x.jpg"
comments: true
date: 2022-01-08 12:44 +1100
---
* this unordered seed list will be replaced by the toc
{:toc}

This article has been sitting in my drafts folder for almost 2 years. This article was originally written in January 2020, but still applies to Azure Virtual Desktop today. Other than updating for the new naming, I'm posting it as-is.
{:.note}

This year, I've spent a number of months head down in Azure Virtual Desktop projects and have come across several common lessons learned from these projects. In this article, I'll cover 4 things I learned deploying Azure Virtual Desktop.

## Azure Virtual Desktop is an Azure service first

AVD is a VDI solution built on top of a public cloud service, rather than a product that has added support to public clouds for virtual desktops. If you were to compare AVD to traditional VDI solutions, you'll quickly see that AVD is very different.

Microsoft's approach to building AVD has been to build a virtual desktop solution that adds a desktop broker service on top of existing Azure services. This means that you can apply the same cloud adoption framework and automation principles to AVD as with the rest of Azure.

## Build AVD on a Solid Foundation

Being successful requires planning your AVD deployment by building upon an [Azure adoption framework](https://azure.microsoft.com/en-us/cloud-adoption-framework/). There are many Azure components that should be planned and deployed correctly, including identity, regions, networks, management, and security frameworks that are key to success when deploying any workload into Azure.

A Azure Virtual Desktop deployment will rely primarily on three things — choosing the right region for your desktops, configuring your virtual network virtual networks for access to applications and data, and storage to ensure good performance. All of these things you will have had to consider when deploying services into Azure before starting on AVD.

## Ensure AVD Service URLs Aren't Blocked

AVD has [a set of URLs](https://docs.microsoft.com/en-us/azure/virtual-desktop/overview#requirements) that are required for correct operation. Enterprise customers will often force all internet connections through a proxy server via Group Policy or [proxy auto-discovery](https://en.wikipedia.org/wiki/Web_Proxy_Auto-Discovery_Protocol).

If you're deploying AVD into an isolated virtual network, especially for a POC, it's unlikely you'll have issues with enabling access to a virtual desktop. However, pay careful attention to your networking configuration when integrating proxy servers and firewalls.

If traffic to these URLs is blocked or routed incorrectly, AVD virtual machines may fail to talk to the AVD control plane or perform poorly. Ideally those destinations should be excluded from your proxy server and routed directly out via Azure.

## RDP can perform better than HDX

OK, some caution here as I need to perform some additional testing, so put this one down as anecdotal - RDP on AVD can perform better than Citrix HDX.

I've performed some basic testing of accessing a virtual desktop via AVD and another desktop in the same Azure region (and network) via Citrix Cloud. The virtual desktop provided by AVD over RDP outperformed a desktop over HDX.

The Azure virtual network and the virtual desktops, along with Citrix Cloud Gateway were all in the same region; however, there is a difference in how the client accesses a desktop. With Citrix Cloud the connection was over the public internet to Citrix Gateway. I suspect that the connection to AVD was via a local ingress point and then routed over the Microsoft back plane.

As I've said, more testing is required here and I'm hoping that I can share results of testing in a future article.

## Wrapping Up

This article has only touched on a few lessons learned in deploying Azure Virtual Desktop. There's plenty more to share, so keep an eye out for my next article on AVD.
