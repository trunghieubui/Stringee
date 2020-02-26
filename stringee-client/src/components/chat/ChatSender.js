import React from 'react';
import ReactDOM from 'react-dom';
import styles  from './chat.css';

class ChatSender extends React.Component {
    constructor(props) {
        super(props);
        console.error("message " + this.props.message);

    }
    render() {
        return <div className="container">
            <p>{this.props.message}</p>
            {/* <span className="time-right">11:00</span> */}
        </div>;
    }
}

export default ChatSender;