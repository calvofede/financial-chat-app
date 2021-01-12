## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
Browser-based chat application using Node.JS.
This application should allow several users to talk in a chatroom and also to get stock quotes
from an API using a specific command.
	
## Technologies
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
On first installation a user needs to be registered to start using the chat

This app will be a consumer of messages with topic 'chatbot'