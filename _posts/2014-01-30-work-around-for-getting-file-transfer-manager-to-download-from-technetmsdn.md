---
id: 3545
title: Work around for getting File Transfer Manager to download from TechNet/MSDN
date: 2014-01-30T09:49:44+10:00
author: Aaron Parker
layout: post
guid: http://stealthpuppy.com/?p=3545
permalink: /work-around-for-getting-file-transfer-manager-to-download-from-technetmsdn/
dsq_thread_id:
  - "2194419731"
layers:
  - 'a:1:{s:9:"video-url";s:0:"";}'
categories:
  - Microsoft
tags:
  - MSDN
  - TechNet
---
<span style="color: #993300;">[<strong>Update</strong>] August 8, 2015 &#8211; Microsoft have discontinued the Microsoft Download Manager as of March 2015, so the below workload will no longer work. If fact there are no workaround now, you&#8217;ll need to rely on your browser&#8217;s download manager. See this article for more info: <a style="color: #993300;" href="https://msdn.microsoft.com/en-us/subscriptions/aa948864.aspx">Using Subscriber Downloads</a></span>

> <span style="color: #993300;">Downloading from MSDN</span>
> 
> <span style="color: #993300;">MSDN Subscriber Downloads uses your browser’s built-in download functionality, including pause and resume.</span>
> 
>   * <span style="color: #993300;">As of March 2015, MSDN has discontinued the use of the Microsoft File Transfer Manager.</span>
>   * <span style="color: #993300;">Third-party download managers have not been tested and are not supported by Microsoft. If you have issues completing a download using a third-party download manager, please try again using your browser’s built-in download functionality.</span>

The subtitle to this post should be &#8211; &#8220;How to get faster downloads from TechNet and MSDN&#8221;.

I download quite a bit of stuff from TechNet and/or MSDN fairly regularly for deploying into a lab. With downloads typically in the gigabytes and often needing those downloads as soon as possible, I need to be able to download files consistently and faster than a browser alone might be able to.

Microsoft has used [File Transfer Manager](http://transfers.one.microsoft.com/ftm/) (FTM) for some time to make downloads easier and faster from TechNet and MSDN. Apparently Microsoft is transitioning over to [Download Manager](http://www.microsoft.com/en-au/download/details.aspx?id=27960), but I&#8217;m yet to see it in action.

Recently (perhaps the last 12 months), I&#8217;ve noticed that FTM hasn&#8217;t been launching to download a target file and instead the download has been via the browser directly. This hasn&#8217;t been an issue for me until I&#8217;ve moved from 60Mbps cable in the UK to ~7.5Mbps ADSL in Australia. Things take a little longer to download here, as you might guess. Here&#8217;s the download speeds I&#8217;ve typically been seeing from TechNet:

[<img class="alignnone  wp-image-3548" src="http://stealthpuppy.com/wp-content/uploads/2014/01/IESlowDownload.png" alt="Slow download speed in IE" width="861" height="480" srcset="https://stealthpuppy.com/wp-content/uploads/2014/01/IESlowDownload.png 861w, https://stealthpuppy.com/wp-content/uploads/2014/01/IESlowDownload-150x83.png 150w, https://stealthpuppy.com/wp-content/uploads/2014/01/IESlowDownload-300x167.png 300w, https://stealthpuppy.com/wp-content/uploads/2014/01/IESlowDownload-624x347.png 624w" sizes="(max-width: 861px) 100vw, 861px" />](http://stealthpuppy.com/wp-content/uploads/2014/01/IESlowDownload.png)

I know FTM does a far better job than this, so why won&#8217;t it launch when downloading files? Turns out that because FTM is ActiveX based and uses scripting and for whatever reason, it won&#8217;t actually launch from IE10 or IE11. The exact details on why are a bit of mystery but it seems that Microsoft haven&#8217;t gotten around to supporting their latest browsers.

Fortunately a work around is straight-forward &#8211; enable emulation mode to view the TechNet or MSDN sites as IE9. Emulation is enabled via the following steps:

  1. For Internet Explorer 11, press F12 to bring up the developer tools window
  2. Click the Emulation icon (bottom left) or press Ctrl+8
  3. Select &#8216;9&#8217; under Document Mode
  4. Choose &#8216;Internet Explorer 9&#8217; under User Agent String

[<img class="alignnone size-full wp-image-3549" src="http://stealthpuppy.com/wp-content/uploads/2014/01/DeveloperTools.png" alt="Emulation with Developer Tools" width="1027" height="517" srcset="https://stealthpuppy.com/wp-content/uploads/2014/01/DeveloperTools.png 1027w, https://stealthpuppy.com/wp-content/uploads/2014/01/DeveloperTools-150x75.png 150w, https://stealthpuppy.com/wp-content/uploads/2014/01/DeveloperTools-300x151.png 300w, https://stealthpuppy.com/wp-content/uploads/2014/01/DeveloperTools-1024x515.png 1024w, https://stealthpuppy.com/wp-content/uploads/2014/01/DeveloperTools-624x314.png 624w" sizes="(max-width: 1027px) 100vw, 1027px" />](http://stealthpuppy.com/wp-content/uploads/2014/01/DeveloperTools.png)

Now clicking on a download should result in FTM launching. Download speeds are now far more reasonable:

[<img class="alignnone size-full wp-image-3550" src="http://stealthpuppy.com/wp-content/uploads/2014/01/FTMFasterDownload.png" alt="FTM faster download" width="604" height="504" srcset="https://stealthpuppy.com/wp-content/uploads/2014/01/FTMFasterDownload.png 604w, https://stealthpuppy.com/wp-content/uploads/2014/01/FTMFasterDownload-150x125.png 150w, https://stealthpuppy.com/wp-content/uploads/2014/01/FTMFasterDownload-300x250.png 300w" sizes="(max-width: 604px) 100vw, 604px" />](http://stealthpuppy.com/wp-content/uploads/2014/01/FTMFasterDownload.png)

You can now close the Developer Tools window and even the browser, while your download continues.