---

title: AAC 4.2 and Swivel PINsafe
date: 2006-10-10T05:47:00+10:00
author: Aaron Parker
layout: post

permalink: /aac-42-and-swivel-pinsafe/
categories:
  - Citrix
tags:
  - Access-Gateway
---
If you are looking to integrate the [Swivel PINsafe](http://www.swivelsecure.com/?page=products) one time password (OTP) authentication system into Advanced Access Control 4.2 you'll find that it's not going to work out of the box. You will see the following authentication packet sequence once you have configured PINsafe as a RADIUS profile within AAC and attempt to authenticate:

  1. AAC sends a RADIUS Access-Request with the users credentials
  2. PINsafe sends back a RADIUS Access-Accept
  3. AAC sends a RADIUS Access-Request
  4. PINsafe sends back a RADIUS Access-Reject (the credentials are now invalid as the password can only be used once)
  5. AAC sends a RADIUS Access -Request
  6. PINsafe sends back a RADIUS Access -Reject
  7. AAC sends a RADIUS Access -Request
  8. PINsafe sends back a RADIUS Access -Reject

This is because Advanced Access Control is not handling the RADIUS Message-Authenticator attribute correctly. Well good news, Citrix have created a private hotfix which I was able to test out earlier this afternoon and authentication is now working successfully. This hotfix replaces **Citrix.AuthenticationService.RADIUSClient.dll** and you will have to call Citrix to get a copy of the file. Quote case number 31367637 as a reference if required.

Now the next thing for me to do is test this fix out with integrating [Vasco DIGIPASS](http://www.vasco.com/products/range.html) authentication with Advanced Access Control, which I've seen having the same issues.

UPDATE: ~~Unfortunately this fix hasn't make it in time for the 4.5 release of Advanced Access Control. Once you upgrade to 4.5 you may have to request an updated fix.~~ Apparently this fix or an equivalent has made it into Advanced Access Control 4.5. Graham from Swivel has tested with PINsafe sucessfully with AAC 4.5.
