---
id: 2920
title: 'Hands off my gold image &#8211; The Task Sequence'
date: 2012-11-15T16:30:45+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2920
permalink: /hands-off-my-gold-image-the-task-sequence/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "929564305"
categories:
  - Automation
tags:
  - Automation
  - MDT
  - PVS
  - XenApp
---
If you&#8217;ve been following along so far you&#8217;ll have read my follow up coverage of  my (and co-host, [Jonathan Eyton-Williams](https://twitter.com/jonathanew)) [Geek Speak talk at Citrix Synergy in Barcelona](https://citrix.g2planet.com/synergybarcelona2012/public_session_view.php?agenda_session_id=191&conference=synergy), with  [Hands off my gold image – Automating Citrix XenApp/PVS Image Creation](http://stealthpuppy.com/deployment/hands-off-my-gold-image-automating-citrix-xenapppvs-image-creation/) and [Hands off my gold image – Microsoft Deployment Toolkit details](http://stealthpuppy.com/deployment/hands-off-my-gold-image-microsoft-deployment-toolkit-details/). In this article I&#8217;ll cover the task sequence that deploys Windows Server, installs XenApp and captures the image into PVS.

Task sequences in the Microsoft Deployment Toolkit (MDT) are core of what makes MDT tick. Think of a task sequence as the steps that will deploy and configure Windows. Note that there is no post-deployment management with MDT, as there is no agent (that&#8217;s what ConfigMgr is for).

# Importing the Task Sequence

To create a new task sequence, use the MDT Deployment Workbench, navigate to Task Sequences, right-click on that node and select &#8216;Create Task Sequence&#8217;:

  1. Set a unique ID and task sequence name
  2. Use the Standard Server Task Sequence as the template
  3. Select the operating system &#8211; in this case Windows Server 2008 R2 SP1. I usually recommend deploying Standard Edition
  4. Specify settings such as a product key, name, organisation and IE home page and local administrator password
  5. Customise the task sequence and unattend.xml to automate the deployment of Windows Server, XenApp and applications

The download that I have supplied ([download id=&#8221;58&#8243; format=&#8221;3&#8243;]) includes a pre-configured task sequence and unattend.xml for Windows Server 2008 R2 Standard Edition. To import these into a MDT Deployment Share, follow the steps above and then replace the resultant TS.XML and UNATTEND.XML that you&#8217;ll find in the \Control folder.

Re-open the task sequence properties and you should see something like this:

[<img style="background-image: none; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border-width: 0px;" title="XenApp-PVS-TaskSequence-Final" src="http://stealthpuppy.com/wp-content/uploads/2012/11/XenApp-PVS-TaskSequence-Final_thumb.png" alt="XenApp-PVS-TaskSequence-Final" width="660" height="337" border="0" />](http://stealthpuppy.com/wp-content/uploads/2012/11/XenApp-PVS-TaskSequence-Final.png)

Importing the supplied pre-configured task sequence into your own Deployment Share, will result in some errors because the task sequence will reference applications and operating systems that either don&#8217;t exist in your Deployment Share or have different names.

<img style="background-image: none; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border: 0px;" title="MDT-TS-Errors" src="http://stealthpuppy.com/wp-content/uploads/2012/11/MDT-TS-Errors.png" alt="MDT-TS-Errors" width="416" height="152" border="0" /> 

For example, after I&#8217;ve imported this task sequence, I need to fix the reference to the Windows Server 2008 R2 SP1 source files:

[<img style="background-image: none; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border: 0px;" title="MDT-TS-FixOS" src="http://stealthpuppy.com/wp-content/uploads/2012/11/MDT-TS-FixOS_thumb.png" alt="MDT-TS-FixOS" width="660" height="325" border="0" />](http://stealthpuppy.com/wp-content/uploads/2012/11/MDT-TS-FixOS.png)

The download also includes the scripts/applications referenced by the task sequence, so you&#8217;ll need to ensure they exist in your Deployment Share before fixing the task sequence.

# About the Task Sequence

Put 10 people in a room and you&#8217;ll probably find 11 different approaches to MDT and task sequences, so keep in mind that this is only one way to deploy Windows and XenApp and capture that image into PVS. If you have any updates or improvements to this process, I would love to hear your feedback.

Here&#8217;s a rough breakdown of what the task sequence is doing:

  1. Install and configure Windows. This utilises unattend.xml to perform some configuration including enabling the Remote Desktop Session Host role
  2. Apply packages to Windows including Internet Explorer 9 (or 10)
  3. The folder/group Custom Build Tasks contains the tasks that I&#8217;ve added to a vanilla server task sequence
  4. Update Windows after deployment using either Windows Update or WSUS. This occurs before any additional applications are added to the build
  5. Install hypervisor tools. The standard MDT property [VMPlatform](http://systemscenter.ru/mdt2012.en/vmplatform.htm) can be used to detect the underlying hypervisor and filter the install of the right tools
  6. Install Dependencies and Runtimes (.NET Framework, Visual C++ etc.) using an Application Bundle
  7. Control the installation of Citrix XenApp Controllers or Worker z. Deployment via PVS most likely means that you&#8217;ll deploy Workers rather than Controllers
  8. Install some additional XenApp related components including hotfixes, Receiver, the Offline Plugin etc
  9. Install core applications using an Application Bundle (this might include Office, Reader, Flash etc)
 10. Run a Windows Update task again once the dependencies and applications have been deployed
 11. Prepare and capture the image into PVS using [custom properties](http://stealthpuppy.com/deployment/hands-off-my-gold-image-microsoft-deployment-toolkit-details/). This might install and configure the EdgeSight Agent, but will install XenConvert, prep the image and then perform a capture

# About Unattend.xml

Whilst MDT provides a far friendlier interface than [Windows System Image Manager](http://technet.microsoft.com/en-us/library/cc766347(v=WS.10).aspx), there are still a number of configuration items that I&#8217;ve included in unattend.xml. These include configuring the following:

  * Disable Internet Explorer Enhanced Security Configuration
  * Disable the OOBE console and Server Manager from starting at first logon
  * Enabling Remote Desktop Services Session Host as a role during the install instead of post-install

The included unattend.xml has configuration items applied to two [configuration passes](http://technet.microsoft.com/en-us/library/cc766245(v=ws.10).aspx), plus features/roles enabled in the Packages section:

  * [specialize](http://technet.microsoft.com/en-us/library/cc722130(v=ws.10).aspx); and
  * [oobeSystem](http://technet.microsoft.com/en-us/library/cc748990(v=ws.10).aspx)

[<img style="background-image: none; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border: 0px;" title="unattend-xml" src="http://stealthpuppy.com/wp-content/uploads/2012/11/unattend-xml_thumb.png" alt="unattend-xml" width="660" height="365" border="0" />](http://stealthpuppy.com/wp-content/uploads/2012/11/unattend-xml.png)

Together the task sequence and unattend.xml create what should be a fairly clean (and importantly, repeatable) deployment of a XenApp server.

In the last article of this series, I&#8217;ll discuss some of the included scripts, but as always, if you&#8217;d like to ask some specific questions, email me &#8211; aaron (at) stealthpuppy.com.

Next up: [Hands off my gold image – The Scripts](http://stealthpuppy.com/deployment/hands-off-my-gold-image-the-scripts/)