---

title: Microsoft issues update to fix disabling Autorun
date: 2009-02-25T08:30:36+10:00
author: Aaron Parker
layout: post

permalink: /microsoft-issues-update-to-fix-disabling-autorun/
aktt_notify_twitter:
  - 'yes'
aktt_tweeted:
  - "1"
categories:
  - Microsoft
tags:
  - Autorun
---
 registry key from functioning as expected.

IT World [has covered the update](http://www.itworld.com/windows/63219/after-cert-warning-microsoft-delivers-autorun-fix) and US-CERT actually issued a security alert about the issue last month - [Microsoft Windows Does Not Disable AutoRun Properly](http://www.us-cert.gov/cas/techalerts/TA09-020A.html). The US-CERT article has guidance on disabling `AUTORUN.INF` completely via the IniFileMapping feature - something that [Nick Brown covered back in 2007](http://nick.brown.free.fr/blog/2007/10/memory-stick-worms.html).

There are actually two knowlegebase articles that cover the issue and the update: [How to correct "disable Autorun registry key" enforcement in Windows (967715)](http://support.microsoft.com/kb/967715) and [How to correct "disable Autorun registry key" enforcement in Windows (953252)](http://support.microsoft.com/kb/953252). You'll only need to read the first.

On Windows XP/2003 the update does two things - updates SHELL32.DLL and creates the registry value: `HKLMSoftwareMicrosoftWindowsCurrentVersionPoliciesExplorer HonorAutorunSetting`. You can download the updates here:

  * [Update for Windows XP (KB950582)](http://www.microsoft.com/downloads/details.aspx?FamilyId=CC4FB38C-579B-40F7-89C4-1721D7B8DAA5)
  * [Update for Windows Server 2003 x64 Edition (KB950582)](http://www.microsoft.com/downloads/details.aspx?FamilyId=E8507286-CDF8-4BCB-AFC5-9734FE772C53)
  * [Update for Windows Server 2003 (KB950582)](http://www.microsoft.com/downloads/details.aspx?FamilyId=705305E5-7060-4236-B5D2-40CA63A967FB)
  * [Update for Windows XP x64 Edition (KB950582)](http://www.microsoft.com/downloads/details.aspx?FamilyId=21A0124C-6F50-4281-923E-E2B28068147A)
  * [Update for Windows Server 2003 for Itanium-based Systems (KB950582)](http://www.microsoft.com/downloads/details.aspx?FamilyId=5795F63E-1FD9-4A13-9650-1015E14B6D11)
  * [Update for Windows 2000 (KB950582)](http://www.microsoft.com/downloads/details.aspx?FamilyId=C192EDCF-CA3D-44E3-8ECC-49C5F4DA5405)

For Windows Vista and Windows Server 2008, this issue was addressed in Microsoft [Security Bulletin MS08-038](http://www.microsoft.com/technet/security/bulletin/ms08-038.mspx), released July last year. You've deployed that update right?

So the question is then, does Autorun have a place in corporate environments? I think the answer is no - a little tradeoff in usability for a big gain in security. Here's a few interesting articles by Steve Riley and Jesper Johasson on the subject:

  * [Autorun: good for you?](http://blogs.technet.com/steriley/archive/2007/09/22/autorun-good-for-you.aspx)
  * [More on Autorun](http://blogs.technet.com/steriley/archive/2007/10/30/more-on-autorun.aspx)
  * [Security Watch: Island Hopping - The Infectious Allure of Vendor Swag](http://technet.microsoft.com/en-us/magazine/2008.01.securitywatch.aspx)

If we only learn two things from Conficker, they should be patch early and disable Autorun. If you're not on top of this, you could potentially leave yourself open for a world of hurt.
