---
id: 5967
title: Resolving Issues Starting a CA due to an Offline CRL
date: 2018-02-14T13:57:06+10:00
author: Aaron Parker
layout: revision
guid: https://stealthpuppy.com/5127-revision-v1/
permalink: /5127-revision-v1/
---
I recently wrote a couple of articles on setting up and [Root Certification Authority](http://stealthpuppy.com/deploy-enterprise-root-certificate-authority/) and a [Subordinate Certification Authority](http://stealthpuppy.com/deploy-enterprise-subordinate-certificate-authority/) as a basic cheat sheet for setting up and Enterprise PKI. One configuration item that is less well understood and often the cause of major headaches with certificate authorities, is the Certificate Revocation List (CRL). An Offline CRL can bring down your PKI and other services that rely on it.

# The Issue

You might find your certificate authority, in this case, a subordinate certificate authority that is not started, perhaps after a server reboot. Attempting to start the CA, results in this message:

> The revocation function was unable to check revocation because the revocation server was offline. 0x80092013 (-2146885613 CRYPT\_E\_REVOCATION_OFFLINE)

Which looks like this:

<figure id="attachment_5130" aria-describedby="caption-attachment-5130" style="width: 959px" class="wp-caption alignnone">[<img class="wp-image-5130 size-full" src="http://stealthpuppy.com/wp-content/uploads/2016/09/CRYPT_E_REVOCATION_OFFLINE.png" alt="Unable to start a CA due to an Offline CRL CRYPT_E_REVOCATION_OFFLINE" width="959" height="497" srcset="http://192.168.0.89/wp-content/uploads/2016/09/CRYPT_E_REVOCATION_OFFLINE.png 959w, http://192.168.0.89/wp-content/uploads/2016/09/CRYPT_E_REVOCATION_OFFLINE-150x78.png 150w, http://192.168.0.89/wp-content/uploads/2016/09/CRYPT_E_REVOCATION_OFFLINE-300x155.png 300w, http://192.168.0.89/wp-content/uploads/2016/09/CRYPT_E_REVOCATION_OFFLINE-768x398.png 768w" sizes="(max-width: 959px) 100vw, 959px" />](http://stealthpuppy.com/wp-content/uploads/2016/09/CRYPT_E_REVOCATION_OFFLINE.png)<figcaption id="caption-attachment-5130" class="wp-caption-text">Unable to start a CA due to an Offline CRL, reporting CRYPT\_E\_REVOCATION_OFFLINE.</figcaption></figure>

In the Application log on the subordinate CA, I can see event id 100 from source CertificationAuthority:

> Active Directory Certificate Services did not start: Could not load or verify the current CA certificate. &nbsp;stealthpuppy Issuing CA The revocation function was unable to check revocation because the revocation server was offline. 0x80092013 (-2146885613 CRYPT\_E\_REVOCATION_OFFLINE).

As well as, event id 48 from the same source,&nbsp;CertificationAuthority:

> Revocation status for a certificate in the chain for CA certificate 0 for stealthpuppy Issuing CA could not be verified because a server is currently unavailable. &nbsp;The revocation function was unable to check revocation because the revocation server was offline. 0x80092013 (-2146885613 CRYPT\_E\_REVOCATION_OFFLINE).

Certificate 0 is the subordinate CA&#8217;s certificate, issued by the offline Root CA.

In addition (by starting the CA with a workaround) I can see a number of failed certificate requests with the same Offline CRL issue:

<figure id="attachment_5139" aria-describedby="caption-attachment-5139" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5139" src="http://stealthpuppy.com/wp-content/uploads/2016/09/IssuingCAFailedRequests-1024x457.png" alt="Failed Requests for certifiicates due to CRYPT_E_REVOCATION_OFFLINE" width="1024" height="457" srcset="http://192.168.0.89/wp-content/uploads/2016/09/IssuingCAFailedRequests-1024x457.png 1024w, http://192.168.0.89/wp-content/uploads/2016/09/IssuingCAFailedRequests-150x67.png 150w, http://192.168.0.89/wp-content/uploads/2016/09/IssuingCAFailedRequests-300x134.png 300w, http://192.168.0.89/wp-content/uploads/2016/09/IssuingCAFailedRequests-768x342.png 768w, http://192.168.0.89/wp-content/uploads/2016/09/IssuingCAFailedRequests.png 1294w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/09/IssuingCAFailedRequests.png)<figcaption id="caption-attachment-5139" class="wp-caption-text">Failed Requests for certificates due to CRYPT\_E\_REVOCATION_OFFLINE</figcaption></figure>

In this case, I knew that my CRL was online &#8211; it&#8217;s the same server as the subordinate CA and I had configured both the offline Root CA and the Subordinate CA for the same CRL distribution point.

<figure id="attachment_5142" aria-describedby="caption-attachment-5142" style="width: 959px" class="wp-caption alignnone">[<img class="size-full wp-image-5142" src="http://stealthpuppy.com/wp-content/uploads/2016/09/http-crl-issuingca.png" alt="CRL distribution point on the Subordinate CA" width="959" height="544" srcset="http://192.168.0.89/wp-content/uploads/2016/09/http-crl-issuingca.png 959w, http://192.168.0.89/wp-content/uploads/2016/09/http-crl-issuingca-150x85.png 150w, http://192.168.0.89/wp-content/uploads/2016/09/http-crl-issuingca-300x170.png 300w, http://192.168.0.89/wp-content/uploads/2016/09/http-crl-issuingca-768x436.png 768w" sizes="(max-width: 959px) 100vw, 959px" />](http://stealthpuppy.com/wp-content/uploads/2016/09/http-crl-issuingca.png)<figcaption id="caption-attachment-5142" class="wp-caption-text">CRL distribution point on the Subordinate CA</figcaption></figure>

# The Workaround

Of course, you probably want to get the CA up and running as quickly as possible. The easy way to do that is to disable CRL checking with the following command on the CA server:

<pre class="prettyprint lang-plain_text" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">certutil –setreg ca\CRLFlags +CRLF_REVCHECK_IGNORE_OFFLINE</pre>

Run this from an elevated command prompt and you should now be able to start the CA and get on with the business of troubleshooting.

<figure id="attachment_5145" aria-describedby="caption-attachment-5145" style="width: 837px" class="wp-caption alignnone">[<img class="size-full wp-image-5145" src="http://stealthpuppy.com/wp-content/uploads/2016/09/CRLF_REVCHECK_IGNORE_OFFLINE.png" alt="Setting CRLF_REVCHECK_IGNORE_OFFLINE with certutil.exe" width="837" height="427" srcset="http://192.168.0.89/wp-content/uploads/2016/09/CRLF_REVCHECK_IGNORE_OFFLINE.png 837w, http://192.168.0.89/wp-content/uploads/2016/09/CRLF_REVCHECK_IGNORE_OFFLINE-150x77.png 150w, http://192.168.0.89/wp-content/uploads/2016/09/CRLF_REVCHECK_IGNORE_OFFLINE-300x153.png 300w, http://192.168.0.89/wp-content/uploads/2016/09/CRLF_REVCHECK_IGNORE_OFFLINE-768x392.png 768w" sizes="(max-width: 837px) 100vw, 837px" />](http://stealthpuppy.com/wp-content/uploads/2016/09/CRLF_REVCHECK_IGNORE_OFFLINE.png)<figcaption id="caption-attachment-5145" class="wp-caption-text">Setting CRLF\_REVCHECK\_IGNORE_OFFLINE with certutil.exe</figcaption></figure>

# The Cause of an Offline CRL

My CRL was online as it is available in Active Directory (for domain joined machines) and via HTTP at crl.home.stealthpuppy.com,&nbsp;an alias of the subordinate CA.&nbsp;I&#8217;ve tested that I can retrieve&nbsp;the CRL by putting the HTTP path into a browser and I&#8217;m prompted to download a file.

<pre class="prettyprint lang-plain_text" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">http://crl.home.stealthpuppy.com/CertEnroll/stealthpuppy Issuing CA.crl
http://crl.home.stealthpuppy.com/CertEnroll/stealthpuppy Offline Root CA.crl</pre>

Through having spent some time recently with setting up an Enterprise PKI in my lab and for a project, I&#8217;ve come to know the command line tool [certutil.exe](https://technet.microsoft.com/en-us/library/cc732443(v=ws.11).aspx). This tool is available in all versions of Windows and should be the first tool to use to troubleshoot and manage certificates and certificate authorities on Windows.

Certutil can be used to perform many functions, one of which is to verify a CRL. I know the path to the CRL file&nbsp;because I can view the CRLs on the file system (in C:\Windows\System32\certsrv\CertEnroll) and I&#8217;ve [previously configured CRLs for both CAs](http://stealthpuppy.com/deploy-enterprise-subordinate-certificate-authority/).

To verify the CRL, use the -URL switch with the HTTP (or LDAP) path to the CRL:

<pre class="prettyprint lang-plain_text" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">certutil -URL "http://crl.home.stealthpuppy.com/CertEnroll/stealthpuppy Issuing CA.crl"</pre>

This will display the **URL Retrieval Tool** that shows that the CRLs are able to be contacted and show a status of OK.

<figure id="attachment_5141" aria-describedby="caption-attachment-5141" style="width: 837px" class="wp-caption alignnone">[<img class="size-full wp-image-5141" src="http://stealthpuppy.com/wp-content/uploads/2016/09/certutilURLCRL.png" alt="Using certutil.exe to test the Offline CRL" width="837" height="507" srcset="http://192.168.0.89/wp-content/uploads/2016/09/certutilURLCRL.png 837w, http://192.168.0.89/wp-content/uploads/2016/09/certutilURLCRL-150x91.png 150w, http://192.168.0.89/wp-content/uploads/2016/09/certutilURLCRL-300x182.png 300w, http://192.168.0.89/wp-content/uploads/2016/09/certutilURLCRL-768x465.png 768w" sizes="(max-width: 837px) 100vw, 837px" />](http://stealthpuppy.com/wp-content/uploads/2016/09/certutilURLCRL.png)<figcaption id="caption-attachment-5141" class="wp-caption-text">Using certutil.exe to test the Offline CRL</figcaption></figure>

However, if we load a&nbsp;target certificate, in this case, the subordinate CA&#8217;s cert, we can start to see why we have an issue with the CRL.

Select the certificate for the subordinate CA that has been previously exported to the file system (in C:\Windows\System32\certsrv\CertEnroll) &#8211; click **Select**, open the certificate and click **Retrieve** again. This time, we can see a new line that shows that the base CRL for the subordinate CA&#8217;s certificate is _Expired_.

<figure id="attachment_5143" aria-describedby="caption-attachment-5143" style="width: 837px" class="wp-caption alignnone">[<img class="size-full wp-image-5143" src="http://stealthpuppy.com/wp-content/uploads/2016/09/IssuingCAExpiredBaseCRL.png" alt="An expired base CRL on the Subordinate CA" width="837" height="507" srcset="http://192.168.0.89/wp-content/uploads/2016/09/IssuingCAExpiredBaseCRL.png 837w, http://192.168.0.89/wp-content/uploads/2016/09/IssuingCAExpiredBaseCRL-150x91.png 150w, http://192.168.0.89/wp-content/uploads/2016/09/IssuingCAExpiredBaseCRL-300x182.png 300w, http://192.168.0.89/wp-content/uploads/2016/09/IssuingCAExpiredBaseCRL-768x465.png 768w" sizes="(max-width: 837px) 100vw, 837px" />](http://stealthpuppy.com/wp-content/uploads/2016/09/IssuingCAExpiredBaseCRL.png)<figcaption id="caption-attachment-5143" class="wp-caption-text">An expired base CRL on the Subordinate CA</figcaption></figure>

The CRL for the subordinate CA&#8217;s certificate will come from the root CA, so we&#8217;ll need to check that CRL. Open the CRL file (_C:\windows\system32\certsrv\CertEnroll\stealthpuppy Offline Root CA.crl_) &#8211; double-click or right-click and **Open**. Here we can see the CRL information, including the next publishing time (Next CRL Publish).

<figure id="attachment_5147" aria-describedby="caption-attachment-5147" style="width: 419px" class="wp-caption alignnone">[<img class="size-full wp-image-5147" src="http://stealthpuppy.com/wp-content/uploads/2016/09/OfflineRootCA-CRL.png" alt="Viewing the properties of the Root CA's CRL" width="419" height="518" srcset="http://192.168.0.89/wp-content/uploads/2016/09/OfflineRootCA-CRL.png 419w, http://192.168.0.89/wp-content/uploads/2016/09/OfflineRootCA-CRL-121x150.png 121w, http://192.168.0.89/wp-content/uploads/2016/09/OfflineRootCA-CRL-243x300.png 243w" sizes="(max-width: 419px) 100vw, 419px" />](http://stealthpuppy.com/wp-content/uploads/2016/09/OfflineRootCA-CRL.png)<figcaption id="caption-attachment-5147" class="wp-caption-text">Viewing the properties of the Root CA&#8217;s CRL</figcaption></figure>

At the time of troubleshooting, this date was in the past and because the Root CA is offline and the CRL is hosted on a different server (the subordinate CA), this particular CRL will never receive an update. So, when the subordinate CA has rebooted, it has checked the Root CA&#8217;s CRL and found it expired. Hence the certification authority service won&#8217;t start.

# How To Fix It

Now we know why the certification authority service won&#8217;t start and an understanding of why the CRL is offline, even if the wording doesn&#8217;t match the symptoms. If the error message had told me the CRL had expired instead of being offline, I might have saved some troubleshooting time. We now know that we need to re-publish the CRL from the Root CA.

Start the offline Root CA, log into it and open the **Certification Authority** console. We will first want to ensure that the CRL publication interval is extended so that we don&#8217;t run into the same problem in the near future. Open the properties of the **Revoked Certificates** node to view and set the publication interval. The default interval is 1 week, obviously too often for an offline Root CA.

Instead, set this value to something suitable for the environment you have installed the CA into. Remember that you’ll need to boot the Root CA and publish a new CRL before the end of this interval, otherwise, you&#8217;ll have exactly the same issue.

<figure id="attachment_5137" aria-describedby="caption-attachment-5137" style="width: 968px" class="wp-caption alignnone">[<img class="size-full wp-image-5137" src="http://stealthpuppy.com/wp-content/uploads/2016/08/rootCASettingCRLPublishingInterval.png" alt="Setting the CRL Publication Interval on the Root CA" width="968" height="570" srcset="http://192.168.0.89/wp-content/uploads/2016/08/rootCASettingCRLPublishingInterval.png 968w, http://192.168.0.89/wp-content/uploads/2016/08/rootCASettingCRLPublishingInterval-150x88.png 150w, http://192.168.0.89/wp-content/uploads/2016/08/rootCASettingCRLPublishingInterval-300x177.png 300w, http://192.168.0.89/wp-content/uploads/2016/08/rootCASettingCRLPublishingInterval-768x452.png 768w" sizes="(max-width: 968px) 100vw, 968px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/rootCASettingCRLPublishingInterval.png)<figcaption id="caption-attachment-5137" class="wp-caption-text">Setting the CRL Publication Interval on the Root CA</figcaption></figure>

Now publish a new CRL &#8211; right-click the **Revoked Certificates** node and click **All Tasks** / **Publish**.

<figure id="attachment_5149" aria-describedby="caption-attachment-5149" style="width: 968px" class="wp-caption alignnone">[<img class="size-full wp-image-5149" src="http://stealthpuppy.com/wp-content/uploads/2016/09/RootCAPublishingNewCRL.png" alt="Publishing a new CRL from the Root CA" width="968" height="570" srcset="http://192.168.0.89/wp-content/uploads/2016/09/RootCAPublishingNewCRL.png 968w, http://192.168.0.89/wp-content/uploads/2016/09/RootCAPublishingNewCRL-150x88.png 150w, http://192.168.0.89/wp-content/uploads/2016/09/RootCAPublishingNewCRL-300x177.png 300w, http://192.168.0.89/wp-content/uploads/2016/09/RootCAPublishingNewCRL-768x452.png 768w" sizes="(max-width: 968px) 100vw, 968px" />](http://stealthpuppy.com/wp-content/uploads/2016/09/RootCAPublishingNewCRL.png)<figcaption id="caption-attachment-5149" class="wp-caption-text">Publishing a new CRL from the Root CA</figcaption></figure>

Copy the updated CRL (from _C:\Windows\System32\certsrv\CertEnroll_ by default) from the Root CA to the CRL distribution point and overwrite the existing CRL file (_C:\Windows\System32\certsrv\CertEnroll_&nbsp;again on my subordinate CA).

Now if we again use certutil.exe to verify the CRL, it comes up roses:

<figure id="attachment_5150" aria-describedby="caption-attachment-5150" style="width: 837px" class="wp-caption alignnone">[<img class="size-full wp-image-5150" src="http://stealthpuppy.com/wp-content/uploads/2016/09/verifiedCRL.png" alt="Viewing the verified CRL with certutil.exe" width="837" height="507" srcset="http://192.168.0.89/wp-content/uploads/2016/09/verifiedCRL.png 837w, http://192.168.0.89/wp-content/uploads/2016/09/verifiedCRL-150x91.png 150w, http://192.168.0.89/wp-content/uploads/2016/09/verifiedCRL-300x182.png 300w, http://192.168.0.89/wp-content/uploads/2016/09/verifiedCRL-768x465.png 768w" sizes="(max-width: 837px) 100vw, 837px" />](http://stealthpuppy.com/wp-content/uploads/2016/09/verifiedCRL.png)<figcaption id="caption-attachment-5150" class="wp-caption-text">Viewing the verified CRL with certutil.exe</figcaption></figure>

To ensure that the subordinate CA&#8217;s certification authority service will start, re-enable CRL checking:

<pre class="prettyprint lang-plain_text" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">certutil –setreg ca\CRLFlags -CRLF_REVCHECK_IGNORE_OFFLINE</pre>

If you have re-published the CRL from the Root CA correctly, the service should start and you can then shut down the Root CA. Then open Outlook and put a reminder in the calendar for a week before the CRL expires again.

# Conclusion

I&#8217;ve had this issue with an Offline CRL&nbsp;a few times now and not really understood what the issue is until I took the time to troubleshoot the issue properly. I don&#8217;t spend that much time with an enterprise PKI and it&#8217;s easy to underestimate&nbsp;the complexity of setting up AD Certificate Services correctly.

This same issue has also caused me headaches with a [Network Device Enrollment Service](http://social.technet.microsoft.com/wiki/contents/articles/9063.network-device-enrollment-service-ndes-in-active-directory-certificate-services-ad-cs.aspx) (NDES) deployment for issuing certificates to devices via Intune. The expired CRL has caused the NDES service to not start and the events logged do not mention in any way, an expired CRL.