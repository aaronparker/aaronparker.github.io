---
id: 1906
title: 'App-V FAQ: How do I configure my App-V clients to stream from a local source?'
date: 2010-09-22T11:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=1906
permalink: /using-applicationsourceroot-to-stream-from-a-local-source/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195414386"
categories:
  - FAQs
tags:
  - App-V
  - AppVFAQ
---
<img style="margin: 0px 10px 5px 0px; display: inline;" src="http://stealthpuppy.com/wp-content/uploads/2010/06/AppVFAQLogo.png" alt="" align="left" />If you have decided on streaming your App-V packages to client machines (rather than deploying via Windows Installer or SCCM), you will most certainly need to control where clients stream packages from. This, of course, would be the source closest to the client computer.

When deploying the native App-V infrastructure in a multi-site environment, you might deploy the Management Server in the main data centre and the Streaming Server or servers running IIS to stream packages to clients in remote sites.

To configure a client to connect to its closest streaming source, modify the [ApplicationSourceRoot](http://technet.microsoft.com/en-us/library/cc843817.aspx) value in the Registry.

![ApplicationSourceRoot in the Registry](http://stealthpuppy.com/wp-content/uploads/2010/08/RegistryApplicationSourceRoot.png "ApplicationSourceRoot in the Registry") 

> If you want the client to obtain the package content (SFT file) from a local App-V Streaming Server or other alternate source such as a Web server or file server, instead of from the App-V Management Server, you can configure the ApplicationSourceRoot registry key value on the computer to point to the local content share on the other server. The OSD file still defines the original source path for the package content. However the client uses the value of the ApplicationSourceRoot setting in place of the server and share that are specified in the content path in the OSD file. This redirects the client to retrieve the content from the other server.

I'll go through a few ways that you can do this dynamically based on various client properties.

### Configuring ApplicationSourceRoot with Group Policy

There are two methods that you could use Group Policy to modify the ApplicationSourceRoot value:

  * Use the [App-V Administrative Template](http://stealthpuppy.com/deployment/app-v-faq-14-can-i-configure-the-app-v-client-via-group-policy) in a Group Policy Object (GPO) linked to each Active Directory Site
  * Use Group Policy Preferences in a single GPO assigned to client computer OU, utilising Item-level targeting to filter for client properties such as AD site or IP subnet

**Using the App-V Administrative Template**

Using the [administrative template for App-V](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=67cdf9d2-7e8e-4d76-a552-fd82dbbff9bc) provided by Microsoft will rely on [Active Directory Sites](http://technet.microsoft.com/en-us/library/cc731907.aspx) to be configured and available to client computers.

Create a new Group Policy Object and add the template to the GPO.

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="The ApplicationSourceRoot policy in a Group Policy Object" src="http://stealthpuppy.com/wp-content/uploads/2010/09/ADMTemplateApplicationSourceRoot_thumb.png" border="0" alt="The ApplicationSourceRoot policy in a Group Policy Object" width="660" height="297" />](http://stealthpuppy.com/wp-content/uploads/2010/09/ADMTemplateApplicationSourceRoot.png)

The policy item can be found here:

_Computer Settings / Policies / Administrative Templates / Classic Administrative Templates / Microsoft Application Virtualization Client / Communications / Application Source Root_

Set the value of ApplicationSourceRoot, which should include the streaming protocol, the source server hostname, optionally the port and finally the path to the packages. Examples can be found in the [ApplicationSourceRoot documentation on TechNet](http://technet.microsoft.com/en-us/library/cc843817.aspx).

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="GPO-ApplicationSourceRootThe ApplicationSourceRoot policy in the Administrative template" src="http://stealthpuppy.com/wp-content/uploads/2010/09/GPOApplicationSourceRoot_thumb.png" border="0" alt="The ApplicationSourceRoot policy in the Administrative template" width="660" height="407" />](http://stealthpuppy.com/wp-content/uploads/2010/09/GPOApplicationSourceRoot.png)

Link the GPO to the AD Site that hosts the client computers that you are looking to target.

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="Assigning a GPO to an Active Directory Site" src="http://stealthpuppy.com/wp-content/uploads/2010/09/GPOAssingedADSite_thumb.png" border="0" alt="Assigning a GPO to an Active Directory Site" width="660" height="221" />](http://stealthpuppy.com/wp-content/uploads/2010/09/GPOAssingedADSite.png)

To ensure that the GPO only applies to a specific set of computers instead of all computers in that AD site

  1. Create a domain group that contains the computer accounts that have the App-V client installed
  2. Open the properties of the GPO from within the GPO editor and select the Security tab
  3. Remove the tick from the Allow checkbox in the Apply Group Policy permission
  4. Add the domain group created in step 1
  5. Enable the tick in the Allow checkbox for the Apply Group Policy permission for that group

Once complete, you should have something that looks like this:

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="Changing permissions on a GPO" src="http://stealthpuppy.com/wp-content/uploads/2010/09/GPOPermissions_thumb.png" border="0" alt="Changing permissions on a GPO" width="446" height="493" />](http://stealthpuppy.com/wp-content/uploads/2010/09/GPOPermissions.png)

**Using Group Policy Preferences**

To use Group Policy Preferences, create a new GPO that is linked to an OU that contains the computer accounts and create a new Registry item in – _Computer Configuration / Preferences / Windows Settings / Registry:_

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="Editing ApplicationSourceRoot in Group Policy Preferences" src="http://stealthpuppy.com/wp-content/uploads/2010/09/GPPPreferences_thumb.png" border="0" alt="Editing ApplicationSourceRoot in Group Policy Preferences" width="660" height="284" />](http://stealthpuppy.com/wp-content/uploads/2010/09/GPPPreferences.png)

ApplicationSourceRoot is a string value (REG_SZ) that is located in:

  * x64: HKLM\SOFTWARE\Wow6432Node\Microsoft\SoftGrid\4.5\Client\Configuration
  * x86: HKLM\SOFTWARE\Microsoft\SoftGrid\4.5\Client\Configuration

Select the HKEY\_LOCAL\_MACHINE hive, add the key path for the correct machine type, enter ApplicationSourceRoot as the value name and enter the path to your streaming source in the value data.

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="Properties of the ApplicationSourceRoot value in GPP" src="http://stealthpuppy.com/wp-content/uploads/2010/09/GPPApplicationSourceRoot_thumb.png" border="0" alt="Properties of the ApplicationSourceRoot value in GPP" width="446" height="493" />](http://stealthpuppy.com/wp-content/uploads/2010/09/GPPApplicationSourceRoot.png)

Next, enable item-level targeting so that the path specified in this preference can be applied only to a subset of machines. Click on the _Common_ tab, select _Item-level targeting_ and click the _Targeting..._ button.

To filter this preference, I have added three items:

  1. An check for the PROCESSOR_ARCHITECTURE environment variable to apply the preference to 64-bit Windows (because I'm setting a Registry path that only exists on 64-bit versions of Windows)
  2. A check to ensure that the App-V client Configuration Registry key exists (i.e. the App-V Client is installed)
  3. An Active Directory Site check, in this example the AD site name is London

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="Setting filters in Group Policy Preferences" src="http://stealthpuppy.com/wp-content/uploads/2010/09/ADMTemplateApplicationSourceRootTargettingEditor_thumb.png" border="0" alt="Setting filters in Group Policy Preferences" width="645" height="454" />](http://stealthpuppy.com/wp-content/uploads/2010/09/ADMTemplateApplicationSourceRootTargettingEditor.png)

I can repeat the same preference (copy and paste will work) and change streaming source location and the selected site in the AD site check, to cover other streaming sources and clients. Group Policy Preferences also provides IP address ranges that could be used instead of Active Directory sites – this would be useful if an AD site is too broad and I need to be a little more granular when checking for the client location.

GPP would be a simpler approach to using the Administrative Template as the App-V client configuration can be done in a single GPO.

### Other Methods

I'm sure that the number of environments that don't have access to Group Policy or Group Policy Preferences will be small; however if you have one of those environments there are plenty of alternatives available. These include, but are not limited to:

  * [AppSense Environment Manager](http://www.appsense.com/products/environmentmanager/)
  * [RES Wisdom](http://www.ressoftware.com/pm-products.aspx?PageID=72)
  * [ScriptLogic Desktop Authority](http://www.scriptlogic.com/products/desktopauthority/)

Here's an example configuration using AppSense Environment Manager.  EM provides checks for Active Directory Sites or IP Address Ranges. Checks for processor architecture or determining if a registry location exists can be performed with custom conditions (currently handled by VBscript).

Setting or changing the ApplicationSourceRoot value can be performed on a number of triggers such as Computer Start-up and User Logon, but most useful (e.g. laptops) will be using the Network Connected trigger. This trigger can be used to detect the network location whenever a physical network connection is made and it will then action the applicable registry change.

The image below shows an example configuration that shows how setting ApplicationSourceRoot could be achieved:

[<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="Editing ApplicationSourceRoot with AppSense Environment Manager" src="http://stealthpuppy.com/wp-content/uploads/2010/09/EMApplicationSourceRootNetworkConnected_thumb.png" border="0" alt="Editing ApplicationSourceRoot with AppSense Environment Manager" width="660" height="332" />](http://stealthpuppy.com/wp-content/uploads/2010/09/EMApplicationSourceRootNetworkConnected.png)

### Resources

  * [How to Configure the Client for Application Package Retrieval](http://technet.microsoft.com/en-us/library/cc843817.aspx)
  * [Microsoft Application Virtualization Administrative Template (ADM Template)](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=67cdf9d2-7e8e-4d76-a552-fd82dbbff9bc)
  * [What are Group Policy Preferences](http://www.grouppolicy.biz/2010/03/what-are-group-policy-preferences/)