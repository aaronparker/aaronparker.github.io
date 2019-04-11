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

![Certificate Warning on the Remote Desktop Connection client]({{site.baseurl}}/media/2016/05/remote-desktop-cert-error-mstsc.png)*Certificate Warning on the Remote Desktop Connection client*</figure>

The new Remote Desktop Universal app on Windows 10:

![Certificate warning in the Remote Desktop Universal app]({{site.baseurl}}/media/2016/05/remote-desktop-cert-error-uwa.png)*Certificate warning in the Remote Desktop Universal app*</figure>

And the Remote Desktop client on OS X 10.11:

![Certificate warning in the Remote Desktop client for OS X]({{site.baseurl}}/media/2016/05/RDP-Invalid-Certificate.png)*Certificate warning in the Remote Desktop client for OS X*</figure>

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

![Remote Desktop template certificate extensions]({{site.baseurl}}/media/2016/05/Remote-Desktop-Cert-Extensions.png)*Remote Desktop template certificate extensions*</figure>

After you added the 'Remote Desktop Authentication' policy, you should see the policies and see in the following dialog box. See below for the actual 'Remote Desktop Authentication' policy.

![Remote Desktop certificate Application Policies extension]({{site.baseurl}}/media/2016/05/Remote-Desktop-Cert-Extensions-Application-Policies.png)*Remote Desktop certificate Application Policies extension*</figure>

Adding the 'Remote Desktop Authentication' policy requires adding a new extension named 'Remote Desktop Authentication' (or similar) with an object value of "1.3.6.1.4.1.311.54.1.2" (excluding quotes). **Edit** the **Application Policies**, click **Add**, then click **New** and enter the values as above.

![The Remote Desktop Authentication policy extension]({{site.baseurl}}/media/2016/05/Remote-Desktop-Cert-Extensions-Remote-Desktop-Authentication.png)*The Remote Desktop Authentication policy extension*</figure>

Save the template and configure your CA to issue the new template. In my lab my certificate template display name 'Remote Desktop Computer'. Since my first template failed, it's actually called 'Remote Desktop Computer v2'. However, the important name to note for the next step is the actual template name, which can be found on the General tab of the template. In my case this is 'RemoteDesktopComputerv2' (the display name, minus the spaces).

# Configure Autorenrollment

To configure autoenrollment, I've created a new GPO dedicated to the autoenrollment setting and linked it to the organisational units containing server and workstation computer account objects. Edit the policy and enable the following setting:

Computer Configuration / Administrative Templates / Windows Components / Remote Desktop Services / Remote Desktop Session Host / Security / Server authentication certificate template

Add the name of the certificate template and shown in the screenshot below:

![Server authentication certificate template]({{site.baseurl}}/media/2016/05/Server-Authentication-Certificate-Template.png)*Enabling the 'Server authentication certificate template' in Group Policy*</figure>

Once a Group Poliy refresh occurs or on the next boot, the target Windows machines will autoenroll for the certificate and configure their RDP listener.

# OS X Configuration

Now that my Remote Desktop certificates are configured for autoentrollment and Windows machines are picking up the certificates, I can import the root CA certificate into my MacBook running OS X.

Navigate to the URL of your certificate server (e.g. http://cert1/certsrv) and download the certificate via 'Download a CA certificate, certificate chain, or CRL'. Download the CA certificate in DER format. Find the downloaded certificate in Finder and open the certificate to install it into Keychain.

Once installed the certificate is not automatically trused as you can see below:

![OSX root CA certificate]({{site.baseurl}}/media/2016/05/OSX-root-CA-certificate.png)*My root CA certificate in Keychain on OS X*</figure>

Set the certificate to be trusted by selecting 'Alway Trust' from the 'When using this certificate' option. Close the certificate properties window and you should be prompted for your password to save the changes. Now when connecting to PCs via the Remote Desktop client, you should no longer receive certificate warnings.

This article shows [how to install the root CA certificate via Terminal](https://derflounder.wordpress.com/2011/03/13/adding-new-trusted-root-certificates-to-system-keychain/), which should assist in automating the import across a number of Macs.