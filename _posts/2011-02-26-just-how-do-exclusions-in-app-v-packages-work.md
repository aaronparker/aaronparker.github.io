---

title: Just how do Exclusions in App-V packages work?
date: 2011-02-26T01:27:51+10:00
author: Aaron Parker
layout: post

permalink: /just-how-do-exclusions-in-app-v-packages-work/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "240413819"
categories:
  - Applications
tags:
  - App-V
---
Exactly how do folder and Registry exclusions work in App-V? I had presumed that exclusions for both folder and Registry paths would carry over to package execution. This is something that I had made some assumptions about and it’s only recently that I looked into exclusions in detail to get a better understanding.

I’ve spent some time working out how folder and Registry exclusions and Merge/Override settings impact the package at runtime and this post is based on my findings. Although I believe that the details in this post are correct, I recommend testing out these behaviours for yourself.

## Why Exclude?

When virtualising an application, we may need to avoid capturing specific paths for several reasons:

  * Reduce the size of the package (installers often put files down that aren’t required for an application to execute, such as cached setup files)
  * Prevent conflicts with data already on the client (preventing a virtualised view of specific paths so that a virtualised application does not see different data to application running outside of App-V)
  * When running an operating system component such as Internet Explorer inside the bubble, we may want to ensure that the application sees the same data inside and outside the bubble

## Exclusions Apply at Sequencing Time Only

Exclusions are only used to prevent certain paths from being captured during sequencing; it does not necessarily mean that those paths will then _not_ be virtualised at runtime.

Understanding how an application interacts with the operating system and other applications is important for knowing which paths to add as exclusions. In most cases if a path exists both inside and outside of the package it won’t affect execution; however depending on your requirements, some locations should never appear inside the virtual environment.

These paths might include, but are not limited to:

  * MAPI profiles (the Windows Messaging Subsystem key)
  * Printers (stored in the HKCU\Printers)
  * ODBC connections (stored in HKCU\Software\ODBC)
  * Windows 7 Libraries (%APPDATA%\Microsoft\Windows\Libraries)

I’ll discuss some of these in more detail later.

## Creating a Package for Testing

To perform some tests and to illustrate what happens during sequencing and execution, I’ve created a very simple package that contains some Registry keys and folders. I turned the following script into an App-V package:

```cmd
REG ADD "HKEY\_CURRENT\_USER\Software\MergeTest1" /v InsideTheBubble /t REG_SZ /d "True"  
REG ADD "HKEY\_CURRENT\_USER\Software\MergeTest1\Key" /v InsideTheBubble /t REG_SZ /d "True"  
REG ADD "HKEY\_CURRENT\_USER\Software\MergeTest2" /v InsideTheBubble /t REG_SZ /d "True"  
REG ADD "HKEY\_CURRENT\_USER\Software\MergeTest3" /v InsideTheBubble /t REG_SZ /d "True"  
MD "%APPDATA%\MyApplication1"  
MD "%APPDATA%\MyApplication2\InsideSub-folder"  
ECHO txt > "%APPDATA%\MyApplication1\InsideTheBubble.txt"  
ECHO txt > "%APPDATA%\MyApplication2\InsideTheBubble.txt"  
ECHO txt > "%APPDATA%\MyApplication2\InsideSub-folder\InsideTheBubble.txt"
```

## How the Virtual File System interacts with the Real File System

Excluded folder paths in an App-V package works just the way you would expect – the folder is not captured in the package. I then may choose to control how the folder is handled at execution time by setting the path to Override the Local Directory (preventing the package from see the real file system) or Merge with the Local Directory (the application sees a merged view of the virtual and real file systems).

In my example package I’ve added the path _%APPDATA%\MyApplication2\InsideSub-folder_ as an exclusion. In the screenshot below, you can see that the parent folder _%APPDATA%\MyApplication2_ was captured but _InsideSub-folder_ was not:

![AppV]({{site.baseurl}}/media/2011/02/VFSMerge3.png)

To perform some specific testing at execution time, I’ve then set this folder to _Merge with Local Directory_. Let’s see what happens on the client:

On the real file system I’ve created the folder _%APPDATA%\MyApplication2._ The screenshot below shows a directory listing outside of the bubble:

![AppV]({{site.baseurl}}/media/2011/02/vfs1.png)

If I see the same %APPDATA% location within the package I should see the merged view of _%APPDATA%\MyApplication2:_

![AppV]({{site.baseurl}}/media/2011/02/vfs2.png)

If I create a sub-folder of the MyApplication2 folder:

![AppV]({{site.baseurl}}/media/2011/02/vfs3.png)

I can see that the sub-folder has fallen through the virtual environment to the real file system:

![AppV]({{site.baseurl}}/media/2011/02/vfs4.png)

I can also create a file or folder outside of those paths that were captured during sequencing and any path marked _Override Local Directory_ and they will be created in the real file system. In this package %APPDATA% was not captured during sequencing, so I can create a sub-folder (or file):

![AppV]({{site.baseurl}}/media/2011/02/vfs5.png)

That is written to the real file system:

![AppV]({{site.baseurl}}/media/2011/02/vfs6.png)

**Bottom line**: Exclusions ensure specified file data isn’t captured at sequencing time and Merge with Local means that anything that doesn’t already exist in the package will be written to the real file system. So file system virtualization is straight-forward and for the most part works the way we would expect.

## How the Virtual Registry interacts with the Real Registry

The virtual Registry is quite different to the virtual file system – writes to the Registry at execution time will always end up in the virtual Registry. In my example package I have several Registry keys: _HKCU\Software\MergeTest1_ and _HKCU\Software\MergeTest2_, while _HKCU\Software\MergeTest3_ was excluded. The key _HKCU\Software\MergeTest2_ has been configured for Merge with the Local Key.

On the client in the real Registry I’ve created _HKCU\Software\MergeTest2_ with a value (OutsideTheBubble) inside it:

![AppV]({{site.baseurl}}/media/2011/02/vrg1.png)

Within the virtual Registry I can create other keys at the same levels MergeTest1 and MergeTest2 (MergeTest3) and I can make an edit to a value that exists outside of the virtual Registry.

![AppV]({{site.baseurl}}/media/2011/02/vrg2.png)

All of these changes have been captured inside the virtual Registry. This means that while I get a merged view of the virtual and real Registry’s, any changes made by the virtual application will only persist inside the virtual registry. Here’s a look again at the real Registry after I’ve closed the virtual application:

![AppV]({{site.baseurl}}/media/2011/02/vrg3.png)

When you take a closer look at a package, you’ll start to see why this is the case. In this screenshot you can see that the Registry root (REGISTRY) is set to _Merge with Local Key_.

![AppV]({{site.baseurl}}/media/2011/02/VRGMerge3.png)

**Bottom line**: Exclusions ensure specified Registry data isn’t captured at sequencing time and Merge with Local, means just that: merge with any existing local keys; however _any_ new writes to the Registry will be captured in the virtual Registry (a copy on write action).

In the majority of scenarios the behaviour of the virtual Registry is exactly the way we need it to be; however what happens if you absolutely, positively need a Registry write to make it into the real Registry? (i.e. how do you force an exclude at runtime?)

## Why write to the Real Registry?

I’ll draw on my earlier examples to explain why I would want a Registry write to make into the real Registry.

**MAPI profiles** (HKCU\Software\Microsoft\Windows NT\CurrentVersion\Windows Messaging Subsystem): your user environment management approach may necessitate managing MAPI profiles outside of the virtual environment. See the [Prescriptive guidance for sequencing Office 2010 in Microsoft App-V](http://support.microsoft.com/kb/983462) for different approaches to this key depending whether you are deploying to App-V 4.5 or 4.6.

**ODBC connections** (HKCU\Software\ODBC): virtualising ODBC connections can be useful; however if they connection can be edited in-application, then the changes would be saved to the user’s PKG file. If you are deploying ODBC connections with a tool such as Group Policy Preferences, you can’t deploy those changes inside a package, because GPP only applies before the application launches.

**Printers** (HKCU\Printers): the user could change their default printer inside an application via the print dialog – the application will have one default printer, while the system will see another default printer. This could be a good or bad consequence depending on how savvy your users are.

These are just a few examples and I’m sure there are plenty more.

## How to write to the Real Registry

The App-V client includes a Registry key at HKLM\SOFTWARE\Wow6432Node\Microsoft\SoftGrid\4.5\SystemGuard\Overrides with a couple of interesting values – _VirtualRegistryPassthrough_ and _VirtualRegistryPassthroughEx_.

VirtualRegistryPassthrough is used to allow a local process pass up into the virtual Registry. You can read more about this value in this knowledgebase article: [How to print to an Adobe PDF writer printer from SoftGrid-enabled applications](http://support.microsoft.com/kb/931191). Any detailed documentation beyond this article does not appear to be publically available.

The second value of interest VirtualRegistryPassthroughEx, can be used in the opposite way. It can be used to ensure a specific key will always pass through to the real Registry. [A web search draws a complete blank on this one](http://www.google.com/search?hl=en&source=hp&biw=1280&bih=699&q=VirtualRegistryPassthroughEx&btnG=Google+Search&aq=f&aqi=&aql=&oq=), so until Microsoft comes out with better documentation on TechNet, I recommend testing this value carefully.

There are a couple of caveats with this approach:

1. You must ensure that the key or keys that you want to pass through to the real Registry do _not_ exist inside your App-V package but they should be created in the real Registry. In fact, the key must be initially created outside of the package – you won’t be able to create the key at execution time inside the virtual Registry.

2. This is a global setting; it can’t be used on a per-package basis.

VirtualRegistryPassthroughEx is a multi-string value (REG\_MULTI\_SZ) to which you add Registry keys to, one for each line. The default keys included here are:

  * HKEY\_LOCAL\_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\WINEVT
  * HKEY\_LOCAL\_MACHINE\System\CurrentControlSet\services\eventlog\Application
  * HKEY\_LOCAL\_MACHINE\SYSTEM\CurrentControlSet\Control\WMI\Autologger
  * HKEY\_CURRENT\_USER\Software\Microsoft\Windows\CurrentVersion\Internet Settings
  * HKEY\_LOCAL\_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Perflib

Add the key or keys that you want to exclude from the bubble. No restart is required for this to take effect.

![AppV]({{site.baseurl}}/media/2011/02/VirtualRegistryPassthroughEx.png)

In my example I’ve added HKEY\_CURRENT\_USER\Software\MergeTest3. I can now create values and sub-keys and be certain that they will end up in the real Registry.

## Where to from here?

The lack of available documentation on this setting deter you from using it; however based on my findings I’m reasonably confident in the way this works. I do recommend performing your own in-depth testing before using this to address challenges you may have with the virtual Registry.

In a related post I should have ready in a couple of weeks, I’ll post my list of recommended file system and Registry exclusions to add to your App-V projects before sequencing.
