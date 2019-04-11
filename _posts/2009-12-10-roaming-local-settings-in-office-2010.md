---
id: 1238
title: Roaming User Customisations in Office 2010
date: 2009-12-10T22:35:12+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/applications/roaming-local-settings-in-office-2010
permalink: /roaming-local-settings-in-office-2010/
aktt_notify_twitter:
  - 'yes'
aktt_tweeted:
  - "1"
dsq_thread_id:
  - "195382099"
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
categories:
  - Applications
tags:
  - Office 2010
---
**Note**: for a more complete article on customising your Office 2010 deployment see this article: [Customising Office 2010 before deployment]({{site.baseurl}}/deployment/customising-office-2010-before-deployment/)

Good news! Office 2010 fixes the Office 2007 issue, where-by you need to [resort to implementing fixes yourself](http://blogs.sepago.de/helge/2009/12/09/fixing-office-2007s-quick-access-toolbars-with-citrix-user-profile-manager/), to get Quick Access Toolbar and the new [customisable Ribbon](http://msdn.microsoft.com/en-us/library/ee704589(office.14).aspx) to roam between computers. You’ll have to remember to enable this option yourself though – [create a Setup customisation with the Office Customization Tool]({{site.baseurl}}/deployment/customising-office-2010-before-deployment) and enable the following option:

_Features – Modify user settings – Microsoft Office 2010 System – Global Options – Customize – Allow roaming of all user customisations_

[<img style="display: inline; border: 0pt none;" title="the Office 2010 Customization Tool" src="https://stealthpuppy.com/media/2009/12/AllowRoamingOfAllUserCustomisations_thumb.png" alt="the Office 2010 Customization Tool]({{site.baseurl}}/media/2009/12/AllowRoamingOfAllUserCustomisations.png)

Nice and simple with no need for additional work in your user environment management tool of choice to roam those settings – happy users.

If you have already deployed Office 2010 and need to change this setting, there are a couple of ways that this can be done:

1. Change the Registry value that controls customisations roaming. To do that, set the following value:

Key: HKEY\_CURRENT\_USER\Software\Microsoft\Office\14.0\Common\Toolbars  
Value: CustomUIRoaming  
Type: DWORD  
Data: 1

2. Add the policy to a GPO controlling your Office 2010 settings. Do do that enable the following policy item:

_User Configuration / Policies / Administrative Templates / Microsoft Office 2010 / Global Options / Customize / Allow roaming of all user customizations_

Note - Microsoft does provide a fix for Office 2007 (a hotfix and a registry change) which you can implement to make Office store Quick Access Toolbar files in the roaming portion of the profile: [Quick Access Toolbar files for 2007 Office applications do not roam with your profile](http://support.microsoft.com/kb/958062).