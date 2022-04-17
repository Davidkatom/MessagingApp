import { ImAttachment } from 'react-icons/im';
import Button from './Button';

const ChatScreen = () => {
    return (
        <div class='container large'>
            <div chat-screen>header</div>
            <div class="row row-chat">
                <div class="col-sm">
                    omer's side
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