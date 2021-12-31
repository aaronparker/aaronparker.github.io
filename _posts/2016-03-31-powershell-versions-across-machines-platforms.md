---
id: 4301
title: 'Managing PowerShell Scripts Across Machines &#038; Platforms'
date: 2016-03-31T22:17:46+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy/?p=4301
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

## Visual Studio Code

Visual Studio Code is a cross platform code editor from Microsoft which I've come to really enjoy using because it allows me to edit PowerShell code directly on a MacBook (my primary machine). [It supports Windows, OS X and Linux](https://code.visualstudio.com/#alt-downloads) and features [extensions](https://marketplace.visualstudio.com/VSCode) that provide support for various languages, themes and features, such as integration into other tools etc.

Providing the same experience across OS X and Windows is fantastic and it's great that Microsoft is embracing platforms other than Windows. While I can't execute PowerShell scripts on OS X, the ability to edit and manage code on my primary OS simplifies my workflow.

### User Interface

Visual Studio Code provides as consistent UI across platforms - here it is on OS X with support for PowerShell added via an extension:

![Visual Studio Code on OS X]({{site.baseurl}}/media/2016/03/Visual-Studio-Code-OSX.png)*Visual Studio Code on OS X*

And here's the same view on Windows:

![Visual Studio Code on Windows 10]({{site.baseurl}}/media/2016/03/Visual-Studio-Code-Windows2.png)*Visual Studio Code on Windows 10*

### Integration with PowerShell

VSCode supports [extensions](https://marketplace.visualstudio.com/VSCode) with which we can enable PowerShell syntax support, so even on OS X, we can write PowerShells scripts. To install the PowerShell extension, press F1, type `ext install` and press Enter. Select to install the PowerShell extension and restart Visual Studio Code when prompted.

![Installing PowerShell language syntax support on OS X]({{site.baseurl}}/media/2016/03/Visual-Studio-Code-install-powershell.png)*Installing PowerShell language syntax support on OS X*

Updating extensions is handled in the same manner:

![Updating extensions in Visual Studio Code on OS X]({{site.baseurl}}/media/2016/03/Visual-Studio-Code-update-extensions.png)*Updating extensions in Visual Studio Code on OS X*

There's plenty of extensions and themes to customise VSCode to make the tool work for you.

## GitHub

There's most likely plenty of methods for managing PowerShell code; however a tool such as GitHub which provides a free option is very popular and is actually [used by the PowerShell team at Microsoft](https://github.com/powershell), making it a desirable solution.

### Getting Started with GitHub

To start with GitHub create a repository, you'll be prompted to also add a readme file and choose a licence. It's quite simple and GitHub will [walk you through the process](https://help.github.com/articles/create-a-repo/). I created a specific [repository to support my PowerShell scripts](https://github.com/aaronparker/powershell-scripts).

![Creating a repository in GitHub]({{site.baseurl}}/media/2016/03/GitHub-Create-Respository.png)*Creating a repository in GitHub*

Now that I have a repository and have uploaded some scripts, I can interact with the repository via the [command line](https://www.powershellgallery.com/packages/posh-git/), via PowerShell, or via the [GitHub Desktop](https://desktop.github.com/) application.

### GitHub Desktop

The GitHub Desktop application makes it simple to manage code repositories on GitHub and can be used to synchronise code across multiple machines. This too supports multiple platforms (OS X and Windows), so we get the same experience on both platforms.

![GitHub Desktop on OS X]({{site.baseurl}}/media/2016/03/GitHub-Desktop-OSX.png)*GitHub Desktop on OS X*

For a Windows application,

![GitHub Desktop on Windows 10]({{site.baseurl}}/media/2016/03/GitHub-Desktop-Windows.png)*GitHub Desktop on Windows 10*

To create a local copy of your repository, [Clone](https://help.github.com/articles/cloning-a-repository/) the repository via _File / Clone Repository_ or as in the screenshot below:

![Cloning a repository in GitHub Desktop]({{site.baseurl}}/media/2016/03/GitHub-Desktop-Cloning-Repository.png)*Cloning a repository in GitHub Desktop*

You'll be asked where to store the local copy. In my instance I've chosen to store code in \Documents\WindowsPowerShell, so I get a sub-folder in that location to store my scripts.

You could create a repository called WindowsPowerShell and store the local copy in \Documents, so that your entire PowerShell home folder is managed in GitHub.

## Integrating Git with Visual Studio Code

Using a source code management solution is still new to me; however my own requirements for managing PowerShell scripts are simple and I can't see a need to use Git features such as branching. Using GitHub does give me great features such as change tracking which are suitable for anyone writing simple scripts.

Visual Studio Code provides direct integration itself with Git, so that you can commit changes and sync code right from within VSCode. The Git command-line tools are required which can be installed via [Chocolatey](https://chocolatey.org/packages/git.install) on Windows or [Homebrew](http://brew.sh/) on OS X. Unfortunately on Windows, installing Git via Chocolatey didn't work for me, so I've used the [Git tools directly from the Git website](https://git-scm.com/downloads).

Once installed you can manage your repository in VSCode by opening the folder containing your locally cloned copy of the repository and you can commit and sync without leaving VSCode.

![Git integration into Visual Studio Code]({{site.baseurl}}/media/2016/03/Visual-Studio-Code-git.png)*Git integration into Visual Studio Code*

My preference is still to use the GitHub Desktop applications due to the way that changes are presented and the ability to compare differences in scripts.

## Conclusion

With GitHub and Visual Studio code, I've found a method that allows me to edit PowerShell code on multiple PCs and platforms with a consistent user experience and enables versioning. I've only scratched the surface with what I can do with these tools but I'm very happy with how this is working out so far.