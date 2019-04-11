---
id: 2175
title: How the App-V 4.6 Service Pack 1 Sequencer helps you implement best practices
date: 2011-03-10T17:43:17+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2175
permalink: /appv-46-sp1-sequencer-helps-you-implement-best-practices/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "250641582"
categories:
  - Applications
tags:
  - App-V
---
<img style="background-image: none; margin: 0px 0px 5px 10px; padding-left: 0px; padding-right: 0px; display: inline; float: right; padding-top: 0px; border-width: 0px;" title="AppV46SequencerNew" src="{{site.baseurl}}/media/2011/03/AppV46SequencerNew.png" border="0" alt="AppV46SequencerNew](http://www.microsoft.com/downloads/en/details.aspx?FamilyID=3b48dbfe-612d-4806-b737-9254bd9b2445) Sequencer introduces some major changes in the user interface and the sequencing workflow. These changes have been designed to assist the sequencing engineer with virtualising applications in App-V while aligning with best practices.

If you’re a seasoned sequencing engineer the Sequencer has some major UI changes, but let me show you why I think that once you’ve had an opportunity to use the new Sequencer, you’ll be smiling. (Minimise during sequencing is back too which will make plenty of people even happier)

### Sequencer Installation

Built-in best practices are implemented right from installation - the first change you’ll see is during the installation of the Sequencer. Setup will ask for the virtual drive letter:

<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="AppV-Sequencer-BestPractice12" src="{{site.baseurl}}/media/2011/03/AppV-Sequencer-BestPractice12.png" border="0" alt="AppV-Sequencer-BestPractice12" width="504" height="382" /> 

If this drive letter does not already exist as an actual partition or volume within your sequencing computer, Setup will create a drive substitution for you. (The substitution is to _%ProgramData%\Microsoft\Application Virtualization Sequencer\Package Root\_).

Another best practice is implemented during installation – the creation of a dummy ODBC connection. Both a system DSN and a user DSN for the current user are created:

<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="ODBC" src="{{site.baseurl}}/media/2011/03/ODBC.png" border="0" alt="ODBC" width="471" height="390" /> 

### Sequencer Templates

App-V 4.6 SP1 introduces Sequencer Templates which can be used to standardise commonly applied settings when you create new virtual application packages. This will help streamline the process of creating virtual application packages, especially if your own best practices differ from the default settings.

<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="AppV-Sequencer-BestPractice13" src="{{site.baseurl}}/media/2011/03/AppV-Sequencer-BestPractice13.png" border="0" alt="AppV-Sequencer-BestPractice13" width="509" height="466" /> 

Sequencer Templates (.sprt files) are single XML files than can be copied into your sequencing VM and applied to new packages. These will become an important part of any packaging team’s methods for standardising their packages.

Sequencer Templates can include the following settings:

  * Advanced Monitoring Options (e.g. allow Windows Update during monitoring, Rebasing DLLs)
  * Package Deployment Settings (e.g. the default server hostname and protocol)
  * General Options (e.g. creating an MSI package)
  * Parse Items
  * Exclusion Items

A master template or templates for specific application types can be used to ensure everyone is using the same settings for their sequences.

### Preparing for Sequencing

When sequencing an application the Sequencer will now ensure that the sequencing computer has been prepared correctly. In the example below you can see four issues that the Sequencer has detected:

  * Windows Defender is running
  * The Windows Search service is running
  * Some applications are open before starting the sequencing process
  * My virtual machine has not been reverted to a clean state before starting wizard

The Sequencer is recommending a solution for each issue before proceeding:

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="AppV-Sequencer-BestPractice15" src="{{site.baseurl}}/media/2011/03/AppV-Sequencer-BestPractice15_thumb.png" border="0" alt="AppV-Sequencer-BestPractice15]({{site.baseurl}}/media/2011/03/AppV-Sequencer-BestPractice15.png)

Getting this type of information directly from the Sequencer is a fantastic feature because it will assist in creating successful and cleaner packages.

### Creating Packages

The SP1 Sequencer now directly assists in capturing the type of application you are sequencing. Making a decision at this point about the type of application changes the sequencing workflow so that the Sequencer can guide you through the capture process.

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="AppV-Sequencer-BestPractice16" src="{{site.baseurl}}/media/2011/03/AppV-Sequencer-BestPractice16_thumb.png" border="0" alt="AppV-Sequencer-BestPractice16]({{site.baseurl}}/media/2011/03/AppV-Sequencer-BestPractice16.png)

Getting this process correct is especially important for add-ons or middleware components that you might link to a primary application using [Dynamic Suite Composition](http://technet.microsoft.com/en-us/library/cc843662.aspx).

### Editing Packages

The same approach has been taken when editing packages:

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="AppV-Sequencer-BestPractice11" src="{{site.baseurl}}/media/2011/03/AppV-Sequencer-BestPractice11_thumb.png" border="0" alt="AppV-Sequencer-BestPractice11]({{site.baseurl}}/media/2011/03/AppV-Sequencer-BestPractice11.png)

By choosing the package edit task within the Sequencer, you will be guided through an edit or update task, making it simpler to generate a new version of a package. The workflow will change depending on the task that you choose.

### Install Phase

During the installation phase, the Sequencer will prompt for a package name. You’ll notice here that the Sequencer is auto-creating the Primary Virtual Application Directory and using a name that does not adhere to a previous [best practice of using an 8.3](http://blogs.technet.com/b/appv/archive/2007/10/04/getting-to-the-root-of-the-8-3-root.aspx) naming convention:

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="AppV-Sequencer-BestPractice19" src="{{site.baseurl}}/media/2011/03/AppV-Sequencer-BestPractice19_thumb.png" border="0" alt="AppV-Sequencer-BestPractice19]({{site.baseurl}}/media/2011/03/AppV-Sequencer-BestPractice19.png)

Behind the scenes the Sequencer is taking care of the 8.3 folder for you, making sequencing that one step simpler. You can however, continue using your existing naming conventions if you have them by using the _Edit (Advanced)_ check box.

At this point, the Sequencer will also remind you to where to install the application you are sequencing:

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="AppV-Sequencer-BestPractice01" src="{{site.baseurl}}/media/2011/03/AppV-Sequencer-BestPractice01_thumb.png" border="0" alt="AppV-Sequencer-BestPractice01]({{site.baseurl}}/media/2011/03/AppV-Sequencer-BestPractice01.png)

A small UI change, but a simple one that will assist those new to the sequencing process.

### First Run Tasks

In previous versions of the Sequencer, it wasn’t very clear that you should perform first run tasks after installing an application. First run tasks are now placed front and centre in a separate step during the sequencing process:

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="AppV-Sequencer-BestPractice17" src="{{site.baseurl}}/media/2011/03/AppV-Sequencer-BestPractice17_thumb.png" border="0" alt="AppV-Sequencer-BestPractice17]({{site.baseurl}}/media/2011/03/AppV-Sequencer-BestPractice17.png)

### Identifying potential virtualization issues

How do you record excluded files and registry keys or even features that won’t work once an application has been virtualised and isolated from the OS today? It’s not simple and I would guess that for many organisations this information is not documented. Thankfully the new Sequencer exposes much of this information with package reports – excluded files and unsupported application features (such as shell extensions) are recorded and listed and the end of the sequencing process.

The screenshot below shows a couple of examples when [sequencing Adobe Reader]({{site.baseurl}}/virtualisation/virtualising-adobe-reader-x/) – shell extensions that won't be available once Reader has been virtualised and files that have been excluded from the package:

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="AppV-Sequencer-BestPractice05" src="{{site.baseurl}}/media/2011/03/AppV-Sequencer-BestPractice05_thumb.png" border="0" alt="AppV-Sequencer-BestPractice05]({{site.baseurl}}/media/2011/03/AppV-Sequencer-BestPractice05.png)

Opening these items will display detailed information:

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="AppV-Sequencer-BestPractice18" src="{{site.baseurl}}/media/2011/03/AppV-Sequencer-BestPractice18_thumb.png" border="0" alt="AppV-Sequencer-BestPractice18]({{site.baseurl}}/media/2011/03/AppV-Sequencer-BestPractice18.png)

This information is then saved for each package in a new file named _report.xml_:

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="AppV-Sequencer-Report" src="{{site.baseurl}}/media/2011/03/AppV-Sequencer-Report_thumb.png" border="0" alt="AppV-Sequencer-Report]({{site.baseurl}}/media/2011/03/AppV-Sequencer-Report.png)

### Summary

The [App-V 4.6 SP1 Sequencer is available now](http://blogs.technet.com/b/mdop/archive/2011/03/09/app-v-4-6-sp1-and-med-v-2-0-are-available-as-part-of-mdop-2011.aspx) and because packages generated from this version will work with the RTM release of the 4.6 client and above, you can start using it today.

For some additional resources on App-V best practices, see these articles:

  * [Microsoft Application Virtualization Version 4.6 Trial Guide](http://download.microsoft.com/download/F/7/8/F784A197-73BE-48FF-83DA-4102C05A6D44/APP-V%204%206%20Trial%20Guide%20Final.docx)
  * [Best practices to use for sequencing in Microsoft App-V](http://support.microsoft.com/kb/932137)

Other App-V MVPs are blogging about App-V 4.6 SP1 as well:

  * Kevin Kaminski on ﻿﻿[How the App-V 4.6 SP1 Sequencer Makes Packaging Easier, Faster and More Predictable](http://myitforum.com/cs2/blogs/kkaminski/archive/2011/03/07/how-the-app-v-4-6-sp1-sequencer-makes-packaging-easier-faster-and-more-predictable.aspx)
  * Tim Mangan on [The New App-V Package Accelerator](http://www.tmurgent.com/TmBlog/?p=326)
  * Kalle Saunamäki on [What are the Package Accelerators?](http://www.virtualisointi.fi/en/archives/246)
  * Ment van der Plas on [Diagnostics in the App-V 4.6 SP1 Sequencer](http://www.softgridblog.com/?p=171)