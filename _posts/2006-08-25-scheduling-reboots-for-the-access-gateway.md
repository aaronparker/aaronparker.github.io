---
id: 197
title: Scheduling Reboots for the Access Gateway
date: 2006-08-25T07:01:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/scheduling-reboots-for-the-access-gateway
permalink: /scheduling-reboots-for-the-access-gateway/
categories:
  - Citrix
tags:
  - Access-Gateway
---
<a href="http://www.brianmadden.com/forum/showProfile.aspx?memid=2688" target="_blank">Martijn Kools</a> has very kindly let me repost his instructions for enabling SSH on the Access Gateway and scheduling a reboot. WARNING: This is a totally unsupported method for enabling SSH. Be sure to have a backup of the config of the AG and access to the Access Gatway CD to be able to perform a reinstall if required.

  1. Download a Linux Live CD such as <a href="http://www.ubuntu.com/download" target="_blank">Ubuntu </a>or <a href="http://www.knopper.net/knoppix/index-en.html" target="_blank">Knoppix</a>. These instructions are based on Ubuntu.
  2. Boot the Access Gateway from the CD and choose the Safe VGA option.
  3. Once the machine has booted into the environment, open a Terminal window and enter a password for root:

<font face="courier new,courier">sudo password root</font>

  1. Now sudo to give yourself root access

<font face="courier new,courier">su</font>

  1. Create a directory in which to mount the Access Gateway filesystem:

<font face="courier new,courier">mkdir /cag</font>

  1. Mount the filesystem. If this is successful you should be able to list the contents of the appliances' filesystem:

<font face="courier new,courier">mount /dev/sda1 /cag</font>

  1. To make changes to the system we need to change the root to /cag via:

<font face="courier new,courier">chroot /cag</font>

  1. Run <font face="courier new,courier">setup</font> and change the firewall settings from 'high' to 'disabled'.
  2. Go to system services, deselect 'iptables', make sure sshd and xinetd are selected, and press quit to save changes.
  3. Now run the SSH daemon to generate the key pairs:

<font face="courier new,courier">/etc/init.d/sshd</font>

  1. Exit the chroot environment and then unmount the CAG file system:

<font face="courier new,courier">umount /cag</font>

  1. Reboot the Access Gateway and use <a href="http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html" target="_blank">PuTTY</a> to log into the applicance via SSH.

Now that SSH is enabled, we can schedule a reboot of the Access Gateway.

  1. SSH into the Access Gateway enable a cron job via crontab

<font face="courier new,courier">crontab -e</font>

  1. This will open the crontab file in vi. Insert a line by pressing 'i'.
  2. Enable a reboot by entering the following:

<font face="courier new,courier">0<tab>0<tab>*<tab>*<tab>*<tab>reboot</font>

The first 0 displays the minute the command is being executed (0-59), the second 0 is the hour the command is executed (0-23), the first \* is the day of the month (1-31), the second \* is the month (1-12), the third * is the day of the week (0-6, sunday=0). So in this case the Access Gateway will reboot at 2am everyday.

  1. Press Esc to leave insert mode and then :wq and Enter to save the changes and quit.

Citrix have a hotfix available to enable SSH which should be supported. I will post more information once I can get a hold of this hotfix.