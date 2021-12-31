---

title: Scheduling Reboots for the Access Gateway
date: 2006-08-25T07:01:00+10:00
author: Aaron Parker
layout: post

permalink: /scheduling-reboots-for-the-access-gateway/
categories:
  - Citrix
tags:
  - Access-Gateway
---
[Martijn Kools](http://www.brianmadden.com/forum/showProfile.aspx?memid=2688) has very kindly let me repost his instructions for enabling SSH on the Access Gateway and scheduling a reboot. WARNING: This is a totally unsupported method for enabling SSH. Be sure to have a backup of the config of the AG and access to the Access Gatway CD to be able to perform a reinstall if required.

  1. Download a Linux Live CD such as [Ubuntu](http://www.ubuntu.com/download) or [Knoppix](http://www.knopper.net/knoppix/index-en.html). These instructions are based on Ubuntu.
  2. Boot the Access Gateway from the CD and choose the Safe VGA option.
  3. Once the machine has booted into the environment, open a Terminal window and enter a password for root:

`sudo password root`

  1. Now sudo to give yourself root access

`su`

  1. Create a directory in which to mount the Access Gateway filesystem:

`mkdir /cag`

  1. Mount the filesystem. If this is successful you should be able to list the contents of the appliances' filesystem:

`mount /dev/sda1 /cag`

  1. To make changes to the system we need to change the root to /cag via:

`chroot /cag`

  1. Run `setup` and change the firewall settings from 'high' to 'disabled'.
  2. Go to system services, deselect 'iptables', make sure sshd and xinetd are selected, and press quit to save changes.
  3. Now run the SSH daemon to generate the key pairs:

`/etc/init.d/sshd`

  1. Exit the chroot environment and then unmount the CAG file system:

`umount /cag`

  1. Reboot the Access Gateway and use [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) to log into the applicance via SSH.

Now that SSH is enabled, we can schedule a reboot of the Access Gateway.

  1. SSH into the Access Gateway enable a cron job via crontab

`crontab -e`

  1. This will open the crontab file in vi. Insert a line by pressing 'i'.
  2. Enable a reboot by entering the following:

`0<tab>0<tab>*<tab>*<tab>*<tab>reboot`

The first 0 displays the minute the command is being executed (0-59), the second 0 is the hour the command is executed (0-23), the first \* is the day of the month (1-31), the second \* is the month (1-12), the third * is the day of the week (0-6, sunday=0). So in this case the Access Gateway will reboot at 2am everyday.

  1. Press Esc to leave insert mode and then :wq and Enter to save the changes and quit.

Citrix have a hotfix available to enable SSH which should be supported. I will post more information once I can get a hold of this hotfix.