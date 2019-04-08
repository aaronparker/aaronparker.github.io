---
id: 159
title: ISA Server 2006 and LDAP Authentication
date: 2006-11-07T07:18:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/isa-server-2006-and-ldap-authentication
permalink: /isa-server-2006-and-ldap-authentication/
categories:
  - Microsoft
tags:
  - ISA Server
---
ISAServer.org has an excellent four part tutorial on using LDAP to pre-authenticate Outlook Web Access. You can find them here:

  * Â [LDAP Pre-authentication with ISA 2006 Firewalls: Using LDAP to Pre-authenticate OWA Access (Part 1)](http://www.isaserver.org/tutorials/LDAP-Pre-authentication-ISA-2006-Firewalls-Part1.html)
  * Â [LDAP Pre-authentication with ISA 2006 Firewalls: Using LDAP to Pre-authenticate OWA Access (Part 2)](http://www.isaserver.org/tutorials/LDAP-Pre-authentication-ISA-2006-Firewalls-Part2.html)
  * Â [LDAP Pre-authentication with ISA 2006 Firewalls: Using LDAP to Pre-authenticate OWA Access (Part 3)](http://www.isaserver.org/tutorials/LDAP-Pre-authentication-ISA-2006-Firewalls-Part3.html)
  * Â [LDAP Pre-authentication with ISA 2006 Firewalls: Using LDAP to Pre-authenticate OWA Access (Part 4)](http://www.isaserver.org/tutorials/LDAP-Pre-authentication-ISA-2006-Firewalls-Part4.html)

This is an excellent feature of ISA Server 2006 because it allows scenarios whereby ISA Server cannot be the edge firewall for whatever reason and is placed in the DMZ instead. LDAP allows for ISA Server to authentcate against Active Directory without the server being a member of the domain. However, once you configure LDAP authentication you cannot then use [additional authentication methods](http://www.trustedaccess.info/blogs/microsoft/archive/2006/09/29/Strengthening-OWA-Authentication-with-ISA-2006-and-RSA-SecurID-.aspx) such as RADIUS OTP and RSA SecurID. You can see this on the web listener Authentication tab, once you select the option to 'Collect additional delegation credentials in the form', LDAP is no longer selectable.

<a target="_blank" href="http://www.trustedaccess.info/photos/images/images/176/original.aspx"><img border="0" src="http://stealthpuppy.com/wp-content/uploads/2006/11/1000.14.176.WebListener.png" /></a>

I think that this is a bit of an oversight by the ISA Server team so it would be great to get this feature into an ISA Server 2006 Service Pack or the next version of ISA Server (2008, codename Nitrogen). If this is a feature that you might find compelling you can get feature requests into Micrsoft through their partners (if your aren't one yourself) or look out for the next ISA Server beta when it pops up on [Microsoft Connect](http://connect.microsoft.com/).