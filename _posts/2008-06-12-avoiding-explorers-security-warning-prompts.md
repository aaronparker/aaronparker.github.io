---
id: 577
title: 'Avoiding Explorer&rsquo;s Security Warning Prompts'
date: 2008-06-12T22:03:25+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/windows/avoiding-explorers-security-warning-prompts
permalink: /avoiding-explorers-security-warning-prompts/
dsq_thread_id:
  - "195380695"
categories:
  - Microsoft
---
Windows XP Service Pack 2 and Windows Server 2003 Service Pack 1 made some changes to the way Windows handles specific file types opened or downloaded from certain locations, which results in Open File – Security Warning prompts like these:

<img title="SecurityWarning" src="{{site.baseurl}}.com/media/2008/06/securitywarning.png" border="0" alt="SecurityWarning" width="579" height="268" /> 

Quite often users see these prompts in environments where files are opened from UNC paths (think mapped drives or redirected folders) on [Distributed File System](http://technet2.microsoft.com/windowsserver2008/en/library/1f0d326d-35af-4193-bda3-0d1688f90ea71033.mspx?mfr=true) namespaces. If you have this scenario (which I think you should be) because you are doing something like [redirecting Start Menus]({{site.baseurl}}/terminal-server/building-dynamic-start-menus-with-access-based-enumeration), you can disable these prompts for your internal network locations.

Ideally you would do this by deploying specific Intranet zone settings (as in the screenshots below) or adding your internal sites to the Intranet zone via a script, Group Policy (Preferences or Internet Explorer Maintenance) or your tool of choice.

<img title="LocalIntranet1" src="{{site.baseurl}}.com/media/2008/06/localintranet1.png" border="0" alt="LocalIntranet1" width="357" height="210" /><img title="LocalIntranet2" src="{{site.baseurl}}.com/media/2008/06/localintranet2.png" border="0" alt="LocalIntranet2" width="341" height="302" />  

There’s a heap of information on how this stuff works at these links:

  * [Description of how the Attachment Manager works in Windows XP Service Pack 2](http://support.microsoft.com/kb/883260).
  * [Configure the Attachment Manager in Windows XP SP2](http://smallvoid.com/article/ie-attachment-manager.html)
  * [Intranet site is identified as an Internet site when you use an FQDN or an IP address](http://support.microsoft.com/kb/303650)
  * You might even need to look into [this hotfix](http://support.microsoft.com/kb/941001), [this hotfix](http://support.microsoft.com/kb/941000) or even [this hotfix](http://support.microsoft.com/kb/929798) if things aren’t working as expected.

But all of that is not really the point of this post. I [stumbled across a really simple method](http://support.microsoft.com/kb/889815) of telling Windows to avoid those checks and just open the files – create the environment variable **SEE\_MASK\_NOZONECHECKS** and set it to 1. You can set this as system environment variable but it appeared to be a little more consistent if set as a user environment variable. Not recommended for wide scale deployment but useful none the less.