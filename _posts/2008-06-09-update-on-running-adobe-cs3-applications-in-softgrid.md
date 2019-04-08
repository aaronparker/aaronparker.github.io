---
id: 567
title: Update On Running Adobe CS3 Applications In SoftGrid
date: 2008-06-09T16:37:59+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=567
permalink: /update-on-running-adobe-cs3-applications-in-softgrid/
dsq_thread_id:
  - "195380660"
categories:
  - Applications
tags:
  - SoftGrid
---
I have previously detailed some efforts on sequencing some of the Adobe CS3 applications ([Photoshop](http://stealthpuppy.com/virtualisation/sequencing-adobe-photoshop-cs3), [Illustrator](http://stealthpuppy.com/virtualisation/sequencing-adobe-illustrator-cs3) and [InDesign](http://stealthpuppy.com/virtualisation/sequencing-adobe-indesign-cs3)) and some [challenges related to the FLEXnet licensing](http://stealthpuppy.com/virtualisation/addressing-licensing-issues-with-adobe-cs3-apps-on-softgrid) component that comes with each application. It's only recently that we've been able to do some user acceptance testing and we've found that the applications have failed.

During initial testing I found that I could not get multiple CS3 application bubbles executing because the FLEXnet service in the second bubble would fail. Exactly why we're unsure, but I had found that stopping the service post launch would allow multiple CS3 applications to run successfully. Unfortunately that assumption was incorrect.

<img src="http://stealthpuppy.com/wp-content/uploads/2008/06/flexnet.png" border="0" alt="FlexNet" width="599" height="28" /> 

My mate [Doug](http://www.dougandjodie.com/), who's now working with us, has taken up the challenge and come up with a solution. This involves installing the FLEXnet licensing service natively on the sequencer before sequencing and ensuring this service is deployed to your client machines.

Now the bad news is there is no easy way to do that. We have gotten around this because we have Adobe Acrobat 8 installed natively and thus the FLEXnet service is almost everywhere. So we've sequenced with Adobe Acrobat installed on the sequencing machine and our CS3 applications are working as expected.

You might be able to get yourself a copy of the FLEXnet service for installation, but you'll need to chase [Adobe](http://www.adobe.com/) or [Acresso](http://www.acresso.com/) to obtain it.