---
id: 5155
title: Automating the Citrix ShareFile Drive Mapper Install
date: 2016-09-13T00:00:01+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=5155
permalink: /automate-sharefile-drive-mapper-install/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "5138443316"
image: /media/2016/09/SDMInstaller2.png
categories:
  - Citrix
tags:
  - Drive Mapper
  - ShareFile
---
Automating the installation of the Citrix ShareFile Drive Mapper requires deploying a code signing certificate to target machines before setup will complete. If you've installed the Drive Mapper client, you will have seen the following dialog box during setup:

![Citrix ShareFile Driver]({{site.baseurl}}/media/2016/05/ShareFileDriver.png)*Citrix ShareFile Driver prompt during install*</figure>

[Mike Nelson](https://twitter.com/nelmedia) had some challenges deploying the client, so I've documented the process here.

## Extract the Code Signing Certificate

Manually install the Driver Mapper on a target machine and view the local certificates of the local computer with the Certificates snap-in (via mmc.exe). Open the **Trusted Publishers** folder to view the Citrix code signing certificate:

![The code signing certificate in Certificate Manager]({{site.baseurl}}/media/2016/09/Capture.png)*Citrix ShareFile Drive Mapper DigiCert code signing certificate*</figure>

View the properties of the certificate and you can see that it's been issued by DigiCert:

![Citrix ShareFile Drive Mapper Digicert code signing certificate]({{site.baseurl}}/media/2016/09/CitrixCodeCertificateProperties.png)*Citrix ShareFile Drive Mapper Digicert code signing certificate*</figure>

Export the certificate to a local file (from the **Details** tab with **Copy to File...**) using the default DER encoded binary X.509 format.

## Installing the ShareFile Drive Mapper Certificate

Here is a couple of ways of deploying the code signing certificate to clients:

### Deploy the certificate via Group Policy

Certificates can be deployed to the **Trusted Publishers** store via a Group Policy Object. Import the certificate into the **Public Key Policies** node under **Security Settings** in a GPO applied to an OU containing the target computer accounts.

![Deploying the code signing certificate via Group Policy]({{site.baseurl}}/media/2016/09/DeployCertViaGroupPolicy.png)*Deploying the code signing certificate via Group Policy*</figure>

Target computer will, of course, need to be Active Directory domain members for the certificate to be deployed in this manner. As well as this, the policy will have to be processed before the client is installed.

### Install the certificate via certutil.exe

To install the certificate via other means, including via a script or embedded into a setup process. The [certutil.exe](https://technet.microsoft.com/en-us/library/cc732443(v=ws.11).aspx) command line tool can be used to import the certificate via the following command:

```
certutil -addstore -Enterprise -f "TrustedPublisher" ".\CitrixCodeSigningCert.cer"
```

This method provides some flexibility to enable a controlled deployment or installation of the certificate on machines not managed via Group Policy.

## Deploying the Drive Mapper client

To deploy the Drive Mapper client is very simple - no customisation of the installer should be required, unless you want to change the default installation path. Download the [Drive Mapper client in EXE or MSI](https://www.citrix.com/downloads/sharefile/clients-and-plug-ins/sharefile-drive-mapper.html) format. An installation guide can be found in article [CTX207791](http://support.citrix.com/article/CTX207791).

I've been able to deploy the client via MDM-enrolled Windows 10 machines using the Windows Installer deployment option. The particular environment is using Windows 10 joined to Azure AD with SSO enabled for ShareFile, which flows through to the Drive Mapper and ShareFile Outlook plug-in.

## Summary

Citrix has not yet certified the Citrix ShareFile Drive Mapper client driver for the [WHQL](https://msdn.microsoft.com/en-us/windows/hardware/gg463010.aspx), so until then you'll need to follow this process to get the certificate onto target machines to automate the installation or avoid having to disable Secure Boot to install it.