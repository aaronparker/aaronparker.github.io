---
layout: post
title: Automate Microsoft Intune As-Built Documentation on Azure DevOps
description: Using Azure Pipelines to automate the backup of Microsoft Intune and generate
  an as-built document.
permalink: "/automate-intune-documentation-azure/"
categories:
- Microsoft
image:
  path: "/assets/img/documents/image.jpg"
  srcset:
    1920w: "/assets/img/documents/image.jpg"
    960w: "/assets/img/documents/image@0,5x.jpg"
    480w: "/assets/img/documents/image@0,25x.jpg"
comments: true
related_posts:
- _posts/2022-03-02-automate-intune-documentation-github.md
- _posts/2021-10-01-onedrive-knownfoldermove-loganalytics.md
- _posts/2022-01-06-hosting-patch-my-pc-in-azure.md
date: 2022-03-03 08:00 +1100
---
* this unordered seed list will be replaced by the toc
{:toc}

If there's anything that's certain in a Microsoft Endpoint Manager project, it's the rate of change. Such is the rate of change, that [Intune receives updates](https://docs.microsoft.com/en-us/mem/intune/fundamentals/whats-new) almost every week.

If change is constant, what value is there in manually creating an as-built document for your MEM projects? The as-built is out of date as soon as you've finished writing it, and the document will quickly lose value as time passes.

What is more valuable to an IT operational team, is to track changes made to the Intune tenant allowing the administrator to make a before and after comparison when troubleshooting, report on configuration changes, and perhaps even looking for who to blame when something goes wrong. OK, don't do the last one - the blame game is not healthy.

How should you generate documentation and track changes? What is a better approach?
{:.lead}

## Backup your Intune Configurations

The [IntuneBackupAndRestore](https://github.com/jseerden/IntuneBackupAndRestore) PowerShell module has been around for some time and does a great job of backup and restore/import of configurations in a single tenant or across tenants.

However, [IntuneCD](https://github.com/almenscorner/IntuneCD) is a solution that can make this process simpler. IntuneCD is a [Python project](https://pypi.org/project/IntuneCD/) that performs several key functions:

* Backup or export of the Intune configurations from the tenant
* Automate the export of configurations from a dev/test tenant and import into a production tenant
* Generate documentation in markdown format from the exported configurations

The documentation covers how to configure [authentication to the Microsoft Graph API](https://github.com/almenscorner/IntuneCD/blob/main/README.md#required-azure-ad-application-graph-api-permissions) using an [Azure AD app registration](https://docs.microsoft.com/en-us/azure/active-directory/develop/security-best-practices-for-app-registration) and how to [use the tool](https://github.com/almenscorner/IntuneCD/blob/main/README.md#how-do-i-use-it). Follow the documentation and validate that you can authenticate to your tenant.

For the purposes of this article, I am assuming you're already familiar with Azure DevOps and Git, Azure AD, Intune, and have some level of experience with automating these tools. I have included links to the documentation where I can for further reading on specific topics.

### Generating a Markdown Report

With authentication working, creating a backup from your Intune tenant is via the `IntuneCD-startbackup` command, which will export the configuration in YAML or JSON format. The `IntuneCD-startdocumentation` command will then create a an as-built document in markdown format from the exported configuration files:

```bash
IntuneCD-startbackup -m 1 -o yaml -p ./backup-path
IntuneCD-startdocumentation -p ./backup-path -o ./as-built.md -t nameoftenant -i 'Intune as-built'
```

### Convert the Markdown to PDF

I tested a couple of Python python projects for converting markdown into a PDF document; however, these could not handle the markdown output from IntuneCD. Instead, I've found that [Markdown to PDF](https://www.npmjs.com/package/md-to-pdf), a Node.js command line tool, could handle the conversion without issue.

To install md-to-pdf and covert the markdown into PDF, we can use the following commands:

```bash
npm i -g md-to-pdf
md-to-pdf ./as-built.md --pdf-options '{ "format": "A4", "margin": "10mm", "printBackground": false }'
```

These commands can be run locally on any system that supports Python and Node.js; however, a better approach would be to automate the entire process via a pipeline that performs the backup and generation of the documentation on a schedule.

## Code and Pipeline Hosting Options

Hosting the exported configurations in a [Git](https://git-scm.com/) repository provides an ideal solution for change tracking and portability. IntuneCD outputs Intune configurations in JSON or YAML, thus the output suits management in a version control system. Configuration output files are plain text, so comparing changes across Git version history is easy.

[![Intune configuration repository viewed in Fork]({{site.baseurl}}/media/2022/02/fork2.png)]({{site.baseurl}}/media/2022/02/fork2.png)

Exported configurations from Intune hosted in a Azure DevOps Git repository
{:.figcaption}

There are plenty of options for hosting Git repositories, and my preferences are GitHub and Azure DevOps. I've covered [setting up this process previously for GitHub](https://stealthpuppy.com/automate-intune-documentation-github/).

In this article, I'll cover the setup of a pipeline that will automate the backup and document generation of Intune with IntuneCD on Azure DevOps. In my view, Azure DevOps makes most sense for production environments because you can manage access to the DevOps project via Azure AD.

## Intune Backup and Document Pipeline with Azure DevOps

Using an [Azure Pipline](https://docs.microsoft.com/en-au/azure/devops/pipelines/?view=azure-devops), we can schedule the backup and report generation of an Intune tenant. The first thing you'll need to do is [create a project](https://docs.microsoft.com/en-us/azure/devops/organizations/projects/create-project) ensuring the project is private.

[![Creating a new Azure DevOps project]({{site.baseurl}}/media/2022/02/devops-newproject.jpeg)]({{site.baseurl}}/media/2022/02/devops-newproject.jpeg)

Creating a new Azure DevOps project
{:.figcaption}

It's vitally important that the project is set to _private_, because the Intune backup will contain sensitive information. Even if the configuration backup does not include passwords, it does provide a detailed view of how you secure your devices.
{:.note title="Important"}

Using an Azure DevOps project with the pipeline covered below, the backup and as-built will be generated, and we can we can compare commits to track changes to the tenant:

<video controls>
  <source src="/media/2022/02/DevOpsCompareReleases.mp4" type="video/mp4">
</video>

Compare configurations across tags and releases in an Azure DevOps project.
{:.figcaption}

### Backup, Document, Tag, Publish Pipeline

The pipeline includes four stages - Backup (the Intune configurations are exported to YAML or JSON), Document (the as-built PDF document is generated), and [Tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) (the repository is tagged for changes committed from that workflow), and publishes the as-built to the pipeline.

[![Azure Pipline run]({{site.baseurl}}/media/2022/02/devops-pipelinerun.jpeg)]({{site.baseurl}}/media/2022/02/devops-pipelinerun.jpeg)

Azure Pipeline run for Intune backup, document, tag the repository and publishing the as-built.
{:.figcaption}

The Azure Pipeline runs the following tasks, but unlike my previous article using GitHub, this pipeline is not configured to sign commits.

* **Backup stage**
  * Check out the repository
  * Configure git commit credentials
  * Install IntuneCD
  * Backup the Intune configuration
  * Commit changes to the repository
* **Document stage**
  * Check out the repository
  * Configure git commit credentials
  * Install IntuneCD
  * Create the as-built in markdown format
  * Convert the markdown to PDF format
  * Commit changes to the repository
* **Tag stage**
  * Check out the repository
  * Configure git commit credentials
  * Tag the repository
* **Publish stage**
  * Check out the repository
  * Configure git commit credentials
  * [Publish the as-built document to the pipeline](https://docs.microsoft.com/en-us/azure/devops/pipelines/artifacts/artifacts-overview)

Once the pipeline is completed, a version of as-built document is added as an artifact on the pipeline:

[![Azure DevOps artifacts]({{site.baseurl}}/media/2022/02/DevOpsArtifacts.jpeg)]({{site.baseurl}}/media/2022/02/DevOpsArtifacts.jpeg)

As-built documentation artifact published to an Azure DevOps pipeline.
{:.figcaption}

### Configure the Repository

Once you have created your project, [clone the repository](https://docs.microsoft.com/en-us/azure/devops/repos/git/clone) and commit the required files for the project.

[![Git repository in the Azure DevOps project]({{site.baseurl}}/media/2022/02/DevOpsRepository.png)]({{site.baseurl}}/media/2022/02/DevOpsRepository.png)

Git repository in the Azure DevOps project.
{:.figcaption}

Create a `.gitignore` file, so the temporary markdown document isn't committed to the repository during the pipeline run:

```yml
#file: ".gitignore"
## Ignore files for macOS
.DS_Store

## You can specify authentication details for IntuneCD in a JSON file
auth.json

## Pipeline files
# prod-as-built.pdf is the as-built document output from the pipeline
# this file is added as an artifact on a release, so it could excluded from commits
prod-as-built.pdf  
prod-as-built.html
```

Add the pipeline as `intune-backup.yml` in the root of the repository:

```yml
#file: "intune-backup.yml"
trigger: none
schedules:
  - cron: '0 1 * * *'
    displayName: "1am"
    branches:
      include:
      - main

jobs:
  - job: backup
    displayName: backup
    pool:
      vmImage: ubuntu-latest
    continueOnError: false
    steps:
    - checkout: self
      persistCredentials: true

    # Set git global settings
    - task: Bash@3
      displayName: Configure Git
      inputs:
        targetType: 'inline'
        script: |
          git config --global user.name $(USER_NAME)
          git config --global user.email $(USER_EMAIL)
        workingDirectory: '$(Build.SourcesDirectory)'
        failOnStderr: true

    - task: Bash@3
      displayName: Remove existing prod-backup directory
      inputs:
        targetType: 'inline'
        script: |
          rm -f -r -v "$(Build.SourcesDirectory)/prod-backup"
        workingDirectory: '$(Build.SourcesDirectory)'
        failOnStderr: false

    # Install IntuneCD
    # https://github.com/almenscorner/IntuneCD
    - task: Bash@3
      displayName: Install IntuneCD
      inputs:
        targetType: 'inline'
        script: |
          pip3 install IntuneCD
        workingDirectory: '$(Build.SourcesDirectory)'
        failOnStderr: true

    # Backup the latest configuration, using the current directory
    - task: Bash@3
      displayName: IntuneCD backup
      inputs:
        targetType: 'inline'
        script: |
          mkdir -p "$(Build.SourcesDirectory)/prod-backup"
          IntuneCD-startbackup \
              --mode=1 \
              --output=json \
              --path="$(Build.SourcesDirectory)/prod-backup"
              #--localauth=./auth.json
              #--exclude=assignments
        workingDirectory: '$(Build.SourcesDirectory)'
        failOnStderr: true
      env:
        TENANT_NAME: $(TENANT_NAME)
        CLIENT_ID: $(CLIENT_ID)
        CLIENT_SECRET: $(CLIENT_SECRET)

    # Commit changes and push to repo
    - task: Bash@3
      displayName: Commit changes
      inputs:
        targetType: 'inline'
        script: |
          DATEF=`date +%Y.%m.%d`
          git add --all
          git commit -m "Intune config backup $DATEF"
          git push origin HEAD:main
        workingDirectory: '$(Build.SourcesDirectory)'
        failOnStderr: false

  - job: document
    displayName: document
    dependsOn: backup
    pool:
      vmImage: ubuntu-latest
    continueOnError: false
    steps:
    - checkout: self
      persistCredentials: true

    # Set git global settings
    - task: Bash@3
      displayName: Configure Git
      inputs:
        targetType: 'inline'
        script: |
          git config --global user.name $(USER_NAME)
          git config --global user.email $(USER_EMAIL)
        workingDirectory: '$(Build.SourcesDirectory)'
        failOnStderr: true

    - task: Bash@3
      displayName: Pull origin
      inputs:
        targetType: 'inline'
        script: |
          git pull origin main
        workingDirectory: '$(Build.SourcesDirectory)'
        failOnStderr: false

    # Install IntuneCD
    # https://github.com/almenscorner/IntuneCD
    - task: Bash@3
      displayName: Install IntuneCD
      inputs:
        targetType: 'inline'
        script: |
          pip3 install IntuneCD
        workingDirectory: '$(Build.SourcesDirectory)'
        failOnStderr: true

    # Create markdown documentation
    # Install IntuneCD
    # https://github.com/almenscorner/IntuneCD
    - task: Bash@3
      displayName: Generate markdown document
      inputs:
        targetType: 'inline'
        script: |
          INTRO="Endpoint Manager backup and documentation generated at $(Build.Repository.Uri) <img align=\"right\" width=\"96\" height=\"96\" src=\"./logo.png\">"
          IntuneCD-startdocumentation \
              --path="$(Build.SourcesDirectory)/prod-backup" \
              --outpath="$(Build.SourcesDirectory)/prod-as-built.md" \
              --tenantname=$TENANT_NAME \
              --intro="$INTRO" \
              #--split=Y
        workingDirectory: '$(Build.SourcesDirectory)'
        failOnStderr: true
      env:
        TENANT_NAME: $(TENANT_NAME)

    # Commit changes and push to repo
    - task: Bash@3
      displayName: Commit changes
      inputs:
        targetType: 'inline'
        script: |
          DATEF=`date +%Y.%m.%d`
          git add --all
          git commit -m "MEM config as-built $DATEF"
          git push origin HEAD:main
        workingDirectory: '$(Build.SourcesDirectory)'
        failOnStderr: false

  - job: tag
    displayName: tag
    dependsOn: document
    pool:
      vmImage: ubuntu-latest
    continueOnError: false
    steps:
    - checkout: self
      persistCredentials: true

    # Set git global settings
    - task: Bash@3
      displayName: Configure Git
      inputs:
        targetType: 'inline'
        script: |
          git config --global user.name $(USER_NAME)
          git config --global user.email $(USER_EMAIL)
        workingDirectory: '$(Build.SourcesDirectory)'
        failOnStderr: true

    - task: Bash@3
      displayName: Pull origin
      inputs:
        targetType: 'inline'
        script: |
          git pull origin main
        workingDirectory: '$(Build.SourcesDirectory)'
        failOnStderr: false

    # Commit changes and push to repo
    - task: Bash@3
      displayName: Git tag
      inputs:
        targetType: 'inline'
        script: |
          DATEF=`date +%Y.%m.%d`
          git tag -a "v$DATEF" -m "Microsoft Endpoint Manager configuration snapshot $DATEF"
          git push origin "v$DATEF"
        workingDirectory: '$(Build.SourcesDirectory)'
        failOnStderr: false

  - job: publish
    displayName: publish
    dependsOn: tag
    pool:
      vmImage: ubuntu-latest
    continueOnError: false
    steps:
    - checkout: self
      persistCredentials: true

    # Set git global settings
    - task: Bash@3
      displayName: Configure Git
      inputs:
        targetType: 'inline'
        script: |
          git config --global user.name $(USER_NAME)
          git config --global user.email $(USER_EMAIL)
        workingDirectory: '$(Build.SourcesDirectory)'
        failOnStderr: true

    - task: Bash@3
      displayName: Pull origin
      inputs:
        targetType: 'inline'
        script: |
          git pull origin main
        workingDirectory: '$(Build.SourcesDirectory)'
        failOnStderr: false

    # Install md-to-pdf
    # https://github.com/simonhaenisch/md-to-pdf
    - task: Bash@3
      displayName: Install md-to-pdf
      inputs:
        targetType: 'inline'
        script: |
          npm i --location=global md-to-pdf
        workingDirectory: '$(Build.SourcesDirectory)'
        failOnStderr: true

    # Convert markdown document to HTML
    - task: Bash@3
      displayName: Convert markdown to HTML
      inputs:
        targetType: 'inline'
        script: |
          cat "$(Build.SourcesDirectory)/prod-as-built.md" | md-to-pdf --config-file "$(Build.SourcesDirectory)/md2pdf/pdfconfig.json" --as-html > "$(Build.SourcesDirectory)/prod-as-built.html"
        workingDirectory: '$(Build.SourcesDirectory)'
        failOnStderr: true

    - task: PublishBuildArtifacts@1
      inputs:
        pathToPublish: "$(Build.SourcesDirectory)/prod-as-built.html"
        artifactName: "prod-as-built.html"

    # Convert markdown document to PDF
    - task: Bash@3
      displayName: Convert markdown to PDF
      inputs:
        targetType: 'inline'
        script: |
          cat "$(Build.SourcesDirectory)/prod-as-built.md" | md-to-pdf --config-file "$(Build.SourcesDirectory)/md2pdf/pdfconfig.json" > "$(Build.SourcesDirectory)/prod-as-built.pdf"
        workingDirectory: '$(Build.SourcesDirectory)'
        failOnStderr: true

    - task: PublishBuildArtifacts@1
      inputs:
        pathToPublish: "$(Build.SourcesDirectory)/prod-as-built.pdf"
        artifactName: "prod-as-built.pdf"
```

### Configure the Pipeline

After committing the files to the repository, [create a pipeline](https://docs.microsoft.com/en-us/azure/devops/pipelines/create-first-pipeline) from `intune-backup.yml`.

[![Creating an Azure Pipeline from a YAML file in the repository]({{site.baseurl}}/media/2022/02/DevOpsCreatePipeline.jpeg)]({{site.baseurl}}/media/2022/02/DevOpsCreatePipeline.jpeg)

Creating an Azure Pipeline from a YAML file in the repository.
{:.figcaption}

The pipeline relies on several variables that you will need to create:

[![Azure DevOps pipeline variables]({{site.baseurl}}/media/2022/02/DevOpsPipelineVariables.jpeg)]({{site.baseurl}}/media/2022/02/DevOpsPipelineVariables.jpeg)

Variables used on an Azure DevOps pipeline.
{:.figcaption}

Create the following [variables](https://docs.microsoft.com/en-au/azure/devops/pipelines/process/variables):

* `TENANT_NAME` - your Azure AD tenant name, .e.g., `stealthpuppylab.onmicrosoft.com`
* `CLIENT_ID` - the Application (client) ID of the app registration, e.g., `3ea822c2-3644-4e99-984e-279f54f71da4`
* `CLIENT_SECRET` - the client secret to enable authentication via the app registration
* `USER_NAME` - [name of the user](https://docs.github.com/en/get-started/getting-started-with-git/setting-your-username-in-git) for Git commits
* `USER_EMAIL` - [email address](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-user-account/managing-email-preferences/setting-your-commit-email-address) of the user for Git commits

### Configure Permissions

To allow the pipeline to commit changes to the repository, [configure Contribute permissions](https://docs.microsoft.com/en-us/azure/devops/repos/git/set-git-repository-permissions) for the Project Collection Build Service Accounts group or the Build Service account.

[![Configure Contribute permissions for the Project Collection Build Service Accounts group]({{site.baseurl}}/media/2022/02/DevOpsRepoSecurity.png)]({{site.baseurl}}/media/2022/02/DevOpsRepoSecurity.png)

Configure Contribute permissions for the Project Collection Build Service Accounts group.
{:.figcaption}

### Execute the Pipeline

With the project, repository, permissions and the pipeline configured, we can run the pipeline manually or wait for the pipeline to run via the schedule as specified in the pipeline file. The default schedule in the pipeline is 01:00 every 24 hours, give you a daily backup.

[![Viewing runs of the pipeline]({{site.baseurl}}/media/2022/02/DevOpsPipelineRuns.jpeg)]({{site.baseurl}}/media/2022/02/DevOpsPipelineRuns.jpeg)

Viewing runs of the pipeline.
{:.figcaption}

## Concluding

In this article, I've provided the foundations for using IntuneCD to automate the backup of your Intune tenant and create an as-built document, using Azure DevOps for hosting the repository and Azure Pipelines to automate the process.

For an IT operational team, service desk or managed service, automatically performing these tasks would be far better time spent that manually creating an as-built document.

If you haven't read the article already, I've also covered the [same process using GitHub and GitHub Workflows](https://stealthpuppy.com/automate-intune-documentation-github/).
