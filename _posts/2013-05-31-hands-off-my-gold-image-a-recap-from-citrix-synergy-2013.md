---
id: 3321
title: Hands off my gold image! A recap from Citrix Synergy 2013
date: 2013-05-31T14:30:56+10:00
author: Aaron Parker
layout: post
guid: http://stealthpuppy.com/?p=3321
permalink: /hands-off-my-gold-image-a-recap-from-citrix-synergy-2013/
dsq_thread_id:
  - "1343814052"
categories:
  - Community
tags:
  - Automation
  - MCS
  - MDT
  - PVS
---
Here&#8217;s an overview of my talk from Citrix Synergy 2013 &#8211; [Hands off my gold image!](https://citrix.g2planet.com/synergylosangeles2013/public_session_view.php?agenda_session_id=274&conference=synergy)  If you were unable to attend Synergy or missed my session, this is a short version of the talk, but hopefully it will give you an idea of what was covered.

[<img class="alignnone  wp-image-3322" style="border: 1px solid black;" alt="Slide01" src="http://stealthpuppy.com/wp-content/uploads/2013/05/Slide01.png" width="720" height="405" srcset="http://192.168.0.89/wp-content/uploads/2013/05/Slide01.png 720w, http://192.168.0.89/wp-content/uploads/2013/05/Slide01-150x84.png 150w, http://192.168.0.89/wp-content/uploads/2013/05/Slide01-300x168.png 300w, http://192.168.0.89/wp-content/uploads/2013/05/Slide01-624x351.png 624w" sizes="(max-width: 720px) 100vw, 720px" />](http://stealthpuppy.com/wp-content/uploads/2013/05/Slide01.png)

In this session I&#8217;ve covered three main topics &#8211; why I believe that automating your gold iamges is important, who is and who isn&#8217;t automating their gold images based on the results of [a poll](http://stealthpuppy.com/community/take-part-in-the-os-deployment-automation-survey/) that I conducted earlier this year, and then an overview of how to achieve automation with the [Microsoft Deployment Toolkit](http://technet.microsoft.com/en-gb/solutionaccelerators/dd407791.aspx).

[<img class="alignnone  wp-image-3325" style="border: 1px solid black;" alt="Slide03" src="http://stealthpuppy.com/wp-content/uploads/2013/05/Slide03.png" width="720" height="405" srcset="http://192.168.0.89/wp-content/uploads/2013/05/Slide03.png 720w, http://192.168.0.89/wp-content/uploads/2013/05/Slide03-150x84.png 150w, http://192.168.0.89/wp-content/uploads/2013/05/Slide03-300x168.png 300w, http://192.168.0.89/wp-content/uploads/2013/05/Slide03-624x351.png 624w" sizes="(max-width: 720px) 100vw, 720px" />](http://stealthpuppy.com/wp-content/uploads/2013/05/Slide03.png)

# Why is automation important?

When talking about gold image automation, I think it&#8217;s worth putting this topic into some context by using where I work as an example of how build automation is important from a consultancy perspective. At [Kelway](http://www.kelway.co.uk), we have a particularly busy EUC architecture and consulting team and we deal with (what _I_ think is at least) a large number of customers implementing hosted desktop solutions.

We typically see build automation used in physical desktops environments (although this isn&#8217;t always the case) but strive to encourage customers to utilise some form of automated deployment in both physical and hosted desktops environments. For the consulting team that is delivering solutions in the field, it&#8217;s important they have a delivery framework for that build automation and we&#8217;ve settled on the Microsoft Deployment Toolkit as our tool of choice. This is good, not only for those customers who do not already have a deployment solution, but enables us to provide a standardised approach the fits in with any deployment solution/ESD.

[<img class="alignnone size-full wp-image-3327" style="border: 1px solid black;" alt="Slide06" src="http://stealthpuppy.com/wp-content/uploads/2013/05/Slide06.png" width="720" height="405" srcset="http://192.168.0.89/wp-content/uploads/2013/05/Slide06.png 720w, http://192.168.0.89/wp-content/uploads/2013/05/Slide06-150x84.png 150w, http://192.168.0.89/wp-content/uploads/2013/05/Slide06-300x168.png 300w, http://192.168.0.89/wp-content/uploads/2013/05/Slide06-624x351.png 624w" sizes="(max-width: 720px) 100vw, 720px" />](http://stealthpuppy.com/wp-content/uploads/2013/05/Slide06.png)

Using an industry standard framework, allows us to deliver consistency and dependability across deployments whilst being able to take advantage of improvements that Microsoft delivers with each new release of MDT.

How easy is it to achieve build automation? One of the great benefits of MDT is its simple architecture; however that doesn&#8217;t mean that build automation is an easy task. Easy implies a short learning curve and for anyone that has a few years deploying Windows and/or has some basic scripting under their belt, it&#8217;s not a big jump to being able to automate an install of Windows and a set of applications.

[<img class="alignnone size-full wp-image-3328" style="border: 1px solid black;" alt="Slide11" src="http://stealthpuppy.com/wp-content/uploads/2013/05/Slide11.png" width="720" height="405" srcset="http://192.168.0.89/wp-content/uploads/2013/05/Slide11.png 720w, http://192.168.0.89/wp-content/uploads/2013/05/Slide11-150x84.png 150w, http://192.168.0.89/wp-content/uploads/2013/05/Slide11-300x168.png 300w, http://192.168.0.89/wp-content/uploads/2013/05/Slide11-624x351.png 624w" sizes="(max-width: 720px) 100vw, 720px" />](http://stealthpuppy.com/wp-content/uploads/2013/05/Slide11.png)

That said, there&#8217;s no way around it &#8211; automation takes time and effort. Automation requires discipline and process must be followed (perhaps even created to start with). Third party (or even in-house) application developers can make also automation particularly challenging on the Windows platform.

The reward though, is a better user experience and a lower total cost of ownership of the desktop environment. Build automation provides a management framework that will always beat (but never replace) documentation. An engineer can look into the build process and see exactly what has been delivered into an environment, because no guesses have to be made or documentation translated.

At what point though, do you spend too much time trying to automate the desktop environment?

[<img class="alignnone  wp-image-3331" style="border: 1px solid black;" alt="Slide12" src="http://stealthpuppy.com/wp-content/uploads/2013/05/Slide12.png" width="720" height="405" srcset="http://192.168.0.89/wp-content/uploads/2013/05/Slide12.png 720w, http://192.168.0.89/wp-content/uploads/2013/05/Slide12-150x84.png 150w, http://192.168.0.89/wp-content/uploads/2013/05/Slide12-300x168.png 300w, http://192.168.0.89/wp-content/uploads/2013/05/Slide12-624x351.png 624w" sizes="(max-width: 720px) 100vw, 720px" />](http://xkcd.com/1205/ "Thanks to xkcd for a timely and awesome comic. Click the image for the original page.")

For a solutions provider or consulting practice, build automation speeds many of the common tasks required for a desktop environment. This is why a framework such as MDT is so important &#8211; it  provides faster deployment times but only as long as you&#8217;ve put the work in to start with.

In an engagement for smaller environments, automation can sometimes be a tough sell. There will invariably many additional tasks that might be time consuming to automate (typically application installs) and it&#8217;s not uncommon to find a single task that takes an inordinate amount of time to get right.

Perhaps in some environments, it&#8217;s important to strive to automate as much as is possible within a reasonable amount of time and deal with the remaining tasks manually, i.e. use the [80/20](http://en.wikipedia.org/wiki/Pareto_principle) rule to achieve the best bang for your buck.

Here&#8217;s an excellent example of where build automation can directly impact the user experience. Here&#8217;s the default user experience of a Windows Server 2008 R2 Remote Desktop Session Host server with the Desktop Experience feature enabled:

[<img class="alignnone size-full wp-image-3334" style="border: 1px solid black;" alt="Slide14" src="http://stealthpuppy.com/wp-content/uploads/2013/05/Slide14.png" width="720" height="405" srcset="http://192.168.0.89/wp-content/uploads/2013/05/Slide14.png 720w, http://192.168.0.89/wp-content/uploads/2013/05/Slide14-150x84.png 150w, http://192.168.0.89/wp-content/uploads/2013/05/Slide14-300x168.png 300w, http://192.168.0.89/wp-content/uploads/2013/05/Slide14-624x351.png 624w" sizes="(max-width: 720px) 100vw, 720px" />](http://stealthpuppy.com/wp-content/uploads/2013/05/Slide14.png)

This is far from ideal from a user perspective &#8211; administrative tools are pinned to the taskbar by default, the wallpaper has Windows Server stamped on it and on first run of Internet Explorer the user is prompted with a first run wizard. This is just too noisy and creates a jarring experience for the user. Citrix [provides a partial solution](http://support.citrix.com/article/CTX133429) to this in XenApp 6.5, but this relies on Group Policy.

Most of these user experience issues could fixed with Group Policy; however that approach requires that Group Policy is processed at each logon (especially in a non-persistent desktop environment) and Group Policy typically enforces settings, instead of being a preference. If your goal is to reduce logon times, then move those settings in to your gold image instead. An automated build is an opportunity to ensure the default user experience (i.e. the default profile) is configured for first logon without a reliance on Group Policy or another UEM toolset.

# Who&#8217;s doing it?

I received 100 responses to my poll which gave me a reasonable data set to draw some conclusions from; however given my audience I suspect the sample may not be completely representative of the broader hosted desktop deployments. The results are interesting nonetheless.

Here&#8217;s a breakdown of the hosted desktop / desktop virtualization solutions in use by respondents (multiple solutions could be selected). Citrix XenApp and XenDesktop were most popular by far, which is great for a presentation at Citrix Synergy.

[<img class="alignnone  wp-image-3336" style="border: 1px solid black;" alt="Slide17" src="http://stealthpuppy.com/wp-content/uploads/2013/05/Slide17.png" width="720" height="405" srcset="http://192.168.0.89/wp-content/uploads/2013/05/Slide17.png 720w, http://192.168.0.89/wp-content/uploads/2013/05/Slide17-150x84.png 150w, http://192.168.0.89/wp-content/uploads/2013/05/Slide17-300x168.png 300w, http://192.168.0.89/wp-content/uploads/2013/05/Slide17-624x351.png 624w" sizes="(max-width: 720px) 100vw, 720px" />](http://stealthpuppy.com/wp-content/uploads/2013/05/Slide17.png)

Here&#8217;s how those hosted desktops are provisioned (multiple solutions could be selected). I could have removed the Other option from this question because in hind sight it didn&#8217;t actually make that much sense.

[<img class="alignnone size-full wp-image-3337" style="border: 1px solid black;" alt="Slide18" src="http://stealthpuppy.com/wp-content/uploads/2013/05/Slide18.png" width="720" height="405" srcset="http://192.168.0.89/wp-content/uploads/2013/05/Slide18.png 720w, http://192.168.0.89/wp-content/uploads/2013/05/Slide18-150x84.png 150w, http://192.168.0.89/wp-content/uploads/2013/05/Slide18-300x168.png 300w, http://192.168.0.89/wp-content/uploads/2013/05/Slide18-624x351.png 624w" sizes="(max-width: 720px) 100vw, 720px" />](http://stealthpuppy.com/wp-content/uploads/2013/05/Slide18.png)

Here&#8217;s the tools used to creation the gold image for those desktops. The Other responses included solutions such as Matrix 42, RES Automation Manager and FrontRange DSM.

[<img class="alignnone size-full wp-image-3338" style="border: 1px solid black;" alt="Slide19" src="http://stealthpuppy.com/wp-content/uploads/2013/05/Slide19.png" width="720" height="405" srcset="http://192.168.0.89/wp-content/uploads/2013/05/Slide19.png 720w, http://192.168.0.89/wp-content/uploads/2013/05/Slide19-150x84.png 150w, http://192.168.0.89/wp-content/uploads/2013/05/Slide19-300x168.png 300w, http://192.168.0.89/wp-content/uploads/2013/05/Slide19-624x351.png 624w" sizes="(max-width: 720px) 100vw, 720px" />](http://stealthpuppy.com/wp-content/uploads/2013/05/Slide19.png)

Finally, here what I was interested in &#8211; who is using automated build process and who is still manually building images from the Windows ISO.

[<img class="alignnone size-full wp-image-3339" style="border: 1px solid black;" alt="Slide20" src="http://stealthpuppy.com/wp-content/uploads/2013/05/Slide20.png" width="720" height="405" srcset="http://192.168.0.89/wp-content/uploads/2013/05/Slide20.png 720w, http://192.168.0.89/wp-content/uploads/2013/05/Slide20-150x84.png 150w, http://192.168.0.89/wp-content/uploads/2013/05/Slide20-300x168.png 300w, http://192.168.0.89/wp-content/uploads/2013/05/Slide20-624x351.png 624w" sizes="(max-width: 720px) 100vw, 720px" />](http://stealthpuppy.com/wp-content/uploads/2013/05/Slide20.png)

I suspect that if we were to increase the data set, the percentage of manual builds would actually be higher than the 26% seen here.

So what about mixing this up a bit? Here&#8217;s the deployment types broken down by respondents using XenApp with Provisioning Services (at 23%):

[<img class="alignnone size-full wp-image-3341" style="border: 1px solid black;" alt="Slide21" src="http://stealthpuppy.com/wp-content/uploads/2013/05/Slide21.png" width="720" height="405" srcset="http://192.168.0.89/wp-content/uploads/2013/05/Slide21.png 720w, http://192.168.0.89/wp-content/uploads/2013/05/Slide21-150x84.png 150w, http://192.168.0.89/wp-content/uploads/2013/05/Slide21-300x168.png 300w, http://192.168.0.89/wp-content/uploads/2013/05/Slide21-624x351.png 624w" sizes="(max-width: 720px) 100vw, 720px" />](http://stealthpuppy.com/wp-content/uploads/2013/05/Slide21.png)

And XenDesktop with Machine Creation Services (at 24%):

[<img class="alignnone size-full wp-image-3342" style="border: 1px solid black;" alt="Slide22" src="http://stealthpuppy.com/wp-content/uploads/2013/05/Slide22.png" width="720" height="405" srcset="http://192.168.0.89/wp-content/uploads/2013/05/Slide22.png 720w, http://192.168.0.89/wp-content/uploads/2013/05/Slide22-150x84.png 150w, http://192.168.0.89/wp-content/uploads/2013/05/Slide22-300x168.png 300w, http://192.168.0.89/wp-content/uploads/2013/05/Slide22-624x351.png 624w" sizes="(max-width: 720px) 100vw, 720px" />](http://stealthpuppy.com/wp-content/uploads/2013/05/Slide22.png)

Again, I think the numbers of manual builds here are bit low if I compare against what I see in the real world. That said, my view is that 23/24% respondents using a manual build process is too high.

PVS and MCS are designed for delivery of the gold image, they are not a replacement for automating the creation of that image. What&#8217;s going to happen in those environments where the gold image has been built manually and it either needs to be recreated or the delivery mechanism needs to be changed? That manual image has become a black box that will be difficult to reverse engineer.

# How do you do it?

By now, you must get the idea I&#8217;m a fan of the Microsoft Deployment Toolkit. Part of this reason is its simple architecture. At its simplest, MDT is just a share on the network.

[<img class="alignnone size-full wp-image-3344" style="border: 1px solid black;" alt="Slide22" src="http://stealthpuppy.com/wp-content/uploads/2013/05/Slide26.png" width="720" height="405" srcset="http://192.168.0.89/wp-content/uploads/2013/05/Slide26.png 720w, http://192.168.0.89/wp-content/uploads/2013/05/Slide26-150x84.png 150w, http://192.168.0.89/wp-content/uploads/2013/05/Slide26-300x168.png 300w, http://192.168.0.89/wp-content/uploads/2013/05/Slide26-624x351.png 624w" sizes="(max-width: 720px) 100vw, 720px" />](http://stealthpuppy.com/wp-content/uploads/2013/05/Slide26.png)

It&#8217;s important to note that MDT provides light (or lite) touch deployments &#8211; user intervention is generally required to start a deployment. MDT is not agent based like System Center Configuration Manager and therefore does not provide any post-deployment management.

MDT has several major components:

  * MDT deployment share &#8211; a share on a network locations that supports SMB
  * <span style="line-height: 14px;"><a href="http://deploymentbunny.com/2012/04/21/back-to-basic-customsettings-ini-explained/">CustomSettings.ini</a> &#8211; this is used to control OS deployments and is a surprising flexible way of managing OS and application deployments and control of an end-point. If you are using </span>
  * WinPE boot image &#8211; you can use the MDT console to create custom boot images used to start an OS deployment. Alternatively you could use [Windows Deployment Services](http://technet.microsoft.com/en-us/windowsserver/dd448616.aspx) to boot the WinPE image across the network
  * The target PC &#8211; a single task sequence in MDT can be used to deploy Windows to either physical or virtual machines (on any hypervisor), providing consistency across machine types

I have spent quite some time building our MDT deployment share out to become not only a standardised framework but also a library of core application installs. MDT allows anyone to build this in their own environments.

[<img class="alignnone size-full wp-image-3349" alt="MDT" src="http://stealthpuppy.com/wp-content/uploads/2013/05/MDT.png" width="1123" height="630" srcset="http://192.168.0.89/wp-content/uploads/2013/05/MDT.png 1123w, http://192.168.0.89/wp-content/uploads/2013/05/MDT-150x84.png 150w, http://192.168.0.89/wp-content/uploads/2013/05/MDT-300x168.png 300w, http://192.168.0.89/wp-content/uploads/2013/05/MDT-1024x574.png 1024w, http://192.168.0.89/wp-content/uploads/2013/05/MDT-624x350.png 624w" sizes="(max-width: 1123px) 100vw, 1123px" />](http://stealthpuppy.com/wp-content/uploads/2013/05/MDT.png)

I won&#8217;t go into too much detail on MDT here, instead here&#8217;s a short list of resources and blogs that are excellent MDT references:

  * [<span style="line-height: 14px;">Microsoft Deployment Toolkit on TechNet</span>](http://technet.microsoft.com/en-gb/solutionaccelerators/dd407791.aspx)
  * [The Deployment Guys](http://blogs.technet.com/b/deploymentguys/)
  * [The Deployment Bunny](http://deploymentbunny.com)
  * [Deployment Research](http://www.deploymentresearch.com/Home.aspx)
  * [Scriptimus Ex Machina](http://scriptimus.wordpress.com)
  * [MDT videos from MMS 2013](http://channel9.msdn.com/Events/MMS/2013?t=microsoft-deployment-toolkit-mdt)

I&#8217;ve previously posted the demos that I delivered during this talk, which you can view here:

  * <span style="line-height: 14px;"><a href="http://stealthpuppy.com/community/hands-off-my-gold-image-video-automated-pvs-image-deploy-and-capture/">Automated PVS image deploy and capture</a><br /> </span>
  * [PowerShell, MDT, Atlantis ILIO and XenDesktop deployment](http://stealthpuppy.com/community/hands-off-my-gold-image-video-powershell-mdt-atlantis-ilio-and-xendesktop-deployment/)
  * [Windows 8 zero-touch deployment](http://stealthpuppy.com/community/hands-off-my-gold-image-video-windows-8-zero-touch-deployment/)

# Wrapping up

After last year&#8217;s version of this talk, I posted a basic set of instructions and downloadable components that you can use to [automate the deployment of a XenApp 6.5 PVS gold image](http://stealthpuppy.com/deployment/hands-off-my-gold-image-automating-citrix-xenapppvs-image-creation/).

Finally, I&#8217;d like you leave you with the key takeaways:

[<img class="alignnone size-full wp-image-3345" style="border: 1px solid black;" alt="Slide22" src="http://stealthpuppy.com/wp-content/uploads/2013/05/Slide31.png" width="720" height="405" srcset="http://192.168.0.89/wp-content/uploads/2013/05/Slide31.png 720w, http://192.168.0.89/wp-content/uploads/2013/05/Slide31-150x84.png 150w, http://192.168.0.89/wp-content/uploads/2013/05/Slide31-300x168.png 300w, http://192.168.0.89/wp-content/uploads/2013/05/Slide31-624x351.png 624w" sizes="(max-width: 720px) 100vw, 720px" />](http://stealthpuppy.com/wp-content/uploads/2013/05/Slide31.png)