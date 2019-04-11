---
id: 2745
title: Sequencing Mozilla Firefox with App-V 4.6
date: 2012-06-28T22:20:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2745
permalink: /sequencing-mozilla-firefox-13-with-app-v-4-6/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "743975354"
categories:
  - Applications
tags:
  - App-V
  - Firefox
---
<img alt="" src="{{site.baseurl}}/media/2011/06/062611_1120_SequencingM1.png" align="right" />It's a simple task to virtualize Firefox, as it lends itself well to application virtualization; however getting it right takes a little more effort. I've previously shown you how to sequence [Firefox 8]({{site.baseurl}}/virtualisation/sequencing-mozilla-firefox-8/), [Firefox 7]({{site.baseurl}}/virtualisation/sequencing-mozilla-firefox-7/) and [Firefox 5]({{site.baseurl}}/virtualisation/sequencing-mozilla-firefox-5/). Before embarking on sequencing Firefox, please refer to this companion article - [Prepare Mozilla Firefox for Enterprise Deployment and Virtualization]({{site.baseurl}}/deployment/prepare-mozilla-firefox-for-enterprise-deployment-and-virtualization/) - which covers configuring a Firefox installation for virtualizing. It's important that Firefox is configured correctly for virtualization by disabling specific features..

# User Experience

Typically, virtualizing an application changes the user experience due to the introduction of isolation. Virtualizing Firefox with App-V 4.6 will isolate the application from the OS, so the following features will not be available once Firefox has been sequenced:

  * The ability set the browser as default - isolation prevents this from working
  * Firefox Jump Lists in the Start Menu and Taskbar do work, but they don't display icons correctly

# Firefox features to disable

There are a couple of features that should be disabled when running Firefox under App-V:

  * Default browser check – _Options / Advanced / General - Always check to see if Firefox is the default browser on startup_. Once Firefox is isolated from the OS, the user won't be able to make it the default browser
  * Automatic updates for Firefox – _Options / Advanced / Update / Firefox updates._ Firefox updates should be delivered via new App-V packages. Updates for Add-ons and Search Engines should be OK as these are written to the user profile
  * _Mozilla Maintenance Service_ - [Firefox installs an updater service](http://support.mozilla.org/en-US/kb/what-mozilla-maintenance-service) that allows updating whilst avoiding UAC prompts. This service should be disabled or not installed

I will cover using a couple of customisations to ensure these user features are disabled in the UI for any new Firefox profile. This service is simple enough to handle by disabling it

# Managing the Firefox profile

[Firefox stores preferences, extensions and other user data](http://kb.mozillazine.org/Profile_folder_-_Firefox) in:

  * %APPDATA%\Mozilla (preferences, bookmarks etc.); and
  * %LOCALAPPDATA%\Mozilla (browser cache)

The default behaviour of the App-V Sequencer is to exclude %LOCALAPPDATA% - this is a good thing and I don't recommend removing this exclusion. %APPDATA% will be included by default and whether you leave this location included in the package will depend on your specific deployment requirements; however my recommendation is to exclude this location by adding _%CSIDL_APPDATA%\Mozilla _to the exclusion list in your sequence. On the client, Firefox will then create a new profile in the real file system when the user starts the browser for the first time. There are several reasons why this approach is a good idea:

  * Some of the configuration files within the Firefox profile include hard-coded paths – challenging if your App-V virtual drive changes between clients
  * Virtualizing the profile increases the complexity of upgrading Firefox packages especially challenging given [Mozilla's approach to Firefox releases](http://www.zdnet.com/blog/bott/mozilla-to-enterprise-customers-drop-dead/3497). By storing the Firefox profile on the real file system, Firefox can be deployed via completely unrelated packages – no need to create upgrade versions
  * Users can potentially create multiple Firefox profiles, with each stored in the users' PKG file. The minimum size for a new Firefox profile is 12Mb – the PKG file will grow by 12Mb for each new Firefox profile created

By excluding %APPDATA% and not virtualizing the user profile you will gain some flexibility with your Firefox deployment.

# <span style="font-size: 1.5rem; line-height: 1.5;">Sequencing Platform</span>

I have sequenced Firefox on a clean Windows 7 SP1 x86 VM with all current updates and no other applications other than the App-V Sequencer. I’ve configured a Q: drive using a second vDisk, rather than let the Sequencer create a Q: drive for me. I've used a VFS install and tested successfully; however if you would prefer a MNT install just change the install folder when installing Firefox.

The Firefox version available from Mozilla is an x86 application, so I generally recommend sequencing Firefox on Windows 7 x86 virtual machine even though you may be deploying to 64-bit Windows. However confirm this in your own environment and re-sequence for 64-bit platforms if required.

# Sequencer Configuration

Before Sequencing, add the following exclusions:

  * %CSIDL_APPDATA%\Mozilla
  * %CSIDL\_COMMON\_APPDATA%\Microsoft\RAC
  * \REGISTRY\USER\%SFT_SID%\Software\Microsoft\Windows\CurrentVersion\Internet Settings

If you are adding Adobe Flash Player to the package, add these exclusions as well:

  * %CSIDL_APPDATA%\Adobe
  * %CSIDL_APPDATA%\Macromedia
  * %CSIDL_WINDOWS%\Installer

I have included these in a Package Template for Firefox that you can download from here:

<p class="download">
  [download id="46&#8243; format="1&#8243;]
</p>

# Installing Firefox

Download the [Firefox installer in your target language from the Mozilla site](http://www.mozilla.com/firefox/all.html). Sequencing Firefox will require the following steps:

  * Install Firefox
  * Configure profile defaults and preferences locking
  * Optionally add global add-ons and install plug-ins such as [Adobe Flash Player](https://www.adobe.com/devnet/flashplayer/enterprise_deployment.html)

Automating this process as much as possible will create a cleaner package and make it faster to re-create a new Firefox package if required.

  * Mozilla [Firefox installer command line arguments](https://wiki.mozilla.org/Installer:Command_Line_Arguments) – use the INI file approach to control where Firefox is installed and to prevent the addition of a desktop shortcut, if required
  * After installing Firefox, copy _user.js_ to _%ProgramFiles%\Mozilla Firefox\defaults\profile_
  * Copy _userChrome.css_ to _%ProgramFiles%\Mozilla Firefox\defaults\profile\chrome_
  * Firefox also allows you to [add global add-ons by adding them to the Extensions sub-folder](http://kb.mozillazine.org/Installing_extensions) of the Firefox installation folder
  * If you are including Adobe Flash player in the package, be sure to [disable the auto-update notification](http://kb2.adobe.com/cps/167/16701594.html)

<span style="line-height: 1.714285714; font-size: 1rem;">Before sequencing, copy all of the required files into the sequencing VM, which should like something like this:</span>

<img class="alignnone size-full wp-image-3064" alt="AppVFirefoxSetupFolder_thumb.png" src="{{site.baseurl}}/media/2013/03/AppVFirefoxSetupFolder_thumb.png" width="660" height="253" srcset="{{site.baseurl}}/media/2013/03/AppVFirefoxSetupFolder_thumb.png 660w, {{site.baseurl}}/media/2013/03/AppVFirefoxSetupFolder_thumb-150x57.png 150w, {{site.baseurl}}/media/2013/03/AppVFirefoxSetupFolder_thumb-300x115.png 300w, {{site.baseurl}}/media/2013/03/AppVFirefoxSetupFolder_thumb-624x239.png 624w" sizes="(max-width: 660px) 100vw, 660px" /> 

# Shortcuts

If the monitoring phase was successful the Sequencer should create a single shortcut for Firefox. If you are including Flash Player, add an additional shortcut for the Flash Player Control Panel applet using "C:\Windows\System32\FlashPlayerCPLApp.cpl" as the target.

# First Run Tasks and Primary Feature Block

If the steps above have been followed for exclusions, installation and configuration of Firefox, there will be no first run tasks to complete. Additionally the resultant package will be reasonably small so there is no need to create the Primary Feature Block. Because you don't need to complete first run tasks or create the Primary Feature Block, you could automate the entire end-to-end process of creating a Firefox package using [the App-V Sequencer command-line interface](http://softwaredeployment.wordpress.com/2011/04/15/app-v-4-6-sp1-command-line-interface/).

# Finally

Save your package and deploy. With compression enabled, the package should be around 24Mb. For a walkthrough of the sequencing process, using the installation script outlined in [the Firefox deployment article]({{site.baseurl}}/deployment/prepare-mozilla-firefox-for-enterprise-deployment-and-virtualization/), see the following screenshots:

[nggallery id=1]