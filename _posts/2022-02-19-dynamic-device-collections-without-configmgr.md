---
layout: post
title: Advanced Dynamic Device Collections for Intune without ConfigMgr
description: Build a cloud-only solution for advanced dynamic device collections using
  Proactive Remediations, Azure Log Analytics, and Azure Logic Apps to target policies
  and apps in Microsoft Intune, all without ConfigMgr.
permalink: "/dynamic-device-collections-intune/"
image:
  path: "/assets/img/collection/image.jpg"
  srcset:
    1920w: "/assets/img/collection/image.jpg"
    960w: "/assets/img/collection/image@0,5x.jpg"
    480w: "/assets/img/collection/image@0,25x.jpg"
categories:
- Microsoft
comments: true
related_posts:
- _posts/2021-10-01-onedrive-knownfoldermove-loganalytics.md
date: 2022-02-19 10:21 +1100
---
* this unordered seed list will be replaced by the toc
{:toc}

## Introduction

[Co-management](https://docs.microsoft.com/en-us/mem/configmgr/comanage/overview) with Microsoft Endpoint Configuration Manager extends ConfigMgr capabilities into Microsoft Intune. Deploying co-management provides enterprise features for cloud-first device management. This includes device collections that dynamically populate based on device property queries via WMI. [Synchronise those collections to Azure AD groups](https://docs.microsoft.com/en-us/mem/configmgr/core/clients/manage/collections/create-collections#bkmk_aadcollsync), and you're able to extend capabilities that are not natively available in Intune.

What are your options if your organisation has gone cloud-only with Microsoft Intune, but without ConfigMgr?
{:.lead}

Azure AD supports [dynamic device groups](https://docs.microsoft.com/en-us/azure/active-directory/enterprise-users/groups-dynamic-membership#rules-for-devices) that are populated based on device hardware capabilities. However, an Azure AD device object stores limited hardware information, so those queries are also limited. This in turn, limits the uses where Azure AD dynamic device groups can be used to target policies or applications in Microsoft Intune.

Microsoft has introduced [Filters into Intune](https://docs.microsoft.com/en-us/mem/intune/fundamentals/filters) that are more flexible that Azure AD dynamic device groups, but these too have limited device properties to query, also limiting their use for advanced scenarios.

### Use Cases

Here's a few use cases that can be solved with custom solution to dynamic device collections for Intune:

* Target Windows Hello policies only to a collection of devices that have biometric hardware capabilities
* Create collections for Windows 10 or Windows 11 devices for targetting Feature update policies. Dynamic device groups and Intune filters make this challenging today
* Create a collection of devices that don't have a TPM enabled or only have a TPM v1.2
* Create a collection of Lenovo PCs that have a specific BIOS version

## Dynamic Device Collections without ConfigMgr

Until Microsoft expands on device hardware inventory capabilities in Intune and exposes additional hardware properties to Filters, we need to build our own. Here's how to build a cloud-only solution for advanced dynamic device collections using [Proactive Remediations](https://docs.microsoft.com/en-us/mem/analytics/proactive-remediations), [Azure Log Analytics](https://docs.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-tutorial), and [Azure Logic Apps](https://docs.microsoft.com/en-us/azure/logic-apps/logic-apps-overview) providing advanced targeting capabilities for policies and apps in Microsoft Intune, all without ConfigMgr.

This solution is currently a Proof of Concept. There are specific considerations for performance and security that I will highlight in this article.
{:.note title="Attention"}

### Components

The approach to building a dynamic device collection for Microsoft Intune builds on several components:

* **Microsoft Intune Endpoint Analytics Proactive Remediations** - collects hardware and software inventory from manage devices
* **Azure Log Analytics** - stores hardware and software inventory data
* **Azure Logic App** - queries Log Analytics for specific hardware or software values, and populates the Azure AD group based on devices returned from the query
* **Azure AD group** - this is the device collection that can be used as a target in Intune

### Advanced Hardware and Software Inventory with Intune

Microsoft Intune collects limited hardware and software inventory data, so input into the dynamic device collection will also be limited. The team at MSEndpointMgr has created a solution to collect that missing detail for both hardware and software inventory based on Proactive Remediations and Log Analytics - [Enhance Intune Inventory data with Proactive Remediations and Log Analytics](https://msendpointmgr.com/2021/04/12/enhance-intune-inventory-data-with-proactive-remediations-and-log-analytics/).

That solution provides a collection tool in extensible PowerShell scripts run by Proactive Remediations that push data into Azure Log Analytics and viewable in an Azure Workbook.

[![Hardware inventory report]({{site.baseurl}}/media/2022/02/HardwareReport.png)]({{site.baseurl}}/media/2022/02/HardwareReport.png)

An Azure Workbook displaying the hardware inventory report
{:.figcaption}

With this inventory solution sending data to Log Analytics, we have a source data set to query for our dynamic device collections.

The smallest window that a Protective Remediation script can be run is one per hour. Thus we are only going to see hardware changes reflected in the inventory data within the previous 1-2 hours, depending on hardware changes and when the script executes on the device.
{:.note title="Note"}

### KQL Queries

Before building the Logic App that will populate the Azure AD group, let's look at a KQL query to return devices based on hardware properties. For this example, the query below will return a list of devices, discovered over the previous 3 days, that have 16GB of RAM or less.

```kusto
HardwareInventory_CL
| where TimeGenerated > ago(3d)
| where Memory_d <= 16
| summarize arg_max (TimeGenerated, *) by ComputerName_s
| project ComputerName_s
```

As long as the Proactive Remediation script is sending the required hardware or software properties to Log Analytics, we can query for those properties in the Logic App. Here's an example query that returns devices that have **Adobe Acrobat DC (64-bit)** installed where the version less than the required version of `22.011.20039`:

```kusto
SoftwareInventory_CL
| where TimeGenerated > ago(3d)
| where AppName_s == "Adobe Acrobat DC (64-bit)"
| where parse_version(AppVersion_s) < parse_version("22.011.20039")
| summarize arg_max (TimeGenerated, *) by ComputerName_s
| project ComputerName_s
```

[Windows Update Compliance](https://docs.microsoft.com/en-us/windows/deployment/update/update-compliance-get-started) tables can also be queried. The [UCClient](https://docs.microsoft.com/en-us/azure/azure-monitor/reference/tables/ucclient) table provides plenty of useful data to filter on. For example, let's find all devices that are running Windows 11 21H2 or higher:

```kusto
UCClient 
| where TimeGenerated > ago(3d)
| where parse_version(OSBuild) >= parse_version("10.0.22000.0")
| summarize arg_max (TimeGenerated, *) by DeviceName
| project DeviceName
```

### Azure AD Group

In our cloud-native device management solution, the device collection is an [Azure AD group](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-groups-create-azure-portal). The group can be used to target application and policies in Microsoft Intune.

[![Azure AD group]({{site.baseurl}}/media/2022/02/DeviceCollection-DynamicDevice.png)]({{site.baseurl}}/media/2022/02/DeviceCollection-DynamicDevice.png)

Configure the frequency for running the Logic App.
{:.figcaption}

We need the `Object Id` property from the target group to reference in the Logic App.

### Azure Logic App

Let's build the Azure Logic App that will manage the membership of the Azure AD group. Here's the basic flow of the Logic App:

1. **Run the Logic App on a schedule**. Remember that the Proactive Remediation script can run at most once per hour, thus the Logic Should not need to run any less than once per hour as well. The Logic App makes calls to the Microsoft Graph API, so we need to consider how scale could affect performance
2. **Retrieve existing group members from the target Azure AD group**
3. **Remove the existing members from the Azure AD group**. Validation before moving group members would be prudent
4. **Query Log Analytics for matching devices**, returning the list of device display names
5. **Query the Microsoft Graph for the `Object Id` property for each device**. This currently makes a call to the API per device, thus performance may degrade as the number of devices increases. This could be resolved by updating the hardware inventory collection script to return the `Object Id` property and store that in Log Analytics
6. **Add the list of devices (via the `Object Id` property) to the target Azure AD group**

To ensure the use of a Logic App is cost effective, use the [Consumption pricing model](https://docs.microsoft.com/en-us/azure/logic-apps/logic-apps-pricing#consumption-pricing). The simplest approach to implementing this solution will be to create a Logic App per device collection. The Consumption pricing model will keep Azure costs down.
{:.note title="Note"}

Let's take a look at these steps in more detail.

#### Schedule

The Logic App runs on a schedule - pick the frequency that you update the Azure AD group membership.

[![Logic App schedule]({{site.baseurl}}/media/2022/02/LogicAppSchedule.png)]({{site.baseurl}}/media/2022/02/LogicAppSchedule.png)

The dynamic device collection is managed via an Azure AD group membership.
{:.figcaption}

#### Remove Existing Group Members

To ensure the group contains only valid members, let's first remove the existing group members. This action is performed by returning the existing group members (i.e. device accounts), then removing each member from the group.

[![Remove Existing Group Members]({{site.baseurl}}/media/2022/02/RemoveGroupMembers.png)]({{site.baseurl}}/media/2022/02/RemoveGroupMembers.png)

Return the existing group members, the for each member, remove the object from the group.
{:.figcaption}

#### Query Log Analytics

Querying the data from a Log Analytics workspace will return the required device names. Using the sample KQL query above will return a single array of device display names, that will be passed to the next step.

[![Query Log Analytics]({{site.baseurl}}/media/2022/02/QueryLogAnalytics.png)]({{site.baseurl}}/media/2022/02/QueryLogAnalytics.png)

The step to query Azure Log Analytics and return a list of devices to add to the Azure AD group.
{:.figcaption}

#### Query the Microsoft Graph

To obtain the `Object Id` property for each device, a query must be sent to the Microsoft Graph API. This is wrapped in a For loop that will step through each device, passing its display name to return JSON output that includes the Id in the form of a GUID.

We use the devices API to return details of each device - [https://graph.microsoft.com/v1.0/devices](https://docs.microsoft.com/en-us/graph/api/device-list?view=graph-rest-1.0&tabs=http). This will include a [filter](https://docs.microsoft.com/en-us/graph/query-parameters#filter-parameter) and the [select](https://docs.microsoft.com/en-us/graph/query-parameters#select-parameter) parameter to narrow the query, and return the Id.

```url
https://graph.microsoft.com/v1.0/devices?$filter=operatingSystem eq 'Windows' and displayName eq '@{items('For_each_device')?['ComputerName_s']}'&$select=id
```

Notice that the Logic App is sending a query to the Graph API per device, which is not very efficient. In its current form, there may be issues with scaling this solution to 100's or 1000's of devices.
{:.note title="Important"}

[![Microsoft Graph API call]({{site.baseurl}}/media/2022/02/GrahpAPICall.png)]({{site.baseurl}}/media/2022/02/GrahpAPICall.png)

Using the HTTP action to send a query to the Microsoft Graph API to return the device Object Id.
{:.figcaption}

##### Authentication

The HTTP request to the Graph API requires authentication. Here we use an Azure AD app registration, which is granted rights to query the devices API, enabling the HTTP call to authenticate to the API and return data.

The Graph API Explorer is useful to [validate the access to the API](https://developer.microsoft.com/en-us/graph/graph-explorer?request=devices&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com) and ensure that we return expected output. In the image below, I'm using the same query that the Logic App will send to the API, and returning the `Object Id` for a specific device, which outputs in JSON.

[![Using the Graph API Explorer to validate the output from the Devices API]({{site.baseurl}}/media/2022/02/DevicesAPI.jpeg)]({{site.baseurl}}/media/2022/02/DevicesAPI.jpeg)

Using the Graph API Explorer to validate the output from the Devices API.
{:.figcaption}

The app registration should need only the [Devices.Read.All](https://docs.microsoft.com/en-us/graph/permissions-reference#device-permissions) permission to query device properties; however, in practice, the Logic App would still fail with an authentication error with only this permission.

Validate permissions in your tenant before enabling this solution in a production environment. **Devices.Read.All** should be the only permissions that the app registration requires to return device data.
{:.note title="Important"}

#### Parse the Output

The Graph API will return JSON output similar to the following which must be parsed so that the next step, which will add devices to the group, will receive the `id` property:

```json
{
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#devices(id)",
    "value": [
        {
            "id": "450f56e3-b3eb-4a5d-a753-3d18e96d4658"
        }
    ]
}
```

The Parse JSON step will take the output from the Graph API and extract the `id` property to pass to the next step. Use the sample output from the Graph API Explorer as sample payload to generate the schema required by this step.

[![Passing the JSON output from the Graph API]({{site.baseurl}}/media/2022/02/ParseJson.png)]({{site.baseurl}}/media/2022/02/ParseJson.png)

Passing the JSON output from the Graph API.
{:.figcaption}

#### Add Devices to the Group

As each query to the Graph API returns an `id` object, the output is parsed, and then passed to the Azure AD 'Add user to group` action, which adds the device to the group via its id.

[![Passing the JSON output from the Graph API]({{site.baseurl}}/media/2022/02/AddGroupMembers.png)]({{site.baseurl}}/media/2022/02/AddGroupMembers.png)

Adding the device object to the Azure AD group.
{:.figcaption}

### Concluding

In this article, I've described an approach to a cloud-native solution to managing advanced device collections, using queries to hardware or software inventory that is not natively available in Microsoft Intune. The solution relies on managing both the hardware or software inventory solution via Proactive Remediations and Log Analytics, and the device collection solution via an Azure Logic App, but it doesn't require the overhead of Configuration Manager.

For environments that prefer a cloud-native approach and are looking to reduce services that require Windows virtual machines, this helps to provide features that a Configuration Manager administrator would take for granted.

[![A view of the Logic App]({{site.baseurl}}/media/2022/02/LogicAppView.gif)]({{site.baseurl}}/media/2022/02/LogicAppView.gif)

The Logic App in Designer view.
{:.figcaption}

This is the first version of this solution and there are some improvements to be had, including:

* Validating that a query to the Log Analytics workspace is successful before removing existing devices from the Azure AD group
* Batch queries to the Microsoft Graph API rather than a single call per device. [Throttling](https://docs.microsoft.com/en-us/graph/throttling) is unlikely; however, performance of the Logic App could be affected with a large number of devices
* Alternatively, determine another way to obtain the device object Id and store that in the Log Analytics Workspace

#### Code

So that you don't have to manually build the Azure Logic App, here's a code listing of the Logic App that you can import into your own tenant. This will require updating tenant specific information including subscription, App Registration details, and the Azure AD group Id.

```json
{
    "definition": {
        "$schema": "https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#",
        "actions": {
            "For_each_device": {
                "actions": {
                    "For_each_device_Id": {
                        "actions": {
                            "Add_device_to_device_collection_group": {
                                "inputs": {
                                    "body": {
                                        "@@odata.id": "@items('For_each_device_Id')?['id']"
                                    },
                                    "host": {
                                        "connection": {
                                            "name": "@parameters('$connections')['azuread']['connectionId']"
                                        }
                                    },
                                    "method": "post",
                                    "path": "/v1.0/groups/@{encodeURIComponent('f0a5670d-0913-4412-a434-b5fc3c23e00c')}/members/$ref"
                                },
                                "runAfter": {},
                                "type": "ApiConnection"
                            }
                        },
                        "foreach": "@body('Parse_JSON')?['value']",
                        "runAfter": {
                            "Parse_JSON": [
                                "Succeeded"
                            ]
                        },
                        "type": "Foreach"
                    },
                    "Parse_JSON": {
                        "inputs": {
                            "content": "@body('Query_the_Microsoft_Graph_for_the_device_Id')",
                            "schema": {
                                "properties": {
                                    "@@odata.context": {
                                        "type": "string"
                                    },
                                    "value": {
                                        "items": {
                                            "properties": {
                                                "id": {
                                                    "type": "string"
                                                }
                                            },
                                            "required": [
                                                "id"
                                            ],
                                            "type": "object"
                                        },
                                        "type": "array"
                                    }
                                },
                                "type": "object"
                            }
                        },
                        "runAfter": {
                            "Query_the_Microsoft_Graph_for_the_device_Id": [
                                "Succeeded"
                            ]
                        },
                        "type": "ParseJson"
                    },
                    "Query_the_Microsoft_Graph_for_the_device_Id": {
                        "inputs": {
                            "authentication": {
                                "audience": "https://graph.microsoft.com",
                                "clientId": "",
                                "secret": "",
                                "tenant": "",
                                "type": "ActiveDirectoryOAuth"
                            },
                            "headers": {
                                "ContentType": "application/json"
                            },
                            "method": "GET",
                            "uri": "https://graph.microsoft.com/v1.0/devices?$filter=operatingSystem eq 'Windows' and displayName eq '@{items('For_each_device')?['ComputerName_s']}'&$select=id"
                        },
                        "runAfter": {},
                        "type": "Http"
                    }
                },
                "foreach": "@body('Query_Log_Analytics_for_matching_devices')?['value']",
                "runAfter": {
                    "Query_Log_Analytics_for_matching_devices": [
                        "Succeeded"
                    ]
                },
                "type": "Foreach"
            },
            "For_each_member": {
                "actions": {
                    "Remove_group_member": {
                        "inputs": {
                            "host": {
                                "connection": {
                                    "name": "@parameters('$connections')['azuread']['connectionId']"
                                }
                            },
                            "method": "delete",
                            "path": "/v1.0/groups/@{encodeURIComponent('f0a5670d-0913-4412-a434-b5fc3c23e00c')}/members/@{encodeURIComponent(items('For_each_member')?['id'])}/$ref"
                        },
                        "runAfter": {},
                        "type": "ApiConnection"
                    }
                },
                "foreach": "@body('Get_device_collection_group_members')?['value']",
                "runAfter": {
                    "Get_device_collection_group_members": [
                        "Succeeded"
                    ]
                },
                "type": "Foreach"
            },
            "Get_device_collection_group_members": {
                "inputs": {
                    "host": {
                        "connection": {
                            "name": "@parameters('$connections')['azuread']['connectionId']"
                        }
                    },
                    "method": "get",
                    "path": "/v1.0/groups/@{encodeURIComponent('f0a5670d-0913-4412-a434-b5fc3c23e00c')}/members"
                },
                "runAfter": {},
                "type": "ApiConnection"
            },
            "Query_Log_Analytics_for_matching_devices": {
                "inputs": {
                    "body": {
                        "query": "HardwareInventory_CL\n| where TimeGenerated  > ago(3d)\n| where Memory_d <= 16\n| summarize arg_max (TimeGenerated, *) by ComputerName_s\n| project ComputerName_s",
                        "timerangetype": "3"
                    },
                    "host": {
                        "connection": {
                            "name": "@parameters('$connections')['azuremonitorlogs']['connectionId']"
                        }
                    },
                    "method": "post",
                    "path": "/queryDataV2",
                    "queries": {
                        "resourcegroups": "rg-DeviceManagement-AustraliaSoutheast",
                        "resourcename": "log-DeviceReports-AustraliaEast",
                        "resourcetype": "Log Analytics Workspace",
                        "subscriptions": "63e8f661-f6a5-4ac6-ad4e-623268509f21"
                    }
                },
                "runAfter": {
                    "For_each_member": [
                        "Succeeded"
                    ]
                },
                "type": "ApiConnection"
            }
        },
        "contentVersion": "1.0.0.0",
        "outputs": {},
        "parameters": {
            "$connections": {
                "defaultValue": {},
                "type": "Object"
            }
        },
        "triggers": {
            "Recurrence": {
                "evaluatedRecurrence": {
                    "frequency": "Day",
                    "interval": 1
                },
                "recurrence": {
                    "frequency": "Day",
                    "interval": 1
                },
                "type": "Recurrence"
            }
        }
    },
    "parameters": {
        "$connections": {
            "value": {
                "azuread": {
                    "connectionId": "/subscriptions/63e8f661-f6a5-4ac6-ad4e-623268509f21/resourceGroups/rg-DeviceManagement-AustraliaSoutheast/providers/Microsoft.Web/connections/azuread",
                    "connectionName": "azuread",
                    "id": "/subscriptions/63e8f661-f6a5-4ac6-ad4e-623268509f21/providers/Microsoft.Web/locations/australiasoutheast/managedApis/azuread"
                },
                "azuremonitorlogs": {
                    "connectionId": "/subscriptions/63e8f661-f6a5-4ac6-ad4e-623268509f21/resourceGroups/rg-DeviceManagement-AustraliaSoutheast/providers/Microsoft.Web/connections/azuremonitorlogs",
                    "connectionName": "azuremonitorlogs",
                    "id": "/subscriptions/63e8f661-f6a5-4ac6-ad4e-623268509f21/providers/Microsoft.Web/locations/australiasoutheast/managedApis/azuremonitorlogs"
                }
            }
        }
    }
}
```
