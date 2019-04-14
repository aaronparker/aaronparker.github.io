---
id: 1716
title: 'App-V FAQ: Can I configure the App-V Client via Group Policy?'
date: 2010-08-04T11:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/deployment/app-v-faq-14-can-i-configure-the-app-v-client-via-group-policy
permalink: /app-v-faq-14-can-i-configure-the-app-v-client-via-group-policy/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195383015"
categories:
  - FAQs
tags:
  - App-V
  - AppVFAQ
---
![AppV logo]({{site.baseurl}}/media/2010/06/AppVFAQLogo.png")

_Note_: while you can manage the App-V with Group Policy, I recommend that you first create a baseline configuration [via a custom App-V Client installer]({{site.baseurl}}/deployment/app-v-faq-12-how-do-i-create-a-silent-installation-for-the-app-v-client), and then use Group Policy to either change or enforce your defaults. This will ensure that the client is configured correctly at install time without having to wait for Group Policy to apply.

Microsoft have made available an administrative template for use with App-V 4.5 and App-V 4.6, which you can find here: [Microsoft Application Virtualization Administrative Template (ADM Template)](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=67cdf9d2-7e8e-4d76-a552-fd82dbbff9bc).

The Microsoft Application Virtualization ADM template configures client settings for the App-V Windows Desktop Client and for the Terminal Services (RDS) client. The ADM template centrally manages common client configurations by using an existing Group Policy infrastructure and includes settings for communication, client interface, and permissions.

  * The ADM Template for App-V 4.5/4.6 provides central client settings administration for App-V 4.5/4.6 deployment, including the following:
  * Client permissions
  * Client interface behaviour
  * Client communication settings

Unfortunately, the administrative template from Microsoft doesn’t include all of the registry options that you can configure in the App-V Client. Luckily, [Login Consultants](http://www.loginconsultants.com) have written an administrative template that provides those missing values. You can download their administrative template from [here](http://www.loginconsultants.com/index.php?option=com_docman&task=doc_details&gid=70&Itemid=149).

### Group Policy Preferences

While administrative templates are provided for the App-V Client, be aware that using Group Policy in this manner will tattoo the settings to the client – you won’t be able to automatically revert the settings back to their defaults. If you use [Group Policy Preferences](http://www.microsoft.com/downloads/details.aspx?FamilyID=42e30e3f-6f01-4610-9d6e-f6e0fb7a0790) instead, you can create policy that will be more dynamic and can be removed easily if required.

### Resources

  * [Microsoft Application Virtualization Administrative Template (ADM Template)](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=67cdf9d2-7e8e-4d76-a552-fd82dbbff9bc)
  * [Login Consultants App-V Administrative Template](http://www.loginconsultants.com/index.php?option=com_docman&task=doc_details&gid=70&Itemid=149)
  * [How to Configure App-V using Group Policy Objects](http://www.virtualizationadmin.com/articles-tutorials/application-virtualization-articles/configure-app-v-using-group-policy-objects.html)