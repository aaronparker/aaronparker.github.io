---
id: 507
title: Remote Server Administration Tools Available
date: 2008-03-25T21:48:48+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/windows/remote-server-administration-tools-available
permalink: /remote-server-administration-tools-available/
dsq_thread_id:
  - "195380280"
categories:
  - Microsoft
tags:
  - RSAT
---
The wait is finally over - the Microsoft Remote Server Administration Tools are available. The RSAT also includes a the command line version of the tools as well. There is a knowledge base article, [KB941314](http://support.microsoft.com/kb/941314), but it's not yet available.

> Microsoft Remote Server Administration Tools (RSAT) enables IT administrators to remotely manage roles and features in Windows Server 2008 from a computer running Windows Vista SP1. It includes support for remote management of computers running either a Server Core or full installation option of Windows Server 2008. After you install this item, you may have to restart your computer.

  * [Microsoft Remote Server Administration Tools for Windows Vista](http://www.microsoft.com/downloads/details.aspx?FamilyID=9ff6e897-23ce-4a36-b7fc-d52065de9960&DisplayLang=en)
  * [Microsoft Remote Server Administration Tools for Windows Vista for x64-based Systems](http://www.microsoft.com/downloads/details.aspx?FamilyID=d647a60b-63fd-4ac5-9243-bd3c497d2bc5&DisplayLang=en)&#160;

To install the tools, you'll need to first install the update, then go to _Control Panel_ / _Programs and Features_ and select _Turn Windows Features On or Off_ and select the tools you require. Don't forget the [IIS 7.0 Manager]({{site.baseurl}}/off-site-news/iis-70-manager-released-rsat-soon-too) and the [Group Policy Preferences Client Side Extensions]({{site.baseurl}}/off-site-news/group-policy-preference-client-side-extensions-available) so you can start using those on your client machines too.