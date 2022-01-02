---

title: 'App-V FAQ: How do I restrict access to specific applications in an App-V package?'
date: 2010-09-21T11:00:00+10:00
author: Aaron Parker
layout: post

permalink: /restrict-applications-in-an-app-v-package/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195425607"
categories:
  - FAQs
tags:
  - App-V
  - AppVFAQ
---
![AppV logo]({{site.baseurl}}/media/2010/06/AppVFAQLogo.png)Consider the following scenario - I have created a Microsoft Office package with App-V that includes the base Office applications (Word, Excel, PowerPoint and Outlook). In addition to these I have also included Project and Visio. So I have a single App-V package that includes all of the Office applications – the base set of applications plus a couple of additional applications that I want to provide to a subset of users.

I have imported the package into my Management Server and given all users access to the Word, Excel, PowerPoint and Outlook shortcuts. I have created separate domain groups - one each for Project and Visio and configured access to those shortcuts accordingly. I now have users only accessing their assigned applications. Right?

Not quite. As I've shown [in my previous FAQ]({{site.baseurl}}/virtualisation/app-v-faq-27-how-do-i-get-an-application-into-the-app-v-bubble-for-troubleshooting), I can execute a different primary process rather than the one specified in the OSD file. So in this example, I can start Microsoft Word, but launch CMD.exe instead. I could then navigate to the Office installation folder and start any process including VISIO.EXE or MSPROJ.EXE. Additionally, I could insert a Visio diagram into a Word document, which would launch Visio.

One approach to restricting access would be to create separate packages and use [Dynamic Suite Composition](http://technet.microsoft.com/en-us/library/cc843662.aspx) to combine the two environments on the client computer. However I now have two packages to create and update, increasing the size of the packages on disk and my network traffic when streaming those packages. As well as that I now have to maintain DSC links for multiple applications.

Delivering Office applications via separate packages would work, but it's not without it's drawbacks. Fortunately, there's a simpler solution.

## AppLocker

[AppLocker](http://technet.microsoft.com/en-us/library/dd548340(WS.10).aspx) is a feature of Windows 7 (Enterprise and Ultimate only) and Windows Server 2008 R2 (all editions) that allows you to whitelist or blacklist applications. By specifying PROJECT.EXE or VISIO.EXE as restricted to specified user groups (the same groups used when publishing the App-V shortcuts), I can control access to these applications even though users could attempt to launch them via means other than the delivered shortcuts. To implement AppLocker with App-V you need have deployed [App-V 4.5 SP1](http://support.microsoft.com/kb/976338/) or above.

[Tim Mangan](http://tmurgent.com/TMBlog/) has previously written an excellent article on the use of [AppLocker with App-V](http://www.brianmadden.com/blogs/timmangan/archive/2009/10/28/AppV-and-AppLocker.aspx), so I won't repeat the technical details here. If you are new to AppLocker or even App-V, read Tim's article.

[Software Restriction Policies](http://technet.microsoft.com/en-us/library/bb457006.aspx), the predecessor to AppLocker, is available for earlier versions of Windows and also works with App-V, but is not as flexible as AppLocker.

## 3rd Party Alternatives

If you aren't deploying Windows 7 or Windows Server 2008 R2 there are 3rd party application white-list solutions that work with App-V – many organisations may already have these products in their environments. The most common of these will be [AppSense Application Manager](http://www.appsense.com/products/applicationmanager.aspx) and [RES PowerFuse](http://www.ressoftware.com/pagina/72/res-powerfuse.aspx).

## Resources

* [App-V and AppLocker](http://www.brianmadden.com/blogs/timmangan/archive/2009/10/28/AppV-and-AppLocker.aspx)
* [Windows 7 AppLocker Executive Overview](http://technet.microsoft.com/en-us/library/dd548340(WS.10).aspx)
* [AppLocker Documentation for Windows 7 and Windows Server 2008 R2](http://technet.microsoft.com/en-us/library/dd723678(WS.10).aspx)
* [AppLocker Step-by-Step Guide](http://technet.microsoft.com/en-us/library/dd723686(WS.10).aspx)
* [Windows AppLocker](http://technet.microsoft.com/en-us/library/dd759117.aspx)
* [Application Virtualization with AppLocker Executable Rules](http://technet.microsoft.com/en-us/windows/ee532032.aspx) (video)
* [AppSense Application Manager](http://www.appsense.com/products/applicationmanager.aspx)
* [RES PowerFuse](http://www.ressoftware.com/pagina/72/res-powerfuse.aspx)