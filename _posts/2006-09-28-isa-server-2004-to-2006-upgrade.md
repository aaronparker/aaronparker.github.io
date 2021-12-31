---
id: 177
title: ISA Server 2004 to 2006 Upgrade
date: 2006-09-28T04:15:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/isa-server-2004-to-2006-upgrade
permalink: /isa-server-2004-to-2006-upgrade/
categories:
  - Microsoft
tags:
  - ISA Server
---
I upgraded our firewall a couple of days ago from ISA Server 2004 to ISA Server 2006, which went fairly smoothly with the actual setup routine only taking about 5 minutes to complete. However, after the upgrade there were a couple of items required some configuration changes:

**1. Published Public Web Sites** 

Access to unauthenticated web sites was being blocked and displaying the following error in the browser:

> Error Code: 403 Forbidden. ISA Server is configured to block HTTP requests that require authentication. (12250)

Which looked like this in the browser:

<img border="1" src="{{site.baseurl}}/media/2006/09/1000.14.124.403Forbidden.png" /> 

<a target="_blank" href="http://www.trustedaccess.info/photos/images/images/124/original.aspx"></a>

The standard configuration for publishing public web sites via ISA Server 2004 would be to disable any authentication methods via the web listener and this is still the case with ISA Server 2006 (although performed a little differently). However ISA Server 2006 provides new authentication delegation options as well as rejecting authentication over HTTP by default. Authentication delegation in ISA Server 2006 allows you to specify other authentication types than just Basic auth. In a web publishing scenario where the published site does not use authentication there are two ways to stop this prompt: 1. On the rule, the Authentication Delegation option must be set to 'No delegation, and client cannot authenticate directly' or 2. On the web listener click the Advanced button on the Authentication tab and enable 'Allow client authentication over HTTP'. Here's a view of the Authentication Delegation tab (click for a larger view):

![]({{site.baseurl}}/media/2006/09/1000.14.125.AuthenticationDelegation.png) 

**2. Routing and Remote Access** 

The Routing and Remote Access configuration was hosed and the service was actually un-configured. To renable this configuration I opened the VPN configuration properties, reset it, then applied the configuration. I then also had to re-add our pre-existing DHCP Relay configuration as well. (We have a couple of quarantined subnets to which the ISA Server relays DHCP addresses)