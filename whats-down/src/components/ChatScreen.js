import { useState, useCallback, useEffect } from 'react';
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
import $ from 'jquery';

var checked = false


const ChatScreen = ({ token }) => {
    // console.log('render')
    //console.log(token)
    var emptyMsg = <MessageElm direction="send" src={'empty chat'} timeStamp={null} messagetype='text' />;
    //fetch function for a specific contact's messages from server:
    async function fetchChatByContactId(Contact_id){
        console.log('messages load for: '+Contact_id);
        var a =$.ajax({
            url: 'https://localhost:7144/api/Contacts/'+Contact_id+'/messages',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            data:{},
            success: function (data) {
                console.log('messages loaded are: '+data);
                console.log(data);
                return data;
            },
            error: function (data) {
                console.log("failed getting messages");
                return null;
            }
        });
        console.log('a: ')
        console.log(await a.json)

    }
    



    //fetch Cuurent User
    const [current_user, set_current_user] = useState('No UserName');
    useEffect( () => {
        async function fetchMe(){
            console.log('fetch Users')
            const res = await fetch('https://localhost:7144/api/Users');
            const data = await res.json();
            // console.log(res.status);
            // console.log(data);   
            set_current_user(data);
            console.log(current_user)     
            console.log(current_user[0].id)     
            console.log("Step 2 for authorized:")
            //--------------------------
            const res2 = await fetch('https://localhost:7144/WeatherForecast');
            console.log("Whether Request:")     
            console.log(res2)     
            console.log('Status is: '+res2.status)     
            const data2 = await res.json();
            console.log("Whether:")     
            console.log(data2)     
        }
        // fetchMe();
        async function GetMeFunc(){
            $.ajax({
                url: 'https://localhost:7144/api/Users/Me',
                type: 'GET',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },  
                data:{},
                success: function (data) {
                    console.log('User loaded is: '+data);
                    set_current_user({
                    user_name: data,
                    display_name: "nickname",
                    picture: "picture",
                })
                },
                error: function (data) {
                    console.log("failed getting userMe");
                }
            });
        }
        GetMeFunc();
        },[])

    //fetch contacts to contact list
    const [contact_list, setContact_List] = useState([]); // will be an array of contact objects without conversations
    //var init_contact_list =current_user === 'No UserName'? []:current_user.contact_list;
    useEffect( () => {
        async function fetchContactList(){
            $.ajax({
                url: 'https://localhost:7144/api/Contacts',
                type: 'GET',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },  
                data:{},
                success: function (data) {
                        setContact_List(data);
                    // console.log('contact list set!');
                    // console.log('add here chat loading for each contact')
                    for (const [key, value] of Object.entries(data)) {
                    // console.log(key, value);
                }
                },
                error: function (data) {
                    console.log("failed getting Contacts");
                }
            });
        }
        fetchContactList();
    },[])
    
    //fetch conversations
    const [conversation_list, setConversation_List] = useState(); // will be an array of conversation objects
    /*
    useEffect(async () => {
        var dict = [];
        contact_list.array.forEach(element => {
            //TODO: add here awaits for each conversation
            console.log('loading conversation for ' + element.user_name);
            console.log('fetching from: '+'https://localhost:7144/api/Contacts/'+element.contactId+ '/messages')
            const res =  fetch('https://localhost:7144/api/Contacts/'+element.contactId+ '/messages', {
                method: 'GET',});
            const data =  res.json();
            console.log('messages data'+data);
            setContact_List(data);
            dict.push({
                key: element.user_name,
                value: data
            });
        });
    },)*/

    const navigate = useNavigate();
    const refresh = useCallback(() => navigate('/', { replace: true }), [navigate]);
    const [refreshed_contact, set_refreshed_contact] = useState(false);

    const [buttonSend, setButtonSend] = useState(null)
    const [sendingRef, setsendingRef] = useState(null)
    //check
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




    const sendText = () => {
        var input = document.getElementById('message').value
        if (input !== "") {
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
        if (messages) {
            contact_chat_change(selected_contact.display_name)
        }
        //set scrolling correctly
        document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;
    });

    const [selected_contact, set_selected_contact] = useState("");
    //update the contact list when a new message sent/recived
    const contact_chat_change = (cahnged_contact) => {
        setContact_List(contact_list)
    }
    //select a spescific contact, update current chat history and last message
    const  selectContact = async (contact) => {
        console.log('Contact id selected: '+contact)
        if (selected_contact !== '') {
            document.getElementById(selected_contact).classList.remove('selected-chat') //remove eselection
        }
        document.getElementById(contact).classList.add('selected-chat') //add selection
        set_selected_contact(contact)
        document.getElementById("message").value = '' //erase the messageBox when switching contacts
        //setMessages(contact.chat_history)
        var newMessages =await fetchChatByContactId(contact)
        console.log('ahhhhhhhhhhhhhh')
        setMessages(newMessages)
        console.log('newMessages are: '+newMessages)
        setMessages(newMessages)

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
        /*
        //check if newContactName is already in the contact list
        if (newContactName.length < 1) { return 'Please enter a valid name' }
        if (newContactName in contact_list) { return 'User already in contact list' }

        var temp = contact_list
        temp[newContactName] = {
            display_name: newContactName,
            chat_history: [],
            last_message: emptyMsg,
            picture: "blank-profile-picture.png",
        }
        setContact_List(temp)
        set_refreshed_contact(!refreshed_contact)
        return 'success'
        */
    }

    return (

        <div className='container large'>
            <div> Current UserName: {current_user.user_name}</div>
            <div> Current Token: {token}</div>
            <div className="row row-chat">
                <div className="col-5">
                    <div className="row row-chat">
                        <div className="col-6">
                            <img className="float-start img-thumbnail rounded-start right-padding-for-picture" src="omer.png" alt="Profile" />
                            <h2 className="card-title">{current_user.display_name}</h2>
                        </div>
                        <div className="col-6 align-right">
                            <AddNewContact addContact={addContact} />
                        </div>
                    </div>
                </div>
                <CurrentContact contact={selected_contact} />
                <ContactSide contact_list={contact_list} selectContact={selectContact} flag={refreshed_contact} />
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
                            <input type="text" className="form-control" placeholder="message" id='message' onKeyDown={(e) => { e.key === 'Enter' && sendText() }} />
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
                        <button type="button" className="btn-close" onClick={clearMedia} id="close-button" data-bs-dismiss="modal"></button>
                        {sendingRef}
                        <button className="btn btn-primary collapse" onClick={buttonSend} id='send_button' data-bs-dismiss="modal">Send</button>

                    </div>
                </div>
            </div>

        </div>

    )


}


export default ChatScreen