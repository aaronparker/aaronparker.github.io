---
id: 5155
title: Automating the Citrix ShareFile Drive Mapper Install
date: 2016-09-13T00:00:01+10:00
author: Aaron Parker
layout: post
guid: http://stealthpuppy.com/?p=5155
permalink: /automate-sharefile-drive-mapper-install/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "5138443316"
image: /wp-content/uploads/2016/09/SDMInstaller2.png
categories:
  - Citrix
tags:
  - Drive Mapper
  - ShareFile
---
Automating the installation of the Citrix ShareFile Drive Mapper requires deploying a code signing certificate to target machines before setup will complete. If you've installed the Drive Mapper client, you will have seen the following dialog box during setup:

<figure id="attachment_4416" aria-describedby="caption-attachment-4416" style="width: 501px" class="wp-caption alignnone">[<img class="size-full wp-image-4416" src="http://stealthpuppy.com/wp-content/uploads/2016/05/ShareFileDriver.png" alt="Citrix ShareFile Driver" width="501" height="232" srcset="https://stealthpuppy.com/wp-content/uploads/2016/05/ShareFileDriver.png 501w, https://stealthpuppy.com/wp-content/uploads/2016/05/ShareFileDriver-150x69.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/05/ShareFileDriver-300x139.png 300w" sizes="(max-width: 501px) 100vw, 501px" />](http://stealthpuppy.com/wp-content/uploads/2016/05/ShareFileDriver.png)<figcaption id="caption-attachment-4416" class="wp-caption-text">Citrix ShareFile Driver prompt during install*</figure>

[Mike Nelson](https://twitter.com/nelmedia) had some challenges deploying the client, so I've documented the process here.

# Extract the Code Signing Certificate

Manually install the Driver Mapper on a target machine and view the local certificates of the local computer with the Certificates snap-in (via mmc.exe). Open the **Trusted Publishers** folder to view the Citrix code signing certificate:

<figure id="attachment_5158" aria-describedby="caption-attachment-5158" style="width: 982px" class="wp-caption alignnone">[<img class="wp-image-5158 size-full" src="http://stealthpuppy.com/wp-content/uploads/2016/09/Capture.png" alt="The code signing certificate in Certificate Manager" width="982" height="520" srcset="https://stealthpuppy.com/wp-content/uploads/2016/09/Capture.png 982w, https://stealthpuppy.com/wp-content/uploads/2016/09/Capture-150x79.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/09/Capture-300x159.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/09/Capture-768x407.png 768w" sizes="(max-width: 982px) 100vw, 982px" />](http://stealthpuppy.com/wp-content/uploads/2016/09/Capture.png)<figcaption id="caption-attachment-5158" class="wp-caption-text">Citrix ShareFile Drive Mapper DigiCert code signing certificate*</figure>

View the properties of the certificate and you can see that it's been issued by DigiCert:

<figure id="attachment_5159" aria-describedby="caption-attachment-5159" style="width: 405px" class="wp-caption alignnone">[<img class="size-full wp-image-5159" src="http://stealthpuppy.com/wp-content/uploads/2016/09/CitrixCodeCertificateProperties.png" alt="Citrix ShareFile Drive Mapper Digicert code signing certificate" width="405" height="515" srcset="https://stealthpuppy.com/wp-content/uploads/2016/09/CitrixCodeCertificateProperties.png 405w, https://stealthpuppy.com/wp-content/uploads/2016/09/CitrixCodeCertificateProperties-118x150.png 118w, https://stealthpuppy.com/wp-content/uploads/2016/09/CitrixCodeCertificateProperties-236x300.png 236w" sizes="(max-width: 405px) 100vw, 405px" />](http://stealthpuppy.com/wp-content/uploads/2016/09/CitrixCodeCertificateProperties.png)<figcaption id="caption-attachment-5159" class="wp-caption-text">Citrix ShareFile Drive Mapper Digicert code signing certificate*</figure>

Export the certificate to a local file (from the **Details** tab with **Copy to File...**) using the default DER encoded binary X.509 format.

# Installing the ShareFile Drive Mapper Certificate

Here is a couple of ways of deploying the code signing certificate to clients:

## Deploy the certificate via Group Policy

Certificates can be deployed to the **Trusted Publishers** store via a Group Policy Object. Import the certificate into the **Public Key Policies** node under **Security Settings** in a GPO applied to an OU containing the target computer accounts.

<figure id="attachment_5160" aria-describedby="caption-attachment-5160" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5160" src="http://stealthpuppy.com/wp-content/uploads/2016/09/DeployCertViaGroupPolicy-1024x531.png" alt="Deploying the code signing certificate via Group Policy" width="1024" height="531" srcset="https://stealthpuppy.com/wp-content/uploads/2016/09/DeployCertViaGroupPolicy-1024x531.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/09/DeployCertViaGroupPolicy-150x78.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/09/DeployCertViaGroupPolicy-300x156.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/09/DeployCertViaGroupPolicy-768x398.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/09/DeployCertViaGroupPolicy.png 1306w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/09/DeployCertViaGroupPolicy.png)<figcaption id="caption-attachment-5160" class="wp-caption-text">Deploying the code signing certificate via Group Policy*</figure>

Target computer will, of course, need to be Active Directory domain members for the certificate to be deployed in this manner. As well as this, the policy will have to be processed before the client is installed.

## Install the certificate via certutil.exe

To install the certificate via other means, including via a script or embedded into a setup process. The [certutil.exe](https://technet.microsoft.com/en-us/library/cc732443(v=ws.11).aspx) command line tool can be used to import the certificate via the following command:

<pre class="prettyprint lang-plain_text" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">certutil -addstore -Enterprise -f "TrustedPublisher" ".\CitrixCodeSigningCert.cer"</pre>

This method provides some flexibility to enable a controlled deployment or installation of the certificate on machines not managed via Group Policy.

# Deploying the Drive Mapper client

To deploy the Drive Mapper client is very simple - no customisation of the installer should be required, unless you want to change the default installation path. Download the [Drive Mapper client in EXE or MSI](https://www.citrix.com/downloads/sharefile/clients-and-plug-ins/sharefile-drive-mapper.html) format. An installation guide can be found in article [CTX207791](http://support.citrix.com/article/CTX207791).

I've been able to deploy the client via MDM-enrolled Windows 10 machines using the Windows Installer deployment option. The particular environment is using Windows 10 joined to Azure AD with SSO enabled for ShareFile, which flows through to the Drive Mapper and ShareFile Outlook plug-in.

# Summary

Citrix has not yet certified the Citrix ShareFile Drive Mapper client driver for the [WHQL](https://msdn.microsoft.com/en-us/windows/hardware/gg463010.aspx), so until then you'll need to follow this process to get the certificate onto target machines to automate the installation or avoid having to disable Secure Boot to install it.