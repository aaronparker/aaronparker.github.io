---

title: Unable to set security descriptor on global package files on App-V client upgrade
date: 2008-11-28T17:13:41+10:00
author: Aaron Parker
layout: post

permalink: /unable-to-set-security-descriptor-on-global-package-files-on-app-v-client-upgrade/
dsq_thread_id:
  - "195381295"
categories:
  - Applications
tags:
  - App-V
---
If you are deploying the [App-V ADM Template](http://go.microsoft.com/fwlink/?LinkId=121835) to manage your App-V 4.5 clients you may need to consider the timing of deploying of Group Policy settings versus deployment of the client. The [App-V ADM Template whitepaper](http://download.microsoft.com/download/F/7/8/F784A197-73BE-48FF-83DA-4102C05A6D44/App-V_ADM_Template.docx) recommends deploying the template after you have deployed the client.

If you deploy the 4.5 client settings to existing 4.2 clients, you may encounter this dialog box when upgrading to 4.5:

<img style="display: inline" title="SecurityDescriptorError" src="{{site.baseurl}}/media/2008/11/securitydescriptorerror.png" border="0" alt="SecurityDescriptorError" width="400" height="146" /> 

The message appears to be completely unrelated to the cause, but if you remove the registry settings from HKLM\SOFTWARE\Microsoft\SoftGrid\4.5, the upgrade will complete successfully.

There are a couple of ways to avoid this scenario:

  1. Add KEEPCURRENTSETTINGS=1 to the command line when installing the client, as recommended in the whitepaper. This will ensure that setup honours any pre-existing settings.
  2. Use a [WMI filter](http://technet.microsoft.com/en-us/library/cc779036.aspx) to ensure that the Group Policy object that manages the App-V 4.5 clients, does not apply until after the client has been installed.

[Create a new WMI filter in the GPMC](http://technet.microsoft.com/en-us/library/cc780416.aspx) with this query:

[quickcode:noclick]SELECT * FROM Win32_Product WHERE (Caption = "Microsoft Application Virtualization Desktop Client" AND Version = "4.5.0.1485")[/quickcode]

Your WMI filter should look something like this and your GPO will only apply once the App-V 4.5 client has been installed:

<img style="display: inline" title="App-VWMIFilter" src="{{site.baseurl}}/media/2008/11/appvwmifilter.png" border="0" alt="App-VWMIFilter" width="476" height="340" />