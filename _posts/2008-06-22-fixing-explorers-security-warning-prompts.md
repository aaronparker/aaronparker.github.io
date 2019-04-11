---
id: 588
title: Fixing Windows Explorer security warning prompts
date: 2008-06-22T22:11:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=588
permalink: /fixing-explorers-security-warning-prompts/
dsq_thread_id:
  - "195380731"
categories:
  - Microsoft
---
Last week I wrote about [avoiding Explorer's Security Warning prompts]({{site.baseurl}}/windows/avoiding-explorers-security-warning-prompts), this time around I want to document a related fix that I've had to implement because Explorer's expected behaviour was not just not working.

First a quick background on what we're trying to solve. By default, Windows Explorer will place network locations (mapped drives and UNC paths) with a period (.) in the path, into the the Internet zone. This means that when users access files from these locations, they will see security warnings like these:

<img src="{{site.baseurl}}.com/media/2008/06/securityrisk.png" border="0" alt="SecurityRisk" width="345" height="136" /> 

![]({{site.baseurl}}/media/2008/06/securitywarning.png) 

These warnings attempt to ensure users are aware of the potential risks when opening files from un-trusted locations. You can make a location trusted by adding it to the Local Intranet or Trusted Sites zones. This is exactly what you would do via script, Group Policy or some other workspace management tool, for your internal network locations, so that users do not see these prompts. However, a bug exists where drives mapped to these network locations are not placed into the right zone.

If you map a drive to a UNC path that that includes two or more periods in the name you will see that the network drive is marked as being in the Internet zone even though you may have added the location to the Local Intranet zone. In my example here, I've mapped drive S: to [\\dc.dev.local\Apps](file://\\dc.dev.local\Apps), and as you can see, it’s in the Internet zone:

<img src="{{site.baseurl}}.com/media/2008/06/internetzonedrive.png" border="0" alt="InternetZoneDrive" width="304" height="336" /> 

If I open the same location via a UNC path you will see that Explorer sees it as being in the Local Intranet zone:

<img src="{{site.baseurl}}.com/media/2008/06/intranetzoneunc.png" border="0" alt="IntranetZoneUNC" width="304" height="321" /> 

Oddly enough, if I map a network drive to a path with only a single period on that path, the detection process works correctly and the location is seen as Intranet. In the example here, I'm mapping a drive to the same location as the previous two screen shots, but via a DFS path - [\\dev.local\Public\Apps](file://\\dev.local\Public\Apps) that redirects to [\\dc.dev.local\Apps](file://\\dc.dev.local\Apps).

<img src="{{site.baseurl}}.com/media/2008/06/intranetzonedrive.png" border="0" alt="IntranetZoneDrive" width="304" height="321" /> 

This issue is addressed in the following knowledge base article:

[Windows Internet Explorer 7 may not correctly recognize the zone to which a network resource belongs when you access the resource by using a mapped drive in Windows Vista or in Windows XP with Service Pack 2](http://support.microsoft.com/kb/929798)

The article details a hotfix that is available for Windows Vista and Windows XP Service Pack 2 and the issue has been addressed in Windows Vista Service Pack 1 and Windows XP Service Pack 3. For Windows Server 2003 the issue is fixed in the [latest cumulative security update for Internet Explorer](http://www.microsoft.com/technet/security/bulletin/MS08-031.mspx). To install the fix when deploying this update you need to use the [QFE](http://searchwinit.techtarget.com/sDefinition/0,,sid1_gci753550,00.html) switch:

[code]IE7-WindowsServer2003-KB950759-x86-ENU.exe /B:SP2QFE[/code]

To enable the fixed behaviour for each of the operating system versions, including Vista SP1 and XP SP3, you also have to add the following registry value. See the KB article for more details.

[code]Windows Registry Editor Version 5.00  
[HKEY\_LOCAL\_MACHINE\SOFTWARE\Microsoft\Internet Explorer\MAIN\FeatureControl\FEATURE\_RESPECT\_ZONEMAP\_FOR\_MAPPED\_DRIVES\_KB929798]  
"*"=dword:00000001[/code]

For anyone who can’t yet deploy Windows Vista SP1 or Windows XP SP3, you may be able (I haven’t tested) to deploy the IE cumulative security update instead of the hotfix.