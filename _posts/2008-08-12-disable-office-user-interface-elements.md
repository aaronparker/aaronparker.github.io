---

title: Disable Office User Interface Elements
date: 2008-08-12T22:05:18+10:00
author: Aaron Parker
layout: post

permalink: /disable-office-user-interface-elements/
thesis_description:
  - How to use Group Policy to restrict access to specific menus and buttons in Office 2007
aktt_notify_twitter:
  - 'yes'
categories:
  - Applications
tags:
  - Group Policy
  - Office-2007
---
Group Policy allows you to disable certain UI elements within Office applications, which you might want to do in the case of the [Information Rights Management](http://technet.microsoft.com/en-us/library/cc179103.aspx) feature built into Office 2003 and 2007.

I'm picking on IRM in this post about disabling UI elements, but you can disable all of the IRM features in Office by enabling a single policy: User Configuration / Policies / Administrative Templates / Microsoft Office 2007 system / Manage Restricted Permissions / Disable Information Rights Management User Interface

If you haven’t yet, or are not ever, planning to roll out [Active Directory Rights Management Services](http://technet.microsoft.com/en-us/library/cc534988.aspx) you’ll want to remove these features from Office which would lead users to dialog boxes such as this one (not particularly ideal):

![IRM-Dialog]({{site.baseurl}}/media/2008/08/irmdialog.png)

To disable menu items in Office you'll first need to know the control ID's of those items. This means you'll need to wade through the 23 spreadsheets including in the [2007 Office System Document: Lists of Control IDs](http://www.microsoft.com/downloads/details.aspx?familyid=4329d9e9-4d11-46a5-898d-23e4f331e9ae&displaylang=en) to find the ID listed amongst thousands. Fortunately most of the IDs are the same across each of the Office applications.

So to hide the IRM features in Office 2007 Professional Plus, Enterprise and Ultimate, I need to add the following IDs to Group Policy:

|Word |Excel|PowerPoint|Outlook|
|-----|-----|----------|-------|
|7990 |7990 |7990      |9925   |
|7991 |7991 |7991      |14954  |
|10014|10014|10014     |14955  |
|31308|31308|16314     |15831  |
|16137|     |          |       |
|31308|     |          |       |
{:.stretch-table}

These are the policy settings you'll need to enable and add the IDs to:

* User Configuration / Policies / Administrative Templates / Microsoft Office Excel 2007 / Disable Items in User Interface / Custom / Disable commands
* User Configuration / Policies / Administrative Templates / Microsoft Office Outlook 2007 / Disable Items in User Interface / Custom / Disable command bar and menu items
* User Configuration / Policies / Administrative Templates / Microsoft Office PowerPoint 2007 / Disable Items in User Interface / Custom / Disable commands
* User Configuration / Policies / Administrative Templates / Microsoft Office Word 2007 / Disable Items in User Interface / Custom / Disable commands

Which then results in something like this:

![Restrict-Permissions]({{site.baseurl}}/media/2008/08/restrictpermissions.png)
