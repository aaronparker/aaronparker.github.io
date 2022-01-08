---
title: 'SoftGrid: Sequencing Adobe Acrobat 8 - The Story So Far'
date: 2007-11-27T17:45:38+10:00
author: Aaron Parker
layout: post
permalink: /softgrid-sequencing-adobe-acrobat-8-the-story-so-far/
categories:
  - Applications
tags:
  - Adobe
  - SoftGrid
---
I'm not completely convinced that Adobe Acrobat (not Reader) is the best candidate for deploying via application virtualisation techniques, but if you're looking to do it you're in for a bit of a ride.

Getting this one as far as I have has taken the better part of three days and I still have some challenges on the client to solve. For this sequence you will need access to the [volume license version of the media](http://www.adobe.com/aboutadobe/openoptions/), otherwise you will find that the application will prompt for activation when run on your client machines.

I am using VMware Workstation 6 and the virtual machine running the SoftGrid Sequencer was running Windows XP Professional Service Pack 2, with Internet Explorer 7.0 and the .NET Framework 2.0. In this environment I am installing the sequenced applications to Y: drive and Acrobat to `Y:\acrobatp`.80.

Before I sequenced Acrobat I performed a standard installation, with all of the latest patches, so that I could extract the Adobe PDF Converter printer driver and `AdobePDF.DLL`. After installation the driver can be found in `%ProgramFiles%\Adobe\Acrobat 8.0\Acrobat\Xtras\AdobePDF` and `AdobePDF.DLL` can be found in %SystemRoot%\SYSTEM32. Then, before sequencing the application, I installed the printer driver on the Sequencer machine (this was the driver only, not the Adobe PDF printer) and copied across AdobePDF.DLL.

To setup for sequencing, I created a snapshot of the Sequencer machine with all of the required files for the Acrobat installation so that I could roll back if my sequence failed. And it did fail, a lot, while getting this working. One of the current issues with the Sequencer is that if it fails on a file while building the package after the monitoring phase, it just stops. This means that I've had to rerun the sequence and installation until I worked out each file that was causing issues.

In the case of Acrobat, I would receive this error: "SystemGuard download failed (error code 53256)". By looking at the log file (`%ProgramFiles%\Softricity\SoftGrid Sequencer\Logs\sft-seq-log`), I could see the files that the Sequencer was having issues with.

> [11/22/2007 17:38:04 VRB VFSX] SxS: Starting SxS public-to-private assembly conversion.  
> [11/22/2007 17:38:05 WRN VFSX] SxSPE::parseUTF : Unsupported UTF format for file Y:\acrobatp.80\Adobe\Acrobat 8.0\Acrobat\FileInfo.dll (format # 3).  
> [11/22/2007 17:38:05 VRB RTSK] Failed to convert public SxS assemblies.  
> [11/22/2007 17:38:05 ERR RTSK] SystemGuard download failed (error code 53256).  
> [11/22/2007 17:38:05 ERR RTSK] SystemGuard download failed (error code 53256).

This turned out to be issues with the manifests inside three DLL files encoded in UTF-16. There a couple of ways around this issue. One is to delete the .manifest resource from within the DLL with a PE utility such as [PE Explorer](http://www.heaventools.com/overview.htm), however two of these files don't include a manifest within them at all. A much better way is to add an external manifest for each DLL after completing the installation of Acrobat. These are the files I had issues with:

* Y:\acrobatp.80\Adobe\Acrobat 8.0\Acrobat\FileInfo.dll
* Y:\acrobatp.80\Adobe\Acrobat 8.0\Acrobat\versioncue.dll
* Y:\acrobatp.80\Adobe\Acrobat 8.0\Acrobat\versioncueui.dll

So I needed to add a manifest file for each DLL:

* Y:\acrobatp.80\Adobe\Acrobat 8.0\Acrobat\FileInfo.dll.manifest
* Y:\acrobatp.80\Adobe\Acrobat 8.0\Acrobat\versioncue.dll.manifest
* Y:\acrobatp.80\Adobe\Acrobat 8.0\Acrobat\versioncueui.dll.manifest

I created this for `FILEINFO.DLL` using PE Explorer; however I was able to use the same contents for each manifest file. I presume the only required text is the first line. Here's a list of the components I required for this installation:

* The Acrobat installation files
* Updates 8.1 and 8.1.1 for Acrobat 8 (these are MSP files and non-cumulative)
* The Adobe PDF Converter driver
* Two scripts, one for installing the driver and a second for installing Adobe Acrobat plus patches and modifications
* A transform file to assist in automating and configuring the installation of Acrobat
* Manifest files for each DLL that the Sequencer has issues with

When sequencing of Adobe Acrobat I've [created a custom transform file](http://www.adobe.com/support/downloads/detail.jsp?ftpID=3564) that adds the serial number, disables Adobe Updater and ensures the setup files (around 1 GB) are not cached. Installation, patching, configuring and sequencing Acrobat has been taking about an hour. Once the application is ready to go on the SoftGrid client I've observed the following behaviour:

* The Adobe licensing appears to work as the application do not prompt for a license number or activation
* Acrobat Professional and LiveCycle Designer run without issues. Users should be able to create documents and forms without issues
* Installation of the Adobe PDF Converter driver and creating the Adobe PDF printer is straight-forward, however:
* The Adobe PDF printer port is not created, which mean that the printer is offline and you can't print PDF files
* Acrobat Distiller pushes the CPU to 100% as soon as it's run

So that's what I've got so far. I still have a few issues to sort out and I'll post again if I find a solution but I'm not terribly optimistic.

## Further Reading

* [Some Applications Fail to Sequence with Error Code 53256 / Unsupported UTF format](http://blogs.msdn.com/rslaten/archive/2007/09/11/some-applications-fail-to-sequence-with-error-code-53256-unsupported-utf-format.aspx)
* [Error message when you try to sequence an application in SoftGrid: "SystemGuard download failed (error code 53256)"](http://support.microsoft.com/kb/931592)
* [Update: Error 53256 Sequencing Adobe CS3](http://blogs.technet.com/softgrid/archive/2007/10/25/update-error-53256-sequencing-adobe-cs3.aspx)
* [TechNet Forums: SxS error when sequencing Adobe CS3 apps, Acrobat 8 Pro](http://forums.microsoft.com/TechNet/ShowPost.aspx?PostID=2105830&SiteID=17)
* [TechNet Forums: Adobe Acrobat 8 Standard](http://forums.microsoft.com/TechNet/ShowPost.aspx?PostID=2121347&SiteID=17)
