---
layout: post
title: An Intune Package Factory for the Microsoft 365 Apps
description: Using PowerShell and GitHub Actions to automate the packaging of the
  Microsoft 365 Apps and import into an Intune tenant.
permalink: "/m365apps-package-factory/"
image:
  path: "/assets/img/package/image.jpg"
  srcset:
    1920w: "/assets/img/package/image.jpg"
    960w: "/assets/img/package/image@0,5x.jpg"
    480w: "/assets/img/package/image@0,25x.jpg"
comments: true
related_posts:
- _posts/2023-04-09-support-frontline-workers-on-shared-virtual-desktops.md
- _posts/2023-04-10-deploy-the-microsoft-365-apps-a-single-package.md
date: 2023-04-21 09:00 +1000
---
- this unordered seed list will be replaced by the toc
{:toc}

Deploying the [Microsoft 365 Apps via Microsoft Intune]({{site.baseurl}}/office-365-proplus-deploy-intune/) is as simple as [using using the built in tools to create a package](https://docs.microsoft.com/en-us/mem/intune/apps/apps-add-office365) without having to manually package any binaries.

[![Creating a Microsoft 365 Apps package in Intune]({{site.baseurl}}/media/2023/04/m365apps.jpeg)]({{site.baseurl}}/media/2023/04/m365apps.jpeg)

Creating a Microsoft 365 Apps package in the Microsoft Intune admin center
{:.figcaption}

This approach works great for new devices, particularly PCs deployed via Windows Autopilot. However, there are challenges with the in-built package solution.

## The Problem

The in-built Microsoft 365 Apps package doesn't consistently upgrade older versions of Microsoft Office. At [Insentra](https://insentragroup.com) seen issues with failed deployments due to a failure in the package upgrading over existing Microsoft Office installations in several customer environments.

Additionally, the in-built Microsoft 365 Apps package cannot be used as a dependency by another Win32 application package (e.g., ensure the Microsoft 365 Apps is installed before an add-in package is installed).

If your environment experiences upgrade issues or you need to use the Dependencies feature, you'll need to create [a custom Win32 application package](https://docs.microsoft.com/en-us/mem/intune/apps/apps-win32-app-management) to deploy the Microsoft 365 Apps.

For small environments, creating a custom package could be a one off action, thus the package can be created manually; however, for larger environments you could create multiple packages, and could have a team of engineers creating packages. This could be in house engineers, or consultant or managed services engineers working across multiple customer environments. In these environments, it's important to ensure consistency across multiple packages - without packages built to a common standard, your devices could experience inconsistent deployments and you'll spend more time troubleshooting issues.

How do we ensure standardisation and a simple method for creating Microsoft 365 Apps packages? _With automation, of course_.
{:.note title="Consider this"}

## Anatomy of a Microsoft 365 Apps Win32 Package

Let's start by taking a look at what should be included in a custom Microsoft 365 Apps Win32 package:

- A `configuration.xml` that defines the Microsoft 365 Apps package. Create the configuration XMl files in the [Office Customization Tool](https://docs.microsoft.com/en-us/deployoffice/admincenter/overview-office-customization-tool)
- An `uninstall.xml` that defines removal of the Microsoft 365 Apps from a target PC
- `setup.exe` from the [Office Deployment Tool](https://www.microsoft.com/en-au/download/details.aspx?id=49117). This will process the `configuration.xml` and the `uninstall.xml` to install or uninstall the Microsoft 365 Apps
- A detection method for Intune to determine whether the application is installed. Microsoft lists the existence of the `HKLM\Software\Microsoft\Windows\CurrentVersion\Uninstall\O365ProPlusRetail - en-us` registry key [in the documentation](https://docs.microsoft.com/en-us/deployoffice/deploy-microsoft-365-apps-configuration-manager-2012r2); however, this is a very simple approach and you may want instead use registry keys or values unique to your package. The registry key `HKLM\SOFTWARE\Microsoft\Office\ClickToRun\Configuration` includes several values useful for detection rules.
- For upgrade scenarios, Microsoft provides [scripts that are useful for uninstalling and cleaning](https://github.com/OfficeDev/Office-IT-Pro-Deployment-Scripts/tree/master/Office-ProPlus-Deployment/Deploy-OfficeClickToRun) up older versions of Microsoft Office. These VBScripts provide a more consistent result than relying on the Office Deployment Tool to complete the uninstall and upgrade.
- Finally, wrapping the install package with the [PSAppDeployToolkit](https://psappdeploytoolkit.com/) provides additional install logic and handling, particularly for in-place upgrades on existing devices.

## The Solution

To solve this challenge, I've built PowerShell packaging factory for the Microsoft 365 Apps and Microsoft Intune, that can be run locally or via GitHub Actions.

The [Microsoft 365 Apps packager repository](https://github.com/aaronparker/m365apps) consists of the following:

* `New-Microsoft365AppsPackage.ps1` - This is the key script that creates and imports a Microsoft 365 Apps package into Intune. The script can be run on a Windows machine in a copy of the repository or via GitHub Actions (if you clone the repository)
* `Create-Win32App.ps1` imports the intunewin package into the target Intune tenant, using `App.json` as the template. This script uses the `IntuneWin32App` PowerShell module and is called by `New-Microsoft365AppsPackage.ps1` to import the package into an Intune tenant
* Template Microsoft 365 Apps deployment configurations - deployment configurations are created in the [Microsoft 365 Apps admin center](https://config.office.com/), but every organisation is going to deploy a similar configuration, so these templates should be suitable for the most common deployments
* A GitHub workflow that uses `New-Microsoft365AppsPackage.ps1` to package the Microsoft 365 Apps on a GitHub hosted runner - the workflow can import the package into an Intune tenant. It also uploads the generated Microsoft 365 Apps package [a workflow artifact](https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts) for importing into Intune manually

### Requirements

`New-Microsoft365AppsPackage.ps1` must be run on a supported Windows version, and has been written for PowerShell 5.1. Parameters for `New-Microsoft365AppsPackage.ps1` are:

| Parameter | Description | Required |
|:--|:--|:--|
| Path | Path to the top level directory of the m365apps repository on a local Windows machine. | No |
| ConfigurationFile | Full path to the [Microsoft 365 Apps package configuration file](https://learn.microsoft.com/en-us/deployoffice/office-deployment-tool-configuration-options). Specify the full path to a configuration file included in the repository or the path to an external configuration file. | Yes |
| Channel | A supported Microsoft 365 Apps release channel. | No. Defaults to MonthlyEnterprise |
| CompanyName | Company name to include in the configuration.xml. | No. Defaults to stealthpuppy |
| TenantId | The tenant id (GUID) of the target Azure AD tenant. | Yes |
| ClientId | The client id (GUID) of the target Azure AD app registration. | No |
| ClientSecret | Client secret used to authenticate against the app registration. | No |
| Import | Switch parameter to specify that the the package should be imported into the Microsoft Intune tenant. | No |

### PowerShell modules

These PowerShell modules are required:

* [Evergreen](https://www.powershellgallery.com/packages/Evergreen/)
* [IntuneWin32App](https://www.powershellgallery.com/packages/IntuneWin32App/)
* [MSAL.PS](https://www.powershellgallery.com/packages/MSAL.PS/)

If you are running the packager locally, install the modules with:

```powershell
Install-Module -Name Evergreen, MSAL.PS, IntuneWin32App -SkipPublisherCheck
```

### Configuration Files

Microsoft 365 Apps configuration files are included in the repository - these files can be used to create packages for any target tenant as some key options will be updated dynamically by `New-Microsoft365AppsPackage.ps1`.

* `O365BusinessRetail.xml` - Configuration file for Microsoft 365 Apps for business
* `O365BusinessRetail-VDI.xml` - Configuration file for Microsoft 365 Apps for business with shared licensing enabled, and OneDrive and Teams excluded
* `O365ProPlus.xml` - Configuration file for Microsoft 365 Apps for enterprise
* `O365ProPlus-VDI.xml` - Configuration file for Microsoft 365 Apps for enterprise with shared licensing enabled, and OneDrive and Teams excluded
* `O365ProPlusVisioProRetailProjectProRetail.xml` - Configuration file for Microsoft 365 Apps for enterprise, Visio, and Project
* `O365ProPlusVisioProRetailProjectProRetail-VDI.xml` - Configuration file for Microsoft 365 Apps for enterprise, Visio, and Project with shared licensing enabled, and OneDrive and Teams excluded
* `Uninstall-Microsoft365Apps.xml` - A configuration that will uninstall all Microsoft 365 Apps

When the package is generated, the following properties will be updated:

* Company Name - this is the organisation name that sets the Company property on Office documents
* Tenant Id - the target Azure AD tenant ID
* Channel - the [Microsoft 365 Apps update channel](https://learn.microsoft.com/en-us/deployoffice/updates/overview-update-channels)

### Using the Packager

If you're looking to download and use the Packager locally, follow these steps:

#### Clone the repository

If you're not familiar with clone a repository, use [GitHub Desktop to clone the repository](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/adding-and-cloning-repositories/cloning-a-repository-from-github-to-github-desktop) and keep your local copy up to date with changes to the source repository.

#### Usage via Administrator Sign-in

Use `New-Microsoft365AppsPackage.ps1` by authenticating with an Intune Administrator account before running the script. Run `Connect-MSIntuneGraph` to authenticate with administrator credentials using a sign-in window or device login URL.

```powershell
Connect-MSIntuneGraph -TenantID "lab.stealthpuppy.com"
$params = @{
    Path             = "E:\project\m365apps"
    ConfigurationFile = "E:\project\m365apps\configs\O365ProPlus.xml"
    Channel          = "Current"
    CompanyName      = "stealthpuppy"
    TenantId         = "6cdd8179-23e5-43d1-8517-b6276a8d3189"
    Import           = $true 
}
.\New-Microsoft365AppsPackage.ps1 @params
```

Which will look similar to this when run in Terminal on Windows 11:

[![Running New-Microsoft365AppsPackage.ps1 on Windows 11]({{site.baseurl}}/media/2023/04/New-Microsoft365AppsPackage.png)]({{site.baseurl}}/media/2023/04/New-Microsoft365AppsPackage.png)

Running `New-Microsoft365AppsPackage.ps1` on Windows 11
{:.figcaption}

When `New-Microsoft365AppsPackage.ps1` has successfully completed, the `package\output` folder will contain the `setup.intunewin` package, a copy of the configuration XML file in the package, and `m365apps.json` that is used by `Create-Win32App.ps1` to import the package into Intune.

[![Package output]({{site.baseurl}}/media/2023/04/package-output.png)]({{site.baseurl}}/media/2023/04/package-output.png)

Contents of the `package\output` folder once the package has been created
{:.figcaption}

If `-Import` is specified when running `New-Microsoft365AppsPackage.ps1`, a standardised Microsoft 365 Apps package will be imported into the target Intune tenant:

[![The Microsoft 365 Apps package imported into Intune]({{site.baseurl}}/media/2023/04/intune-package.png)]({{site.baseurl}}/media/2023/04/intune-package.png)

The Microsoft 365 Apps package imported into Intune
{:.figcaption}

If `-Import` is not specified, the package can be imported into Intune manually or by running `Create-Win32App.ps1`:

```powershell
$params = @{
    Json        = "E:\project\m365apps\output\m365apps.json"
    PackageFile = "E:\project\m365apps\output\setup.intunewin"
}
& "E:\project\m365apps\scripts\Create-Win32App.ps1" @params
```

#### Usage via App Registration

Use `New-Microsoft365AppsPackage.ps1` to create a new package by passing credentials to an Azure AD app registration (see below) that has rights to import applications into Microsoft Intune:

```powershell
$params = @{
    Path             = "E:\project\m365Apps"
    ConfigurationFile = "E:\project\m365Apps\configs\O365ProPlus.xml"
    Channel          = "MonthlyEnterprise"
    CompanyName      = "stealthpuppy"
    TenantId         = "6cdd8179-23e5-43d1-8517-b6276a8d3189"
    ClientId         = "60912c81-37e8-4c94-8cd6-b8b90a475c0e"
    ClientSecret     = "<secret>"
    Import           = $true 
}
.\New-Microsoft365AppsPackage.ps1 @params
```

### Automating the Packager

The Microsoft 365 Apps Packager can be automated in multiple ways; however, the repository includes a method based on [workflows](https://docs.github.com/en/actions/using-workflows) and GitHub Actions. To use this approach [fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the repository and configure in your own GitHub account.

#### Azure AD App Registration

The workflows must authenticate to the Microsoft Graph API using a non-interactive authentication method. Create an Azure AD app registration and enable the [`DeviceManagementApps.ReadWrite.All`](https://docs.microsoft.com/en-us/graph/api/intune-shared-devicemanagement-update) permission.

The app registration requires the following API permissions:

| API / Permissions name | Type | Description | Admin consent required |
|:--|:--|:--|:--|
| DeviceManagementApps.ReadAll | Application | Read Microsoft Intune apps | Yes |
| DeviceManagementApps.ReadWriteAll | Application | Read and write Microsoft Intune apps | Yes |

[![Assigning the DeviceManagementApps.ReadWrite.All API to the app registration]({{site.baseurl}}/media/2023/04/graphapi.jpeg)]({{site.baseurl}}/media/2023/04/graphapi.jpeg)

Assigning the DeviceManagementApps.ReadWrite.All API to the app registration
{:.figcaption}

#### Git and GitHub Actions

A Git repository is a natural choice for teams managing the Microsoft 365 Apps to maintain a library of configurations and track changes to packages. A repository could be hosted on several providers; however, Azure DevOps or GitHub are my go-to for hosting Git repositories. For internal teams, Azure DevOps could be the better choice for authentication and authorisation via Azure AD.

[GitHub Workflows](https://docs.github.com/en/actions/using-workflows) is an easy platform built into GitHub repositories for automating a workflow that creates a Win32 package in [intunewin](https://github.com/Microsoft/Microsoft-Win32-Content-Prep-Tool) format and imports it into an Intune tenant. The approach in this article could be used with [Azure Pipelines](https://azure.microsoft.com/en-us/services/devops/pipelines/) if preferred; however, Azure Pipelines variables are not as flexible as inputs in GitHub Workflows.

This solution includes two pipelines:

1. **update-binaries** - this workflow is scheduled to run weekly, and will update the repository with new versions of the Office Deployment Tool, the Microsoft Win32 Content Prep Tool, and the PSAppDeployToolkit
2. **new-package** - this workflow will create a package for the Microsoft 365 Apps, import the package into an Intune tenant (with app registration details stored securely in repository secrets), and upload the package as a workflow artifact

#### New Package Workflow

Here's what running the **new-package** workflow looks like - the repository hosts several configurations from which a package can be created.

[![Microsoft 365 Apps configuration packages in the repository]({{site.baseurl}}/media/2023/04/m365-configurationxml.jpeg)]({{site.baseurl}}/media/2023/04/m365-configurationxml.jpeg)

Microsoft 365 Apps configuration packages in the repository
{:.figcaption}

The **new-package** workflow is run from the Actions tab on the repository on GitHub. The **Run workflow** action will provide a prompt for several inputs:

1. Configuration XML - select from a list of configuration files stored in the repository
2. Update channel - select the Microsoft 365 Apps update channel to apply to the package
3. Company name - a string that will be injected into the Company value in the configuration XML file
4. Import - choose to import the package into the target Intune tenant

[![Starting the workflow and selecting inputs]({{site.baseurl}}/media/2023/04/run-new-package.jpeg)]({{site.baseurl}}/media/2023/04/run-new-package.jpeg)

Starting the workflow and selecting inputs
{:.figcaption}

The workflow should run to create the Microsoft 365 Apps package and import it into the target tenant.

[![The workflow run after completing successfully]({{site.baseurl}}/media/2023/04/workflow-run.jpeg)]({{site.baseurl}}/media/2023/04/workflow-run.jpeg)

The workflow run after completing successfully
{:.figcaption}

Once the workflow has run successfully, you should see a new Win32 package in your Intune tenant.

[![A Microsoft 365 Apps package imported into Microsoft Intune]({{site.baseurl}}/media/2023/04/m365-package.jpeg)]({{site.baseurl}}/media/2023/04/m365-package.jpeg)

A Microsoft 365 Apps package imported into Microsoft Intune
{:.figcaption}

Finally, once the workflow is finished, the result and details of the package it created, are saved to the workflow summary:

[![Workflow summary results]({{site.baseurl}}/media/2023/04/new-package-workflow-result.jpeg)]({{site.baseurl}}/media/2023/04/new-package-workflow-result.jpeg)

The workflow is updated with a summary of the results of that run including details of the package.
{:.figcaption}

#### Update Binaries Workflow

The repository includes copies of the following binaries and support files that are automatically kept updated with the latest versions:

* [Microsoft 365 Apps / Office Deployment Tool](https://www.microsoft.com/en-us/download/details.aspx?id=49117) (`setup.exe`) - the key installer required to install, configure and uninstall the Microsoft 365 Apps
* [Microsoft Win32 Content Prep Tool](https://github.com/Microsoft/Microsoft-Win32-Content-Prep-Tool) (`IntuneWinAppUtil.exe`) - the tool that converts Win32 applications into the intunewin package format
* [PSAppDeployToolkit](https://psappdeploytoolkit.com/) - the install is managed with the PowerShell App Deployment Toolkit

If you have cloned this repository, ensure that you synchronise changes to update binaries to the latest version releases.

#### Workflow Secrets

The **new-package** workflow that will package and import the Microsoft 365 Apps package into a single tenant each time the workflow is run. The following secrets are required for this workflow:

- `TENANT_ID` - the target tenant ID
- `CLIENT_ID` - the Azure AD [app registration](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app) client ID used to authenticate to the target tenent
- `CLIENT_SECRET` - password used by to authenticate to the target tenent

The **update-binaries** workflow will update executables and scripts required by the solution and commit changes to the repository, thus signed commits are recommended. Signing commits ensures that commits to the repository from people in your team adding, Microsoft 365 Apps configurations to the repository, are verified.

This workflow uses the following secrets to configure and sign commits:

- `COMMIT_EMAIL` - email address used for commits
- `COMMIT_NAME` - user name used for commits
- `GPGKEY` - [GPG key](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key) to sign commits
- `GPGPASSPHRASE` - passphrase to unlock the GPG key

## Wrap Up

While Intune includes a simple solution to creating a Microsoft 365 Apps package to deploy to Windows devices. Using that in-built solution is not without its drawbacks and limitations. Deploying the Microsoft 365 Apps to managed devices via a Win32 package will provide a more consistent result.

The [Microsoft 365 Apps packager for Intune](https://github.com/aaronparker/m365apps), provides a consistent and repeatable process for creating a Win32 version of the package, whether you're importing packages into a single Intune tenant or multiple tenants.
