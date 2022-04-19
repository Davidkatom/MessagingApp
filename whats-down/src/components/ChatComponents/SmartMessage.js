
const SmartMessage = (message) => {
    var message_type = message.type;
    var message_content = message.content;
    var message_sender = message.sender;
    var message_receiver = message.receiver;
    var message_time = Date().toLocaleString();
  return (
    <div>SmartMessage</div>
  )
}

export default SmartMessage