## Table of contents
* [General info](#general-info)
* [Dependencies](#dependencies)
* [Setup](#setup)

## General info
Browser-based chat application using Node.JS.
This application should allow several users to talk in a chatroom and also to get stock quotes
from an API using a specific command.
	
## Dependencies
Project is created with:
* Express version: 4
* Socket IO: 3
* Mongoose: 5
* Passport: 0.4.1
* Kafka	

## Setup
To run this project, install it locally using npm:

```
$ cd ../jobsity-financial-chat
$ npm install
$ npm start
```

You need to have MongoDB server running locally.

First you need to register a user:
```
localhost:3000/users/register
```
Then login:
```
localhost:3000/users/login
```

Only registered users can access to the chatroom.

Then if kafka and financial-chat-bot are running if any user send '/stock=stock_code' 
the stock close price will appear and the chat post owner will be 'StockBot'