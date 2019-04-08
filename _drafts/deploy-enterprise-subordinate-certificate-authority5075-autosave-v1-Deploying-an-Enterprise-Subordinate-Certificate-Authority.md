---
id: 5968
title: Deploying an Enterprise Subordinate Certificate Authority
date: 2018-02-14T13:58:08+10:00
author: Aaron Parker
layout: revision
guid: https://stealthpuppy.com/5075-autosave-v1/
permalink: /5075-autosave-v1/
---
In the last article, I documented the steps for [deploying an offline Root Certificate Authority on Windows Server 2012 R2](http://stealthpuppy.com/deploy-enterprise-root-certificate-authority/). This article will continue the process and show how to install and configure a Subordinate Certificate Authority that will be used to issue certificates to users and devices.

# Basics

To setup a subordinate certificate authority, especially one that will deploy certificates in an Active Directory environment, we'll deploy to a machine running Windows Server 2012 R2 that is a member of the domain.

In this article we will:

  1. Install the subordinate certificate authority
  2. Request and approve a CA certificate from the offline root CA
  3. Configure the subordinate CA for the CRL to work correctly

To deploy an Enterprise Certificate Authority you'll need to be installing certificate services as a member of the Enterprise Admins group, or have [permissions delegated to your account](https://technet.microsoft.com/en-us/library/dn722303(v=ws.11).aspx). Remember, this means that you won't be installing an Enterprise CA in an environment using [Azure Active Directory Domain Services](https://azure.microsoft.com/en-us/services/active-directory-ds/) because you won't have rights.

# Further Reading

As in my last article, my intention is to not go into detail, rather I'm looking to document a set of recommended steps to get an Enterprise Certificate Authority up and running successfully. For more in-depth reading, here is a list of recommended articles:

  * [Active Directory Certificate Services Overview](https://technet.microsoft.com/en-us/library/hh831740(v=ws.11).aspx)
  * [Certification Authority Guidance](https://technet.microsoft.com/en-us/library/hh831574.aspx)

# Deploying an Enterprise Subordinate Certificate Authority

The following steps are taken on a virtual machine running Windows Server 2012 R2 with all current updates as an Active Directory domain member.

## Installing Certificate Services

Just as with [the offline Root CA](http://stealthpuppy.com/deploy-enterprise-root-certificate-authority/), deploying Certificate Services on Windows Server 2012 R2 is simple – open Server Manager, open the **Add Roles and Features** wizard and choose **Active Directory Certificate Services** under Server Roles.

In this instance, choose to install the **Certification Authority** and the [**Certification Authority Web Enrollment**](https://technet.microsoft.com/en-us/library/hh831649(v=ws.11).aspx) services:

<figure id="attachment_5081" aria-describedby="caption-attachment-5081" style="width: 800px" class="wp-caption alignnone">[<img class="size-full wp-image-5081" src="http://stealthpuppy.com/wp-content/uploads/2016/08/CertificateAuthorityInstalling.png" alt="Installing the Certificate Authority components" width="800" height="567" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/CertificateAuthorityInstalling.png 800w, https://stealthpuppy.com/wp-content/uploads/2016/08/CertificateAuthorityInstalling-150x106.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/CertificateAuthorityInstalling-300x213.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/CertificateAuthorityInstalling-768x544.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/CertificateAuthorityInstalling-480x340.png 480w" sizes="(max-width: 800px) 100vw, 800px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/CertificateAuthorityInstalling.png)<figcaption id="caption-attachment-5081" class="wp-caption-text">Installing the Certificate Authority components*

You can choose additional certificate services roles at this point; however, these two services are recommended to get the subordinate certificate authority running. When selecting the Certification Authority Web Enrollment, the wizard will prompt you to install a set of IIS components to support this role.

<figure id="attachment_5082" aria-describedby="caption-attachment-5082" style="width: 800px" class="wp-caption alignnone">[<img class="size-full wp-image-5082" src="http://stealthpuppy.com/wp-content/uploads/2016/08/CertificateServiceIISRoles.png" alt="IIS components to support the Certification Authority Web Enrollment role" width="800" height="567" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/CertificateServiceIISRoles.png 800w, https://stealthpuppy.com/wp-content/uploads/2016/08/CertificateServiceIISRoles-150x106.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/CertificateServiceIISRoles-300x213.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/CertificateServiceIISRoles-768x544.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/CertificateServiceIISRoles-480x340.png 480w" sizes="(max-width: 800px) 100vw, 800px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/CertificateServiceIISRoles.png)<figcaption id="caption-attachment-5082" class="wp-caption-text">IIS components to support the Certification Authority Web Enrollment role*

To simplify the installation of these roles, install via PowerShell instead. Elevate a PowerShell prompt and use the Add-WindowsFeature cmdlet:

<figure id="attachment_5084" aria-describedby="caption-attachment-5084" style="width: 997px" class="wp-caption alignnone">[<img class="size-full wp-image-5084" src="http://stealthpuppy.com/wp-content/uploads/2016/08/PowerShellInstallingCAServices.png" alt="Installing the subordinate CA roles with PowerShell" width="997" height="427" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/PowerShellInstallingCAServices.png 997w, https://stealthpuppy.com/wp-content/uploads/2016/08/PowerShellInstallingCAServices-150x64.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/PowerShellInstallingCAServices-300x128.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/PowerShellInstallingCAServices-768x329.png 768w" sizes="(max-width: 997px) 100vw, 997px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/PowerShellInstallingCAServices.png)<figcaption id="caption-attachment-5084" class="wp-caption-text">Installing the subordinate CA roles with PowerShell*

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">Add-WindowsFeature -IncludeManagementTools -Name ADCS-Cert-Authority, `
ADCS-Web-Enrollment, Web-Default-Doc, Web-Dir-Browsing, Web-Http-Errors, `
Web-Static-Content, Web-Http-Redirect, Web-Http-Logging, Web-Log-Libraries, `
Web-Request-Monitor, Web-Http-Tracing, Web-Stat-Compression, Web-Filtering, `
Web-Windows-Auth, Web-ASP, Web-ISAPI-Ext</pre>

No reboot should be required after installing these roles.

## Configure DNS

Before we go any further, remember that in setting up the Root CA, we [configured](http://stealthpuppy.com/wp-content/uploads/2016/08/14-Root-CA-Certificate-Services.png) the **Certificate Revocation List Distribution Point** using an alias to the issuing CA. In my case, I've configured a CNAME record - _crl.home.stealthpuppy.com_ to point to my issuing CA hostname - _issuingca.home.stealthpuppy.com_.

Configure the alias in DNS now, so that it has time to propagate and be available for resolution when we configure the subordinate certificate request later. If this step is missed, you will receive 'CRL unavailable' errors.

## Configuring Certificate Services

After the Certificate Services roles are installed, start the configuration wizard from Server Manager - click the flag and yellow icon and click the **Configure Active Directory Certificate Services**... link.

In the configuration wizard, set the credentials used to configure the certificate services as required. You'll need to change this if your login account is different to the account with Enterprise Administrator rights.

<figure id="attachment_5085" aria-describedby="caption-attachment-5085" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5085" src="http://stealthpuppy.com/wp-content/uploads/2016/08/01CAConfigure-1024x592.png" alt="Certificate Services wizard - configuration credentials" width="1024" height="592" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/01CAConfigure-1024x592.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/01CAConfigure-150x87.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/01CAConfigure-300x173.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/01CAConfigure-768x444.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/01CAConfigure.png 1080w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/01CAConfigure.png)<figcaption id="caption-attachment-5085" class="wp-caption-text">Certificate Services wizard - configuration credentials*

For this server, we have two roles to configure:

<figure id="attachment_5086" aria-describedby="caption-attachment-5086" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5086" src="http://stealthpuppy.com/wp-content/uploads/2016/08/02CAConfigure-1024x592.png" alt="Certificate Services wizard – roles to configure" width="1024" height="592" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/02CAConfigure-1024x592.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/02CAConfigure-150x87.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/02CAConfigure-300x173.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/02CAConfigure-768x444.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/02CAConfigure.png 1080w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/02CAConfigure.png)<figcaption id="caption-attachment-5086" class="wp-caption-text">Certificate Services wizard – roles to configure*

Configure this subordinate certificate authority as an Enterprise CA. The server is a member of a domain and an Enterprise CA allows more flexibility in certificate management, including supporting certificate autoenrollment with domain authentication.

<figure id="attachment_5087" aria-describedby="caption-attachment-5087" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5087" src="http://stealthpuppy.com/wp-content/uploads/2016/08/03CAConfigure-1024x604.png" alt="Certificate Services wizard – install an Enterprise CA" width="1024" height="604" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/03CAConfigure-1024x604.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/03CAConfigure-150x88.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/03CAConfigure-300x177.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/03CAConfigure-768x453.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/03CAConfigure.png 1080w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/03CAConfigure.png)<figcaption id="caption-attachment-5087" class="wp-caption-text">Certificate Services wizard – install an Enterprise CA*

Configure this CA as a subordinate CA. After configuration, we will submit a CA certificate request to the offline root CA.

<figure id="attachment_5088" aria-describedby="caption-attachment-5088" style="width: 1024px" class="wp-caption alignnone">[<img class="wp-image-5088 size-large" src="http://stealthpuppy.com/wp-content/uploads/2016/08/04CAConfigure-1024x592.png" alt="Certificate Services wizard – install a subordinate certificate authority" width="1024" height="592" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/04CAConfigure-1024x592.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/04CAConfigure-150x87.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/04CAConfigure-300x173.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/04CAConfigure-768x444.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/04CAConfigure.png 1080w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/04CAConfigure.png)<figcaption id="caption-attachment-5088" class="wp-caption-text">Certificate Services wizard – install a subordinate certificate authority*

Create a new private key for this CA as this is the first time we're configuring it.

<figure id="attachment_5089" aria-describedby="caption-attachment-5089" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5089" src="http://stealthpuppy.com/wp-content/uploads/2016/08/05CAConfigure-1024x592.png" alt="Certificate Services wizard – create a new private key" width="1024" height="592" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/05CAConfigure-1024x592.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/05CAConfigure-150x87.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/05CAConfigure-300x173.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/05CAConfigure-768x444.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/05CAConfigure.png 1080w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/05CAConfigure.png)<figcaption id="caption-attachment-5089" class="wp-caption-text">Certificate Services wizard – create a new private key*

When selecting a cryptographic provider and a hash algorithm, SHA1 will be the default hashing algorithm; however, Windows will no longer accept certificates signed with [SHA1 after 1st of January 2017](http://social.technet.microsoft.com/wiki/contents/articles/32288.windows-enforcement-of-authenticode-code-signing-and-timestamping.aspx), so be sure to [choose at least SHA256](https://blogs.technet.microsoft.com/askds/2015/10/26/sha1-key-migration-to-sha256-for-a-two-tier-pki-hierarchy/).

<figure id="attachment_5090" aria-describedby="caption-attachment-5090" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5090" src="http://stealthpuppy.com/wp-content/uploads/2016/08/06CAConfigure-1024x592.png" alt="Certificate Services wizard – choose SHA256 as the hashing algorithm" width="1024" height="592" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/06CAConfigure-1024x592.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/06CAConfigure-150x87.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/06CAConfigure-300x173.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/06CAConfigure-768x444.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/06CAConfigure.png 1080w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/06CAConfigure.png)<figcaption id="caption-attachment-5090" class="wp-caption-text">Certificate Services wizard – choose SHA256 as the hashing algorithm*

Set a name for the CA that makes sense and somewhat descriptive. Note, that because this CA is a member of the domain the distinguished name includes the domain name automatically.

<figure id="attachment_5091" aria-describedby="caption-attachment-5091" style="width: 1024px" class="wp-caption alignnone">[<img class="wp-image-5091 size-large" src="http://stealthpuppy.com/wp-content/uploads/2016/08/07CAConfigure-1024x592.png" alt="Certificate Services wizard - setting a subordinate certificate authority name" width="1024" height="592" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/07CAConfigure-1024x592.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/07CAConfigure-150x87.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/07CAConfigure-300x173.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/07CAConfigure-768x444.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/07CAConfigure.png 1080w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/07CAConfigure.png)<figcaption id="caption-attachment-5091" class="wp-caption-text">Certificate Services wizard - setting a subordinate certificate authority name*

Because this is a subordinate CA, we'll need to send a CA certificate request to the offline root CA. Save the request locally which will be used later to manually request and approve the certificate. This is saved to the root of C: by default.

<figure id="attachment_5092" aria-describedby="caption-attachment-5092" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5092" src="http://stealthpuppy.com/wp-content/uploads/2016/08/08CAConfigure-1024x592.png" alt="Certificate Services wizard - the CA certificate request" width="1024" height="592" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/08CAConfigure-1024x592.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/08CAConfigure-150x87.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/08CAConfigure-300x173.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/08CAConfigure-768x444.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/08CAConfigure.png 1080w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/08CAConfigure.png)<figcaption id="caption-attachment-5092" class="wp-caption-text">Certificate Services wizard - the CA certificate request*

On the next page of the wizard, you can choose the location of the certificate services database and logs location (_C:\Windows\System32\Certlog_), which can be changed depending on your specific environment.

On the last page, you will see a summary of the configuration before committing it to the local certificate services.

<figure id="attachment_5094" aria-describedby="caption-attachment-5094" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5094" src="http://stealthpuppy.com/wp-content/uploads/2016/08/10CAConfigure-1024x592.png" alt="Certificate Services wizard - summary page" width="1024" height="592" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/10CAConfigure-1024x592.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/10CAConfigure-150x87.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/10CAConfigure-300x173.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/10CAConfigure-768x444.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/10CAConfigure.png 1080w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/10CAConfigure.png)<figcaption id="caption-attachment-5094" class="wp-caption-text">Certificate Services wizard - summary page*

Click **Configure** and the wizard will configure the certificate services roles. Note the warning that the configuration for this CA is not complete, as we still need to request, approve and import the CA certificate.

<figure id="attachment_5095" aria-describedby="caption-attachment-5095" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5095" src="http://stealthpuppy.com/wp-content/uploads/2016/08/11CAConfigure-1024x592.png" alt="Certificate Services wizard - configuration results" width="1024" height="592" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/11CAConfigure-1024x592.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/11CAConfigure-150x87.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/11CAConfigure-300x173.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/11CAConfigure-768x444.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/11CAConfigure.png 1080w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/11CAConfigure.png)<figcaption id="caption-attachment-5095" class="wp-caption-text">Certificate Services wizard - configuration results*

## Configuring the CRL Distribution Point

Before configuring the Certification Authority itself, we'll first copy across the certificate and CRL from the root CA.

Ensure the root CA virtual machine is running and copy the contents of **C:\Windows\System32\certsrv\CertEnroll** from the root CA to the same folder on the subordinate CA. This is the default location to which certificates and CRLs are published. Keeping the default locations will require the minimum amount of configuration for the CRL and AIA distribution points.

The result on the subordinate certificate authority will look something like this - note that the CRL for the root CA is located here:

<figure id="attachment_5098" aria-describedby="caption-attachment-5098" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5098" src="http://stealthpuppy.com/wp-content/uploads/2016/08/CertEnrollFolder-1024x529.png" alt="The CertEnroll folder after copying certificates and CRLs from the root CA" width="1024" height="529" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/CertEnrollFolder-1024x529.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/CertEnrollFolder-150x77.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/CertEnrollFolder-300x155.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/CertEnrollFolder-768x396.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/CertEnrollFolder.png 1054w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/CertEnrollFolder.png)<figcaption id="caption-attachment-5098" class="wp-caption-text">The CertEnroll folder after copying certificates and CRLs from the root CA*

Now double check that the alias you've selected for your CRL host is resolvable. In my case, I've checked that I can ping _crl.home.stealthpuppy.com_.

## Issuing the Subordinate CA Certificate

Next, we will request, approve the certificate request for the subordinate CA. At this point, the subordinate CA is unconfigured because it does not yet have a valid CA certificate.

On the root CA, open the Certificate Authority console and **submit a new certificate request**:

<figure id="attachment_5096" aria-describedby="caption-attachment-5096" style="width: 1015px" class="wp-caption alignnone">[<img class="size-full wp-image-5096" src="http://stealthpuppy.com/wp-content/uploads/2016/08/12CAConfigure.png" alt="Submitting a new certificate request on the root CA" width="1015" height="538" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/12CAConfigure.png 1015w, https://stealthpuppy.com/wp-content/uploads/2016/08/12CAConfigure-150x80.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/12CAConfigure-300x159.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/12CAConfigure-768x407.png 768w" sizes="(max-width: 1015px) 100vw, 1015px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/12CAConfigure.png)<figcaption id="caption-attachment-5096" class="wp-caption-text">Submitting a new certificate request on the root CA*

Browse to where the certificate request for the subordinate certificate authority is located and open the file. The certificate request will then be listed under **Pending Requests** on the root CA. Right-click the request, choose **All Tasks** and **Issue**.

<figure id="attachment_5100" aria-describedby="caption-attachment-5100" style="width: 1015px" class="wp-caption alignnone">[<img class="size-full wp-image-5100" src="http://stealthpuppy.com/wp-content/uploads/2016/08/PendingCACert.png" alt="Issue the new certificate request from the subordinate CA" width="1015" height="538" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/PendingCACert.png 1015w, https://stealthpuppy.com/wp-content/uploads/2016/08/PendingCACert-150x80.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/PendingCACert-300x159.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/PendingCACert-768x407.png 768w" sizes="(max-width: 1015px) 100vw, 1015px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/PendingCACert.png)<figcaption id="caption-attachment-5100" class="wp-caption-text">Issue the new certificate request from the subordinate CA*

The subordinate CA's certificate will now be issued and we can copy it to that CA. View the certificate under **Issued Certificates**. Right-click the certificate, click **Open** and choose **Copy to File...** from the **Details** tab on the certificate properties.

<figure id="attachment_5101" aria-describedby="caption-attachment-5101" style="width: 1015px" class="wp-caption alignnone">[<img class="size-full wp-image-5101" src="http://stealthpuppy.com/wp-content/uploads/2016/08/IssuedSubCA.png" alt="Open the properties of the issued certificate and copy to a file" width="1015" height="538" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/IssuedSubCA.png 1015w, https://stealthpuppy.com/wp-content/uploads/2016/08/IssuedSubCA-150x80.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/IssuedSubCA-300x159.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/IssuedSubCA-768x407.png 768w" sizes="(max-width: 1015px) 100vw, 1015px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/IssuedSubCA.png)<figcaption id="caption-attachment-5101" class="wp-caption-text">Open the properties of the issued certificate and copy to a file*

Export the new certificate to a file in PKCS format. Copy the file back to the subordinate certificate authority, so that it can be imported and enable certificate services on that machine.

<figure id="attachment_5102" aria-describedby="caption-attachment-5102" style="width: 1015px" class="wp-caption alignnone">[<img class="size-full wp-image-5102" src="http://stealthpuppy.com/wp-content/uploads/2016/08/CopyCertToPKCSformat.png" alt="Copying the subordinate CA certificate to a PKCS format file" width="1015" height="538" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/CopyCertToPKCSformat.png 1015w, https://stealthpuppy.com/wp-content/uploads/2016/08/CopyCertToPKCSformat-150x80.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/CopyCertToPKCSformat-300x159.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/CopyCertToPKCSformat-768x407.png 768w" sizes="(max-width: 1015px) 100vw, 1015px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/CopyCertToPKCSformat.png)<figcaption id="caption-attachment-5102" class="wp-caption-text">Copying the subordinate CA certificate to a PKCS format file*

We have successfully issued and exported the subordinate CA's certificate, so this CA should no longer be required. You can shut down and secure the root CA - either move the VM to a secure location or ensure it is stored in such a way that it can't readily be started.

## Configuring the Subordinate CA

With the certificate file stored locally to the subordinate CA, open the Certificate Authority console - note that the certificate service is stopped. Right-click the CA, select **All Tasks** and choose **Install CA Certificate...**

<figure id="attachment_5104" aria-describedby="caption-attachment-5104" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5104" src="http://stealthpuppy.com/wp-content/uploads/2016/08/SubCAInstallCert-1024x523.png" alt="Install the subordinate CA certificate that we've just issued from the root CA" width="1024" height="523" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/SubCAInstallCert-1024x523.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/SubCAInstallCert-150x77.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/SubCAInstallCert-300x153.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/SubCAInstallCert-768x392.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/SubCAInstallCert.png 1081w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/SubCAInstallCert.png)<figcaption id="caption-attachment-5104" class="wp-caption-text">Install the subordinate CA certificate that we've just issued from the root CA*

Browse to where the certificate file is stored:

<figure id="attachment_5103" aria-describedby="caption-attachment-5103" style="width: 1024px" class="wp-caption alignnone">[<img class="wp-image-5103 size-large" src="http://stealthpuppy.com/wp-content/uploads/2016/08/SubCABrowseToCert-1024x533.png" alt="Browse to where the PKCS formatted certificate is stored" width="1024" height="533" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/SubCABrowseToCert-1024x533.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/SubCABrowseToCert-150x78.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/SubCABrowseToCert-300x156.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/SubCABrowseToCert-768x400.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/SubCABrowseToCert.png 1034w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/SubCABrowseToCert.png)<figcaption id="caption-attachment-5103" class="wp-caption-text">Browse to where the PKCS formatted certificate is stored*

Move through the import wizard to import the certificate. If the CRL is online, the certificate should import successfully. If you receive error messages about the CRL, double check the alias created earlier in DNS can be resolved and IIS is online.

Once imported, you should now be able to start the certificate service.

<figure id="attachment_5105" aria-describedby="caption-attachment-5105" style="width: 1024px" class="wp-caption alignnone">[<img class="wp-image-5105 size-large" src="http://stealthpuppy.com/wp-content/uploads/2016/08/SubCAStartService-1024x523.png" alt="With the certificate installed and the CRL online, start the certificate service on the subordinate CA" width="1024" height="523" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/SubCAStartService-1024x523.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/SubCAStartService-150x77.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/SubCAStartService-300x153.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/SubCAStartService-768x392.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/SubCAStartService.png 1081w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/SubCAStartService.png)<figcaption id="caption-attachment-5105" class="wp-caption-text">With the certificate installed and the CRL online, start the certificate service on the subordinate CA*

If the CRL is online correctly, the service should start without issues.

Just like the root CA, we should now open the properties of this certificate authority and configure the CRL and AIA distribution points. The difference with this subordinate certificate authority is that we will ensure that LDAP is left configured as this machine is a member of the domain.

Open the properties of the CA, choose the **Extensions** tab and ensure that the options for the existing HTTP entry are _deselected_. Now add a new CRL distribution point.

You can select the existing HTTP distribution point and press Ctrl-C to copy the existing location. For this CA we can leave the default <ServerDNSName> variable; however, to be consistent with the root CA, I've chosen to add the same crl alias:

<pre class="toolbar:2 lang:ps decode:true">http://crl.home.stealthpuppy.com/CertEnroll/&lt;CaName&gt;&lt;CRLNameSuffix&gt;&lt;DeltaCRLAllowed&gt;.crl</pre>

<figure id="attachment_5106" aria-describedby="caption-attachment-5106" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5106" src="http://stealthpuppy.com/wp-content/uploads/2016/08/CRLAddHTTP-1024x539.png" alt="Adding a new HTTP CRL distribution point to the CA" width="1024" height="539" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/CRLAddHTTP-1024x539.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/CRLAddHTTP-150x79.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/CRLAddHTTP-300x158.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/CRLAddHTTP-768x404.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/CRLAddHTTP.png 1088w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/CRLAddHTTP.png)<figcaption id="caption-attachment-5106" class="wp-caption-text">Adding a new HTTP CRL distribution point to the CA*

For this new DP, I've enabled '**Include in CRLs'** and '**Include in the CDP...'** options (and disabled these for the existing http:// DP). Also check that the ldap:// distribution is enabled, which it should be by default.

<figure id="attachment_5107" aria-describedby="caption-attachment-5107" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5107" src="http://stealthpuppy.com/wp-content/uploads/2016/08/CRLHTTPproperties-1024x539.png" alt="HTTP CRL distribution point properties" width="1024" height="539" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/CRLHTTPproperties-1024x539.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/CRLHTTPproperties-150x79.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/CRLHTTPproperties-300x158.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/CRLHTTPproperties-768x404.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/CRLHTTPproperties.png 1088w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/CRLHTTPproperties.png)<figcaption id="caption-attachment-5107" class="wp-caption-text">HTTP CRL distribution point properties*

This configuration allows clients to check for the CRL from Active Directory or via a HTTP request - useful for clients that are not a member of AD (e.g. stand-alone machines or other devices such as non-Windows PCs.).

Repeat for the AIA extension:

<figure id="attachment_5108" aria-describedby="caption-attachment-5108" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5108" src="http://stealthpuppy.com/wp-content/uploads/2016/08/SubCAAIA-1024x539.png" alt="Configuring an AIA extension on the subordinate CA" width="1024" height="539" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/SubCAAIA-1024x539.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/SubCAAIA-150x79.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/SubCAAIA-300x158.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/SubCAAIA-768x404.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/SubCAAIA.png 1088w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/SubCAAIA.png)<figcaption id="caption-attachment-5108" class="wp-caption-text">Configuring an AIA extension on the subordinate CA*

Once clicking OK, you will be prompted to restart the Active Directory Certificate Services for these changes to take effect.

After the service is restarted, publish the Certificate Revocation List - right-click **Revoked Certifcates** and choose **All Tasks / Publish**. Publish a new CRL:

<figure id="attachment_5110" aria-describedby="caption-attachment-5110" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5110" src="http://stealthpuppy.com/wp-content/uploads/2016/08/SubCAPublishCRL-1024x539.png" alt="Publishing a new CRL on the subordinate CA" width="1024" height="539" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/SubCAPublishCRL-1024x539.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/SubCAPublishCRL-150x79.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/SubCAPublishCRL-300x158.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/SubCAPublishCRL-768x404.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/SubCAPublishCRL.png 1088w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/SubCAPublishCRL.png)<figcaption id="caption-attachment-5110" class="wp-caption-text">Publishing a new CRL on the subordinate CA*

View the C:\Windows\System32\certsrv\CertEnroll folder to view the certificates and CRLs for both the root CA and the subordinate CA.

<figure id="attachment_5109" aria-describedby="caption-attachment-5109" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5109" src="http://stealthpuppy.com/wp-content/uploads/2016/08/SubCA-CertEnroll-1024x533.png" alt="Viewing the populated CertEnroll folder on the subordinate CA" width="1024" height="533" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/SubCA-CertEnroll-1024x533.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/SubCA-CertEnroll-150x78.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/SubCA-CertEnroll-300x156.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/SubCA-CertEnroll-768x400.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/SubCA-CertEnroll.png 1075w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/SubCA-CertEnroll.png)<figcaption id="caption-attachment-5109" class="wp-caption-text">Viewing the populated CertEnroll folder on the subordinate CA*

If the CRL of the root CA ever needs to be updated (e.g. if new subordinate CAs are provisioned), manually boot the root CA, publish the CRL and copy over to this location on the subordinate certificate authority.

# Viewing the CA configuration in Active Directory

The certificate services configuration in Active Directory can be confirmed with the Enterprise PKI snap-in. Open a Microsoft Management Console instance (**mmc.exe**) and add the **Enterprise PKI** snap-in.

<figure id="attachment_5113" aria-describedby="caption-attachment-5113" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5113" src="http://stealthpuppy.com/wp-content/uploads/2016/08/EnterprisePKISnapin-1024x521.png" alt="Viewing the Active Directory Certificate Services configuration with the Enterprise PKI snap-in" width="1024" height="521" srcset="https://stealthpuppy.com/wp-content/uploads/2016/08/EnterprisePKISnapin-1024x521.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/08/EnterprisePKISnapin-150x76.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/08/EnterprisePKISnapin-300x153.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/08/EnterprisePKISnapin-768x391.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/08/EnterprisePKISnapin.png 1227w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/EnterprisePKISnapin.png)<figcaption id="caption-attachment-5113" class="wp-caption-text">Viewing the Active Directory Certificate Services configuration with the Enterprise PKI snap-in*

In my example, you can see the configuration in Active Directory and the act of configuring certificate services on the subordinate CA and issuing the CA certificate has imported the certificate chain into AD and I can see CRL and AIA distribution points listed.

# Conclusion

Setting up Active Directory Certificate Services consists of quite a reasonable number of steps and doing so successfully requires paying attention to the details. If you ensure that you've configured an offline root CA, a subordinate certificate authority and correct locations for the certificate revocation list, installing and configuring certificate services should be easy.

For those readers who are consultants, I would generally be recommending close to a day to deploy and test certificate services correctly and that's without looking at a design phase.

Hopefully, I've provided enough to qualify for the lazy admin's guide to setting up AD Certificate Services.