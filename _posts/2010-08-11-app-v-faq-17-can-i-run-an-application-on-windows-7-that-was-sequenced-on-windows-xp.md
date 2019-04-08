---
id: 1761
title: 'App-V FAQ: Can I run an application on Windows 7 that was sequenced on Windows XP?'
date: 2010-08-11T11:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/app-v-faq-17-can-i-run-an-application-on-windows-7-that-was-sequenced-on-windows-xp
permalink: /app-v-faq-17-can-i-run-an-application-on-windows-7-that-was-sequenced-on-windows-xp/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195813163"
categories:
  - FAQs
tags:
  - App-V
  - AppVFAQ
---
<img style="margin: 0px 10px 5px 0px; display: inline" align="left" src="http://stealthpuppy.com/wp-content/uploads/2010/06/AppVFAQLogo.png" />As you should hopefully know by now [App-V is not a compatibility solution](http://stealthpuppy.com/virtualisation/app-v-faq-7-is-app-v-an-application-compatibility-solution), which means that you can’t use App-V to run applications that aren’t compatible with a specific version of Windows, you’ll need to [use other means to do that](http://stealthpuppy.com/deployment/app-v-faq-8-can-i-use-application-compatibility-shims-with-app-v).

The next question then is do you need to sequence an application on each of your target operating systems? This will, of course, be dependant on the application. If it’s a well behaved application that is compatible with each target OS, uses [correct calls to find special folder paths](http://go.microsoft.com/fwlink/?LinkId=71501), stores application settings in the registry and dependencies can be suitably managed (e.g. DLLs and runtimes), then there is a good chance that you can sequence once and deploy everywhere.

The basic process you should follow then, is sequence on the lowest common denominator, test on the target operating systems and re-sequence the application if you have issues on specific versions of Windows.

There are already plenty of articles and documents on this subject, a few of which I’ve listed here along with a pertinent quote:

[Do I need to re-sequence my applications when I move to a new OS?](http://blogs.technet.com/b/appv/archive/2009/12/14/do-i-need-to-re-sequence-my-applications-when-i-move-to-a-new-os.aspx)

> Here’s the current support statement for App-V from the product group and this statement supersedes all others.  
> It is often possible to sequence on one OS and run the virtualized app on a different OS, however this scenario is both app and OS dependent and is not guaranteed to work for all app/OS combinations since App-V is not a general purpose OS compatibility solution. If problems are encountered, the customer may be required to sequence on the same OS environment as the App-V client is running in order to resolve those problems

[Microsoft Application Virtualization Sequencing Guide 4.6](http://download.microsoft.com/download/F/7/8/F784A197-73BE-48FF-83DA-4102C05A6D44/App-46_Sequencing_Guide_Final.docx)

> Sequence on a machine that matches the operating system (OS) and configuration of the target clients. It is often possible to sequence on one OS and run the virtualized application on a different OS; however this scenario is both application- and OS-dependent and is not guaranteed to work for all application/OS combinations since App-V is not a general-purpose OS compatibility solution. If problems are encountered, the application may be required to be sequenced on the same OS environment that the App-V Client is running on order to resolve those problems.

[Inside the Sequencer - Part 1](http://blogs.technet.com/b/appv/archive/2007/08/21/inside-the-sequencer-part-1.aspx)

> O/S – The most common question I have received over the years is “What Operating System should I use on my Sequencer Workstation?” The answer can be simple, or it can be less simple. What is your SoftGrid Client’s operating system? That should match the O/S of the Sequencing workstation with the proper level of patching.  
> Now, what do I do if I am in a hybrid environment? That answer is slightly less easy, but easy none the less. As a rule of thumb, always go with the “lowest common denominator”. If in an environment where your SoftGrid client could either be Windows 2000 Pro, Windows XP Pro, or Windows 2003 Terminal Services, you should always select the older, or Windows 200 Pro, as the O/S of the Sequencer workstation.
> 
> Why?  
> I am so glad you asked. Because there is a greater chance that the application being Sequenced will lay down the greatest number of files, registry entries, COM, etc. on the older O/S than the newer. As such, when it streams and runs in its SystemGuard it will have more of its own assets bundled with it and be more self sufficient and able to remain isolated.  
> Now, the next common question is: “Can I sequence on Windows XP Pro and stream to SoftGrid client running on a Windows 2003 Terminal Server? The answer is “Most Likely’. In fact, we have seen success where an application that would not even install on a T/S box was Sequenced on Windows 2000 Pro and streamed to and run successfully on a SoftGrid for Terminal Server client.

[Microsoft SoftGrid Application Virtualization - MCS Sequencing Guidelines](http://www.microsoft.com/downloads/details.aspx?FamilyId=1C6A73B8-5DA8-4A1A-838B-A41CA492C488&displaylang=en)

> Sequence on a machine that is the lowest common denominator for the target clients. If the target clients consist of Windows XP machines and Windows 2000 machines, Microsoft recommends sequencing on Windows 2000. Applications sequenced on Windows XP and executed on Windows 2000 will still have a high likelihood of functioning properly; however, the odds are better when sequencing on Windows 2000 and deploying to Windows XP.

[Best practices to use for sequencing in Microsoft SoftGrid](http://support.microsoft.com/kb/932137)

> Can I sequence an application on one operating system and then stream it to another operating system?  
> Yes, SoftGrid lets you sequence on one operating system and then stream it to another operating system. However, the application may not work correctly if it detects the operating system version when the application is installed. The application may select different components depending on that detection. This may cause problems depending on the component compatibility with other operating systems. Before you try to stream an application to another operating system, determine whether additional sequencings are required for each operating system. You may have to contact the application vendor.