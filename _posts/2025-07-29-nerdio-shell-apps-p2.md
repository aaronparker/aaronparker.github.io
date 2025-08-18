---
layout: post
title: Automating Nerdio Manager Shell Apps, with Evergreen, Part 2
description: Using Azure Pipelines and Evergreen for hands off creation of Shell Apps in Nerdio Manager.
permalink: "/nerdio-shell-apps-p2/"
image:
  path: "/assets/img/shell/image.jpg"
  srcset:
    1920w: "/assets/img/shell/image.jpg"
    960w: "/assets/img/shell/image@0,5x.jpg"
    480w: "/assets/img/shell/image@0,25x.jpg"
comments: true
date: 2025-07-30 14:00 +1000
related_posts:
- 2025-07-29-nerdio-shell-apps.md
- 2025-07-29-nerdio-shell-apps-p3.md
- 2023-12-20-user-acceptance-testing-for-vdi-with-azure-devops.md
---
- this unordered seed list will be replaced by the toc
{:toc}

In the [previous article](https://stealthpuppy.com/nerdio-shell-apps-p1/), we explored how to automate the creation of Nerdio Manager [Shell Apps](https://nmehelp.getnerdio.com/hc/en-us/articles/25499430784909-UAM-Shell-apps-overview-and-usage) with [Evergreen](https://stealthpuppy.com).

Although running a PowerShell script that runs through a list of applications and creates Shell Apps might be fun to watch in an interactive console window, we can take this further and use Azure Pipelines to create a fully automated pipeline. The pipeline can now run on a schedule to import new version of applications or as new application definitions are added to the repository.

In this screenshot, we can see the pipeline running to read the application definition files, find new versions of the application and create or update the Shell Apps as needed.

![An Azure Pipeline run that imports Nerdio Manager Shell Apps](/media/2025/07/azure-pipeline.jpeg)

An Azure Pipeline run that imports Nerdio Manager Shell Apps.
{:.figcaption}

## Tools to Build a Pipeline

To create this pipeline, we need to set up a few things:

1. An Azure DevOps organisation - see [Create an organization](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/create-organization?view=azure-devops)
2. An Azure DevOps project with a Git repository - see [Create a project in Azure DevOps](https://learn.microsoft.com/en-us/azure/devops/organizations/projects/create-project?view=azure-devops&tabs=browser)
3. An Azure resource group and storage account - this is used to host the application binaries in blob storage and we need to assign permissions to enable the pipeline to upload files
4. An Azure managed identity - this will be used by Azure Pipelines to securely authenticate to the target storage account.  See [What are managed identities for Azure resources?](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview)

In this article, I'm not going to run through the creation of these resources in detail, instead I am assuming you are familiar with these services and may have configured them in your environment already.

### A note on secure environments

The pipeline covered in this article, assumes that you will use [Microsoft-hosted Azure Pipelines agents](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/hosted), which will require the target storage account to be publically accessible. If you have requirements to only access the storage account over private endpoints, you can use [self-hosted Azure Pipelines agents](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/linux-agent) that run in an Azure virtual network that has direct access to the storage account.

Additionally, if you also have restrictions on internet access, the Evergreen API can be used to [list the required endpoints](https://stealthpuppy.com/evergreen/endpoints/) to detect and download application binaries.

## DevOps Project

After you have created an Azure DevOps project with a Git repository, you'll need to add several files and an expected directory structure:

* `pipeline.yml` - this is the Azure Pipeline that defines how the pipeline should execute and import Shell Apps
* `NerdioShellApps.psm1` - a module with functions required for automating the import of Shell Apps
* `apps` - a directory that contains Shell App definitions with a directory per-application with the following files:

    * **Definition.json** - includes a definition of the Shell App required during import. This file also includes logic that tells Evergreen how to find the application version and binaries
    * **Detect.ps1** - is used in the Shell App to detect the installed application
    * **Install.ps1** - installs the Shell App
    * **Uninstall.ps1** - uninstalls the Shell App

The `apps` directory can be organised how you like, for example, applications can be organised as sub-directories in a directory for each application vendor, but this is not a hard requirement. Just ensure that each application is organised in its own directory.

![An Azure DevOps project repository showing the list of files in the repo](/media/2025/07/azure-repo.jpeg)

An example Azure DevOps project repository with the expected directory and file structure.
{:.figcaption}

We will look at the pipeline in more detail later, but managing the application definitions in a Git repository allows you to use version control for the files, manage the code as maturely as your processes allow, and for the pipeline to trigger when new applications are added to the repository.

## Configure Authentication

To allow the pipeline to upload application binaries to the target storage account, we need to configure a [service connection](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/service-endpoints?view=azure-devops). This will use the Azure managed identity 

![Creating an Azure Pipelines service connection using a managed identity](/media/2025/07/azure-service-connection.jpeg)

Creating an Azure Pipelines service connection using a managed identity.
{:.figcaption}

1. Create a new service connection and select **Azure Resource Manager**
2. Select the subscription, resource group and managed identity
3. Select the scope for the service connection - subscription or management group
4. Select the resource group for the service connection - this is optional, but useful for scoping the connection to the resource group that contains the target storage account
5. Give the service connection a name and save to create the service connection. The pipeline will need to be updated with the name of the service connection under `Variables / service`

## Configure Permissions

After creating the service connection, don't forget to assign the **Storage Blob Data Contributor** role to the managed identity on the target storage account.

The screenshot below shows the managed identity with the Contributor inherited from the resource group and with the Storage Blob Data Contributor role directly on the storage account. Either approach will work; however, it is best to assign the most finely grained permission to the managed identity as you can. You may also want to dedicate a storage account to hosting application binaries so the managed identity only has access to that storage account and no others.

![Assigning the 'Storage Blob Data Contributor' role on the storage account to the managed identity](/media/2025/07/azure-iam.jpeg)

Assign the 'Storage Blob Data Contributor' role on the storage account to the managed identity.
{:.figcaption}

## Configure Pipeline Variables

The pipeline requires variables to be passed into during execution. These should be stored in a variable group named **Credential** in in [Asset library](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/?view=azure-devops). These variables can be stored directly in the libary or be linked from an Azure Key Vault.

* **TenantId** - the Entra ID tenant
* **ClientId** - the app registration client ID specified in Nerdio Manager (Settings / Environment / Integrations / REST API)
* **ClientSecret** - the app registration client secret specified in Nerdio Manager (Settings / Environment / Integrations / REST API). Ensure this variable is configured as secret to protect its value
* **ApiScope** - the API scope specified in Nerdio Manager (Settings / Environment / Integrations / REST API)
* **OAuthToken** - the OAuthToken specified in Nerdio Manager (Settings / Environment / Integrations / REST API)
* **NmeHost** - the Nerdio Manager host name (in the format `nmw-app-s6uhdllx6esom.azurewebsites.net`)
* **SubscriptionId** - the Azure subscription that hosts the target storage account
* **ResourceGroupName** - the Azure resource group that hosts the target storage account
* **StorageAccountName** - the target storage account that will host application binaries
* **ContainerName** - the blob container name on the target storage account

![Credential variables stored in a DevOps asset library](/media/2025/07/devops-library-secrets.jpeg)

Credential variables stored in a DevOps asset library.
{:.figcaption}

After creating the pipeline, enable access the variable group by authorising the pipeline: [Use variable groups in pipelines](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/variable-groups?view=azure-devops&tabs=azure-pipelines-ui%2Cyaml#use-variable-groups-in-pipelines)

## Create the Pipeline

With the code commited to the repository and resources configured, create the pipline:

1. Select **Pipelines**
2. Click **New Pipeline**
3. Select **Azure Repos Git**
4. Select the repository
5. Choose **Existing Azure Pipelines YAML**
6. Select the 'main' branch and then `/pipeline.yml` in the path
7. Review and save the pipeline

The pipeline should now be ready to execute and import Shell Apps into Nerdio Manager.

## Pipeline Code

The pipeline code is listed below and is available [here](https://github.com/aaronparker/nerdio-actions/tree/main/shell-apps). The pipeline essentially does the following:

* Run when new or modified application definitions are added to the `apps` directory in the `main` branch
* Run every 24 hours to update existing Shell Apps with new application versions
* It queries for existing Shell Apps to determine whether the app already exists
* If the Shell App does exist, it then determines whether a new version is available before updating the existing Shell App with a new version
* Finally, the list of Shell Apps in Nerdio Manager will be displayed, along with the lasted version of each Shell App

```yaml
# Automate the import of Nerdio Manager Shell Apps with Evergreen

# Trigger the pipeline on change to the 'apps' directory
trigger:
    branches:
        include: [ main ]
    paths:
        include: [ "apps/**" ]

# Also run the pipeline on a schedule to update new versions of apps
schedules:
  - cron: "0 17 * * *"
    displayName: Daily 2AM Run (AEST)
    branches:
      include:
        - main
    always: true

# Run the pipeline on an Ubuntu runner (and in PowerShell 7)
pool:
  vmImage: ubuntu-latest

# Variables - the credentials group and the service connection name
variables:
- group: 'Credentials'
- name: service
  value: 'sc-rg-Avd1Images-aue'

jobs:
- job: Import
  displayName: 'Import Nerdio Shell Apps'

  steps:
  # Checkout the repository so we have access to the module and app definitions
  - checkout: self
    displayName: 'Checkout repository'

  # Install the required PowerShell modules
  - pwsh: |
      Install-Module -Name "Evergreen" -AllowClobber -Force -Scope CurrentUser
    name: modules
    displayName: 'Install Modules'
    workingDirectory: $(build.sourcesDirectory)
    errorActionPreference: stop

  # Validate connection to Azure using the service connection
  - task: AzurePowerShell@5
    name: auth
    displayName: 'Azure Login'
    inputs:
      azureSubscription: '$(service)'
      ScriptType: 'InlineScript'
      Inline: |
        Write-Host "Authenticated to Azure using service connection: $(service)"
        Set-AzContext -SubscriptionId $(SubscriptionId) -TenantId $(TenantId)
      azurePowerShellVersion: 'LatestVersion'
      errorActionPreference: stop
      pwsh: true
      workingDirectory: $(build.sourcesDirectory)

  # Authenticate to Nerdio Manager, set the Azure conext, and import the shell apps
  # This code checks whether the app already exists before importing or updating it
  - task: AzurePowerShell@5
    name: import
    displayName: 'Import Shell Apps'
    inputs:
      azureSubscription: '$(service)'
      ScriptType: 'InlineScript'
      Inline: |
        $InformationPreference = "Continue"
        Import-Module -Name "Az.Accounts", "Az.Storage", "Evergreen" -Force
        Import-Module -Name "./NerdioShellApps.psm1" -Force
        Set-AzContext -SubscriptionId $(SubscriptionId) -TenantId $(TenantId)
        $params = @{
            ClientId           = "$(ClientId)"
            ClientSecret       = "$(ClientSecret)"
            TenantId           = "$(TenantId)"
            ApiScope           = "$(ApiScope)"
            SubscriptionId     = "$(SubscriptionId)"
            OAuthToken         = "$(OAuthToken)"
            ResourceGroupName  = "$(resourceGroupName)"
            StorageAccountName = "$(storageAccountName)"
            ContainerName      = "$(containerName)"
            NmeHost            = "$(nmeHost)"
        }
        Set-NmeCredentials @params
        Connect-Nme
        $Path = Join-Path -Path $(build.sourcesDirectory) -ChildPath "apps"
        $Paths = Get-ChildItem -Path $Path -Include "Definition.json" -Recurse | ForEach-Object { $_ | Select-Object -ExpandProperty "DirectoryName" }
        foreach ($Path in $Paths) {
            $Def = Get-ShellAppDefinition -Path $Path
            $App = Get-EvergreenAppDetail -Definition $Def
            $ShellApp = Get-ShellApp | ForEach-Object {
                $_.items | Where-Object { $_.name -eq $Def.name }
            }
            if ($null -eq $ShellApp) {
                Write-Information -MessageData "$($PSStyle.Foreground.Cyan)Importing: $($Def.name)"
                New-ShellApp -Definition $Def -AppDetail $App
            }
            else {
                $ExistingVersions = Get-ShellAppVersion -Id $ShellApp.Id | ForEach-Object {
                    $_.items | Where-Object { $_.name -eq $App.Version }
                }
                if ($null -eq $ExistingVersions -or [System.Version]$ExistingVersions.name -lt [System.Version]$App.Version) {
                    New-ShellAppVersion -Id $ShellApp.Id -AppDetail $App
                }
                else {
                    Write-Information -MessageData "$($PSStyle.Foreground.Yellow)Shell app version exists: '$($Def.name) $($App.Version)'. No action taken."
                }
            }
        }
      azurePowerShellVersion: 'LatestVersion'
      errorActionPreference: stop
      pwsh: true
      workingDirectory: $(build.sourcesDirectory)

  # List the Shell Apps in Nerdio Manager
  - task: AzurePowerShell@5
    name: list
    displayName: 'List Shell Apps'
    inputs:
      azureSubscription: '$(service)'
      ScriptType: 'InlineScript'
      Inline: |
        Import-Module -Name "./NerdioShellApps.psm1" -Force
        $params = @{
            ClientId           = "$(ClientId)"
            ClientSecret       = "$(ClientSecret)"
            TenantId           = "$(TenantId)"
            ApiScope           = "$(ApiScope)"
            SubscriptionId     = "$(SubscriptionId)"
            OAuthToken         = "$(OAuthToken)"
            ResourceGroupName  = "$(resourceGroupName)"
            StorageAccountName = "$(storageAccountName)"
            ContainerName      = "$(containerName)"
            NmeHost            = "$(nmeHost)"
        }
        Set-NmeCredentials @params
        Connect-Nme
        (Get-ShellApp).items | ForEach-Object {
            [PSCustomObject]@{
                publisher     = $_.publisher
                name          = $_.name
                latestVersion = ((Get-ShellAppVersion -Id $_.id).items | `
                        Where-Object { $_.isPreview -eq $false } | `
                        Sort-Object -Property @{ Expression = { [System.Version]$_.Version }; Descending = $true } | `
                        Select-Object -First 1).name
                createdAt     = $_.createdAt
                fileUnzip      = $_.fileUnzip
                isPublic      = $_.isPublic
                id            = $_.id
            }
        } | Format-Table -AutoSize
      azurePowerShellVersion: 'LatestVersion'
      errorActionPreference: stop
      pwsh: true
      workingDirectory: $(build.sourcesDirectory)
```

## Summary

In this article, I've demonstrated how to create an automated pipeline that will continuously run to create or update Shell Apps in Nerdio Manager. Leveraging Azure Pipelines enables you to manage the Shell Apps creation pipeline as a completely automated solution and saves Nerdio Manager administrators many hours of valuable time.

Using Evergreen as a source for discovery of application version and installers, enables the deployment of Shell Apps from [a library of 374 applications and 6712 unique application installers](https://stealthpuppy.com/apptracker/). This list covers most of the off the shelf applications typically used in Windows desktop environments.

In the next part of this article series, I'll cover how to use this framework to import other applications, not supported by Evergreen, into Nerdio Manager Shell Apps.
