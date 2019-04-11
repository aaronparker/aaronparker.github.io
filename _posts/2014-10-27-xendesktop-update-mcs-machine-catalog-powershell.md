---
id: 3727
title: Updating an MCS-based XenDesktop Machine Catalog with PowerShell
date: 2014-10-27T23:34:50+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=3727
permalink: /xendesktop-update-mcs-machine-catalog-powershell/
dsq_thread_id:
  - "3161316057"
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
image: /media/2014/10/powershell_ise.png
categories:
  - Automation
tags:
  - PowerShell
  - XenDesktop
---
I wrote previously about [automating the creation of an MCS-based machine catalog in XenDesktop with PowerShell]({{site.baseurl}}/xendesktop-mcs-machine-catalog-powershell/), so in this article I'll cover updating that machine catalog via PowerShell.

Separate to this article would be the process of creating the updated image - that could be done manually (by updating the existing master image), or by [automating a new master image deployment with MDT]({{site.baseurl}}/briforum-2014-hands-off-my-gold-image-the-slides/), or any other method that you can think of.

Just as with creating the machine catalog, the PowerShell output from Studio when updating a catalog is a place to start - the code provided isn't reusable without some effort to make it work.

# Linking the Code to the UI

I'll walk briefly through the wizards to show, in part, how the code relates to each step when updating a machine catalog via the Studio UI.

In this case, I've already created the machine catalog and updated my master image and created a snapshot. The hypervisor isn't important because Citrix Studio abstracts this from the process when performing the update (I do need to be using the same infrastructure as the target catalog).

To find the snapshot to use, I’ve obtained the path to the master image and a specified snapshot via the _Get-ChildItem_ command (on the path XDHyp:\HostingUnits\<Storage Resource>). This is essentially a path/directory that I can parse - I've explicitly specified the master image and the snapshot to use. I need the path to the snapshot so that I can use that in the publish step for the image update.

![]({{site.baseurl}}/media/2014/10/01-Master-Image.png)*Selecting the master image snapshot - Get-ChildItem "XDHyp:\HostingUnits\"*

I can choose from a couple of rollout strategies for the image update - I can choose to update on next shutdown of the desktop, or update immediately (with a specified delay).

![]({{site.baseurl}}/media/2014/10/02-Rollout-01.png)*Rollout the image update on next reboot - Start-BrokerRebootCycle or Start-BrokerNaturalRebootCycle (still need to work this out)*

_[Start-BrokerRebootCycle](http://support.citrix.com/proddocs/topic/citrix-broker-admin-v2-xd75/start-brokerrebootcycle-xd75.html)_ is used to control the the reboot cycle, but this is called at the end of the script to ensure the update process is completed first.

![]({{site.baseurl}}/media/2014/10/02-Rollout-02.png)*Rollout image update immediately - Start-BrokerRebootCycle -InputObject @(<Machine Catalog Name>) -RebootDuration 120 -WarningDuration 15 -WarningMessage <message> -WarningTitle <message>*

<p class="p1">
  <a href="http://support.citrix.com/proddocs/topic/citrix-machinecreation-admin-v2-xd75/publish-provmastervmimage-xd75.html"><em>Publish-ProvMasterVmImage</em></a> is used to publish the image. The process can then be monitored by getting updates for the process via <a href="http://support.citrix.com/proddocs/topic/citrix-machinecreation-admin-v2-xd75/get-provtask-xd75.html">Get-ProvTask</a>. I've opted to show a progress bar while the update is on-going before initiating the desktop reboot.
</p>

![]({{site.baseurl}}/media/2014/10/04-Summary.png)*Catalog update summary*

There’s plenty that the wizard does to hide the complexity of setting up a catalog from the administrator. If you attempt the same via PowerShell, what goes on under the hood is laid bare.

# The Code

Below is the full code listing with comments inline that should provide some detail on the process the code follows. At this point the code provides some error checking for the most important steps. There are still some additional steps and error checking that could be integrated:

  * The code will get a specified snapshot from the target VM. I've done this to ensure I'm using the correct version of the image
  * Publish the image update to the catalog
  * Monitor the update process until completion
  * Start the desktop reboot cycle

At this stage, I haven't added too much error checking, but an important step to add will be to check that the image update process was successful and rollback if it wasn't.

<pre class="lang:ps decode:true " title="PowerShell code to update and MCS-based Machine Catalog">#---------------------------------------------------------------------------
# Author: Aaron Parker
# Desc:   Using PowerShell to update a XenDesktop 7.x machine catalog 
# Date:   Oct 27, 2014
# Site:   http://stealthpuppy.com
#---------------------------------------------------------------------------

# Set variables for the target infrastructure
# ----------
$adminAddress = 'xd71.home.stealthpuppy.com' #The XD Controller we're going to execute against
$xdControllers = 'xd71.home.stealthpuppy.com'

# Hypervisor and storage resources
# These need to be configured in Studio prior to running this script
# This script is hypervisor and management agnostic - just point to the right infrastructure
$storageResource = "HV2-EVOPro" #Storage
$hostResource = "Lab vCenter" #Hypervisor management

# Master image properties
$machineCatalogName = "Windows 8 vSphere"
$masterImage ="Windows8*"
$snapshot = "VDA 7.6"

$messageDetail = "Your computer has been updated and will be automatically restarted in 15 minutes."
$messageTitle = "Help desk message"
# ----------

# Load the Citrix PowerShell modules
Write-Verbose "Loading Citrix XenDesktop modules."
Add-PSSnapin Citrix*

# Get information from the hosting environment via the XD Controller
# Get the storage resource
Write-Verbose "Gathering storage and hypervisor connections from the XenDesktop infrastructure."
$hostingUnit = Get-ChildItem -AdminAddress $adminAddress "XDHyp:\HostingUnits" | Where-Object { $_.PSChildName -like $storageResource } | Select-Object PSChildName, PsPath
# Get the hypervisor management resources
$hostConnection = Get-ChildItem -AdminAddress $adminAddress "XDHyp:\Connections" | Where-Object { $_.PSChildName -like $hostResource }

# Get the broker connection to the hypervisor management
# http://support.citrix.com/proddocs/topic/citrix-broker-admin-v2-xd75/get-brokerhypervisorconnection-xd75.html
$brokerHypConnection = Get-BrokerHypervisorConnection -AdminAddress $adminAddress -HypHypervisorConnectionUid $hostConnection.HypervisorConnectionUid

# Set a provisioning scheme for the update process
# http://support.citrix.com/proddocs/topic/citrix-machinecreation-admin-v2-xd75/set-provschememetadata-xd75.html
$ProvScheme = Set-ProvSchemeMetadata -AdminAddress $adminAddress -Name 'ImageManagementPrep_DoImagePreparation' -ProvisioningSchemeName $machineCatalogName -Value 'True'

# Get the master VM image from the same storage resource we're going to deploy to. Could pull this from another storage resource available to the host
Write-Verbose "Getting the snapshot details for the catalog: $machineCatalogName"
$VM = Get-ChildItem -AdminAddress $adminAddress "XDHyp:\HostingUnits\$storageResource" | Where-Object { $_.ObjectType -eq "VM" -and $_.PSChildName -like $masterImage }
# Get the snapshot details. This code will grab a specific snapshot, although you could grab the last in the list assuming it's the latest.
$VMSnapshots = Get-ChildItem -AdminAddress $adminAddress $VM.FullPath -Recurse -Include *.snapshot
$TargetSnapshot = $VMSnapshots | Where-Object { $_.FullName -eq "$snapshot.snapshot" }

# Publish the image update to the machine catalog
# http://support.citrix.com/proddocs/topic/citrix-machinecreation-admin-v2-xd75/publish-provmastervmimage-xd75.html
$PubTask = Publish-ProvMasterVmImage -AdminAddress $adminAddress -MasterImageVM $TargetSnapshot.FullPath -ProvisioningSchemeName $machineCatalogName -RunAsynchronously
$provTask = Get-ProvTask -AdminAddress $adminAddress -TaskId $PubTask

# Track progress of the image update
Write-Verbose "Tracking progress of the machine creation task."
$totalPercent = 0
While ( $provTask.Active -eq $True ) {
    Try { $totalPercent = If ( $provTask.TaskProgress ) { $provTask.TaskProgress } Else {0} } Catch { }

    Write-Progress -Activity "Provisioning image update" -Status "$totalPercent% Complete:" -percentcomplete $totalPercent
    Sleep 15
    $provTask = Get-ProvTask -AdminAddress $adminAddress -TaskId $PubTask
}

# Start the desktop reboot cycle to get the update to the actual desktops
# http://support.citrix.com/proddocs/topic/citrix-broker-admin-v2-xd75/start-brokerrebootcycle-xd75.html
Start-BrokerRebootCycle -AdminAddress $adminAddress -InputObject @($machineCatalogName) -RebootDuration 60 -WarningDuration 15 -WarningMessage $messageDetail -WarningTitle $messageTitle</pre>

Comments or feedback on bugs, better ways to do things or additional steps is welcome. the code is provided as-is, so ensure you test before using in a production environment.