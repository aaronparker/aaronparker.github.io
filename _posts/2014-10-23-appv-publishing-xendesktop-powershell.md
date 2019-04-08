---
id: 3722
title: Adding App-V Publishing Information to a XenDesktop Site with PowerShell
date: 2014-10-23T22:49:04+10:00
author: Aaron Parker
layout: post
guid: http://stealthpuppy.com/?p=3722
permalink: /appv-publishing-xendesktop-powershell/
dsq_thread_id:
  - "3147403871"
pd_rating:
  - 'a:8:{s:4:"type";s:1:"0";s:5:"votes";s:1:"1";s:6:"total1";s:1:"0";s:6:"total2";s:1:"0";s:6:"total3";s:1:"0";s:6:"total4";s:1:"0";s:6:"total5";s:1:"1";s:7:"average";s:6:"5.0000";}'
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
image: /wp-content/uploads/2014/10/AppV-XenDesktop-624x369.png
categories:
  - Automation
tags:
  - App-V
  - XenApp
  - XenDesktop
---
Adding [Microsoft App-V publishing information to a XenDesktop or XenApp 7.x site](http://support.citrix.com/proddocs/topic/xenapp-xendesktop-76/xad-app-v.html) is very easy via the Citrix Studio UI, but what if you want to automate this process? Of course, you'll need to reach for PowerShell.

What may not be widely known is that you can add additional App-V publishing configuration to a XenDesktop site beyond what you see in the UI. This allows you to set publishing information per delivery group. Useful for complex XenDesktop sites such as multi-tenant environments.

Creating the App-V publishing information with PowerShell is a multi step process. You'll need to create the publishing information with [New-CtxAppVServer](http://support.citrix.com/proddocs/topic/citrix-appv-admin-v1-xd75/new-ctxappvserver-xd75.html) and then apply the configuration with [New-BrokerMachineConfiguration](http://support.citrix.com/proddocs/topic/citrix-broker-admin-v2-xd75/new-brokermachineconfiguration-xd75.html).

Applying this in practice however may ultimately require testing the App-V management and publishing servers and ensuring that the configuration does not already exist before adding it.

So to do that, I've written a function that will take the App-V Management and Publishing servers as parameters, ensure that they test OK and check that the configuration does not already exist before importing the configuration into the site.

This function is fairly basic and while it does do some error checking, it could probably go a little further to ensure the configuration is applied successfully.

<pre class="lang:ps decode:true" title="Add App-V Publishing information to a XenDesktop site">Function Set-CtxAppvConfig {
    &lt;#
        .SYNOPSIS
            Sets new App-V publishing information in a XenDesktop site.
 
        .DESCRIPTION
            This function can be used to set or add App-V publishing information in a XenDesktop or XenApp 7.x site.
 
        .PARAMETER AdminAddress
            Specifies a remote XenDesktop controller to apply the configuration against. If omitted, the local host will be used instead.
 
        .PARAMETER AppvMgmtSvr
            Specifies a remote XenDesktop controller to apply the configuration against. If omitted, the local host will be used instead.
 
        .PARAMETER AppvPubSvr
            Specifies a remote XenDesktop controller to apply the configuration against. If omitted, the local host will be used instead.
 
        .PARAMETER Description
            Specifies a remote XenDesktop controller to apply the configuration against. If omitted, the local host will be used instead.
 
        .EXAMPLE
            Set-CtxAppvConfig -AdminAddress 'xd71.home.stealthpuppy.com' -AppvMgmtSvr 'http://appv1:8080' -AppvPubSvr 'http://appv1:80' -Description 'Created by PowerShell'
 
        .NOTES
 
        .LINK
            

<blockquote class="wp-embedded-content" data-secret="G83Mrh3a9x">
  <a href="http://stealthpuppy.com/appv-publishing-xendesktop-powershell/">Adding App-V Publishing Information to a XenDesktop Site with PowerShell</a>
</blockquote>
 
    #&gt;
    param(
        [Parameter(Mandatory=$false, Position=0,HelpMessage="XenDesktop Controller address.")]
        [string]$AdminAddress = 'localhost',

        [Parameter(Mandatory=$true, Position=1,HelpMessage="Microsoft App-V Management Server address.")]
        [string]$AppvMgmtSvr = $(throw = "Please specify an App-V Management Server address."),

        [Parameter(Mandatory=$true, Position=2,HelpMessage="Microsoft App-V Publishing Server address.")]
        [string]$AppvPubSvr = $(throw = "Please specify an App-V Publishing Server address."),

        [Parameter(Mandatory=$true, Position=2,HelpMessage="App-V publishing configuration description.")]
        [string]$Description = $(throw = "Specify a description to apply to the App-V publishing information. Specify 'Created by Studio' to set the App-V publishing inforamtion viewed in Citrix Studio.")
    )

    Function Add-AppvConfig {
        # Add the AppV Server settings to the new specified settings
        Write-Verbose "Setting App-V Management Server to specified URI."
        #http://support.citrix.com/proddocs/topic/citrix-appv-admin-v1-xd71/new-ctxappvserver-xd71.html
        $newAppvConfig = New-CtxAppVServer -ManagementServer $AppvMgmtSvr -PublishingServer $AppvPubSvr

        # Applying configuration to the site
        Write-Verbose "Saving configuration to the site."
        #http://support.citrix.com/proddocs/topic/citrix-broker-admin-v2-xd75/new-brokermachineconfiguration-xd75.html
        $machineConfig = New-BrokerMachineConfiguration -AdminAddress $AdminAddress -ConfigurationSlotUid 3 -LeafName 1 -Description "Created by Studio" -Policy $newAppvConfig -Verbose
    }

    # Obtain FQDN from Management server URL
    $urlGroups = [regex]::Match($AppvMgmtSvr, '^(?&lt;protocol&gt;(http|https))://(?&lt;fqdn&gt;([^:]*))((:(?&lt;port&gt;\d+))?)').Groups

    # Test specified Management Server.
    Write-Verbose "Testing Management Server."
    If (Test-CtxAppVServer -AppVManagementServer $urlGroups["fqdn"].Value -ErrorAction SilentlyContinue -ErrorVariable $manError) {
        Write-Verbose "Management Server tested OK."

        # Test specified Publishing Server
        Write-Verbose "Testing Publishing Server."
        If (Test-CtxAppVServer -AppVPublishingServer $AppvPubSvr -ErrorAction SilentlyContinue -ErrorVariable $pubError) {
            Write-Verbose "Publishing Server tested OK."
        
            # Get any existing AppV configuration from the broker
            #http://support.citrix.com/proddocs/topic/citrix-broker-admin-v2-xd71/get-brokermachineconfiguration-xd71.html
            If ($Config) { Remove-Variable Config }
            $Config = Get-BrokerMachineConfiguration -AdminAddress $AdminAddress -Name AppV* -ErrorAction SilentlyContinue

            $cfgMatch = $False
            If ($Config) {

                ForEach ($cfg in $Config) {

                    # Grab the AppV configuration details
                    #http://support.citrix.com/proddocs/topic/citrix-appv-admin-v1-xd71/get-ctxappvserver-xd71.html
                    $appvConfig = Get-CtxAppVServer -ByteArray $cfg.Policy

                    # If the existing Management Server matches the specified Management Server
                    If (($appvConfig.ManagementServer -eq $AppvMgmtSvr) -and ($appvConfig.PublishingServer -eq $AppvPubSvr)) {
                    
                        Write-Verbose "Specified config matches existing config."
                        $cfgMatch = $True
                    }
                }

                If (!($cfgMatch)) {

                    # Add config
                    Add-AppvConfig
                } Else {

                    Write-Verbose "App-V configuration already exists."
                }
            } Else {

               # Add config
               Add-AppvConfig 
            }
        } Else {

            Write-Error "[Aborting] App-V Publishing Server test failed with: $pubError"
        }
    } Else {

        Write-Error "[Aborting] App-V Management Server test failed with: $manError"
    }

}</pre>

Please ensure that you test thoroughly before using in a production environment. Comments or feedback on bugs, better ways to do things or additional steps is welcome.

Note - a very big thanks to David Wagner at Citrix (and team) for assisting with working out how to write the App-V publishing information that you see in the Studio UI. This is done by applying the description &#8220;Created with Studio&#8221; to the publishing configuration (presumably only the first configuration that you apply with that description).