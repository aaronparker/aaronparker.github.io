---
id: 4397
title: Configuring Remote Desktop Certificates for OS X Clients
date: 2016-05-20T00:34:23+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=4397
permalink: /remote-desktop-certificates-os-x-clients/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "4840662853"
image: /media/2016/05/RemoteDesktop.png
categories:
  - Microsoft
tags:
  - Certificates
  - OS X
---
Windows has supported TLS for server authentication with [RDP](https://technet.microsoft.com/en-us/library/dn473009) going back to Windows Server 2003 SP1. When connecting to a Windows PC, unless certificates have been configured, the remote PC presents a self-signed certificate, which results in a warning prompt from the Remote Desktop client. An environment with an enterprise certificate authority can enable certificate autoenrollment to enable trusted certificates on the RDP listener, thus removing the prompt. To get OS X clients to accept the certificate takes a little extra configuration not required on Windows clients.

While I may only be configuring certificates in my lab environment, there's not much effort required to remove these certificate warnings.

# Client Warnings for Untrusted Certificates

Here are the client certificate warnings on various Microsoft Remote Desktop clients, including OS X. First up the original Remote Desktop Connection (mstsc) on Windows:

<figure id="attachment_4401" aria-describedby="caption-attachment-4401" style="width: 392px" class="wp-caption alignnone">[<img class="size-full wp-image-4401" src="https://stealthpuppy.com/media/2016/05/remote-desktop-cert-error-mstsc.png" alt="Certificate Warning on the Remote Desktop Connection client" width="392" height="401" srcset="https://stealthpuppy.com/media/2016/05/remote-desktop-cert-error-mstsc.png 392w, https://stealthpuppy.com/media/2016/05/remote-desktop-cert-error-mstsc-147x150.png 147w, https://stealthpuppy.com/media/2016/05/remote-desktop-cert-error-mstsc-293x300.png 293w" sizes="(max-width: 392px) 100vw, 392px" />]({{site.baseurl}}/media/2016/05/remote-desktop-cert-error-mstsc.png)<figcaption id="caption-attachment-4401" class="wp-caption-text">Certificate Warning on the Remote Desktop Connection client*</figure>

The new Remote Desktop Universal app on Windows 10:

<figure id="attachment_4402" aria-describedby="caption-attachment-4402" style="width: 464px" class="wp-caption alignnone">[<img class="size-full wp-image-4402" src="https://stealthpuppy.com/media/2016/05/remote-desktop-cert-error-uwa.png" alt="Certificate warning in the Remote Desktop Universal app" width="464" height="779" srcset="https://stealthpuppy.com/media/2016/05/remote-desktop-cert-error-uwa.png 464w, https://stealthpuppy.com/media/2016/05/remote-desktop-cert-error-uwa-89x150.png 89w, https://stealthpuppy.com/media/2016/05/remote-desktop-cert-error-uwa-179x300.png 179w" sizes="(max-width: 464px) 100vw, 464px" />]({{site.baseurl}}/media/2016/05/remote-desktop-cert-error-uwa.png)<figcaption id="caption-attachment-4402" class="wp-caption-text">Certificate warning in the Remote Desktop Universal app*</figure>

And the Remote Desktop client on OS X 10.11:

<figure id="attachment_4400" aria-describedby="caption-attachment-4400" style="width: 662px" class="wp-caption alignnone">[<img class="size-full wp-image-4400" src="https://stealthpuppy.com/media/2016/05/RDP-Invalid-Certificate.png" alt="Certificate warning in the Remote Desktop client for OS X" width="662" height="460" srcset="https://stealthpuppy.com/media/2016/05/RDP-Invalid-Certificate.png 662w, https://stealthpuppy.com/media/2016/05/RDP-Invalid-Certificate-150x104.png 150w, https://stealthpuppy.com/media/2016/05/RDP-Invalid-Certificate-300x208.png 300w" sizes="(max-width: 662px) 100vw, 662px" />]({{site.baseurl}}/media/2016/05/RDP-Invalid-Certificate.png)<figcaption id="caption-attachment-4400" class="wp-caption-text">Certificate warning in the Remote Desktop client for OS X*</figure>

# Configuring the Certificate Template

I won't cover installing and configuring an enterprise certificate authority here; however, here are a number of articles worth reading on this topic:

  * [Certification Authority Guidance](https://technet.microsoft.com/en-us/library/hh831574(v=ws.11).aspx)
  * [Enterprise PKI with Windows Server 2012 R2 Active Directory Certificate Services (Part 1 of 2)](https://blogs.technet.microsoft.com/yungchou/2013/10/21/enterprise-pki-with-windows-server-2012-r2-active-directory-certificate-services-part-1-of-2/)
  * [Enterprise PKI with Windows Server 2012 R2 Active Directory Certificate Services (Part 2 of 2)](https://blogs.technet.microsoft.com/yungchou/2013/10/22/enterprise-pki-with-windows-server-2012-r2-active-directory-certificate-services-part-2-of-2/)
  * [Using certificates in Remote Desktop Services](https://technet.microsoft.com/en-us/library/dn781533(v=ws.11).aspx)

To configure a certificate for use with Remote Desktop Services (or RDP into any Windows PC), you'll need to create a new certificate template and enable both the Server Authentication and the Remote Desktop Authentication application policies. This was key for OS X clients - both of these policies must exist. Some articles will walk through this configuration and recommend removing the Server Authentication policy; however, the certificates will then not work on non-Windows clients.

This article has a great walk-through of the entire process and more: [RDP TLS Certificate Deployment Using GPO](http://www.darkoperator.com/blog/2015/3/26/rdp-tls-certificate-deployment-using-gpo). In my lab, I've created a 'Remote Desktop Computer' certificate template and enabled it to be autoenrolled via Group Policy.

## Certificate Template Options

To create the new template, open the Certificate Templates console and duplicate the Computer template. Use this template because it already has the Server Authentication policy enabled.

Navigate to the Extensions tab, edit the 'Application Policies' extension and remove 'Client Authentication' from the list.

<figure id="attachment_4404" aria-describedby="caption-attachment-4404" style="width: 414px" class="wp-caption alignnone">[<img class="size-full wp-image-4404" src="https://stealthpuppy.com/media/2016/05/Remote-Desktop-Cert-Extensions.png" alt="Remote Desktop template certificate extensions" width="414" height="567" srcset="https://stealthpuppy.com/media/2016/05/Remote-Desktop-Cert-Extensions.png 414w, https://stealthpuppy.com/media/2016/05/Remote-Desktop-Cert-Extensions-110x150.png 110w, https://stealthpuppy.com/media/2016/05/Remote-Desktop-Cert-Extensions-219x300.png 219w" sizes="(max-width: 414px) 100vw, 414px" />]({{site.baseurl}}/media/2016/05/Remote-Desktop-Cert-Extensions.png)<figcaption id="caption-attachment-4404" class="wp-caption-text">Remote Desktop template certificate extensions*</figure>

After you added the 'Remote Desktop Authentication' policy, you should see the policies and see in the following dialog box. See below for the actual 'Remote Desktop Authentication' policy.

<figure id="attachment_4405" aria-describedby="caption-attachment-4405" style="width: 414px" class="wp-caption alignnone">[<img class="size-full wp-image-4405" src="https://stealthpuppy.com/media/2016/05/Remote-Desktop-Cert-Extensions-Application-Policies.png" alt="Remote Desktop certificate Application Policies extension" width="414" height="567" srcset="https://stealthpuppy.com/media/2016/05/Remote-Desktop-Cert-Extensions-Application-Policies.png 414w, https://stealthpuppy.com/media/2016/05/Remote-Desktop-Cert-Extensions-Application-Policies-110x150.png 110w, https://stealthpuppy.com/media/2016/05/Remote-Desktop-Cert-Extensions-Application-Policies-219x300.png 219w" sizes="(max-width: 414px) 100vw, 414px" />]({{site.baseurl}}/media/2016/05/Remote-Desktop-Cert-Extensions-Application-Policies.png)<figcaption id="caption-attachment-4405" class="wp-caption-text">Remote Desktop certificate Application Policies extension*</figure>

Adding the 'Remote Desktop Authentication' policy requires adding a new extension named 'Remote Desktop Authentication' (or similar) with an object value of "1.3.6.1.4.1.311.54.1.2" (excluding quotes). **Edit** the **Application Policies**, click **Add**, then click **New** and enter the values as above.

<figure id="attachment_4406" aria-describedby="caption-attachment-4406" style="width: 414px" class="wp-caption alignnone">[<img class="size-full wp-image-4406" src="https://stealthpuppy.com/media/2016/05/Remote-Desktop-Cert-Extensions-Remote-Desktop-Authentication.png" alt="The Remote Desktop Authentication policy extension" width="414" height="567" srcset="https://stealthpuppy.com/media/2016/05/Remote-Desktop-Cert-Extensions-Remote-Desktop-Authentication.png 414w, https://stealthpuppy.com/media/2016/05/Remote-Desktop-Cert-Extensions-Remote-Desktop-Authentication-110x150.png 110w, https://stealthpuppy.com/media/2016/05/Remote-Desktop-Cert-Extensions-Remote-Desktop-Authentication-219x300.png 219w" sizes="(max-width: 414px) 100vw, 414px" />]({{site.baseurl}}/media/2016/05/Remote-Desktop-Cert-Extensions-Remote-Desktop-Authentication.png)<figcaption id="caption-attachment-4406" class="wp-caption-text">The Remote Desktop Authentication policy extension*</figure>

Save the template and configure your CA to issue the new template. In my lab my certificate template display name 'Remote Desktop Computer'. Since my first template failed, it's actually called 'Remote Desktop Computer v2'. However, the important name to note for the next step is the actual template name, which can be found on the General tab of the template. In my case this is 'RemoteDesktopComputerv2' (the display name, minus the spaces).

# Configure Autorenrollment

To configure autoenrollment, I've created a new GPO dedicated to the autoenrollment setting and linked it to the organisational units containing server and workstation computer account objects. Edit the policy and enable the following setting:

Computer Configuration / Administrative Templates / Windows Components / Remote Desktop Services / Remote Desktop Session Host / Security / Server authentication certificate template

Add the name of the certificate template and shown in the screenshot below:

<figure id="attachment_4407" aria-describedby="caption-attachment-4407" style="width: 686px" class="wp-caption alignnone">[<img class="size-full wp-image-4407" src="https://stealthpuppy.com/media/2016/05/Server-Authentication-Certificate-Template.png" alt="Server authentication certificate template" width="686" height="636" srcset="https://stealthpuppy.com/media/2016/05/Server-Authentication-Certificate-Template.png 686w, https://stealthpuppy.com/media/2016/05/Server-Authentication-Certificate-Template-150x139.png 150w, https://stealthpuppy.com/media/2016/05/Server-Authentication-Certificate-Template-300x278.png 300w" sizes="(max-width: 686px) 100vw, 686px" />]({{site.baseurl}}/media/2016/05/Server-Authentication-Certificate-Template.png)<figcaption id="caption-attachment-4407" class="wp-caption-text">Enabling the 'Server authentication certificate template' in Group Policy*</figure>

Once a Group Poliy refresh occurs or on the next boot, the target Windows machines will autoenroll for the certificate and configure their RDP listener.

# OS X Configuration

Now that my Remote Desktop certificates are configured for autoentrollment and Windows machines are picking up the certificates, I can import the root CA certificate into my MacBook running OS X.

Navigate to the URL of your certificate server (e.g. http://cert1/certsrv) and download the certificate via 'Download a CA certificate, certificate chain, or CRL'. Download the CA certificate in DER format. Find the downloaded certificate in Finder and open the certificate to install it into Keychain.

Once installed the certificate is not automatically trused as you can see below:

<figure id="attachment_4408" aria-describedby="caption-attachment-4408" style="width: 929px" class="wp-caption alignnone">[<img class="size-full wp-image-4408" src="https://stealthpuppy.com/media/2016/05/OSX-root-CA-certificate.png" alt="OSX root CA certificate" width="929" height="843" srcset="https://stealthpuppy.com/media/2016/05/OSX-root-CA-certificate.png 929w, https://stealthpuppy.com/media/2016/05/OSX-root-CA-certificate-150x136.png 150w, https://stealthpuppy.com/media/2016/05/OSX-root-CA-certificate-300x272.png 300w, https://stealthpuppy.com/media/2016/05/OSX-root-CA-certificate-768x697.png 768w" sizes="(max-width: 929px) 100vw, 929px" />]({{site.baseurl}}/media/2016/05/OSX-root-CA-certificate.png)<figcaption id="caption-attachment-4408" class="wp-caption-text">My root CA certificate in Keychain on OS X*</figure>

Set the certificate to be trusted by selecting 'Alway Trust' from the 'When using this certificate' option. Close the certificate properties window and you should be prompted for your password to save the changes. Now when connecting to PCs via the Remote Desktop client, you should no longer receive certificate warnings.

This article shows [how to install the root CA certificate via Terminal](https://derflounder.wordpress.com/2011/03/13/adding-new-trusted-root-certificates-to-system-keychain/), which should assist in automating the import across a number of Macs.