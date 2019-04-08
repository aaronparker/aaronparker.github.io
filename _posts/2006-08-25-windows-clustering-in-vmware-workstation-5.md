---
id: 208
title: Windows Clustering in VMware Workstation 5
date: 2006-08-25T05:50:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/windows-clustering-in-vmware-workstation-5
permalink: /windows-clustering-in-vmware-workstation-5/
dsq_thread_id:
  - "195378935"
categories:
  - VMware
tags:
  - Cluster
  - VMware
---
Truly geeky people will appreciate the ability to run their mailbox on their very own Exchange cluster running on their laptop. Not quite high availability but high on a list of silly things to do. Here&#8217;s how to create a cluser in VMware Workstation:

1. Create a new guest virtual machine with the following settings:

  * Hardware 
      * RAM: 320Mb
      * HDD0: SCSI, 4 GB
      * CDROM
      * Ethernet 1: Bridged
      * Ethernet 2: Host-only
  * Options 
      * Power: Shut Down Guest
      * Power: Restart Guest
      * Shared Folders: (if required)
      * Advanced: Enable Template mode

2. Install Windows Server 2003, Enterprise Edition. This is best installed from an integrated Windows Server 2003 Service Pack 1 source;

3. Install the following software/updates:

  * All current updates from Windows Update/WSUS;
  * VMware Tools.

4. Make the following configuration changes:

  * Rename the Host-only adapter: Heartbeat Connection;
  * Unbind Client for Microsoft Networks and File and Printer Sharing for Microsoft Networks from this adapter;
  * Disable NetBIOS over TCP/IP and LMHOSTS lookup on this adapter;
  * Rename the Bridged connection: Public Network Connection.

5. Make any other system changes to the guest machine as required. Shutdown the machine.

6. Create two clone machines from this source. Example:

  * Cluster Node A; and
  * Cluster Node B.

7. Edit the settings of Cluster Node A and create two new SCSI hard disks into a new folder. Do not use an existing folder in which one of the VMs resides.

  * Disk 1: This will be the quorum disk. Make this 0.5 GB and allocate all disk space now.
  * Disk 2: This will be the shared data disk. Make this at least 2.0 GB and allocate all disk space now.

8. Close VMware Workstation and edit the VMware Configuration File (.VMX) file for this machine and make the following changes:

  * Add the following lines to create a second SCSI channel:

<font face="Courier New">scsi1.present = &#8220;TRUE&#8221;<br /> scsi1.virtualDev = &#8220;lsilogic&#8221;</font>

  * Modify the additional hard drives to be attached to the new SCSI channel. Example:

<font face="Courier New">scsi1:5.present = &#8220;TRUE&#8221;<br /> scsi1:5.fileName = &#8220;I:\Cluster Shared\Quorum.vmdk&#8221;</font>

<font face="Courier New">scsi1:6.present = &#8220;TRUE&#8221;<br /> scsi1:6.fileName = &#8220;I:\Cluster Shared\Data.vmdk&#8221;<br /> </font>

  * Add the following lines to disable disk locking and caching:

<font face="Courier New">disk.locking = &#8220;false&#8221;<br /> diskLib.dataCacheMaxSize = &#8220;0&#8221;<br /> </font>

9. Add the same lines to the VMware Configuration of Cluster Node B.

10. Start VMware Workstation and start Cluster Node A. Configure the new disks as Basic disks, format them with NTFS and assign drive letters.

11. Start Cluster Node B and assign the same drive letters to the same disks.

12. Configure a new cluster with the Operating System.

13. Install your favourite cluster aware software, such as Exchange Server.