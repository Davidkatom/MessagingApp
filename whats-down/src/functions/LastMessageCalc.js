
const LastMessageCalc = (message) => {
    var messagetype = message.props.messagetype;
    var lastMessage = messagetype === "image" ?
        '~Image sent'
        :
        messagetype === "video" ?
            '~Video sent'
            :
            messagetype === "audio" ?
                '~Audio sent'
                :
                messagetype === "text" ?
                    message.props.src
                    :
                    'empty chat'
    return lastMessage;
}

export default LastMessageCalc
