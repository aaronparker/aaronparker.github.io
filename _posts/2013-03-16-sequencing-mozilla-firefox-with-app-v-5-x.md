---
id: 3065
title: Sequencing Mozilla Firefox with App-V 5.x
date: 2013-03-16T20:46:47+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=3065
permalink: /sequencing-mozilla-firefox-with-app-v-5-x/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "1142795873"
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
categories:
  - Applications
tags:
  - App-V
  - Firefox
---
<img style="background-image: none; float: right; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border-width: 0px;" src="https://stealthpuppy.com/media/2011/06/062611_1120_SequencingM1.png" alt="" align="right" border="0" />It's a simple task to virtualize Firefox, as it lends itself well to application virtualization; however getting it right takes a little preparation. Before embarking on sequencing Firefox, please refer to this companion article - [Prepare Mozilla Firefox for Enterprise Deployment and Virtualization](https://stealthpuppy.com/deployment/prepare-mozilla-firefox-for-enterprise-deployment-and-virtualization/) - which covers configuring a Firefox installation for virtualizing. It's important that Firefox is configured correctly for virtualization by disabling specific features.

# User Experience

Typically, virtualizing an application changes the user experience due to the introduction of isolation. With App-V 5 there's no such change to the way users might interact with Firefox. Users can even set a virtualized Firefox as their default browser.

# Firefox features to disable

There are a couple of features that should be disabled when running Firefox under App-V 5:

  * Automatic updates for Firefox – _Options / Advanced / Update / Firefox updates._ Firefox updates should be delivered via new App-V packages. Updates for Add-ons and Search Engines should be OK as these are written to the user profile
  * _Mozilla Maintenance Service_ - [Firefox installs an updater service](http://support.mozilla.org/en-US/kb/what-mozilla-maintenance-service) that allows updating whilst avoiding UAC prompts. This service should be disabled or not installed

Read the article [Prepare Mozilla Firefox for Enterprise Deployment and Virtualization](https://stealthpuppy.com/deployment/prepare-mozilla-firefox-for-enterprise-deployment-and-virtualization/) for full details on removing these options during installation.

# Managing the Firefox profile

[Firefox stores preferences, extensions and other user data](http://kb.mozillazine.org/Profile_folder_-_Firefox) in:

  * %APPDATA%\Mozilla (preferences, bookmarks etc.); and
  * %LOCALAPPDATA%\Mozilla (browser cache)

The default behaviour of the App-V Sequencer is to exclude %LOCALAPPDATA% - this is a good thing and I don't recommend removing this exclusion. %APPDATA% will be included by default and whether you leave this location included in the package will depend on your specific deployment requirements; however my recommendation is to exclude this location by adding **[{AppData}]\Mozilla** to the exclusion list in your sequence. On the client, Firefox will then create a new profile in the real file system when the user starts the browser for the first time.

Virtualizing the profile increases the complexity of upgrading Firefox packages especially challenging given [Mozilla's approach to Firefox releases](http://www.zdnet.com/blog/bott/mozilla-to-enterprise-customers-drop-dead/3497). By storing the Firefox profile on the real file system, Firefox can be deployed via completely unrelated packages – no need to create upgrade versions. By excluding %APPDATA% and not virtualizing the user profile you will gain some flexibility with your Firefox deployment.

# Sequencing Platform

Sequence Firefox on a clean Windows 7 SP1 x86 VM with all current updates and no other applications other than the App-V Sequencer. The Firefox version available from Mozilla is an x86 application, so I generally recommend sequencing Firefox on Windows 7 x86 virtual machine even though you may be deploying to 64-bit Windows. However confirm this in your own environment and re-sequence for 64-bit platforms if required.

# Sequencer Configuration

Before sequencing, add the following recommended exclusions. :

  * [{AppData}]\Mozilla
  * [{Common AppData}]\Microsoft\RAC
  * REGISTRY\USER\ [{AppVCurrentUserSID}]\Software\Microsoft\Windows\CurrentVersion\Internet Settings

Download the following Sequencer Template as a starting point for your Firefox sequence:

<p class="download">
  [download id="61&#8243; format="1&#8243;]
</p>

# Installing Firefox

Download the [Firefox installer in your target language from the Mozilla site](http://www.mozilla.com/firefox/all.html). [Sequence Firefox](http://technet.microsoft.com/en-US/library/jj713468.aspx) by following these high level steps:

  * Install Firefox
  * Configure profile defaults and preferences locking
  * Optionally add global add-ons and install plug-ins such as [Adobe Flash Player](https://www.adobe.com/devnet/flashplayer/enterprise_deployment.html) (assuming you want this in the same package)

Automating this process as much as possible will create a cleaner package and make it faster to re-create a new Firefox package if required.

  * Mozilla [Firefox installer command line arguments](https://wiki.mozilla.org/Installer:Command_Line_Arguments) – use the INI file approach to control where Firefox is installed and to prevent the addition of a desktop shortcut, if required
  * After installing Firefox, copy _user.js_ to _%ProgramFiles%\Mozilla Firefox\defaults\profile_
  * Copy _userChrome.css_ to _%ProgramFiles%\Mozilla Firefox\defaults\profile\chrome_
  * Firefox also allows you to [add global add-ons by adding them to the Extensions sub-folder](http://kb.mozillazine.org/Installing_extensions) of the Firefox installation folder
  * If you are including Adobe Flash player in the package, be sure to [disable the auto-update notification](http://kb2.adobe.com/cps/167/16701594.html)

Before sequencing, copy all of the required files into the sequencing VM, which should like something like this:

[<img style="background-image: none; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border: 0px;" title="AppVFirefoxSetupFolder" src="https://stealthpuppy.com/media/2013/03/AppVFirefoxSetupFolder_thumb.png" alt="AppVFirefoxSetupFolder" width="660" height="253" border="0" />](https://stealthpuppy.com/media/2013/03/AppVFirefoxSetupFolder.png)

For a walkthrough of the sequencing process, using the installation script outlined in [the Firefox deployment article](https://stealthpuppy.com/deployment/prepare-mozilla-firefox-for-enterprise-deployment-and-virtualization/), see the following screenshots:

[nggallery id=3]

# First Run Tasks and Primary Feature Block

If the steps above have been followed for exclusions, installation and configuration of Firefox, there will be no first run tasks to complete. Additionally the resultant package will be reasonably small so there is no need to create the Primary Feature Block. Because you don't need to complete first run tasks or create the Primary Feature Block, you could automate the entire end-to-end process of creating a Firefox package using the App-V 5 Sequencer PowerShell module.

# Automating the Firefox sequence

With the provided script, sequencing Firefox with the App-V 5 PowerShell module is very simple. Use the PowerShell script below to create a Firefox package based on the steps outlined above.

<pre class="lang:ps decode:true  ">Import-Module AppvSequencera
New-Item -Path C:\Packages\MozillaFirefox19 -ItemType Directory
CD C:\Packages\Firefox19
New-AppvSequencerPackage -Name "Mozilla Firefox 19" -TemplateFilePath .\AppV5SequencerTemplate.appvt -OutputPath C:\Packages -PrimaryVirtualApplicationDirectory C:\MozillaFirefox -Installer .\InstallFirefox.cmd</pre>

# Finally

Save your package and deploy. With compression enabled, the package should be around 27Mb.