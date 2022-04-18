
import { useState, useRefm, useEffect } from 'react';
import SendPhoto from './SendPhoto'
import SendAudio from './SendAudio'
import ImageElm from './ImageElm';
import Button from './Button';
import MessageElm from './MessageElm.js'
import ContactSide from './ContactSide';
import { ImAttachment } from 'react-icons/im';
import { RiCloseCircleLine, RiContactsLine } from 'react-icons/ri';
import { AiOutlineCamera, AiFillVideoCamera } from 'react-icons/ai';
import { BiMicrophone } from 'react-icons/bi';
import { GoLocation } from 'react-icons/go';
import TimeStempCalc from '../functions/TimeStempCalc';
import CurrentContact from './CurrentContact';
import VideoElm from './VideoElm';
import SendVideo from './SendVideo';
import AddNewContact from './AddNewContact';
import AudioElm from './AudioElm';

var checked = false
const ChatScreen = ({current_user}) => {


    const [buttonSend, setButtonSend] = useState(null)

    const [sendingRef, setsendingRef] = useState(null)

    const sendAudio = () => { }
    const sendVideo = () => { }
    const sendLocation = () => { }

    const toggle = () => {
        if (checked === false) {
            setClasses("btn btn-light attachments")
        }
        else {
            setClasses("btn btn-light closing-atc")
        }
        checked = !checked
    }

    const [classes, setClasses] = useState("btn btn-light collapse");
    const [messages, setMessages] = useState([]);


    var date1 = new Date();
    var date2 = new Date();
    date2.setDate(date2.getDate() - 1);
    var date3 = new Date();
    date3.setMinutes(date3.getMinutes() - 12);

    const [contact_list, setContact_List] = useState([
        {
            contact_name: 'omer',
            chat_history: [(<MessageElm direction="send" text={'hellow'} timeStamp={date2} />), (<MessageElm direction="receive" text={'second hello'} timeStamp={date1} />)],
            last_message: 'second hello',
            last_message_time: TimeStempCalc(date1),
        },
        {
            contact_name: 'david',
            chat_history: [(<MessageElm direction="send" text={'long live sparta'} timeStamp={date2} />)],
            last_message: 'long live sparta',
            last_message_time: TimeStempCalc(date2),
        },
        {
            contact_name: 'joe',
            chat_history: [(<MessageElm direction="send" text={'long live sparta'} timeStamp={date3} />)],
            last_message: 'empty chat',
            last_message_time: TimeStempCalc(date3),
        },
        {
            contact_name: 'yossi',
            chat_history: [],
            last_message: 'empty chat',
            last_message_time: '',
        },
        {
            contact_name: 'Hampti',
            chat_history: [],
            last_message: 'empty chat',
            last_message_time: '',
        },
        {
            contact_name: 'Dampti',
            chat_history: [],
            last_message: 'empty chat',
            last_message_time: '',
        },
        {
            contact_name: 'Tidididam',
            chat_history: [],
            last_message: 'empty chat',
            last_message_time: '',
        },
        {
            contact_name: 'UmcoolTum',
            chat_history: [],
            last_message: 'empty chat',
            last_message_time: '',
        }
    ]);
    const sendText = () => {
        let input = document.getElementById('message').value
        if (input != "") {
            var elm = (<MessageElm direction="send" text={input} timeStamp={new Date()} />)
            setMessages([...messages, elm])
        }
        document.getElementById('message').value = ""
    }

    const sendMedia = (action) => {
        return () => {
            const element = document.getElementById('media-to-send')            
            switch (action) {
                case 'send_audio':
                    var elm = (<AudioElm direction="send" Src={element.src} timeStamp={new Date()} />)
                    break;
                case 'send_video':
                    var elm = (<VideoElm direction="send" Src={element.src} timeStamp={new Date()} />)
                    console.log("send video")
                    break;
                case 'send_photo':
                    var elm = (<ImageElm direction="send" Src={element.src} timeStamp={new Date()} />)
                    console.log("send photo")
                    break;
            }
            if (!element.classList.contains('collapse')) {
                setMessages([...messages, elm])
                document.getElementById('media-to-send').src = ""
            }
            element.classList.add("collapse")
            document.getElementById('send_button').classList.add('collapse');
            document.getElementById('send_button').value = ""
            setsendingRef(null)
        }      

    }

    useEffect(() => {
        if (messages) {
            contact_chat_change(curernt_Contact_name)
        }
    }, [messages]);

    const [curernt_Contact_name, set_contact_name] = useState("-");

    //update the contact list when a new message sent/recived
    const contact_chat_change = (cahnged_contact) => {
        contact_list.map((contact_item) => {
            if (contact_item.contact_name === cahnged_contact) {
                contact_item.last_message = (messages.length > 0 ? messages[messages.length - 1].props.text : 'empty chat')
                contact_item.chat_history = messages
                contact_item.last_message_time = (messages.length > 0 ? TimeStempCalc(messages[messages.length - 1].props.timeStamp) : '')
            }
        })

        setContact_List(contact_list)
    }
    //select a spescific contact, update current chat history and last message
    const selectContact = (contact) => {
        if (curernt_Contact_name != '-') {
            document.getElementById(curernt_Contact_name).classList.remove('selected-chat')
        }
        document.getElementById(contact.contact_name).classList.add('selected-chat')
        set_contact_name(contact.contact_name)
        setMessages(contact.chat_history)
    }
    //add a new contact to the contact list
    const addContact = (newContactName) => {
        //check if newContactName is already in the contact list
        if(newContactName.length <1){ return 'Please enter a valid name'}
        var isExists = false
        contact_list.map((contact_item) => {
            if (contact_item.contact_name === newContactName) {
                isExists = true
            }
        })
        if(isExists){return 'User already in contact list'}
        let new_contact = {
            contact_name: newContactName,
            chat_history: [],
            last_message: 'empty chat',
            last_message_time: ''
        }
        setContact_List([...contact_list, new_contact])
        return 'success'
    }

    return (

        <div className='container large'>
            <div className="row row-chat">
                <div className="col-5">
                    <div className="row row-chat">
                        <div className="col-6">
                            <img className="float-start img-thumbnail rounded-start right-padding-for-picture" src={require('../../src/Images/blank-profile-picture.png')} alt="user-profile-picture" />
                            <h2 className="card-title">{current_user}</h2>
                        </div>
                        <div className="col-6 align-right">
                            <AddNewContact addContact={addContact} />
                            {/* <button className="btn btn-light " title="add contact" onClick={() => addContact({ name: 'oo' })} ><RiContactsLine /></button> */}

                        </div>
                    </div>
                </div>
                <CurrentContact contact_name={curernt_Contact_name} />
                <ContactSide args={{ contact_list: contact_list, selectContact: selectContact }} />
                <div className="col-sm chat-space">
                    <div className="chat-box scrollable">
                        {messages}
                    </div>
                    <div className="toolbar row row-cols-3">
                        <div className='col-1'>
                            <div>
                                <button className="btn btn-light" id="attach" onClick={toggle}><ImAttachment /></button>
                                <button className={classes} type="checkbox" id='photo' data-bs-toggle="modal" data-bs-target="#PopupModal" onClick={() => {
                                    setsendingRef((<SendPhoto />))
                                    setButtonSend(() => sendMedia("send_photo"))
                                }}  > <AiOutlineCamera /></button>
                                <button className={classes} type="checkbox" id='video' data-bs-toggle="modal" data-bs-target="#PopupModal" onClick={() => {
                                    setsendingRef((<SendVideo />))
                                    setButtonSend(() => sendMedia("send_video"))
                                }}><AiFillVideoCamera /></button>
                                <button className={classes} type="checkbox" id='audio' data-bs-toggle="modal" data-bs-target="#PopupModal" onClick={() => {
                                    setsendingRef((<SendAudio />))
                                    setButtonSend(() => sendMedia("send_audio"))
                                }}><BiMicrophone /></button>
                                <button className={classes} type="checkbox" id='close' onClick={toggle}><RiCloseCircleLine /></button>
                            </div>
                        </div>
                        <div className='col-9'>
                            <input type="text" className="form-control" placeholder="text" id='message' />
                        </div>
                        <div className='col-1'>
                            <Button label='Send' classy="btn btn-primary" onClick={sendText} id='send_button' />
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="PopupModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {sendingRef}
                        <button className="btn btn-primary collapse" onClick={buttonSend} id='send_button' data-bs-dismiss="modal">Send</button>
                    </div>
                </div>
            </div>

        </div>

    )


}


export default ChatScreen