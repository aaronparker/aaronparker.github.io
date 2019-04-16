---
id: 1132
title: Deploy and update Adobe Reader with GFI LANguard
date: 2010-03-21T22:57:33+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=1132
permalink: /deploy-and-update-adobe-reader-with-gfi-languard/
dsq_thread_id:
  - "195381909"
categories:
  - Applications
tags:
  - Adobe Reader
  - GFI LANguard
---
This post has been sitting in my drafts since June 2009 and for whatever reason I haven't gotten around to posting it. So rather than delete it, I'm posting it as is - apologies in advance for quality of this post

I have used LANguard in the past for vulnerability testing and network discovery but frankly that's kind of boring stuff. What is interesting in the latest version is the ability to deploy software.

[LANguard 9](http://www.gfi.com/lannetscan) includes application deployment functions that make deploying software to remote machines quite simple.  I'm going to detail deploying Adobe Reader 9, using the deployment notes outlined in my [Deploying Adobe Reader 9]({{site.baseurl}}/deployment/deploying-adobe-reader-9-for-windows) post, then deploy the Reader 9.1.1 update, using that functionality.

I'm going to skip over most of the details of installing LANguard - it's a simple process, you'll just need to choose the type of datebase you

In my test environment I have configured three machines:

  * a domain controller (DC), which will also host my install files (at `\\dc\common`)
  * a machine running Windows Vista on which I have installed LANguard (`LANGUARD`)
  * and a machine running Windows 7 (`WIN7A`) to which I will deploy Adobe Reader

To deploy software to a remote machine, I need to be able to authenticate to that machine. Because I am using a domain, authentication is made simple; however I could actually deploy software to workgroup machines if I know an admin username and password for that those machines.

The deployment feature of LANguard is geared around installing a single file with parameters; however it's simple enough to deploy applications like Office or Reader by using a batch file:

![addcustomsoftware]({{site.baseurl}}/media/2009/05/addcustomsoftware.png)

Before I start deployment, I've configured a source location (`\\dc\common\Adobe\Reader91`) for Adobe Reader 9.1:

  * I have extracted the Reader 9.1 install files from the setup file downloaded from Adobe;
  * I have created a transform that will configure Reader as it is installed; and
  * I have created a batch file (`INSTALL.CMD`) that contains the install commands for Adobe Reader

INSTALL.CMD looks like this:

```powershell
@ECHO OFF
SET SOURCE=\\dc\Common\Adobe\Reader91
MSIEXEC /I %SOURCE%\AcroRead.msi TRANSFORMS=%SOURCE%\AdobeReader91Custom.mst ALLUSERS=TRUE REBOOT=SUPRESS /QB
```

The script will install Adobe Reader directly from the network, so the only file being copied to the remote machine is the script. Here's what the install source for Adobe Reader looks like:

![]({{site.baseurl}}/media/2009/05/reader91.png)

Deploying software is a three step process:

  1. add the file to deploy to the remote machines (in this case the batch file which will do the work);
  2. add the machines (by specifiying the hostname) to deploy the software to;
  3. then deploy immediately or choose to install using a schedule:

![Deploy]({{site.baseurl}}/media/2009/05/deploycustomsoftware-1b.png)

So how is this actually working? The deployment feature on LANguard is not dissimilar to the Sysinternals tool PSEXEC, where a temporary service is installed on the remote machine to deliver the install commands. Essentially to deploy Adobe Reader 9, I am using LANguard to remotely execute INSTALL.CMD. I need admin rights on the target computers and LANguard does the rest. I even get to see the progress of the deployment:

![deploymenprogess]({{site.baseurl}}/media/2009/05/deploymenprogess.png)

I can also use the same process to update Reader 9.1 with the 9.11. update patch.

I have downloaded the [Adobe Reader 9.1.1 Update](http://www.adobe.com/support/downloads/detail.jsp?ftpID=4452) (which comes as a Windows Installer Patch file - .MSP) and added it to the the same deployment location (`\\dc\common\Adobe\Reader911Update`). Again I have created a batch file that will install the 9.1.1 update from the same location:

```powershell
@ECHO OFF
SET SOURCE=\\dc\common\Adobe\Reader911Update
MSIEXEC /P %SOURCE%\AdbeRdrUpd911_all_incr.msp ALLUSERS=TRUE REBOOT=SUPRESS /QB
```

By going through the same deployment configuration, but instead using the batch file that will install the update, I can deploy to the machines that have Reader 9.1.

I've tested deploying the update while Reader is open on the remote machine and the install was successful. Once I closed and reopened Reader, I could see the 9.1.1 version. This may not work for all applications - I don't think that my example worked specifically because of LANguard, but you should at least have some success when updating in-use applications.
