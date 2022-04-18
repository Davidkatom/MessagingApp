
import { useState } from 'react';
import MiniContant from './MiniContant';
import '../index.css';
import Button from './Button';
import MessageElm from './MessageElm.js'
import ContactSide from './ContactSide';
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
            chat_history: [(<MessageElm direction="send" text={'hellow'} />), (<MessageElm direction="receive" text={'second hello'} />)],
            last_message: 'Omer like to talk about his life',
            last_message_time: '2 minutes ago',
        },
        {
            contact_name: 'david',
            chat_history: [(<MessageElm direction="send" text={'fuck you david!'} />)],
            last_message: 'David loves to eat food and drink beer',
            last_message_time: 'empty time',
        },
        {
            contact_name: 'joe',
            chat_history: [],
            last_message: 'empty chat',
            last_message_time: 'empty time',
        },
        {
            contact_name: 'yossi',
            chat_history: [],
            last_message: 'empty chat',
            last_message_time: 'empty time',
        },
        {
            contact_name: 'Hampti',
            chat_history: [],
            last_message: 'empty chat',
            last_message_time: 'empty time',
        },
        {
            contact_name: 'Dampti',
            chat_history: [],
            last_message: 'empty chat',
            last_message_time: 'empty time',
        },
        {
            contact_name: 'Tidididam',
            chat_history: [],
            last_message: 'empty chat',
            last_message_time: 'empty time',
        },
        {
            contact_name: 'UmcoolTum',
            chat_history: [],
            last_message: 'empty chat',
            last_message_time: 'empty time',
        }
    ]);

    //select a spescific contact
    const selectContact = (contact) => {
        setMessages(contact.chat_history)
    }
    //add a new contact to the contact list
    const addContact = (args) => {
        setContact_List([...contact_list, {
            contact_name: args.name,
            chat_history: args.chat_history,
            last_message: args.last_message,
            last_message_time: args.last_message_time,
        }])
    }
    return (

        <div className='container large'>

            <div className="row row-chat">
                <button onClick={() => addContact({ name: 'oo' })} >dsad</button>

                <ContactSide args={{ contact_list: contact_list, selectContact: selectContact }} />
                <div className="col-sm chat-space">
                    <div className="chat-box scrollable">
                        {messages}
                    </div>
                    <div className="toolbar row row-cols-3">
                        <div className='col-1'>
                            <button className="btn btn-light" id="attach" onClick={toggle}><ImAttachment />

                                <button className={classes} type="checkbox" id='photo' ><AiOutlineCamera /></button>
                                <button className={classes} type="checkbox" id='video'><AiFillVideoCamera /></button>
                                <button className={classes} type="checkbox" id='audio'><BiMicrophone /></button>
                                <button className={classes} type="checkbox" id='location'><GoLocation /></button>
                                <button className={classes} type="checkbox" id='close'><RiCloseCircleLine /></button>
                            </button>
                        </div>
                        <div className='col-9'>
                            <input type="text" className="form-control" placeholder="text" id='message' />
                        </div>
                        <div className='col-1'>
                            <Button label='Send' classy="btn btn-primary" onClick={sendBut} id='send_button' />
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )

}


export default ChatScreen