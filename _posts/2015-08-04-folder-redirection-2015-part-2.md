---
id: 4035
title: 'I've Got 99 Problems and Folder Redirection is Every One of Them. 2015 Testing Results. Part 2.'
date: 2015-08-04T19:30:41+10:00
author: Aaron Parker
layout: post
guid: http://stealthpuppy.com/?p=4035
permalink: /folder-redirection-2015-part-2/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "3993277420"
image: /wp-content/uploads/2015/07/IveGot99ProblemsAndFolderRedirectionIsEveryOneOfThem.png
categories:
  - Microsoft
tags:
  - Folder Redirection
  - Performance
  - SMB
---
This is a multi-part article detailing our testing results and presentations for the 2015 series on Folder Redirection:

  * [I've Got 99 Problems and Folder Redirection is Every One of Them. 2015 Testing Results. Part 1](http://stealthpuppy.com/folder-redirection-2015-part-1/).
  * I've Got 99 Problems and Folder Redirection is Every One of Them. 2015 Testing Results. Part 2. (this article)
  * [I've Got 99 Problems and Folder Redirection is Every One of Them. 2015 Testing Results. Part 3](http://stealthpuppy.com/folder-redirection-2015-part-3/).

# File Server Capacity Tool

The File Server Capacity Tool (FSCT) is great for modelling a user home drive hosted on Windows file servers. I've covered [how to use the FSCT previously](http://stealthpuppy.com/replicate-2015-folder-redirection-test/), and the results of our tests have included various scenarios looking at CPU and disk performance.

## File Server Capacity Tool CPU Performance

In this test with Windows Server 2008 R2 running on the file server, SMB 2.1 shows quite a large difference between the average and maximum CPU seen across each test, especially from 400 users and beyond.

<figure id="attachment_4025" aria-describedby="caption-attachment-4025" style="width: 912px" class="wp-caption alignnone">[<img class="size-full wp-image-4025" src="http://stealthpuppy.com/wp-content/uploads/2015/08/FSCT-SMB21-CPU.png" alt="SMB 2.1 showed a big difference between the average and maximum CPU seen across each test." width="912" height="461" srcset="https://stealthpuppy.com/wp-content/uploads/2015/08/FSCT-SMB21-CPU.png 912w, https://stealthpuppy.com/wp-content/uploads/2015/08/FSCT-SMB21-CPU-150x76.png 150w, https://stealthpuppy.com/wp-content/uploads/2015/08/FSCT-SMB21-CPU-300x152.png 300w" sizes="(max-width: 912px) 100vw, 912px" />](http://stealthpuppy.com/wp-content/uploads/2015/08/FSCT-SMB21-CPU.png)<figcaption id="caption-attachment-4025" class="wp-caption-text">SMB 2.1 showed a big difference between the average and maximum CPU seen across each test.</figcaption></figure>

The results from the tests with Windows Server 2012 R2 on the file server shows very similar average CPU, but a greatly reduced maximum CPU, which is great for overall file server resource consumption.

<figure id="attachment_4026" aria-describedby="caption-attachment-4026" style="width: 912px" class="wp-caption alignnone">[<img class="size-full wp-image-4026" src="http://stealthpuppy.com/wp-content/uploads/2015/08/FSCT-SMB3-CPU.png" alt="Lower CPU Utilization with SMB 3.02" width="912" height="461" srcset="https://stealthpuppy.com/wp-content/uploads/2015/08/FSCT-SMB3-CPU.png 912w, https://stealthpuppy.com/wp-content/uploads/2015/08/FSCT-SMB3-CPU-150x76.png 150w, https://stealthpuppy.com/wp-content/uploads/2015/08/FSCT-SMB3-CPU-300x152.png 300w" sizes="(max-width: 912px) 100vw, 912px" />](http://stealthpuppy.com/wp-content/uploads/2015/08/FSCT-SMB3-CPU.png)<figcaption id="caption-attachment-4026" class="wp-caption-text">Lower CPU Utilization with SMB 3.02</figcaption></figure>

## Looking at the Impact of Anti-Virus

Running the same test with Windows Server 2012 R2, but this time with one of the major anti-virus products installed on the file server. This was installed with all of the default settings. This test shows a very interesting result when compared against the previous test - the chart below displays the same results as the previous test with the results from a testing run with AV:

<figure id="attachment_4027" aria-describedby="caption-attachment-4027" style="width: 912px" class="wp-caption alignnone">[<img class="size-full wp-image-4027" src="http://stealthpuppy.com/wp-content/uploads/2015/08/FSCT-SMB3-CPUwithAV.png" alt="Anti-Virus Has a Large Impact on CPU" width="912" height="461" srcset="https://stealthpuppy.com/wp-content/uploads/2015/08/FSCT-SMB3-CPUwithAV.png 912w, https://stealthpuppy.com/wp-content/uploads/2015/08/FSCT-SMB3-CPUwithAV-150x76.png 150w, https://stealthpuppy.com/wp-content/uploads/2015/08/FSCT-SMB3-CPUwithAV-300x152.png 300w" sizes="(max-width: 912px) 100vw, 912px" />](http://stealthpuppy.com/wp-content/uploads/2015/08/FSCT-SMB3-CPUwithAV.png)<figcaption id="caption-attachment-4027" class="wp-caption-text">Anti-Virus Has a Large Impact on CPU</figcaption></figure>

With anti-virus installed, the average CPU is now getting up around the maximum CPU seen without AV, especially from 600 users and beyond. Look at that maximum CPU recorded with anti-virus, that's a massive difference from the previous test and will have a large impact on the file server!

To see if we could improve on this result, we re-ran the test with on-access scans disabled in the anti-virus configuration. This had little impact on the result, which could be explained by the FSCT workload being very write heavy.

<figure id="attachment_4029" aria-describedby="caption-attachment-4029" style="width: 912px" class="wp-caption alignnone">[<img class="size-full wp-image-4029" src="http://stealthpuppy.com/wp-content/uploads/2015/08/OnAccessScans.png" alt="Disabling On Access Scans for AV Had Little Impact" width="912" height="461" srcset="https://stealthpuppy.com/wp-content/uploads/2015/08/OnAccessScans.png 912w, https://stealthpuppy.com/wp-content/uploads/2015/08/OnAccessScans-150x76.png 150w, https://stealthpuppy.com/wp-content/uploads/2015/08/OnAccessScans-300x152.png 300w" sizes="(max-width: 912px) 100vw, 912px" />](http://stealthpuppy.com/wp-content/uploads/2015/08/OnAccessScans.png)<figcaption id="caption-attachment-4029" class="wp-caption-text">Disabling On Access Scans for AV Had Little Impact</figcaption></figure>

There might be additional tweaking that may improve performance; however given the massive difference between with and without AV, I'm not confident that any considerable gains could be made. We haven't yet had a chance to test with multiple anti-virus products.

## File Server Capacity Tool Disk Performance

The FSCT workloads show some interesting results in regards to disk performance. First up is a correlation between high IO and high CPU - the more blocks generated on the storage (i.e. more blocks that are read or written from and to the file server, requires the file server to process it).

In the result below, we can see that when the IO peaks at near 2500 IOPS, the CPU makes a big jump as well:

<figure id="attachment_4030" aria-describedby="caption-attachment-4030" style="width: 912px" class="wp-caption alignnone">[<img class="size-full wp-image-4030" src="http://stealthpuppy.com/wp-content/uploads/2015/08/DiskIO-CorrelateCPU.png" alt="CPU Peaks Correlate With IO Peaks" width="912" height="461" srcset="https://stealthpuppy.com/wp-content/uploads/2015/08/DiskIO-CorrelateCPU.png 912w, https://stealthpuppy.com/wp-content/uploads/2015/08/DiskIO-CorrelateCPU-150x76.png 150w, https://stealthpuppy.com/wp-content/uploads/2015/08/DiskIO-CorrelateCPU-300x152.png 300w" sizes="(max-width: 912px) 100vw, 912px" />](http://stealthpuppy.com/wp-content/uploads/2015/08/DiskIO-CorrelateCPU.png)<figcaption id="caption-attachment-4030" class="wp-caption-text">CPU Peaks Correlate With IO Peaks</figcaption></figure>

While all of the previous FSCT tests have been performed on SSDs, we also looked at comparing performance when running FSCT workloads on HDDs and comparing that against SSDs.

When comparing the CPU load of the same workload running on HDD and SSDs, the average CPU is higher on HDDs.

<figure id="attachment_4031" aria-describedby="caption-attachment-4031" style="width: 912px" class="wp-caption alignnone">[<img class="size-full wp-image-4031" src="http://stealthpuppy.com/wp-content/uploads/2015/08/FSCT-HDDs.png" alt="Higher CPU with HDDs" width="912" height="461" srcset="https://stealthpuppy.com/wp-content/uploads/2015/08/FSCT-HDDs.png 912w, https://stealthpuppy.com/wp-content/uploads/2015/08/FSCT-HDDs-150x76.png 150w, https://stealthpuppy.com/wp-content/uploads/2015/08/FSCT-HDDs-300x152.png 300w" sizes="(max-width: 912px) 100vw, 912px" />](http://stealthpuppy.com/wp-content/uploads/2015/08/FSCT-HDDs.png)<figcaption id="caption-attachment-4031" class="wp-caption-text">Higher CPU with HDDs</figcaption></figure>

This higher CPU on HDDs is, in part, explained by the higher disk queue length seen with HDDs. The chart below shows the results of these tests with the disk queue length on HDDs significantly higher as the number of users in the tests increases.

<figure id="attachment_4032" aria-describedby="caption-attachment-4032" style="width: 912px" class="wp-caption alignnone">[<img class="size-full wp-image-4032" src="http://stealthpuppy.com/wp-content/uploads/2015/08/FSCT-SSDs.png" alt="Higher Avg. Disk Queue Length with HDDs" width="912" height="461" srcset="https://stealthpuppy.com/wp-content/uploads/2015/08/FSCT-SSDs.png 912w, https://stealthpuppy.com/wp-content/uploads/2015/08/FSCT-SSDs-150x76.png 150w, https://stealthpuppy.com/wp-content/uploads/2015/08/FSCT-SSDs-300x152.png 300w" sizes="(max-width: 912px) 100vw, 912px" />](http://stealthpuppy.com/wp-content/uploads/2015/08/FSCT-SSDs.png)<figcaption id="caption-attachment-4032" class="wp-caption-text">Higher Avg. Disk Queue Length with HDDs</figcaption></figure>

It's clear then that any [high performing storage platform](http://www.atlantiscomputing.com/hyperscale) will not only improve storage performance, it will reduce the load on your compute, providing improved user experience across multiple layers of your infrastructure.

# Part 3

In part 3, I'll cover [file access performance and summarise our recommendations](http://stealthpuppy.com/folder-redirection-2015-part-3) for what you should be doing to get the best performance out of folder redirection.