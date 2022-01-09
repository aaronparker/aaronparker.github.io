---

title: Monitoring MDT Task Sequences with PowerShell
date: 2013-06-04T14:30:23+10:00
author: Aaron Parker
layout: post

permalink: /monitoring-mdt-task-sequences-with-powershell/
dsq_thread_id:
  - "1359898902"
categories:
  - Automation
tags:
  - MDT
  - PowerShell
---
The [Microsoft Deployment Toolkit](http://technet.microsoft.com/en-gb/solutionaccelerators/dd407791.aspx) provides a [Lite Touch deployment model](http://technet.microsoft.com/en-us/library/dd919179(v=ws.10).aspx) - typically a device requires an engineer to manually start the deployment task sequence. Using PowerShell to drive MDT offers the chance to provide a little more automation around OS deployments.

Here's a couple of sample videos that demonstrate the use of PowerShell to automate OS deployments using MDT task sequences. Both of these examples are utilising [the monitoring feature in MDT 2012](http://blogs.technet.com/b/mniehaus/archive/2012/03/09/mdt-2012-new-feature-monitoring.aspx) to watch the progress of each task sequence to enable managing the complete deployment, both before and after the task sequence.

* [PowerShell, MDT, Atlantis ILIO and XenDesktop deployment]({{site.baseurl}}/hands-off-my-gold-image-video-powershell-mdt-atlantis-ilio-and-xendesktop-deployment/)
* [Windows 8 zero-touch deployment]({{site.baseurl}}/hands-off-my-gold-image-video-windows-8-zero-touch-deployment/)

## Using PowerShell with MDT

To use PowerShell with MDT requires installing the MDT console which will provide the PowerShell snapin support. For this article, I've used [MDT 2012 Update 1](http://www.microsoft.com/en-us/download/details.aspx?id=25175). Either 32-bit or 64-bit should work.

I'm first going to set a couple of variables. In this instance, I've set the computer name of the target machine that I want to monitor and the path to the MDT deployment share. For this example, I'm using a local path because I'm running the PowerShell script on the server hosting the MDT deployment share. A UNC path will also work.

```powershell
$target = "VM1"
$deploymentShare = "E:\Deployment"
```

To manage MDT we need to load the MDT snapin and create a PowerShell drive that will be used to access the MDT deployment share.

```powershell
Add-PSSnapin "Microsoft.BDD.PSSNAPIN"
If (!(Test-Path MDT:)) { New-PSDrive -Name MDT -Root $deploymentShare -PSProvider MDTPROVIDER }
```

Before starting the task sequence, I want to remove any existing monitoring data that might exist for the target machine. Duplicates are possible, so I want to remove all entries to ensure monitoring will be successful. The following line will remove any existing monitoring data for the machine specified by $target:

```powershell
Get-MDTMonitorData -Path MDT: | Where-Object { $_.Name -eq $target } | Remove-MDTMonitorData -Path MDT:
```

Once the target machine has booted into the Lite Touch WinPE environment, monitoring data should be sent to the MDT server; however we aren't interested in that data yet because it will be pre-task sequence, which isn't much use to us.

The screenshot below shows the monitoring data returned pre-task sequence. Typically, any machine name that starts with MININT will be the WinPE environment:

![Pre-TaskSequence.png]({{site.baseurl}}/media/2013/06/Pre-TaskSequence.png)

So, although we can start gathering data, we really need to wait or loop until the task sequence starts. When the task sequence has started, we can then get monitoring data for the target machine. The example below shows an in-progress task sequence:

![TaskSequence-Progress.png]({{site.baseurl}}/media/2013/06/TaskSequence-Progress.png)

To gather data, use the **Get-MDTMonitorData** cmdlet and save the output to a variable:

```powershell
$InProgress = Get-MDTMonitorData -Path MDT: | Where-Object { $_.Name -eq $target }
```

The information returned proves interesting as it includes the percentage of the task sequence complete, the current step and the step name:

```powershell
PS C:\> $InProgress

Name : VM1  
PercentComplete : 30  
Settings :  
Warnings : 0  
Errors : 0  
DeploymentStatus : 1  
StartTime : 02/06/2013 17:05:23  
EndTime :  
ID : 32  
UniqueID : c7b224e0-a918-4182-a370-96d5c9cb7410  
CurrentStep : 40  
TotalSteps : 131  
StepName : Install Operating System  
LastTime : 02/06/2013 17:05:39  
DartIP :  
DartPort :  
DartTicket :  
VMHost :  
VMName :  
ComputerIdentities : {}
```

Using these properties and the **Write-Progress** cmdlet we can display the progress of the task sequence and some status info during execution of the script:

![TaskSequenceWriteProgress.png]({{site.baseurl}}/media/2013/06/TaskSequenceWriteProgress.png)

Putting this together, we need a script that will perform the following high level tasks:

  1. Connects to the MDT share
  2. Removes any existing monitoring data for the target machine
  3. Waits for the task sequence to begin by interrogating the MDT monitoring data until the right machine data is returned
  4. Monitors and displays the progress of the task sequence so that we can continue processing once the deployment is complete

## The Complete Script

The script listing below put these pieces together and provides two loops - one that waits for the task sequence to begin and once it has, waits for the task sequence to complete.

```powershell
$target = "VM1"
$deploymentShare = "E:\Deployment"

## Connect to the MDT share
Write-Host "Connecting to MDT share." -ForegroundColor Green
Add-PSSnapin "Microsoft.BDD.PSSNAPIN"
If (!(Test-Path MDT:)) { New-PSDrive -Name MDT -Root $deploymentShare -PSProvider MDTPROVIDER }

## Clean up the MDT monitor data for the target VM if it exists
Write-Host "Clearing MDT monitor data." -ForegroundColor Green
Get-MDTMonitorData -Path MDT: | Where-Object { $_.Name -eq $target } | Remove-MDTMonitorData -Path MDT:

## Wait for the OS deployment to start before monitoring
## This may require user intervention to boot the VM from the MDT ISO if an OS exists on the vDisk
If ((Test-Path variable:InProgress) -eq $True) { Remove-Variable -Name InProgress }
Do {
    $InProgress = Get-MDTMonitorData -Path MDT: | Where-Object { $_.Name -eq $target }
    If ($InProgress) {
        If ($InProgress.PercentComplete -eq 100) {
            $Seconds = 30
            $tsStarted = $False
            Write-Host "Waiting for task sequence to begin..." -ForegroundColor Green
        } Else {
            $Seconds = 0
            $tsStarted = $True
            Write-Host "Task sequence has begun. Moving to monitoring phase." -ForegroundColor Green
        }
    } Else {
        $Seconds = 30
        $tsStarted = $False
        Write-Host "Waiting for task sequence to begin..." -ForegroundColor Green
    }
    Start-Sleep -Seconds $Seconds
} Until ($tsStarted -eq $True)

## Monitor the MDT OS deployment once started
Write-Host "Waiting for task sequence to complete." -ForegroundColor Green
If ((Test-Path variable:InProgress) -eq $True) { Remove-Variable -Name InProgress }
Do {
    $InProgress = Get-MDTMonitorData -Path MDT: | Where-Object { $_.Name -eq $target }
    If ( $InProgress.PercentComplete -lt 100 ) {
        If ( $InProgress.StepName.Length -eq 0 ) { $StatusText = "Waiting for update" } Else { $StatusText = $InProgress.StepName }
        Write-Progress -Activity "Task sequence in progress" -Status $StatusText -PercentComplete $InProgress.PercentComplete
        Switch ($InProgress.PercentComplete) {
            {$_ -lt 25}{$Seconds = 35; break}
            {$_ -lt 50}{$Seconds = 30; break}
            {$_ -lt 75}{$Seconds = 10; break}
            {$_ -lt 100}{$Seconds = 5; break}
        }
        Start-Sleep -Seconds $Seconds
    } Else {
        Write-Progress -Activity "Task sequence complete" -Status $StatusText -PercentComplete 100
    }
} Until ($InProgress.CurrentStep -eq $InProgress.TotalSteps)
Write-Host "Task sequence complete." -ForegroundColor Green
```
