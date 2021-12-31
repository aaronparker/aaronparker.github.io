---
id: 1826
title: Configuring an Automatic Resolution Policy for Offline Files in Windows 7
date: 2010-08-25T16:00:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=1826
permalink: /configuring-an-automatic-resolution-policy-for-offline-files-in-windows-7/
has_been_twittered:
  - 'yes'
dsq_thread_id:
  - "195383269"
categories:
  - Microsoft
tags:
  - Offline Files
---
If you’ve ever had any experience implementing Offline Files for Windows laptops, you’re no doubt aware that users are required to manually resolve synchronisation conflicts. Well that’s the impression I’ve always been under until recently – there’s no documentation on TechNet on how to automatically resolve conflicts and certainly no Group Policy controls available either.

## Why do we need an Automatic Resolution Policy?

Consider this example – I want to store the User Data Directory for the App-V client on the network (e.g. the users’ home drive) instead of the default location of AppData. This will allow me to deliver application settings between different desktop types (such as a physical desktop and a XenApp server), without having to implement roaming profiles.

Laptops will need to cache the network location so that users can access their applications when disconnected from the network. So I configure Offline Files (via Group Policy) to cache the network folder that hosts the User Data Directory.

The problem with this approach is that when the laptop synchronises the folder, the user may need to resolve file conflicts and is presented with a dialog box that looks something like this:

![Offline Files Resolve Conflict]({{site.baseurl}}/media/2010/08/OfflineFilesResolveConflict.png)

Most users are not going to know which option they should choose (and they certainly aren’t going to [read the help](http://windows.microsoft.com/en-us/windows-vista/Resolving-sync-conflicts-frequently-asked-questions)). How many will know what the _UsrVol\_sftfs\_v.tmp_ file is? I’d like to avoid this scenario as often as I can.

## The feature does exist!

Last week I came across a knowledgebase article that Microsoft recently updated – [Automatic resolution policy for an offline file synchronization conflict does not work if the "keep all changes" setting is enabled in Windows Vista or in Windows Server 2008](http://support.microsoft.com/kb/2189014). It appears that an automatic resolution policy does exist even though there's no documentation on this feature, beyond one page on MSDN on the [OFFLINEFILES\_SYNC\_CONFLICT_RESOLVE](http://msdn.microsoft.com/en-us/library/bb530653(v=VS.85).aspx) enumerator in the Offline Files API.

## Configuring an Automatic Resolution Policy

An automatic resolution policy for Offline Files is implemented by adding a registry value for each network share for which you wish to control synchronisation, then specifying the policy for automatic resolution.

  1. Click **Start**, type **regedit** in the **Start Search** box, and then press ENTER
  2. Locate and then click the following registry subkey: _HKEY\_LOCAL\_MACHINE\Software\Microsoft\Windows\CurrentVersion\NetCache_ 
  3. On the **Edit** menu, point to **New**, and then click **Key**. Type **SyncConflictHandling**, and then press ENTER
  4. Right-click **SyncConflictHandling**, point to **New**, and then click **Expandable String Value**. Type the path of the network share as the value name (for example \\servername\share)
  5. Right-click the value name, and then click **Modify**. In the **Value** data box, enter a value listed in the table below, and then click **OK**

The possible values for SyncConflictHandling and a description of each value is listed is this table:

|Value|Description                               |
|-----|------------------------------------------|
|0    |No resolution. The conflict is unresolved. This allows the conflict to be processed by other handlers in the system.|
|1    |Keep the local state. This overwrites the remote copy with the local copy's contents. If the local copy was deleted, this deletes the remote copy on the server.|
|2    |Keep the remote state. This overwrites the local copy with the remote copy's contents. If the remote copy was deleted, this deletes the local copy in the Offline Files cache.|
|3    |Keeps both copies. Note that this resolution is valid only for sync conflict states where both the server and client copies exist and where at least one of the items is a file. This resolution type is not available when one of the items has been deleted or both items are directories.|
|4    |Retains the state of the latest operation as determined by last-change times of the items in conflict. If the local item was deleted, the time of deletion is used for comparison.|
|5    |Write an entry to the sync conflict log and perform no further attempts at resolving the conflict. The interactive user will resolve the conflict through Sync Center at a later time.|
|6    |Do not resolve the conflict. Do not record an entry in the sync conflict log|
|7    |Cancel the synchronization operation      |

When added to the Registry, it will look something like this:

![SyncConflictHandling]({{site.baseurl}}/media/2010/08/SyncConflictHandling1.png)

To test that the policy is working update a file at multiple locations when the file is offline (for example, delete the file in one location, but make changes to it in the other location). Connect back to the network and initiate a synchronisation operation (via Sync Centre) for the network share. Windows will trigger a conflict in the synchronisation process when it synchronises the file. Your policy should kick in and Sync Centre should automatically handle the conflict.

## Implementing a Policy

So which policy should you implement? This will depend on the share and the type of client machine. Based on the descriptions of the possible values, the default policy is 5, which requires the user to manually resolve conflicts.

In most cases, laptops have a one to one relationship with a user and it will be their primary device. Those machines could then use a policy of 1 (keep the local state) thus preferring changes made on the laptop rather than other computers. Of course, what’s right for me might not be right for you, so I recommend testing and be certain of your choice before implementing.

To deploy the policy you could use a script or a tool such as Group Policy Preferences:

  1. Create a Group Policy Object and apply it to a laptop OU or open an existing GPO that applies to your laptops
  2. Navigate to _Computer Configuration / Preferences / Windows Settings / Registry_
  3. Create a new registry item – HKLM should be the default **Hive**, add _Software\Microsoft\Windows\CurrentVersion\NetCache\SyncConflictHandling_ to the **Key Path**
  4. In **Value Name**, enter the UNC path to the share you want to apply the policy to
  5. Change **Value Type** to REG\_EXPAND\_SZ
  6. Enter a numeric value from 0 to 7 (1 or 2 would be most common)
  7. Repeat for each share you want to manage

![GPPrefReg]({{site.baseurl}}/media/2010/08/GPPrefReg.png)

Continuing the App-V User Data Directory as my example, I've hosted this on a network share and I want to ensure that the laptop copy always wins any conflict resolution. Therefore I'm using a value of 1 to ensure that in the event of changes on both the laptop and another machine, the changes on the laptop will be written back to the network.

## Conclusion

This feature should be extremely useful for scenarios, including the App-V User Data Directory example I’ve used here; however it’s disappointing to find so little documentation given that it’s been available since Windows Vista. It would be great to see this feature expanded upon in later releases including Group Policy support (rather than GP Preferences) as well as the ability to implement rules that can control conflict handling for file types.
