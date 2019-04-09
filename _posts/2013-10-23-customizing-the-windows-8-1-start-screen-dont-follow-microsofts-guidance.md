---
id: 3505
title: "Customizing the Windows 8.1 Start Screen? Don't follow Microsoft's guidance"
date: 2013-10-23T21:08:22+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=3505
permalink: /customizing-the-windows-8-1-start-screen-dont-follow-microsofts-guidance/
dsq_thread_id:
  - "1892254021"
categories:
  - Automation
tags:
  - PowerShell
---
![Windows 8.1 Start screen](https://stealthpuppy.com/wp-content/uploads/2013/10/WIndows81StartScreen.png)

For enterprises, Windows 8.1 delivers the control around the Start Screen that should have been there in Windows 8.0, although I'm sure what they've delivered won't appease everyone as there's still no programmatic way to pin or unpin shortcuts from the Start Screen.

Windows 8.1 introduces [a Group Policy method for distributing a Start Screen layout](http://www.grouppolicy.biz/2013/06/customising-windows-8-1-start-screen-layout-with-group-policy/), but that's a policy - i.e. it's enforced and unless you're a control freak, that approach only makes sense in specific cases (e.g. schools, kiosks etc.). Note that [Start Screen control is only available in Windows 8.1 Enterprise and Windows RT 8.1](http://www.microsoft.com/en-us/windows/enterprise/products-and-technologies/windows-8-1/compare/default.aspx), so you're either paying SA or delivering the Surface RT/2 (or maybe even the [Lumia 2520](http://blogs.windows.com/windows/b/windowsexperience/archive/2013/10/22/nokia-announces-the-lumia-2520-windows-tablet-at-nokia-world.aspx)) to your users.

Microsoft have an article available on TechNet that describes a number of ways that you can configure the default Start Screen experience that will work for Windows 8/8.1, Window Server 2012 and Windows Server 2012 R2, but the choices are:

  1. Create a reference image and use [the CopyProfile setting in unattend.xml to customise the default profile](http://technet.microsoft.com/en-us/library/hh825135.aspx) including the Start Screen
  2. Use the [StartTiles setting in unattend.xml](http://technet.microsoft.com/en-us/library/jj552650.aspx) to specify a list of tiles to add to the Start Screen
  3. Use SysPrep to generate AppsFolderLayout.bin and then copy that to the default profile

Each one of those approaches looks tedious.

  Fortunately, there's a far easier way. Microsoft has added a couple of PowerShell cmdlets that provide for a way of getting your custom Start Screen layout into the default profile. These works for all edition of Windows 8.1 (even RT).

  This approach is really about customising the default Start Screen experience (i.e. first logon). If you want control of the Start Screen (users receive the same screen every session) you will need Windows 8.1 Enterprise or Windows Server 2012 R2. You can use this method to customise a reference image, an unattended deployment using RTM media or even an existing Windows installation.

  Here's what you need to do at a high level:

  1. Deploy and/or log onto a machine that has the applications that you want to pin to the Start Screen
  2. Customise that Start Screen to your heart's content
  3. Export the Start Screen configuration with [Export-StartLayout](http://technet.microsoft.com/en-us/library/dn283401.aspx)
  4. Import the Start Screen configuration with [Import-StartLayout](http://technet.microsoft.com/en-us/library/dn283403.aspx)

Exporting the Start Screen layout is simple, just ensure you export the configuration file in binary format, as Import-StartLayout won't import XML files. Here's the export command:

```powershell
Export-StartLayout -As BIN -Path CustomStartScreenLayout.bin -Verbose
```

Which should look like this:

![Export-StartLayout](https://stealthpuppy.com/wp-content/uploads/2013/10/Export-StartLayout.png)

The documentation for [Import-StartLayout](http://technet.microsoft.com/en-us/library/dn283403.aspx) seems to indicate that this cmdlet only works against offline images (mounted with ImageX); however this isn't the case - the cmdlet can be run against the current Windows installation.

That means that we can import a custom Start Screen layout during any type of deployment. For example, you could script the import of the customisation during an MDT or SCCM task sequence. The following command will import the customisation into the default profile of the local desktop. This will need to be run from an elevated command prompt.

```powershell
POWERSHELL -NonInteractive -Command Import-StartLayout -LayoutPath .\CustomStartScreenLayout.bin -MountPath %SystemDrive%\
```

Using MDT, this command runs as part of a script that customises the default profile. The process is ultimately pretty painless.

![Windows 8 default](https://stealthpuppy.com/wp-content/uploads/2013/10/Windows8Default.png)
