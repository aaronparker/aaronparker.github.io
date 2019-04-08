---
id: 183
title: Blogging with Word 2007
date: 2006-09-14T16:59:00+10:00
author: Aaron Parker
layout: post
guid: http://blog.stealthpuppy.com/uncategorized/blogging-with-word-2007
permalink: /blogging-with-word-2007/
categories:
  - Applications
tags:
  - Office
---
Having issues getting Word 2007 to register your blog provider? You may receive the following error message when attempting to add a blog account to Word:

> Word cannot register your account. The provider where you are trying to publish is unavailable. Contact your provider for assistance.

Check out the following screen shot for an example, and note the missing R in register 😉

![](http://stealthpuppy.com/wp-content/uploads/2006/09/1000.14.108.OfficeBlogError.JPG) 

In my case, we are behind a proxy server that authenticates access to the Internet. By bypassing the proxy I was able to get Word to successfully register the account. Now this worked for me because my blog is on a server that is on our internal network. If your blog is on an external server, you'll have to ensure that you can get to that server unauthenticated.

By the way, this is my first blog post from Word 2007 (Beta 2 Tech. Refresh)