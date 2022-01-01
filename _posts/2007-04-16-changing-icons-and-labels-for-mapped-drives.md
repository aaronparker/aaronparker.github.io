---

title: Changing Icons and Labels for Mapped Drives
date: 2007-04-16T18:36:00+10:00
author: Aaron Parker
layout: post

permalink: /changing-icons-and-labels-for-mapped-drives/
categories:
  - Microsoft
tags:
  - Windows
---
I had a need on a Terminal Server project last year to change the icon and label for client-mapped drives in use by Citrix Presentation Server clients. This proved to be quite easy to implement and actually worked well for users as they could more easily identify the drive mapped to their local C: drive.

**Change Drive Icons and Local Drive Labels** 

This is a machine level registry change and supports changing the icon for all drive types. Only the label for local drives can be change here, network drives must be changed via HKCU. This type of label will not take effect if a label (using the LABEL command or via Explorer) already exists on the drive. This example will change the drive icon and label for drive V.

<p class="code">
  [quickcode:noclick][HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\DriveIcons\V\DefaultIcon]<br /> @="C:\\WINDOWS\\SYSTEM32\\SHELL32.DLL,8&#8243;[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\DriveIcons\V\DefaultLabel]<br /> @="Local Drive"[/quickcode]
</p>

**Change Network Drive Labels** 

This registry change must be done in HKEY\_CURRENT\_USER and supports network drives only, i.e. UNC mapped or RDP/ICA mapped drives. Replace backslashes with the # symbol. This example add the label "Common Data" to the drive mapped to \\SERVER\Share regardless of the actual drive letter mapped.

<p class="code">
  [quickcode:noclick]HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\MountPoints2##SERVER#Share]<br /> "_LabelFromReg"="Common Data"[/quickcode]
</p>