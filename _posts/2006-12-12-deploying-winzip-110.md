---
id: 133
title: Deploying WinZip 11.0
date: 2006-12-12T01:12:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/deploying-winzip-110
permalink: /deploying-winzip-110/
categories:
  - Automation
---
<img src="http://stealthpuppy.com/wp-content/uploads/2008/02/winzip.png" align="left" alt="winzip.png" />Did you know that WinZip have an MSI installer available for WinZip 10.0 and 11.0? Neither did I until I was reading through their [FAQ](http://www.winzip.com/faq.htm) pages today. What I don&#8217;t get though is it&#8217;s not the default download you get for the product, you have to go looking for it on this FAQ page: [Download WinZip with 64-bit Shell Extension Support](http://www.winzip.com/xmsicust.htm). I&#8217;d like to welcome WinZip to the 21<sup>st</sup> century &#8211; Windows Installer&#8217;s only been around since 1999..

Now that we&#8217;ve got access to a Windows Installer version of WinZip setup, this means no more repackaging WinZip for deployment via Group Policy (and there was much rejoicing..) WinZip have an FAQ that details the Windows Installer properties that you can set to perform a custom deployment of WinZip:

  * [How do I customize my WinZip MSI?](http://www.winzip.com/xmsicust.htm)

The FAQ has full details of the properties you can use so I&#8217;m not going into too much detail here, but here&#8217;s the command you can use to install WinZip 11.0:

[code]MSIEXEC /I winzip110.MSI ALLUSERS=TRUE ADDDESKTOPICON=0 ADDMENUGROUP=1 ADDSTARTMENU=0 INSTALLCMD="/noqp /nopredefinedjobs /autoinstall" /QB[/code]

This will ensure that the Quick Pick icon is not added to the tray notification area and it will only add icons to the Programs folder, not the desktop and Start Menu as well. For direct links to the MSI installers look no further:

  * [WinZip 11.0 MSI Installer](http://download.winzip.com/winzip110.msi)
  * [WinZip 10.0 MSI Installer](http://download.winzip.com/winzip100.msi)