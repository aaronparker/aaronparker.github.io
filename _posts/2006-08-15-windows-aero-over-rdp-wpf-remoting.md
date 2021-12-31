---
id: 255
title: Windows Aero over RDP / WPF Remoting(?)
date: 2006-08-15T23:45:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/windows-aero-over-rdp-wpf-remoting
permalink: /windows-aero-over-rdp-wpf-remoting/
categories:
  - Microsoft
tags:
  - Windows-Vista
---
I've been checking out a recent build of Windows Vista today and took the chance to look at connecting to a remote Windows Vista machine from Windows Vista over RDP. The result was impressive to say the least. The remote session has full support for Aero Glass including all the minimise/maximise effects as well as Flip 3D. Now this would require that the Aero Glass is drawn on the screen locally rather than sent directly via RDP, which is what WPF Remoting is all about. Brian Madden has more on this [here](http://www.brianmadden.com/content/content.asp?id=617) and [here](http://www.brianmadden.com/content/content.asp?id=500). Once this is teamed with seamless window support in Windows Longhorn Server the line between a local and remote application will be further blurred - users should almost never notice the difference. This is exciting stuff, as I am really into the user experience. In the Terminal Server world we are always battling what users perceive to be performance related issues. Once we can say good-bye to the current screen scraping type technologies in RDP and ICA I think users will be much happier. Of course we just need to get the applications to use WPF. Developers are you listening?

Click on the thumbnail to see Aero over RDP in action.

<a target="_blank" href="/photos/parky/picture1342.aspx"><img border="0" src="/photos/parky/images/1342/secondarythumb.aspx" /></a>