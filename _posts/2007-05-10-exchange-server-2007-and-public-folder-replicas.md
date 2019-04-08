---
id: 44
title: Exchange Server 2007 and Public Folder Replicas
date: 2007-05-10T23:39:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/exchange-server-2007-and-public-folder-replicas
permalink: /exchange-server-2007-and-public-folder-replicas/
views:
  - "1"
dsq_thread_id:
  - "195377913"
categories:
  - Microsoft
tags:
  - Exchange
  - PowerShell
---
<img class="alignleft" style="margin-left: 0px; margin-right: 10px;" src="https://stealthpuppy.com/wp-content/uploads/2007/05/exchange.png" alt="" width="82" height="82" align="left" />During a migration from Exchange Server 2003 to Exchange Server 2007 you need to add the Exchange 2007 server to replicas for each of the Public Folders (as you would need with any Exchange server migration) and this includes the System folders as well.

In our case I missed the SCHEDULE+ FREE BUSY folder. This resulted in Outlook 2003 clients unable to see Free/Busy information when creating a meeting request. The user would see this error in Outlook when attempting to see another users schedule:

> no free/busy information could be retrieved

In addition to this, the following error was logged on the Exchange Server:

> Event Type: Error  
> Event Source: MSExchangeFBPublish  
> Event Category: General  
> Event ID: 8207  
> Date: 8/05/2007  
> Time: 3:16:17 PM  
> User: N/A  
> Computer: EXCHSVR  
> Description:  
> Error updating public folder with free/busy information on virtual machine exchsrvr. The error number is 0x80004005.

After a bit of digging around, it occurred to me that I'd missed adding the new server to the Public Folder replicas. To add the replicas you will need to get the list of the sub-folders of the SCHEDULE+ FREE BUSY folder. You can see this list with this command (replace _exchsrvr_ with the name of your server):

[code]Get-PublicFolder -server exchsvr "non\_ipm\_subtreeSCHEDULE+ FREE BUSY" -recurse | Format-List[/code]

Then to add the replicas run these commands (you'll have to add your own server and organisation names):

[code]Set-PublicFolder -Identity "NON\_IPM\_SUBTREESCHEDULE+ FREE BUSYEX:/o=Company/ou=First Administrative Group" -Replicas "exchsrvrPublic Folder Database"  
Set-PublicFolder -Identity "NON\_IPM\_SUBTREESCHEDULE+ FREE BUSYEX:/o=Company/ou=Exchange Administrative Group (FYDIBOHF23SPDLT)" -Replicas "exchsrvrPublic Folder Database"[/code]

Once I did this and ran OUTLOOK.EXE /cleanfreebusy, so I didn't have to wait for the free/busy data to be published, all was well.