---
id: 5273
title: Monitoring AV and Windows 10 Updates with Intune MDM
date: 2016-12-02T09:46:06+10:00
author: Aaron Parker
layout: post
guid: http://stealthpuppy.com/?p=5273
permalink: /monitoring-windows-10-intune-mdm/
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
dsq_thread_id:
  - "5347697071"
image: /wp-content/uploads/2016/12/10635423343_2ea0d045dc_h.jpg
categories:
  - Microsoft
tags:
  - Intune
  - MDM
  - OMS
---
In a previous article, I wrote about [the differences between managing Windows 10 PCs with the Intune Client vs. the Windows 10 MDM](http://stealthpuppy.com/windows-10-management-intune/) channel. Two key monitoring pieces that you lose with going to MDM instead of the Intune Client is the ability to report on Windows updates and Endpoint Protection (Windows Defender) status.

The reason for this is that the MDM channel in Windows 10 does not report status for these components, while the Intune Client installs the Microsoft Mangement Agent and reports this status via the Microsoft Operations Management Suite (OMS). We can see the difference in the Intune management console for environments managed with the Intune client vs. MDM.

# Intune Client vs. MDM

If we look at an environment that uses the Intune Client for management, Windows update and Endpoint Protection status are reported. See the _Updates_ and _Endpoint Protection_ tiles in the screenshot below.

<figure id="attachment_5011" aria-describedby="caption-attachment-5011" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5011" src="http://stealthpuppy.com/wp-content/uploads/2016/08/IntuneDashboard-AgentEdited-1024x542.png" alt="Intune with devices management via the client and potentially MDM" width="1024" height="542" srcset="http://192.168.0.89/wp-content/uploads/2016/08/IntuneDashboard-AgentEdited-1024x542.png 1024w, http://192.168.0.89/wp-content/uploads/2016/08/IntuneDashboard-AgentEdited-150x79.png 150w, http://192.168.0.89/wp-content/uploads/2016/08/IntuneDashboard-AgentEdited-300x159.png 300w, http://192.168.0.89/wp-content/uploads/2016/08/IntuneDashboard-AgentEdited-768x406.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/IntuneDashboard-AgentEdited.png)<figcaption id="caption-attachment-5011" class="wp-caption-text">Intune with devices management via the client and potentially MDM</figcaption></figure>

In an environment with machines managed via the MDM channel only, these tiles are missing:

<figure id="attachment_4978" aria-describedby="caption-attachment-4978" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-4978" src="http://stealthpuppy.com/wp-content/uploads/2016/08/IntuneDashboard-MDM-1024x615.png" alt="Intune with devices management via MDM only" width="1024" height="615" srcset="http://192.168.0.89/wp-content/uploads/2016/08/IntuneDashboard-MDM-1024x615.png 1024w, http://192.168.0.89/wp-content/uploads/2016/08/IntuneDashboard-MDM-150x90.png 150w, http://192.168.0.89/wp-content/uploads/2016/08/IntuneDashboard-MDM-300x180.png 300w, http://192.168.0.89/wp-content/uploads/2016/08/IntuneDashboard-MDM-768x461.png 768w, http://192.168.0.89/wp-content/uploads/2016/08/IntuneDashboard-MDM.png 1250w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/08/IntuneDashboard-MDM.png)<figcaption id="caption-attachment-4978" class="wp-caption-text">Intune with devices management via MDM only</figcaption></figure>

This information being reported from clients is really important to&nbsp;have better visibility into the current status of those machines across your estate. With the [current differences in the way that Intune manages Windows 10 PCs](http://stealthpuppy.com/windows-10-management-intune/), you&#8217;re forced to make a choice between manageability and visibility.

# Monitoring for MDM Clients

For PCs managed with the Intune client, Intune leverages the [Microsoft Operations Management Suite](https://www.microsoft.com/en-us/cloud-platform/operations-management-suite) (OMS), or at least Log Analytics, to gather this data and present it from within the Intune console. This is seamless to the administrator which means no additional steps taken other than setting up the Intune subscription.&nbsp;

I had hoped to be able to grab the OMS Workspace ID from a machine managed with the Intune Client and use that to connect the OMS agents installed on an MDM managed machine to see whether I can pass the update and endpoint protection data from those clients. I&#8217;ve been able to identify the Workspace ID, but unfortunately I can&#8217;t find the authentication key to allow the client to connect to OMS.

To enable monitoring with Intune MDM clients, we can set up an OMS subscription separately and deploy the OMS agent to the target PCs. Monitoring those clients requires a separate console, but we do at least get information back from the end points.

Fortunately, this is straightforward and I&#8217;ll walk through the process here.

## Signing Up for OMS

[Signing up for the Microsoft Operations Management Suite](https://docs.microsoft.com/en-au/azure/log-analytics/log-analytics-get-started) requires an Azure subscription and the basic OMS tier is free. If you&#8217;re using Intune you&#8217;ll already be paying for Azure services with your EMS subscription, so add OMS to your existing subscription.

Once you have your Azure subscription (and in this case I presume Intune) setup, navigate to [the OMS portal sign in page](https://login.mms.microsoft.com/signin.aspx) and you&#8217;ll be notified that your account is _not_ associated with an Operations Management Suite workspace. Here you have the opportunity to create one. Create the new workspace and link it to your selected Azure subscription:

<figure id="attachment_5283" aria-describedby="caption-attachment-5283" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5283" src="http://stealthpuppy.com/wp-content/uploads/2016/12/OMS-Azure-Link-subscription-1024x585.png" alt="Linking an Azure subscription to a new OMS workspace" width="1024" height="585" srcset="http://192.168.0.89/wp-content/uploads/2016/12/OMS-Azure-Link-subscription-1024x585.png 1024w, http://192.168.0.89/wp-content/uploads/2016/12/OMS-Azure-Link-subscription-150x86.png 150w, http://192.168.0.89/wp-content/uploads/2016/12/OMS-Azure-Link-subscription-300x171.png 300w, http://192.168.0.89/wp-content/uploads/2016/12/OMS-Azure-Link-subscription-768x438.png 768w, http://192.168.0.89/wp-content/uploads/2016/12/OMS-Azure-Link-subscription.png 1340w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/12/OMS-Azure-Link-subscription.png)<figcaption id="caption-attachment-5283" class="wp-caption-text">Linking an Azure subscription to a new OMS workspace</figcaption></figure>

Give the new OMS workspace a name, select your region for the workspace, enter contact details and create the workspace. Once created, you can view the data plan from the &#8216;Data Plan&#8217; menu at the top of the screen.

<figure id="attachment_5284" aria-describedby="caption-attachment-5284" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5284" src="http://stealthpuppy.com/wp-content/uploads/2016/12/oms-workspace-dataplan-1024x498.png" alt="Selecting a data plan for the OMS workspace" width="1024" height="498" srcset="http://192.168.0.89/wp-content/uploads/2016/12/oms-workspace-dataplan-1024x498.png 1024w, http://192.168.0.89/wp-content/uploads/2016/12/oms-workspace-dataplan-150x73.png 150w, http://192.168.0.89/wp-content/uploads/2016/12/oms-workspace-dataplan-300x146.png 300w, http://192.168.0.89/wp-content/uploads/2016/12/oms-workspace-dataplan-768x373.png 768w, http://192.168.0.89/wp-content/uploads/2016/12/oms-workspace-dataplan.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/12/oms-workspace-dataplan.png)<figcaption id="caption-attachment-5284" class="wp-caption-text">Selecting a data plan for the OMS workspace</figcaption></figure>

The free data plan tier provides 500MB of daily data uploads and 7 days data retention. I&#8217;m yet to see exactly how many workstations I can manage with 500MB of data and with only 7 days of data retention, you&#8217;ll want to keep an eye on the reporting weekly.

## Customising OMS

OMS provides solutions (or plug-ins) to enable reporting, recommendations and actions on data collected from agents. These need to be added to your OMS workspace to make it useful and there are some very interesting solutions that can be installed.

You&#8217;ll need to add the Update Management and Antimalware Assessment solutions.&nbsp;

<figure id="attachment_5278" aria-describedby="caption-attachment-5278" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5278" src="http://stealthpuppy.com/wp-content/uploads/2016/12/oms-marketplace-1024x587.png" alt="OMS Solutions Gallery" width="1024" height="587" srcset="http://192.168.0.89/wp-content/uploads/2016/12/oms-marketplace-1024x587.png 1024w, http://192.168.0.89/wp-content/uploads/2016/12/oms-marketplace-150x86.png 150w, http://192.168.0.89/wp-content/uploads/2016/12/oms-marketplace-300x172.png 300w, http://192.168.0.89/wp-content/uploads/2016/12/oms-marketplace-768x441.png 768w, http://192.168.0.89/wp-content/uploads/2016/12/oms-marketplace.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/12/oms-marketplace.png)<figcaption id="caption-attachment-5278" class="wp-caption-text">OMS Solutions Gallery</figcaption></figure>

Update Management requires additional configuration during the add process by asking you to create an Azure Automation account. In one instance I was unable to create the automation account, so went back to the Azure portal and created one from there in the same Resource Group used by the OMS Workspace.

Once the solutions are added, you are able to view installed solutions and remove solutions as required.

<figure id="attachment_5277" aria-describedby="caption-attachment-5277" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5277" src="http://stealthpuppy.com/wp-content/uploads/2016/12/oms-solutions-1024x587.png" alt="OMS Installed Solutions" width="1024" height="587" srcset="http://192.168.0.89/wp-content/uploads/2016/12/oms-solutions-1024x587.png 1024w, http://192.168.0.89/wp-content/uploads/2016/12/oms-solutions-150x86.png 150w, http://192.168.0.89/wp-content/uploads/2016/12/oms-solutions-300x172.png 300w, http://192.168.0.89/wp-content/uploads/2016/12/oms-solutions-768x441.png 768w, http://192.168.0.89/wp-content/uploads/2016/12/oms-solutions.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/12/oms-solutions.png)<figcaption id="caption-attachment-5277" class="wp-caption-text">OMS Installed Solutions</figcaption></figure>

Once agents start reporting data, these solutions will provide an assessment of your Windows PCs enrolled in Intune via MDM. Here I can see the status of missing updates across Windows agents and even Linux PCs.

<figure id="attachment_5287" aria-describedby="caption-attachment-5287" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5287" src="http://stealthpuppy.com/wp-content/uploads/2016/12/oms-update-management-1024x587.png" alt="Update Management overview in OMS" width="1024" height="587" srcset="http://192.168.0.89/wp-content/uploads/2016/12/oms-update-management-1024x587.png 1024w, http://192.168.0.89/wp-content/uploads/2016/12/oms-update-management-150x86.png 150w, http://192.168.0.89/wp-content/uploads/2016/12/oms-update-management-300x172.png 300w, http://192.168.0.89/wp-content/uploads/2016/12/oms-update-management-768x441.png 768w, http://192.168.0.89/wp-content/uploads/2016/12/oms-update-management.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/12/oms-update-management.png)<figcaption id="caption-attachment-5287" class="wp-caption-text">Update Management overview in OMS</figcaption></figure>

So too can I see the antimalware assessment across managed PCs.

<figure id="attachment_5288" aria-describedby="caption-attachment-5288" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5288" src="http://stealthpuppy.com/wp-content/uploads/2016/12/oms-antimalware-assessment-1024x587.png" alt="Antimalware Assessment in OMS" width="1024" height="587" srcset="http://192.168.0.89/wp-content/uploads/2016/12/oms-antimalware-assessment-1024x587.png 1024w, http://192.168.0.89/wp-content/uploads/2016/12/oms-antimalware-assessment-150x86.png 150w, http://192.168.0.89/wp-content/uploads/2016/12/oms-antimalware-assessment-300x172.png 300w, http://192.168.0.89/wp-content/uploads/2016/12/oms-antimalware-assessment-768x441.png 768w, http://192.168.0.89/wp-content/uploads/2016/12/oms-antimalware-assessment.png 1440w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/12/oms-antimalware-assessment.png)<figcaption id="caption-attachment-5288" class="wp-caption-text">Antimalware Assessment in OMS</figcaption></figure>

Because there is no direct integration with Intune, I have no remediation actions to take from within the OMS console; however, at least having visibility where I previously had none, allows me to understand the security posture of the managed PCs.&nbsp;

For Windows 10 PCs managed with MDM, we have a reasonable amount of control of the Windows Defender configuration, but for Windows Update, basic settings such as deferred updates and upgrades and reboot windows can be controlled, but individual updates cannot be managed as is the case for PCs managed with the Intune client.

# Deploying the OMS Agent via MDM

To enable PCs to report data to the OMS workspace, we need to deploy the Microsoft Monitoring Agent to managed devices. To do that we need the OMS agent (used to send data to OMS), the OMS Workspace ID (used to uniquely identify the OMS Workspace) and the Workspace Key (used to authenticate to the Workspace).

From the OMS console download the agent &#8211; **Settings** / **Connected Sources** / **Windows Servers** / **Download Windows Agent**. This is&nbsp;an executable, so we need to extract the agent to obtain the embedded MSI to deploy to Windows 10 via MDM. Use /? on the executable to view the command line options. To extract it, use the /T option to extract to a specified folder and /C to extract files from the executable.

<pre class="lang:batch decode:true">MMASetup-AMD64.exe /T:C:\OMS /C</pre>

Once extracted you&#8217;ll see the files as below. We need MOMAgent.msi to deploy the agent. If you have specific language requirements, you must edit the MSI, apply your language MST and save the MSI as [we cannot apply MST files at deployment time via MDM](https://channel9.msdn.com/Series/How-to-Control-the-Uncontrolled/6--How-to-Deploy-MSI-Applications-to-Windows-10-Using-Intune-and-Mobile-Device-Management-MDM). User&#8217;s don&#8217;t necessarily need to interact with the agent (via the Control Panel), so if you&#8217;re admins are comfortable with English you may not need to apply a language transform.

<figure id="attachment_5291" aria-describedby="caption-attachment-5291" style="width: 1024px" class="wp-caption alignnone">[<img class="size-large wp-image-5291" src="http://stealthpuppy.com/wp-content/uploads/2016/12/oms-extract-agent-1024x518.png" alt="Extracting the OMS agent to access the MSI" width="1024" height="518" srcset="http://192.168.0.89/wp-content/uploads/2016/12/oms-extract-agent-1024x518.png 1024w, http://192.168.0.89/wp-content/uploads/2016/12/oms-extract-agent-150x76.png 150w, http://192.168.0.89/wp-content/uploads/2016/12/oms-extract-agent-300x152.png 300w, http://192.168.0.89/wp-content/uploads/2016/12/oms-extract-agent-768x388.png 768w, http://192.168.0.89/wp-content/uploads/2016/12/oms-extract-agent.png 1232w" sizes="(max-width: 1024px) 100vw, 1024px" />](http://stealthpuppy.com/wp-content/uploads/2016/12/oms-extract-agent.png)<figcaption id="caption-attachment-5291" class="wp-caption-text">Extracting the OMS agent to access the MSI</figcaption></figure>

Now that we have the MSI and have optionally modified it for specific language support, we can add it as an application to Intune for deployment.

In the Intune console:

  1. Navigate to **Apps**, click **Add Apps** to start the Intune Software Publisher
  2. Choose **Software installer** and&nbsp;**Windows Installer through MDM (*.msi)**
  3. Select the **MOMAgent.msi** file

<figure id="attachment_5292" aria-describedby="caption-attachment-5292" style="width: 755px" class="wp-caption alignnone">[<img class="size-full wp-image-5292" src="http://stealthpuppy.com/wp-content/uploads/2016/12/OMS-AddApp01.png" alt="Adding MOMAgent.MSI via the Intune Software Publisher" width="755" height="527" srcset="http://192.168.0.89/wp-content/uploads/2016/12/OMS-AddApp01.png 755w, http://192.168.0.89/wp-content/uploads/2016/12/OMS-AddApp01-150x105.png 150w, http://192.168.0.89/wp-content/uploads/2016/12/OMS-AddApp01-300x209.png 300w" sizes="(max-width: 755px) 100vw, 755px" />](http://stealthpuppy.com/wp-content/uploads/2016/12/OMS-AddApp01.png)<figcaption id="caption-attachment-5292" class="wp-caption-text">Adding MOMAgent.MSI via the Intune Software Publisher</figcaption></figure>

<ol start="4">
  <li>
    Click Next and add the Software description. While users won&#8217;t see this application in a portal, still add the right software Publisher, Name, Description, icon etc.
  </li>
  <li>
    Click Next to view the Summary page and then Upload the application.
  </li>
</ol>

The current release of Intune now requires you to go back into the Intune Software Publisher to make some additional changes.

<ol start="6">
  <li>
    Edit the newly created application to apply the required command line arguments
  </li>
  <li>
    Navigate to the <strong>Command line arguments</strong> page
  </li>
  <li>
    Add the details below so that the agent will have the Workspace ID and Key applied at install time
  </li>
</ol>

Microsoft has an article on&nbsp;[Connecting Windows computers to Log Analytics](https://docs.microsoft.com/en-us/azure/log-analytics/log-analytics-windows-agents) that covers a number of ways that you can install and configure the OMS agent.

<pre class="lang:ps decode:true " title="Command line arguments to set agent properties">ADD_OPINSIGHTS_WORKSPACE=1 OPINSIGHTS_WORKSPACE_ID=&lt;your workspace id&gt; OPINSIGHTS_WORKSPACE_KEY=&lt;your workspace key&gt; AcceptEndUserLicenseAgreement=1
</pre>

In my example, I have added these arguments with my specific Workspace ID and Key. Notice in the screenshot that my Workspace Key has a couple of equal signs at the end of the key, so I&#8217;ve enclosed the key in quotes.

<figure id="attachment_5294" aria-describedby="caption-attachment-5294" style="width: 755px" class="wp-caption alignnone">[<img class="size-full wp-image-5294" src="http://stealthpuppy.com/wp-content/uploads/2016/12/OMS-AddApp06.png" alt="Setting command line arguments on the application properties" width="755" height="527" srcset="http://192.168.0.89/wp-content/uploads/2016/12/OMS-AddApp06.png 755w, http://192.168.0.89/wp-content/uploads/2016/12/OMS-AddApp06-150x105.png 150w, http://192.168.0.89/wp-content/uploads/2016/12/OMS-AddApp06-300x209.png 300w" sizes="(max-width: 755px) 100vw, 755px" />](http://stealthpuppy.com/wp-content/uploads/2016/12/OMS-AddApp06.png)<figcaption id="caption-attachment-5294" class="wp-caption-text">Setting command line arguments on the application properties</figcaption></figure>

<ol start="9">
  <li>
    Click Next to view the Summary page and then Update the application.
  </li>
  <li>
    Manage the deployment of the application in the Intune console again and apply the agent against the <strong>All Devices</strong>&nbsp;group (unless you have a specific group of machines to target). This will ensure that any Windows 10 machine enrolled via MDM will receive the agent.
  </li>
</ol>

Once the agent is deployed out to managed machines, the Operations Management Suite console will display data related to the components that you&#8217;re monitoring. For Update Management and Antimalware Assessment, this will provide details that you didn&#8217;t have previously.

# Conclusion

Windows 10 releases are moving pretty fast with about 2 major release every 12-months so far. MDM management will continue to mature and improve so we may eventually have this reporting available without requiring this additional agent or approach.

Most Windows 10 PCs managed with MDM are going to be running Current Branch or Current Branch for Business and the need to approve specific updates is either reducing or being removed completely as Microsoft changes their approach to Windows updates. For antimalware, Microsoft&#8217;s preferred approach is to move customers to [Windows Defender Advanced Threat Protection](https://www.microsoft.com/en-us/WindowsForBusiness/Windows-ATP) which provides far more insight and control.