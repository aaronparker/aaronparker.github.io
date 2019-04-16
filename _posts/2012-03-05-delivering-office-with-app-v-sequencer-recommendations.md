---
id: 2629
title: 'Delivering Office with App-V – Sequencer Recommendations &#038; Best Practices'
date: 2012-03-05T15:00:14+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2629
permalink: /delivering-office-with-app-v-sequencer-recommendations/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "599475617"
categories:
  - Applications
tags:
  - App-V
  - Office
---
Having had to travel to Australia and the US recently, I've not had that much time to work on an upcoming white paper, but I have been posting some of the early versions of the chapters. So here's another in that series while I work on getting the paper finished.

Creation of successful App-V packages requires building on a solid base – that base is the machine used to perform sequencing. This section details recommendations for creating the perfect sequencing machine. Follow these recommendations for the best chance at creating clean, successful App-V packages.

## Obtain background information

Microsoft has made available a number of documents as introductions to App-V and the sequencing of applications.

  * Review the product documentation that was included together with App-V. This includes the following documents: 
      * [Microsoft Application Virtualization Version 4.6 SP1 Trial Guide](http://download.microsoft.com/download/F/7/8/F784A197-73BE-48FF-83DA-4102C05A6D44/App-V/App-V%204.6%20SP1%20Trial%20Guide.docx)
      * [How to Install the Application Virtualization Sequencer](http://technet.microsoft.com/library/cc843820.aspx)
      * [App-V 4.6 Service Pack 1 Sequencing Guide](http://download.microsoft.com/download/F/7/8/F784A197-73BE-48FF-83DA-4102C05A6D44/App-V/App-V%204.6%20Service%20Pack%201%20Sequencing%20Guide.docx "App-V 4.6 Service Pack 1 Sequencing Guide")
  * Review the "Best practices to use for sequencing in Microsoft App-V " article. For more information, click the following article number to view the article in the Microsoft Knowledge Base: [932137](http://support.microsoft.com/kb/932137) (http://support.microsoft.com/kb/932137/)
  * Install the Office suites and applications to become familiar with the functionality of the program. Additionally understand the deployment requirements for Office

## Do's and Don'ts

Don't make the sequencing machine an exact copy of your Standard Operating Environment (SOE) or add the machine to your domain. That is, do not create a sequencing machine directly from your SOE; instead create a new environment that closely matches your SOE. There are several reasons for this:

  * Your SOE most likely has many pre-requisites or applications installed that may interfere with sequencing, such as security agents and anti-virus
  * Changes to your SOE may break virtual applications – if your SOE has a DLL required by a virtual application, that DLL wouldn't be captured in the virtual application package. In the event of the SOE changing and the DLL being removed or the version changing, any virtual application package that doesn't include that DLL may now not work
  * Domain computers may have services, process or scheduled tasks that will interfere with sequencing or may cause files or registry settings to be inadvertently captured – changes made by a process that starts during sequencing will be captured in the package
  * Domain computers may have policies applied that may be inadvertently captured in the package, causing issues with virtual applications or subsequent changes to those policies to be ignored

Based on my own experiences and those of others that I've spoken to, the most successful App-V packages are created on vanilla installations of Windows.

### Don'ts

  * Don't add the sequencing VM to the domain, unless sequencing an application that requires it
  * Don't use an exact copy of your SOE
  * Don't install anti-virus applications or other security agents
  * If possible, don't access the Internet directly from the sequencing VM

### Do's

  * Do leave Windows in workgroup mode the majority of applications
  * Do use the same versions of components used in your SOE
  * Do choose carefully which of those components should be installed in the sequencing VM
  * Do scan the VM with the Microsoft Windows Malicious Software Removal Tool; optionally mount the VM's virtual disk on your host machine and scan it with the anti-virus application on the host
  * Do create a snapshot of the sequencing VM in a clean state
  * Do patch the sequencing VM each month

## Hardware

Always use a virtual machine to host the sequencing machine – a virtual machine provides snapshots to allow you to capture a clean image of the sequencing VM and then rollback to that clean snapshot after sequencing an application.When taking a snapshot, ensure that the virtual machine is shutdown – do not leave the Sequencer running when taking a snapshot. Leaving the VM running puts you at risk of creating multiple packages with the same GUID. Every App-V package requires a unique GUID.

If you are using a local PC for sequencing, a second hard drive to host the VMs is recommended so that the sequencing process does not affect the host machine.Virtual machine software or hypervisors available for free include:

  * Microsoft [Windows Virtual PC](http://www.microsoft.com/download/en/details.aspx?id=3702) (Virtual PC does not support 64-bit guests)
  * Microsoft [Hyper-V](http://www.microsoft.com/download/en/details.aspx?id=20196), available as either a stand-alone product or as a component of Windows Server 2008 R2 SP1
  * VMware [Player](http://www.vmware.com/products/player/) (note that Player does not support snapshots)
  * VMware [vSphere Hypervisor](http://www.vmware.com/products/vsphere-hypervisor/)
  * Oracle [VirtualBox](https://www.virtualbox.org/)
  * Citrix [XenServer](http://www.citrix.com/xenserver)

Create a new virtual machine with the following virtual hardware:

  * 1 x vCPU – the Sequencer is still only single threaded and additional CPUs will make little difference
  * A minimum of 1 GB RAM – Windows XP may require less
  * Add NICs, a sound card, USB hubs, COM & LPT ports as required
  * 2 x vDisks – use fixed size disks if you have the space. Fixed size disks will offer better IO performance. Additionally the App-V 4.6 SP1 Sequencer can automatically create a Q: drive if none already exists; however a second vDisk is a better approach.

![Delivering]({{site.baseurl}}/media/2012/02/021412_1854_DeliveringO1.png) If no secondary partition exists, the Sequencer setup will create a substituted drive letter for the virtual drive. A known issue exists where this configuration can cause an issue with new and upgraded packages because the Sequencer resolves the full path instead of the substituted drive letter.

This issue looks to be fixed with [Hotfix 3 for the 4.6 SP1 Sequencer](http://support.microsoft.com/kb/2571168); however it is still recommended that you create a second vDisk, rather than let setup create the drive for you.

## Windows 

Windows XP Professional or Windows 7 Enterprise editions are recommended for client OS deployments. If you are sequencing for both Windows XP/7 and Windows Server, sequence on the lowest common denominator (Windows XP in this example). If issues arise with testing a package on a different operating system, create a new version of the package for that OS.To create a clean Windows VM for sequencing, follow these steps:

  * Install Windows via the ISO, or better still, create an unattended deployment using the [Microsoft Deployment Toolkit](http://technet.microsoft.com/en-us/solutionaccelerators/dd407791) or your software deployment tool of choice, but keep the Windows deployment as vanilla as possible. Use the same Windows version and service pack level as your App-V client machines. This may mean creating multiple sequencing VMs. If you are deploying to both x86 and x64 clients, sequence on an x86 Windows machine, re-sequence the application on 64-bit Windows if required 
      * Service Pack deployment is recommended via a slipstreamed Windows ISO (that is the ISO with the latest service pack integrated into it)
  * Install the hypervisor tools or additions to install drivers and services required by the hypervisor to support the VM correctly
  * Enable Windows Firewall including the File and Printer Sharing rule to prevent remote PCs from connecting to the virtual machine
  * Active Windows inside the VM. A KMS will be make this simple; however if you are using a MAK key provided by your TechNet or MSDN subscription, this article is recommended reading: [Managing product activation with a TechNet subscription]({{site.baseurl}}/general/managing-product-activation-with-a-technet-subscription-and-msdn-too/)
  * Disable System Restore on Windows XP or System Protection on Windows 7
  * Disable Windows Defender on Windows 7 (or disable the service)
  * If deploying Windows 7, leave the following Optional Components enabled: 
      * Windows Search
      * XPS Services
      * XPS Viewer
  * If deploying Windows XP, remove the following Windows Components: 
      * MSN Explorer
      * Internet Gateway Device Discovery and Control Client
      * Windows Messenger
      * Additionally it's recommended to remove the Adobe Flash Player that comes with Windows XP: <http://kb2.adobe.com/cps/141/tn_14157.html>
  * If deploying Windows XP or Windows Server 2003, install the following updates from the Microsoft Download Centre: <http://microsoft.com/downloads> 
      * XML Paper Specification Essentials Pack
      * Windows Search 4.0 (available via Windows Update)
      * Windows Media Player 11 (available via Windows Update)
      * Update for Root Certificates (available via Windows Update)
  * Install the latest version of Internet Explorer for the target operating system – if you would prefer to match the IE version of your SOE, then stick with that version. Set the home page to _about:tabs_, this will ensure that if Internet Explorer is started during sequencing it won't attempt to connect to the Internet
  * Install or enable the Microsoft .NET Framework – install the most recent version of the .NET Framework deployed in your environment. Note that .NET Framework 4.0 comes with all previous versions and .NET Framework 3.5 SP1 come with all its previous versions (and so on)
  * Install the Visual C++ Redistributables – 2005, 2008 and 2010 redistributables are recommended. Multiple versions of each redistributable may be required depending on application requirements. It is recommended to install these in order of release
  * Enable Microsoft Update
  * Update Windows with the latest updates – High Priority, Critical and Important updates should be installed at a minimum 
      * Do not install Microsoft Silverlight – this important for Microsoft Lync or if you intend to sequence Silverlight
      * Windows Update may need to be run multiple times to ensure all updates have been detected and installed
  * Configure the following services (some services are not available on Windows XP):

|Service|State|
|:--|:--|
|Diagnostic Policy Service|Disabled|
|Offline Files|Disabled|
|Security Center|Disabled|
|Windows Defender|Disabled|
|Windows Search|Manual|
|Windows Update|Manual|


  * At a minimum, run the following built in applications so that they make changes to the local profile and remove first-run dialogs: 
      * Control Panel
      * Internet Explorer including the Internet Options Control Panel applet 
          * Start Internet Explorer a couple of times
          * Set the home page to _about:tabs_ so that if IE is launched during sequencing, it will not connect to the Internet
      * Windows Media Player
      * Notepad
      * WordPad
  * Restart the VM several times and log back on to ensure all first-run dialogs have been acknowledged or do not appear

Additional pre-requisites should only be installed when required by an application. For example, if Office is a pre-requisite of another application (such as SAP products or a plug-in) only install Office when sequencing that application.

![Delivering]({{site.baseurl}}/media/2012/02/021412_1854_DeliveringO2.png) At this point you will have a VM that can be used as a sequencing environment as well as an App-V client. It is highly recommended that you create two VMs based on this environment so that you have a second VM to perform testing of packages to confirm that the sequenced applications work at runtime.

## Sequencer

Office 2010 is only supported with the 4.5 SP2 and 4.6 SP1 version of the Sequencer. Office 2007 and Office 2003 can be sequenced with earlier versions. Where possible it is recommended to use the latest Sequencer – this often requires the matching version of the client to be deployed as well (although the App-V 4.6 SP1 Sequencer is backwardly compatible with the App-V 4.6 client).

Install the Sequencer into the VM along with the most recent hotfix rollup. At the time of publishing of this document the most recent versions of the Sequencer are:

  * App-V 4.6 Service Pack 1 with Hotfix Rollup 3: <http://support.microsoft.com/kb/2571168>
  * App-V 4.5 Service Pack 2: <http://support.microsoft.com/kb/980847>

## Application Install Source

Installing applications from a copy of the setup files located on a local disk inside the VM is recommended. Installation of the application from setup files located on a network share may cause files from that location to be captured during sequencing. Create a local folder inside the VM where application setup files will be copied to before sequencing. For example, use C:\Packages or C:\Source.

To ensure successful sequencing, it is not recommended to run setup applications directly from the networkEnsure that the folder is then added as an exclusion in your sequencing projects – often application setups may write log or temporary files to the same folder.

## Snapshots

Once Windows has been configured, shutdown the VM – never take a snapshot of the virtual machine with the App-V Sequencer running. Each App-V package must have a unique GUID and snapshots with the Sequencer running are often a source of duplicate GUIDs. Additionally a VM in a shutdown state will take less room on disk for a snapshot because the VM's RAM won't be included in the snapshot.

Periodically rollback the VM to this snapshot to install the latest updates from Windows Update, then re-create the snapshot.

## Sequencer Template

The App-V 4.6 SP1 Sequencer supports templates which will allow you to configure project options including exclusions, enabling Windows Update during sequencing and enabling compression when saving the package. Package templates can be used by multiple sequencing engineers or across multiple Office packages to ensure consistency.

## Package Options 

A number of options can be set in a sequencer template that may be required for an Office package:

  * Allow Microsoft Update to run during monitoring – enable updating of an Office package via Windows Update
  * Allow all named objects and COM objects to interact with the local system – this enabled LOCAL\_INTERACTION\_ALLOWED in the OSD file. This will save you from having to set this option manually after sequencing. If you are creating an Office package that will co-exist with other Office packages or locally installed Office, do not enable this option
  * Compress Package – Reduce the size of your Office package with compression. Recommended for all Office packages.

## Exclusions

****The table below lists the recommended exclusions to add when sequencing Office applications.

|Path|Description|
|:--|:--|
|%CSIDL_COMMON_APPDATA%\Microsoft\RAC|Microsoft Reliability Analysis Component.|
|%CSIDL_PROFILE%\Lync Recordings|Microsoft Lync saved recordings folder. Just like documents, we don't want these being saved into the virtual environment|
|%CSIDL_PROGRAM_FILES%\MSECACHE|Outlook Connector cache. Reduce the package size by excluding cached installers|
|%CSIDL_PROGRAM_FILESS%\OCSetup|Lync/Communicator cached setup files. Reduce the package size by excluding cached installers|
|%CSIDL_WINDOWS%\Installer|Windows Installer cache. Reduce the package size by excluding cached installers|
|%CSIDL_WINDOWS%\SoftwareDistribution|Windows Update. Ensure that these files are not cached to prevent breaking future updates to the package|
|%SFT_MNT%\Config.msi|Windows Installer rollback files. Reduce the package size by excluding cached installers|
|%SFT_MNT%\MSOCACHE|Microsoft Office installer cache. Reduce the package size by excluding cached installers|
|C:\MSOCACHE|Microsoft Office installer cache. Reduce the package size by excluding cached installers|
|(e.g. C:\Packages)|A local folder that contains Office setup. Ensure that any changed files are not captured|
|Q:\Config.msi|Windows Installer rollback files. Reduce the package size by excluding cached installers|
|Q:\MSOCACHE|Microsoft Office installer cache. Reduce the package size by excluding cached installers|
|\REGISTRY\MACHINE\Software\Policies|Machine-level Group Policies. Ensure that Group Policy can deliver Office policies post deployment|
|\REGISTRY\USER\%SFT_SID%\Software\Microsoft\Tracing|Microsoft Tracing settings|
|\REGISTRY\USER\%SFT_SID%\Software\Microsoft\Windows\CurrentVersion\Internet Settings|User-level proxy server and other browser settings. Ensure that proxy settings aren't cached in the package|
|\REGISTRY\USER\%SFT_SID%\Software\Microsoft\Internet Explorer|Internet Explorer settings. Ensure Internet Explorer settings aren't cached in the package|
|\REGISTRY\USER\%SFT_SID%\Policies|User level Group Policies. Ensure that Group Policy can deliver Office policies post deployment|

### Using the Sequencer Template

To create a sequencer template, open the Sequencer and choose Tools / Options to set the package options and exclusions. Then choose File / Save As Template to save the file to disk. Save the template to a file and open in a text editor such as Notepad. The new template will have a number of changes over a default templateUnder DEFAULTS, the following options will be set to Yes (if they aren't change them to Yes):

```xml
<DEFAULT Name="AllowMUADuringMonitoring" Value="Yes"/>  
<DEFAULT Name="CompressPackage" Value="Yes"/>
```

Additional exclusions should also be listed, for example:

```xml
<EXCLUSION Pattern="Q:\MSOCACHE" Context="VFS\_EXC" Type="PSR\_DataSystem"/>
```

The DEFAULTOSD section sets the LOCAL\_INTERACTION\_ALLOWED option:

```xml
<DEFAULTOSD>
    <SOFTPKG>
        <IMPLEMENTATION>
            <CODEBASE HREF="rtsps://%SFT\_SOFTGRIDSERVER%:322/"/>
            <OS VALUE="Win7"/>
            <VIRTUALENV>
                <POLICIES>
                    <LOCAL\_INTERACTION\_ALLOWED>TRUE</LOCAL\_INTERACTION_ALLOWED>
                </POLICIES>
            </VIRTUALENV>
        </IMPLEMENTATION>
    </SOFTPKG>
</DEFAULTOSD>
```

To use the template during sequencing, start the Sequencer and choose File / New from Template, and choose your Sequencer Template file.
