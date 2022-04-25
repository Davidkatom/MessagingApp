
import { useState, useCallback, useEffect, Component } from 'react';
import SendPhoto from './AttachmentElements/SendPhoto'
import SendAudio from './AttachmentElements/SendAudio'
import MessageElm from './AttachmentElements/MessageElm.js'
import ContactSide from './ChatComponents/ContactSide';
import { ImAttachment } from 'react-icons/im';
import { RiCloseCircleLine } from 'react-icons/ri';
import { AiOutlineCamera, AiFillVideoCamera } from 'react-icons/ai';
import { BiMicrophone } from 'react-icons/bi';
import CurrentContact from './ChatComponents/CurrentContact';
import SendVideo from './AttachmentElements/SendVideo';
import AddNewContact from './ChatComponents/AddNewContact';
import { useNavigate } from 'react-router-dom';

var checked = false


const ChatScreen = ({ current_user }) => {
    const navigate = useNavigate();
    const refresh = useCallback(() => navigate('/', { replace: true }), [navigate]);




    const [buttonSend, setButtonSend] = useState(null)
    const [sendingRef, setsendingRef] = useState(null)

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
    function messageElements() {
        console.log(this.state)
        console.log('1')
        const isBlocked = this.state;
        console.log('2')

        if (isBlocked) {

            console.log('blocked');
        }
        this.setState(
            console.log('a'),
            prevState => ({ isCollapsed: !prevState.isCollapsed }),
            () => {
                console.log('isCollapsed: ' + this.state.isCollapsed);
                console.log('done1');
            }
        );
        // Always this line is fired first
        console.log('done2');

    }


    var date1 = new Date();
    var date2 = new Date();
    date2.setDate(date2.getDate() - 1);
    var date3 = new Date();
    date3.setMinutes(date3.getMinutes() - 12);
    var emptyMsg = <MessageElm direction="send" src={'empty chat'} timeStamp={null} messagetype='text' />;
    const [contact_list, setContact_List] = useState([
        {
            contact_name: 'omer',
            chat_history: [(<MessageElm direction="send" src={'hello'} timeStamp={date2} messagetype='text' />), (<MessageElm direction="receive" src={'שלום בחזרה'} timeStamp={date1} messagetype='text' />)],
            last_message: (<MessageElm direction="receive" src={'second hello'} timeStamp={date1} messagetype='text' />),
        },
        {
            contact_name: 'david',
            chat_history: [(<MessageElm direction="send" src={'cake.jpg'} timeStamp={date2} messagetype='image' />), (<MessageElm direction="receive" src={'Still Alive.mp4'} timeStamp={date1} messagetype='video' />)],
            last_message: (<MessageElm direction="send" src={'Still Alive.mp4'} timeStamp={date2} messagetype='video' />),
        },
        {
            contact_name: 'joe',
            chat_history: [(<MessageElm direction="receive" src={'Turret Im Different.mp3'} timeStamp={date3} messagetype='audio' />), (<MessageElm direction="send" src={'לוזר'} timeStamp={date2} messagetype='text' />)],
            last_message: (<MessageElm direction="send" src={'לוזר'} timeStamp={date2} messagetype='text' />),
        },
        {
            contact_name: 'yossi',
            chat_history: [],
            last_message: emptyMsg,
        },
        {
            contact_name: 'Hampti',
            chat_history: [],
            last_message: emptyMsg,
        },
        {
            contact_name: 'Dampti',
            chat_history: [],
            last_message: emptyMsg,
        },
        {
            contact_name: 'Tidididam',
            chat_history: [],
            last_message: emptyMsg,
        },
        {
            contact_name: 'UmcoolTum',
            chat_history: [],
            last_message: emptyMsg,
        }
    ]);


    function resolveAfter2Seconds(x) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(x);
          }, 2000);
        });
      };
    const sendText = async () => {
        var input = document.getElementById('message').value
        if (input != "") {
            var elm = (<MessageElm direction="send" src={input} timeStamp={new Date()} messagetype='text' />)
            let b = await setMessages([...messages, elm])
            console.log('omer start')
            let a = await resolveAfter2Seconds(20)
            // messageElements()
            console.log('omer finish')

        }
        document.getElementById('message').value = ""
        //console.log(document.getElementById('chatbox').scrollHeight)
    }

    const sendMedia = (messageType) => {
        return () => {
            const element = document.getElementById('media-to-send')
            var elm = (<MessageElm direction="send" src={element.src} timeStamp={new Date()} messagetype={messageType} />)
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
        // make sure a user is logged in - otherwise redirect to login page
        document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;
        if (current_user == "No UserName") {
            refresh()
        }
    });

    const [curernt_Contact_name, set_contact_name] = useState("-");

    //update the contact list when a new message sent/recived
    const contact_chat_change = (cahnged_contact) => {
        contact_list.map((contact_item) => {
            if (contact_item.contact_name === cahnged_contact) {
                if (messages.length > 0) { contact_item.last_message = messages[messages.length - 1] }
                contact_item.chat_history = messages
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
        document.getElementById("message").value = ''

        set_contact_name(contact.contact_name)
        setMessages(contact.chat_history)
        document.getElementById('ChatSide').classList.remove('collapse')
        resetSendMedia()
    }

    const resetSendMedia = () => {
        document.getElementById('media-to-send').src = ""
        document.getElementById('media-to-send').classList.add('collapse')
        document.getElementById('send_button').classList.add('collapse');
        document.getElementById('send_button').value = ""
        setsendingRef(null)
    }
    //add a new contact to the contact list
    const addContact = (newContactName) => {
        //check if newContactName is already in the contact list
        if (newContactName.length < 1) { return 'Please enter a valid name' }
        var isExists = false
        contact_list.map((contact_item) => {
            if (contact_item.contact_name === newContactName) {
                isExists = true
            }
        })
        if (isExists) { return 'User already in contact list' }
        let new_contact = {
            contact_name: newContactName,
            chat_history: [],
            last_message: emptyMsg,
            // last_message_time: null
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
                            <img className="float-start img-thumbnail rounded-start right-padding-for-picture" src={current_user.picture} alt="user-profile-picture" />
                            <h2 className="card-title">{current_user.display_name}</h2>
                        </div>
                        <div className="col-6 align-right">
                            <AddNewContact addContact={addContact} />
                            {/* <button className="btn btn-light " title="add contact" onClick={() => addContact({ name: 'oo' })} ><RiContactsLine /></button> */}

                        </div>
                    </div>
                </div>
                <CurrentContact contact_name={curernt_Contact_name} />
                <ContactSide args={{ contact_list: contact_list, selectContact: selectContact }} />
                <div className="col-sm chat-space collapse" id='ChatSide'>
                    <div className="chat-box scrollable" id="chatbox">
                        {messages}
                    </div>
                    <div className="toolbar row row-cols-3">
                        <div className='col-1'>
                            <div>
                                <button className="btn btn-light" id="attach" onClick={toggle}><ImAttachment /></button>
                                <button className={classes} type="checkbox" id='photo' data-bs-toggle="modal" data-bs-target="#PopupModal" onClick={() => {
                                    setsendingRef((<SendPhoto />))
                                    setButtonSend(() => sendMedia("image"))
                                }}  > <AiOutlineCamera /></button>
                                <button className={classes} type="checkbox" id='video' data-bs-toggle="modal" data-bs-target="#PopupModal" onClick={() => {
                                    setsendingRef((<SendVideo />))
                                    setButtonSend(() => sendMedia("video"))
                                }}><AiFillVideoCamera /></button>
                                <button className={classes} type="checkbox" id='audio' data-bs-toggle="modal" data-bs-target="#PopupModal" onClick={() => {
                                    setsendingRef((<SendAudio />))
                                    setButtonSend(() => sendMedia("audio"))
                                }}><BiMicrophone /></button>
                                <button className={classes} type="checkbox" id='close' onClick={toggle}><RiCloseCircleLine /></button>
                            </div>
                        </div>
                        <div className='col-9'>
                            <input type="text" className="form-control" placeholder="message" id='message' onKeyDown={(e) => { e.key == 'Enter' && sendText() }} />
                        </div>
                        <div className='col-1'>
                            <input type="submit" value="Send" className="btn btn-primary" onClick={sendText} id='send' />
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