---

title: Customise Logon Point Source Files
date: 2006-08-29T17:02:00+10:00
author: Aaron Parker
layout: post

permalink: /customise-logon-point-source-files/
categories:
  - Citrix
tags:
  - Access-Gateway
---
Customising Logon points in Advanced Access Control is a fairly easy process. Customisation allows you to add a corporate look and feel to the user interface. However, removing and redeploying the Logon Point will remove all customisations - the Logon Point is just a bunch of HTML and graphic files. Here's how to customise the source files so that redeployed and new Logon Points will already have your customisations.

  1. Navigate to \Program Files\Citrix\Access Gateway\WebServicesCabContent.
  2. Make a backup copy of LogonAgentApp.CAB - allow for roll back if anything fails.
  3. Extract LogonAgentApp.CAB to a folder. For this example I'm using as C:\Temp\LogonAgentApp
  4. Make all customisation to the Logon Point files. See [here](http://support.citrix.com/article/CTX108617&searchID=20966991) and [here](http://www.jasonconger.com/ShowPost.aspx?strID=9efce8af-b7a3-4836-a0f5-cc6478909654) for information on customising the Logon Point.
  5. Download CABSDK.EXE from [Microsoft Cabinet Software Development Kit](http://support.microsoft.com/kb/310618) (Surely there's a better tool around..)
  6. Extract CABSDK.EXE and copy the files from \BIN to C:\Temp.
  7. Run the following command-line to pack the Logon Point source files back into a .CAB file: <font face="courier new,courier">CABARC.EXE -p -r -P Temp\ -P LogonAgentApp\ N LogonAgentApp.CAB LogonAgentApp\*.*</font>
  8. Copy the new .CAB file to \Program Files\Citrix\Access Gateway\WebServicesCabContent.
  9. Deploy your Logon Points with customisations intact.

The CABSDK is quite old but it does the trick. Documentation for CABARC.EXE in included in Word format in CABSDK.EXE. A breakdown of the command line is like this:

-p CABARC will preserve the paths names for each file within the .CAB file

-r CABARC will add all subfolders and files (recurse) to the .CAB file

-P This command is used to script the \Temp and \LogonAgentApp folders from the paths. Otherwise the .CAB file will list the files with an additional path

N This command tells CABARC to create a new .CAB file. In this instance LogonAgentApp.CAB

<p class="important">
  NOTE: I doubt that this would be supported by Citrix, so make sure you keep a copy of the original .CAB file.
</p>