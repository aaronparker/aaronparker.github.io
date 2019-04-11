---
id: 3696
title: Configuring IIS Prerequisites for the App-V 5 Server with PowerShell
date: 2014-09-05T01:04:23+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=3696
permalink: /appv-5-server-iis-prerequisites-powershell/
dsq_thread_id:
  - "2987858354"
categories:
  - Automation
tags:
  - App-V
  - PowerShell
---
![App-V Server 5.0 Setup with missing prerequisites]({{site.baseurl}}/media/2014/09/AppV-Prereqs.png)*App-V Server 5.0 Setup with missing prerequisites*</figure>

While I'd much rather recommend that you configure a Windows Server that will host the App-V 5.0 server components via [a solution such as MDT]({{site.baseurl}}/briforum-2014-hands-off-my-gold-image-the-slides/) with the required IIS components enabled in an automated build, here's how to add the components with PowerShell.

The following code uses the [Add-WindowsFeature](http://go.microsoft.com/fwlink/p/?linkid=287571) to add the IIS components that are required to support the App-V 5.0 Management and Publishing Servers. These are the minimum required components as requested by the setup application.

<pre class="lang:ps decode:true " title="Adding IIS features to support App-V Server 5.0"># Import the ServerManager module which we will need to use the Add-WindowsFeature cmdlet
Import-Module ServerManager

# Add the required IIS features with the Add-WindowsFeature cmdletw 
$Features = Add-WindowsFeature –Name Web-Server,Web-Windows-Auth,Web-Mgmt-Tools,Web-ISAPI-Ext,Web-ISAPI-Filter,NET-Framework-45-ASPNET,Web-Asp-Net45,Web-Net-Ext45

# Report the results of adding the features
If ($Features.Success -eq $True) {
    If ($Features.RestartNeeded -eq $True) { 
        Write-Host -ForegroundColor Green "IIS features added successfully and reboot required."
    } Else {
        Write-Host -ForegroundColor Green "IIS features added successfully."
    }
} Else {
    Write-Error "Adding IIS features failed with error: $Features.ExitCode"
}</pre>

To keep an App-V 5.0 environment as simple as possible, you should be use port 80 for the Publishing Server. This ensures that the standard HTTP port is used for publishing and no-one has to remember or configure an obscure port on the App-V client.

As an added bonus, I've created some PowerShell code to change the IIS configuration to move an existing web site off port 80 to another port. In most cases that will be the Default Web Site.

The following code will find any web site currently bound to port 80, calculate the next available port by adding 1 to the highest port in use and then set the site to use that port.

<pre class="lang:ps decode:true " title="Moving any IIS website off port 80"># Import the WebAdministration module required for managing IIS
Import-Module WebAdministration

# Find whether any web sites are bound to port 80
$port80 = $false
Get-WebSite | ForEach-Object { If ($_.Bindings.Collection.bindingInformation -like "*:80:*") { $port80 = $True } }
If ( $port80 ) {

    # Find all bindings and add 1 to the highest binding to create a new port to bind the web site to
    $binds = @()
    Get-WebBinding | ForEach-Object { $binds += $_.bindingInformation.Split(":") }
    $binds = $binds | Sort-Object
    $port = ($binds[($binds.Count-1)] -as [int]) + 1

    # Change the web bindings for the site bound to port 80 to the new calculated port number
    Get-WebSite | ForEach-Object { If ($_.Bindings.Collection.bindingInformation -like "*:80:*") { Set-WebBinding -Name $_.Name -BindingInformation "*:80:" -PropertyName Port -Value $port } }
}</pre>

Once you've run the code, you can then install the App-V 5.0 server components and use port 80 for the Publishing Server.