---
id: 65
title: Office 2007 Deployment via Group Policy
date: 2007-04-12T05:36:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/office-2007-deployment-via-group-policy
permalink: /office-2007-deployment-via-group-policy/
thesis_description:
  - How to deploy Microsoft Office 2007 via the Group Policy Software Installation feature
aktt_notify_twitter:
  - 'yes'
views:
  - "1"
categories:
  - Applications
tags:
  - Deploy
  - Group Policy
  - Office-2007
---
If you are looking at deploying Office 2007 via Group Policy you may have noticed that Microsoft have changed the game. Office 2007 is no longer deployed using transform files; it now uses [Windows Installer patches](http://technet2.microsoft.com/Office/en-us/library/8faae8a0-a12c-4f7b-839c-24a66a531bb51033.mspx?pf=true) (.MSP) or [CONFIG.XML](http://technet2.microsoft.com/Office/en-us/library/e16af71c-fed4-40da-a886-95e596c3999e1033.mspx?pf=true) to [customise the Office installation](http://technet2.microsoft.com/Office/en-us/library/a33e64b0-46a5-45e5-b76f-3add595af8de1033.mspx?pf=true).

When you deploy any of the Office 2007 applications, you can [add MSP files to the \Updates](http://technet2.microsoft.com/Office/en-us/library/5e62ead2-5d6a-41ab-93d2-b902460f2d2d1033.mspx?pf=true) folder and they will be installed automatically by Office setup. This simplifies updating Office by ensuring updated machines can still use the original network sources files but means that administrative installations are no longer available The change to MSP files for customising Office has implications for deployment - you can&#8217;t add an MSP file to an application in the Group Policy object.

Microsoft has recently added a document on TechNet that describes what you&#8217;ll need to do to [deploy Office 2007 via Group Policy](http://technet2.microsoft.com/Office/en-us/library/efd0ee45-9605-42d3-9798-3b698fff3e081033.mspx?pf=true). In this document they give details why software deployment via Group Policy is not scalable for larger customers:

  * Unable to schedule installations and controlling bandwidth.
  * Limited scalability for concurrent deployment more than 200 concurrent installs could cause issues.

These types of limitations are well known to anyone who has deployed applications via Group Policy, but here&#8217;s a few more that are Office 2007 specific:

  * MSP files added to the `\Updates` folder _are not installed_ when deploying Office via Group Policy. This is obviously a big hurdle and Microsoft doesn&#8217;t give any reason for this behaviour.
  * Office 2007 cannot be advertised or assigned to users. Given that Office is licensed per device, I don&#8217;t see the issue with this.
  * Challenging to maintain/update. WSUS is a pretty good solution for most customers so again I don&#8217;t see the issue here.

The changes Microsoft have made to the Office 2007 Setup routine appear to be aimed at making Office 2007 easier to deploy and maintain for larger customers who generally have tools like SMS for application deployment. So what options do organisations that rely on Group Policy for application deployment have? Here&#8217;s the lowdown:

  1. Customise `CONFIG.XML` and deploy Office by adding the MSI file to a Group Policy object.
  2. Create an MSP or customise `CONFIG.XML` and deploy Office via a Group Policy Startup script.

If you want to use the first option you will need to make a copy of Office for each separate installation type e.g. installing Access on some computers but not others. This could require higher maintenance and as using CONFIG.XML is a limited option compared to MSP files, who really wants to use the limited option when there is a nice Office Customisation Tool GUI available?

This leaves you with deploying Office 2007 via a MSP files and a Startup script and I think this will give you the most options. To install via a script use `SETUP /ADMINFILE adminfile.MSP` to install Office with the customisations you require (run `SETUP /?` to see a fill list of command line options). Microsoft have a page on using Startup scripts, [Use Group Policy to Assign Startup Scripts for 2007 Office Deployment](http://technet2.microsoft.com/Office/en-us/library/a57c8446-b959-4025-a866-b690ddcaa66d1033.mspx), however this page is not available at the moment.

So there we have it the way you used to deploy Office no longer works and you&#8217;ll have to do some preparation when it comes to Office 2007. Make sure you check out the [page on TechNet](http://technet2.microsoft.com/Office/en-us/library/efd0ee45-9605-42d3-9798-3b698fff3e081033.mspx?pf=true) for more details.