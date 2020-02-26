import React from 'react';
import ReactDOM from 'react-dom';
// import styles from './chat/chat.css';

class Input extends React.Component {
    render() {
        return (
            <div>
                <ul class="social-icons">
                    <li><i class="fab fa-facebook"></i></li>
                    <li><i class="fab fa-twitter-square"></i></li>
                    <li><i class="fab fa-instagram"></i></li>
                    <li><i class="fab fa-google-plus-square"></i></li>
                </ul>
            </div>
        )
    }
}

export default Input;