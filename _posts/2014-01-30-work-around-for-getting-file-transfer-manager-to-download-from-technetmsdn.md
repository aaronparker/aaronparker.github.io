---

title: Work around for getting File Transfer Manager to download from TechNet/MSDN
date: 2014-01-30T09:49:44+10:00
author: Aaron Parker
layout: post

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
_Update:_ August 8, 2015 - Microsoft have discontinued the Microsoft Download Manager as of March 2015, so the below workload will no longer work. If fact there are no workaround now, you'll need to rely on your browser's download manager. See this article for more info: [Using Subscriber Downloads](https://msdn.microsoft.com/en-us/subscriptions/aa948864.aspx)

> Downloading from MSDN
> 
> MSDN Subscriber Downloads uses your browser’s built-in download functionality, including pause and resume.
> 
>   * As of March 2015, MSDN has discontinued the use of the Microsoft File Transfer Manager.
>   * hird-party download managers have not been tested and are not supported by Microsoft. If you have issues completing a download using a third-party download manager, please try again using your browser’s built-in download functionality.

The subtitle to this post should be - "How to get faster downloads from TechNet and MSDN".

I download quite a bit of stuff from TechNet and/or MSDN fairly regularly for deploying into a lab. With downloads typically in the gigabytes and often needing those downloads as soon as possible, I need to be able to download files consistently and faster than a browser alone might be able to.

Microsoft has used [File Transfer Manager](http://transfers.one.microsoft.com/ftm/) (FTM) for some time to make downloads easier and faster from TechNet and MSDN. Apparently Microsoft is transitioning over to [Download Manager](http://www.microsoft.com/en-au/download/details.aspx?id=27960), but I'm yet to see it in action.

Recently (perhaps the last 12 months), I've noticed that FTM hasn't been launching to download a target file and instead the download has been via the browser directly. This hasn't been an issue for me until I've moved from 60Mbps cable in the UK to ~7.5Mbps ADSL in Australia. Things take a little longer to download here, as you might guess. Here's the download speeds I've typically been seeing from TechNet:

![Slow download speed in IE]({{site.baseurl}}/media/2014/01/IESlowDownload.png)

I know FTM does a far better job than this, so why won't it launch when downloading files? Turns out that because FTM is ActiveX based and uses scripting and for whatever reason, it won't actually launch from IE10 or IE11. The exact details on why are a bit of mystery but it seems that Microsoft haven't gotten around to supporting their latest browsers.

Fortunately a work around is straight-forward - enable emulation mode to view the TechNet or MSDN sites as IE9. Emulation is enabled via the following steps:

  1. For Internet Explorer 11, press F12 to bring up the developer tools window
  2. Click the Emulation icon (bottom left) or press Ctrl+8
  3. Select '9' under Document Mode
  4. Choose 'Internet Explorer 9' under User Agent String

![Emulation with Developer Tools]({{site.baseurl}}/media/2014/01/DeveloperTools.png)

Now clicking on a download should result in FTM launching. Download speeds are now far more reasonable:

![FTM faster download]({{site.baseurl}}/media/2014/01/FTMFasterDownload.png)

You can now close the Developer Tools window and even the browser, while your download continues.
