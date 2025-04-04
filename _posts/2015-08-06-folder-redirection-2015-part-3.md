---
title: "I've Got 99 Problems and Folder Redirection is Every One of Them. 2015 Testing Results. Part 3."
date: 2015-08-06T19:30:36+10:00
author: Aaron Parker
layout: post
permalink: /folder-redirection-2015-part-3/
image: /media/2015/07/IveGot99ProblemsAndFolderRedirectionIsEveryOneOfThem.png
categories:
  - Microsoft
tags:
  - Folder Redirection
  - Performance
  - SMB
---
* this unordered seed list will be replaced by the toc
{:toc}

This is a multi-part article detailing our testing results and presentations for the 2015 series on Folder Redirection:

* [I've Got 99 Problems and Folder Redirection is Every One of Them. 2015 Testing Results. Part 1]({{site.baseurl}}/folder-redirection-2015-part-1/).
* [I've Got 99 Problems and Folder Redirection is Every One of Them. 2015 Testing Results. Part 2]({{site.baseurl}}/folder-redirection-2015-part-2/).
* I've Got 99 Problems and Folder Redirection is Every One of Them. 2015 Testing Results. Part 3. (this article)

## File Access Performance

[Magnar Johnsen](http://twitter.com/magnarjohnsen) detailed an interesting scenario where application performance suffered when [moving a XenApp environment from Windows Server 2008 R2 to Windows Server 2o12 R2](http://j.mp/ini-smb). Magnar documented the results of the changing of OS versions had on application performance - due to the way in which a specific application reads settings from an INI file, a mismatch between the client and server was creating file access performance issues.

To replicate the testing, Helge wrote a small utility that can be used to simulate the file access performance by reading and writing from a file using different methods. The tool, [FileIOTest](https://helgeklein.com/blog/2015/08/fileiotest-times-duration-file-io-operations/) runs 4 different tests:

  1. Write with custom function (creates a file and writes _iteration_ lines individually opening and closing the handle for each line)
  2. ReadPrivateProfileString (calls the GetPrivateProfileString API to read _iteration_ lines individually)
  3. Read with custom function (opens the file once and reads _iteration_ lines individually)
  4. Create/delete loop (creates the file, writes one line, deletes the file. This happens _iteration_ times)

This is useful for testing this scenario and is quite flexible:

* Can be pointed at any UNC path (makes comparing different targets easy)
* All file names generated are unique
* Iteration count was 10,000
* Antivirus off on client & server (otherwise you measure AV not SMB performance)

This testing showed that file IO performance is generally not significantly impacted by client and server SMB versions. As long as both are capable of SMB 2.x or better performance is stable. The chart below details the results across 4 scenarios:

* Both client and server capable of using (and having negotiated) SMB 3.02
* The client capable of using SMB 3.02 (Windows 8.1), but the server only capable of SMB 2.1 (Windows Server 2008 R2)
* The client only capable of using SMB 2.1 (Windows Server 2008 R2), but the server able to use SMB 3.02 (Windows Server 2012 R2)
* The client and server only able to use SMB 2.1 (both Windows Server 2008 R2)

The exception here is the API function GetPrivateProfileString() which performs significantly better when called on a client using SMB 2.1, targeting a server capable of SMB 3.02. SMB improvements in Windows Server 2012 R2 have actually benefited older clients, but seem to have had the reverse effect on more recent versions of Windows.

While all VMs in our environments are patched via Windows Update, we did not get a chance to re-run the tests with all of the currently [available hotfixes for file services](https://support.microsoft.com/en-us/kb/2899011).

![SMB Versions Have Little Impact on IO Performance]({{site.baseurl}}/media/2015/08/FileIOTests.png)

SMB Versions Have Little Impact on IO Performance
{:.figcaption}

If you're redirecting AppData, you'll need to understand how your applications are interacting with files in the user profile. If they use this method (which is very common), performance could suffer as a result if you aren't matching your client and server versions of Windows.

One additional behaviour that we noticed, contrary to Magnar's article, is that the negotiation between client and server only happens once, rather than for each file IO access. This can be shown by capturing traffic between client and server with a Wireshark trace. The screenshot below shows the protocol negotiation and then several read requests by the client to the server:

![SMB Negotiations Occur only Once Per Session]({{site.baseurl}}/media/2015/08/GetPrivateProfileString.png)

SMB Negotiations Occur only Once Per Session
{:.figcaption}

## Recommendations

Folder redirection is a feature that most environments will not be able to avoid. The various reasons including abstracting data or specific architecture choices for virtual or physical desktops, means that folder redirection will remain an integral part of the enterprise desktop. While there are a number of 3rd party alternatives and approaches, I may cover those in seperate articles.

To that end, here are our recommendations for getting the best out of folder redirection. In no particular order:

* **Simulate client load to determine file server breaking point** - the [File Server Capacity Tool]({{site.baseurl}}/replicate-2015-folder-redirection-test/) is, so far, the best solution I've seen for simulating user access to home folders. This is a useful tool for determining the expected load on your file server/s and working out the number of servers required to support your environment.
* **Multiple vCPUs in file servers** - file servers will require multiple CPUs to provide good performance. Servicing multiple simultaneous connections will require more than a single CPU - start with 2 and scale up as required.
* **Size for peaks** - just like we do with VDI workloads, size for your expected peaks to ensure continued good user experience as your environment becomes busy.
* **Hypervisor resource sharing, watch overcommit** - resource contention at multiple levels including storage and compute will impact how well file servers can response to requests.
* **Scale out** - Scaling out across multiple physical hosts and making sure you don't over commit compute resources will ensure file servers remain responsive. Scaling out may require solutions such as [DFS](https://technet.microsoft.com/en-us/library/dn281957.aspx) and even third party solutions such as Citrix Melio might be worth investigating.
* **High performance mode** - put hypervisor hosts in high performance mode to ensure good response for 4K and 8K blocks. You can schedule placing hosts into low performance mode after hours if power consumption is of concern.
* **Expect performance impacts of anti-virus** - there are very few environments that can do without anti-virus and the performance impact is very high as we've shown. Test various anti-virus solutions to find the best performing product if you can; however expect that AV will contribute to high CPU.
* **Update Windows versions, especially on servers** - best results might be gained from matching client and server, but we have shown that SMB 3+ reduces the CPU load on the file server.
* **Update client and servers** - keep clients and servers updated with the latest service packs and available hotfixes for folder redirection and file services. Here are some knowledgebase articles that are important references:
  * [Current hotfixes for Windows 7 SP1 enterprise clients that have folder redirection enabled](https://support.microsoft.com/en-us/kb/2820927)
  * [List of currently available hotfixes for the File Services technologies in Windows Server 2012 and in Windows Server 2012 R2](https://support.microsoft.com/en-us/kb/2899011)

These are general recommendations for all environments and depending on your own requirements and how you are managing your virtual or physical desktop estate, there may be additional considerations.

We do continue to recommend looking at alternatives to AppData redirection - there are plenty of user environment management / profile management solutions available to you.

### Determining the Version of SMB Negotiated

If you are using Windows 8 and above, PowerShell now includes a cmdlet to determine the version of SMB that is negotiated for each connection - [Get-SmbConnection](https://technet.microsoft.com/en-us/library/jj635713). PowerShell must be elevated, but this will show all connections from the local client.

![Use PowerShell to View SMB Connections]({{site.baseurl}}/media/2015/08/get-smbconnection2.png)

Use PowerShell to View SMB Connections
{:.figcaption}

## Summary

This year, we've covered additional scenarios, and there are always additional tests to cover. Future editions of these presentations will include the impact of folder redirection on Login VSI results and we'll look at whether Windows 10 and Windows Server 2016 improves performance.

To summarise this round, I'll leave you with these key points:

* Little effective performance difference between SMB 2.1 & 3.02; however SMB 3.02 lowers file server CPU utilisation
* Size file servers for peak workload
* Simulate workloads using FSCT
* Anti-virus has a big impact
* Don’t overcommit resources

Want good user experience for your users with folder redirection enabled? You'll need to put in the effort to determine the optimal configuration in your environment.
