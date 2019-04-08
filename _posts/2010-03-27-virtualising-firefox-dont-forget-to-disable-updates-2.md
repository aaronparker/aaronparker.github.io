---
id: 1434
title: 'Virtualising Firefox? Don't forget to disable Updates'
date: 2010-03-27T16:44:03+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=1434
permalink: /virtualising-firefox-dont-forget-to-disable-updates-2/
dsq_thread_id:
  - "195382234"
categories:
  - Applications
tags:
  - App-V
  - Firefox
---
If you are virtualising Mozilla Firefox, you should probably consider disabling the update functionality within the browser, to ensure consistency of the virtual package. There are several items that need to be configured or removed:

  * The automatic updates functionality
  * _Help / Check for Updates..._ menu item
  * The _Firefox_ check-box in the _Option / Advanced / Updates_ dialog box

Fortunately doing so is fairly straight-forward:

### Disable Automatic Updates

Updates are disabled in the _Options / Advanced / Updates_ dialog box (under Windows), which you can do when running Firefox during the sequencing/capture process - untick the _Firefox_ check box and change _When updates to Firefox are found_ to _Ask me what to do_.

Alternatively set _app.update.auto_ and _app.update.enabled_ to false in about:config or directly in `%APPDATA%\Mozilla\Firefox\Profiles\<profile>.default\prefs.js`.

Leave _Add-ons_ and _Search Engines_ enabled as these are stored within the user profile and can be updated when running under application virtualisation.

### Disable the Updates UI

Disabling the user interface elements to these update preferences and launch points is also important. To hide UI elements in Firefox, create [UserChrome.css](http://www.mozilla.org/unix/customizing.html) in `%APPDATA%\Mozilla\Firefox\Profiles\<profile>.default\chrome`. This file does not exist by default, although you will find an example file in the chrome folder. Create the file and add the following lines to hide the updates menu item and the Firefox check-box in the Updates dialog box.

```powershell
/\* remove the Check for Updates menu item \*/  
#updateSeparator, #checkForUpdates { display: none !important; }  
/\* remove the Updates / Firefox checkbox \*/  
#enableAppUpdate { display: none !important; }
```

If it is working correctly, you should see something like this (before and after):

![Firefox options](https://stealthpuppy.com/wp-content/uploads/2010/03/FirefoxOptions.png)

This method is not completely fool-proof (the modified files all exist in the user profile and are thus writeable) but it should stop users from unwittingly attempting to update Firefox and allow you to control when updates are deployed.
