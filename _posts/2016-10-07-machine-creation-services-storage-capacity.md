---
id: 5027
title: Storage Capacity Required for Machine Creation Services
date: 2016-10-07T16:20:22+10:00
author: Aaron Parker
layout: post
guid: http://stealthpuppy.com/?p=5027
permalink: /machine-creation-services-storage-capacity/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "5203419491"
image: /wp-content/uploads/2016/08/storage.jpg
categories:
  - Citrix
tags:
  - Machine Creation Services
  - MCS
  - Storage
  - XenApp
  - XenDesktop
---
How much storage capacity do you need for Citrix Machine Creation Services? If you&#8217;re designing a XenApp or XenDesktop environment, one question you&#8217;re going to ask is &#8220;how much storage do we need?&#8221;. Let&#8217;s dig into the fundamentals of Machine Creation Services and have a look at how much capacity you&#8217;ll need to provision.

# What is Machine Creation Services?

Citrix Machine Creation Services (MCS) takes the pain out of deploying virtual machine workloads for XenApp and XenDesktop. MCS leverages hypervisor management APIs to deploy virtual machines from a master image. While the approach for deploying VMs is the same at a high level across hypervisors, there are, of course, differences due to different virtual machine formats.

If you&#8217;re new to XenApp or XenDesktop, or have yet to move from XenApp 5.x or 6.x, there are a few of articles on MCS that I recommend reading and keeping for reference:

  * [MCS Primer – Part 1](https://www.citrix.com/blogs/2011/06/28/machine-creation-services-primer-part-1/) and [MCS Primer – Part 2](https://www.citrix.com/blogs/2011/08/05/machine-creation-services-primer-%E2%80%93-part-2/) by Dan Feller
  * A great [article by Bas van Kaam on MCS considerations](http://www.basvankaam.com/2016/02/09/citrix-machine-creation-services-what-to-consider/)
  * Citrix KB article &#8211; [MCS Storage Considerations](http://support.citrix.com/article/CTX218082)

Unlike [Citrix Provisioning Services](http://docs.citrix.com/en-us/provisioning/7-11.html), there are no additional infrastructure components required to deploy machines via MCS; however, MCS can only deploy virtual machines. This makes MCS easy to deploy because it&#8217;s available by virtue of deploying XenDesktop on almost any type of virtualized infrastructure.

XenDesktop 7.11 has now made it possible to deploy full clone virtual machines improving disaster recovery scenarios, for MCS deployed VMs. [Kees Baggerman](https://twitter.com/kbaggerman) has written about this new option &#8211; [Citrix XenDesktop 7.11; digesting full clones](http://blog.myvirtualvision.com/2016/10/06/citrix-xendesktop-7-11-digesting-full-clones/).

Kees also presented a session at Citrix Synergy 2016 on MCS and PVS that goes into great detail on these deployment solutions under the hood. You can watch the video here: [Citrix Synergy 2016 &#8211; SYN219 &#8211; Getting up close and personal with MCS and PVS](https://www.youtube.com/watch?v=p47JwwpUArQ). This session presents a great overview of the deployment options available with MCS.

I&#8217;ve updated that image for XenDesktop 7.11. Now the available deployment options for MCS are:

<figure id="attachment_5179" aria-describedby="caption-attachment-5179" style="width: 1024px" class="wp-caption alignnone">[<img class="wp-image-5179 size-large" src="http://stealthpuppy.com/wp-content/uploads/2016/10/MCS-deployment-options-1024x438.png" alt="Deployment options available in XenDesktop Machine Creation Services" width="1024" height="438" srcset="http://192.168.0.89/wp-content/uploads/2016/10/MCS-deployment-options-1024x438.png 1024w, http://192.168.0.89/wp-content/uploads/2016/10/MCS-deployment-options-150x64.png 150w, http://192.168.0.89/wp-content/uploads/2016/10/MCS-deployment-options-300x128.png 300w, http://192.168.0.89/wp-content/uploads/2016/10/MCS-deployment-options-768x329.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/10/MCS-deployment-options.png)<figcaption id="caption-attachment-5179" class="wp-caption-text">Deployment options available in XenDesktop Machine Creation Services (credit: Kees Baggerman & Martijn Bosschaart)</figcaption></figure>

As you can see, there are quite a number of deployment options in MCS now, so this can&#8217;t make sizing straight-forward.

# Machine Creation Services VM Components

To determine the storage capacity we require for MCS, we should start with knowing what makes up a virtual machine deployed via Machine Creation Services. This will differ for each hypervisor and machine catalog configuration:

  * Base image &#8211; there will be at least 1 base image per machine catalog. Multiple base images can exist if updates are applied to the catalog or multiple catalogs are deployed to a single data store
  * Identity disk &#8211; each virtual machine will have an identity disk that contains the bits that provide each VMs its unique identity. This disk is only deleted when the VM is deleted
  * Differencing or delta disk &#8211; while running a virtual machine needs a location to write changes from the base image. This disk is deleted if you&#8217;ve configured the machine catalog to refresh VMs on reboot
  * Cache overflow disk &#8211; with XenDesktop 7.9 and above you can configure Cache in RAM with Overflow to Disk. If so, the delta disk is not used and this overflow disk is used instead. This disk will be deleted at VM reboot
  * Snapshots &#8211; depending on the deployment options used, some VMs may also have snapshots applied to them
  * VM configuration files, logs, swap files etc. &#8211; Hyper-V and ESXi have configuration files and others for each VM, while XenServer and AHV store these descriptors differently. These may not have a large impact on storage, but we can include them for completeness.

Because each hypervisor has its own idiosyncracies our calculations for storage capacity will differ depending on the platform choice.

# What about Dedupe and Compression?

For the purposes of this exercise, I&#8217;m going to ignore deduplication and compression. Each storage vendor has different approaches &#8211; some do inline dedupe, some do post-process dedupe, while others do both and not all vendors support compression. Additionally, storage vendors are using different approaches for block sizes so may have different results for reclaiming capacity.

Think about deploying XenDesktop on Azure &#8211; deduplication or compression are not exposed to the administrator, so for sizing on Azure, we&#8217;d need to consider the total capacity consumed to understand storage costs.

If we start with calculating the maximum capacity we&#8217;ll require based on our deployment options, then testing on specific storage configurations that include dedupe and/or compression means that we can only reduce our storage capacity requirements.

# Conclusion

MCS helps to take the pain out of virtual desktop deployments but you&#8217;ll still need to carefully consider the storage capacity requirements. Because the approach for each hypervisor is slightly different, I&#8217;ll cover each platform individually in upcoming articles. I&#8217;m going to start with what I think is the easiest and simplest platform &#8211; Hyper-V in Windows Server 2012 R2 and Windows Server 2016.

Note that for this series, I&#8217;m only interested in Windows deployments, so I won&#8217;t cover Linux at this time.

## Articles

The articles for specific platforms can be found here:

  * [MCS Capacity Sizing on Hyper-V](http://stealthpuppy.com/mcs-capacity-sizing-hyper-v/)
  * MCS Capacity Sizing on vSphere
  * MCS Capacity Sizing on XenServer