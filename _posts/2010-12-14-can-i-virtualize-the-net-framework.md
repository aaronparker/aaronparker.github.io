---
id: 2057
title: 'App-V FAQ: Can I virtualize the .NET Framework or Visual C++ Redistributables?'
date: 2010-12-14T14:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/app-v-faq-31-can-i-virtualize-the-net-framework-or-visual-c-redistributables/
permalink: /can-i-virtualize-the-net-framework/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195383416"
categories:
  - FAQs
tags:
  - AppVFAQ
---
_This is a guest post from Nicke Källén, an_ [_App-V MVP_](https://mvp.support.microsoft.com/profile=DEDA5599-4A38-46A1-A4B0-479D4A945793) _from Sweden. He posts as [Znack](http://social.technet.microsoft.com/Profile/en-US/?user=znack&referrer=http%3a%2f%2fsocial.technet.microsoft.com%2fForums%2fen-US%2fappvclients%2fthread%2fba1a1e3b-b14e-45aa-9373-ba83601b67e9%3foutputas%3dxml&rh=tWq%2byX14GBUU1nKZoHcORYkqCJLPYn4mhXSrzDpr8kk%3d&sp=forums) on the [TechNet Forums](http://social.technet.microsoft.com/Forums/en-gb/category/appvirtualization), and you can read more articles from Nicke at his blog_ [_here_](http://www.viridisit.se/eng/blog/)_._

<img style="margin: 0px 10px 5px 0px; display: inline; float: left;" src="{{site.baseurl}}/media/2010/06/AppVFAQLogo1.png" alt="" align="left" /> The .NET Framework and Visual C++ Redistributables are components or application dependencies that have started to be considered as operating system components and the question of whether to include the .NET Framework and/or the Visual C++ Redistributables has been revisited quite a few times by Microsoft.

Since the release of App-V 4.5 it has been recommended that all versions of the .NET Framework are installed natively, however since the release of App-V 4.5 Cumulative Update 1 this was subsequently revised for Windows XP and this allowed versions earlier than the .NET Framework 3.5 Service Pack 1 to be part the package.

As a good practice any sequencing machine should be setup in a similar way as the client and therefore its key to synchronize the levels of the .NET Framework and Visual C++ Redistributables on both the sequencer and client computers. Visual C++ Redistributable are prerequisites for both the client and the Sequencer, however the current level is different depending on which version you are installing.

Microsoft have not explicitly stated that it is not possible to include the Visual C++ Redistributables within a virtualized application; however an older [Knowledgebase article](http://support.microsoft.com/kb/939084) (939084) states that they should be available locally on a client computer.

As illustrated on the official [.NET Framework support statement](http://technet.microsoft.com/appvirtualization/dd146065.aspx), the .NET Frameworks are included in all newer operating systems (Windows 7 includes .NET Framework 3.5 Service Pack 1 and below). Windows XP Service Pack 2 (and thereby we can also presume Windows Server 2003) is the only platform that would successfully execute a virtualized package containing .NET Framework while not having it available natively. The Application Virtualization 4.5 Cumulative Update 1 client would allow this due to a new mini-filter driver introduced in the update.

Regardless of whether it is possible to virtualize certain versions of .NET Framework on older platforms – it seems to be an more scalable and future-proof strategy to ensure that .NET Framework and Visual C++ Redistributables are available on any target machines for any virtualized application to use.

Normally the following can be recommended to be setup both on the sequencer and the client; (32-bit versions only linked below. 64-bit versions in case of availability are recommended also in case of having a 64-bit target environment)

### Visual C++ 2005 SP1

  * <http://www.microsoft.com/downloads/en/details.aspx?familyid=200b2fd9-ae1a-4a14-984d-389c36f85647&displaylang=en>
  * <http://www.microsoft.com/downloads/en/details.aspx?familyid=766a6af7-ec73-40ff-b072-9112bab119c2&displaylang=en>

### Visual C++ 2008 SP1

  * <http://www.microsoft.com/downloads/en/details.aspx?familyid=2051a0c1-c9b5-4b0a-a8f5-770a549fd78c&displaylang=en>
  * <http://www.microsoft.com/downloads/en/details.aspx?FamilyID=a5c84275-3b97-4ab7-a40d-3802b2af5fc2&displaylang=en>

### Visual C++ 2010

  * <http://www.microsoft.com/downloads/en/details.aspx?familyid=A7B7A05E-6DE6-4D3A-A423-37BF0912DB84&displaylang=en>

### .NET Framework 1.1 / 2.0 / 3.0 / 3.5 / 4.0

  * <http://www.microsoft.com/downloads/en/details.aspx?FamilyID=0a391abd-25c1-4fc0-919f-b21f31ab88b7&displaylang=en>
  * <http://www.microsoft.com/downloads/en/details.aspx?FamilyID=ab99342f-5d1a-413d-8319-81da479ab0d7&displaylang=en>
  * <http://support.microsoft.com/kb/959209>
  * <http://www.microsoft.com/downloads/en/details.aspx?FamilyId=262D25E3-F589-4842-8157-034D1E7CF3A3&displaylang=en>

The Application Virtualization Client requires [Visual C++ 2005 SP1](http://www.microsoft.com/downloads/en/details.aspx?familyid=200b2fd9-ae1a-4a14-984d-389c36f85647&displaylang=en) along with the [ATL security update](http://www.microsoft.com/downloads/en/details.aspx?familyid=766a6af7-ec73-40ff-b072-9112bab119c2&displaylang=en) and the [Visual C++ 2008 SP1](http://www.microsoft.com/downloads/en/details.aspx?FamilyID=a5c84275-3b97-4ab7-a40d-3802b2af5fc2&displaylang=en) along with its [ATL security update](http://www.microsoft.com/downloads/en/details.aspx?familyid=2051a0c1-c9b5-4b0a-a8f5-770a549fd78c&displaylang=en); however the Sequencer only installs [Visual C++ 2005 SP1](http://www.microsoft.com/downloads/en/details.aspx?familyid=200b2fd9-ae1a-4a14-984d-389c36f85647&displaylang=en) along with its [ATL security update](http://www.microsoft.com/downloads/en/details.aspx?familyid=766a6af7-ec73-40ff-b072-9112bab119c2&displaylang=en).  This of course requires the manual tasks of assuring that both are aligned on the same level in prerequisites.

Reading section 3.2 from the [4.6 sequencing whitepaper](http://download.microsoft.com/download/F/7/8/F784A197-73BE-48FF-83DA-4102C05A6D44/App-46_Sequencing_Guide_Final.docx) gives some specific examples how to resolve possible SxS issues when sequencing on a 64-bit sequencer – something which can be avoided if being prepared and already natively offering both 32-bit and 64-bit redistributables on both sequencer and client machine.

Not documented anywhere and purely untested, normally these following redistributables can also be recommended in maintaining natively;

### Visual J#

  * <http://www.microsoft.com/downloads/en/details.aspx?FamilyID=E3CF70A9-84CA-4FEA-9E7D-7D674D2C7CA1>
  * <http://www.microsoft.com/downloads/en/details.aspx?familyid=f72c74b3-ed0e-4af8-ae63-2f0e42501be1&displaylang=en>

 ****

### Visual Studio 2010 F# Runtime 2.0

  * <http://www.microsoft.com/downloads/en/details.aspx?FamilyID=5f0a79f8-925f-4297-9ae2-86e2fdcff33c&displaylang=en>

### Further reading and resources

  * [Application Virtualization 4.5 Release Notes](http://technet.microsoft.com/en-us/library/cc817171.aspx)
  * [Guide to sequencing .NET 4.0 with App-V 4.6 SP1](http://support.microsoft.com/kb/2519958)
  * [Support for .NET in Microsoft Application Virtualization (4.5) and 4.5 Cumulative Update 1](http://technet.microsoft.com/appvirtualization/dd146065.aspx)
  * [Support for .NET in Microsoft Application Virtualization 4.5 (App-V)](http://support.microsoft.com/kb/959524)
  * [Error message when you try to start a sequenced application in the Microsoft App-V (SoftGrid) client: "Error code: xxxxxx-xxxxxx2C-800736B1"](http://support.microsoft.com/kb/939084)
  * [Microsoft Application Virtualization 4.6 Sequencing Guide](http://download.microsoft.com/download/F/7/8/F784A197-73BE-48FF-83DA-4102C05A6D44/App-46_Sequencing_Guide_Final.docx)
  * [Visual C++ Libraries as Shared Side-by-Side Assemblies](http://msdn.microsoft.com/en-us/library/ms235624(VS.80).aspx)
  * [Howto: Deploy VC2008 apps without installing vcredist_x86.exe](http://blog.kalmbach-software.de/2008/05/03/howto-deploy-vc2008-apps-without-installing-vcredist_x86exe/)