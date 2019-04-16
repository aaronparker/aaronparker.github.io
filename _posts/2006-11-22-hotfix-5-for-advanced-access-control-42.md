---
id: 150
title: Hotfix 5 for Advanced Access Control 4.2
date: 2006-11-22T17:30:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/hotfix-5-for-advanced-access-control-42
permalink: /hotfix-5-for-advanced-access-control-42/
categories:
  - Citrix
tags:
  - Access-Gateway
---
[Hotfix 5 (AAC420W005)](http://support.citrix.com/article/CTX110946) is available for Advanced Access Control 4.2. The fix list is quite large - 50 fixes are listed in the readme file. One of the most important updates that you will need to be aware of, are changes to the Endpoint Analysis scans. This means that scans that you have installed into AAC will require updating to work with the new hotfix. From the Citrix readme:

> When you apply this hotfix, existing custom scans (scans other than those provided by Citrix) stop working and you must recreate them.

I found however, after installing the hotfix, I have had to reinstall all of the endpoint scans including the scans from Citrix. After installing the hotfix, the Access Suite Console reported the following error:

> This scan package contains a client downloadable component and is not compatible with Access Gateway 4.2 hotfix 5. Please contact your scan provider for an update.

In the Access Suite console, the Endpoint Analysis scans groups and packages looked like this:

![]({{site.baseurl}}/media/2006/11/1000.14.193.EndpointAnalysis.png)

To fix this issue, you will have to remove the scan packages and scans from the tree, re-import the packages and recreate your scans - not a small job. Removing and re-importing the scan packages is a straight-forward process however it could take you some time depending on your configuration:

  1. Remove any scans and rules created for endpoint analysis. This will require you to remove the scans from filters and logon points before deleting the scans and rules;
  2. Uninstall each of the scan packages - select the package and click 'Uninstall scan package' from the task pane on the right. Unfortunately you will have to uninstall each scan package individually;
  3. This should leave only the scan groups, you don't have to recreate these. Re-import the scan packages from the file system. The default location will be: _C:Program FilesCitrixAccess GatewayBinEPAPackages._ This is a simple process - select a scan group and click 'Import scan package' from the pane on the right and browse to the EPAPackages folder. Select the applicable scan package and import. The scan packages are CAB files and the file names should make sense to you for import into the correct scan group.

One other important note in the readme, is that you will have to remove and redeploy each of the logon points to each of your AAC servers, so backup your customisations first.