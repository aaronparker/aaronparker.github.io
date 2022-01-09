---
title: Signing Git Commits for those sweet, sweet Verified Badges
description: Signing your git commits is an important step in ensuring that your projects and code can be trusted.
date: 2019-03-19T00:02:21+10:00
author: Aaron Parker
layout: post
permalink: /signing-git-commits-for-sweet-verified-badges/
image: /media/2019/03/helloquence-51716-unsplash.jpg
categories:
  - General
comments: true
---
* this unordered seed list will be replaced by the toc
{:toc}

Confession time - I've had a [GitHub account](https://github.com/aaronparker?tab=repositories) since 2014 and haven't signed a single commit. I've read various tweets and articles about signing your commits, but never committed (git it? ... see what I did there...) to setting up a signature until recently.

I'm not a developer, [I just write a bunch of scripts]({{site.baseurl}}/tag/powershell/), but I like the idea of signing my commits so that others can see that all changes to my code are verified. There's plenty of articles on why signing your commits is a good idea. Here's a couple:

* [A Git Horror Story: Repository Integrity With Signed Commits](https://mikegerwitz.com/2012/05/a-git-horror-story-repository-integrity-with-signed-commits)
* [GPG signature verification](https://github.blog/2016-04-05-gpg-signature-verification/)

If you've ever edited a file directly on github.com and committed the changes, you would surely have noticed those Verified badges:

![Signing Git Commits]({{site.baseurl}}/media/2019/03/GitHubCommit.png)

Verified signature through a GitHib.com commit
{:.figcaption}

To be honest, the GitHub documentation on [managing commit signature verification](https://help.github.com/en/articles/managing-commit-signature-verification) is pretty good, but here's how I stumbled my way through setting up a signature to [enable signed commits](https://help.github.com/en/articles/managing-commit-signature-verification).

## Setup GPG

I write PowerShell scripts and modules primarily on macOS, so I've installed [GPG Suite](https://gpgtools.org/) to create and manage keys. [Creating keys can be achieved on the command line](https://help.github.com/en/articles/generating-a-new-gpg-key), but the GPG Keychain makes managing keys simple.

  1. Create a new key pair using the same email address used when committing code to your git repository and also used to sign into GitHub
  2. Ensure you use a strong password to protect the key. I manage passwords in 1Password making it simple to create and store keys. It's a 39 random character string which means relying on copy and paste of course
  3. I've also exported my public and private key to store in my 1Password vault as backup and a way to copy the key into a Windows VM
  4. Finally I've uploaded my public key to the key server with the 'Send Public Key to the Key Server' option. Some [GPG nerd would know what exactly that does](https://sks-keyservers.net/overview-of-pools.php), but I don't believe it actually required for signing commits and pushing to GitHub, because we need to update the public key to GtiHub anyway.

![GPG key view in the GPG Keychain and Signing Git Commits]({{site.baseurl}}/media/2019/03/GPG-Key.png)

GPG key view in the GPG Keychain
{:.figcaption}

## Add Your Public Key to GitHub

[Adding your public key to your GitHub account](https://help.github.com/en/articles/adding-a-new-gpg-key-to-your-github-account) is easy:

1. Right-click your key and choose Copy
2. Open your GitHub settings, choose **SSH and GPG keys** and click **[New GPG Key](https://github.com/settings/gpg/new)**
3. Paste in the key and click **Add GPG Key**

![Adding your public GPG key to GitHub and Signing Git Commits]({{site.baseurl}}/media/2019/03/AddGPGKey.png)

Adding your public GPG key to GitHub
{:.figcaption}

## Add Your Signing Key to Git

To sign your commits, you of course need to [tell git about your GPG key](https://help.github.com/en/articles/telling-git-about-your-signing-key). On macOS that looks like this - in Terminal, list your keys to find the key ID for the key added to your GitHub account:

```bash
gpg -list-secret-keys -keyid-format LONG
```

With defaults, the key ID will be on the line that starts with 'sec'. Copy the key ID and use git to configure the signing key. In my case, it looks like this:

```bash
git config -global user.signingkey C55D39F88CE9A2C5
```

![Finding your key ID and adding the key to git]({{site.baseurl}}/media/2019/03/gitconfig.png)

Finding your key ID and adding the key to git
{:.figcaption}

On Windows the process for signing git commits is much the same. First install [Git for Windows](https://gitforwindows.org/) and use git bash instead of Terminal.

## Configure Visual Studio Code and Sign Git Commits

Finally, we can configure [Visual Studio Code](https://code.visualstudio.com/) to sign our git commits. I typically rely on GitHub Desktop to commit and push code; however, it doesn't support commit signing. While I could use [the command line to commit changes](https://help.github.com/en/articles/signing-commits), I'd prefer manage commits from fewer tools, hence doing that in VSCode instead.

In Preferences, search for 'git signing' and select 'Git: Enable Commit Signing':

![Enable Commit Signing in Visual Studio Code preferences and Signing Git Commits]({{site.baseurl}}/media/2019/03/VSCode-GitSigning.png)

Enable Commit Signing in Visual Studio Code preferences
{:.figcaption}

[VSCode supports version control using git](https://code.visualstudio.com/docs/introvideos/versioncontrol) from directly within the VSCode window. On your first commit, you'll be prompted to enter the password for your GPG key before the commit will complete.

That's about all the steps required for signing git commits. We have signed commits in a GitHub repository and a sweet, sweet Verified badge - now I can brag to all my friends and they'll know that code came from me. My mum still won't understand what I do for a living, but you can't get a win every day.

![Now I have a nice shiny verified badge on my commits]({{site.baseurl}}/media/2019/03/Verified.gif)

Now I have a nice shiny verified badge on my commits
{:.figcaption}
