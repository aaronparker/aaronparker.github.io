---
title: Integrating Citrix NetScaler with Azure AD and Conditional Access
date: 2017-03-15T09:00:59+10:00
author: Aaron Parker
layout: post
permalink: /netscaler-azure-ad-conditional-access/
image: /media/2017/03/15950623571_4d4acacfb8_k.jpg
categories:
  - Citrix
tags:
  - Azure AD
  - Conditional Access
  - NetScaler
  - SAML
---
* this unordered seed list will be replaced by the toc
{:toc}

Every so often a few of your favourite technologies intersect to create something magical and your passion for IT is renewed. That happened for me this week when configured Citrix NetScaler to authenticate to [Azure Active Directory](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-whatis) via [SAML](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language) and enforce access to XenApp via [Azure Multi-factor Authentication](https://docs.microsoft.com/en-us/azure/multi-factor-authentication/multi-factor-authentication) and [Azure AD Conditional Access](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-conditional-access) policies. The possibilities for securing remote access and the improved user experience that this configuration provides is so damn cool, everyone should know about it.

Having said that, I'm pretty sure I'm late to the party - [Anton van Pelt](https://twitter.com/AntonvanPelt) has [covered most of the required configuration steps](https://www.antonvanpelt.com/use-azure-ad-idp-citrix-federated-authentication-service/) already; however,  it's based on the Azure Classic portal. Here's I'll cover some of the configuration via the Azure Resource Manager portal.

## Modern Authentication for NetScaler

The use of cloud services is gaining traction rapidly - I'd be hard pressed to meet a customer that is not using a SaaS application. Organisations migrating to Microsoft's cloud offerings, such as Office 365, have access to Azure AD and can therefore enable Single Sign-on to across all SaaS apps. This can leave remote access to hosted applications through NetScaler stand out with a different authentication experience. Additionally traditional NetScaler Gateway configurations will have seperate access and authorisation policies from those SaaS apps.

So, here's your traditional remote access front-end (with some nice branding, if you ask me).

![Citrix StoreFront login page]({{site.baseurl}}/media/2017/03/StoreFrontLogin.png)

Citrix StoreFront login page
{:.figcaption}

However, instead of authenticating directly to on-premises Active Directory and a 3rd party MFA solution ([remember these?](https://www.google.com.au/search?q=rsa+token&espv=2&source=lnms&tbm=isch&sa=X&ved=0ahUKEwigqZn8msnSAhXlI8AKHbhYDCoQ_AUIBigB&biw=1920&bih=1006&dpr=1)) you can provide users with a consistent authentication experience, apply a single set of access policies against your hosted and SaaS apps and gain insights into user identity protection.

Identity is the new control plane, where you can offload the entire authentication process away from NetScaler to Azure AD.

![Azure AD Sign in page]({{site.baseurl}}/media/2017/03/AzureADLogin.png)

Azure AD Sign in page
{:.figcaption}

If you had the opportunity to start with a completely new IT infrastructure, how would you design it? Perhaps push as much as you can into a protected data centre (on-prem or in a public cloud), use XenApp to deliver legacy applications and provide end-users with device choice that you can manage without deploying any infrastructure. That's something I've done a few times now over the past 12-months.

![Azure AD MFA prompt]({{site.baseurl}}/media/2017/03/AzureADMFAPrompt.png)

Azure AD MFA prompt
{:.figcaption}

When configured, your XenApp or XenDesktop resources are available from the Microsoft Azure AD Access Panel along side a user's other applications, plus self-service access with an approval workflow is possible.

![MyApps Access Panel with 'My Hosted Apps' - access to XenApp via NetScaler]({{site.baseurl}}/media/2017/03/MyAppsAccessPanel.png)

MyApps Access Panel with 'My Hosted Apps' - access to XenApp via NetScaler
{:.figcaption}

Your users now have a consistent method of accessing and authenticating to both on-premises and SaaS applications and you have one place to manage access to applications whether they're legacy on-premises apps or new SaaS apps hosted anywhere.

## Building the Solution

To configure NetScaler to use SAML authentication for Azure AD and pass credentials successfully into the XenApp host there are a few required components. These are:

* Citrix NetScaler - version 10+ is required to configure SAML authentication
* StoreFront 3.6+ - StoreFront 3.5 or 3.0 will likely work; however, you'll want to ensure you are keeping StoreFront current with your XenApp or XenDesktop environment
* Citrix XenDesktop / XenApp 7.9+ - required to support Citrix Federated Authentication Service 
* [Citrix Federated Authentication Service](https://docs.citrix.com/en-us/xenapp-and-xendesktop/7-13/secure/federated-authentication-service.html) - FAS is required to support SAML authentication. Users are issued with virtual smart cards when logging onto XenApp or XenDesktop resources
* Active Directory Certificate Services - FAS integrates with ADCS to issue certificates. If you don't already have an enterprise PKI deployment, I have previously written about [deploying Active Directory Certificate Services]({{site.baseurl}}/deploy-enterprise-root-certificate-authority/).
* Azure AD Connect - to synchronise identities into Azure AD. You can deploy this configuration with [AD FS](https://technet.microsoft.com/en-us/windows-server-docs/identity/ad-fs/ad-fs-2016-overview) as well, but for my purposes, I'm using Azure AD for SAML authentication.

In addition to the above, you'll of course require an Azure tenant to use Azure AD. While you can deploy this solution with the free tier of Azure AD, [Azure AD Basic or Premium](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-editions) is required for MFA or branding. In most cases, customers will be purchasing Azure AD Premium as a component of the [Microsoft Enterprise Security + Mobility](https://www.microsoft.com/en-au/cloud-platform/enterprise-mobility-security) suite.

The Citrix Federated Authentication Service architecture is shown in the diagram below. The Citrix documentation is aimed at configuring FAS with AD FS; however, it works just about the same way with Azure AD, so I've made some modifications to the diagram:

![Citrix Federated Authentication Service architecture]({{site.baseurl}}/media/2017/03/fas-architecture.png)

Citrix Federated Authentication Service architecture
{:.figcaption}

FAS is very simple to set up - if your certificate infrastructure is working correctly, the FAS configuration tool does the heavy lifting for you. If the official documentation hasn't helped you, check out [Carl Stalhood's article on FAS as well](http://www.carlstalhood.com/citrix-federated-authentication-service-saml/).

I did run into an issue after I'd gotten authentication to work - launching a desktop would fail to log into the desktop, but I could login manually. Turned out I had forgotten to deploy certificates to my domain controller - ensure your DCs used by StoreFront and your controllers have a server authentication certificate.

## Adding an App to Azure AD

To add support for NetScaler, you'll need to [add a custom application to Azure AD](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-integrating-applications). Sign into the Azure portal, select Azure Active Directory and [add a Non-gallery Application under Enterprise applications](https://portal.azure.com/#blade/Microsoft_AAD_IAM/AppGalleryApplicationsBlade/category/topapps). Once there, you'll need to define properties for your NetScaler Gateway.

* **Name** - provide users with an application name that makes sense to your users. I've used 'My Hosted Apps' in my lab
* Azure AD **Identifier** maps to **Issuer name** in the NetScaler Gateway Authentication SAML Server page. Use the public URL to your NetScaler Gateway
* The Reply URL should be the SAML endpoint URL on your NetScaler Gateway, e.g. https://apps.home.stealthpuppy.com**/cgi/samlauth**

During testing I did run into an issue with SAML assertion - after authenticating to Azure AD, the browser presented "SAML Assertion verification failed". This turned out to be an issue with the Azure AD SAML Signing Certificate. After creating a new certificate and deploying it to NetScaler, authentication worked.

When configuring your NetScaler Gateway application in Azure AD, your Single sign-on configuration should look something like this:

![Enterprise Single Sign-on for 'My Hosted Apps']({{site.baseurl}}/media/2017/03/MyHostedApps-EnterpriseAppConfig.png)

Enterprise Single Sign-on for 'My Hosted Apps'
{:.figcaption}

Open the Configure blade to find the URLs you'll need when configuring SAML authentication on your NetScaler Gateway. Here's you'll find:

* SAML Single Sign-On Service URL
* SAML Entity ID
* Sign-Out URL

![Single Sign-on URLs for 'My Hosted Apps']({{site.baseurl}}/media/2017/03/MyHostedApps-SingleSignOnConfig.png)

Single Sign-on URLs for 'My Hosted Apps'
{:.figcaption}

Now that your application is configured, you can move into configuring a SAML policy on your NetScaler.

## Configuring NetScaler for SAML Authentication

The Citrix documentation covers [the configuration of SAML](https://docs.citrix.com/en-us/netscaler-gateway/11-1/authentication-authorization/configure-saml.html); however, it's geared around AD FS, so some minor adjustments will be required. Your first step should be to download the Azure AD SAML signing certificate and add it to your appliance. I would also recommend adding a public certificate.

When creating the SAML policy and creating a SAML server configuration use the following URLs:

* Enter the **SAML Single Sign-On Service URL** into the **Redirect URL**
* **SAML Entity ID** is not used in the SAML server configuration, although NetScaler does see it during a user authentication
* **Enter Sign-Out URL** into the **Single Logout URL**
* Use the same URL used in the **Identifier** in Azure AD in the **Issuer Name** field

Your configuration should then look similar to the following screenshot:

![Configuring the SAML server on NetScaler]({{site.baseurl}}/media/2017/03/NetScaler-ConfigureSAMLServer.png)

Configuring the SAML server on NetScaler
{:.figcaption}

After successfully authenticating during my initial testing, StoreFront would display 'Cannot complete your request'. To fix that, remove the Single Sign-on Domain from the [Session Policies](http://www.carlstalhood.com/session-policies-for-storefront-netscaler-11/) bound to the virtual server.

![Remove the Single Sign-on domain from the NetScaler Session Policy]({{site.baseurl}}/media/2017/03/NetScaler-ConfigureSessionPolicy.png)

Remove the Single Sign-on domain from the NetScaler Session Policy
{:.figcaption}

If you've configured each of the components correctly, logging into NetScaler Gateway via Azure AD should get you to your XenApp or XenDesktop resources.

### Callback URL

[Update 19/03/2017] I ran into an issue whereby the StoreFront page would display "Cannot Complete your Request" after successfully logging in. The following error was displayed in the Citrix Delivery Services event log on the StoreFront server:

> A CitrixAGBasic Login request has failed.  
> Citrix.DeliveryServicesClients.Authentication.AG.AGAuthenticatorException, Citrix.DeliveryServicesClients.Authentication, Version=3.9.0.0, Culture=neutral, PublicKeyToken=null  
> Authenticate encountered an exception.  
> at Citrix.DeliveryServicesClients.Authentication.AG.AGAuthenticator.Authenticate(HttpRequestBase clientRequest, Boolean& passwordSupplied)  
> at Citrix.Web.AuthControllers.Controllers.GatewayAuthController.Login()
> 
> System.Net.WebException, System, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089  
> The remote server returned an error: (403) Forbidden.  
> Url: https://<storefront fqdn>/Citrix/<store>Auth/CitrixAGBasic/Authenticate  
> ExceptionStatus: ProtocolError  
> ResponseStatus: Forbidden  
> at System.Net.HttpWebRequest.GetResponse()  
> at Citrix.DeliveryServicesClients.Utilities.HttpHelpers.ReceiveResponse(HttpWebRequest req)  
> at Citrix.DeliveryServicesClients.Authentication.TokenIssuingClient.RequestToken(String url, RequestToken requestToken, String primaryToken, String languages, CookieContainer cookieContainer, IEnumerable\`1 acceptedResponseTypes, IDictionary\`2 additionalHeaders)  
> at Citrix.DeliveryServicesClients.Authentication.AG.AGAuthenticator.Authenticate(HttpRequestBase clientRequest, Boolean& passwordSupplied)

I had not added a Callback URL as it's optional since StoreFront 2.6 and only required for the [SmartAccess](https://docs.citrix.com/en-us/netscaler-gateway/10-1/ng-xa-xd-integration-edocs-landing/ng-integrate-web-interface-apps-wrapper/ng-smartaccess-wrapper-con/ng-smartaccess-how-it-works-con.html) feature. Since I'm passing the conditional access control to Azure AD, I don't need SmartAccess and therefore don't really need to add the Callback URL. However, in this instance, adding the Callback URL fixed the "Cannot Complete your Request" issue.

### Citrix Receiver

It's important to note here that Citrix Receiver does not yet support SAML authentication natively. Launching applications in the local Receiver via the browser is possible for a native user experience. SAML support is on the roadmap.

### Access Control

Currently this approach doesn't work with Access Control on NetScaler Gateway connections. For example, you might want to restrict client-mapped drives or the clipboard if the user is logging on from an untrusted machine or location. 

Conditional Access does have a Session Control feature to enforce application restrictions based on the conditions set in the access policy. Given the [statement of support from Citrix for Microsoft EMS](https://www.citrix.com/blogs/2017/01/09/better-together-netscaler-unified-gateway-microsoft-ems-2/), I hope to this this feature supported in the near future.

![Session Controls in Conditional Access]({{site.baseurl}}/media/2017/03/ConditionalAccess-SessionControls.png)

Session Controls in Conditional Access
{:.figcaption}

### Single Sign-On

[Single sign-on is possible from AD domain-joined or Azure AD domain-joined PCs](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-appssoaccess-whatis), on both your internal network and the Internet. Here's an example user experience launching a XenApp desktop on the browser in the native Receiver, on Windows 10 joined directly to Azure AD:

[Single Sign-on experience to NetScaler and XenApp on Windows 10](https://www.youtube.com/watch?v=v4KmnfznU5o)

Single Sign-on experience to NetScaler and XenApp on Windows 10
{:.figcaption}

## Conditional Access

Now you can choose to enforce [Conditional Access](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-conditional-access) against NetScaler. Conditional Access policies allow control over several access and configuration scenarios. Conditional Access allows you to specify the conditions and requirements under which a user can connect to your XenApp or XenDesktop resources.

![Azure AD Conditional Access overview]({{site.baseurl}}/media/2017/03/conditionalaccess-overview.png)

Azure AD Conditional Access overview
{:.figcaption}

For example, you could choose :

* Enforce MFA - Azure AD handles the multi-factor authentication without NetScaler having to know anything about the MFA provider (being Azure AD in this instance)
* Choose to not prompt for MFA when coming from a known network - don't prompt users for MFA if they are in the office
* [Require a compliant device](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-conditional-access-policy-connected-applications) - the device must be enrolled in Intune and in a compliant state. With this requirement, the device becomes a 3rd factor for authentication and you can have some confidence that the device accessing your resources is secure
* Require a domain joined devices - you may want to restrict access to Windows PCs joined to a traditional Active Directory domain. This requires configuring [registration of those devices into Azure Active Directory](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-conditional-access-automatic-device-registration-setup) so that you can apply Conditional Access against them
* Enforce access from specific locations or device types

![Applying Conditional Access controls to NetScaler]({{site.baseurl}}/media/2017/03/ConditionalAccess-Controls.png)

Applying Conditional Access controls to NetScaler
{:.figcaption}

Device based Conditional Access is a great way of further securing access to your on-premises resources; however, it's worth noting that today Microsoft does not yet include support for macOS. Support for macOS is "coming soon".

![Device support for Conditional Access]({{site.baseurl}}/media/2017/03/ConditionalAccess-Devices.png)

Device support for Conditional Access
{:.figcaption}

### Non-compliant Devices

The screenshot below shows the experience from a non-compliant device. Here I'm logging onto NetScaler from a machine that is not managed by my Intune instance, therefore it's non-compliant with my organisational policies. If this was a personal device, [I could enrol it](https://docs.microsoft.com/en-us/intune/deploy-use/enroll-devices-in-microsoft-intune) to be compliant with those policies.

![Access to NetScaler from a non-compliant device]({{site.baseurl}}/media/2017/03/LoginFromUntrustedDevice.png)

Access to NetScaler from a non-compliant device
{:.figcaption}

## Conclusion

Assuming you're embracing cloud identity, integrating NetScaler with Azure AD is an excellent way to deliver a consistent user experience across all on-premises and SaaS applications. If you've not yet extended into Azure AD, this could be a great driver to do so. Adding Azure AD Premium provides you with MFA and conditional access controls that you can apply consistently across all of your legacy and SaaS apps.

Utilising Azure AD for authentication and conditional access provides you with more secure authentication and device trust capabilities than you could achieve using on-premises solutions and with [Identity Protection](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-identityprotection) you can extend this protect even further. It's my view that Azure AD Conditional Access is a better solution that End Point Analysis provided with NetScaler because you are relying on the capabilities built into the operating system with deep integration into the authentication mechanism.

Citrix has a couple of features to deliver in the near future, even so NetScaler + Azure AD is pretty damn cool.
