---
id: 3715
title: Implementing a Workaround for issue affecting the App-V Client in KB2984972
date: 2014-10-22T18:07:30+10:00
author: Aaron Parker
layout: post
guid: http://stealthpuppy.com/?p=3715
permalink: /implement-workaround-appv-kb2984972/
dsq_thread_id:
  - "3143075597"
pd_rating:
  - 'a:8:{s:4:"type";s:1:"0";s:5:"votes";s:1:"1";s:6:"total1";s:1:"0";s:6:"total2";s:1:"0";s:6:"total3";s:1:"0";s:6:"total4";s:1:"0";s:6:"total5";s:1:"1";s:7:"average";s:6:"5.0000";}'
categories:
  - Applications
tags:
  - App-V
  - PowerShell
---
A recent [security update for the Remote Desktop Connection client in Windows 7 and Windows Server 2008 R2](http://support.microsoft.com/kb/2984972) has affected both the Microsoft App-V 4.6 and 5.0 client.

> After you install this security update, virtualized applications in Microsoft Application Virtualization (App-V) versions 4.5, 4.6, and 5.0 may experience problems loading. When the problem occurs, you may receive an error message that resembles the following:
> 
> Launching MyApp 100%
> 
> Note In this error message, MyApp represents the name of the App-V application.
> 
> Depending on the scenario, the virtualized app may stop responding after it starts, or the app may not start at all.

This [issue was reported in the forums](https://social.technet.microsoft.com/Forums/en-US/c90212b0-b32c-4488-9753-fb952112828c/warning-kb2984972-and-autodeskrelated-46-appv-packages?forum=mdopappv) as well and seems to affect a number of applications.

Microsoft have updated the KB article for the security update to provide a workaround (see the known issues section). Another KB article is on the way, targeted more directly at the App-V client. No word at the time of writing as to a more permanent fix.

The workaround requires implementing a Registry change to the App-V client to add an additional item to the global events that are excluded by the virtualization layer in App-V. Full details are in the KB article and I recommend reading that before continue with this article.

# Implementing the Workaround

There&#8217;s a few ways that you could implement the fix &#8211; Group Policy Preferences, scripting etc. You will need to pay attention to the entires in the HKLM\SOFTWARE\Microsoft\AppV\Subsystem\ObjExclusions (for App-V 5.0) or HKLM\SOFTWARE\Microsoft\SoftGrid\4.5\SystemGuard\ObjExclusions (for App-V 4.6) as each entry requires a unique value name &#8211; you don&#8217;t want to overwrite an existing entry.

Here&#8217;s the ObjExclusions key on an App-V 5.0 client:

<figure id="attachment_3716" aria-describedby="caption-attachment-3716" style="width: 1204px" class="wp-caption alignnone">[<img class="size-full wp-image-3716" src="http://stealthpuppy.com/wp-content/uploads/2014/10/AppV-Client-ObjExclusions.png" alt="AppV Client ObjExclusions registry key" width="1204" height="572" srcset="https://stealthpuppy.com/wp-content/uploads/2014/10/AppV-Client-ObjExclusions.png 1204w, https://stealthpuppy.com/wp-content/uploads/2014/10/AppV-Client-ObjExclusions-150x71.png 150w, https://stealthpuppy.com/wp-content/uploads/2014/10/AppV-Client-ObjExclusions-300x142.png 300w, https://stealthpuppy.com/wp-content/uploads/2014/10/AppV-Client-ObjExclusions-1024x486.png 1024w, https://stealthpuppy.com/wp-content/uploads/2014/10/AppV-Client-ObjExclusions-624x296.png 624w" sizes="(max-width: 1204px) 100vw, 1204px" />](http://stealthpuppy.com/wp-content/uploads/2014/10/AppV-Client-ObjExclusions.png)<figcaption id="caption-attachment-3716" class="wp-caption-text">AppV Client ObjExclusions registry key</figcaption></figure>

Most environments will have the default entries (92 for App-V 5.0, 94 for App-V 4.6). For customised environments you would need to ensure that a unique value is used (perhaps above 93).

# Group Policy Preferences

Group Policy Preferences is the most straight forward method of implementing the workaround. Most environments are already managing the App-V client with Group Policy, so adding a Preference item in the same GPO make sense.

Add a new GPP Registry item with the necessary Registry configuration. Ensure the value name is unique (any number above the existing values). This could be a high number (e.g. 256) to ensure there is no clash with an existing value.

[<img class="alignnone size-full wp-image-3717" src="http://stealthpuppy.com/wp-content/uploads/2014/10/2984972-Key.png" alt="Adding TermSrvReadyEvent via Group Policy Preferences" width="414" height="462" srcset="https://stealthpuppy.com/wp-content/uploads/2014/10/2984972-Key.png 414w, https://stealthpuppy.com/wp-content/uploads/2014/10/2984972-Key-134x150.png 134w, https://stealthpuppy.com/wp-content/uploads/2014/10/2984972-Key-268x300.png 268w" sizes="(max-width: 414px) 100vw, 414px" />](http://stealthpuppy.com/wp-content/uploads/2014/10/2984972-Key.png)

I recommend enabling _Item-level targeting_ to ensure the value is added to the right machines.

[<img class="alignnone size-full wp-image-3718" src="http://stealthpuppy.com/wp-content/uploads/2014/10/2984972-ItemLevelTargeting.png" alt="Enabling Item Level Targeting" width="414" height="462" srcset="https://stealthpuppy.com/wp-content/uploads/2014/10/2984972-ItemLevelTargeting.png 414w, https://stealthpuppy.com/wp-content/uploads/2014/10/2984972-ItemLevelTargeting-134x150.png 134w, https://stealthpuppy.com/wp-content/uploads/2014/10/2984972-ItemLevelTargeting-268x300.png 268w" sizes="(max-width: 414px) 100vw, 414px" />](http://stealthpuppy.com/wp-content/uploads/2014/10/2984972-ItemLevelTargeting.png)

For example, only apply the update if the HKLM\SOFTWARE\Microsoft\AppV\Subsystem\ObjExclusions key actually exists. This ensures the value is only added once the App-V client is installed.

[<img class="alignnone size-full wp-image-3719" src="http://stealthpuppy.com/wp-content/uploads/2014/10/2984972-TargetingEditor.png" alt="Adding a Key Exists match to Item Level Targeting" width="613" height="462" srcset="https://stealthpuppy.com/wp-content/uploads/2014/10/2984972-TargetingEditor.png 613w, https://stealthpuppy.com/wp-content/uploads/2014/10/2984972-TargetingEditor-150x113.png 150w, https://stealthpuppy.com/wp-content/uploads/2014/10/2984972-TargetingEditor-300x226.png 300w" sizes="(max-width: 613px) 100vw, 613px" />](http://stealthpuppy.com/wp-content/uploads/2014/10/2984972-TargetingEditor.png)

# PowerShell

PowerShell makes it easy to generate a unique number by first counting the exiting entries. Here&#8217;s some code that will count the existing entires and use that count as the unique number Note the _(Default)_ entry is also returned, so I can be confident that I&#8217;m using a value that is one higher than the existing entries.

<pre class="lang:ps decode:true  ">$items = Get-Item -Path Registry::HKLM\Software\Microsoft\AppV\Subsystem\ObjExclusions
New-ItemProperty -Path Registry::HKLM\Software\Microsoft\AppV\Subsystem\ObjExclusions -Name $items.ValueCount -PropertyType String -Value "TermSrvReadyEvent"</pre>

&nbsp;