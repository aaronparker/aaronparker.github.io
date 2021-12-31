---

title: Setting Visio Viewer As Default
date: 2008-06-03T12:00:05+10:00
author: Aaron Parker
layout: post

permalink: /setting-visio-viewer-as-default/
categories:
  - Applications
tags:
  - Terminal Server
  - Visio
---
Got both Visio Viewer 2007 and Visio 2007 on the same machine but want to set Visio Viewer as the default for some users? Here's what you'll need to do.

With Visio 2007 and Visio Viewer on the same machine, Visio will the default application for .VSD files, so we need change the default application per user, taking advantage of the HKCU\Software\Classes key.

The following registry entries will set Visio Viewer as the default. You can deploy this as a .REG file via a logon script or better yet, use a workspace management tool such as Group Policy Preferences, AppSense Environment Manager or RES PowerFuse.

```
Windows Registry Editor Version 5.00

[HKEY\_CURRENT\_USER\Software\Classes\.vsd]  
@="VisioViewer.Viewer"  
"Content Type"="application/vnd.ms-visio.viewer"

[HKEY\_CURRENT\_USER\Software\Classes\.vsd\shellex]

[HKEY\_CURRENT\_USER\Software\Classes\.vsd\shellex\{8895b1c6-b41f-4c1c-a562-0d564250836f}]  
@="{21E17C2F-AD3A-4b89-841F-09CFE02D16B7}"

[HKEY\_CURRENT\_USER\Software\Classes\VisioViewer.Viewer]  
@="Microsoft Visio Document"

[HKEY\_CURRENT\_USER\Software\Classes\VisioViewer.Viewer\CLSID]  
@="{279D6C9A-652E-4833-BEFC-312CA8887857}"

[HKEY\_CURRENT\_USER\Software\Classes\VisioViewer.Viewer\CurVer]  
@="VisioViewer.Viewer.1"

[HKEY\_CURRENT\_USER\Software\Classes\VisioViewer.Viewer\DefaultIcon]  
@="\"C:\\Program Files\\Microsoft Office\\Office12\\VVIEWER.DLL\",-2"

[HKEY\_CURRENT\_USER\Software\Classes\VisioViewer.Viewer\shell]  
@=""

[HKEY\_CURRENT\_USER\Software\Classes\VisioViewer.Viewer\shell\open]  
@="Open"

[HKEY\_CURRENT\_USER\Software\Classes\VisioViewer.Viewer\shell\open\command]  
@="\"C:\\Program Files\\Internet Explorer\\iexplore.exe\" -nohome"

[HKEY\_CURRENT\_USER\Software\Classes\VisioViewer.Viewer\shell\open\ddeexec]  
@="\"file:%1\",,-1,,,,,"

[HKEY\_CURRENT\_USER\Software\Classes\VisioViewer.Viewer\shell\open\ddeexec\Application]  
@="IExplore"

[HKEY\_CURRENT\_USER\Software\Classes\VisioViewer.Viewer\shell\open\ddeexec\Topic]  
@="WWW_OpenURL"

[HKEY\_CURRENT\_USER\Software\Classes\VisioViewer.Viewer.1]  
@="Microsoft Visio Document"

[HKEY\_CURRENT\_USER\Software\Classes\VisioViewer.Viewer.1\CLSID]  
@="{279D6C9A-652E-4833-BEFC-312CA8887857}"  
```

Although Visio Viewer is installed as a component of Office 2007, you can download a separate installer [here](http://www.microsoft.com/downloads/details.aspx?FamilyID=d88e4542-b174-4198-ae31-6884e9edd524&DisplayLang=en) and SP1 [here](http://www.microsoft.com/downloads/details.aspx?FamilyID=14c4de7e-d940-45ec-8d56-ec2fcdf346a5&DisplayLang=en).
