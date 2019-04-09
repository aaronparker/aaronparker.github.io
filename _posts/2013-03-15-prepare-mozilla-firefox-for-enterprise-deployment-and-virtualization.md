---
id: 3045
title: Prepare Mozilla Firefox for Enterprise Deployment and Virtualization
date: 2013-03-15T09:30:35+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=3045
permalink: /prepare-mozilla-firefox-for-enterprise-deployment-and-virtualization/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "1138465668"
categories:
  - Applications
tags:
  - Firefox
---
<img style="float: right; margin-left: 0px; display: inline; margin-right: 0px;" alt="" src="https://stealthpuppy.com/media/2011/06/062611_1120_SequencingM1.png" align="right" />I’ve previously written articles on [virtualizing Mozilla Firefox]({{site.baseurl}}/virtualisation/sequencing-mozilla-firefox-13-with-app-v-4-6/), but with Firefox releases more regular these days and the release of App-V 5, it makes sense to split details on configuring Firefox for an enterprise deployment and virtualizing Firefox into separate articles.

Whilst this article will cover some recommendations for configuring a Firefox deployment in an enterprise that can be used when virtualizing Firefox with various solutions, including App-V.

# Features to control in an enterprise

There are a number of features that might be considered for disabling or configuring in an enterprise environment where users generally won’t have administrative rights and IT may want to control the default user experience.

[<img style="background-image: none; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border: 0px;" title="FirefoxDefaultLaunch" alt="FirefoxDefaultLaunch" src="https://stealthpuppy.com/media/2013/03/FirefoxDefaultLaunch_thumb.png" width="660" height="363" border="0" />]({{site.baseurl}}/media/2013/03/FirefoxDefaultLaunch.png)

These might include:

  * Import Wizard – Firefox starts a wizard on first run that imports settings from other browsers. You may want to remove this wizard to simplify the startup of Firefox
  * Automatic updates for Firefox – _Options / Advanced / Update / Firefox updates._ Firefox updates should be delivered via new App-V packages. Updates for Add-ons and Search Engines should be OK as these are written to the user profile
  * _Mozilla Maintenance Service_ - [Firefox installs an updater service](http://support.mozilla.org/en-US/kb/what-mozilla-maintenance-service) that allows updating Firefox automatically, whilst avoiding UAC prompts. This service should be disabled or not installed in a controlled environment including under application virtualization
  * Default browser check – _Options / Advanced / General - Always check to see if Firefox is the default browser on startup_. Under App-V 4,x, once Firefox is isolated from the OS, the user won't be able to make it the default browser (this will work under App-V 5)
  * The ‘Welcome to Firefox’ tab, the ‘Know your rights’ and ‘Improve Firefox’ notifications

There is a way to [control many of these settings through Group Policy](http://sourceforge.net/projects/gpofirefox/), but if we get these right at install time, there’s no need for the overhead of GPOs. I will cover using a few of these customisations to ensure these features are disabled for any new Firefox profile.

# Locking down and controlling Firefox options

Firefox can be configured with defaults for any new profile and locked down so that it will contain your required configuration options. Mozilla has made it easy to deploy custom default settings and preferences – by adding some specific files at install time (assuming the default install location):

  * %ProgramFiles%\Mozilla Firefox\browser\defaults\preferences\local-settings.js
  * %ProgramFiles%\Mozilla Firefox\Mozilla.cfg
  * %ProgramFiles%\Mozilla Firefox\browser\override.ini
  * %ProgramFiles%\Mozilla Firefox\browser\defaults\profile\chrome\userChrome.css

Firefox itself and any new user profile will be configured with desired preferences and locked down. You can find more detailed documentation on these features in the following articles:

  * [local-settings.js and Mozilla.cfg (Locking preferences)](http://kb.mozillazine.org/Locking_preferences)
  * [override.ini and Firefox command line options](https://developer.mozilla.org/en-US/docs/Mozilla/Command_Line_Options)
  * [UserChrome.css](http://kb.mozillazine.org/UserChrome.css) and [Chrome element names and IDs](http://kb.mozillazine.org/UserChrome.css_Element_Names/IDs)
  * [Enterprise Build Of Firefox For Deployment](http://www.binaryturf.com/enterprise-build-firefox-deployment/)

To enforce user settings we can leverage the [ability to lock Firefox preferences](http://kb.mozillazine.org/Locking_preferences) and use [UserChrome.css](http://kb.mozillazine.org/UserChrome.css_Element_Names/IDs) to remove the associated user interface elements.

## Local-settings.js

Local-settings.js is used to tell Firefox to read Mozilla.cfg for some configuration items. Add the following lines to local-settings.js:

[code lang="js"]pref("general.config.obscure_value", 0);  
pref("general.config.filename", "mozilla.cfg");[/code]

## Mozilla.cfg

Here’s is where we can lock specified Firefox preferences. In the listing below, we’ve disabled the auto-update feature, the ‘Welcome to Firefox’ tab, the ‘Know your rights’ and ‘Improve Firefox’ notifications. The last (highlighted) line will disable the ability to set the browser as default.

This is useful where you would like to restrict this functionality and is applicable to App-V 4.x environments where attempting to set a virtualized Firefox as default won’t work. Under App-V 5, remove this line so that users can set Firefox as the default browser if they wish.

[code highlight="7&#8243;]lockPref("app.update.auto", false);  
lockPref("app.update.enabled", false);  
lockPref("app.update.service.enabled", false);  
lockPref("toolkit.telemetry.prompted", true);  
lockPref("browser.rights.override", true);  
lockPref("browser.startup.homepage_override.mstone", "ignore");  
lockPref("browser.shell.checkDefaultBrowser", false);[/code]

## Override.ini

To disable the browser Import Wizard on first run, place the following lines into override.ini

\[code\]\[XRE\]  
EnableProfileMigrator=false[/code]

## userChrome.css

Mozilla has made it a fairly straight forward process to remove browser user interface elements using userChrome.css. Where browser functionality has been disabled, we can remove the corresponding UI to avoid user confusion. Enter the following lines into userChrome.css; however remove the highlighted line if you would like users to be able to set Firefox as the default browser:

[code lang="css" highlight="5&#8243;]/\* UserChrome.css for Mozilla Firefox \*/  
/\* Remove access to user interface elements that aren't suitable for application virtualization \*/

/\* Options - Advanced - General - System Defaults \*/  
#systemDefaultsGroup { display: none !important; }

/\* Options / Advanced / Update / Firefox updates group box \*/  
#updateApp { display: none !important; }

/\* Help - About - Check for Updates button \*/  
#updateButton { display: none !important; }[/code]

# Installing Firefox

Download the [Firefox installer in your target language from the Mozilla site](http://www.mozilla.com/firefox/all.html). For most deployments the installer won't require modification and installation can be automated by passing an INI file with setup configuration details to the installer. This enables you to control setup and set options such as preventing the desktop shortcut from being added, or control the target directory that Firefox is installed to (useful when virtualizing).

An installation script for Firefox should perform the following tasks:

  * Install Mozilla [Firefox with installer command line arguments](https://wiki.mozilla.org/Installer:Command_Line_Arguments) – use the INI file approach to control for finer control over the installation
  * After installing Firefox, copy the configuration files to the correct locations
  * Firefox also allows you to [add global add-ons by adding them to the Extensions sub-folder](http://kb.mozillazine.org/Installing_extensions) of the Firefox installation folder
  * Optionally set Mozilla Maintenance service to disabled, if it is installed

For an example script that will automate the install and configuration of Firefox using the recommendations outlined in this article, see the script below. Note the highlighted line, where I can change the target installation directory for Firefox:

[code highlight="4&#8243;]@ECHO OFF  
SET SOURCE=%~dp0  
SET SOURCE=%SOURCE:~0,-1%  
SET INSTALLPATH=%ProgramFiles%\Mozilla Firefox

REM Create the Firefox answer file  
ECHO [Install] > %SOURCE%\Firefox.ini  
REM InstallDirectoryName=Firefox >> "%SOURCE%\Firefox.ini"  
ECHO InstallDirectoryPath=%INSTALLPATH% >> "%SOURCE%\Firefox.ini"  
ECHO QuickLaunchShortcut=false >> "%SOURCE%\Firefox.ini"  
ECHO DesktopShortcut=false >> "%SOURCE%\Firefox.ini"  
ECHO StartMenuShortcuts=true >> "%SOURCE%\Firefox.ini"  
ECHO MaintenanceService=false >> "%SOURCE%\Firefox.ini"

REM Install Firefox  
START /WAIT "Firefox" /D "%SOURCE%" "FirefoxSetup21.exe" /INI="%SOURCE%\Firefox.ini"

REM Configure Firefox profile defaults and preferences locking  
IF NOT EXIST "%INSTALLPATH%\browser\defaults\profile\chrome" MD "%INSTALLPATH%\browser\defaults\profile\chrome"  
COPY /Y %SOURCE%\userChrome.css "%INSTALLPATH%\browser\defaults\profile\chrome\userChrome.css"  
IF NOT EXIST "%INSTALLPATH%\browser\defaults\preferences" MD "%INSTALLPATH%\browser\defaults\preferences"  
COPY /Y %SOURCE%\local-settings.js "%INSTALLPATH%\browser\defaults\preferences\local-settings.js"  
COPY /Y %SOURCE%\Mozilla.cfg "%INSTALLPATH%\Mozilla.cfg"  
COPY /Y %SOURCE%\override.ini "%INSTALLPATH%\browser\override.ini"

REM Disable the Mozilla Maintenance Service to prevent updates (in the event the service is installed)  
sc config MozillaMaintenance start= disabled[/code]

If the installation has been configured correctly, Firefox should start and not display the Import Wizard or any of the other prompts and start-up tabs. Additionally, if you navigate to about:config, a number of preferences should be listed as locked:

[<img style="background-image: none; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border: 0px;" title="FirefoxSettings" alt="FirefoxSettings" src="https://stealthpuppy.com/media/2013/03/FirefoxSettings_thumb.png" width="660" height="319" border="0" />]({{site.baseurl}}/media/2013/03/FirefoxSettings.png)

To make it easier, I've included the configuration files and the installation script listed above in a single ZIP file that you can download here:

<p class="download">
  [download id="60&#8243; format="1&#8243;]
</p>

# Finally

The approach outlined in this article should provide you with a deployment of Firefox that can be used in an enterprise where control of the browser is required. I've only covered a few of the things that are possible when customising the installation and if you dig a little deeper you can come up with a setup to suit your own environment.

This is also a key approach to use when virtualising Firefox. Controlling the browser options and automating the installation will assist in producing better application virtualization packages.

# Further Reading

Here’s some other articles from around the tubes that cover this topic and are also useful references:

  * [Customizing the Firefox Installer on Windows (2012)](http://mike.kaply.com/2012/02/14/customizing-the-firefox-installer-on-windows-2012/)
  * [Install and Configure Firefox 18 silently](http://www.mockbox.net/configmgr-sccm/174-install-and-configure-firefox-silently)