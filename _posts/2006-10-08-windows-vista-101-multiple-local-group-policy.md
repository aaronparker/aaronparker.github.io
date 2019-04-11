---
id: 170
title: 'Windows Vista 101: Multiple Local Group Policy'
date: 2006-10-08T03:36:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/windows-vista-101-multiple-local-group-policy
permalink: /windows-vista-101-multiple-local-group-policy/
categories:
  - Microsoft
tags:
  - Group Policy
  - Windows-Vista
---
Here's an interesting new feature of Windows Vista that will be a help to shared computing environments such as public libraries or those still inflicted with Windows NT 4.0 domains €“ Multiple Local Group Policy.

<img border="0" width="566" src="https://stealthpuppy.com/media/2006/10/1000.14.140.MultipleLocalGroupPolicy.PNG" height="252" style="width: 566px; height: 252px" /> 

In environments where Windows is installed and not connected to a domain, locking down the user interface with Group Policy has been a challenge because local Group Policy applies to all users including Administrators. Windows Vista and Longhorn Server now allow the administrator to create multiple local Group Policy objects that can be applied to specific users or groups. It's a simple process:

  1. Open the Microsoft Management Console by running MMC.EXE
  2. In the Console1 window, click File, and then click Add/Remove Snap-in.
  3. In the Add/Remove Snap-in dialog box, in the Available snap-ins list, click Group Policy Object Editor, and then click Add.
  4. In the Select Group Policy Object dialog box, ensure Local computer appears under Group Policy Object. Click Finish. This will add a standard local Group Policy object that will apply to the computer and all local users.
  5. To add a second local GPO to apply to non-Administrators, click Group Policy Object Editor under the Available standalone snap-ins list and then click Add.
  6. In the Select Group Policy Object dialog box, click Browse. Click the Users tab. Click the Non-Administrators group. Click OK. Click Finish.

<a target="_blank" href="http://www.trustedaccess.info/photos/images/images/141/original.aspx"></a>

[<img border="0]({{site.baseurl}}/media/2006/10/1000.14.141.AddingSnapIn.PNG)

It's a simple as that. Now you can apply policies to non-Administrators without affecting administrator accounts on the machine. For a full step by step guide and discussion on this feature check out the following document from Microsoft:

[Step-by-Step Guide to Managing Multiple Local Group Policy](http://download.microsoft.com/download/3/b/a/3ba6d659-6e39-4cd7-b3a2-9c96482f5353/Step%20by%20Step%20Guide%20to%20Device%20Driver%20Signing%20and%20Staging.doc)