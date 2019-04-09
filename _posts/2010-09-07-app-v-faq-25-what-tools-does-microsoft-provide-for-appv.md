---
id: 1810
title: 'App-V FAQ: What tools does Microsoft provide for App-V?'
date: 2010-09-07T11:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=1810
permalink: /app-v-faq-25-what-tools-does-microsoft-provide-for-appv/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195394398"
categories:
  - FAQs
tags:
  - App-V
  - AppVFAQ
---
<img style="margin: 0px 0px 5px 10px; display: inline;" src="https://stealthpuppy.com/media/2010/06/AppVFAQLogo.png" alt="" align="right" />Microsoft provides several tools that are useful for managing your App-V environment. Although Microsoft does make these applications freely available, they are not supported through the official Microsoft Support channels. Use the [Microsoft Application Virtualization TechNet forums](http://social.technet.microsoft.com/Forums/en-gb/category/appvirtualization) to provide feedback or report any problems. The tools include:

### Application Virtualization Sequencing SuperFlow

**Download**: [Application Virtualization Sequencing SuperFlow](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=8c4dfab6-7ef5-4188-a531-346cf9bfe7bf)

This SuperFlow provides detailed information about the Application Virtualization Sequencing process. The [SuperFlow interactive content model](http://www.microsoft.com/downloads/en/results.aspx?pocId=&freetext=superflow&DisplayLang=en) provides a structured and interactive interface for viewing documentation. You will find overview information, steps that include detailed information, procedures, sample log entries, best practices, real-world scenarios, troubleshooting information, security information, animations, and other information.

### Application Virtualization Dashboard

**Download**: [Microsoft Application Virtualization Dashboard](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=45a90ae8-6d09-4f9a-947b-a2d7fc80ba48)

The App-V Dashboard’s built-in charts, gauges, and tables let you track any App-V dataset in near-real time, so you can easily stay on top of the usage, health, and compliance of all your virtualized applications.

### Application Virtualization Dynamic Suite Composition Tool

**Download**: [Application Virtualization Application Listing Tool](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=daa898df-455f-438a-aa2a-421f05894098)

App-V OSD files can be edited manually to enable [Dynamic Suite Composition](http://technet.microsoft.com/en-us/library/cc843662.aspx), or you can ensure that edits to OSD and Windows Installer (MSI) files are done correctly with the [Application Virtualization Dynamic Suite Composition Tool](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=daa898df-455f-438a-aa2a-421f05894098). The is a GUI application that you can use to specify dependencies between primary and secondary packages and it supports mandatory and non-mandatory packages.

### Application Virtualization Administrative Template (ADM Template)

**Download**: [Application Virtualization ADM Template](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=67cdf9d2-7e8e-4d76-a552-fd82dbbff9bc)

The Microsoft Application Virtualization ADM template configures client settings for the App-V Windows Desktop Client and for the Remote Desktop Services client. The ADM template [centrally manages common client configurations by using an existing Group Policy]({{site.baseurl}}/deployment/app-v-faq-14-can-i-configure-the-app-v-client-via-group-policy) infrastructure and includes settings for communication, client interface, and permissions.

### Application Virtualization Application Listing Tool

**Download**: [Application Virtualization Application Listing Tool](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=5da48313-cf6d-445d-af97-594f194ac759)

The App-V Application Listing Tool (ListVApps) is a tool which lists all the virtual processes that are running at a specific time on a specific computer. You can use the tool to get information about the priority and owner of each process, the size of its virtual memory, its session identifier and processing time. User with administrator privileges will see all running virtual applications. The tool provides a listing similar to this:

![]({{site.baseurl}}/media/2010/02/ListApps.png) 

### Application Virtualization Cache Configuration Tool

**Download**: [Application Virtualization Cache Configuration Tool](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=5e7089fa-c6ab-4150-8562-3b5bc14cd881)

The App-V client cache tool (AppVCacheSize) allows administrators to increase the Microsoft Application Virtualization client cache size through a scriptable command line interface. AppVCacheSize uses the specified parameters to configure the desired cache size, as well as toggle between using a free disk space threshold or set a maximum cache size. This tool is useful is you are [deploying the App-V Client]({{site.baseurl}}/deployment/app-v-faq-12-how-do-i-create-a-silent-installation-for-the-app-v-client) with a standard cache size and need to change the cache size post install.

### Application Virtualization Client Log Parser Utility

**Download**: [Application Virtualization Client Log Parser Utility](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=72876c60-3a87-4705-b722-f73eb56219bf)

You can use the fields and values contained in the output file to filter information obtained from the log files. The output file generated by the application log parser utility contains the following fields: System, OS, Build, Date, Time, Module, Log Level, hApp, App, User, Thread, and Message. The information contained in the output file can also be imported into Microsoft Excel for subsequent evaluation. This log parser simplifies the task of looking through log files, being able to filter by log level, build report, launch failures, mini-dumps, minimum disconnected operation mode entries and more. Afterwards, the appropriate party can import the data for analysis and/or utilization.

You can find some information on using this tool here: [Getting to Grips with the App-V Client Log Parser Utility (Launch Times)](http://blogs.technet.com/virtualworld/archive/2009/04/20/getting-to-grips-with-the-app-v-client-log-parser-utility-launch-times.aspx) and here: [Getting to Grips with the App-V Client Log Parser Utility (Error Codes)](http://blogs.technet.com/virtualworld/archive/2009/04/20/getting-to-grips-with-the-app-v-client-log-parser-utility-error-codes.aspx)

### Application Virtualization SFT Parser Tool

**Download**: [Application Virtualization SFT Parser Tool](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=e5a7db27-304b-4cd1-9c80-7ba5fdaea97f)

You can use the Application Virtualization SFT Info utility to extract the following information from SFT files:

  * **Validation of SFT files**—Process corrupted SFT files, and recover information from corrupted SFT files.
  * **XML export of contents of SFT**—Export the contents of an existing SFT file. You can evaluate SFT segments or SFT metadata and construct a textual tree view of all file information SFT file.
  * **Listing of all of the files in the SFT**—Identify and print the files contained in the SFT with their full paths. This is a good method to quickly identify the contents of a package.
  * **Statistics about properties of the SFT metadata**—Identify statistical information, such the largest file contained in a package. This can be very useful for identifying packages that are too large in size and are causing issues loading on the client.
  * **Get relevant information on a file in the package**—Display size, timestamps, attributes, and version information associated with the package.
  * **Ability to skip processing of file data if using functionality that requires only the metadata**—Allows working with very large packages quickly.

### Application Virtualization SFT View

**Download**: [Application Virtualization SFT View](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=26d8bfe3-02dd-4073-95f8-594bbb12933a)

You can use App-V SFT View to provide programs and automated tools with read-only access to .sft files. For example, you can install SFT View on App-V Management Servers to allow vulnerability scanners and file-based asset inventory tools to scan .sft files. You can also use App-V SFT View to interactively inspect .sft file contents by using any shell interface, for example, Windows Explorer or the command line. All valid .sft and .dsft file name extensions will be scanned by App-V SFT View and will be made available for inspection. For every valid .sft file, a corresponding .dir folder will be displayed. For example, if a file that is named Office.sft is located, a new folder will be displayed in a directory that is named Office.sft.dir.

![]({{site.baseurl}}/media/2010/02/SFTDir_thumb.png) 

SFT View runs in the background to automatically generate the .dir folder views of any .sft or .dsft files that are present in a directory; it does not require any user interaction. SFT View does not extract any .sft or .dsft file contents to disk; instead, it creates a view of the contents and represents them as .dir folders.

### Application Virtualization MSI Compat Transform

**Download**: Application Virtualization MSI Compat Transform

The App-V MSI Compat Transform is used to make App-V 4.5 Sequencer generated MSIs adaptable for App-V 4.6 Client. Running an .msi generated by the in App-V 4.5 sequencer produces a load/install error when trying to run it on an App-V 4.6 Client.

### Application Virtualization Best Practices Analyzer

**Download**: [Microsoft Application Virtualization Best Practices Analyzer](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=1a091960-1c9f-4bfc-9247-284e83c07d02)

The Application Virtualization Best Practices Analyzer is a diagnostic tool that verifies configuration settings for a computer running a Microsoft Application Virtualization Streaming Server version 4.5 or Microsoft Application Virtualization Management Server version 4.5.

### Application Virtualization 4.5 Security Configuration Roles

**Download**: [Microsoft Application Virtualization 4.5 Security Configuration Roles](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=63d33346-b864-4284-8c5f-dce80c451e83)

The Microsoft Application Virtualization 4.5 Security Configuration Roles (SCW) can be used to help protect and harden your Application Virtualization environment on Windows Server 2003 and 2008 by closing or disabling unnecessary ports and services reducing the overall attack surface.

### MSI Utility for Microsoft Application Virtualization

**Download (for App-V 4.2 only)**: [MSI Utility for Microsoft App-V](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=37a9e590-4f55-44ac-93e1-36eb63a09240)

The MSI Utility enables the distribution of virtual applications without streaming. Instead, it uses Windows Installer to load and configure virtual applications. By leveraging this standard format, the MSI Utility achieves Microsoft Systems Management Server 2003 and Microsoft System Center Configuration Manager 2007 platform version-agnostic distribution of virtual applications if supported by organizational Electronic Software Distribution (ESD) systems. As such, the MSI Utility is a stepping stone to the richer deployment options available in Microsoft System Center Virtual Application Server 4.5.

### Resources

  * [Application Virtualization downloads](http://www.microsoft.com/downloads/en/results.aspx?freetext=%22application+virtualization%22&displaylang=en&stype=s_basic) on the Microsoft Downloads Centre