---
id: 6174
title: Storage Sense on Windows 10 configured with Intune
date: 2018-09-02T20:46:04+10:00
author: Aaron Parker
layout: revision
guid: https://stealthpuppy.com/6161-revision-v1/
permalink: /6161-revision-v1/
---
In a modern management scenario, enabling end-points to perform automatic maintenance tasks will reduce TCO by avoiding scenarios that might result in support calls. Storage Sense in Windows 10 is a great way to [manage free disk space](https://support.microsoft.com/en-us/help/12425/windows-10-free-up-drive-space) on PCs by clearing caches, temporary files, old downloads, Windows Update cleanup, previous Windows Versions, and more, but it it&#8217;s not fully enabled by default. Storage Sense can potentially remove gigabytes of data, freeing up valuable space on smaller drives.

Here&#8217;s how to enable this feature on Windows 10 PCs enrolled in Microsoft Intune.

# Storage Sense Settings

Storage Sense can be found in the Windows 10 Settings app and has only a few settings that can be changed. Typically a user may enable Storage Sense and accept the default settings and for most PCs, the defaults are likely good enough. Here&#8217;s what&#8217;s available in Windows 10 1803:

<figure id="attachment_6164" aria-describedby="caption-attachment-6164" style="width: 2494px" class="wp-caption aligncenter">[<img class="size-full wp-image-6164" src="https://stealthpuppy.com/wp-content/uploads/2018/09/Windows10StorageSense.png" alt="Enabling Storage Sense in Windows 10 Settings" width="2494" height="1578" srcset="http://192.168.0.89/wp-content/uploads/2018/09/Windows10StorageSense.png 2494w, http://192.168.0.89/wp-content/uploads/2018/09/Windows10StorageSense-150x95.png 150w, http://192.168.0.89/wp-content/uploads/2018/09/Windows10StorageSense-300x190.png 300w, http://192.168.0.89/wp-content/uploads/2018/09/Windows10StorageSense-768x486.png 768w, http://192.168.0.89/wp-content/uploads/2018/09/Windows10StorageSense-1024x648.png 1024w" sizes="(max-width: 2494px) 100vw, 2494px" />](https://stealthpuppy.com/wp-content/uploads/2018/09/Windows10StorageSense.png)<figcaption id="caption-attachment-6164" class="wp-caption-text">Enabling Storage Sense in Windows 10 Settings</figcaption></figure>

Settings are stored in the user profile at:

<pre class="prettyprint lang-javascript" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\StorageSense\Parameters\StoragePolicy</pre>

&nbsp;Settings are stored somewhat cryptically with numbers representing various options.

<figure id="attachment_6168" aria-describedby="caption-attachment-6168" style="width: 1700px" class="wp-caption aligncenter">[<img class="size-full wp-image-6168" src="https://stealthpuppy.com/wp-content/uploads/2018/09/StorageSense-Registry.png" alt="Storage Sense settings in the Registry" width="1700" height="763" srcset="http://192.168.0.89/wp-content/uploads/2018/09/StorageSense-Registry.png 1700w, http://192.168.0.89/wp-content/uploads/2018/09/StorageSense-Registry-150x67.png 150w, http://192.168.0.89/wp-content/uploads/2018/09/StorageSense-Registry-300x135.png 300w, http://192.168.0.89/wp-content/uploads/2018/09/StorageSense-Registry-768x345.png 768w, http://192.168.0.89/wp-content/uploads/2018/09/StorageSense-Registry-1024x460.png 1024w" sizes="(max-width: 1700px) 100vw, 1700px" />](https://stealthpuppy.com/wp-content/uploads/2018/09/StorageSense-Registry.png)<figcaption id="caption-attachment-6168" class="wp-caption-text">Storage Sense settings in the Registry</figcaption></figure>

These values translate to following options and values in the table below:

[table id=47 /]

Now that we know what the options are, we can decide on what to deploy and deliver them to enrolled end-points.

# Configure via PowerShell

Using the values from the table above, a PowerShell script can be deployed via Intune to configure our desired settings. The script below will enable Storage Sense along with several settings to regularly remove outdated or temporary files.

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption=""># Enable Storage Sense
# Ensure the StorageSense key exists
$key = "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\StorageSense"
If (!(Test-Path "$key")) {
    New-Item -Path "$key" | Out-Null
}
If (!(Test-Path "$key\Parameters")) {
    New-Item -Path "$key\Parameters" | Out-Null
}
If (!(Test-Path "$key\Parameters\StoragePolicy")) {
    New-Item -Path "$key\Parameters\StoragePolicy" | Out-Null
}

# Set Storage Sense settings
# Enable Storage Sense
Set-ItemProperty -Path "$key\Parameters\StoragePolicy" -Name "01" -Type DWord -Value 1

# Set 'Run Storage Sense' to Every Week
Set-ItemProperty -Path "$key\Parameters\StoragePolicy" -Name "2048" -Type DWord -Value 7

# Enable 'Delete temporary files that my apps aren't using'
Set-ItemProperty -Path "$key\Parameters\StoragePolicy" -Name "04" -Type DWord -Value 1

# Set 'Delete files in my recycle bin if they have been there for over' to 14 days
Set-ItemProperty -Path "$key\Parameters\StoragePolicy" -Name "08" -Type DWord -Value 1
Set-ItemProperty -Path "$key\Parameters\StoragePolicy" -Name "256" -Type DWord -Value 14

# Set 'Delete files in my Downloads folder if they have been there for over' to 60 days
Set-ItemProperty -Path "$key\Parameters\StoragePolicy" -Name "32" -Type DWord -Value 1
Set-ItemProperty -Path "$key\Parameters\StoragePolicy" -Name "512" -Type DWord -Value 60

# Set value that Storage Sense has already notified the user
Set-ItemProperty -Path "$key\Parameters\StoragePolicy" -Name "StoragePoliciesNotified" -Type DWord -Value 1</pre>

Modify the script as desired &#8211; at the very least the script should enable Storage Sense and leave the remaining settings as default. Save the script as a PowerShell file and [deploy via the Intune console in the Azure portal](https://docs.microsoft.com/en-us/intune/intune-management-extension). Ensure that the script runs with the logged on user&#8217;s credentials because it will write to HKCU.

<figure id="attachment_6171" aria-describedby="caption-attachment-6171" style="width: 1800px" class="wp-caption aligncenter">[<img class="size-full wp-image-6171" src="https://stealthpuppy.com/wp-content/uploads/2018/09/StorageSense-PowerShellIntune.png" alt="Enabling Storage Sense with a PowerShell script in Intune" width="1800" height="622" srcset="http://192.168.0.89/wp-content/uploads/2018/09/StorageSense-PowerShellIntune.png 1800w, http://192.168.0.89/wp-content/uploads/2018/09/StorageSense-PowerShellIntune-150x52.png 150w, http://192.168.0.89/wp-content/uploads/2018/09/StorageSense-PowerShellIntune-300x104.png 300w, http://192.168.0.89/wp-content/uploads/2018/09/StorageSense-PowerShellIntune-768x265.png 768w, http://192.168.0.89/wp-content/uploads/2018/09/StorageSense-PowerShellIntune-1024x354.png 1024w" sizes="(max-width: 1800px) 100vw, 1800px" />](https://stealthpuppy.com/wp-content/uploads/2018/09/StorageSense-PowerShellIntune.png)<figcaption id="caption-attachment-6171" class="wp-caption-text">Enabling Storage Sense with a PowerShell script in Intune</figcaption></figure>

Assign the script to All Users and their PC will receive the script. It&#8217;s important to note that, because the settings are stored in HKCU and are not policies, the user can either disable Storage Sense or change other settings.

# Wrapping Up

Storage Sense is a great feature to enable on Windows 10 PCs for both personal and corporate PCs. In a modern management scenario, it&#8217;s another tool in our kit for enabling end-points to be self-sufficient, so I highly recommend testing and enabling the feature by default. This article has shown you how to configure Storage Sense via Intune and PowerShell with all of the possible combinations required to configure it to suit your requirements.

## Hold On&#8230;

Storage Sense shows you how much disk capacity has been cleaned in the previous month in the Settings app. For a bit of a laugh, you can modify the value where this is stored so that Settings displays spaced saved that&#8217;s clearly not genuine.

<figure id="attachment_6172" aria-describedby="caption-attachment-6172" style="width: 1598px" class="wp-caption aligncenter">[<img class="size-full wp-image-6172" src="https://stealthpuppy.com/wp-content/uploads/2018/09/StorageSense-SpaceSaved.png" alt="Messing around with the value of saved space" width="1598" height="697" srcset="http://192.168.0.89/wp-content/uploads/2018/09/StorageSense-SpaceSaved.png 1598w, http://192.168.0.89/wp-content/uploads/2018/09/StorageSense-SpaceSaved-150x65.png 150w, http://192.168.0.89/wp-content/uploads/2018/09/StorageSense-SpaceSaved-300x131.png 300w, http://192.168.0.89/wp-content/uploads/2018/09/StorageSense-SpaceSaved-768x335.png 768w, http://192.168.0.89/wp-content/uploads/2018/09/StorageSense-SpaceSaved-1024x447.png 1024w" sizes="(max-width: 1598px) 100vw, 1598px" />](https://stealthpuppy.com/wp-content/uploads/2018/09/StorageSense-SpaceSaved.png)<figcaption id="caption-attachment-6172" class="wp-caption-text">Messing around with the value of saved space</figcaption></figure>

You&#8217;ll find the registry value (20180901) in this key:

<pre class="prettyprint lang-javascript" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\StorageSense\Parameters\StoragePolicy\SpaceHistory</pre>

Image Credit:&nbsp;Photo by&nbsp;[Florian Pérennès](https://unsplash.com/photos/wloRJGS6Y34?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)&nbsp;on&nbsp;[Unsplash](https://unsplash.com/search/photos/disk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)