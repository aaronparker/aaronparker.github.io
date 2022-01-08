---

title: Quering Domino via LDAP with VBscript
date: 2007-08-08T08:33:16+10:00
author: Aaron Parker
layout: post

permalink: /quering-domino-via-ldap-with-vbscript/
categories:
  - Automation
tags:
  - VBscript
---
I don't really want to admit to interacting with [Lotus Notes](http://lotusnotessucks.4t.com/) but that's a part of what I'm doing currently. More specifically I'm attempting to query Domino via LDAP with a VBS script. It turns out that this is a fairly simple process and you can use the Active Directory Provider built into Windows.

The TechNet script centre has a [two-part](http://http://www.microsoft.com/technet/scriptcenter/resources/tales/sg0405.mspx), [detailed article](http://www.microsoft.com/technet/scriptcenter/resources/tales/sg0505.mspx) on how to query Active Directory which is a great resource for this type of query. Here a script I've used to query Notes for user objects and return their e-mail addresses. The LDAP query includes a server name so that it will connect to a specific server. This will attempt an anonymous query so you will have to extend this script to make an authenticated query.

```vb
Const ADS_SCOPE_SUBTREE = 2  
Set objConnection = CreateObject("ADODB.Connection")  
Set objCommand = CreateObject("ADODB.Command")  
objConnection.Provider = "ADsDSOObject"  
objConnection.Open "Active Directory Provider"  
Set objCommand.ActiveConnection = objConnection  
objCommand.Properties("Page Size") = 1000  
objCommand.Properties("Searchscope") = ADS\_SCOPE\_SUBTREE

WScript.Echo "Executing LDAP query.."  
objCommand.CommandText = "SELECT \* FROM 'LDAP://server/o=org' WHERE objectClass='dominoPerson' AND mail='\*'"  
Set objRecordSet = objCommand.Execute  
WScript.Echo "Query complete. Found " & objRecordSet.RecordCount & " objects."

objRecordSet.MoveFirst  
Do Until objRecordSet.EOF  
Set objUser = GetObject(objRecordSet.Fields("ADsPath").Value)  
WScript.Echo objUser.mail  
objRecordSet.MoveNext  
Loop
```

You can also find information and example for querying 3rd party LDAP servers with ADSI in these knowledgebase articles:

* [INFO: How to Use ADSI to Query a Third-Party LDAP Server](http://support.microsoft.com/kb/q251195/)
* [How To Query Exchange 5.x Anonymously Through ADSI](http://support.microsoft.com/kb/223049/EN-US/)

Here's a function that uses a different query method that will return an array of user distinguished names based on the search string passed to it. For example, if you pass the following string "OU=Sales,O=DominoOrg" it will only return users in the Sales OU below the DominoOrg organisation:

```vb
'Return the distinguished name of all of the user objects below the specified organisation  
Function fReturnDominoDNs(sDominoServer, sDominoScope)  
Dim aArray()  
Dim i: i = 0

Set oConnection = CreateObject("ADODB.Connection")  
Set oRecordset = CreateObject("ADODB.Recordset")  
Set oCommand = CreateObject("ADODB.Command")

oConnection.Provider = "ADsDSOObject"  
oConnection.Properties("User ID") = ""  
oConnection.Properties("Password") = ""  
oConnection.Properties("Encrypt Password") = False  
oConnection.Open "ADs Provider"  
oCommand.ActiveConnection = oConnection  
oCommand.Properties("Page Size") = 1000

'Output of query looks like this: GC://server:389/CN=Joe Blogs,OU=Sales,O=DominoOrg  
oCommand.CommandText = "<gc:>;(objectClass=dominoPerson);*;subtree"  
Set oRecordset = oCommand.Execute</gc:>

If oRecordSet.RecordCount <> 0 Then  
oRecordSet.MoveFirst  
Do Until oRecordSet.EOF  
If InStr(oRecordset.Fields("ADsPath").Value, sDominoScope) Then  
ReDim Preserve aArray(i)  
aArray(i) = Right(oRecordSet.Fields("ADsPath").Value, Len(oRecordSet.Fields("ADsPath").Value)-Instr(Len("GC://" & sDominoServer & ":389"), oRecordSet.Fields("ADsPath").Value, "CN=")+1)  
i = i + 1  
End If  
oRecordset.MoveNext  
Loop  
End If  
fDominoUserDNs = aArray  
Set oConnection = Nothing  
Set oCommand = Nothing  
Set oRecordset = Nothing  
End Function
```
