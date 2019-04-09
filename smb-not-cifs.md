---
id: 5164
title: 'SMB not CIFS'
date: 2016-09-19T00:30:15+10:00
author: Aaron Parker
layout: page
guid: https://stealthpuppy.com/?page_id=5164
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "5157482281"
---
Information Technology should be approached with a scientific methodology and therefore our language should be exact when we're discussing IT topics. It's way past time to drop the term CIFS and use the correct acronym when we're referring to SMB.

![Even Inigo Montoya knows not to use 'CIFS']({{site.baseurl}}/media/2016/09/CIFS-Word.png)

CIFS has persisted well past its expiry date. No supported versions of Windows use CIFS and SMB has changed dramatically since the introduction of SMB 2.0 in Windows Vista and Windows Server 2008.

# Why?

The versions of SMB that we discuss in relation to currently supported versions of Windows (and other products) are not the same as SMB 1.0 or CIFS; therefore you should not confuse your audience. Here's another way of putting it - you are not your parents or grandparents and no-one refers to you with your father's name. It's the same with CIFS and SMB.

# What is CIFS?

CIFS, or Common Internet File System, is a network protocol that provides clients access to files on remote servers. It is a dialect of SMB 1.0. From the [Introduction section in [MS-CIFS]: Common Internet File System Protocol](https://msdn.microsoft.com/en-us/library/ee441901.aspx) on MSDN:

> The extended CIFS Protocol is known as the Server Message Block (SMB) Version 1.0 Protocol
> 
> CIFS is a dialect of the Server Message Block (SMB) protocol, which was originally developed by IBM Corporation and then further enhanced by Microsoft, IBM, Intel, 3Com, and others. There are several dialects of SMB. A standard for the SMB protocol, covering dialects prior to CIFS, was published by X/Open (now The Open Group) as [XOPEN-SMB].
> 
> The meaning of the term "CIFS" has changed since it was first introduced. It was originally used to indicate a proposed standard version of SMB based upon the design of the Windows NT 4.0 operating system and Windows 2000 operating system implementations. In some references, "CIFS" has been used as a name for the SMB protocol in general (all dialects) and, additionally, the suite of protocols that support and include SMB. In this document, the term "CIFS" is used specifically to identify the Windows NT LAN Manager (NTLM) dialect of SMB as designed for use with Windows: in particular, Windows NT Server 3.51 operating system and Windows NT Server 4.0 operating system, Windows NT Workstation 4.0 operating system, and Microsoft Windows 98 operating system.

So, unless you are specifically talking about Windows NT 3.x and 4.x, you should not use 'CIFS' and we can no longer interchangeably use CIFS and SMB.

# What is SMB?

SMB, or Server Message Block, is a network protocol that provides clients access to files on remote servers. Originally developed by IBM, SMB has been extended by Microsoft and used in OS/2, LAN Manager and Windows. SMB has gone through several revisions and since SMB 2.0 (introduced with Windows Vista), is quite different to CIFS and SMB 1.0.

SMB 2.0 and above provide much-improved performance than SMB 1.0 or CIFS, have very different specifications and therefore cannot be considered the same as CIFS or SMB 1.0. If someone says 'CIFS' today, they're most likely referring to SMB 2+; however, their terminology is incorrect.

# History

The various versions of SMB available with Windows and other operating systems:

  * **SMB 1.0** - [1980's - 2007] LAN Manager for MS-DOS / OS/2, Windows for Workgroup 3.1.1, Windows NT 3.x, Windows 95, Windows NT 4.x, Windows 98, Windows 2000, Windows ME, Windows XP, Windows Server 2003 
      * Windows NT 3.x, Windows NT 4.x and Windows 98 used the SMB dialect that can be most closely identified as CIFS
      * [1997] [Common Internet File System 1.0 submitted as a draft to IETF](https://tools.ietf.org/html/draft-leach-cifs-v1-spec-01)
      * Windows 2000 introduced the first version of SMB that was not reliant on NetBIOS
  * **SMB 2.0** - [2007] Windows Vista, Windows Server 2008
  * **SMB 2.1** - [2009] Windows 7, Windows Server 2008 R2
  * **SMB 3.0** - [2012] Windows 8, Windows Server 2012 
      * Originally called SMB 2.2
      * First version of Windows to make SMB 1.0 optional
  * **SMB 3.0.2** - [2013] Windows 8.1, Windows Server 2012 R2
  * **SMB 3.1.1** - [2015] Windows 10, Windows Server 2016

# <span style="color: #ff0000;">Stop Using SMB1</span>

Here's a really important article from Microsoft on why you should stop using SMB1 in your environments: [Stop using SMB1](https://blogs.technet.microsoft.com/filecab/2016/09/16/stop-using-smb1/)

# Further Reading

For further reading on why you should use 'SMB', see the following articles:

## 3rd Party Articles

  * [Server Message Block at Wikipedia](http://en.wikipedia.org/wiki/Server_Message_Block)
  * [List of products that support SMB](http://en.wikipedia.org/wiki/List_of_products_that_support_SMB)
  * [Why You Should Never Again Utter The Word, “CIFS”](http://blog.fosketts.net/2012/02/16/cifs-smb/)
  * [The Difference Between CIFS and SMB](http://blog.varonis.com/the-difference-between-cifs-and-smb/)
  * [SMB on steroids but CIFS lord isn’t pleased](http://storagegaga.com/smb-on-steroids-but-cifs-lord-isnt-pleased/)
  * [SMB 3.0 – New opportunities for Windows Environment](http://snia.org/sites/default/files/SNIA_SMB3_final.pdf) (PDF)

## Microsoft Articles and Documentation

  * [Microsoft SMB Protocol and CIFS Protocol Overview](https://msdn.microsoft.com/en-us/library/windows/desktop/aa365233(v=vs.85).aspx)
  * [SMB 1.0 protocol specification](https://msdn.microsoft.com/en-us/library/cc246232.aspx)
  * [SMB 2 and SMB 3 protocol specifications](https://msdn.microsoft.com/en-us/library/cc246483.aspx)
  * [[MS-CIFS]: Common Internet File System (CIFS) Protocol](https://msdn.microsoft.com/en-us/library/ee442092.aspx)
  * [What’s new in SMB 3.1.1 in the Windows Server 2016 Technical Preview 2](https://blogs.technet.microsoft.com/josebda/2015/05/05/whats-new-in-smb-3-1-1-in-the-windows-server-2016-technical-preview-2/)
