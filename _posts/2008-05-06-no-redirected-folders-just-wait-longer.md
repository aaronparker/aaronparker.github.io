---

title: No Redirected Folders? Just Wait Longer
date: 2008-05-06T22:01:30+10:00
author: Aaron Parker
layout: post

permalink: /no-redirected-folders-just-wait-longer/
categories:
  - Microsoft
tags:
  - Redirected Folders
  - Windows-Vista
---
No, [Ace Ventura](http://www.imdb.com/title/tt0109040/quotes) hasn't started writing knowledgebase articles, it's the advice given about an issue with redirected folders in Windows Vista and Windows Server 2008. I haven't seen this myself, but fortunately there's a better workaround than waiting 12 minutes.

[Folder redirection does not work correctly after you restart a computer that is running Windows Server 2008 or Windows Vista](http://support.microsoft.com/kb/951049)

The article has some detail about why this happens:

> Windows Server 2008 and Windows Vista use the Well-Known folders feature to determine the location of folders in the user profile. By using this feature, Windows redirects Well-Known folders to other locations as needed. Specifically, Windows Explorer queries the Well-Known folder GUID. This query returns the actual folder location, whether on a hard disk drive or on a remote server.
> 
> Windows Explorer optimizes Well-Known folder lookups by caching the Well-Known folders and their locations. Queries are performed against the cache, and the location is then returned to the application or to Windows Explorer.
> 
> When you use folder redirection, you receive the folder redirection settings from Group Policy. This process cannot occur unless the Workstation service has started. If the Workstation service has not started, the Well-Known folder cache is unavailable. This causes queries for redirected folder locations to fail. Additionally, the cache remains unavailable until the next update. By default, this cache is updated every 12 minutes (after the cache is first initialized and built during logon).