---
id: 103
title: 'Software Quality? What&#8217;s that?'
date: 2007-02-13T20:49:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/software-quality-whats-that
permalink: /software-quality-whats-that/
categories:
  - Applications
---
I&#8217;ve seen some dumb software in my travels and [Mercury Quality Center](http://www.mercury.com/us/products/quality-center/) is no exception; however this one has got me scratching my head.

Mercury Quality Center &#8220;provides a web-based system for _automated_ software quality testing and management&#8221;. It uses a browser front-end with ActiveX controls connecting to a back-end process (I really don&#8217;t know much about the back-end). Now, as you would expect from the product description, Mercury Quality Center should be a nice quality package from end to end. In my view this would include a scriptable client installation package. Scripting any client software installation is important because it should be a consistent repeatable process.

Except that&#8217;s where they strike out. The incredibly dumb thing about this is the client software is packaged up in an _InstallShield_ package which is only used to unpack some files and launch another custom installer. (See the screenshot). No silent install for you!

<img border="0" src="http://stealthpuppy.com/wp-content/uploads/2007/02/1000.14.897.MercuryQualityCenterInstall.png" /> 

Who&#8217;s the dolt who created this? InstallShield&#8217;s not good enough to install your software? Surely quality software should extend to the installation experience as well? It makes you wonder.