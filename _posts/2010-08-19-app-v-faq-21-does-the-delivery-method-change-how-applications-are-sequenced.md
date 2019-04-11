---
id: 1792
title: 'App-V FAQ: Does the delivery method change how applications are sequenced?'
date: 2010-08-19T11:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=1792
permalink: /app-v-faq-21-does-the-delivery-method-change-how-applications-are-sequenced/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "196126573"
categories:
  - FAQs
tags:
  - App-V
  - AppVFAQ
---
<img style="margin: 0px 10px 5px 0px; display: inline;" src="{{site.baseurl}}.com/media/2010/06/AppVFAQLogo.png" alt="" align="left" />There are several [deployment methods available for App-V]({{site.baseurl}}/deployment/app-v-faq-20-what-are-the-deployment-methods-for-app-v) and a number of ways to stream packages to clients – RTSP, HTTP, SMB and local disk. When creating an App-V package, the Sequencer provides protocol options (RTSPS, RTSP, FILE, HTTP and HTTPS), server hostname, port number and a folder path which are added to the generated the OSD file:

[<img class="wlDisabledImage" style="display: inline; border-width: 0px;" title="Squencer-Protocols" src="{{site.baseurl}}.com/media/2010/08/SquencerProtocols_thumb.png" border="0" alt="Squencer-Protocols]({{site.baseurl}}/media/2010/08/SquencerProtocols.png)

The options chosen in the Sequencer will produce a URL to the SFT file (the file in the App-V packages that contains the application binaries), which will look something like this:

[code]rtsps://%SFT\_SOFTGRIDSERVER%:322/Adobe/Adobe\_Reader_9/AdobeReader9x.sft[/code]

It is then reasonable to assume that the options chosen in the Sequencer will drive your deployment solution or that the deployment solution will dictate the URL listed in your package OSD files.

Fortunately, this isn’t the case. There are two methods that can be used to change the stream location for packages:

  * The SFT_SOFTGRIDSERVER environment variable
  * The ApplicationSourceRoot registry value ([available in App-V 4.5](http://blogs.technet.com/b/appv/archive/2008/09/03/microsoft-application-virtualization-4-5-rtms.aspx) and above)

The default hostname added to an OSD file is %SFT_SOFTGRIDSERVER%, which should then be defined on the client computer for the App-V client to be able to stream packages from the correct source. This makes changing the source server simple when using the native App-V infrastructure (such as when moving packages between test and production environments); however this approach isn’t as flexible as changing ApplicationSourceRoot as it only changes the source server hostname and requires a reboot (or a restart of the App-V client) to take effect.

The [ApplicationSourceRoot](http://technet.microsoft.com/en-us/library/cc843817.aspx) registry value can be modified [during the client install]({{site.baseurl}}/deployment/app-v-faq-12-how-do-i-create-a-silent-installation-for-the-app-v-client) or [managed with Group Policy]({{site.baseurl}}/deployment/app-v-faq-14-can-i-configure-the-app-v-client-via-group-policy) and it enables you to change the protocol, server hostname, port and the path from which packages are streamed.

> If you want the client to obtain the package content (SFT file) from a local App-V Streaming Server or other alternate source such as a Web server or file server, instead of from the App-V Management Server, you can configure the ApplicationSourceRoot registry key value on the computer to point to the local content share on the other server. The OSD file still defines the original source path for the package content. However the client uses the value of the ApplicationSourceRoot setting in place of the server and share that are specified in the content path in the OSD file. This redirects the client to retrieve the content from the other server.

Changing this value takes effect immediately and in the registry it looks something like this:

[<img class="wlDisabledImage" style="display: inline; border: 0px;" title="Registry-ApplicationSourceRoot" src="{{site.baseurl}}.com/media/2010/08/RegistryApplicationSourceRoot_thumb.png" border="0" alt="Registry-ApplicationSourceRoot]({{site.baseurl}}/media/2010/08/RegistryApplicationSourceRoot.png)

This registry value (along with OSDSourceRoot and IconSourceRoot) is used by SCCM 2007 R2 to manage the App-V client and stream from distribution points or from the local SCCM client cache.

### Guidelines for URLs in OSD files

So if what you choose to place in the OSD URL does not impact your deployment solution, does that mean you can choose to put anything in the URL? Like anything there are a set of guidelines that you should stick to, so that you get some consistency in your packages:

  * Choose the protocol and port that will be used most commonly.
  * Leave the hostname as  %SFT_SOFTGRIDSERVER%. Add this environment variable on the client if you won’t be using the ApplicationSourceRoot value. This will make packages more flexible if your server hostname changes
  * Specify a path for each package that matches the folder name to which the package has been saved.

### Conclusion

The method and processes you use for sequencing an application is not affected by the delivery method. There are some basic guidelines that you should follow when sequencing; however if they haven't been followed you can still deliver those packages, you just may have some client configuration to take care of. Bottom-line: create a standard for your environment and stick to it.

### Resources

  * [How to Configure the Client for Application Package Retrieval](http://technet.microsoft.com/en-us/library/cc843817.aspx) (read this one for information on ApplicationSourceRoot)
  * [How to Configure the App-V System for Package Upgrade](http://technet.microsoft.com/en-us/library/cc843817.aspx)
  * [About the Deployment Tab](http://technet.microsoft.com/en-us/library/cc843635.aspx)
  * [How to Change Deployment Properties](http://technet.microsoft.com/en-us/library/cc843624.aspx)
  * [The Top Three Rookie Mistakes - Part 3](http://blogs.technet.com/b/appv/archive/2008/09/15/the-top-three-rookie-mistakes-part-3.aspx)
  * [Error message when you start an application or update a Desktop Configuration Server in Microsoft SoftGrid: "The SoftGrid Client could not update desktop configuration information"](http://technet.microsoft.com/en-us/library/cc843817.aspx)