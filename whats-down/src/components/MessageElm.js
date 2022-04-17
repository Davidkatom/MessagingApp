const MessageElm = ({ direction, text }) => {
    return (
        <div class={"message-elm" + direction} >
            <div class={"alert alert-primary " + direction} role="alert">
                {text}
            </div>
        </div>

    )
}

export default MessageElm