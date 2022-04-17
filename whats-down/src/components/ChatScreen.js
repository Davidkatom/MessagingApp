import { useState } from 'react';
import MiniContant from './MiniContant';


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
            <div >header</div>
            <div class="row">
                <div class="col-sm">
                    omer's side
                    {contact_list.map((contactIndex) => (
                        <MiniContant contact={contactIndex} />
                    ))}
                </div>
                <div class="col-sm ">
                    <div class="chat-box">

                    </div>
                </div>
            </div>


        </div>

    )
}

export default ChatScreen