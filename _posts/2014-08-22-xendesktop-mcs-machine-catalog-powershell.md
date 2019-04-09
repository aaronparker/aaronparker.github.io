---
id: 3653
title: Creating an MCS-based XenDesktop Machine Catalog with PowerShell
date: 2014-08-22T11:18:11+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=3653
permalink: /xendesktop-mcs-machine-catalog-powershell/
dsq_thread_id:
  - "2949175355"
pd_rating:
  - 'a:8:{s:4:"type";s:1:"0";s:5:"votes";s:1:"1";s:6:"total1";s:1:"0";s:6:"total2";s:1:"0";s:6:"total3";s:1:"0";s:6:"total4";s:1:"0";s:6:"total5";s:1:"1";s:7:"average";s:6:"5.0000";}'
categories:
  - Automation
tags:
  - PowerShell
  - XenDesktop
---
Driving XenDesktop with PowerShell is a challenge to say the least. While [documentation for the XenDesktop PowerShell modules](http://support.citrix.com/proddocs/topic/xenapp-xendesktop-75/cds-sdk-cmdlet-help.html) is OK and Citrix Studio outputs PowerShell code after you've completed a task in the console, there's still plenty of work to get that code into something usable.

As part of an ongoing series of articles themed around automating virtual desktop deployment, I've written some PowerShell code to automate the creation of an non-persistent, MCS-based Machine Catalog based on [a specific Windows image, that we've already automated]({{site.baseurl}}/briforum-2014-hands-off-my-gold-image-the-slides/) with a solution such as MDT.

Don't expect to copy and paste the PowerShell output in Citrix Studio and have a complete script. The code is missing a number of lines that link tasks together. I found this article on the Citrix Blogs quite useful - [Using PowerShell to Create a Catalog of Machine Creations Services Machines](http://blogs.citrix.com/2012/03/06/using-powershell-to-create-a-catalog-of-machine-creations-services-machines/); however I've taken my script a few steps further.

# Linking the Code to the UI

While the Create Machine Catalog wizard doesn't expose everything that goes on behind the scenes when a machine catalog is created, I think it's still worth showing how specific functions relate to choices that the administrator makes in the wizard.

The screenshots below show just a snippet of the functions required to automate the catalog creation using PowerShell. These walkthrough the same environment that the full code listing at the end of this article is creating. See the image captions for example code that applies to each step.

[_New-BrokerCataog_](http://support.citrix.com/proddocs/topic/citrix-broker-admin-v2-xd75/new-brokercatalog-xd75.html) is used to create the machine catalog and set a number of properties. You'll see [_New-BrokerCatalog_](http://support.citrix.com/proddocs/topic/citrix-broker-admin-v2-xd75/new-brokercatalog-xd75.html) across a number of these screen shots. First up is setting the broker type - in this instance, I'm deploying a Windows 8 image, so need to choose 'Windows Desktop OS':

<figure id="attachment_3654" aria-describedby="caption-attachment-3654" style="width: 806px" class="wp-caption alignnone">[<img class="wp-image-3654 size-full" src="https://stealthpuppy.com/media/2014/08/MachineCatalogType.png" alt="Selecting the Machine Catalog type - New-BrokerCatalog SessionSupport SingleSession" width="806" height="585" srcset="https://stealthpuppy.com/media/2014/08/MachineCatalogType.png 806w, https://stealthpuppy.com/media/2014/08/MachineCatalogType-150x108.png 150w, https://stealthpuppy.com/media/2014/08/MachineCatalogType-300x217.png 300w, https://stealthpuppy.com/media/2014/08/MachineCatalogType-624x452.png 624w" sizes="(max-width: 806px) 100vw, 806px" />]({{site.baseurl}}/media/2014/08/MachineCatalogType.png)<figcaption id="caption-attachment-3654" class="wp-caption-text">Selecting the Machine Catalog type - New-BrokerCatalog -SessionSupport SingleSession*</figure>

Because were using MCS, I'm going to specify that I'm using virtual machines and choose the storage on which to deploy those VMs and use the _ProvisioningType_ parameter on [_New-BrokerCatalog_](http://support.citrix.com/proddocs/topic/citrix-broker-admin-v2-xd75/new-brokercatalog-xd75.html) to specify MCS. This is done in PowerShell via a number of commands - see around line 45 where we specify the hypervisor management and storage resource to use.

<figure id="attachment_3657" aria-describedby="caption-attachment-3657" style="width: 806px" class="wp-caption alignnone">[<img class="size-full wp-image-3657" src="https://stealthpuppy.com/media/2014/08/MachineManagement.png" alt="Selecting the provisioning type - New-BrokerCatalog -ProvisioningType $provType" width="806" height="585" srcset="https://stealthpuppy.com/media/2014/08/MachineManagement.png 806w, https://stealthpuppy.com/media/2014/08/MachineManagement-150x108.png 150w, https://stealthpuppy.com/media/2014/08/MachineManagement-300x217.png 300w, https://stealthpuppy.com/media/2014/08/MachineManagement-624x452.png 624w" sizes="(max-width: 806px) 100vw, 806px" />]({{site.baseurl}}/media/2014/08/MachineManagement.png)<figcaption id="caption-attachment-3657" class="wp-caption-text">Selecting the provisioning type - New-BrokerCatalog -ProvisioningType MCS*</figure>

Also on the [_New-BrokerCatalog_](http://support.citrix.com/proddocs/topic/citrix-broker-admin-v2-xd75/new-brokercatalog-xd75.html), we can specify that this is a set of randomly assigned desktops.

<figure id="attachment_3658" aria-describedby="caption-attachment-3658" style="width: 806px" class="wp-caption alignnone">[<img class="size-full wp-image-3658" src="https://stealthpuppy.com/media/2014/08/DesktopExperience.png" alt="Selecting Random or Static desktops - New-BrokerCatalog -AllocationType Random" width="806" height="585" srcset="https://stealthpuppy.com/media/2014/08/DesktopExperience.png 806w, https://stealthpuppy.com/media/2014/08/DesktopExperience-150x108.png 150w, https://stealthpuppy.com/media/2014/08/DesktopExperience-300x217.png 300w, https://stealthpuppy.com/media/2014/08/DesktopExperience-624x452.png 624w" sizes="(max-width: 806px) 100vw, 806px" />]({{site.baseurl}}/media/2014/08/DesktopExperience.png)<figcaption id="caption-attachment-3658" class="wp-caption-text">Selecting Random or Static desktops - New-BrokerCatalog -AllocationType Random*</figure>

To find the image to use, I've obtained the path to the master image and its snapshot via the _Get-ChildItem_ command (on the path XDHyp:\HostingUnits\<Storage Resource>) and passed that to [_New-ProvScheme_](http://support.citrix.com/proddocs/topic/citrix-machinecreation-admin-v2-xd75/new-provscheme-xd75.html).

<figure id="attachment_3659" aria-describedby="caption-attachment-3659" style="width: 806px" class="wp-caption alignnone">[<img class="size-full wp-image-3659" src="https://stealthpuppy.com/media/2014/08/MasterImageAndSnapshot.png" alt="Selecting the master image and snapshot to use - New-ProvScheme -ProvisioningSchemeName &quot;Windows 8&quot; -HostingUnitName &quot;HV1-LocalStorage -MasterImageVM &quot;XDHyp:\HostingUnits\HV1-LocalStorage\WIN81.vm\MasterImage.snapshot&quot;" width="806" height="585" srcset="https://stealthpuppy.com/media/2014/08/MasterImageAndSnapshot.png 806w, https://stealthpuppy.com/media/2014/08/MasterImageAndSnapshot-150x108.png 150w, https://stealthpuppy.com/media/2014/08/MasterImageAndSnapshot-300x217.png 300w, https://stealthpuppy.com/media/2014/08/MasterImageAndSnapshot-624x452.png 624w" sizes="(max-width: 806px) 100vw, 806px" />]({{site.baseurl}}/media/2014/08/MasterImageAndSnapshot.png)<figcaption id="caption-attachment-3659" class="wp-caption-text">Selecting the master image and snapshot to use - New-ProvScheme -ProvisioningSchemeName "Windows 8" -HostingUnitName "HV1-LocalStorage" -MasterImageVM "XDHyp:\HostingUnits\HV1-LocalStorage\WIN81.vm\MasterImage.snapshot"*</figure>

Also with _[New-ProvScheme](http://support.citrix.com/proddocs/topic/citrix-machinecreation-admin-v2-xd75/new-provscheme-xd75.html)_ we can set the number of virtual CPUs and the amount of RAM to assign to each virtual desktop. To specify the number of desktops to create, we're actually first specifying the number of AD machine accounts to create via _[New-AcctADAccount](http://support.citrix.com/proddocs/topic/citrix-adidentity-admin-v2-xd75/new-acctadaccount-xd75.html)_ and then creating the same number of desktops to assign to those accounts.

<figure id="attachment_3660" aria-describedby="caption-attachment-3660" style="width: 806px" class="wp-caption alignnone">[<img class="size-full wp-image-3660" src="https://stealthpuppy.com/media/2014/08/VirtualMachineConfiguration.png" alt="Selecting the virtual machine configurations - New-ProvScheme -VMCpuCount 2 -VMMemoryMB 2048" width="806" height="585" srcset="https://stealthpuppy.com/media/2014/08/VirtualMachineConfiguration.png 806w, https://stealthpuppy.com/media/2014/08/VirtualMachineConfiguration-150x108.png 150w, https://stealthpuppy.com/media/2014/08/VirtualMachineConfiguration-300x217.png 300w, https://stealthpuppy.com/media/2014/08/VirtualMachineConfiguration-624x452.png 624w" sizes="(max-width: 806px) 100vw, 806px" />]({{site.baseurl}}/media/2014/08/VirtualMachineConfiguration.png)<figcaption id="caption-attachment-3660" class="wp-caption-text">Selecting the virtual machine configurations - New-ProvScheme -VMCpuCount 2 -VMMemoryMB 2048*</figure>

[_New-AcctIdentityPool_](http://support.citrix.com/proddocs/topic/citrix-adidentity-admin-v2-xd75/new-acctidentitypool-xd75.html) is used to create an identity pool that stores the machine accounts by specifying the naming convention and where the accounts will be stored.

<figure id="attachment_3661" aria-describedby="caption-attachment-3661" style="width: 806px" class="wp-caption alignnone">[<img class="size-full wp-image-3661" src="https://stealthpuppy.com/media/2014/08/ActiveDirectoryAndMachineAccountName.png" alt="Setting machine account names and location - New-AcctIdentityPool -Domain 'home.stealthpuppy.com' -NamingScheme 'W8-MCS-###'-NamingSchemeType Numeric -OU 'OU=MCS Pooled,OU=Workstations,DC=home,DC=stealthpuppy,DC=com'" width="806" height="585" srcset="https://stealthpuppy.com/media/2014/08/ActiveDirectoryAndMachineAccountName.png 806w, https://stealthpuppy.com/media/2014/08/ActiveDirectoryAndMachineAccountName-150x108.png 150w, https://stealthpuppy.com/media/2014/08/ActiveDirectoryAndMachineAccountName-300x217.png 300w, https://stealthpuppy.com/media/2014/08/ActiveDirectoryAndMachineAccountName-624x452.png 624w" sizes="(max-width: 806px) 100vw, 806px" />]({{site.baseurl}}/media/2014/08/ActiveDirectoryAndMachineAccountName.png)<figcaption id="caption-attachment-3661" class="wp-caption-text">Setting machine account names and location - New-AcctIdentityPool -Domain 'home.stealthpuppy.com' -NamingScheme 'W8-MCS-###'-NamingSchemeType Numeric -OU 'OU=MCS Pooled,OU=Workstations,DC=home,DC=stealthpuppy,DC=com'*</figure>

Again we can see where _[New-BrokerCataog](http://support.citrix.com/proddocs/topic/citrix-broker-admin-v2-xd75/new-brokercatalog-xd75.html)_ is used to specify the catalog name and description.

<figure id="attachment_3662" aria-describedby="caption-attachment-3662" style="width: 806px" class="wp-caption alignnone">[<img class="size-full wp-image-3662" src="https://stealthpuppy.com/media/2014/08/MachineCatalogNameAndDescription.png" alt="Setting the machine catalog name and description - New-BrokerCatalog  -Name &quot;Windows 8 x86&quot; -Description &quot;Windows 8.1 x86 SP1 with Office 2013&quot;" width="806" height="585" srcset="https://stealthpuppy.com/media/2014/08/MachineCatalogNameAndDescription.png 806w, https://stealthpuppy.com/media/2014/08/MachineCatalogNameAndDescription-150x108.png 150w, https://stealthpuppy.com/media/2014/08/MachineCatalogNameAndDescription-300x217.png 300w, https://stealthpuppy.com/media/2014/08/MachineCatalogNameAndDescription-624x452.png 624w" sizes="(max-width: 806px) 100vw, 806px" />]({{site.baseurl}}/media/2014/08/MachineCatalogNameAndDescription.png)<figcaption id="caption-attachment-3662" class="wp-caption-text">Setting the machine catalog name and description - New-BrokerCatalog -Name "Windows 8 x86" -Description "Windows 8.1 x86 SP1 with Office 2013"*</figure>

There's plenty that the wizard does to hide the complexity of setting up a catalog from the administrator. If you attempt the same via PowerShell, what goes on under the hood is laid bare.

# The Code

Below is the full code listing with comments inline that should provide some detail on the process the code follows. At this point the code provides some error checking for the most important steps. There are still some additional steps and error checking that could be integrated:

  * This code should find the last snapshot of the target master image; it would be simple enough to specify a particular snapshot if required
  * Checking whether provisioning schemes are already available or exist before attempting to create a new provisioning scheme
  * Additional checking that some tasks have completed successfully before continuing

<pre class="lang:ps decode:true " title="PowerShell code to create an MCS-based Machine Catalog in XenDesktop 7.x">#---------------------------------------------------------------------------
# Author: Aaron Parker
# Desc:   Using PowerShell to create a XenDesktop 7.x machine catalog 
# Date:   Aug 19, 2014
# Site:   http://stealthpuppy.com
#---------------------------------------------------------------------------

# Set variables for the target infrastructure
# ----------
$adminAddress = 'xd71.home.stealthpuppy.com' #The XD Controller we're going to execute against
$xdControllers = 'xd71.home.stealthpuppy.com'

# Hypervisor and storage resources
# These need to be configured in Studio prior to running this script
# This script is hypervisor and management agnostic - just point to the right infrastructure
$storageResource = "HV1-LocalStorage" #Storage
$hostResource = "Lab SCVMM" #Hypervisor management

# Machine catalog properties
$machineCatalogName = "Windows 8 x86"
$machineCatalogDesc = "Windows 8.1 x86 SP1 with Office 2013"
$domain = "home.stealthpuppy.com"
$orgUnit = "OU=MCS Pooled,OU=Workstations,DC=home,DC=stealthpuppy,DC=com"
$namingScheme = "W8-MCS-###" #AD machine account naming conventions
$namingSchemeType = "Numeric" #Also: Alphabetic
$allocType = "Random" #Also: Static
$persistChanges = "Discard" #Also: OnLocal, OnPvD
$provType = "MCS" #Also: Manual, PVS
$sessionSupport = "SingleSession" #Also: MultiSession
$masterImage ="WIN81*"
$vCPUs = 2
$VRAM = 2048
# ----------

# Change to SilentlyContinue to avoid verbose output
$VerbosePreference = "Continue"

# Load the Citrix PowerShell modules
Write-Verbose "Loading Citrix XenDesktop modules."
Add-PSSnapin Citrix*

# Get information from the hosting environment via the XD Controller
# Get the storage resource
Write-Verbose "Gathering storage and hypervisor connections from the XenDesktop infrastructure."
$hostingUnit = Get-ChildItem -AdminAddress $adminAddress "XDHyp:\HostingUnits" | Where-Object { $_.PSChildName -like $storageResource } | Select-Object PSChildName, PsPath
# Get the hypervisor management resources
$hostConnection = Get-ChildItem -AdminAddress $adminAddress "XDHyp:\Connections" | Where-Object { $_.PSChildName -like $hostResource }
$brokerHypConnection = Get-BrokerHypervisorConnection -AdminAddress $adminAddress -HypHypervisorConnectionUid $hostConnection.HypervisorConnectionUid
$brokerServiceGroup = Get-ConfigServiceGroup -AdminAddress $adminAddress -ServiceType 'Broker' -MaxRecordCount 2147483647

# Create a Machine Catalog. In this case a catalog with randomly assigned desktops
Write-Verbose "Creating machine catalog. Name: $machineCatalogName; Description: $machineCatalogDesc; Allocation: $allocType"
$brokerCatalog = New-BrokerCatalog -AdminAddress $adminAddress -AllocationType $allocType -Description $machineCatalogDesc -Name $machineCatalogName -PersistUserChanges $persistChanges -ProvisioningType $provType -SessionSupport $sessionSupport
# The identity pool is used to store AD machine accounts
Write-Verbose "Creating a new identity pool for machine accounts."
$identPool = New-AcctIdentityPool -AdminAddress $adminAddress -Domain $domain -IdentityPoolName $machineCatalogName -NamingScheme $namingScheme -NamingSchemeType $namingSchemeType -OU $orgUnit

# Creates/Updates metadata key-value pairs for the catalog (no idea why).
Write-Verbose "Retrieving the newly created machine catalog."
$catalogUid = Get-BrokerCatalog | Where-Object { $_.Name -eq $machineCatalogName } | Select-Object Uid
$guid = [guid]::NewGuid()
Write-Verbose "Updating metadata key-value pairs for the catalog."
Set-BrokerCatalogMetadata -AdminAddress $adminAddress -CatalogId $catalogUid.Uid -Name 'Citrix_DesktopStudio_IdentityPoolUid' -Value $guid

# Check to see whether a provisioning scheme is already available
Write-Verbose "Checking whether the provisioning scheme name is unused."
If (Test-ProvSchemeNameAvailable -AdminAddress $adminAddress -ProvisioningSchemeName @($machineCatalogName))
{
  Write-Verbose "Success."

  # Get the master VM image from the same storage resource we're going to deploy to. Could pull this from another storage resource available to the host
  Write-Verbose "Getting the master image details for the new catalog: $masterImage"
  $VM = Get-ChildItem -AdminAddress $adminAddress "XDHyp:\HostingUnits\$storageResource" | Where-Object { $_.ObjectType -eq "VM" -and $_.PSChildName -like $masterImage }
  # Get the snapshot details. This code will assume a single snapshot exists - could add additional checking to grab last snapshot or check for no snapshots.
  $VMDetails = Get-ChildItem -AdminAddress $adminAddress $VM.FullPath
  
  # Create a new provisioning scheme - the configuration of VMs to deploy. This will copy the master image to the target datastore.
  Write-Verbose "Creating new provisioning scheme using $VMDetails.FullPath"
  # Provision VMs based on the selected snapshot.
  $provTaskId = New-ProvScheme -AdminAddress $adminAddress -ProvisioningSchemeName $machineCatalogName -HostingUnitName $storageResource -MasterImageVM $VMDetails.FullPath -CleanOnBoot -IdentityPoolName $identPool.IdentityPoolName -VMCpuCount $vCPUs -VMMemoryMB $vRAM -RunAsynchronously
  $provTask = Get-ProvTask -AdminAddress $adminAddress -TaskId $provTaskId

  # Track the progress of copying the master image
  Write-Verbose "Tracking progress of provisioning scheme creation task."
  $totalPercent = 0
  While ( $provTask.Active -eq $True ) {
    Try { $totalPercent = If ( $provTask.TaskProgress ) { $provTask.TaskProgress } Else {0} } Catch { }

    Write-Progress -Activity "Creating Provisioning Scheme (copying and composing master image):" -Status "$totalPercent% Complete:" -percentcomplete $totalPercent
    Sleep 15
    $provTask = Get-ProvTask -AdminAddress $adminAddress -TaskID $provTaskId
  }

  # If provisioning task fails, there's no point in continuing further.
  If ( $provTask.WorkflowStatus -eq "Completed" )
  { 
      # Apply the provisioning scheme to the machine catalog
      Write-Verbose "Binding provisioning scheme to the new machine catalog"
      $provScheme = Get-ProvScheme | Where-Object { $_.ProvisioningSchemeName -eq $machineCatalogName }
      Set-BrokerCatalog -AdminAddress $adminAddress -Name $provScheme.ProvisioningSchemeName -ProvisioningSchemeId $provScheme.ProvisioningSchemeUid

      # Associate a specific set of controllers to the provisioning scheme. This steps appears to be optional.
      Write-Verbose "Associating controllers $xdControllers to the provisioning scheme."
      Add-ProvSchemeControllerAddress -AdminAddress $adminAddress -ControllerAddress @($xdControllers) -ProvisioningSchemeName $provScheme.ProvisioningSchemeName

      # Provisiong the actual machines and map them to AD accounts, track the progress while this is happening
      Write-Verbose "Creating the machine accounts in AD."
      $adAccounts = New-AcctADAccount -AdminAddress $adminAddress -Count 5 -IdentityPoolUid $identPool.IdentityPoolUid
      Write-Verbose "Creating the virtual machines."
      $provTaskId = New-ProvVM -AdminAddress $adminAddress -ADAccountName @($adAccounts.SuccessfulAccounts) -ProvisioningSchemeName $provScheme.ProvisioningSchemeName -RunAsynchronously
      $provTask = Get-ProvTask -AdminAddress $adminAddress -TaskId $provTaskId

      Write-Verbose "Tracking progress of the machine creation task."
      $totalPercent = 0
      While ( $provTask.Active -eq $True ) {
        Try { $totalPercent = If ( $provTask.TaskProgress ) { $provTask.TaskProgress } Else {0} } Catch { }

        Write-Progress -Activity "Creating Virtual Machines:" -Status "$totalPercent% Complete:" -percentcomplete $totalPercent
        Sleep 15
        $ProvTask = Get-ProvTask -AdminAddress $adminAddress -TaskID $provTaskId
      }

      # Assign the newly created virtual machines to the machine catalog
      $provVMs = Get-ProvVM -AdminAddress $adminAddress -ProvisioningSchemeUid $provScheme.ProvisioningSchemeUid
      Write-Verbose "Assigning the virtual machines to the new machine catalog."
      ForEach ( $provVM in $provVMs ) {
        Write-Verbose "Locking VM $provVM.ADAccountName"
        Lock-ProvVM -AdminAddress $adminAddress -ProvisioningSchemeName $provScheme.ProvisioningSchemeName -Tag 'Brokered' -VMID @($provVM.VMId)
        Write-Verbose "Adding VM $provVM.ADAccountName"
        New-BrokerMachine -AdminAddress $adminAddress -CatalogUid $catalogUid.Uid -MachineName $provVM.ADAccountName
      }
      Write-Verbose "Machine catalog creation complete."

   } Else {
    # If provisioning task fails, provide error
    # Check that the hypervisor management and storage resources do no have errors. Run 'Test Connection', 'Test Resources' in Citrix Studio
    Write-Error "Provisioning task failed with error: [$provTask.TaskState] $provTask.TerminatingError"
   }
}
</pre>

Comments or feedback on bugs, better ways to do things or additional steps is welcome.