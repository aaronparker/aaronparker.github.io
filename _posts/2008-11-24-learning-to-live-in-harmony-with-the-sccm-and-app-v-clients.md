---
id: 817
title: Learning to live in harmony with the SCCM and App-V Clients
date: 2008-11-24T23:18:37+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/learning-to-live-in-harmony-with-the-sccm-and-app-v-clients
permalink: /learning-to-live-in-harmony-with-the-sccm-and-app-v-clients/
dsq_thread_id:
  - "195381277"
categories:
  - Microsoft
tags:
  - App-V
  - SCCM
---
[Ment van der Plas](http://desktopcontrol.blogspot.com/) posted yesterday at the SoftGridBlog about what happens when the [SCCM and the App-V client co-exist](http://www.softgridblog.com/?p=97). Given that the SoftGridBlog doesn’t accept comments, here’s an extended reply to Ment’s post.

If you are deploying both SCCM and App-V in your environment, you will need to be aware of the interaction between the two clients. SCCM 2007 R2 [supports virtualised applications](http://technet.microsoft.com/en-us/library/cc161873.aspx) and can deliver them via streaming or as a complete package much like installed applications are deployed (the App-V client is still required to execute the virtual apps). Using SCCM 2007 R2 to deliver your virtualised applications allows you to take advantage of the SCCM software distribution features such as centralised management, distribution points for automatically replicating packages around your network and BITS for trickle feeding application packages to clients.

However, in this scenario, SCCM takes over the role of the Management or Streaming Servers in App-V and becomes the _only_ distribution method for your virtual applications. So you will need to plan [SCCM/App-V integration](http://technet.microsoft.com/en-us/library/cc161957.aspx) carefully.

Ment’s post goes into detail about the changes to the client when the SCCM handles virtualised applications but here’s what turns the behaviour on:

<img style="display: inline" title="AllowVirtualApplicationPackageAdverisement" border="0" alt="AllowVirtualApplicationPackageAdverisement" src="https://stealthpuppy.com/media/2008/11/allowvirtualapplicationpackageadverisement.png" width="404" height="448" /> 

To get there open the ConfigMgr Console, expand _Site Database_, _Site Management_, _<Site Name>_, _Site Settings_, _Client Agents_; then open the properties for _Advertised Programs Client Agent_. If you enable the option _Allow virtual application package advertisement_ option, the SCCM client will become the default handler for virtual applications. You can see that in the registry settings that Ment has documented.

This is site specific, so depending on how you configure SCCM, you could have a mix of clients receiving virtual applications from either SCCM or the App-V Management Server.

Fortunately, if someone turns this option on by mistake, it is reversible – just remove the tick and when the clients next refresh (or if you kick off a Machine Policy Retrieval & Evaluation Cycle), the App-V client will become the default handler again.