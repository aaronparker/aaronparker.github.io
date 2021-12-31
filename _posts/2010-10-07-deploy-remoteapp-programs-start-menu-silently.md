---
id: 1973
title: How to silently deploy RemoteApp Programs to the Start Menu
date: 2010-10-07T14:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/deploying-remoteapp-programs-to-the-start-menu-silently/
permalink: /deploy-remoteapp-programs-start-menu-silently/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195565330"
categories:
  - Microsoft
tags:
  - Remote Desktop Services
  - RemoteApp
---
RemoteApp in Windows Server 2008 R2 Remote Desktop Services finally allows you to do what some 3rd party solutions have been doing for years – delivering published applications directly to the user's Start Menu. The bad news is that this feature requires Windows 7 and Windows Server 2008 R2, but your migrations plans are well underway right?

Creating the connection on the client computer is easy – setup a new connection via [RemoteApp and Desktop Connections](http://technet.microsoft.com/en-us/library/dd560650(WS.10).aspx) in Control Panel or ask users to double click on a connection file that you've created on the RD Connection Broker.

The wizard is simple enough, just click the Next and Finish buttons when prompted, the wizard will do the rest:

![Setup a new connection with RemoteApp and Desktop Connections]({{site.baseurl}}/media/2010/10/SetupNewRemoteAppConnectionFinished.png)

But what if you want to deliver the connection silently? Fortunately that's easy, but it's one of those things that just isn't documented. Here's how to do it.

## Creating the RemoteApp and Desktop Connections Configuration File

There are some excellent resources for setting up RemoteApp sources, Remote Desktop Web Access and publishing applications, so there's no need to cover those again. If you haven't already configured the [Remote Desktop Session Host](http://technet.microsoft.com/en-us/library/cc742822.aspx) servers, [Remote Desktop Virtualization Host](http://technet.microsoft.com/en-us/library/dd759170.aspx) servers (for publishing virtual desktops) and the [Remote Desktop Connection Broker](http://technet.microsoft.com/en-us/library/cc771419.aspx) see these [step-by-step guides](http://www.microsoft.com/downloads/en/results.aspx?freetext=remote+desktop+step-by-step&displaylang=en&stype=s_basic) first:

  * [Deploying Remote Desktop Web Access with Remote Desktop Connection Broker Step-by-Step Guide](http://www.microsoft.com/downloads/en/details.aspx?FamilyID=906b5769-07a2-452a-9783-30137b0d650a)
  * [Deploying Personal Virtual Desktops by Using Remote Desktop Web Access Step-by-Step Guide](http://www.microsoft.com/downloads/en/details.aspx?FamilyID=0d278f5c-37fa-43fb-8032-614c7bf1d617)
  * [Deploying Virtual Desktop Pools by Using Remote Desktop Web Access Step-by-Step Guide](http://www.microsoft.com/downloads/en/details.aspx?FamilyID=e33b0953-e89a-4b97-a6fe-60da44add5c7)
  * [Deploying RemoteApp Programs to the Start Menu by Using RemoteApp and Desktop Connection Step-by-Step Guide](http://www.microsoft.com/downloads/en/details.aspx?FamilyID=b00819e6-70e2-4a9e-9224-26804eb0ba4e)

Now that you've configured your RemoteApp and Desktop sources and RD Web Access and confirmed that you can manually add a RemoteApp and Desktop Connection source to your client machine, you'll need to create the [RemoteApp and Desktop Connections Configuration File](http://technet.microsoft.com/en-us/library/ee216782.aspx).

Open the Remote Desktop Connection Manager tool on the Remote Desktop Connection Broker and choose _Create Configuration File_. Enter the URL to the RAD Connection feed, in my case this is [https://home.stealthpuppy.com/RDWeb/Feed/webfeed.aspx](https://home.stealthpuppy.com/RDWeb/Feed/webfeed.aspx "https://home.stealthpuppy.com/RDWeb/Feed/webfeed.aspx")

![Creating the RemoteApp and Desktop Connections Configuration File]({{site.baseurl}}/media/2010/10/RemoteDesktopConnectionManager.png)

Click the Save button and save the configuration file to a location that you can also access from the client machine. The configuration file is just simple XML, so open it in Notepad to view the contents.

## Adding the RemoteApp and Desktop Connection

Adding the connection is simple, but you will need to do this in the users' context, so you'll have to use a logon script or similar to run the command. The machine on which the command is run must also be connected to the network (it will fail silently if a connection can't be made) and be able to make a connection to the Remote Desktop Connection Broker. To add the workspace silently run this command:

```cmd
rundll32.exe tsworkspace,WorkspaceSilentSetup <path>\connection-file.wcx
```

That's it. If the connection already exists and the command is run again, it will fail silently.

## Advanced Configuration

A PowerShell script is available from Microsoft that can check whether the connection already exists before running the setup command and will log an event if the setup fails. The script can be found here: [Configure RemoteApp and Desktop Connection on Windows 7 Clients](http://gallery.technet.microsoft.com/ScriptCenter/en-us/313a95b3-a698-4bb0-9ed6-d89a47eacc72)

## More Reading

* [Windows 7 / Windows Server 2008 R2: RemoteApp and Desktop Connection](http://blogs.technet.com/b/askperf/archive/2009/10/14/windows-7-windows-server-2008-r2-remoteapp-and-desktop-connection.aspx)
