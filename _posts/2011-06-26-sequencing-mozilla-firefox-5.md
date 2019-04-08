---
id: 2331
title: Sequencing Mozilla Firefox 5
date: 2011-06-26T12:20:26+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2331
permalink: /sequencing-mozilla-firefox-5/
dsq_thread_id:
  - "342561694"
thesis_description:
  - It’s easy to virtualize Firefox with App-V; however getting it right takes a little more effort. Here’s how to successfully sequence Mozilla Firefox 5.x.
categories:
  - Applications
tags:
  - App-V
  - Firefox
---
<img src="http://stealthpuppy.com/wp-content/uploads/2011/06/062611_1120_SequencingM1.png" alt="" align="right" />It&#8217;s easy to virtualize Firefox with App-V; however getting it right takes a little more effort. Here&#8217;s how to successfully sequence [Mozilla Firefox 5.x](http://www.mozilla.com/en-US/firefox/).

### What you lose by virtualizing Firefox

Virtualizing Firefox with App-V will isolate the application from the OS, so the following features will not be available once Firefox has been sequenced:

  * Firefox Jump Lists in the Start Menu and Taskbar
  * The ability set the browser as default

### Managing the Firefox profile – virtualize or not?

[Firefox stores preferences, extensions and other user data](http://kb.mozillazine.org/Profile_folder_-_Firefox) in:

  * %APPDATA%\Mozilla (preferences, bookmarks etc.); and
  * %LOCALAPPDATA%\Mozilla (browser cache)

The default behaviour of the App-V Sequencer is to exclude %LOCALAPPDATA% &#8211; this is a good thing and I don&#8217;t recommend removing this exclusion.

%APPDATA% will be included by default and whether you leave this location included in the package will depend on your specific deployment requirements; however my recommendation is to exclude this location by adding _%CSIDL_APPDATA%\Mozilla_ to the exclusion list in your sequence. On the client, Firefox will then create a new profile in the real file system when the user starts the browser for the first time.

There are several reasons why this approach is a good idea:

  * Some of the configuration files within the Firefox profile include hard-codes paths – challenging if your App-V virtual drive changes between clients
  * Virtualizing the profile increases the complexity of upgrading Firefox packages especially challenging given [Mozilla&#8217;s new approach to Firefox releases](http://www.zdnet.com/blog/bott/mozilla-to-enterprise-customers-drop-dead/3497). By storing the Firefox profile on the real file system, Firefox can be deployed via completely unrelated packages – no need to create upgrade versions
  * Users can potentially create multiple Firefox profiles, with each stored in the users&#8217; PKG file. The minimum size for a new Firefox profile is 12Mb – the PKG file will grow by 12Mb for each new Firefox profile created

By excluding %APPDATA% and not virtualizing the user profile you will gain some flexibility with your Firefox deployment.

### Configuring Firefox Defaults

If a Firefox profile is not virtualized within the package any options set during the monitoring phase won&#8217;t be captured. Fortunately Firefox can be configured with defaults for any new profile so that it will contain your required configuration options.

Mozilla has made it easy to deploy custom default settings and preferences – by adding files to _%ProgramFiles%\Mozilla Firefox\defaults\profile_, new Firefox profiles will pick up a copy of these files when the profile is created.

I will walk through adding a couple of files to this location for to ensure that any new Firefox profile receives the required ; however you can find more detailed documentation on this feature in the following articles:

  * [Enterprise Build Of Firefox For Deployment](http://www.binaryturf.com/enterprise-build-firefox-deployment/)

### Firefox features to disable

There are a couple of features that should be disabled when running Firefox under App-V:

  * Automatic updates for Firefox – _Options / Advanced / Update &#8211; Automatically check for updates to: Firefox_. Firefox updates should be delivered via new App-V packages. Updates for Add-ons and Search Engines should be OK as these are written to the user profile
  * Default browser check – _Options / Advanced / General &#8211; Always check to see if Firefox is the default browser on startup_. Once Firefox is isolated from the OS, the user won&#8217;t be able to make it the default browser

[_user.js_](http://kb.mozillazine.org/User.js_file) is used to configure Firefox options and enforce them and [_UserChrome.css_](http://www-archive.mozilla.org/unix/customizing.html) is used to remove those options from the user interface.

Available below is a copy of _user.js_ that disables automatic updates of Firefox and checking whether it is the default browser:

<p class="download">
  [download id=&#8221;44&#8243; format=&#8221;1&#8243;]
</p>

Here is a copy of _userChrome.css_ that will remove updates and default browser options from user interface:

<p class="download">
  [download id=&#8221;45&#8243; format=&#8221;1&#8243;]
</p>

### Sequencing Platform

The Firefox version available from Mozilla is an x86 application (x64 build are available from other sources), so I recommend sequencing Firefox on Windows 7 x86 virtual machine even though you may be deploying to 64-bit Windows.

I&#8217;ve used a VFS install, so I have configured a second virtual hard disk to host the Q: drive. If you would prefer a MNT install just change the install folder when installing Firefox.

### Sequencer Configuration

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
  [download id=&#8221;46&#8243; format=&#8221;1&#8243;]
</p>

### Installing Firefox

Download the [Firefox installer in your target language from the Mozilla site](http://www.mozilla.com/firefox/all.html). Sequencing Firefox will require the following steps:

  * Install Firefox
  * Configure profile defaults
  * Optionally add global add-ons and install plug-ins such as Adobe Flash Player

Automating this process as much as possible will create a cleaner package and make it faster to re-create a new Firefox package if required.

  * Mozilla [Firefox installer command line arguments](https://wiki.mozilla.org/Installer:Command_Line_Arguments) – use the INI file approach to control where Firefox is installed and to prevent the addition of a desktop shortcut, if required
  * After installing Firefox, copy _user.js_ to _%ProgramFiles%\Mozilla Firefox\defaults\profile_
  * Copy _userChrome.css_ to _%ProgramFiles%\Mozilla Firefox\defaults\profile\chrome_
  * Firefox also allows you to [add global add-ons by adding them to the Extensions sub-folder](http://kb.mozillazine.org/Installing_extensions) of the Firefox installation folder
  * If you are including Adobe Flash player in the package, be sure to [disable the auto-update notification](http://kb2.adobe.com/cps/167/16701594.html)

For an example script that will automate the install and configuration of Firefox, see the script below:

<p class="download">
  [download id=&#8221;47&#8243; format=&#8221;1&#8243;]
</p>

### Shortcuts

If the monitoring phase was successful the Sequencer should create a single shortcut for Firefox. If you are including Flash 10.3 or above in the package, add an additional shortcut for the Flash Player Control Panel applet using &#8220;C:\Windows\System32\FlashPlayerCPLApp.cpl&#8221; as the target.

### First Run Tasks and Primary Feature Block

If the steps above have been followed for exclusions, installation and configuration of Firefox, there will be no first run tasks to complete. Additionally the resultant package will be reasonably small so there is no need to create the Primary Feature Block.

Because you don&#8217;t need to complete first run tasks or create the Primary Feature Block, you could automate the entire end-to-end process of creating a Firefox package using [the App-V Sequencer command-line interface](http://softwaredeployment.wordpress.com/2011/04/15/app-v-4-6-sp1-command-line-interface/).

### Finally

Save your package and deploy.

### Resources

  * [App-V Package Accelerator for Mozilla Firefox 5.0 (x86 en-US) and Adobe Flash Player 10.3.181.26 (en-US)](http://gallery.technet.microsoft.com/Mozilla-Firefox-50-x86-en-a5ebb52e)