---
layout: post
title: Hosting a Patch My PC Publisher server in Microsoft Azure
description: Hosting Patch My PC in Microsoft Azure is a cost-effective way to provision
  applications into Microsoft Intune.
permalink: "/patchmypc-azure/"
image:
  path: "/assets/img/surface/image.jpg"
  srcset:
    1920w: "/assets/img/surface/image.jpg"
    960w: "/assets/img/surface/image@0,5x.jpg"
    480w: "/assets/img/surface/image@0,25x.jpg"
categories:
- General
date: 2022-01-06 00:20 +1100
---
* this unordered seed list will be replaced by the toc
{:toc}

[Patch My PC](https://patchmypc.com/) is a great solution for managing Windows application packages for Microsoft Endpoint Configuration Manager and Microsoft Intune.

Cloud native or cloud hybrid organisations, particularly those who are using Microsoft Intune only to manage Windows desktops, will need to consider where to run the Patch My PC Publisher. A virtual machine hosted in Azure is a natural choice for these organisations. In this article, I'll provide an approach to deploying the Patch My PC Publisher into Microsoft Azure, with costs, using a real world example.

## The Customer's Environment

The example I'm using for this article is a customer environment that is cloud native - all Windows PCs are Azure AD joined and managed with Microsoft Intune, and no Active Directory domain exists. The environment isn't particularly large in terms of devices; however, they do have a wide range of applications deployed across managed desktops, in part due to the technical nature of their business and developers on staff.

Patch My PC is configured to package a relatively high number of application packages and updates, and push these into the Microsoft Intune tenant.

The customer does have presence in Microsoft Azure to run virtual machines for a number of infrastructure roles, thus the Patch My PC Publisher server is deployed into Azure.

## System Requirements

The Patch My PC Publisher is a Windows service and console application that must, of course, run on Windows. The documentation covers the [system requirements](https://docs.patchmypc.com/installation-guides/intune/requirements). The real world environment that I'll cover in this article differs from the system requirements in two ways:

1. 8GB RAM - we've been able to deploy a VM with 4GB RAM and run the publisher comfortably. Available memory rarely dips below 2.5GB
2. Supported Windows - the publisher runs OK on Windows Server 2022, even though that version is not in the list of supported operating systems

## Azure Architecture

The virtual machine used to host the Patch My PC Publisher service is hosted in a dedicated resource group and a dedicated virtual network in Australia East.

[![A view of the Azure resource group hosting the Patch My PC resources]({{site.baseurl}}/media/2022/01/patchmypc-rg.png)]({{site.baseurl}}/media/2022/01/patchmypc-rg.png)

The Azure resource group with Patch My PC resources
{:.figcaption}

This resource group contains the following objects:

| **NAME** | **TYPE** | **DESCRIPTION** |
|-----|-----|-----|
| nsg-PatchMyPCDefault-AustraliaEast | Network security group | Controls inbound and outbound access to the vnet |
| pmp-aue01 | Virtual machine | The virtual machine hosting the Patch My PC Publisher |
| pmp-aue01-ip | Public IP address | A public IP address to provide inbound access to the VM |
| pmp-aue01497 | Network interface | Network interface for the VM |
| pmp-aue01_OsDisk_1 | Disk | Operating system virtual disk |
| rgpatchmypcaustraliaeast | Storage account | Storage account for VM diagnostics |
| vnet-PatchMyPC-AustraliaEast | Virtual network | The isolated virtual network for the VM |

### Networking

The Patch My PC Publisher service does not require integration with any other services that might be hosted in Azure, thus the VM is hosted in dedicated virtual network with no routing to any existing vnets. Adding additional network controls such as Azure Firewall could be used to control outbound access to [required services](https://patchmypc.com/list-of-domains-used-for-downloads-in-patch-my-pc-update-catalog). If you're already running Azure Firewall or a 3rd party solution, then peering the virtual network to an existing vnet might be warranted.

The network security group is configured with the default security rules but does include inbound access to the network for RDP access to the VM from a fixed IP address. The Patch My PC Publisher console is a Windows-based application, thus access to the VM is required. The inbound RDP access could be replaced with [Azure Bastion](https://azure.microsoft.com/en-au/services/azure-bastion/).

## Virtual Machine

The Patch My PC Publisher service is configured to check for updates and import application packages into the Intune tenant once per day at 7pm. This means that for the majority of the time it's not actually doing much.

Here's a look at the performance of the virtual machine hosting the Patch My PC Publisher service over the past 30 days:

[![Azure virtual machine performance over the past 30 days]({{site.baseurl}}/media/2022/01/patchmypc-vm-perf.png)]({{site.baseurl}}/media/2022/01/patchmypc-vm-perf.png)

Azure virtual machine performance over the past 30 days
{:.figcaption}

From a CPU and RAM perspective, the VM has plenty of spare capacity. If this virtual machine needed to run multiple update schedules per day or package additional applications in the tenant, it would still be completing that task comfortably at this VM size.

This use-case then lends itself well to a [B-series virtual machine](https://docs.microsoft.com/en-us/azure/virtual-machines/sizes-b-series-burstable). With the RAM usage we're seeing in this environment, a **B2s** provides all the performance required for this service.

### VM Configurations

This virtual machine has a few notable configuration choices:

* The VM size is a B2s, sized down from the original B2ms
* This is a v2 virtual machine with a vTPM and Secure Boot configured
* The OS disk is sized as the default E10 (127 GB) as Standard SSD
* Windows Update is configured to be self-managed; however, [Update Management](https://docs.microsoft.com/en-us/azure/automation/update-management/overview) could be configured to centrally manage and report on updates
* [Azure AD authentication](https://docs.microsoft.com/en-us/azure/active-directory/devices/howto-vm-sign-in-azure-ad-windows) to the virtual machine is enabled to allow authorised administrators to sign into the VM without needing to manage local accounts

## Resource Costs

Here's a look the Azure costs associated with this virtual machine over the past 30 days:

[![Azure resource costs]({{site.baseurl}}/media/2022/01/patchmypc-totalcosts.png)]({{site.baseurl}}/media/2022/01/patchmypc-totalcosts.png)

Total Azure resource costs over the past 30 days
{:.figcaption}

The $85.90 cost here is in **Australian dollars**, which equates to $61.87 **USD**. The Aussie dollar isn't very strong against the USD right now, with $1AUD only buying $0.72USD. Regardless, this cost is tiny, compared to the customer's total monthly Azure spend.

This cost will be about 42% lower once a [reservation](https://docs.microsoft.com/en-us/azure/cost-management-billing/reservations/manage-reserved-vm-instance) is applied to the virtual machine. The Patch My PC license is for 12 months, so it makes sense to reserve the VM for the next 12 months as well.

Costs could also be reduced by using an E6 disk instead of the E10. The operating system disk hosts Windows only, so at 64 GB the OS disk should not run out of space.

### Variable Costs

Here's a look at the variable costs - disk operations and egress traffic:

[![Azure resource costs]({{site.baseurl}}/media/2022/01/patchmypc-resourcecosts.png)]({{site.baseurl}}/media/2022/01/patchmypc-resourcecosts.png)

Azure resource cost breakdown
{:.figcaption}

This equates to **17,050,000** disk operations and about **11 GB** internet egress traffic.

The previous month, when the VM was orginally set up, had very similar disk operations; however, costs related to internet egress traffic ($2.22AUD) amounted to approximately 18 GB worth of traffic.

## Patch My PC Configuration

The configuration of the Patch My PC Publisher service is relatively standard across every environment. For deployment in Microsoft Azure, you may want to consider the following:

* The Patch My PC Publisher [content folder](https://patchmypc.com/customize-content-download-and-log-save-location) location is configured with a path that's on the VM's temporary storage disk. This ensures that the OS isn't affected by disk performance during a packaging operation; however, keep in mind that a B2s has only **8 GB** of temp disk. This should be sufficient for most environments as application binaries are deleted after the pacakge is uploaded into Intune. If you need more temporary storage, you'll need to step up to a B2ms
* [Azure Backup](https://docs.microsoft.com/en-us/azure/backup/backup-azure-vms-introduction) could be configured for the virtual machine; however, it is possible to [backup and restore the Publisher settings](https://patchmypc.com/backup-and-restore-publisher-settings). The Patch My PC Publisher is largely stateless - if you were to lose the VM, you could deploy a new VM, install the Patch My PC Publisher, import the settings backup and configure the connection to Microsoft Intune. All that is needed is a method to backup the `settings.xml` - backup to a git repository would be a simple solution allowing you to track changes over time

## Automating Deployment of a Patch My PC Publisher VM

Now that we know what the environment looks like to host the Patch My PC Publisher, let's automate the provisioning of the new environment, including installing the Patch My PC Publisher service.

The following code uses the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/) to perform the following:

1. Sign-in to an Azure subscription (replace the GUID)
2. Create a resource group in Australia East
3. Create a network security group - note that this code will not create an inbound RDP rule for you
4. Create a virtual network
5. Enable the Microsoft.Storage endpoint on the default subnet in the new vnet
6. Create a storage account for VM diagnostics and ensure that it can only be access from the vnet
7. Create a new virtual machine of size `Standard_B2s` running Windows Server 2022
8. Enable Azure AD sign-in to the virtual machine
9. Enable the IaaS anti-malware extension
10. Download and install the Patch My PC Publisher, configuring it for use with Intune only
11. Finally, display the public IP address of the new VM

Here's the code:

```shell
# file: "New-PatchMyPcVirtualMachine.sh"
# Login and select the target subscription
az login --use-device-code
az account set --subscription 63e8f660-f6a4-4ac5-ad4e-623268509f20

# Create the resource group
az group create \
    --name rg-PatchMyPC-AustraliaEast \
    --location AustraliaEast \
    --tags environment=production function=PatchMyPc

# Create the network security group
az network nsg create \
  --resource-group rg-PatchMyPC-AustraliaEast \
  --name nsg-pmp \
  --tags environment=production function=PatchMyPc

# Create the virtual network with a single subnet
az network vnet create \
  --name vnet-PatchMyPC-AustraliaEast \
  --location AustraliaEast \
  --resource-group rg-PatchMyPC-AustraliaEast \
  --address-prefix 10.0.0.0/16 \
  --subnet-name subnet-pmp \
  --subnet-prefixes 10.0.0.0/24 \
  --network-security-group nsg-pmp \
  --tags environment=production function=PatchMyPc

# Enable the Microsoft.Storage service endpoint for the subnet
az network vnet subnet update \
  --vnet-name vnet-PatchMyPC-AustraliaEast \
  --resource-group rg-PatchMyPC-AustraliaEast \
  --name subnet-pmp \
  --service-endpoints Microsoft.Storage

# Create a storage account for VM diags
az storage account create \
  --name sadiagspmpaue \
  --resource-group rg-PatchMyPC-AustraliaEast \
  --location AustraliaEast \
  --sku Standard_LRS \
  --allow-blob-public-access false \
  --bypass AzureServices \
  --default-action Deny \
  --encryption-key-source Microsoft.Storage \
  --https-only true \
  --min-tls-version TLS1_2 \
  --public-network-access Disabled \
  --subnet subnet-pmp \
  --vnet-name vnet-PatchMyPC-AustraliaEast \
  --tags environment=production function=PatchMyPc

# Create a public IP address
az network public-ip create \
  --name pmp01-pip \
  --resource-group rg-PatchMyPC-AustraliaEast \
  --location AustraliaEast \
  --allocation-method Dynamic \
  --sku Basic \
  --tags environment=production function=PatchMyPc

# Create a NIC for the VM
az network nic create \
  --name pmp01-nic01 \
  --resource-group rg-PatchMyPC-AustraliaEast \
  --location AustraliaEast \
  --vnet-name vnet-PatchMyPC-AustraliaEast \
  --subnet subnet-pmp \
  --public-ip-address pmp01-pip \
  --tags environment=production function=PatchMyPc

# Create the virtual machine
az vm create \
  --resource-group rg-PatchMyPC-AustraliaEast \
  --name pmp01 \
  --location AustraliaEast \
  --admin-password 'dX63saQYXxeUwCiQ' \
  --admin-username rmuser \
  --boot-diagnostics-storage sadiagspmpaue \
  --image 'MicrosoftWindowsServer:WindowsServer:2022-datacenter-azure-edition:latest' \
  --size Standard_B2s \
  --nics pmp01-nic01 \
  --security-type TrustedLaunch \
  --enable-secure-boot true \
  --enable-vtpm true \
  --tags environment=production function=PatchMyPc

# Enable Azure AD sign-in
az vm extension set \
    --publisher Microsoft.Azure.ActiveDirectory \
    --name AADLoginForWindows \
    --resource-group rg-PatchMyPC-AustraliaEast \
    --vm-name pmp01

# Enable the IaaS anti-malware extension
az vm extension set \
    --publisher Microsoft.Azure.Security \
    --name IaaSAntimalware \
    --resource-group rg-PatchMyPC-AustraliaEast \
    --vm-name pmp01

# Download and install the PMP Publisher
az vm run-command invoke \
    --command-id RunPowerShellScript \
    --name pmp01 \
    --resource-group rg-PatchMyPC-AustraliaEast \
    --scripts 'md C:\Temp' \
    'iwr -Uri https://patchmypc.com/scupcatalog/downloads/publishingservice/PatchMyPC-Publishing-Service.msi -OutFile C:\Temp\PatchMyPC-Publishing-Service.msi -UseBasicParsing' \
    'Install-WindowsFeature -Name UpdateServices-API' \
    'msiexec /i C:\Temp\PatchMyPC-Publishing-Service.msi INTUNEONLYMODE=1 RUNAPPLICATION=0 /qn'

# Show the public IP address of the new VM
az network public-ip show \
  --resource-group rg-PatchMyPC-AustraliaEast  \
  --name pmp01-pip \
  --query ipAddress \
  --output tsv
```

Using az to create a resource group, virtual network, VM and install Patch My PC
{:.figcaption}

## Summary

Deploying and managing Windows PCs, Azure Virtual Desktop, and Windows 365 etc., requires that applications are kept current to protect an organisation from malware and attackers.

Most organisations will fail to achieve this goal if they are manually packaging and updating applications - today's application environment moves far too quickly to keep pace. A solution to automatically package applications is part of the answer.

I've seen first hand organisations moving to a Microsoft Intune-based, cloud native approach to managing Windows. When using the Patch My PC Publisher that still runs on Windows, a simple, low cost approach to deploying the this service is needed.

In this article, I've provided an approach to deployment of Patch My PC in Azure and the costs to run it. Given how the Patch My PC Publisher works, the costs should be good guidance for an organisation of any size.
