---
id: 4301
title: 'Managing PowerShell Scripts Across Machines &#038; Platforms'
date: 2016-03-31T22:17:46+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=4301
permalink: /powershell-versions-across-machines-platforms/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "4708210044"
image: /media/2016/03/GitHub-Code-Listing.png
categories:
  - Automation
tags:
  - GitHub
  - PowerShell
  - Visual Studio Code
---
I use several physical PCs and virtual machines. I use OS X and Windows. I (sometimes) write PowerShell [scripts]({{site.baseurl}}/tag/powershell/) to perform various tasks.

This isn't an ideal scenario for effectively writing scripts and managing versions. It's only recently occurred to me that I could be managing my scripts smarter that I have been. Not being a developer or needing to write code daily, I've gotten by, manually versioning scripts and syncing scripts across machines via Dropbox etc.; however I've always known that there are better ways.

There are two tools that I've recently added to my toolkit that is now making it more effective to manage PowerShell scripts across various machines, versioning those scripts and even allowing me to write PowerShell scripts on OS X:

  1. [Visual Studio Code](https://code.visualstudio.com/) - this tool has made coding far more enjoyable
  2. [GitHub](https://github.com) - I've been aware of Git and GitHub for some time but not taken advantage of GitHub until recently

In this article, I'll briefly cover using these tools for use with PowerShell.

# Visual Studio Code

Visual Studio Code is a cross platform code editor from Microsoft which I've come to really enjoy using because it allows me to edit PowerShell code directly on a MacBook (my primary machine). [It supports Windows, OS X and Linux](https://code.visualstudio.com/#alt-downloads) and features [extensions](https://marketplace.visualstudio.com/VSCode) that provide support for various languages, themes and features, such as integration into other tools etc.

Providing the same experience across OS X and Windows is fantastic and it's great that Microsoft is embracing platforms other than Windows. While I can't execute PowerShell scripts on OS X, the ability to edit and manage code on my primary OS simplifies my workflow.

## User Interface

Visual Studio Code provides as consistent UI across platforms - here it is on OS X with support for PowerShell added via an extension:

<figure id="attachment_4308" aria-describedby="caption-attachment-4308" style="width: 1024px" class="wp-caption alignnone"><a href="https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-OSX.png" rel="attachment wp-att-4308"><img class="wp-image-4308 size-large" title="Visual Studio Code on OS X" src="https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-OSX-1024x709.png" alt="Visual Studio Code on OS X" width="1024" height="709" srcset="https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-OSX-1024x709.png 1024w, https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-OSX-150x104.png 150w, https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-OSX-300x208.png 300w, https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-OSX-768x531.png 768w, https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-OSX.png 1500w" sizes="(max-width: 1024px) 100vw, 1024px" /></a><figcaption id="caption-attachment-4308" class="wp-caption-text">Visual Studio Code on OS X*</figure>

And here's the same view on Windows:

<figure id="attachment_4310" aria-describedby="caption-attachment-4310" style="width: 1024px" class="wp-caption alignnone"><a href="https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-Windows2.png" rel="attachment wp-att-4310"><img class="wp-image-4310 size-large" title="Visual Studio Code on Windows 10" src="https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-Windows2-1024x617.png" alt="Visual Studio Code on Windows 10" width="1024" height="617" srcset="https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-Windows2-1024x617.png 1024w, https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-Windows2-150x90.png 150w, https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-Windows2-300x181.png 300w, https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-Windows2-768x463.png 768w, https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-Windows2.png 1353w" sizes="(max-width: 1024px) 100vw, 1024px" /></a><figcaption id="caption-attachment-4310" class="wp-caption-text">Visual Studio Code on Windows 10*</figure>

## Integration with PowerShell

VSCode supports [extensions](https://marketplace.visualstudio.com/VSCode) with which we can enable PowerShell syntax support, so even on OS X, we can write PowerShells scripts. To install the PowerShell extension, press F1, type `ext install` and press Enter. Select to install the PowerShell extension and restart Visual Studio Code when prompted.

<figure id="attachment_4316" aria-describedby="caption-attachment-4316" style="width: 1024px" class="wp-caption alignnone"><a href="https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-install-powershell.png" rel="attachment wp-att-4316"><img class="wp-image-4316 size-large" title="Installing PowerShell language syntax support on OS X" src="https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-install-powershell-1024x521.png" alt="Installing PowerShell language syntax support on OS X" width="1024" height="521" srcset="https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-install-powershell-1024x521.png 1024w, https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-install-powershell-150x76.png 150w, https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-install-powershell-300x153.png 300w, https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-install-powershell-768x391.png 768w, https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-install-powershell.png 1048w" sizes="(max-width: 1024px) 100vw, 1024px" /></a><figcaption id="caption-attachment-4316" class="wp-caption-text">Installing PowerShell language syntax support on OS X*</figure>

Updating extensions is handled in the same manner:

<figure id="attachment_4317" aria-describedby="caption-attachment-4317" style="width: 1024px" class="wp-caption alignnone"><a href="https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-update-extensions.png" rel="attachment wp-att-4317"><img class="wp-image-4317 size-large" title="Updating extensions in Visual Studio Code on OS X" src="https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-update-extensions-1024x521.png" alt="Updating extensions in Visual Studio Code on OS X" width="1024" height="521" srcset="https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-update-extensions-1024x521.png 1024w, https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-update-extensions-150x76.png 150w, https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-update-extensions-300x153.png 300w, https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-update-extensions-768x391.png 768w, https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-update-extensions.png 1048w" sizes="(max-width: 1024px) 100vw, 1024px" /></a><figcaption id="caption-attachment-4317" class="wp-caption-text">Updating extensions in Visual Studio Code on OS X*</figure>

There's plenty of extensions and themes to customise VSCode to make the tool work for you.

# GitHub

There's most likely plenty of methods for managing PowerShell code; however a tool such as GitHub which provides a free option is very popular and is actually [used by the PowerShell team at Microsoft](https://github.com/powershell), making it a desirable solution.

## Getting Started with GitHub

To start with GitHub create a repository, you'll be prompted to also add a readme file and choose a licence. It's quite simple and GitHub will [walk you through the process](https://help.github.com/articles/create-a-repo/). I created a specific [repository to support my PowerShell scripts](https://github.com/aaronparker/powershell-scripts).

<figure id="attachment_4320" aria-describedby="caption-attachment-4320" style="width: 766px" class="wp-caption alignnone"><a href="https://stealthpuppy.com/media/2016/03/GitHub-Create-Respository.png" rel="attachment wp-att-4320"><img class="wp-image-4320 size-full" title="Creating a repository in GitHub" src="https://stealthpuppy.com/media/2016/03/GitHub-Create-Respository.png" alt="Creating a repository in GitHub" width="766" height="590" srcset="https://stealthpuppy.com/media/2016/03/GitHub-Create-Respository.png 766w, https://stealthpuppy.com/media/2016/03/GitHub-Create-Respository-150x116.png 150w, https://stealthpuppy.com/media/2016/03/GitHub-Create-Respository-300x231.png 300w" sizes="(max-width: 766px) 100vw, 766px" /></a><figcaption id="caption-attachment-4320" class="wp-caption-text">Creating a repository in GitHub*</figure>

Now that I have a repository and have uploaded some scripts, I can interact with the repository via the [command line](https://www.powershellgallery.com/packages/posh-git/), via PowerShell, or via the [GitHub Desktop](https://desktop.github.com/) application.

## GitHub Desktop

The GitHub Desktop application makes it simple to manage code repositories on GitHub and can be used to synchronise code across multiple machines. This too supports multiple platforms (OS X and Windows), so we get the same experience on both platforms.

<figure id="attachment_4306" aria-describedby="caption-attachment-4306" style="width: 1024px" class="wp-caption alignnone"><a href="https://stealthpuppy.com/media/2016/03/GitHub-Desktop-OSX.png" rel="attachment wp-att-4306"><img class="wp-image-4306 size-large" title="GitHub Desktop on OS X" src="https://stealthpuppy.com/media/2016/03/GitHub-Desktop-OSX-1024x667.png" alt="GitHub Desktop on OS X" width="1024" height="667" srcset="https://stealthpuppy.com/media/2016/03/GitHub-Desktop-OSX-1024x667.png 1024w, https://stealthpuppy.com/media/2016/03/GitHub-Desktop-OSX-150x98.png 150w, https://stealthpuppy.com/media/2016/03/GitHub-Desktop-OSX-300x195.png 300w, https://stealthpuppy.com/media/2016/03/GitHub-Desktop-OSX-768x500.png 768w, https://stealthpuppy.com/media/2016/03/GitHub-Desktop-OSX.png 1525w" sizes="(max-width: 1024px) 100vw, 1024px" /></a><figcaption id="caption-attachment-4306" class="wp-caption-text">GitHub Desktop on OS X*</figure>

For a Windows application,

<figure id="attachment_4307" aria-describedby="caption-attachment-4307" style="width: 1024px" class="wp-caption alignnone"><a href="https://stealthpuppy.com/media/2016/03/GitHub-Desktop-Windows.png" rel="attachment wp-att-4307"><img class="wp-image-4307 size-large" title="GitHub Desktop on Windows 10" src="https://stealthpuppy.com/media/2016/03/GitHub-Desktop-Windows-1024x647.png" alt="GitHub Desktop on Windows 10" width="1024" height="647" srcset="https://stealthpuppy.com/media/2016/03/GitHub-Desktop-Windows-1024x647.png 1024w, https://stealthpuppy.com/media/2016/03/GitHub-Desktop-Windows-150x95.png 150w, https://stealthpuppy.com/media/2016/03/GitHub-Desktop-Windows-300x190.png 300w, https://stealthpuppy.com/media/2016/03/GitHub-Desktop-Windows-768x485.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" /></a><figcaption id="caption-attachment-4307" class="wp-caption-text">GitHub Desktop on Windows 10*</figure>

To create a local copy of your repository, [Clone](https://help.github.com/articles/cloning-a-repository/) the repository via _File / Clone Repository_ or as in the screenshot below:

<figure id="attachment_4321" aria-describedby="caption-attachment-4321" style="width: 1024px" class="wp-caption alignnone"><a href="https://stealthpuppy.com/media/2016/03/GitHub-Desktop-Cloning-Repository.png" rel="attachment wp-att-4321"><img class="wp-image-4321 size-large" title="Cloning a repository in GitHub Desktop" src="https://stealthpuppy.com/media/2016/03/GitHub-Desktop-Cloning-Repository-1024x593.png" alt="Cloning a repository in GitHub Desktop" width="1024" height="593" srcset="https://stealthpuppy.com/media/2016/03/GitHub-Desktop-Cloning-Repository-1024x593.png 1024w, https://stealthpuppy.com/media/2016/03/GitHub-Desktop-Cloning-Repository-150x87.png 150w, https://stealthpuppy.com/media/2016/03/GitHub-Desktop-Cloning-Repository-300x174.png 300w, https://stealthpuppy.com/media/2016/03/GitHub-Desktop-Cloning-Repository-768x445.png 768w, https://stealthpuppy.com/media/2016/03/GitHub-Desktop-Cloning-Repository.png 1075w" sizes="(max-width: 1024px) 100vw, 1024px" /></a><figcaption id="caption-attachment-4321" class="wp-caption-text">Cloning a repository in GitHub Desktop*</figure>

You'll be asked where to store the local copy. In my instance I've chosen to store code in \Documents\WindowsPowerShell, so I get a sub-folder in that location to store my scripts.

You could create a repository called WindowsPowerShell and store the local copy in \Documents, so that your entire PowerShell home folder is managed in GitHub.

# Integrating Git with Visual Studio Code

Using a source code management solution is still new to me; however my own requirements for managing PowerShell scripts are simple and I can't see a need to use Git features such as branching. Using GitHub does give me great features such as change tracking which are suitable for anyone writing simple scripts.

Visual Studio Code provides direct integration itself with Git, so that you can commit changes and sync code right from within VSCode. The Git command-line tools are required which can be installed via [Chocolatey](https://chocolatey.org/packages/git.install) on Windows or [Homebrew](http://brew.sh/) on OS X. Unfortunately on Windows, installing Git via Chocolatey didn't work for me, so I've used the [Git tools directly from the Git website](https://git-scm.com/downloads).

Once installed you can manage your repository in VSCode by opening the folder containing your locally cloned copy of the repository and you can commit and sync without leaving VSCode.

<figure id="attachment_4314" aria-describedby="caption-attachment-4314" style="width: 1024px" class="wp-caption alignnone"><a href="https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-git.png" rel="attachment wp-att-4314"><img class="wp-image-4314 size-large" title="Git integration into Visual Studio Code" src="https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-git-1024x519.png" alt="Git integration into Visual Studio Code" width="1024" height="519" srcset="https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-git-1024x519.png 1024w, https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-git-150x76.png 150w, https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-git-300x152.png 300w, https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-git-768x389.png 768w, https://stealthpuppy.com/media/2016/03/Visual-Studio-Code-git.png 1086w" sizes="(max-width: 1024px) 100vw, 1024px" /></a><figcaption id="caption-attachment-4314" class="wp-caption-text">Git integration into Visual Studio Code*</figure>

My preference is still to use the GitHub Desktop applications due to the way that changes are presented and the ability to compare differences in scripts.

# Conclusion

With GitHub and Visual Studio code, I've found a method that allows me to edit PowerShell code on multiple PCs and platforms with a consistent user experience and enables versioning. I've only scratched the surface with what I can do with these tools but I'm very happy with how this is working out so far.