
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
    const [contact_side, set_contact_side] = useState({});
    const [refreshed_contact, set_refreshed_contact] = useState(false);


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



    var date1 = new Date();
    var date2 = new Date();
    date2.setDate(date2.getDate() - 1);
    var date3 = new Date();
    date3.setMinutes(date3.getMinutes() - 12);
    var emptyMsg = <MessageElm direction="send" src={'empty chat'} timeStamp={null} messagetype='text' />;
    const [contact_list, setContact_List] = useState({
        "omer": {
            user_name: 'omer',
            contact_name: 'omer',
            chat_history: [(<MessageElm direction="send" src={'hello'} timeStamp={date2} messagetype='text' />), (<MessageElm direction="receive" src={'שלום בחזרה'} timeStamp={date1} messagetype='text' />)],
            last_message: (<MessageElm direction="receive" src={'שלום בחזרה'} timeStamp={date1} messagetype='text' />),
            picture: "omer.png",
        },
        "david": {
            user_name: 'david',
            contact_name: 'david',
            chat_history: [(<MessageElm direction="send" src={'cake.jpg'} timeStamp={date2} messagetype='image' />), (<MessageElm direction="receive" src={'Still Alive.mp4'} timeStamp={date1} messagetype='video' />)],
            last_message: (<MessageElm direction="send" src={'sent video'} timeStamp={date2} messagetype='text' />),
            picture: "david.png",
        },
        "joe": {
            user_name: 'joe',
            contact_name: 'joe',
            chat_history: [(<MessageElm direction="receive" src={'Turret Im Different.mp3'} timeStamp={date3} messagetype='audio' />), (<MessageElm direction="send" src={'לוזר'} timeStamp={date2} messagetype='text' />)],
            last_message: (<MessageElm direction="send" src={'לוזר'} timeStamp={date2} messagetype='text' />),
            picture: "blank-profile-picture.png",
        },
        "yossi": {
            user_name: 'yossi',
            contact_name: 'yossi',
            chat_history: [],
            last_message: emptyMsg,
            picture: "blank-profile-picture.png",
        },
        "Hampti": {
            user_name: 'Hampti',
            contact_name: 'Hampti',
            chat_history: [],
            last_message: emptyMsg,
            picture: "blank-profile-picture.png",
        },
        "Dampti": {
            user_name: 'Dampti',
            contact_name: 'Dampti',
            chat_history: [],
            last_message: emptyMsg,
            picture: "blank-profile-picture.png",
        },
    });

    const sendText = () => {
        var input = document.getElementById('message').value
        if (input != "") {
            var elm = (<MessageElm direction="send" src={input} timeStamp={new Date()} messagetype='text' />)
            setMessages([...messages, elm])
            selected_contact.chat_history.push(elm)
            selected_contact.last_message = elm
        }
        document.getElementById('message').value = ""
    }

    const clearMedia = () => {
        const element = document.getElementById('media-to-send')
        element.classList.add("collapse")
        document.getElementById('send_button').classList.add('collapse');
        document.getElementById('send_button').value = ""
        setsendingRef(null)

    }
    const sendMedia = (messageType) => {
        return () => {
            const element = document.getElementById('media-to-send')
            var elm = (<MessageElm direction="send" src={element.src} timeStamp={new Date()} messagetype={messageType} />)
            if (!element.classList.contains('collapse')) {
                setMessages([...messages, elm])
                selected_contact.chat_history.push(elm)
                selected_contact.last_message = <MessageElm direction="send" src={"sent " + messageType} timeStamp={new Date()} messagetype="text" />
                document.getElementById('media-to-send').src = ""
            }
            clearMedia()
        }

    }

    useEffect(() => {
        setContact_List(contact_list)
        if (messages) {
            contact_chat_change(selected_contact.contact_name)
        }
        //set scrolling correctly
        document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;
        // make sure a user is logged in - otherwise redirect to login page
        if (current_user == "No UserName") {
            refresh()
        }
    });

    const [selected_contact, set_selected_contact] = useState("");
    //update the contact list when a new message sent/recived
    const contact_chat_change = (cahnged_contact) => {
        setContact_List(contact_list)
    }
    //select a spescific contact, update current chat history and last message
    const selectContact = (contact) => {
        if (selected_contact != '') {
            document.getElementById(selected_contact.contact_name).classList.remove('selected-chat')
        }
        var temp_contact = document.getElementById(contact.contact_name)
        if (temp_contact != null) {
            document.getElementById(contact.contact_name).classList.add('selected-chat')
        }
        document.getElementById("message").value = ''

        set_selected_contact(contact)
        setMessages(contact.chat_history)
        document.getElementById('ChatSide').classList.remove('collapse')
        document.getElementById("selected-contact-image").classList.remove('collapse')
        resetSendMedia()
    }

    const resetSendMedia = () => {
        var media = document.getElementById('media-to-send')
        if (media != null) {
            document.getElementById('media-to-send').src = ""
            document.getElementById('media-to-send').classList.add('collapse')
        }
        document.getElementById('send_button').classList.add('collapse');
        document.getElementById('send_button').value = ""
        setsendingRef(null)
    }

    //add a new contact to the contact list
    const addContact = (newContactName) => {
        //check if newContactName is already in the contact list
        if (newContactName.length < 1) { return 'Please enter a valid name' }
        if (newContactName in contact_list) { return 'User already in contact list' }

        var temp = contact_list
        temp[newContactName] = {
            contact_name: newContactName,
            chat_history: [],
            last_message: emptyMsg,
            picture: "blank-profile-picture.png",
        }
        setContact_List(temp)
        set_refreshed_contact(!refreshed_contact)
        return 'success'
    }
    useEffect(() => {
        console.log("contact_list")
    }, [contact_list]);


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
                        </div>
                    </div>
                </div>
                <CurrentContact contact={selected_contact} />
                <ContactSide contact_list={contact_list} selectContact={selectContact} key={refreshed_contact} />
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

            <div className="modal fade" id="PopupModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <button type="button" class="btn-close" onClick={clearMedia} id = "close-button" data-bs-dismiss="modal"></button>
                        {sendingRef}
                        <button className="btn btn-primary collapse" onClick={buttonSend} id='send_button' data-bs-dismiss="modal">Send</button>

                    </div>
                </div>
            </div>

        </div>

    )


}


export default ChatScreen