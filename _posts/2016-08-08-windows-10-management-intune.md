---
id: 4985
title: Choose Your Own Adventure with Microsoft Intune
date: 2016-08-08T00:12:32+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=4985
permalink: /windows-10-management-intune/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "5047200943"
image: /media/2016/08/choose-your-own-adventure.jpg
categories:
  - Microsoft
tags:
  - Intune
  - Mobility
  - Windows 10
---
Microsoft Intune has multiple methods for managing Windows 10 - you can choose to deploy a client or use the mobile device management capabilities built into the operating system. However, guidance from Microsoft on the comparing the capabilities of each, especially from a policy perspective, is currently unclear.

Having spent some time with Intune recently, I’ve built what I think is a good understanding of how the product works and its strengths and limitations. For this particular project, we've deployed into a greenfield environment with as little as possible on premises - Windows 10 PCs and networking equipment; therefore we're relying on cloud solutions for everything else including desktop management.

Note that this article will not cover a hybrid deployment with Intune and System Center Configuration Manager. Additional scenarios are possible with a hybrid approach, but my interest lies in utilising Intune as complete cloud solution to Windows PC management.

# Intune Management Choices

Intune provides two management approaches for Windows 10:

  1. Intune client (installed manually by the administrator or via a deployment solution, e.g. [in an image with MDT](https://docs.microsoft.com/en-us/intune/deploy-use/install-the-windows-pc-client-with-microsoft-intune)). You could also install the client via a [Windows 10 Provisioning package](https://technet.microsoft.com/en-us/itpro/windows/deploy/provisioning-packages)
  2. Windows 10 built-in mobile device management (Microsoft has delivered improvements to MDM with Windows 10 1511 and 1607)

![Intune console with MDM vs. the client]({{site.baseurl}}/media/2016/08/IntuneMDMvsAgent.png)*Intune console - note the differences between MDM (top window) and client (bottom window)*

While [the documentation](https://docs.microsoft.com/en-us/intune/) for Intune is quite good, it doesn't paint a clear picture of what you can and cannot achieve with the client vs. MDM - at least when you're new to Intune. For most of us working with Windows desktop management for some time, it's potentially natural to use the client and you'll need to for Windows 7. It's clear, however, that in regards to policies Microsoft is building capabilities into the MDM approach for Windows 10.

There are a few articles in the Intune documentation that provide an overview of the management capabilities that are provided by each approach:

  * [Manage Windows PCs with Intune PC client software](https://docs.microsoft.com/en-us/intune/deploy-use/manage-windows-pcs-with-microsoft-intune)
  * [Windows PC management capabilities (with the Microsoft Intune PC client)](https://docs.microsoft.com/en-us/intune/get-started/windows-pc-management-capabilities-in-microsoft-intune)
  * [Windows 10 policy settings in Microsoft Intune](https://docs.microsoft.com/en-us/intune/deploy-use/windows-10-policy-settings-in-microsoft-intune)

When reading the Microsoft documentation, the language is key to understanding the capabilities - if "enrolled" is used, then this is referring to a Windows 10 device enrolled in Intune MDM and is thus treated as a mobile device; if "client" is used, then this, of course, is referring to the installed client. That first article has this important paragraph:

> While the Intune client supports policies that help protect PCs by managing software updates, Windows firewall, and Endpoint Protection, PCs managed with the Intune client cannot be targeted with other Intune policies.

I've come across two other great resources that provide more insight:

  * A post at UserVoice highlighting the need for Microsoft to improve the comparison between the two: [Improve documentation - it is very vague on what works with "Intune client" and what works with "MDM"](https://microsoftintune.uservoice.com/forums/291681-ideas/suggestions/11378736-improve-documentation-it-is-very-vague-on-what-w#comments)
  * An article by Gert-Jan van de Werfhorst & Eric Dunnewijk that provides the best overview I've found on the features available with each management option: [Microsoft Intune, wat is nu toch modern management?](https://wow365.nl/mobiliteit/intune/modern-management/) (Dutch)

To summarise the key points:

  * 3 policies apply to the Intune client - the Intune client Settings, Intune Center Settings and Windows Firewall Settings
  * All other policies targeting Windows apply to Windows 8.1 and/or Windows 10 MDM.

# Management Capabilities

Based on the [article by Gert-Jan van de Werfhorst & Eric Dunnewijk](https://wow365.nl/mobiliteit/intune/modern-management/), I've created the following tables with some additional information to show the differences between managing a Windows 10 PC with the client vs. MDM.

An administrator can see quite readily the differences in the Intune dashboard when managing devices. In the screenshot below you can see what the dashboard looks like after enrolling a number of devices. Note that Windows Updates and Endpoint Protection are not shown.

![Intune with devices management via MDM only]({{site.baseurl}}/media/2016/08/IntuneDashboard-MDM.png)*Intune with devices management via MDM only*

Once the client is deployed to at least one Windows PC, the dashboard now shows the Windows Update and Endpoint Protection overview and you can see some additional links available on the left side of the dashboard.

![Intune with devices management via the client and potentially MDM]({{site.baseurl}}/media/2016/08/IntuneDashboard-AgentEdited.png)*Intune with devices management via the client and potentially MDM*

## Features

First, let's take a look at an overview of the features available for the client and for Windows 10 MDM:

[table id=41 /]

Note 3 key items here - software deployment, Windows Update management and Endpoint Protection management:

### Software Deployment

While software deployment with Windows 10 MDM is possible, only applications consisting of a single MSI can be deployed. It's clear then that software deployment via MDM may require some custom packaging.

Software deployment via the client is limited to EXE and MSI files; however, it also enables additional files in an application setup thus providing more flexibility.

### Windows Update

For Windows Updates on PCs managed with the client, full control is possible (not quite the same as WSUS). Additionally reporting is available to understand which updates are deployed and those that are outstanding. Finally, it is possible to deploy 3rd party MSP updates as well.

### Endpoint Protection

The client provides for management of Windows Defender on the endpoint plus reporting on device status and malware found with remediation action taken.

With the MDM approach, Windows Defender configuration is possible via OMA-URI policies; however, no reporting is possible. [Advanced Threat Analytics](https://www.microsoft.com/en-au/server-cloud/products/advanced-threat-analytics/) is a component the [Enterprise Mobility Suite](https://www.microsoft.com/en-au/server-cloud/enterprise-mobility/overview.aspx) (EMS), which is a popular way that organisations are licensing Intune. While I haven't seen how [Windows Defender Advanced Threat Protection](https://www.microsoft.com/en-us/WindowsForBusiness/windows-atp) is licensed, this too looks like a good alternative endpoint management solution.

## Policies

Understanding the configuration policies possible with either approach is important for getting a full picture of how much control you have over Windows 10 PCs:

[table id=42 /]

It's initially surprising to see most policy configuration possible only available to Windows 10 MDM, given that Intune has been available since before Windows 8 and Windows 10. It's important to note that policy configuration for Intune is a different approach than traditional Group Policy which can be filtered based on computer and user. With MDM policies, these will apply to all enrolled machines, regardless of which user is on the device.

## Remote Administrative Actions

Given the difference in supported features, the remote actions possible for each management approach is, of course, different.

[table id=43 /]

# Conclusion

This information is correct to the best of my knowledge. I recommend checking the documentation and trialling Intune for yourself to determine which approach will apply for your specific requirements.

I'm certain that Microsoft understands the configuration requirements that most customers require as the product group looks to be very active on [UserVoice](https://microsoftintune.uservoice.com/). One of the management approaches requires the features from the other approach. The fastest way to do that would be for Microsoft to implement policies via the MDM configuration service provider in Windows 10 into the Intune client.

MDM for Windows 10 PCs is clearly the future - with automatic MDM enrollment when the PCs is connected to Azure AD and no additional agents to deploy, this approach really does simplify PC management.

With the popularity of Office 365 and EMS, Microsoft is looking to make Intune an important component of customer's cloud strategies. It's therefore, important to understand what its capabilities are when moving from traditional PC management to a cloud approach.