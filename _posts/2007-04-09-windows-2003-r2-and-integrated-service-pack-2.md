---
id: 67
title: Windows 2003 R2 and Integrated Service Pack 2
date: 2007-04-09T23:02:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/windows-2003-r2-and-integrated-service-pack-2
permalink: /windows-2003-r2-and-integrated-service-pack-2/
dsq_thread_id:
  - "195378534"
categories:
  - Microsoft
tags:
  - Windows-Server
---
I recently ran into a spot of trouble with integrating Windows Server 2003 Service Pack 2 into Windows Server 2003 R2. After successfully installing Windows Server 2003 with integrated Service Pack 2 on a server I ran the R2 installer (SETUP2.EXE) and was greeted with this message:

> &#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;  
> Windows Server 2003 R2 Setup Wizard  
> &#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;  
> Setup cannot continue because this product disc is incompatible with the service pack installed on this computer. To complete the installation of Windows Server 2003 R2, you will need to insert the latest version of Windows Server 2003 R2 Disc 2.  
> &#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;  
> OK  
> &#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;

A bit of digging around resulted in [this page on TechNet](http://technet2.microsoft.com/WindowsServer/en/library/c050419b-98a2-4802-b719-629a33a332391033.mspx) that indicates that you should be able to run the R2 components installation directly on a server with Service Pack 2 installed.

Obviously this isn&#8217;t the case and until Microsoft release R2 media with SP2 integrated you will need to modify one of the R2 source files. Open <span style="font-family: Courier New">R2INTL.INF</span> in the <span style="font-family: Courier New">\CMPNENTS\R2</span> folder from disc 2 and change the following line from:

<p class="code">
  R2SPLevel = 1
</p>

to:

<p class="code">
  R2SPLevel = 2
</p>

and your R2 installation should work. I&#8217;ve tested this on a single machine and everything is working as expected.

Alternatively you can follow this process to create a single ISO/DVD that includes both Windows 2003 R2 CDs slipstreamed with Service Pack 2:

  1. Create a local folder to copy the contents of each CD to, e.g. C:\WINR2
  2. Copy the contents of each Windows Server 2003 R2 disc to the folder, but copy CD2 first
  3. Remove the read-only attributes of the contents of C:\WINR2
  4. Slipstream the service pack into this folder
  5. Customise as required and write as an ISO or DVD