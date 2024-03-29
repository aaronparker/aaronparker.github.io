---

title: Reducing the size of App-V packages
date: 2011-09-25T22:30:07+10:00
author: Aaron Parker
layout: post

permalink: /reducing-the-size-of-app-v-packages/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "425658905"
categories:
  - Applications
tags:
  - App-V
---
If you're looking to reduce the size of your App-V packages, you can compress them when saving them in the Sequencer; however if that content in the package doesn't actually compress that well, you may not save as much space as you might expect. Here a quick win to reduce the size of your packages.

In this post I'm using Office Professional 2010 as an example, where I've reduce the size of the package from potentially 2.8GB (uncompressed) to 606Mb (compressed). This screenshot shows a default install left uncompressed:

![Package-Uncompressed]({{site.baseurl}}/media/2011/09/Package-Uncompressed.png)

The default Office installation caches a copy of the Office installation files in the `C:\Windows\Installer` and the _[MSOCache](http://support.microsoft.com/kb/825933)_ folders. These folders are generally required when installing Office so that repair operations can take place and features can be added post-installation. However when [virtualizing Office](http://support.microsoft.com/kb/983462), we won't want either of those actions taking place – we want consistency and predictability. So when capturing Office with the Sequencer, we configure setup and run applications to ensure they don't occur.

This then leaves us with a large amount of data in the package that will never be used at execution time, but will most likely still be streamed to each client – waste of disk space and bandwidth. Only when it comes time to update the package do we need those folders.

So instead of leaving them in the package, we could exclude them from the sequencer and copy them out of the Sequencing machine and save them with the package. The process would look something like this:

  1. Add an exclusion to your package for _%CSIDL_WINDOWS%\Installer_ and _C:\MSOCache_ or _%SFT_MNT%\MSOCache_ if you are sequencing Office
  2. Sequence your application and save the package with compression enabled
  3. Save the package to the Content share along with a copy of C:\Windows\Installer and MSOCache, if you are sequencing Office
  4. When it comes time to update the package, copy the folders back into the sequencing machine before starting the sequencing process
  5. Repeat the process once you've saved the updated package

The same Office 2010 package is now 606Mb - 22% of the size of the original package:

![Office2010-After]({{site.baseurl}}/media/2011/09/Office2010-After.png)
