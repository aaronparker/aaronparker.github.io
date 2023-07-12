---
layout: post
title: Setting Up a Local Environment for IntuneCD
description: Setting up a local Windows, WSL2, Linux or macOS environment to use IntuneCD
  to backup and document an Intune tenant.
permalink: "/intunecd-local-environment/"
image:
  path: "/assets/img/intunecd/image.jpg"
  srcset:
    1920w: "/assets/img/intunecd/image.jpg"
    960w: "/assets/img/intunecd/image@0,5x.jpg"
    480w: "/assets/img/intunecd/image@0,25x.jpg"
comments: true
related_posts:
- _posts/2022-03-02-automate-intune-documentation-azure.md
- _posts/2022-03-02-automate-intune-documentation-github.md
date: 2023-07-12 00:24 +1000
---
- this unordered seed list will be replaced by the toc
{:toc}

I've previously written about using IntuneCD in a GitHub or Azure DevOps pipeline to backup and document an Intune tenant in these articles:

* [Automate Microsoft Intune As-Built Documentation on GitHub](https://stealthpuppy.com/automate-intune-documentation-github/)
* [Automate Microsoft Intune As-Built Documentation on Azure DevOps](https://stealthpuppy.com/automate-intune-documentation-azure/)

The approach uses Linux runners hosted by GitHub or Microsoft, thus the platform configuration is already taken care of (Python, Node.js, and dependencies etc.). I do often find myself using IntuneCD locally to backup a tenant and produce an as-built document - running locally requires installing the prerequisites which can be a bit of fun (or hair pulling) depending on your target platform.

In this article, I'll cover the steps to install and configure the prerequisites for running IntuneCD on Windows, Windows Subsystem for Linux (WSL2), Linux and macOS. **Note** - these are the install steps that have worked for me on each of these platforms. Your mileage may vary.

## Running IntuneCD Locally

The scripts below can be used to backup your Intune tenant and create a new as-built document in PDF and HTML formats. This approach is useful where you might not want to go as far as creating a pipeline to automate the entire process. These scripts can be used for an adhoc approach to backup and document generation.

Below is the script in PowerShell format which has been tested on Windows. You can find the original source in my [template repository on GitHub](https://github.com/aaronparker/intune-backup-template).

```powershell
New-Item -Path "$PWD\prod-backup" -ItemType "Directory"
IntuneCD-startbackup --mode=1 --output=json --path="$PWD\prod-backup" --localauth="$PWD\auth.json"

# Generate the as-built document in markdown
$Auth = Get-Content -Path "$PWD\auth.json" | ConvertFrom-Json
$INTRO="Intune backup and documentation generated locally. <img align=`"right`" width=`"96`" height=`"96`" src=`"./logo.png`">"
IntuneCD-startdocumentation --path="$PWD\prod-backup" --outpath="$PWD\prod-as-built.md" --tenantname="$($Auth.TENANT_NAME)" --intro="$INTRO"

# Generate a PDF document from the as-built markdown
md-to-pdf "$PWD\prod-as-built.md" --config-file "$PWD\md2pdf\pdfconfig.json"

# Generate a HTML document from the as-built markdown
md-to-pdf "$PWD\prod-as-built.md" --config-file "$PWD\md2pdf\htmlconfig.json" --as-html
```

Below is the same script in Shell Script format - this has been tested on WSL2, Linux and macOS:

```bash
mkdir -p "$PWD/prod-backup"
IntuneCD-startbackup --mode=1 --output=json --path="$PWD/prod-backup" --localauth="$PWD/auth.json"

# Generate the as-built document in markdown
TENANT=$(jq .params.TENANT_NAME $PWD/auth.json | tr -d \")
INTRO="Intune backup and documentation generated locally. <img align=\"right\" width=\"96\" height=\"96\" src=\"./logo.png\">"
IntuneCD-startdocumentation --path="$PWD/prod-backup" --outpath="$PWD/prod-as-built.md" --tenantname="$TENANT" --intro="$INTRO"

# Generate a PDF document from the as-built markdown
md-to-pdf "$PWD/prod-as-built.md" --config-file "$PWD/md2pdf/pdfconfig.json"

# Generate a HTML document from the as-built markdown
md-to-pdf "$PWD/prod-as-built.md" --config-file "$PWD/md2pdf/htmlconfig.json" --as-html
```

### Authentication

IntuneCD uses an [Azure AD app registration to authenticate](https://github.com/almenscorner/IntuneCD/wiki/Authentication) to the Microsoft Graph API. The script above uses a local JSON file with credentials (see the example below). If your local backup/export of your Intune tenant is hosted in a git repository, make sure you add `auth.json` to the `.gitignore` file - [Ignoring files](https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files).

```json
{
    "params":{
        "TENANT_NAME": "intunetenant.onmicrosoft.com",
        "CLIENT_ID": "28f60124-eb81-40e1-b1c4-1bb06c44ec91",
        "CLIENT_SECRET": "AsT8Q~j_8MqluNxFi_4TIC8kdXzRdjEwM.tZxcjS"
    }
}
```

### Prerequisites

Running the scripts requires the following dependencies:

* [Python](https://www.python.org/) - IntuneCD is written in Python
* [Node.js](https://nodejs.org/) - required by md-to-pdf
* [jq](https://jqlang.github.io/jq/) - this is only required when running the script on WSL2, Linux or macOS. The PowerShell script uses `ConvertFrom-Json` instead

## Platform Configuration

### Windows

Use the Windows Package Manager (winget) to install an environment on Windows. Elevate a Terminal window, and run the following winget commands to install Python, NVM for Windows (Node.js version manager), and git for Windows. 

```powershell
# Install Python and NVM for Windows
winget install Python.Python.3.11 --silent
winget install CoreyButler.NVMforWindows --silent
```

If you're storing your configuration in git repository you can install git locally. Additionally, install the GitHub CLI will help with [authenticating to GitHub](https://cli.github.com/manual/gh_auth_login):

```powershell
# Install git for Windows and GitHub CLI
winget install Git.Git --silent
winget install Github.cli --silent
```

Close and restart an elevated Terminal window and install IntuneCD, Node.js, and md-to-pdf. The Node.js install is using NVM as recommended by Microsoft -  [Install NodeJS on Windows](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows):

```powershell
# Install IntuneCD, Node.js and md-to-pdf
pip3 install IntuneCD
nvm install 18.6.1
npm i -g md-to-pdf
```

### WSL2 and Linux

The steps for setting up an environment on [WSL2](https://learn.microsoft.com/en-us/windows/wsl/about) and Linux will be the same.

If your target platform is Windows, the benefit of WSL2 over Linux is that you don't need to run an entire virtual machine just to run Linux. Additionally, using WSL2 on Windows instead of natively installing python and Node.js, means that your development environment is containerised within WSL, thus you can remove the entire environment by deleting the WSL instance.

However, you may need to weigh that against wasting hours of your life on getting Linux running that you'll never get back.

The script below will configure an environment, and assumes you are using WLS2 with Ubuntu or an Ubuntu virtual machine with a minimal installation:

* Install required dependencies including [jq](https://jqlang.github.io/jq/) with `apt-get`
* [Homebrew](https://brew.sh/) this will simplfy the installation of additional components including Python. I had issues installing Python with pyenv
* Install Python with Homebrew
* Install IntuneCD
* Install [nvm](https://github.com/nvm-sh/nvm) and Node.js
* Install md-to-pdf

```bash
# Update the OS and install git, curl and build-essential required for Homebrew
sudo apt-get update; sudo apt-get upgrade -y
sudo apt install -y git curl build-essential jq

# Install Node.js depdendencies
sudo apt-get install -y libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libasound2 libpango-1.0-0 libpangocairo-1.0-0 libpangoft2-1.0-0

# Install Homebrew and Python
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install python@3.11

# Update pip and install IntuneCD
python3.11 -m pip install --upgrade pip
pip3 install IntuneCD

# Install Node.js version manager and Node.js LTS
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install --lts

# Install md-to-pdf
npm i -g md-to-pdf
```

### macOS

The script below will set up the required dependencies and tools on macOS. This assumes you are using the default zsh shell and will install the following:

* [Homebrew](https://brew.sh/) which is the best package manger for macOS
* [pyenv](https://github.com/pyenv/pyenv) to simplify the installation of Python. Follow the install instructions to set up pyenv for macOS and zsh
* [jq](https://jqlang.github.io/jq/) and [GitHub CLI](https://cli.github.com/manual/gh_auth_login)
* Install Python with pyenv and set the default version
* Install IntuneCD
* Install nvm and Node.js
* Install md-to-pdf

```zsh
# Install Homebrew, pyenv, and jq
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew update
brew install pyenv jq gh

# Set up the shell environment for pyenv
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(pyenv init -)"' >> ~/.zshrc

# Install Python and set a global version
pyenv install 3.11.4
pyenv global 3.11.4

# Install IntuneCD
pip3 install IntuneCD

# Install Node.js version manager and Node.js LTS
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install --lts

# Install md-to-pdf
npm i -g md-to-pdf
```

## Wrap Up

The commands listed this article should enable you to set up your local environment to use with IntuneCD. This includes each of the required dependencies. I've tested on Windows 11, macOS 13.4 and Ubuntu 22.04 across multiple devices and virtual machines, so the commands should be well tested and hopefully work for you.

My preferred platforms for using IntuneCD locally are macOS and Windows. Both platforms are simple to configure and starting using IntuneCD to export an Intune configuration and create an as-built document. However, if you prefer Linux the commands listed in this article will assist in configuring that platform.
