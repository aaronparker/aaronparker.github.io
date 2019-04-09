---
id: 2623
title: 'Reducing Profile Size with a Profile Clean Up Script - PowerShell Edition'
date: 2012-01-05T16:09:55+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/?p=2623
permalink: /reducing-profile-size-with-a-profile-clean-up-script-powershell-edition/
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
dsq_thread_id:
  - "527821956"
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
categories:
  - Automation
tags:
  - PowerShell
  - Profiles
---
[<img class="size-full wp-image-2624 alignnone" title="Delete by Cari McGee" src="https://stealthpuppy.com/media/2012/01/AppleKeyboardDeletePowerShell.png" alt="Delete by Cari McGee" width="640" height="317" srcset="https://stealthpuppy.com/media/2012/01/AppleKeyboardDeletePowerShell.png 640w, https://stealthpuppy.com/media/2012/01/AppleKeyboardDeletePowerShell-150x74.png 150w, https://stealthpuppy.com/media/2012/01/AppleKeyboardDeletePowerShell-300x148.png 300w" sizes="(max-width: 640px) 100vw, 640px" />](http://www.flickr.com/photos/pleeker/5379549514/)

I recently posted a script for removing unnecessary files and pruning files based on their age, which can be used at logoff to keep profile sizes manageable - [Reducing Profile Size with a Profile Clean Up Script](https://stealthpuppy.com/user-virtualization/profile-clean-up-script/).

[Andrew Morgan](http://andrewmorgan.ie/about-2/) ([@andyjmorgan](http://twitter.com/andyjmorgan)) has kindly translated my very basic VBscript to PowerShell. This can be used as a standalone script or the function (_remove-itembyage_) could be integrated into your own scripts and has the added benefit of in-built help and the ability to run silently.

Just like the original script, this could be executed at logoff, before the profile is saved back to the network, to perform two actions:

  1. Delete all files of a specific file type in a specified folder, including sub-folders
  2. Delete all files older than X days in a specified folder, including sub-folders

For example, you could use the script to delete all .log or temporary files below %APPDATA% that aren't required to be roamed, or delete all Cookies older than 90 days to keep the Cookies folder to a manageable size.

**Note**: the script listing below has the -whatif parameter applied when calling the function, so no deletes will occur unless the parameter is removed.

<pre class="prettyprint lang-powershell" data-start-line="1" data-visibility="visible" data-highlight="" data-caption="">function remove-itembyage {
    &lt;#
        .SYNOPSIS
        remove items from folders recursively.

        .DESCRIPTION
        this function removes items older than a specified age from the target folder

        .PARAMETER Days
        Specifies the ammount of days since the file was last written to you wish to filter on.

        .PARAMETER Path
        Specifies the path to the folder you wish to search recursively.

        .PARAMETER Silent
        Instructs the function not to return any output.

        .EXAMPLE
        PS C:\&gt; remove-itembyage -days 0 -path $recent

        This command searches the $recent directory, for any files, then deletes them.

        .EXAMPLE
        PS C:\&gt; remove-itembyage -days 5 -path $recent

        This command searches the $recent directory, for files older than 5 days, then deletes them.

        .EXAMPLE
        PS C:\&gt; remove-itembyage -days 10 -path $appdata -typefilter "txt,log"

        This command searches the $cookies directory, for files older than 10 days and end with txt or log extensions, then deletes them.

        .EXAMPLE
        PS C:\&gt; remove-itembyage -days 10 -path $cookies -typefilter "txt,log" -silent

        This command searches the $cookies directory, for files older than 10 days and end with txt or log extensions, then deletes them without a report.

        .NOTES
        https://stealthpuppy.com/user-virtualization/profile-clean-up-script-powershell-edition/ for support information.

        .LINK
        https://stealthpuppy.com/user-virtualization/profile-clean-up-script-powershell-edition/
    #&gt;

    [cmdletbinding(SupportsShouldProcess = $True)]
    param(
        [Parameter(Mandatory = $true, Position = 0, HelpMessage = "Number of days to filter by, E.G. ""14""")]
        [int]$days,
        [Parameter(Mandatory = $true, Position = 1, HelpMessage = "Path to files you wish to delete")]
        [string]$path,
        [string]$typefilter,
        [switch]$silent)

    #check for silent switch
    if ($silent) {$ea = "Silentlycontinue"}
    Else {$ea = "Continue"}

    #check for typefilter, creates an array if specified.
    if (!($typefilter)) {$filter = "*"}
    Else {$filter = foreach ($item in $typefilter.split(",")) {$item.insert(0, "*.")}}

    if (test-path $path) {
        $now = get-date
        $datefilter = $now.adddays( - $days)
        foreach ($file in get-childitem "$path\*" -recurse -force -include $filter | where {$_.PSIsContainer -eq $false -and $_.lastwritetime -le $datefilter -and $_.name -ne "desktop.ini"}) {
            if (!($silent)) {write-host "Deleting: $($file.fullname)"}
            remove-item -literalPath $file.fullname -force -ea $ea
        }#end for
    }#end if

    Else {
        if (!($silent)) {write-warning "the path specified does not exist! ($path)"}
    }#end else
}#end function

#Get KnownFolder Paths
$appdata = $env:appdata
$Cookies = (new-object -com shell.application).namespace(289).Self.Path
$History = (new-object -com shell.application).namespace(34).Self.Path
$recent = (new-object -com shell.application).namespace(8).Self.Path
$profile = $env:userprofile

#commands
remove-itembyage -days 0 -path $appdata -typefilter "txt,log" -silent -whatif
remove-itembyage -days 90 -path $cookies -silent -whatif
remove-itembyage -days 14 -path $recent -silent -whatif
remove-itembyage -days 21 -path $history -silent -whatif
remove-itembyage -days 14 -path "$appdata\Microsoft\office\Recent" -silent -whatif</pre>

 