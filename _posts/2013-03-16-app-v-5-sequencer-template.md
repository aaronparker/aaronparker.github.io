---
id: 3055
title: App-V 5 Sequencer Template
date: 2013-03-16T15:00:15+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=3055
permalink: /app-v-5-sequencer-template/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "1142057801"
categories:
  - Applications
---
The App-V 5 Sequencer, just [like version 4.6 SP1](http://blogs.technet.com/b/appv/archive/2011/05/04/app-v-4-6-sp1-sequencer-project-template-improvements.aspx), includes support for [Sequencer Templates](http://technet.microsoft.com/en-gb/library/jj684290.aspx). These are an ideal approach for ensuring the use of the same set of Sequencer settings and exclusions across all packages.

App-V 5 captures many additional locations that weren't captured by the version 4 Sequencer. This isn't generally an issue for packages; however excluding unneeded data means that data isn't streamed to clients unnecessarily. Listed below is sequencer template that includes a few additional locations that I'd recommend excluding.

In the listing below, the highlighted line is a local folder into which all application installations are executed from (i.e. setup has been copied locally to the sequencing VM). This ensures that any files created by the application setup are not captured during installation.

Attached here is a downloadable copy of the template listing:

<p class="download">
  [download id="61&#8243; format="1&#8243;]
</p>

[code language="xml" highlight="10&#8243;]<?xml version="1.0" encoding="utf-8"?>  
<SequencerTemplate xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">  
<AllowMU>true</AllowMU>  
<AppendPackageVersionToFilename>true</AppendPackageVersionToFilename>  
<AllowLocalInteractionToCom>false</AllowLocalInteractionToCom>  
<AllowLocalInteractionToObject>false</AllowLocalInteractionToObject>  
<FileExclusions>  
<string>[{Profile}]\NTUSER.DAT</string>  
<string>[{Local AppData}]Low</string>  
<string>[{AppVPackageDrive}]\Packages</string>  
<string>[{CryptoKeys}]</string>  
<string>[{Common AppData}]\Microsoft\Crypto</string>  
<string>[{Common AppData}]\Microsoft\Search\Data</string>  
<string>[{Cookies}]</string>  
<string>[{History}]</string>  
<string>[{Cache}]</string>  
<string>[{Local AppData}]</string>  
<string>[{LocalAppDataLow}]</string>  
<string>[{Personal}]</string>  
<string>[{Profile}]\Local Settings</string>  
<string>[{Profile}]\NTUSER.DAT.LOG1</string>  
<string>[{Profile}]\NTUSER.DAT.LOG2</string>  
<string>[{Recent}]</string>  
<string>[{Windows}]\Debug</string>  
<string>[{Windows}]\Logs\CBS</string>  
<string>[{Windows}]\Temp</string>  
<string>[{Windows}]\WinSxS\ManifestCache</string>  
<string>[{Windows}]\WindowsUpdate.log</string>  
<string>[{AppVPackageDrive}]\$Recycle.Bin</string>  
<string>[{AppVPackageDrive}]\System Volume Information</string>  
<string>[{AppData}]\Microsoft\AppV</string>  
<string>[{Local AppData}]\Temp</string>  
<string>[{ProgramFilesX86}]\Microsoft Application Virtualization\Sequencer</string>  
<string>[{AppVPackageDrive}]\Boot</string>  
<string>[{Windows}]\ServiceProfiles</string>  
<string>[{Windows}]\AppCompat</string>  
<string>[{Windows}]\Logs</string>  
<string>[{SystemX86}]\wbem</string>  
<string>[{SystemX86}]\config</string>  
<string>[{SystemX86}]\SMI</string>  
</FileExclusions>  
<RegExclusions>  
<string>REGISTRY\MACHINE\SOFTWARE\Wow6432Node\Microsoft\Cryptography</string>  
<string>REGISTRY\MACHINE\SOFTWARE\Microsoft\Cryptography</string>  
<string>REGISTRY\USER\[{AppVCurrentUserSID}]\Software\Microsoft\Windows\CurrentVersion\Internet Settings</string>  
<string>REGISTRY\USER\[{AppVCurrentUserSID}]\Software\Microsoft\Windows\CurrentVersion\Explorer\StreamMRU</string>  
<string>REGISTRY\USER\[{AppVCurrentUserSID}]\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Explorer\StreamMRU</string>  
<string>REGISTRY\USER\[{AppVCurrentUserSID}]\Software\Microsoft\Windows\CurrentVersion\Explorer\Streams</string>  
<string>REGISTRY\USER\[{AppVCurrentUserSID}]\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Explorer\Streams</string>  
<string>REGISTRY\MACHINE\SOFTWARE\Microsoft\AppV</string>  
<string>REGISTRY\MACHINE\SOFTWARE\Wow6432Node\Microsoft\AppV</string>  
<string>REGISTRY\USER\[{AppVCurrentUserSID}]\Software\Microsoft\AppV</string>  
<string>REGISTRY\USER\[{AppVCurrentUserSID}]\Software\Wow6432Node\Microsoft\AppV</string>  
</RegExclusions>  
<TargetOSes />  
</SequencerTemplate>[/code]