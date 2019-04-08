---
id: 306
title: 'Diary of an Exchange 2007 Upgrade: Part 5'
date: 2007-06-06T16:12:23+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/diary-of-an-exchange-2007-upgrade-part-5
permalink: /diary-of-an-exchange-2007-upgrade-part-5/
categories:
  - Microsoft
tags:
  - Certificates
  - Exchange
---
<img border="0" align="left" width="82" src="http://stealthpuppy.com/wp-content/uploads/2007/06/exchange.png" height="82" style="width: 82px; height: 82px" />Dear Diary,

Since I've got the CCR cluster running I've run some performance tests with [JetStress](http://www.microsoft.com/downloads/info.aspx?na=22&p=2&SrcDisplayLang=en&SrcCategoryId=&SrcFamilyId=&u=%2fdownloads%2fdetails.aspx%3fFamilyID%3d73dfe056-0900-4dbb-b14a-0932338cecac%26DisplayLang%3den) to get an idea of how the disk subsytem will cope. I ran a 24 hour test with 6 databases of 60 GB each. JetStress has returned the tests with a pass. The test resulted in an average CPU usage of 25%, a little over 4GB of free RAM and disk stats looks fine as well, so I think the sizing of the servers has gone well. If network becomes an issue we can add a second adapter to each server to increase performance. Here's the [output from the JetStress](http://stealthpuppy.com/wp-content/uploads/2007/06/jetstress.htm) test to get an idea of how this system looks.

I have also installed an internal PKI installation to [provide certificates for some of the Exchange roles](http://technet.microsoft.com/en-us/library/bb266978.aspx), replacing the certificates generated during Exchange setup. The PKI installation involved installing an Enterprise Root Certificate Authority in the parent domain and a Subordinate Enterprise Certificate Authority in the sub-domain containing the user accounts and resources including the Exchange servers. The subordinate CA is being used to assign certificates, whilst the root CA will only be used to assign certificates to subordinate CAs. 

Applying certificates to particular roles in Exchange 2007 is a fairly simple process with the new Exchange Management Shell. This can be done in a two part process. First find the thumbprint of the applicable certificate (details have been changed to protect the innocent):

<p class="console">
  [PS] C:>dir cert:LocalMachineMy | flSubject      : CN=smaug1.corp.company.local<br /> Issuer       : CN=Company Subordinate Enterprise CA, DC=corp, DC=company, DC=local<br /> Thumbprint   : A9FA90232D2F334BE633FE99295A3528687160B2<br /> FriendlyName :<br /> NotBefore    : 05/06/2007 13:27:48<br /> NotAfter     : 04/06/2008 13:27:48<br /> Extensions   : {System.Security.Cryptography.Oid, System.Security.Cryptography.<br />                Oid, System.Security.Cryptography.Oid, System.Security.Cryptogra<br />                phy.Oid, System.Security.Cryptography.Oid, System.Security.Crypt<br />                ography.Oid, System.Security.Cryptography.Oid, System.Security.C<br />                ryptography.Oid}
</p>

Then using the thumbprint, we can assign this certificate to a number of roles on the CAS servers:

<p class="console">
  [PS] enable-ExchangeCertificate -thumbprint A9FA90232D2F334BE633FE99295A3528687160B2 -services "IIS,IMAP,POP"
</p>

I have also installed anti-virus software (McAfee GroupShield and VirusScan), there were no surprises there, the installation was straight-forward. Tomorrow we will be installing and configuring CommVault Galaxy for backup and restore. The challenge here will be understanding how this works in a CCR environment.

Mail flow, internal and external to the organisation, and free/busy data has been tested successfully. I'm now testing Outlook Web Access to ensure users don't miss out on one of their favourite tools during the migration of mailboxes. More soon.