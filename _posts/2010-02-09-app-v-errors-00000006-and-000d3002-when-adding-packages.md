---

title: App-V Errors 00000006 and 000D3002 When Adding Packages
date: 2010-02-09T17:34:06+10:00
author: Aaron Parker
layout: post

permalink: /app-v-errors-00000006-and-000d3002-when-adding-packages/
aktt_notify_twitter:
  - 'yes'
aktt_tweeted:
  - "1"
dsq_thread_id:
  - "195382165"
categories:
  - Applications
tags:
  - App-V
---
I’m unsure if this is a bug or by design, but if you are using SFTMIME to add packages to an App-V client, you may receive the following error:

> The handle is invalid.
> 
> Error code: 460579-23C02532-00000006

Which looks something like this:

![HandleIsInvalid]({{site.baseurl}}/media/2010/02/HandleIsInvalid.png)

The issue is in the path to the manifest XML file for the package – when executing the command like this, I’ll see the error every time:

```
SFTMIME ADD PACKAGE:"Microsoft_Office_2010_x64_084154.001" /MANIFEST "\\VBOXSVR\Packages\Microsoft Office\2010_x64&#92;&#48;00\Microsoft_Office_2010_x64_084154.001_manifest.xml" /OVERRIDEURL "\\VBOXSVR\Packages\Microsoft Office\2010_x64&#92;&#48;00\Microsoft_Office_2010_x64_084154.001.sft" /GLOBAL /CONSOLE
```

Can’t see the the problem? The command certainly looks like it should work. An entry in the log file sheds light on the issue:

> [02/09/2010 17:23:57:638 INTF VRB] {tid=AB0:usr=Admin}  
> SWCreatePackage(name='Microsoft_Office_2010_x64_084154.001&#8242;, manifest='\VBOXSVR\Packages\Microsoft Office\2010_x64\000\Microsoft_Office_2010_x64_084154.001_manifest.xml')

The first backslash is truncated, leave the UNC path incorrect. The same happens for the path to the SFT file – again the log file shows what’s going on:

> [02/09/2010 17:21:07:936 JGSW ERR] {hap=20:app=Microsoft Word 2010 (Beta) 084154.001:tid=9D8:usr=Admin}  
> The Application Virtualization Client could not connect to a server because the URL specified, '\VBOXSVR\Packages\Microsoft Office\2010_x64\000\Microsoft_Office_2010_x64_084154.001.sft', was invalid (rc 04300507-000D3002).

When attempting to stream the package, the operation fails and the following error is displayed:

> The Application Virtualization Client could not launch Microsoft Word 2010 (Beta) 084154.001.The protocol specified in the OSD file is not supported. Report the following error code to your System Administrator.Error code: 460579-04300507-000D3002

Which looks like this:

![Error-000D3002]({{site.baseurl}}/media/2010/02/Error000D3002.png)

Thankfully a workaround is very easy to implement – just add an extra backslash to each path:

```
SFTMIME ADD PACKAGE:"Microsoft_Office_2010_x64_084154.001" /MANIFEST "\\\VBOXSVR\Packages\Microsoft Office\2010_x64&#92;&#48;00\Microsoft_Office_2010_x64_084154.001_manifest.xml" /OVERRIDEURL "\\\VBOXSVR\Packages\Microsoft Office\2010_x64&#92;&#48;00\Microsoft_Office_2010_x64_084154.001.sft" /GLOBAL /CONSOLE
```

The `ADD PACKAGE` command will then work and the package will stream correctly.
