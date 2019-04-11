---
id: 4955
title: Windows Store User Experience in the Enterprise in Windows 10
date: 2016-07-20T23:32:07+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=4955
permalink: /windows-store-experience-enterprise-windows-10/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "5000131405"
image: /media/2016/07/BusinessStoreWIndows10Enterprise1607.png
categories:
  - Microsoft
tags:
  - Windows 10
  - Windows Store
---
Chicken Little seems to be working overtime when it comes to the Windows Store in Windows 10. I've read and heard many different thoughts and approaches to the Store in Windows 10, but I believe that the Store and Universal apps should be embraced. It would; however, be nice to have more control over user interaction with the Store and in-box Univeral apps.

There are a number of the in-box Universal apps that I would consider to be useful, at least if you're deploying Current Branch / Current Branch for Business. These include Edge, Calculator, Photos, Weather, News and perhaps even Sticky Notes (in 1607). Some organisations would find the growing list of 3rd party apps including Twitter and Facebook (think marketing) useful for deployment.

While it remains to be seen how many line-of-business applications that will embrace the Universal app platform, deploying and updating Universal apps is far simpler than traditional Win32 apps - roaming preferences notwithstanding.

# Managing the Windows Store without Disabling It

If you're looking to embrace or at least maintaining some of the in-box Universal apps, there are a number of steps you should be taking:

  * [Extend your on-premises Active Directory into Azure AD](https://azure.microsoft.com/en-us/documentation/articles/active-directory-aadconnect/). Whether you're considering rolling out Microsoft services such as Office 365 or [other services on the Azure platform](http://azureplatform.azurewebsites.net/en-us/), extending into Azure AD will a part of almost organisation's Windows 10 deployments. Extending into Azure AD does not require you to purchase any Azure services - [Azure AD Basic](https://azure.microsoft.com/en-us/documentation/articles/active-directory-editions/) is free and provides what is needed for integration into cloud services.
  * Microsoft provides [AD Connect to enable synchronisation into Azure AD](https://azure.microsoft.com/en-us/documentation/articles/active-directory-aadconnect-topologies/). The minimum amount of effort to enable synchronisation is surprisingly simple to setup.
  * Setup the Windows [Store for Business](https://www.microsoft.com/business-store/), enabling IT to curate a list of Universal apps for their users (you could even curate no apps and hide the public links). [Setting up the Store for Business](https://technet.microsoft.com/en-us/windows/store-for-business.aspx) is very straight-forward. Note that you'll get all of the Office Mobile apps by default and adding a new app takes around 24 hours for it to appear in the Store on devices.

With these components in place, the following scenarios are enabled:

  * Users logging with their cloud credentials (credentials in the cloud or synchronised from Active Directory) onto [Azure AD joined Windows 10 PCs](https://blogs.technet.microsoft.com/enterprisemobility/2015/05/28/azure-ad-join-on-windows-10-devices/) are enabled for single sign-on to the Store and other apps that leverage Azure AD or Office 365 services. Azure AD join is a great use case for greenfield deployments, but be certain of current and future PC management requirements - the case for Active Directory joined PCs is still valid.
  * Users on Windows 10 stand-alone (typically personal devices) or Active Directory domain member PCs (without Azure AD sync or Azure AD Premium) can [manually add their work credentials to their PC](https://blogs.technet.microsoft.com/enterprisemobility/2015/05/21/azure-ad-on-windows-10-personal-devices/) and sign into the Store.
  * Windows 10 domain members with AD Connect/ADFS and Azure AD Premium are single signed-on into the Store (and other apps that Azure AD or Office 365 services) once [Workplace Join](https://technet.microsoft.com/en-us/library/dn280945(v=ws.11).aspx) is configured.

The last scenario is ideal for most organisations extending their environments into Azure AD and should be completed as a part of your Windows 10 deployment. A couple of articles are great references for this setup:

  * [Connect domain-joined devices to Azure AD for Windows 10 experiences](https://azure.microsoft.com/en-us/documentation/articles/active-directory-azureadjoin-devices-group-policy/). Documents the PowerShell command and optional ADFS claims rules, and Group Policy configuration required to setup Workplace Join.
  * [Azure AD Connect: Enabling device writeback](https://azure.microsoft.com/en-us/documentation/articles/active-directory-aadconnect-feature-device-writeback/). While this article states that device writeback is used to [enable conditional access based on devices to ADFS protected applications](https://azure.microsoft.com/en-us/documentation/articles/active-directory-conditional-access-on-premises-setup/), the automatic configuration of Workplace Join didn't work until I enabled device writeback. This feature does require Azure AD Premium, so it will be interesting to see how readily organisations will be willing to pay for [Azure AD Premium](https://azure.microsoft.com/en-us/documentation/articles/active-directory-editions/#premium-features).

Microsoft has recently stated [the Enterprise Mobility Suite is the fastest growing product in their history](https://rcpmag.com/articles/2015/09/01/enterprise-mobility.aspx) and I think access to Azure AD Premium in EMS could be a large part of that growth.

In any of the 3 scenarios above and the Business Store enabled, users can install apps on their devices from the list of apps that IT has subscribed to:

![Windows Store for Business in Windows 10 1511]({{site.baseurl}}/media/2016/07/Store-1511.png)*Windows Store for Business in Windows 10 1511*</figure>

# Showing Only the Business Store

Now that the Business Store is enabled and available on user devices, we can start to take some control over what users see in the Store. By default, this will be the Business Store as well as the public links as seen in the screenshot above. To disable the public links we can enable the [RequirePrivateStoreOnly](https://technet.microsoft.com/en-us/itpro/windows/manage/manage-access-to-private-store) policy.

This is actually an MDM policy that's not available in Group Policy, so unless you managing devices with an MDM solution, you'll need to configure this with a direct Registry edit via PowerShell, as below, or other means such as Group Policy Preferences.

<pre class="lang:ps decode:true" title="Hiding the public links in the Windows 10 Store"># Hide the public links in the Windows Store
$RegPath = "Microsoft.PowerShell.Core\Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\PolicyManager\default\ApplicationManagement\RequirePrivateStoreOnly"
New-ItemProperty -Path $RegPath -Name "value" -Value 1 -Force</pre>

This results in a curated view only of the Store, which could look something like this:

![Windows Store showing the Private Store only, in Windows 10 Pro 1511]({{site.baseurl}}/media/2016/07/Parallels-Windows-10-1511-Private-Store-only.png)*Windows Store showing the Private Store only, in Windows 10 Pro 1511*</figure>

So without resorting hacking our Windows 10 image or AppLocker or Windows Firewall controls on the Store, IT now has some control over what users see and which applications can be added to their PCs.

# Bypassing the Business Store

It's not all roses though - users can still directly access applications from the public Store via direct links to those apps. Direct links are available from a couple of places - suggestions shown by default on the Start menu and on the web. If you want to control the app suggestions on the Start menu, PCs will need to be running Windows 10 Enterprise or Education editions.

To see bypassing the Business Store, search the web for an example app, e.g. <a href="https://www.microsoft.com/en-au/store/apps/facebook/9wzdncrfj2wl" target="_blank">the Windows 10 Facebook app</a>. A user can click on the 'Get the app' button on that page which will launch the Store:

![Facebook for Windows 10]({{site.baseurl}}/media/2016/07/FacebookInStore.png)*Facebook for Windows 10*</figure>

A user can click on 'Free' button. If the user can add a Microsoft account to Windows, they can install the app. To prevent that, you'll want to [block Microsoft accounts](https://technet.microsoft.com/en-us/itpro/windows/keep-secure/accounts-block-microsoft-accounts).

# Windows 10 1607 Changes the Store Behaviour

Along with the changes to the [Group Policy that hides the Store](https://support.microsoft.com/en-us/kb/3135657) in Windows 10 1511, now restricted to Enterprise or Education editions only; 1607 will also restrict the ability to hide the public links in the Store also to Enterprise and Education.

Shown here is the Windows Store on the same PC, running Windows 10 Pro upgraded from 1511 to 1607. With the policy still in place, the public links are shown again:

![Windows Store with the Private Store enabled in Windows 10 Pro 1607]({{site.baseurl}}/media/2016/07/Parallels-Windows-10-1607-Store.png)*Windows Store with the Private Store enabled in Windows 10 Pro 1607*</figure>

With Windows 10 Enterprise or Education editions, I can maintain full control over the consumer user experiences in Windows. Organisations running Windows 10 Pro will not be able to implement these controls.

# Conclusion

With Windows 10, Microsoft is changing the user experience in big ways and pushing organisations towards [subscription options](https://blogs.windows.com/windowsexperience/2016/07/12/announcing-new-subscription-options-for-windows-10-and-surface-for-businesses/) for tighter control over the user experience. Regardless, I believe that IT should, and will eventually be forced to, embrace the new Windows world. Organisations without Software Assurance won't be able to maintain the control they've been used to.

Finally, here's a couple of articles that I found useful when setting up Workplace Join with Azure AD:

  * [Why and how you should register your Windows 10 Domain Joined PC’s with Azure AD](https://jankesblog.com/2016/01/20/why-and-how-you-should-register-your-windows-10-domain-joined-pcs-with-azure-ad/)
  * [How Domain Join is different in Windows 10 with Azure AD](https://jairocadena.com/2016/01/18/how-domain-join-is-different-in-windows-10-with-azure-ad/)