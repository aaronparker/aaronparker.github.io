---
id: 1940
title: 'App-V FAQ: My virtual application won't start. Where do I start troubleshooting?'
date: 2010-09-24T12:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/troubleshoot-with-the-app-v-client-log/
permalink: /troubleshoot-with-the-app-v-client-log/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195711959"
categories:
  - FAQs
tags:
  - App-V
  - AppVFAQ
---
<img style="margin: 0px 10px 5px 0px; display: inline;" src="http://stealthpuppy.com/wp-content/uploads/2010/06/AppVFAQLogo.png" alt="" align="right" />If you have successfully virtualised an application, imported the package into the Management Server but you are having issues publishing the package, streaming the application or getting it to launch, the first place to start is the [the App-V client log](http://technet.microsoft.com/en-us/library/cc817165.aspx).

The client log settings are managed in the Application Virtualization Client console (SFTCMC.MSC) – start the console and the logging settings can be viewed on the General tab:

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="ClientProperties" src="http://stealthpuppy.com/wp-content/uploads/2010/09/ClientProperties_thumb.png" border="0" alt="ClientProperties" width="414" height="479" />](http://stealthpuppy.com/wp-content/uploads/2010/09/ClientProperties.png)

There are actually two places to which the the client will log errors – the Application event log (shown in the image under _System Log Level_) and the client log file; however the log file is generally the easiest to use when troubleshooting because it's a flat text file.

### Using the client log file

The default location for the log file is _%ProgramData%\Microsoft\Application Virtualization Client\sftlog.txt_. To view the log you can use something as simple as Notepad, but if you want to view it in real time, use SMS Trace (Trace32) from the [ConfigMgr 2007 Toolkit](http://www.microsoft.com/downloads/en/details.aspx?displaylang=en&FamilyID=5a47b972-95d2-46b1-ab14-5d0cbce54eb8).

To get more information out of the client, enable verbose mode, which will enable you to better identify the cause.

  1. Open the client console and view the client properties
  2. Set the Log Level to _Verbose_
  3. Click the _Reset Log_ button to start with a clean log file

Resetting the log will rename the existing file and start a new one:

<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="LogLocation" src="http://stealthpuppy.com/wp-content/uploads/2010/09/LogLocation.png" border="0" alt="LogLocation" width="660" height="200" /> 

**Note**: once you have finished troubleshooting, don't forget to set the logging level back to _Information_.

### Here's an example

In my test environment, I have a client machine (WIN71) and an App-V Management Server (APPV). I've imported a virtualised copy of Adobe Reader and assigned it to a set of users. On the client I have configured APPV as a publishing server; however when refreshing the client no shortcuts for Reader are created.

Viewing the App-V client log, I've narrowed down the following lines that show what's going on during the refresh:

\[code\]\[09/23/2010 22:03:50:885 SWAP WRN\] {tid=B60:usr=aaron}  
Could not load OSD file \\domain.local\Public\Apps\AdobeReader9_x86\AdobeReader9.osd

[09/23/2010 22:03:50:900 AMGR INF] {tid=B60:usr=aaron}  
The app manager could not create an application from &#8216;\\domain.local\Public\Apps\AdobeReader9_x86\AdobeReader9.osd' (rc 0C405564-00000002).[/code]

If I set the log to verbose and try the refresh action again, I get more detail:

\[code\]\[09/23/2010 22:45:28:684 AMGR VRB\] {tid=B14:usr=woody}CreateApp(osd=\\domain.local\Public\Apps\AdobeReader9\_x86\AdobeReader9.osd, icon=\\domain.local\Public\Apps\AdobeReader9\_x86\AdobeReader9_x86 Icons\AdobeReader9.ico)

[09/23/2010 22:45:28:685 AMGR VRB] {tid=B14:usr=woody}  
Parsing type from url \\domain.local\Public\Apps\AdobeReader9_x86\AdobeReader9.osd

[09/23/2010 22:45:28:686 SWAP VRB] {tid=B14:usr=woody}  
Initialize(osd=\\domain.local\Public\Apps\AdobeReader9_x86\AdobeReader9.osd, origUrl=NULL)

[09/23/2010 22:45:28:687 OMGR VRB] {tid=B14:usr=woody}  
GetOsdFile(url=\\domain.local\Public\Apps\AdobeReader9_x86\AdobeReader9.osd, origUrl=NULL name=NULL, ver=NULL)

[09/23/2010 22:45:28:688 OSDF VRB] {tid=B14:usr=woody}  
SWOsdFile(url=\\domain.local\Public\Apps\AdobeReader9_x86\AdobeReader9.osd, origUrl=NULL, name=NULL, ver=NULL)

[09/23/2010 22:45:28:710 OSDF VRB] {tid=B14:usr=woody}  
~SWOsdFile()

[09/23/2010 22:45:28:712 OSDF VRB] {tid=B14:usr=woody}  
~SWOsdFile() complete

[09/23/2010 22:45:28:726 SWAP WRN] {tid=B14:usr=woody}  
Could not load OSD file \\domain.local\Public\Apps\AdobeReader9_x86\AdobeReader9.osd

[09/23/2010 22:45:28:727 AMGR INF] {tid=B14:usr=woody}  
The app manager could not create an application from &#8216;\\domain.local\Public\Apps\AdobeReader9_x86\AdobeReader9.osd' (rc 0C405564-00000002).[/code]

If check the actual location of the OSD file, I can see that the package is not in the correct path (its actually located at \\domain.local\Public\Apps\Adobe\AdobeReader9_x86):

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="OSDLocation" src="http://stealthpuppy.com/wp-content/uploads/2010/09/OSDLocation_thumb.png" border="0" alt="OSDLocation" width="660" height="200" />](http://stealthpuppy.com/wp-content/uploads/2010/09/OSDLocation.png)

To fix this issue, I need to update the application properties in the App-V Management console, I can then refresh the client again and the application will be published correctly.

### Error Codes

This was a very simple example and the fix was quite obvious. In all cases though, the client log will include an error code – the same code will often be displayed in a dialog box:

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="ClientError" src="http://stealthpuppy.com/wp-content/uploads/2010/09/ClientError_thumb.png" border="0" alt="ClientError" width="466" height="244" />](http://stealthpuppy.com/wp-content/uploads/2010/09/ClientError.png)

If the problem is not immediately apparent in the log, start looking for a solution by using the error code. Falko Gräfe has an excellent article that explains [how to interpret these error codes](http://www.kirx.org/app-v/read/error-codes-en.html). In most cases, there will be [an associated Microsoft knowledgebase article](http://support.microsoft.com/search/default.aspx?query=%22app-v%22+error+code) that should give a solution for the error.

### Resources

  * [Log File for the Application Virtualization Client](http://technet.microsoft.com/en-us/library/cc817103.aspx)
  * [How to Configure the Client Log File](http://technet.microsoft.com/en-us/library/cc817165.aspx)
  * [Troubleshooting App-V with log files](http://blogs.technet.com/b/appv/archive/2009/01/26/troubleshooting-app-v-with-log-files.aspx)
  * [﻿﻿How to use the Process Monitor tool to generate a log file for an application in the App-V virtual environment](http://support.microsoft.com/kb/939896/)
  * [System Center Configuration Manager 2007 Toolkit V2](http://www.microsoft.com/downloads/en/details.aspx?displaylang=en&FamilyID=5a47b972-95d2-46b1-ab14-5d0cbce54eb8)
  * [Application Virtualization Client Log Parser Utility](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=72876c60-3a87-4705-b722-f73eb56219bf) (and [how to use it](http://blogs.technet.com/b/appv/archive/2008/11/06/app-v-4-5-resource-kit-application-virtualization-client-log-parser-utility.aspx))
  * [App-V Application Publishing and Client Interaction](http://download.microsoft.com/download/f/7/8/f784a197-73be-48ff-83da-4102c05a6d44/AppPubandClientInteraction.docx)
  * [App-V Client Error Codes](http://www.kirx.org/app-v/read/error-codes-en.html)
  * [App-V Error Codes search](http://support.microsoft.com/search/default.aspx?query=%22app-v%22+error+code) on Microsoft Support