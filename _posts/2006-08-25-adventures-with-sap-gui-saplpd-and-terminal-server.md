---

title: Adventures with SAP GUI, SAPLPD and Terminal Server
date: 2006-08-25T06:05:00+10:00
author: Aaron Parker
layout: post

permalink: /adventures-with-sap-gui-saplpd-and-terminal-server/
dsq_thread_id:
  - "195378904"
categories:
  - Applications
tags:
  - Terminal Server
---
Like all ridiculously expensive software we love to hate, the SAP GUI does not use standard Windows print queues to send print jobs, but implements a printing method they call SAPLPD instead. This is launched by a process that looks to be external to the SAP GUI component and does not respect the working directory key in each users registry. This process will attempt to write a file named LPRINT.NUM to the working directory of it's parent process, the SAP GUI. If user does not have rights to write to this location the SAP GUI will exit completely without warning.

I just has this situation with a client who deploys a shortcut to the SAP GUI via published content with the Presentation Server Client. The working directory for published content cannot be specified like you can with a published applications, and therefore the working directory for the SAPGUI ended up being "\Program Files\Citrix\ICA Client". User by default doesn't have write access to this location. We modified the shortcut in the "Start Menu\Programs\Startup" folder for the Program Neighbourhood Agent, to set the working directory to their home folder and SAPLPD worked as it should.

SAP GUI 6.40 with Patch Level 10 and above provides a different method of printing from Terminal Server. More information here:

[Best Practices for Implementing SAP GUI 6.40 for Windows Using Citrix Presentation Server 4](http://support.citrix.com/article/CTX109664&searchID=24103854)
