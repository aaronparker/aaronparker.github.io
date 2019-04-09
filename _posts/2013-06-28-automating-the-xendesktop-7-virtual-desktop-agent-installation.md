---
id: 3385
title: Automating the XenDesktop 7 Virtual Desktop Agent Installation
date: 2013-06-28T17:26:58+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=3385
permalink: /automating-the-xendesktop-7-virtual-desktop-agent-installation/
dsq_thread_id:
  - "1445599060"
categories:
  - Automation
tags:
  - Automation
  - XenDesktop
---
Citrix provides a nice wizard for installing the XenDesktop 7 VDA and some pretty good documentation on using [a command line installation](http://support.citrix.com/proddocs/topic/xendesktop-7/cds-install-command.html), but the wizard does not expose all of the available options and working out what the wizard is doing in relation to the command line takes a bit of translation. Here's how to automate a typical VDA deployment.

I usually use a batch file to deploy components, so the commands I've listed here assume you'll be using a batch file too. To make the batch file easier to read, I place all command line options in an environment variable named OPTIONS. To start with, I'm going to set a couple of items that will enable an unattended deployment:

<pre class="lang:batch decode:true">SET OPTIONS=
SET OPTIONS=/QUIET
SET OPTIONS=%OPTIONS% /NOREBOOT</pre>

When running the wizard, you're first asked whether you're deploying to a master image, or a persistent virtual machine/physical PC.

[<img class="alignnone size-full wp-image-3386" alt="1_Configuration" src="https://stealthpuppy.com/media/2013/06/1_Configuration.png" width="826" height="624" srcset="https://stealthpuppy.com/media/2013/06/1_Configuration.png 826w, https://stealthpuppy.com/media/2013/06/1_Configuration-150x113.png 150w, https://stealthpuppy.com/media/2013/06/1_Configuration-300x226.png 300w, https://stealthpuppy.com/media/2013/06/1_Configuration-624x471.png 624w" sizes="(max-width: 826px) 100vw, 826px" />](https://stealthpuppy.com/media/2013/06/1_Configuration.png)

In this example, I'm deploying to a master image, so I'll set the MASTERIMAGE flag:

<pre class="lang:batch decode:true">SET OPTIONS=%OPTIONS% /MASTERIMAGE</pre>

The next page lists the options to install the VDA and optionally Receiver:

[<img class="alignnone size-full wp-image-3387" alt="2_CoreComponents" src="https://stealthpuppy.com/media/2013/06/2_CoreComponents.png" width="826" height="624" srcset="https://stealthpuppy.com/media/2013/06/2_CoreComponents.png 826w, https://stealthpuppy.com/media/2013/06/2_CoreComponents-150x113.png 150w, https://stealthpuppy.com/media/2013/06/2_CoreComponents-300x226.png 300w, https://stealthpuppy.com/media/2013/06/2_CoreComponents-624x471.png 624w" sizes="(max-width: 826px) 100vw, 826px" />](https://stealthpuppy.com/media/2013/06/2_CoreComponents.png)

I'm just looking to install the VDA, but I could also install Receiver, by adding PLUGINS to the COMPONENTS option:

<pre class="lang:batch decode:true">SET OPTIONS=%OPTIONS% /COMPONENTS VDA</pre>

Next up is configuring the location of the Delivery Controllers.

[<img class="alignnone size-full wp-image-3388" alt="3_DeliveryController" src="https://stealthpuppy.com/media/2013/06/3_DeliveryController.png" width="826" height="624" srcset="https://stealthpuppy.com/media/2013/06/3_DeliveryController.png 826w, https://stealthpuppy.com/media/2013/06/3_DeliveryController-150x113.png 150w, https://stealthpuppy.com/media/2013/06/3_DeliveryController-300x226.png 300w, https://stealthpuppy.com/media/2013/06/3_DeliveryController-624x471.png 624w" sizes="(max-width: 826px) 100vw, 826px" />](https://stealthpuppy.com/media/2013/06/3_DeliveryController.png)

I'm going to specify a static list of Controllers using the aptly named CONTROLLERS property:

<pre class="lang:batch decode:true">SET OPTIONS=%OPTIONS% /CONTROLLERS "ctx-xd7-ddc1.lab.com,ctx-xd7-ddc2.lab.com"</pre>

There are additional options at this point and the recommended approach is to specify the XD site GUID using SITE\_GUID (this is the same as 'Choose locations from Active Directory' shown below). Don't use CONTROLLERS and SITE\_GUID at the same time.

The last option - 'Let Machine Creation Services do it automatically' doesn't appear to be available as a command line option. From the command line perspective, I assume this is the same as not specifying CONTROLLERS or SITE_GUID at all.

[<img class="alignnone size-full wp-image-3396" alt="ConfigurationOptions" src="https://stealthpuppy.com/media/2013/06/ConfigurationOptions.png" width="766" height="272" srcset="https://stealthpuppy.com/media/2013/06/ConfigurationOptions.png 766w, https://stealthpuppy.com/media/2013/06/ConfigurationOptions-150x53.png 150w, https://stealthpuppy.com/media/2013/06/ConfigurationOptions-300x106.png 300w, https://stealthpuppy.com/media/2013/06/ConfigurationOptions-624x221.png 624w" sizes="(max-width: 766px) 100vw, 766px" />](https://stealthpuppy.com/media/2013/06/ConfigurationOptions.png)

The Features page lists a few options that look completely unrelated, but I assume they need to go somewhere.

[<img class="alignnone size-full wp-image-3390" alt="4_Features" src="https://stealthpuppy.com/media/2013/06/4_Features1.png" width="826" height="624" srcset="https://stealthpuppy.com/media/2013/06/4_Features1.png 826w, https://stealthpuppy.com/media/2013/06/4_Features1-150x113.png 150w, https://stealthpuppy.com/media/2013/06/4_Features1-300x226.png 300w, https://stealthpuppy.com/media/2013/06/4_Features1-624x471.png 624w" sizes="(max-width: 826px) 100vw, 826px" />](https://stealthpuppy.com/media/2013/06/4_Features1.png)

Each feature has its own command line option. In my case, I don't really need to add the option for Remote Assistance, because I've used an automated deployment that has already enabled that feature, but it doesn't hurt to enable the option anyway.

<pre class="lang:batch decode:true">SET OPTIONS=%OPTIONS% /OPTIMIZE
SET OPTIONS=%OPTIONS% /ENABLE_REMOTE_ASSISTANCE
SET OPTIONS=%OPTIONS% /ENABLE_REAL_TIME_TRANSPORT</pre>

The VDA requires several inbound ports for core features to work.

[<img class="alignnone size-full wp-image-3391" alt="5_Firewall" src="https://stealthpuppy.com/media/2013/06/5_Firewall.png" width="826" height="624" srcset="https://stealthpuppy.com/media/2013/06/5_Firewall.png 826w, https://stealthpuppy.com/media/2013/06/5_Firewall-150x113.png 150w, https://stealthpuppy.com/media/2013/06/5_Firewall-300x226.png 300w, https://stealthpuppy.com/media/2013/06/5_Firewall-624x471.png 624w" sizes="(max-width: 826px) 100vw, 826px" />](https://stealthpuppy.com/media/2013/06/5_Firewall.png)

Fortunately, Windows Firewall configuration is simple using the ENABLE\_HDX\_PORTS flag:

<pre class="lang:batch decode:true">SET OPTIONS=%OPTIONS% /ENABLE_HDX_PORTS</pre>

Finally then, a summary of what the wizard is about to install and configure. It's worth pointing out that for Windows Server workloads, you will need to install the Remote Desktop Session Host **before** installing the VDA. If the RDSH role is not installed, setup will install it and reboot the server.  This will potentially break your automated deployment; however, if you've used the right approach and [automated the deployment of Windows](https://stealthpuppy.com/hands-off-my-gold-image-automating-citrix-xenapppvs-image-creation/), then this role will already be enabled.

[<img class="alignnone size-full wp-image-3392" alt="6_Summary" src="https://stealthpuppy.com/media/2013/06/6_Summary.png" width="826" height="624" srcset="https://stealthpuppy.com/media/2013/06/6_Summary.png 826w, https://stealthpuppy.com/media/2013/06/6_Summary-150x113.png 150w, https://stealthpuppy.com/media/2013/06/6_Summary-300x226.png 300w, https://stealthpuppy.com/media/2013/06/6_Summary-624x471.png 624w" sizes="(max-width: 826px) 100vw, 826px" />](https://stealthpuppy.com/media/2013/06/6_Summary.png)

With my script created now, I can automate the deployment of the VDA as a component of automating the entire deployment of the master image. Here's a sample script that will use the options listed above for 32-bit or 64-bit platforms.

<pre class="lang:batch decode:true">SET OPTIONS=
SET OPTIONS=/QUIET
SET OPTIONS=%OPTIONS% /NOREBOOT
SET OPTIONS=%OPTIONS% /MASTERIMAGE
SET OPTIONS=%OPTIONS% /COMPONENTS VDA
SET OPTIONS=%OPTIONS% /CONTROLLERS "ctx-xd7-ddc1.lab.com,ctx-xd7-ddc2.lab.com"
SET OPTIONS=%OPTIONS% /OPTIMIZE
SET OPTIONS=%OPTIONS% /ENABLE_REMOTE_ASSISTANCE
SET OPTIONS=%OPTIONS% /ENABLE_REAL_TIME_TRANSPORT
SET OPTIONS=%OPTIONS% /ENABLE_HDX_PORTS

IF "%PROCESSOR_ARCHITECTURE%"=="AMD64" PUSHD "x64\XenDesktop Setup"
IF "%PROCESSOR_ARCHITECTURE%"=="x86" PUSHD "x86\XenDesktop Setup"
START /WAIT XenDesktopVDASetup.exe %OPTIONS%</pre>

In the lab, I've imported a full copy of the XenDesktop 7 ISO into my [MDT](http://technet.microsoft.com/en-gb/solutionaccelerators/dd407791.aspx) deployment share, where I've configured install scripts for Controllers (with Studio and Director), StoreFront and various flavours of VDA deployments (desktop, server, physical PCs etc).

The [documentation](http://support.citrix.com/proddocs/topic/xendesktop-7/cds-install-command.html) is quite clear and easy to understand; however there's a few options that I would recommend having clear understanding of what they enable:

  * OPTIMIZE - this option will optimise the base image for a virtual machine using the changes outlined in this support article:[ How to Optimize XenDesktop Machines](http://support.citrix.com/article/ctx125874). I would recommend understanding clearly what each change does and removing this option if you have implemented your own optimisations.
  * NODESKTOPEXPERIENCE - I utilise my own solution for making a Windows Server look like a desktop OS and would generally leave this out as a result. This enables the default Citrix wallpaper, which is pretty horrible.
  * BASEIMAGE - this will enable PVD support. Use at your own risk 😉
  * PORTNUMBER - using a custom port for the VDA other than the default TCP 80, requires installing the VDA and then re-rerunning setup to specify a different port.

There's not much different here to previously releases, but I would like to see Citrix add all options to the wizard and then provide the command line, based on what you've selected, at the end to lower the barriers to automation even further.