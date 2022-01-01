---

title: A Quick Look at the Windows Vista MMC Consoles
date: 2007-04-08T05:59:07+10:00
author: Aaron Parker
layout: post

permalink: /a-quick-look-at-the-windows-vista-mmc-consoles/
categories:
  - Microsoft
tags:
  - Windows-Vista
---
There's got to be a quicker way of getting to the management tools in Windows right? Well here's a quick look at the MMC files included in the base install of Windows Vista. I've put together a list of those files and whether you need to elevate to run them. If you do need to elevate you will have to do so by running them from an elevated command prompt. Note that you can run these without having to add the .MSC extension. The exception to this is SERVICES.MSC.

  * **azman**.msc: [_Authorization Manager_](http://technet2.microsoft.com/WindowsServer/en/library/1b4de9c6-4df9-4b5a-83e9-fb8d497723781033.mspx?mfr=true). Doesn't require elevation to run, but you will need to run this tool with admin privileges to manage an authorisation store.
  * **certmgr**.msc: _Certificates_ _Manager_. Doesn't require elevation to run, but you will need to elevate to manage certificates for the local computer.
  * **comexp**.msc: _Component_ _Services_. Doesn't require elevation to run, but you will need to elevate to manage COM components.
  * **compmgmt**.msc: _Computer_ _Management_. Doesn't require elevation to run like it does when you choose Manage from the Computer properties menu, but you get a read-only view.
  * **devmgmt**.msc: _Device_ _Manager_. Doesn't require elevation but you will only be able to view the device configuration.
  * **diskmgmt**.msc: _Disk_ _Management_. Requires elevation to run, there is no view-only mode.
  * **eventvwr**.msc: _Event_ _Viewer_. Doesn't require elevation to run, however you will need to elevate to manage event logs and view the Security log.
  * **fsmgmt**.msc: _Shared_ _Folders_. Requires elevation; however you can view a list of shares without elevation.
  * **gpedit**.msc: _Local_ _Group_ _Policy_. Requires elevation to run.
  * **gpmc**.msc: _Group_ _Policy_ _Management_  
    _Console_. Doesn't require elevation to run, but you'll obviously need to run this tool as a domain admin to manage Group Policy.
  * **lusrmgr**.msc: _Local_ _Users_ _and_ _Groups_. Doesn't require elevation to run.
  * **napclcfg**.msc: _NAP_ _Client_ _Configuration_. Requires elevation to run.
  * **perfmon**.msc: _Reliability_ _and_ _Performance_. Doesn't require elevation to run, however you will need to elevate to perform certain tasks.
  * **printmanagement**.msc: _Print_ _Management_: Doesn't require elevation to run. You can point this tool at remote print servers to manage them.
  * **rsop**.msc: _Resultant_ _Set_ _of_ _Policy_. Doesn't require elevation to run but if you don't elevate this tool, you will only see your own user Group Policy configuration.
  * **secpol**.msc: _Local_ _Security_ _Policy_. Requires elevation to run.
  * **services**.msc: _Services_. Doesn't require elevation to run.
  * **taskschd**.msc: _Task_ _Scheduler_. Doesn't require elevation to run, however without elevation you will only be able to manage tasks in your own context.
  * **tpm**.msc: _Trusted_ _Management_ _Module_ _Management_. Requires elevation to run and you'll also need a TPM.
  * **wf**.msc: _Windows_ _Firewall_ _with_ _Advanced_ _Security_. Requires elevation to run.
  * **wmimgmt**.msc: _WMI_ _Control_. Doesn't require elevation to run, however you will need to elevate this console to make any changes.