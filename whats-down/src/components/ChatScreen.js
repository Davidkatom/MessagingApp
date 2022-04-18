import ReactDOM from 'react-dom';

import { useState } from 'react';
import MiniContant from './MiniContant';
import '../index.css';
import Button from './Button';
import MessageElm from './MessageElm.js'

import { ImAttachment } from 'react-icons/im';
import { RiCloseCircleLine } from 'react-icons/ri';
import { AiOutlineCamera } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import { BiMicrophone } from 'react-icons/bi';
import { AiFillVideoCamera } from 'react-icons/ai';


var checked = false
const ChatScreen = () => {
    const toggle = function attach() {
        if (checked === false) {
            setClasses("btn btn-light attachments")
        }
        else {
            setClasses("btn btn-light closing-atc")
        }
        checked = !checked
    }

    const sendBut = function loginButton() {
        let input = document.getElementById('message').value
        if (input != "") {
            var elm = (<MessageElm direction="send" text={input} />)
            setMessages([...messages, elm])
        }
        document.getElementById('message').value = ""

    }
    const [classes, setClasses] = useState("btn btn-light collapse");
    const [messages, setMessages] = useState([]);
    const [contact_list, setContact_List] = useState([
        {
            contact_name: 'omer',
            chat_history: ["hello", "hi", "how are you"],
            last_message: 'Omer like to talk about his life',
            last_message_time: '2 minutes ago',
        },
        {
            contact_name: 'david',
            chat_history: ["good morning", "bye", "fuck you"],
            last_message: 'David loves to eat food and drink beer',
            last_message_time: 'empty time',
        },
        {
            contact_name: 'joe',
            chat_history: ["good morning", "bye", "fuck you"],
            last_message: 'empty chat',
            last_message_time: 'empty time',
        },
        {
            contact_name: 'yossi',
            chat_history: ["good morning", "bye", "fuck you"],
            last_message: 'empty chat',
            last_message_time: 'empty time',
        },
        {
            contact_name: 'Hampti',
            chat_history: ["good morning", "bye", "fuck you"],
            last_message: 'empty chat',
            last_message_time: 'empty time',
        },
        {
            contact_name: 'Dampti',
            chat_history: ["good morning", "bye", "fuck you"],
            last_message: 'empty chat',
            last_message_time: 'empty time',
        },
        {
            contact_name: 'Tidididam',
            chat_history: ["good morning", "bye", "fuck you"],
            last_message: 'empty chat',
            last_message_time: 'empty time',
        },
        {
            contact_name: 'UmcoolTum',
            chat_history: ["good morning", "bye", "fuck you"],
            last_message: 'empty chat',
            last_message_time: 'empty time',
        }
    ]);

    //add a new contact to the contact list
    const addContact = (args) => {
        setContact_List([...contact_list, {
            contact_name: args.user_name,
            chat_history: args.password,
            last_message: args.display_name,
            last_message_time: args.picture,
        }])
        return 'success'
    }
    var newGuy = {
        contact_name: 'newGuy',
        chat_history: ["good morning", "bye", "fuck you"],
        last_message: 'empty chat',
        last_message_time: 'empty time',
    }
    return (

        <div class='container large'>

            <div class="row row-chat">
                <div class="col-5 scrollable" >
                    <div class='direction-fix'>

                        {contact_list.map((contactIndex) => (
                            <MiniContant contact={contactIndex} />
                        ))}
                    </div>
                </div>
                <div class="col-sm chat-space">
                    <div class="chat-box scrollable">
                        {messages}
                    </div>
                    <div class="toolbar row row-cols-3">
                        <div class='col-1'>
                            <button class="btn btn-light" id="attach" onClick={toggle}><ImAttachment />

                                <button class={classes} type="checkbox" id='photo' ><AiOutlineCamera /></button>
                                <button class={classes} type="checkbox" id='video'><AiFillVideoCamera /></button>
                                <button class={classes} type="checkbox" id='audio'><BiMicrophone /></button>
                                <button class={classes} type="checkbox" id='location'><GoLocation /></button>
                                <button class={classes} type="checkbox" id='close'><RiCloseCircleLine /></button>
                            </button>
                        </div>
                        <div class='col-9'>
                            <input type="text" class="form-control" placeholder="text" id='message' />
                        </div>
                        <div class='col-1'>
                            <Button label='Send' classy="btn btn-primary" onClick={sendBut} id='send_button' />
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )

}


export default ChatScreen