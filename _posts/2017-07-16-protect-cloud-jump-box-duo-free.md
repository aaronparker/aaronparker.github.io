---
id: 5501
title: Protecting a Cloud Jump Box with Duo Free
date: 2017-07-16T11:28:39+10:00
author: Aaron Parker
layout: post
guid: https://stealthpuppy.com/?p=5501
permalink: /protect-cloud-jump-box-duo-free/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "5991802395"
image: /media/2017/07/6512196829_862d3de0d2_b.jpg
categories:
  - Microsoft
tags:
  - AWS
  - Azure
  - Duo
  - MFA
---
Deploying a jump box into a cloud environment such as [Azure]({{site.baseurl}}/tag/azure/) or AWS, is a common way of providing access into said environment through a single entry point. Often access to the jump box will be restricted by source IP, but that approach isn't completely secure for many reasons - admins don't update the rules, source IP doesn't identify the user etc.

One of the best ways to protection authentication to a remote Windows box is via multi-factor authentication (MFA). Keep source IP rulesets if you want, but add [MFA]({{site.baseurl}}/tag/mfa/) to ensure that even if a user's password is compromised, additional authentication information is always enforced.

In most Azure environments I've deployed, the customer is licensing [Azure AD]({{site.baseurl}}/tag/azure-ad) Premium which we could integrate with RD Gateway and RD Web Access for securing authentication to the jump box via the Azure MFA Server. The issue there is that it requires deploying more complexity than necessary for a jump box and likely extra licensing for the RD Gateway role. Less than ideal.

So I went looking for a more cost effective way of securing remote access to cloud environments - something that's light weight, runs on a single VM and ideally wouldn't require additional licensing.

Fellow [CTP]({{site.baseurl}}/1about/) and all round knowledgeable guy, [Jarian Gibson](https://twitter.com/jariangibson) recommended checking out Duo. Duo are an [identity provider](https://duo.com/) including MFA who have a [a free version that gives you two-factor authentication for up to 10 users](https://duo.com/pricing/duo-free).

## Adding MFA to a Jump Box

Signing up for Duo and adding MFA to a Windows Server VM running in Azure is a simple process:

  1. [Sign up for Duo](https://signup.duo.com/). A Duo account is free - this provides you with a control panel used to add Duo support for multiple applications. Install the Duo Mobile app on your phone to enable MFA prompts as phone calls and SMSs are not free. Duo gives you 490 'Telephone credits', but you'll need to add a credit card to purchase more.
  2. Add a user account to Duo that matches the account on the jump box. My jump box is a stand-alone server, so the account in Duo matches the username of an account local to the VM
  3. Choose to add MFA to '[Microsoft RDP](https://duo.com/docs/rdp)'. Duo have [about 125 applications](https://duo.com/docs) they can add authentication features to, and their documentation for setup is very good.
  4. Install the Duo Authentication for Windows Logon on the target VM. The hardest part about this step was actually finding the binaries to install the agent. It's linked in the documentation (of course) but for whatever reason, I just couldn't see it.
  5. Keep the bad guys out

Here's what the process looks like:

### Setup

Adding Microsoft RDP (and local logon) support is as simple as clicking the 'Protect this Application' link. When you added, you'll find an Integration Key, Secret Key and API hostname that will be used by the Duo agent on the target VM to authenticate against Duo for MFA prompts.

![Authentication details for Microsoft RDP]({{site.baseurl}}/media/2017/07/02_Setup-1.png)*Authentication details for Microsoft RDP*

As you can see in the screenshot there's a number of options for customising authentication; however, in this case I've accepted all of the defaults.

Next, add a user to Duo that matches the username in the target environment. This can be a user in Active Directory or a local user account. In my test environment, my jump box is not a member of AD, but I could make the VM a member of a domain. The ability to target domain or local users is great because it provides flexibility.

![Adding a user in the Duo Console]({{site.baseurl}}/media/2017/07/AddUser.png)*Adding a user in the Duo Console*

For this user account, I've added a phone number which then allows me to send a link for adding the account to the Duo Mobile app on the user's phone.

![Activating an account on the Duo Mobile app]({{site.baseurl}}/media/2017/07/08_Setup.png)*Activating an account on the Duo Mobile app*

Send a link to the user which can be customised:

![Send an activation link to the user]({{site.baseurl}}/media/2017/07/09_Setup.png)*Send an activation link to the user*

Here's what appears on the user's phone - tap the link and it will open in the Duo app.

![Duo activation link sent to the phone]({{site.baseurl}}/media/2017/07/IMG_4106.png)*Duo activation link sent to the phone*

And the account now added to the phone. Here's I have my Duo admin account, plus the account on the jump box. I'm not sure whether the display name can be changed, but it does show my customised logo configured in the Duo admin console.

![Accounts in the Duo Mobile app]({{site.baseurl}}/media/2017/07/IMG_4111.png)*Accounts in the Duo Mobile ap, but t*

So setup of Microsoft RDP and a user account in the Duo console is quick and easy, so onto installing the Duo agent on my target VM.

### Installing the Duo Agent

Logon to your target VM, download the [Duo Authentication for Windows Logon agent](https://dl.duosecurity.com/duo-win-login-latest.exe) and run the installer. During install you're asked for the account details setup previously in the admin console. 

![Adding the Duo account details to the agent]({{site.baseurl}}/media/2017/07/02_Install.png)*Adding the Duo account details to the agent*

[The installer supports a silent install](https://help.duo.com/s/article/ka070000000k9uCAAQ/1090), so you could for example, add the agent with authentication details with PowerShell DSC during deployment of the VM.

One the agent is install, no reboot is required. Yes - no reboot!

## Logon Experience

When connecting to the jump box via RDP, you authenticate with username and password from the local device as normal; however, once the connection is made, Duo displays a security prompt, where you'll need to respond to a push notification, phone call or provide a passcode.

!["Duo security prompt on the jump box]({{site.baseurl}}/media/2017/07/05_Install.png)*Duo security prompt on the jump box*

The screenshot shows the Duo logo, even though I've set my own logon in the Duo console. While my custom logo displays on the phone, I would have liked for it to display on the Windows logon screen to provide users with the extra visual feedback when logging in.

Responding to a login request in the Duo Mobile app on the iPhone is as simple as acknowledging the request with an Approve (or Deny, if need be).

![Duo login request on an iPhone]({{site.baseurl}}/media/2017/07/IMG_4110.png)*Duo login request on an iPhone*

If you have an Apple Watch, you can approve the login request from your wrist without finding your phone, so responding to the notification is even quicker.

![Duo login request on the Apple Watch]({{site.baseurl}}/media/2017/07/IMG_4109.png)*Duo login request on the Apple Watch*

### Denied Logons

There may be many reasons why logins are denied, so here's what the experience looks like for a couple of scenarios. The first screenshot shows what happens if I tap Deny on the authentication prompt on my phone or watch:

![Logon request denied]({{site.baseurl}}/media/2017/07/06_Install.png)*Logon request denied*

If I click Dismiss and close the Duo dialog box, Windows displays a login request button.

![Login request denied]({{site.baseurl}}/media/2017/07/07_Install.png)*Login request denied*

I can re-enter my password at the point and the Duo Security dialog will come up again and send me an authentication notification.

What happens for other users on the system that aren't enrolled in Duo? If login is successful, they'll see a prompt that says "The username you have entered is not enrolled with Duo Security. Please contact your system administrator." Shown here:

![When a user is not enrolled in Duo]({{site.baseurl}}/media/2017/07/NotEnrolled.png)*When a user is not enrolled in Duo*

This looks pretty good. I'm not sure if there's ways around the Duo authentication, but I presume standard credential provider hooking into GINA is used, so it should be as rock solid as Microsoft makes in and Duo adheres to the standard.

## Summary

In this article, I've shown you how to integrate Duo into a RDP login to provide MFA for a jump box hosted in Azure. This provides the additional security needed to protect logins into these environments that could augment source IP rules for remote access or allow you to open RDP access for administrators needing to get into the cloud environment from anywhere. Best of all, we've added this extra security with minimal infrastructure additions and no extra licensing.