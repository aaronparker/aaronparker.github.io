---

title: 'App-V FAQ: Does App-V replace Citrix XenApp or Remote Desktop Services?'
date: 2010-08-17T11:00:00+10:00
author: Aaron Parker
layout: post

permalink: /app-v-faq-19-does-app-v-replace-citrix-xenapp-or-remote-desktop-services/
dsq_thread_id:
  - "195383196"
categories:
  - FAQs
tags:
  - App-V
  - AppVFAQ
---
![AppV logo]({{site.baseurl}}/media/2010/06/AppVFAQLogo.png)

“Does App-V replace Citrix XenApp?” or “Is App-V a Citrix killer?” I’m surprised that this one keeps coming up although I’ve been hearing it for years. People make assumptions about the ability to stream applications to end-points with App-V and confuse this with remote presentation of applications. See [the comments on this post](http://gotcal.com/index.php/2010/07/testing-app-v-for-dynamics-nav-rtc-2009/) as an example. If you’ve come here seeking an answer to this question, then you should first read about [what App-V is]({{site.baseurl}}/virtualisation/app-v-faq-2-what-is-microsoft-application-virtualization).

There’s a couple of points to consider when understanding where App-V fits within the application deployment puzzle:

  * App-V doesn’t change where applications are executed – applications delivered by App-V still use local resources just like installed applications
  * App-V requires far more bandwidth to deliver applications than Remote Desktop Services or Citrix XenApp because the complete application (and often a bit more) is delivered to the client

Here’s the good news though, you can combine both solutions – deliver via App-V to your RDS servers and then present the applications remotely using the ICA (XenApp) or RDP (RemoteApp) protocols. Because App-V runs on Windows and has no dependencies on the the desktop deployment solution itself it will work with other products such as VMware View, Quest vWorkspace, Citrix XenDesktop and even [Microsoft MED-V](http://technet.microsoft.com/en-us/library/ee872305.aspx).

### Resources

  * [Using Application Virtualization (App-V) and Microsoft Enterprise Desktop Virtualization (MED-V) to Enhance Your Windows 7 Deployment](http://technet.microsoft.com/en-us/library/ee872305.aspx)
  * [Microsoft Application Virtualization for Remote Desktop Services 4.6](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=e633164f-9729-43a8-9149-de651944a7fe)
  * [Microsoft App-V and Hosted VM-Based VDI Desktops](http://community.citrix.com/display/ocb/2010/02/17/Microsoft+App-V+and+Hosted+VM-Based+VDI+Desktops)
  * [Go ahead use App-V, no really, please...](http://community.citrix.com/display/ocb/2010/03/12/Go+ahead+use+App-V,+no+really,+please...)
  * [How to publish an App-V-enabled application in Citrix XenApp](http://support.microsoft.com/kb/931576)
  * [The deep integration of vWorkspace and App-V](http://www.vworkspace.com/aWinningPartnership/App-V.wmv) (video)
  * [Recommended configuration settings for Application Virtualization 4.5 Terminal Server clients](http://support.microsoft.com/kb/973366/)