---

title: Dynamic Suite Composition and short names
date: 2010-04-19T10:00:05+10:00
author: Nicke Källén
layout: post

permalink: /dynamic-suite-composition-and-short-names/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195382320"
categories:
  - Applications
tags:
  - App-V
  - dsc
  - dynamic suite composition
---
_This is a guest post from Nicke Källén, an_ [_App-V MVP_](https://mvp.support.microsoft.com/profile=DEDA5599-4A38-46A1-A4B0-479D4A945793) _from Sweden. He posts as [Znack](http://social.technet.microsoft.com/Profile/en-US/?user=znack&referrer=http%3a%2f%2fsocial.technet.microsoft.com%2fForums%2fen-US%2fappvclients%2fthread%2fba1a1e3b-b14e-45aa-9373-ba83601b67e9%3foutputas%3dxml&rh=tWq%2byX14GBUU1nKZoHcORYkqCJLPYn4mhXSrzDpr8kk%3d&sp=forums) on the [TechNet Forums](http://social.technet.microsoft.com/Forums/en-gb/category/appvirtualization), where he's consistently the  most active answerer in App-V topics. You can find his blog_ [_here_](http://www.viridisit.se/eng/blog/)_._ 

![AppVLogo]({{site.baseurl}}/media/2010/04/AppVLogo.png) After looking for information in all my usual channels during the last few months and banging my head against the wall for not understanding why I always run into problems in specific scenarios I finally came to a breakthrough in solving an issue that had been bugging me since early 2009.

This started out with me deciding to really pinpoint the root cause of the issue where the application could not find a file in a linked package, something I wrote about this in my [Swedish](http://www.viridisit.se/swe/blog/?p=149) blog a while ago (available for translation if wanted) and continued [discussing](http://www.viridisit.se/eng/blog/?p=198) later while requesting assistance.

Now – lets focus on the background before digging any deeper.

During the last couple of years I have been involved in the building of a XenApp farm based on Windows 2003 and XenApp 4.5. The goal of the project was to be able to create an environment that would be able to satisfy all the application owners needs. To add further complications the company just bought a larger company and they were both in need of major infrastructure upgrades (the number 2000 was showing up to many times). Essentially this meant: we needed to support just about any application in the world!

So how do you handle all the needs of different Java , Oracle client, Office versions and the possible conflicts you can expect in an environment like that?

I did not make the design. I have been involved in the details, I have assisted with making things run smoother. I hope I have helped make the people involved in the project see it as a delight and not a burden in making their applications available to a new client – most certainly making some applications available even though the new Vista-client could not host them. The design was made by someone else who provided great insights and an understanding of business requirements and how-to adopt them to a technical platform. The first draft of the environment was based on Windows Server 2003 SP1, SoftGrid 4.1 Terminal Services and XenApp 4.5. It has since evolved to Windows Server 2003 SP2, App-V 4.5 Terminal Services CU1 + HF6 and XenApp 4.5 Hotfix Rollup 5.

To use a marketing phrase – our setup was cloud based. The farm would be stripped of anything not necessary. No Office. Because, which Office version would we install? No Java. Because, which Java version would we install?

This would standardize the server-setup to one common installation hosting all applications – increasing flexibility, scalability and still allowing the various requirements of all applications that could possible want to be hosted.

This of course lead us to include any necessary software within a single virtual package. A package that would contain exactly what the application owner specified as requirements. Such as Office 2000, Adobe Reader 7, 8 or 9… or you name it… Only limitation is the 4gb limit of any App-V package. 4.5 removed this limit! Almost…. by using the feature [Dynamic Suite Composition](http://technet.microsoft.com/en-us/library/cc843662.aspx) we could work around it

Now – I was being told that one special application was going to be a challenge. Early on there was an insight that this system would have loads of middleware, different dependencies and would constantly be changing the configuration of any individual component.

Dynamic Suite Composition would of course be the rescue. As the system forced us to discover many new things (I can not stress enough that Aaron’s writings have been invaluable), however there was an ongoing struggle with odd things simply not working. Choosing the simple path and going back to the “single-package” approach was done quite early as the amount of issues reported could simply not be handled while using Dynamic Suite Composition. Usually when things go that bad it’s because somebody didn’t read the documentation. Apparently somebody in this case is me – so I read the documentation. Again. and Again… and felt pretty dumb…. because I just couldn’t figure it out.

Now, Dynamic Suite Composition was in my own little world a perfect usage for the scenario. The software needed Microsoft Office 2007, Adobe Acrobat, one small plug-in and some other minor stuff like Java. Early on I realized that there might be simply things – like a DLL conflict. Considering the fact that I separated the software into different packages to be able to cope with changes effectively I started thinking about what happened if there was a conflict between a registry key or file in the primary package and any secondary package.

There was no documentation regarding that – but let me clarify this;

  * Last loaded wins, apart from any configuration in primary OSD.
  * Packages are loaded in the order they are listed, so:

  1. Primary Package
  2. Secondary package 1
  3. Secondary package 2

Any conflict between the packages means that Secondary package 2 wins. DSC suddenly didn’t appear as such a good solution as some ideas had to be scrapped right away. Apart from the above realization we continued working with it in some cases, but again – other issues kept appearing. Most commonly we received messages that the Macro-feature was not installed with Office.

The macro-feature is a DLL-file. It’s referenced using a short name. More precisely – it looks like this:

![ShortFileNamePath]({{site.baseurl}}/media/2010/04/ShortFileNamePath.png)

The reference was there, the file was there – but yet when Microsoft Office was made a secondary package it could not locate the file.

As the 4.6 beta was out and there was a Connect-site up – we of course tried the 4.6 release and could repeat the issue. After getting an e-mail confirming that the product didn’t meet our expectations but no elaboration of why it didn’t we decided to pursue this further and opened a Premier Support Case and finally got information detailing the behaviour:

_Short name tables are not loaded from secondary packages._

Not really sure why, but any file being referenced using a short name from a secondary package will of course fail. In the above scenario – we have the luck of being able to change the reference – enter a long name path and all will be well. Currently there are more discussions ongoing regarding this behaviour – what it will mean in the end I am uncertain of.

So what can be done to avoid issues with the above? Make sure you do not have anything in the secondary package available in a location which uses long names. Such as %PROGRAMFILES%.

Since all of this was undocumented, our main focus was to get some proper documentation in place, and with the release of App-v 4.6 the [sequencing guide](http://download.microsoft.com/download/F/7/8/F784A197-73BE-48FF-83DA-4102C05A6D44/App-46_Sequencing_Guide_Final.docx) was updated with a few notes and the replacement of some images that had been pretty harshly judged. None of the actual technical limitations were written, instead small notes like this were noticed;

> _Also, the secondary application can only be middleware or a plug-in and cannot be another full software product._

What does that mean? Office is not supported as a secondary package and along with it all other full software suites. Why? To minimize the risk of any short name requirements within secondary packages.

Realizing the limitations of a product is probably key to optimally using it for any environment – the current issue revolving around the fact that we know there are limitations with a feature and hopefully Microsoft can be honest about them. So we can plan accordingly.
