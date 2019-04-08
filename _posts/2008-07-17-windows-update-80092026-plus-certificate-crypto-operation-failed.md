---
id: 604
title: Windows Update 80092026 plus Certificate Crypto Operation Failed
date: 2008-07-17T18:21:28+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/general/windows-update-80092026-plus-certificate-crypto-operation-failed
permalink: /windows-update-80092026-plus-certificate-crypto-operation-failed/
categories:
  - Microsoft
tags:
  - Certificates
  - Windows-Update
---
Ok, two separate issues but here, but fixed the same way. First up is Windows Update reporting:

> Windows could not search for new updates  
> Error(s) found: Code 80092026

[<img title="Windows Update 2" src="http://stealthpuppy.com/wp-content/uploads/2008/07/windowsupdate2-thumb.png" border="0" alt="Windows Update 2" width="545" height="374" />](http://stealthpuppy.com/wp-content/uploads/2008/07/windowsupdate2.png)

Then un-related to Windows Update, a code-signing certificate issued from an internal certificate authority, reporting:

> The cryptographic operation failed due to a local security option setting

[<img title="Certificate" src="http://stealthpuppy.com/wp-content/uploads/2008/07/certificate-thumb.png" border="0" alt="Certificate" width="335" height="415" />](http://stealthpuppy.com/wp-content/uploads/2008/07/certificate.png)

Both issues fixed by deleting the following registry key:

[code]HKLM\SOFTWARE\Policies\Microsoft\SystemCertificates\TrustedPublisher\Safer[/code]

I’m unsure of what the cause is, presumably it’s got something to do with the way Windows Vista handles [certificate revocation and status checking](http://technet.microsoft.com/en-us/library/bb457027.aspx).