---
id: 5796
title: Control Access to NetScaler by Country with Azure AD
date: 2017-09-28T15:03:51+10:00
author: Aaron Parker
layout: revision
guid: https://stealthpuppy.com/5792-revision-v1/
permalink: /5792-revision-v1/
---
Great news! [Microsoft has enabled a number of available conditions and custom controls in Azure AD](https://blogs.technet.microsoft.com/enterprisemobility/2017/09/27/whats-new-with-azure-active-directory-ignite-2017/) for use in Conditional Access making these policies even more useful. This includes a simple method to control access to Citrix NetScaler by country of origin.

Back in March of this year, I was working on a project to design a solution for hosting applications in an Azure data centre, with access provided by Citrix XenApp and NetScaler. This particular customer needed to control access to both Office 365 applications and XenApp from specific locations only.&nbsp;

By configuring [Citrix FAS](http://docs.citrix.com/en-us/xenapp-and-xendesktop/7-15-ltsr/secure/federated-authentication-service.html) and [NetScaler with SAML authentication to Azure AD](https://stealthpuppy.com/netscaler-azure-ad-conditional-access/), we were able to use [Named Locations in Azure AD](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-named-locations) Conditional Access policies to achieve the desired goal. For instance we could allow Office 365 only from compliant or domain-joined PCs and ensure access to XenApp only from specific locations. Thus for a certain group of users, they could only access Office 365 applications from XenApp and then only from a specific physical location.

All was well, until Microsoft pulled the ability to use Named Locations in Conditional Access policies half-way through the project. Lesson learned &#8211; never rely on preview features in Azure.

At Ignite 2017 this week, Microsoft announced a number of new conditions that includes the ability again to use Named Locations in conditions. What&#8217;s new here is the ability to pick from a list of countries when defining those locations. With the number of new conditions available, including Terms of Use, VPN connectivity and Custom controls, I am hoping that Microsoft will not pull these features in the future and instead get them out of preview as quickly as possible.

&nbsp;