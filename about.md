---
layout: about
title: About Me
description: 
hide_description: true
---
I'm an **end-user computing specialist** with 30 years experience in pre-sales, design, implementation, and support of end-user computing environments (virtual desktops, modern device management, and enterprise mobility). I've also spent around 20 years in the IT community speaking, presenting, blogging and running open-source projects.

Over my career, I've been an IT engineer, consultant, pre-sales architect, solution architect, developer, and mentor. I enjoy using automation to provide continuous improvements to IT process. I have a wide set of experience and skills in Microsoft, Citrix and VMware-based solutions and have implemented these technologies across government, corporate & not-for-profit organizations, in **Australia**, the **UK** and the **US**.

I am a Senior PM Architect at Nerdio, focusing on research, development, and strategic product innovation across the Nerdio platform. In this role, I act as the bridge between the Core Engineering teams and the Research and Development team.

My role sits at the intersection of engineering, product, and customer reality. I explore emerging capabilities across Microsoft Azure, Azure Virtual Desktop, Windows 365, and Microsoft Intune, translating real-world operational challenges into practical platform features. This work includes technical research, prototyping, and early-stage design of new capabilities that later become part of Nerdio Manager.

#### Projects at Nerdio

Here's a sample of projects or features that I've worked on at Nerdio:

* **Operational Efficiency dashboard** - shows the active time and effort savings that Nerdio Manager provides to a customer in their environment for Azure Virtual Desktop, Windows 365, and Intune
* **Windows 365 migration** - Nerdio Manager enables customers to migrate suitable Azure Virtual Desktop workloads to Windows 365, simplifying personal desktop management without user interruption
* **Nerdio Migrate** - Nerdio Manager simplifies migration of legacy VDI workloads to Azure Virtual Desktop and Windows 365
* **Nerdio Compass** - Compass connects to multiple data sources in your identity, end-user computing, VDI and endpoint management environments and provides recommendations for migration and cost / resource optimisation.

## Selected Work History

<div class="resume-timeline">
{% for role in site.data.resume %}
<div class="resume-entry">
  <div class="resume-entry__header">
    <div>
      <h3 class="resume-entry__title">{{ role.title }}</h3>
      <p class="resume-entry__company">{{ role.company }}{% if role.location %} &middot; {{ role.location }}{% endif %}</p>
    </div>
    <span class="resume-entry__dates">{{ role.start }}–{{ role.end }}</span>
  </div>
  <p class="resume-entry__description">{{ role.description }}</p>
</div>
{% endfor %}
</div>

## About stealthpuppy.com

This site (generally) focuses on end-user computing and enterprise mobility and is a way for me to not only write about interesting topics, but a way to give back the IT community. If I've been able to help you in your work in any way, that provides me with much satisfaction.
