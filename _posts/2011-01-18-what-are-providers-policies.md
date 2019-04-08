---
id: 2072
title: 'App-V FAQ: What are Providers Policies?'
date: 2011-01-18T15:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/app-v-faq-32-what-are-providers-policies/
permalink: /what-are-providers-policies/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "211536183"
categories:
  - FAQs
tags:
  - AppVFAQ
---
_This is a guest post from Jurjen van Leeuwen, an App-V MVP (_[_new for 2011_](http://leodesk.com/blog/2011/1/leodesk-mvp-for-app-v-2011.aspx)_) and independent consultant based in Norway. You can read more from Jurjen at_ [_his web site_](http://leodesk.com/blog.aspx)_._

<img style="margin: 0px 0px 5px 10px; display: inline; float: right;" src="http://stealthpuppy.com/wp-content/uploads/2010/06/AppVFAQLogo.png" alt="" align="right" /> Provider Policies are ‘rules’ that apply when users launch virtual applications from a Microsoft App-V Management Server using RTSP(s). Other App-V infrastructure scenarios or the use of the HTTP(s) protocol don’t support the use of Provider Policies.

The ‘rules’ allow App-V administrators to control the following settings:

  * **Server access -** The Active Directory group that can connect to the server through the Provider Policy.
  * **Authentication -** If authentication is required to connect to the server or the use of applications.
  * **Logging -** Record application usage data in the App-V data store.
  * **Licensing -** Whether or not to audit or enforce application licenses.
  * **Client refresh behaviour -** At which interval and events the client checks with the server for application changes. For example new applications and shortcuts, removed or disabled applications. At a refresh, the client will also communicate the application usage logging with the server if configured.

### Why would I use them?

Besides the Provider Policy created by the installation process of the App-V Management Server, called the Default Provider, you would basically need multiple Provider Policies if you require maintaining different configurations of the settings mentioned in the previous paragraph. For example different Provider Policies are required for auditing AND enforcing licensing: If you have one or more applications where you want to enforce licensing and monitor license usage for some other applications you will need two different Provider Policies. Another example would be a separate Provider Policy which doesn’t require authentication for specific applications for contractors.

### How do I use them?

Only the App-V Management Server offers the use of Provider Policies which itself requires Active Directory and Microsoft SQL to hold the App-V data store.

When installing the App-V Management Server one Provider Policy is created by default, called _Default Provider_. This Provider Policy is tied to the default created server group which is named Default Server Group, if no other name was specified during the App-V Management Server setup.

To create a new Provider Policy right click the Provider Policies node in the App-V Management Console and choose: _New Provider Policy_. The Properties screen allows for naming the new Provider Policy and the configuration of the client refresh behaviour. The minimum interval for a scheduled refresh is 30 minutes.

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="ProviderPolicyGeneral" src="http://stealthpuppy.com/wp-content/uploads/2011/01/ProviderPolicyGeneral_thumb.png" border="0" alt="ProviderPolicyGeneral" width="600" height="460" />](http://stealthpuppy.com/wp-content/uploads/2011/01/ProviderPolicyGeneral.png)

In the Group Assignment screen select the Active Directory groups that have access to the App-V server through this Provider Policy. A minimum of one group is required. The user has to be a member of this group when the Authentication checkbox is set on the Provider Pipeline screen.

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="ProviderPolicyGroupAssignment" src="http://stealthpuppy.com/wp-content/uploads/2011/01/ProviderPolicyGroupAssignment_thumb.png" border="0" alt="ProviderPolicyGroupAssignment" width="600" height="460" />](http://stealthpuppy.com/wp-content/uploads/2011/01/ProviderPolicyGroupAssignment.png)

The Provider Pipeline screen allows the following options to be set:

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="ProviderPolicyProviderPipeline" src="http://stealthpuppy.com/wp-content/uploads/2011/01/ProviderPolicyProviderPipeline_thumb.png" border="0" alt="ProviderPolicyProviderPipeline" width="600" height="460" />](http://stealthpuppy.com/wp-content/uploads/2011/01/ProviderPolicyProviderPipeline.png)

**Authentication**: This checkbox forces authentication in the session. If the App-V client can’t use the current user’s credentials, a login box is shown to the user to provide them. Disabling this checkbox allows any user to launch applications from the App-V server through this Provider Policy. The Authentication dropdown box only has one option: Windows Authentication.

With the **Enforce Access Permission Settings** checkbox enabled the user can only launch an application if he is a member of an Active Directory group specified on the Access Permissions tab under the Properties of an Application.

**Log Usage Information**: With this checkbox selected, application usage data is stored in the App-V data store. This allows administrators to generate a basic report from the Management Console or extract this information by other means.

**Licensing**: When enabled this setting allows for monitoring (auditing) or enforcing application licenses. Auditing still allows the use of applications even when the license count would exceed. Licenses are created in the Application Licenses node of the Management Console and an application is assigned to a license.

After creating the Provider Policy, the Provider Pipeline tab under Properties shows an Advanced button. Under this button the corresponding modules (.dll files) to the checkboxes are shown.

There are two ways to control which Provider Policy applies in a session between the client and the server:

1. The default Provider Policy configured for the Server Group: On the General tab of the Server Group properties specify the default Provider Policy to use:

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="ServerGroupProviderPolicy" src="http://stealthpuppy.com/wp-content/uploads/2011/01/ServerGroupProviderPolicy_thumb.png" border="0" alt="ServerGroupProviderPolicy" width="486" height="420" />](http://stealthpuppy.com/wp-content/uploads/2011/01/ServerGroupProviderPolicy.png)

In this case the Provider Policy applies when users connect to a server from this Server Group.

2. With the Policy specified in the Application’s OSD file: In the CODEBASE tag add the Provider Policy to the HREF value by appending .SFT file name with the following text: _?Customer=ProviderPolicyName_. For example:

[code]HREF="RTSPS://%SFT_SOFTGRIDSERVER%:322/WINZIP.001/WINZIP.001.sft?Customer=MyProviderPolicy"[/code]

Any Provider Policy specifically assigned in an OSD file will overrule the Provider Policy configured at on the Server Group.

### Additional Resources

  * [How to Customize an Application Virtualization System in the Server Management Console](http:// http://technet.microsoft.com/en-us/library/cc817174.aspx)
  * For more information on App-V infrastructure scenarios take a look at the [App-V FAQ #20](http://stealthpuppy.com/deployment/app-v-faq-20-what-are-the-deployment-methods-for-app-v/)
  * [The Ultimate Guide to Application Licensing and Provider Policies for Application Virtualization 4.5](http://blogs.technet.com/b/appv/archive/2011/05/19/the-ultimate-guide-to-application-licensing-and-provider-policies-for-application-virtualization-4-5.aspx)

For more information on streaming, publishing and client configuration when using HTTP take a look at these links:

  * [A guide to App-V publishing and streaming using IIS](http://blogs.technet.com/b/appv/archive/2010/06/14/a-guide-to-app-v-publishing-and-streaming-using-iis.aspx)
  * [HTTP Publishing in App-V (Part 1)](http://blogs.msdn.com/b/johnsheehan/archive/2009/03/24/http-publishing-in-app-v-part-1.aspx)
  * [Support for Client Reporting over HTTP](http://technet.microsoft.com/en-us/library/ee956912.aspx)