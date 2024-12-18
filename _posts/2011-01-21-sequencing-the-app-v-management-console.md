---

title: Sequencing the App-V Management Console
date: 2011-01-21T17:30:40+10:00
author: Aaron Parker
layout: post

permalink: /sequencing-the-app-v-management-console/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "213529262"
categories:
  - Applications
tags:
  - App-V
---
Sequencing the the App-V Management Console is reasonably straight-forward; however it wasn't quite as simple as you would expect.

## Prerequisites

The Application Virtualization Management Console requires the Microsoft Management Console (MMC) 3.0 or later and the .NET Framework 2.0 SP2. MMC 3.0 comes with all of the current Windows releases and the .NET Framework comes with Windows Vista and above, so you should only need to install the .NET Framework if you are targeting Windows XP or Windows Server 2003. MMC is an operating system component, so you won’t be able to sequence it.

## Preparing the Sequencer

I have used the 4.6 Sequencer and Windows 7 x86 for this sequence, so the prerequisites are already installed; however I have run the MMC at least once to ensure any Registry and AppData locations have been written prior to sequencing.

**Important**: Stick with the x86 version of Windows because when sequencing on 64-bit Windows the snap-in does not appear to register during sequencing and this error is received when starting SftMMC.msc:

![UnableToCreateNewDocument2]({{site.baseurl}}/media/2011/01/UnableToCreateNewDocument2.png)

I have successfully sequenced on 32-bit Windows 7 and run the package on 64-bit Windows.

## Exclusion Items

I found that I need to add _Q:\System Volume Information_ to the list of exclusion items, as this was captured during monitoring.

## Configuring the Console Install

I am using the setup source for the Management Server (not the Streaming Server) and I have chosen to install only the Management Console (we don’t want to capture the Management Server or web service). I am installing into a folder on the Q: drive; however this isn’t a requirement – you can install to the default Program Files location if you like.

![UnableToCreaAppVManagementConsoleInstallerteNewDocument2]("{{site.baseurl}}/media/2011/01/AppVManagementConsoleInstaller.png)

Setup requests a reboot when finished, but the Sequencer will handle the reboot automatically.

To ensure that my sequence can be replicated quickly and easily, I have used the following command line to perform a silent installation of the console during the monitoring phase:

```cmd
MSIEXEC /I setup.msi ADDLOCAL=Release\_SoftGrid\_Management_Console INSTALLDIR=Q:\APPVMMC.001\Console REBOOT=SUPPRESS OPTIN=FALSE /QB-
```

The complete list of command line options for the Console installer can be found in this knowledgebase article: [Supported command line options for the Microsoft App-V 4.5 Management Server installer](http://support.microsoft.com/kb/2384955).

## Sequencing the Console

Follow the recommendations outlined in the [Microsoft Application Virtualization 4.6 Sequencing Guide](http://download.microsoft.com/download/F/7/8/F784A197-73BE-48FF-83DA-4102C05A6D44/App-46_Sequencing_Guide_Final.docx).

Monitoring phase – install the Console during the Sequencing phase. Open MMC and check that the App Virt Management Console snap-in is available or start the Application Virtualization Management Console shortcut. There is no need to connect to a Management Server during sequencing.

Configure Applications phase – the default shortcut will point directly to the SftMMC.MSC file. In my case this was _"Q:\APPVMMC.001\Console\App Virt Management Console\SftMMC.msc"_. Change the Application Path to read _"C:\Windows\System32\MMC.EXE" "Q:\APPVMMC.001\Console\App Virt Management Console\SftMMC.msc"_ instead (change the install path to suit your own environment). Change the Version and OSD File Name default text to suit your standards.

Once the package is saved, the CODEBASE line in the OSD file will include FILENAME and PARAMETERS elements that will look something like this:

```
PARAMETERS="&quot;%SFT\_MNT%\appvmmc.001\Console\App Virt Management Console\SftMMC.msc&quot;" FILENAME="%CSIDL\_SYSTEM%\MMC.EXE"
```

Launch Applications phase – you can build Feature Block 1 if you require it, but the final package size is very small.

## Saving the Package

There are no additional changes that need to be made to the package. I saved my package with the following properties:

  * Operating Systems Selected: none
  * Enforce Security Descriptors: enabled
  * Generate Microsoft Windows Installer Package: enabled
  * Compress Package: enabled

## Running the Package

The default requested execution level for the Microsoft Management Console is [RunAsHighest](http://technet.microsoft.com/en-us/library/cc709628(WS.10).aspx). This means that if you are running MMC as an account that is in the local Administrators group, UAC will prompt for elevation. This is a problem when running under App-V because the App-V client components do not request a higher token.

When you start the virtualised Management Console the following error will be produced:

![AppRequiresElevation]({{site.baseurl}}/media/2011/01/AppRequiresElevation.png)

You can get around this issue three ways:

  1. Run as a standard user only (the console allows you to connect to a remote system with alternate credentials)
  2. Right-clicking the shortcut and choosing _Run as administrator;_ or
  3. Force the package to run with the user’s current execution level using the [_\_COMPAT\_LAYER environment variable](http://blogs.technet.com/b/virtualworld/archive/2010/04/13/the-requested-operation-requires-elevation-2c-000002e4.aspx).

Option 3 is probably the simplest method. To prevent MMC from requesting higher privileges, add the following lines to the OSD file inside the VIRTUALENV tag:

```xml
<ENVLIST>
  <ENVIRONMENT VARIABLE="_\_COMPAT\_LAYER">RunAsInvoker</ENVIRONMENT>
</ENVLIST>
```

However this works great for 32-bit Windows only, using this method on a 64-bit platform results in these errors:

![64Bit32BitMMC2]({{site.baseurl}}/media/2011/01/64Bit32BitMMC2.png)

Then:

![UnableToCreateNewDocument2]({{site.baseurl}}/media/2011/01/UnableToCreateNewDocument2.png)

I haven’t found a root cause, but the issue looks to be related to the App-V client. When using the [RunAsInvoker](http://blogs.msdn.com/b/cjacks/archive/2009/09/13/how-to-run-applications-manifested-as-highestavailable-with-a-logon-script-without-elevation-for-members-of-the-administrators-group.aspx) trick outside of the client, MMC works as expected.

If you are deploying the package to 64-bit Windows, the _Run as administrator_ option will be required to launch the console.

## Resources

  * [Elevation and Run-As Considerations in Microsoft App-V Environments](http://support.microsoft.com/kb/2559075/)
