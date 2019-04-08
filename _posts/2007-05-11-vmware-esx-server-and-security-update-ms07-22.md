---
id: 43
title: VMware ESX Server and Security Update MS07-22
date: 2007-05-11T00:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/vmware-esx-server-and-security-update-ms07-22
permalink: /vmware-esx-server-and-security-update-ms07-22/
aktt_notify_twitter:
  - 'yes'
categories:
  - VMware
tags:
  - VMware
---
We've had some issues with 32bit Windows on VMware ESX 3.0 which has been causing servers that have been patched with the MS07-22 security update to freeze on boot. The severity rating for this patch is Important and it fixes a vulnerability in the Windows kernel, you can read more information about this patch here:

  * [MS07-022: Vulnerability in the Windows kernel could allow elevation of privilege](http://support.microsoft.com/kb/931784/en-us)

  * [Microsoft Security Bulletin MS07-022: Vulnerability in Windows Kernel Could Allow Elevation of Privilege (931784)](http://www.microsoft.com/technet/security/bulletin/ms07-022.mspx)

During testing, the servers would consistently not boot when this update was installed. I have also comfirmed that this update does not affect virtual machines installed in VMware Server or Virtual PC. Booting into Safe Mode and removing the update will successfully get the server up and running. I haven't found a cause and I was hoping to perform some debugging when I next get a chance. We are following up with VMware so if there isn't a fix already one should hopefully be on its' way.