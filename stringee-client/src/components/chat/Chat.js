import React from 'react';
import ReactDOM from 'react-dom';
import styles from './chat.css';
import ChatSender from './ChatSender';
import ChatReceiver from './ChatReceiver';
// import ReactShadowScroll from 'react-shadow-scroll';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        console.error("message chat " + this.props.listMessage);

        var entry;
        for (entry of this.props.listMessage.entries()) {
            console.log(entry);
        }
    }

    _buildIteam({type, message}, index) {
        if (type == 1) {
            // sender
            return <ChatSender message={message}/>
        } else{
            return <ChatReceiver message={message}/>
        } 
    }

    render() {
        return (
            <div styles={{ height: '20%', overflowY: 'scroll' }} style={styles.wrapperDiv}>
                <ul>
                {this.props.listMessage.map(({type, message}, index) => {
                    var listRender = [];
                    // console.log("index: " + index + " type " + type + " message  " + message);
                    if (type == 1) {
                        listRender.push(<ChatSender message={message} key={index}/>)
                    } else{
                        listRender.push(<ChatReceiver message={message} key={index}/>)
                    } 
                    return listRender;
                })}
                </ul>
            </div>
        )
    }
}

export default Chat;