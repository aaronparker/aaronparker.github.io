---
layout: post
title: "Building Entra Dynamic Device Groups for AVD"
description: >
  Use Entra ID dynamic device groups to automatically target Azure Virtual Desktop
  session hosts by subscription and resource group - with an interactive rule builder.
permalink: "/entra-id/dynamic-groups-azure-virtual-desktop/"
image:
  path: "/assets/img/group/image.jpg"
  width: 1920
  height: 1005
  srcset:
    1920w: "/assets/img/group/image.jpg"
    960w: "/assets/img/group/image@0,5x.jpg"
    480w: "/assets/img/group/image@0,25x.jpg"
  attribution:
    photographer:     "Andrew Moca"
    photographer_url: "https://unsplash.com/@mocaandrew"
    source:           "Unsplash"
    source_url:       "https://unsplash.com/photos/text-yAGNjU4rtss"
categories:
  - Entra
date: 2026-05-11 10:00 +1000
tags:
  - Azure Virtual Desktop
  - Entra ID
  - Intune
comments: true
---
* this unordered seed list will be replaced by the toc
{:toc}

## Overview

Managing Azure Virtual Desktop (AVD) session hosts at scale requires a reliable way to target them with policies, compliance rules, and configuration profiles in Microsoft Intune - without manually maintaining static group membership. Entra ID dynamic device groups solve this: membership is evaluated automatically based on device attributes, so session hosts are added or removed as they are provisioned or decommissioned.

For AVD, the most useful targeting attribute is `device.devicePhysicalIds`, which stores metadata that Azure writes onto each enrolled device during provisioning. One of those metadata values is the Azure Resource ID of the resource group the VM lives in. By building a membership rule that matches on that value, you get a group that precisely tracks every session host in a given host pool resource group - with no manual intervention required.

## How device.devicePhysicalIds works

When an Azure VM joins Entra ID (either natively or via hybrid join), the Azure platform writes a set of physical ID tags onto the device object. These tags are queryable in dynamic group membership rules using the `-any` operator.

The tag relevant to AVD is `[AzureResourceId]`, which takes the form:

```text
[AzureResourceId]:/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}
```

This tag is written for every Azure VM that is enrolled into Entra ID, making it reliable for targeting AVD session hosts regardless of the VM SKU or image used.

The Entra ID dynamic membership rule syntax for matching this tag is:

```text
device.devicePhysicalIds -any (_ -contains "[AzureResourceId]:/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}")
```

To target session hosts across multiple host pool resource groups within the same group, combine clauses with `or`:

```text
(device.devicePhysicalIds -any (_ -contains "[AzureResourceId]:/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup1}")) or (device.devicePhysicalIds -any (_ -contains "[AzureResourceId]:/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup2}"))
```

## Prerequisites

Before creating a dynamic group, confirm the following:

- **Session hosts are Entra joined or hybrid joined.** The `[AzureResourceId]` tag is only written for VMs enrolled in Entra ID. Workgroup VMs or VMs managed purely via Active Directory domain join without Entra hybrid join will not appear.
- **You have the Subscription ID and resource group names.** Both are required for the rule. The subscription ID is a GUID visible in the Azure portal under **Subscriptions**, or via the Azure CLI with `az account show --query id`.
- **Intune enrollment is active.** The device must be enrolled in Intune for the device object to exist and for policies to be applied to assignments using the group as a target.

## Rule builder

Use the tool below to generate the membership rule for your environment. Enter your Azure subscription ID and the name of each resource group that contains AVD session hosts. The rule updates as you type and can be copied directly into the Entra ID portal.

{% include avd-dynamic-group-builder.html %}

## Creating the group in Entra ID

Once you have the generated rule, create the dynamic device group:

1. Open the [Microsoft Entra admin center](https://entra.microsoft.com) and navigate to **Groups** → **All groups** → **New group**.
2. Set **Group type** to **Security** and **Membership type** to **Dynamic Device**.
3. Enter a **Group name** - for example, `devicegroup-avd-sessionhosts-prod`.
4. Click **Add dynamic query**.
5. Switch to the **Advanced rule** editor and paste the generated rule.
6. Click **Validate Rules** to test against existing devices before saving.
7. Click **Save**, then **Create**.

Membership is evaluated by Entra ID within a few minutes of creation and then kept up to date continuously. New session hosts provisioned into the matched resource groups will be added automatically once they enrol in Intune.

## Assigning policies and profiles

With the dynamic group in place, assign Intune configuration profiles and compliance policies to it as you would any other group:

- **Device configuration profiles** - apply Windows settings, certificate delivery, endpoint protection policies, etc., scoped to AVD session hosts.
- **Compliance policies** - evaluate session hosts against your organisational standards; non-compliant devices can be flagged or blocked via Conditional Access.
- **App assignments** - push required or available apps to session hosts. For multi-session hosts shared across users, use **device-targeted** assignments rather than user-targeted ones.
- **Windows Update for Business rings** - control servicing cadence per host pool by scoping update rings to individual dynamic groups.

## Considerations

**AVD Hybrid.** This has not yet been tested against virtual machines deployed into an AVD Hybrid environment; however, given that these VMs are registered into a resource group via Azure Arc, this approach should work, in theory.

**Subscription scope.** Each rule targets a single subscription. If your AVD environment spans multiple subscriptions, create one dynamic group per subscription (or per set of resource groups within a subscription) and nest them under a parent security group where Intune supports group nesting for assignment.

**Rule complexity limits.** Entra ID enforces a maximum rule length of 3,072 characters. A rule covering many resource groups will grow quickly; split into multiple groups if you approach the limit.

**Sync latency.** Dynamic membership evaluation is near-real-time for most changes but can take up to 24 hours in large tenants. Newly provisioned session hosts may not appear in the group immediately - factor this into provisioning workflows that depend on policy application at first login.

**Hybrid join vs. Entra join.** Both join types result in the `[AzureResourceId]` tag being written, so the rule works for both. However, for hybrid-joined devices there is an additional propagation step through Entra Connect Sync, which adds latency.

**Personal vs. pooled host pools.** The resource group–based rule does not distinguish between personal and pooled configurations - it matches all VMs in the resource group. If you need to separate policy targeting between personal and pooled hosts, place them in separate resource groups and use separate dynamic groups.
