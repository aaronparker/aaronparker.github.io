---
id: 2031
title: Virtualizing Adobe Reader X
date: 2010-10-26T14:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/virtualising-adobe-reader-x/
permalink: /virtualising-adobe-reader-x/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195379186"
categories:
  - Applications
tags:
  - Adobe Reader
---
[<img style="background-image: none; margin-top: 0px; margin-right: 0px; margin-bottom: 5px; margin-left: 10px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="ReaderXVirtualise" src="{{site.baseurl}}/media/2010/10/ReaderXVirtualise_thumb.png" alt="ReaderXVirtualise]({{site.baseurl}}/media/2010/10/ReaderXVirtualise.png)This post details virtualizing Adobe Reader X with Microsoft Application Virtualization 4.6; however the same basic steps should apply to virtualizing Reader with any other application virtualisation product.

### Don't Virtualize Reader

Before I get to the details I would like you to first consider the implications of virtualising Reader. Adobe Reader is often a common component of any desktop deployment and like Microsoft Office and Internet Explorer, it usually becomes a core application on which other applications depend.

If you are using a virtualisation solution that isolates an application from other applications and the operating system, integration can be a challenge. Let me illustrate with a couple of examples:

_Internet Explorer_: if Reader is isolated from Windows, Internet Explorer will be able to download PDFs which can then be opened with the virtualised Reader; however IE will have no knowledge of any application that is handling the PDF file type or MIME type. Launching Reader inside IE or viewing a PDF [embedded in a web page](http://blogs.adobe.com/pdfdevjunkie/2007/08/using_the_html_embed_tag_to_di.html) will not be possible.

<img title="ComparingReaderInstallTypes" src="{{site.baseurl}}/media/2010/10/ComparingReaderInstallTypes.png" alt="" width="660" height="241" /> 

You could solve this my launching Internet Explorer inside the Reader package, but this will require covering all of the ways a user can launch Internet Explorer. If you do that, what happens when you want IE to launch inside the environment of another package? App-V doesn't handle integration with these entry points elegantly today.

_Virtualised applications_: Additionally, if you need to provide other virtualised applications with Reader support, you will need to maintain [Dynamic Suite Composition](http://www.microsoft.com/systemcenter/appv/dynamic.mspx) links to the Reader package for each primary package that requires it. Because Reader is used so often, managing DSC links is something that could get out of hand very quickly.

In most cases I do not recommend virtualizing Reader – your mileage may vary, but because of the additional administrative overhead and the change in the user experience, you should invest your time in other areas.

### Configuring the Adobe Reader installation

If I haven't convinced you that virtualizing Reader is more trouble that it's worth, then here's how to do it:

I've previously covered [how to create a customised deployment of Reader X]({{site.baseurl}}/deployment/deploying-adobe-reader-x/) to suit your environment. If you have read that article yet, I recommend that you do before proceeding further. Automating the installation and configuration of Reader during sequencing will make it easier to re-create the package and will simplify documentation.

Here's my recommendations for settings that you should configure when creating a transform to install Reader during sequencing:

  * _Personalisation Options_: change the install path if required. You can choose to install to the virtual drive; however a VFS install will work as well
  * _Installation Options_: disable the caching of the Reader installer files to reduce the size of the package. Choose an unattended install and supress reboot
  * _Files and Folders_: add the JavaScript (HideItems.js) to disable additional toolbar buttons and menu items
  * _Registry_: add the bProtectedMode value to the Policies key to disable Protected Mode (more on that below)
  * _Shortcuts_: disable the shortcut added to the Desktop
  * _Server Locations_: additional server locations should not be required when virtualising Reader
  * _EULA_: ensure that the End User License Agreement is suppressed
  * _Online and Acrobat.com Features_: disabling the Adobe Updater is important so that user's can't attempt to update Reader after deployment
  * _Direct Editor_: you can edit the Transform directly to prevent the installation of Adobe Updater (although you can just delete the ARM folder during sequencing).

Reader X 10.1 introduces a new _Adobe Acrobat Updater Service_, you can use the Direct Editor to prevent the service from being installed, because it won't be required once virtualized.

Create a script to perform the installation. Here's a sample script that will install Reader, perform some additional actions that can be done in the transform file instead and will then launch Reader after setup has completed.

[sourcecode toolbar="true" language="plain"]@ECHO OFF  
START /WAIT MSIEXEC /I AcroRead.MSI TRANSFORMS=VirtualisedReaderX.MSI ALLUSERS=TRUE /QB-  
IF "%PROCESSOR_ARCHITECTURE%"=="AMD64" RD /Q /S "%CommonProgramFiles(x86)%\Adobe\ARM"  
IF "%PROCESSOR_ARCHITECTURE%"=="x86" RD /Q /S "%CommonProgramFiles%\Adobe\ARM"  
REG ADD "HKLM\SOFTWARE\Policies\Adobe\Acrobat Reader\10.0\FeatureLockDown" /v bProtectedMode /d 0 /f  
REG ADD "HKLM\SOFTWARE\Policies\Adobe\Acrobat Reader\10.0\FeatureLockDown" /v bUpdater /d 0 /f  
IF EXIST "%PUBLIC%\Desktop\Adobe Reader X.lnk" DEL /F "%PUBLIC%\Desktop\Adobe Reader X.lnk"  
IF "%PROCESSOR_ARCHITECTURE%"=="AMD64" START /D "%ProgramFiles(x86)%\Adobe\Reader 10.0\Reader" AcroRd32.exe  
IF "%PROCESSOR_ARCHITECTURE%"=="x86" START /D "%ProgramFiles%\Adobe\Reader 10.0\Reader" AcroRd32.exe[/sourcecode]

Copy the Reader setup files, the Windows Installer transform and the script into your sequencing machine before capturing. I generally use a folder named _C:\Packages_ and add this location to the excludes for the package.

### Virtualizing Adobe Reader

There are no additional requirements or dependencies for virtualizing Reader X and I have successfully created an App-V package on Windows 7 x86 and deployed to both x86 and x64 platforms using the custom installation and script outlined above.

I have provided here a copy of the App-V 4.6 SP1 Package Template which includes a number of exclusions that do not need to be captured in a Reader package.

<p class="download">
  [download id="43&#8243; format="1&#8243;]
</p>

There is one issue though – the Adobe Reader Protected Mode doesn't like running under App-V. During the monitoring phase the application may not launch on first run and on the second launch the following dialog box will be displayed:

<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="AdobeReaderProtectedModePrompt" src="{{site.baseurl}}/media/2010/10/AdobeReaderProtectedModePrompt_thumb.png" alt="AdobeReaderProtectedModePrompt" width="660" height="232" border="0" /> 

Choosing the option 'Always open with Protected Mode disabled' will save the setting in HKCU in the Registry, but until a fix is found (either by Adobe or Microsoft) you can disable Protected Mode using the following Registry key:

  * Key: HKLM\SOFTWARE\Policies\Adobe\Acrobat Reader\10.0\FeatureLockDown
  * Value: bProtectedMode
  * Type: REG_DWORD
  * Data: 0

The script listed above includes a REG command to disable Protected Mode, however this can be done in the transform file instead.

If Protected Mode is not disabled when Reader is virtualized or when it is running inside an App-V bubble via another package, it will crash with the following error: _Error in Microsoft Visual C++ Runtime Library_. Disable Protected Mode to avoid this issue.

### Conclusion

Virtualizing Reader is straightforward and it performs well under App-V, although I would consider the implications of isolating Reader from the OS, even before you start the Sequencer. A virtualized Reader will require managing DSC links and you'll need ensure that users understand the difference in behaviour with IE integration.

Hopefully an update of either Reader or App-V in the future will enable Protected Mode support to improve security.

### Resources

To make the job of sequencing Reader X easier, the following App-V 4.6 SP1 Package Accelerators are available.

  * [App-V 4.6 SP1 Package Accelerator for Adobe Reader X 10.1](http://gallery.technet.microsoft.com/Adobe-Reader-X-101-en-US-42e026c8)
  * [App-V 4.6 SP1 Package Accelerator for Adobe Reader X 10.0](http://gallery.technet.microsoft.com/Adobe-Reader-X-Package-ac504c1c)