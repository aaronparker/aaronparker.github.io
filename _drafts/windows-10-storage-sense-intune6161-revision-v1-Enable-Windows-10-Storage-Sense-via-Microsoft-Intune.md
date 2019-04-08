---
id: 6170
title: Enable Windows 10 Storage Sense via Microsoft Intune
date: 2018-09-02T15:30:19+10:00
author: Aaron Parker
layout: revision
guid: https://stealthpuppy.com/6161-revision-v1/
permalink: /6161-revision-v1/
---
In a modern management scenario, enabling end-points to perform automatic maintenance tasks will reduce TCO by avoiding scenarios that might result in support calls. Storage Sense in Windows 10 is a great way to [manage free disk space](https://support.microsoft.com/en-us/help/12425/windows-10-free-up-drive-space) on PCs by clearing caches, temporary files, old downloads, Windows Update cleanup, previous Windows Versions, and more, but it it&#8217;s not fully enabled by default. Here&#8217;s how to enable Storage Sense with Microsoft Intune.

# Storage Sense Settings

Storage Sense can be found in the Windows 10 Settings app and has only a few settings that can be changed. Typically a user may enable Storage Sense and accept the default settings and for most PCs, the defaults are likely good enough.

<figure id="attachment_6164" aria-describedby="caption-attachment-6164" style="width: 2494px" class="wp-caption aligncenter">[<img class="size-full wp-image-6164" src="https://stealthpuppy.com/wp-content/uploads/2018/09/Windows10StorageSense.png" alt="Enabling Storage Sense in Windows 10 Settings" width="2494" height="1578" srcset="https://stealthpuppy.com/wp-content/uploads/2018/09/Windows10StorageSense.png 2494w, https://stealthpuppy.com/wp-content/uploads/2018/09/Windows10StorageSense-150x95.png 150w, https://stealthpuppy.com/wp-content/uploads/2018/09/Windows10StorageSense-300x190.png 300w, https://stealthpuppy.com/wp-content/uploads/2018/09/Windows10StorageSense-768x486.png 768w, https://stealthpuppy.com/wp-content/uploads/2018/09/Windows10StorageSense-1024x648.png 1024w" sizes="(max-width: 2494px) 100vw, 2494px" />](https://stealthpuppy.com/wp-content/uploads/2018/09/Windows10StorageSense.png)<figcaption id="caption-attachment-6164" class="wp-caption-text">Enabling Storage Sense in Windows 10 Settings</figcaption></figure>

Settings are stored in the user profile at:

<pre class="prettyprint lang-javascript" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\StorageSense\Parameters\StoragePolicy</pre>

With settings stored somewhat cryptically with numbers representing various options.

<figure id="attachment_6168" aria-describedby="caption-attachment-6168" style="width: 1700px" class="wp-caption aligncenter">[<img class="size-full wp-image-6168" src="https://stealthpuppy.com/wp-content/uploads/2018/09/StorageSense-Registry.png" alt="Storage Sense settings in the Registry" width="1700" height="763" srcset="https://stealthpuppy.com/wp-content/uploads/2018/09/StorageSense-Registry.png 1700w, https://stealthpuppy.com/wp-content/uploads/2018/09/StorageSense-Registry-150x67.png 150w, https://stealthpuppy.com/wp-content/uploads/2018/09/StorageSense-Registry-300x135.png 300w, https://stealthpuppy.com/wp-content/uploads/2018/09/StorageSense-Registry-768x345.png 768w, https://stealthpuppy.com/wp-content/uploads/2018/09/StorageSense-Registry-1024x460.png 1024w" sizes="(max-width: 1700px) 100vw, 1700px" />](https://stealthpuppy.com/wp-content/uploads/2018/09/StorageSense-Registry.png)<figcaption id="caption-attachment-6168" class="wp-caption-text">Storage Sense settings in the Registry</figcaption></figure>

These values translate to settings in Storage Sense as shown in the table below:

[table id=47 /]

dd