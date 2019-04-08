---
id: 184
title: Access Gateway Traffic Flow Diagram
date: 2006-09-13T01:22:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/access-gateway-traffic-flow-diagram
permalink: /access-gateway-traffic-flow-diagram/
categories:
  - Citrix
tags:
  - Access-Gateway
---
I've put together a diagram detailing the flow of IP traffic between the different components of an Access Gateway with Advanced Access Control implementation. This is designed to give everyone involved in implementation of the Access Gateway an understanding of each component and the communication required between each host. This diagram details these components:

  * Access Gateway with a single connected NIC in the Perimeter/DMZ network for relaying connections into the Internal network
  * Advanced Access Control in the Internal network to control access to internal resources. This could be multiple or a single AAC server
  * Applications published on a Presentation Server farm
  * Active Directory domain controllers for domain authentication
  * Strong authentication with a two-factor authentication solution
  * Internal DNS servers to allow the Access Gateway to resolve names for internal hosts
  * Certificate Revocation Lists (from internal or external CAs) to ensure all presented certificates are valid

These components form the most basic requirements for an Access Gateway implementation. What is missing from the diagram, however, is an extra ports that would be required to be open for use with an SSL VPN connection. These will vary for each implementation depending on what resources users requires access to.

In this particular diagram the network consists of a single, tri-homed firewall with the Perimeter/DMZ network using private IP addresses that are routed to the internal network. This configuration will keep firewall rules as simple as possible.

[<img style="display: inline; border: 0px;" title="AccessGatewayTrafficFlow" src="https://stealthpuppy.com/wp-content/uploads/2010/02/AccessGatewayTrafficFlow_thumb.png" alt="AccessGatewayTrafficFlow" width="660" height="370" border="0" />](https://stealthpuppy.com/wp-content/uploads/2010/02/AccessGatewayTrafficFlow.png)

(click for full size)