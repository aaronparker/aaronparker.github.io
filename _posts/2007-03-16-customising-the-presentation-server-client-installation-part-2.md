---

title: Customising the Presentation Server Client Installation Part 2
date: 2007-03-16T19:42:00+10:00
author: Aaron Parker
layout: post

permalink: /customising-the-presentation-server-client-installation-part-2/
categories:
  - Automation
tags:
  - Presentation-Server
  - Unattended
---
In my previous article on [customising the Presentation Server Client](http://www.stealthpuppy.com/blogs/travelling/archive/2007/03/11/customising-the-presentation-server-client-installation.aspx), I outlined the steps required to make a custom package for deployment to your client machines. That just article covers creating the custom package using the packager, but there a few other customisations you might be interested in:

**Prepopulating PN.INI and APPSRV.INI**

If you are looking to preconfigure the client you will need to edit PN.SRC and APPSRV.SRC. To get to these files you will need to create an uncompressed custom client package. You will then find the files located in the `Program Files\Citrix\ICA Classic` folder below where you have created the package.

![]({{site.baseurl}}/media/2007/03/1000.14.1119.UncompressedClient.png)

You can then reference [PN.ini Parameters Deciphered](http://ctxex10.citrix.com/article/entry.jspa?entryID=876) and [Appsrv.ini Parameters Deciphered](http://ctxex10.citrix.com/article/entry.jspa?entryID=850) to make the required customisations. An alternative to this, is to configure Program Neighbourhood and then copy `PN.INI` and `APPSRV.INI` from the `%APPDATA%ICAClient` folder.

One thing you will have to note is that when you push out your custom client, if users already have an `PN.INI` and `APPSRV.INI` in their `%APPDATAICAClient` folder they will not be overwritten. So if you are looking to disable the Quick Launch bar and the Custom ICA Connections, these won't work unless you overwrite or modify the users ICAClient folder or the user has never run Program Neighbourhood.

If you are disabling the Quick Launch Bar and the Custom ICA Connections add the following lines to APPSRV.SRC:

```
PNQuickLaunchEnabled=No
PNQuickLaunchVisible=No
CustomConnectionsIconOff=Yes
```

NOTE: When users run Program Neighbourhood, you will have to have an Application Set defined so that they do not see the Custom ICA Connections, even though you may have disabled that feature.

**Recompressing the Uncompressed Client Package**

Once you have made your required modifications to the client, which could also be [branding the client](http://www.jasonconger.com/ShowPost.aspx?strID=03d6640a-0b46-457f-ae0d-bbe88d913bd8), you may want to recompress the image into a single Windows Installer file again:

  1. Create your custom client package as an uncompressed image.
  2. Make the required modifications.
  3. Run `MSIEXEC /A ICA32PKG.MSI` again this time using the modified client package installer.
  4. Choose to create a Single Windows Installer package. You should notice that the only option that hasn't stuck from the original custom client package is the client type. You will have to modify this again.
  5. Finish the client packager wizard saving the client to a new empty folder and you should be left with your customised and single Windows Installer client package.

**Enabling Pass-Through Authentication when deploying via Group Policy**

When deploying the client via Group Policy, there's a good chance that you'll find that pass-through authentication will be disabled even though you've disabled it. Although I've never seen this issue myself, [Jason Conger addresses the issue](http://www.jasonconger.com/ShowPost.aspx?strID=87a0885c-a0f1-4b85-b28f-a25813ed8119) in his client deployment article and there is [a custom transform file available from Citrix](http://support.citrix.com/article/entry.jspa?entryID=3936) to ensure that pass-through authentication is enabled. Here's an explanation of the issue from Citrix:

> **Issue**  
> When using a Microsoft Group Policy to automatically distribute/install the MetaFrame Presentation Server Client for 32-bit Windows to users, pass-through authentication is disabled.
> 
> **Details**  
> This is by design.  
> Starting with the release of the Version 7.0 32-bit Clients that shipped with Feature Release 3/Service Pack 3 and all future releases, additional security was added to prohibit non-administrative users from installing single sign-on.
> 
> **Workaround  
>** Citrix is providing a Windows Installer Transform File, Slfregfix.mst, so that administrators may bypass the imposed security restriction.

Unfortunately the transform file provided by Citrix doesn't work with the Presentation Server Client 10, so I've recreated it to work with version 10. Here's the file for you to download and test in your own environment. Just a quick word of warning - I've only performed some very quick testing at this stage. Before you use this, test it out to ensure it works for you in your network.

[Transform to enable Pass-through authentication]({{site.baseurl}}/media/2007/03/slfregfix2.mst)
