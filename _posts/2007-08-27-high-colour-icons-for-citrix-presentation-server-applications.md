---
id: 324
title: High Colour icons for Citrix Presentation Server applications
date: 2007-08-27T21:58:35+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/terminal-server/high-colour-icons-for-citrix-presentation-server-applications
permalink: /high-colour-icons-for-citrix-presentation-server-applications/
dsq_thread_id:
  - "195379371"
categories:
  - Citrix
tags:
  - Presentation-Server
---
Citrix have released (and even re-released) whole slew of updates in the past few weeks that finally get's a feature of Presentation Server working that's close to my heart - high colour icons. Yes, high colour icons - the single most important feature that Citrix could add to Presentation Server! Forget application streaming, the new killer feautre is high colour icons!

Well perhaps a little perspective is in order ;), but I do think this is an important feature for usability. Here's what you get - before:

<p style="text-align: center">
  <img src="https://stealthpuppy.com/media/2007/08/webinterfacelowcolouricons.PNG" alt="webinterfacelowcolouricons.PNG" />
</p>

and after:

<p style="text-align: center">
  <img src="https://stealthpuppy.com/media/2007/08/webinterfacehighcolouricons.png" alt="webinterfacehighcolouricons.png" />
</p>

As well as high colour icons with the Program Neighbourhood Agent client:

<p style="text-align: center">
  <img src="https://stealthpuppy.com/media/2007/08/pnagenthighcolouricons.png" alt="pnagenthighcolouricons.png" />
</p>

What do you need to get this going? You'll need to install the following updates, so unfortunately it's no small undertaking.

  1. Upgrade to Presentation Server 4.5. You won't get far without out this so hopefully you're thinking about this upgrade or have upgraded already;
  2. Download and install the last [Access Management Console](https://www.citrix.com/English/SS/downloads/details.asp?dID=8218&downloadID=164650&pID=186) (requires a login);
  3. Install [Hotfix Rollup Pack PSE450W2K3R01 - For Citrix Presentation Server 4.5 and Citrix Access Essentials 2.0](http://support.citrix.com/article/CTX112618);
  4. Update to [Web Interface 4.6 for Windows](https://www.citrix.com/English/SS/downloads/details.asp?dID=36407&downloadID=680152&pID=182) (requires a login);
  5. Deploy the [Citrix Presentation Server Client 10.1](http://https://www.citrix.com/English/SS/downloads/details.asp?dID=2755&downloadID=679581&pID=186) (This will only work for Web Interface and Program Neighbourhood Agent clients - unfortunately Program Neighbourhood clients will be left out in the cold);
  6. Enable 32-bit colour icon support (this is the default behaviour) - Farm properties / Presentation Server / General;
  7. <strike>Delete and republish your published applications</strike>. Although Citrix says you need to delete and republish your applications, can can just reselect an icon for each application. Check out [a script I've written to do this]({{site.baseurl}}/scripting/script-update-published-application-icons).

<strike>Yes, that last part is right, delete and re-publish your applications</strike>. You can check out [FarmAppUtil](http://support.citrix.com/article/CTX107934) for this or take a look at [a script I've written to do the same]({{site.baseurl}}/unattended/wsf-import-published-applications-10). This script will recreate published applications using the XML files exported from the Access Management Console. You can first export the XML files to a folder and then pass the folder to the script which will parse each XML file and create the published application. There are some caveats with this script though:

  1. This is version 1.0, please test the script before you run it in a production environment;
  2. This version will only import published applications. Published desktops and content won't work; and
  3. For the script to add an icon to the published application, the application must be installed on the machine where you run the script and it will use the first icon in the executable.