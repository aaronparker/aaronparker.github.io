---
id: 5185
title: Machine Creation Services Capacity Sizing on Hyper-V
date: 2016-10-24T11:57:54+10:00
author: Aaron Parker
layout: post
guid: http://stealthpuppy.com/?p=5185
permalink: /mcs-capacity-sizing-hyper-v/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "5247308592"
image: /wp-content/uploads/2016/10/363468958_68baf091f1_o.jpg
categories:
  - Citrix
tags:
  - Hyper-V
  - Machine Creation Services
  - MCS
  - Storage
  - XenApp
  - XenDesktop
---
[toc]

To [understand sizing Machine Creation Services](http://stealthpuppy.com/machine-creation-services-storage-capacity/) on Hyper-V, we should first look at how XenDesktop creates virtual machines across the various deployment choices. XenDesktop 7.9 and 7.11 have introduced new features to MCS that will require additional consideration for storage requirements over previous versions.

In this article, I'll cover the deployment options at a high level, including:

  * **Delta Clones** - this has been the traditional deployment approach for MCS, where virtual machines reference a base image and store changes in a delta disk. In Hyper-V parlance, this is referred to as a differencing disk. Delta clones work for XenApp, pooled and dedicated clone VMs
  * **Delta Clones with Storage Optimisation** - this is the new default option for MCS deployments since XenDesktop 7.9. IO optimisation enables a cache in RAM with overflow to disk
  * **Full Clones** - new in XenDesktop 7.11 is the ability to deploy full clones from a master image and rely on the storage platform to provide optimisation

To keep this size exercise simple, I have used a single data store that contains both my master image and the Machine Catalogs. The environment is based on Windows Server 2016 and System Center Virtual Machine Manager 2016. Note that Hyper-V allows for modifying the paths for virtual machines (config files), virtual hard disks and Smart Paging files, so the folder structure shown in my environment in the screenshots below may differ to yours.

# Master Image

The master image is Windows Server 2012 R2 or 2016 with a set of applications including Office. Initially, the image has two snapshots (or checkpoints) created in the process of provisioning and updating the image. Thus the image consists of:

  * **Virtual disk of 13.63GB** - this is the image as I've built it including Windows, applications, and the XenDesktop 7.9 VDA. This is using a thin-provisioned (or dynamic) disk with the default size of 127GB
  * **Snapshot 1 of 4MB** - the initial snapshot taken before creating the Machine Catalog. 4MB is the default size for new snapshots on Hyper-V
  * **Snapshot 2 of 8.63GB** - an update that included installing the 7.11 VDA. This sizeable given the changes in this snapshot include only a months' worth of Windows updates (at around 90Mb) and an upgrade from the VDA 7.9 to 7.11.

<figure id="attachment_5186" aria-describedby="caption-attachment-5186" style="width: 1024px" class="wp-caption alignnone">[<img class="wp-image-5186 size-large" src="http://stealthpuppy.com/wp-content/uploads/2016/10/MCS-HyperV-TopLevel-Datastore-MasterImage-Disks-1024x482.png" alt="MCS Master Image on Hyper-V with 2 snapshots" width="1024" height="482" srcset="https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-HyperV-TopLevel-Datastore-MasterImage-Disks-1024x482.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-HyperV-TopLevel-Datastore-MasterImage-Disks-150x71.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-HyperV-TopLevel-Datastore-MasterImage-Disks-300x141.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-HyperV-TopLevel-Datastore-MasterImage-Disks-768x361.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-HyperV-TopLevel-Datastore-MasterImage-Disks.png 1061w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/10/MCS-HyperV-TopLevel-Datastore-MasterImage-Disks.png)<figcaption id="caption-attachment-5186" class="wp-caption-text">MCS Master Image on Hyper-V with 2 snapshots*</figure>

Note the time stamps of the snapshots here - when creating a snapshot via Virtual Machine Manager the previous snapshot is touched and the update in time stamp on the new 4MB snapshot.

Each virtual machine has a corresponding configuration file and runtime state file, although these won't have a noticeable effect on overall storage capacity consumed.

<figure id="attachment_5187" aria-describedby="caption-attachment-5187" style="width: 1024px" class="wp-caption alignnone">[<img class="wp-image-5187 size-large" src="http://stealthpuppy.com/wp-content/uploads/2016/10/MCS-HyperV-TopLevel-Datastore-MasterImage-VMs-1024x482.png" alt="Virtual Machines folder for the MCS Master Image on Hyper-V" width="1024" height="482" srcset="https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-HyperV-TopLevel-Datastore-MasterImage-VMs-1024x482.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-HyperV-TopLevel-Datastore-MasterImage-VMs-150x71.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-HyperV-TopLevel-Datastore-MasterImage-VMs-300x141.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-HyperV-TopLevel-Datastore-MasterImage-VMs-768x361.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-HyperV-TopLevel-Datastore-MasterImage-VMs.png 1061w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/10/MCS-HyperV-TopLevel-Datastore-MasterImage-VMs.png)<figcaption id="caption-attachment-5187" class="wp-caption-text">Virtual Machines folder for the MCS Master Image on Hyper-V*</figure>

Additional versions of these files are created per snapshot so that changes to the VM hardware are tracked.

<figure id="attachment_5188" aria-describedby="caption-attachment-5188" style="width: 1024px" class="wp-caption alignnone">[<img class="wp-image-5188 size-large" src="http://stealthpuppy.com/wp-content/uploads/2016/10/MCS-HyperV-TopLevel-Datastore-MasterImage-Snapshots-1024x482.png" alt="Snapshots folder for the MCS Master Image on Hyper-V" width="1024" height="482" srcset="https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-HyperV-TopLevel-Datastore-MasterImage-Snapshots-1024x482.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-HyperV-TopLevel-Datastore-MasterImage-Snapshots-150x71.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-HyperV-TopLevel-Datastore-MasterImage-Snapshots-300x141.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-HyperV-TopLevel-Datastore-MasterImage-Snapshots-768x361.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-HyperV-TopLevel-Datastore-MasterImage-Snapshots.png 1061w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/10/MCS-HyperV-TopLevel-Datastore-MasterImage-Snapshots.png)<figcaption id="caption-attachment-5188" class="wp-caption-text">Snapshots folder for the MCS Master Image on Hyper-V*</figure>

## How Large is the Master Image?

Not all master images will be the same size due to environmental differences; however, count on a minimum of 14GB for Windows + Office for all current Windows versions. I recommend [cleaning up your master image](http://stealthpuppy.com/cleaning-up-and-reducing-the-size-of-your-master-image/) to reduce the size as much as is possible.

With each update to the master image, you'll see snapshots growing. Looking at my test environment after making 3 updates to the image my master image has grown considerably with what should be relatively small changes (i.e. booting the VM to install applications or updates).

<figure id="attachment_5193" aria-describedby="caption-attachment-5193" style="width: 1024px" class="wp-caption alignnone">[<img class="wp-image-5193 size-large" src="http://stealthpuppy.com/wp-content/uploads/2016/10/MCS-Master-Image-3-Snapshots-1024x467.png" alt="Master Image and snapshots after 3 updates" width="1024" height="467" srcset="https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-Master-Image-3-Snapshots-1024x467.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-Master-Image-3-Snapshots-150x68.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-Master-Image-3-Snapshots-300x137.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-Master-Image-3-Snapshots-768x350.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-Master-Image-3-Snapshots.png 1093w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/10/MCS-Master-Image-3-Snapshots.png)<figcaption id="caption-attachment-5193" class="wp-caption-text">Master Image and snapshots after 3 updates*</figure>

What started at 14GB has now grown to a total of 31GB with installing VDA updates, the FSLogix agent, Java runtimes and Windows Updates.

# MCS Machine Catalogs

The configuration choices made during the creation of a Machine Catalog can impact the way in which virtual machines are configured and the capacity consumed. The following choices will result in slightly different inputs for our sizing:

  1. Server OS vs. Desktop OS
  2. Delta clones with [Storage Optimisation](https://www.citrix.com/blogs/2016/08/03/introducing-mcs-storage-optimisation/) (cache in RAM with overflow to disk)
  3. Full Clones
  4. AppDisks (not compatible with the storage optimisation feature)
  5. Personal vDisk (not compatible with XenApp deployments)

## Temporary Cache Sizes with Default Configurations

The default configuration for XenApp VMs, pooled random and pooled static desktops, since 7.9, is to enable the cache in RAM with a corresponding temporary disk cache as shown in the screenshot below. For both Server and Desktop OS machines, the default RAM cache size is 256Mb; however, the disk cache size default is different:

  * For Server OS VMs, the default size will match the size of the virtual disk assigned to the master image
  * With Desktop OS VMs, the default size is **10GB**.

You will need to make careful consideration for the amount of RAM assigned to the RAM cache. This cache size is consumed from the RAM assigned to the VM, so the more RAM that you can assign, the larger the RAM cache you can set. With a larger RAM cache, the amount of IO written out to storage will be less, thus capacity consumed will be reduced.

<figure id="attachment_5200" aria-describedby="caption-attachment-5200" style="width: 806px" class="wp-caption alignnone">[<img class="wp-image-5200 size-full" src="http://stealthpuppy.com/wp-content/uploads/2016/10/01_CreatingMachineCatalog-Default.png" alt="Default virtual machine options for XenApp Machine Catalogs" width="806" height="605" srcset="https://stealthpuppy.com/wp-content/uploads/2016/10/01_CreatingMachineCatalog-Default.png 806w, https://stealthpuppy.com/wp-content/uploads/2016/10/01_CreatingMachineCatalog-Default-150x113.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/10/01_CreatingMachineCatalog-Default-300x225.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/10/01_CreatingMachineCatalog-Default-768x576.png 768w" sizes="(max-width: 806px) 100vw, 806px" />](http://stealthpuppy.com/wp-content/uploads/2016/10/01_CreatingMachineCatalog-Default.png)<figcaption id="caption-attachment-5200" class="wp-caption-text">Default virtual machine options for XenApp Machine Catalogs*</figure>

You can choose to place temporary storage disks on separate data stores to your virtual machines - for example, you could choose shared storage for the virtual machines and local storage (ideally flash-based) for the temporary storage disks.

If you reduce the disk cache size from the default, Studio will warn that reducing the size may impact performance. For Server OS VMs (XenApp), where multiple users on a single machine, a larger disk cache is required.

<figure id="attachment_5233" aria-describedby="caption-attachment-5233" style="width: 806px" class="wp-caption alignnone">[<img class="size-full wp-image-5233" src="http://stealthpuppy.com/wp-content/uploads/2016/10/Virtual-Machine-Options-RDS.png" alt="Disk cache size warning for Server OS VMs" width="806" height="605" srcset="https://stealthpuppy.com/wp-content/uploads/2016/10/Virtual-Machine-Options-RDS.png 806w, https://stealthpuppy.com/wp-content/uploads/2016/10/Virtual-Machine-Options-RDS-150x113.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/10/Virtual-Machine-Options-RDS-300x225.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/10/Virtual-Machine-Options-RDS-768x576.png 768w" sizes="(max-width: 806px) 100vw, 806px" />](http://stealthpuppy.com/wp-content/uploads/2016/10/Virtual-Machine-Options-RDS.png)<figcaption id="caption-attachment-5233" class="wp-caption-text">Disk cache size warning for Server OS VMs*</figure>

Reducing the disk cache size for Desktop OS VMs from the default 10GB, results in the same message, which is potentially confusing.

<figure id="attachment_5234" aria-describedby="caption-attachment-5234" style="width: 806px" class="wp-caption alignnone">[<img class="size-full wp-image-5234" src="http://stealthpuppy.com/wp-content/uploads/2016/10/Virtual-Machine-Options-VDI.png" alt="Disk cache size warning for Desktop OS VMs" width="806" height="605" srcset="https://stealthpuppy.com/wp-content/uploads/2016/10/Virtual-Machine-Options-VDI.png 806w, https://stealthpuppy.com/wp-content/uploads/2016/10/Virtual-Machine-Options-VDI-150x113.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/10/Virtual-Machine-Options-VDI-300x225.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/10/Virtual-Machine-Options-VDI-768x576.png 768w" sizes="(max-width: 806px) 100vw, 806px" />](http://stealthpuppy.com/wp-content/uploads/2016/10/Virtual-Machine-Options-VDI.png)<figcaption id="caption-attachment-5234" class="wp-caption-text">Disk cache size warning for Desktop OS VMs*</figure>

## AppDisks

[AppDisks](https://docs.citrix.com/en-us/xenapp-and-xendesktop/7-11/install-configure/appdisks.html) are applicable to specific Machine Catalog configurations and the sizes will vary based on the applications and number of applications in each image. However, AppDisks can potentially assist with reducing the [storage capacity](https://docs.citrix.com/en-us/xenapp-and-xendesktop/7-11/install-configure/appdisks.html#par_anchortitle_405a) consumed, especially if they are shared across multiple catalogues. AppDisks do need to be stored on the same data store as the target MCS virtual machines.

## Personal vDisks

Citrix provides some good information on [sizing for Personal vDisks](https://docs.citrix.com/en-us/xenapp-and-xendesktop/7-11/install-configure/personal-vdisk/personal-vdisk-configure-manage.html) and these will have a pre-defined size. Additionally, Personal vDisks can be stored in a data store separate to the virtual machines (e.g on highly available shared storage). If that is the case, we can remove those from our sizing.

## Base Disk

MCS requires a copy of the master image on each target data store. During the creation of the Machine Catalog, the selected master image is copied to the data store and a temporary "preparation VM" is created to [prepare the catalogue for deploying VMs based on the master image](https://www.citrix.com/blogs/2016/04/04/machine-creation-service-image-preparation-overview-and-fault-finding/).

<figure id="attachment_5196" aria-describedby="caption-attachment-5196" style="width: 1024px" class="wp-caption alignnone">[<img class="wp-image-5196 size-large" src="http://stealthpuppy.com/wp-content/uploads/2016/10/04_Preparing-Catalog-1024x450.png" alt="Machine Creation Services preparing the catalog via a temporary VM" width="1024" height="450" srcset="https://stealthpuppy.com/wp-content/uploads/2016/10/04_Preparing-Catalog-1024x450.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/10/04_Preparing-Catalog-150x66.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/10/04_Preparing-Catalog-300x132.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/10/04_Preparing-Catalog-768x337.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/10/04_Preparing-Catalog.png 1125w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/10/04_Preparing-Catalog.png)<figcaption id="caption-attachment-5196" class="wp-caption-text">Machine Creation Services preparing the catalogue via a temporary VM*</figure>

This VM is deleted after use, so we don't need to include it in our capacity calculations. Once the Machine Catalog is created we have the base image, which is an exact copy of our initial master image.

<figure id="attachment_5197" aria-describedby="caption-attachment-5197" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5197" src="http://stealthpuppy.com/wp-content/uploads/2016/10/03_Base-Disk-1024x450.png" alt="MCS machine catalog base image after initial deployment" width="1024" height="450" srcset="https://stealthpuppy.com/wp-content/uploads/2016/10/03_Base-Disk-1024x450.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/10/03_Base-Disk-150x66.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/10/03_Base-Disk-300x132.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/10/03_Base-Disk-768x337.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/10/03_Base-Disk.png 1125w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/10/03_Base-Disk.png)<figcaption id="caption-attachment-5197" class="wp-caption-text">MCS Machine Catalog base image after initial deployment*</figure>

After a number of updates to the master image and applying them to the catalogue. The base image can contain **3** copies of the master image - the size of these copies will differ depending on the additional data written to the image after each update. Also, note the sizes of these in relation to the master image and snapshots above.

<figure id="attachment_5198" aria-describedby="caption-attachment-5198" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5198" src="http://stealthpuppy.com/wp-content/uploads/2016/10/MCS-base-disk-updates-1024x476.png" alt="MCS machine catalog base image after 3 updates" width="1024" height="476" srcset="https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-base-disk-updates-1024x476.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-base-disk-updates-150x70.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-base-disk-updates-300x139.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-base-disk-updates-768x357.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-base-disk-updates.png 1164w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/10/MCS-base-disk-updates.png)<figcaption id="caption-attachment-5198" class="wp-caption-text">MCS Machine Catalog base image after 3 updates*</figure>

However, this state is transient. Eventually, the number of copies of the master image maintained on the data store should be **2** - the current and previous versions of the image to enable rollback of the catalogue.

<figure id="attachment_5199" aria-describedby="caption-attachment-5199" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5199" src="http://stealthpuppy.com/wp-content/uploads/2016/10/MCS-base-disk-updates-2-images-1024x453.png" alt="MCS machine catalog base image after updates applied" width="1024" height="453" srcset="https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-base-disk-updates-2-images-1024x453.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-base-disk-updates-2-images-150x66.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-base-disk-updates-2-images-300x133.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-base-disk-updates-2-images-768x340.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-base-disk-updates-2-images.png 1110w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/10/MCS-base-disk-updates-2-images.png)<figcaption id="caption-attachment-5199" class="wp-caption-text">MCS Machine Catalog base image after updates applied*</figure>

We should still be accounting for the 3 image copies in our sizing to ensure updates to catalogues are possible after the initial deployment.

## Virtual Machines

What does a deployed virtual machine look like? In this case, I have a XenApp virtual machine on Windows Server 2012 R2 deployed with cache in RAM enabled. Immediately after deployment and before first boot, the VM looks like this:

<figure id="attachment_5204" aria-describedby="caption-attachment-5204" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5204" src="http://stealthpuppy.com/wp-content/uploads/2016/10/07_MCS-VM-Created-default-no-boot-1024x450.png" alt="Deployed MCS XenApp virtual machine with cache in RAM enabled that has not yet booted" width="1024" height="450" srcset="https://stealthpuppy.com/wp-content/uploads/2016/10/07_MCS-VM-Created-default-no-boot-1024x450.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/10/07_MCS-VM-Created-default-no-boot-150x66.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/10/07_MCS-VM-Created-default-no-boot-300x132.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/10/07_MCS-VM-Created-default-no-boot-768x337.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/10/07_MCS-VM-Created-default-no-boot.png 1125w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/10/07_MCS-VM-Created-default-no-boot.png)<figcaption id="caption-attachment-5204" class="wp-caption-text">Deployed MCS XenApp virtual machine with cache in RAM enabled that has not yet booted*</figure>

Other than the VM configuration files, the VM consists of the following virtual disks:

  1. The identity disk that contains the unique identity for the machine
  2. The TemporaryStorage disk used as the overflow target for the cache in RAM feature
  3. The differencing (or delta) disk that contains the differences from the master image when the machine is running

After booting the VM and logging on with a single user session we see the following:

  1. The identity disk size remains static and it does so for the life of the machine
  2. The TemporaryStorage disk sizes increases and does not change between reboots or updates
  3. The differencing (or delta) disk is reset back to the initial 4MB at each reboot and grows to a maximum size of 36MB.

<figure id="attachment_5205" aria-describedby="caption-attachment-5205" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5205" src="http://stealthpuppy.com/wp-content/uploads/2016/10/12_MCS-VM-User-logon-Tempstorage-growing-1024x450.png" alt="MCS VM with temporary storage growth" width="1024" height="450" srcset="https://stealthpuppy.com/wp-content/uploads/2016/10/12_MCS-VM-User-logon-Tempstorage-growing-1024x450.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/10/12_MCS-VM-User-logon-Tempstorage-growing-150x66.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/10/12_MCS-VM-User-logon-Tempstorage-growing-300x132.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/10/12_MCS-VM-User-logon-Tempstorage-growing-768x337.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/10/12_MCS-VM-User-logon-Tempstorage-growing.png 1125w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/10/12_MCS-VM-User-logon-Tempstorage-growing.png)<figcaption id="caption-attachment-5205" class="wp-caption-text">MCS VM with temporary storage growth*</figure>

Viewing the virtual machine storage details in Virtual Machine Manager, we see details of the virtual disks assigned to the virtual machines deployed via MCS and the master images. I have two master images on this data store:

  * **W2K12-master** has no snapshots at this time, so a single Dynamic disk is shown with the default size of **127GB**
  * **W2K16-master** has 1 snapshot, so the Differencing disk is shown, again with the default size of **127GB**

The MCS virtual machines each have the 3 virtual disks assigned:

  * The identity disk is a dynamic disk, yet a maximum size of 0.02GB (approximately 20MB)
  * The Temporary Storage disk size is set during creation of the Machine Catalog - in this example, we can see the maximum size of this disk is **64GB**. Citrix recommends matching the size of this disk to the size of the virtual disk assigned to the master image
  * The differencing disk maximum size is **127GB**, which is the default size of virtual disks in Hyper-V, matching the virtual disk size of the master image.

<figure id="attachment_5216" aria-describedby="caption-attachment-5216" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5216" src="http://stealthpuppy.com/wp-content/uploads/2016/10/SCVMM-StorageView-All-1024x552.png" alt="MCS VM storage viewed in Virtual Machine Manager" width="1024" height="552" srcset="https://stealthpuppy.com/wp-content/uploads/2016/10/SCVMM-StorageView-All-1024x552.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/10/SCVMM-StorageView-All-150x81.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/10/SCVMM-StorageView-All-300x162.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/10/SCVMM-StorageView-All-768x414.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/10/SCVMM-StorageView-All.png 1234w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/10/SCVMM-StorageView-All.png)<figcaption id="caption-attachment-5216" class="wp-caption-text">MCS VM storage viewed in Virtual Machine Manager*</figure>

This specific configuration is unique this deployment type, so if we look at different MCS configurations, we will see different outcomes for virtual disk configurations and sizes.

## Clones with Differencing Disks

XenDesktop and XenApp 7.8 and below, used differencing (or delta) disks that contained the changes to the virtual machine from the original base disk. When deploying a virtual machine on these versions or without storage optimisation, a VM then consists of an identity disk and a differencing disk (which as shown previously, starts at 4MB).

<figure id="attachment_5223" aria-describedby="caption-attachment-5223" style="width: 1018px" class="wp-caption alignnone">[<img class="size-full wp-image-5223" src="http://stealthpuppy.com/wp-content/uploads/2016/10/MCS-delta-disk-creation.png" alt="MCS Virtual Machines without storage optimisation (as per XenApp/XenDesktop 7.8 and below)" width="1018" height="494" srcset="https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-delta-disk-creation.png 1018w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-delta-disk-creation-150x73.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-delta-disk-creation-300x146.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-delta-disk-creation-768x373.png 768w" sizes="(max-width: 1018px) 100vw, 1018px" />](http://stealthpuppy.com/wp-content/uploads/2016/10/MCS-delta-disk-creation.png)<figcaption id="caption-attachment-5223" class="wp-caption-text">MCS Virtual Machines without storage optimisation (as per XenApp/XenDesktop 7.8 and below)*</figure>

After booting the virtual machine, all changes are written to the differencing disk and you can see the growth in storage capacity consumed. In this example, I've booted a non-optimised Windows Server 2016 image and even without user sessions on that VM, the differencing disk size increases pretty readily.

<figure id="attachment_5224" aria-describedby="caption-attachment-5224" style="width: 1018px" class="wp-caption alignnone">[<img class="size-full wp-image-5224" src="http://stealthpuppy.com/wp-content/uploads/2016/10/MCS-delta-disk-boot.png" alt="MCS Delta Clones after boot showing growth in the differencing disk" width="1018" height="494" srcset="https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-delta-disk-boot.png 1018w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-delta-disk-boot-150x73.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-delta-disk-boot-300x146.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-delta-disk-boot-768x373.png 768w" sizes="(max-width: 1018px) 100vw, 1018px" />](http://stealthpuppy.com/wp-content/uploads/2016/10/MCS-delta-disk-boot.png)<figcaption id="caption-attachment-5224" class="wp-caption-text">MCS Delta Clones after boot showing growth in the differencing disk*</figure>

When the virtual machine restarts, the differencing disk is deleted and a new disk, again starting at 4MB, is created. So cycling VM regularly is a good way to keep storage consumed to a minimum.

## Full Clones

Deployment of [full clones via MCS is now possible in XenDesktop 7.11](https://www.citrix.com/blogs/2016/10/12/xenapp-and-xendesktop-7-11-mcs-full-clone-support/). Full clones consist of an identity disk and a copy of the base image for each virtual machine.

<figure id="attachment_5226" aria-describedby="caption-attachment-5226" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5226" src="http://stealthpuppy.com/wp-content/uploads/2016/10/MCS-Full-Clone-1024x472.png" alt="Disk configuration for MCS Full Clones" width="1024" height="472" srcset="https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-Full-Clone-1024x472.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-Full-Clone-150x69.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-Full-Clone-300x138.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-Full-Clone-768x354.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/10/MCS-Full-Clone.png 1081w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/10/MCS-Full-Clone.png)<figcaption id="caption-attachment-5226" class="wp-caption-text">Disk configuration for MCS Full Clones*</figure>

Once a full clone is deployed, it is persistent while managed and updated through mechanisms outside of XenDesktop. The potential capacity that a full clone can consume will be the full size of the virtual disk as assigned to the master image.

# Virtual Machine Sizing on Hyper-V

To correctly size for Machine Creation Services on Hyper-V, let's summarise the storage impact that MCS has with Hyper-V deployments:

## Common Files

Virtual machine components that are common to all deployment types:

  * **Virtual machine configuration files** - each virtual machine has virtual machine configuration and runtime state files (including versions for snapshots) that are typically very small and should not have an impact on overall sizing
  * **Smart Paging files** - Smart Paging only kicks in during machine boot when the host is under memory pressure. [I actually haven't been able to get my host to generate these as yet]
  * **Master images** - count on a minimum of **12GB** for Windows 7/Windows Server 2008 R2 and above with Office. Create a maximum virtual disk size to fit your requirements - it would be best to reduce the size from the default of **127GB** to only what is required. Master images can exist on datastores that are accessible by all hosts, rather than the same datastore as the virtual machines
  * **Master image snapshots** - changes in the master image can count for several GB even with small changes to the image. Several snapshots can exist as changes are made to the master image and the amount of change of size between snapshots can vary as well
  * **Base images** - master image snapshots are merged, so the base image shows the real size of the master image. Up to **3 copies of the** **base image** can exist in a single datastore and the sizes will vary based on the actual changes to the master image. That 3rd copy is transient and should be removed after all machines have applied the latest update
  * **Identity disks** - on Hyper-V, these start at **36MB** and remain at this size

## Delta Clones and Full Clones

Files used by delta clones and full clones include:

  * **Temporary storage disk** - the new storage optimisation feature of MCS is the default configuration for 7.9 and above so this disk is used instead of the differencing disk. The temporary storage disk can grow to the size specified when creating the Machine Catalog. By default, that is the maximum size of the virtual disk assigned to the master image and Citrix recommends ensuring these sizes match. These disks start at **4MB** and persist for the life of the VM.
  * **Differencing (or Delta) disk** - if the storage optimisation feature _is not used_, the differencing disk is used instead. This can grow to the maximum size of the virtual disk of the master image. These disks start at **4MB** and jump to **36MB** at boot (regardless of whether storage optimisation is used or not) and can grow considerably. These are deleted at reboot (not shutdown) of the VM
  * **Base image** - if using full clones, each VM consists of an identity disk and a copy of the base image

## Other Files

Other files used in virtual machine deployment include:

  * **Personal vDisks** - the default size is **10GB** and is shared between the user profile and user installed apps, but can be placed on separate storage
  * **AppDisks** - the size will vary based on specific applications sizes installed in the disk. AppDisks need to be on the same datastore as the virtual machines.

# Recommendations

Sizing storage capacity for Machine Creation Services isn't something that you'll do in isolation or perhaps even do once - design, testing, piloting and monitoring in production will be key to a successful deployment. Here are a few recommendations for sizing storage capacity:

  * Size the virtual disk assigned to the master image to be as small as possible; however, don't undersize the disk. Differencing disks and temporary cache disks sizes will match the size of the master image virtual disk, therefore they can grow to that maximum size
  * Monitor the cache in RAM size to understand when overflow to disk kicks in. Resize the cache in RAM if it is undersized and you have available RAM to assign to VMs
  * Boot virtual machines and watch the sizes of temporary cache disks and differencing disks to understand disk growth
  * AppDisks or 3rd party layering solutions can enable you to reduce MCS storage capacity by sharing application images across VM instances

# Calculating Capacity

Based on the information in this article, to size capacity with Machine Creation Services on Hyper-V, the calculation will require answering a number of questions or inputs. At a high level this involves:

  * Is the master image on the same data store? If so: 
      * The size of the master image
      * The number and size of the snapshots applied to that master image
  * For each Machine Catalog on the data store: 
      * Account for a minimum of 2 copies of the base image and up to 3 copies
      * Base images may differ in size
      * The number of virtual machines deployed in the catalog
      * Each virtual machine will have an identity disk of 36MB
      * Each virtual machine will have a differencing (or delta disk) that while powered on will be at least 36MB and reset at reboot to 4MB
      * If the virtual machine is deployed with storage optimisation: 
          * It will have a temporary storage disk that is not transient and will grow to several GB to a maximum size as specified when creating the Catalog
      * If the virtual machine is deployed without storage optimisation: 
          * The differencing disk that is transient and can grow to several GB and will be reset at reboot

Calculating storage capacity with this approach should provide you with a reasonably accurate picture of the total capacity to be consumed by MCS on that data store, before storage optimisation solutions such as deduplication and compression.

# Conclusion

While MCS itself is simple to design for and implement, recent flexibility and performance improvements introduced with XenDesktop 7.9 and 7.11, requires some additional considerations for storage capacity.

This article has walked through the MCS deployment options on Hyper-V and shown you the various capacity consumption scenarios so that we can go through a sizing exercise. In a future article, I'll provide to tool to simplify calculating storage capacity.

Thanks to [Carl Webster](https://twitter.com/CarlWebster) for reviewing this article. Feedback and corrections are welcome.