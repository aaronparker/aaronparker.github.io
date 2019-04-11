---
id: 1705
title: 'App-V FAQ: How do I create a silent installation for the App-V Client?'
date: 2010-07-29T11:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/deployment/app-v-faq-12-how-do-i-create-a-silent-installation-for-the-app-v-client
permalink: /app-v-faq-12-how-do-i-create-a-silent-installation-for-the-app-v-client/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195382978"
categories:
  - FAQs
tags:
  - App-V
  - AppVFAQ
---
<img style="margin: 0px 10px 5px 0px; display: inline" align="left" src="https://stealthpuppy.com/media/2010/06/AppVFAQLogo.png" />

TechNet has the documentation you need for [creating a silent or unattended installation of the App-V client](http://technet.microsoft.com/library/ee956917.aspx) for deployment to existing workstations or during your base image build. Before embarking on customising the install, I usually recommend first understanding [how to perform a manual installation of the App-V Client](http://technet.microsoft.com/library/cc817122.aspx).

There are two ways to deploy the App-V Client – via [SETUP.EXE](http://technet.microsoft.com/library/ee956911.aspx), which will deploy dependencies too, or use [the Windows Installer package](http://technet.microsoft.com/library/ee956914.aspx) and deploy [the dependencies]({{site.baseurl}}/deployment/app-v-faq-11-what-are-the-dependencies-of-the-app-v-client) separately.

Whilst SETUP.EXE might be the easiest method, it won’t give most organisations the flexibility they would prefer when deploying software. In most cases organisations may customise the Windows Installer with a transform to [set client properties](http://technet.microsoft.com/en-us/library/cc843737.aspx) and deploy the dependencies (MSXML, Application Error Reporting and Visual C++ Redistributables) which may also be required by other applications.

### Quick Tip

When working with the App-V Client MSI installer, administrators most commonly come up against missing dependencies. This is usually due to the Application Error Reporting component which requires use of [a specific GUID that must match the App-V Client](http://technet.microsoft.com/en-us/library/ee956914.aspx). To test that the required dependencies are installed as the App-V Client setup expects, use SETUP.EXE to check the dependencies for you – just run SETUP.EXE manually and it will stop at the following dialog box that will list missing dependencies:

[<img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" class="wlDisabledImage" title="AppV-Dependencies" border="0" alt="AppV-Dependencies" src="https://stealthpuppy.com/media/2010/07/AppVDependencies_thumb.png]({{site.baseurl}}/media/2010/07/AppVDependencies.png)

### Resources

  * [How to Install the Client by Using the Command Line](http://technet.microsoft.com/library/ee956917.aspx)
  * [How to Install the App-V Client by Using Setup.exe](http://technet.microsoft.com/library/ee956911.aspx)
  * [How to Install the App-V Client by Using Setup.msi](http://technet.microsoft.com/library/ee956914.aspx)
  * [Application Virtualization Client Installer Command-Line Parameters](http://technet.microsoft.com/library/cc843737.aspx)
  * [How to Configure the App-V Client Registry Settings by Using the Command Line](http://technet.microsoft.com/library/cc843710.aspx)
  * [Setting App-V client permissions during install]({{site.baseurl}}/deployment/setting-app-v-client-permissions-during-install)
  * [Group Policy Object (GPO) upgrade of SoftGrid may fail with Installer errors 1642, 1606 or 1603](http://blogs.technet.com/b/appv/archive/2009/01/27/group-policy-object-gpo-upgrade-of-softgrid-may-fail-with-installer-errors-1642-1606-or-1603.aspx)