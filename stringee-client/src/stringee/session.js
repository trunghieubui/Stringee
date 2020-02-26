import { eventMessage } from './event'
// STRINGEE APIS

function stringeeGetAccessToken(userId, apiKeySid, apiKeySecret) {
    var now = Math.floor(Date.now() / 1000);
    var exp = now + 3600;

    var header = { cty: "stringee-api;v=1" };
    var payload = {
        jti: apiKeySid + "-" + now,
        iss: apiKeySid,
        exp: exp,
        userId: userId
    };

    var jwt = require('jsonwebtoken');
    var token = jwt.sign(payload, apiKeySecret, { algorithm: 'HS256', header: header })
    return token;
}

function stringeeCreateConversation(data) {
    console.log("create conversation");

    var options = {
        name: "Contact to clients",
        isDistinct: false,
        isGroup: false
    };

    data.stringeeChat.createConversation([data.userID], options, (status, code, message, conv) => getConID(status, code, message, conv));

    function getConID(status, code, message, conv) {
        console.log('status:' + status + ' code:' + code + ' message:' + message + ' conv:' + JSON.stringify(conv));
        var obj = JSON.parse(JSON.stringify(conv));
        return obj;
    }

}

function getConversation(data) {
    var count = 50;
    var isAscending = false;

    data.stringeeChat.getLastConversations(count, isAscending, function (status, code, message, convs) {
        console.log('status: ' + status + '  ' + code + ' message:' + message + ' convs:' + JSON.stringify(convs));
    });
}

function stringeeGetMessage(data) {
    console.log("GET");

    var count = 50;
    var isAscending = false;
    var sequence = 1;

    data.stringeeChat.getLastMessages(data.conversationID, count, isAscending, function (status, code, message, msgs) {
        console.log('status:' + status + ' code:' + code + ' message:' + message + ' conv:' + JSON.stringify(msgs));
    });

    data.stringeeChat.getMessagesAfter(data.conversationID, sequence, count, isAscending, function (status, code, message, msgs) {
        console.log('status:' + status + ' code:' + code + ' message:' + message + ' conv:' + JSON.stringify(msgs));
    });

    data.stringeeChat.getMessagesBefore(data.conversationID, sequence, count, isAscending, function (status, code, message, msgs) {
        console.log('status:' + status + ' code:' + code + ' message:' + message + ' conv:' + JSON.stringify(msgs));
    });

    data.stringeeChat.markConversationAsRead(data.conversationID, (status, code, message) => {
        console.log("status-" + status + " code-" + code + " message-" + message);
    });

}

function stringeeSendMessage(data) {
    console.log("SEND");
    console.log("conID " + data.conversationID);

    // Text message
    var txtMsg = {
        type: 1,
        convId: String(data.conversationID),
        message: {
            content:  String(data.message),
            metadata: {
                key: 'value'
            }
        }
    };

    data.stringeeChat.sendMessage(txtMsg, function (status, code, message, msg) {
        console.log(status + code + message + "msg result " + JSON.stringify(msg));
    });
}


export { stringeeCreateConversation, stringeeGetAccessToken, stringeeGetMessage, stringeeSendMessage };