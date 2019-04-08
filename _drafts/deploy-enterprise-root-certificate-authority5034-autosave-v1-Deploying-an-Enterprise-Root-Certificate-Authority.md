---
id: 5970
title: Deploying an Enterprise Root Certificate Authority
date: 2018-02-14T13:59:11+10:00
author: Aaron Parker
layout: revision
guid: https://stealthpuppy.com/5034-autosave-v1/
permalink: /5034-autosave-v1/
---
Setting up an Enterprise Root Certificate Authority isn't a task that you'll complete on a regular basis and something I think I've done twice, maybe 3 times, ever. Each time I forget what I did previously and you can guarantee I'm using a different version of Windows Server each time. Please note as you read these article and [the next](http://stealthpuppy.com/deploy-enterprise-subordinate-certificate-authority/), that whilst I have an interest in PKI, I don't consider myself an expert. Deploying a PKI is not a simple task, so read up carefully if you've not done this before.

So here's how to setup an Enterprise Root Certificate Authority (CA) on Windows Server 2012 R2. Now that I've documented this, I'm hoping I won't forget for next time.

# Basics

I'm not going to go into too much detail here on the specific choices or considerations you should be making when setting up a CA in your environment; however, I would recommend that you do the following at least, to ensure certificate services is deployed securely:

  1. Configure a Root CA on a member server (not a member of the domain) and aim for this CA to be offline. This machine can be deployed just about anywhere and when turned off, you could protect it by removing the virtual machine from the environment and storing it in an encrypted format. This will help protect the root CA certificate. Just document where you left it, in case someone else has to take care of updates and changes.
  2.  Deploy a subordinate CA that will be used to issue certificates. This will be a member of Active Directory to simplify management, issuance of certificates to domain members and enable certificate templates.

Using certificate templates requires Active Directory and also requires that you install and configure the subordinate CA as a member of the Enterprise Admins group. Potentially not an issue in most environments; however for large enterprise environments that may not be the case ([permissions can be delegated](https://technet.microsoft.com/en-us/library/dn722303(v=ws.11).aspx)). This also means that you won't be installing an Enterprise CA in an environment using [Azure Active Directory Domain Services](https://azure.microsoft.com/en-us/services/active-directory-ds/) because you won't have rights.

# Further Reading

There are a number of articles that I've drawn from and others worth reading for additional details or in-depth discussions on certificate services. I've listed a few here to provide some further detail:

  * [The DOs and DON’Ts of PKI – Microsoft ADCS](http://kazmierczak.eu/itblog/2012/08/22/the-dos-and-donts-of-pki-microsoft-adcs/)
  * [CA Guidance for Windows Server 2012 R2/2012](https://technet.microsoft.com/en-us/library/hh831574.aspx)
  * [Enterprise PKI with Windows Server 2012 R2 Active Directory Certificate Services (Part 1 of 2)](https://blogs.technet.microsoft.com/yungchou/2013/10/21/enterprise-pki-with-windows-server-2012-r2-active-directory-certificate-services-part-1-of-2/)
  * [Enterprise PKI with Windows Server 2012 R2 Active Directory Certificate Services (Part 2 of 2)](https://blogs.technet.microsoft.com/yungchou/2013/10/22/enterprise-pki-with-windows-server-2012-r2-active-directory-certificate-services-part-2-of-2/)
  * [AD CS on TechNet](https://technet.microsoft.com/en-us/windowsserver/dd448615.aspx)
  * [Test Lab Guide: Deploying an AD CS Two-Tier PKI Hierarchy](https://technet.microsoft.com/en-us/library/hh831348(v=ws.11).aspx)
  * [Active Directory Certificate Services (AD CS) Public Key Infrastructure (PKI) Frequently Asked Questions (FAQ)](http://social.technet.microsoft.com/wiki/contents/articles/1587.active-directory-certificate-services-ad-cs-public-key-infrastructure-pki-frequently-asked-questions-faq.aspx)

# Deploying an Enterprise Root Certificate Authority

The following steps are taken on a virtual machine running Windows Server 2012 R2 with all current updates as a stand-alone server. Installing the root CA on a stand-alone server ensures no issues with domain communication when the VM is booted at a later date.

## Installing Certificate Services

Deploying Certificate Services on Windows Server 2012 R2 is simple enough - open Server Manager, open the **Add Roles and Features** wizard and choose **Active Directory Certificate Services** under Server Roles. Ensure you choose only the **Certificate Authority** role for the Root CA.

<figure id="attachment_5035" aria-describedby="caption-attachment-5035" style="width: 800px" class="wp-caption alignnone">[<img class="size-full wp-image-5035" src="http://stealthpuppy.com/wp-content/uploads/2016/08/01-Install-Certificate-Services.png" alt="Installing Active Directory Certificate Services" width="800" height="567" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/01-Install-Certificate-Services.png 800w, https://stealthpuppy.com/wp-content/uploads/2016/08/01-Install-Certificate-Services-150x106.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/01-Install-Certificate-Services-300x213.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/01-Install-Certificate-Services-768x544.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/01-Install-Certificate-Services-480x340.png 480w" sizes="(max-width: 800px) 100vw, 800px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/01-Install-Certificate-Services.png)<figcaption id="caption-attachment-5035" class="wp-caption-text">Installing Active Directory Certificate Services*</figure>

To make installing Certificate Services simpler, do it via PowerShell instead via Add-WindowsFeature:

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">Add-WindowsFeature -Name ADCS-Cert-Authority -IncludeManagementTools</pre>

Which will look like this, no reboot required:

<figure id="attachment_5039" aria-describedby="caption-attachment-5039" style="width: 877px" class="wp-caption alignnone">[<img class="size-full wp-image-5039" src="http://stealthpuppy.com/wp-content/uploads/2016/08/03-Install-Certificate-Services.png" alt="Install Certificate Services via PowerShell" width="877" height="463" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/03-Install-Certificate-Services.png 877w, https://stealthpuppy.com/wp-content/uploads/2016/08/03-Install-Certificate-Services-150x79.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/03-Install-Certificate-Services-300x158.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/03-Install-Certificate-Services-768x405.png 768w" sizes="(max-width: 877px) 100vw, 877px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/03-Install-Certificate-Services.png)<figcaption id="caption-attachment-5039" class="wp-caption-text">Install Certificate Services via PowerShell*</figure>

## Configuring Certificate Services

After Certificate Services is installed, start the configuration wizard from Server Manager:

<figure id="attachment_5038" aria-describedby="caption-attachment-5038" style="width: 1024px" class="wp-caption alignnone">[<img class="wp-image-5038 size-large" src="http://stealthpuppy.com/wp-content/uploads/2016/08/00-Root-CA-Certificate-Services-1024x592.png" alt="Start the Certificate Services configuration wizard" width="1024" height="592" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/00-Root-CA-Certificate-Services-1024x592.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/00-Root-CA-Certificate-Services-150x87.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/00-Root-CA-Certificate-Services-300x173.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/00-Root-CA-Certificate-Services-768x444.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/00-Root-CA-Certificate-Services.png 1080w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/00-Root-CA-Certificate-Services.png)<figcaption id="caption-attachment-5038" class="wp-caption-text">Start the Certificate Services configuration wizard*</figure>

Set the credentials to be used while configuring Certificate Services. In this case, we're configuring CA on a stand alone machine and I'm logged on with the local Administrator account.

<figure id="attachment_5041" aria-describedby="caption-attachment-5041" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5041" src="http://stealthpuppy.com/wp-content/uploads/2016/08/01-Root-CA-Certificate-Services-1024x592.png" alt="Certificate Services wizard - configuration credentials" width="1024" height="592" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/01-Root-CA-Certificate-Services-1024x592.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/01-Root-CA-Certificate-Services-150x87.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/01-Root-CA-Certificate-Services-300x173.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/01-Root-CA-Certificate-Services-768x444.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/01-Root-CA-Certificate-Services.png 1080w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/01-Root-CA-Certificate-Services.png)<figcaption id="caption-attachment-5041" class="wp-caption-text">Certificate Services wizard - configuration credentials*</figure>

For the Root CA, we have only on role to configure.

<figure id="attachment_5042" aria-describedby="caption-attachment-5042" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5042" src="http://stealthpuppy.com/wp-content/uploads/2016/08/02-Root-CA-Certificate-Services-1024x592.png" alt="Certificate Services wizard - roles to configure" width="1024" height="592" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/02-Root-CA-Certificate-Services-1024x592.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/02-Root-CA-Certificate-Services-150x87.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/02-Root-CA-Certificate-Services-300x173.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/02-Root-CA-Certificate-Services-768x444.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/02-Root-CA-Certificate-Services.png 1080w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/02-Root-CA-Certificate-Services.png)<figcaption id="caption-attachment-5042" class="wp-caption-text">Certificate Services wizard - roles to configure*</figure>

This certificate authority is being configured on a stand-alone server not a member of Active Directory, so we'll only be able to configure a Standalone CA.

<figure id="attachment_5043" aria-describedby="caption-attachment-5043" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5043" src="http://stealthpuppy.com/wp-content/uploads/2016/08/03-Root-CA-Certificate-Services-1024x592.png" alt="Certificate Services wizard - configure a standalone CA" width="1024" height="592" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/03-Root-CA-Certificate-Services-1024x592.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/03-Root-CA-Certificate-Services-150x87.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/03-Root-CA-Certificate-Services-300x173.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/03-Root-CA-Certificate-Services-768x444.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/03-Root-CA-Certificate-Services.png 1080w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/03-Root-CA-Certificate-Services.png)<figcaption id="caption-attachment-5043" class="wp-caption-text">Certificate Services wizard - configure a standalone CA*</figure>

This is the first CA in our environment, so be sure to configure this as a **root CA**.

<figure id="attachment_5044" aria-describedby="caption-attachment-5044" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5044" src="http://stealthpuppy.com/wp-content/uploads/2016/08/04-Root-CA-Certificate-Services-1024x592.png" alt="Certificate Services wizard - configure as a root CA" width="1024" height="592" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/04-Root-CA-Certificate-Services-1024x592.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/04-Root-CA-Certificate-Services-150x87.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/04-Root-CA-Certificate-Services-300x173.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/04-Root-CA-Certificate-Services-768x444.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/04-Root-CA-Certificate-Services.png 1080w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/04-Root-CA-Certificate-Services.png)<figcaption id="caption-attachment-5044" class="wp-caption-text">Certificate Services wizard - configure as a root CA*</figure>

With the first CA in the environment, we'll won't have an existing private key, so must choose to create a new one.

<figure id="attachment_5045" aria-describedby="caption-attachment-5045" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5045" src="http://stealthpuppy.com/wp-content/uploads/2016/08/06-Root-CA-Certificate-Services-1024x592.png" alt="Certificate Services wizard - choose a new private key" width="1024" height="592" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/06-Root-CA-Certificate-Services-1024x592.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/06-Root-CA-Certificate-Services-150x87.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/06-Root-CA-Certificate-Services-300x173.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/06-Root-CA-Certificate-Services-768x444.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/06-Root-CA-Certificate-Services.png 1080w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/06-Root-CA-Certificate-Services.png)<figcaption id="caption-attachment-5045" class="wp-caption-text">Certificate Services wizard - choose a new private key*</figure>

When selecting a cryptographic provider and a hash algorithm, SHA1 will be the default hashing algorithm; however, Windows will no longer accept certificates signed with [SHA1 after 1st of January 2017](http://social.technet.microsoft.com/wiki/contents/articles/32288.windows-enforcement-of-authenticode-code-signing-and-timestamping.aspx), so be sure to [choose at least SHA256](https://blogs.technet.microsoft.com/askds/2015/10/26/sha1-key-migration-to-sha256-for-a-two-tier-pki-hierarchy/).

<figure id="attachment_5047" aria-describedby="caption-attachment-5047" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5047" src="http://stealthpuppy.com/wp-content/uploads/2016/08/07-Root-CA-Certificate-Services-1024x592.png" alt="Certificate Services wizard - choosing cryptographic options" width="1024" height="592" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/07-Root-CA-Certificate-Services-1024x592.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/07-Root-CA-Certificate-Services-150x87.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/07-Root-CA-Certificate-Services-300x173.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/07-Root-CA-Certificate-Services-768x444.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/07-Root-CA-Certificate-Services.png 1080w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/07-Root-CA-Certificate-Services.png)<figcaption id="caption-attachment-5047" class="wp-caption-text">Certificate Services wizard - choosing cryptographic options*</figure>

Specify a name for the new certificate authority. I'd recommend keeping this simple using the ANSI character set, using a meaningful name.

<figure id="attachment_5048" aria-describedby="caption-attachment-5048" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5048" src="http://stealthpuppy.com/wp-content/uploads/2016/08/08-Root-CA-Certificate-Services-1024x592.png" alt="Certificate Services wizard - specify a CA name" width="1024" height="592" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/08-Root-CA-Certificate-Services-1024x592.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/08-Root-CA-Certificate-Services-150x87.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/08-Root-CA-Certificate-Services-300x173.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/08-Root-CA-Certificate-Services-768x444.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/08-Root-CA-Certificate-Services.png 1080w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/08-Root-CA-Certificate-Services.png)<figcaption id="caption-attachment-5048" class="wp-caption-text">Certificate Services wizard - specify a CA name*</figure>

Select the validity period - perhaps the default is the best to choose; however, this can be customised based on your requirements. This is a topic that is a whole security conversation in itself; however, renewing CA certificates isn't something that you want to be doing too often. Considerations for setting the validity period should include business risk, the size and complexity of the environment you are installing the PKI into, and how mature the IT organisation is.

<figure id="attachment_5049" aria-describedby="caption-attachment-5049" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5049" src="http://stealthpuppy.com/wp-content/uploads/2016/08/09-Root-CA-Certificate-Services-1024x592.png" alt="Certificate Services wizard – select the CA certificate validity period " width="1024" height="592" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/09-Root-CA-Certificate-Services-1024x592.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/09-Root-CA-Certificate-Services-150x87.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/09-Root-CA-Certificate-Services-300x173.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/09-Root-CA-Certificate-Services-768x444.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/09-Root-CA-Certificate-Services.png 1080w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/09-Root-CA-Certificate-Services.png)<figcaption id="caption-attachment-5049" class="wp-caption-text">Certificate Services wizard – select the CA certificate validity period*</figure>

On the next page of the wizard, you can choose the location of the certificate services database and logs location (C:\Windows\System32\Certlog), which can be changed depending on your specific environment.

On the last page, you will see a summary of the configuration before committing it to the local certificate services.

<figure id="attachment_5050" aria-describedby="caption-attachment-5050" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5050" src="http://stealthpuppy.com/wp-content/uploads/2016/08/11-Root-CA-Certificate-Services-1024x592.png" alt="Certificate Services wizard – summary page" width="1024" height="592" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/11-Root-CA-Certificate-Services-1024x592.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/11-Root-CA-Certificate-Services-150x87.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/11-Root-CA-Certificate-Services-300x173.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/11-Root-CA-Certificate-Services-768x444.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/11-Root-CA-Certificate-Services.png 1080w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/11-Root-CA-Certificate-Services.png)<figcaption id="caption-attachment-5050" class="wp-caption-text">Certificate Services wizard – summary page*</figure>

## Configuring the Root CA

Now that certificate services has been installed and the base configuration is complete, a set of specific configuration changes is required to ensure that an offline Root CA will work for us.

If you open the Certificate Authority management console, you can view the properties of the certificate authority and the Root CA's certificate:

<figure id="attachment_5051" aria-describedby="caption-attachment-5051" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5051" src="http://stealthpuppy.com/wp-content/uploads/2016/08/12-Root-CA-Certificate-Services-1024x552.png" alt="The freshly installed and configured certificate authority" width="1024" height="552" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/12-Root-CA-Certificate-Services-1024x552.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/12-Root-CA-Certificate-Services-150x81.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/12-Root-CA-Certificate-Services-300x162.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/12-Root-CA-Certificate-Services-768x414.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/12-Root-CA-Certificate-Services.png 1082w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/12-Root-CA-Certificate-Services.png)<figcaption id="caption-attachment-5051" class="wp-caption-text">The freshly installed and configured certificate authority*</figure>

Check the details and ensure the certificate hash algorithm is SHA256:

<figure id="attachment_5053" aria-describedby="caption-attachment-5053" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5053" src="http://stealthpuppy.com/wp-content/uploads/2016/08/11a-Root-CA-Certificate-Services-1024x552.png" alt="Certificate authority with SHA256 hashing algorithm" width="1024" height="552" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/11a-Root-CA-Certificate-Services-1024x552.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/11a-Root-CA-Certificate-Services-150x81.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/11a-Root-CA-Certificate-Services-300x162.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/11a-Root-CA-Certificate-Services-768x414.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/11a-Root-CA-Certificate-Services.png 1082w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/11a-Root-CA-Certificate-Services.png)<figcaption id="caption-attachment-5053" class="wp-caption-text">Certificate authority with SHA256 hashing algorithm*</figure>

### Configure CA Extensions

Before we take any further steps, including deploying a subordinate CA for issuing certificates, we need to configure the Certificate Revocation List (CRL) Distribution Point. Because this CA will be offline and not a member of Active Directory, the default locations won't work.

In the properties of the CA, select the **Extensions** tab to view the CRL Distribution Points. By default, the **ldap://** and **file://** locations will be the default distribution points. These, of course, won't work for the reasons I've just stated, and because these locations are embedded in the properties of certificates issued by this CA, we should change them.

<figure id="attachment_5054" aria-describedby="caption-attachment-5054" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5054" src="http://stealthpuppy.com/wp-content/uploads/2016/08/13-Root-CA-Certificate-Services-1024x552.png" alt="Configuring the Certificate Revocation List settings" width="1024" height="552" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/13-Root-CA-Certificate-Services-1024x552.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/13-Root-CA-Certificate-Services-150x81.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/13-Root-CA-Certificate-Services-300x162.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/13-Root-CA-Certificate-Services-768x414.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/13-Root-CA-Certificate-Services.png 1082w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/13-Root-CA-Certificate-Services.png)<figcaption id="caption-attachment-5054" class="wp-caption-text">Configuring the Certificate Revocation List settings*</figure>

The default CRL distribution points are as below. These can be copied by selecting each from within the dialog box and pressing Ctrl-C.

<pre class="toolbar:2 lang:ini decode:true" title="Default CRL distribution points">C:\windows\system32\CertSrv\CertEnroll\&lt;CaName&gt;&lt;CRLNameSuffix&gt;&lt;DeltaCRLAllowed&gt;.crl
ldap:///CN=&lt;CATruncatedName&gt;&lt;CRLNameSuffix&gt;,CN=&lt;ServerShortName&gt;,CN=CDP,CN=Public Key Services,CN=Services,&lt;ConfigurationContainer&gt;&lt;CDPObjectClass&gt;
http://&lt;ServerDNSName&gt;/CertEnroll/&lt;CaName&gt;&lt;CRLNameSuffix&gt;&lt;DeltaCRLAllowed&gt;.crl
file://&lt;ServerDNSName&gt;/CertEnroll/&lt;CaName&gt;&lt;CRLNameSuffix&gt;&lt;DeltaCRLAllowed&gt;.crl</pre>

To set up a CRL distribution point that will work with a location that's online (so that clients can contact the CRL), we'll add a new distribution point rather than modify an existing DP and use HTTP.

Before that we'll want to do two things:

  1. Ensure that 'Publish CRLs to this location' and 'Publish Delta CRLs to this location' are selected on the default **C:\Windows\System32\CertSrv\CertEnroll** location. This should be the default setting.
  2. For each existing DP, remove any check marks enabled for 'Include in CRLs'.

Now add a new CRL location, using the same HTTP location value included by default; however, change **<ServerDNSName>** for the FQDN for the host that will serve the CRL. In my example, I've changed:

<pre class="toolbar:2 lang:ps decode:true">http://&lt;ServerDNSName&gt;/CertEnroll/&lt;CaName&gt;&lt;CRLNameSuffix&gt;&lt;DeltaCRLAllowed&gt;.crl</pre>

to

<pre class="toolbar:2 lang:ps decode:true">http://crl.home.stealthpuppy.com/CertEnroll/&lt;CaName&gt;&lt;CRLNameSuffix&gt;&lt;DeltaCRLAllowed&gt;.crl</pre>

This FQDN is an alias for the subordinate certificate authority that I'll be deploying to actually issue certificates to clients. This CA will be online with IIS installed, so will be available to serve the CRLs.

<figure id="attachment_5056" aria-describedby="caption-attachment-5056" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5056" src="http://stealthpuppy.com/wp-content/uploads/2016/08/14-Root-CA-Certificate-Services-1024x552.png" alt="Adding a new CRL distribution point" width="1024" height="552" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/14-Root-CA-Certificate-Services-1024x552.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/14-Root-CA-Certificate-Services-150x81.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/14-Root-CA-Certificate-Services-300x162.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/14-Root-CA-Certificate-Services-768x414.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/14-Root-CA-Certificate-Services.png 1082w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/14-Root-CA-Certificate-Services.png)<figcaption id="caption-attachment-5056" class="wp-caption-text">Adding a new CRL distribution point*</figure>

Repeat the same process for the [Authority Information Access](https://technet.microsoft.com/en-us/library/cc753754(v=ws.11).aspx) (AIA) locations:

  1. Disable 'Include in the AIA extensions of issued certificates' for all existing locations
  2. Copy the existing http:// location
  3. Add a new http:// location, changing **<ServerDNSName>** for the FQDN of the alias also used for the CRL distribution point

<figure id="attachment_5058" aria-describedby="caption-attachment-5058" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5058" src="http://stealthpuppy.com/wp-content/uploads/2016/08/18-Root-CA-Certificate-Services-1024x552.png" alt="Adding an Authority Information Access location" width="1024" height="552" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/18-Root-CA-Certificate-Services-1024x552.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/18-Root-CA-Certificate-Services-150x81.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/18-Root-CA-Certificate-Services-300x162.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/18-Root-CA-Certificate-Services-768x414.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/18-Root-CA-Certificate-Services.png 1082w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/18-Root-CA-Certificate-Services.png)<figcaption id="caption-attachment-5058" class="wp-caption-text">Adding an Authority Information Access location*</figure>

Apply the changes, and you will be prompted to restart Active Directory Certificate Services. If you don't remember to manually restart the service later.

<figure id="attachment_5059" aria-describedby="caption-attachment-5059" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5059" src="http://stealthpuppy.com/wp-content/uploads/2016/08/19-Root-CA-Certificate-Services-1024x552.png" alt="Applying the changes will require restarting the CA service" width="1024" height="552" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/19-Root-CA-Certificate-Services-1024x552.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/19-Root-CA-Certificate-Services-150x81.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/19-Root-CA-Certificate-Services-300x162.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/19-Root-CA-Certificate-Services-768x414.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/19-Root-CA-Certificate-Services.png 1082w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/19-Root-CA-Certificate-Services.png)<figcaption id="caption-attachment-5059" class="wp-caption-text">Applying the changes will require restarting the CA service*</figure>

### Configure CRL Publishing

Before publishing the CRL, set the Publication Interval to something other than the default 1 week. Whatever you set the interval to, this will be the maximum amount of time that you'll need to boot the CA, publish the CRL and copy it to you CRL publishing point.

Open the properties of the **Revoked Certificates** node and set the **CRL publication interval** to something suitable for the environment you have installed the CA into. Remember that you'll need to boot the Root CA and publish a new CRL before the end of this interval.

<figure id="attachment_5137" aria-describedby="caption-attachment-5137" style="width: 968px" class="wp-caption alignnone">[<img class="size-full wp-image-5137" src="http://stealthpuppy.com/wp-content/uploads/2016/08/rootCASettingCRLPublishingInterval.png" alt="Setting the CRL Publication Interval on the Root CA" width="968" height="570" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/rootCASettingCRLPublishingInterval.png 968w, https://stealthpuppy.com/wp-content/uploads/2016/08/rootCASettingCRLPublishingInterval-150x88.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/rootCASettingCRLPublishingInterval-300x177.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/rootCASettingCRLPublishingInterval-768x452.png 768w" sizes="(max-width: 968px) 100vw, 968px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/rootCASettingCRLPublishingInterval.png)<figcaption id="caption-attachment-5137" class="wp-caption-text">Setting the CRL Publication Interval on the Root CA*</figure>

Ensure that the Certificate Revocation list is published to the to the file system - right-click **Revoked Certificates**, select **All Tasks** / **Publish**. We will then copy these to the subordinate CA.

<figure id="attachment_5065" aria-describedby="caption-attachment-5065" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5065" src="http://stealthpuppy.com/wp-content/uploads/2016/08/20a-Root-CA-Certificate-Services-1024x552.png" alt="Publish the Certificate Revocation list" width="1024" height="552" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/20a-Root-CA-Certificate-Services-1024x552.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/20a-Root-CA-Certificate-Services-150x81.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/20a-Root-CA-Certificate-Services-300x162.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/20a-Root-CA-Certificate-Services-768x414.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/20a-Root-CA-Certificate-Services.png 1082w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/20a-Root-CA-Certificate-Services.png)<figcaption id="caption-attachment-5065" class="wp-caption-text">Publish the Certificate Revocation list*</figure>

Browse to C:\Windows\System32\CertSrv\CertEnroll to view the CRL and the root CA certificate.

<figure id="attachment_5064" aria-describedby="caption-attachment-5064" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5064" src="http://stealthpuppy.com/wp-content/uploads/2016/08/22-Root-CA-Certificate-Services-1024x546.png" alt="Certificates and CRL published to C:\Windows\System32\CertSrv\CertEnroll" width="1024" height="546" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/22-Root-CA-Certificate-Services-1024x546.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/22-Root-CA-Certificate-Services-150x80.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/22-Root-CA-Certificate-Services-300x160.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/22-Root-CA-Certificate-Services-768x409.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/22-Root-CA-Certificate-Services.png 1060w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/22-Root-CA-Certificate-Services.png)<figcaption id="caption-attachment-5064" class="wp-caption-text">Certificates and CRL published to C:\Windows\System32\CertSrv\CertEnroll*</figure>

### Setting the Issued Certificate Validity Period

The default validity period for certificates issued by this CA will be 1 year. Because this is a stand-alone certification authority, we don't have templates available to use that we can use to define the validity period for issued certificates. So we need to set this in the registry.

As we'll only be issuing subordinate CA certificates from this root CA, 1 year isn't very long. If the subordinate CA certificate is only valid for 1 year, any certificates that it issues can only be valid for less than 1 year from the date of issue - not long indeed. Therefore, we should set the validity period on the root CA before we issue any certificates.

To change the validity period, open Registry Editor and navigate to the following key:

<pre class="toolbar:2 lang:reg decode:true">HKLM\SYSTEM\CurrentControlSet\Services\CertSvc\Configuration\&lt;certification authority name&gt;</pre>

In my lab, this path is:

<pre class="toolbar:2 lang:reg decode:true ">HKLM\SYSTEM\CurrentControlSet\Services\CertSvc\Configuration\stealthpuppy Offline Root CA</pre>

Here I can see two values that define how long issued certificates are valid for - ValidityPeriod (defaults to 1) and ValidityPeriodUnits (defaults to &#8220;Years&#8221;).

<figure id="attachment_5124" aria-describedby="caption-attachment-5124" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5124" src="http://stealthpuppy.com/wp-content/uploads/2016/08/rootCAValidityUnits-1024x473.png" alt="Viewing the Root CA certificate validity lifetime" width="1024" height="473" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/rootCAValidityUnits-1024x473.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/rootCAValidityUnits-150x69.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/rootCAValidityUnits-300x138.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/rootCAValidityUnits-768x354.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/rootCAValidityUnits.png 1246w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/rootCAValidityUnits.png)<figcaption id="caption-attachment-5124" class="wp-caption-text">Viewing the Root CA certificate validity lifetime*</figure>

Open ValidityPeriodUnits and change this to the desired value. My recommendation would be to make this 1/2 the lifetime of Root CA's certificate validity period, so if you've configured the Root CA for 10 years, set this to 5 years. You'll need to restart the Ceritificate Authority service for this to take effect.

<figure id="attachment_5125" aria-describedby="caption-attachment-5125" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5125" src="http://stealthpuppy.com/wp-content/uploads/2016/08/SettingrootCAValidityUnits-1024x473.png" alt="Setting the Root CA's ValidityUnits" width="1024" height="473" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/SettingrootCAValidityUnits-1024x473.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/SettingrootCAValidityUnits-150x69.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/SettingrootCAValidityUnits-300x138.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/SettingrootCAValidityUnits-768x354.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/SettingrootCAValidityUnits.png 1246w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/SettingrootCAValidityUnits.png)<figcaption id="caption-attachment-5125" class="wp-caption-text">Setting the Root CA's ValidityUnits*</figure>

An alternative to editing the registry directly is to set this value to certutil.exe. To change the validity period to 5 years run:

<pre class="lang:default decode:true" title="Setting ValidityPeriodUnits with certutil.exe">certutil -setreg ca\ValidityPeriodUnits "5"</pre>

There are a couple of old articles on setting this value, but they still apply to current versions of Windows Server - [How to change the expiration date of certificates that are issued by a Windows Server 2003 or a Windows 2000 Server CA](https://support.microsoft.com/en-au/kb/254632) and [How to Set an Enterprise Subordinate CA to Have a Different Certificate Validity Period than the Parent CA](https://support.microsoft.com/en-us/kb/281557).

# Conclusion

In this article, I've provided the basic steps to creating a root certificate authority on Windows Server 2012 R2. The next step is to create a subordinate CA that will issue certificates to devices and users, allowing us to take the root CA offline and protecting it from attack.

Don't shut down the Root CA just yet. In [the next article, we'll create and configure the subordinate CA](http://stealthpuppy.com/deploy-enterprise-subordinate-certificate-authority/).