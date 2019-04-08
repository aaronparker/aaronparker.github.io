---
id: 80
title: Customising the Presentation Server Client Installation Part 2
date: 2007-03-16T19:42:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/customising-the-presentation-server-client-installation-part-2
permalink: /customising-the-presentation-server-client-installation-part-2/
categories:
  - Automation
tags:
  - Presentation-Server
  - Unattended
---
In my previous article on [customising the Presentation Server Client](http://www.stealthpuppy.com/blogs/travelling/archive/2007/03/11/customising-the-presentation-server-client-installation.aspx), I outlined the steps required to make a custom package for deployment to your client machines. That just article covers creating the custom package using the packager, but there a few other customisations you might be interested in:

**Prepopulating PN.INI and APPSRV.INI**

If you are looking to preconfigure the client you will need to edit PN.SRC and APPSRV.SRC. To get to these files you will need to create an uncompressed custom client package. You will then find the files located in the <font face="courier new,courier">Program FilesCitrixICA Classic</font> folder below where you have created the package.

<img border="0" src="http://stealthpuppy.com/wp-content/uploads/2007/03/1000.14.1119.UncompressedClient.png" /> 

You can then reference [PN.ini Parameters Deciphered](http://ctxex10.citrix.com/article/entry.jspa?entryID=876) and [Appsrv.ini Parameters Deciphered](http://ctxex10.citrix.com/article/entry.jspa?entryID=850) to make the required customisations. An alternative to this, is to configure Program Neighbourhood and then copy PN.INI and APPSRV.INI from the <font face="courier new,courier">%APPDATA%ICAClient</font> folder.

One thing you will have to note is that when you push out your custom client, if users already have an PN.INI and APPSRV.INI in their <font face="courier new,courier">%APPDATAICAClient</font> folder they will not be overwritten. So if you are looking to disable the Quick Launch bar and the Custom ICA Connections, these won&#8217;t work unless you overwrite or modify the users ICAClient folder or the user has never run Program Neighbourghood.

If you are disabling the Quick Launch Bar and the Custom ICA Connections add the following lines to APPSRV.SRC:

<font face="courier new,courier">PNQuickLaunchEnabled=No<br /> PNQuickLaunchVisible=No<br /> CustomConnectionsIconOff=Yes</font>

<p class="important">
  NOTE: When users run Program Neighbourhood, you will have to have an Application Set defined so that they do not see the Custom ICA Connections, even though you may have disabled that feature.
</p>

**Recompressing the Uncompressed Client Package**

Once you have made your required modifications to the client, which could also be [branding the client](http://www.jasonconger.com/ShowPost.aspx?strID=03d6640a-0b46-457f-ae0d-bbe88d913bd8), you may want to recompress the image into a single Windows Installer file again:

  1. Create your custom client package as an uncompressed image.
  2. Make the required modifications.
  3. Run <font face="courier new,courier">MSIEXEC /A ICA32PKG.MSI</font> again this time using the modified client package installer.
  4. Choose to create a Single Windows Installer package. You should notice that the only option that hasn&#8217;t stuck from the original custom client package is the client type. You will have to modify this again.
  5. Finish the client packager wizard saving the client to a new emtpy folder and you should be left with your customised and single Windows Installer client package.

**Enabling Pass-Through Authentication when deploying via Group Policy**

When deploying the client via Group Policy, there&#8217;s a good chance that you&#8217;ll find that pass-through authentication will be disabled even though you&#8217;ve disabled it. Although I&#8217;ve never seen this issue myself, [Jason Conger addresses the issue](http://www.jasonconger.com/ShowPost.aspx?strID=87a0885c-a0f1-4b85-b28f-a25813ed8119) in his client deployment article and there is [a custom transform file available from Citrix](http://support.citrix.com/article/entry.jspa?entryID=3936) to ensure that pass-through authentication is enabled. Here&#8217;s an explaination of the issue from Citrix:

> **Issue**  
> When using a Microsoft Group Policy to automatically distribute/install the MetaFrame Presentation Server Client for 32-bit Windows to users, pass-through authentication is disabled.
> 
> **Details**  
> This is by design.  
> Starting with the release of the Version 7.0 32-bit Clients that shipped with Feature Release 3/Service Pack 3 and all future releases, additional security was added to prohibit non-administrative users from installing single sign-on.
> 
> **Workaround  
>** Citrix is providing a Windows Installer Transform File, Slfregfix.mst, so that administrators may bypass the imposed security restriction.

Unfortunately the transform file provided by Citrix doesn&#8217;t work with the Presentation Server Client 10, so I&#8217;ve recreated it to work with version 10. Here&#8217;s the file for you to download and test in your own environment. Just a quick word of warning - I&#8217;ve only performed some very quick testing at this stage. Before you use this, test it out to ensure it works for you in your network.

<p class="download">
  <a href="http://stealthpuppy.com/wp-content/uploads/2007/03/slfregfix2.mst">Transform to enable Pass-through authentication</a>
</p>