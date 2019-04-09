---
id: 1690
title: 'App-V FAQ: Is App-V an Application Compatibility solution?'
date: 2010-07-20T11:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/app-v-faq-7-is-app-v-an-application-compatibility-solution
permalink: /app-v-faq-7-is-app-v-an-application-compatibility-solution/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195382784"
categories:
  - FAQs
tags:
  - App-V
  - AppVFAQ
---
<img style="margin: 0px 10px 5px 0px; display: inline;" src="https://stealthpuppy.com/media/2010/06/AppVFAQLogo.png" alt="" align="left" />

The short answer to this question is No, when it comes to migrating to newer versions of Windows, the [Application Compatibility Toolkit](http://www.microsoft.com/downloads/details.aspx?FamilyId=24DA89E9-B581-47B0-B45E-492DD6DA2971&displaylang=en) should be an essential component of your upgrade project. The longer answer is – it depends what you define as [Application Compatibility](http://technet.microsoft.com/windows/aa905066.aspx).

### Least Privilege

One of the most common issues with compatibility is running applications with least privilege. Often applications expect to be run with administrative access because they attempt to write to system protected areas such as HKEY\_LOCAL\_MACHINE in the Registry or folders such as _\Windows_ and _\Program Files_. App-V can assist with these types of applications by virtualising those locations and allowing the application to write to the virtual copies. The write action will then succeed but all changes are kept within the virtual environment. No changes are required to the physical system.

### Remote Desktop Services

In some circumstances App-V can assist with applications that do no behave correctly in multi-user environments such as Terminal Server or Remote Desktop Services. By virtue of hosting the application in App-V, registry and file system virtualisation can benefit those applications that may store data or configurations in common locations such as HKLM in the Registry and the Program Files folder in the file system. If the application now has it’s own unique view of these locations, it should work when run under Remote Desktop Services (this includes add-on products such as [Citrix XenApp](http://www.citrix.com/xenapp) or [Quest vWorkspace](http://www.vworkspace.com/solutions/vas/vas.aspx)).

Additionally, App-V helps in [consolidating Remote Desktop Servers](http://www.microsoft.com/systemcenter/appv/terminalsvcs.mspx) where application conflicts may have previously required creating silos of servers:

<sup>1 </sup>In Remote Desktop Services deployments, application conflicts can lead to silos of remote desktop session host servers. To avoid application conflicts, applications typically must undergo significant testing to determine which applications will collide and, therefore, must be separated and run on different session host silos—a time-consuming and costly process. Separating out multiple remote desktop session hosts to accommodate specific applications routinely results in servers being underutilized because each one is locked into a specific configuration, capable of serving only a limited set of non-conflicting applications. Often, 20 servers are required to support 1,000 users.

  * Microsoft Application Virtualization for Remote Desktop Services 4.6 helps consolidate remote desktop session host servers by offering the following features and benefits:
  * Reduce app-to-app and multi-user application conflicts and hence the need for regression testing
  * Accelerate application deployment by reducing the deployment risk
  * Simplify profile management
  * App-V for RDS 4.6 now supports 64-bit operating systems.

### Application Versions and Conflicts

By virtualising applications, you can now run applications side by side that previously would be challenging when installing. This includes multiple versions of the same application (e.g. multiple versions of Microsoft Office) or applications that may conflict with each other because they expect different versions of the same DLL.

This also allows you to reduce regression testing because applications are now separated from the operating system and each other, so you can deploy new versions with far more confidence because conflict testing is greatly reduced.

### Resources

  * <sup>1 </sup>[Microsoft Application Virtualization for Remote Desktop Services 4.6](http://www.microsoft.com/downloads/details.aspx?FamilyID=e633164f-9729-43a8-9149-de651944a7fe&displaylang=en)
  * [Making Applications Compatible with Windows 7 in a Virtualized Environment](http://blogs.technet.com/b/virtualworld/archive/2010/03/21/making-applications-compatible-with-windows-7-in-a-virtualized-environment.aspx)
  * [Using Virtualization to Fix Compatibility Issues](http://blogs.technet.com/b/appv/archive/2008/08/27/softgrid-app-v-using-virtualization-to-fix-compatibility-issues.aspx)
  * [Application Compatibility TechCentre on TechNet](http://technet.microsoft.com/windows/aa905066.aspx)
  * [Application Compatibility Toolkit 5.6](http://www.microsoft.com/downloads/details.aspx?FamilyId=24DA89E9-B581-47B0-B45E-492DD6DA2971&displaylang=en)
  * 3rd Party application compatibility solutions that work with App-V include: [App-DNA AppTitude](http://www.app-dna.com/AppTitude/Default.aspx) and [ChangeBase AOK](http://www.changebase.com/products.aspx)
  * [Accelerate your Windows 7 deployment with App-V](http://www.softgridblog.com/?p=152)