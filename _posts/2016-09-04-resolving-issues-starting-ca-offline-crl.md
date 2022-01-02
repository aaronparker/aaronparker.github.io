---
title: Resolving Issues Starting a CA due to an Offline CRL
description: Resolving issues when attempting to start a certificate authority due to an offline CRL.
date: 2016-09-04T22:18:39+10:00
author: Aaron Parker
layout: post
permalink: /resolving-issues-starting-ca-offline-crl/
dsq_thread_id:
  - "5118425385"
image: /media/2016/09/13740073235_b8a4ec0ffc_k.jpg
categories:
  - Microsoft
related_posts:
  - _posts/2016-08-22-deploy-enterprise-subordinate-certificate-authority.md
  - _posts/2016-08-21-deploy-enterprise-root-certificate-authority.md
---
* this unordered seed list will be replaced by the toc
{:toc}

I recently wrote a couple of articles on setting up and [Root Certification Authority]({{site.baseurl}}/deploy-enterprise-root-certificate-authority/) and a [Subordinate Certification Authority]({{site.baseurl}}/deploy-enterprise-subordinate-certificate-authority/) as a basic cheat sheet for setting up and Enterprise PKI. One configuration item that is less well understood and often the cause of major headaches with certificate authorities, is the Certificate Revocation List (CRL). An Offline CRL can bring down your PKI and other services that rely on it.

## The Issue

You might find your certificate authority, in this case, a subordinate certificate authority that is not started, perhaps after a server reboot. Attempting to start the CA, results in this message:

> The revocation function was unable to check revocation because the revocation server was offline. 0x80092013 (-2146885613 CRYPT_E_REVOCATION_OFFLINE)

Which looks like this:

![Unable to start a CA due to an Offline CRL CRYPT_E_REVOCATION_OFFLINE]({{site.baseurl}}/media/2016/09/CRYPT_E_REVOCATION_OFFLINE.png)

In the Application log on the subordinate CA, I can see event id 100 from source CertificationAuthority:

> Active Directory Certificate Services did not start: Could not load or verify the current CA certificate.  stealthpuppy Issuing CA The revocation function was unable to check revocation because the revocation server was offline. 0x80092013 (-2146885613 CRYPT_E_REVOCATION_OFFLINE).

As well as, event id 48 from the same source, CertificationAuthority:

> Revocation status for a certificate in the chain for CA certificate 0 for stealthpuppy Issuing CA could not be verified because a server is currently unavailable.  The revocation function was unable to check revocation because the revocation server was offline. 0x80092013 (-2146885613 CRYPT_E_REVOCATION_OFFLINE).

Certificate 0 is the subordinate CA's certificate, issued by the offline Root CA.

In addition (by starting the CA with a workaround) I can see a number of failed certificate requests with the same Offline CRL issue:

![Failed Requests for certifiicates due to CRYPT_E_REVOCATION_OFFLINE]({{site.baseurl}}/media/2016/09/IssuingCAFailedRequests.png)

In this case, I knew that my CRL was online - it's the same server as the subordinate CA and I had configured both the offline Root CA and the Subordinate CA for the same CRL distribution point.

![CRL distribution point on the Subordinate CA]({{site.baseurl}}/media/2016/09/http-crl-issuingca.png)

CRL distribution point on the Subordinate CA
{:.figcaption}

## The Workaround

Of course, you probably want to get the CA up and running as quickly as possible. The easy way to do that is to disable CRL checking with the following command on the CA server:

```powershell
certutil –setreg ca\CRLFlags +CRLF_REVCHECK_IGNORE_OFFLINE
```

Run this from an elevated command prompt and you should now be able to start the CA and get on with the business of troubleshooting.

![Setting CRLF_REVCHECK_IGNORE_OFFLINE with certutil.exe]({{site.baseurl}}/media/2016/09/CRLF_REVCHECK_IGNORE_OFFLINE.png)

## The Cause of an Offline CRL

My CRL was online as it is available in Active Directory (for domain joined machines) and via HTTP at crl.home.stealthpuppy.com, an alias of the subordinate CA. I've tested that I can retrieve the CRL by putting the HTTP path into a browser and I'm prompted to download a file.

```powershell
http://crl.home.stealthpuppy.com/CertEnroll/stealthpuppy Issuing CA.crl
http://crl.home.stealthpuppy.com/CertEnroll/stealthpuppy Offline Root CA.crl
```

Through having spent some time recently with setting up an Enterprise PKI in my lab and for a project, I've come to know the command line tool [`certutil.exe`](https://technet.microsoft.com/en-us/library/cc732443(v=ws.11).aspx). This tool is available in all versions of Windows and should be the first tool to use to troubleshoot and manage certificates and certificate authorities on Windows.

Certutil can be used to perform many functions, one of which is to verify a CRL. I know the path to the CRL file because I can view the CRLs on the file system (in `C:\Windows\System32\certsrv\CertEnroll`) and I've [previously configured CRLs for both CAs]({{site.baseurl}}/deploy-enterprise-subordinate-certificate-authority/).

To verify the CRL, use the -URL switch with the HTTP (or LDAP) path to the CRL:

```powershell
certutil -URL "http://crl.home.stealthpuppy.com/CertEnroll/stealthpuppy Issuing CA.crl"
```

This will display the **URL Retrieval Tool** that shows that the CRLs are able to be contacted and show a status of OK.

![Using certutil.exe to test the Offline CRL]({{site.baseurl}}/media/2016/09/certutilURLCRL.png)

However, if we load a target certificate, in this case, the subordinate CA's cert, we can start to see why we have an issue with the CRL.

Select the certificate for the subordinate CA that has been previously exported to the file system (in `C:\Windows\System32\certsrv\CertEnroll`) - click **Select**, open the certificate and click **Retrieve** again. This time, we can see a new line that shows that the base CRL for the subordinate CA's certificate is _Expired_.

![An expired base CRL on the Subordinate CA]({{site.baseurl}}/media/2016/09/IssuingCAExpiredBaseCRL.png)

The CRL for the subordinate CA's certificate will come from the root CA, so we'll need to check that CRL. Open the CRL file (`C:\windows\system32\certsrv\CertEnroll\stealthpuppy Offline Root CA.crl`) - double-click or right-click and **Open**. Here we can see the CRL information, including the next publishing time (Next CRL Publish).

![Viewing the properties of the Root CA's CRL]({{site.baseurl}}/media/2016/09/OfflineRootCA-CRL.png)

At the time of troubleshooting, this date was in the past and because the Root CA is offline and the CRL is hosted on a different server (the subordinate CA), this particular CRL will never receive an update. So, when the subordinate CA has rebooted, it has checked the Root CA's CRL and found it expired. Hence the certification authority service won't start.

## How To Fix It

Now we know why the certification authority service won't start and an understanding of why the CRL is offline, even if the wording doesn't match the symptoms. If the error message had told me the CRL had expired instead of being offline, I might have saved some troubleshooting time. We now know that we need to re-publish the CRL from the Root CA.

Start the offline Root CA, log into it and open the **Certification Authority** console. We will first want to ensure that the CRL publication interval is extended so that we don't run into the same problem in the near future. Open the properties of the **Revoked Certificates** node to view and set the publication interval. The default interval is 1 week, obviously too often for an offline Root CA.

Instead, set this value to something suitable for the environment you have installed the CA into. Remember that you’ll need to boot the Root CA and publish a new CRL before the end of this interval, otherwise, you'll have exactly the same issue.

![Setting the CRL Publication Interval on the Root CA]({{site.baseurl}}/media/2016/08/rootCASettingCRLPublishingInterval.png)

Now publish a new CRL - right-click the **Revoked Certificates** node and click **All Tasks** / **Publish**.

![Publishing a new CRL from the Root CA]({{site.baseurl}}/media/2016/09/RootCAPublishingNewCRL.png)

Copy the updated CRL (from `C:\Windows\System32\certsrv\CertEnroll` by default) from the Root CA to the CRL distribution point and overwrite the existing CRL file (`C:\Windows\System32\certsrv\CertEnroll` again on my subordinate CA).

Now if we again use certutil.exe to verify the CRL, it comes up roses:

![Viewing the verified CRL with certutil.exe]({{site.baseurl}}/media/2016/09/verifiedCRL.png)

Viewing the verified CRL with certutil.exe
{:.figcaption}

To ensure that the subordinate CA's certification authority service will start, re-enable CRL checking:

```powershell
certutil –setreg ca\CRLFlags -CRLF_REVCHECK_IGNORE_OFFLINE
```

If you have re-published the CRL from the Root CA correctly, the service should start and you can then shut down the Root CA. Then open Outlook and put a reminder in the calendar for a week before the CRL expires again.

## Conclusion

I've had this issue with an Offline CRL a few times now and not really understood what the issue is until I took the time to troubleshoot the issue properly. I don't spend that much time with an enterprise PKI and it's easy to underestimate the complexity of setting up AD Certificate Services correctly.

This same issue has also caused me headaches with a [Network Device Enrollment Service](http://social.technet.microsoft.com/wiki/contents/articles/9063.network-device-enrollment-service-ndes-in-active-directory-certificate-services-ad-cs.aspx) (NDES) deployment for issuing certificates to devices via Intune. The expired CRL has caused the NDES service to not start and the events logged do not mention in any way, an expired CRL.
