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
Over the past week, I&#8217;ve been creating an internal Exchange best practice/check list document so that we can standardise on how we configure Exchange serversÂ for our clients. This document includes a number of items including information on configuring AV scanners to exclude certain Exchange folders. I thought it best to provide the reader of this document direct links to knowledgebase articles on various AV products. I attempted to cover the following vendors:

  * Symantec;
  * Sophos;
  * McAfee;
  * Trend Micro; and
  * CA

Now finding this information was harder than I thought, the steps taken to find the relevant articles was not straightforward. First I had to find out the current product versions (I still can&#8217;t find a product version number for the Trend Micro AV), then I used each support site to search for the terms &#8216;exchange&#8217; and &#8216;mdbdata&#8217;. I used these terms because I knew that the \mdbdata folder is one of the folders to exclude. Here are the steps taken to find each document for each vendor. As you can see some are easier to find than others.

**Symantec  
** &#8211; Browse to [http://www.symantec.com](http://www.symantec.com/)  
&#8211; Click &#8216;Support&#8217;  
&#8211; Click &#8216;Get Enterprise Support&#8217;  
&#8211; Click &#8216;Symantec AntiVirus Corporate Edition 10.0&#8217; under the heading &#8216;Getting Started&#8217;  
&#8211; View the document &#8216;[How to prevent Symantec AntiVirus Corporate Edition from scanning the Microsoft Exchange directory structure](http://service1.symantec.com/SUPPORT/ent-security.nsf/docid/2005040513412648?OpenDocument&dtype=corp&src=ent_tutweb_nam?Open&dtype=corp&tdir=&tpre=&src=ent_tutweb_nam)&#8216;  
Score: 7<font size="4">Â½</font> /10

**Sophos  
** &#8211; Browse to [http://www.sophos.com](http://www.sophos.com/)  
&#8211; Click &#8216;Support&#8217;  
&#8211; Click &#8216;Knowledgebase&#8217;  
&#8211; Search for &#8216;exchange mdbdata&#8217;  
&#8211; View the document &#8216;[Sophos Anti-Virus for Windows: file exclusions for Microsoft Exchange Server 2000 and 2003](http://www.sophos.com/support/knowledgebase/article/2214.html)&#8216;  
Score: 7<font size="4">Â½</font> /10

**McAfee  
** &#8211; Browse to [http://www.mcafee.com](http://www.mcafee.com/)  
&#8211; Click &#8216;Enterprise&#8217;  
&#8211; Click &#8216;Support&#8217;  
&#8211; Click &#8216;Technical Support&#8217;  
&#8211; Click &#8216;KnowledgeBase Search&#8217;  
&#8211; Search for &#8216;exchange mdbdata&#8217;  
&#8211; View the document &#8216;[Solution ID kb38560 &#8211; Configuring VirusScan Enterprise exclusions on an Exchange 2000/2003 server running McAfee GroupShield Exchange](http://knowledgemap.nai.com/KanisaSupportSite/search.do?cmd=displayKCPopup&docType=kc&externalId=KBkb38560xml&sliceId=&dialogID=4606785)&#8216;  
Score: 7/10

**Trend Micro  
** &#8211; Browse to [http://www.trendmicro.com](http://www.trendmicro.com/)  
&#8211; Click &#8216;Support&#8217;  
&#8211; Search for &#8216;exchange mdbdata&#8217;  
&#8211; View the document &#8216;[Recommended exclusion list for OfficeScan 7.0 clients installed on a Microsoft Exchange 2003 server](http://kb.trendmicro.com/solutions/search/main/search/solutionDetail.asp?solutionID=25527&q=exchange+mdbdata&qp=&qt=exchange+mdbdata&qs=&r=4&c=25527&sort=0)&#8216;  
Score: 8/10

**CA**  
&#8211; Browse to [http://www.cai.com](http://www.cai.com/)  
&#8211; Click &#8216;Support&#8217;  
&#8211; Click &#8216;Technical Support&#8217;  
&#8211; Click &#8216;SupportConnect&#8217;  
&#8211; Click &#8216;Knowledge Base&#8217;  
&#8211; Search for &#8216;exchange mdbdata&#8217;  
&#8211; Hmmm.. two documents, nothing about Exchange and AV  
&#8211; Click &#8216;Knowledge Base&#8217;  
&#8211; Search for &#8216;exchange antivirus&#8217;  
&#8211; Hmmm.. Go through 3 pages of results with nothing related to my search  
&#8211; Click &#8216;Published Solutions&#8217;  
&#8211; Select &#8216;eTrust Antivirus All User versions Multi-platform&#8217;  
&#8211; Select &#8216;Release: 7.1&#8243;  
&#8211; Select &#8216;Operating System: WIN2003&#8217;  
&#8211; Click &#8216;Search&#8217;  
&#8211; Grrrr.. &#8216;No solutions were found that match your search criteria&#8217;  
&#8211; Click &#8216;Toolbox&#8217;  
&#8211; Arrghh.. Nothing  
&#8211; CA, you suck!  
&#8211; Browse to [http://www.symantec.com](http://www.symantec.com/)  
Score: 0/10