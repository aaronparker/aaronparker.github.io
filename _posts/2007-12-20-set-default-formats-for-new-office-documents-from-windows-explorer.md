---
id: 406
title: Set Default Formats for New Office Documents from Windows Explorer
date: 2007-12-20T17:16:46+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/deployment/set-default-formats-for-new-office-documents-from-windows-explorer
permalink: /set-default-formats-for-new-office-documents-from-windows-explorer/
thesis_description:
  - Managing the Office 2007 new documents in the Windows Explorer right client/New menu
aktt_notify_twitter:
  - 'yes'
views:
  - "1"
categories:
  - Automation
tags:
  - Office-2007
  - Windows Explorer
---
If you&#8217;re deploying Office 2007 and haven&#8217;t yet standardised on the new file formats, you&#8217;re probably already aware of how to set the default file formats via [Group Policy](http://technet2.microsoft.com/Office/en-us/library/07946c8e-9311-42a6-979b-5bc89afb7a661033.mspx?mfr=true), or using the [Office Customization Tool](http://technet2.microsoft.com/Office/en-us/library/9c14db60-b591-41f9-a94b-50627d2daa811033.mspx?mfr=true) to set the defaults before installing Office.

There&#8217;s another avenue to creating new Office documents that I hadn&#8217;t thought about until I was asked to change the defaults today - creating new documents directly from within Windows Explorer:

![newbeforecropped.png](http://stealthpuppy.com/wp-content/uploads/2007/12/newbeforecropped.png) 

If a user creates a new Office document in this manner, it will be created in the new Office 2007 formats. I have no idea how many users actually use this feature but here&#8217;s how to change those defaults for Word, Excel and PowerPoint.

<p class="important">
  This is a machine level change and I recommend documenting your changes so that you can reverse them at some time in the future.
</p>

### Microsoft Word Document

Word only requires a simple registry change. Delete the following string value

[code]HKEY\_CLASSES\_ROOT\.docx\Word.Document.12\ShellNew\NullFile[/code]

Then create a new string (REG_SZ) value leaving the data blank.

[code]HKEY\_CLASSES\_ROOT\.doc\Word.Document.8\ShellNew\NullFile[/code]

### Microsoft Excel Worksheet

Excel is a little different in that it requires a template file to exist on the system from which the new document can be created. Windows stores these templates files in `%SYSTEMROOT%\SHELLNEW` (or `C:\Windows\ShellNew`). So you will need to create a blank Excel worksheet and save it as an Excel 97-2003 Workbook in C:\Windows\ShellNew. Then delete the following registry string value:

[code]HKEY\_CLASSES\_ROOT\.xlsx\Excel.Sheet.12\ShellNew\FileName[/code]

And create a new string (REG_SZ) with data pointing to the new template filename; in this case I&#8217;ve used EXCEL.XLS.

[code]HKEY\_CLASSES\_ROOT\.xls\Excel.Sheet.8\ShellNew\FileName[/code]

### Microsoft PowerPoint Presentation

PowerPoint is the same as Excel, you&#8217;ll need to create a blank PowerPoint 97-2003 Presentation and save it to `C:\Windows\ShellNew`. Then delete the following string value:

[code]HKEY\_CLASSES\_ROOT\.pptx\PowerPoint.Show.12\ShellNew\FileName[/code]

And create a new string (REG_SZ) value with data pointing to the new filename; in this case I&#8217;ve used POWERPNT.PPT

[code]HKEY\_CLASSES\_ROOT\.ppt\PowerPoint.Show.8\ShellNew\FileName[/code]

If you made the changes correctly, you should see this reflected in the New menu from within Explorer:

![newaftercropped.png](http://stealthpuppy.com/wp-content/uploads/2007/12/newaftercropped.png)