---
id: 3009
title: Creating App-V 5.0 Connection Groups with PowerShell
date: 2013-01-07T00:30:54+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=3009
permalink: /creating-app-v-5-0-connection-groups-with-powershell/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "1011834408"
categories:
  - Automation
tags:
  - App-V
  - Connection Groups
  - PowerShell
---
[Connection Groups](http://technet.microsoft.com/en-us/library/jj737969.aspx) (or Dynamic Suite Composition v2) in App-V 5.0 are great for enabling separate App-V packages to talk to each other. Connection Groups are easy enough to [deploy with the App-V Management Server](http://technet.microsoft.com/en-us/library/jj713462.aspx) or [Configuration Manager 2012](http://technet.microsoft.com/en-us/library/jj591609.aspx); however that isn't the case for [stand-alone scenarios](http://www.applepie.se/app-v-5-standalone-and-connection-groups) or 3rd party ESDs.

Adding a Connection Group to the client, first requires creating a definition file in XML. Without the App-V Management Server or ConfigMgr (where [the resulting file ends up on the client](http://technet.microsoft.com/en-us/library/jj870811.aspx)), you'll need to do that manually. Crafting XML files from scratch using Notepad isn't my idea of fun.

# What's in a Definition File?

A [Connection Group definition file](http://blogs.technet.com/b/appv/archive/2012/11/06/deploying-connection-groups-app-v-5-0.aspx) contains the details about the Connection Group and the member packages. Each Connection Group has it's own group and version ID (GUIDs).

A typical definition file will look something like this:

[code language=&#8221;xml&#8221;]<?xml version="1.0" encoding="UTF-8"?>  
<appv:AppConnectionGroup xmlns="http://schemas.microsoft.com/appv/2010/virtualapplicationconnectiongroup" xmlns:appv="http://schemas.microsoft.com/appv/2010/virtualapplicationconnectiongroup" AppConnectionGroupId="715f39d8-1b48-4b9a-95e6-d33370564b33" VersionId="9cdf46f3-6716-43d3-b533-5c697878f51f" Priority="2" DisplayName="Adobe Apps">  
<appv:Packages>  
<appv:Package DisplayName="Adobe Reader X" PackageId="abf1cd38-03cf-42af-8b27-564c4b9fcd1e" VersionId="818bc4eb-50f2-4fd4-90e4-9c8ed097e1e9" />  
<appv:Package DisplayName="Adobe Flash Player 11" PackageId="6a22f839-2d22-46dc-9c63-2649e370fce2" VersionId="792c8000-509c-4b1a-b4d7-58be65436d1a" />  
</appv:Packages>  
</appv:AppConnectionGroup>[/code]

To create the file, we need to generate GUIDs for the group and version IDs, supply a Connection Group display name and priority, and then add the package and version IDs for each member package.

# Enter PowerShell

To simplify the process of creating the definition file for a Connection Group, I've written a PowerShell function that will handle the heavy lifting for you. _New-AppvConnectionGroupFile_ will create the definition file from a list of App-V packages passed to it.

The function will output the definition file to a specified path and then return that file as an object that you can do further processing with.

[code language=&#8221;ps&#8221;]#&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;  
\# Author: Aaron Parker  
\# Desc: Function that uses the App-V 5.0 client to create Connection  
\# Group description (XML) files for use with stand alone clients or  
\# test scenarios  
\# Date: Jan 06, 2013  
\# Site: http://stealthpuppy.com  
#&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;

Function New-AppvConnectionGroupFile {  
<#  
.SYNOPSIS  
Creates an App-V 5.0 Connection Group definition file.

.DESCRIPTION  
Creates an XML-based Connection Group definition file from packages added to the current system.

Packages can be filtered before being passed to the function to control which packages are included in the Connection Group.

.PARAMETER DisplayName  
Specifies the display name of the Connection Group.

.PARAMETER Priority  
Specifies the priority of the Connection Group.

.PARAMETER Path  
Specifies the App-V connection group definition file to output.

.PARAMETER Packages  
The packages to include in the Connection Group.

.EXAMPLE  
PS C:\> New-AppvConnectionGroupFile -DisplayName "Internet Explorer Plugins" -Priority 0 -FilePath InternetExplorerPlugins.xml -Packages $Packages

Creates a Connection Group file named 'InternetExplorerPlugins.xml' with a display name of 'Internet Explorer Plugins' from packages contained within the array $Packages.

.EXAMPLE  
PS C:\> Get-AppvClientPackage -Name Adobe* | New-AppvConnectionGroupFile -DisplayName "Adobe Apps" -Priority 10 -FilePath AdobeApps.xml

Creates a Connection Group file named 'AdobeApps.xml' with a display name of 'Adobe Apps' from packages passed via the pipeline from Get-AppvClientPackage.

.NOTES  
See http://stealthpuppy.com/ for support information.

.LINK  
http://stealthpuppy.com/code/creating-app-v-5-0-connection-groups-with-powershell/  
#>

[CmdletBinding(SupportsShouldProcess=$True)]  
Param(  
[Parameter(Mandatory=$True, HelpMessage="Connection Group descriptor XML file path")]  
[string]$Path,  
[Parameter(Mandatory=$True, HelpMessage="Display name of the Connection Group")]  
[string]$DisplayName,  
[Parameter(Mandatory=$False, HelpMessage="Connection Group priority")]  
[int]$Priority,  
[Parameter(Mandatory=$True, ValueFromPipeline=$True, HelpMessage="Packages to include in the Connection Group")]  
[System.Array]$Packages  
)

BEGIN {

\# Template XML for an App-V Connection Group description file. Easier than building from an XML object  
$templateXML = @'  
<?xml version="1.0" encoding="UTF-8" ?>  
<appv:AppConnectionGroup  
xmlns="http://schemas.microsoft.com/appv/2010/virtualapplicationconnectiongroup"  
xmlns:appv="http://schemas.microsoft.com/appv/2010/virtualapplicationconnectiongroup"  
AppConnectionGroupId="GUID"  
VersionId="GUID"  
Priority="0"  
DisplayName="Display Name">  
<appv:Packages>  
<appv:Package DisplayName="Package1" PackageId="GUID" VersionId="GUID" />  
</appv:Packages>  
</appv:AppConnectionGroup>  
'@

\# Write out the template XML to a file in the current directory  
$templateXMLFile = $pwd.Path + "\ConnectionGroupTemplate.XML"  
$templateXML | Out-File -FilePath $templateXMLFile -Encoding utf8 -Force

\# Create a new XML object and read the template XML file into this object  
$xml = New-Object XML  
If ((Test-Path $templateXMLFile) -eq $True ) { $xml.Load($templateXMLFile) } Else { Write-Warning -Message "Unable to read template XML file." }

\# Apply the display name and GUIDs to the XML object  
$xml.AppConnectionGroup.DisplayName = $DisplayName  
$xml.AppConnectionGroup.AppConnectionGroupId = ([guid]::NewGuid()).ToString()  
$xml.AppConnectionGroup.VersionId = ([guid]::NewGuid()).ToString()  
$xml.AppConnectionGroup.Priority = $Priority.ToString()

\# Clone the existing package entry to use for new entries  
$newPackage = (@($xml.AppConnectionGroup.Packages.Package)[0]).Clone()  
}

\# Process each supplied App-V package into the XML object  
PROCESS {  
ForEach ( $Package in $Packages ) {  
Write-Progress "Adding packages"

$newPackage = $newPackage.Clone()  
$newPackage.DisplayName = $Package.Name  
$newPackage.PackageId = ($Package.PackageId).ToString()  
$newPackage.VersionId = ($Package.VersionId).ToString()

\# Output appending the child XML entry to null to prevent displaying on screen  
$xml.AppConnectionGroup.Packages.AppendChild($newPackage) > $null  
}  
}

END {

\# Remove the template package entry from the XML  
$xml.AppConnectionGroup.Packages.ChildNodes | Where-Object { $\_.DisplayName -eq "Package1" } | ForEach-Object { [void]$xml.AppConnectionGroup.Packages.RemoveChild($\_) }

\# Save the completed XML to disk  
$xml.Save($Path)

\# Delete the template XML file from disk  
If (Test-Path $templateXMLFile) { Remove-Item $templateXMLFile -Force -ErrorAction SilentlyContinue }

\# Return the new Connection Group description XML file so that it might be processed by other functions  
If (Test-Path $Path ) { Return Get-Item $Path } Else { Write-Warning "Failed to save Connection Group definition file." }  
}  
}[/code]

Copy and paste the code above into a PowerShell window (or the ISE) to enable the function. You could also save code to [a PowerShell module](http://msdn.microsoft.com/en-gb/library/windows/desktop/dd878324(v=vs.85).aspx) to make it more accessible.

# Examples

The function includes help and examples, so that you can view them from within PowerShell (the PowerShell ISE makes that simple). Use the Get-Help cmdlet to view details.

Using the function requires supplying a Display Name and Priority for the Connection Group as well as the list of App-V packages to include in the group. To supply the packages, first ensure they have been added to the local client, so that they can be queried with Get-AppvClientPackage.

In this example, I've added the list of packages to the variable $Packages and then supplied that to the New-AppvConnectionGroupFile function. This results in the definition file AdobeApps.xml with any Adobe package included in it.

[code language=&#8221;ps&#8221;]$Packages = Get-AppvClientPackage -Name Adobe*  
New-AppvConnectionGroupFile -Path C:\Packages\AdobeApps.xml -DisplayName "Adobe Apps" -Priority 2 -Packages $Packages[/code]

Taking this a step further, I can use a single line of PowerShell to query for a filtered list of packages on the local client, passing that to my function that will create the definition file. The Connection Group is then immediately added to the client and enabled.

[code language=&#8221;ps&#8221;]Get-AppvClientPackage -Name Adobe* | New-AppvConnectionGroupFile -Path C:\Packages\AdobeApps.xml -DisplayName "Adobe Apps" -Priority 2 | Add-AppvClientConnectionGroup | Enable-AppvClientConnectionGroup -Global[/code]

# Finally

This is version 1 of this function, so corrections and feedback are welcome. As always use at your own risk.