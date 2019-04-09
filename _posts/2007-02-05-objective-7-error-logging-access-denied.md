---
id: 108
title: 'Objective 7 Error Logging: Access Denied'
date: 2007-02-05T07:01:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/objective-7-error-logging-access-denied
permalink: /objective-7-error-logging-access-denied/
categories:
  - Applications
---
Objective is an [Enterprise Content Management system from Objective](http://www.objective.com/Products/Platform/index.html) that uses a Win32 client that plugs into Office and can also be used as a stand-alone application for access to documents. I'm not a user of the application so I don't really have an opinion on its effectiveness but organisations buy it so it must do the job.

However this application has one small issue out of the box €“ errors are logged to a file located in the Program Files folder (<span style="font-family: Courier New">C:Program FilesObjectiveClient 7error.log</span> by default). This, of course, is a bit of a problem where users don't have write access the folder in question. What's even better is that if authentication fails and the log file write fails, users will receive an error dialog which only has an OK button and essentially doesn't go away, no matter how many times you click it:

<img border="0" src="https://stealthpuppy.com/media/2007/02/1000.14.813.ObjectiveError.png" /> 

You can see from the following [Process Monitor](http://www.microsoft.com/technet/sysinternals/ProcessesAndThreads/processmonitor.mspx) screenshot the write failure in question:

<img border="0" src="https://stealthpuppy.com/media/2007/02/1000.14.814.ObjectiveFileAccess.png" /> 

<strike>Fortunately you can change the location of the log file with this registry string value: <span style="font-family: Courier New">HKCUSoftwareObjectiveClientPreferencesLogFile</span>.</strike> The regsitry that appears to define a location and name for the log file _is not actually read by the client at all_. The issue, though, does beg the question €“ how does an enterprise class application come configured to write a log file to the Program Files folder by default? Would the users profile not be a much better place to write logs or even perhaps the Windows Application log? Maybe a developer or two at Objective needs their administrative access taken away from them.

**UPDATE**: I actually got to speak to someone from Objective today and he's going to pass on this issue to the developers, we'll see what happens.