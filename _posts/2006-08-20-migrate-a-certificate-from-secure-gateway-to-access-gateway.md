---
id: 215
title: Migrate a certificate from Secure Gateway to Access Gateway
date: 2006-08-20T23:44:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/migrate-a-certificate-from-secure-gateway-to-access-gateway
permalink: /migrate-a-certificate-from-secure-gateway-to-access-gateway/
categories:
  - Citrix
tags:
  - Access-Gateway
  - Secure-Gateway
---
This is listed in the [Access Gateway Administrators document](http://support.citrix.com/article/CTX107804), but it&#8217;s buried deep, so here&#8217;s my own version.

Many implementations of the Citrix Access Gateway appliance will be replacing existing installations of Citrix Secure Gateway usually running on a Windows server. To migrate the certificate from Windows to the appliance follow these steps:

  1. Download the Win32 version of OpenSSL from [SourceForge](http://gnuwin32.sourceforge.net/packages/openssl.htm)
  2. Extract the package to a folder e.g. C:\OPENSSL
  3. Export the certificate including the private key from the Windows server in PKCS12 format. This will require creating a password to protect the private key
  4. Convert the certifcate to PEM format using OpenSLL with the following command:<font face="Courier New" size="2">c:\openssl\bin\openssl pkcs12 -in <EXPORTED-CERTIFICATE>.pfx -out <NEWFORMAT-CERTIFICATE>.pem -nodes</font>
  5. You will be prompted for the password for the certificate
  6. Enter the password and the certificate will be converted to PEM format
  7. Upload the certificate to the Access Gateway

Either delete both certificate files or keep them in a secure location.

Also see the following Citrix article on this process:

[Convert PFX Certificate to PEM Format for Use with Citrix Access Gateway](http://support.citrix.com/article/entry.jspa?entryID=6147)