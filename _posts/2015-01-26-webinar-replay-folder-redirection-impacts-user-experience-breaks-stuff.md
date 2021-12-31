---
title: 'Webinar Replay: How Folder Redirection Impacts User Experience and Breaks Applications'
date: 2015-01-26T13:57:09+10:00
author: Aaron Parker
layout: post
permalink: /webinar-replay-folder-redirection-impacts-user-experience-breaks-stuff/
image: /media/2015/01/webinar25-01-624x351.png
categories:
  - Community
tags:
  - Folder Redirection
  - Webinar
---
Last week, thanks to [xenappblog.com](http://xenappblog.com), [Helge Klein](http://helgeklein.com) and I presented a webinar titled: [How Folder Redirection Impacts User Experience and Breaks Applications](http://xenapptraining.com/citrix-xenapp-7-6-with-folder-redirection). This was a great webinar for us to present thanks to Eric. This is the first time Helge and I have presented this topic together - previously Helge and [Shawn Bass](http://twitter.com/shawnbass) presented at [BriForum London](http://www.briforum.com) and Shawn and I presented it as [BriForum Boston](http://www.briforum.com).

We had approximately 240 attendees, which as fantastic interest in this topic and [the webinar reply is now available for viewing](http://xenapptraining.com/citrix-xenapp-7-6-with-folder-redirection) for xenapptraining.com members.

We had time to answer a couple of questions at the end of the presentation; however there were some additional questions, and I'll attempt to answer a selection of them here:

_**Q**: I stream `AppData\Roaming`, and redirect Documents and Favourites, but exclude the other two AppData folders: LocalLow and Local. These folder contents are destroyed on each user log off. Is this bad practice?_

**A**: No, this is exactly what happens with Windows Roaming Profiles (with profiles deleted at logoff). If there are applications that write user preferences to the AppData\Local folder, then explicitly add these to the UPM (or other profile management solution) for roaming. Be careful though, as the Local folder often includes a large amount of data.

_**Q**: We are currently excluding `AppData\Local` and `AppData\LocalLow` in Citrix PM policy. We logged a call with Citrix about an issue and they questioned why they were excluded. I have seen articles that say to exclude them which I followed. Are those folders meant to be excluded or not?_

**A**: I think we answered this on the webinar, but it's worth pointing out that, again, this is what happens with Windows Roaming Profiles and I don't agree with any reasoning to roam the entire folders. If there are specific folders with applications preferences, explicitly list those folders only for roaming.

_**Q**: Is SMB 3.x possible to use in a file server on Windows Server 2012 R2. Would this have a performance impact ? _

**A**: SMB 3.x will be negotiated by default for those servers and clients that speak SMB 3.x (Windows 8.0 and Windows Server 2012 and above). While we haven't yet tested the performance impacts of SMB 3.x, but have plans for testing this year.

_**Q**: What's the best practise with redirecting AppData when use Roaming Profiles or Citrix Profiles?_

**A**: Best practice will depend on what's best for your specific scenario; however I would recommend the following approach:

* Avoid redirecting AppData and use a profile management solution instead, especially if you can manage the user profile on a per-application basis. If you must redirect application data ensure that you:
* Use the latest version of SMB supported by the client and server
* Consistent file server performance is key - proactively monitor file servers for CPU, memory and disk performance
* Spread the load out across multiple file servers (and hardware) to improve performance and not affect all users if a file server is unavailable
* Validate the performance of various configurations with tools such as [Login VSI](http://www.loginvsi.com). This is important for initial deployments, but also ideal for understanding the impacts of configuration changes post deployment
* Ensure applications are tested with AppData redirection to ensure they works as expected

_**Q**: What's the best solution if my customer wants to have the same profile/desktop when they use their computer locally or if they connect to a XenApp server .. The goal ... they should not see any differences on for example their desktop_

**A**: If you want to provide consistency across multiple device types, I would recommend using [a 3rd party solution for user environment management](http://www.brianmadden.com/blogs/rubenspruijt/archive/2013/12/09/application-virtualization-smackdown-head-to-head-analysis-of-cameyo-citrix-numecent-microsoft-spoon-symantec-and-vmware.aspx) such as AppSense Environment Manager. While you can provide users with a largely consistent experience across devices, not all settings can be applied to all versions of Windows (even across the same version of client and server). Only with a 3rd party solution can you dynamically apply preferences and policies required to implement such an approach.

_**Q**: When I'm using Citrix XenApp with only seamless published Applications - it has no negative impacts when I redirect the Desktop? Correct?_

**A**: As we showed in a couple of the videos in the webinar, there can be side effects of redirecting any folder, including the Desktop; however long with Documents, Pictures etc. Desktop is a folder that will often contain user data, so folder redirection is useful for moving the folder to a file server for data protection.

_**Q**: I was wondering if you have a recommendation as far as using CIFS shares instead of using a VM or physical box containing Windows OS file server and how using any of these methods would affect folder redirection? My company is currently using CIFS shares instead of a standard Windows file server for Home Directories. The Home Directories are we used to redirect the Desktop Folder, IE cookies, My Documents and Favorites via UNC path. We have not experienced any issues, but we are in the middle of piloting our XenDesktop environment and would like to know if you have seen any issues using CIFS shares instead of a standard Windows file server for home directories and folder redirection._

**A**: First a note on "CIFS" (which may be semantics more than anything else) - CIFS is a specific implementation of SMB, most commonly associated with SMB 1.x. There have been major improvements to SMB with 2.0 and above. For a discussion on the differences, I recommend reading these articles: [The Difference Between CIFS and SMB](http://blog.varonis.com/the-difference-between-cifs-and-smb/) and [Why You Should Never Again Utter The Word, “CIFS”](http://blog.fosketts.net/2012/02/16/cifs-smb/). Regardless, you should make every effort to use the latest version of SMB supported by the client operating system. For Windows Servers this is simple - use the same or higher version of Windows as the client. For storage solutions, check with your storage vendor to ensure your shared storage is running the latest updates.
