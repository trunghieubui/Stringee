import React from 'react';
import ReactDOM from 'react-dom';
import styles from './chat.css';

class ChatReceiver extends React.Component {
    constructor(props) {
        super(props);
        console.error("message " + this.props.message);

    }
    render() {
        return (<div class="container darker">
            {/* <p style={{width:"50px"}}>Hey! I'm fine. Thanks for askingdgdrgdrgdghrdhshsrhsedrh hsrhseh!</p>
            <span class="time-left">11:01</span> */}
            <p>{this.props.message}</p>

        </div>
        )
    }
}

export default ChatReceiver;