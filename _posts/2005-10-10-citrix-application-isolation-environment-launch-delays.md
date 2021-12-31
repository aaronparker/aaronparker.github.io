---
id: 288
title: Citrix Application Isolation Environment launch delays
date: 2005-10-10T15:23:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/citrix-application-isolation-environment-launch-delays
permalink: /citrix-application-isolation-environment-launch-delays/
categories:
  - Citrix
tags:
  - Presentation-Server
---
In a [previous topic](http://blogs.virtualserver.tv/blogs/parky/archive/2005/08/16/37.aspx), I used the Application Isolation Environment feature in Citrix Presentation Server 4.0 to solve an issue where sites require different versions on the Java VM. A side effect of this was, however, that the application would take around 60 seconds to launch. Turns out the issue pops up on Windows Server 2003 Service Pack 1 and has to do with certificate autoenrollment. Essentially a 60 second delay is implemented to speed things up... Hmm, let ponder that for a second, accept it and move on. To relieve my application launch delay issue, I created the following registry key, the planets aligned, and all worked well.

<blockquote dir="ltr">
  <p>
    <font face="Courier New">HKEY_CURRENT_USER\SOFTWARE\Microsoft\Cryptography\AutoEnrollment\AEExpress</font>
  </p>
</blockquote>

Source: [Certificate Autoenrollment in Windows Server 2003](http://www.microsoft.com/technet/prodtechnol/windowsserver2003/technologies/security/autoenro.mspx)