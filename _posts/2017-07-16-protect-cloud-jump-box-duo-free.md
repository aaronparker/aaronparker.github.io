---
id: 5501
title: Protecting a Cloud Jump Box with Duo Free
date: 2017-07-16T11:28:39+10:00
author: Aaron Parker
layout: post
guid: http://stealthpuppy.com/?p=5501
permalink: /protect-cloud-jump-box-duo-free/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "5991802395"
image: /wp-content/uploads/2017/07/6512196829_862d3de0d2_b.jpg
categories:
  - Microsoft
tags:
  - AWS
  - Azure
  - Duo
  - MFA
---
Deploying a jump box into a cloud environment such as [Azure](http://stealthpuppy.com/tag/azure/) or AWS, is a common way of providing access into said environment through a single entry point. Often access to the jump box will be restricted by source IP, but that approach isn&#8217;t completely secure for many reasons - admins don&#8217;t update the rules, source IP doesn&#8217;t identify the user etc.

One of the best ways to protection authentication to a remote Windows box is via multi-factor authentication (MFA). Keep source IP rulesets if you want, but add [MFA](http://stealthpuppy.com/tag/mfa/) to ensure that even if a user&#8217;s password is compromised, additional authentication information is always enforced.

In most Azure environments I&#8217;ve deployed, the customer is licensing [Azure AD](http://stealthpuppy.com/tag/azure-ad) Premium which we could integrate with RD Gateway and RD Web Access for securing authentication to the jump box via the Azure MFA Server. The issue there is that it requires deploying more complexity than necessary for a jump box and likely extra licensing for the RD Gateway role. Less than ideal.

So I went looking for a more cost effective way of securing remote access to cloud environments - something that&#8217;s light weight, runs on a single VM and ideally wouldn&#8217;t require additional licensing.

Fellow [CTP](http://stealthpuppy.com/1about/) and all round knowledgeable guy, [Jarian Gibson](https://twitter.com/jariangibson) recommended checking out Duo. Duo are an [identity provider](https://duo.com/)&nbsp;including MFA who have a&nbsp;[a free version that gives you two-factor authentication for up to 10 users](https://duo.com/pricing/duo-free).

# Adding MFA to a Jump Box

Signing up for Duo and adding MFA to a Windows Server VM running in Azure is a simple process:

  1. [Sign up for Duo](https://signup.duo.com/). A Duo account is free - this provides you with a control panel used to add Duo support for multiple applications. Install the Duo Mobile app on your phone to enable MFA prompts as phone calls and SMSs are not free. Duo gives you 490 'Telephone credits&#8217;, but you&#8217;ll need to add a credit card to purchase more.
  2. Add a user account to Duo that matches the account on the jump box. My jump box is a stand-alone server, so the account in Duo matches the username of an account local to the VM
  3. Choose to add MFA to '[Microsoft RDP](https://duo.com/docs/rdp)'. Duo have [about 125 applications](https://duo.com/docs) they can add authentication features to, and their documentation for setup is very good.
  4. Install the Duo Authentication for Windows Logon on the target VM. The hardest part about this step was actually finding the binaries to install the agent. It&#8217;s linked in the documentation (of course) but for whatever reason, I just couldn&#8217;t see it.
  5. Keep the bad guys out

Here&#8217;s what the process looks like:

## Setup

Adding Microsoft RDP (and local logon) support is as simple as clicking the 'Protect this Application&#8217; link. When you added, you&#8217;ll find an Integration Key, Secret Key and API hostname that will be used by the Duo agent on the target VM to authenticate against Duo for MFA prompts.

<figure id="attachment_5508" aria-describedby="caption-attachment-5508" style="width: 541px" class="wp-caption alignnone">[<img class="size-large wp-image-5508" src="http://stealthpuppy.com/wp-content/uploads/2017/07/02_Setup-1-541x1024.png" alt="Authentication details for Microsoft RDP" width="541" height="1024" srcset="https://stealthpuppy.com/wp-content/uploads/2017/07/02_Setup-1-541x1024.png 541w, https://stealthpuppy.com/wp-content/uploads/2017/07/02_Setup-1-79x150.png 79w, https://stealthpuppy.com/wp-content/uploads/2017/07/02_Setup-1-158x300.png 158w, https://stealthpuppy.com/wp-content/uploads/2017/07/02_Setup-1-768x1454.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/07/02_Setup-1.png 1440w" sizes="(max-width: 541px) 100vw, 541px" />](http://stealthpuppy.com/wp-content/uploads/2017/07/02_Setup-1.png)<figcaption id="caption-attachment-5508" class="wp-caption-text">Authentication details for Microsoft RDP</figcaption></figure>

As you can see in the screenshot there&#8217;s a number of options for customising authentication; however, in this case I&#8217;ve accepted all of the defaults.

Next, add a user to Duo that matches the username in the target environment. This can be a user in Active Directory or a local user account. In my test environment, my jump box is not a member of AD, but I could make the VM a member of a domain. The ability to target domain or local users is great because it provides flexibility.

<figure id="attachment_5539" aria-describedby="caption-attachment-5539" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5539" src="http://stealthpuppy.com/wp-content/uploads/2017/07/AddUser-1024x980.png" alt="Adding a user in the Duo Console" width="1024" height="980" srcset="https://stealthpuppy.com/wp-content/uploads/2017/07/AddUser-1024x980.png 1024w, https://stealthpuppy.com/wp-content/uploads/2017/07/AddUser-150x144.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/07/AddUser-300x287.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/07/AddUser-768x735.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/07/AddUser.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/07/AddUser.png)<figcaption id="caption-attachment-5539" class="wp-caption-text">Adding a user in the Duo Console</figcaption></figure>

For this user account, I&#8217;ve added a phone number which then allows me to send a link for adding the account to the Duo Mobile app on the user&#8217;s phone.

<figure id="attachment_5517" aria-describedby="caption-attachment-5517" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5517" src="http://stealthpuppy.com/wp-content/uploads/2017/07/08_Setup-1024x587.png" alt="Activating an account on the Duo Mobile app" width="1024" height="587" srcset="https://stealthpuppy.com/wp-content/uploads/2017/07/08_Setup-1024x587.png 1024w, https://stealthpuppy.com/wp-content/uploads/2017/07/08_Setup-150x86.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/07/08_Setup-300x172.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/07/08_Setup-768x441.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/07/08_Setup.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/07/08_Setup.png)<figcaption id="caption-attachment-5517" class="wp-caption-text">Activating an account on the Duo Mobile app</figcaption></figure>

Send a link to the user which can be customised:

<figure id="attachment_5523" aria-describedby="caption-attachment-5523" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5523" src="http://stealthpuppy.com/wp-content/uploads/2017/07/09_Setup-1024x587.png" alt="Send an activation link to the user" width="1024" height="587" srcset="https://stealthpuppy.com/wp-content/uploads/2017/07/09_Setup-1024x587.png 1024w, https://stealthpuppy.com/wp-content/uploads/2017/07/09_Setup-150x86.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/07/09_Setup-300x172.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/07/09_Setup-768x441.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/07/09_Setup.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/07/09_Setup.png)<figcaption id="caption-attachment-5523" class="wp-caption-text">Send an activation link to the user</figcaption></figure>

Here&#8217;s what appears on the user&#8217;s phone - tap the link and it will open in the Duo app.

<figure id="attachment_5518" aria-describedby="caption-attachment-5518" style="width: 576px" class="wp-caption alignnone">[<img class="wp-image-5518 size-large" src="http://stealthpuppy.com/wp-content/uploads/2017/07/IMG_4106-576x1024.png" alt="Duo activation link sent to the phone" width="576" height="1024" srcset="https://stealthpuppy.com/wp-content/uploads/2017/07/IMG_4106-576x1024.png 576w, https://stealthpuppy.com/wp-content/uploads/2017/07/IMG_4106-84x150.png 84w, https://stealthpuppy.com/wp-content/uploads/2017/07/IMG_4106-169x300.png 169w, https://stealthpuppy.com/wp-content/uploads/2017/07/IMG_4106.png 750w" sizes="(max-width: 576px) 100vw, 576px" />](http://stealthpuppy.com/wp-content/uploads/2017/07/IMG_4106.png)<figcaption id="caption-attachment-5518" class="wp-caption-text">Duo activation link sent to the phone</figcaption></figure>

And the account now added to the phone. Here&#8217;s I have my Duo admin account, plus the account on the jump box. I&#8217;m not sure whether the display name can be changed, but it does show my customised logo configured in the Duo admin console.

<figure id="attachment_5520" aria-describedby="caption-attachment-5520" style="width: 576px" class="wp-caption alignnone">[<img class="size-large wp-image-5520" src="http://stealthpuppy.com/wp-content/uploads/2017/07/IMG_4111-576x1024.png" alt="Accounts in the Duo Mobile app" width="576" height="1024" srcset="https://stealthpuppy.com/wp-content/uploads/2017/07/IMG_4111-576x1024.png 576w, https://stealthpuppy.com/wp-content/uploads/2017/07/IMG_4111-84x150.png 84w, https://stealthpuppy.com/wp-content/uploads/2017/07/IMG_4111-169x300.png 169w, https://stealthpuppy.com/wp-content/uploads/2017/07/IMG_4111.png 750w" sizes="(max-width: 576px) 100vw, 576px" />](http://stealthpuppy.com/wp-content/uploads/2017/07/IMG_4111.png)<figcaption id="caption-attachment-5520" class="wp-caption-text">Accounts in the Duo Mobile ap, but t</figcaption></figure>

So setup of Microsoft RDP and a user account in the Duo console is quick and easy, so onto installing the Duo agent on my target VM.

## Installing the Duo Agent

Logon to your target VM, download the [Duo Authentication for Windows Logon agent](https://dl.duosecurity.com/duo-win-login-latest.exe) and run the installer. During install you&#8217;re asked for the account details setup previously in the admin console.&nbsp;

<figure id="attachment_5524" aria-describedby="caption-attachment-5524" style="width: 500px" class="wp-caption alignnone">[<img class="size-full wp-image-5524" src="http://stealthpuppy.com/wp-content/uploads/2017/07/02_Install.png" alt="Adding the Duo account details to the agent" width="500" height="381" srcset="https://stealthpuppy.com/wp-content/uploads/2017/07/02_Install.png 500w, https://stealthpuppy.com/wp-content/uploads/2017/07/02_Install-150x114.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/07/02_Install-300x229.png 300w" sizes="(max-width: 500px) 100vw, 500px" />](http://stealthpuppy.com/wp-content/uploads/2017/07/02_Install.png)<figcaption id="caption-attachment-5524" class="wp-caption-text">Adding the Duo account details to the agent</figcaption></figure>

[The installer supports a silent install](https://help.duo.com/s/article/ka070000000k9uCAAQ/1090), so you could for example, add the agent with authentication details with PowerShell DSC during deployment of the VM.

One the agent is install, no reboot is required. Yes - no reboot!

# Logon Experience

When connecting to the jump box via RDP, you authenticate with username and password from the local device as normal; however, once the connection is made, Duo displays a security prompt, where you&#8217;ll need to respond to a push notification, phone call or provide a passcode.

<figure id="attachment_5527" aria-describedby="caption-attachment-5527" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5527" src="http://stealthpuppy.com/wp-content/uploads/2017/07/05_Install-1024x640.png" alt="Duo security prompt on the jump box" width="1024" height="640" srcset="https://stealthpuppy.com/wp-content/uploads/2017/07/05_Install-1024x640.png 1024w, https://stealthpuppy.com/wp-content/uploads/2017/07/05_Install-150x94.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/07/05_Install-300x188.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/07/05_Install-768x480.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/07/05_Install.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/07/05_Install.png)<figcaption id="caption-attachment-5527" class="wp-caption-text">Duo security prompt on the jump box</figcaption></figure>

The screenshot shows the Duo logo, even though I&#8217;ve set my own logon in the Duo console. While my custom logo displays on the phone, I would have liked for it to display on the Windows logon screen to provide users with the extra visual feedback when logging in.

Responding to a login request in the Duo Mobile app on the iPhone is as simple as acknowledging the request with an Approve (or Deny, if need be).

<figure id="attachment_5528" aria-describedby="caption-attachment-5528" style="width: 576px" class="wp-caption alignnone">[<img class="size-large wp-image-5528" src="http://stealthpuppy.com/wp-content/uploads/2017/07/IMG_4110-576x1024.png" alt="Duo login request on an iPhone" width="576" height="1024" srcset="https://stealthpuppy.com/wp-content/uploads/2017/07/IMG_4110-576x1024.png 576w, https://stealthpuppy.com/wp-content/uploads/2017/07/IMG_4110-84x150.png 84w, https://stealthpuppy.com/wp-content/uploads/2017/07/IMG_4110-169x300.png 169w, https://stealthpuppy.com/wp-content/uploads/2017/07/IMG_4110.png 750w" sizes="(max-width: 576px) 100vw, 576px" />](http://stealthpuppy.com/wp-content/uploads/2017/07/IMG_4110.png)<figcaption id="caption-attachment-5528" class="wp-caption-text">Duo login request on an iPhone</figcaption></figure>

If you have an Apple Watch, you can approve the login request from your wrist without finding your phone, so responding to the notification is even quicker.

<figure id="attachment_5529" aria-describedby="caption-attachment-5529" style="width: 312px" class="wp-caption alignnone">[<img class="size-full wp-image-5529" src="http://stealthpuppy.com/wp-content/uploads/2017/07/IMG_4109.png" alt="Duo login request on the Apple Watch" width="312" height="390" srcset="https://stealthpuppy.com/wp-content/uploads/2017/07/IMG_4109.png 312w, https://stealthpuppy.com/wp-content/uploads/2017/07/IMG_4109-120x150.png 120w, https://stealthpuppy.com/wp-content/uploads/2017/07/IMG_4109-240x300.png 240w" sizes="(max-width: 312px) 100vw, 312px" />](http://stealthpuppy.com/wp-content/uploads/2017/07/IMG_4109.png)<figcaption id="caption-attachment-5529" class="wp-caption-text">Duo login request on the Apple Watch</figcaption></figure>

## Denied Logons

There may be many reasons why logins are denied, so here&#8217;s what the experience looks like for a couple of scenarios. The first screenshot shows what happens if I tap Deny on the authentication prompt on my phone or watch:

<figure id="attachment_5533" aria-describedby="caption-attachment-5533" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5533" src="http://stealthpuppy.com/wp-content/uploads/2017/07/06_Install-1024x640.png" alt="Logon request denied" width="1024" height="640" srcset="https://stealthpuppy.com/wp-content/uploads/2017/07/06_Install-1024x640.png 1024w, https://stealthpuppy.com/wp-content/uploads/2017/07/06_Install-150x94.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/07/06_Install-300x188.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/07/06_Install-768x480.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/07/06_Install.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/07/06_Install.png)<figcaption id="caption-attachment-5533" class="wp-caption-text">Logon request denied</figcaption></figure>

If I click Dismiss and close the Duo dialog box, Windows displays a login request button.

<figure id="attachment_5534" aria-describedby="caption-attachment-5534" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5534" src="http://stealthpuppy.com/wp-content/uploads/2017/07/07_Install-1024x640.png" alt="Login request denied" width="1024" height="640" srcset="https://stealthpuppy.com/wp-content/uploads/2017/07/07_Install-1024x640.png 1024w, https://stealthpuppy.com/wp-content/uploads/2017/07/07_Install-150x94.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/07/07_Install-300x188.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/07/07_Install-768x480.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/07/07_Install.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/07/07_Install.png)<figcaption id="caption-attachment-5534" class="wp-caption-text">Login request denied</figcaption></figure>

I can re-enter my password at the point and the Duo Security dialog will come up again and send me an authentication notification.

What happens for other users on the system that aren&#8217;t enrolled in Duo? If login is successful, they&#8217;ll see a prompt that says &#8220;The username you have entered is not enrolled with Duo Security. Please contact your system administrator.&#8221; Shown here:

<figure id="attachment_5535" aria-describedby="caption-attachment-5535" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5535" src="http://stealthpuppy.com/wp-content/uploads/2017/07/NotEnrolled-1024x640.png" alt="When a user is not enrolled in Duo" width="1024" height="640" srcset="https://stealthpuppy.com/wp-content/uploads/2017/07/NotEnrolled-1024x640.png 1024w, https://stealthpuppy.com/wp-content/uploads/2017/07/NotEnrolled-150x94.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/07/NotEnrolled-300x188.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/07/NotEnrolled-768x480.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/07/NotEnrolled.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2017/07/NotEnrolled.png)<figcaption id="caption-attachment-5535" class="wp-caption-text">When a user is not enrolled in Duo</figcaption></figure>

This looks pretty good. I&#8217;m not sure if there&#8217;s ways around the Duo authentication, but I presume standard credential provider hooking into GINA is used, so it should be as rock solid as Microsoft makes in and Duo adheres to the standard.

# Summary

In this article, I&#8217;ve shown you how to integrate Duo into a RDP login to provide MFA for a jump box hosted in Azure. This provides the additional security needed to protect logins into these environments that could augment source IP rules for remote access or allow you to open RDP access for administrators needing to get into the cloud environment from anywhere. Best of all, we&#8217;ve added this extra security with minimal infrastructure additions and no extra licensing.