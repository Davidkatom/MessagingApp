import { useState } from 'react';
import MiniContant from './MiniContant';

import { ImAttachment } from 'react-icons/im';
import Button from './Button';

const ChatScreen = () => {

    const [contact_list, setContact_List] = useState([
        {
            contact_name: 'omer',
            chat_history: ["hello", "hi", "how are you"],
            last_message: 'empty chat',
        },
        {
            contact_name: 'david',
            chat_history: ["good morning", "bye", "fuck you"],
            last_message: 'empty chat',
        }
    ]);

    return (
        <div class='container large'>
            <div chat-screen>header</div>
            <div class="row row-chat">
                <div class="col-sm">
                    omer's side
                    {contact_list.map((contactIndex) => (
                        <MiniContant contact={contactIndex} />
                    ))}
                </div>
                <div class="col-sm chat-space">
                    <div class="chat-box">

                    </div>
                    <div class="toolbar row row-cols-3">
                        <div class='col-1'>
                        <button class="btn btn-light" id="attach" ><ImAttachment /></button>
                            
                        </div>
                        <div class='col-9'>
                            <input type="text" class="form-control" placeholder="text" />
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
const sendBut = function loginButton() {}

export default ChatScreen