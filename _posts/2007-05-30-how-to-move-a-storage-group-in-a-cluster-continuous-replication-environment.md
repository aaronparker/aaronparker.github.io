---
id: 249
title: How to Move a Storage Group in a Cluster Continuous Replication Environment
date: 2007-05-30T15:44:01+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/exchange/how-to-move-a-storage-group-in-a-cluster-continuous-replication-environment
permalink: /how-to-move-a-storage-group-in-a-cluster-continuous-replication-environment/
dsq_thread_id:
  - "195379013"
categories:
  - Microsoft
tags:
  - Cluster
  - Exchange
  - PowerShell
---
<img src="http://stealthpuppy.com/wp-content/uploads/2007/05/exchange2.png" align="left" />TechNet has an article on [moving the database and log file paths for a Storage Group](http://technet.microsoft.com/en-us/library/aa996391.aspx) in an Exchange cluster running in a Cluster Continuous Replication environment, however it&#8217;s missing a couple of steps which are fairly important to the process.

If you attempt to move the database or log file locations on a clustered Exchange Server 2007 server you will receive the following error:

> Error:  
> This operation cannot be performed on a remote server or a clustered mailbox server in a cluster continuous replication enviornment. Please use the -ConfigurationOnly option and then manually move the files.  
> Parameter name: ConfigurationOnly
> 
> Exchange Management Shell command attempted:  
> move-StorageGroupPath -Identity &#8216;exchsrvrSecond Storage Group&#8217; -LogFolderPath &#8216;G:Program FilesMicrosoftExchange ServerMailboxFirst Storage Group&#8217;

To move the file locations then you will have to change the configuration and move the files manually on both nodes, even though the page on TechNet indicates the command will move the files automattically. Here&#8217;s how I went through this process on a live system to move the log files.

In this example the server name is **exchsrvr** and the storage group name is **First Storage Group**. I&#8217;m moving the log files from **F:Program FilesMicrosoftExchange ServerMailboxFirst Storage Group** to **G:Program FilesMicrosoftExchange ServerMailboxFirst Storage Group**. All of these commands are run in the Exchange Management Shell.

On the Active node **or** the Passive node, suspend the copy of the storage group:  
[code]Suspend-StorageGroupCopy -Identity:&#8217;exchsrvrFirst Storage Group'[/code]  
On the **Active** node, dismount the database (or databases) in the storage group:  
[code]Dismount-Database -"Identity:&#8217;exchsrvrFirst Storage GroupMailbox Database'[/code]  
On the **Active** node modify the configuration of the storage group to use the new path for the log files:  
[code]Move-StorageGroupPath -"Identity:&#8217;exchsrvrFirst Storage Group&#8217; -LogFolderPath:&#8217;G:Program FilesMicrosoftExchange ServerMailboxFirst Storage Group&#8217; -ConfigurationOnly[/code]  
On the Active **and** Passive nodes, create the new folders to store the log files:  
[code]MD "G:Program FilesMicrosoftExchange ServerMailboxFirst Storage Group"[/code]  
On the Active **and** Passive nodes, move the log files to the new location. (The prefix for the log files for this storage group is E0):  
[code]Move "F:Program FilesMicrosoftExchange ServerMailboxFirst Storage GroupE0\*.\*" "G:Program FilesMicrosoftExchange ServerMailboxFirst Storage Group"[/code]  
On the **Active** node, mount the database:  
[code]Mount-database -"identity:&#8217;exchsrvrFirst Storage GroupMailbox Database'[/code]  
On the Active **or** Passive nodes, resume the storage group copy process:  
[code]Resume-StorageGroupCopy -Identity:&#8217;exchsrvrFirst Storage Group'[/code]  
The process was surprisingly simple in the end, but it&#8217;s easy to say that now that I&#8217;ve done it at least once.