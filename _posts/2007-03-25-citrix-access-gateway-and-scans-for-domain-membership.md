---

title: Citrix Access Gateway and Scans for Domain Membership
date: 2007-03-25T00:23:00+10:00
author: Aaron Parker
layout: post

permalink: /citrix-access-gateway-and-scans-for-domain-membership/
categories:
  - Citrix
tags:
  - Access-Gateway
---
The Endpoint Analysis feature of Citrix Access Gateway Advanced allows you to scan the client machine for specific criteria before the user is allowed access to internal network resources. One of these scans is machine membership of your internal domain. When configuring this scan you specify the NetBIOS name of your domain and apply this scan to a logon point or filter.

The problem with this scan is that it does not prove that the machine is actually a member of your internal domain; it only proves that it is a member of a domain that matches the NetBIOS name of your domain. I've actually tested this out by creating a domain (e.g. company.internal) on a test machine that matches the NetBIOS name (e.g. COMPANY) of our production network (e.g. company.local). Connecting to and logging into a logon point that requires membership of the domain (COMPANY), works from a client machine that is a member of any domain named COMPANY.

What this highlights is that scans should only be used to assist in confirming the configuration of a client machine. So what should you be implementing to make your Access Gateway access more secure?

  1. Use more scans to determine the configuration of your client machines. Surely the more scans the better? The more you know about the client machine the better position you are in about deciding what level of access the user should receive. Check out [epafactory.com](http://www.epafactory.com/) for more scans.
  2. Use client certificates from an internal certificate authority to prove the identity of and authenticate a client machine.
  3. Use multi-factor authentication (e.g. RSA SecurID, SafeWord RemoteAccess etc). This is more important than anything else, usernames and passwords alone [aren't enough for authenticating users](http://www.stealthpuppy.com/blogs/travelling/archive/2006/10/24/Access-Gateway-vs-Secure-Gateway-and-a-case-of-mistaken-Identity.aspx).