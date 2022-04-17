const MessageElm = ({ direction, text }) => {
    return (
        <div class = {direction + '_cont'}>
            <div class={"message-elm" + direction} >
                <div class={"alert alert-primary " + direction}>
                    <span > {text} </span>
                </div>
            </div>
        </div>

    )
}

export default MessageElm