---
id: 475
title: Planning and Deploying Group Policy? This Is For You
date: 2008-02-19T23:00:18+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/group-policy/planning-and-deploying-group-policy-this-is-for-you
permalink: /planning-and-deploying-group-policy-this-is-for-you/
dsq_thread_id:
  - "195380154"
categories:
  - Microsoft
tags:
  - Group Policy
---
<img src="http://stealthpuppy.com/wp-content/uploads/2008/02/servertools.png" alt="servertools.png" align="left" border="0" />Here&#8217;s a great document from the Microsoft writing team on planning and deploying Group Policy for Windows Server 2008. Many of the details in this document do apply to Windows Server 2003 and Windows 2000 Server as well. This document is the place to start for anyone dealing with Group Policy, no matter what your experience is.

> This guide provides the information needed to successfully plan and deploy Group Policy using Windows Server 2008 and the Group Policy Management Console.

<p class="download">
  <a href="http://www.microsoft.com/downloads/details.aspx?FamilyID=73d96068-0aea-450a-861b-e2c5413b0485&DisplayLang=en">Planning and Deploying Group Policy</a>
</p>

This document reinforces a number of Group Policy design tenets that I see ignored in many organisations, especially this one:

> Use the Enforced and Block Policy Inheritance features sparingly. Routine use of these features can make it difficult to troubleshoot policy because it is not immediately clear to administrators of other GPOs why certain policy settings do or do not apply.

and this one that I see far too often:

> If you need to modify the policy settings contained in the Default Domain Policy GPO, we recommend that you create a new GPO for this purpose, link it to the domain, and set the Enforce option. In general, do not modify the Default Domain Policy GPO or the Default Domain Controller Policy GPO. If you do, be sure to back up these and any other GPOs in your network by using the GPMC to ensure that you can restore them

Here&#8217;s a fun fact: did you know that Windows will not process more than 999 Group Policy objects? That&#8217;s a lot of coffee while you wait for youR machine to boot to the desktop!

> A maximum of 999 GPOs is supported for processing GPOs on any one user or computer. If you exceed the maximum, no GPOs will be processed. This limitation affects only the number of GPOs that can be applied at the same time; it does not affect the number of GPOs you can create and store in a domain.

Here&#8217;s a link to plenty more [Group Policy resources on the Microsoft Download centre](http://www.microsoft.com/downloads/results.aspx?DisplayLang=en&nr=20&freetext=group+policy&sortCriteria=date).