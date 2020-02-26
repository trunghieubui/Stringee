import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {
    StringeeClient,
    StringeeChat
  } from "stringee-chat-js-sdk";
  import { stringeeCreateConversation, stringeeGetAccessToken, stringeeGetMessage, stringeeSendMessage } from './stringee/session';
  import ChatSender from './components/chat/ChatSender';
  import Menu from './components/Menu';
  import Chat from './components/chat/Chat';
  
  
  const apiKeySid = 'SKso6nOpBd8dzcojCr79STaxI2KCBnoME';
  const apiKeySecret = 'bkJLZ2NBMmkwbjhQcFczR1Z0NVp2bEliOTNDRDBDMWw=';
  const userId = 'client';
  
  // // global
  var stringeeClient;
  var stringeeChat;

  var data = {
    "userID": 'agent',
    "stringeeClient": null,
    "stringeeChat": null,
    "conversationID": null,
    "message": null
  }

// initiation();


ReactDOM.render(<App data={data}/>, document.getElementById('root'));

// function initiation() {
//     console.log("Hello App CLIENT");
//     test();
  
//     // init
//     stringeeClient = new StringeeClient();
//     stringeeSettingClientEvents(stringeeClient);
//     data.stringeeClient = stringeeClient;
  
//     var access_token = stringeeGetAccessToken(userId, apiKeySid, apiKeySecret);
//     console.log(access_token);
  
//     stringeeClient.connect(access_token);
//     stringeeChat = new StringeeChat(stringeeClient);
//     data.stringeeChat = stringeeChat;
  
//     stringeeSettingChatEvents(stringeeChat);
  
//     console.log(data);
// }

function test() {
    console.log("hello index");
}

// events for website
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

export {test};
export {openForm, closeForm};


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
