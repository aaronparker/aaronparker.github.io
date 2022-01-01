---

title: Access Gateway and Certificate Revocation Lists
date: 2006-08-30T22:27:00+10:00
author: Aaron Parker
layout: post

permalink: /access-gateway-and-certificate-revocation-lists/
views:
  - "1"
categories:
  - Citrix
tags:
  - Access-Gateway
---
Citrite Sam Johnston has posted about Certificate Revocation List retrieval by the Access Gateway. I've not had this issue myself, but I'll have to keep an eye out for it.

> The Citrix Access Gateway (CAG) has been known to have problems retrieving Certificate Revocation Lists (CRLs), which is an important stage in the SSL/TLS handshake (similar to having an accounts database but not checking the disabled flag). Currently the CAG only supports HTTP (LDAP is unsupported) but the built in user agent is fairly fussy about the server hosting the CRL. I had previously dealt with an issue where CRL retrieval would fail if the optional Content-Length HTTP header was not set (this was TT23747, which is set to appear in the next major release and which is available as a private from Citrix Technical Support in the mean time), and now a new one has been reported which relates to the HTTP version used. Specifically, the user agent is sending a GET request in HTTP/1.0 which lacks the HTTP Host: header. This is required for virtual hosting and is used by the web server to determine which content to serve. The fix is for us to send the Host: header and the workaround is to not require Host: headers in your web server configuration which may mean moving the CRL to the default site or dedicating an IP. This is being tracked as TT23822 and a private fix should be available soon.

[Access Gateway and Certificate Revocation Lists](http://citrite.org/blogs/samj/2006/08/15/access-gateway-and-certificate-revocation-lists-crls/)