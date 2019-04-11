---
id: 1407
title: App-V 4.6 Released
date: 2010-02-22T20:33:45+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/app-v-4-6-released
permalink: /app-v-4-6-released/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195382205"
enclosure:
  - |
    http://download.microsoft.com/download/C/C/4/CC49D1B1-DCDE-4F03-8A28-B11D0949A672/Use_Dynamic_Suiting.wmv
    5466685
    video/x-ms-wmv
    
categories:
  - Microsoft
tags:
  - App-V
---
Microsoft Application Virtualisation 4.6 (RTM) has been made available, which you can download from the Microsoft Download Centre, including some new and updated support tools:

[Microsoft Application Virtualization for Remote Desktop Services 4.6](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=e633164f-9729-43a8-9149-de651944a7fe) - Here you can download an ISO that includes the App-V client for RDS/Terminal Server. The ISO includes the server components as well. You will need a TechNet, MSDN subscription or [access to the Microsoft Licensing site](http://blogs.technet.com/virtualworld/archive/2008/09/15/how-to-download-app-v-4-5-rtm.aspx) to get access to the desktop client (as of writing, it does not appear to be available yet).

[Microsoft Application Virtualization Administrative Template (ADM Template)](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=67cdf9d2-7e8e-4d76-a552-fd82dbbff9bc) – An additional template has been created to support the 64-bit client and includes one additional policy (setting the virtual drive letter).

[Application Virtualization MSI Compat Transform](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=c704efef-06f0-4b76-97a9-67df1d161ffb) – This includes a transform file that you must run against an App-V 4.5 generated MSI to make it compatible with the 4.6 client.

[Application Virtualization Application Listing Tool](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=5da48313-cf6d-445d-af97-594f194ac759) – This tool will give you information on running virtual applications, which looks like this:

<img style="display: inline; border-width: 0px;" title="ListApps" src="https://stealthpuppy.com/media/2010/02/ListApps.png" border="0" alt="ListApps" width="660" height="292" /> 

[Microsoft Application Virtualization SFT View](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=26d8bfe3-02dd-4073-95f8-594bbb12933a) – SFT View loads a driver that automatically mounts SFT files as read-only folders (you will see a corresponding .dir folder for each SFT). This is an easy way to see into the SFT file and might be useful for performing virus scanning if the tool was installed on the servers hosting your Content share.

[<img style="display: inline; border-width: 0px;" title="SFTDir" src="https://stealthpuppy.com/media/2010/02/SFTDir_thumb.png" border="0" alt="SFTDir]({{site.baseurl}}/media/2010/02/SFTDir.png)

[Application Virtualization Client Log Parser Utility](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=72876c60-3a87-4705-b722-f73eb56219bf) – This tools has been previously available and is an excellent troubleshooting resource. You can find some information on using this tool here [Getting to Grips with the App-V Client Log Parser Utility (Launch Times)](http://blogs.technet.com/virtualworld/archive/2009/04/20/getting-to-grips-with-the-app-v-client-log-parser-utility-launch-times.aspx) and here [Getting to Grips with the App-V Client Log Parser Utility (Error Codes)](http://blogs.technet.com/virtualworld/archive/2009/04/20/getting-to-grips-with-the-app-v-client-log-parser-utility-error-codes.aspx)

[Application Virtualization Cache Configuration Tool](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=5e7089fa-c6ab-4150-8562-3b5bc14cd881) – If you need to change the client cache size post install, this is the tool to automate that process with.

<img style="display: inline; border-width: 0px;" title="CacheSize" src="https://stealthpuppy.com/media/2010/02/CacheSize.png" border="0" alt="CacheSize" width="660" height="203" /> 

[Application Virtualization Dynamic Suite Composition Tool](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=daa898df-455f-438a-aa2a-421f05894098) – Not much looks to have changed with this tool. Use it to create package dependencies without have to edit an OSD file. There’s an example of how the tool is used in [this video](http://download.microsoft.com/download/C/C/4/CC49D1B1-DCDE-4F03-8A28-B11D0949A672/Use_Dynamic_Suiting.wmv).

[Application Virtualization SFT Parser Tool](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=e5a7db27-304b-4cd1-9c80-7ba5fdaea97f) – This command-line tool can generate quite a lot of information about an SFT file and would be useful for some in-depth troubleshooting; however if you want to look into the SFT file to get information on it, you can go past [SFT Explorer](http://www.virtualapp.net/sft-explorer.html). There’s also a small bug in SFT Parser – the –H switch doesn’t work, so help from the command-line just isn’t there.

The most glaring omission from the tools supplied by the App-V team, is a utility to view what’s inside the users’ PKG file (to see what’s inside the virtualised profile). Fortunately, Kalle Saunamäki is hard at work on his own tool, which you can read about here: [What's stored in my PKG files?](http://www.virtualisointi.fi/en/archives/193)