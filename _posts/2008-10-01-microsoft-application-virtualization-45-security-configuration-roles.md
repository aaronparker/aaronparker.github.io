---
id: 725
title: Microsoft Application Virtualization 4.5 Security Configuration Roles
date: 2008-10-01T10:55:20+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/microsoft-application-virtualization-45-security-configuration-roles
permalink: /microsoft-application-virtualization-45-security-configuration-roles/
categories:
  - Microsoft
tags:
  - SoftGrid
---
Security configuration roles for Application Virtualisation 4.5, which makes the Security Configuration Wizard in Windows Server 2003 and Windows Server 2008 App-V aware, [have been released to the Downloads Centre](http://www.microsoft.com/downloads/details.aspx?FamilyID=63d33346-b864-4284-8c5f-dce80c451e83&DisplayLang=en).

> The Microsoft Application Virtualization 4.5 Security Configuration Roles (SCW) can be used to help protect and harden your Application Virtualization environment on Windows Server 2003 and 2008 by closing or disabling unnecessary ports and services reducing the overall attack surface.
> 
> Feature Bullet Summary:  
> The Microsoft Application Virtualization 4.5 SCW Roles contain hardening definitions for:
> 
>   * Microsoft Application Virtualization 4.5 Management Server
>   * Microsoft Application Virtualization 4.5 Streaming Server
>   * Microsoft Application Virtualization 4.5 Management Service

You’ll first need to register these roles with the SCW to use them. This script will register the files on Windows Server 2003 (after you've first installed the roles on the Management or Streaming server):

```cmd
@ECHO OFF  
PUSHD "%USERPROFILE%"  
scwcmd register /kbname:AppVirt45 /kbfile:"%ProgramFiles%\Microsoft System Center Application Virtualization 4.5 Security Configuration Wizard Roles\Windows Server 2003\AppV\_Management\_Server.XML"  
scwcmd register /kbname:AppVirt45 /kbfile:"%ProgramFiles%\Microsoft System Center Application Virtualization 4.5 Security Configuration Wizard Roles\Windows Server 2003\AppV\_Management\_Server.XML"  
scwcmd register /kbname:AppVirt45 /kbfile:"%ProgramFiles%\Microsoft System Center Application Virtualization 4.5 Security Configuration Wizard Roles\Windows Server 2003\AppV\_Management\_Server.XML"  
POPD
```

You’ll then see the App-V roles in SCW:

![]({{site.baseurl}}/media/2008/10/appvscw1.png)

![]({{site.baseurl}}/media/2008/10/appvscw2.png)
