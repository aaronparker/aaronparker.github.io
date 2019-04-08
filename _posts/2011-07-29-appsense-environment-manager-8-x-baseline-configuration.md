---
id: 2356
title: AppSense Environment Manager 8 Baseline Configuration
date: 2011-07-29T00:27:16+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2356
permalink: /appsense-environment-manager-8-x-baseline-configuration/
dsq_thread_id:
  - "371314404"
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
categories:
  - Applications
tags:
  - AppSense
  - Environment Manager
---
Here&#8217;s something that I&#8217;ve been looking to share with the community for some time - something to get you started when implementing AppSense Environment Manager 8.x.

Comments and feedback welcome.

### Introduction

Standardising on an Environment Manager configuration across various organisations or implementations is a difficult challenge; however there are many components of a Windows desktop that are common across all deployments.

### An Environment Manager Baseline Configuration

The Environment Manager Baseline configuration is an example configuration that can be used as a starting point for implementing Environment Manager to replace roaming profiles. In addition it includes some examples of what you can achieve with Environment Manager policy actions.

### The Configuration in Detail

The configuration intended as a starting point for your own environment, whether you are using Personalization Server or not. The idea being that you can configure roaming with nothing more than the EM agent, the config and a file share.

Once you start moving management of personalization from EM policy to Personalization Server, some nodes (or conditions and actions) may not be suitable and should be removed or disabled where Personalization Server is managing the same applications.

The configuration includes examples for roaming user personalization by explicitly choosing specific portions of the user profile to roam. It also includes examples of managing applications by using the Process Started and Network Connected triggers.

### Downloads

Each download is a ZIP file containing the configuration and documentation to help explain the config in more detail.

**Current version**

<span style="color: #ff0000;">New!</span> December 2011, updated configuration version 3.1.

<p class="download">
  [download id=&#8221;53&#8243; format=&#8221;1&#8243;]
</p>

Change log:

  * Added create folder actions on application and Desktop Settings export as a workaround for when the export fails to complete. Child actions of the delete folder action don’t fire if the delete folder action fails
  * Added Pin/Unpin to Taskbar/Start Menu on first logon. See reusable node ‘Desktop Settings policy actions’
  * Added create %LOCALAPPDATA% variable if user logs onto Windows XP / Windows Server 2003
  * Swapped User Process actions using RegEx queries back to individual processes – Office 2010 etc. RegEx queries don’t appear to be working in every scenario
  * Added roaming for Lync 2010
  * Added Office 2007 and Office 2003 examples for App-V delivery
  * Disabled example nodes (except above)
  * Added create folder action: %PROFILE\_CACHE% before copy of %PROFILE\_SOURCE%\COMPUTER.TXT
  * Disabled Reusable Condition ‘If Laptop (WMI)’ because it’s not currently used in the config
  * Updated Notes on various action and conditions

**Previous versions**

<p class="download">
  [download id=&#8221;49&#8243; format=&#8221;1&#8243;]
</p>

**Note**: Version 3.0 or 3.1 are not compatible with EM 8.0, use version 2.1 below:

<p class="download">
  [download id=&#8221;48&#8243; format=&#8221;1&#8243;]
</p>