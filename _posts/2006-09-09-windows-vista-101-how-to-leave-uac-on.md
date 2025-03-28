---

title: 'Windows Vista 101: How to leave UAC on'
date: 2006-09-09T07:27:00+10:00
author: Aaron Parker
layout: post

permalink: /windows-vista-101-how-to-leave-uac-on/
categories:
  - Microsoft
tags:
  - UAC
  - Windows-Vista
---
This one is in reply to [Long's post](http://www.istartedsomething.com/20060909/howto-turn-off-uac/), but to be fair I know he's all for UAC. Windows Vista finally introduces some real security improvements to the Windows operating system that have been long overdue. The product is still in beta, however people are already up in arms about how 'intrusive' UAC is. Why is it that Linux and MacOS users understand why it's not a good idea to run with administrative privileges and Windows users don't? *

How did Windows users get into this mess in the first place? This can be summed up in one word: Compatibility. Microsoft are big on compatibility, probably more than anyone else in the industry**. The problem with this, is that Windows is still providing compatibility for a time when everyone was writing applications for MS-DOS / Windows 3.1 / Windows 95, when full access to Windows was guaranteed. Because there was no security. Where are we now, in 2006? Well not that much better, developers still think the user has administrative access to their workstations, and program accordingly. This proves to be a big challenge when we want to run applications with limited user access. Developers need a right royal kick up the behind and [learn how to write applications that don't require administrative access](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dnlong/html/AccProtVista.asp).

So what does UAC actually mean to the end-user? UAC gives us the best of both worlds, it allows us to run as a limited user and protect Windows from malicious software yet still allows administrative access when required. Now it's not implemented in the same manner as something like [sudo](http://en.wikipedia.org/wiki/Sudo) but it still does the job. When logging onto a Windows Vista machine as an administrator, Windows does not grant the user's session a token for performing administrative tasks until UAC kicks in and elevates the user. This can be demonstrated with everyone's favourite word processing application - Notepad. The image below shows the privileges Notepad has when running with limited user privileges (check out the lower list box).

![]({{site.baseurl}}/media/2006/09/1000.14.95.NotepadAsUser.PNG) 

The screenshot below shows Notepad run with elevated privileges after running as administrator. As you can see Notepad now has many more access privileges and therefore the ability to have complete access to the operating system.

![]({{site.baseurl}}/media/2006/09/1000.14.96.NotepadAsAdministrator.PNG) 

Fortunately there are a couple of methods that can be used to make life with UAC easier whilst still reaping the benefits of what UAC has to offer.

**Run a Command Prompt As Administrator**  
Now this one will require returning to your command line roots or learning how to use the command line if you don't already know how. But that's a good thing (You'll be surprised how much faster you can get things done via the command line). There are two ways to run a command prompt as Administrator:

* Right click the Command Prompt icon and choose 'Run as administrator'. This is the long way that requires an extra click; or
* Modify a shortcut for the command prompt so that it will always launch as an Administrator.

This will result in a Command Prompt window with the text "Administrator" in the title bar. Using the second option is easy, just open the properties of the Command Prompt shortcut, click Advanced and place a tick in the checkbox labelled "Run as administrator". Click on the screenshots below to see the shortcut properties and the resulting Command Prompt in more detail:

![]({{site.baseurl}}/media/2006/09/1000.14.93.RunAsAdministrator.PNG")

![]({{site.baseurl}}/media/2006/09/1000.14.94.AdministratorCommandPrompt.PNG")

The benefit of the approach is that applications launched via the elevated command prompt will also be elevated.

**Run an Explorer Window As Administrator**  
Most of the frustrations with UAC will stem from the requirement to click the UAC prompt when performing file system tasks in Windows Explorer that require administrative tasks. Fortunately there is an easy way to get around this without disabling UAC:

* Open an Explorer window and click 'Organise';
* Click 'Folder and Search Options' and click the 'View' tab;
* Place a tick next to 'Launch folder windows in a separate process'.

The following screenshot shows this option:

![]({{site.baseurl}}/media/2006/09/1000.14.92.SeperateProcess.PNG")

Now you can right click a Windows Explorer shortcut and choose 'Run as administrator' to elevate that window to perform administrative tasks from that single window without multiple UAC prompts.

These are just a couple of ways to make life with UAC easier and I encourage everyone to leave UAC on. In twelve months after Vista has been out for some time things will be different again. More applications will be Vista aware and the number of UAC prompts should be reduced.

I'm generalising, I know; **This is conjecture drawn from purely anecdotal evidence, but I think its correct 😉
