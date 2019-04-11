---
id: 1853
title: 'App-V FAQ: How do I troubleshoot the App-V Management Server?'
date: 2010-09-01T11:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/app-v-faq-23-how-do-i-troubleshoot-the-app-v-management-server
permalink: /app-v-faq-23-how-do-i-troubleshoot-the-app-v-management-server/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195464115"
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
categories:
  - FAQs
tags:
  - App-V
  - AppVFAQ
---
<img style="margin: 0px 10px 5px 0px; display: inline;" src="{{site.baseurl}}/media/2010/06/AppVFAQLogo.png" alt="" align="right" />Common scenarios for troubleshooting the Management Server (or the Streaming Server) are connectivity issues between the client and server, opening the Management Console from a remote machine and upgrading the Management Server.

### Before you Deploy

If you’re new to App-V I recommend reading the existing documentation on how to deploy the Management Server software to save you from having to troubleshoot issues later on. The [Microsoft Application Virtualization Version 4.6 SP1 Trial Guide](http://download.microsoft.com/download/F/7/8/F784A197-73BE-48FF-83DA-4102C05A6D44/App-V/App-V%204.6%20SP1%20Trial%20Guide.docx) is available for download, or you can follow these articles available on TechNet:

  1. [How to Install Application Virtualization Management Server](http://technet.microsoft.com/en-gb/library/cc843803.aspx)
  2. [How to Install the Application Virtualization Streaming Server](http://technet.microsoft.com/en-gb/library/cc817085.aspx)
  3. [How to Install the Management Web Service](http://technet.microsoft.com/en-gb/library/cc817146.aspx)
  4. [How to Install a Database](http://technet.microsoft.com/en-gb/library/cc843742.aspx)
  5. [How to Configure the Application Virtualization Management Servers](http://technet.microsoft.com/en-gb/library/cc817095.aspx)
  6. [How to Configure the Application Virtualization Streaming Servers](http://technet.microsoft.com/en-gb/library/cc843709.aspx)
  7. [How to Configure the IIS Server](http://technet.microsoft.com/en-gb/library/cc843650.aspx)
  8. [How to Configure the Server to be Trusted for Delegation](http://technet.microsoft.com/en-gb/library/ee675779.aspx)
  9. [Configuring the Firewall for the App-V Servers](http://technet.microsoft.com/en-gb/library/ff361465.aspx)
 10. [How to Install and Configure the Default Application](http://technet.microsoft.com/en-gb/library/ff361458.aspx)

### Troubleshooting Tools

There are three tools that you should reach for when troubleshooting the Management Server or the Streaming Server:

  * The Application Event log on the server
  * The App-V Management Server log
  * The App-V Ping Tool

When viewing the Application event log, filter the log (right-click / _Filter Current Log…_) and use these Event sources - Application Virtualization and Application Virtualization Server.

<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="AppV-ApplicationEventLog" src="{{site.baseurl}}/media/2010/08/AppVApplicationEventLog.png" alt="AppV-ApplicationEventLog" width="660" height="416" border="0" /> 

The App-V Management Server event log is located in:

  * x86: C:\Program Files\Microsoft System Center App Virt Management Server\App Virt Management Server\logs
  * x64: C:\Program Files (x86)\Microsoft System Center App Virt Management Server\App Virt Management Server\logs

<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="AppV-Server-Logfile-location" src="{{site.baseurl}}/media/2010/08/AppVServerLogfilelocation.png" alt="AppV-Server-Logfile-location" width="660" height="177" border="0" /> 

There are a couple of great posts on using the log files to troubleshoot issues with the log file: [Troubleshooting App-V with log files](http://blogs.technet.com/b/appv/archive/2009/01/26/troubleshooting-app-v-with-log-files.aspx)  and [Getting to Grip with the App-V Server Log File (sft-server.log)](http://blogs.technet.com/b/virtualworld/archive/2009/04/10/getting-to-grip-with-the-app-v-server-log-file-sft-server-log.aspx).

Although you can use Telnet to check connectivity issues, you should first reach for the App-V Ping Tool by [Immidio](http://immidio.com/). This command-line application comes as a part of the [Immidio Resource Kit](http://immidio.com/resourcekit/), which is free. I can’t speak highly enough of the App-V Ping Tool, it’s the fastest and easiest way to determine whether the Management Server is contactable.

<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="AppV-PingTool-Output" src="{{site.baseurl}}/media/2010/08/AppVPingToolOutput.png" alt="AppV-PingTool-Output" width="660" height="367" border="0" /> 

### Resources

The following articles and blog posts are excellent resources for troubleshooting the Management Server:

  * [App-V 4.5 SP2 Release Notes](http://technet.microsoft.com/en-us/library/ff699130.aspx)
  * [Application Virtualization Server-Based Scenario](http://technet.microsoft.com/en-gb/library/cc843634.aspx)
  * [Troubleshooting Information for the Application Virtualization Server](http://technet.microsoft.com/en-gb/library/dd351443.aspx)
  * [New video on how to fix common App-V configuration issues](http://blogs.technet.com/b/appv/archive/2010/06/30/new-video-on-how-to-fix-common-app-v-configuration-issues.aspx)
  * [Configuring the Firewall for the App-V Servers](http://technet.microsoft.com/en-us/library/ff361465.aspx)
  * This is a great article > [App-V Troubleshooting, Known Issues and General Resources](http://blogs.technet.com/b/appvcallback/archive/2010/08/03/app-v-troubleshooting-known-issues-and-general-resources.aspx)
  * [App-V Server and Management threads on the TechNet Forums](http://social.technet.microsoft.com/Forums/en-gb/appvserverandmanagement/threads)
  * [Resolving a couple common SoftGrid/App-V Management Console issues](http://blogs.technet.com/b/appv/archive/2009/04/30/resolving-a-couple-common-softgrid-app-v-management-console-issues.aspx)
  * [Network devices that use RTSP Inspection may cause problems in specific App-V scenarios](http://blogs.technet.com/b/appv/archive/2010/03/24/network-devices-that-use-rtsp-inspection-may-cause-problems-in-specific-app-v-scenarios.aspx)
  * [App-V server install error "The Installation program was unable to create the required IIS virtual directory"](http://blogs.technet.com/b/appv/archive/2008/11/19/app-v-server-install-error-the-installation-program-was-unable-to-create-the-required-iis-virtual-directory.aspx)
  * [Error 25109: The installation program could not create the configuration data store](http://blogs.technet.com/b/appv/archive/2008/10/23/error-25109-the-installation-program-could-not-create-the-configuration-data-store.aspx)
  * [How to configure the App-V Management Server Service to run as a Service Account](http://blogs.technet.com/b/appv/archive/2008/08/21/how-to-configure-the-app-v-management-server-service-to-run-as-a-service-account.aspx)
  * [Troubleshooting Common RTSPS Issues with App-V](http://blogs.technet.com/b/appv/archive/2010/03/09/troubleshooting-common-rtsps-issues-with-app-v.aspx)
  * [Troubleshooting App-V with log files](http://blogs.technet.com/b/appv/archive/2009/01/26/troubleshooting-app-v-with-log-files.aspx)
  * [Getting to Grip with the App-V Server Log File (sft-server.log)](http://blogs.technet.com/b/virtualworld/archive/2009/04/10/getting-to-grip-with-the-app-v-server-log-file-sft-server-log.aspx)
  * [Publishing Refresh succeeded but where are my icons? Troubleshooting some common publishing issues in Microsoft App-V](http://blogs.technet.com/b/appv/archive/2010/06/03/publishing-refresh-succeeded-but-where-are-my-icons-troubleshooting-some-common-publishing-issues-in-microsoft-app-v.aspx)
  * [Pre-creation of Server objects may yield certain sub-optimal values in the App-V SQL Database](http://blogs.technet.com/b/appv/archive/2010/05/10/pre-creation-of-server-objects-may-yield-certain-sub-optimal-values-in-the-app-v-sql-database.aspx)
  * [The Top Three Rookie Mistakes - Part 1](http://blogs.technet.com/b/appv/archive/2008/09/08/the-top-three-rookie-mistakes-part-2.aspx)
  * [The Top Three Rookie Mistakes - Part 2](http://blogs.technet.com/b/appv/archive/2008/09/08/the-top-three-rookie-mistakes-part-2.aspx)
  * SQL Server permissions: [Setting Up Windows Service Accounts](http://msdn.microsoft.com/en-us/library/ms143504.aspx)

### Knowledgebase Articles

The KB articles will help you solve specific issues that you may experience:

  * [How to interpret the messages in the SoftGrid Virtual Application Server log](http://support.microsoft.com/kb/930871)
  * [Microsoft Application Virtualization Management Service fails to Start when installed on the same machine as SQL Server 2005](http://support.microsoft.com/kb/959459/)
  * [Application Virtualization Clients are not able to stream content from an Application Virtualization 4.5 Streaming Server](http://support.microsoft.com/kb/959413/)
  * [Error 25100 or 25122 when installing the Microsoft Application Virtualization Management service](http://support.microsoft.com/kb/2212140/)
  * [Error message when you upgrade the SQL Server database role from Application Virtualization Management Server 4.1 to Application Virtualization Management Server 4.5: "Error 25119"](http://support.microsoft.com/kb/976641/)
  * [Error message when you connect to the SoftGrid Management Web Service from the SoftGrid Management Console: "Error code: 0000C800"](http://support.microsoft.com/kb/930565/)
  * [How to migrate the Microsoft SoftGrid database from one computer that is running Microsoft SQL Server to another computer that is running SQL Server](http://support.microsoft.com/kb/932136/)
  * [Using the Refresh Server option to refresh a Publishing Server from the Microsoft Application Virtualization Client MMC snap-in results in error code 04-00000917](http://support.microsoft.com/kb/2266600)
  * [Using the Refresh Server option to refresh a Publishing Server from the Microsoft Application Virtualization Client MMC snap-in results in error code 2A-0000274D](http://support.microsoft.com/kb/2266481)
  * [Error message when you try to connect to the SoftGrid Management Web Service from the SoftGrid Management Console: "Error code: 0000C802"](http://support.microsoft.com/kb/930469/)