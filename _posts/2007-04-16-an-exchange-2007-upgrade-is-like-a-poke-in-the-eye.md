---
id: 64
title: An Exchange 2007 Upgrade Is Like a Poke in the Eye
date: 2007-04-16T08:26:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/an-exchange-2007-upgrade-is-like-a-poke-in-the-eye
permalink: /an-exchange-2007-upgrade-is-like-a-poke-in-the-eye/
dsq_thread_id:
  - "195378517"
categories:
  - Microsoft
tags:
  - Exchange
---
I've upgraded our internal Exchange organisation over the last week and I've got to say Exchange 2007 is a completely different ball game. Now for seasoned Exchange architects and administrators a lot of the Exchange 2007 upgrade process is probably not new, but for those of us who don't look after Exchange full time it's a steep learning curve. The biggest challenges for me have been around the new Exchange Management Shell. I think the implementation of PowerShell as the basis for all Exchange management is a good thing - there's nothing like being able to paste the exact command line into your change log. However there's been a couple of issue that I've got with Exchange 2007:

  1. The lack of detailed command line examples; and
  2. The stuff that's been removed from the GUI since Exchange 2003.

Here's an example. After upgrading to Exchange Server 2007, you need to upgrade the e-mail address policies. Now [upgrading the Default Policy](http://msexchangeteam.com/archive/2007/01/11/432158.aspx), this is straight-forward, this is done with the following command:

`Set-EmailAddressPolicy "Default Policy" -IncludedRecipients AllRecipients`

Note that command doesn't actually upgrade the policy, it recreates it. Why there isn't and upgrade option I don't know. So what happens when you want to "upgrade" a custom e-mail policy? Well you can use the wizard to create a new policy, but what do you do when you need to create a policy that uses a custom attribute (i.e. and LDAP query). In Exchange 2003 there was a nice GUI that you could use to construct the LDAP query:

![ExchangeRecipients]({{site.baseurl}}/media/2007/04/1000.14.1298.ExchangeRecipients.png)

Now in Exchange 2007 there is no query builder, instead you get just this:

![Exchange2007CustomAttribute]({{site.baseurl}}/media/2007/04/1000.14.1299.Exchange2007CustomAttribute.png)

Then check out the documentation on the [Set-EmailAddressPolicy](http://technet.microsoft.com/en-us/library/bb124517.aspx) command. There's actually no detail there about what a custom attribute is let alone a link to how to create one. How's that for a kick in the teeth?

So it looks like I'll be learning about it more about LDAP queries (or maybe just keeping an Exchange 2003 server around in VM instead). After a bit of digging I've found a few links about LDAP queries, but let's home Microsoft have something better in store for Exchange 2007 SP1.

  * [LDAP Query Basics](http://technet.microsoft.com/en-us/library/aa996205.aspx)
  * [How to write a LDAP search filter](http://confluence.atlassian.com/display/DEV/How+to+write+a+LDAP+search+filter)
  * [Softerra LDAP Administrator 3.4](http://www.ldapadministrator.com/info.htm) (This has some LDAP query functionality but I've only test the free version which doesn't have this functionality)

Even though I'm disappointed in the lack of clear documentation I am looking forward to being able to completely manage Exchange from the command line because deep down, I'm a command line kinda guy.
