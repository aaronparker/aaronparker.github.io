---

title: Unattended Citrix Advanced Access Control Part 1
date: 2007-03-22T17:30:00+10:00
author: Aaron Parker
layout: post

permalink: /unattended-citrix-advanced-access-control-part-1/
categories:
  - Automation
tags:
  - Access-Gateway
  - Unattended
---
I've spent some time in the past couple of days working out how to do an unattended install of Web Interface and Advanced Access Control and certainly been a challenge. Whilst I haven't worked everything out, I thought that I would outline what I've found out thus far. Why would we want to automate the installation of AAC? Just like your Terminal Servers, the servers running AAC should be stateless, so an unattended installation will provide a method for replicating servers and for disaster recovery.

In this scenario I'm installing everything on a single server to make it easier to illustrate the installation of each component; however it won't be take much to apply this to a distributed system. I tested this on Windows Server 2003 Service Pack 2 with the database hosted in SQL Server 2005 Express Edition Service Pack 2.

## Internet Information Services

In most cases I would recommend installing IIS as a part of an unattended installation of Windows Server, however if that's not the case, installing IIS after the OS is on the box here's how:

First we need to create an unattended answer file. I'm doing this by using the script to creating the answer file. For a full listing of the options in the answer file you should check out the [Windows Server 2003 Deployment Tools](http://www.microsoft.com/downloads/details.aspx?FamilyID=a34edcf2-ebfd-4f99-bbc4-e93154c332d6&DisplayLang=en). As you can see in this script, I'm enabling ASP.NET along with IIS.

```cmd
ECHO [InternetServer] > IIS.TXT  
ECHO PathWWWRoot = C:\Inetpub\wwwroot >> IIS.TXT  
ECHO [Components] >> IIS.TXT  
ECHO aspnet=on >> IIS.TXT  
ECHO iis_asp=on >> IIS.TXT  
ECHO iis_common=on >> IIS.TXT  
ECHO iis_ftp=off >> IIS.TXT  
ECHO iis_inetmgr=on >> IIS.TXT  
ECHO iis_internetdataconnector=off >> IIS.TXT  
ECHO iis_nntp=off >> IIS.TXT  
ECHO iis_serversideincludes=off >> IIS.TXT  
ECHO iis_smtp=off >> IIS.TXT  
ECHO iis_webdav=off >> IIS.TXT  
ECHO iis_www=on >> IIS.TXT
```

To install IIS, we can use SYSOCMGR.EXE and the answer file (also see the Deployment Tools on how to use SYSOCMGR):

```cmd
START /WAIT SYSOCMGR /u:IIS.TXT /i:%systemroot%\inf\sysoc.inf
```

## .NET Framework 2.0

I've got more details on installing the .NET Framework [here](http://www.stealthpuppy.com/blogs/travelling/pages/Unattended-Install_3A00_-Microsoft-.NET-Framework.aspx), but all we need is .NET Framework 2.0:

```cmd
START /WAIT DOTNETFX.EXE /Q:A /C:"INSTALL.EXE /Q"
```

## SQL Server 2005 Express Edition and SQL Server Management Studio Express

I wanted to use the [latest version](http://www.microsoft.com/downloads/details.aspx?FamilyID=31711d5d-725c-4afa-9d65-e4465cdff1e7&DisplayLang=en) of SQL Server 2005 Express Edition rather than the Service Pack 1 version included on the Advanced Access Control CD. For AAC we need to install an instance of SQL Server named CitrixACC. In the script, I'm extracting the contents of the downloaded file before installing (%CD% is the current folder):

```cmd
MD %CD%\SQLExpress  
START /WAIT SQLEXPR32 /X:%CD%\SQLExpress  
START /WAIT %CD%\SQLExpress\SETUP INSTANCENAME=CitrixAAC /QB  
START /WAIT MSIEXEC /I SQLServer2005_SSMSEE.MSI ALLUSERS=TRUE REBOOT=SUPPRESS /QB-
```

## Visual J# Version 2.0 Redistributable

The [Visual J#](http://www.microsoft.com/downloads/details.aspx?FamilyID=f72c74b3-ed0e-4af8-ae63-2f0e42501be1&DisplayLang=en) install command is similar to the .NET Framework:

```cmd
START /WAIT VJREDIST.EXE /Q:A /C:"INSTALL.EXE /Q"
```

## Citrix Access Management Console

The different components of the Access Management Console are Windows Installer files so the installation is pretty straightforward. Here I'm installing the components that come on the AAC CD as well as the Web Interface plug-in:

```cmd
START /WAIT MSIEXEC /I ASC_Framework.msi ALLUSERS=TRUE REBOOT=SUPPRESS /QB-  
START /WAIT MSIEXEC /I ASC_Diagnostics.msi ALLUSERS=TRUE REBOOT=SUPPRESS /QB-  
START /WAIT MSIEXEC /I ASC_Licensing.msi ALLUSERS=TRUE REBOOT=SUPPRESS /QB-  
START /WAIT MSIEXEC /I ASC_WebInterface ALLUSERS=TRUE REBOOT=SUPPRESS /QB-
```

## Web Interface 4.5

Unattended installation of Web Interface is in two parts. The first is installing Web Interface itself and the second is using SITEMGR.EXE to create Web Interface and Program Neighbourhood sites. To get a full list of the command line options for SITEMGR, run SITEMGR /?.

```cmd
START /WAIT WebInterface.exe -q  
PUSHD "%ProgramFiles%\Citrix\Web Interface\4.5"  
START /WAIT sitemgr.exe -c "WIDest=1:/Citrix/AccessPlatform,Config=Local,XMLService=ts1.company.local,ts2.company.local,XMLSPort=80,AppAccessMethods=Remote"  
START /WAIT sitemgr.exe -c "PNADest=1:/Citrix/PNAgent,Config=Local,XMLService=ts1.company.local;ts2.company.local,XMLSPort=80,AppAccessMethods=Remote"  
POPD
```

## Microsoft Office and Visio 2003

To create an unattended installation of Office 2003 you'll need the Custom Installation Wizard from the [Office Resource Kit](http://office.microsoft.com/en-au/products/FX011511471033.aspx). I recommend installing the minimum Office components only; I'll have a bit more on this in another post. In this script, I'm installing Office from the CD image (rather than an administrative install) and then installing the latest service pack:

```cmd
START /WAIT Office2003SP2-KB887616-FullFile-ENU.exe /T:%CD%\UNPACK /Q /C  
START /WAIT MSIEXEC /P %CD%\UNPACK\MAINSP2ff.MSP /QB-  
RD /Q /S %CD%\UNPACK & MD %CD%\UNPACK  
START /WAIT Visio2003SP2-KB887622-FullFile-ENU.EXE /T:%CD%\UNPACK /Q /C  
START /WAIT MSIEXEC /P %CD%\UNPACK\VISIOSP2.MSP /QB-
```

## Exchange Server 2003 Management Tools

Installing Exchange Server requires creating an answer file which you can do with the [_createunattend_](http://www.microsoft.com/technet/prodtechnol/exchange/2003/unattend.mspx) command line switch. These lines install the management tools and Service Pack 2:

```cmd
START /WAIT SETUP /unattendfile ExchangeManagementToolSetup.ini  
START /WAIT UPDATE /unattendfile ExchangeSP2Setup.ini
```

## Advanced Access Control

Now here's we the unattended setup falls down a bit. The setup application for AAC (SETUP.EXE) has some command line switches however documentation of those switches is extremely slim. I can only find _logfilepath_ in the documentation and I've come across _silent_ but it doesn't appear to do much. I presume there are more and I'm attempting to track those down through Citrix, so hopefully more on this later.

Once Advanced Access Control is installed you can then use Citrix.Msam.ServerConfig.ConfigTool.exe to create the Access Gateway farm or add servers to the farm. This is similar to Exchange where we create an answer file and then use it to automate server installs. To create an answer file use the _createconfig_ switch and then _fromconfig_ to automate the configuration. To see the full list of switches run Citrix.Msam.ServerConfig.ConfigTool.exe /?.

```cmd
"C:\Program Files\Citrix\Access Gateway\Bin\Citrix.Msam.ServerConfig.ConfigTool.exe" /fromconfg AACConfig.txt
```

Here's what AACConfig.TXT looks like:

```xml
<MsamServerConfig>
    <ServiceAccount>
        <Username>username</Username>
        <Password>password</Password>
        <Domain>DOMAIN</Domain>
    </ServiceAccount>
    <ServerFarm type="Create">
        <DBServer>SERVER\CITRIXAAC</DBServer>
        <FarmName>AccessGateway</FarmName>
        <ServerRoles>Admin|HTML Preview</ServerRoles>
        <DatabaseAccount type="windows"/>
    </ServerFarm>
    <RadiusConfig>
        <Secret></Secret>
    </RadiusConfig>
    <LicenseConfig>
        <LicServer>localhost</LicServer>
        <Port>27000</Port>
    </LicenseConfig>
    <WSVirtualPath>IIS://LocalHost/W3SVC/1/Root</WSVirtualPath>
    <WSBasePath>c:\inetpub\wwwroot</WSBasePath>
    <WSPort>80</WSPort>
    <SSlEnabled>False</SSlEnabled>
</MsamServerConfig>
```

## What Have We Got So Far?

Whilst this won't get you all the way through an unattended installation, most of the components that are time consuming and make you watch a blue progress bar have been automated. I've still got a few more components to look at and I'll go over these in a second article.
