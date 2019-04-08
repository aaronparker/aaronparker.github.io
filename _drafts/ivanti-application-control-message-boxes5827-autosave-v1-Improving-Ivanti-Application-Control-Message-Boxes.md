---
id: 5958
title: Improving Ivanti Application Control Message Boxes
date: 2018-02-12T10:58:31+10:00
author: Aaron Parker
layout: revision
guid: https://stealthpuppy.com/5827-autosave-v1/
permalink: /5827-autosave-v1/
---
Ivanti Application Control (previously [AppSense Application Manager](https://www.ivanti.com.au/products/application-control)) is an application whitelisting and privilege management solution; however, I think you're likely aware of that since you're reading this article. Application Control has a number of customisable message boxes that are displayed to the end-user for Windows application whitelisting or privilege elevation scenarios. In this article, I'll discuss improving the end-user experience with some visual flair and text.

# Default Message Boxes

Let's take a look at a typical message box. Below is the default Access Denied message displayed to users on Windows 10 when attempting to start an application that hasn't been white-listed.

<figure id="attachment_5829" aria-describedby="caption-attachment-5829" style="width: 422px" class="wp-caption aligncenter">[<img class="wp-image-5829 size-full" src="https://stealthpuppy.com/wp-content/uploads/2017/11/DefaultDenied.png" alt="Ivanti Application Control default access denied dialog box" width="422" height="147" srcset="https://stealthpuppy.com/wp-content/uploads/2017/11/DefaultDenied.png 422w, https://stealthpuppy.com/wp-content/uploads/2017/11/DefaultDenied-150x52.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/11/DefaultDenied-300x105.png 300w" sizes="(max-width: 422px) 100vw, 422px" />](https://stealthpuppy.com/wp-content/uploads/2017/11/DefaultDenied.png)<figcaption id="caption-attachment-5829" class="wp-caption-text">Ivanti Application Control default access denied message box</figcaption>

With [apologies to Guy Leech](https://twitter.com/guyrleech/status/925706951773827072) (the original developer of AppSense Application Manager), this message box doesn't fit with Microsoft's recommended [Windows 7 or Windows 10 desktop UI guidelines](https://msdn.microsoft.com/en-us/library/windows/desktop/dn742446.aspx) nor display anything useful to the end user that is useful or actionable. Side note - on Windows 10, I'd love to see this particular message as a [notification](https://blogs.msdn.microsoft.com/tiles_and_toasts/2015/07/08/toast-notification-and-action-center-overview-for-windows-10/) instead because there's no immediate action the user can take.

Here's another message box - this one is shown for privilege escalation. Similar in a sense to a UAC dialogue box, but this forces the user to complete the action for elevating an application with a reason for taking that action that can be audited.

<figure id="attachment_5830" aria-describedby="caption-attachment-5830" style="width: 335px" class="wp-caption aligncenter">[<img class="size-full wp-image-5830" src="https://stealthpuppy.com/wp-content/uploads/2017/11/DefaultElevate.png" alt="Ivanti Application Control default self-elevation message box" width="335" height="274" srcset="https://stealthpuppy.com/wp-content/uploads/2017/11/DefaultElevate.png 335w, https://stealthpuppy.com/wp-content/uploads/2017/11/DefaultElevate-150x123.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/11/DefaultElevate-300x245.png 300w" sizes="(max-width: 335px) 100vw, 335px" />](https://stealthpuppy.com/wp-content/uploads/2017/11/DefaultElevate.png)<figcaption id="caption-attachment-5830" class="wp-caption-text">Ivanti Application Control default self-elevation message box</figcaption>

There are several scenarios where Application Control may display a message to the end user:

  * Access Denied - execution of an application is denied
  * Application Limits Exceeded - the end-user is prevented from running multiple instances of an application
  * Self-Elevation - an end-user can elevate an application via Application Control instead of being granted administrative rights
  * System Controls - the user can be prevented from uninstalling an application, clearing specific event logs or stopping services
  * Time Limits - time limits can be put on application execution
  * Self-Authorization - end-user can be given the ability to whitelist an application themselves
  * Network Connections - controls can be placed on network destinations, paths or ports

So, potentially a reasonable level of interaction with the end-user and thus Application Control can have some impact on the perception of a user's everyday experience. Fortunately, each of these message boxes is almost fully customisable - Ivanti provides the administrator with the ability to control both the appearance and text in the message to something that may suit a specific requirement or the environment into which it is deployed.

# Creating &#8220;Good&#8221; Message Boxes

Dialog boxes suck (or at least a good chunk of them do). To understand why here's an excellent article I recommend reading - [The Magic of Flow and Why Dialogs Frustrate People](https://uxplanet.org/the-magic-of-flow-and-why-dialogs-frustrate-people-9408e08b7f3d). The dialogs interrupt user workflow and it's safe to assume a user is typically seeing multiple messages in a single session (not just our Application Control messages).

Application Control supports [customising the messages as well as the UI with HTML and CSS](https://help.ivanti.com/ap/help/en_US/am/10.1/Content/Application_Manager/Message_Settings.htm). With customisable notifications, the Application Control administrator effectively becomes a UX designer; therefore to provide users with the best experience possible and balance security needs of the organisation, we should consider carefully that experience both visually and narratively in the text displayed to the user.

When customising these I recommend paying careful attention to the language and tone of the text. Empowering a user to take the right, or no, action without generating unnecessary service desk calls is important. Here are my 3 recommendations for customising these messages boxes for an environment:

  * Ensure the message boxes fit with Microsoft UX guidelines for Windows - apart from not visually assaulting the senses, fitting in with the standard Windows visual style will provide users with a sense that these messages are a part of the normal Windows desktop workflow
  * Don't overwhelm the user with explanatory text that they aren't going to read anyway - avoid [dialogue box fatigue](https://blogs.msdn.microsoft.com/oldnewthing/20060526-03/?p=31063). If you can, provide a link to more information, so that the user can choose to read up on why the system has been implemented
  * Don't assume the user is doing the wrong thing. Taking a default hostile stance via the language or wording used in the messages won't foster a sense of trust. Yes, [insider threats are often the main cause of security breaches](https://www.tripwire.com/state-of-security/security-data-protection/insider-threats-main-security-threat-2017/), but IT can do its part in building team trust

I believe these to be reasonable principles to consider, but of course, some environments may have specific requirements.

Microsoft has published user interface guidelines for Windows for many years, with what I would call &#8220;mixed results&#8221; from the developer community. While good design isn't easy, Microsoft has guidelines on [Fonts](https://msdn.microsoft.com/en-us/library/windows/desktop/dn742483(v=vs.85).aspx), [Style and Tone](https://msdn.microsoft.com/en-us/library/windows/desktop/dn742477(v=vs.85).aspx), and [User Interface Principles](https://msdn.microsoft.com/en-us/library/windows/desktop/ff728831(v=vs.85).aspx) that are applicable to the Application Control administrator.

## Looking for Inspiration

Microsoft has specific message boxes in User Account Control that I've used as the basis for improving the messages boxes from Application Control; both visually and in the language/text. Here's a typical UAC message box on Windows 10 - it provides some immediate visual feedback with colour and simple language for the user to act upon:

<figure id="attachment_5837" aria-describedby="caption-attachment-5837" style="width: 456px" class="wp-caption aligncenter">[<img class="wp-image-5837 size-full" src="https://stealthpuppy.com/wp-content/uploads/2017/11/WindowsUACLight.png" alt="Windows User Account Control message box" width="456" height="481" srcset="https://stealthpuppy.com/wp-content/uploads/2017/11/WindowsUACLight.png 456w, https://stealthpuppy.com/wp-content/uploads/2017/11/WindowsUACLight-142x150.png 142w, https://stealthpuppy.com/wp-content/uploads/2017/11/WindowsUACLight-284x300.png 284w" sizes="(max-width: 456px) 100vw, 456px" />](https://stealthpuppy.com/wp-content/uploads/2017/11/WindowsUACLight.png)<figcaption id="caption-attachment-5837" class="wp-caption-text">Windows User Account Control message box</figcaption>

[UAC (and SmartScreen) displays various message boxes](https://en.wikipedia.org/wiki/User_Account_Control) depending on the action taken that have different colours to better provide the user with an immediate visual feedback. 

<figure id="attachment_5850" aria-describedby="caption-attachment-5850" style="width: 786px" class="wp-caption aligncenter">[<img class="size-full wp-image-5850" src="https://stealthpuppy.com/wp-content/uploads/2017/11/User_Account_Control.png" alt="From top to bottom: blocked app, app with unknown publisher, app with a known/trusted publisher" width="786" height="608" srcset="https://stealthpuppy.com/wp-content/uploads/2017/11/User_Account_Control.png 786w, https://stealthpuppy.com/wp-content/uploads/2017/11/User_Account_Control-150x116.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/11/User_Account_Control-300x232.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/11/User_Account_Control-768x594.png 768w" sizes="(max-width: 786px) 100vw, 786px" />](https://stealthpuppy.com/wp-content/uploads/2017/11/User_Account_Control.png)<figcaption id="caption-attachment-5850" class="wp-caption-text">From top to bottom: blocked app, app with unknown publisher, app with a known/trusted publisher</figcaption>

Sticking with an established visual style, we can use these colours in our Application Control message boxes. I haven't found documentation on the colours from Microsoft, so the hex values below might not be 100% accurate.

<div style="background-color: #85b8e8; padding: 6px; margin-top: 4px; margin-bottom: 4px;">
  Blue (#85b8e8 ) background is from the message box used to identify Windows components or software that is signed and trusted
</div>

<div style="background-color: #f8d470; padding: 6px; margin-top: 4px; margin-bottom: 4px;">
  Yellow (#f8d470) background is from the message box that identifies components or applications that are untrusted or not signed
</div>

<div style="background-color: #8e000b; color: #ffffff; padding: 6px; margin-top: 4px; margin-bottom: 4px;">
  Red (#8e000b) background denotes an application that has been blocked by Windows SmartScreen
</div>

<div style="background-color: #bf3235; color: #ffffff; padding: 6px; margin-top: 4px; margin-bottom: 4px;">
  I've used a softer red (#bf3235) background from the Ivanti Application Control console instead of UAC
</div>

In addition to the visual style, we can use these as examples of the language to use in our customised Application Control message boxes. 

# Updating Ivanti Application Control Message Boxes

These message boxes are customisable via HTML and CSS, so we have the ability to exert a certain level of control on the look and feel. To enable the full level of customisation, you'll need to be running Application Control 10.1 FR3, as the limit on the number of characters in some of the messages has been removed.

Here are the default Message Settings properties:

<figure id="attachment_5853" aria-describedby="caption-attachment-5853" style="width: 757px" class="wp-caption aligncenter">[<img class="wp-image-5853 size-full" src="https://stealthpuppy.com/wp-content/uploads/2017/11/MessageSettings.png" alt="Ivanti Application Control message settings" width="757" height="600" srcset="https://stealthpuppy.com/wp-content/uploads/2017/11/MessageSettings.png 757w, https://stealthpuppy.com/wp-content/uploads/2017/11/MessageSettings-150x119.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/11/MessageSettings-300x238.png 300w" sizes="(max-width: 757px) 100vw, 757px" />](https://stealthpuppy.com/wp-content/uploads/2017/11/MessageSettings.png)<figcaption id="caption-attachment-5853" class="wp-caption-text">Ivanti Application Control message settings</figcaption>

Under that advanced button, is the CSS used to customise the visuals. So the first thing we're going to do is customise that CSS to align the visuals with Windows 10. I am maintaining [an updated CSS file to completely replace the default CSS on GitHub](https://gist.github.com/aaronparker/68e8fd1c066c6ecc8b66bb9067120e2c), which means that anyone can fork the file, improve it and contribute.



There are a few things that the CSS does and provides customisation for:

  1. Changes the default font to Segoe UI, the default Windows font (instead of Microsoft San Serif). The font used in the user input box in self-elevation message boxes is changed to Consolas instead of Courier New
  2. Hides the red and white X graphic. By default, this image is shown on all message boxes and doesn't actually fit in with the intention of all messages boxes
  3. Enables a header in the 3 colours shown above
  4. Gives buttons a Windows 10 look
  5. Prevents scrollbars from showing inside the message boxes - because the messages can only be set to a fixed height and width, some scrolling occurs even in the default messages shown in the images at the beginning of this article

At the moment, this CSS isn't perfect and requires updates to fix the cutting off text on the right-hand side of the dialog box, but I think it's a huge improvement over what's provided by default. 

## Access Denied

Let's look again at the default Access Denied message box. This doesn't fit into the Windows UI, doesn't necessarily tell the user what's occurred or tell them whether any further action is required.

<figure id="attachment_5829" aria-describedby="caption-attachment-5829" style="width: 422px" class="wp-caption aligncenter">[<img class="size-full wp-image-5829" src="https://stealthpuppy.com/wp-content/uploads/2017/11/DefaultDenied.png" alt="Ivanti Application Control default access denied dialog box" width="422" height="147" srcset="https://stealthpuppy.com/wp-content/uploads/2017/11/DefaultDenied.png 422w, https://stealthpuppy.com/wp-content/uploads/2017/11/DefaultDenied-150x52.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/11/DefaultDenied-300x105.png 300w" sizes="(max-width: 422px) 100vw, 422px" />](https://stealthpuppy.com/wp-content/uploads/2017/11/DefaultDenied.png)<figcaption id="caption-attachment-5829" class="wp-caption-text">Ivanti Application Control default access denied dialog box</figcaption>

With our new CSS in place, we can modify the HTML behind this message to reflect what's going on, as well as provide the user with a link to a page with more information. Note that because my CSS isn't currently perfect, I'm cheating a bit by putting a carriage return after &#8220;Running this app might put&#8221; so that the text isn't cut off on the right-hand side of the message box.

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">&lt;div class="header red"&gt;An app has been prevented from running to protect this PC.&lt;/div&gt;
&lt;div class="description"&gt;An unrecognised or unauthorised app was prevented from starting. Running this app might put
your PC at risk.

Blocked app: %ExecutableName%
Location: %DirectoryName%
Description: %AC_FileDescription%
Publisher: %AC_CompanyName%

Please view the &lt;a href="https://servicedesk.stealthpuppy.com"&gt;Information Security Corner&lt;/a&gt; for details on why this app was blocked. To install an
app, you may need to raise a service request.
&lt;/div&gt;</pre>

Because we have a fixed height and width for the box, I've set the height to 690 pixels and the width to 440. Our new Access Denied message box now looks like this:

<figure id="attachment_5831" aria-describedby="caption-attachment-5831" style="width: 676px" class="wp-caption aligncenter">[<img class="wp-image-5831 size-full" src="https://stealthpuppy.com/wp-content/uploads/2017/11/Denied.png" alt="Ivanti Application Control access denied message box with improved styling" width="676" height="393" srcset="https://stealthpuppy.com/wp-content/uploads/2017/11/Denied.png 676w, https://stealthpuppy.com/wp-content/uploads/2017/11/Denied-150x87.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/11/Denied-300x174.png 300w" sizes="(max-width: 676px) 100vw, 676px" />](https://stealthpuppy.com/wp-content/uploads/2017/11/Denied.png)<figcaption id="caption-attachment-5831" class="wp-caption-text">Ivanti Application Control access denied message box with improved styling</figcaption>

In this example, we are now providing the user with some immediate visual feedback, some reason as to why the application was blocked, some details on what was blocked and finally a link to more information (i.e. the action that the user can take). An external page can provide the user with a framework for understanding what's going on and whether they should pick up the phone for the service desk (or not), with better detail and interaction than a message box could provide.

## Self-Elevation

Now let's do the same with the Self-Elevation action. Here's the HTML:

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">&lt;div class="header yellow"&gt;Do you want to allow this app to make changes to your device?&lt;/div&gt;
&lt;div class="description"&gt;App name: %ExecutableName%

&lt;br/&gt;This action will run this app with elevated privileges. Please provide the reason for taking this action. This information will be logged and audited.

Improper use of elevated applications are in violation of the &lt;a href="https://servicedesk.stealthpuppy.com"&gt;Acceptable Use Policy&lt;/a&gt;.&lt;/div&gt;</pre>

I've set the height to 770 pixels and the width to 460. Here's the result:

<figure id="attachment_5832" aria-describedby="caption-attachment-5832" style="width: 756px" class="wp-caption aligncenter">[<img class="wp-image-5832 size-full" src="https://stealthpuppy.com/wp-content/uploads/2017/11/Elevate.png" alt="Ivanti Application Control self-elevation message box with improved styling" width="756" height="453" srcset="https://stealthpuppy.com/wp-content/uploads/2017/11/Elevate.png 756w, https://stealthpuppy.com/wp-content/uploads/2017/11/Elevate-150x90.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/11/Elevate-300x180.png 300w" sizes="(max-width: 756px) 100vw, 756px" />](https://stealthpuppy.com/wp-content/uploads/2017/11/Elevate.png)<figcaption id="caption-attachment-5832" class="wp-caption-text">Ivanti Application Control self-elevation message box with improved styling</figcaption>

In this example, we aren't bombarding the end-user with text nor assuming what they're doing is a hostile action. If you're an IT Pro or a developer, there's a good chance you'll need to elevate an application several times during a single session, so this could be something you see multiple times a day.

## System Controls

For a simple example, let's update the System Controls message.

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">&lt;div class="header blue"&gt;Uninstall of %ApplicationName% is not permitted.&lt;/div&gt;
&lt;div class="description"&gt;Removal of this application has been denied to protect the integrity of this PC.&lt;/div&gt;</pre>

Which then looks like this:

<figure id="attachment_5833" aria-describedby="caption-attachment-5833" style="width: 422px" class="wp-caption aligncenter">[<img class="wp-image-5833 size-full" src="https://stealthpuppy.com/wp-content/uploads/2017/11/Uninstall.png" alt="Ivanti Application Control system controls message box with improved styling" width="422" height="273" srcset="https://stealthpuppy.com/wp-content/uploads/2017/11/Uninstall.png 422w, https://stealthpuppy.com/wp-content/uploads/2017/11/Uninstall-150x97.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/11/Uninstall-300x194.png 300w" sizes="(max-width: 422px) 100vw, 422px" />](https://stealthpuppy.com/wp-content/uploads/2017/11/Uninstall.png)<figcaption id="caption-attachment-5833" class="wp-caption-text">Ivanti Application Control system controls message box with improved styling</figcaption>

Here we've used blue to differentiate this from the previous two messages.

# Be aware of High DPI Displays

Note that today Application Control doesn't support high DPI displays or scaling above 100% very well. Because those dialog boxes are a fixed size and the contents don't scale, you get something like this:

<figure id="attachment_5877" aria-describedby="caption-attachment-5877" style="width: 668px" class="wp-caption aligncenter">[<img class="size-full wp-image-5877" src="https://stealthpuppy.com/wp-content/uploads/2017/12/ivanti-highdpi.png" alt="Ivanti Application Control Access Denied Dialog at 200% scaling" width="668" height="399" srcset="https://stealthpuppy.com/wp-content/uploads/2017/12/ivanti-highdpi.png 668w, https://stealthpuppy.com/wp-content/uploads/2017/12/ivanti-highdpi-150x90.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/12/ivanti-highdpi-300x179.png 300w" sizes="(max-width: 668px) 100vw, 668px" />](https://stealthpuppy.com/wp-content/uploads/2017/12/ivanti-highdpi.png)<figcaption id="caption-attachment-5877" class="wp-caption-text">Ivanti Application Control Access Denied Dialog at 200% scaling</figcaption>

Ivanti is, of course, aware of the issue and I assume there'll be a fix in a future update. Until then, at least on Windows 10, you can override the high DPI scaling behaviour. The Application Control Agent folder has a number of executables that run each of the messages. For example, to fix the scaling on the Access Denied message box set compatibility of AMMessage.exe that the high DPI scaling behaviour is set to System (Enhanced).

<figure id="attachment_5878" aria-describedby="caption-attachment-5878" style="width: 2092px" class="wp-caption aligncenter">[<img class="size-full wp-image-5878" src="https://stealthpuppy.com/wp-content/uploads/2017/12/ivanti-agent-compatibility.png" alt="Setting Application Control High DPI Scaling Compatibility" width="2092" height="1467" srcset="https://stealthpuppy.com/wp-content/uploads/2017/12/ivanti-agent-compatibility.png 2092w, https://stealthpuppy.com/wp-content/uploads/2017/12/ivanti-agent-compatibility-150x105.png 150w, https://stealthpuppy.com/wp-content/uploads/2017/12/ivanti-agent-compatibility-300x210.png 300w, https://stealthpuppy.com/wp-content/uploads/2017/12/ivanti-agent-compatibility-768x539.png 768w, https://stealthpuppy.com/wp-content/uploads/2017/12/ivanti-agent-compatibility-1024x718.png 1024w" sizes="(max-width: 2092px) 100vw, 2092px" />](https://stealthpuppy.com/wp-content/uploads/2017/12/ivanti-agent-compatibility.png)<figcaption id="caption-attachment-5878" class="wp-caption-text">Setting Application Control High DPI Scaling Compatibility</figcaption>

Once set, the message box will be set to its correct size and scaled up on high DPI displays, thus the box may look fuzzy depending on resolution and scaling. To avoid setting this on each executable individually on each end-point, [use Group Policy or the Application Compatibility Toolkit](https://blogs.windows.com/buildingapps/2017/05/19/improving-high-dpi-experience-gdi-based-desktop-apps/) to set these properties.

# Conclusion

In this article, I've discussed how to improve the Ivanti Application Control message boxes for both visuals and text. With some effort, we've updated the style to better fit in with Windows 10, but these look right at home on Windows 7 as well. Additionally, the text has been improved to provide users with (hopefully) just the right amount of explanation, enabling them to take effective action if needed.

The custom CSS streamlines the visuals and better aligns the message boxes with UI guidelines from Microsoft. While I've made [the CSS available on GitHub](https://gist.github.com/aaronparker/68e8fd1c066c6ecc8b66bb9067120e2c), it could do with some improvement. Opening this up to the community will enable feedback and updates.