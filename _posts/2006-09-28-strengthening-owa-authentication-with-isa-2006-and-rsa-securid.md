---
id: 175
title: Strengthening OWA Authentication with ISA 2006 and RSA SecurID
date: 2006-09-28T23:12:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/strengthening-owa-authentication-with-isa-2006-and-rsa-securid
permalink: /strengthening-owa-authentication-with-isa-2006-and-rsa-securid/
aktt_notify_twitter:
  - 'yes'
categories:
  - Microsoft
tags:
  - Authentication
  - Outlook-Web-Access
---
Now that Microsoft have released ISA Server 2006, we have [more authentication options](http://www.microsoft.com/technet/isa/2006/authentication.mspx) available to us. This includes the ability to add two-factor authentication solutions to the existing forms based authentication, traditionally used to authentication against Active Directory only. I have a previous post on how to protect [Outlook Web Access with RSA SecurID](http://www.trustedaccess.info/blogs/travelling/archive/2006/08/25/Protecting-Outlook-Web-Access-with-RSA-authentication.aspx), which discusses using the RSA Web Agent with IIS and RSA SecurID authentication with ISA Server 2004, however both of those options are a little clunky. Now with ISA Server 2006, we have a more elegant solution that allows us to integrate RSA SecurID directly into the forms authentication method. Assuming ISA Server is a domain member, here&#8217;s how to do it.

First off, I&#8217;ll discuss how SecurID authentication works in ISA Server. Microsoft have licensed the agent software from RSA and offered RSA SecurID authentication since ISA Server 2000 Feature Pack 1. This is built into the product and does not require a separate agent installation. As of ISA Server 2006, the SecurID agent version is 6.1.1.53. You can view the support DLLs in the ISA Server program folder (Program FilesMicrosoft ISA Server, aceclnt.dll, sdmsg.dll and sdui.dll).

To allow the ISA Server to authenticate against the RSA ACE server, an agent host record needs to be created (assuming a Windows box is hosting the ACE server):

  1. Log onto the RSA ACE server and start the Database Administration tool in Host Mode
  2. Add a new agent host and use &#8216;Net OS Agent&#8217; as the agent type
  3. Enable the tick-box labelled &#8216;Open to All Locally Known Users&#8217; if you want all users to be able to authenticate
  4. Click OK to save the changes and copy SDCONF.REC (located in <span style="font-size: 9pt; font-family: Courier New">WINDOWSSYSTEM32</span>) to ISA Server.

[<img style="width: 318px; height: 311px;" src="http://stealthpuppy.com/wp-content/uploads/2006/09/1000.14.127.AgentHost.gif" border="0" alt="" width="318" height="311" />](http://stealthpuppy.com/wp-content/uploads/2006/09/1000.14.127.AgentHost.gif)

Configuring SecurID support in ISA Server as a simple process:

  1. Copy SDCONF.REC to <span style="font-size: 9pt; font-family: Courier New">WINDOWSSYSTEM32.</span> The ISA Server help file says to put this file into the ISA Server program folder, but this worked fine for me in the SYSTEM32 folder.
  2. Ensure that the local account NETWORK SERVICE has Full Control to the following registry key: <span style="font-size: 9pt; font-family: Courier New">HKEY_LOCAL_MACHINESOFTWARESDTI</span>. This is so that ISA Server can write the secret to the registry.
  3. You may also need to add the **PrimaryInterfaceIP** string value to the registry under <span style="font-size: 9pt; font-family: Courier New">HKEY_LOCAL_MACHINESOFTWARESDTIACECLIENT</span> depending on your ISA Server configuration. The value must match that set in the agent host record.

You can test RSA SecurID authentication with the RSA Test Authentication utility available from the Microsoft web site. Download this utility and copy the extracted utility to the ISA Server program folder and execute from there (if you don&#8217;t you will receive an error).

[RSA Test Authentication Utility for Internet Security and Acceleration (ISA) Server 2006](http://www.microsoft.com/downloads/details.aspx?FamilyID=7b0ca409-55d0-4d33-bb3f-1ba4376d5737&DisplayLang=en)

Now that the SecurID authentication requirements have been configured you can create a web publishing rule to enable access to Outlook Web Access. This is a simple wizard driven interface (use the Exchange Web Client Access Publish Rule wizard) and is discussed in detail in ISAServer.org so I won&#8217;t go into detail here.

Once the rule and a corresponding web listener has been created, you will need to edit the properties of the web listener:

  1. Choose the Authentication tab and ensure that &#8216;HTML Form Authentication&#8217; is selected as the authentication method
  2. Enable the tick-box labelled &#8216;Collect additional delegation credentials in the form&#8217;
  3. Then select the radio button labelled &#8216;RSA SecurID&#8217;
  4. Click OK and apply your configuration changes.

<img style="width: 404px; height: 466px;" src="http://stealthpuppy.com/wp-content/uploads/2006/09/1000.14.128.WebListener.png" alt="" width="404" height="466" /> 

Now you should have three fields listed on the Outlook Web Access authentication page: username, token code and password. ISA Server also provides for a scenario where the RSA username and the Windows username are different, adding a forth field for a Windows username.

<img style="width: 468px; height: 389px;" src="http://stealthpuppy.com/wp-content/uploads/2006/09/1000.14.129.OWA.png" alt="" width="468" height="389" /> 

This is an excellent method of taking authentication that one step further to ensure only trusted users have access to your corporate resources. The same authentication options offered in ISA Server also allow for other two-factor authentication solutions via RADIUS OTP (One Time Password). With this option you could authenticate against Secure Computing&#8217;s [SafeWord PremierAccess](http://www.securecomputing.com/index.cfm?skey=643) or [Verisign&#8217;s Unified Authentication](http://www.verisign.com/products-services/security-services/unified-authentication/index.html) to provide two-factor authentication.

One thing to note about enabling RSA authentication on your OWA rule, if you also use this rule for ActiveSync, this will break ActiveSync. I have not looked into this further, but I would recommend creating a separate rule for ActiveSync using a second certificate.