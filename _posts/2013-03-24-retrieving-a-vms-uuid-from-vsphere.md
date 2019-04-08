---
id: 3081
title: 'Retrieving a Virtual Machine's UUID from vSphere'
date: 2013-03-24T22:19:03+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=3081
permalink: /retrieving-a-vms-uuid-from-vsphere/
dsq_thread_id:
  - "1162222565"
categories:
  - Automation
tags:
  - PowerShell
  - vSphere
---
While working on a PowerShell script to drive OS deployment through MDT, I've needed to obtain the UUID from a target virtual machine. Unfortunately this isn't just a property of the VM that you get through [Get-VM](http://www.vmware.com/support/developer/PowerCLI/PowerCLI41U1/html/Get-VM.html). Instead you'll need jump through a few hoops to retrieve the right UUID.

I've haven't had to re-invent the wheel on this one, as I've taken some tips from this [VMware Community thread](http://communities.vmware.com/thread/239735) and [a blog post by Ken Smith](http://www.keithsmithonline.com/2013/02/powershell-show-vmware-vm-UUID.html). I have simplified things a little by writing a function that you can use to return the UUID as a string from a virtual machine object (gathered from Get-VM) to the function.

To use the function, first ensure that [PowerCLI](http://communities.vmware.com/community/vmtn/server/vsphere/automationtools/powercli) is installed and that you've connected to a host or vCenter, so that a target VM can be returned and then passed to the function.

For example, I could use the following command to retrieve the UUID from a target VM:

```powershell
PS C:\> Get-VM -VM "W7VM1" | Get-vSphereVMUUID  
554c0342-c2c7-c3b7-8258-96eb00f62b0c
```

Code listing below:

```powershell
# Author: Aaron Parker  
# Desc: Function that uses retrieves the UUID from a specified VM and  
# transposes it into the right format for use with MDT/SCCM etc  
# Date: Mar 24, 2013  
# Site: http://stealthpuppy.com  
#  
# Original code snippets from:  
# http://communities.vmware.com/thread/239735  
# http://www.keithsmithonline.com/2013/02/powershell-show-vmware-vm-UUID.html  
Function Get-vSphereVMUUID {  
    <#  
        .SYNOPSIS  
        Retrieves the UUID from a specified VM and formats it correctly for use with MDT/SCCM etc.

        .DESCRIPTION  
        Retrieves the UUID from a specified VM and formats it correctly for use with MDT/SCCM etc. Returns the UUID as a string that can be passed to other functions.

        Requires that a VM object is passed to the function. That object will first have to be created before being passed to this function.

        .PARAMETER VM  
        Specifies the VM to retrieve the UUID from.

        .EXAMPLE  
        PS C:\> Get-vSphereVMUUID -VM "W7VM1"

        Retrieves the UUID from a VM named W7VM1.

        .EXAMPLE  
        PS C:\> $VM | Get-vSphereVMUUID

        Retrieves the UUID from a VM piped to this function.

        .NOTES  
        See https://stealthpuppy.com/ for support information.

        .LINK  
        https://stealthpuppy.com/code/retrieving-a-vms-uuid-from-vsphere/
    #>
    [CmdletBinding(SupportsShouldProcess = $True)]  
    Param(  
        [Parameter(Mandatory = $True, ValueFromPipeline = $True, HelpMessage = "Specify the VM to retrive the UUID from.")]  
        [System.Object]$VM  
    )

    BEGIN {  
    }

    PROCESS {  
        # Retrive UUID from vSphere  
        $UUID = $VM | ForEach-Object { (Get-View $_.Id).config.UUID }

        #Transpose UUID into expected format  
        # Section 1  
        $UUID11 = $UUID.Substring(0, 2)  
        $UUID12 = $UUID.Substring(2, 2)  
        $UUID13 = $UUID.Substring(4, 2)  
        $UUID14 = $UUID.Substring(6, 2)

        # Section 2  
        $UUID21 = $UUID.Substring(9, 2)  
        $UUID22 = $UUID.Substring(11, 2)

        # Section 3  
        $UUID31 = $UUID.Substring(14, 2)  
        $UUID32 = $UUID.Substring(16, 2)

        # Section 4  
        $UUID41 = $UUID.Substring(19, 4)

        # Section 5  
        $UUID51 = $UUID.Substring(24, 12)

        # Piece the strings together  
        [string]$UUIDa = "$UUID14$UUID13$UUID12$UUID11"  
        [string]$UUIDb = "$UUID22$UUID21"  
        [string]$UUIDc = "$UUID32$UUID31"  
        [string]$UUIDd = "$UUID41"  
        [string]$UUIDe = "$UUID51"  
        [string]$UUIDfixed = "$UUIDa-$UUIDb-$UUIDc-$UUIDd-$UUIDe"  
    }

    END {  
        # Return the UUID  
        Return $UUIDfixed  
    }  
}
```