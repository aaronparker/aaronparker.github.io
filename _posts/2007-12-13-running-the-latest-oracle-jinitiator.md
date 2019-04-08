---
id: 385
title: Running the latest Oracle JInitiator
date: 2007-12-13T16:35:14+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/deployment/running-the-latest-oracle-jinitiator
permalink: /running-the-latest-oracle-jinitiator/
dsq_thread_id:
  - "195379894"
categories:
  - Automation
tags:
  - Java
  - Oracle
---
Here's a really simple method for using running the latest version of the Oracle JInitiator even though your application may require a specific version. DISCLAIMER: This is most likely unsupported by Oracle but it thus far it's worked for me. If you're worried about your applications breaking don't implement this hack.

You can download the latest version of the JInitiator from the [JInitiator Download Page](http://www.oracle.com/technology/software/products/developer/htdocs/jinit.htm). In this case I've used version 1.3.1.28 and modified the client to call this version when it actually required version 1.3.1.17.

Getting this to work requires adding the CLSID (or CLASSID) of the older version of JInitiator and modifying it to point to the installed version. You can find the CLSID of each JInitiator version on the download page. Here's an example of a REG file with the required registry entries, pointing 1.3.1.17 to 1.3.1.28:

[code]Windows Registry Editor Version 5.00  
[HKEY\_LOCAL\_MACHINE\Software\Classes\CLSID\{CAFECAFE-0013-0001-0017-ABCDEFABCDEF}]  
@="JInitiator 1.3.1.17"

[HKEY\_LOCAL\_MACHINE\Software\Classes\CLSID\{CAFECAFE-0013-0001-0017-ABCDEFABCDEF}\Control]

[HKEY\_LOCAL\_MACHINE\Software\Classes\CLSID\{CAFECAFE-0013-0001-0017-ABCDEFABCDEF}\InprocServer32]  
@="C:\\Program Files\\Oracle\\JInitiator 1.3.1.28\\bin\\npjinit13128.dll"  
"ThreadingModel"="Apartment"

[HKEY\_LOCAL\_MACHINE\Software\Classes\CLSID\{CAFECAFE-0013-0001-0017-ABCDEFABCDEF}\MiscStatus]  
@="0"

[HKEY\_LOCAL\_MACHINE\Software\Classes\CLSID\{CAFECAFE-0013-0001-0017-ABCDEFABCDEF}\MiscStatus\1]  
@="2449"

[HKEY\_LOCAL\_MACHINE\Software\Classes\CLSID\{CAFECAFE-0013-0001-0017-ABCDEFABCDEF}\ProgID]  
@="Oracle.JavaBeansBridge.1"

[HKEY\_LOCAL\_MACHINE\Software\Classes\CLSID\{CAFECAFE-0013-0001-0017-ABCDEFABCDEF}\Programmable]

[HKEY\_LOCAL\_MACHINE\Software\Classes\CLSID\{CAFECAFE-0013-0001-0017-ABCDEFABCDEF}\Version]  
@="1.1"

[HKEY\_LOCAL\_MACHINE\Software\Classes\CLSID\{CAFECAFE-0013-0001-0017-ABCDEFABCDEF}\VersionIndependentProgID]  
@="Oracle.JavaBeansBridge"[/code]

This shows the CLSID (the GUID between the {} brackets) for JInitiator 1.3.1.17 and as you can see, the default value for the InprocServer32 is where the "magic" happens.

Secondly you may also want to add another registry value that fools the JRE into seeing version 1.3.1.17 as well. This command will add the correct registry entry for you.

[code]REG ADD HKLM\SOFTWARE\Oracle\JInitiator\1.3.1.17 /v JavaHome /d "C:\Program Files\Oracle\JInitiator 1.3.1.28" /t REG_SZ[/code]

You will then see each version listed in the JInitiator Control Panel applet:

![jinitiator.PNG](http://stealthpuppy.com/wp-content/uploads/2007/12/jinitiator.PNG) 

This is pretty much the same approach you can use with t[he Sun JRE](http://stealthpuppy.com/unattended/unattended-install-sun-java-runtime-environment-16-update-3) to fool applications into seeing older versions, allowing to install only the latest (and greatest?).