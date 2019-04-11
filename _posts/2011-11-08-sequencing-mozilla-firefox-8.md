---
id: 2476
title: Sequencing Mozilla Firefox 8
date: 2011-11-08T12:00:42+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2476
permalink: /sequencing-mozilla-firefox-8/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "465202907"
categories:
  - Applications
tags:
  - App-V
  - Firefox
---
<img src="{{site.baseurl}}/media/2011/06/062611_1120_SequencingM1.png" alt="" align="right" />Mozilla has just released Firefox 8, so it's time to look at virtualizing the new version. It's a simple task to virtualize Firefox, as it lends itself well to application virtualization; however getting it right takes a little more effort. Here's how to successfully sequence [Mozilla Firefox 8.x](http://www.mozilla.com/en-US/firefox/).

### What you lose by virtualizing Firefox

Virtualizing Firefox with App-V will isolate the application from the OS, so the following features will not be available once Firefox has been sequenced:

  * Firefox Jump Lists in the Start Menu and Taskbar
  * The ability set the browser as default

### Firefox features to disable

There are a couple of features that should be disabled when running Firefox under App-V:

  * Automatic updates for Firefox – _Options / Advanced / Update - Automatically check for updates to: Firefox_. Firefox updates should be delivered via new App-V packages. Updates for Add-ons and Search Engines should be OK as these are written to the user profile
  * Default browser check – _Options / Advanced / General - Always check to see if Firefox is the default browser on startup_. Once Firefox is isolated from the OS, the user won't be able to make it the default browser

I will cover using a couple of customisation to ensure these features are disabled for any new Firefox profile.

### Managing the Firefox profile – virtualize or not?

[Firefox stores preferences, extensions and other user data](http://kb.mozillazine.org/Profile_folder_-_Firefox) in:

  * %APPDATA%\Mozilla (preferences, bookmarks etc.); and
  * %LOCALAPPDATA%\Mozilla (browser cache)

The default behaviour of the App-V Sequencer is to exclude %LOCALAPPDATA% - this is a good thing and I don't recommend removing this exclusion. %APPDATA% will be included by default and whether you leave this location included in the package will depend on your specific deployment requirements; however my recommendation is to exclude this location by adding _%CSIDL_APPDATA%\Mozilla_to the exclusion list in your sequence. On the client, Firefox will then create a new profile in the real file system when the user starts the browser for the first time. There are several reasons why this approach is a good idea:

  * Some of the configuration files within the Firefox profile include hard-codes paths – challenging if your App-V virtual drive changes between clients
  * Virtualizing the profile increases the complexity of upgrading Firefox packages especially challenging given [Mozilla's new approach to Firefox releases](http://www.zdnet.com/blog/bott/mozilla-to-enterprise-customers-drop-dead/3497). By storing the Firefox profile on the real file system, Firefox can be deployed via completely unrelated packages – no need to create upgrade versions
  * Users can potentially create multiple Firefox profiles, with each stored in the users' PKG file. The minimum size for a new Firefox profile is 12Mb – the PKG file will grow by 12Mb for each new Firefox profile created

By excluding %APPDATA% and not virtualizing the user profile you will gain some flexibility with your Firefox deployment.

### Configuring Firefox Defaults

If a Firefox profile is not virtualized within the package any options set during the monitoring phase won't be captured. Fortunately Firefox can be configured with defaults for any new profile so that it will contain your required configuration options.

Mozilla has made it easy to deploy custom default settings and preferences – by adding files to _%ProgramFiles%\Mozilla Firefox\defaults\profile_ (change the path to suit your environment), new Firefox profiles will pick up a copy of these files when the profile is created. I will walk through adding a couple of files to this location to ensure that any new Firefox profile receives the required settings. You can find more detailed documentation on these features in the following articles:

  * [User.js file](http://kb.mozillazine.org/User.js_file)
  * [Prefs.js file](http://kb.mozillazine.org/Prefs.js_file)
  * [UserChrome.css](http://kb.mozillazine.org/UserChrome.css) and [Chrome element names and IDs](http://kb.mozillazine.org/UserChrome.css_Element_Names/IDs)
  * [Enterprise Build Of Firefox For Deployment](http://www.binaryturf.com/enterprise-build-firefox-deployment/)

To enforce user settings we can leverage [_user.js_](http://kb.mozillazine.org/User.js_file) and the use [_UserChrome.css_](http://www-archive.mozilla.org/unix/customizing.html) to remove those user interface elements. Available below is a copy of _user.js_ that disables automatic updates of Firefox and checking whether it is the default browser:

<p class="download">
  [download id="44&#8243; format="1&#8243;]
</p>

A simple approach to extending the options in [user.js](http://kb.mozillazine.org/User.js_file) and [prefs.js](http://kb.mozillazine.org/Prefs.js_file) is to install Firefox and configure it the way you would like. Then open prefs.js from the new profile and use the entries to create custom versions.

Available here is a copy of _userChrome.css_ that will remove from the user interface the options to enable browser updates and set Firefox as the default browser:

<p class="download">
  [download id="45&#8243; format="1&#8243;]
</p>

### Sequencing Platform

I have sequenced Firefox 8 on a clean Windows 7 SP1 x86 VM with all current updates and no other applications other than the App-V Sequencer. I’ve configured a Q: drive using a second vDisk, rather than let the Sequencer create a Q: drive for me. I've used a VFS install and tested successfully; however if you would prefer a MNT install just change the install folder when installing Firefox

The Firefox version available from Mozilla is an x86 application (x64 build are available from other sources), so I generally recommend sequencing Firefox on Windows 7 x86 virtual machine even though you may be deploying to 64-bit Windows. However confirm this in your own environment and re-sequence for 64-bit platforms if required.

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
  [download id="46&#8243; format="1&#8243;]
</p>

### Installing Firefox

Download the [Firefox installer in your target language from the Mozilla site](http://www.mozilla.com/firefox/all.html). Sequencing Firefox will require the following steps:

  * Install Firefox
  * Configure profile defaults
  * Optionally add global add-ons and install plug-ins such as [Adobe Flash Player](https://www.adobe.com/devnet/flashplayer/enterprise_deployment.html)

Automating this process as much as possible will create a cleaner package and make it faster to re-create a new Firefox package if required.

  * Mozilla [Firefox installer command line arguments](https://wiki.mozilla.org/Installer:Command_Line_Arguments) – use the INI file approach to control where Firefox is installed and to prevent the addition of a desktop shortcut, if required
  * After installing Firefox, copy _user.js_ to _%ProgramFiles%\Mozilla Firefox\defaults\profile_
  * Copy _userChrome.css_ to _%ProgramFiles%\Mozilla Firefox\defaults\profile\chrome_
  * Firefox also allows you to [add global add-ons by adding them to the Extensions sub-folder](http://kb.mozillazine.org/Installing_extensions) of the Firefox installation folder
  * If you are including Adobe Flash player in the package, be sure to [disable the auto-update notification](http://kb2.adobe.com/cps/167/16701594.html)

For an example script that will automate the install and configuration of Firefox, see the script below:

[code]@ECHO OFF  
SET SOURCE=%~dp0  
SET SOURCE=%SOURCE:~0,-2%

REM Create the Firefox answer file  
ECHO [Install] > %SOURCE%\Firefox8.ini  
ECHO ; InstallDirectoryName=Firefox8 >> %SOURCE%\Firefox8.ini  
ECHO ; InstallDirectoryPath=Q:\MozillaFirefox8_en-GB >> %SOURCE%\Firefox8.ini  
ECHO QuickLaunchShortcut=false >> %SOURCE%\Firefox8.ini  
ECHO DesktopShortcut=false >> %SOURCE%\Firefox8.ini  
ECHO StartMenuShortcuts=true >> %SOURCE%\Firefox8.ini  
REM Install Firefox - the START command will not work if the Firefox setup filename includes spaces  
START /WAIT FirefoxSetup8.exe /INI=%SOURCE%\Firefox8.ini

REM Configure Firefox profile defaults  
MD "%ProgramFiles%\Mozilla Firefox\defaults\profile\chrome"  
COPY %SOURCE%\user.js "%ProgramFiles%\Mozilla Firefox\defaults\profile\user.js"  
COPY %SOURCE%\userChrome.css "%ProgramFiles%\Mozilla Firefox\defaults\profile\chrome\userChrome.css"[/code]

### Shortcuts

If the monitoring phase was successful the Sequencer should create a single shortcut for Firefox. If you are including Flash Player, add an additional shortcut for the Flash Player Control Panel applet using "C:\Windows\System32\FlashPlayerCPLApp.cpl" as the target.

### First Run Tasks and Primary Feature Block

If the steps above have been followed for exclusions, installation and configuration of Firefox, there will be no first run tasks to complete. Additionally the resultant package will be reasonably small so there is no need to create the Primary Feature Block. Because you don't need to complete first run tasks or create the Primary Feature Block, you could automate the entire end-to-end process of creating a Firefox package using [the App-V Sequencer command-line interface](http://softwaredeployment.wordpress.com/2011/04/15/app-v-4-6-sp1-command-line-interface/).

### Finally

Save your package and deploy. With compression enabled, the package should be around 22Mb.