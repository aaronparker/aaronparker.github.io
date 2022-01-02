---

title: Presentation Server and the Sun Java VM
date: 2005-10-05T14:50:00+10:00
author: Aaron Parker
layout: post

permalink: /presentation-server-and-the-sun-java-vm/
dsq_thread_id:
  - "195379043"
categories:
  - Citrix
tags:
  - Java
  - Presentation-Server
---
If I could live in a world without Java, I'd be happy...

The Citrix Presentation Server 4.0 Management Console requires a specific version of the Sun Java VM to be installed before the console's setup program will run. The version required is `1.4.2_06` and the latest version of the VM from Sun is `1.5_02`. I usually install the 1.5 version to support Java in Internet Explorer, so it's a pain to have to install both. A little cheating can be used to get the 1.5 VM to support the Management Console. The following commands will fool the setup program into thinking that the correct version is installed and all will be well.

```cmd
REG ADD "HKLM\SOFTWARE\JavaSoft\Java Runtime Environment\1.4" /v JavaHome /d "C:\Program Files\Java\jre1.5.0_04" /f
REG ADD "HKLM\SOFTWARE\JavaSoft\Java Runtime Environment\1.4" /v MicroVersion /d "2" /f
REG ADD "HKLM\SOFTWARE\JavaSoft\Java Runtime Environment\1.4" /v RuntimeLib /d "C:\Program Files\Java\jre1.5.0_04\bin\client\jvm.dll" /f
```

I found this information on page 76 in the [Advanced Concepts Guide for Presentation Server 4.0](http://support.citrix.com/kb/entry!default.jspa?categoryID=619&externalID=CTX107059&fromSearchPage=true).
