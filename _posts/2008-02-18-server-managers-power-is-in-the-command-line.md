---
id: 469
title: "Server Manager's Power Is In The Command Line"
date: 2008-02-18T21:54:54+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/windows/server-managers-power-is-in-the-command-line
permalink: /server-managers-power-is-in-the-command-line/
dsq_thread_id:
  - "195380136"
categories:
  - Microsoft
tags:
  - Server Manager
  - Unattended
  - Windows-Server-2008
---
Like most IT Pros deploying and managing Windows Server, I've avoided the wizard interfaces, like Manage Your Server, in previous versions of Windows. However with Windows Server 2008, Microsoft have actually succeeded in creating a tool that I think people will find indispensable.

Server Manager is an MMC-based front-end for anything you will need to manage on your servers running Windows 2008. As well as combining many of the individual management tools, it gives you a simple overview of what's happening on your server and integrates the old Add/Remove Programs interface too.

[](https://stealthpuppy.com/wp-content/uploads/2008/02/servermanager.png)

If you've not taken a look at Windows Server 2008 and are interested in reading more about Server Manager, there is a plethora of resources available to you:

  * Start with the [Windows Server 2008 Server Manager Technical Overview](http://technet2.microsoft.com/windowsserver2008/en/library/18dd1257-2cd1-48f0-91f1-3012cf0fcc831033.mspx?mfr=true)
  * You can then use [Server Manager page on TechNet](http://technet2.microsoft.com/windowsserver2008/en/servermanager/default.mspx) to find links to more detailed information
  * Read [Server Manager Compared to Earlier Windows Management Tools](http://go.microsoft.com/fwlink/?LinkId=92732) to get an idea of what Server Manager is all about in Windows Server 2008
  * Take a look at [TechNet Webcast: Managing Windows Server 2008 with Server Manager (Level 200)](http://www.microsoft.com/events/EventDetails.aspx?CMTYSvcSource=MSCOMMedia&Params=%7eCMTYDataSvcParams%5e%7earg+Name%3d%22ID%22+Value%3d%221032358383%22%2f%5e%7earg+Name%3d%22ProviderID%22+Value%3d%22A6B43178-497C-4225-BA42-DF595171F04C%22%2f%5e%7earg+Name%3d%22lang%22+Value%3d%22en%22%2f%5e%7earg+Name%3d%22cr%22+Value%3d%22US%22%2f%5e%7esParams%5e%7e%2fsParams%5e%7e%2fCMTYDataSvcParams%5e) and
  * [TechNet Webcast: Overview of Server Manager and Windows PowerShell in Windows Server 2008 (Level 300)](http://go.microsoft.com/fwlink/?LinkId=92591) to see Server Manager in action
  * Read the [Server Manager Scenarios Step-by-Step Guide](http://download.microsoft.com/download/b/1/0/b106fc39-936c-4857-a6ea-3fb9d1f37063/Server%20Manager%20Scenarios%20Step-by-Step%20Guide.doc) to see how to use Server Manager.

The real power of Server Manager and what makes this tool truly worthwhile is it's command line interface. SERVERMANAGERCMD.EXE replaces what SYSOCMGR.EXE provided in previous versions of Windows, but it does so much more:

> A new command-line feature in Server Manager allows unattended installation and removal of Windows Server 2008 technologies. The ServerManagerCmd.exe command-line tool exposes the key set of Server Manager tasks, such as installation or removal of roles, role services and features, validation, and querying the current state of the computer. It also allows for installation or removal of multiple roles, role services, or features in a single command instance by using XML answer files.
> 
> Before the implementation of the Server Manager command line, the only command-line tools available for installing Windows software packages on a computer were ocsetup and pkgmgr. The command line syntax for these tools is complex, and the names of roles, role services, and features available for installation or removal by using these two tools were not intuitive. ServerManagerCmd.exe simplifies command-line installation and removal of roles, role services, and features

So, for example, if I am looking to install to install the Network Policy and Access Server, in preparation for configuring Network Access Protection, I would install it via the following command:

```powershell
SERVERMANAGERCMD -install NPAS -restart
```

If I am installing Terminal Server components on an existing server, I could run the following command to install the Terminal Server, Licensing and Session Broker components.

```powershell
SERVERMANAGERCMD -install TS-Terminal-Server,TS-Licensing,TS-Session-Broker -restart
```

To install the complete Remote Server Administration Tools (RSAT) on a Windows Server 2008 server, run this command (curiously this requires a restart):

```powershell
SERVERMANAGERCMD -install RSAT -allsubfeatures -restart
```

Command line interaction with Server Manager also provides the ability to query what roles and features are installed on the server as well as export and import configurations via XML files. This is a great change from earlier versions of Windows and will help to reduce the time spent managing Windows Server 2008.

I've included here the complete list of roles and features that you can use with SERVERMANAGER.CMD and OCSETUP.EXE in Windows Server 2008 and Windows Server Core. Don't reach for that GUI, real men (and women) use the command line.

Here's something I really like: using SERVERMANAGERCMD -QUERY via Windows PowerShell makes seeing what's installed on your server nice and simple (**Update**: this works under Command Prompt too):

![Query](https://stealthpuppy.com/wp-content/uploads/2008/02/query.png)

For more information on Server Manager with PowerShell , read Marc van Orsouw's post: [Dueling Command Lines in Windows Server 2008 ? .. or a happy end ?](http://thepowershellguy.com/blogs/posh/archive/2007/05/23/dueling-command-lines-in-windows-server-2008-or-a-happy-end.aspx).

### What About Server Core?

Server Manager is not included in a Server Core installation. Subsequently the command line version is not installed either. Management of features and roles in Server Core is performed via OCSETUP and OCLIST. OCSETUP is the same tool [included in Windows Vista](http://technet2.microsoft.com/WindowsVista/en/library/ced21f54-456d-4936-88a1-a0e42eea3ca31033.mspx?mfr=true) for managing features and works the same way on Server Core.

Unfortunately we don't get the ability to save OCLIST's output to XML for import to another server, but OCSETUP does provide an answer file option for automating the installation or removal of features.

### More Reading

  * [Server Manager Command Line in Windows Server 2008](http://edge.technet.com/Media/539/)
  * [Server Manager Command Line Syntax](http://technet2.microsoft.com/WindowsServer2008/en/library/e7edce1d-442c-4ec3-b324-c748e4f937551033.mspx#BKMK_cmdline)
