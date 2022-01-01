---

title: App-V Sequencer fails to install
date: 2008-12-10T14:13:44+10:00
author: Aaron Parker
layout: post

permalink: /app-v-sequencer-fails-to-install/
dsq_thread_id:
  - "195381362"
categories:
  - Applications
tags:
  - App-V
---
Attempting to install the App-V Sequencer may not be successful and result the message “The wizard was interrupted before Microsoft Application Virtualization Sequencer could be completely installed”. Of course the message in the dialog isn’t particularly helpful, so what’s going on?

<img style="display: inline" title="SequencerInstallError" src="{{site.baseurl}}/media/2008/12/sequencerinstallerror.png" border="0" alt="SequencerInstallError" width="504" height="338" /> 

Taking a deeper look at the issue by enabling a log file, reveals the problem – if Setup detects that the App-V client installed, it will abort. Here’s what you’ll see in the log:

[quickcode:noclick]SoftGrid Action: SWGetProductVersion Details: Checking registry root = Software\Microsoft\SoftGrid\4.5\Client\Configuration  
SoftGrid Action: SWGetProductVersion Details: Version = 4.5.0.1485  
SoftGrid Action: SWGetProductVersion Details: Action ended  
SoftGrid Action: SWISequencerLaunchConditions Details: Client is installed, rejecting sequencer install  
MSI (c) (A8!00) [11:39:16:780]: PROPERTY CHANGE: Adding SWIClientInstalled property. Its value is '1'.[/quickcode]

Of course <span style="text-decoration: line-through;">I shouldn’t have been attempting to</span> you shouldn’t install the Sequencer and Client on the same machine. The best way to fix this is to start with a clean Windows install and then install the Sequencer.