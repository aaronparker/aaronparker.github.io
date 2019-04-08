---
id: 3686
title: View Memory Stats on a Hyper-V Server
date: 2014-08-29T15:14:42+10:00
author: Aaron Parker
layout: post
guid: http://stealthpuppy.com/?p=3686
permalink: /view-memory-stats-on-hyper-v/
dsq_thread_id:
  - "2968770936"
categories:
  - Automation
tags:
  - Hyper-V
  - PowerShell
---
I&#8217;ve got a very simple setup in [my home lab](http://stealthpuppy.com/lab-server-to-run-esxi-hyper-v/) with a couple of machine running either Hyper-V or ESXi. I typically don&#8217;t have monitoring solutions running and manage each host directly, rather than part of a cluster or with SCVMM or vCenter. For Hyper-V, I try to manage it remotely via PowerShell as much as I can and so it&#8217;s handy to be able to see memory utilisation on the remote host to understand how much capacity I&#8217;ve got before powering on a VM. I&#8217;ve written a PowerShell function to return various memory stats:

  * Total RAM available in the host - using [Get-VMHost](http://go.microsoft.com/fwlink/?LinkID=306853).
  * Total memory in use by running VMs - by returning the running VMs and finding the current amount of RAM assigned to each VM with [Get-VM](http://go.microsoft.com/fwlink/?LinkID=306845). This works with dynamic memory.
  * Available memory to run additional VMs - using [Get-Counter](http://go.microsoft.com/fwlink/p/?linkid=289625) to gather the &#8216;\Memory\Available Bytes&#8217; performance counter
  * How much memory is used by the system - this is calculated by adding what&#8217;s in use by VMs, to the available memory and subtracting the results from the physical RAM in the host. This is a rough calculation, but an interesting metric to view.

The function returns an array that includes each stat. Here&#8217;s an example of what the function returns. All values are in gigabytes and multiple hosts can be specified to gather details from.

<pre class="striped:false nums:false nums-toggle:false wrap-toggle:false plain:false plain-toggle:false show-plain-default:true lang:ps highlight:0 decode:true ">PS C:\&gt; Get-HvMem -ComputerName hv1


Name         : hv1
HostRAMGB    : 11.904224395752
VMInUseGB    : 7.12890625
SystemUsedGB : 1.46017837524414
AvailableGB  : 3.31513977050781</pre>

Here&#8217;s the code listing for the Get-HvMem function:

<pre class="lang:ps decode:true " title="Get-HvMem - get memory stats from Hyper-V">Function Get-HvMem {
    &lt;#
        .SYNOPSIS
            Return Hyper-V host RAM details.
 
        .DESCRIPTION
            This function returns the total available RAM, RAM in use by VMs and the available RAM on a Hyper-V host.
 
        .PARAMETER ComputerName
            Specifies one or more Hyper-V hosts to retrieve stats from.
 
        .EXAMPLE
            Get-HvRAM -ComputerName hyperv1

        .NOTES
 
        .LINK
            http://stealthpuppy.com/hyperv-memory-powershell
 
    #&gt;
    param(
        [Parameter(Mandatory=$true, Position=0,HelpMessage="Hyper-V host.")]
        [string[]]$ComputerName = $(throw = "Please specify a remote Hyper-V host to gather memory details from.")
    )

    # Create an array to return
    $allStats = @()

    ForEach ( $computer in $ComputerName ) {

        # Create an array to contain this computer's metrics
        $a = @()

        # Get details for Hyper-V host
        $vmHost = Get-VMHost -ComputerName $computer

        If ($vmHost) {

            # Get total RAM consumed by running VMs.
            $total = 0
            Get-VM -ComputerName $computer | Where-Object { $_.State -eq "Running" } | Select-Object Name, MemoryAssigned | ForEach-Object { $total = $total + $_.MemoryAssigned }

            #Get available RAM via performance counters
            $Bytes = Get-Counter -ComputerName $computer -Counter "\Memory\Available Bytes"

            # Convert values to GB
            $availGB = ($Bytes[0].CounterSamples.CookedValue / 1GB)
            $hostGB = ($vmhost.MemoryCapacity / 1GB)
            $vmInUse = ($total / 1GB)

            # Construct an array of properties to return
            $item = New-Object PSObject

            # Add host name
            $item | Add-Member -type NoteProperty -Name 'Name' -Value $vmHost.Name

            # Host RAM in GB
            $item | Add-Member -type NoteProperty -Name 'HostRAMGB' -Value $hostGB

            # In use RAM in GB
            $item | Add-Member -type NoteProperty -Name 'VMInUseGB' -Value $vmInUse

            # System used in GB
            $item | Add-Member -type NoteProperty -Name 'SystemUsedGB' -Value ($hostGB - ($vmInUse + $availGB))

            # Available RAM in GB
            $item | Add-Member -type NoteProperty -Name 'AvailableGB' -Value $availGB
            $a += $item    
        }

        # Add the current machine details to the array to return
        $allStats += $a
    }
    Return $allStats
}</pre>

Comments or feedback on bugs, better ways to do things or additional steps is welcome.