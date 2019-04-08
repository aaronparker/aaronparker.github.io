---
id: 82
title: 'Windows Server 2003 SP2: What&#8217;s in it for Terminal Servers?'
date: 2007-03-13T18:01:00+10:00
author: Aaron Parker
layout: post
guid: 'http://blog.stealthpuppy.com/uncategorized/windows-server-2003-sp2-what%e2%80%99s-in-it-for-terminal-servers'
permalink: '/windows-server-2003-sp2-what%e2%80%99s-in-it-for-terminal-servers/'
aktt_notify_twitter:
  - 'yes'
categories:
  - Microsoft
tags:
  - Terminal Server
---
Now that [Service Pack 2 for Windows Server 2003](http://www.microsoft.com/technet/windowsserver/sp2.mspx) has been released, I thought that I would take a brief look at what&#8217;s new for Terminal Servers:

**New Features** 

Microsoft have a page that details [ten reasons to install Windows Server 2003 SP2](http://www.microsoft.com/technet/windowsserver/sp2/top-reasons.mspx), here&#8217;s some of the highlights that I think are great for Terminal Server environments:

  * [Windows Server 2003 SP2 Scalable Networking Pack (SNP)](http://www.microsoft.com/snp): Improvements in networking to take advantages of high speed networks.
  * [Windows Deployment Services (WDS)](http://www.microsoft.com/windowsserver/longhorn/deployment/services.mspx): WDS is a great way to deploy Windows Server 2003 using Windows PE. I&#8217;ve just completed a project where I used WDS so that I could take advantage of Windows PE 2.0.
  * [IPsec management updates](http://support.microsoft.com/kb/914841): Updates to IPsec in Windows that makes it easier to implement [server and domain isolation](http://www.microsoft.com/sdisolation).
  * Microsoft Management Console 3.0: Updates the MMC to the same version included with Windows Server 2003 R2.

**Updates** 

Microsoft has a complete [list of updates in SP2](http://support.microsoft.com/kb/914962/en-us) and 19 of them are Terminal Server specific:

  * [Your multiprocessor Microsoft Windows 2000 Server-based computer or multiprocessor Windows Server 2003-based computer may stop responding, and the keyboard may not work correctly](http://support.microsoft.com/kb/811211/)
  * [The shadow session is disconnected between two Web client computers that are running Windows Server 2003 or Windows XP](http://support.microsoft.com/kb/896679/)
  * [Error message when you try to paste data into Excel 2003 during a Terminal Services session: &#8220;Cannot empty the clipboard&#8221;](http://support.microsoft.com/kb/899266/)
  * [MS05-041: Vulnerability in Remote Desktop Protocol could allow denial of service](http://support.microsoft.com/kb/899591/)
  * [Print spooling operation in Windows Server 2003-based Terminal Services (TS) computer is slow when Remote Desktop Connection thin clients use printer redirection](http://support.microsoft.com/kb/900090/)
  * [A Terminal Services client computer may make beep sounds after you connect to a Windows Server 2003 Service Pack 1-based computer](http://support.microsoft.com/kb/901115/)
  * [A Windows Server 2003-based terminal server in a forest cannot obtain a license from a license server in a different forest](http://support.microsoft.com/kb/905687/)
  * [A memory leak occurs in the Wmiprvse.exe process when a program calls an instance of the &#8220;CWin32_TerminalService::ExecQuery&#8221; function in Windows Server 2003](http://support.microsoft.com/kb/905888/)
  * [Terminal Services Licensing Manager may stop when you add a new license on a computer that is running the Brazilian Portuguese version of Windows Server 2003](http://support.microsoft.com/kb/906207/)
  * [You cannot use a Group Policy setting to set the same mandatory profile for all the Terminal Services users in Windows Server 2003](http://support.microsoft.com/kb/908011/)
  * [The Terminal Server Licensing tool may unexpectedly quit after you install Windows Server 2003 Service Pack 1 on a Terminal Server](http://support.microsoft.com/kb/910088/)
  * [A client computer does not receive a permanent Per Device CAL from a Windows Server 2003-based license server](http://support.microsoft.com/kb/911288/)
  * [How to redirect the default printer of a Terminal Services client to a Windows Server 2003 Terminal Server session](http://support.microsoft.com/kb/911913/)
  * [The session redirection function does not work correctly on Windows Server 2003-based servers that have Terminal Server enabled](http://support.microsoft.com/kb/913948/)
  * [The Terminal Server object and the object of the Terminal Server session for a Windows Server 2003 Terminal Server are unavailable when you use Performance Monitor on a remote computer](http://support.microsoft.com/kb/914539/)
  * [You cannot connect to a Windows Server 2003-based terminal server when the Remote Desktop Web Connection ActiveX control screen resolution is higher than 1600 by 1200 pixels on a client computer](http://support.microsoft.com/kb/915947/)
  * [An IBM DB2 program stops responding on a Windows Server 2003-based computer that is running Terminal Services](http://support.microsoft.com/kb/916667/)
  * [FIX: You cannot reconnect a Citrix ICA client to an instance of Citrix Presentation Server that is running on a Windows Server 2003 Service Pack 1-based computer](http://support.microsoft.com/kb/917046/)
  * [You cannot connect to a Windows Server 2003-based terminal server when the screen resolution for the Remote Desktop Web Connection ActiveX control is higher than 1600 by 1200 pixels](http://support.microsoft.com/kb/918679/)
  * [Stop error message when a Terminal Services client logs off from a session on a server that is running Windows Server 2003 with Service Pack 1: &#8220;Stop 0x000000AB (SESSION\_HAS\_VALID\_POOL\_ON_EXIT)&#8221;](http://support.microsoft.com/kb/918679/)

There are also 12 Intellimirror updates, two of which I had experienced in my most recent project:

  * [Users experience an 11-second delay in folder redirection when a Windows Server 2003 SP1-based computer that is running Terminal Services uses mandatory profiles](http://support.microsoft.com/kb/919614/)
  * [You may experience a 20-second delay when you try to access a redirected folder by logging on to a Windows Server 2003 Service Pack 1-based computer or to a Windows XP Service Pack 2-based computer](http://support.microsoft.com/kb/899409/)

So there are plenty of reasons to deploy Service Pack 2 including [two years worth of security updates](http://www.microsoft.com/technet/windowsserver/sp2/security-bulletins.mspx). For those of us who use unattended setups to deploy Terminal Servers, I recommend updating your source and redeploying your machines from scratch rather than update in place. For everyone else, Microsoft has [details for deployment](http://technet2.microsoft.com/WindowsServer/en/library/ed5382af-e819-4d33-ace0-225d31b7ab751033.mspx?mfr=true) up on TechNet; <strike>just remember that you will have to remove </strike>[<strike>Internet Explorer 7 before you install Service Pack 2</strike>](http://technet2.microsoft.com/WindowsServer/en/library/ed5382af-e819-4d33-ace0-225d31b7ab751033.mspx?mfr=true) (you [don&#8217;t need to uninstall IE7](http://blogs.msdn.com/ie/archive/2007/03/15/windows-server-2003-service-pack-2-released.aspx) before installing Service Pack 2).

[Windows Server 2003 Service Pack 2 x86](http://www.microsoft.com/downloads/details.aspx?FamilyId=95AC1610-C232-4644-B828-C55EEC605D55)

[Windows Server 2003 Service Pack 2 x64](http://www.microsoft.com/downloads/details.aspx?FamilyId=08FEC2F5-6E3B-4E0D-9314-646414D0A421)