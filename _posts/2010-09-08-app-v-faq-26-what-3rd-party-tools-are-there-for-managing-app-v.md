---
id: 1862
title: 'App-V FAQ: What 3rd party tools are there for managing App-V?'
date: 2010-09-08T11:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/app-v-faq-26-what-3rd-party-tools-are-there-for-managing-app-v
permalink: /app-v-faq-26-what-3rd-party-tools-are-there-for-managing-app-v/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195418786"
categories:
  - FAQs
tags:
  - App-V
  - AppVFAQ
---
<img style="margin: 0px 10px 5px 0px; display: inline;" src="{{site.baseurl}}/media/2010/06/AppVFAQLogo.png" alt="" align="right" />Even in the absence of [an App-V SDK](http://download.microsoft.com/download/f/7/8/f784a197-73be-48ff-83da-4102c05a6d44/App-V_Extensibility_Today_Before_the_SDK.docx), the 3rd party tools available for App-V are wide and varied. Here’s what I hope is a complete list. If I missed anything out, please let me know.

### Paid Tools

  * **GridMetric** [Application Virtualization Explorer](http://www.gridmetric.com/products/ave.html) – view and edit SFT and PKG files
  * **GridMetric** [Lib-V](http://www.gridmetric.com/products/libv.html) – integrate SFT management into your own applications
  * **GridMetric** [SFT Encoder](http://www.gridmetric.com/products/sftencoder.html) – a command line SFT encoder tool
  * **AppPlus** [OSD+](http://www.intercept-it.com/AppPlus/Products/OSD/Highlights.aspx) – Launch packages, edit OSD files, create manifest files, plus a number of other functions
  * **Immidio** [AppScriber](http://immidio.com/appscriber/) – Self-service portal for applications
  * **Flexera** [AdminStudio](http://www.flexerasoftware.com/products/adminstudio.htm) – Convert MSIs into App-V packages
  * **TMUrgent** [PimpMy for SoftGrid and App-V](http://tmurgent.com/PimpMy/PimpMy4SG.aspx) – add-ons tools for monitoring your App-V environment and tools for help desk troubleshooting

### Free Tools

  * **Login Consultants** [App-V Add-on ADM 2.0](http://www.loginconsultants.com/index.php?option=com_docman&task=doc_details&gid=70&Itemid=149) – extend Group Policy support beyond the Microsoft provided administrative template
  * **Login Consultants** [App-V Client Diagnostic and Configuration tool (ACDC) 1.1](http://www.loginconsultants.com/index.php?option=com_docman&task=doc_details&gid=69&Itemid=149) – launch applications and provides shortcuts to various App-V client actions for troubleshooting
  * **Login Consultants** [App-V USB Tool 1.0](http://www.loginconsultants.com/index.php?option=com_docman&task=doc_details&gid=40&Itemid=149) – for automatically loading App-V packages from a USB device
  * **Login Consultants** [App-V Migration Tool 1.1](http://www.loginconsultants.com/index.php?option=com_docman&task=doc_details&gid=28&Itemid=149) – automate conversion of application installs to App-V packages
  * **Login Consultants** [App-V OSD Editor 2.1](http://www.loginconsultants.com/index.php?option=com_docman&task=doc_details&gid=27&Itemid=149) – a GUI editor for OSD files
  * **Login Consultants** [App-V Client Setup Kit](http://www.loginconsultants.com/index.php?option=com_docman&task=doc_details&gid=20&Itemid=149) – create automated installs for the App-V client
  * **Immidio** [App-V Ping Tool](http://immidio.com/resourcekit/) – part of the Immidio Resource Kit. Use the App-V Ping Tool to check that the Management Server is contactable
  * **TMUrgent** [AppV\_DeployApp and AppV\_PublishApp](http://www.tmurgent.com/AppVirt/DeployNPublish.aspx) – deploy and publish App-V packages (naturally)
  * **TMUrgent** [LaunchIt](http://www.tmurgent.com/AppVirt/DownloadLaunchIt.aspx) – use this to launch multiple child processes in an App-V package
  * **TMUrgent** [OSD Illustrated](http://tmurgent.com/OSD_Illustrated.aspx) – want to know the options available in the OSD file? This it it
  * **TMUrgent** [PkgView for App-V](http://www.tmurgent.com/TmBlog/?p=166) – view user PKG files
  * **AppPlus** [Batch+](http://www.intercept-it.com/AppPlus/Community/CommunityTools/BatchFreeEdition/BatchHighlights.aspx) – edit OSD files and manage App-V packages (the free version of OSD+)
  * [SoftBar](http://www.jagtechnical.com/softbar/) by **Greg Brownstein** – launch applications and provides shortcuts to various App-V client actions for troubleshooting
  * [SoftGrid Visio Stencils](http://www.datadr.net/index.php?option=com_content&task=view&id=51&Itemid=30) – stencils for placing in your Visio diagrams (of course)
  * [App-V Helper](http://sourceforge.net/projects/softgridhelper/) by [Johri Mayank](http://mayankjohri.wordpress.com/) – an App-V package management and deployment solution
  * [Softricity File (SFT) Checking Utility](http://www.virtualapp.net/sft-check.html) by **Kalle Saunamäki** – command line tool to output information from SFT files
  * [LogTools for SoftGrid Client](http://www.virtualapp.net/client-logtools.html) by **Kalle Saunamäki** – tools for querying the App-V client log file
  * [SFT Encoder Express Edition](http://www.virtualapp.net/sft-encoder.html) by **Kalle Saunamäki** – a command line SFT encoder tool, the free version of SFT Encoder
  * [SeqTypes](http://www.virtualapp.net/seqtypes.html) by **Kalle Saunamäki** – App-V Sequencer attribute tagging editor
  * [Add OS to OSD](http://local.micro.biol.ethz.ch/appv/Add_OS_to_OSD.zip) by **Fabian Meister** – a tool to add OS tags to your OSD files
  * [OSD File Change](http://www.klawun.com/appVTools.html) by **Thomas Klawun** – a tool to add OS tags to your OSD files

### Scripts

  * [PowerShell Script Lists App-V Package Dependencies](http://www.sepago.de/helge/2010/01/06/powershell-script-lists-app-v-package-dependencies-dynamic-suite-composition-dsc/) by [Helge Klein](http://www.sepago.de/helge/)
  * [SoftGridProfileJanitor](http://www.virtualapp.net/scripts.html#SoftGridProfileJanitor) by **Kalle Saunamäki** – cleanup/maintenance script to be run under user's context in order to clear out leftover files from App-V data directory
  * [SoftGridPreloadApps](http://www.virtualapp.net/scripts.html#SoftGridPreloadApps) by **Kalle Saunamäki** – package pre-loading script that can be run on client machines to cache all applications to 100%
  * [SoftGrid/App-V Preload Client script](http://www.koekies.org/pivot/entry.php?id=10) by **Erwin Koekoek** – another package pre-loading script to cache applications to 100%

### Resources

  * [Application Virtualization Volume Format Specification](http://download.microsoft.com/download/7/7/D/77DC8335-89FF-4054-96FE-52D1667EECC0/Application%20Virtualization%20Volume%20Format%20Specification.exe)
  * [Application Virtualization File Format Specification](http://download.microsoft.com/download/E/B/9/EB967B04-2F6E-4DB2-B6A9-72782D3392E1/App-V_file_format_v1.doc)
  * Hat tip to Wilco van Bragt’s articles on SoftGrid/App-V tools – [here](http://sbc.vanbragt.net/mambo/index.php?option=com_content&task=view&id=276&Itemid=49), [here](http://sbc.vanbragt.net/mambo/index.php?option=com_content&task=view&id=425&Itemid=49), [here](http://sbc.vanbragt.net/mambo/index.php?option=com_content&task=view&id=1004&Itemid=49) and [here](http://sbc.vanbragt.net/mambo/index.php?option=com_content&task=view&id=1255&Itemid=49)