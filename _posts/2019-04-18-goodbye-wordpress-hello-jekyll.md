---
layout: post
title: Goodbye WordPress. Hello, Jekyll!
description: How I moved steatlhpuppy.com from WordPress to Jekyll and GitHub pages and host this site for free.
date: 2019-04-18 12:30 +1000
permalink: /goodbye-wordpess-hello-jekyll/
image:
  path:    /assets/img/hello/image.jpg
  srcset:
    1920w: /assets/img/hello/image.jpg
    960w:  /assets/img/hello/image@0,5x.jpg
    480w:  /assets/img/hello/image@0,25x.jpg
categories:
  - General
---
* this unordered seed list will be replaced by the toc
{:toc}

With a hosting renewal pending I thought it past time to migrate to a new platform for stealthpuppy.com. While I've found WordPress to be OK with plenty of support for extensibility through plug-ins, I'm not keen on paying for a blogging platform that I don't actively make an income from, nor do I want to deal with the hassle of a multi-tier platform using MySQL, PHP and WordPress itself.

Over the past week or so, I've migrated stealthpuppy.com from WordPress to [Jekyll](https://jekyllrb.com/) and to say that I'm impressed with the results is a massive understatement. The affect on the performance of my site has been phenomenal.

In this article, I'll give you an idea of how I migrated from WordPress to Jekyll, the challenges I experienced and an overview how I've built the new stealthpuppy.com.

## So Long WordPress

To be fair, WordPress has, mostly, served me well for almost 14 years. This site started out on Community Server and I migrated to WordPress in 2006 on GoDaddy and moved over to Bluehost in what may have been 2013. In that time, I've gone through many versions of WordPress, PHP and MySQL, a number of theme changes and too many WordPress plug-ins that I can count. At a guess, hosting has cost me about $1000 USD over that time.

While I may not have had major down time, I've had a few close calls and certainly more time that I would have liked spent troubleshooting site issues, messed up text as the result of migrations or upgrades, or plug-in issues.

Since getting my head around [Markdown](https://en.wikipedia.org/wiki/Markdown), I've not been comfortable with the fact that my content has been tied up in a [MySQL](https://www.mysql.com/) database. I've used a couple of different WordPress plug-ins to back up the content, but once you're in a certain platform, it's hard to get out. There's nothing proprietary about plain text.

Additionally, WordPress should be worrying about the security of their sites regularly. Seeing [reports of issues with plug-ins](https://www.bleepingcomputer.com/news/security/thousands-of-wordpress-sites-exposed-by-yellow-pencil-plugin-flaw/) or WordPress itself is pretty common. Was my site ever compromised? I can't say for certain that it wasn't.

### Pushing Me Over the Edge

About 2 weeks previous to this migration, I'd logged into my WordPress admin console and received PHP errors when attempting to update to the latest release. The last thing I wanted to do was log a support call with my hosting provider, because I'd have to reach for my credit card.

So a failing site and the prospect of having be locked in for another 12-36 months worth of hosting costs forced me into action.

## Why Jekyll

I'd looked at Jekyll a couple of years ago and have seen enough other sites built on Jekyll to pique my interest. Additionally having been on [GitHub for some time]({{site.baseurl}}/signing-git-commits-for-sweet-verified-badges/), leveraging GitHub Pages to host my site for free, was hard to pass up. Managing my entire site in a Git repository and [being able to serve it up locally for testing](https://help.github.com/en/articles/setting-up-your-github-pages-site-locally-with-jekyll#step-4-build-your-local-jekyll-site) are immensely powerful.

### Markdown All the Things

I'm loving writing content in Markdown. I've been using it for documenting various projects for some time. Writing articles in plain text frees you to concentrate on content and let Jekyll worry about the formatting. Once your content is in Markdown (i.e plain text), deploying Jekyll to GitHub Pages is so simple. Additionally, I could choose to deploy to an Azure Storage Account or even migrate from Jekyll to something else (e.g [Hugo](https://gohugo.io/)) without having to reformat the content.

A couple of great benefits with basing content on Markdown with Jekyll, is that I no longer need plugins to format code or maintain tables, as these are natively handled by Markdown and formatted by Jekyll.

## Getting out of WordPress

Unfortunately the issues with PHP were resulting in issues with migrating away from WordPress as well. [Jekyll Exporter](https://wordpress.org/plugins/jekyll-exporter/) is an excellent tool for migrating from WordPress to Jekyll, but I couldn't enable to to be able to export my content:

![WordPress Php Error - "Plugin could not be activated"]({{site.baseurl}}/media/2019/04/WordPressPhpError.jpeg)

I attempted a few other approaches without luck. Fortunately I had been using a plugin to backup my WordPress install (database, content etc.), so I've resorted to deploying a copy of the site onto an Ubuntu VM in my lab using this article: [How to Install a LAMP Stack on Ubuntu 18.04](https://www.linode.com/docs/web-servers/lamp/install-lamp-stack-on-ubuntu-18-04/). Without a doubt, I can say that I have better things to do with my time than working out how to deploy _fucking_ LAMP on Ubuntu, at least I do now have a copy of WordPress locally that I can use to ensure that my content has been migrated OK.

I did grab a few additional items from the old site via CPanel including some resources I've made available over the years and may upload them to the new site if I get around to it. It may be simpler for me just to maintain them in a repository on GitHub.

Once I could run the export from WordPress, I was then left with a Jekyll export folder:

![Jekyll export folder]({{site.baseurl}}/media/2019/04/Jekyll-Export-Folder.png)

## Working with Jekyll

I won't go into detail here on the Jekyll setup process as there are several great articles already to refer to:

* [Moving to Jekyll and GitHub Pages (while Bidding Wordpress Adieu)](https://benjamintravis.com/blog/jekyll-github-pages-from-wordpress)
* [Free Secure Web: Jekyll & Github Pages & Cloudflare](https://martin.ankerl.com/2017/07/22/free-secure-web-jekyll-github-pages-cloudflare/)
* [How-to: Migrating Blog from WordPress to Jekyll, and Host on Github](https://girliemac.com/blog/2013/12/27/wordpress-to-jekyll/)
* The [Jekyll documentation](https://jekyllrb.com/docs/) is an ideal resource as well.

For me the basic process was as follows:

1. Get my head around [Ruby](https://www.ruby-lang.org/en/). While there's no need to write in Ruby for Jekyll, it is built on Ruby and you'll need to understand how to get setup for Jekyll on [macOS](https://jekyllrb.com/docs/installation/macos/) or [Windows](https://jekyllrb.com/docs/installation/windows/) etc. I use a MacBook as my daily driver and I suspect that macOS is easier to deploy on than Windows. Ruby + Jekyll
2. [Understand Jekyll](https://help.github.com/en/articles/setting-up-your-github-pages-site-locally-with-jekyll) - essentially we are turning plain text in Markdown down into a static HTML web site. Once you can see this in action, I think you'll understand how powerful a static site generator such as Jekyll is.
3. Understand Markdown - this [Markdown Guide](https://www.markdownguide.org/) is the best resource on Markdown I've seen. Bookmark it.
4. Update my article content - while the Jekyll Exporter did a great job of generating Markdown, I've spent considerable time fixing the HTML that it couldn't transform across 600+ articles. That includes fixing images, getting tables out of a Wordpress plugin, updating code samples in article (that were also being formatting with a plugin). I've done all of this in Visual Studio Code and leveraged it along with some RegEx and just plain search-and-replace to fix content.
5. Optimise and sort the site media - I have images etc. going back to 2005 that I've sorted though, culled and optimised
6. Generate new favicons - I took the opportunity to ensure favicon support for all platforms including iOS and Android
7. Ensure the repository is [ready for my custom domain name](https://help.github.com/en/articles/using-a-custom-domain-with-github-pages) so that GitHub Pages serves up stealthpuppy.com
8. Test the site on GitHub Pages before cutting over from the old site
9. Switch Cloudflare DNS to point to GitHub Pages

As far as I could tell, the switch was pretty much seamless. Other than having to fix articles and put back some features over time (e.g. search), the content is all there and I now pay nothing for by site hosting.

### Optimising Images

WordPress generates several image sizes when uploading them (e.g. screenshots). Now in Jekyll, I rely on a single image only and have done away with thumbnails etc. Additionally, I've run PNGOUT across most images to ensure they are optimised for size. Here's the basic PowerShell commands I used to removed unneeded thumbnails and optimise images:

```powershell
Get-ChildItem -Path .\ -Recurse -Include *thumb.jpg | Select FullName | % { Remove-Item -Path $_.FullName -Verbose }
Get-ChildItem -Path .\ -Recurse -Include *thumb.png | Select FullName | % { Remove-Item -Path $_.FullName -Verbose }
$files = Get-ChildItem -Path .\ -Include *.png -Recurse | Select FullName
ForEach ($file in $files) { . D:\pngout.exe $file.FullName }
```

I use [ImageOptim](https://imageoptim.com/mac) to optimise PNG and JPG media as I write new posts. [PNGGauntlet](https://pnggauntlet.com/) for Windows also looks like a good choice.

### Tools

Apart from the aforementioned ImageOptim, here's what I'm using to write an maintain my site:

* Git / [GitHub Desktop](https://desktop.github.com/) - the site is now maintained in a Git repository hosted on GitHub and served from GitHub Pages, thus I have a framework to version the site and track changes. My site is now code.
* [iA Writer](https://ia.net/writer/) - while VSCode is great for Markdown, a dedicated Markdown writing app provides a few extra features including spell check and tools to add Markdown elements that I haven't memorised yet
* [Visual Studio Code](https://code.visualstudio.com/) - I use this for all my code on macOS or Windows and a Jekyll site now fits within the same workflow. VSCode supports Markdown out of the box and of course supports Ruby and YAML used by Jekyll. A [markdownlint extension](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) helps with ensure that your Markdown is clean.

When it comes to [find and replace with Visual Studio Code](https://medium.com/@mykeels/find-and-replace-in-visual-studio-code-864d9d7efbd8), you'll need to leverage RegEx to get the most out of it. You can search within a file and also search across multiple files at the same time.

[![Find and replace in Visual Studio Code]({{site.baseurl}}/media/2019/04/VisualStudioCode-RegEx.png)]({{site.baseurl}}/media/2019/04/VisualStudioCode-RegEx.png)

## Results

I've fronted stealthpuppy.com with Cloudflare for a few years, but performance of the site on WordPress could still have been better. After migrating to Jekyll though, I'm blown away by the improvements. Here's a look at the typical site performance as measured by the [Pingdom Website Speed Test](https://tools.pingdom.com/) with the site on WordPress:

![Page performance result on WordPress]({{site.baseurl}}/media/2019/04/PerformanceBefore.png)

That's probably OK on a broadband connection with a modern PC. Still, a performance grade of D doesn't make me happy. Here's the same page after migrating to Jekyll:

![Page performance result on Jekyll]({{site.baseurl}}/media/2019/04/PerformanceAfter.png)

The new site receives a performance grade upgrade with an impressive reduction in page size, load time and the number of HTTP requests to load the page. Giving this some thought, I believe this is due to a number of improvements including a removal of header images I was using on WordPress, less JavaScript from WordPress add-ins and the removal of a couple of other items including advertisements.

Both of these results have tested the site behind Cloudflare. Testing directly against GitHub Pages actually show a performance improvement, but there's good reasons to keep the site on Cloudflare that I'll cover later in this article.

### Stats

Now I'll show you some site-wide stats that provide more depth into the before and after performance of the site and why we're seeing the improvements in page load time. Let's take a look at the number of visitors over the past week. This pattern is always the same - dips over the week-end and back up to its peak around Wednesday. The graph below shows the same number of unique visitors before and after the migration.

![stealthpuppy site visitor counts from Cloudflare]({{site.baseurl}}/media/2019/04/Cloudflare-Visitors.png)

The next graph now shows the number of requests over the same period. These aren't individual page views, but the number of browser requests sent to the site by those unique visitors. The change over to Jekyll was done last Friday and this week there is a dramatic drop in the number of requests for the same number of unique visitors. The old site was serving 92,000 requests and the new site is serving 29,000 requests for the same amount of visitors!

![stealthpuppy site requests from Cloudflare]({{site.baseurl}}/media/2019/04/Cloudflare-Requests.png)

Finally, let's look at the amount of bandwidth, again serving the same number of unique visitors:

![stealthpuppy site bandwidth from Cloudflare]({{site.baseurl}}/media/2019/04/Cloudflare-Bandwidth.png)

The WordPress site was serving **2.93 GB** in a single day and now the Jekyll version is only serving **729 MB**. Over time, I hope to see more of the site served from the Cloudflare CDN cache, but already we can see the reduction in requests and bandwidth helping to explain the improvement in site performance.

## GitHub Pages + Cloudflare

While it's possible to [enable HTTPS for GitHub Pages on a custom domain](https://help.github.com/en/articles/troubleshooting-custom-domains) with certificates automatically issued by Let's Encrypt, I've stuck with fronting the site with Cloudflare to ensure that I have more control over caching, performance and security. I'm still using the Cloudflare free tier.

Below are some rough notes and pointers for configuring GitHub Pages with Jekyll and integration with Cloudflare:

* I've left 'Enforce HTTPS' disabled on the GitHub repository because Cloudflare is handling HTTPS and certificates instead
* This article really helped ensuring that I got the configuration right: [How to setup a static website using GitHub Pages and Cloudflare with your own Domain Name](https://www.codementor.io/landonpatmore/how-to-setup-a-static-website-using-github-pages-and-cloudflare-with-your-own-domain-name-jb99nbuoe)
* Within Cloudflare, I have the following features configured. These aren't vastly different to what I was doing previously with WordPress:

| Feature | Setting |
|:--|:--|
| SSL | Flexible |
| Edge certificate | Enabled using Cloudflare free shared certificate |
| Always use HTTPS | Enabled to redirect all requests for "http" to "https" |
| HTTP Strict Transport Security | I've not yet enabled HSTS, but planning on this in the future |
| Minimum TLS Version | TLS 1.1 |
| Opportunistic Encryption | On |
| Onion Routing | On |
| TLS 1.3 | Enabled + 0RTT |
| Automatic HTTPS Rewrites | Enabled |
| Auto Minify | Enabled for reduce file sizes for JavaScript, CSS & HTML |
| Accelerated Mobile Links | Enabled to improve the experience on mobile devices |
| Brotli | Brotli compression is enabled |
| Rocket Loader | Enabled |
| Caching Level | Standard |
| Browser Cache Expiration | Respect Existing Headers |
| Always Online | On |
{:.smaller}

### Page Rules

[Cloudflare Page Rules](https://support.cloudflare.com/hc/en-us/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-) allows me to take a more aggressive approach to caching, especially for the largest content on the site which is typically screenshots.

![Cloudflare Page Rules for stealthpuppy.com]({{site.baseurl}}/media/2019/04/Cloudflare-PageRules.png)

This article on recommended Page Rules is worth reading: [Recommended Page Rules to Consider](https://support.cloudflare.com/hc/en-us/articles/224509547).

## Considerations

If you also want to free yourself from WordPress and build a blog site based on a static site generator, here's what to consider:

* Time - migration will be time consuming process, especially if you have many years worth of content
* Performance - the results speak for themselves, so investing the time is likely worth it
* Maintenance - on the whole, I believe that I now have a site that's easier to maintain, but my approach to the site has had to change. Arguably I need to know more about Jekyll that I know about the workings of WordPress. I can treat the site as code though, just like I have been doing with a number of PowerShell projects
* Backup - I no longer need to maintain a backup plugin. Instead stealthpuppy.com exists in a Git repository on GitHub with a copy locally that is backed up by Time Machine
* Portability - my content now exists in its most portable form which means that I'm less tied to the platform and can choose something other than Jekyll. Right now though, unless I pay for GitHub, my site is also portable for anyone - the entire site is downloadable from the repository in a single zip file
  * I may look into [hosting the site on an Azure Storage account](https://www.forevolve.com/en/articles/2018/07/10/how-to-deploy-and-host-a-jekyll-website-in-azure-blob-storage-using-a-vsts-continuous-deployment-pipeline-part-1/), which could provide some additional flexibility
* Cost - this one is easy - what's better than $0?
