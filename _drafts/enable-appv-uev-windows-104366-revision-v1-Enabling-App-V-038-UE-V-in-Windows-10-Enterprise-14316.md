---
id: 5935
title: 'Enabling App-V &#038; UE-V in Windows 10 Enterprise 14316'
date: 2018-01-25T08:45:14+10:00
author: Aaron Parker
layout: revision
guid: https://stealthpuppy.com/4366-revision-v1/
permalink: /4366-revision-v1/
---
Enabling the App-V client and UE-V client in Windows 10 Enterprise Build 14316 via PowerShell and viewing the behaviour of filter drivers for each client.

If you&#8217;re following Microsoft App-V and [User Experience&nbsp;Virtualization (UE-V)](https://technet.microsoft.com/en-au/windows/hh943107.aspx), then you&#8217;re probably aware that these products are being built into Windows 10 Enterprise (and presumably Windows Server 2016). This means no longer having to download and install each client &#8211; it will already be available in Windows and just requires enabling to use.

I previously tweeted a view of the App-V and UE-V client files available in the latest build:

<blockquote class="twitter-tweet" data-lang="en">
  <p dir="ltr" lang="en">
    <a href="https://twitter.com/hashtag/AppV?src=hash">#AppV</a> and <a href="https://twitter.com/hashtag/UEV?src=hash">#UEV</a> in the latest Windows 10 builds <a href="https://t.co/rv3EG0zIFX">pic.twitter.com/rv3EG0zIFX</a>
  </p>
  
  <p>
    — Aaron Parker (@stealthpuppy) <a href="https://twitter.com/stealthpuppy/status/718456726748422145">April 8, 2016</a>
  </p>
</blockquote>



# Filter Drivers

Before we enable the clients, let&#8217;s take a quick look at the filter drivers in Windows 10 build 14136 (note, I&#8217;m looking at a VM with the Office 365 apps installed, so I may have picked up a filter driver or two already). The _fltmc_ command from an elevated Command Prompt or PowerShell instance displays the currently running filters:

<figure id="attachment_4369" aria-describedby="caption-attachment-4369" style="width: 950px" class="wp-caption alignnone"><a href="http://stealthpuppy.com/wp-content/uploads/2016/04/fltmc-before-enable.png" rel="attachment wp-att-4369"><img class="wp-image-4369 size-full" title="Viewing filter drivers before enabling App-V and UE-V clients." src="http://stealthpuppy.com/wp-content/uploads/2016/04/fltmc-before-enable.png" alt="Viewing filter drivers before enabling App-V and UE-V clients." width="950" height="528" srcset="http://192.168.0.89/wp-content/uploads/2016/04/fltmc-before-enable.png 950w, http://192.168.0.89/wp-content/uploads/2016/04/fltmc-before-enable-150x83.png 150w, http://192.168.0.89/wp-content/uploads/2016/04/fltmc-before-enable-300x167.png 300w, http://192.168.0.89/wp-content/uploads/2016/04/fltmc-before-enable-768x427.png 768w" sizes="(max-width: 950px) 100vw, 950px" /></a><figcaption id="caption-attachment-4369" class="wp-caption-text">Viewing filter drivers before enabling App-V and UE-V clients.</figcaption></figure>

# Enabling the App-V Client

If we take a look at services on the client, we can see that the App-V Client service exists but is not enabled. To view the status of the service run:

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="Viewing the App-V client service">Get-Service | Where-Object { $_.Name -like "appv*" } | Select Name, DisplayName, Status, StartType | Format-List</pre>

<figure id="attachment_4370" aria-describedby="caption-attachment-4370" style="width: 950px" class="wp-caption alignnone"><a href="http://stealthpuppy.com/wp-content/uploads/2016/04/Get-Service-AppvClient-BeforeEnable.png" rel="attachment wp-att-4370"><img class="wp-image-4370 size-full" title="The App-V client service is there but not enabled." src="http://stealthpuppy.com/wp-content/uploads/2016/04/Get-Service-AppvClient-BeforeEnable.png" alt="The App-V client service is there but not enabled." width="950" height="528" srcset="http://192.168.0.89/wp-content/uploads/2016/04/Get-Service-AppvClient-BeforeEnable.png 950w, http://192.168.0.89/wp-content/uploads/2016/04/Get-Service-AppvClient-BeforeEnable-150x83.png 150w, http://192.168.0.89/wp-content/uploads/2016/04/Get-Service-AppvClient-BeforeEnable-300x167.png 300w, http://192.168.0.89/wp-content/uploads/2016/04/Get-Service-AppvClient-BeforeEnable-768x427.png 768w" sizes="(max-width: 950px) 100vw, 950px" /></a><figcaption id="caption-attachment-4370" class="wp-caption-text">The App-V client service is there but not enabled.</figcaption></figure>

The App-V PowerShell module included in Windows 10 includes an _Enable-AppV_ command. To use the command to enable the App-V client, first run an elevated PowerShell prompt. Import the AppvClient module and run the command:

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="Enabling the App-V client">Import-Module AppvClient
Enable-AppV</pre>

Unfortunately, at this time, the cmdlet does not return anything &#8211; neither&nbsp;True or False or anything else depending on the result. This will be important for validating automation, so hopefully, Microsoft will fix that before release. Once the cmdlet is successful the App-V Client service will be enabled an running, so it is possible to check whether the service has been enabled to see whether _Enable-AppV_ was successful.

Unlike fellow MVP [Ryan Bijkerk](https://twitter.com/logitblog), I did not&nbsp;[run into issues running this command](http://www.logitblog.com/microsoft-app-v-built-in-windows-10/), but if the cmdlet fails to enable the App-V client, you can enable the service with the following commands:

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="Enabling and starting the App-V client service">Set-Service -Name AppVClient -StartupType Automatic
Start-Service AppVClient</pre>

If we again take a look at the filter drivers running, a number of App-V related drivers have been added. Here we can see that the following filter drivers have been enabled:

  * AppvVfs (App-V virtual file system)
  * AppvStrm (App-V streaming driver)
  * AppvVemgr (App-V virtual environment manager)

<figure id="attachment_4372" aria-describedby="caption-attachment-4372" style="width: 950px" class="wp-caption alignnone"><a href="http://stealthpuppy.com/wp-content/uploads/2016/04/fltmc-after-AppVClient-enabled.png" rel="attachment wp-att-4372"><img class="wp-image-4372 size-full" title="Filter drivers after the App-V client has been enabled." src="http://stealthpuppy.com/wp-content/uploads/2016/04/fltmc-after-AppVClient-enabled.png" alt="Filter drivers after the App-V client has been enabled." width="950" height="528" srcset="http://192.168.0.89/wp-content/uploads/2016/04/fltmc-after-AppVClient-enabled.png 950w, http://192.168.0.89/wp-content/uploads/2016/04/fltmc-after-AppVClient-enabled-150x83.png 150w, http://192.168.0.89/wp-content/uploads/2016/04/fltmc-after-AppVClient-enabled-300x167.png 300w, http://192.168.0.89/wp-content/uploads/2016/04/fltmc-after-AppVClient-enabled-768x427.png 768w" sizes="(max-width: 950px) 100vw, 950px" /></a><figcaption id="caption-attachment-4372" class="wp-caption-text">Filter drivers after the App-V client has been enabled.</figcaption></figure>

# Enabling the UE-V Client

Just like the App-V client, we can see that the UE-V client service exists but is disabled. Use the _Get-Service_ command to see the status of the service:

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="Viewing the UE-V client service">Get-Service | Where-Object { $_.Name -like "uev*" } | Select Name, DisplayName, Status, StartType | Format-List</pre>

<a href="http://stealthpuppy.com/wp-content/uploads/2016/04/Get-Service-UevClient-BeforeEnable.png" rel="attachment wp-att-4373"><img class="wp-image-4373 size-full" title="Viewing the UE-V client service." src="http://stealthpuppy.com/wp-content/uploads/2016/04/Get-Service-UevClient-BeforeEnable.png" alt="Viewing the UE-V client service." width="950" height="528" srcset="http://192.168.0.89/wp-content/uploads/2016/04/Get-Service-UevClient-BeforeEnable.png 950w, http://192.168.0.89/wp-content/uploads/2016/04/Get-Service-UevClient-BeforeEnable-150x83.png 150w, http://192.168.0.89/wp-content/uploads/2016/04/Get-Service-UevClient-BeforeEnable-300x167.png 300w, http://192.168.0.89/wp-content/uploads/2016/04/Get-Service-UevClient-BeforeEnable-768x427.png 768w" sizes="(max-width: 950px) 100vw, 950px" /></a>

Viewing the UE-V client service.Use the _Enable-Uev_ cmdlet to enable the UE-V client:

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="Enabling the UE-V client service">Import-Module UEV
Enable-Uev</pre>

Again, like _Enable-AppV_, _Enable-Uev_ returns nothing, you can view the status of the UE-V Client service to see whether it was successfully enabled. If the command fails for whatever reason, enable the UE-V client service directly:

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="Enabling and starting the UE-V client service via PowerShell.">Set-Service -Name AppVClient -StartupType Automatic; Start-Service AppVClient</pre>

Now lets again look at the filter drivers that have been added &#8211; just a single driver for UE-V:

  * UevAgentDriver

<figure id="attachment_4374" aria-describedby="caption-attachment-4374" style="width: 950px" class="wp-caption alignnone"><a href="http://stealthpuppy.com/wp-content/uploads/2016/04/Filter-Drivers-After-Enabling-Appv-UEV.png" rel="attachment wp-att-4374"><img class="wp-image-4374 size-full" title="Filter drivers after enabling both the App-V and UE-V clients." src="http://stealthpuppy.com/wp-content/uploads/2016/04/Filter-Drivers-After-Enabling-Appv-UEV.png" alt="Filter drivers after enabling both the App-V and UE-V clients." width="950" height="528" srcset="http://192.168.0.89/wp-content/uploads/2016/04/Filter-Drivers-After-Enabling-Appv-UEV.png 950w, http://192.168.0.89/wp-content/uploads/2016/04/Filter-Drivers-After-Enabling-Appv-UEV-150x83.png 150w, http://192.168.0.89/wp-content/uploads/2016/04/Filter-Drivers-After-Enabling-Appv-UEV-300x167.png 300w, http://192.168.0.89/wp-content/uploads/2016/04/Filter-Drivers-After-Enabling-Appv-UEV-768x427.png 768w" sizes="(max-width: 950px) 100vw, 950px" /></a><figcaption id="caption-attachment-4374" class="wp-caption-text">Filter drivers after enabling both the App-V and UE-V clients.</figcaption></figure>

# Disabling the App-V and UE-V Clients

As you would expect with _Enable-AppV_ and _Enable-UEV_, there are cmdlets for disabling both clients. Again from an elevated PowerShell instance, run:

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="Disabling the App-V and UE-V clients via PowerShell">Import-Module AppVClient
Import-Module UEV
Disable-Appv
Disable-Uev</pre>

Once run the services for both clients will be stopped:

<figure id="attachment_4375" aria-describedby="caption-attachment-4375" style="width: 950px" class="wp-caption alignnone"><a href="http://stealthpuppy.com/wp-content/uploads/2016/04/PowerShell-AppVUev-serivces-stopped.png" rel="attachment wp-att-4375"><img class="wp-image-4375 size-full" title="Both services stopped after disabling the clients." src="http://stealthpuppy.com/wp-content/uploads/2016/04/PowerShell-AppVUev-serivces-stopped.png" alt="Both services stopped after disabling the clients." width="950" height="527" srcset="http://192.168.0.89/wp-content/uploads/2016/04/PowerShell-AppVUev-serivces-stopped.png 950w, http://192.168.0.89/wp-content/uploads/2016/04/PowerShell-AppVUev-serivces-stopped-150x83.png 150w, http://192.168.0.89/wp-content/uploads/2016/04/PowerShell-AppVUev-serivces-stopped-300x166.png 300w, http://192.168.0.89/wp-content/uploads/2016/04/PowerShell-AppVUev-serivces-stopped-768x426.png 768w" sizes="(max-width: 950px) 100vw, 950px" /></a><figcaption id="caption-attachment-4375" class="wp-caption-text">Both services stopped after disabling the clients.</figcaption></figure>

Once disabled, we would expect the filter drivers to be unloaded&nbsp;&#8211; the UE-V filter driver is unloaded immediately; however, the filter&nbsp;drivers for App-V are not unloaded until Windows restarts.

From what I understand, even though the client services are stopped, requests will still be passed through&nbsp;the filter drivers (I reserve the right to be wrong though&#8230;). To unload the filter drivers immediately, use the _fltmc unload_ command:

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="Unloading the App-V filter drivers.">fltmc unload AppvVfs
fltmc unload AppvStrm
fltmc unload AppvVemgr</pre>

&nbsp;This approach might break applications, so use for testing purposes only. A reboot after disabling these clients is recommended.

# Finally

This is the first build of Windows 10, available to testers, where the App-V and UE-V clients are built in. While&nbsp;Group Policy will also be an option for enabling these services en masse, doing via PowerShell is still useful for some scenarios.

In going through this exercise, there are two things that stand out:

  * <del>The Enable and Disable cmdlets should return a True or False if the command was successful or not. This is expected to be fixed before release</del>. [24th April 2016 &#8211; build 14328 has updated the cmdlets to return a status]
  * I would like to see the App-V and UE-V clients enable and disabled as Windows Features (to enable/disable via DISM or &#8216;Programs and Features&#8217;), rather than just be in-box disabled. I&#8217;m not confident that this approach will change.

If you are a Windows Insider, I would recommend testing the App-V and UE-V functionality delivered as a part of this build. In addition, if you encounter challenges or bug, be sure to log them on [Connect](http://connect.microsoft.com).