---
id: 5427
title: Integrating Citrix NetScaler with Azure AD and Conditional Access
date: 2017-03-15T09:00:59+10:00
author: Aaron Parker
layout: post
guid: http://stealthpuppy.com/?p=5427
permalink: /netscaler-azure-ad-conditional-access/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "5645987144"
image: /wp-content/uploads/2017/03/15950623571_4d4acacfb8_k.jpg
categories:
  - Citrix
tags:
  - Azure AD
  - Conditional Access
  - NetScaler
  - SAML
---
Every so often a few of your favourite technologies intersect to create&nbsp;something magical and your passion for IT is renewed. That happened for me this week when configured Citrix NetScaler to authenticate to [Azure Active Directory](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-whatis) via [SAML](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language) and enforce access to XenApp via [Azure Multi-factor Authentication](https://docs.microsoft.com/en-us/azure/multi-factor-authentication/multi-factor-authentication) and&nbsp;[Azure AD Conditional Access](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-conditional-access) policies. The possibilities for securing remote access and the improved user experience that this configuration provides is so damn cool, everyone should know about it.

Having said that, I&#8217;m pretty sure I&#8217;m late to the party&nbsp;&#8211;&nbsp;[Anton van Pelt](https://twitter.com/AntonvanPelt)&nbsp;has&nbsp;[covered most of the required configuration steps](https://www.antonvanpelt.com/use-azure-ad-idp-citrix-federated-authentication-service/) already; however, &nbsp;it&#8217;s based on the Azure Classic portal. Here&#8217;s I&#8217;ll cover some of the configuration via the Azure Resource Manager portal.

# Modern Authentication for NetScaler

The use of cloud services is gaining traction rapidly &#8211; I&#8217;d be hard pressed to meet a customer that is not using a SaaS application. Organisations migrating to Microsoft&#8217;s cloud offerings, such as&nbsp;Office 365, have access to Azure AD and can therefore enable&nbsp;Single Sign-on to across all SaaS&nbsp;apps.&nbsp;This can leave remote access to hosted applications through NetScaler stand out with a different authentication experience.&nbsp;Additionally traditional NetScaler Gateway configurations will have seperate access and authorisation policies from those SaaS apps.

So, here&#8217;s your traditional remote access front-end (with some nice branding, if you ask me).

<figure id="attachment_5388" aria-describedby="caption-attachment-5388" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5388" src="http://stealthpuppy.com/wp-content/uploads/2017/03/StoreFrontLogin-1024x587.png" alt="Citrix StoreFront login page" width="1024" height="587" srcset="http://192.168.0.89/wp-content/uploads/2017/03/StoreFrontLogin-1024x587.png 1024w, http://192.168.0.89/wp-content/uploads/2017/03/StoreFrontLogin-150x86.png 150w, http://192.168.0.89/wp-content/uploads/2017/03/StoreFrontLogin-300x172.png 300w, http://192.168.0.89/wp-content/uploads/2017/03/StoreFrontLogin-768x441.png 768w, http://192.168.0.89/wp-content/uploads/2017/03/StoreFrontLogin.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/03/StoreFrontLogin.png)<figcaption id="caption-attachment-5388" class="wp-caption-text">Citrix StoreFront login page</figcaption></figure>

However, instead of authenticating directly to on-premises Active Directory and a 3rd party MFA solution&nbsp;([remember these?](https://www.google.com.au/search?q=rsa+token&espv=2&source=lnms&tbm=isch&sa=X&ved=0ahUKEwigqZn8msnSAhXlI8AKHbhYDCoQ_AUIBigB&biw=1920&bih=1006&dpr=1)) you can provide users with a consistent authentication experience, apply a single set of access policies against your hosted and SaaS apps and gain insights into user identity protection.

Identity is the new control plane, where you can offload the entire authentication process away from NetScaler to Azure AD.

<figure id="attachment_5387" aria-describedby="caption-attachment-5387" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5387" src="http://stealthpuppy.com/wp-content/uploads/2017/03/AzureADLogin-1024x587.png" alt="Azure AD Sign in page" width="1024" height="587" srcset="http://192.168.0.89/wp-content/uploads/2017/03/AzureADLogin-1024x587.png 1024w, http://192.168.0.89/wp-content/uploads/2017/03/AzureADLogin-150x86.png 150w, http://192.168.0.89/wp-content/uploads/2017/03/AzureADLogin-300x172.png 300w, http://192.168.0.89/wp-content/uploads/2017/03/AzureADLogin-768x441.png 768w, http://192.168.0.89/wp-content/uploads/2017/03/AzureADLogin.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/03/AzureADLogin.png)<figcaption id="caption-attachment-5387" class="wp-caption-text">Azure AD Sign in page</figcaption></figure>

If you had the opportunity to start with a completely new IT infrastructure, how would you design it? Perhaps push as much as you can into a protected data centre (on-prem or in a public cloud), use XenApp to deliver legacy applications and provide end-users with device choice that you can manage without deploying any infrastructure. That&#8217;s something I&#8217;ve done a few times now over the past 12-months.

<figure id="attachment_5392" aria-describedby="caption-attachment-5392" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5392" src="http://stealthpuppy.com/wp-content/uploads/2017/03/AzureADMFAPrompt-1024x587.png" alt="Azure AD MFA prompt" width="1024" height="587" srcset="http://192.168.0.89/wp-content/uploads/2017/03/AzureADMFAPrompt-1024x587.png 1024w, http://192.168.0.89/wp-content/uploads/2017/03/AzureADMFAPrompt-150x86.png 150w, http://192.168.0.89/wp-content/uploads/2017/03/AzureADMFAPrompt-300x172.png 300w, http://192.168.0.89/wp-content/uploads/2017/03/AzureADMFAPrompt-768x441.png 768w, http://192.168.0.89/wp-content/uploads/2017/03/AzureADMFAPrompt.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/03/AzureADMFAPrompt.png)<figcaption id="caption-attachment-5392" class="wp-caption-text">Azure AD MFA prompt</figcaption></figure>

When configured, your XenApp or XenDesktop resources are available from the Microsoft Azure AD Access Panel along side a user&#8217;s other applications, plus self-service access with an approval workflow is possible.

<figure id="attachment_5394" aria-describedby="caption-attachment-5394" style="width: 1024px" class="wp-caption alignnone">[<img class="wp-image-5394 size-large" src="http://stealthpuppy.com/wp-content/uploads/2017/03/MyAppsAccessPanel-1024x587.png" alt="MyApps Access Panel with 'My Hosted Apps' - access to XenApp via NetScaler" width="1024" height="587" srcset="http://192.168.0.89/wp-content/uploads/2017/03/MyAppsAccessPanel-1024x587.png 1024w, http://192.168.0.89/wp-content/uploads/2017/03/MyAppsAccessPanel-150x86.png 150w, http://192.168.0.89/wp-content/uploads/2017/03/MyAppsAccessPanel-300x172.png 300w, http://192.168.0.89/wp-content/uploads/2017/03/MyAppsAccessPanel-768x441.png 768w, http://192.168.0.89/wp-content/uploads/2017/03/MyAppsAccessPanel.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/03/MyAppsAccessPanel.png)<figcaption id="caption-attachment-5394" class="wp-caption-text">MyApps Access Panel with &#8216;My Hosted Apps&#8217; &#8211; access to XenApp via NetScaler</figcaption></figure>

Your users now have a consistent method of accessing and authenticating to both on-premises and SaaS applications and you have one place to manage access to applications whether they&#8217;re legacy on-premises apps or new SaaS apps hosted anywhere.

# Building the Solution

To configure NetScaler to use&nbsp;SAML authentication for Azure AD and pass credentials successfully into the XenApp host there are a few required components. These are:

  * Citrix NetScaler &#8211; version 10+ is required to configure SAML authentication
  * StoreFront 3.6+ &#8211; StoreFront 3.5 or 3.0 will likely work; however, you&#8217;ll want to ensure you are keeping StoreFront current with your XenApp or XenDesktop environment
  * Citrix XenDesktop / XenApp 7.9+ &#8211; required to support Citrix Federated Authentication Service&nbsp;
  * [Citrix Federated Authentication Service](https://docs.citrix.com/en-us/xenapp-and-xendesktop/7-13/secure/federated-authentication-service.html)&nbsp;&#8211; FAS is required to support SAML authentication. Users are issued with virtual smart cards when logging onto XenApp or XenDesktop resources
  * Active Directory Certificate Services &#8211; FAS integrates with ADCS to issue certificates. If you don&#8217;t already have an enterprise PKI deployment, I have previously written about [deploying Active Directory Certificate Services](http://stealthpuppy.com/deploy-enterprise-root-certificate-authority/).
  * Azure AD Connect &#8211; to synchronise identities into Azure AD. You can deploy this configuration with [AD FS](https://technet.microsoft.com/en-us/windows-server-docs/identity/ad-fs/ad-fs-2016-overview) as well, but for my purposes, I&#8217;m using Azure AD for SAML authentication.

In addition to the above, you&#8217;ll of course require an Azure tenant to use Azure AD. While you can deploy this solution with the free tier of Azure AD, [Azure AD Basic or Premium](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-editions) is required for&nbsp;MFA or branding. In most cases, customers will be purchasing Azure AD Premium as a component of the [Microsoft Enterprise Security + Mobility](https://www.microsoft.com/en-au/cloud-platform/enterprise-mobility-security) suite.

The Citrix Federated Authentication Service architecture is shown in the&nbsp;diagram below. The Citrix documentation is aimed at configuring FAS with AD FS; however, it works just about the same way with Azure AD, so I&#8217;ve made some modifications to the diagram:

<figure id="attachment_5402" aria-describedby="caption-attachment-5402" style="width: 707px" class="wp-caption alignnone">[<img class="size-full wp-image-5402" src="http://stealthpuppy.com/wp-content/uploads/2017/03/fas-architecture.png" alt="Citrix Federated Authentication Service architecture" width="707" height="371" srcset="http://192.168.0.89/wp-content/uploads/2017/03/fas-architecture.png 707w, http://192.168.0.89/wp-content/uploads/2017/03/fas-architecture-150x79.png 150w, http://192.168.0.89/wp-content/uploads/2017/03/fas-architecture-300x157.png 300w" sizes="(max-width: 707px) 100vw, 707px" />](http://stealthpuppy.com/wp-content/uploads/2017/03/fas-architecture.png)<figcaption id="caption-attachment-5402" class="wp-caption-text">Citrix Federated Authentication Service architecture</figcaption></figure>

FAS is very simple to set up &#8211; if your certificate infrastructure is working correctly, the FAS configuration tool does the heavy lifting for you. If the official documentation hasn&#8217;t helped you, check out [Carl Stalhood&#8217;s article on FAS as well](http://www.carlstalhood.com/citrix-federated-authentication-service-saml/).

I did run into an issue after I&#8217;d gotten authentication to work &#8211; launching a desktop would fail to log into the desktop, but I could login manually. Turned out I had forgotten to deploy certificates to my domain controller &#8211; ensure your DCs used by StoreFront and your controllers have a server authentication certificate.

# Adding an App to Azure AD

To add support for NetScaler, you&#8217;ll need to [add a custom application to Azure AD](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-integrating-applications). Sign into the Azure portal, select Azure Active Directory and [add a Non-gallery Application under Enterprise applications](https://portal.azure.com/#blade/Microsoft_AAD_IAM/AppGalleryApplicationsBlade/category/topapps). Once there, you&#8217;ll need to define properties for your NetScaler Gateway.

  * **Name** &#8211; provide users with an application name that makes sense to your users. I&#8217;ve used &#8216;My Hosted Apps&#8217; in my lab
  * Azure AD **Identifier** maps to **Issuer name** in the NetScaler Gateway&nbsp;Authentication SAML Server page. Use the public URL to your NetScaler Gateway
  * The Reply URL should be the SAML endpoint URL on your NetScaler Gateway, e.g. https://apps.home.stealthpuppy.com**/cgi/samlauth**

During testing I did run into an issue with SAML assertion &#8211; after authenticating to Azure AD, the browser presented &#8220;SAML Assertion verification failed&#8221;. This turned out to be an issue with the Azure AD SAML Signing Certificate. After creating a new certificate and deploying it to NetScaler, authentication worked.

When configuring your NetScaler Gateway application in Azure AD, your Single sign-on configuration should look something like this:

<figure id="attachment_5396" aria-describedby="caption-attachment-5396" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5396" src="http://stealthpuppy.com/wp-content/uploads/2017/03/MyHostedApps-EnterpriseAppConfig-1024x587.png" alt="Enterprise Single Sign-on for 'My Hosted Apps'" width="1024" height="587" srcset="http://192.168.0.89/wp-content/uploads/2017/03/MyHostedApps-EnterpriseAppConfig-1024x587.png 1024w, http://192.168.0.89/wp-content/uploads/2017/03/MyHostedApps-EnterpriseAppConfig-150x86.png 150w, http://192.168.0.89/wp-content/uploads/2017/03/MyHostedApps-EnterpriseAppConfig-300x172.png 300w, http://192.168.0.89/wp-content/uploads/2017/03/MyHostedApps-EnterpriseAppConfig-768x441.png 768w, http://192.168.0.89/wp-content/uploads/2017/03/MyHostedApps-EnterpriseAppConfig.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/03/MyHostedApps-EnterpriseAppConfig.png)<figcaption id="caption-attachment-5396" class="wp-caption-text">Enterprise Single Sign-on for &#8216;My Hosted Apps&#8217;</figcaption></figure>

Open the Configure blade to find the URLs you&#8217;ll need when configuring SAML authentication on your NetScaler Gateway. Here&#8217;s you&#8217;ll find:

  * SAML Single Sign-On Service URL
  * SAML Entity ID
  * Sign-Out URL

<figure id="attachment_5397" aria-describedby="caption-attachment-5397" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5397" src="http://stealthpuppy.com/wp-content/uploads/2017/03/MyHostedApps-SingleSignOnConfig-1024x587.png" alt="Single Sign-on URLs for 'My Hosted Apps'" width="1024" height="587" srcset="http://192.168.0.89/wp-content/uploads/2017/03/MyHostedApps-SingleSignOnConfig-1024x587.png 1024w, http://192.168.0.89/wp-content/uploads/2017/03/MyHostedApps-SingleSignOnConfig-150x86.png 150w, http://192.168.0.89/wp-content/uploads/2017/03/MyHostedApps-SingleSignOnConfig-300x172.png 300w, http://192.168.0.89/wp-content/uploads/2017/03/MyHostedApps-SingleSignOnConfig-768x441.png 768w, http://192.168.0.89/wp-content/uploads/2017/03/MyHostedApps-SingleSignOnConfig.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/03/MyHostedApps-SingleSignOnConfig.png)<figcaption id="caption-attachment-5397" class="wp-caption-text">Single Sign-on URLs for &#8216;My Hosted Apps&#8217;</figcaption></figure>

Now that your application is configured, you can move into configuring a SAML policy on your NetScaler.

# Configuring NetScaler for&nbsp;SAML Authentication

The Citrix documentation covers [the configuration of SAML](https://docs.citrix.com/en-us/netscaler-gateway/11-1/authentication-authorization/configure-saml.html); however, it&#8217;s geared around AD FS, so some minor adjustments will be required. Your first step should be to download the Azure AD SAML signing certificate and add it to your appliance. I would also recommend adding a public certificate&nbsp;

When creating the SAML policy and creating a SAML server configuration use the following URLs:

  * Enter the **SAML Single Sign-On Service URL** into the **Redirect URL**
  * **SAML Entity ID** is not used in the SAML server configuration, although NetScaler does see&nbsp;it during a user authentication
  * **Enter Sign-Out URL** into the **Single Logout URL**
  * Use the same URL used in the **Identifier** in Azure AD in the **Issuer Name** field

Your configuration should then look similar to the following screenshot:

<figure id="attachment_5398" aria-describedby="caption-attachment-5398" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5398" src="http://stealthpuppy.com/wp-content/uploads/2017/03/NetScaler-ConfigureSAMLServer-1024x587.png" alt="Configuring the SAML server on NetScaler" width="1024" height="587" srcset="http://192.168.0.89/wp-content/uploads/2017/03/NetScaler-ConfigureSAMLServer-1024x587.png 1024w, http://192.168.0.89/wp-content/uploads/2017/03/NetScaler-ConfigureSAMLServer-150x86.png 150w, http://192.168.0.89/wp-content/uploads/2017/03/NetScaler-ConfigureSAMLServer-300x172.png 300w, http://192.168.0.89/wp-content/uploads/2017/03/NetScaler-ConfigureSAMLServer-768x441.png 768w, http://192.168.0.89/wp-content/uploads/2017/03/NetScaler-ConfigureSAMLServer.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/03/NetScaler-ConfigureSAMLServer.png)<figcaption id="caption-attachment-5398" class="wp-caption-text">Configuring the SAML server on NetScaler</figcaption></figure>

After successfully authenticating during my initial testing, StoreFront would display &#8216;Cannot complete your request&#8217;. To fix that, remove the Single Sign-on Domain from the [Session Policies](http://www.carlstalhood.com/session-policies-for-storefront-netscaler-11/)&nbsp;bound to the virtual server.

<figure id="attachment_5399" aria-describedby="caption-attachment-5399" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5399" src="http://stealthpuppy.com/wp-content/uploads/2017/03/NetScaler-ConfigureSessionPolicy-1024x587.png" alt="Remove the Single Sign-on domain from the NetScaler Session Policy" width="1024" height="587" srcset="http://192.168.0.89/wp-content/uploads/2017/03/NetScaler-ConfigureSessionPolicy-1024x587.png 1024w, http://192.168.0.89/wp-content/uploads/2017/03/NetScaler-ConfigureSessionPolicy-150x86.png 150w, http://192.168.0.89/wp-content/uploads/2017/03/NetScaler-ConfigureSessionPolicy-300x172.png 300w, http://192.168.0.89/wp-content/uploads/2017/03/NetScaler-ConfigureSessionPolicy-768x441.png 768w, http://192.168.0.89/wp-content/uploads/2017/03/NetScaler-ConfigureSessionPolicy.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/03/NetScaler-ConfigureSessionPolicy.png)<figcaption id="caption-attachment-5399" class="wp-caption-text">Remove the Single Sign-on domain from the NetScaler Session Policy</figcaption></figure>

If you&#8217;ve configured each of the components correctly, logging into NetScaler Gateway via Azure AD should get you to your XenApp or XenDesktop resources.

## Callback URL

[Update 19/03/2017] I ran into an issue whereby the StoreFront page would display &#8220;Cannot Complete your Request&#8221; after successfully logging in. The following error was displayed in the&nbsp;Citrix Delivery Services event log on the StoreFront server:

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

I had not added a Callback URL as it&#8217;s optional since StoreFront 2.6&nbsp;and only required for the&nbsp;[SmartAccess](https://docs.citrix.com/en-us/netscaler-gateway/10-1/ng-xa-xd-integration-edocs-landing/ng-integrate-web-interface-apps-wrapper/ng-smartaccess-wrapper-con/ng-smartaccess-how-it-works-con.html) feature. Since I&#8217;m passing the conditional access control to Azure AD, I don&#8217;t need SmartAccess and therefore don&#8217;t really need to add the Callback URL. However, in this instance, adding the Callback URL fixed the&nbsp;&#8220;Cannot Complete your Request&#8221; issue.

## Citrix Receiver

It&#8217;s important to note here that Citrix Receiver does not yet support SAML authentication natively. Launching applications in the local Receiver via the browser is possible for a native user experience. SAML support is on the roadmap.

## Access Control

Currently this approach doesn&#8217;t work with Access Control on NetScaler Gateway connections. For example, you might want to restrict client-mapped drives or the clipboard if the user is logging on from an untrusted machine or location.&nbsp;

Conditional Access does have a Session Control feature to enforce application restrictions based on the conditions set in the access policy. Given the [statement of support from Citrix for Microsoft EMS](https://www.citrix.com/blogs/2017/01/09/better-together-netscaler-unified-gateway-microsoft-ems-2/), I hope to this this feature supported in the near future.

<figure id="attachment_5412" aria-describedby="caption-attachment-5412" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5412" src="http://stealthpuppy.com/wp-content/uploads/2017/03/ConditionalAccess-SessionControls-1024x587.png" alt="Session Controls in Conditional Access" width="1024" height="587" srcset="http://192.168.0.89/wp-content/uploads/2017/03/ConditionalAccess-SessionControls-1024x587.png 1024w, http://192.168.0.89/wp-content/uploads/2017/03/ConditionalAccess-SessionControls-150x86.png 150w, http://192.168.0.89/wp-content/uploads/2017/03/ConditionalAccess-SessionControls-300x172.png 300w, http://192.168.0.89/wp-content/uploads/2017/03/ConditionalAccess-SessionControls-768x441.png 768w, http://192.168.0.89/wp-content/uploads/2017/03/ConditionalAccess-SessionControls.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/03/ConditionalAccess-SessionControls.png)<figcaption id="caption-attachment-5412" class="wp-caption-text">Session Controls in Conditional Access</figcaption></figure>

## Single Sign-On

[Single sign-on is possible from AD domain-joined or Azure AD domain-joined PCs](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-appssoaccess-whatis), on both your internal network and the Internet. Here&#8217;s an example user experience launching a XenApp desktop on the browser in the native Receiver, on&nbsp;Windows 10 joined directly to Azure AD:



# Conditional Access

Now you can choose to enforce [Conditional Access](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-conditional-access) against NetScaler. Conditional Access policies allow control over several access and configuration scenarios. Conditional Access allows you to specify the conditions and requirements under which a user can connect to your XenApp or XenDesktop resources.

<figure id="attachment_5407" aria-describedby="caption-attachment-5407" style="width: 624px" class="wp-caption alignnone">[<img class="size-full wp-image-5407" src="http://stealthpuppy.com/wp-content/uploads/2017/03/conditionalaccess-overview.png" alt="Azure AD Conditional Access overview" width="624" height="349" srcset="http://192.168.0.89/wp-content/uploads/2017/03/conditionalaccess-overview.png 624w, http://192.168.0.89/wp-content/uploads/2017/03/conditionalaccess-overview-150x84.png 150w, http://192.168.0.89/wp-content/uploads/2017/03/conditionalaccess-overview-300x168.png 300w" sizes="(max-width: 624px) 100vw, 624px" />](http://stealthpuppy.com/wp-content/uploads/2017/03/conditionalaccess-overview.png)<figcaption id="caption-attachment-5407" class="wp-caption-text">Azure AD Conditional Access overview</figcaption></figure>

For example, you could choose :

  * Enforce MFA &#8211; Azure AD handles the multi-factor authentication&nbsp;without NetScaler having to know anything about the MFA provider (being Azure AD in this instance)
  * Choose to not prompt for MFA when coming from a known network &#8211; don&#8217;t prompt users for MFA if they are in the office
  * [Require a compliant device](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-conditional-access-policy-connected-applications) &#8211; the device must be enrolled in Intune and in a compliant state. With this requirement, the device becomes a 3rd factor for authentication and you can have some confidence that the device accessing your resources is secure
  * Require a domain joined devices &#8211; you may want to restrict access to Windows PCs joined to a traditional Active Directory domain. This requires configuring [registration of those devices into Azure Active Directory](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-conditional-access-automatic-device-registration-setup) so that you can apply Conditional Access against them
  * Enforce access from specific locations or device types

<figure id="attachment_5405" aria-describedby="caption-attachment-5405" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5405" src="http://stealthpuppy.com/wp-content/uploads/2017/03/ConditionalAccess-Controls-1024x587.png" alt="Applying Conditional Access controls to NetScaler" width="1024" height="587" srcset="http://192.168.0.89/wp-content/uploads/2017/03/ConditionalAccess-Controls-1024x587.png 1024w, http://192.168.0.89/wp-content/uploads/2017/03/ConditionalAccess-Controls-150x86.png 150w, http://192.168.0.89/wp-content/uploads/2017/03/ConditionalAccess-Controls-300x172.png 300w, http://192.168.0.89/wp-content/uploads/2017/03/ConditionalAccess-Controls-768x441.png 768w, http://192.168.0.89/wp-content/uploads/2017/03/ConditionalAccess-Controls.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/03/ConditionalAccess-Controls.png)<figcaption id="caption-attachment-5405" class="wp-caption-text">Applying Conditional Access controls to NetScaler</figcaption></figure>

Device based Conditional Access is a great way of further securing access to your on-premises resources; however, it&#8217;s worth noting that today Microsoft&nbsp;does not yet include support for macOS. Support for macOS is &#8220;coming soon&#8221;.

<figure id="attachment_5414" aria-describedby="caption-attachment-5414" style="width: 624px" class="wp-caption alignnone">[<img class="size-full wp-image-5414" src="http://stealthpuppy.com/wp-content/uploads/2017/03/ConditionalAccess-Devices.png" alt="Device support for Conditional Access" width="624" height="293" srcset="http://192.168.0.89/wp-content/uploads/2017/03/ConditionalAccess-Devices.png 624w, http://192.168.0.89/wp-content/uploads/2017/03/ConditionalAccess-Devices-150x70.png 150w, http://192.168.0.89/wp-content/uploads/2017/03/ConditionalAccess-Devices-300x141.png 300w" sizes="(max-width: 624px) 100vw, 624px" />](http://stealthpuppy.com/wp-content/uploads/2017/03/ConditionalAccess-Devices.png)<figcaption id="caption-attachment-5414" class="wp-caption-text">Device support for Conditional Access</figcaption></figure>

## Non-compliant&nbsp;Devices

The screenshot below shows the experience from a non-compliant device. Here I&#8217;m logging onto NetScaler from a machine that is not managed by my Intune instance, therefore it&#8217;s non-compliant with my organisational policies. If this was a personal device, [I could enrol it](https://docs.microsoft.com/en-us/intune/deploy-use/enroll-devices-in-microsoft-intune) to be compliant with those policies.

<figure id="attachment_5417" aria-describedby="caption-attachment-5417" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5417" src="http://stealthpuppy.com/wp-content/uploads/2017/03/LoginFromUntrustedDevice-1024x640.png" alt="Access to NetScaler from a non-compliant device" width="1024" height="640" srcset="http://192.168.0.89/wp-content/uploads/2017/03/LoginFromUntrustedDevice-1024x640.png 1024w, http://192.168.0.89/wp-content/uploads/2017/03/LoginFromUntrustedDevice-150x94.png 150w, http://192.168.0.89/wp-content/uploads/2017/03/LoginFromUntrustedDevice-300x188.png 300w, http://192.168.0.89/wp-content/uploads/2017/03/LoginFromUntrustedDevice-768x480.png 768w, http://192.168.0.89/wp-content/uploads/2017/03/LoginFromUntrustedDevice.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/03/LoginFromUntrustedDevice.png)<figcaption id="caption-attachment-5417" class="wp-caption-text">Access to NetScaler from a non-compliant device</figcaption></figure>

# Conclusion

Assuming you&#8217;re embracing cloud identity, integrating NetScaler with Azure AD is an excellent way to deliver&nbsp;a consistent user experience across all on-premises and SaaS applications. If you&#8217;ve not yet extended into Azure AD, this could be a great driver to do so. Adding Azure AD Premium provides you with MFA and conditional access controls that you can apply consistently across all of your legacy and SaaS apps.

Utilising Azure AD for authentication and conditional access provides you with more secure authentication and device trust capabilities than you could achieve using on-premises solutions and with [Identity Protection](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-identityprotection)&nbsp;you can extend this protect even further. It&#8217;s my view that Azure AD Conditional Access is a better solution that End Point Analysis provided with NetScaler because you are relying on the capabilities built into the operating system with deep integration into the authentication mechanism.

Citrix has a couple of features to deliver in the near future, even so NetScaler + Azure AD is pretty damn cool.