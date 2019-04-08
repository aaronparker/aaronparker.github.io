---
id: 2392
title: 'Delivering Office with App-V - The Deployment Kit and Product Key issues'
date: 2011-10-03T23:37:38+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/product-key-issues-when-installing-the-microsoft-office-2010-deployment-kit-for-app-v/
permalink: /product-key-issues-when-installing-the-microsoft-office-2010-deployment-kit-for-app-v/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "433305293"
categories:
  - Applications
tags:
  - App-V
  - Office 2010
---
When attempting to install the [Office 2010 Deployment Kit for App-V](http://www.microsoft.com/download/en/details.aspx?id=10386) using a MAK activation key, via the following command-line (or similar):

[code]MSIEXEC /I OffVirt.msi PIDKEYS=XXXXX-XXXXX-XXXXX-XXXXX-XXXXX USEROPERATIONS=1[/code]

You might receive the following error:

<img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="Office-AppV-Activation" src="http://stealthpuppy.com/wp-content/uploads/2011/10/Office-AppV-Activation.png" alt="The product key you entered cannot be used on this machine. This is most likely due to previous Office 2010 trials being installed. (System error: -1073418219)" width="463" height="234" border="0" /> 

This is due to the key used on the command line and not actually any pre-existing component of Office, as the message suggests. If you are not using [a MAK key](http://technet.microsoft.com/en-us/office/ee691939) – that is a key available for a volume license deployment of Office, then the installation will result in the error above. The only way to fix this issue is to ensure you are using a MAK or KMS key for Office 2010.

Keys from Retail or boxed media, or a TechNet or MSDN subscription cannot be used for deploying Office 2010 via App-V. Making it particularly difficult for those looking to get experience virtualizing Office 2010 with App-V without purchasing a volume license.

(Neither the Office or App-V teams at Microsoft have any control over keys available on TechNet or MSDN)