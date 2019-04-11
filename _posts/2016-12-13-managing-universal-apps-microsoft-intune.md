---
id: 5321
title: Managing Universal Apps with Microsoft Intune
date: 2016-12-13T09:00:48+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=5321
permalink: /managing-universal-apps-microsoft-intune/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "5374265504"
image: /media/2016/12/10017151914_3be1e6364c_k.jpg
categories:
  - Microsoft
tags:
  - Intune
  - Universal apps
  - Windows 10
  - Windows Store
  - Windows Store for Business
---
I am excited about the opportunities that managing Windows 10 devices with [Azure AD Join](https://blogs.technet.microsoft.com/enterprisemobility/2015/05/28/azure-ad-join-on-windows-10-devices/) and MDM (i.e. modern management) provides for both users and admins. In this article, I'll cover deploying and managing modern applications (Universal apps) on a modern platform with a modern device management solution - Microsoft Intune standalone for managing Universal apps.

Consider that with Windows 10, an organisation can provision and manage Windows 10 PCs [without a custom SOE](https://technet.microsoft.com/en-us/itpro/windows/deploy/provisioning-packages) and with a fully [cloud-based authentication](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-whatis) and management solution, requiring no infrastructure (other than networking) on-premises. This approach comes with some caveats today, of course, but PC and application lifecycle can be achieved without exhaustive architectural consideration or deployment of complex management solutions.

Using Intune to manage Windows 10 PCs (and Windows 10 mobile devices) along with the [Windows Store for Business]({{site.baseurl}}/setup-windows-store-for-business/) will enable you to manage Universal apps on these devices. With Intune, you can deploy and remove apps by targeting users or devices.

## Requirements for Microsoft Intune

Deploying and configuring Microsoft Intune requires two things - Azure AD and licensing Intune. In this article, I'm concentrating on Intune standalone only, i.e. Intune as a standalone cloud solution, not [integrated with Configuration Manager](https://technet.microsoft.com/en-us/library/jj884158.aspx).

### Azure Active Directory

Like the [Windows Store for Business]({{site.baseurl}}/setup-windows-store-for-business/) (WSfB), Intune relies on Azure Active Directory for user identities. As with my previous article, I recommend setting up an Azure tenant as your first step before integrating any additional solutions. That process may, or may not, include synchronising identities with AD Connect. This approach to application deployment and device management can be achieved with cloud-based identities only.

### Licensing Microsoft Intune

While Intune can be licensed on its own, the ideal way of licensing Intune is as a component of [the Microsoft Enterprise Mobility + Security suite](https://www.microsoft.com/en-au/cloud-platform/enterprise-mobility-security) (EMS). The primary reason is to enable advanced features you get with an Azure AD Premium subscription. If you're not familiar with EMS, you can read up on the components and licensing details here: [Enterprise Mobility + Security Pricing](https://www.microsoft.com/en-au/cloud-platform/enterprise-mobility-security-pricing).

For this solution, we're interested in:

  * **Azure Active Directory Premium** - this enables a[utomatic MDM enrollment](https://blogs.technet.microsoft.com/enterprisemobility/2015/08/14/windows-10-azure-ad-and-microsoft-intune-automatic-mdm-enrollment-powered-by-the-cloud/) when a device is provisioned and connected to Azure AD. Additionally Azure AD Premium provides branding customisation which improves the sign on user experience; multi-factor authentication onto devices as well as cloud applications and conditional access to protect resources such as Exchange and SharePoint Online.
  * **Microsoft Intune** - Intune is included in the EMS license which is the primary reason for deploying modern management.

Additional components that make sense in a cloud-based management approach include [Azure Information Protection](https://www.microsoft.com/en-au/cloud-platform/azure-information-protection) and [Microsoft Advanced Threat Analytics](https://www.microsoft.com/en-au/cloud-platform/advanced-threat-analytics). These are entire topics on their own, so I won't be covering those in the context of this article.

### Setting up Intune

I'm not going to cover [the setup of Intune](https://docs.microsoft.com/en-us/intune/get-started/start-with-a-paid-subscription-to-microsoft-intune-step-1) in detail as there are plenty of existing resources available including the official Microsoft document. I highly recommend reading [the getting started guide](https://docs.microsoft.com/en-us/intune/get-started/start-with-a-paid-subscription-to-microsoft-intune) and using the [Microsoft IT Pro Cloud Essentials](https://www.microsoft.com/itprocloudessentials/) site to setup a trial environment if you're new to Intune.

Once you have Azure AD and Intune provisioned, we can connect Intune to the Windows Store for Business and start managing Universal apps.

## Connect Intune to the Windows Store for Business

To start managing Universal apps with Intune, we need to first [associate our Intune deployment](https://docs.microsoft.com/en-us/intune/deploy-use/manage-apps-you-purchased-from-the-windows-store-for-business-with-microsoft-intune) with [the Windows Store for Business that we set up previously]({{site.baseurl}}/setup-windows-store-for-business/). This is a 3-step process:

<ol class="lf-text-block lf-block" data-lf-anchor-id="e9d33c57cef1fea91ccd03e76b2b6373:0">
  <li>
    Ensure that you sign into the Business Store using the same tenant account you use to sign into Intune
  </li>
  <li>
    In the Business Store, choose <strong>Settings</strong> > <strong>Management tools</strong>
  </li>
  <li>
    On the Management tools page, choose <strong>Add a management tool</strong>, and choose <strong>Microsoft Intune</strong>.
  </li>
</ol>

You should see a screen similar to the below. This sets Intune as the device management authority. Note that I've already associated my Intune tenant.

![Associating Intune with the Windows Store for Business to start managing Universal apps]({{site.baseurl}}/media/2016/12/AssociateIntuneWSfB.png)*Associating Intune with the Windows Store for Business to start managing Universal apps*</figure>

Now we can synchronise the Universal app inventory with Intune.

## Managing Universal Apps

Synchronising the Business Store inventory with Intune will show the full list of subscribed apps in the Intune console from which we can then target user or device groups.

Sign into the Intune console and configure sync:

  1. Navigate to **Admin** / **Mobile Device Management** / **Windows** / **Store for Business**
  2. Click **Configure Sync**
  3. Select **Enable Windows Store for Business Sync** and click **OK**

Which should look like the screenshot below. Once configured click the **Sync now** button and wait for the first synchronisation.

![Configuring Windows Store for Business app sync in the Intune console]({{site.baseurl}}/media/2016/12/IntuneStoreSync1.png)*Configuring Windows Store for Business app sync in the Intune console*</figure>

Now navigate to **Apps** / **Apps** / **Volume-Purchased Apps**. The list of Universal apps from the Business Store inventory should be displayed.

![Volume Purchased Apps in the Intune console, synchronised from the Windows Store for Business]({{site.baseurl}}/media/2016/12/Volume-Purchased-Apps.png)*Volume Purchased Apps in the Intune console, synchronised from the Windows Store for Business*</figure>

Apps added to the Business Store inventory will appear immediately after a sync, so unlike the Windows Store app on devices, we don't need to wait 12-24 hours for apps to appear in the list.

### Targeting Apps

Now that we have a list of apps, the deployment to users can be managed. Because we have a list of apps in the Inventory that we want to deploy and a list of apps to target for removal from devices the deployment options can be set per app.

To deploy apps:

  1. Select the app or a selection of apps
  2. **Select the user groups** (and by extension their devices) to target. Create custom groups to target specific users. Click **Next.**

![Managing Universal app deployment in Intune by targeting user groups]({{site.baseurl}}/media/2016/12/Deploy-Apps-Users.png)*Managing Universal app deployment in Intune by targeting user groups*</figure>

<ol start="3">
  <li>
    Set the <strong>Approval</strong> to <strong>Uninstall</strong> or <strong>Required Install</strong> as desired.
  </li>
  <li>
    Click <strong>Finish</strong> and the application action will take effect when the devices next sync.
  </li>
</ol>

![Setting deployment options on the application]({{site.baseurl}}/media/2016/12/Deploy-Apps-Uninstall.png)*Setting deployment options on the application*</figure>

Now when a Windows 10 PC is provisioned, enrolled into Azure AD and Intune MDM, the Universal apps will be deployed and removed as required. If you have targeted the inbox applications, **this will include removal of apps and even those pesky tiles on the default Start menu**.

![Target those unwanted apps for uninstall]({{site.baseurl}}/media/2016/12/Windows10-Initial-Logon.png)*Target those unwanted apps for uninstall*</figure>

#### Updates

Updates to Universal apps are automatic. Windows will automatically handle updates to installed apps going forward and this should be largely seamless to the user.

#### Intune Company Portal

One app worth highlighting is the [Intune Company Portal for Windows 10](https://www.microsoft.com/en-au/store/p/company-portal/9wzdncrfj3pz). The Compay Portal, especially since the latest update last week to the app to support Windows 10, provides users with a nice interface to their enrolled devices, available legacy apps and Universal apps configured as links to the Windows Store. While this is a separate interface to the Windows Store app

With an Azure AD joined Windows 10 PC, enrolled for Intune MDM, the Company Portal app can be targeted to all users and installed when their device is provisioned. [Applications installed via an MSI can be targeted to MDM](https://docs.microsoft.com/en-us/intune/deploy-use/add-apps-for-mobile-devices-in-microsoft-intune) enrolled PCs and made available for users to install via the Portal.

![The Intune Company Portal Universal app]({{site.baseurl}}/media/2016/12/Intune-Company-Portal2.png)*The Intune Company Portal Universal app*</figure>

## Online vs. Offline Distribution

In this scenario where Universal apps are synchronised with the Business Store and deployed via Volume-Purchased Apps, app distribution is _Online_. Where devices are connected to the Internet and managed via a cloud-based device management solution, this type of distribution mechanism makes sense.

Intune does support _Offline_ distribution of Universal apps; however, this doesn't necessarily make sense for connected devices plus access to download apps from the Windows Store for Business for offline distribution is controlled by the vendor of the app. If they don't make the app available for offline distribution you must deliver the app online.

## Conclusion

In this article, I've detailed the steps required for managing Universal apps on Windows 10 PCs enrolled for MDM management with Microsoft Intune. While this approach may not yet be right for every organisation, I do see this gaining traction for smaller organisations in the future.