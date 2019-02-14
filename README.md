[![npm version](https://badge.fury.io/js/idbstudio.svg)](https://badge.fury.io/js/idbstudio)

# Overview

IDBStudio is a cli tool for indexeddb library jsstore. It helps users to execute , debug and learn jsstore query. 

Note :- IDBStudio uses jsstore v2. So jsstore v1 query wont work.

## Install

install the idbstudio globally, by executing command -

```
npm i idbstudio -g
```

## Commands

### -s or --start : start the idbstudio

e.g- idbstudio --start

### -p or --port : specify port number - default port is 3000

e.g - idbstudio --start --port 8000

### -g or --generate : generate idbstudio

e.g - idbstudio --generate 

### -f or --folder : specify folder name for generate - default folder is idbstudio

e.g - idbstudio --generate --folder myfolder

### --sql [value] : convert the sql to jsstore query 
 
 e.g - idbstudio --sql "select * from customers"
 
