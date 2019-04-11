---
id: 2452
title: The Case of the Disappearing Application during Sequencing
date: 2011-11-04T10:52:42+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2452
permalink: /the-case-of-the-disappearing-application-during-sequencing/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "461752431"
categories:
  - Applications
tags:
  - App-V
---
In the official Microsoft TechNet forums, a question had been asked [about sequencing Google Chrome](http://social.technet.microsoft.com/Forums/en-GB/appvgeneralsequencing/thread/1683399a-fcaa-48bb-a354-733a57e9fd4b) and the poster states that when using the [Chrome Enterprise Installer](http://www.google.com/chrome/eula.html?msi=true) (a downloadable MSI for deployment inside an organisation), Chrome installs OK during the monitoring phase, but the folder is deleted at the end of monitoring and thus isn't captured.

I thought that that behaviour was a little strange, so decided to test this out myself and to my surprise I could replicate the issue. To track down what was going on, I had to perform some troubleshooting.

I tested this on a virtual machine running Windows 7 SP1 x86 and could see from browsing to the Google installation folder (C:\Program Files\Google\Chrome) that the Application sub-folder was being removed after the monitoring phase was complete. To work out which process was deleting the folder, I've used [Process Monitor](http://technet.microsoft.com/en-us/sysinternals/bb896645). To see what was going on, I've reset my VM back to a clean snapshot, started the App-V Sequencer and Process Monitor and set a filter in Process Monitor for **Path** beginning with **C:\Program Files\Google\Chrome\Application** and then re-started the sequencing process.

<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="ProcessMonitorFilter" src="{{site.baseurl}}.com/media/2011/11/ProcessMonitorFilter1.png" alt="ProcessMonitorFilter" width="639" height="370" border="0" /> 

With this filter, I was able to see that the process that was deleting the folder is the Sequencer itself (SFTSequencer.exe). Click the screenshot for a larger view.

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="ProcessMonitorDeletes" src="{{site.baseurl}}.com/media/2011/11/ProcessMonitorDeletes_thumb.png" alt="ProcessMonitorDeletes]({{site.baseurl}}/media/2011/11/ProcessMonitorDeletes.png)

The next most obvious place to look then is the Sequencer log file, hopefully it will hold some information about why the folder is being deleted. To view the Sequencer log, browse to **C:\Program Files\Microsoft Application Virtualization Sequencer\Logs** and open **sft-seq-log.txt**.

In this file I can see a number of lines where the Sequencer is attempting to copy files that no longer exist:

\[code\]\[11/03/2011 21:45:34 VRB VFSX\] ...failed getting long path name for the file (C:\Program Files\Google\Chrome). Error: 2  
[11/03/2011 21:45:34 VRB CORE] GetShortPathName failure using: C:\Program Files\Google\Chrome. Error is: 2  
[11/03/2011 21:45:34 VRB CORE] Could not copy C:\Program Files\Google\Chrome to Q:\Google Chrome\VFS\CSIDL\_PROGRAM\_FILES\Google\Chrome.  Error is: 2.  
[11/03/2011 21:45:34 VRB VFSX] ...failed getting long path name for the file (C:\Program Files\Google\Chrome\Application). Error: 3  
[11/03/2011 21:45:34 VRB CORE] GetShortPathName failure using: C:\Program Files\Google\Chrome. Error is: 2  
[11/03/2011 21:45:34 VRB CORE] Could not copy C:\Program Files\Google\Chrome to Q:\Google Chrome\VFS\CSIDL\_PROGRAM\_FILES\Google\Chrome.  Error is: 2.  
[11/03/2011 21:45:34 VRB CORE] CopyResourceToVFS failed.  
[11/03/2011 21:45:34 VRB VFSX] ...failed getting long path name for the file (C:\Program Files\Google\Chrome\Application\15.0.874.106). Error: 3  
[11/03/2011 21:45:34 VRB CORE] GetShortPathName failure using: C:\Program Files\Google\Chrome. Error is: 2  
[11/03/2011 21:45:34 VRB CORE] Could not copy C:\Program Files\Google\Chrome to Q:\Google Chrome\VFS\CSIDL\_PROGRAM\_FILES\Google\Chrome.  Error is: 2.  
[11/03/2011 21:45:34 VRB CORE] CopyResourceToVFS failed.[/code]

A few lines previous to these is this line:

\[code\]\[11/03/2011 21:45:26 VRB RTSK\] Reboot processing detected need to delete \??\C:\Program Files\Google\Chrome.[/code]

The Sequencer is doing exactly what's it being told to do – process a reboot task at the end of the monitoring phase and delete the application. Interestingly though, only the Application sub-folder is being deleted, not the entire Chrome parent folder.

To get an idea of why, I've used [WhyReboot](http://exodusdev.com/products/whyreboot), a fantastic free tool for finding out why a reboot has been requested. How many times have you suspected that an application installer asks to reboot Windows when it's not actually needed?

Going through the sequencing process again and running WhyReboot before ending monitoring, gives me an idea of why the reboot has been requested:

<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="WhyReboot" src="{{site.baseurl}}.com/media/2011/11/WhyReboot1.png" alt="WhyReboot" width="609" height="381" border="0" /> 

**Note**: I could also use [PendMoves](http://technet.microsoft.com/en-us/sysinternals/bb897556) another Sysinternals tool to query this information as well.

[PendingFileRenameOperations](http://technet.microsoft.com/en-us/library/cc960241.aspx) is a Registry value that lists file system operations that must be processed during a reboot or shutdown. Generally these types of operations need to be processed on reboot because there are open file handles that are only released once the system shuts down.

So what's writing this entry to PendingFileRenameOperations and why does this only happen during sequencing? To find out, I've reached for Process Monitor again, but unfortunately I haven't been able find which process is writing to the PendingFileRenameOperations value, as Process Monitor didn't find any RegSetValue operations.

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="ProcessMonitorPendingFileRenameOperations" src="{{site.baseurl}}.com/media/2011/11/ProcessMonitorPendingFileRenameOperations_thumb.png" alt="ProcessMonitorPendingFileRenameOperations]({{site.baseurl}}/media/2011/11/ProcessMonitorPendingFileRenameOperations.png)

Circumstantial evidence points to SETUP.EXE, but without Process Monitor giving me more information I can't say for sure. I do however, have a workaround that allow me to sequence Chrome – before finishing the monitoring phase, I clear the PendingFileRenameOperations data with this command:

[code]REG ADD "HKLM\System\CurrentControlSet\Control\Session Manager" /v PendingFileRenameOperations /d "" /t REG\_MULTI\_SZ /f[/code]