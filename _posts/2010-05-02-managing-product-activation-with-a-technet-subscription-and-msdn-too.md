---
id: 1530
title: Managing product activation with a TechNet subscription (and MSDN too)
date: 2010-05-02T19:39:54+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/general/managing-product-activation-with-a-technet-subscription-and-msdn-too
permalink: /managing-product-activation-with-a-technet-subscription-and-msdn-too/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195382348"
categories:
  - Microsoft
tags:
  - Activation
  - TechNet
  - VAMT
---
[<img style="margin: 0px 10px 10px 0px; display: inline; border-width: 0px;" title="ComputerTick" src="https://stealthpuppy.com/wp-content/uploads/2010/05/ComputerTick_thumb.png" border="0" alt="ComputerTick" width="128" height="128" align="left" />](https://stealthpuppy.com/wp-content/uploads/2010/05/ComputerTick.png) I’ve been avoiding activating Windows installations in my home test environment with the product keys from my TechNet subscription because I’ve been afraid of running out of keys. Fortunately that fear has been mostly unfounded. I won’t go into what I really think about product activation but if you’re interested in how to manage your TechNet or MSDN keys, I have discussed how I’m doing that here.

Microsoft delivered a webcast recently, entitled [Product Activation in Development Environments](https://msevents.microsoft.com/CUI/WebCastEventDetails.aspx?culture=en-US&EventID=1032448730), which discusses Windows Product Activation for development and test environments. Although aimed at developers using an MSDN subscription (IT Pros don’t have to worry about licensing and product activation?) the concepts discussed apply to TechNet subscriptions as well.

A companion white paper, Windows Activation in Development and Test Environments, can be [viewed on TechNet](http://technet.microsoft.com/en-us/library/dd981009.aspx) or downloaded as [a Word document](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=4dea973e-8235-4bad-8f6d-e08d14d08075). The webcast and white paper go into plenty of detail about production activation, different product key types and how to manage product activation, but they are focused on corporate development and test environments. If you have a personal TechNet subscription for your own testing, your options are limited in comparison.

### What do you get with a TechNet subscription?

Quite a lot actually. If you don’t already have a TechNet Plus subscription you should read about it [here](http://technet.microsoft.com/en-us/subscriptions/default.aspx) (read about MSDN subscriptions [here](http://msdn.microsoft.com/en-us/subscriptions/default.aspx) - MSDN gives you much more than TechNet, but with a price to match).

However it is interesting to discuss what you don’t get with a TechNet or MSDN subscription, and that is the activation feature that would make activation simplest – Key Management Service (KMS) keys. You do get retail and MAK (Multiple Activation Key) keys. This means that the number of activations that you are entitled to are finite. What I wasn’t aware of is what the number of activations is for each product.

Windows Vista, Windows Server 2008, Windows 7, Windows Server 2008 R2 and Office 2010 products must all be activated using [Volume Activation (VA) 2.0](http://technet.microsoft.com/en-gb/library/cc303277.aspx) product keys. TechNet provides MAK keys for Windows Server and Enterprise editions of Windows 7. Retail keys are provided for all other editions and other VA 2.0 products.

In the case of Windows Server 2008 R2 (Standard and Enterprise) and Windows 7 Enterprise, the number of activations is 500 for each. Windows Server 2008 MAK keys also provide for 500 activations, but Windows Vista Enterprise gets only 10. At this stage, I only have access to Retail keys for Office Professional Plus 2010, but I do get 10 activations for each version (totalling 30) of Visio and Project 2010 (Standard, Professional and Premium). Perhaps more keys for Office 2010 are forthcoming.

### Strategies for managing production activations

TechNet and MSDN subscriptions are not entitled to KMS keys, so you will have to use at least some of those MAK activations. In my own test environment, I have activated my Hyper-V host, a domain controller and a server used for hosting databases and a couple of other services. I am now going to activate almost all of my virtual machines that I intend on keeping for any extended period of time.

<span style="text-decoration: line-through;">To enable reuse of activations in the event of redeploying Windows to a virtual machine, there are a couple of steps you should follow:</span>

  1. <span style="text-decoration: line-through;">Assign virtual machines by operating system, i.e. virtual machines should run Windows Server or Windows client operating systems </span>
  2. <span style="text-decoration: line-through;">Don’t delete your virtual machines (VHDs or VMDKs are OK to delete), instead reuse them </span>

<span style="text-decoration: line-through;">Reinstalling the same version and edition of Windows using the same product key on a machine should not count against your total activation account.</span>

**_Update_**: OK, my information in regards to MAK keys wasn't exactly correct. The TechNet site doesn't make it exactly clear as to what happens specifically with keys provided to subscribers; however it's worth reading this page: [Frequently Asked Questions About Volume License Keys](http://www.microsoft.com/licensing/existing-customers/product-activation-faq.aspx) for lot's of good information about activation. I was able to speak with TechNet technical support to get some answers on product activation, so I'll summarise here:

  * MAK keys provide a set number of activations (in the case of the newer products, TechNet subscribers get 500 activations). This number is not directly related to what you are licensed to install - it's just a limit on the number of activations per key.
  * Activations of MAK keys will count against the total activations whether you are reinstalling on the same hardware or not. The TechNet representative alluded to a current (as at May 2010) issue with activations in virtual environments. I couldn't get more information on that but I don't believe that this impacts MAK activations anyway.
  * _However_: if you the VAMT to proxy activate your machines, those machines will use the same activation if you reload and proxy reactivate on the same hardware. When proxy activating you will must store the proxy activation information - if you loose that, you will lose the activations that you have completed.
  * MAK keys provided in TechNet (and MSDN subscriptions) are the same as MAK keys provided to Volume License customers. So the same thing applied to where-ever you are using MAK keys.
  * Retail keys (like those provided for Office 2010) should reactivate on the same hardware and not count against your total number of activations.
  * The good news is that if you run out of activations for a particular MAK key or set of MAK keys, you can contact Microsoft to increase the number of activations as long as you are using those keys for installing products for testing purposes and not production. If you need to increase your activation counts just contact your TechNet Regional Service Centre and they'll be happy to help.

If you would prefer not to activate Windows, you can do the following:

  * Rearm Windows every 30 days, up to 3 times, to extend the pre-activation period to 120 days with the [SLMGR –rearm](http://www.google.co.uk/search?hl=en&source=hp&q=windows+activation+rearm&btnG=Google+Search&meta=&aq=f&oq=) command.
  * Create unattended deployments using the Microsoft Deployment Toolkit (or even SCCM) so that you can redeploy Windows to those test machines once the pre-activation period is up. If you can separate the data from the machine, then reinstalling Windows shouldn’t be that much of an issue.

Knowing that I have 500 activations for most of the products that are important to me, then perhaps activation isn’t that much of an issue. I am also fairly certain that when my current subscription expires on Wednesday and my new subscription kicks in, I will get a new set of keys – far more machines than I could get running on a single hypervisor with 12 GB of RAM.

### Using the VAMT to track activations and product keys

The [Volume Activation Management Tool (VAMT) 2.0](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=ec7156d2-2864-49ee-bfcb-777b898ad582) is provided to manage keys and you can use this with TechNet, MSDN or Volume License keys to keep track of machine and key status.

The tool itself is very simple. In the example screenshot below, I have imported a list of machines from Active Directory and this shows the status of machines that I have scanned:

[<img style="display: inline; border-width: 0px;" title="VAMTAllProducts" src="https://stealthpuppy.com/wp-content/uploads/2010/05/VAMTAllProducts_thumb.png" border="0" alt="VAMTAllProducts" width="660" height="368" />](https://stealthpuppy.com/wp-content/uploads/2010/05/VAMTAllProducts.png)

Once machines are imported, I can select a machine or a group of machines and update their status to view the installed products (Windows and Office 2010 will be reported). Remote machines must be powered up to gather their status, unfortunately this information isn’t stored in AD and I can’t scan powered down virtual machines. Product keys can be installed and activated on remote machines directly from the VAMT console.

By importing product keys into the VAMT, you can track the number of activations for MAK and KMS keys (it doesn’t report on Retail keys). This will help you discover the total number of activations you have for each product and keep track of the number of actual activations.

[<img style="display: inline; border-width: 0px;" title="VAMTProductKeys" src="https://stealthpuppy.com/wp-content/uploads/2010/05/VAMTProductKeys_thumb.png" border="0" alt="VAMTProductKeys" width="660" height="292" />](https://stealthpuppy.com/wp-content/uploads/2010/05/VAMTProductKeys.png)

For more information on VAMT and how to use it to management production activation in your environment, see the following links:

  * [Volume Activation Management Tool (VAMT) 2.0](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=ec7156d2-2864-49ee-bfcb-777b898ad582)
  * [Product Activation Using VAMT 2.0](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=6e1377c3-9348-4b89-a92d-3e4801bcd2bf)
  * [Manage Activation Using VAMT 2.0](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=a6d4ee56-a19e-4b62-a5c8-94eb8b9a4d78)
  * [Manage Product Keys Using VAMT 2.0](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=812e96b3-5be5-448b-881f-d8ef9f89f37c)
  * [Activation in Disconnected Environments Using VAMT 2.0](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=0bbd06d1-f483-4e6b-9fdc-beaf28edfe4a)
  * [Reporting Activation Information Using VAMT 2.0](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=e0fb0042-4aee-4bb2-8b93-266fa29b8575)

It is important to note that even if your TechNet or MSDN subscription expires you _should_ still have access to your keys, and can activate those that you might have saved. It is worth obtaining all of the keys that you are entitled to and exporting them from TechNet well [before your subscription expires](https://stealthpuppy.com/general/export-your-product-keys-before-your-technet-subscription-expires).

For complete information on Volume Activation, your first port of call should be the [Windows Volume Activation](http://technet.microsoft.com/volumeactivation) site on TechNet.