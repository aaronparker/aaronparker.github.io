---

title: Windows Update 80092026 plus Certificate Crypto Operation Failed
date: 2008-07-17T18:21:28+10:00
author: Aaron Parker
layout: post

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

![Windows Update]({{site.baseurl}}/media/2008/07/windowsupdate2.png)

Then un-related to Windows Update, a code-signing certificate issued from an internal certificate authority, reporting:

> The cryptographic operation failed due to a local security option setting

![Certificate]({{site.baseurl}}/media/2008/07/certificate.png)

Both issues fixed by deleting the following registry key:

```cmd
HKLM\SOFTWARE\Policies\Microsoft\SystemCertificates\TrustedPublisher\Safer
```

I’m unsure of what the cause is, presumably it’s got something to do with the way Windows Vista handles [certificate revocation and status checking](http://technet.microsoft.com/en-us/library/bb457027.aspx).
