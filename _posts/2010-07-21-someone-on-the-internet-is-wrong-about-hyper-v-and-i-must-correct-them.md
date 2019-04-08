---
id: 1764
title: Someone on the Internet is wrong about Hyper-V and I must correct them
date: 2010-07-21T01:36:21+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=1764
permalink: /someone-on-the-internet-is-wrong-about-hyper-v-and-i-must-correct-them/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195383157"
categories:
  - Microsoft
tags:
  - Hyper-V
---
[VirtualizationAdmin.com](http://www.virtualizationadmin.com/) has a new article by [David Davis](http://www.virtualizationadmin.com/David_Davis/) titled: [5 things Microsoft must do to stay in the virtualization game](http://www.virtualizationadmin.com/articles-tutorials/general-virtualization-articles/5-things-microsoft-must-do-stay-virtualization-game.html). I think the article has some fairly weak arguments and certainly a couple of claims that are just wrong. VirtualizationAdmin doesn&#8217;t provide a way to comment on articles, so I&#8217;ll break this down in an article of my own.

Let me start out by stating I&#8217;m not an expert in either VMware vSphere or VMware View, I&#8217;m not attempting to defend Microsoft nor am I attacking David personally. I just think that article is a little sloppy and needs some corrections.

### Consolidate the Remote Desktop product line

The first point takes issue with the various Remote Desktop features in Windows Server 2008 R2, specifically David writes:

> Also in the Remote Desktop product line is:
> 
>   * Remote Desktop Connection Broker &#8211; for personal virtual desktops and desktop pools
>   * Remote Desktop Gateway &#8211; formerly Terminal Services Gateway, allows remote users on the Internet to connect to their desktops securely using RDP over HTTPS
>   * Remote Desktop Web Access &#8211; formerly Terminal Services Web Access, allows users to access remote desktops and apps through their web browser
>   * Remote Desktop Virtualization Host &#8211; the piece that connects Hyper-V virtual machines to end users connecting through RD connection broker, providing that personal virtual desktop
> 
> And, the Remote Desktop product line goes on and on with a handful of other &#8220;Remote Desktop X, Y, and Z&#8221; products that are less important. My point in this, besides trying to educate you on the various Remote Desktop products from Microsoft, is that this Microsoft Remote Desktop product line is confusing. With VMware or Citrix there is View and XenDesktop, respectively. What&#8217;s the answer? Simplify it. If you want to do any kind of desktop or session virtualization, why can&#8217;t you just install Microsoft &#8220;Remote&#8221;? It&#8217;s one word and it could do it all.

I&#8217;ll agree that the naming is a mouthful, but then Microsoft has never been known for catchy product names &#8211; in fact products usually have cool names during beta but end up being given ridiculously unwieldy names at launch. I don&#8217;t know what the &#8220;handful of other Remote Desktop X, Y, and Z&#8221; products are because I can&#8217;t find them. Unless he&#8217;s referring to the client side components &#8211; Remote Desktop Connection client and the RemoteApp and Desktop Connections applet in Windows 7 (it would be great if Microsoft released this feature for Windows Vista and XP).

In regards to simplifying, David isn&#8217;t comparing apples with apples here, VMware View and Citrix XenDesktop are only one part of the full suites. With Citrix XenDesktop, you need to add XenApp, Web Interface, XenServer, Provisioning Services and Secure Gateway or Access Gateway to to the list. With VMware View, you need to add vSphere, VMware View Webinterface, View Manager and View Composer (as far as I can tell VMware doesn’t have an equivalent for RD Gateway).

Microsoft does have a simpler all encompassing name for these features – [Remote Desktop Services](http://www.microsoft.com/windowsserver2008/en/us/rds-product-home.aspx). In true Microsoft style though, it’s not as simple as View or XenDesktop. You could also just call the product “Windows” as each is just a feature of Windows Server. However, changing the name of the product line won’t fix the real issue which is that the Microsoft offering [is more difficult to configure than it needs to be](http://www.brianmadden.com/blogs/gabeknuth/archive/2010/04/01/geek-week-vdi-day-4-microsoft-quot-in-box-quot-vdi-solution-summary.aspx).

As far as consolidation goes, if you’re deploying the Microsoft solution at scale, you’ll need to separate these roles on different hosts to provide performance. Consolidating these product is possible, but if that were forced it would limited its’ effectiveness.

Finally just on a technical point, Remote Desktop Connection Broker is also used to handle connections to RD Session Host for session desktops and RemoteApp.

### Add more features to Hyper-V, SCVMM, and RD Connection Broker

David says of SCVMM:

> System Center Virtual Machine Manager 2008 R2- while it isn&#8217;t a feature, again, Microsoft is killing me with names. A name with 7 words is just silly. VMware has vCenter and Xen has Essentials. Microsoft&#8217;s centralized virtualization manager needs a simple name like &#8220;HVmanager&#8221;.

Yeah, System Center Virtual Machine Manager 2007 R2 is a pretty long name and could be simpler, but there’s plenty more to fix in or add to SCVMM before changing the name.

David also says:

> RD Connection Broker &#8211; Microsoft&#8217;s desktop virtualization solution needs more features to even come close to the current version of VMware View. However, the next version of View will have even more features. To even try to keep pace, MS must attempt to match the current version with features like linked clones, greater pool flexibility, richer desktop protocols, and offline desktop.

It isn&#8217;t the role of the connection broker to have features such as linked clones, SCVMM or Hyper-V itself should offer this, though linked clones or thin provisioning is a feature that I would like to see Microsoft offer. [Update: Microsoft has differencing disks, but this isn&#8217;t the same as linked clones]

How much of a richer protocol do you want? RDP is getting [RemoteFX](http://www.brianmadden.com/blogs/brianmadden/archive/2010/07/13/microsoft-remotefx-is-now-available-via-public-beta.aspx) with Windows Server 2008 R2 and Windows 7 Service Pack 1, of course it&#8217;s LAN only but so is PCoIP. I&#8217;ll take XenDesktop and ICA (or perhaps even [vWorkspace and EOP Xtreme](http://www.brianmadden.com/blogs/videos/archive/2010/07/12/quest-s-eop-quot-xstream-quot-does-amazing-things-for-rdp-latency-with-video-demo-goodness.aspx)) over VMware View and PCoIP any day.

Offline desktop &#8211; Microsoft has this in a fashion with Windows Vista and above that are HAL independent (although a client hypervisor may come with Windows 8, but that’s some time off) – VMware doesn&#8217;t have offline desktop yet, in fact [it looks like they&#8217;ve dropped the idea](http://virtualization.info/en/news/2010/07/vmware-client-virtualization-platform-indefinitely-postponed.html). Citrix does have [a working client hypervisor](http://www.citrix.com/xenclient) though.

### Use Hyper-V in the Cloud

On Windows Azure, David writes:

> It has been reported that Microsoft&#8217;s Azure service doesn&#8217;t use their flagship virtualization product &#8211; Hyper-V. Instead, Azure is based on a modified version of Linux. How can Microsoft tout cloud computing and virtualization if they don&#8217;t &#8220;take their own medicine&#8221;? If Hyper-V is supposed to be good enough for the Fortune 5000 companies, then it should be good enough for Microsoft&#8217;s cloud computing platform.

Wow, a little research (even [use Bing](http://www.bing.com/search?q=hypervisor+used+by+windows+azure&go=&form=QBLH&filt=all&qs=n&sk=) if you must) will show that this isn&#8217;t true and I can’t find an article that asserts that the Azure hypervisor is Linux based. The confusion here may stem from the fact that the hypervisor used by Windows Azure is not the Hyper-V used in Windows Server. Instead it’s a heavily customised version of Hyper-V from which features are ported into the mainstream Hyper-V product.

Here are a few articles that discuss the Azure Hypervisor:

  * [Azure Services Platform](http://en.wikipedia.org/wiki/Azure_Services_Platform)
  * [Design Principles Behind The Windows Azure Hypervisor](http://blogs.msdn.com/b/windowsazure/archive/2009/01/29/design-principles-behind-the-windows-azure-hypervisor.aspx)
  * [Azure Network Security](http://edge.technet.com/Media/Azure-Network-Security/)
  * [Cloud Twist: Windows Azure&#8217;s Hypervisor isn&#8217;t Hyper-V](http://www.cio.com/article/460165/Cloud_Twist_Windows_Azure_s_Hypervisor_isn_t_Hyper_V)
  * [More Azure Hypervisor Details](http://virtualizationreview.com/blogs/mental-ward/2008/11/more-azure-hypervisor-details.aspx)

### Build a stronger community and create grass-roots excitement

On this, David says:

> VMware&#8217;s VMworld conference is the model for any other virtualization conference in the world. VMware awarded 300 expert bloggers and experts the vExpert award. VMware&#8217;s communities and blogs are the best out there. These are examples of things that Microsoft needs to &#8220;match and raise&#8221; VMware on. They have to do better than &#8220;handing out poker chips&#8221; (at VMworld 2008), essentially bribing people to get their attention. Instead, how about delivering shocking new features and building a huge base of experts and bloggers that love the product? In other words &#8211; create a &#8220;vTechEd&#8221; for virtualization only and a &#8220;vMVP&#8221; for Microsoft virtualization pros only.

I think this is a matter of opinion rather than fact.

Microsoft has two main technical conferences in TechEd and MMS, both of which cover virtualisation. They also have 4000 MVPs in total with three dedicated virtualisation MVP tracks. I even used to work with [one of the them](https://mvp.support.microsoft.com/communities/mvp.aspx?name=andrew+dugdell), who was awarded MVP in virtual machines well before VMware created the vExpert award.

There are plenty of Microsoft virtualisation focused blogs and user groups too – a little [confirmation bias](http://en.wikipedia.org/wiki/Confirmation_bias) will impact your perception of who has built the better community. Although, I did go to the [London VMware User Group](http://communities.vmware.com/community/vmug/forums/emea/london) recently and it was top notch.

### Make SCVMM Free

David writes:

> Microsoft&#8217;s System Center Virtual Machine Manager (SCVMM) is their centralized virtualization management solution. Microsoft already gives away Hyper-V standalone and VMware&#8217;s vCenter is already much more expensive. SCVMM is only $505 or $869, depending on how many Hyper-V servers you have.
> 
> So why should MS give away SCVMM? Because they can and VMware isn&#8217;t. By giving away SCVMM, it just makes Hyper-V look that much more appealing (something Microsoft desperately needs to do). Microsoft doesn&#8217;t need the extra $500 per SCVMM license. They need market share. Even if they only gave away the workgroup edition (limited to managing 5 Hyper-V servers), they are still providing a totally free virtualization platform &#8211; including centralized management (required for a number of Hyper-V features) &#8211; and that is something that no other virtualization vendor is doing.

This would be great, but with the hypervisor becoming a commodity, Microsoft along with VMware understand that the money is in management. I think Microsoft should keep delivering features into SCVMM and keep the price low.

### Conclusion

Microsoft certainly has some work to do to catch up with VMware, but there are echoes of Microsoft vs. Novell in the mid to late 90’s and we know how that turned out. That’s not to say that VMware will lose to Microsoft, but clearly Microsoft doesn’t need a superior product to beat the competition. (I remember replacing plenty of NetWare 4.1 implementations with Windows NT 4 for Queensland Education back in the day even when NetWare was the better solution).

David, I enjoy reading your articles, but I think this one needs to go back to the drawing board.