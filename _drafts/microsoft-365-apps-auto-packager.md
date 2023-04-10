---
layout: post
title: Building a Package Factory for the Microsoft 365 Apps
description: "Using GitHub Workflows to automate the packaging of the Microsoft 365 Apps and import into an Intune tenant."
permalink: "/m365apps-package-factory/"
image:
  path: "/assets/img/package/image.jpg"
  srcset:
    1920w: "/assets/img/package/image.jpg"
    960w: "/assets/img/package/image@0,5x.jpg"
    480w: "/assets/img/package/image@0,25x.jpg"
comments: true
related_posts:
- _posts/2022-03-02-automate-intune-documentation-github.md
- _posts/2022-03-02-automate-intune-documentation-azure.md
---

- this unordered seed list will be replaced by the toc
{:toc}

Deploying the [Microsoft 365 Apps via Microsoft Intune]({{site.baseurl}}/office-365-proplus-deploy-intune/) is as simple as [using using the built in tools to create a package](https://docs.microsoft.com/en-us/mem/intune/apps/apps-add-office365) without having to manually package any binaries.

[![Creating a Microsoft 365 Apps package in Intune]({{site.baseurl}}/media/2022/04/m365apps.jpeg)]({{site.baseurl}}/media/2022/04/m365apps.jpeg)

Creating a Microsoft 365 Apps package in the Microsoft Endpoint Manager admin center
{:.figcaption}

This approach works great for new devices, particularly PCs deployed via Windows Autopilot; however, the in-built Microsoft 365 Apps package doesn't consistently upgrade older versions of Microsoft Office. [We've](https://insentragroup.com) seen issues with failed deployments due to a failure in the package upgrading over existing Microsoft Office installations in several customer environments.

Additionally, the in-built Microsoft 365 Apps package cannot be used as a dependency by another Win32 application package (e.g., ensure the Microsoft 365 Apps is installed before an add-in package is installed).

If your environment experiences upgrade issues or you need to use the Dependencies feature, you'll need to create [a custom Win32 application package](https://docs.microsoft.com/en-us/mem/intune/apps/apps-win32-app-management) to deploy the Microsoft 365 Apps.

For small environments, creating a custom package could be a one off action, thus the package can be created manually; however, for larger environments you may multiple packages, and could have a team of engineers creating packages. This could be in house engineers, or consultant or managed services engineers working across multiple customer environments. In these environments, it's important to ensure consistency across multiple packages - without packages built to a common standard, your devices could experience inconsistent deployments and you'll spend more time troubleshooting issues.

How do we ensure standardisation and provide a simple method for teams creating Microsoft 365 Apps packages? _With automation, of course_.

Here's how I built a proof of concept for a packaging factory solution for the Microsoft 365 Apps and Microsoft Intune using GitHub Workflows.

## Anatomy of a Microsoft 365 Apps Win32 Package

Let's start by taking a look at what should be included in a custom Microsoft 365 Apps Win32 package:

- A `configuration.xml` that defines the Microsoft 365 Apps package. Create the configuration XMl files in the [Office Customization Tool](https://docs.microsoft.com/en-us/deployoffice/admincenter/overview-office-customization-tool)
- An `uninstall.xml` that defines removal of the Microsoft 365 Apps from a target PC
- `setup.exe` from the [Office Deployment Tool](https://www.microsoft.com/en-au/download/details.aspx?id=49117). This will process the `configuration.xml` and the `uninstall.xml` to install or uninstall the Microsoft 365 Apps
- A detection method for Intune to determine whether the application is installed. Microsoft lists the existence of the `HKLM\Software\Microsoft\Windows\CurrentVersion\Uninstall\O365ProPlusRetail - en-us` registry key [in the documentation](https://docs.microsoft.com/en-us/deployoffice/deploy-microsoft-365-apps-configuration-manager-2012r2); however, this is a very simple approach and you may want instead use registry keys or values unique to your package, or a version comparison for an executable installed in the Microsoft 365 Apps (e.g. `OUTLOOK.EXE`)

For upgrade scenarios, Microsoft provides [scripts that are useful for uninstalling and cleaning](https://github.com/OfficeDev/Office-IT-Pro-Deployment-Scripts/tree/master/Office-ProPlus-Deployment/Deploy-OfficeClickToRun) up older versions of Microsoft Office. These VBScripts provide a more consistent result than relying on the Office Deployment Tool to complete the uninstall and upgrade.

Finally, wrapping the install package with the [PSAppDeployToolkit](https://psappdeploytoolkit.com/) provides additional install logic and handling, particularly for in-place upgrades on existing devices.

## Git and GitHub Workflows

A Git repository is a natural choice for teams managing the Microsoft 365 Apps to maintain a library of configurations and track changes to packages. A repository could be hosted on several providers; however, Azure DevOps or GitHub are my go-to for hosting Git repositories. For internal teams, Azure DevOps could be the better choice for authentication and authorisation via Azure AD.

[GitHub Workflows](https://docs.github.com/en/actions/using-workflows) is an easy platform built into GitHub repositories for automating a workflow that creates a Win32 package in [intunewin](https://github.com/Microsoft/Microsoft-Win32-Content-Prep-Tool) format and imports it into an Intune tenant. The approach in this article could be used with [Azure Pipelines](https://azure.microsoft.com/en-us/services/devops/pipelines/) if preferred.

For this POC, I've created three workflows:

1. **update-binaries** - this workflow is scheduled to run weekly, and will download updates to the Office Deployment Tool, the Microsoft Win32 Content Prep Tool, and the PSAppDeployToolkit
2. **new-autopackage** - this workflow will package the Microsoft 365 Apps using a specified configuration file as an input and import the package into a single tenant
3. **new-package** - this workflow will accept authentication details for any tenant and import the Microsoft 365 Apps package

## Create a Repository

To get started, I've created [a template repository on GitHub](https://github.com/aaronparker/m365apps-template) that includes the workflows and scripts needed to deploy a packaging factory.

[![m365apps template repository]({{site.baseurl}}/media/2022/04/m365apps-template.jpeg)]({{site.baseurl}}/media/2022/04/m365apps-template.jpeg)

The m365apps-template repository on GitHub
{:.figcaption}

When creating a repository from this template, follow this checklist to set up your own custom repository:

1. Set the repository to Private
2. Enable or disable repository features including Wikis, Issues, Releases etc., based on your requirements
3. Configure the repository secrets
4. Run the **update-binaries** workflow

### Configure the Repository Secrets

The following secrets are required by all workflows:

- `COMMIT_EMAIL` - email address used for commits
- `COMMIT_NAME` - user name used for commits
- `GPGKEY` - [GPG key](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key) to sign commits
- `GPGPASSPHRASE` - passphrase to unlock the GPG key

The **update-binaries** workflow will update executables and scripts required by the solution and commit changes to the repository, thus signed commits are recommended. Signing commits ensures that commits to the repository from people in your team adding, Microsoft 365 Apps configurations to the repository, are verified.

The **new-autopackage** workflow that will package and import the Microsoft 365 Apps package into a single tenant each time the workflow is run. The following secrets are required for this workflow:

- `TENANT_ID` - the target tenant ID
- `CLIENT_ID` - the Azure AD [app registration](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app) client ID used to authenticate to the target tenent
- `CLIENT_SECRET` - password used by to authenticate to the target tenent

## Azure AD App Registration

The workflows must authenticate to the Microsoft Graph API using a non-interactive authentication method. Create an Azure AD app registration and enable the [`DeviceManagementApps.ReadWrite.All`](https://docs.microsoft.com/en-us/graph/api/intune-shared-devicemanagement-update?view=graph-rest-beta) permission.

[![Assigning the DeviceManagementApps.ReadWrite.All API to the app registration]({{site.baseurl}}/media/2022/04/graphapi.jpeg)]({{site.baseurl}}/media/2022/04/graphapi.jpeg)

Assigning the DeviceManagementApps.ReadWrite.All API to the app registration
{:.figcaption}

## Running the new-package Workflow

Here's what running the **new-package** workflow looks like - the repository hosts several configurations from which a package can be created.

[![Microsoft 365 Apps configuration packages in the repository]({{site.baseurl}}/media/2022/04/m365-package-01.jpeg)]({{site.baseurl}}/media/2022/04/m365-package-01.jpeg)

Microsoft 365 Apps configuration packages in the repository
{:.figcaption}

The **new-package** workflow is run from the Actions tab on the repository on GitHub. The **Run workflow** action will provide a prompt for several inputs:

1. Configuration XML - this file must exist in the repository before running the workflow
2. The target tenant id
3. The application id of the app registration used to authenticate to the target tenant
4. The client secret used to authenticate to the app registration

The client secret is added as an input in clear text. To ensure the target tenant remains secure, change the client secret after the workflow has been used to import the package.
{:.note title="Important"}

[![Starting the workflow and selecting inputs]({{site.baseurl}}/media/2022/04/m365-package-02.jpeg)]({{site.baseurl}}/media/2022/04/m365-package-02.jpeg)

Starting the workflow and selecting inputs
{:.figcaption}

The workflow should run to create the Microsoft 365 Apps package and import it into the target tenant. Note here that the workflow will run a **redact-secrets** job to remove the application id and client secret values from the workflow log file - `/github/workflow/event.json` defined by the environment variable `$GITHUB_EVENT_PATH`.

[![The workflow run after completing successfully]({{site.baseurl}}/media/2022/04/m365-package-03.jpeg)]({{site.baseurl}}/media/2022/04/m365-package-03.jpeg)

The workflow run after completing successfully
{:.figcaption}

Once the workflow has run successfully, you should see a new Win32 package in your Intune tenant.

[![A Microsoft 365 Apps package imported into Microsoft Intune]({{site.baseurl}}/media/2022/04/m365-package-04.jpeg)]({{site.baseurl}}/media/2022/04/m365-package-04.jpeg)

A Microsoft 365 Apps package imported into Microsoft Intune
{:.figcaption}
