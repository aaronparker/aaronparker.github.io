---
id: 281
title: Support Site Woes
date: 2005-11-10T11:47:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/support-site-woes
permalink: /support-site-woes/
categories:
  - Applications
---
Over the past week, I've been creating an internal Exchange best practice/check list document so that we can standardise on how we configure Exchange serversÂ for our clients. This document includes a number of items including information on configuring AV scanners to exclude certain Exchange folders. I thought it best to provide the reader of this document direct links to knowledgebase articles on various AV products. I attempted to cover the following vendors:

  * Symantec;
  * Sophos;
  * McAfee;
  * Trend Micro; and
  * CA

Now finding this information was harder than I thought, the steps taken to find the relevant articles was not straightforward. First I had to find out the current product versions (I still can't find a product version number for the Trend Micro AV), then I used each support site to search for the terms 'exchange' and 'mdbdata'. I used these terms because I knew that the \mdbdata folder is one of the folders to exclude. Here are the steps taken to find each document for each vendor. As you can see some are easier to find than others.

**Symantec  
** - Browse to [http://www.symantec.com](http://www.symantec.com/)  
- Click 'Support'  
- Click 'Get Enterprise Support'  
- Click 'Symantec AntiVirus Corporate Edition 10.0' under the heading 'Getting Started'  
- View the document '[How to prevent Symantec AntiVirus Corporate Edition from scanning the Microsoft Exchange directory structure](http://service1.symantec.com/SUPPORT/ent-security.nsf/docid/2005040513412648?OpenDocument&dtype=corp&src=ent_tutweb_nam?Open&dtype=corp&tdir=&tpre=&src=ent_tutweb_nam)'  
Score: 7<font size="4">Â½</font> /10

**Sophos  
** - Browse to [http://www.sophos.com](http://www.sophos.com/)  
- Click 'Support'  
- Click 'Knowledgebase'  
- Search for 'exchange mdbdata'  
- View the document '[Sophos Anti-Virus for Windows: file exclusions for Microsoft Exchange Server 2000 and 2003](http://www.sophos.com/support/knowledgebase/article/2214.html)'  
Score: 7<font size="4">Â½</font> /10

**McAfee  
** - Browse to [http://www.mcafee.com](http://www.mcafee.com/)  
- Click 'Enterprise'  
- Click 'Support'  
- Click 'Technical Support'  
- Click 'KnowledgeBase Search'  
- Search for 'exchange mdbdata'  
- View the document '[Solution ID kb38560 - Configuring VirusScan Enterprise exclusions on an Exchange 2000/2003 server running McAfee GroupShield Exchange](http://knowledgemap.nai.com/KanisaSupportSite/search.do?cmd=displayKCPopup&docType=kc&externalId=KBkb38560xml&sliceId=&dialogID=4606785)'  
Score: 7/10

**Trend Micro  
** - Browse to [http://www.trendmicro.com](http://www.trendmicro.com/)  
- Click 'Support'  
- Search for 'exchange mdbdata'  
- View the document '[Recommended exclusion list for OfficeScan 7.0 clients installed on a Microsoft Exchange 2003 server](http://kb.trendmicro.com/solutions/search/main/search/solutionDetail.asp?solutionID=25527&q=exchange+mdbdata&qp=&qt=exchange+mdbdata&qs=&r=4&c=25527&sort=0)'  
Score: 8/10

**CA**  
- Browse to [http://www.cai.com](http://www.cai.com/)  
- Click 'Support'  
- Click 'Technical Support'  
- Click 'SupportConnect'  
- Click 'Knowledge Base'  
- Search for 'exchange mdbdata'  
- Hmmm.. two documents, nothing about Exchange and AV  
- Click 'Knowledge Base'  
- Search for 'exchange antivirus'  
- Hmmm.. Go through 3 pages of results with nothing related to my search  
- Click 'Published Solutions'  
- Select 'eTrust Antivirus All User versions Multi-platform'  
- Select 'Release: 7.1&#8243;  
- Select 'Operating System: WIN2003'  
- Click 'Search'  
- Grrrr.. 'No solutions were found that match your search criteria'  
- Click 'Toolbox'  
- Arrghh.. Nothing  
- CA, you suck!  
- Browse to [http://www.symantec.com](http://www.symantec.com/)  
Score: 0/10