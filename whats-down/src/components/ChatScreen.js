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
import * as signalR from "@microsoft/signalr";
import $ from 'jquery';

var checked = false
var local_server = "https://192.168.1.18:7087"
// var local_server = "http://whatsdown.epizy.com/server/"
var signal_selected_user = ""
var connection = null;


const ChatScreen = ({ token }) => {
    const navigate = useNavigate();
    const refresh = useCallback(() => navigate('/', { replace: true }), [navigate]); //brings back to default home page and refreshes the page
    //token use Effect check if token is null or not
    useEffect(() => {
        fetchContactList()
        if (token === null|| token === undefined|| token ==="") {refresh();}
    }, [token])

    //SignalR Connection
    //const [connection, setConnection] = useState(null);
    
    const [selected_contact, set_selected_contact] = useState("");
    const [messages, setMessages] = useState([]);
    
    
    async function updateChatByContactId(selected = selected_contact ){//update current chat according to the contact id:
        // console.log('update chat for: '+selected);
        if (signal_selected_user !== "") { 
        $.ajax({
            url: local_server+'/api/Contacts/'+selected+'/messages',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            data:{},
            success: function (data) {
                var newMsgs = [];
                for (let i = 0; i < data.length; i++) {
                    newMsgs.push(<MessageElm sent={data[i].sent} src={data[i].content} timeStamp={data[i].created} messagetype={"text"} />)
                }
                setMessages(newMsgs)                             
            },
            error: function (data) {
                console.log("failed getting messages");
                return null;
            }
        })
        }
    }
    useEffect(() => {updateChatByContactId()}, [selected_contact])//useEffect for when contact is changed to update the chat
    //fetch Cuurent User
    const [current_user, set_current_user] = useState('No UserName');
    useEffect( () => {
        /*
        async function fetchMe(){
            console.log('fetch Users')
            const res = await fetch(local_server+'/api/Users');
            const data = await res.json();
            // console.log(res.status);
            // console.log(data);   
            set_current_user(data);
            console.log(current_user)     
            console.log(current_user[0].id)     
            console.log("Step 2 for authorized:")
            //--------------------------
            const res2 = await fetch(local_server+'/WeatherForecast');
            console.log("Whether Request:")     
            console.log(res2)     
            console.log('Status is: '+res2.status)     
            const data2 = await res.json();
            console.log("Whether:")     
            console.log(data2)     
        }
        fetchMe();*/
        async function GetMeFunc(){
            $.ajax({
                url: local_server+'/api/Users/Me',
                type: 'GET',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },  
                data:{},
                success: function (data) {
                    if(data["Error"] !==""  ){
                        console.log(data["Error"]);
                    }else{
                        set_current_user({
                        user_name: data["Id"],
                        display_name: data["NickName"],
                        picture: data["ProfilePicture"],
                        })  
                    }
                },
                error: function (data) {
                    console.log("failed getting userMe");
                }
            });
        }        
        GetMeFunc();
        },[])

    //fetch contacts to contact list
    async function fetchContactList(){
        console.log('fetch Contacts')
        console.log(token)
        $.ajax({
            url: local_server+'/api/Contacts',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },  
            data:{},
            success: function (data) {
                setContact_List(data);
            },
            error: function (data) {
                console.log("failed getting Contacts");
            }
        });
            
        }
        
    const [contact_list, setContact_List] = useState([]); // will be an array of contact objects without conversations
    useEffect( () => {// reselect current chat when contact list is changed
        for (let i = 0; i < contact_list.length; i++) { //remove selection
            let elem =document.getElementById(contact_list[i].id)
            if(elem !== null){ elem.classList.remove('selected-chat')}
        }
        if(selected_contact!=""){selectContact(selected_contact)}
    },[contact_list])
    useEffect( () => { //signalR connection 
        const connectToSignalR = async () => {
            const connect = new signalR.HubConnectionBuilder().withUrl(local_server+"/myHub").configureLogging(signalR.LogLevel.Information).build();
            connect.on("SentMessage", (user, message) => {    
                if(user == signal_selected_user){            
                    updateChatByContactId(user)
                }
                fetchContactList(user)
            });
            connect.on("NewContact", fetchContactList);            
            connect.onreconnected = () => {connect.invoke("Connect", current_user.user_name)};
            await connect.start()
            connection = connect;
            
                      
        }
        connectToSignalR();
        fetchContactList();
    },[])
    
    useEffect( () => { // link connection with active username when connection is established
        if(connection != null && current_user.user_name != null&& contact_list != []){            
            if(connection.state == signalR.HubConnectionState.Connected){
                connection.invoke("Connect", current_user.user_name)
            }
        }
    },[connection, current_user,contact_list])



    const [buttonSend, setButtonSend] = useState(null)
    const [sendingRef, setsendingRef] = useState(null)
    //toggle media buttons
    const [classes, setClasses] = useState("btn btn-light collapse");
    const toggle = () => {
        if (checked === false) {
            setClasses("btn btn-light attachments")
        }
        else {
            setClasses("btn btn-light closing-atc")
        }
        checked = !checked
    }

    function getFullSelectedContact (){return contact_list.find(contact => contact.id === selected_contact);}
    function getFullContact (cont_id){return contact_list.find(contact => contact.id === cont_id);}

    function updateContactLastMsg(contact_id, msg){
        var contact = getFullContact(contact_id);
        contact.last = msg;
        contact.lastdate = new Date();
        var filterd = contact_list.filter(contact => contact.id !== contact_id);
        setContact_List([contact,...filterd]);
    }

    const sendText = () => {
        var input = document.getElementById('message').value
        if (input !== "") {           
            $.ajax({//POST new Message
                url: local_server+'/api/Contacts/'+selected_contact+'/messages',
                type: 'POST',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                data:JSON.stringify({content:input}),
                success: function (data) {
                },
                error: function (data) {
                    console.log("failed sending message");
                    console.log(data);
                    return null;
                }
            }).then(
                setMessages([...messages, <MessageElm sent={true} src={input} timeStamp={new Date()} messagetype={"text"} />])
                ).then(()=>{
                    connection.invoke("SentMessage",current_user.user_name, selected_contact, input)
                })
            $.ajax({//Transfer new Message
                url: getFullSelectedContact().server+'/api/Transfer/',
                type: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data:JSON.stringify({from:current_user.user_name, to:selected_contact, content:input}),
                success: function (data) {
                },
                error: function (data) {
                    console.log("failed transfer message");
                    console.log(data);
                    return null;
                }
            })
            updateContactLastMsg(selected_contact, input)
            
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

    useEffect(() => {//set scrolling correctly
        document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;
    });

    //select a spescific contact, update current chat history and last message
    const  selectContact = async (contact) => {
        connection.invoke("Connect", current_user.user_name)
        if (selected_contact !== '') {
            document.getElementById(selected_contact).classList.remove('selected-chat') //remove eselection
        }
        let elem =  document.getElementById(contact)
        if(elem!==null){elem.classList.add('selected-chat')}//add selection
        set_selected_contact(contact)
        signal_selected_user = contact
        document.getElementById("message").value = '' //erase the messageBox when switching contacts
        document.getElementById('ChatSide').classList.remove('collapse')
        // document.getElementById("selected-contact-image").classList.remove('collapse')
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
    const addContact = (newContactName,Nickname,server) => {
        //check if newContactName is already in the contact list
        if (newContactName ===current_user.user_name) { return 'You can not add yourself! find some friends!' }
        if (contact_list.map(contact => contact.id).includes(newContactName)) { return 'This user is already in your contact list!' }
        if (newContactName.length < 3) { return 'Please enter a valid Id (3 chars+)' }
        if (Nickname.length < 3) { return 'Please enter a valid Nickname (3 chars+)' }
        if (newContactName in contact_list) { return 'User already in contact list' }
        if (server === "localhost" ||server === "local"|| server ===""|| server === null) {server = local_server}      
        let newbie = { id: newContactName, name: Nickname,server: server}

        $.ajax({// post new contact to the local server
            url: local_server+'/api/Contacts/',
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            headers: {
                'Content-Type': 'application/json'
            },
            data:JSON.stringify(newbie),
            success: function (data) {
            },
            error: function (data) {
                console.log("failed posting new contact");
                console.log(data);
                return null;
            }            
        }).then(setContact_List([newbie ,...contact_list]))
        try {connection.invoke("UpdateContacts", newbie.id)}
        catch (error) {console.log(error)}
        let foreignNewbie = { from: current_user.user_name, to: newContactName,server: local_server}
        $.ajax({// INVITATION new contact to the OTHER server
            url: newbie.server+'/api/invitations/',
            type: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data:JSON.stringify(foreignNewbie),
            success: function (data) {
            },
            error: function (data) {
                console.log("failed inviting new contact");
                console.log(data);
                return null;
            }
        })
        return 'success'
    }
    return (

        <div className='container large'>
            <div className="row row-chat">
                <div className="col"> {/*left side - above contactlist*/} 
                    <div className="row row-chat">
                        <div className="col">
                            <img className="float-start img-thumbnail rounded-start right-padding-for-picture" src="default.png" alt="Profile" />
                        </div>
                        <div className="col">
                            <h2 className="card-title align-left">{current_user.display_name}</h2>
                        </div>
                        <div className="col align-right">
                            <AddNewContact addContact={addContact} />
                            <button className="btn btn-primary" onClick={() => {fetchContactList()}}>Refresh</button>
                        </div>
                    </div>
                </div>
                <CurrentContact contact={getFullSelectedContact} />
                <ContactSide contact_list={contact_list} selectContact={selectContact}  />
                <div className="col chat-space collapse" id='ChatSide'>
                    <div className="chat-box scrollable" id="chatbox">
                        {messages}
                    </div>
                    <div className="toolbar row ">
                        <div className='col-1'>
                            {/* <div>
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
                            </div> */}
                        </div>
                        <div className='col-9'>
                            <input type="text" className="form-control" placeholder="message" id='message' onKeyDown={(e) => { e.key === 'Enter' && sendText() }} />
                        </div>
                        <div className='col-2'>
                            <input type="submit" value="Send" className="btn btn-primary" onClick={sendText} id='send' />
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

            </div>
        </div>

    )


}


export default ChatScreen