---
id: 176
title: 'How To: Add Office 2007 HTML Rendering Support in AAC'
date: 2006-09-28T18:20:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/how-to-add-office-2007-html-rendering-support-in-aac
permalink: /how-to-add-office-2007-html-rendering-support-in-aac/
categories:
  - Citrix
tags:
  - Access-Gateway
  - Office
---
With the release of Office 2007 not that far away, the new [Open XML](http://search.msdn.microsoft.com/search/Redirect.aspx?title=Introducing+the+Microsoft+Office+(2007)+Open+XML+File+Formats+&url=http://msdn2.microsoft.com/en-us/library/ms406049.aspx) file formats should be starting to make an appearance in enterprises. By installing the Microsoft Office applications on your Advanced Access Control server you can provide HTML rendering of Word, Excel and PowerPoint documents to your users (You can also provide access to Visio documents too, but I won't cover that here). At this stage, this will only cover the current .DOC, .XLS and .PPT file types. By installing the Microsoft Office Compatibility Pack for Word, Excel, and PowerPoint 2007 File Formats you can provide users with access to the new .DOCX, .XLSX and .PPTX. This is a simple process, here's how to do it:

1. Download and install the [Microsoft Office Compatibility Pack for Word, Excel, and PowerPoint 2007 File Formats](http://www.microsoft.com/office/preview/beta/converter.mspx) on your Advanced Access Control servers (You will already be required Office 2003 or XP installed on the AAC server). In some larger deployments only specific AAC servers in the farm may provide the web rendering features, so that is where these updates should be made.

2. Next we need to add support to AAC for the new file types. The Citrix Knowledge Center site lists the following support article for adding new files type support to AAC.

  * [CTX107543 - Customizing HTML Preview in Advanced Access Control](http://support.citrix.com/article/CTX107543&searchID=10651557)

Because that document covers the process in detail, I'll only list the registry changes required to add support for the new files types:

  * Create the following registry key: `HKEY_LOCAL_MACHINE\SOFTWARE\citrix\msam\activationservice\enginemanager\previewengine\caps`
  * Under this new registry key create a new String Value named: `MSWordHandler`
  * Add the following data to this value: `":.doc:.ans:.mcw:.rtf:.docx:`
  * Restart the Citrix Activation Host and the Citrix Deployment Server services on the AAC server and you're done.

Here is the full list of values to add to this new key:

|String Value                                                     |Data                                                                |
|-----------------------------------------------------------------|--------------------------------------------------------------------|
|MSWordHandler                                                    |":.doc:.ans:.mcw:.rtf:.docx:.docm:"                                 |
|MSExcelHandler                                                   |":.xls:.csv:.dbf:.dif:.slk:.wql:.xlt:.xlsx:.xlsm:"                  |
|MSPowerPntHandler                                                |":.ppt:.pot:.pps:.pptx:.pptm"                                       |

The .docm, .xlsm and .pptm are the new document types that include macros. If you feel that it could be a security risk for your organisation to allow macro support through the HTML rendering in AAC, do not add these file types.

Also of note is that the HTML rendering feature does not support text files by default. To add support for text files add '.txt:' (without quotes) to the MSWordHandler value.