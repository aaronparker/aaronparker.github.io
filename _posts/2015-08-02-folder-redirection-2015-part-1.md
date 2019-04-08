---
id: 4014
title: 'I&#8217;ve Got 99 Problems and Folder Redirection is Every One of Them. 2015 Testing Results. Part 1.'
date: 2015-08-02T00:44:06+10:00
author: Aaron Parker
layout: post
guid: http://stealthpuppy.com/?p=4014
permalink: /folder-redirection-2015-part-1/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "3993251532"
image: /wp-content/uploads/2015/07/IveGot99ProblemsAndFolderRedirectionIsEveryOneOfThem.png
categories:
  - Microsoft
tags:
  - Folder Redirection
  - Performance
  - SMB
---
This is a multi-part article detailing our testing results and presentations for the 2015 series on Folder Redirection:

  * I&#8217;ve Got 99 Problems and Folder Redirection is Every One of Them. 2015 Testing Results. Part 1. (this article)
  * [I&#8217;ve Got 99 Problems and Folder Redirection is Every One of Them. 2015 Testing Results. Part 2](http://stealthpuppy.com/folder-redirection-2015-part-2/).
  * [I&#8217;ve Got 99 Problems and Folder Redirection is Every One of Them. 2015 Testing Results. Part 3](http://stealthpuppy.com/folder-redirection-2015-part-3/).

Last year, [Helge Klein](http://twitter.com/helgeklein), [Shawn Bass](http://twitter.com/shawnbass) and myself presented the results of around of testing on Folder Redirection at events such as Citrix Synergy and BriForum and via [a series of blog posts](https://helgeklein.com/blog/2014/10/folder-redirection-impacts-ux-breaks-applications/). This year, we again delved into various testing scenarios, presented to well attended sessions and this blog post summarises our 2015 results.

# Why Folder Redirection?

Why does Folder Redirection continue to a topic of discussion? With the release of Windows 10, Folder Redirection will continue to remain a component of the enterprise desktop, as the basic architecture in Windows that requires it, has not changed. A Windows profile still contains user folders such as Documents, Desktop, etc. that need to be protected. Additionally the basic structure of the profile has not changed.

From our perspective, we&#8217;re interested in providing our audience with an overview of the pitfalls and challenges involved in implementing folder redirection, providing tips and tricks for managing folder redirection performance effectively and putting forward some potential alternatives.

Just as we continue to discuss printing in VDI and SBC environments because users still print, so to shall the discussion around folder redirection continue.

Folder redirection remains a popular method of user data and profile management because it can improve the user experience by achieving two things:

  1. Faster logons &#8211; redirecting AppData out of the profile reduces the amount of data required to be copied locally at user logon
  2. Abstracting user data &#8211; moving user data out of the profile to a home folder ensures data is available on any desktop and allows IT to protect that data

However, by implementing folder redirection, we&#8217;ve moved data that applications constantly interact with from the local machine to a shared resource. This means that good user experience now requires your storage back-end and network to be responsive and highly available.

Those shared resources (network, storage, hypervisor, CPU etc.) contend for resources, especially in today&#8217;s data centre with traditional shared storage and with most applications and file services on a virtualized platform. This is what has driven us to to do this testing and present the results to the community &#8211; many organisations don&#8217;t consider the ramifications of implementing folder redirection. Performance on day 1 may be good, but as an environment grows organically and resources become further contended, user experience suffers.

# 2015 Testing Focus

This year, we focussed our testing on several areas:

  1. Comparing SMB 2.1 with SMB 3.02 &#8211; last year we tested primarily with Windows 7 as the client. In this round we&#8217;ve used Windows 8.1 as the client to see whether SMB 3.02 provides any improvements over SMB 2.1
  2. IO performance &#8211; does SMB 3.02 improve raw IO performance and throughput over SMB 2.1?
  3. Workload simulations &#8211; we&#8217;ve used the File Server Capacity Toolkit to model how users work with home folders to demonstrate the performance profiles of various scenarios and show you how you can do performance modelling for your file servers
  4. Folder redirection alternatives &#8211; newer file sync and share solutions that have been popular of the past several years may make interesting alternatives to folder redirection. I&#8217;ve [written about one of these previously](http://stealthpuppy.com/folder-redirection-offline-files-appsense-datanow-35/) and we have covered several more alternatives. I&#8217;ll cover some additional alternatives in seperate articles.

All of our testing this year was performed with Windows 8.1 or Windows Server 2012 R2 on the client end, with Windows Server 2008 R2 or Windows Server 2012 R2 on the server end.

Utilising a specific version of SMB requires that both the client and server are capable of speaking that particular version of the protocol. If you want to read a thorough explanation of SMB versions and how they are negotiated, this article is recommended reading &#8211; [Windows Server 2012 R2: Which version of the SMB protocol (SMB 1.0, SMB 2.0, SMB 2.1, SMB 3.0 or SMB 3.02) are you using?](http://stealthpuppy.com/folder-redirection-offline-files-appsense-datanow-35/).

I&#8217;ve already covered the tools that we&#8217;ve used in our testing in this blog post &#8211; [Replicating Our 2015 Folder Redirection Performance Tests In Your Own Lab](http://stealthpuppy.com/replicate-2015-folder-redirection-test/).

In my own lab, all of the testing was done on the following hardware and software:

  * Core i5, 1 x SSD, Hyper-V 2012 R2
  * Core i7, 3 x SSD, Hyper-V 2012 R2
  * 1 GbE physical network
  * All compute and storage resources were uncontested (i.e. no other workloads were running)

# SMB 2.1 vs. SMB 3.02 IO and Throughput Performance

To determine any difference in throughput performance between SMB 2.1 and SMB 3.02, we&#8217;ve used the [DiskSpd](http://blogs.technet.com/b/josebda/archive/2014/10/13/diskspd-powershell-and-storage-performance-measuring-iops-throughput-and-latency-for-both-local-disks-and-smb-file-shares.aspx) tool from Microsoft. With this tool, I performed tests from the client at various block sizes using a 256MB file hosted on an SMB share on the server. This was repeated for servers running Windows Server 2008 R2 and Windows Server 2012 R2.

In essence, we there are no performance differences between the two SMB versions:

<figure id="attachment_4018" aria-describedby="caption-attachment-4018" style="width: 1823px" class="wp-caption alignnone">[<img class="size-full wp-image-4018" src="http://stealthpuppy.com/wp-content/uploads/2015/08/NetworkThroughput.png" alt="No Difference in Network Throughput between SMB 2.1 and SMB 3.02" width="1823" height="914" srcset="http://192.168.0.89/wp-content/uploads/2015/08/NetworkThroughput.png 1823w, http://192.168.0.89/wp-content/uploads/2015/08/NetworkThroughput-150x75.png 150w, http://192.168.0.89/wp-content/uploads/2015/08/NetworkThroughput-300x150.png 300w, http://192.168.0.89/wp-content/uploads/2015/08/NetworkThroughput-1024x513.png 1024w" sizes="(max-width: 1823px) 100vw, 1823px" />](http://stealthpuppy.com/wp-content/uploads/2015/08/NetworkThroughput.png)<figcaption id="caption-attachment-4018" class="wp-caption-text">No difference in network throughput between SMB 2.1 and SMB 3.02</figcaption></figure>

In the above test, the underlying hypervisor host was set to high performance mode, so I re-ran the same tests with the host set to balanced performance. This had an interesting result:

<figure id="attachment_4020" aria-describedby="caption-attachment-4020" style="width: 1823px" class="wp-caption alignnone">[<img class="size-full wp-image-4020" src="http://stealthpuppy.com/wp-content/uploads/2015/08/4K8Kblocks-powerprofile.png" alt="Power profile of the hypervisor host impacts 4K/8K block performance" width="1823" height="914" srcset="http://192.168.0.89/wp-content/uploads/2015/08/4K8Kblocks-powerprofile.png 1823w, http://192.168.0.89/wp-content/uploads/2015/08/4K8Kblocks-powerprofile-150x75.png 150w, http://192.168.0.89/wp-content/uploads/2015/08/4K8Kblocks-powerprofile-300x150.png 300w, http://192.168.0.89/wp-content/uploads/2015/08/4K8Kblocks-powerprofile-1024x513.png 1024w" sizes="(max-width: 1823px) 100vw, 1823px" />](http://stealthpuppy.com/wp-content/uploads/2015/08/4K8Kblocks-powerprofile.png)<figcaption id="caption-attachment-4020" class="wp-caption-text">Power profile of the hypervisor host impacts 4K/8K block performance</figcaption></figure>

The throughput performance at 4K and 8K block sizes dropped off when compared to high performance mode. This makes sense when you consider that transferring a file at smaller block sizes requires more transactions between the client and server, so the server must process more. With less CPU resources available, performance suffers.

Interestingly, it appears that SMB 2.1 read performance may suffer in the configuration more than SMB 3.02. Keep this in mind when we show results of some workloads tests and result with SMB 3.02, in part 2.

Nimble Storage has [a great blog post that shows that across various workloads, the majority of block sizes are below 16K in size](http://www.nimblestorage.com/blog/technology/storage-performance-benchmarks-are-useful-if-you-read-them-carefully/). If this is the case for user home drives and user profiles, then there should be a performance gain by setting the hypervisor host (or even the physical file server host) to high-performance mode.

Another tool was used ([i/o performance tool](http://sourceforge.net/projects/io-performance/)) to measure file copies from server to client. This showed very little overall performance difference between the two protocols but for whatever reason those file copies with SMB 3.02 on average were slightly longer than SMB 2.01.

<figure id="attachment_4023" aria-describedby="caption-attachment-4023" style="width: 912px" class="wp-caption alignnone">[<img class="size-full wp-image-4023" src="http://stealthpuppy.com/wp-content/uploads/2015/08/IOperformance2.png" alt="Choppier performance with SMB 3.02" width="912" height="461" srcset="http://192.168.0.89/wp-content/uploads/2015/08/IOperformance2.png 912w, http://192.168.0.89/wp-content/uploads/2015/08/IOperformance2-150x76.png 150w, http://192.168.0.89/wp-content/uploads/2015/08/IOperformance2-300x152.png 300w" sizes="(max-width: 912px) 100vw, 912px" />](http://stealthpuppy.com/wp-content/uploads/2015/08/IOperformance2.png)<figcaption id="caption-attachment-4023" class="wp-caption-text">Choppier performance with SMB 3.02</figcaption></figure>

Any difference between the two protocols wasn&#8217;t shown in our user logon tests &#8211; a practical measure of any performance difference.

# SMB 2.1 vs. 3.02 Logon Times

To test logon times, we configured what we consider to be an enormous user profile and test environment with the following details:

  * User profile &#8211; the same profile was used across client and server tests: 
      * 151 Mb
      * 18,460 file
      * 2,206 folders (while the profile file size is not huge, the number of files has a significant impact on logon times)
  * No folder redirection
  * Idle CPU on the file server/s
  * No locally cached copy of the profile at each logon

The logon process was repeated across both Windows Server 2008 R2 and Windows Server 2012 R2 as the client and server, to test with hosts only capable of SMB 2.1 and clients and servers capable of both SMB 2.1 and SMB 3.02.

<figure id="attachment_4024" aria-describedby="caption-attachment-4024" style="width: 912px" class="wp-caption alignnone">[<img class="size-full wp-image-4024" src="http://stealthpuppy.com/wp-content/uploads/2015/08/LogonTimes.png" alt="No difference in logon times." width="912" height="457" srcset="http://192.168.0.89/wp-content/uploads/2015/08/LogonTimes.png 912w, http://192.168.0.89/wp-content/uploads/2015/08/LogonTimes-150x75.png 150w, http://192.168.0.89/wp-content/uploads/2015/08/LogonTimes-300x150.png 300w" sizes="(max-width: 912px) 100vw, 912px" />](http://stealthpuppy.com/wp-content/uploads/2015/08/LogonTimes.png)<figcaption id="caption-attachment-4024" class="wp-caption-text">No difference in logon times.</figcaption></figure>

In short, there are no differences in logon times between the two protocol versions.

# Part 2

In part 2, I&#8217;ll cover [the results of the File Server Capacity Tool tests](http://stealthpuppy.com/folder-redirection-2015-part-2).

#