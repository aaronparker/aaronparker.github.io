---

title: Turning Off AutoComplete on a Logon Point
date: 2006-09-06T16:26:00+10:00
author: Aaron Parker
layout: post

permalink: /turning-off-autocomplete-on-a-logon-point/
categories:
  - Citrix
tags:
  - Access-Gateway
---
I went looking for this last week and just couldn't find it. Well Sam Johnston [has let us know how it's done](http://citrite.org/blogs/samj/2006/09/06/autocomplete-and-access-gateway/trackback/). If you want to stop the browser from offering to save your username and password when logging into the Access Gateway, follow these steps on your Advanced Access Control servers:

  1. Open `BASEPAGE.ASPX` in the target Logon Point: `C:\INETPUB\WWWROOT\CitrixLogonPoint\<LogonPoint>\BASEPAGE.ASPX`
  2. At about line 61 you will find the following code: `<form id="pageForm" runat="server">`
  3. Change this to: `<form id="pageForm" runat="server" autocomplete="off">`
  4. Save the changes and refresh the Logon Point in the Access Suite Console

Apparently this change will make it into "future releases of the product" - it's not in the current beta of AAC 4.5. It's great that Citrix is making this change, but should this not have already been the default configuration?
