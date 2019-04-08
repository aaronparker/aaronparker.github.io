---
id: 290
title: Presentation Server and the Sun Java VM
date: 2005-10-05T14:50:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/presentation-server-and-the-sun-java-vm
permalink: /presentation-server-and-the-sun-java-vm/
dsq_thread_id:
  - "195379043"
categories:
  - Citrix
tags:
  - Java
  - Presentation-Server
---
If I could live in a world without Java, I&#8217;d be happy...

The Citrix Presentation Server 4.0 Management Console requires a specific version of the Sun Java VM to be installed before the console&#8217;s setup program will run. The version required is 1.4.2\_06 and the latest version of the VM from Sun is 1.5\_02. I usually install the 1.5 version to support Java in Internet Explorer, so it&#8217;s a pain to have to install both. A little cheating can be used to get the 1.5 VM to support the Management Console. The following commands will fool the setup program into thinking that the correct version is installed and all will be well.

<blockquote dir="ltr">
  <p>
    <font size="2" face="Courier New">REG ADD &#8220;HKLM\SOFTWARE\JavaSoft\Java Runtime Environment\1.4&#8221; /v JavaHome /d &#8220;C:\Program Files\Java\jre1.5.0_04&#8221; /f<br /> REG ADD &#8220;HKLM\SOFTWARE\JavaSoft\Java Runtime Environment\1.4&#8221; /v MicroVersion /d &#8220;2&#8221; /f<br /> REG ADD &#8220;HKLM\SOFTWARE\JavaSoft\Java Runtime Environment\1.4&#8221; /v RuntimeLib /d &#8220;C:\Program Files\Java\jre1.5.0_04\bin\client\jvm.dll&#8221; /f</font>
  </p>
</blockquote>

I found this information on page 76 in the [Advanced Concepts Guide for Presentation Server 4.0](http://support.citrix.com/kb/entry!default.jspa?categoryID=619&externalID=CTX107059&fromSearchPage=true).