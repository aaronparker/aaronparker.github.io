---
id: 61
title: Error with OUTLK12.ADM
date: 2007-04-17T20:28:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/error-with-outlk12adm
permalink: /error-with-outlk12adm/
views:
  - "1"
dsq_thread_id:
  - "195378454"
categories:
  - Applications
tags:
  - Group Policy
  - Office
---
The ADM/ADMX templates have been updated and include the fix for the Outlook template. See the download link below to update your templates.

When adding the Outlook 2007 ADM template file, OUTLK12.ADM, to a Group Policy object, you may encounter the following error displayed when you view a settings report in the GPMC:

> The .adm file "\\company.local\SysVol\clariti.internal\Policies\{C08857CE-A103-456A-8D3D-0A4F869B8C4A}\Adm\outlk12.adm" is in not in a valid format and must be replaced. Details: A value name is expected before line 2461.

To fix this issue follow these steps:

**1**. Make a copy of OUTLK12.ADM, e.g. OUTLK12-Fixed.ADM

**2**. Open OUTLK12-Fixed.ADM in Notepad and go to line 2461 (Edit / Go To..)

**3**. This line should be in a section that looks like this, starting at line 2459 and ending at 2464:

```
KEYNAME Software\Policies\Microsoft\Office\12.0\Outlook\Security  
VALUEON NUMERIC 1  
VALUEOFF NUMERIC 0  
VALUENAME PromoteErrorsAsWarnings  
EXPLAIN !!L_PromotingerrorsaswarningsExplain  
END POLICY
```

**4**. Swap the text on line 2460 with the text on line 2462, so that is now looks like this:

```
KEYNAME Software\Policies\Microsoft\Office\12.0\Outlook\Security  
VALUENAME PromoteErrorsAsWarnings  
VALUEON NUMERIC 1  
VALUEOFF NUMERIC 0  
EXPLAIN !!L_PromotingerrorsaswarningsExplain  
END POLICY
```

5. Save the template and add it back into your Group Policy object and it should now work.

It's a little odd that this problem is there right out of the box but I don't know if anyone else is experiencing this issue. You can get the Office 2007 ADM files from here:

![2007 Office System Administrative Templates](http://www.microsoft.com/downloads/details.aspx?FamilyID=92d8519a-e143-4aee-8f7a-e4bbaeba13e7&DisplayLang=en)

> This download includes updated Group Policy Administrative Template files and Office Customization Tool OPA files for use with the 2007 Microsoft Office system programs. It also includes an \Admin folder with an updated Office Customization Tool, and ADMX and ADML versions of the 2007 Microsoft Office system Administrative Template files for Windows Vista and Windows Server 2008. In Windows Vista and Windows Server 2008 operating systems, the ADM files are replaced by ADMX files, which use an XML-based file format to display registry-based policy settings. This download also includes a workbook (Office2007GroupPolicyAndOCTSettings.xls) that provides information about the 2007 Office system Group Policy settings and OPA settings.
