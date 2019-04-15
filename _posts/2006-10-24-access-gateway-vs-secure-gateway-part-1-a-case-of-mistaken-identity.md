---
id: 161
title: 'Access Gateway vs. Secure Gateway Part 1: A Case of Mistaken Identity'
date: 2006-10-24T05:29:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/access-gateway-vs-secure-gateway-part-1-a-case-of-mistaken-identity
permalink: /access-gateway-vs-secure-gateway-part-1-a-case-of-mistaken-identity/
categories:
  - Citrix
tags:
  - Access-Gateway
  - Authentication
  - Secure-Gateway
---
Before I go into what I actually want to talk about, here's a high level overview of the differences (and similarities) between the Access Gateway and Secure Gateway:

Now that we've got that out of the way - there's a discussion I tend to have with sales or customers on a semi-regular basis that revolves around the idea that the Access Gateway is somehow more secure than the Secure Gateway - "if we implement the Access Gateway our remote access will be secure". I don't really understand how this thinking came about, but it is probably rooted in the fact that the [Access Gateway is an appliance](http://www.brianmadden.com/content/content.asp?ID=558) and Secure Gateway runs on a Windows Server. It also helps that the Access Gateway sells more licensing and sales loves anything that sells more licenses.

In some respects this thinking around security could be true, because the Access Gateway runs a cut-down Linux kernel and is pre-hardened for its' role as a remote access device and therefore should have a smaller attack surface than a Windows Server running Secure Gateway. Although any attack on the operating system would only occur via a vulnerability in the [Access Gateway](http://secunia.com/product/6168/) or Secure Gateway/Web Interface code. However that's not what an attacker is interested in. They're interested in the soft and squishy inside of the corporate network and there are easier ways of getting in than compromising a box in the DMZ.

The decision on which Gateway product to implement should be solely based on feature set, but there is a far more important question that should be asked before your budget is committed to either: _How do we prove the users' identity?_

By default the only method of authentication that the Access Gateway and Secure Gateway<sup>1</sup> offer is a combination of username and password. These alone cannot guarantee the identity of the user attempting to gain access. If username and password were compromised, how would the user know that they had been compromised and how could the administrator prove that the user accessing the system is the actual authorised person? As the administrator, we could attempt a couple of things:

  1. Implement a strong password policy in the organisation;
  2. Restrict which machines users access the system from.

Neither of these options will work, because the business generally requires that users have access from anywhere and as soon as we allow access from un-trusted or unmanaged machines (even users home machines), we have to contend with key loggers or shoulder surfing. Social engineering also provides an avenue for compromise €“ users don't understand the value in keeping usernames and passwords secure and we don't do a very good job of helping them understand. Now what if authentication relied on something that the user could physically hold in their hand, something that helped to identify the user and something the user will see the value in protecting? If they lose the device, they lose access to the system. Adding two-factor authentication by implementing a one-time password (OTP) solution that uses physical tokens, allows us to do just that.

Out of the box, the Access Gateway and Secure Gateway/Web Interface support OTP solutions from RSA ([SecurID](http://www.rsasecurity.com/node.asp?id=1156)) and Secure Computing ([SafeWord)](http://www.securecomputing.com/index.cfm?skey=21). The Access Gateway provides support for other solutions such as [VeriSign Unified Authentication](http://www.verisign.com/products-services/security-services/unified-authentication/index.html) (VeriSign also provide integration into Web Interface) and [Swivel PINSafe](http://www.swivelsecure.com/?page=principlesofpinsafe) (this solution uses your mobile phone as the token). These products are not limited to integrating with Citrix products, we can also use them to authenticate users in other scenarios such as IPSec VPNs or [Outlook Web Access]({{site.baseurl}}/isa-server/strengthening-owa-authentication-with-isa-2006-and-rsa-securid). I recommend that identity and authentication take a front seat when considering any of these scenarios.

Citrix provides some great solutions for remote access, however if we don't implement a way to identify users using strong authentication, we're also providing the bad guy a great solution for remote access too.

<sup>1</sup> Web Interface is actually handling the authentication request in a Secure Gateway scenario.