---
id: 485
title: New Java Runtime Coming. Set Phasers To Yawn
date: 2008-02-27T16:00:04+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/deployment/new-java-runtime-coming-set-phasers-to-yawn
permalink: /new-java-runtime-coming-set-phasers-to-yawn/
dsq_thread_id:
  - "195380224"
categories:
  - Automation
tags:
  - Java
---
<img src="http://stealthpuppy.com/wp-content/uploads/2008/02/sunjavalogo.png" border="0" alt="SunJavaLogo" width="96" height="126" align="left" /> Sun are preparing a [new Java Runtime Environment](https://jdk6.dev.java.net/6uNea.html) for release later this year and there&#8217;s a couple of changes to this version that have some bearing on deployment. I can&#8217;t imagine there is an enterprise out there that doesn&#8217;t have to deal with Java applications.

The biggest change is that from this new version onwards, the point releases (read: updates, like 1.6.0\_3, 1.6.0\_2 etc) will be a thing of the past. New updates will be installed on top of existing installed versions, so you will only see a single version installed to: `C:\Program Files\Java\jre6`. New releases would then be installed to `C:\Program Files\Java\jre7` etc. This is good news as we should no longer have applications that expect a specific point release of the JRE.

Here&#8217;s what Sun has to say about the new update process:

> For current users of Java SE, the JRE update mechanism has also been improved, using a patch-in-place mechanism that translates in a faster and more reliable update process (the patch in place mechanism will take effect for end users who upgrade from this update release or later to a new update release). As an added benefit, follow-on update releases will no longer be listed as separate items in the Windows &#8220;Add or Remove Programs&#8221; dialog.

Sounds good to me, so far so good. But there&#8217;s a new feature that&#8217;s got me asking Why?, it&#8217;s the Java Quick Starter service.

<img src="http://stealthpuppy.com/wp-content/uploads/2008/02/javaquickstarter.png" border="0" alt="JavaQuickStarter" width="659" height="37" /> 

This is installed on Windows XP and even though there are [indications that the service should not be installed](http://forums.java.net/jive/thread.jspa?threadID=31508&tstart=15) on Windows Vista, it was during my testing. However, this is still beta code. This is Sun&#8217;s description of the Java Quick Starter service:

> The Quick Starter feature will prefetch portions of the JRE into memory, substantially decreasing the average JRE cold start-up time (the time that it takes to launch a Java application for the first time after a fresh reboot of a PC).

Great, now we&#8217;re lumped with yet another application with a quick launch process. To me bundling a quick launch executable that continually runs in the background, is a sign that your application is bloated. If you believe the hype though, your applications run faster with Java. Faster than what? Certaintly not native applications.

<img src="http://stealthpuppy.com/wp-content/uploads/2008/02/fasterwithjava.png" border="0" alt="fasterwithjava.png" /> 

Amazingly this service runs as Local System. That&#8217;s just asking for trouble, wouldn&#8217;t [Local Service be a better option](http://www.microsoft.com/technet/security/guidance/serversecurity/serviceaccount/sspgch02.mspx#EBH)? If you want to continue running the Quick Starter service, keep an eye on any security bulletins for the JRE. Owning the service will give you full access to the users machine.

### Silent Install

Scripting the installation of the runtime is very simple. It uses the same Windows Installer based setup as previous versions, so you can pass properties to it on the command line.

In testing the JAVAUPDATE property is actually ignored as it is with previous versions, so you will need to add some registry entries to disable the auto-update component. Additionally, I could find no property in the MSI that will prevent the installation of the Java Quick Starter services, it must be removed after installation.

This script will install the Sun JRE, remove the Java Quick Starter service and disable the automatic updater. You could improve on this script by creating your own transform file to set the custom properties and actions instead.

[code]@ECHO OFF  
ECHO Sun J2SE Runtime Environment 6 Update N..  
START /WAIT jre-6u10-windows-i586-p-s.exe /passive /norestart ADDLOCAL=jrecore JAVAUPDATE=0 JU=0 AUTOUPDATECHECK=0 SYSTRAY=0 IEXPLORER=1 MOZILLA=1 REBOOT=ReallySuppress  
"%ProgramFiles%\Java\jre6\bin\jqs.exe" -unregister  
REG ADD "HKLM\SOFTWARE\JavaSoft\Java Update\Policy" /v EnableJavaUpdate /t REG_DWORD /d 0 /f  
REG ADD "HKLM\SOFTWARE\JavaSoft\Java Update\Policy" /v EnableAutoUpdateCheck /t REG_DWORD /d 0 /f  
REG ADD "HKLM\SOFTWARE\JavaSoft\Java Update\Policy" /v NotifyDownload /t REG_DWORD /d 0 /f  
REG ADD "HKLM\SOFTWARE\JavaSoft\Java Update\Policy" /v NotifyInstall /t REG_DWORD /d 0 /f[/code]

<p class="important">
  The information in this article is based on beta code. Hopefully it also applies to the final code when released but who can tell the future? If I could I certaintly wouldn&#8217;t be writing about Java.
</p>