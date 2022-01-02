---

title: 'Link: Microsoft Cluster Configuration Validation Wizard'
date: 2007-02-07T04:51:00+10:00
author: Aaron Parker
layout: post

permalink: /link-microsoft-cluster-configuration-validation-wizard/
categories:
  - Microsoft
tags:
  - Cluster
---
Microsoft have release a new tool, [ClusPrep](http://www.google.com.au/search?hl=en&q=clusprep&meta=), for testing your servers readiness before you create a cluster to run things like Exchange and SQL:

> The Microsoft Cluster Configuration Validation Wizard, a.k.a. "ClusPrep", is a validation tool that does a complete system inventory and runs focused tests on servers that are configured and ready for Microsoft Server Cluster installation (in other words, before the servers are a cluster). ClusPrep will also run the inventory and many of these same tests after clustering is installed, however, because of their potentially disruptive nature, most storage tests are not run if the servers are already a cluster.
> 
> ClusPrep will validate that your system is configured properly by taking inventory of your system configuration and highlighting discrepancies in service pack levels, driver versions, etc.; evaluating and testing your network and storage configuration.
> 
> If the results of your ClusPrep execution do not show errors (viewable in detail from the XML report) then you can have a high level of confidence that your subsequent cluster installation and/or operation will be successful.
> 
> ClusPrep is a €œclient/server€ tool: you install it on one machine (must be installed on a 32-bit architecture machine), and it drives tests on a collection of server machines (can be any architecture). All drivers and test agents are automatically installed on the servers as part of ClusPrep operation. In other words, the only install you do is on the machine from which you initiate the testing.

  * [Microsoft Cluster Configuration Validation Wizard](http://www.microsoft.com/downloads/details.aspx?FamilyID=bf9eb3a7-fb91-4691-9c16-553604265c31&DisplayLang=en)
  * [Direct download link](http://www.microsoft.com/downloads/info.aspx?na=90&p=&SrcDisplayLang=en&SrcCategoryId=&SrcFamilyId=bf9eb3a7-fb91-4691-9c16-553604265c31&u=http%3a%2f%2fdownload.microsoft.com%2fdownload%2f1%2fc%2f4%2f1c4c42f1-886e-4b1e-8ab4-856a87dd4592%2fclusprep.exe)
