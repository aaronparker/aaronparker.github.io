---
layout: post
title: Automate Microsoft Intune As-Built Documentation on GitHub
description: Using GitHub Workflows to automate the backup of Microsoft Intune and
  generate an as-built document.
permalink: "/automate-intune-documentation-github/"
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
- _posts/2021-10-01-onedrive-knownfoldermove-loganalytics.md
- _posts/2022-01-06-hosting-patch-my-pc-in-azure.md
date: 2022-03-02 14:17 +1100
---
* this unordered seed list will be replaced by the toc
{:toc}

If there's anything that's certain in a Microsoft Endpoint Manager project, it's the rate of change. Such is the rate of change, that [Intune receives updates](https://docs.microsoft.com/en-us/mem/intune/fundamentals/whats-new) almost every week.

If change is constant, what value is there in manually creating an as-built document for your MEM projects? The as-built is out of date as soon as you've finished writing it, and the document will quickly lose value as time passes.

What is more valuable to an IT operational team, is to track changes made to the Intune tenant allowing the administrator to make a before and after comparison when troubleshooting, report on configuration changes, and perhaps even looking for who to blame when something goes wrong. OK, don't do the last one - the blame game is not healthy.

How should you generate documentation? What is a better approach?
{:.lead}

## Backup your Intune Configurations

The [IntuneBackupAndRestore](https://github.com/jseerden/IntuneBackupAndRestore) PowerShell module has been around for some time and does a great job of backup and restore/import of configurations in a single tenant or across tenants.

However, [IntuneCD](https://github.com/almenscorner/IntuneCD) is a solution that can make this process simpler. IntuneCD is a [Python project](https://pypi.org/project/IntuneCD/) that performs several key functions:

* Backup or export of the Intune configurations from the tenant
* Automate the export of configurations from a dev/test tenant and import into a production tenant
* Generate documentation in markdown format from the exported configurations

The documentation covers how to configure [authentication to the Microsoft Graph API](https://github.com/almenscorner/IntuneCD/blob/main/README.md#required-azure-ad-application-graph-api-permissions) using an [Azure AD app registration](https://docs.microsoft.com/en-us/azure/active-directory/develop/security-best-practices-for-app-registration) and how to [use the tool](https://github.com/almenscorner/IntuneCD/blob/main/README.md#how-do-i-use-it). Follow the documentation and validate that you can authenticate to your tenant.

For the purposes of this article, I am assuming you're already familiar with GitHub and Git, Azure AD, Intune, and have some level of experience with automating these tools. I have included links to the documentation where I can for further reading on specific topics.

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

## Pipeline Hosting Options

Hosting the exported configurations in a [Git](https://git-scm.com/) repository provides an ideal solution for change tracking and portability. IntuneCD outputs Intune configurations in JSON or YAML, thus the output suits management in a version control system. Configuration output files are plain text, so comparing changes across Git version history is easy.

[![Intune configuration repository viewed in Fork]({{site.baseurl}}/media/2022/02/fork.png)]({{site.baseurl}}/media/2022/02/fork.png)

Exported configurations from Intune hosted in a Git repository
{:.figcaption}

There are plenty of options for hosting Git repositories, but my preferences are GitHub and Azure DevOps. There are some considerations for each:

* **GitHub** - supports individual and organisational accounts, and private repositories even for free accounts. [GitHub Workflows](https://docs.github.com/en/actions/using-workflows/triggering-a-workflow) are feature rich and well supported, and management of GitHub repositories are quite easy
* [**Azure DevOps**](https://azure.microsoft.com/en-au/solutions/devops/) - supports [authentication via Azure AD](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/access-with-azure-ad), thus a better solution for managing authentication and authorisation. [Azure DevOps pipelines](https://azure.microsoft.com/en-au/services/devops/pipelines/) are also feature rich and well supported

I'll cover the setup of a pipeline that will automate the backup and document generation of Intune with IntuneCD on GitHub; however, in my view Azure DevOps makes most sense as a hosting option for production environments.

## Intune Backup and Document Pipeline with GitHub

Using a [GitHub Workflow](https://docs.github.com/en/actions/using-workflows), we can schedule the backup and report generation of an Intune tenant. The first thing you'll need to do is [create](https://docs.github.com/en/get-started/quickstart/create-a-repo) a [private repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility).

It's vitally important that the repository is set to _private_, because the Intune backup will contain sensitive information. Even if the configuration backup does not include passwords, it does provide a detailed view of how you secure your devices.
{:.note title="Important"}

Using a GitHub repository with the workflows covered below, the backup and as-built will be generated, and we can we can compare changes across commits to track changes to the tenant:

<video controls>
  <source src="/media/2022/02/CompareReleases.mp4" type="video/webm">
</video>

Compare configurations across tags and releases in a GitHub repository.
{:.figcaption}

For GitHub, I've created two workflows - the first workflow performs the following steps:

1. Backup the Intune configuration using a schedule
2. Generate an as-built document in markdown and covert the document to PDF format
3. Tag the updated configuration, enabling us to create a release

[![Intune as-built release]({{site.baseurl}}/media/2022/02/intune-release.png)]({{site.baseurl}}/media/2022/02/intune-release.png)

Intune configuration changes and the as-built provided as a release on the GitHub repository.
{:.figcaption}

### Backup, Document, Tag Workflow

The first workflow includes three stages - Backup (the Intune configurations are exported to YAML or JSON), Document (the as-built PDF document is generated), and [Tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) (the repository is tagged for changes committed in that workflow).

[![GitHub workflow run]({{site.baseurl}}/media/2022/02/github-workflowrun.jpeg)]({{site.baseurl}}/media/2022/02/github-workflowrun.jpeg)

GitHub workflow run for Intune backup, document and tagging the repository.
{:.figcaption}

### Release Workflow

Once the first workflow tags changes to the repository, the second workflow will create a release package for the as-built document. This provides a point in time version of the as-built document.

[![GitHub workflow run]({{site.baseurl}}/media/2022/02/github-workflowrun2.png)]({{site.baseurl}}/media/2022/02/github-workflowrun2.png)

GitHub workflow run for creating an as-built document release.
{:.figcaption}

### Configure the Repository

The workflows rely on several repository secrets that are used as variables:

[![GitHub repository secrets]({{site.baseurl}}/media/2022/02/repo-secrets.png)]({{site.baseurl}}/media/2022/02/repo-secrets.png)

Secrets in the repository used by GitHub Actions.
{:.figcaption}

Create the following [secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) on the repository:

* `TENANT_NAME` - your Azure AD tenant name, .e.g., `stealthpuppylab.onmicrosoft.com`
* `CLIENT_ID` - the Application (client) ID of the app registration, e.g., `3ea822c2-3644-4e99-984e-279f54f71da4`
* `CLIENT_SECRET` - the client secret to enable authentication via the app registration
* `PAT` - a [GitHub personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). The personal access token is used in the Tag phase of the first workflow to authenticate to GitHub when pushing the tag. The [GITHUB_TOKEN](https://docs.github.com/en/actions/security-guides/automatic-token-authentication) cannot be used here, because [the second workflow will not be triggered](https://docs.github.com/en/actions/using-workflows/triggering-a-workflow#triggering-a-workflow-from-a-workflow). [Deploy keys](https://docs.github.com/en/developers/overview/managing-deploy-keys#deploy-keys) can be used in place of a personal access token, particularly for an organisational account
* `COMMIT_NAME` - [name of the user](https://docs.github.com/en/get-started/getting-started-with-git/setting-your-username-in-git) for Git commits
* `COMMIT_EMAIL` - [email address](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-user-account/managing-email-preferences/setting-your-commit-email-address) of the user for Git commits
* `GPGKEY` - [GPG signing key](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key), for signing commits
* `GPGPASSPHRASE` - passphrase for unlocking the GPG signing key

Note that the workflow is configured to sign commits with a GPG key using the [ghaction-import-gpg](https://github.com/crazy-max/ghaction-import-gpg) action. If you aren't interested in signing your commits, you'll need to update this portion of the workflow. Use the [Git Commit and Push](https://github.com/marketplace/actions/git-commit-and-push) action instead.

### Workflow Code

Here's the code listing for each workflow:

#### Backup, Document, Tag

This workflow performs the following tasks:

* Backup stage
  * Check out the repository
  * Import the GPG key and configure git commit credentials
  * Install IntuneCD
  * Backup the Intune configuration
  * Commit changes to the repository
* Document stage
  * Check out the repository
  * Import the GPG key and configure git commit credentials
  * Install IntuneCD
  * Create the as-built in markdown format
  * Convert the markdown to PDF format
  * Commit changes to the repository
* Tag stage
  * Check out the repository
  * Import the GPG key and configure git commit credentials
  * Tag the repository

<script src="https://gist.github.com/aaronparker/f69f82223271f63eb6c0d1d3850aa7ed.js"></script>

#### Release

This workflow performs the following tasks:

* Release stage
  * Check out the repository
  * Import the GPG key and configure git commit credentials
  * Create a release using the as-built document

<script src="https://gist.github.com/aaronparker/b5383bfb5a1fec9af372596c4051674b.js"></script>

## Concluding

In this article, I've provided the foundations for using IntuneCD to automate the backup of your Intune tenant and create an as-built document, using GitHub for hosting the repository and GitHub Actions/Workflows to automate the process.

For an IT operational team, service desk or managed service, automatically performing these tasks would be far better time invested than manually creating an as-built document.

In the next article, I will cover the same process using Azure DevOps to host the repository and pipeline.

### GitHub Repository Template

Rather than having to build all of this from scratch, I have created a template repository on GitHub that you can clone to start building in your own environment. Hop over to GitHub to get started: [intune-backup-template](https://github.com/aaronparker/intune-backup-template).
