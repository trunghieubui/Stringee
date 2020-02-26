import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import {
  StringeeClient,
  StringeeChat
} from "stringee-chat-js-sdk";
import { test, openForm, closeForm } from '.';
import { stringeeCreateConversation, stringeeGetAccessToken, stringeeGetMessage, stringeeSendMessage } from './stringee/session';
import ChatSender from './components/chat/ChatSender';
import Menu from './components/Menu';
import Chat from './components/chat/Chat';


const apiKeySid = 'SKso6nOpBd8dzcojCr79STaxI2KCBnoME';
const apiKeySecret = 'bkJLZ2NBMmkwbjhQcFczR1Z0NVp2bEliOTNDRDBDMWw=';
const userId = 'agent';

// // global
var stringeeClient;
var stringeeChat;

// converstation id
var conversationID = null;

// var listMessages = [];

var messageInfo = {
  "type": null,
  "message": null
}

var data = {
  "userID": 'agent',
  "stringeeClient": null,
  "stringeeChat": null,
  "conversationID": null,
  "message": null
}

class App extends React.Component {

  constructor(props) {
    super(props);
    // this.stringeeSettingClientEvents = this.stringeeSettingClientEvents.bind(this);
    // this.stringeeSettingChatEvents = this.stringeeSettingChatEvents.bind(this);

    this.state = {
      listMessages: []
    };
  }

  componentDidMount() {
    console.log("Hello App CLIENT");
    test();

    // init
    stringeeClient = new StringeeClient();
    this.stringeeSettingClientEvents(stringeeClient);
    data.stringeeClient = stringeeClient;

    var access_token = stringeeGetAccessToken(userId, apiKeySid, apiKeySecret);
    console.log(access_token);

    stringeeClient.connect(access_token);
    stringeeChat = new StringeeChat(stringeeClient);
    data.stringeeChat = stringeeChat;

    this.stringeeSettingChatEvents(stringeeChat);

    console.log(data);
  }

  stringeeSettingChatEvents = (chat) => {
    var list = [];
    chat.on('onObjectChange', function (info) {
      console.log('RECEIVED ONOBJECTCHANGE EVENT --- ' + JSON.stringify(info));
      if (info == null) {
        return null;
      } else {
        // decode to get conversationID
        // return JSON.stringify(info);
        var obj = JSON.parse(JSON.stringify(info));
        var objectType = obj.objectType;
        if (objectType == 0) {
          // conversation
          data.conversationID = obj.objectChanges[0].id
          console.log(data.conversationID);

        } else if (objectType == 1) {
          // message
          // check conversationID
          // if (data.conversationID == obj.objectChanges[0].conversationId) {
          // check message send successful
          var success = obj.objectChanges[0].id;
          if (success == null) {
            // have not sent yet
            console.log("wait for sending successful");
          } else {
            // check message sent to agent
            if (obj.objectChanges[0].state == 2) {
              // stringee
              console.log("message sent to Stringee server");
            } else if (obj.objectChanges[0].state == 3) {
              console.log("message sent to your friend");
              // get message
              var message = obj.objectChanges[0].content.content;
              var sender = obj.objectChanges[0].sender;
              if (message !== "" && message !== null) {
                var type;
                if (sender == userId) type = 1;
                else type = 2;
                var messageInfo = {
                  "type": type,
                  "message": message
                }

                list.push(messageInfo);

                // render html
                ReactDOM.render(<Chat listMessage={list} />, document.getElementById('chat'));
              }

            }
          }
        }
      }
      // }  
    });
  }


  stringeeSettingClientEvents(client) {
    client.on('connect', function () {
      console.log('connected to StringeeServer');
    });

    client.on('authen', function (res) {
      console.log('authen: ', res);
    });

    client.on('authensuccess', function (res) {
      console.log('authen: ', res);
    });

    client.on('disconnect', function () {
      console.log('disconnected');
    });

    client.on('requestnewtoken', function () {
      console.log('request new token; please get new access_token from YourServer and call client.connect(new_access_token)');
      //please get new access_token from YourServer and call: 
      //client.connect(new_access_token);
    });

    client.on('otherdeviceauthen', function (data) {
      console.log('otherdeviceauthen: ', data);
    });
  }


  render() {
    return (

      <div>
        <h2>Popup Chat Window</h2>
        <p>Click on the button at the bottom of this page to open the chat form.</p>
        <p>Note that the button and the form is fixed - they will always be positioned to the bottom of the browser window.</p>

        <button className="open-button" onClick={openForm}>Chat</button>

        <div className="chat-popup" id="myForm">
          {/* menu */}
          <div id="menu">
            <Menu />

          </div>
          {/* chat */}

          <div style={{ height: '40%', overflowY: 'scroll' }} >
            <div id="chat">
              <Chat listMessage={this.state.listMessages} />
            </div>
          </div>

          {/* input */}
          <div id="input">
            <form action="/action_page.php" className="form-container" onSubmit="return false;">
              <h1>Chat</h1>

              <label htmlFor="msg"><b>Message</b></label>
              {/* <textarea id="text" placeholder="Type message.." name="msg" required></textarea> */}
              <input type="text" placeholder="Type message.." id="text" required></input>
              <button as="input" type="button" className="btn" onClick={() => stringeeCreateConversation(data)}>Create</button>
              <button type="button" className="btn" onClick={() => stringeeGetMessage(data)}>Get</button>
              <button type="button" className="btn" onClick={() => {
                data.message = document.getElementById("text").value;
                if (data.conversationID == null || data.conversationID == 'undefined') {
                  stringeeCreateConversation(data);
                  setTimeout(function () {
                    console.log(data);
                    stringeeSendMessage(data)
                  }, 1000);
                } else {
                  console.log(data);
                  stringeeSendMessage(data)
                }
              }}>Send</button>

              <button type="button" className="btn cancel" onClick={closeForm}>Close</button>
            </form>
          </div>


        </div>
      </div>
    )
  }
}



export default App;
