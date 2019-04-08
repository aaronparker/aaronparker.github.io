---
id: 92
title: 'Configure Vista's KMS on Windows Server 2003'
date: 2007-03-01T00:02:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/configure-vistas-kms-on-windows-server-2003
permalink: /configure-vistas-kms-on-windows-server-2003/
categories:
  - Applications
tags:
  - Windows-Vista
---
Unfortunately life with Windows Vista means living with Microsoft's [Volume Activation 2.0](http://www.microsoft.com/technet/windowsvista/plan/faq.mspx). For complete information on Volume Activation 2.0 see this TechNet page:

[Windows Vista Volume Activation 2.0 Step-By-Step Guide](http://www.microsoft.com/technet/windowsvista/plan/volact1.mspx)

When deploying Windows Vista in the enterprise you have the choice of Multiple Activation Keys or Key Management Services (KMS) keys. The KMS uses a service you install on Windows Server 2003 and is already install on Windows Vista or Windows Server Longhorn. Note that this machine must be a physical computer, you can install the KMS in a virtual machine, but when you use the configuration utility it will give you an error.

There's a fair amount of reading you'll have to do to work out how to get the KMS up and running, but if you're like me and you have the attention span of a goldfish, here's the short version:

**1**. Download the Key Management Service for Windows Server 2003 SP1“ there are [x86](http://www.microsoft.com/downloads/details.aspx?FamilyID=81d1cb89-13bd-4250-b624-2f8c57a1ae7b&DisplayLang=en) and [x64](http://www.microsoft.com/downloads/details.aspx?FamilyID=03fe69b2-6244-471c-80d2-b4171fb1d7a5&DisplayLang=en) versions available.

**2**. Install the KMS on a physical machine running Windows Server 2003. The same machine you might be using for [WDS](http://technet.microsoft.com/en-us/windowsvista/aa905118.aspx) could be the best candidate.

**3**. Add your Windows Vista KMS key to the KMS host:

```powershell
C:\WINDOWS\system32>cscript slmgr.vbs /ipk XXXXX-XXXXX-XXXXX-XXXXX-XXXXX
Microsoft (R) Windows Script Host Version 5.6
Copyright (C) Microsoft Corporation 1996-2001. All rights reserved.
Installed product key XXXXX-XXXXX-XXXXX-XXXXX-XXXXX successfully.
```

**4**. Activate your KMS host with Microsoft:

```powershell
C:\WINDOWS\system32>cscript slmgr.vbs /ato
Microsoft (R) Windows Script Host Version 5.6
Copyright (C) Microsoft Corporation 1996-2001. All rights reserved.
This operation connects over the Internet to send the appropriate computer information, such as the types of hardware you are using and the product ID, to the Microsoft activation server. By using this Software, you consent to the transmission of this information. Microsoft does not use the information to identify or contact you.
Do you want to continue [y/n]? y
Activating Windows(TM) Server 2003 KMS, KmsW2k3Prs edition (aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa) ...
Product activated successfully.
You can now view the status of your KMS server:
C:\WINDOWS\system32>cscript slmgr.vbs /dli
Microsoft (R) Windows Script Host Version 5.6
Copyright (C) Microsoft Corporation 1996-2001. All rights reserved.
Name: Windows(TM) Server 2003 KMS, KmsW2k3Prs edition
Description: Windows(TM) Server 2003 KMS, VOLUME_KMS channel
Partial Product Key: J3YKD
License Status: Licensed
Key Management Service is enabled on this machine
Current count: 0
Listening on Port: 1688
DNS publishing enabled
KMS priority: Normal
```

Now your KMS server should be running you can deploy Windows Vista using the same KMS key. Windows Vista will query DNS to find your KMS server and activate against it. Give DNS time to replicate and you can then see if your KMS server is registred correctly with NSLOOKUP:

```powershell
C:\> nslookup -type=srv _vlmcs._tcp
Server: dc.company.local
Address: 192.168.1.17:53
_vlmcs._tcp.company.local SRV service location:
priority = 0
weight = 0
port = 1688
svr hostname = kmshost.company.local
kmshost.company.local internet address = 192.168.1.23
```

As alternative to quering DNS to find the KMS host, you can hard code a client to use a particular KMS host:

```powershell
C:\Windows\System32\cscript slmgr.vbs -skms <KMS_FQDN>[:port]
```

The best place to get questions and answers about Volume Activation 2.0 is the FAQ page:

[Windows Vista Volume Activation 2.0](http://www.microsoft.com/technet/windowsvista/plan/faq.mspx)
