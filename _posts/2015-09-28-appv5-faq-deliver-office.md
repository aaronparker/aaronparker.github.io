---
id: 4135
title: 'App-V 5 FAQ: How Do I Deliver Microsoft Office with App-V?'
date: 2015-09-28T20:48:53+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=4135
permalink: /appv5-faq-deliver-office/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "4173114635"
image: /media/2015/06/AppV5FAQ.png
categories:
  - FAQs
tags:
  - App-V
  - Office
---
Here's is a list of articles and resources for delivering the currently supported versions of Microsoft Office with App-V 5.

# General Resources

Note that with Office 2016 and Office 2013, the only supported method for delivering Office with App-V is to use the Office Deployment Tool - you cannot capture the Windows Installer version of Office 2016 or 2013 with the App-V Sequencer.

Here are articles that apply to all versions of Office or that have general recommendations for sequencing any version of Office.

  * [Supported scenarios for deploying Microsoft Office as an App-V package](https://support.microsoft.com/en-us/kb/2772509)
  * [Overview of Click-to-Run](https://technet.microsoft.com/en-au/library/jj219427.aspx)
  * [Overview of Click-to-Run for Office 365 setup architecture](https://technet.microsoft.com/en-au/library/jj219420.aspx)
  * [Deploy Click-to-Run for Office 365 products by using the Office Deployment Tool](https://technet.microsoft.com/en-au/library/jj219423.aspx)

# Microsoft Office 2016

This video provides a great overview on configuring an App-V, or Click-to-Run, package of Office 2016 to then deliver to your App-V clients.



Additional resources:

  * [Office 2016 Deployment Tool](https://www.microsoft.com/en-us/download/details.aspx?id=49117)
  * [Customization overview for Click-to-Run](https://technet.microsoft.com/en-us/library/jj219428(v=office.15))
  * [Office Deployment Tool for Click-to-Run](https://technet.microsoft.com/en-us/library/jj219422(v=office.15))
  * [Click-to-Run for Office 365 Configuration.xml file](https://technet.microsoft.com/en-us/library/jj219426(v=office.15))
  * [Download Click to Run for Office 365 products by using the Office Deployment Tool](https://technet.microsoft.com/en-us/library/jj219424(v=office.15))
  * [Deploy Click-to-Run for Office 365 products by using the Office Deployment Tool](https://technet.microsoft.com/en-us/library/jj219423(v=office.15))

# Microsoft Office 2013

Microsoft introduced the Click-to-Run tool with Office 2013. This was the first version of Office that leveraged what is a modified, self-contained version of App-V to deliver Office. While the Windows Installer version of Office is still available, the Click-to-Run version is preferred for retail and Office 365 customers.

  * [Deploying Microsoft Office 2013 by Using App-V](https://technet.microsoft.com/en-au/library/dn817830.aspx)
  * [How to deploy and manage Office 2013 on App-V 5.0](http://support.microsoft.com/kb/2915745)
  * [Virtualizing Microsoft Office for Application Virtualization (App-V) 5.0](http://technet.microsoft.com/library/dn481351.aspx)
  * [Office Deployment Tool for Click-to-Run](http://go.microsoft.com/fwlink/p/?LinkID=330672)
  * [Everything You Need to Know for a Successful Microsoft Office 2013 App-V Deployment](http://channel9.msdn.com/Events/TechEd/NorthAmerica/2014/WIN-B330#fbid=)
  * [Office 365 ProPlus: Click-to-run deployment and management](https://technet.microsoft.com/en-au/video/tdbe13-office-365-proplus-click-to-run-deployment-and-management.aspx)
  * [Deploying and Updating Microsoft Office 365 ProPlus with Click-to-Run](https://channel9.msdn.com/Events/TechEd/NorthAmerica/2013/OUC-B302#fbid=)

# Microsoft Office 2010

An Office 2010 package will need to be created via the App-V Sequencer. Information on how to do so can be found here:

  * [Microsoft Office 2010 Sequencing Kit for Microsoft Application Virtualization 5.0](http://go.microsoft.com/fwlink/p/?LinkId=330681)
  * [Known issues when you create or use an App-V 5.0 Office 2010 package](http://go.microsoft.com/fwlink/p/?LinkId=330682)
  * [How to sequence Microsoft Office 2010 in Microsoft Application Virtualization 5.0](http://go.microsoft.com/fwlink/p/?LinkId=330676)