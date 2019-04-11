---
id: 59
title: Unattended Presentation Server 4.5
date: 2007-04-19T06:22:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/unattended-presentation-server-45
permalink: /unattended-presentation-server-45/
views:
  - "1"
dsq_thread_id:
  - "195378404"
categories:
  - Automation
tags:
  - Presentation-Server
  - Silent
  - Unattended
---
While things haven't changed much since Presentation Server 4.0, I've put together what you'll need to create an unattended install for Presentation Server 4.5. First up I've made a copy of the installation files from the CD and added them to a single folder. This includes a copy of the administration tools in the same folder:

<img src="{{site.baseurl}}.com/media/2007/04/1000.14.1322.PresentationServer45.png" border="0" /> 

<a href="http://www.stealthpuppy.com/photos/images/images/1322/original.aspx" target="_blank"></a>

### Prerequisites

Before you install Presentation Server you'll need to install both the [Sun JRE](http://www.stealthpuppy.com/blogs/travelling/pages/unattended-install-sun-java-runtime-environment-1-6.aspx) and [.NET Framework 2.0](http://www.stealthpuppy.com/blogs/travelling/pages/Unattended-Install_3A00_-Microsoft-.NET-Framework.aspx). Presentation Server 4.5 expects version 1.5.0\_09 of the Sun JRE, but with a couple of registry changes you can use the latest JRE and fool the Presentation Server Console into thinking that 1.5.0\_09 is installed. Here's how to install the Sun JRE 1.6, configure it to be the JVM for Internet Explorer and disable some features that you don't really want running on a Terminal Server:

[code]@ECHO OFF  
ECHO Sun J2SE Runtime Environment 6  
START /WAIT jre-6-windows-i586.exe /s ADDLOCAL=jrecore IEXPLORER=1 MOZILLA=1 JAVAUPDATE=0 REBOOT=Suppress /L %SYSTEMROOT%TEMPJRE6setup.log  
PUSHD "%ProgramFiles%Java" & FOR /D %%d IN (*) DO SET JAVAVERSION=%%d & POPD  
REM Remove the "jre" text from the variable  
FOR /F "tokens=2 delims=e " %%i in ("%javaversion%") DO SET JAVAVERSION=%%i  
REG ADD "HKLMSOFTWAREJavaSoftJava Plug-in%JAVAVERSION%" /v HideSystemTrayIcon /t REG_DWORD /d 0x00000001 /f  
REG ADD "HKLMSOFTWAREJavaSoftJava UpdatePolicy" /v EnableJavaUpdate /t REG_DWORD /d 0 /f  
REG ADD "HKLMSOFTWAREJavaSoftJava UpdatePolicy" /v EnableAutoUpdateCheck /t REG_DWORD /d 0 /f  
REG ADD "HKLMSOFTWAREJavaSoftJava UpdatePolicy" /v NotifyDownload /t REG_DWORD /d 0 /f  
REG ADD "HKLMSOFTWAREJavaSoftJava UpdatePolicy" /v NotifyInstall /t REG_DWORD /d 0 /f[/code]

Next up you'll need to install .NET Framework 2.0 for the Access Management Console. You could install the .NET Framework 3.0, which includes version 2.0, if you prefer. Check out my [unattended installs for all of the .NET Framework](http://www.stealthpuppy.com/blogs/travelling/pages/Unattended-Install_3A00_-Microsoft-.NET-Framework.aspx) versions for details. Here's how to install version 2.0:

[code]@ECHO OFF  
ECHO .NET Framework 2.0  
START /WAIT 2.0DOTNETFX.EXE /Q:A /C:"INSTALL.EXE /Q"[/code]

### Installing Presentation Server 4.5

The first place to start for complete details on scripting Presentation Server is the [Administrators Guide](http://support.citrix.com/article/CTX112223). Appendix D, Advanced Installation Methods starting on page 365, details the options available to you for unattended installs including scripting the creation of the Presentation Server farm. Wilco van Bragt also has [an excellent article scripting the creation of the farm](http://sbc.vanbragt.net/mambo/articles/how-to-install-citrix-presentation-server-unattended-part-1.html) which is worth a look. In this article though I'm focusing on what's new for Presentation Server 4.5, so I won't repeat what's already there.

### Configuring the Sun JRE

The Sun JRE is a commonly installed application for most environments and on Terminal Servers you may generally need one version to support the Presentation Server Console and a more recent version to support Internet Explorer. With a couple of registry changes, though, we can fool the Presentation Server Console into see the version 1.5.0\_09 it's expecting. The first line here returns all folders located in %ProgramFiles%Java and will return the latest version (e.g. jre1.6.0) because it will be returned last. It will then point version 1.5.0\_09 to the folder containing the latest version:

[code]PUSHD "%ProgramFiles%Java" & FOR /D %%d IN (*) DO SET JAVAVERSION=%%d & POPD  
REM Remove the "jre" text from the variable  
FOR /F "tokens=2 delims=e " %%i in ("%javaversion%") DO SET JAVAVERSION=%%i  
REG ADD "HKLMSOFTWAREJavaSoftJava Runtime Environment1.5.0\_09" /v JavaHome /d "%JAVAVERSION%" /t REG\_SZ /f  
REG ADD "HKLMSOFTWAREJavaSoftJava Runtime Environment1.5.0\_09" /v MicroVersion /d "2" /t REG\_SZ /f  
REG ADD "HKLMSOFTWAREJavaSoftJava Runtime Environment1.5.0\_09" /v RuntimeLib /d "%JAVAVERSION%binclientjvm.dll" /t REG\_SZ /f[/code]

### Installing Presentation Server

Citrix provide _UnattendedInstall_.exe, _UnattendedTemplate_.txt and some sample transform files on the Presentation Server CD; however all of these just pass options to Windows Installer. I prefer to set the options out in a script so that it's easier to see the options and modify them if required. The options I've listed here will install Presentation Server adding the server to the farm with a direct connection to the data store. You will need to create a DSN that points to your data store, whether this is hosted on SQL Server or Oracle. First up we build the options into a single environment variable, effectively adding them to a single line. Listed like this makes the script easier to read:

[code]SET OPTIONS=ALLUSERS=TRUE REBOOT="ReallySuppress" /l*v "%SYSTEMROOT%tempCPS45.log" /QB  
SET OPTIONS=%OPTIONS% CTX\_MF\_FARM_SELECTION="Join"  
SET OPTIONS=%OPTIONS% CTX\_MF\_JOIN\_FARM\_DB_CHOICE="Direct"  
SET OPTIONS=%OPTIONS% CTX\_MF\_ZONE_NAME=""  
SET OPTIONS=%OPTIONS% CTX\_MF\_SILENT_DSNFILE="MF20.DSN"  
SET OPTIONS=%OPTIONS% CTX\_MF\_ODBC\_USER\_NAME="DOMAINusername"  
SET OPTIONS=%OPTIONS% CTX\_MF\_ODBC_PASSWORD="password"  
SET OPTIONS=%OPTIONS% CTX\_MF\_SHADOWING_CHOICE="Yes"  
SET OPTIONS=%OPTIONS% CTX\_MF\_SHADOW\_PROHIBIT\_REMOTE_ICA="No"  
SET OPTIONS=%OPTIONS% CTX\_MF\_SHADOW\_PROHIBIT\_NO_NOTIFICATION="No"  
SET OPTIONS=%OPTIONS% CTX\_MF\_SHADOW\_PROHIBIT\_NO_LOGGING="No"  
SET OPTIONS=%OPTIONS% CTX\_MF\_XML_CHOICE="share"  
SET OPTIONS=%OPTIONS% CTX\_MF\_LAUNCH\_CLIENT\_CD_WIZARD="No"  
SET OPTIONS=%OPTIONS% CTX\_MF\_SERVER_TYPE="E"  
SET OPTIONS=%OPTIONS% CTX\_MF\_REBOOT="No"  
SET OPTIONS=%OPTIONS% CTX\_IGNORE\_MCM="No"  
SET OPTIONS=%OPTIONS% CTX\_REMOVE\_WI_TURNKEY="Yes"  
SET OPTIONS=%OPTIONS% CTX\_MF\_ENABLE\_VIRTUAL\_SCRIPTS="Yes"  
SET OPTIONS=%OPTIONS% CTX\_MF\_LICENSE\_SERVER\_NAME="localhost"  
SET OPTIONS=%OPTIONS% CTX\_MF\_LICENSE\_SERVER\_PORT="27000"  
SET OPTIONS=%OPTIONS% CTX\_MF\_LICENSE\_SERVER\_PORT_DEFAULT="1"  
SET OPTIONS=%OPTIONS% CTX\_MF\_LIC\_CHOICE\_FOR_CREATE="UseFarmSettings"  
SET OPTIONS=%OPTIONS% CTX\_MF\_LIC\_CHOICE\_FOR\_JOIN\_OR_UPGRADE="UseFarmSettings"  
SET OPTIONS=%OPTIONS% CTX\_RDP\_DISABLE\_PROMPT\_FOR_PASSWORD="Yes"  
SET OPTIONS=%OPTIONS% CTX\_MF\_ONLY\_LAUNCH\_PUBLISHED_APPS="No"  
START /WAIT MSIEXEC /I MPS.msi %OPTIONS%[/code]

The last line here installs Presentation Server using the Windows Installer file with the command line options.

### Installing the Access Management Console

The Presentation Server Console will be installed along with Presentation Server, however the Access Management Console (AMC) must be installed seperately. The AMC comes as a number of Windows Installer files €“ the console itself plus plugins. The last line here is commended out; if you aren't installing Web Interface on your Terminal Server, keep this one out.

[code]START /WAIT MSIEXEC /I "AdministrationAccess Management ConsoleSetupASC_Framework.msi" ALLUSERS=TRUE REBOOT=SUPRESS /QB-  
START /WAIT MSIEXEC /I "AdministrationAccess Management ConsoleSetupASC_Diagnostics.msi" ALLUSERS=TRUE REBOOT=SUPRESS /QB-  
START /WAIT MSIEXEC /I "AdministrationAccess Management ConsoleSetupASC_HotfixManagement.msi" ALLUSERS=TRUE REBOOT=SUPRESS /QB-  
START /WAIT MSIEXEC /I "AdministrationAccess Management ConsoleSetupASC_KnowledgeBase.msi" ALLUSERS=TRUE REBOOT=SUPRESS /QB-  
START /WAIT MSIEXEC /I "AdministrationAccess Management ConsoleSetupASC_Legacy.msi" ALLUSERS=TRUE REBOOT=SUPRESS /QB-  
START /WAIT MSIEXEC /I "AdministrationAccess Management ConsoleSetupASC_Licensing.msi" ALLUSERS=TRUE REBOOT=SUPRESS /QB-  
START /WAIT MSIEXEC /I "AdministrationAccess Management ConsoleSetupASC_PresentationServer.msi" ALLUSERS=TRUE REBOOT=SUPRESS /QB-  
START /WAIT MSIEXEC /I "AdministrationAccess Management ConsoleSetupASC_PSReports.msi" ALLUSERS=TRUE REBOOT=SUPRESS /QB-  
START /WAIT MSIEXEC /I "AdministrationAccess Management ConsoleSetupASC_ReportCenter.msi" ALLUSERS=TRUE REBOOT=SUPRESS /QB-  
REM START /WAIT MSIEXEC /I "AdministrationAccess Management ConsoleSetupASC_WebInterface.msi" ALLUSERS=TRUE REBOOT=SUPRESS /QB-  
[/code]

### Configuring Presentation Server

Once Presentation Server is installed, you may want to make some configuration changes. I generally do a few things, such as delete some icons:

[code]IF EXIST "%ALLUSERSPROFILE%Start MenuDesktopProgram Neighborhood.LNK" DEL "%ALLUSERSPROFILE%Start MenuDesktopProgram Neighborhood.LNK"  
IF EXIST "%ALLUSERSPROFILE%Start MenuProgramsStartupProgram Neighborhood Agent.LNK" DEL "%ALLUSERSPROFILE%Start MenuProgramsStartupProgram Neighborhood Agent.LNK" [/code]

Disable the local user accounts created for anonymous connections to applications if that feature won't be used:

[code]NET USER | FIND "Anon" > %SYSTEMROOT%TEMPUSERS1.TXT  
FOR /F "tokens=1,2,3" %%u IN (%SYSTEMROOT%TEMPUSERS1.TXT) DO ECHO %%u >> %SYSTEMROOT%TEMPUSERS2.TXT & ECHO %%v >> %SYSTEMROOT%TEMPUSERS2.TXT & ECHO %%w >> %SYSTEMROOT%TEMPUSERS2.TXT  
TYPE %SYSTEMROOT%TEMPUSERS2.TXT | FIND "Anon" > %SYSTEMROOT%TEMPUSERS3.TXT  
FOR /F %%u IN (%SYSTEMROOT%TEMPUSERS3.TXT) DO NET USER %%u /ACTIVE:NO > NUL[/code]

Stop the administrator toolbar from appearing:

[code]REG DELETE HKLMSoftwareMicrosoftWindowsCurrentVersionRun /v ICABAR /f [/code]

And set some client printer options:

[code]REG ADD HKLMSYSTEMCurrentControlSetControlCitrixClientPrinterProperties /v fPurgeAnyWay /t REG_DWORD /d 0x00000001 /f  
REG ADD HKLMSYSTEMCurrentControlSetControlCitrixClientPrinterProperties /v fNotInheritKeepPrintedJobs /t REG_DWORD /d 0x00000001 /f[/code]

And that's pretty much all you need to script your installation. This script can be used to add a new server to the farm or in the event of a reinstall, add an existing server back to the farm (no need to remove the server first). You can find the complete listing of my Presentation Server 4.5 script here:

  * [Unattended Install: Presentation Server 4.5](http://www.stealthpuppy.com/blogs/travelling/pages/unattended-install-citrix-presentation-server-4-5.aspx)

**Note:** for a more up to date version of this script, you can download the latest version from my SkyDrive here: