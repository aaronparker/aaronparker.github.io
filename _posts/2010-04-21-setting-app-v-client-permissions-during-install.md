---

title: Setting App-V client permissions during install
date: 2010-04-21T22:03:43+10:00
author: Aaron Parker
layout: post

permalink: /setting-app-v-client-permissions-during-install/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195382327"
categories:
  - Automation
tags:
  - App-V
---
However, I generally recommend configuring as many settings as you can during install so that you don't have to rely on external tools (e.g. Group Policy) that may not apply in a timely manner.

I have had to set permissions during install to make changes to the default permission set. Those permissions aren't documented on TechNet, so I have listed them here. The following table lists the permissions that you can modify by passing parameters to Setup or via Windows Installer

|Parameter|Values|Description|FIELD4                                                                                                                                                                                  |
|---------|------|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|PERM_ADDAPP|[0,1] | Default: 0|Allow standard users to add applications into the cache. This permission would need to be enabled if SFTMIME ADD PACKAGE commands are run in the context of the currently logged on user|
|PERM_CHANGECACHESIZE|[0,1] | Default: 0|Change the file system cache size                                                                                                                                                       |
|PERM_CHANGEFSDRIVE|[0,1] | Default: 0|Change the file system drive                                                                                                                                                            |
|PERM_CHANGELOGSETTINGS|[0,1] | Default: 0|Change log settings                                                                                                                                                                     |
|PERM_CHANGEREFRESHSETTINGS|[0,1] | Default: 0|Change OSD files                                                                                                                                                                        |
|PERM_CLEARAPP|[0,1] | Default: 1|Clear application settings                                                                                                                                                              |
|PERM_DELETEAPP|[0,1] | Default: 0|Delete applications                                                                                                                                                                     |
|PERM_IMPORTAPP|[0,1] | Default: 0|Import applications into the cache                                                                                                                                                      |
|PERM_LOADAPP_TS|[0,1] | Default: 0|Load applications into the cache (Terminal Server)                                                                                                                                      |
|PERM_LOADAPP_WD|[0,1] | Default: 1|Load applications into the cache (Desktop)                                                                                                                                              |
|PERM_LOCKAPP_TS|[0,1] | Default: 0|Lock and unlock applications into the cache (Terminal Server)                                                                                                                           |
|PERM_LOCKAPP_WD|[0,1] | Default: 1|Lock and unlock applications into the cache (Desktop)                                                                                                                                   |
|PERM_MANAGESERVERS|[0,1] | Default: 0|Manage publishing servers                                                                                                                                                               |
|PERM_MANAGETYPES_TS|[0,1] | Default: 0|Manage file type associations (Terminal Server)                                                                                                                                         |
|PERM_MANAGETYPES_WD|[0,1] | Default: 1|Manage file type associations (Desktop)                                                                                                                                                 |
|PERM_PUBLISHSHORTCUTS|[0,1] | Default: 0|Publish shortcuts. This permission must be enabled if the SFTMIME PUBLISH PACKAGE is executed in the context of the currently logged on user                                            |
|PERM_REFRESHSERVER_TS|[0,1] | Default: 0|Start a publishing refresh (Terminal Server)                                                                                                                                            |
|PERM_REFRESHSERVER_WD|[0,1] | Default: 1|Start a publishing refresh (Desktop)                                                                                                                                                    |
|PERM_REPAIRAPP|[0,1] | Default: 1|Repair applications                                                                                                                                                                     |
|PERM_TOGGLEOFFLINEMODE_TS|[0,1] | Default: 0|Toggle offline mode (Terminal Server)                                                                                                                                                   |
|PERM_TOGGLEOFFLINEMODE_WD|[0,1] | Default: 1|Toggle offline mode (Desktop)                                                                                                                                                           |
|PERM_UNLOADAPP|[0,1] | Default: 0|Unload applications from the cache                                                                                                                                                      |
|PERM_UPDATEOSDFILE|[0,1] | Default: 0|Change OSD files                                                                                                                                                                        |
|PERM_VIEWALLAPPLICATIONS|[0,1] | Default: 0|View all applications                                                                                                                                                                   |
{:.smaller}

See the Property table inside SETUP.MSI for the complete list of additional client settings that you can pass to the installer.

I have included here a complete sample script that deploys the App-V client, by first installing the dependencies and setting permissions (and other options) during install, using the MSI:
