---
id: 85
title: Customising the Presentation Server Client Installation Part 1
date: 2007-03-11T01:08:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/customising-the-presentation-server-client-installation-part-1
permalink: /customising-the-presentation-server-client-installation-part-1/
categories:
  - Automation
tags:
  - Presentation-Server
  - Unattended
---
The Citrix Presentation Server Client provides the ability to customise the client before you deploy it to your workstations. Customisation of the client is an important step to ensure the best possible experience for your users and it is yet very simple to achieve:

To start the customisation, download the standard [Citrix Presentation Server Client Packager](http://www.citrix.com/English/SS/downloads/details.asp?dID=2755&downloadID=683986&pID=186) from the Citrix web site. This process will work for both version 10.0 and version 9.x of the client.

Start the packager customisation wizard with the Windows Installer command line. This will start an administrative installation of the packager (For a full list of MSIEXEC command line switches you can run <font face="courier new,courier">MSIEXEC /?</font>).

<p class="console">
  [quickcode:noclick]MSIEXEC /A ICA32PKG.MSI[/quickcode]
</p>

If you are doing this on Windows Vista you will need to run this command line from an elevated command prompt, otherwise you will be prompted for elevation during the packager wizard.

Here's a walkthrough of the customisation process, screen by screen:

  1. **Welcome screen.** Nothing to see here, move along.
  2. **License Agreement**. If you don't agree to this you won't get far.
  3. **Create Client Package**. Choose an empty folder to store the package; don't choose the same folder containing the original client package. Of the three package types - _Uncompressed_, _Compressed_ and _Single Windows Installer file_, the single Windows Installer file will create a package this is the easiest to manage and distribute. However an Uncompressed client will allow you to prepopulate PN.INI and APPSRV.INI before installation.
  4. **Select Client**. Select the clients to install as a part of this package. You could create multiple custom packages to target specific users. For example you could package just the Web Client for user's home computers.
  5. **Server Address**. If you choose to install the Program Neighbourhood Agent you will need to add a location for the Program Neighbourhood Agent Service URL. If you don't enter this users will be prompted for the location when they run the Program Neighbourhood Agent.
  6. **Select Programs Folder**. This is the location shortcuts will be added into the Start Menu Programs folder.
  7. **Client Name**. You get two options for the client name: _Use machine name as client name_ and _Let user specify a client name_. Let the user specify the client name? Are you crazy?
  8. **Use Local Name and Password**. This option is important for domain computers; if you do not enable this option users must specify a username and password when they connect. If you don't enable pass-through authentication users could be saving their usernames and passwords on their computers, which could pose a security risk. Pass-through authentication also improves the user's experience when using remote applications.
  9. **Program Neighbourhood Options**. These options, _Enable Quick Launch Bar_ and _Enable custom ICA connections_ can be disabled so that users will only have Application Sets available to them in Program Neighbourhood.
 10. **Upgrade Settings**. These two options, _Allow upgrade if package is newer than existing client version_ and _Allow downgrade if package is older than existing client version_ are fairly self explanatory, but we all want to upgrade to the latest client don't we?
 11. **Select User Dialog Boxes**. You can customise what dialogs boxes are seen as the client is installing. Leaving any of these screens on will allow the user to customise the client during installation. I generally only enable _Splash_ _Screen_, _Progress_ and _Finish_.
 12. **Client Package Installation Summary**. A summary of the options you chose before the package is created.
 13. **Client Install Progress**. You will see a progress bar as the custom package is created.
 14. **Finish**. You should be left with your custom client package. I have seen on various machines where I've chosen Single Windows Installer file and been left with the uncompressed package. I haven't found a cause, but if you see this, create the custom package on another machine.

Now that you have the custom package you will need to distribute it to your client computers. As Citrix is phasing out their client deployment tool, you will need to use Web Interface or a deployment tool such as Group Policy, SMS, Tivoli or Altiris Deployment Solution.

**UPDATE**: Jason Conger has a pretty in depth article at DABCC.com, [How to Customize and Install the Citrix Client using Active Directory](http://www.jasonconger.com/ShowPost.aspx?strID=87a0885c-a0f1-4b85-b28f-a25813ed8119), which has some excellent tips including disabling the Auto Client Update feature and what you'll need to add when deploying the client via AD.