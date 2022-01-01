---

title: How to Move a Storage Group in a Cluster Continuous Replication Environment
date: 2007-05-30T15:44:01+10:00
author: Aaron Parker
layout: post

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
TechNet has an article on [moving the database and log file paths for a Storage Group](http://technet.microsoft.com/en-us/library/aa996391.aspx) in an Exchange cluster running in a Cluster Continuous Replication environment, however it's missing a couple of steps which are fairly important to the process.

If you attempt to move the database or log file locations on a clustered Exchange Server 2007 server you will receive the following error:

> Error:  
> This operation cannot be performed on a remote server or a clustered mailbox server in a cluster continuous replication environment. Please use the -ConfigurationOnly option and then manually move the files.  
> Parameter name: ConfigurationOnly
> 
> Exchange Management Shell command attempted:  
> move-StorageGroupPath -Identity 'exchsrvrSecond Storage Group' -LogFolderPath 'G:\Program Files\Microsoft\Exchange Server\Mailbox\First Storage Group'

To move the file locations then you will have to change the configuration and move the files manually on both nodes, even though the page on TechNet indicates the command will move the files automattically. Here's how I went through this process on a live system to move the log files.

In this example the server name is **exchsrvr** and the storage group name is **First Storage Group**. I'm moving the log files from `F:\Program Files\Microsoft\Exchange Server\Mailbox\First Storage Group` to `G:\Program Files\Microsoft\Exchange Server\Mailbox\First Storage Group`. All of these commands are run in the Exchange Management Shell.

On the Active node **or** the Passive node, suspend the copy of the storage group:

```powershell
Suspend-StorageGroupCopy -Identity:'exchsrvrFirst Storage Group'
```

On the **Active** node, dismount the database (or databases) in the storage group:

```powershell
Dismount-Database -"Identity:'exchsrvrFirst Storage GroupMailbox Database'
```

On the **Active** node modify the configuration of the storage group to use the new path for the log files:

```powershell
Move-StorageGroupPath -"Identity:'exchsrvrFirst Storage Group' -LogFolderPath:'G:Program FilesMicrosoftExchange ServerMailboxFirst Storage Group' -ConfigurationOnly
```

On the Active **and** Passive nodes, create the new folders to store the log files:

```powershell
MD "G:Program FilesMicrosoftExchange ServerMailboxFirst Storage Group"
```

On the Active **and** Passive nodes, move the log files to the new location. (The prefix for the log files for this storage group is E0):  

```powershell
Move "F:Program FilesMicrosoftExchange ServerMailboxFirst Storage GroupE0\*.\*" "G:Program FilesMicrosoftExchange ServerMailboxFirst Storage Group"
```

On the **Active** node, mount the database:

```powershell
Mount-database -"identity:'exchsrvrFirst Storage GroupMailbox Database'
```

On the Active **or** Passive nodes, resume the storage group copy process:

```powershell
Resume-StorageGroupCopy -Identity:'exchsrvrFirst Storage Group'
```

The process was surprisingly simple in the end, but it's easy to say that now that I've done it at least once.
