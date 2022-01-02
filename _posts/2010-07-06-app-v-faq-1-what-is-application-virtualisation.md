---

title: 'App-V FAQ: What is Application Virtualisation?'
date: 2010-07-06T10:44:52+10:00
author: Aaron Parker
layout: post

permalink: /app-v-faq-1-what-is-application-virtualisation/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "197109427"
categories:
  - FAQs
tags:
  - App-V
  - AppVFAQ
---
Wikipedia describes [application virtualization](http://en.wikipedia.org/wiki/Application_virtualization) as:

> Application virtualization is an umbrella term that describes software technologies that improve portability, manageability and compatibility of applications by encapsulating them from the underlying operating system on which they are executed. A fully virtualized application is not installed in the traditional sense[1], although it is still executed as if it is. The application is fooled at runtime into believing that it is directly interfacing with the original operating system and all the resources managed by it, when in reality it is not. In this context, the term "virtualization" refers to the artefact being encapsulated (application), which is quite different to its meaning in hardware virtualization, where it refers to the artefact being abstracted (physical hardware).

Application Virtualisation in Windows exists in several forms – these include the [registry and file system redirection that is a feature of User Account Control](http://windowsteamblog.com/windows/b/developers/archive/2009/08/04/user-account-control-data-redirection.aspx) in Windows Vista and Windows 7, the [IniFileMappings](http://technet.microsoft.com/en-us/library/cc722567.aspx) feature introduced in Windows NT and application virtualisation solutions such as [Microsoft App-V](http://www.microsoft.com/windows/enterprise/products/mdop/app-v.aspx), [VMware ThinApp](http://www.vmware.com/products/thinapp/) and [InstallFree Bridge](http://www.installfree.com/the-installfree-bridge/). Application Virtualization in the context of this FAQ series, refers to those application virtualisation solutions that includes App-V.

Application Virtualisation allows you to deliver applications without having to install them to the operating system. This means that you can now turn applications into a service that can be delivered dynamically and instantly to users, rather than computers.

Application Virtualisation has a number of benefits over traditional method of application deployment <sup>1,2</sup>:

  * Uses fewer resources than running applications in a separate virtual machine or remotely from a Remote Desktop Server
  * Run incompatible applications side-by-side, at the same time and with minimal regression testing against one another
  * Implement the security principle of least privilege by removing the requirement for end-users to have Administrator privileges in order to run poorly written applications
  * Maintain a standard configuration in the underlying operating system across multiple computers in an organization, regardless of the applications being used
  * Accelerated application deployment, through on-demand application streaming
  * Fast application provisioning to the desktop based upon where the user is logging on from
  * Streams applications on demand to desktops, Remote Desktop Servers, and laptops
  * Automates and simplifies the application management lifecycle by significantly reducing regression and application interoperability testing
  * Reduces the end-user impacts associated with application upgrades, patching, and terminations - No reboots required, no waiting for applications to install, and no need to uninstall when retiring applications

## How Application Virtualisation Works

(_Note_, this section is from the App-V product page, but the general concepts apply to all application virtualisation products) Virtualized application environments enable each application to bring its own set of configurations and run without any installation within a virtual run-time abstraction layer on the client, so dependencies or effects on the configuration of the operating system are minimized. However, since applications execute locally, they run with full performance, functionality, and access to local services—including cut and paste, OLE, printing, network drives, and attached devices.<sup>3</sup>

<table width="650" border="0" cellspacing="0" cellpadding="4">
  <tr>
    <td valign="top" width="290">
      <img class="wlDisabledImage" style="margin: 0px; display: inline; border: 0px;" title="techoverview-grid-3_thumb" src="{{site.baseurl}}/media/2010/06/techoverviewgrid3_thumb.jpg" alt="techoverview-grid-3_thumb" width="280" height="215" border="0" />
    </td>
    
    <td valign="top">
      <strong>Standard Operating System Environment</strong>: In standard OS environments, applications install their settings onto the host operating system, hard-coding the entire system to fit that application's needs. Other applications' settings can be overwritten, possibly causing them to malfunction or break.<sup>3</sup>
    </td>
  </tr>
  
  <tr>
    <td valign="top" width="290">
      <img class="wlDisabledImage" style="margin: 0px; display: inline; border: 0px;" title="techoverview-grid-2_thumb" src="{{site.baseurl}}/media/2010/06/techoverviewgrid2_thumb.jpg" alt="techoverview-grid-2_thumb" width="280" height="275" border="0" />
    </td>
    
    <td valign="top">
      <strong>The Virtual Application Environment</strong>: With application virtualization, each application brings down its own set of configurations on-demand, and executes in a way so that only it sees its own settings.<sup>3</sup>
    </td>
  </tr>
  
  <tr>
    <td valign="top" width="290">
      <img class="wlDisabledImage" style="display: inline; border: 0px;" title="techoverview-grid-1_thumb" src="{{site.baseurl}}/media/2010/06/techoverviewgrid1_thumb.jpg" alt="techoverview-grid-1_thumb" width="280" height="275" border="0" />
    </td>
    
    <td valign="top">
      <strong>Side-by-Side Virtualization</strong>: Each virtual application brings down its own set of configurations and can run side by side without the settings conflicting with each other—or the host operating system. Despite this separation, inter-application communication with other virtual applications and those installed locally is preserved, allowing for cut and paste, OLE, and all other standard operations.<sup>3</sup>
    </td>
  </tr>
</table>

Sources and Links to more information about application virtualisation:

  * <sup>1 </sup>Wikipedia’s article on [Application Virtualization](http://en.wikipedia.org/wiki/Application_virtualization)
  * <sup>2 </sup>MDOP: [Application Virtualization](http://www.microsoft.com/windows/enterprise/products/mdop/app-v.aspx)
  * <sup>3</sup> [Microsoft Application Virtualization Technical Overview](http://www.microsoft.com/systemcenter/appv/techoverview.mspx)
  * Ruben Spruijt’s [Application Virtualization Solutions Overview and Feature Compare Matrix](http://www.virtuall.nl/view-document-details/application-virtualization-solutions-overview-and-feature-compare-matrix)