---

title: SoftGrid, Presentation Server And Internet Explorer As A Help System
date: 2008-01-14T19:00:12+10:00
author: Aaron Parker
layout: post

permalink: /softgrid-presentation-server-internet-explorer-as-a-help-system/
dsq_thread_id:
  - "195379937"
categories:
  - Citrix
tags:
  - Presentation-Server
  - SoftGrid
---
If you're deploying applications on Citrix Presentation Server via Application Virtualisation/SoftGrid, you may run into issues with applications that utilise a local HTML based help system. These applications will generally launch Internet Explorer as the viewer and in our case, we've found that IE is launched outside of the protected environment and thus never sees the help content located inside the environment.

This behaviour only happens inside an ICA session and does not occur in an RDP session or on the console. Exactly why Internet Explorer is executed outside the environment but it has something to do with `WFSHELL.EXE` being the calling process.

Citrix Presentation Server implements some changes to the system during install to enable Server to Client content redirection. The following registry keys are modified to point to `C:\Program Files\Citrix\system32\iexplore.exe` which make the decision on where content is executed.

* HKEY\CLASSES\ROOT\htmlfile\shell\open\command
* HKEY\CLASSES\ROOT\htmlfile\shell\opennew\command
* HKEY\CLASSES\ROOT\HTTP\shell\open\command
* HKEY\CLASSES\ROOT\https\shell\open\command
* HKEY\CLASSES\ROOT\MMS\shell\open\command
* HKEY\CLASSES\ROOT\pnm\shell\open\command
* HKEY\CLASSES\ROOT\rtsp\shell\open\command
* HKEY\CLASSES\ROOT\rtspu\shell\open\command

Citrix have a knowledgebase article that details a related error: [Applications that Use or Call IExplore.exe Fail to Open Within an ICA Session](http://support.citrix.com/article/CTX107424), but unfortunately doesn't give a very detailed explanation as to why this occurs.

The registry keys that the article states to change this behaviour do indeed implement a workaround for the issue experienced from within SoftGrid. However once implemented they will prevent Server to Client content redirection, as they must be changed natively in Windows - they don't work by changing them with the OSD file. Not something you'll want to implement if you're using this type of content redirection.

Fortunately through a little bit of digging around and testing, I've found that by adding the following registry entry to your OSD files will execute Internet Explorer directly and keep the process within the protected environment, allowing the user to view Help:

![]({{site.baseurl}}/media/2008/05/softgridiereg.png)
