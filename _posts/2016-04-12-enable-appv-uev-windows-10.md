---

title: Enabling App-V and UE-V in Windows 10 Enterprise 14316
date: 2016-04-12T21:48:47+10:00
author: Aaron Parker
layout: post

permalink: /enable-appv-uev-windows-10/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "4740755105"
image: /media/2016/04/PowerShell-Windows10-Version.png
categories:
  - Microsoft
tags:
  - App-V
  - UE-V
---
Enabling the App-V client and UE-V client in Windows 10 Enterprise Build 14316 via PowerShell and viewing the behaviour of filter drivers for each client.

If you're following Microsoft App-V and [User Experience Virtualization (UE-V)](https://technet.microsoft.com/en-au/windows/hh943107.aspx), then you're probably aware that these products are being built into Windows 10 Enterprise (and presumably Windows Server 2016). This means no longer having to download and install each client - it will already be available in Windows and just requires enabling to use.

I previously tweeted a view of the App-V and UE-V client files available in the latest build:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/AppV?src=hash&amp;ref_src=twsrc%5Etfw">#AppV</a> and <a href="https://twitter.com/hashtag/UEV?src=hash&amp;ref_src=twsrc%5Etfw">#UEV</a> in the latest Windows 10 builds <a href="https://t.co/rv3EG0zIFX">pic.twitter.com/rv3EG0zIFX</a></p>&mdash; Aaron Parker (@stealthpuppy) <a href="https://twitter.com/stealthpuppy/status/718456726748422145?ref_src=twsrc%5Etfw">April 8, 2016</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Filter Drivers

Before we enable the clients, let's take a quick look at the filter drivers in Windows 10 build 14136 (note, I'm looking at a VM with the Office 365 apps installed, so I may have picked up a filter driver or two already). The `fltmc` command from an elevated Command Prompt or PowerShell instance displays the currently running filters:

![Viewing filter drivers before enabling App-V and UE-V clients.]({{site.baseurl}}/media/2016/04/fltmc-before-enable.png)

## Enabling the App-V Client

If we take a look at services on the client, we can see that the App-V Client service exists but is not enabled. To view the status of the service run:

```powershell
Get-Service | Where-Object { $_.Name -like "appv*" } | Select Name, DisplayName, Status, StartType | Format-List
```

![The App-V client service is there but not enabled]({{site.baseurl}}/media/2016/04/Get-Service-AppvClient-BeforeEnable.png)

The App-V PowerShell module included in Windows 10 includes an _Enable-AppV_ command. To use the command to enable the App-V client, first run an elevated PowerShell prompt. Import the AppvClient module and run the command:

```powershell
Import-Module AppvClient
Enable-AppV
```

Unfortunately, at this time, the cmdlet does not return anything - neither True or False or anything else depending on the result. This will be important for validating automation, so hopefully, Microsoft will fix that before release. Once the cmdlet is successful the App-V Client service will be enabled an running, so it is possible to check whether the service has been enabled to see whether `Enable-AppV` was successful.

Unlike fellow MVP [Ryan Bijkerk](https://twitter.com/logitblog), I did not [run into issues running this command](http://www.logitblog.com/microsoft-app-v-built-in-windows-10/), but if the cmdlet fails to enable the App-V client, you can enable the service with the following commands:

```powershell
Set-Service -Name AppVClient -StartupType Automatic
Start-Service AppVClient
```

If we again take a look at the filter drivers running, a number of App-V related drivers have been added. Here we can see that the following filter drivers have been enabled:

* AppvVfs (App-V virtual file system)
* AppvStrm (App-V streaming driver)
* AppvVemgr (App-V virtual environment manager)

![Filter drivers after the App-V client has been enabled]({{site.baseurl}}/media/2016/04/fltmc-after-AppVClient-enabled.png)

## Enabling the UE-V Client

Just like the App-V client, we can see that the UE-V client service exists but is disabled. Use the _Get-Service_ command to see the status of the service:

```powershell
Get-Service | Where-Object { $_.Name -like "uev*" } | Select Name, DisplayName, Status, StartType | Format-List
```

![]({{site.baseurl}}/media/2016/04/Get-Service-UevClient-BeforeEnable.png)

Viewing the UE-V client service.Use the _Enable-Uev_ cmdlet to enable the UE-V client:

```powershell
Import-Module UEV
Enable-Uev
```

Again, like `Enable-AppV`, `Enable-Uev` returns nothing, you can view the status of the UE-V Client service to see whether it was successfully enabled. If the command fails for whatever reason, enable the UE-V client service directly:

```powershell
Set-Service -Name AppVClient -StartupType Automatic; Start-Service AppVClient
```

Now lets again look at the filter drivers that have been added - just a single driver for UE-V:

* UevAgentDriver

![Filter drivers after enabling both the App-V and UE-V clients]({{site.baseurl}}/media/2016/04/Filter-Drivers-After-Enabling-Appv-UEV.png)

## Disabling the App-V and UE-V Clients

As you would expect with _Enable-AppV_ and _Enable-UEV_, there are cmdlets for disabling both clients. Again from an elevated PowerShell instance, run:

```powershell
Import-Module AppVClient
Import-Module UEV
Disable-Appv
Disable-Uev
```

Once run the services for both clients will be stopped:

![Both services stopped after disabling the clients]({{site.baseurl}}/media/2016/04/PowerShell-AppVUev-serivces-stopped.png)

Once disabled, we would expect the filter drivers to be unloaded - the UE-V filter driver is unloaded immediately; however, the filter drivers for App-V are not unloaded until Windows restarts.

From what I understand, even though the client services are stopped, requests will still be passed through the filter drivers (I reserve the right to be wrong though...). To unload the filter drivers immediately, use the _fltmc unload_ command:

```powershell
fltmc unload AppvVfs
fltmc unload AppvStrm
fltmc unload AppvVemgr
```

 This approach might break applications, so use for testing purposes only. A reboot after disabling these clients is recommended.

## Finally

This is the first build of Windows 10, available to testers, where the App-V and UE-V clients are built in. While Group Policy will also be an option for enabling these services en masse, doing via PowerShell is still useful for some scenarios.

In going through this exercise, there are two things that stand out:

* <del>The Enable and Disable cmdlets should return a True or False if the command was successful or not. This is expected to be fixed before release</del>. [24th April 2016 - build 14328 has updated the cmdlets to return a status]
* I would like to see the App-V and UE-V clients enable and disabled as Windows Features (to enable/disable via DISM or 'Programs and Features'), rather than just be in-box disabled. I'm not confident that this approach will change.

If you are a Windows Insider, I would recommend testing the App-V and UE-V functionality delivered as a part of this build. In addition, if you encounter challenges or bug, be sure to log them on [Connect](http://connect.microsoft.com).
