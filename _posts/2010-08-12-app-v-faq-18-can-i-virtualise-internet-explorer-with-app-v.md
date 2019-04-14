---
id: 1762
title: 'App-V FAQ: Can I virtualise Internet Explorer with App-V?'
date: 2010-08-12T11:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=1762
permalink: /app-v-faq-18-can-i-virtualise-internet-explorer-with-app-v/
has_been_twittered:
  - 'yes'
enclosure:
  - |
    http://ecn.channel9.msdn.com/o9/edge/5/3/9/7/2/IEVirtualizationTerminalServices_2MB_edge.wmv
    5748097
    video/asf
    
  - |
    http://ecn.channel9.msdn.com/o9/edge/6/3/9/7/2/IEVirtualizationMEDV_2MB_edge.wmv
    4698891
    video/asf
    
  - |
    http://ecn.channel9.msdn.com/o9/edge/3/3/9/7/2/IEVirtualizationOverview_2MB_edge.wmv
    5079653
    video/asf
    
dsq_thread_id:
  - "195383104"
categories:
  - FAQs
tags:
  - App-V
  - AppVFAQ
---
![AppV logo]({{site.baseurl}}/media/2010/06/AppVFAQLogo.png")

No, unfortunately you cannot use App-V to virtualise Internet Explorer today. Other application virtualisation solutions such as [VMware ThinApp](http://blogs.vmware.com/thinapp/2010/06/internet-explorer-6on-windows-7.html), [Symantec Workspace Virtualization](http://www.symantec.com/connect/articles/running-ie6-ie7-and-ie8-side-side-using-symantec-workspace-virtualization), and [InstallFree Bridge](http://www.installfree.com/solutions/virtual-internet-explorer/) can virtualise Internet Explorer, so why can’t App-V?

There’s no technical reason why App-V can’t virtualise Internet Explorer; however at this time Microsoft’s stance on running multiple versions of Internet Explorer on a single operating system is preventing this from becoming a reality - [Running Multiple Versions of Internet Explorer On Single Operating System is Unsupported](http://support.microsoft.com/kb/2020599).

### Microsoft’s recommend solutions

Microsoft does offer several solutions for running older versions of Internet Explorer on current operating systems. These are outlined in the white paper [Solutions for Virtualizing Internet Explorer](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=495934c8-5684-451c-a16e-5ceb50706a42) and include:

  * [Terminal Services](http://www.microsoft.com/windowsserver2003/technologies/terminalservices/default.mspx) – using Terminal Services built into Windows Server 2003, Internet Explorer 6 or 7 can be delivered centrally. [Citrix XenApp](http://www.citrix.com/xenapp) or [Quest vWorkspace](http://www.vworkspace.com/solutions/vas/vas.aspx) would required to deliver Internet Explorer as a seamless window. An overview video of this method is [available on TechNet Edge](http://edge.technet.com/Media/Internet-Explorer-Virtualization-Terminal-Services/).



  * [MED-V](http://www.microsoft.com/windows/enterprise/products/mdop/med-v.aspx) – Windows XP running in a virtual machine managed with MED-V can be used to deliver Internet Explorer locally. MED-V offers URL redirection so that you can control which sites are directed to the older versions of IE. MED-V is only available as a component of [MDOP](http://www.microsoft.com/windows/enterprise/products/mdop/). An overview video of this method is [available on TechNet Edge](http://edge.technet.com/Media/Internet-Explorer-Virtualization-with-MED-V/):



  * [Windows Virtual PC](http://www.microsoft.com/windows/virtual-pc/) – teamed with [Windows XP Mode](http://www.microsoft.com/windows/virtual-pc/download.aspx), available to customers with Windows 7 Professional, Enterprise and Ultimate. Windows Virtual PC and Windows XP Mode are available to Windows customers at no additional cost, but may require a little more management overhead that the previous solutions.

A overview video of all of the Microsoft solutions is [available here](http://edge.technet.com/Media/Internet-Explorer-Virtualization-Overview/):



Microsoft does provide developers with tools for running the Internet Explorer 6 and 7 render engines on Windows 7 with [Expression Web](http://www.microsoft.com/expression/products/Web_Overview.aspx).  Although the full Expression Web is a paid product, a free version is available: [Microsoft Expression Web SuperPreview for Windows Internet Explorer](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=8e6ac106-525d-45d0-84db-dccff3fae677). If you are looking to provide developers a method of viewing sites in the older render engines, Expression Web is the recommend solution.

### Other methods of delivering Internet Explorer

There are some other ways that you could consider for delivering older versions of Internet Explorer:

  * [RemoteApp]({{site.baseurl}}/virtualisation/remoteapp-for-windows-xp-and-windows-vista-the-missing-pieces) – Internet Explorer can be published from Windows XP or Windows Vista using RemoteApp. The older operating systems could be running in a local or remote virtual machine.
  * [VMware Workstation](http://www.vmware.com/products/workstation/) – Unity mode can be used to provide a seamless Internet Explorer on the host operating system.
  * [Oracle VirtualBox](http://www.virtualbox.org) – VirtualBox also offers a seamless window mode.

### Conclusion

Microsoft would only extend the life of older versions of IE it they were to provide them as App-V packages. Microsoft wants to [see the end of Internet Explorer 6](http://edge.technet.com/Media/Thrive-Live-Migrating-from-IE6-to-IE8-Part-1-of-2/) and apart from some hold outs (home users who don’t know any better and businesses who have web applications that rely on IE6 – they have had since [October 2006](http://en.wikipedia.org/wiki/History_of_Internet_Explorer) to start their migrations) most of us have moved on.

Although you cannot deliver older versions of Internet Explorer with App-V, Microsoft does offer alternate methods; however many of these do require additional infrastructure which may remove them from consideration. If you absolutely must be able to deliver Internet Explorer with App-V, have a chat with your Microsoft TAM. The more customers that do, the more likely that Microsoft may consider providing this functionality.

### Resources

  * [Addressing Application Compatibility When Migrating to Internet Explorer 8 - Information for Corporate Developers](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=60017d66-4da9-4455-a092-7c7253559a8e&utm_source=feedburner&utm_medium=feed&utm_campaign=Feed:+MicrosoftDownloadCenter+(Microsoft+Download+Center)#tm)