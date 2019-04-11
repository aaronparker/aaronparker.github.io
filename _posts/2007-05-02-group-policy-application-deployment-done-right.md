---
id: 52
title: Group Policy Application Deployment Done Right
date: 2007-05-02T00:02:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/group-policy-application-deployment-done-right
permalink: /group-policy-application-deployment-done-right/
categories:
  - Applications
tags:
  - Active-Directory
  - Group Policy
---
In this article I've outlined what I recommend for best utilising Group Policy to deploy applications. Deploying applications via Group Policy is a fairly straight-forward process, if a little limiting, however if you don't do it right you could be setting yourself up for some pain down the track.

Successfully deploying applications with Group Policy requires a solid base in Active Directory. There are a few things you'll need to ensure are in place and working correctly before you start. These include:

  * Active Directory;
  * DNS; and
  * Distributed File System (DFS).

**Active Directory** 

Of course the first thing you are going to need is Active Directory and there are two components of Active Directory that should be configured before you start looking at Group Policy.

**1. Sites and subnets**. If you haven't configured your [sites and subnets](http://www.microsoft.com/technet/prodtechnol/windowsserver2003/technologies/directory/activedirectory/stepbystep/adsrv.mspx) you must look at these. I'll discuss why in more detail when I get to DFS. You should create a site and corresponding subnets for each physical subnet or subnets that are well connected. Well connected can mean different things to different organisations, but a site should define those subnets where you can afford to distribute applications. If you can't handle deploying traffic between specific subnets, divide them into separate sites. Also create sites for subnets even if you don't have domain controllers at those sites.

**2. Organisational Units**. One of the differences between a good Group Policy implementation and a great one is organisational unit structure. Judicious use of organisational units will allow you to reduce the number of Group Policy objects or links you require.

I have three main rules that I apply to OU structure:

  1. Justify the creation of each OU. You should have a good reason for creating organisational units.
  2. Keep organisational units to no more than three levels deep.
  3. Limit the use of block inheritance.

Organisational unit structure will differ for every organisation, however if you apply these guidelines to application deployment, here's all that you need to create:

<img border="0" src="{{site.baseurl}}.com/media/2007/05/1000.14.1368.OrganisationalUnitStructure.png" /> 

**DNS** 

This one is pretty simple €“ without DNS you won't have a functional Active Directory. You must have name resolution in place and working before your workstations can query DNS for the Group Policy objects that will be used to deploy your applications. To get a better understanding of Active Directory and DNS, I recommend you start here: [How DNS Support for Active Directory Works](http://technet2.microsoft.com/windowsserver/en/library/9d62e91d-75c3-4a77-ae93-a8804e9ff2a11033.mspx?mfr=true)

**Distributed File System** 

Once you add an application for deployment to a Group Policy object, you have no way to change the path to that application (other than directly editing the GPO in the SYSVOL share, which I don't recommend). This can be a problem if you want to move your application source files or have an unrecoverable issue with the server on which they are located. If you remove the application and add it again from a new path, the application will be redeployed (and in some cases be removed before redeployment).

How do we get around this? [Distributed File System](http://www.microsoft.com/windowsserver2003/technologies/storage/dfs/default.mspx). DFS provides a path that will always be static while the real path points to an actual share on a server. This allows us to deploy applications from a DFS path and if we need to change real path we can do so without touching Group Policy or affecting the applications at all.

Another great thing about DFS is that you can take advantage of your AD sites - DFS is site aware. If you have a copy of your application share close to your workstations they will pull the installation from a local server rather than across a WAN link. For example, if we have a DFS path **\company.localPublicApplications** that points to **\SERVER1Apps** at site A and **\SERVER2Apps** at site B, workstations at site B will connect to **\SERVER2Apps** when Group Policy is applied to deploy applications.

<img border="0" src="{{site.baseurl}}.com/media/2007/05/1000.14.1360.DFS.png" /> 

A third advantage to using DFS is replication. With Windows 2000 and Windows Server 2003 you can use DFS to replicate your applications from a 'master' copy to your other sites, thus keeping them in sync. DFS Replication released as [a feature of Windows Server 2003 R2](http://technet2.microsoft.com/windowsserver/en/library/d3afe6ee-3083-4950-a093-8ab748651b761033.mspx?mfr=true) is a huge improvement over the older FRS based replication method and provides the ability to replicate only the changes within files, making replication more efficient.

**Summary**

In summary there are three points that you should keep in mind when using Group Policy to deploy applications:

  * Get your Active Directory Sites into order to provide site awareness
  * Make sure your Organisational Units will support your site structure
  * Configure Distributed File System to provide a static path from which to deploy your applications.

Although Group Policy isn't the answer for every organisation as it only provides the basics but if you do use it, you should spend the time planning a successful implementation.