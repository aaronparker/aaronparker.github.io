---
id: 3946
title: Replicating Our 2015 Folder Redirection Performance Tests In Your Own Lab
date: 2015-05-15T01:52:35+10:00
author: Aaron Parker
layout: post
guid: http://stealthpuppy.com/?p=3946
permalink: /replicate-2015-folder-redirection-test/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "3763702636"
image: /wp-content/uploads/2015/05/test_boxes.jpg
categories:
  - Microsoft
tags:
  - Folder Redirection
---
[Helge](https://twitter.com/helgeklein), [Shawn](https://twitter.com/shawnbass) and myself had a great session this week at Citrix Synergy with our session [SYN502: I’ve got 99 problems, and folder redirection is every one of them](https://citrix.g2planet.com/synergyorlando2015/public_session_view.php?agenda_session_id=185).

<img class="alignnone size-full wp-image-3955" src="http://stealthpuppy.com/wp-content/uploads/2015/05/IMG_2073.jpg" alt="IMG_2073" width="816" height="370" srcset="http://192.168.0.89/wp-content/uploads/2015/05/IMG_2073.jpg 816w, http://192.168.0.89/wp-content/uploads/2015/05/IMG_2073-150x68.jpg 150w, http://192.168.0.89/wp-content/uploads/2015/05/IMG_2073-300x136.jpg 300w" sizes="(max-width: 816px) 100vw, 816px" /> 

We covered quite a number of test scenarios, so in this article, I want to share the approaches that we used for our tests, so that you can replicate them in your own environments.

# Test Environment

In my lab, I&#8217;ve used Windows Server 2012 R2 Hyper-V; however the hypervisor isn&#8217;t really that important, as long as you&#8217;re performing all of your tests on the same hypervisor.

The virtual machine configuration used for the file server VMs, were configured with 2 vCPUs and 4 GB of RAM. I typically use Dynamic Memory on Hyper-V; however for these tests a fixed RAM sizing was used to ensure that as RAM demand in the VM changed, that performance metrics are not adversely affected.

Client virtual machines were also configured with 2 vCPUs but with Dynamic Memory.

This year, we have concentrated on testing SMB 3.02 as the primary version of SMB. We have used Windows 8.1 on the client side and Windows Server 2012 R2 and Windows Server 2008 R2 on the server side &#8211; so because Windows 8.1 and Windows Server 2012 R2 are SMB 3.02 aware, they will negotiate that version. When Windows 8.1 opens a connection to Windows Server 2008 R2, an SMB 2.1 connection is made.

All virtual machines were deployed with the latest updates as at May 2015.

# Throughput Tests with DiskSpd

To test the throughput capabilities of SMB 3.02 and SMB 2.1, I&#8217;ve used the [DiskSpd 2.0.15 utility available from Microsoft](http://aka.ms/DiskSpd).

> DiskSpd is a storage load generator / performance test tool from the Windows/Windows Server and Cloud Server Infrastructure Engineering teams.

You can liken DiskSpd to [Iometer](http://www.iometer.org); like Iometer, I can use DiskSpad to test various IO workload simulations by selecting block sizes and read/write  however with DiskSpd I can specify a file path as the test target, including UNC paths.

Rather than cover complete details in this post on how DiskSpd works, I instead recommend reading this post by Jose Barreto: [DiskSpd, PowerShell and storage performance: measuring IOPs, throughput and latency for both local disks and SMB file shares](http://blogs.technet.com/b/josebda/archive/2014/10/13/diskspd-powershell-and-storage-performance-measuring-iops-throughput-and-latency-for-both-local-disks-and-smb-file-shares.aspx).

One very useful part from that article that I will replicate here is the parameters table for DiskSpd. With this table, I was able to create the specific tests that were useful for me to determine the throughput performance for both SMB 2.1 and SMB 3.02.

[table id=36 /]

For the DiskSpd tests that I ran in my environment, I ran DiskSpd against a 256Mb file for 120 seconds with various block sizes with separate tests for read and write (i.e. I ran 100% read or 100% write). Here&#8217;s two sample commands for running 4K block sizes and using read or write tests:

<pre class="lang:ps decode:true" title="DiskSpd running with a 256Mb for 120 seconds, 4K blocks, 100% read">diskspd.exe -c256M -d120 -si -w0 -t2 -o8 -b4K -h -L \\mb-win81\diskspd\testfile.dat</pre>

<pre class="lang:ps decode:true" title="DiskSpd running with a 256Mb for 120 seconds, 4K blocks, 100% write">diskspd.exe -c256M -d120 -si -w100 -t2 -o8 -b4K -h -L \\mb-win81\diskspd\testfile.dat</pre>

Each of these tests uses 2 threads (1 per vCPU) and then from the output I&#8217;ve used the total MB/s seen from both threads as the result.

# File Server Capacity Tool

To appropriate some type of folder redirection tests, I used the File Server Capacity Tool &#8211; this was about the best tool that I could find that could simulate home folder access (if you know of another, please let me know).

I won&#8217;t go into detail on how to use FSCT, instead I recommend reading this article by Mark Morowczynski &#8211; [How to use the File Server Capacity Tool (FSCT) on Server 2012 R2](http://blogs.technet.com/b/askpfeplat/archive/2014/04/28/how-to-use-the-file-server-capacity-tool-fsct-on-server-2012-r2.aspx).

The File Server Capacity Tool binaries are available from the following links:

  * [File Server Capacity Tool v1.2- (64 bit)](https://www.microsoft.com/en-us/download/details.aspx?id=27284)
  * [File Server Capacity Tool v1.2 &#8211; (32 bit)](https://www.microsoft.com/en-us/download/details.aspx?id=27283)

In my lab environment, I&#8217;ve used two physical hosts with the file server targets on one host (to ensure no resource contention) and the controller and clients on a separate host. The two hosts are connected via a 1GB switch.

Other than specific tests where we wanted to know the effect of anti-virus on the file server, no AV application was installed on any server or client (physical or virtual).

<figure id="attachment_3953" aria-describedby="caption-attachment-3953" style="width: 565px" class="wp-caption alignnone"><img class="wp-image-3953 size-full" src="http://stealthpuppy.com/wp-content/uploads/2015/05/FSCT.png" alt="File Server Capacity Tool" width="565" height="399" srcset="http://192.168.0.89/wp-content/uploads/2015/05/FSCT.png 565w, http://192.168.0.89/wp-content/uploads/2015/05/FSCT-150x106.png 150w, http://192.168.0.89/wp-content/uploads/2015/05/FSCT-300x212.png 300w, http://192.168.0.89/wp-content/uploads/2015/05/FSCT-480x340.png 480w" sizes="(max-width: 565px) 100vw, 565px" /><figcaption id="caption-attachment-3953" class="wp-caption-text">File Server Capacity Tool architecture</figcaption></figure>

FSCT comes with a single work load &#8211; Home Folders. Which is fortunately great for our use, should be as similar as possible to real work use of users interacting with their Documents or Desktop folders that are redirected to their home drive.

<figure id="attachment_3957" aria-describedby="caption-attachment-3957" style="width: 1394px" class="wp-caption alignnone">[<img class="wp-image-3957 size-full" src="http://stealthpuppy.com/wp-content/uploads/2015/05/fsct-workload.png" alt="File Server Capacity Tool - Home Folders Workload" width="1394" height="711" srcset="http://192.168.0.89/wp-content/uploads/2015/05/fsct-workload.png 1394w, http://192.168.0.89/wp-content/uploads/2015/05/fsct-workload-150x77.png 150w, http://192.168.0.89/wp-content/uploads/2015/05/fsct-workload-300x153.png 300w, http://192.168.0.89/wp-content/uploads/2015/05/fsct-workload-1024x522.png 1024w" sizes="(max-width: 1394px) 100vw, 1394px" />](http://stealthpuppy.com/wp-content/uploads/2015/05/fsct-workload.png)<figcaption id="caption-attachment-3957" class="wp-caption-text">File Server Capacity Tool &#8211; Home Folders Workload</figcaption></figure>

A single run of an FSCT workload simulation can take a very long time, so expect each simulation to run from 3 hours or more depending on the total number of user sessions that you want to get to. In each workload simulation, I ran from 50 to 800 user sessions, stepping by 50 user sessions for each test.

Here&#8217;s what a workload simulation looks like:

<figure id="attachment_3959" aria-describedby="caption-attachment-3959" style="width: 1197px" class="wp-caption alignnone">[<img class="size-full wp-image-3959" src="http://stealthpuppy.com/wp-content/uploads/2015/05/fsct.png" alt="How File Server Capacity Tool workload simulations are run" width="1197" height="278" srcset="http://192.168.0.89/wp-content/uploads/2015/05/fsct.png 1197w, http://192.168.0.89/wp-content/uploads/2015/05/fsct-150x35.png 150w, http://192.168.0.89/wp-content/uploads/2015/05/fsct-300x70.png 300w, http://192.168.0.89/wp-content/uploads/2015/05/fsct-1024x238.png 1024w" sizes="(max-width: 1197px) 100vw, 1197px" />](http://stealthpuppy.com/wp-content/uploads/2015/05/fsct.png)<figcaption id="caption-attachment-3959" class="wp-caption-text">How File Server Capacity Tool workload simulations are run</figcaption></figure>

To demonstrate an example, here&#8217;s an overview of the environment and the FSCT commands that I used to run the workloads for each test.

  * **File Server**: FILE3 (192.168.0.79, Windows Server 2012 R2)
  * **Controller**: CNTRLR (Windows 8.1)
  * **Clients**: CLIENT1, CLIENT2, CLIENT3, CLIENT4 (Windows 8.1; each client ran up to 200 concurrent sessions)

The basic steps for running FSCT were as follows:

  1. Prepare the Domain Controller (create the user accounts used by FSCT)
  2. Prepare File Server (create the file data used by the workload. This required ~65GB for 800 users and ~92GB by the time the tests completed. Create a dedicated partition or disk for hosting the data)
  3. Prepare Controller
  4. Prepare Client
  5. Run Client
  6. Run Controller

So the commands I used for my environment (run on the various VMs used in the test) were:

<pre class="lang:ps decode:true" title="Create 800 users accounts (200 user accounts per client, with 4 clients)">fsct prepare dc /users 200 /clients CLIENT1,CLIENT2,CLIENT3,CLIENT4 /password Passw0rd</pre>

<pre class="lang:ps decode:true " title="Prepare the file server - create user data on the E: partition, using the HomeFolders workload">fsct prepare server /clients CLIENT1,CLIENT2,CLIENT3,CLIENT4 /password Passw0rd /users 200 /domain home.stealthpuppy.com /volumes E: /workload HomeFolders</pre>

<pre class="lang:ps decode:true " title="Prepare the Controller">fsct prepare controller</pre>

<pre class="lang:ps decode:true " title="Prepare the Client (run per client VM)">fsct prepare client /server fsctserver /password Passw0rd /users 200 /domain home.stealthpuppy.com /server_ip 192.168.0.79</pre>

<pre class="lang:ps decode:true " title="Run the workload on each client (run per client VM)">fsct run client /controller CNTRLR /server fsctserver /password Passw0rd /domain home.stealthpuppy.com</pre>

<pre class="lang:ps decode:true " title="Start the tests (run on the Controller VM)">fsct run controller /server FILE3 /password Passw0rd /volumes E: /clients CLIENT1,CLIENT2,CLIENT3,CLIENT4 /min_users 50 /max_users 800 /step 50 /duration 720 /workload HomeFolders</pre>

Each command is run on the respective virtual machine &#8211; the FSCT binaries were run from C:\FSCT.

# uberAgent for Splunk

To make it simple to measure logon times, there&#8217;s only one tool worth using to view metrics and that&#8217;s of course [uberAgent for Splunk](https://helgeklein.com/uberagent-for-splunk/). uberAgent makes it simple to report on logon times &#8211; so all you&#8217;ll need to do is setup roaming profiles, log onto a machine with the agent installed and view the Logon Duration report.

I recommend creating a large enough profile, or one that is indicative of profiles that you may have in production. For real stress testing, the number of files in the profile is more important than the total profile size.

<figure id="attachment_3961" aria-describedby="caption-attachment-3961" style="width: 1293px" class="wp-caption alignnone">[<img class="wp-image-3961 size-full" src="http://stealthpuppy.com/wp-content/uploads/2015/05/uberAgent-logon-duration-dashboard.png" alt="uberAgent logon duration dashboard" width="1293" height="629" srcset="http://192.168.0.89/wp-content/uploads/2015/05/uberAgent-logon-duration-dashboard.png 1293w, http://192.168.0.89/wp-content/uploads/2015/05/uberAgent-logon-duration-dashboard-150x73.png 150w, http://192.168.0.89/wp-content/uploads/2015/05/uberAgent-logon-duration-dashboard-300x146.png 300w, http://192.168.0.89/wp-content/uploads/2015/05/uberAgent-logon-duration-dashboard-1024x498.png 1024w" sizes="(max-width: 1293px) 100vw, 1293px" />](http://stealthpuppy.com/wp-content/uploads/2015/05/uberAgent-logon-duration-dashboard.png)<figcaption id="caption-attachment-3961" class="wp-caption-text">Viewing logon times in uberAgent.</figcaption></figure>

If you want to use uberAgent in your lab, I recommend contacting <info@helgeklein.com> for info on whether you qualify for a consultants license.