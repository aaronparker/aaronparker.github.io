---

title: The Ten Commandments of Exchange Server
date: 2006-08-25T06:09:00+10:00
author: Aaron Parker
layout: post

permalink: /the-ten-commandments-of-exchange-server/
categories:
  - Microsoft
tags:
  - Exchange
---
After performing two Exchange disaster recoveries in as many months, I've come up with a list of ~~Fifteen~~ Ten Commandments for Exchange Server 😉

  1. Thou shalt not place the log files and databases on the same physical disks
  2. Thou shalt not store the log files or the databases on the system partition
  3. Thou shalt use redundant paths to the SAN on which the logs files or databases are stored
  4. Thou shalt not use a domain administrator account to backup the information stores or mailboxes
  5. Thou shalt not run the backup server services as the domain Administrator
  6. Thou shalt not run Exchange Server on a domain controller if thou wishest to recover the server quickly
  7. Thou shalt run full backups to flush the Exchange log files and commit them to the database
  8. Thou shalt use the Exchange Server Best Practices Analyser tool
  9. Thou shalt run an application level firewall to protect Outlook Web Access
 10. Thou shalt not covet thy neighbour's Lotus Notes server
