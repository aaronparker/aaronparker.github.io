---
id: 164
title: Access Gateway 4.5 / Access Gateway Advanced 4.5 Released
date: 2006-10-17T16:45:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/access-gateway-45-access-gateway-advanced-45-released
permalink: /access-gateway-45-access-gateway-advanced-45-released/
categories:
  - Citrix
tags:
  - Access-Gateway
---
<p class="MsoNormal" style="margin: 0cm 0cm 10pt">
  <font face="verdana,geneva">According to </font><a href="http://citrite.org/blogs/samj/2006/10/17/access-gateway-advanced-45-released/"><u><font face="verdana,geneva">Sam Johnston</font></u></a><font face="verdana,geneva">, Access Gateway and Access Gateway Advanced Edition (Access Gateway with Advanced Access Control) 4.5 have been released as of last Friday 13<sup>th</sup> October. Check out Sam&#8217;s post for an excellent description of what to expect of the new version.</font>
</p>

> <p class="MsoNormal" style="margin: 0cm 0cm 10pt">
>   <font face="verdana,geneva">As many of you will by now know, Access Gateway and Access Gateway Advanced were released on Friday 13 October and can be downloaded from MyCitrix. Weâ€™ve set the Subscription Advantage date somewhat earlier than the release date (1 January 2006 if I recall correctly) which means that virtually everyone with an Access Gateway [Advanced] installation will be eligible to run this code. This is good because thereâ€™s a number of stability and scalability improvements that will be useful for all customers and it will allow us to focus our support resources on 4.5 (which is not to say that 4.2 will go unsupported, just that users will likely be encouraged to upgrade).</font>
> </p>

<p class="MsoNormal" style="margin: 0cm 0cm 10pt">
  <font face="verdana,geneva">I donâ€™t know how I missed this one, I think itâ€™s been slipped in under the radar and I think Sam means 1 January 2007. I donâ€™t seem to have access to it from the MyCitrix web site, but I no longer have access to the beta. So I&#8217;m yet to see the final 4.5 code.</font>
</p>

<p class="MsoNormal" style="margin: 0cm 0cm 10pt">
  <font face="verdana,geneva">There are quite a few changes in this version of the product with one of the most interesting is the removal of Access Centres. This means that there is no longer any of the </font><a href="http://citrite.org/blogs/jeffreymuir/2006/10/16/sequoia-acquisition/"><u><font color="#0000ff" face="verdana,geneva">Sequoia code</font></u></a><font face="verdana,geneva"> in the product. I would recommend </font><a href="http://support.citrix.com/article/CTX110409"><u><font face="verdana,geneva">migrating away from Access Centres</font></u></a><font face="verdana,geneva"> as soon as possible to the new Access Navigator interface.</font>
</p>

<p class="MsoNormal" style="margin: 0cm 0cm 10pt">
  <font face="verdana,geneva">Hereâ€™s a list of the feature changes in the Access Gateway and Advanced Access Control:</font>
</p>

<table class="MsoNormalTable" border="0" cellpadding="0">
  <tr>
    <td style="border: medium none #f0f0f0; padding: 0.75pt; background-color: transparent">
      <table class="MsoTableMediumShading1Accent1" style="border: medium none ; border-collapse: collapse" border="1" cellpadding="0" cellspacing="0">
        <tr>
          <td colspan="2" style="border: 1pt solid #7ba0cd; padding: 0cm 5.4pt; background: #4f81bd none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; color: white; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Access Gateway 4.5, Standard Edition</font></span></strong>
            </p>
          </td>
        </tr>
        
        <tr>
          <td style="border-style: none none solid solid; border-color: rgb(240, 240, 240) rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205); border-width: medium medium 1pt 1pt; padding: 0cm 5.4pt; background: #d3dfee none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Feature Name</font></span></strong>
            </p>
          </td>
          
          <td style="border-style: none solid solid none; border-color: rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205) rgb(240, 240, 240); border-width: medium 1pt 1pt medium; padding: 0cm 5.4pt; background: #d3dfee none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <font face="verdana,geneva"><strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'">Description</span></strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"></span></font>
            </p>
          </td>
        </tr>
        
        <tr>
          <td style="border-style: none none solid solid; border-color: rgb(240, 240, 240) rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205); border-width: medium medium 1pt 1pt; padding: 0cm 5.4pt; background-color: transparent">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Double-hop DMZ support</font></span></strong>
            </p>
          </td>
          
          <td style="border-style: none solid solid none; border-color: rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205) rgb(240, 240, 240); border-width: medium 1pt 1pt medium; padding: 0cm 5.4pt; background-color: transparent">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Matches capability in Secure Gateway; supports ICA traffic only</font></span>
            </p>
          </td>
        </tr>
        
        <tr>
          <td style="border-style: none none solid solid; border-color: rgb(240, 240, 240) rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205); border-width: medium medium 1pt 1pt; padding: 0cm 5.4pt; background: #d3dfee none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Licensing enhancements</font></span></strong>
            </p>
          </td>
          
          <td style="border-style: none solid solid none; border-color: rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205) rgb(240, 240, 240); border-width: medium 1pt 1pt medium; padding: 0cm 5.4pt; background: #d3dfee none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">License policy engine overhauled to fully enforce license file entitlements; license pooling revamped along with greater licensing visibility provided within Access Gateway Admin Console</font></span>
            </p>
          </td>
        </tr>
        
        <tr>
          <td style="border-style: none none solid solid; border-color: rgb(240, 240, 240) rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205); border-width: medium medium 1pt 1pt; padding: 0cm 5.4pt; background-color: transparent">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Portal page customization</font></span></strong>
            </p>
          </td>
          
          <td style="border-style: none solid solid none; border-color: rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205) rgb(240, 240, 240); border-width: medium 1pt 1pt medium; padding: 0cm 5.4pt; background-color: transparent">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Appliance portal page graphics, style sheets, and content can be fully customized</font></span>
            </p>
          </td>
        </tr>
        
        <tr>
          <td style="border-style: none none solid solid; border-color: rgb(240, 240, 240) rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205); border-width: medium medium 1pt 1pt; padding: 0cm 5.4pt; background: #d3dfee none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Inactivity timeouts</font></span></strong>
            </p>
          </td>
          
          <td style="border-style: none solid solid none; border-color: rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205) rgb(240, 240, 240); border-width: medium 1pt 1pt medium; padding: 0cm 5.4pt; background: #d3dfee none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Session, network inactivity, and system idle timeouts can be configured on a per-group basis</font></span>
            </p>
          </td>
        </tr>
        
        <tr>
          <td style="border-style: none none solid solid; border-color: rgb(240, 240, 240) rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205); border-width: medium medium 1pt 1pt; padding: 0cm 5.4pt; background-color: transparent">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Desktop sharing control</font></span></strong>
            </p>
          </td>
          
          <td style="border-style: none solid solid none; border-color: rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205) rgb(240, 240, 240); border-width: medium 1pt 1pt medium; padding: 0cm 5.4pt; background-color: transparent">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">The ability to share desktops can be controlled on a per-group basis</font></span>
            </p>
          </td>
        </tr>
        
        <tr>
          <td style="border-style: none none solid solid; border-color: rgb(240, 240, 240) rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205); border-width: medium medium 1pt 1pt; padding: 0cm 5.4pt; background: #d3dfee none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Kiosk mode control</font></span></strong>
            </p>
          </td>
          
          <td style="border-style: none solid solid none; border-color: rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205) rgb(240, 240, 240); border-width: medium 1pt 1pt medium; padding: 0cm 5.4pt; background: #d3dfee none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Kiosk mode is now disabled by default; can be controlled on a global basis</font></span>
            </p>
          </td>
        </tr>
        
        <tr>
          <td style="border-style: none none solid solid; border-color: rgb(240, 240, 240) rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205); border-width: medium medium 1pt 1pt; padding: 0cm 5.4pt; background-color: transparent">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Update serial console menu</font></span></strong>
            </p>
          </td>
          
          <td style="border-style: none solid solid none; border-color: rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205) rgb(240, 240, 240); border-width: medium 1pt 1pt medium; padding: 0cm 5.4pt; background-color: transparent">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">New options for configuring appliance parameters directly from the serial port</font></span>
            </p>
          </td>
        </tr>
        
        <tr>
          <td style="border-style: none none solid solid; border-color: rgb(240, 240, 240) rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205); border-width: medium medium 1pt 1pt; padding: 0cm 5.4pt; background: #d3dfee none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Authentication enhancements</font></span></strong>
            </p>
          </td>
          
          <td style="border-style: none solid solid none; border-color: rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205) rgb(240, 240, 240); border-width: medium 1pt 1pt medium; padding: 0cm 5.4pt; background: #d3dfee none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">New authentication support for Windows NT domains and RADIUS challenge-response; SafeWord authentication support overhauled</font></span>
            </p>
          </td>
        </tr>
        
        <tr>
          <td style="border-style: none none solid solid; border-color: rgb(240, 240, 240) rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205); border-width: medium medium 1pt 1pt; padding: 0cm 5.4pt; background-color: transparent">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Hosts file configuration</font></span></strong>
            </p>
          </td>
          
          <td style="border-style: none solid solid none; border-color: rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205) rgb(240, 240, 240); border-width: medium 1pt 1pt medium; padding: 0cm 5.4pt; background-color: transparent">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">The appliance hosts file can be configured using the Access Gateway Admin Console</font></span>
            </p>
          </td>
        </tr>
        
        <tr>
          <td style="border-style: none none solid solid; border-color: rgb(240, 240, 240) rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205); border-width: medium medium 1pt 1pt; padding: 0cm 5.4pt; background: #d3dfee none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Network resource enhancements</font></span></strong>
            </p>
          </td>
          
          <td style="border-style: none solid solid none; border-color: rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205) rgb(240, 240, 240); border-width: medium 1pt 1pt medium; padding: 0cm 5.4pt; background: #d3dfee none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Port ranges and the ICMP protocol can now be configured within a network resource</font></span>
            </p>
          </td>
        </tr>
        
        <tr>
          <td style="border-style: none none solid solid; border-color: rgb(240, 240, 240) rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205); border-width: medium medium 1pt 1pt; padding: 0cm 5.4pt; background-color: transparent">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Security enhancements</font></span></strong>
            </p>
          </td>
          
          <td style="border-style: none solid solid none; border-color: rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205) rgb(240, 240, 240); border-width: medium 1pt 1pt medium; padding: 0cm 5.4pt; background-color: transparent">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Private key and digital certificate management overhauled</font></span>
            </p>
          </td>
        </tr>
        
        <tr>
          <td style="border-style: none none solid solid; border-color: rgb(240, 240, 240) rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205); border-width: medium medium 1pt 1pt; padding: 0cm 5.4pt; background: #d3dfee none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">New cryptographic support</font></span></strong>
            </p>
          </td>
          
          <td style="border-style: none solid solid none; border-color: rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205) rgb(240, 240, 240); border-width: medium 1pt 1pt medium; padding: 0cm 5.4pt; background: #d3dfee none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">AES encryption now supported; cryptographic algorithm support can be controlled by the administrator</font></span>
            </p>
          </td>
        </tr>
        
        <tr>
          <td style="border-style: none none solid solid; border-color: rgb(240, 240, 240) rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205); border-width: medium medium 1pt 1pt; padding: 0cm 5.4pt; background-color: transparent">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Port 80 to 443 auto-redirection</font></span></strong>
            </p>
          </td>
          
          <td style="border-style: none solid solid none; border-color: rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205) rgb(240, 240, 240); border-width: medium 1pt 1pt medium; padding: 0cm 5.4pt; background-color: transparent">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">HTTP requests to Access Gateway can be redirected to HTTPS over the specified SSL port</font></span>
            </p>
          </td>
        </tr>
        
        <tr>
          <td style="border-style: none none solid solid; border-color: rgb(240, 240, 240) rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205); border-width: medium medium 1pt 1pt; padding: 0cm 5.4pt; background: #d3dfee none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Client-side proxy auto-detection</font></span></strong>
            </p>
          </td>
          
          <td style="border-style: none solid solid none; border-color: rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205) rgb(240, 240, 240); border-width: medium 1pt 1pt medium; padding: 0cm 5.4pt; background: #d3dfee none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Secure Access client can auto-detect the client-side proxy and uses those settings to connect through to Access Gateway</font></span>
            </p>
          </td>
        </tr>
        
        <tr>
          <td style="border-style: none none solid solid; border-color: rgb(240, 240, 240) rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205); border-width: medium medium 1pt 1pt; padding: 0cm 5.4pt; background-color: transparent">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Password label configuration</font></span></strong>
            </p>
          </td>
          
          <td style="border-style: none solid solid none; border-color: rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205) rgb(240, 240, 240); border-width: medium 1pt 1pt medium; padding: 0cm 5.4pt; background-color: transparent">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">The labels used for the primary and secondary password fields can be configured</font></span>
            </p>
          </td>
        </tr>
        
        <tr>
          <td style="border-style: none none solid solid; border-color: rgb(240, 240, 240) rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205); border-width: medium medium 1pt 1pt; padding: 0cm 5.4pt; background: #d3dfee none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Improved support for VoIP softphones</font></span></strong>
            </p>
          </td>
          
          <td style="border-style: none solid solid none; border-color: rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205) rgb(240, 240, 240); border-width: medium 1pt 1pt medium; padding: 0cm 5.4pt; background: #d3dfee none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Avaya, Nortel, and Cisco VoIP softphones have been tested</font></span>
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  
  <tr>
    <td style="border: medium none #f0f0f0; padding: 0.75pt; background-color: transparent">
      <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
        <span style="font-size: 10pt; font-family: 'Times New Roman','serif'"></span>
      </p>
    </td>
  </tr>
  
  <tr>
    <td style="border: medium none #f0f0f0; padding: 0.75pt; background-color: transparent">
      <table class="MsoTableMediumShading1Accent1" style="border: medium none ; border-collapse: collapse" border="1" cellpadding="0" cellspacing="0">
        <tr>
          <td colspan="2" style="border: 1pt solid #7ba0cd; padding: 0cm 5.4pt; background: #4f81bd none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; color: white; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Access Gateway 4.5, Advanced Edition</font></span></strong>
            </p>
          </td>
        </tr>
        
        <tr>
          <td style="border-style: none none solid solid; border-color: rgb(240, 240, 240) rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205); border-width: medium medium 1pt 1pt; padding: 0cm 5.4pt; background: #d3dfee none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Feature Name</font></span></strong>
            </p>
          </td>
          
          <td style="border-style: none solid solid none; border-color: rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205) rgb(240, 240, 240); border-width: medium 1pt 1pt medium; padding: 0cm 5.4pt; background: #d3dfee none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <font face="verdana,geneva"><strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'">Description</span></strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"></span></font>
            </p>
          </td>
        </tr>
        
        <tr>
          <td style="border-style: none none solid solid; border-color: rgb(240, 240, 240) rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205); border-width: medium medium 1pt 1pt; padding: 0cm 5.4pt; background-color: transparent">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Double-hop DMZ support</font></span></strong>
            </p>
          </td>
          
          <td style="border-style: none solid solid none; border-color: rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205) rgb(240, 240, 240); border-width: medium 1pt 1pt medium; padding: 0cm 5.4pt; background-color: transparent">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Supports ICA and HTTP(s) traffic in double-hop configurations</font></span>
            </p>
          </td>
        </tr>
        
        <tr>
          <td style="border-style: none none solid solid; border-color: rgb(240, 240, 240) rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205); border-width: medium medium 1pt 1pt; padding: 0cm 5.4pt; background: #d3dfee none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">New endpoint scans</font></span></strong>
            </p>
          </td>
          
          <td style="border-style: none solid solid none; border-color: rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205) rgb(240, 240, 240); border-width: medium 1pt 1pt medium; padding: 0cm 5.4pt; background: #d3dfee none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Scans for latest antivirus packages added; new server-side scans have been added to detect browser type and client operating system; new scans for Windows Security Center and bandwidth added </font></span>
            </p>
          </td>
        </tr>
        
        <tr>
          <td style="border-style: none none solid solid; border-color: rgb(240, 240, 240) rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205); border-width: medium medium 1pt 1pt; padding: 0cm 5.4pt; background-color: transparent">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Web proxy enhancements</font></span></strong>
            </p>
          </td>
          
          <td style="border-style: none solid solid none; border-color: rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205) rgb(240, 240, 240); border-width: medium 1pt 1pt medium; padding: 0cm 5.4pt; background-color: transparent">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">More granularity in determining when Web proxy is used</font></span>
            </p>
          </td>
        </tr>
        
        <tr>
          <td style="border-style: none none solid solid; border-color: rgb(240, 240, 240) rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205); border-width: medium medium 1pt 1pt; padding: 0cm 5.4pt; background: #d3dfee none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Configuration Utility</font></span></strong>
            </p>
          </td>
          
          <td style="border-style: none solid solid none; border-color: rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205) rgb(240, 240, 240); border-width: medium 1pt 1pt medium; padding: 0cm 5.4pt; background: #d3dfee none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Easily backup and restore AAC farm configurations</font></span>
            </p>
          </td>
        </tr>
        
        <tr>
          <td style="border-style: none none solid solid; border-color: rgb(240, 240, 240) rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205); border-width: medium medium 1pt 1pt; padding: 0cm 5.4pt; background-color: transparent">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Session Monitoring Utility</font></span></strong>
            </p>
          </td>
          
          <td style="border-style: none solid solid none; border-color: rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205) rgb(240, 240, 240); border-width: medium 1pt 1pt medium; padding: 0cm 5.4pt; background-color: transparent">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">New session monitoring utility introduced to track users accessing the SSL VPN</font></span>
            </p>
          </td>
        </tr>
        
        <tr>
          <td style="border-style: none none solid solid; border-color: rgb(240, 240, 240) rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205); border-width: medium medium 1pt 1pt; padding: 0cm 5.4pt; background: #d3dfee none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Improved integration with Microsoft SharePoint</font></span></strong>
            </p>
          </td>
          
          <td style="border-style: none solid solid none; border-color: rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205) rgb(240, 240, 240); border-width: medium 1pt 1pt medium; padding: 0cm 5.4pt; background: #d3dfee none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Web proxy engine improved to handle more menu items; click-through for launching documents via Presentation Server enhanced</font></span>
            </p>
          </td>
        </tr>
        
        <tr>
          <td style="border-style: none none solid solid; border-color: rgb(240, 240, 240) rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205); border-width: medium medium 1pt 1pt; padding: 0cm 5.4pt; background-color: transparent">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <strong><span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Multiple Web Interface Support</font></span></strong>
            </p>
          </td>
          
          <td style="border-style: none solid solid none; border-color: rgb(240, 240, 240) rgb(123, 160, 205) rgb(123, 160, 205) rgb(240, 240, 240); border-width: medium 1pt 1pt medium; padding: 0cm 5.4pt; background-color: transparent">
            <p class="MsoNormal" style="margin: 0cm 0cm 0pt">
              <span style="font-size: 10pt; font-family: 'Times New Roman','serif'"><font face="verdana,geneva">Multiple Web Interfaces supported through the NavUI; fully supports credential caching like the Program Neighborhood CDA</font></span>
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>

<p class="MsoNormal" style="margin: 0cm 0cm 10pt">
  <font face="verdana,geneva">I hope to have some more information about the new features in a future post.</font>
</p>

<p class="MsoNormal" style="margin: 0cm 0cm 10pt">
  <font face="Verdana"><font color="#ff0000">UPDATE</font>: Silly me, you need to <strong>fullfill</strong> your Access Gateway licenses to get access to the 4.5 downloads.</font>
</p>