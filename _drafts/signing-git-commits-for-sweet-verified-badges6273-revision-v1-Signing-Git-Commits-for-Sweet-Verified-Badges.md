---
id: 6290
title: Signing Git Commits for Sweet Verified Badges
date: 2019-03-19T09:20:42+10:00
author: Aaron Parker
layout: revision
guid: https://stealthpuppy.com/6273-revision-v1/
permalink: /6273-revision-v1/
---
Confession time - I've had a [GitHub accoun](https://github.com/aaronparker?tab=repositories)t since 2014 and haven't signed a single commit. I've read various tweets and articles about signing your commits, but never committed (git it? ... see what I did there...) to setting up a signature until recently.

I'm not a developer, [I just write a bunch of scripts](https://stealthpuppy.com/tag/powershell/), but I like the idea of signing my commits so that others can see that all changes to my code are verified. There's plenty of articles on why signing your commits is a good idea. Here's a couple:

  * [A Git Horror Story: Repository Integrity With Signed Commits](https://mikegerwitz.com/2012/05/a-git-horror-story-repository-integrity-with-signed-commits)
  * [GPG signature verification](https://github.blog/2016-04-05-gpg-signature-verification/)

If you've ever edited a file directly on github.com and committed the changes, you would surely have noticed those Verified badges:

[<img src="https://stealthpuppy.com/wp-content/uploads/2019/03/GitHubCommit-1024x397.png" alt="Signing Git Commits" class="wp-image-6275" srcset="https://stealthpuppy.com/wp-content/uploads/2019/03/GitHubCommit-1024x397.png 1024w, https://stealthpuppy.com/wp-content/uploads/2019/03/GitHubCommit-150x58.png 150w, https://stealthpuppy.com/wp-content/uploads/2019/03/GitHubCommit-300x116.png 300w, https://stealthpuppy.com/wp-content/uploads/2019/03/GitHubCommit-768x298.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" />](https://stealthpuppy.com/wp-content/uploads/2019/03/GitHubCommit.png)*Verified signature through a GitHib.com commit *

To be honest, the GitHub documentation on [managing commit signature verification](https://help.github.com/en/articles/managing-commit-signature-verification) is pretty good, but here's how I stumbled my way through setting up a signature to [enable signed commits](https://help.github.com/en/articles/managing-commit-signature-verification).

## Setup GPG

I write PowerShell scripts and modules primarily on macOS, so I've installed [GPG Suite](https://gpgtools.org/) to create and manage keys. [Creating keys can be achieved on the command line](https://help.github.com/en/articles/generating-a-new-gpg-key), but the GPG Keychain makes managing keys simple.

  1. Create a new key pair using the same email address used when committing code to your git repository and also used to sign into GitHub
  2. Ensure you use a strong password to protect the key. I manage passwords in 1Password making it simple to create and store keys. It's a 39 random character string which means relying on copy and paste of course
  3. I've also exported my public and private key to store in my 1Password vault as backup and a way to copy the key into a Windows VM
  4. Finally I've uploaded my public key to the key server with the 'Send Public Key to the Key Server' option. Some [GPG nerd would know what exactly that does](https://sks-keyservers.net/overview-of-pools.php), but I don't believe it actually required for signing commits and pushing to GitHub, because we need to update the public key to GtiHub anyway.

[<img src="https://stealthpuppy.com/wp-content/uploads/2019/03/GPG-Key-1024x645.png" alt="GPG key view in the GPG Keychain and Signing Git Commits" class="wp-image-6277" srcset="https://stealthpuppy.com/wp-content/uploads/2019/03/GPG-Key-1024x645.png 1024w, https://stealthpuppy.com/wp-content/uploads/2019/03/GPG-Key-150x94.png 150w, https://stealthpuppy.com/wp-content/uploads/2019/03/GPG-Key-300x189.png 300w, https://stealthpuppy.com/wp-content/uploads/2019/03/GPG-Key-768x483.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" />](https://stealthpuppy.com/wp-content/uploads/2019/03/GPG-Key.png)*GPG key view in the GPG Keychain*

## Add Your Public Key to GitHub

[Adding your public key to your GitHub account](https://help.github.com/en/articles/adding-a-new-gpg-key-to-your-github-account) is easy: 

  1. Right-click your key and choose Copy
  2. Open your GitHub settings, choose **SSH and GPG keys** and click **[New GPG Key](https://github.com/settings/gpg/new)**
  3. Paste in the key and click **Add GPG Key**

[<img src="https://stealthpuppy.com/wp-content/uploads/2019/03/AddGPGKey-1024x482.png" alt="Adding your public GPG key to GitHub and Signing Git Commits" class="wp-image-6279" srcset="https://stealthpuppy.com/wp-content/uploads/2019/03/AddGPGKey-1024x482.png 1024w, https://stealthpuppy.com/wp-content/uploads/2019/03/AddGPGKey-150x71.png 150w, https://stealthpuppy.com/wp-content/uploads/2019/03/AddGPGKey-300x141.png 300w, https://stealthpuppy.com/wp-content/uploads/2019/03/AddGPGKey-768x361.png 768w, https://stealthpuppy.com/wp-content/uploads/2019/03/AddGPGKey.png 1578w" sizes="(max-width: 1024px) 100vw, 1024px" />](https://stealthpuppy.com/wp-content/uploads/2019/03/AddGPGKey.png)*Adding your public GPG key to GitHub*

## Add Your Signing Key to Git

To sign your commits, you of course need to [tell git about your GPG key](https://help.github.com/en/articles/telling-git-about-your-signing-key). On macOS that looks like this - in Terminal, list your keys to find the key ID for the key added to your GitHub account:

<p class="customcode">
  <strong>gpg -list-secret-keys -keyid-format LONG</strong>
</p>

With defaults, the key ID will be on the line that starts with 'sec'. Copy the key ID and use git to configure the signing key. In my case, it looks like this:

<p class="customcode">
  <strong>git config -global user.signingkey C55D39F88CE9A2C5</strong>
</p><figure class="wp-block-image is-resized">

[<img src="https://stealthpuppy.com/wp-content/uploads/2019/03/gitconfig-1024x696.png" alt="Finding your key ID and adding the key to git" class="wp-image-6281" width="580" height="394" srcset="https://stealthpuppy.com/wp-content/uploads/2019/03/gitconfig-1024x696.png 1024w, https://stealthpuppy.com/wp-content/uploads/2019/03/gitconfig-150x102.png 150w, https://stealthpuppy.com/wp-content/uploads/2019/03/gitconfig-300x204.png 300w, https://stealthpuppy.com/wp-content/uploads/2019/03/gitconfig-768x522.png 768w" sizes="(max-width: 580px) 100vw, 580px" />](https://stealthpuppy.com/wp-content/uploads/2019/03/gitconfig.png)*Finding your key ID and adding the key to git*

On Windows the process for signing git commits is much the same. First install [Git for Windows](https://gitforwindows.org/) and use git bash instead of Terminal.

## Configure Visual Studio Code and Sign Git Commits

Finally, we can configure [Visual Studio Code](https://code.visualstudio.com/) to sign our git commits. I typically rely on GitHub Desktop to commit and push code; however, it doesn't support commit signing. While I could use [the command line to commit changes](https://help.github.com/en/articles/signing-commits), I'd prefer manage commits from fewer tools, hence doing that in VSCode instead.

In Preferences, search for 'git signing' and select 'Git: Enable Commit Signing':

[<img src="https://stealthpuppy.com/wp-content/uploads/2019/03/VSCode-GitSigning-1024x625.png" alt="Enable Commit Signing in Visual Studio Code preferences and Signing Git Commits" class="wp-image-6282" srcset="https://stealthpuppy.com/wp-content/uploads/2019/03/VSCode-GitSigning-1024x625.png 1024w, https://stealthpuppy.com/wp-content/uploads/2019/03/VSCode-GitSigning-150x92.png 150w, https://stealthpuppy.com/wp-content/uploads/2019/03/VSCode-GitSigning-300x183.png 300w, https://stealthpuppy.com/wp-content/uploads/2019/03/VSCode-GitSigning-768x469.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" />](https://stealthpuppy.com/wp-content/uploads/2019/03/VSCode-GitSigning.png)*Enable Commit Signing in Visual Studio Code preferences*

[VSCode supports version control using git](https://code.visualstudio.com/docs/introvideos/versioncontrol) from directly within the VSCode window. On your first commit, you'll be prompted to enter the password for your GPG key before the commit will complete.

That's about all the steps required for signing git commits. We have signed commits in a GitHub repository and a sweet, sweet Verified badge - now I can brag to all my friends and they'll know that code came from me. My mum still won't understand what I do for a living, but you can't get a win every day.

[<img src="https://stealthpuppy.com/wp-content/uploads/2019/03/Verified.gif" alt="Now I have a nice shiny verified badge on my commits" class="wp-image-6280" />](https://stealthpuppy.com/wp-content/uploads/2019/03/Verified.gif)*Now I have a nice shiny verified badge on my commits*

[Photo by Helloquence on Unsplash](https://unsplash.com/photos/OQMZwNd3ThU)