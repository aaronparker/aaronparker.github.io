---
id: 140
title: Deploying Adobe Reader 8.0
date: 2006-12-06T07:15:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/deploying-adobe-reader-8
permalink: /deploying-adobe-reader-8/
aktt_notify_twitter:
  - 'yes'
categories:
  - Automation
tags:
  - Adobe
---
<p class="alert">
  For an Adobe Reader 9 version of this post, go <a href="http://stealthpuppy.com/deployment/deploying-adobe-reader-9-for-windows">here</a>. For an Adobe Reader 8.x version of this post, go <a href="http://stealthpuppy.com/deployment/deploying-adobe-reader-81">here</a>
</p>

Now that [Adobe Reader 8 has been released](http://www.adobe.com/products/acrobat/readstep2.html) and the setup routine has changed slightly, we&#8217;ll have to jump through hoops again to get this new version deployed. Here are a few things that I&#8217;ve found in regards to deployment in a corporate environment:

  * Here&#8217;s [a direct link to the download](http://ardownload.adobe.com/pub/adobe/reader/win/8.x/8.0/enu/AdbeRdr80_en_US.exe) for Adobe Reader 8.0;
  * The installer weighs in at 20.8Mb;
  * It requires Windows Installer 3.0 and appears to require a minimum of Internet Explorer 6.0;
  * Adobe Reader 8 uses a newer version of the Netopsystems FEAD setup routine;
  * Adobe Customization Wizard 8 is &#8220;[coming soon](http://www.adobe.com/uk/products/acrobat/solutions/it/deployment.html)&#8220;;
  * On Windows Vista, setup files are unpacked to <span style="font-family: Courier New">%USERPROFILE%AppDataLocalLowNetopsystemstempAdobe Reader 8.0</span>
  * On Windows XP/2003, setup files are unpacked to <font face="courier new,courier">%USERPROFILE%\Local SettingsTemp1Adobe Reader 8.0</font> (The folder 1 may change);
  * After Reader is installed, setup files are located at <span style="font-family: Courier New">%ProgramFilesAdobeReader 8.0Setup Files{AC76BA86-7AD7-1033-7B44-A80000000002}</span>
  * Setup switches have changed, here&#8217;s the full list:

[table id=10 /]

  * If you want to perform a silent install directly from the download, use the following command:

[code]AdbeRdr80\_en\_US.EXE /sPB /rs /rps /msi"ALLUSERS=TRUE EULA\_ACCEPT=YES SUPPRESS\_APP_LAUNCH=YES"[/code]

  * To perform an silent install from the unpacked setup files use the following command:

[code]SETUP.EXE /sPB /rs /rps /msi"ALLUSERS=TRUE EULA\_ACCEPT=YES SUPPRESS\_APP_LAUNCH=YES"[/code]  
or  
[code]MSIEXEC /I AcroRead.msi ALLUSERS=TRUE EULA\_ACCEPT=YES SUPPRESS\_APP_LAUNCH=YES REBOOT=REALLYSUPRESS /QB-[/code]

  * A second shortcut is now added to the Startup group &#8211; **Adobe Reader Synchronizer** as well as the **Adobe Reader Speed Launch** shortcut;
  * At launch, Adobe Reader reads the <span style="font-family: Courier New">HKLMSystemCurrentControlSetControlTerminal Server</span> registry key. Will it perform differently on a Terminal Server?
  * It appears to launch quite quickly;
  * It also reads this registry key <span style="font-family: Courier New">HKLMSOFTWAREPoliciesAdobeAcrobat Reader8.0FeatureLockdown</span> which could mean that an ADM/ADMX file exists or is coming to manage Adobe Reader via Group Policy;
  * You can set this DWORD value in the registry: <span style="font-family: Courier New">HKCUSoftwareAdobeAcrobat Reader8.0AVGeneralbDocumentsInTaskbar</span>, to force Reader to display a separate window for each document, just like Microsoft Office;
  * There are no ads in the toolbar as in previous versions;
  * It includes nice new fancy 256 x 256 pixel icons (click each one for a larger view):

<img border="0" src="http://stealthpuppy.com/wp-content/uploads/2006/12/1000.14.225.Reader.png" /><img border="0" src="http://stealthpuppy.com/wp-content/uploads/2006/12/1000.14.226.PDFFile.png" /> 

There are a lot of things left to find and I&#8217;ll update this post as I find them.

**UPDATES**:

  * AppDeploy.com has been updated with an Adobe Reader 8 specific entry: <http://www.appdeploy.com/packages/detail.asp?id=915>
  * Set this DWORD value to 1 <font face="courier new,courier">HKEY_LOCAL_MACHINESoftwareAdobeAcrobat Reader8.0DowntownbDontShowAtLaunch</font> and this DWORD value to 0 <font face="courier new,courier">HKEY_LOCAL_MACHINESoftwareAdobeAcrobat Reader8.0DowntownbGoOnline</font>, to supress the Beyond Adobe Reader window and feature;
  * The Adobe Updater is installed along with Reader to here: <font face="courier new,courier">%CommonProgramFiles%AdobeUpdater5</font>
  * Adobe Updater has created a folder in my Documents folder: <font face="courier new,courier">DocumentsUpdater5AdobeUpdaterreader8rdr-en_US</font>
  * So Joe&#8230; has an excellent post on installing Adobe Reader 8: [A Step-by-Step Guide to Silently Installing and Configuring Adobe Reader 8](http://sojoe.info/2006/12/09/a-step-by-step-guide-to-silently-installing-and-configuring-adobe-reader-8/)
  * Disable the Adobe Updater with the following DWORD (set it to 0x00000001) <font face="courier new,courier">HKLMSoftwareAdobeUpdaterEnterprise</font>. I&#8217;m still confirming this one, but I found the registry key on the Adobe knowledgebase site: [Perform a silent installation of Photoshop](http://www.adobe.com/support/techdocs/331261.html)

<p class="important">
  <strong>NOTE</strong>: See <a href="http://www.stealthpuppy.com/blogs/travelling/pages/adobe-reader-8-0.aspx">Unattended Install: Adobe Reader 8.0</a> and <a href="http://www.stealthpuppy.com/blogs/travelling/archive/2007/01/06/adobe-customization-wizard-8.aspx">Disable Adobe Updater with Adobe Customization Wizard 8</a> for information on silent or unattended installations of Adobe Reader 8.
</p>