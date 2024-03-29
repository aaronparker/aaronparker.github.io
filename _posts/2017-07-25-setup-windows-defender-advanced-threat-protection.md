---
title: Setting up Windows Defender Advanced Threat Protection
date: 2017-07-25T18:21:27+10:00
author: Aaron Parker
layout: post
permalink: /setup-windows-defender-advanced-threat-protection/
image: /media/2017/07/2349074645_46778ebfef_b.jpg
categories:
  - Microsoft
tags:
  - Intune
  - Windows Defender
  - Windows Defender Advanced Threat Protection
---
Understanding what Windows Defender Advanced Threat Protection (ATP) actually is had eluded me for a while - it's not included in something like [EMS](https://www.microsoft.com/en-au/cloud-platform/enterprise-mobility-security), it's not available with a Visual Studio Enterprise subscription and you'll need to request an evaluation from Microsoft (and hope it's approved) to test it out. Windows Defender ATP _is_ licensed as a component of the [Windows 10 Enterprise E5](https://www.microsoft.com/en-us/WindowsForBusiness/buy) or the [Secure Productive Enterprise](https://www.microsoft.com/en-au/secure-productive-enterprise/default.aspx) (soon to be Microsoft 365) E5 subscriptions.

So what is ATP? [According to Microsoft](https://docs.microsoft.com/en-us/windows/threat-protection/windows-defender-atp/windows-defender-advanced-threat-protection), Windows Defender Advanced Threat Protection is:

> Windows Defender Advanced Threat Protection (Windows Defender ATP) is a security service that enables enterprise customers to detect, investigate, and respond to advanced threats on their networks.  
> ...  
> Windows Defender ATP uses the following combination of technology built into Windows 10 and Microsoft's robust cloud service:  
> Endpoint behavioral sensors:
> 
>   * Embedded in Windows 10, these sensors collect and process behavioral signals from the operating system (for example, process, registry, file, and network communications) and sends this sensor data to your private, isolated, cloud instance of Windows Defender ATP.
>   * Cloud security analytics: Leveraging big-data, machine-learning, and unique Microsoft optics across the Windows ecosystem (such as the Microsoft Malicious Software Removal Tool, enterprise cloud products (such as Office 365), and online assets (such as Bing and SmartScreen URL reputation), behavioral signals are translated into insights, detections, and recommended responses to advanced threats.
>   * Threat intelligence: Generated by Microsoft hunters, security teams, and augmented by threat intelligence provided by partners, threat intelligence enables Windows Defender ATP to identify attacker tools, techniques, and procedures, and generate alerts when these are observed in collected sensor data.

In short, Windows Defender ATP is a cloud-based threat management/protection solution for Windows 10 that does not require deployment of agents (because they're inbox features), that will also work with 3rd party anti-virus solutions.

Microsoft positions ATP for enterprise customers, but given the integration with their other products and that it's a completely cloud-hosted platform, this should be for everyone (budget concerns aside). Many small to medium organisations (and partners) that I talk to are actively looking at ways to reduce their on-premises infrastructure.

## Setting up Windows Defender Advanced Threat Protection

To give you an idea of what does the setup process for ATP looks like, I've documented the experience during setup in my own tenant. The gallery below shows a screenshot of each step including onboarding a device and performing a detection test.

![Windows Defender ATP setup welcome page]({{site.baseurl}}/media/2017/07/01-Welcome-1.png)

Windows Defender ATP setup welcome page
{:.figcaption}

![Step 1: Selecting the Windows Defender Advanced Threat Protection data storage location]({{site.baseurl}}/media/2017/07/02-Storage.png)

Step 1: Selecting the Windows Defender Advanced Threat Protection data storage location
{:.figcaption}

![Step 2: Select a data retention policy]({{site.baseurl}}/media/2017/07/03-DataRetention.png)

Step 2: Select a data retention policy
{:.figcaption}

![Step 3: Data retention up to 180 days is possible]({{site.baseurl}}/media/2017/07/03a-DataRetentionDays.png)

Step 3: Data retention up to 180 days is possible
{:.figcaption}

![Step 4: Select your organisation size]({{site.baseurl}}/media/2017/07/04-OrgSize.png)

Step 4: Select your organisation size
{:.figcaption}

![Step 5: Select your industry from a limited selection]({{site.baseurl}}/media/2017/07/05-Industry.png)

Step 5: Select your industry from a limited selection
{:.figcaption}

![Step 6: Choose to enable preview features]({{site.baseurl}}/media/2017/07/06-PreviewExperience.png)

Step 6: Choose to enable preview features
{:.figcaption}

![Step 7: Confirm creation of your Windows Defender ATP cloud instance]({{site.baseurl}}/media/2017/07/07-CreateCloud.png)

Step 7: Confirm creation of your Windows Defender ATP cloud instance
{:.figcaption}

![Progress seen when creating the cloud instance]({{site.baseurl}}/media/2017/07/08-CreateProgress.png)

Progress seen when creating the cloud instance
{:.figcaption}

![Step 8: Onboard and end-point and test detection]({{site.baseurl}}/media/2017/07/09-OnboardTest.png)

Step 8: Onboard and end-point and test detection
{:.figcaption}

![Onboarding deployment methods]({{site.baseurl}}/media/2017/07/09a-OnboardTest-DeploymentMethods.png)

Onboarding deployment methods
{:.figcaption}

![Step 9: Onboarding a Windows 10 device with a script]({{site.baseurl}}/media/2017/07/10-OnboardTest-Enable-1.png)

Step 9: Onboarding a Windows 10 device with a script
{:.figcaption}

![Step 10: Running the detection test]({{site.baseurl}}/media/2017/07/11-OnboardTest-Test-1.png)

Step 10: Running the detection test
{:.figcaption}

![The Windows Defender ATP Dashboard]({{site.baseurl}}/media/2017/07/12-Dashboard.png)

The Windows Defender ATP Dashboard
{:.figcaption}

Provisioning ATP is as easy process - the hardest part for me was working out where to access to the console - if you're looking for it, here it is: <https://securitycenter.windows.com/>

## Onboard a Windows 10 device with Intune

With ATP deployed, you can now use Intune (or another MDM solution) to onboard a device into ATP. You could also [use Group Policy, ConfigMgr, or a script](https://docs.microsoft.com/en-us/windows/threat-protection/windows-defender-atp/configure-endpoints-windows-defender-advanced-threat-protection).

Previously you would have to need to create a custom Intune policy to push out an OMA-URI setting. Now in the Azure portal, pushing out the policy is easier.  Intune provides an in-built profile for onboarding and offboarding devices using configuration packages downloaded from the ATP console.

Create a new profile for Windows 10, choose the 'Windows Defender ATP (Windows 10 Desktop)' profile type and select the onboarding package. In the screenshot below, I have populated both the onboarding and offboarding packages, but you would only deploy an onboarding package.

![Configure the Windows ATP onboard and offboard package in Microsoft Intune]({{site.baseurl}}/media/2017/07/15-ConfigureIntune-Policy.png)

Configure the Windows ATP onboard and offboard package in Microsoft Intune
{:.figcaption}

With the profile created, assign it to a group. In my example here, I'm assigning the profile to a Windows 10 [dynamic group](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-accessmanagement-groups-with-advanced-rules).

![Target the Intune policy to a device (or user) group]({{site.baseurl}}/media/2017/07/16-ConfigureIntune-TargetGroup.png)

Target the Intune policy to a device (or user) group
{:.figcaption}

With devices onboarded, you can start monitoring them in the Windows Defender ATP console:

![Machines List in the Windows Defender ATP console]({{site.baseurl}}/media/2017/07/17-MachinesList.png)

Machines List in the Windows Defender ATP console
{:.figcaption}

I may dig further into Windows Defender Advanced Threat Protection features in a future article.
