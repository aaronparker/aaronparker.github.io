---
title: "Retrieving a VM's UUID from Hyper-V"
date: 2014-08-18T12:15:13+10:00
author: Aaron Parker
layout: post
permalink: /retrieving-a-vms-uuid-from-hyper-v/
categories:
  - Automation
tags:
  - Hyper-V
  - MDT
---
I've previously posted about retrieving the [UUID](http://en.wikipedia.org/wiki/Universally_unique_identifier) from [a virtual machine hosted on vSphere]({{site.baseurl}}/retrieving-a-vms-uuid-from-vsphere/). UUIDs are useful if you want to uniquely identify a target machine for OS deployment task sequences and the like (e.g. MDT). Here's how to obtain the UUID from a virtual machine hosted on Hyper-V.

Just like with vSphere, the UUID isn't a property of the virtual machine that can be queried directly. We need to go via WMI to query the target virtual machine. Note that in this function, I'm using [version 2 of the Root\Virtualization WMI namespace](http://blogs.msdn.com/b/virtual_pc_guy/archive/2012/05/30/the-v2-wmi-namespace-in-hyper-v-on-windows-8.aspx) (root\virtualization\v2. This means the function as written, will [only work on Windows 8 and Windows Server 2012](http://msdn.microsoft.com/en-us/library/hh850319(v=vs.85)) (and above). If you want to use this function on earlier versions of Hyper-V, remove the "\v2" from the namespace.

As an example, here's how to retrieve the UUIDs from a set of VMs on a target Hyper-V host named `hv1`:

```powershell
C:\> Get-HypervVMUUID -ComputerName hv1 -VM win71, file3, pvs1

Name		BIOSGUID
----		----
WIN71		E6E1A176-0713-4BB0-99E9-4570A1A3A94A 
FILE3		9E9D788A-15E2-4760-A049-9F6EB88677A9 
PVS1		74EFF5BC-A24E-48C3-85BE-12D758FE7AB6
```

Here's the full function code listing. Please let me know if you find any bugs:

```powershell
#---------------------------------------------------------------------------
# Author: Aaron Parker
# Desc:   Function that uses retrieves the UUID from a specified VM and
#         formats it into the right format for use with MDT/SCCM etc
# Date:   Aug 18, 2014
# Site:   http://stealthpuppy.com
#---------------------------------------------------------------------------
Function Get-HypervVMUUID {
   <#
        .SYNOPSIS
            Retrieve the UUID from a virtual machine or set of virtual machines.
 
        .DESCRIPTION
            This function will retrieve the UUID from from a virtual machine or set of virtual machines from a Hyper-V host.
 
        .PARAMETER ComputerName
            Specifies the host from which to query the virtual machine or set of virtual machines.
 
        .PARAMETER VM
            Specifies the virtual machine or set of virtual machines (a comma delimited list) from which to obtain the UUID/s.
 
         .EXAMPLE
            PS C:\&gt; Get-HypervVMUUID -ComputerName hv1 -VM win71, win72
 
            This command retrieves the UUIDs from the virtual machines win71 and win72 from the host hv1.
 
        .EXAMPLE
            PS C:\&gt; Get-HypervVMUUID -VM win71, win72
 
            This command retrieves the UUIDs from the virtual machines win71 and win72 from the local host.
 
        .EXAMPLE
            PS C:\&gt; Get-HypervVMUUID
 
            This command retrieves the UUIDs from the all of the virtual machines on the local host.
 
        .NOTES
            {{site.baseurl}}/retrieving-a-vms-uuid-from-hyperv/ for support information.
 
        .LINK
            {{site.baseurl}}/retrieving-a-vms-uuid-from-hyperv/
    #>
    [cmdletbinding(SupportsShouldProcess=$True)]
    param(
        [Parameter(Mandatory=$false,HelpMessage="Specifies one or more Hyper-V hosts from which virtual machine UUIDs are to be retrieved. NetBIOS names, IP addresses, and fully-qualified domain names are allowable. The default is the local computer — use ""localhost"" or a dot (""."") to specify the local computer explicitly.")]
        [string]$ComputerName,

        [Parameter(Mandatory=$false, Position=0,HelpMessage="Specifies the virtual machine from which to retrieve the UUID.")]
        [string[]]$VM
    )

    # If ComputerName parameter is not specified, set value to the local host
    If (!$ComputerName) { $ComputerName = "." }

    # If VM parameter is specified, return those VMs, else return all VMs
    If ($VM) {
        $UUIDs = Get-VM -ComputerName $ComputerName -VM $VM -ErrorAction SilentlyContinue | Select-Object Name,@{Name="BIOSGUID";Expression={(Get-WmiObject -ComputerName $_.ComputerName -Namespace "root\virtualization\v2" -Class Msvm_VirtualSystemSettingData -Property BIOSGUID -Filter ("InstanceID = 'Microsoft:{0}'" -f $_.VMId.Guid)).BIOSGUID}}
    } Else {
        $UUIDs = Get-VM -ComputerName $ComputerName -ErrorAction SilentlyContinue | Select-Object Name,@{Name="BIOSGUID";Expression={(Get-WmiObject -ComputerName $_.ComputerName -Namespace "root\virtualization\v2" -Class Msvm_VirtualSystemSettingData -Property BIOSGUID -Filter ("InstanceID = 'Microsoft:{0}'" -f $_.VMId.Guid)).BIOSGUID}}
    }

    # Remove curly brackets from the UUIDs and return the array
    ForEach ( $UID in $UUIDs ) { $UID.BIOSGUID = $UID.BIOSGUID -replace "}"; $UID.BIOSGUID = $UID.BIOSGUID -replace "{" }
    Return $UUIDs
}
```
