---
id: 3003
title: App-V 5.0 delivers Internet Explorer Plugin Nirvana
date: 2012-12-29T14:00:31+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=3003
permalink: /app-v-5-0-delivers-internet-explorer-plugin-nirvana/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "998406199"
categories:
  - Applications
tags:
  - App-V
---
One of the great promises of application virtualization is dynamic delivery of software to end-points; however delivering plugins or add-ons to installed (i.e. not virtualized) software has thus far been a stumbling block.

Internet Explorer has been particularly challenging due to the inability to separate the browser from the OS in a supported manner. So using App-V to deploy plugins like Flash or Java has meant changing the user experience with virtualization or falling back to standard install methods.

[App-V 5.0](http://technet.microsoft.com/en-us/library/jj713446.aspx) delivers some good news though, with the ability to seamlessly run an installed application inside a specified virtual environment. This means that the Flash plugin can be delivered as a virtual package and made available to Internet Explorer without resorting to hacks or changing the user experience by providing a special shortcut. Providing Office add-ins would also benefit from the same approach.

Sebastian Gernert recently [posted about the new RunVirtual feature in App-V 5.0](http://blogs.msdn.com/b/sgern/archive/2012/12/19/10379343.aspx) that can be used to launch a specified process or processes within a specific App-V package. RunVirtual is simple to implement but does require packages to be global.

RunVirtual works by the App-V client intercepting the process launch (CreateProcess) with AppvVemgr.sys and loading the process into the specified virtual environment.

# Implementing RunVirtual

To illustrate implementing the RunVirtual feature, I'll demonstrate delivering plugins to a Windows 7 client running Internet Explorer 9. In this example, I'm [managing the App-V client with PowerShell](http://technet.microsoft.com/en-us/library/jj713419.aspx) to show what's going on under the hood. This process would be simplified with Configuration Manager or the [native App-V infrastructure](http://technet.microsoft.com/en-us/library/jj713496.aspx).

## Publishing Packages

Before deployment to a client PC, I've sequenced the follow applications into App-V 5.0 packages and saved them to the network:

  * Adobe Reader X
  * Adobe Flash Player 11
  * Oracle Java 7

During sequencing I've not performed any special steps to prepare the environment - there is no bearing on deployment during the sequencing stage.

Each package has been added to the client and published globally with the following commands:

[code]Add-AppvClientPackage –Path \\server\Packages\AdobeReaderX_pkg\AdobeReaderX.appv | Publish-AppvClientPackage -Global<br>Add-AppvClientPackage –Path \\server\Packages\AdobeFlashPlayer11\AdobeFlashPlayer11.appv | Publish-AppvClientPackage -Global<br>Add-AppvClientPackage –Path \\server\Packages\OracleJava7\OracleJava7.appv | Publish-AppvClientPackage -Global[/code]

Whilst Adobe Reader can be used just like any other application, Flash and Java aren't particularly useful on their own.

## Enabling a Connection Group

Only a single package can be applied to a process with the RunVirtual feature. This means that to provide Internet Explorer with access to several packages, we need to first add each package to a [Connection Group](http://technet.microsoft.com/library/jj713417.aspx) and add that to the client.

[Connection Groups are defined via XML files](http://technet.microsoft.com/en-US/library/jj737969.aspx) that list each member package. If we're managing the App-V client with PowerShell, the Connection Group descriptor files need to be created manually. I won't go into detail here; however below is the listing for the descriptor file for a Connection Group that contains the Internet Explorer Plugins:

[code language=&#8221;xml&#8221;]<?xml version="1.0" ?>  
<appv:AppConnectionGroup  
xmlns="http://schemas.microsoft.com/appv/2010/virtualapplicationconnectiongroup"  
xmlns:appv="http://schemas.microsoft.com/appv/2010/virtualapplicationconnectiongroup"  
AppConnectionGroupId="61BE9B14-D2B4-41CE-A6E3-A1B658DE7000"  
VersionId="E6B6AA57-F2A7-49C9-ADF8-F2B5B3C8A42F"  
Priority="0"  
DisplayName="Internet Explorer Plugins">  
<appv:Packages>  
<appv:Package DisplayName="Adobe Flash Player 11" PackageId="6a22f839-2d22-46dc-9c63-2649e370fce2" VersionId="792c8000-509c-4b1a-b4d7-58be65436d1a" />  
<appv:Package DisplayName="Adobe Reader X" PackageId="abf1cd38-03cf-42af-8b27-564c4b9fcd1e" VersionId="818bc4eb-50f2-4fd4-90e4-9c8ed097e1e9" />  
<appv:Package DisplayName="Oracle Java 7" PackageId="7112a4ca-2fe9-4606-b673-e13ea8589294" VersionId="4887ecd0-ce7b-48f6-bad6-4d8197e3821e" />  
</appv:Packages>  
</appv:AppConnectionGroup>[/code]

Save the file as _InternetExplorerPlugins.xml_ and copy to the client PC. The Connection Group is added and enabled (most importantly, globally), with the following command:

[code]Add-AppvClientConnectionGroup -Path .\InternetExplorerPlugins.xml | Enable-AppvClientConnectionGroup -Global[/code]

PackageId/GroupId and VersionId from the Connection Group descriptor file are important to note when configuring RunVirtual.

## Configure RunVirtual

Enabling the RunVirtual feature for a process is achieved via a Registry key in HKLM: HKEY\_LOCAL\_MACHINE\SOFTWARE\Microsoft\AppV\Client\RunVirtual. Each target process requires a key below the RunVirtual key and then the package ID and version ID listed in the default value.

So using Internet Explorer (iexplore.exe) and the Connection Group for the plugins, listed above, the data to add to the Registry would look like this:

  * Key: HKLM\SOFTWARE\Microsoft\AppV\Client\RunVirtual\iexplore.exe
  * Default Value: 61be9b14-d2b4-41ce-a6e3-a1b658de7000_e6b6aa57-f2a7-49c9-adf8-f2b5b3c8a42f

(Note the underscore between Package ID and Version ID to make up the data stored in the registry value.)

**However** - I have found that RunVirtual doesn't start the virtual environment (VE) if details for a Connection Group are supplied. Documentation on this feature is scant, so it's hard to tell whether this behaviour is by design or not.

If the Package and Version ID are of a member package are provided, then the Connection Group VE is loaded, so we do get the desired effect. In my test case, I've added the Package and Version ID of the primary package (Flash) to the registry.

[<img style="background-image: none; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border: 0px;" title="RunVirtualRegistryKey" alt="RunVirtualRegistryKey" src="http://stealthpuppy.com/wp-content/uploads/2012/12/RunVirtualRegistryKey_thumb.png" width="660" height="233" border="0" />](http://stealthpuppy.com/wp-content/uploads/2012/12/RunVirtualRegistryKey.png)

Once the key is created and populated, start or restart the target process and the plugins will be available. Internet Explorer add-ons can now be virtualized and delivered to IE seamlessly. Even Adobe Reader can now be virtualized and embedded PDFs will still work.

# The End to installing Plugins?

RunVirtual is a great new feature of App-V 5.0 that has only been possible with the re-architecture of App-V. The ability to provide add-ons or plugins for installed software without changing the user experience is brilliant. A feature that agent-less application virtalization solutions won't be able to match.

However it's still early days for App-V 5.0, so it remains to be seen how widely this feature will be used. At this point, it only works with global (i.e. not user targeted) packages and requires a change to the real registry. It is though, a feature with a lot of promise and I'm looking forward to it simplifying desktop images.