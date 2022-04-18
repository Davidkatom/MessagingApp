
import { useState, useRef } from 'react';
import MiniContant from './MiniContant';
import SendPhoto from './SendPhoto'
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
    const [sendingRef, setsendingRef] = useState(null)
    const sendPhoto = () => {
        setsendingRef((<SendPhoto />))
        console.log(sendingRef.current)
    }
    const sendAudio = () => { }
    const sendVideo = () => { }
    const sendLocation = () => { }

    const toggle = () => {
        console.log("s")
        if (checked === false) {
            setClasses("btn btn-light attachments")
        }
        else {
            setClasses("btn btn-light closing-atc")
        }
        checked = !checked
    }

    const sendBut = () => {
        let input = document.getElementById('message').value
        if (input != "") {
            var elm = (<MessageElm direction="send" text={input} />)
            setMessages([...messages, elm])
        }
        document.getElementById('message').value = ""

    }

    const sendMed = () => {
        var element = document.getElementById('media-to-send')
        var elm = (<MessageElm direction="send" text={(element)} />)
        setMessages([...messages, elm])        
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
            chat_history: [(<MessageElm direction="send" text={'long live sparta'} />)],
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

    //select a spescific contact, update current chat history and last message
    const selectContact = (contact) => {
        //loop through contact list and deselect all contacts
        var contact_elements = document.getElementsByClassName("contact_selection");
        for (var i = 0, len = contact_elements.length; i < len; i++) {
            contact_elements[i].classList.remove('selected-chat');
        }
        //select the new current contact
        document.getElementById(contact.contact_name).classList.add('selected-chat')



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
                            <div>
                                <button className="btn btn-light" id="attach" onClick={toggle}><ImAttachment /></button>
                                <button className={classes} type="checkbox" id='photo' data-bs-toggle="modal" data-bs-target="#PopupModal" onClick={sendPhoto} ><AiOutlineCamera /></button>
                                <button className={classes} type="checkbox" id='video' data-bs-toggle="modal" data-bs-target="#PopupModal" onClick={sendVideo}><AiFillVideoCamera /></button>
                                <button className={classes} type="checkbox" id='audio' data-bs-toggle="modal" data-bs-target="#PopupModal" onClick={sendAudio}><BiMicrophone /></button>
                                <button className={classes} type="checkbox" id='location' data-bs-toggle="modal" data-bs-target="#PopupModal" onClick={sendLocation}><GoLocation /></button>
                                <button className={classes} type="checkbox" id='close' onClick={toggle}><RiCloseCircleLine /></button>
                            </div>
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

            <div className="modal fade" id="PopupModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {sendingRef}
                        <Button label='Send' classy="btn btn-primary" onClick={sendMed} id='send_button' />
                    </div>
                </div>
            </div>

        </div>

    )


}


export default ChatScreen