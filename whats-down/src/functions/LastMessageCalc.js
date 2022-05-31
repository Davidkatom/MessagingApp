
const LastMessageCalc = (message) => {
    var messagetype = message.messagetype;
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
                    message.src
                    :
                    'empty chat'
    return lastMessage;
}

export default LastMessageCalc
