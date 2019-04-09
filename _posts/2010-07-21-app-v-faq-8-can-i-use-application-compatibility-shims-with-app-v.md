---
id: 1691
title: 'App-V FAQ: Can I use Application Compatibility Shims with App-V?'
date: 2010-07-21T11:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/app-v-faq-7-can-i-use-application-compatibility-shims-with-app-v
permalink: /app-v-faq-8-can-i-use-application-compatibility-shims-with-app-v/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195382824"
categories:
  - FAQs
tags:
  - App-V
  - AppVFAQ
---
<img style="margin: 0px 0px 5px 10px; display: inline;" src="https://stealthpuppy.com/media/2010/06/AppVFAQLogo.png" alt="" align="right" />

Applications virtualised and delivered by App-V will work with [application compatibility shims](http://technet.microsoft.com/en-us/library/dd837644(WS.10).aspx). You should consider [application compatibility](http://technet.microsoft.com/windows/aa905066.aspx) testing and remediation as a part of any operating system upgrade, because [App-V is not a compatibility solution](https://stealthpuppy.com/virtualisation/app-v-faq-7-is-app-v-an-application-compatibility-solution).

Microsoft’s [Chris Jackson](http://blogs.msdn.com/b/cjacks/about.aspx) has written an excellent resource on TechNet that is essential reading if you want to understand App-V and [compatibility shims](http://technet.microsoft.com/en-us/library/dd837644(WS.10).aspx): [Making Applications Compatible with Windows 7 in a Virtualized Environment](http://technet.microsoft.com/magazine/ff458340.aspx)

> Microsoft Application Virtualization is a powerful application management and deployment tool. When working it in to your plans for a Windows 7 migration, you can benefit from the potential for reduced cost during installation testing (though this cost is not promised to be zero).
> 
> You can also continue to leverage most of the same processes for resolving application compatibility issues using shims. If you’re deploying a single, organization-wide shim database, the transition will be very minimal—you need only be careful to avoid elevation shims (in much the same way you should avoid elevation in general in an App-V environment).

### Resources

  * [Making Applications Compatible with Windows 7 in a Virtualized Environment](http://technet.microsoft.com/magazine/ff458340.aspx)
  * [Application Compatibility TechCentre on TechNet](http://technet.microsoft.com/windows/aa905066.aspx)
  * [Application Compatibility Toolkit 5.6](http://www.microsoft.com/downloads/details.aspx?FamilyId=24DA89E9-B581-47B0-B45E-492DD6DA2971&displaylang=en)
  * 3rd Party application compatibility solutions that work with App-V include: [App-DNA AppTitude](http://www.app-dna.com/AppTitude/Default.aspx) and [ChangeBase AOK](http://www.changebase.com/products.aspx)
  * [Top 5x5x5 Microsoft App-V Issues](http://aokcompat.blogspot.com/2009/10/top-5x5x5-microsoft-app-v-issues.html)
  * [5x5x5 App-V Application Compatibility Issues: Part 2](http://aokcompat.blogspot.com/2009/10/5x5x5-app-v-application-compatibility.html)
  * [App-V posts at the App-DNA blog](http://fishbowl.app-dna.com/category/App-V.aspx)
  * [App-V and Application Compatibility Shims](http://myitforum.com/cs2/blogs/kkaminski/archive/2010/01/30/app-v-and-application-compatibility-shims.aspx)
  * [TechNet Virtual Lab: Windows 7: Application Compatibility Toolkit 5.5 and Windows 7](http://go.microsoft.com/?linkid=9703458)
  * [TechNet Virtual Lab: Windows 7: Mitigating Application Issues Using Shims](http://go.microsoft.com/?linkid=9703460)