---
id: 2671
title: Configuring Hyper-V Virtual Networks with PowerShell
date: 2012-03-16T17:11:18+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2671
permalink: /configuring-hyper-v-virtual-networks-with-powershell/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "613440085"
categories:
  - Automation
tags:
  - Hyper-V
---
I've been configuring a Windows Server 2008 R2 Hyper-V deployment in the lab via MDT to a couple of ProLiant DL380 G5's. I've been keeping the deployment as simple as possible, so there's no SCVMM integrated at this point and as such I've need to configure the Hyper-V networking once the OS is deployed to the machine. Naturally, I don't want to do that manually.

I've taken the opportunity write something in PowerShell that can perform the configuration via the MDT task sequence. To do that I've had to resort to the [PowerShell Management Library for Hyper-V](http://pshyperv.codeplex.com/ "PowerShell Management Library for Hyper-V"). A special thanks to [Jeff Wouters](https://twitter.com/#!/JeffWouters) for pointing me in the right direction with a couple of the Hyper-V specific commands.

An odd occurrence when deploying Windows Server to these boxes is that the adapter names often change between each deployment. So what might be _HP NC373i Multifunction Gigabit Server Adapter #13_ today becomes _HP NC373i Multifunction Gigabit Server Adapter #14_ when I next re-deploy Windows to that box.

<img class="alignnone size-full wp-image-2676" title="Hyper-V Virtual Networks" src="http://stealthpuppy.com/wp-content/uploads/2012/03/HyperVVirtualNetworks.png" alt="Hyper-V Virtual Networks" width="660" height="324" srcset="https://stealthpuppy.com/wp-content/uploads/2012/03/HyperVVirtualNetworks.png 660w, https://stealthpuppy.com/wp-content/uploads/2012/03/HyperVVirtualNetworks-150x73.png 150w, https://stealthpuppy.com/wp-content/uploads/2012/03/HyperVVirtualNetworks-300x147.png 300w" sizes="(max-width: 660px) 100vw, 660px" /> 

Because the _New-VMExternalSwitch_ and _Remove-VMSwitchNic_ commandlets to used configure the virtual networks require the adapter description, I've had to come up with a way to grab the description based on some that remains static - the MAC address. List below is a script that contains a list of MAC addresses (you could improve on this by keeping the list in a file) for each target MAC address in each server.

It's just a simple list, so if I add another server, I just add the new server's MAC address to the list. The script returns the description of the adapter with that MAC address and then uses that to configure the new virtual network. Enjoy.

[code language="ps"]## Configures a Hyper-V external virtual network based on a supplied MAC address

\## Variables ##  
\# Path to the PowerShell Management Library for Hyper-V  
$HyperVLibrary = "$env:ProgramFiles\modules\HyperV"

\# Virtual switch name  
$SwitchName = "External"

\# List of MAC addresses for the adapter in each server to be bound to a virtual switch  
\# HV1=00:1C:C4:D8:36:BA; HV2=00:19:BB:C9:63:04;  
$MACAddressList = "00:1C:C4:D8:36:BA", "00:19:BB:C9:63:04"

\# If the PowerShell Management Library for Hyper-V exists, we're good to go  
If (Test-Path $HyperVLibrary) {

\# Match a MAC address to a local adapter and return the adapter description  
$Adapters = get-wmiobject -query "Select * From Win32_NetworkAdapterConfiguration"  
For ($n=0; $n -le $MACAddressList.Count -1; $n++) {  
For ($i=0; $i -le $Adapters.Count -1; $i++) {  
If ($MACAddressList[$n] -eq $Adapters[$i].MACAddress) {  
$AdapterDecription = $Adapters[$i].Description  
}  
}  
}

\# Configure Hyper-V networking with the supplied MAC Address  
If ($AdapterDecription) {

\# Import the PowerShell Management Library for Hyper-V  
Import-Module $HyperVLibrary

\# Create the Hyper-V network and remove the option 'Allow management operating system to share this network adapter'  
New-VMExternalSwitch -VirtualSwitchName $SwitchName -ExternalEthernet $AdapterDecription -force  
Remove-VMSwitchNic -Name $SwitchName -Force  
}  
Else {  
Write-Warning "Unable to match a local adapter from the list of supplied MAC addresses."  
}  
}  
Else {  
Write-Warning "'$HyperVLibrary' doesn't exist. Unable to continue without the PowerShell Management Library for Hyper-V."  
}  
[/code]