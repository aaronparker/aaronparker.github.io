---
id: 3627
title: Performing vSphere VM RAM Overhead Lookups in Excel
date: 2014-07-18T22:34:12+10:00
author: Aaron Parker
layout: post
guid: http://stealthpuppy.com/?p=3627
permalink: /performing-vsphere-vm-ram-overhead-lookups-in-excel/
dsq_thread_id:
  - "2854807555"
categories:
  - VMware
tags:
  - ESXi
---
Running VMs under ESXi will incur a memory overhead for each virtual machine.  You can read about this overhead here: [Understanding Memory Overhead](http://pubs.vmware.com/vsphere-51/index.jsp#com.vmware.vsphere.resmgmt.doc/GUID-4954A03F-E1F4-46C7-A3E7-947D30269E34.html). Essentially memory overhead is:

> Overhead memory includes space reserved for the virtual machine frame buffer and various virtualization data structures, such as shadow page tables. Overhead memory depends on the number of virtual CPUs and the configured memory for the guest operating system.

While ESXi provides memory optimisations such as page sharing which have the potential to save more memory than is taken up by the overhead, it&#8217;s still worth including the RAM overhead in any calculations used to determine the number of VMs per host (especially for VDI or RDS/XenApp).

If I&#8217;m going through a sizing exercise, I&#8217;m not typically going to account for RAM optimisations as I don&#8217;t know how much RAM will be saved until the solution is deployed.

VMware has a reasonably complete [table for VM RAM overhead for ESXi 4.0](http://pubs.vmware.com/vsp40_i/wwhelp/wwhimpl/common/html/wwhelp.htm#href=resmgmt/r_overhead_memory_on_virtual_machines.html#1_7_9_9_10_1&single=true), plus a [sample table for ESXi 5.1](http://pubs.vmware.com/vsphere-51/index.jsp#com.vmware.vsphere.resmgmt.doc/GUID-B42C72C1-F8D5-40DC-93D1-FB31849B1114.html). From what I can tell, a complete table for ESXi 5.x doesn&#8217;t exist, so unfortunately you&#8217;ll need to create your own. That&#8217;s a straight-forward task, but will be time consuming.

I&#8217;ve created an Excel spreadsheet that I can use for estimating the number of virtual desktops or XenApp servers per host based on some specific configurations and that includes calculating the VM RAM overhead.

Creating a formula to perform the lookup, I&#8217;ve used the [INDEX](http://office.microsoft.com/en-au/excel-help/index-function-HP010069831.aspx) and [MATCH](http://office.microsoft.com/en-au/excel-help/match-function-HP010062414.aspx) functions to look up the number of vCPUs against the amount of RAM assigned to the VM, to return the VM RAM Overhead.

Here&#8217;s what it looks like in Excel:

[<img class="alignnone wp-image-3636 size-full" src="http://stealthpuppy.com/wp-content/uploads/2014/07/Excel-Lookup1.png" alt="" width="1180" height="575" srcset="http://192.168.0.89/wp-content/uploads/2014/07/Excel-Lookup1.png 1180w, http://192.168.0.89/wp-content/uploads/2014/07/Excel-Lookup1-150x73.png 150w, http://192.168.0.89/wp-content/uploads/2014/07/Excel-Lookup1-300x146.png 300w, http://192.168.0.89/wp-content/uploads/2014/07/Excel-Lookup1-1024x498.png 1024w, http://192.168.0.89/wp-content/uploads/2014/07/Excel-Lookup1-624x304.png 624w" sizes="(max-width: 1180px) 100vw, 1180px" />](http://stealthpuppy.com/wp-content/uploads/2014/07/Excel-Lookup1.png)

The INDEX formula is used to return the amount of RAM overhead based on the vCPU and RAM values that we input into the spreadsheet. In this instance, I have two inputs &#8211; number of vCPUs (B3) and amount of RAM in GB (B4) assigned to my sample VM (for RDS/XenApp or VDI, I&#8217;ve assumed that all VMs on the host are configured identically.

<pre class="lang:ini decode:true" title="Using INDEX to select from an array">INDEX(array,row_num,column_num)</pre>

Here, _array_ is the amount of RAM Overhead to select from &#8211; essentially the lookup table I&#8217;ve added into the spreadsheet that lists the amount of VM RAM Overhead (D6 to I16), _row_num_ is the number of vCPUs assigned to the VM (1 to 8), _column_num_ is the amount of RAM assigned to the VM (256Mb to 256GB).

To select from the appropriate row and column in the table, I need to match the inputs from the array of vCPUs (E5 to L5, or 1 to 8 vCPUs) and the amount of RAM (from D6 to D16, or 256Mb to 256GB of RAM).  The MATCH formula will look like the below. _Lookup_value_ will be the number of vCPUs or amount of RAM, _lookup_array_ is the number of vCPUs in the table to select from (1 to 8). We can ignore _match_type_.

<pre class="lang:ini decode:true">MATCH(lookup_value, lookup_array, [match_type])</pre>

So, now my formula will look something like this:

<pre class="lang:ini decode:true ">INDEX(array,(MATCH(lookup_value, lookup_array)),(MATCH(lookup_value, lookup_array)))</pre>

To make this work in Excel, I&#8217;ve also added two extra components to the formula, converting GB to MB by multiplying the VM RAM size input (B5) by 1024 and rounding the result to a single decimal place. The resulting formula is then:

<pre class="lang:ini decode:true ">=ROUND((INDEX(&lt;Lookup table&gt;,MATCH((&lt;VM RAM size in GB&gt;*1024),&lt;VM RAM size column&gt;),MATCH(&lt;No. VM vCPUs,&lt;vCPUs Row&gt;))),1)</pre>

I can then multiply the result by the number of VMs to get a full picture of the amount of RAM consumed on the host.

Here&#8217;s a downloadable version of the Excel spreadsheet, which includes the ESXi 4.x version of the VM RAM Overhead.

<p class="download">
  [download id=&#8221;63&#8243; format=&#8221;1&#8243;]
</p>

With a bit of effort, you could update the table for ESXi 5.x.