---
id: 378
title: More on SoftGrid and Adobe Acrobat
date: 2007-11-28T14:50:12+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/virtualisation/more-on-softgrid-and-adobe-acrobat
permalink: /more-on-softgrid-and-adobe-acrobat/
dsq_thread_id:
  - "195379811"
categories:
  - Applications
tags:
  - Adobe
  - SoftGrid
---
<img src="https://stealthpuppy.com/media/2008/02/adobeacrobat-softgridbox.png" alt="adobeacrobat-softgridbox.png" align="left" />After working on sequencing Adobe Acrobat 8 Professional for the better part of four days, I've come to the conclusion that this application is just not going to work well from within SoftGrid. Here's my reasoning:

First up, this is what I've found does work from within SoftGrid:

  * Adobe Acrobat Professional. This will successfully create a PDF or edit an existing PDF document.
  * Adobe LiveCycle Designer. This will successfully create a PDF form that can be opened in Acrobat.

These applications work as expected because they don't need to talk to other applications outside of the bubble and other application don't need to make calls to these applications that SoftGrid does not support.

Here's what is not working:

  * Adobe Distiller does not behave within SoftGrid. This application will utilise 100% CPU when running and most times the GUI is not displayed. I have not found a cause for this behaviour but it will do this consistently.
  * Integration between the Adobe PDF printer and Distiller. This will never work while Distiller lives inside the bubble because there is no way for the printer driver to talk to Distiller.
  * Office plug-ins. The plug-ins that Acrobat installs into Office will not be installed unless Office is sequenced within the same package as Acrobat.

An approach to get Acrobat working with SoftGrid could work like this:

  * Extract the Adobe PDF printer driver, Adobe Distiller and the licensing components from the original installation package.
  * Install and configure the Adobe PDF printer, Adobe Distiller and the licensing components natively on the client workstation.
  * Sequence the remaining applications and components of Adobe Acrobat.

The problem with taking this approach is that you then have half the application installed natively while the other half exists within the SoftGrid bubble. When it comes time to deploy updates to Acrobat you will have to take care of both locations. You may even find that you are not able to install the updates at all because the update will expect to see the whole application.

Acrobat is generally a well behaved application and given the issues I've had with sequencing it, my recommendation is to install it natively. If you do manage to get it working, let me know, and I promise to buy you a beer.

(Just to see if it would run, I packaged Acrobat up in Altiris SVS and it worked without too much hassle)

**Further Reading  
** 

  * [SoftGridGuru: Gotchas and Adobe Acrobat](http://www.softgridguru.com/viewtopic.php?t=2606&start=0&postdays=0&postorder=asc&highlight=)
  * [SoftGridGuru: Adobe Acrobat Professional 7](http://www.softgridguru.com/viewtopic.php?t=1990&start=0&postdays=0&postorder=asc&highlight=)
  * [SoftGridGuru: Adobe CS3 Apps](http://www.softgridguru.com/viewtopic.php?t=2211&start=0&postdays=0&postorder=asc&highlight=)