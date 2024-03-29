---

title: 'App-V FAQ: How do I configure the App-V Client in stand-alone mode?'
date: 2010-08-03T11:00:00+10:00
author: Aaron Parker
layout: post

permalink: /app-v-faq-13-how-do-i-configure-the-app-v-client-in-stand-alone-mode/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195457806"
categories:
  - FAQs
tags:
  - App-V
  - AppVFAQ
---
[Stand-alone mode](http://technet.microsoft.com/en-gb/library/cc817112.aspx) in App-V is useful where you are deploying App-V applications via Group Policy or a 3rd party ESD (using the MSI file), or you have the App-V packages available on a file share and import them with the SFTMIME command.

There are a couple of [properties](http://technet.microsoft.com/en-us/library/cc843737.aspx) that you’ll need to set to allow the App-V Client to run in stand-alone mode, which you can set [at install time]({{site.baseurl}}/deployment/app-v-faq-12-how-do-i-create-a-silent-installation-for-the-app-v-client), or configure in the registry post-install:

|Parameter|Values                                    |Description                                                                                                                                                                                                                                                                                           |
|---------|------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|ALLOWINDEPENDENTFILESTREAMING|TRUE / FALSE                              |Indicates whether streaming from file will be enabled regardless of how the client has been configured with the APPLICATIONSOURCEROOT parameter. If set to FALSE, the transport will not enable streaming from files even if the OSD HREF or the APPLICATIONSOURCEROOT parameter contains a file path.|
|REQUIREAUTHORIZATIONIFCACHED|TRUE / FALSE                              |Indicates whether authorization is always required, whether or not an application is already in cache.                                                                                                                                                                                                |
{:.smaller}

## Importing a Package in Stand-Alone mode

A common scenario for stand-alone mode is to test packages. To import a package in this mode, you can use the [SFTMIME ADD PACKAGE](http://technet.microsoft.com/en-us/library/cc817181.aspx) command.

The simplest way to use this command is to copy your package to the local computer and using an elevated Command Prompt, change to the folder were the package is located. For example, I have a Mozilla Firefox package stored locally - I can use the following commands to import the package:

```powershell
CD C:\Common\Packages\MozillaFirefox4_US
SFTMIME /ADD PACKAGE:"Mozilla Firefox 4" /MANIFEST MozillaFirefox4\_US\_manifest.xml /OVERRIDEURL MozillaFirefox4_US.sft /CONSOLE
```

## Resources

There are plenty of resources on the Internet that discuss the configuration of the App-V Client in stand-alone mode:

  * [Stand-Alone Delivery Scenario for Application Virtualization Clients](http://technet.microsoft.com/en-us/library/cc843787.aspx) on TechNet
  * Microsoft have a TechNet Virtual Lab: [Learning to Configure App-V for Standalone Client Mode](https://www.microsoft.com/resources/virtuallabs/step2-technet.aspx?LabId=ac253a8b-e390-4011-b377-115231841072&BToken=reg), this also has [a companion PDF document](http://download.microsoftvirtuallabs.com/download/8/a/7/8a71365b-4c80-4e60-8185-8f12f59bf1d4/LearningtoConfigureAppVforStandaloneClientMode.pdf)
  * Tim Mangan has written [a white paper on configuration of the client and deployment of applications in a stand-alone environment](http://www.tmurgent.com/WhitePapers%5CMicrosoft_AppV_Stand-Alone.pdf)
  * Alex Verboon has an article on [Configuring App-V Standalone Mode through Group Policy](http://www.verboon.info/index.php/2010/03/configuring-app-v-standalone-mode-through-group-policy/)
  * Finally, you can see the stand-alone mode App-V Client in action in this video by Ruben Spruijt:
