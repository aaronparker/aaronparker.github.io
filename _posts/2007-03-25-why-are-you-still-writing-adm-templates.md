---

title: Why Are You Still Writing ADM Templates?
date: 2007-03-25T15:00:00+10:00
author: Aaron Parker
layout: post

permalink: /why-are-you-still-writing-adm-templates/
dsq_thread_id:
  - "195378569"
categories:
  - Microsoft
tags:
  - Group Policy
  - PolicyMaker
---
Microsoft have pulled the PolicyMaker Regsitry Extension download. This product is part of what is now known as [Group Policy Preferences](http://technet.microsoft.com/en-us/library/cc731892%28WS.10%29.aspx), a new [feature of Windows Server 2008](http://www.microsoft.com/downloads/details.aspx?FamilyID=42e30e3f-6f01-4610-9d6e-f6e0fb7a0790&displaylang=en) and 2008 R2.

If you are still writing custom ADM templates for your application deployments and haven't heard of DesktopStandard [PolicyMaker Registry Extension](http://www.desktopstandard.com/PolicyMakerRegistryExtension.aspx), then it's definitely something you should be looking at. It reduces the need to create time consuming ADM templates and offers much more over non-managed policies.

Microsoft [purchased DesktopStandard last year](http://www.desktopstandard.com/acquisition_FAQ.aspx) and PolicyMaker Registry Extension is one of the Group Policy products acquired as a part of the purchase. Along with [PolicyMaker Standard Edition](http://www.desktopstandard.com/PolicyMakerStandard.aspx) and [Share Manager](http://www.desktopstandard.com/PolicyMakerShareManager.aspx), Registry Extension will be rolled into the core Group Policy feature set in the future, which is really good news. Until then, Registry Extension is still available for download from the [DesktopStandard web site](http://www.desktopstandard.com/DownloadGo.aspx). So what does it actually do? Let's take a quick look:

Historically, because application developers haven't written ADM templates for their applications themselves, we've had to create custom ADM templates to use Group Policy to enforce registry settings. There are even a few [3rd party tools](http://www.sysprosoft.com/adm_summary.shtml) [available](http://www.tools4ever.com/products/utilities/policytemplateeditor/) that make the job of custom ADM templates easier. PolicyMaker Registry Extension, however, extends Group Policy to make implementing custom registry settings a far more simple process.

Use of Registry Extension requires the deployment of agent software to each machine that will be managed. This is simple though and only requires installation of the software which you can do via Group Policy. There are no custom settings required, just add the MSI to a network share and deploy via a GPO. The software weighs in at 8.5Mb, so deployment should be fairly straight-forward. I've also created a transform that you can use to disable the shortcut added to the Start Menu by the installer. Check the bottom of this article for the download.

You can use Registry Extension to create, replace, update and delete registry settings from any location in the registry. Once you have installed the extension you will see additional registry options available to you in any GPO (including the local Group Policy). Within each of these items you can create registry keys and collections of registry keys as well is import a set of registry keys using a wizard:

![GroupPolicyExtended]({{site.baseurl}}/media/2007/03/1000.14.1164.GroupPolicyExtended.png)

![NewRegistryItem]({{site.baseurl}}/media/2007/03/1000.14.1165.NewRegistryItem.png)

Adding a registry key is very simple - you can manually specify a registry key and value or you can import directly from the current machine unfortunately there is no way to import settings from a file. You can though, copy items directly between Group Policy Objects.

![RegistryKeyProperties1]({{site.baseurl}}/media/2007/03/1000.14.1166.RegistryKeyProperties1.png)

![RegistryKeyProperties2]({{site.baseurl}}/media/2007/03/1000.14.1167.RegistryKeyProperties2.png)

What makes Registry Extension compelling are the extra features it packs because it includes a client side agent:

  * Treating settings as a preference - rather than enforce settings it will only touch the registry key once;
  * Removes settings when they no longer apply, just like managed settings - no more tattooing the registry;
  * You can apply filters to settings so that action is only taken if the filter is matched.

Filters add a lot of flexibility to your application of registry settings and as you see from this screenshot there are 29 items to filter on. You can also build filter queries using the AND/OR operators.

![FilterProperties]({{site.baseurl}}/media/2007/03/1000.14.1168.FilterProperties.png)

PolicyMaker Registry Extension is a great fit for any Windows network and while you might miss out on the portability of ADM templates, it is far more flexible and dynamic than ADM templates, thus giving you more choice and saving you time.

Here's a link to the Registry Extension download (try [a search if this download is missing](http://www.google.co.uk/search?hl=en&q=POLREG.MSI&meta=))
