---
id: 187
title: Turning Off AutoComplete on a Logon Point
date: 2006-09-06T16:26:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/turning-off-autocomplete-on-a-logon-point
permalink: /turning-off-autocomplete-on-a-logon-point/
categories:
  - Citrix
tags:
  - Access-Gateway
---
I went looking for this last week and just couldn&#8217;t find it. Well Sam Johnston [has let us know how it&#8217;s done](http://citrite.org/blogs/samj/2006/09/06/autocomplete-and-access-gateway/trackback/). If you want to stop the browser from offering to save your username and password when logging into the Access Gateway, follow these steps on your Advanced Access Control servers:

  1. Open BASEPAGE.ASPX in the target Logon Point: \INETPUB\WWWROOT\CitrixLogonPoint\<LogonPoint>\BASEPAGE.ASPX
  2. At about line 61 you will find the following code: <font face="courier new,courier"><form id=&#8221;pageForm&#8221; runat=&#8221;server&#8221;></font>
  3. Change this to: <font face="courier new,courier"><form id=&#8221;pageForm&#8221; runat=&#8221;server&#8221; autocomplete=&#8221;off&#8221;></font>
  4. Save the changes and refresh the Logon Point in the Access Suite Console

Apparently this change will make it into &#8220;future releases of the product&#8221; &#8211; it&#8217;s not in the current beta of AAC 4.5. It&#8217;s great that Citrix is making this change, but should this not have already been the default configuration?