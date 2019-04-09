---
id: 2809
title: Delivering Citrix XenApp Controllers and Workers with the Microsoft Deployment Toolkit
date: 2012-08-02T18:11:10+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2809
permalink: /delivering-citrix-xenapp-controllers-and-workers-with-the-microsoft-deployment-toolkit/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "789962703"
categories:
  - Automation
tags:
  - MDT
  - XenApp
---
<img style="background-image: none; margin: 0px 0px 10px 10px; padding-left: 0px; padding-right: 0px; display: inline; float: right; padding-top: 0px; border: 0px;" title="CitrixWindows8Desktop128" src="https://stealthpuppy.com/media/2012/08/CitrixWindows8Desktop128.png" alt="CitrixWindows8Desktop128" width="128" height="128" align="right" border="0" />Here's a quick a dirty method of controlling whether your [Microsoft Deployment Toolkit](http://technet.microsoft.com/en-us/solutionaccelerators/dd407791.aspx) (MDT) task sequence deploys a XenApp Controller (broker, XML service) or Worker (session host).

Let's assume that you are automating the deployment of your XenApp image using MDT in an environment with XenApp Controllers and Workers. It makes sense to use the same task sequence to deploy both XenApp roles because there's not a lot of difference between both server types (maybe on the Controllers we could avoid installing applications).

The use of a custom task sequence variable can provide a method of controlling which role is deployed, but I've first defined installation scripts for XenApp as applications in MDT. I have two applications:

  * Citrix XenApp Controller 6.5
  * Citrix XenApp Worker 6.5

Behind the scenes, these applications run a script that will install and configure XenApp. For the XenApp Worker, the script defines _[/ImaWorkerMode:True](http://support.citrix.com/proddocs/topic/xenapp65-install/ps-config-command-syntax-2.html)_ when running [XenAppConfigConsole.exe](http://support.citrix.com/proddocs/topic/xenapp65-install/ps-config-command-line.html)__ to configure XenApp after installation. Both applications have been added to a single task sequence that will automate the installation of Windows Server 2008 R2 with Citrix XenApp 6.5 (along with dependencies and applications).

In CustomSettings.ini, under the _Settings_  define a custom property named _XenAppRole_:

\[code highlight="3&#8243;\]\[Settings\]  
Priority=UUID, Default  
Properties=XenAppRole[/code]

Next we need to define the role for a specific machine. For this example I'm using the UUID of the target to identify a machine, also defined in CustomSettings.ini; however you could also use the [MDT configuration database](http://technet.microsoft.com/en-us/video/advanced-deployment-scenarios-using-the-microsoft-deployment-toolkit-2010-part-3-of-7-configuring-role-methods-in-the-configuration-database.aspx) to define the machine properties.

Because this is a custom property I can choose what ever value I like, so I've creatively chosen WORKER or CONTROLLER. The following example shows the configuration for a specific machine named XENAPP1 identified from its UUID:

\[code highlight="3&#8243;\]\[F1373B42-1F37-75FC-B166-A2E578E28B1E\]  
OSDComputerName=XENAPP1  
XenAppRole=CONTROLLER[/code]

Now in the task sequence, modify the conditions (on the Option tab) of each step. In my case I have the XenApp components as child items of a group. In this case I've also added a condition that only processes this group if the XenAppRole property exists (regardless of role):

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="XenAppRole" src="https://stealthpuppy.com/media/2012/08/XenAppRole_thumb.png" alt="XenAppRole" width="660" height="129" border="0" />](https://stealthpuppy.com/media/2012/08/XenAppRole.png)

On the XenApp Controller step, create a condition that detects whether XenAppRole has been set to CONTROLLER:

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="XenAppController" src="https://stealthpuppy.com/media/2012/08/XenAppController_thumb.png" alt="XenAppController" width="660" height="219" border="0" />](https://stealthpuppy.com/media/2012/08/XenAppController.png)

On the XenApp Worker step, create a condition that detects whether XenAppRole has been set to WORKER:

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="XenAppWorker" src="https://stealthpuppy.com/media/2012/08/XenAppWorker_thumb.png" alt="XenAppWorker" width="660" height="218" border="0" />](https://stealthpuppy.com/media/2012/08/XenAppWorker.png)

Simple and straightforward - I get a clean, consistent build of XenApp 6.5 and control over which role is deployed to an end-point by changing one line in CustomSettings.ini.