---
id: 5354
title: Setting up the Windows Store for Business
date: 2016-12-12T08:00:31+10:00
author: Aaron Parker
layout: post
guid: http://stealthpuppy.com/?p=5354
permalink: /setting-up-windows-store-for-business/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "5375930108"
image: /wp-content/uploads/2016/12/14992123054_8295b89b82_k.jpg
categories:
  - Microsoft
tags:
  - Windows 10
  - Windows Store
  - Windows Store for Business
---
While the Universal app platform on Windows 10 isn&#8217;t going to replace legacy Win32 apps for some time, the potential of this platform to improve the way IT approaches application lifecycle management is high. Apps can be deployed, updated and removed without packaging or having to worry about application conflicts. It&#8217;s encouraging&nbsp;to see a number of useful enterprise applications available - the future is mobile apps, even on the desktop, so every enterprise should be looking at the Windows Store for Business.

_Even if you&#8217;re not intending to deliver Universal apps at this time, or even hiding the Store app on Windows 10 desktops, you should configure the Windows Store for Business._&nbsp;This ensures full control over the user experience.

In a previous article, [I&#8217;ve detailed how to manage the Windows Store experience on Windows 10](http://stealthpuppy.com/windows-store-experience-enterprise-windows-10/), and I now want to cover a couple of additional scenarios with Intune and Configuration Manager. The first step; however, is to detail setting up the Windows Store for Business. For any Windows 10 Current Branch or Current Branch for Business deployment, whether Professional or Enterprise edition, this is a key first step.

Configuring the Windows Store for Business (WSfB) in your environment provides control over the Windows Store by enabling a private store within the Windows Store app (Enterprise edition required to hide the public links) and with management tools (e.g. Intune and Configuration Manager) you have the ability to add or remove Universal applications to and from Windows 10. This is just one of a few reasons why I tell anyone who&#8217;ll listen that Azure AD is in your future (unless you&#8217;re there already) whether you know it or not.

At a high level, the process to configure the WSfB is as follows:

  1. Create a Microsoft Azure&nbsp;tenant
  2. Configure a domain
  3. Optionally, configure AD Connect (or ADFS)
  4. Create or enable a Global Administrator in Azure AD
  5. Sign up for the Windows Store for Business
  6. Configure the App Inventory

I&#8217;m not going to cover these in detail but I will cover the key steps and provide links to additional reading. If you already have an Azure tenant configured with a custom domain and AD Connect/ADFS, you can, of course, skip to the Windows Store for Business configuration. All that&#8217;s required is user accounts synchronised or federated to Azure AD.

If you don&#8217;t have any on-premises identities, then you can create an Azure tenant for Azure AD functionality and skip the steps on configuring AD Connect/ADFS.

# Create an Azure tenant

If you&#8217;re already using a Microsoft cloud service, such as Office 365, an Azure AD tenant will already exist. Ensure you do not have an existing tenant before proceeding.

Creating an Azure tenant is required because we&#8217;ll need to sign in a corporate account that is an Azure AD Global Administrator. Here&#8217;s a great article on understanding the requirements and configuration for [integrating your on-premises identities with Azure Active Directory](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-aadconnect).

Microsoft has [a short video available that shows the Azure sign up](https://azure.microsoft.com/en-us/resources/videos/sign-up-for-microsoft-azure/) process&nbsp;and the steps are:

  1. Navigate to the Azure sign up page at&nbsp;<https://account.windowsazure.com/SignUp>
  2. Sign in with a Microsoft account. If this is a corporate environment, it may be wise to create a dedicated Microsoft account for this purpose and [protect it with multi-factor authentication](https://support.microsoft.com/en-au/help/12408/microsoft-account-about-two-step-verification)
  3. Add personal information such as region, phone details and organisation name etc.
  4. Verify your identity via phone (an SMS or phone call can be used)
  5. Add credit card details. It&#8217;s important to note here that the card will not be charged until you use a paid tier of an Azure service, so this process can be done without paying Microsoft
  6. Agree to the subscription agreement, offer details and privacy statement. Be sure to deselect signing up for special offers

Setting up an Azure tenant is quite simple, just be sure to pay attention to the region you&#8217;re setting as default (i.e. your sign up region) and the account used to sign up to the service. Once sign up is complete, you&#8217;ll have a certain amount of credit to use within Azure for testing.

<figure id="attachment_5304" aria-describedby="caption-attachment-5304" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5304" src="http://stealthpuppy.com/wp-content/uploads/2016/12/Azure-StartUsing-1024x640.png" alt="The Azure subscription is ready to use" width="1024" height="640" srcset="https://stealthpuppy.com/wp-content/uploads/2016/12/Azure-StartUsing-1024x640.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/12/Azure-StartUsing-150x94.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/12/Azure-StartUsing-300x188.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/12/Azure-StartUsing-768x480.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/12/Azure-StartUsing.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/12/Azure-StartUsing.png)<figcaption id="caption-attachment-5304" class="wp-caption-text">The Azure subscription is ready to use</figcaption></figure>

Before configuring anything else in the new Azure tenant, configure a custom domain. You&#8217;ll notice that the default domain will be <domain>.onemicrosoft.com.

## Configure a Domain

A custom domain is required to use account within a namespace that better aligns with your corporate identity and you will need to own the custom domain. In my Azure tenant I&#8217;m using a subdomain of stealthpuppy.com; however, you may want to use your primary domain to ensure user account names align with corporate email addresses.

[Adding a domain can now be done in the Azure Portal](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-domains-add-azure-portal) (i.e. the Resource Manager portal instead of the old [Classic portal](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-add-domain)):

  1. Open the **Azure Active Directory** resource and click on [**Domain names**](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Domains)
  2. Click **Add** and enter your domain name
  3. You will be prompted to verify the domain name by adding a [TXT](https://en.wikipedia.org/wiki/TXT_record) record with provided details. Setting up DNS will differ depending on the DNS provider
  4. Once DNS is updated, click **Verify** and you should see that the domain is added

The process for adding a custom domain is [slightly different when using ADFS](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-add-domain-federated).

At this point, you can make the new domain the primary domain for Azure AD.

<figure id="attachment_5305" aria-describedby="caption-attachment-5305" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5305" src="http://stealthpuppy.com/wp-content/uploads/2016/12/01_VerifyDomainName-1024x587.png" alt="Add and verify a custom domain in Azure" width="1024" height="587" srcset="https://stealthpuppy.com/wp-content/uploads/2016/12/01_VerifyDomainName-1024x587.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/12/01_VerifyDomainName-150x86.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/12/01_VerifyDomainName-300x172.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/12/01_VerifyDomainName-768x441.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/12/01_VerifyDomainName.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/12/01_VerifyDomainName.png)<figcaption id="caption-attachment-5305" class="wp-caption-text">Add and verify a custom domain in Azure</figcaption></figure>

# Configure Azure AD Connect/ADFS

Microsoft provides detailed [instructions on setting up AD Connect](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-aadconnect-prerequisites) on the Azure documentation site. Exactly how to do that in your environment is out of the scope of this article, but AD Connect to synchronise accounts into [Azure AD with the Express setup](https://docs.microsoft.com/en-us/azure/active-directory/connect/active-directory-aadconnect-get-started-express) is the simplest and fastest way to get up and running.

Again, I highly recommend reading this article on&nbsp;[integrating your on-premises identities with Azure Active Directory](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-aadconnect).

# Create an Azure Global Administrator

Signing up for or into the Windows Store for Business&nbsp;requires a work or school account, i.e. an account from Azure AD.

<figure id="attachment_5308" aria-describedby="caption-attachment-5308" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5308" src="http://stealthpuppy.com/wp-content/uploads/2016/12/02_CreateAzureADUser-1024x587.png" alt="Creating an Azure AD user and assigning a Directory role" width="1024" height="587" srcset="https://stealthpuppy.com/wp-content/uploads/2016/12/02_CreateAzureADUser-1024x587.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/12/02_CreateAzureADUser-150x86.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/12/02_CreateAzureADUser-300x172.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/12/02_CreateAzureADUser-768x441.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/12/02_CreateAzureADUser.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/12/02_CreateAzureADUser.png)<figcaption id="caption-attachment-5308" class="wp-caption-text">Creating an Azure AD user and assigning a Directory role</figcaption></figure>

# Setup the Windows Store for Business

Configuring the Windows Store for Business is very simple

  1. Log onto [the WSfB site](https://www.microsoft.com/business-store) with an account from Azure AD
  2. Accept the usage agreement
  3. Configure the private store name
  4. Add apps to your Inventory

## Sign Up and Initial Configuration

Logging onto the WSfB site for the first time will bind the Store configuration to your Azure tenant. You can [sign up to the WSfB without an Azure AD tenant](https://technet.microsoft.com/en-au/itpro/windows/manage/sign-up-windows-store-for-business) and you will then be directed to create an Azure tenant; however, creating that first is a better approach.

Navigate to&nbsp;<https://www.microsoft.com/business-store>&nbsp;and sign in, accept the usage agreement and you will see a basic Store configuration.

<figure id="attachment_5310" aria-describedby="caption-attachment-5310" style="width: 1024px" class="wp-caption alignnone">[<img class="wp-image-5310 size-large" src="http://stealthpuppy.com/wp-content/uploads/2016/12/03_SignUpWIndowsStoreBusiness-1024x587.png" alt="Sign up for the Windows Store for Business" width="1024" height="587" srcset="https://stealthpuppy.com/wp-content/uploads/2016/12/03_SignUpWIndowsStoreBusiness-1024x587.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/12/03_SignUpWIndowsStoreBusiness-150x86.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/12/03_SignUpWIndowsStoreBusiness-300x172.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/12/03_SignUpWIndowsStoreBusiness-768x441.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/12/03_SignUpWIndowsStoreBusiness.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/12/03_SignUpWIndowsStoreBusiness.png)<figcaption id="caption-attachment-5310" class="wp-caption-text">Sign up for the Windows Store for Business</figcaption></figure>

Configure the Private store display name - this will appear in the Windows Store app on Windows 10 devices. Click **Settings** / **Private store**. Keep this short, but something that will be clear to users.

<figure id="attachment_5311" aria-describedby="caption-attachment-5311" style="width: 1024px" class="wp-caption alignnone">[<img class="wp-image-5311 size-large" src="http://stealthpuppy.com/wp-content/uploads/2016/12/05_WindowsStoreBusiness-NamePrivateStore-1024x587.png" alt="Setting the Private store display name in the Windows Store for Business" width="1024" height="587" srcset="https://stealthpuppy.com/wp-content/uploads/2016/12/05_WindowsStoreBusiness-NamePrivateStore-1024x587.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/12/05_WindowsStoreBusiness-NamePrivateStore-150x86.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/12/05_WindowsStoreBusiness-NamePrivateStore-300x172.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/12/05_WindowsStoreBusiness-NamePrivateStore-768x441.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/12/05_WindowsStoreBusiness-NamePrivateStore.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/12/05_WindowsStoreBusiness-NamePrivateStore.png)<figcaption id="caption-attachment-5311" class="wp-caption-text">Setting the Private store display name in the Windows Store for Business</figcaption></figure>

## Configure the App Inventory

Next, click **Manage** / **Inventory** to view the initial app inventory. A number of the Office mobile applications will be listed and in the process of being added to the Private store. _Adding apps to the Private store will take 12-24 hours to appear in the Windows Store app on user&#8217;s devices_ - not a short process.

<figure id="attachment_5312" aria-describedby="caption-attachment-5312" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5312" src="http://stealthpuppy.com/wp-content/uploads/2016/12/06_WindowsStoreBusiness-InitialInventory-1024x587.png" alt="Viewing the Inventory in the Windows Store for Business" width="1024" height="587" srcset="https://stealthpuppy.com/wp-content/uploads/2016/12/06_WindowsStoreBusiness-InitialInventory-1024x587.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/12/06_WindowsStoreBusiness-InitialInventory-150x86.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/12/06_WindowsStoreBusiness-InitialInventory-300x172.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/12/06_WindowsStoreBusiness-InitialInventory-768x441.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/12/06_WindowsStoreBusiness-InitialInventory.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/12/06_WindowsStoreBusiness-InitialInventory.png)<figcaption id="caption-attachment-5312" class="wp-caption-text">Viewing the Inventory in the Windows Store for Business</figcaption></figure>

_Until the &#8216;Add in progress&#8217; action is complete, you cannot remove these initial apps from the Private store_. Keep an eye on these once the process is complete and remove from the Private store as required.

At this point you have a number of decisions to make:

  1. **Which Universal apps do we want to deliver to users?**&nbsp;Don&#8217;t think about delivery mechanism at this point, just consider apps that will be useful
  2. **Which apps do we to remove from user devices?** You can target inbox apps for removal (using Intune or Configuration Manager, or a 3rd party solution)
  3. If you&#8217;re deploying Windows 10 Enterprise edition - **will the Windows Store app be available to users?**&nbsp;Only with Enterprise edition will you have full control over the Store app
  4. **Which apps will be made available in the Windows Store app?**&nbsp;If you elect to keep the Store app available, the WSfB allows IT to curate a list of apps. This would typically be a subset of the total apps in your Inventory

### Add Apps to Your Inventory

Here are a few recommendations for adding apps to the Inventory, in no particular order:

  1. **Add all of the inbox Windows 10 apps**. Unfortunately, not all inbox apps are available in the WSfB. For example, the Microsoft Solitare Collection isn&#8217;t listed
  2. Windows 10 and Windows 8/8.1 apps are available in the WSfB - **target Windows 10 apps where possible** as these will provide a more consistent user experience as they are designed for Windows 10
  3. While perhaps subjective, **find apps that can be useful in your environment**. This could be an opportunity to show what&#8217;s possible with the Universal app platform
  4. **Don&#8217;t forget about browser extensions for Edge**. These could be added to the Private store to allow users to install themselves
  5. **Not all apps are available for the desktop** - apps that work on Windows 10 Mobile are listed in the WSfB as well. This seems counterintuitive to a &#8220;Universal app platform&#8221;, but that&#8217;s the reality. If you&#8217;re managing Windows 10 mobile devices, then you&#8217;ll manage apps for all platforms from the WSfB
  6. **The Windows Store app on Windows 10 is a little easier for finding apps including finding apps from a specific developer**. You can then search for those apps in the WSfB.

### Managing Apps

Once you have a reasonable number of apps, management can become a little cumbersome, use the search feature or the&nbsp;**Refine** dropdown to filter apps. Here I&#8217;ve filtered by only those apps added to the private store.&nbsp;

<figure id="attachment_5315" aria-describedby="caption-attachment-5315" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5315" src="http://stealthpuppy.com/wp-content/uploads/2016/12/07_WindowsStoreBusiness-PrivateStore-1024x907.png" alt="Filtering on apps in the Private store in the Windows Store for Business" width="1024" height="907" srcset="https://stealthpuppy.com/wp-content/uploads/2016/12/07_WindowsStoreBusiness-PrivateStore-1024x907.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/12/07_WindowsStoreBusiness-PrivateStore-150x133.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/12/07_WindowsStoreBusiness-PrivateStore-300x266.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/12/07_WindowsStoreBusiness-PrivateStore-768x681.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/12/07_WindowsStoreBusiness-PrivateStore.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/12/07_WindowsStoreBusiness-PrivateStore.png)<figcaption id="caption-attachment-5315" class="wp-caption-text">Filtering on apps in the Private store in the Windows Store for Business</figcaption></figure>

As mentioned above, **add those apps to the Inventory that you want to target for removal from end-user devices**. This includes the inbox apps and those that appear by default on the Start menu. This will provide&nbsp;the opportunity to target apps for removal using device management tools.

<figure id="attachment_5316" aria-describedby="caption-attachment-5316" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5316" src="http://stealthpuppy.com/wp-content/uploads/2016/12/TargettingUnwantedApps-1024x587.png" alt="Add even unwanted apps to the Windows Store for Business" width="1024" height="587" srcset="https://stealthpuppy.com/wp-content/uploads/2016/12/TargettingUnwantedApps-1024x587.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/12/TargettingUnwantedApps-150x86.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/12/TargettingUnwantedApps-300x172.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/12/TargettingUnwantedApps-768x441.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/12/TargettingUnwantedApps.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/12/TargettingUnwantedApps.png)<figcaption id="caption-attachment-5316" class="wp-caption-text">Add even unwanted apps to the Windows Store for Business</figcaption></figure>

### Assigning Apps

[Applications can be assigned to people](https://technet.microsoft.com/en-au/itpro/windows/manage/assign-apps-to-employees) (and licenses managed) from the Window Store for Business. However, this is largely not scaleable as only individual users can be selected.

<figure id="attachment_5318" aria-describedby="caption-attachment-5318" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5318" src="http://stealthpuppy.com/wp-content/uploads/2016/12/AssignToPeople-1024x587.png" alt="Assigning an app in the Windows Store for Business" width="1024" height="587" srcset="https://stealthpuppy.com/wp-content/uploads/2016/12/AssignToPeople-1024x587.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/12/AssignToPeople-150x86.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/12/AssignToPeople-300x172.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/12/AssignToPeople-768x441.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/12/AssignToPeople.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/12/AssignToPeople.png)<figcaption id="caption-attachment-5318" class="wp-caption-text">Assigning an app in the Windows Store for Business</figcaption></figure>

From a user experience perspective, apps are also not automatically assigned, instead the user will receive an email with a link to the apps which opens in the Store, or assigned apps can be viewed and installed from the My Library section in the Store app.

<figure id="attachment_5319" aria-describedby="caption-attachment-5319" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5319" src="http://stealthpuppy.com/wp-content/uploads/2016/12/Windows10StoreAppMyLibrary-1024x640.png" alt="My Library in the Windows 10 Store app" width="1024" height="640" srcset="https://stealthpuppy.com/wp-content/uploads/2016/12/Windows10StoreAppMyLibrary-1024x640.png 1024w, https://stealthpuppy.com/wp-content/uploads/2016/12/Windows10StoreAppMyLibrary-150x94.png 150w, https://stealthpuppy.com/wp-content/uploads/2016/12/Windows10StoreAppMyLibrary-300x188.png 300w, https://stealthpuppy.com/wp-content/uploads/2016/12/Windows10StoreAppMyLibrary-768x480.png 768w, https://stealthpuppy.com/wp-content/uploads/2016/12/Windows10StoreAppMyLibrary.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/12/Windows10StoreAppMyLibrary.png)<figcaption id="caption-attachment-5319" class="wp-caption-text">My Library in the Windows 10 Store app</figcaption></figure>

A better approach will be to use a management tool that enables automatic deployment (or removal) of apps to users or devices, which I&#8217;ll cover in upcoming articles.

# Conclusion

For existing enterprises moving to Windows 10, extending your on-premises identity into Azure AD and configuring the WSfB are important steps for managing the user experience on Windows 10.&nbsp;The Universal app platform shows promise from an application lifecycle management perspective and getting ready to deploy these apps on Windows 10 is considerably simpler than other mobile app platforms.&nbsp;

I&#8217;ve not covered online or offline Universal app deployment or VDI/SBC use-cases in this article, but I will cover integration of the Windows Store for Business with device management solutions in future articles.

Read the next article for details on [managing Universal apps with Microsoft Intune](http://stealthpuppy.com/managing-universal-apps-intune/).