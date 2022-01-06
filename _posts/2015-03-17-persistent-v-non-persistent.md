---

title: "VDI 101: Persistent vs. Non-persistent"
date: 2015-03-17T18:12:39+10:00
author: Aaron Parker
layout: post

permalink: /persistent-v-non-persistent/
dsq_thread_id:
  - "3602034218"
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
image: /media/2015/03/5905589199_bdf215ec44_b-624x416.jpg
categories:
  - Microsoft
tags:
  - Non-Persistent
  - Persistent
  - SBC
  - VDI
---
A conversation about desktop virtualisation will invariably turn to the topic of persistent vs. non-persistent. Anyone new to VDI or Server Based Computing (SBC), may need persistent and non-persistent defined in context. This is a discussion that I have on a semi-regular basis, so for easy reference, I’d thought I would put down a discussion on this topic into an article.

I’ll avoid talking about any one particular desktop virtualization solution and instead discuss this topic as it applies to all environments.

## Persistency

I think it was [Harry Labana](https://twitter.com/harrylabana) that I originally heard this statement from - “Persistency is a measure of time”. This is absolutely true - what is the time between deploying and re-deploying that desktop? How long before that PC is rebuilt because of an unrecoverable error?

If Windows is re-installed or the PC retired, the user must migrate to a new instance of Windows. If Windows is running on a persistent virtual machine, how long do you let that instance of Windows run before the size of the virtual hard disk becomes unmanageable? ([Perhaps you need dedupe?](http://www.atlantiscomputing.com/))

If we take persistency to mean a Windows install is immutable we live with a false sense of security. The same would apply to any general purpose OS - manage the data and configuration as though that install will fail tomorrow. If you can run all non-persistent desktops, you’re way ahead.

## Defining Terms

Let me first list the various terms that you might hear when discussing this topic:

* Persistent, stateful, full clone - a Windows instance is persistent because we want to protect that Windows install. Rebuilding it from scratch can take time and effort. A physical PC or server is persistent because there’s no abstraction of the OS from the hardware.
* Non-persistent, stateless, pooled, shared, linked-clone - a non-persistent virtual desktop is often destroyed at user logoff, reboot or shutdown. A Remote Desktop Services (RDS) environment can also be considered non-persistent, even though the underlying Windows instance may be persistent.

So many words to describe essentially the same thing. For clarity’s sake, let’s stick with persistent and non-persistent for the rest of this article.

## Who Are We Talking To?

When discussing persistent and non-persistent, context is key - who’s perspective are we using - the administrator (admin, engineer, architecture etc.) or the user (end-user, IT Manager, CIO etc.)? These terms may have different meaning depending on the audience - non-persistent may sound scary to the uninitiated. Tell a user that their desktop is non-persistent and see what reaction you get.

An administrator on the other hand, can choose either for his (or her) toolbox when delivering virtual desktops; however non-persistent may take a rethink when compared to traditional desktop management.

Regardless of what type of desktop a user receives, the user requires persistency of their data - some things are non-negotiable.

Ultimately we need to tailor the conversation to the audience and ensure we explain these concepts succinctly.

## What's Makes the Modern Desktop?

Data aside, we first need to establish whether a user requires a persistent state across sessions, before deciding on a way to manage the desktops. To do that, we should consider each of the major components of the modern Windows desktop:

* Application data - where does the application store data? If it’s a web-based application or stores data in a database, then it’s unlikely data also ends up on the user’s desktop
* User data - ideally user data (e.g. documents) is not stored on the desktop or is at least synchronised to a remote location.
* User preferences - do user preferences or their profiles need to persist across sessions? If you’re delivering just applications (and not desktops), do those applications have preferences that need to be saved? Could application settings be delivered as policies instead?
* Applications - what is your application delivery strategy. VDI/RDS has been historically been hard to manage as a result of application requirements, making persistent desktops the easy route
* User applications - do you need to provide an environment that users can install applications? Do you have developers or IT Pros in-house who often need administrative rights to get their jobs done

## Virtual Desktops

A user connects to an individual virtual machine running Windows (or perhaps soon this could be Linux). Virtual desktops usually run a desktop version of Windows, but this can also be Windows Server (Server VDI).

A virtual desktop can be delivered from a persistent virtual machine and they will typically connect to that same virtual machine each session.

Virtual desktops can also be provided from a pool of virtual machines that are might be deleted or refreshed within a short amount of time. If the user connects to a pool of desktops, they could connect to any desktop in that pool (i.e. random).

## Remote Desktop Services

Users connect to a shared Windows instance running Windows Server (individually known as a Remote Desktop Session Host).

From the administrators point of view, Remote Desktop Session Hosts (RDSH) are managed as a persistent virtual machines (or as Windows directly on a physical host) but they could also be managed as non-persistent VMs.

RDSH servers provide a pool (or farm) of Windows instances that users can receive their desktops or applications from - a user could connect to any server in the pool. As such, they represent a non-persistent desktop, regardless of whether the underlying RDSH server is persistent or non-persistent.

## Considerations

With a persistent desktop, each time the user connects to that desktop, their applications, data and user profile / preferences will be intact. No other management is required (that doesn't mean that management should be ignored though) and no change to process from physical desktop management is needed (other than the introduction of a hypervisor).

On the other hand though, if you can ensure that even with non-persistent desktops, each time the user connects, their applications are installed, their data is abstracted from the desktop (using folder redirection or file sync solutions) and their profile (and application preferences) is available at logon, the illusion of a persistent environment will be presented.

Delivering a persistent user environment on top of non-persistent desktops will take some effort can may require 3rd party tools to achieve the goal of running 100% non-persistent desktops.

Here's a short breakdown of the various differences between and considerations of persistent and non-persistent desktops:

|Persistent|Non-Persistent                                                                                      |
|----------|----------------------------------------------------------------------------------------------------|
|Persistent from the user perspective may be different from the administrator perspective. IT staff may require a persistent desktop|A users can still receive a persistent environment from a non-persistent desktop                    |
|May be easier to manage because a persistent desktop is no different to a physical desktop|A change of management process which may primarily be managed by the VDI broker, but should enable faster updates of the gold image and ultimately a lower management cost|
|Desktop management solutions such as System Center Configuration Manager would be required for most persistent desktops|System Center Configuration Manager can work with non-persistent desktops, but may not be required depending on how applications are delivered|
|Backup may be required if users store data locally|All user must be redirected to a central file server, so backup is not required                     |
|If the user's primary persistent desktop is unavailable, host and storage HA is required, otherwise the user could connect to a temporary non-persistent desktop|HA is provided with an N+1 architecture. If a desktop or host is unavailable, the user will reconnect and receive a new desktop|
|Some form of shared storage is required to ensure the desktop is highly available|Local (physical or software defined) or shared storage can be used                                  |
|Folder redirection and user environment management may not be required but it is recommended to reduce the reliance on a specific virtual desktop|Folder redirection and user environment management is required. This will ensure user data (Documents, Desktop etc.) is accessible from different desktops and will provide the user with the look and feel of persistence|
|More storage is required for persistent desktops as the desktop can grow to consume the size of the vDisk|Non-persistent desktops can be destroyed and recreated as required, thus reducing the amount of capacity required|
{:.smaller}

Understanding the types of desktops available to you is only the first step in determining how your VDI environment will be delivered.
